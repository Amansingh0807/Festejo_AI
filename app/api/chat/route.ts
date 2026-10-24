import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { runBudgetStressTest } from "@/lib/engine/budgetCalculator";
import { calculateRippleEffect } from "@/lib/engine/rippleEngine";
import { analyzeVendorQuotes } from "@/lib/engine/quoteAnalyzer";

const SYSTEM_INSTRUCTION = `You are Festejo AI, the elite Indian Event Decision Engine.
Your core role is an authoritative, state-aware decision co-pilot for Indian weddings, social galas, and celebrations.

CRITICAL FORMATTING RULES:
1. ABSOLUTELY ZERO EMOJIS in any part of your output.
2. ABSOLUTELY ZERO EM-DASHES (never use the em-dash character; use hyphens '-', colons, or parentheses).
3. Professional, concise, assertive tone. Do not ramble.

INDIAN CULTURAL AND REGULATORY GUARDRAILS:
- Sound Curfew: Strict 10 PM cutoff for outdoor amplification per Supreme Court guidelines. Baarat must reach venue gate by 9 PM.
- Catering 80-10 Rule: Cater for 80% guaranteed plates, 10% on-demand buffer, avoid paying full rate for 100% headcount.
- 10% Statutory Reserve: 10% of total budget must remain in escrow for sudden diesel generator surcharges, society NOCs, and weather contingencies.
- City Tiers:
  * Tier 1 (Mumbai, Delhi NCR, Bengaluru): Plate Rs. 2,500 - 4,500; Premium venue Rs. 12 - 28 Lakhs.
  * Tier 2 (Jaipur, Lucknow, Chandigarh, Pune): Plate Rs. 1,600 - 3,000; Heritage resort Rs. 7 - 16 Lakhs.
  * Tier 3: Plate Rs. 1,000 - 1,800.
- Vendor Trap Audits: Flag missing 18% GST, sound vendor generator fuel clauses, and hidden corkage fees.

If the user requests changes to key parameters (such as changing budget, guest count, city, or date), provide your strategic evaluation and conclude with a JSON payload in this exact format:
\`\`\`json
{
  "planUpdates": {
    "totalBudget": 3000000,
    "guestCount": 450,
    "city": "Jaipur"
  }
}
\`\`\`
Only include the fields that changed.`;

interface ChatMessageInput {
  role: string;
  content: string;
}

interface FallbackState {
  metadata?: {
    guestCount?: number;
    totalBudget?: number;
    city?: string;
    cityTier?: string;
    eventType?: string;
    contingencyReserve?: number;
    perPlateCatering?: number;
  };
  budgetStressTest?: {
    bufferReserveEscrow?: number;
    maxPerPlateAllowance?: number;
  };
}

export async function POST(req: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const { messages, currentPlanState, action, payload } = body as {
      messages?: ChatMessageInput[];
      currentPlanState?: FallbackState;
      action?: string;
      payload?: Record<string, unknown>;
    };

    // 1. Direct Tool Executions (Deterministic Math Engines)
    if (action === "triggerRippleEffect" && payload) {
      const ripple = calculateRippleEffect(
        currentPlanState?.metadata as Parameters<typeof calculateRippleEffect>[0],
        payload as unknown as Parameters<typeof calculateRippleEffect>[1]
      );
      return NextResponse.json({ success: true, ripple });
    }

    if (action === "analyzeQuote" && payload) {
      const category = typeof payload.category === "string" ? payload.category : "Catering";
      const quoteAnalysis = analyzeVendorQuotes(
        category,
        payload.quoteA as unknown as Parameters<typeof analyzeVendorQuotes>[1],
        payload.quoteB as unknown as Parameters<typeof analyzeVendorQuotes>[2]
      );
      return NextResponse.json({ success: true, quoteAnalysis });
    }

    if (action === "stressTest" && payload) {
      const totalBudget = typeof payload.totalBudget === "number" ? payload.totalBudget : 2500000;
      const guestCount = typeof payload.guestCount === "number" ? payload.guestCount : 300;
      const cityTier = (typeof payload.cityTier === "string" ? payload.cityTier : "Tier-1") as Parameters<typeof runBudgetStressTest>[2];
      const eventType = (typeof payload.eventType === "string" ? payload.eventType : "Wedding") as Parameters<typeof runBudgetStressTest>[3];

      const stressTest = runBudgetStressTest(totalBudget, guestCount, cityTier, eventType);
      return NextResponse.json({ success: true, stressTest });
    }

    // 2. Real Gemini AI Chat Handling
    const rawUserPrompt = Array.isArray(messages) && messages.length > 0
      ? String(messages[messages.length - 1]?.content || "")
      : "";

    // Input sanitization and size limiting (prevents DoS)
    const userPrompt = rawUserPrompt.slice(0, 4000).trim();

    if (!userPrompt) {
      return NextResponse.json({
        success: true,
        reply: "Please provide your event planning query or parameter adjustment.",
      });
    }

    // Context summary for Gemini
    const contextPrompt = currentPlanState
      ? `CURRENT EVENT STATE:
- Event: ${currentPlanState.metadata?.eventType || "Wedding"}
- City: ${currentPlanState.metadata?.city || "Delhi NCR"} (Tier: ${currentPlanState.metadata?.cityTier || "Tier 1"})
- Guests: ${currentPlanState.metadata?.guestCount || 300}
- Total Budget: Rs. ${currentPlanState.metadata?.totalBudget || 2500000}
- Locked 10% Reserve: Rs. ${currentPlanState.budgetStressTest?.bufferReserveEscrow || 250000}
- Max Per-Plate Allowance: Rs. ${currentPlanState.budgetStressTest?.maxPerPlateAllowance || 2500}

USER QUERY:
${userPrompt}`
      : userPrompt;

    let aiReply = "";
    let extractedUpdates: Record<string, unknown> | null = null;
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "GEMINI_API_KEY") {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: SYSTEM_INSTRUCTION,
        });

        // Build history from previous turns
        const history = (messages || [])
          .slice(0, -1)
          .map((m: ChatMessageInput) => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: String(m.content || "").slice(0, 2000) }],
          }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(contextPrompt);
        aiReply = result.response.text();

        // Extract planUpdates if present in JSON block
        const jsonMatch = aiReply.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        if (jsonMatch) {
          try {
            const parsed = JSON.parse(jsonMatch[1]);
            if (parsed && typeof parsed.planUpdates === "object" && parsed.planUpdates !== null) {
              extractedUpdates = parsed.planUpdates as Record<string, unknown>;
            }
          } catch {
            // Ignore JSON parse failure
          }
        }
      } catch (geminiError: unknown) {
        const errorMessage = geminiError instanceof Error ? geminiError.message : "External AI error";
        console.error("Gemini API call failed, using deterministic fallback:", errorMessage);
        aiReply = generateDeterministicFallback(userPrompt, currentPlanState);
      }
    } else {
      // Offline / Key missing fallback
      aiReply = generateDeterministicFallback(userPrompt, currentPlanState);
    }

    // Strip out any accidental emojis or em-dashes
    aiReply = aiReply.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "");
    aiReply = aiReply.replace(/—/g, " - ");

    return NextResponse.json(
      {
        success: true,
        reply: aiReply,
        planUpdates: extractedUpdates,
      },
      {
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal server error";
    console.error("Chat API route error:", errorMsg);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateDeterministicFallback(prompt: string, state?: FallbackState): string {
  const lower = prompt.toLowerCase();
  const guests = state?.metadata?.guestCount || 300;
  const budget = state?.metadata?.totalBudget || 2500000;
  const city = state?.metadata?.city || "Delhi NCR";

  if (lower.includes("guest") || lower.includes("people") || lower.includes("increase") || lower.includes("add")) {
    return `Analysis of guest variance for ${city}:
Increasing guest count impacts food and beverage, seating acreage, and floating plate requirements.
Under the 80-10 floating plate rule:
- Minimum guaranteed plates: ${Math.round(guests * 0.8)} plates
- Buffer standby: ${Math.round(guests * 0.1)} plates
- Recommended reserve quarantine: Rs. ${(budget * 0.1).toLocaleString("en-IN")}.
Ensure venue capacity has at least 25% margin above seated count to comply with local fire safety clearance.`;
  }

  if (lower.includes("rain") || lower.includes("weather") || lower.includes("monsoon")) {
    return `Weather Contingency Protocol:
- German hanger or waterproof canopy requirement: Estimated Rs. 1,20,000 to Rs. 2,50,000.
- Mandatory drainage check for lawn venues.
- Audio and lighting cabling must be elevated to prevent short circuits.
- The 10% statutory reserve covers this without cannibalizing decor or catering allocations.`;
  }

  if (lower.includes("curfew") || lower.includes("dj") || lower.includes("music") || lower.includes("sound")) {
    return `Sound Curfew Advisory:
- Outdoor amplification cutoff: 10:00 PM sharp per Supreme Court regulations.
- Recommended timeline: Baarat entry by 8:30 PM, Varmala by 9:15 PM, outdoor DJ termination by 9:55 PM.
- Post 10 PM: Transition to indoor banquet hall with acoustic insulation to avoid police intervention and fines.`;
  }

  return `Festejo Decision Desk standing by for ${state?.metadata?.eventType || "Event"} in ${city}.
Current budget: Rs. ${(budget / 100000).toFixed(1)} Lakhs for ${guests} guests.
Per-plate budget headroom: Rs. ${Math.round((budget * 0.35) / guests).toLocaleString("en-IN")}.
You can ask to simulate guest surges, compare vendor quotations, or evaluate timeline bottlenecks.`;
}
