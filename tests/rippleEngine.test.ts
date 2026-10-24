import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { calculateRippleEffect } from "../lib/engine/rippleEngine";
import { EventMetadata } from "../lib/types/event";

const mockMetadata: EventMetadata = {
  eventName: "Test Wedding",
  eventType: "Wedding",
  city: "New Delhi",
  cityTier: "Tier-1",
  eventDate: "2026-12-15",
  guestCount: 300,
  totalBudget: 2500000,
  contingencyReserve: 250000,
  usableBudget: 2250000,
  perHeadTotal: 7500,
  perPlateCatering: 2500,
  deficit: 0,
  recommendedMinBudget: 2500000,
  isFeasible: true,
};

describe("Deterministic Ripple Engine", () => {
  it("calculates downstream ripple effects for sudden guest surge (+50 guests)", () => {
    const ripple = calculateRippleEffect(mockMetadata, {
      variable: "guestCount",
      newGuestCount: 350,
    });

    assert.ok(ripple.costDelta > 0);
    assert.ok(ripple.trigger.includes("+50"));
    assert.ok(ripple.affectedCategories.includes("Food & Beverage (Catering)"));
    assert.ok(ripple.affectedCategories.includes("Venue Seating & Linens"));
    assert.ok(ripple.downstreamOperationalImpact.length >= 3);
    assert.strictEqual(ripple.recoveryOptions.length, 3);

    // Remaining reserve should be reduced by costDelta
    const expectedRemaining = Math.max(0, mockMetadata.contingencyReserve - ripple.costDelta);
    assert.strictEqual(ripple.remainingReserve, expectedRemaining);
  });

  it("calculates downstream impact for direct category price escalation", () => {
    const hikeAmount = 40000;
    const ripple = calculateRippleEffect(mockMetadata, {
      variable: "categoryCost",
      deltaValue: hikeAmount,
      categoryName: "Venue & Power Logistics",
    });

    assert.strictEqual(ripple.costDelta, hikeAmount);
    assert.ok(ripple.affectedCategories.includes("Venue & Power Logistics"));
    assert.strictEqual(ripple.remainingReserve, mockMetadata.contingencyReserve - hikeAmount);
    assert.ok(ripple.downstreamOperationalImpact.some((imp) => imp.includes("SLA")));
  });

  it("simulates weather contingency shock for outdoor ceremonies", () => {
    const ripple = calculateRippleEffect(mockMetadata, {
      variable: "weather",
    });

    assert.strictEqual(ripple.costDelta, 42000);
    assert.ok(ripple.affectedCategories.includes("Venue & Lawn Cover"));
    assert.ok(ripple.downstreamOperationalImpact.some((imp) => imp.includes("German")));
    assert.strictEqual(ripple.remainingReserve, mockMetadata.contingencyReserve - 42000);
  });

  it("identifies budget deficit when cost shock exhausts the entire reserve", () => {
    const tightMetadata: EventMetadata = {
      ...mockMetadata,
      contingencyReserve: 20000,
    };

    const massiveHike = 50000;
    const ripple = calculateRippleEffect(tightMetadata, {
      variable: "categoryCost",
      deltaValue: massiveHike,
      categoryName: "Decor, Floral & Stage Rigging",
    });

    assert.strictEqual(ripple.remainingReserve, 0);
    assert.strictEqual(ripple.costDelta, 50000);
    assert.strictEqual(ripple.reserveBreached, true);
    assert.strictEqual(ripple.outOfPocketDeficit, 30000);
  });
});
