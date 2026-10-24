import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/chat/route";

describe("Chat API Route & Guardrails", () => {
  it("dispatches deterministic stressTest tool action directly", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "stressTest",
        payload: {
          totalBudget: 2500000,
          guestCount: 300,
          cityTier: "Tier-1",
          eventType: "Wedding",
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.stressTest);
    assert.strictEqual(data.stressTest.contingencyReserve, 250000);
    assert.strictEqual(data.stressTest.isFeasible, true);
  });

  it("dispatches deterministic triggerRippleEffect tool action", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "triggerRippleEffect",
        currentPlanState: {
          metadata: {
            eventType: "Wedding",
            city: "Delhi NCR",
            guestCount: 300,
            totalBudget: 2500000,
            contingencyReserve: 250000,
            perPlateCatering: 2500,
          },
        },
        payload: {
          variable: "guestCount",
          newGuestCount: 350,
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.ripple);
    assert.ok(data.ripple.trigger.includes("+50"));
    assert.ok(data.ripple.costDelta > 0);
  });

  it("dispatches deterministic analyzeQuote tool action", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "analyzeQuote",
        payload: {
          category: "Catering",
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.quoteAnalysis);
    assert.ok(data.quoteAnalysis.vendorA);
    assert.ok(data.quoteAnalysis.vendorB);
  });

  it("enforces strict zero emoji and zero em-dash guardrails in responses", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "Tell me about sound curfew and weather contingency" }],
        currentPlanState: {
          metadata: {
            eventType: "Wedding",
            city: "Delhi NCR",
            guestCount: 300,
            totalBudget: 2500000,
            contingencyReserve: 250000,
            perPlateCatering: 2500,
          },
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.reply);

    // Guardrail Check: Zero Emojis
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
    assert.strictEqual(emojiRegex.test(data.reply), false, "AI reply must contain zero emojis");

    // Guardrail Check: Zero Em-Dashes (U+2014)
    assert.strictEqual(data.reply.includes("—"), false, "AI reply must contain zero em-dashes");
  });

  it("handles empty prompt gracefully", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: "   " }],
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 200);
    assert.strictEqual(data.success, true);
    assert.ok(data.reply.includes("Please provide"));
  });
});
