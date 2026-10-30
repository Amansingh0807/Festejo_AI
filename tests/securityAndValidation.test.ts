import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/chat/route";
import { runBudgetStressTest } from "../lib/engine/budgetCalculator";
import { analyzeVendorQuotes } from "../lib/engine/quoteAnalyzer";

describe("Security, Boundary & Validation Test Suite", () => {
  it("rejects negative budgets with HTTP 400 bad request", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "stressTest",
        payload: {
          totalBudget: -500000,
          guestCount: 200,
          cityTier: "Tier-1",
          eventType: "Wedding",
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 400);
    assert.strictEqual(data.success, false);
    assert.ok(data.error.includes("positive finite number"));
  });

  it("rejects non-integer and zero guest counts with HTTP 400", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "stressTest",
        payload: {
          totalBudget: 2000000,
          guestCount: 0,
          cityTier: "Tier-1",
          eventType: "Wedding",
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 400);
    assert.strictEqual(data.success, false);
    assert.ok(data.error.includes("positive integer"));
  });

  it("rejects invalid city tier options with HTTP 400", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "stressTest",
        payload: {
          totalBudget: 2000000,
          guestCount: 250,
          cityTier: "Tier-99",
          eventType: "Wedding",
        },
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 400);
    assert.strictEqual(data.success, false);
    assert.ok(data.error.includes("Invalid cityTier"));
  });

  it("rejects oversized request payloads exceeding safe thresholds with HTTP 413", async () => {
    const giantPayload = "x".repeat(60000);
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: giantPayload }],
      }),
    });

    const res = await POST(req);
    const data = await res.json();

    assert.strictEqual(res.status, 413);
    assert.strictEqual(data.success, false);
    assert.ok(data.error.includes("Payload exceeds"));
  });

  it("attaches defensive security headers to API responses", async () => {
    const req = new Request("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "analyzeQuote",
        payload: { category: "Venue" },
      }),
    });

    const res = await POST(req);

    assert.strictEqual(res.headers.get("x-content-type-options"), "nosniff");
    assert.strictEqual(res.headers.get("x-frame-options"), "DENY");
    assert.strictEqual(res.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
    assert.strictEqual(res.headers.get("cache-control"), "no-store, no-cache, must-revalidate");
  });

  it("normalizes negative budgets and zero guests defensibly in budget engine", () => {
    const safeResult = runBudgetStressTest(-100000, 0, "Tier-1", "Wedding");

    assert.strictEqual(safeResult.totalBudget, 0);
    assert.strictEqual(safeResult.contingencyReserve, 0);
    assert.strictEqual(safeResult.isFeasible, false);
  });

  it("extracts diverse currency formats reliably in quote analyzer", () => {
    const quote1 = analyzeVendorQuotes("Decor", "Quoted INR 85,000 net", "₹95,000 all in");
    assert.strictEqual(quote1.vendorA.quotedPrice, 85000);
    assert.strictEqual(quote1.vendorB.quotedPrice, 95000);

    const quote2 = analyzeVendorQuotes("Catering", "Rate is Rs. 1400 per person", "Rs 1650 inclusive");
    assert.strictEqual(quote2.vendorA.quotedPrice, 1400);
    assert.strictEqual(quote2.vendorB.quotedPrice, 1650);
  });
});
