import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { useEventStore } from "../lib/store/useEventStore";

describe("Zustand Live Event Store", () => {
  beforeEach(() => {
    useEventStore.getState().resetToDefaultPlan();
  });

  it("initializes with valid default event metadata and 10% reserve escrow", () => {
    const state = useEventStore.getState();
    assert.strictEqual(state.metadata.eventType, "Wedding");
    assert.strictEqual(state.metadata.city, "New Delhi");
    assert.strictEqual(state.metadata.guestCount, 250);
    assert.strictEqual(state.metadata.totalBudget, 1200000);
    assert.strictEqual(state.metadata.contingencyReserve, 120000);
    assert.ok(state.budgetItems.length > 0);
    assert.ok(state.timelineTasks.length > 0);
    assert.ok(state.vendorItems.length > 0);
  });

  it("updates plan state upon initEventPlan call", () => {
    const store = useEventStore.getState();
    const result = store.initEventPlan(
      1500000,
      180,
      "Jaipur",
      "Tier-2",
      "Wedding",
      "2026-11-20"
    );

    const updated = useEventStore.getState();
    assert.strictEqual(updated.metadata.city, "Jaipur");
    assert.strictEqual(updated.metadata.totalBudget, 1500000);
    assert.strictEqual(updated.metadata.guestCount, 180);
    assert.strictEqual(updated.metadata.contingencyReserve, 150000);
    assert.strictEqual(result.isFeasible, true);
  });

  it("handles trade-off application when budget is unfeasible", () => {
    const store = useEventStore.getState();
    // Initialize unfeasible plan (Rs. 2 Lakhs for 300 guests in Tier-1)
    store.initEventPlan(200000, 300, "Mumbai", "Tier-1", "Wedding", "2026-12-15");

    const unfeasibleState = useEventStore.getState();
    assert.ok(unfeasibleState.activeFeasibilityAlert !== null);

    // Apply trade-off: reduce guests to 100
    store.applyTradeOff("guest_cut", 100, 200000);

    const updated = useEventStore.getState();
    assert.strictEqual(updated.metadata.guestCount, 100);
    assert.strictEqual(updated.activeFeasibilityAlert, null);
    assert.ok(
      updated.chatMessages.some((msg) => msg.text.includes("[CONFIRMED] Trade-Off Applied"))
    );
  });

  it("executes triggerRippleEffect and updates contingency balance", () => {
    const store = useEventStore.getState();
    const initialReserve = store.metadata.contingencyReserve;

    store.triggerRippleEffect({
      variable: "categoryCost",
      deltaValue: 40000,
      categoryName: "Venue & Power Logistics",
    });

    const updated = useEventStore.getState();
    assert.strictEqual(updated.metadata.contingencyReserve, initialReserve - 40000);
    assert.ok(updated.activeRippleAlert !== null);
    assert.strictEqual(updated.activeRippleAlert?.costDelta, 40000);
  });

  it("updates active tab and opens quote modal on compareVendorQuotesAction", () => {
    const store = useEventStore.getState();
    const comparison = store.compareVendorQuotesAction("Catering");

    const updated = useEventStore.getState();
    assert.strictEqual(updated.activeTab, "vendors");
    assert.strictEqual(updated.isQuoteModalOpen, true);
    assert.ok(updated.activeQuoteComparison !== null);
    assert.strictEqual(comparison.category, "Catering & Live Counters");
  });
});
