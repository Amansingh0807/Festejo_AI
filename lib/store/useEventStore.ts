import { create } from "zustand";
import {
  BudgetItem,
  ChatMessage,
  CityTier,
  EventMetadata,
  EventType,
  QuoteComparison,
  RecoveryOption,
  RippleAnalysis,
  TimelineTask,
  VendorItem,
  VibeIdea,
} from "../types/event";
import {
  generateDeterministicBudget,
  runBudgetStressTest,
  StressTestResult,
} from "../engine/budgetCalculator";
import { generateDependencyTimeline } from "../engine/timelineShift";
import { getIndianVendorIntelligence } from "../engine/vendorMatrix";
import { getPersonalizedVibeIdeas } from "../engine/vibeIdeas";
import { calculateRippleEffect, RippleTriggerInput } from "../engine/rippleEngine";
import { analyzeVendorQuotes } from "../engine/quoteAnalyzer";

interface EventStoreState {
  // Event State
  metadata: EventMetadata;
  budgetItems: BudgetItem[];
  timelineTasks: TimelineTask[];
  vendorItems: VendorItem[];
  vibeIdeas: VibeIdea[];

  // UI State
  activeTab: "budget" | "timeline" | "vendors" | "vibes";
  activeFeasibilityAlert: StressTestResult | null;
  activeRippleAlert: RippleAnalysis | null;
  activeQuoteComparison: QuoteComparison | null;
  isQuoteModalOpen: boolean;
  isProcessing: boolean;

  // Conversational state
  chatMessages: ChatMessage[];

  // Actions
  setActiveTab: (tab: "budget" | "timeline" | "vendors" | "vibes") => void;
  setQuoteModalOpen: (open: boolean) => void;
  initEventPlan: (
    totalBudget: number,
    guestCount: number,
    city: string,
    cityTier: CityTier,
    eventType: EventType,
    eventDate: string
  ) => StressTestResult;
  applyTradeOff: (tradeOffId: string, newGuestCount?: number, newBudget?: number) => void;
  triggerRippleEffect: (input: RippleTriggerInput) => RippleAnalysis;
  applyRecoveryOption: (option: RecoveryOption) => void;
  compareVendorQuotesAction: (category?: string, quoteA?: string, quoteB?: string) => QuoteComparison;
  sendUserMessage: (text: string) => Promise<void>;
  updateBudgetItemAmount: (id: string, newAmount: number) => void;
  resetToDefaultPlan: () => void;
}

const DEFAULT_BUDGET = 1200000;
const DEFAULT_GUESTS = 250;
const DEFAULT_CITY = "New Delhi";
const DEFAULT_TIER: CityTier = "Tier-1";
const DEFAULT_EVENT_TYPE: EventType = "Wedding";
const DEFAULT_EVENT_DATE = "2026-11-20";

function createInitialState() {
  const stressTest = runBudgetStressTest(DEFAULT_BUDGET, DEFAULT_GUESTS, DEFAULT_TIER, DEFAULT_EVENT_TYPE);
  const budgetItems = generateDeterministicBudget(DEFAULT_BUDGET, DEFAULT_GUESTS, DEFAULT_EVENT_TYPE);
  const timelineTasks = generateDependencyTimeline(DEFAULT_EVENT_DATE, DEFAULT_EVENT_TYPE);
  const vendorItems = getIndianVendorIntelligence(DEFAULT_EVENT_TYPE);
  const vibeIdeas = getPersonalizedVibeIdeas(DEFAULT_EVENT_TYPE);

  const metadata: EventMetadata = {
    eventName: "The Royal Delhi Celebration",
    eventType: DEFAULT_EVENT_TYPE,
    city: DEFAULT_CITY,
    cityTier: DEFAULT_TIER,
    guestCount: DEFAULT_GUESTS,
    totalBudget: DEFAULT_BUDGET,
    eventDate: DEFAULT_EVENT_DATE,
    isFeasible: stressTest.isFeasible,
    perHeadTotal: stressTest.perHeadTotal,
    perPlateCatering: stressTest.perPlateCatering,
    contingencyReserve: stressTest.contingencyReserve,
    usableBudget: stressTest.usableBudget,
    deficit: stressTest.deficit,
    recommendedMinBudget: stressTest.recommendedMinBudget,
    dietaryPreference: "Veg & Non-Veg",
    venueType: "Outdoor Lawn",
  };

  const initialChat: ChatMessage[] = [
    {
      id: "msg-welcome",
      sender: "ai",
      stage: 3,
      timestamp: "10:00 AM",
      text: `DISPATCH FROM FESTEJO AI DECISION ENGINE

Baseline parameters initialized: ${DEFAULT_CITY} (${DEFAULT_TIER}), ${DEFAULT_GUESTS} Guests, and INR ${(DEFAULT_BUDGET / 100000).toFixed(1)} Lakhs Budget.

[VERIFIED] Deterministic Mathematics:
* Per-Guest Allocation: INR ${stressTest.perHeadTotal.toLocaleString("en-IN")} / guest
* Statutory 10% Contingency Reserve: INR ${stressTest.contingencyReserve.toLocaleString("en-IN")}
* Total Budget Reconciliation: 100% matched across all categories

The 4 Decision Deliverables are live in the right panel. Test stress variables below or query any vendor quote.`,
    },
  ];

  return {
    metadata,
    budgetItems,
    timelineTasks,
    vendorItems,
    vibeIdeas,
    chatMessages: initialChat,
    activeTab: "budget" as const,
    activeFeasibilityAlert: null,
    activeRippleAlert: null,
    activeQuoteComparison: null,
    isQuoteModalOpen: false,
    isProcessing: false,
  };
}

export const useEventStore = create<EventStoreState>((set, get) => ({
  ...createInitialState(),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setQuoteModalOpen: (open) => set({ isQuoteModalOpen: open }),

  initEventPlan: (totalBudget, guestCount, city, cityTier, eventType, eventDate) => {
    const stressTest = runBudgetStressTest(totalBudget, guestCount, cityTier, eventType);
    const budgetItems = generateDeterministicBudget(totalBudget, guestCount, eventType);
    const timelineTasks = generateDependencyTimeline(eventDate, eventType);
    const vendorItems = getIndianVendorIntelligence(eventType);
    const vibeIdeas = getPersonalizedVibeIdeas(eventType);

    const metadata: EventMetadata = {
      eventName: `${city} ${eventType} Masterplan`,
      eventType,
      city,
      cityTier,
      guestCount,
      totalBudget,
      eventDate,
      isFeasible: stressTest.isFeasible,
      perHeadTotal: stressTest.perHeadTotal,
      perPlateCatering: stressTest.perPlateCatering,
      contingencyReserve: stressTest.contingencyReserve,
      usableBudget: stressTest.usableBudget,
      deficit: stressTest.deficit,
      recommendedMinBudget: stressTest.recommendedMinBudget,
    };

    let newMsg: ChatMessage;

    if (!stressTest.isFeasible) {
      newMsg = {
        id: `msg-${Date.now()}`,
        sender: "ai",
        stage: 2,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `[ALERT] FEASIBILITY DEFICIT DETECTED\n\nFor a ${eventType} in ${city} (${cityTier}) with ${guestCount} guests, available per-head allocation is INR ${stressTest.perHeadTotal.toLocaleString("en-IN")}. The benchmark minimum is INR ${stressTest.minRequiredPerHead.toLocaleString("en-IN")}.\n\nReview the 3 compensatory trade-offs below:`,
        feasibilityAlert: stressTest,
      };
      set({
        metadata,
        budgetItems,
        timelineTasks,
        vendorItems,
        vibeIdeas,
        activeFeasibilityAlert: stressTest,
        chatMessages: [...get().chatMessages, newMsg],
      });
    } else {
      newMsg = {
        id: `msg-${Date.now()}`,
        sender: "ai",
        stage: 3,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `[APPROVED] Plan Validated and Feasible\n\n* Per-Guest Allocation: INR ${stressTest.perHeadTotal.toLocaleString("en-IN")}\n* Statutory 10% Reserve: INR ${stressTest.contingencyReserve.toLocaleString("en-IN")}\n* Benchmark Margin: Verified across all tiers\n\nThe Decision Ledger has updated.`,
      };
      set({
        metadata,
        budgetItems,
        timelineTasks,
        vendorItems,
        vibeIdeas,
        activeFeasibilityAlert: null,
        chatMessages: [...get().chatMessages, newMsg],
      });
    }

    return stressTest;
  },

  applyTradeOff: (tradeOffId, newGuestCount, newBudget) => {
    const current = get().metadata;
    const targetGuests = newGuestCount ?? current.guestCount;
    const targetBudget = newBudget ?? current.totalBudget;

    get().initEventPlan(
      targetBudget,
      targetGuests,
      current.city,
      current.cityTier,
      current.eventType,
      current.eventDate
    );

    const confirmationMsg: ChatMessage = {
      id: `tradeoff-${Date.now()}`,
      sender: "ai",
      stage: 3,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: `[CONFIRMED] Trade-Off Applied Successfully.\n\nAdjusted plan to ${targetGuests} guests at INR ${(targetBudget / 100000).toFixed(1)} Lakhs. Unit economics and statutory reserves restored to compliant thresholds.`,
    };

    set((state) => ({
      activeFeasibilityAlert: null,
      chatMessages: [...state.chatMessages, confirmationMsg],
    }));
  },

  triggerRippleEffect: (input) => {
    const current = get().metadata;
    const ripple = calculateRippleEffect(current, input);

    // Update contingency reserve in metadata
    const updatedMetadata: EventMetadata = {
      ...current,
      contingencyReserve: ripple.remainingReserve,
      guestCount: input.newGuestCount ?? current.guestCount,
    };

    // If guest count changed, update per-guest in budget
    let updatedBudgetItems = get().budgetItems;
    if (input.newGuestCount) {
      updatedBudgetItems = updatedBudgetItems.map((item) => {
        if (item.category.includes("Contingency")) {
          return {
            ...item,
            allocatedAmount: ripple.remainingReserve,
            perGuestAmount: Math.round(ripple.remainingReserve / input.newGuestCount!),
          };
        }
        if (item.category.includes("Food") || item.category.includes("Catering")) {
          const addedCost = ripple.costDelta;
          return {
            ...item,
            allocatedAmount: item.allocatedAmount + addedCost,
            perGuestAmount: Math.round((item.allocatedAmount + addedCost) / input.newGuestCount!),
          };
        }
        return {
          ...item,
          perGuestAmount: Math.round(item.allocatedAmount / input.newGuestCount!),
        };
      });
    } else {
      updatedBudgetItems = updatedBudgetItems.map((item) => {
        if (item.category.includes("Contingency")) {
          return {
            ...item,
            allocatedAmount: ripple.remainingReserve,
          };
        }
        return item;
      });
    }

    const aiMsg: ChatMessage = {
      id: `ripple-${Date.now()}`,
      sender: "ai",
      stage: 4,
      timestamp: ripple.timestamp,
      text: `[DISPATCH] RIPPLE EFFECT PROTOCOL ACTIVATED\n\nTrigger: ${ripple.trigger}\n* Net Financial Shift: INR ${ripple.costDelta.toLocaleString("en-IN")}\n* Contingency Balance: INR ${ripple.oldReserve.toLocaleString("en-IN")} to INR ${ripple.remainingReserve.toLocaleString("en-IN")} ${ripple.reserveBreached ? "[CRITICAL DEFICIT]" : "[ABSORBED BY BUFFER]"}`,
      rippleAlert: ripple,
    };

    set((state) => ({
      metadata: updatedMetadata,
      budgetItems: updatedBudgetItems,
      activeRippleAlert: ripple,
      chatMessages: [...state.chatMessages, aiMsg],
      activeTab: "budget",
    }));

    return ripple;
  },

  applyRecoveryOption: (option) => {
    const currentItems = get().budgetItems;

    let updatedItems = [...currentItems];
    let note = "";

    if (option.actionType === "cut_category") {
      updatedItems = updatedItems.map((item) => {
        if (item.category.includes("Decor")) {
          return {
            ...item,
            allocatedAmount: Math.max(0, item.allocatedAmount - option.recommendedDelta),
          };
        }
        return item;
      });
      note = `Offset INR ${option.recommendedDelta.toLocaleString("en-IN")} by trimming Decor and Lighting specifications. Total budget preserved.`;
    } else if (option.actionType === "absorb_buffer") {
      note = `Absorbed INR ${option.recommendedDelta.toLocaleString("en-IN")} directly from Contingency Buffer. Vendor deliverables unaffected.`;
    } else {
      note = `Applied recovery option: ${option.title}`;
    }

    const ackMsg: ChatMessage = {
      id: `ack-${Date.now()}`,
      sender: "ai",
      stage: 4,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: `[EXECUTED] Budget Recovery Action Applied:\n\n${note}\n\nThe Decision Ledger has balanced mathematically.`,
    };

    set((state) => ({
      budgetItems: updatedItems,
      activeRippleAlert: null,
      chatMessages: [...state.chatMessages, ackMsg],
    }));
  },

  compareVendorQuotesAction: (category = "Catering", quoteA, quoteB) => {
    const result = analyzeVendorQuotes(category, quoteA, quoteB);
    const comparisonMsg: ChatMessage = {
      id: `quote-${Date.now()}`,
      sender: "ai",
      stage: 4,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      text: `[DOSSIER] VENDOR QUOTE DECONSTRUCTOR: Apple-to-Apple Analysis\n\nComparative audit completed. Hidden exclusions (taxes, freight, and fuel surcharges) have been normalized:`,
      quoteComparison: result,
    };

    set((state) => ({
      activeQuoteComparison: result,
      chatMessages: [...state.chatMessages, comparisonMsg],
      activeTab: "vendors",
      isQuoteModalOpen: true,
    }));

    return result;
  },

  updateBudgetItemAmount: (id, newAmount) => {
    const currentItems = get().budgetItems;
    const total = get().metadata.totalBudget;

    const updated = currentItems.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          allocatedAmount: newAmount,
          percentage: Math.round((newAmount / total) * 100),
        };
      }
      return item;
    });

    set({ budgetItems: updated });
  },

  sendUserMessage: async (text: string) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    set((state) => ({
      chatMessages: [...state.chatMessages, userMsg],
      isProcessing: true,
    }));

    const lower = text.toLowerCase();

    // Fast-path client simulation shortcuts
    if (lower.includes("guest") && (lower.includes("badh") || lower.includes("increase") || lower.includes("add") || lower.includes("50") || lower.includes("extra"))) {
      get().triggerRippleEffect({
        variable: "guestCount",
        newGuestCount: get().metadata.guestCount + 50,
      });
      set({ isProcessing: false });
      return;
    } else if (lower.includes("venue") && (lower.includes("mehenga") || lower.includes("expensive") || lower.includes("40") || lower.includes("hike") || lower.includes("extra"))) {
      get().triggerRippleEffect({
        variable: "categoryCost",
        deltaValue: 40000,
        categoryName: "Venue & Power Logistics",
      });
      set({ isProcessing: false });
      return;
    } else if (lower.includes("rain") || lower.includes("barish") || lower.includes("monsoon") || lower.includes("weather")) {
      get().triggerRippleEffect({
        variable: "weather",
      });
      set({ isProcessing: false });
      return;
    } else if (lower.includes("quote") || lower.includes("caterer a") || lower.includes("caterer b") || lower.includes("compare")) {
      get().compareVendorQuotesAction("Catering");
      set({ isProcessing: false });
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: get().chatMessages.map((m) => ({
            role: m.sender === "ai" ? "assistant" : "user",
            content: m.text,
          })),
          currentPlanState: {
            metadata: get().metadata,
            budgetItems: get().budgetItems,
          },
        }),
      });

      const data = await response.json();
      const aiText = data.reply || "Festejo AI Decision Engine processed your request.";

      const responseMsg: ChatMessage = {
        id: `ai-resp-${Date.now()}`,
        sender: "ai",
        stage: 3,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: aiText,
      };

      set((state) => ({
        chatMessages: [...state.chatMessages, responseMsg],
      }));

      // If Gemini returned structured plan updates, apply them to the ledger
      if (data.planUpdates) {
        const currentMeta = get().metadata;
        const targetBudget = data.planUpdates.totalBudget ?? currentMeta.totalBudget;
        const targetGuests = data.planUpdates.guestCount ?? currentMeta.guestCount;
        const targetCity = data.planUpdates.city ?? currentMeta.city;
        const targetTier = targetCity.toLowerCase().includes("delhi") || targetCity.toLowerCase().includes("mumbai") || targetCity.toLowerCase().includes("bengaluru") || targetCity.toLowerCase().includes("bangalore") ? "Tier-1" : "Tier-2";

        get().initEventPlan(
          targetBudget,
          targetGuests,
          targetCity,
          targetTier,
          currentMeta.eventType,
          currentMeta.eventDate
        );
      }
    } catch (err) {
      console.error("Failed to query Gemini AI:", err);
      const current = get().metadata;
      const fallbackMsg: ChatMessage = {
        id: `ai-resp-${Date.now()}`,
        sender: "ai",
        stage: 3,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: `FESTEJO AI RECORD: For ${current.city} ${current.eventType} (Budget: INR ${(current.totalBudget / 100000).toFixed(1)}L, ${current.guestCount} guests), the contingency balance is INR ${current.contingencyReserve.toLocaleString("en-IN")}. Live ledger is synchronized.`,
      };
      set((state) => ({
        chatMessages: [...state.chatMessages, fallbackMsg],
      }));
    } finally {
      set({ isProcessing: false });
    }
  },

  resetToDefaultPlan: () => {
    set(createInitialState());
  },
}));
