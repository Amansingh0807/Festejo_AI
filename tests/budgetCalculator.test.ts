import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  runBudgetStressTest,
  generateDeterministicBudget,
} from "../lib/engine/budgetCalculator";

describe("Deterministic Budget Calculator Engine", () => {
  it("enforces mandatory 10% contingency buffer reserve escrow", () => {
    const totalBudget = 2500000;
    const guests = 300;
    const result = runBudgetStressTest(totalBudget, guests, "Tier-1", "Wedding");

    assert.strictEqual(result.contingencyReserve, 250000);
    assert.strictEqual(result.usableBudget, 2250000);
    assert.strictEqual(result.perHeadTotal, Math.round(2250000 / 300));
    assert.strictEqual(result.isFeasible, true);
    assert.strictEqual(result.deficit, 0);
  });

  it("calculates per-plate catering allocation at approximately 38% of usable budget", () => {
    const totalBudget = 1200000;
    const guests = 200;
    const result = runBudgetStressTest(totalBudget, guests, "Tier-2", "Wedding");

    const usable = 1200000 - 120000; // 1,080,000
    const expectedPerPlate = Math.round((usable * 0.38) / guests);
    assert.strictEqual(result.perPlateCatering, expectedPerPlate);
    assert.strictEqual(result.contingencyReserve, 120000);
  });

  it("detects unfeasible budget scenarios and calculates deficit accurately", () => {
    // Unfeasible: 2 Lakhs total for 300 guests in Tier-1 Mumbai (Min required is Rs. 1800/head)
    const totalBudget = 200000;
    const guests = 300;
    const result = runBudgetStressTest(totalBudget, guests, "Tier-1", "Wedding");

    assert.strictEqual(result.isFeasible, false);
    assert.ok(result.deficit > 0);
    assert.strictEqual(result.tradeOffs.length, 3);

    // Trade-off Option A: Smart guest cut
    const guestCutTradeOff = result.tradeOffs.find((t) => t.id === "guest_cut");
    assert.ok(guestCutTradeOff);
    assert.ok(guestCutTradeOff.newGuestCount !== undefined);
    assert.ok(guestCutTradeOff.newGuestCount! < guests);
  });

  it("differentiates minimum per-head benchmarks across city tiers", () => {
    const budget = 500000;
    const guests = 300;

    const tier1 = runBudgetStressTest(budget, guests, "Tier-1", "Wedding");
    const tier2 = runBudgetStressTest(budget, guests, "Tier-2", "Wedding");
    const tier3 = runBudgetStressTest(budget, guests, "Tier-3", "Wedding");

    assert.strictEqual(tier1.minRequiredPerHead, 1800);
    assert.strictEqual(tier2.minRequiredPerHead, 1200);
    assert.strictEqual(tier3.minRequiredPerHead, 800);
  });

  it("handles different event types with specialized benchmarks", () => {
    const budget = 300000;
    const guests = 100;

    const wedding = runBudgetStressTest(budget, guests, "Tier-1", "Wedding");
    const birthday = runBudgetStressTest(budget, guests, "Tier-1", "Birthday");
    const corporate = runBudgetStressTest(budget, guests, "Tier-1", "Corporate");
    const community = runBudgetStressTest(budget, guests, "Tier-1", "Community");

    assert.strictEqual(wedding.minRequiredPerHead, 1800);
    assert.strictEqual(birthday.minRequiredPerHead, 850);
    assert.strictEqual(corporate.minRequiredPerHead, 1500);
    assert.strictEqual(community.minRequiredPerHead, 500);
  });

  it("guarantees 100% exact sum match across all generated budget items", () => {
    const testBudgets = [1500000, 2500000, 4850325, 750000];

    testBudgets.forEach((budget) => {
      const items = generateDeterministicBudget(budget, 250, "Wedding");
      const sum = items.reduce((acc, curr) => acc + curr.allocatedAmount, 0);
      assert.strictEqual(
        sum,
        budget,
        `Allocated items sum (${sum}) must exactly equal total budget (${budget})`
      );

      const contingencyItem = items.find((i) => i.id === "budget-contingency");
      assert.ok(contingencyItem, "Contingency reserve item must be present");
      assert.strictEqual(contingencyItem.percentage, 10);
    });
  });
});
