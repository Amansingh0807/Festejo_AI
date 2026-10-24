import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getIndianVendorIntelligence } from "../lib/engine/vendorMatrix";

describe("Vendor Matrix Intelligence Engine", () => {
  it("returns vendor intelligence covering all key event categories", () => {
    const vendors = getIndianVendorIntelligence("Wedding");

    assert.ok(Array.isArray(vendors));
    assert.strictEqual(vendors.length, 4);

    const vendorTypes = vendors.map((v) => v.vendorType);
    assert.ok(vendorTypes.some((t) => t.includes("Venue")));
    assert.ok(vendorTypes.some((t) => t.includes("Catering")));
    assert.ok(vendorTypes.some((t) => t.includes("Decor")));
    assert.ok(vendorTypes.some((t) => t.includes("Sound")));
  });

  it("enforces maximum advance payment caps at or below 25%", () => {
    const vendors = getIndianVendorIntelligence("Wedding");

    for (const vendor of vendors) {
      assert.ok(
        vendor.maxAdvancePercent <= 25,
        `Vendor ${vendor.vendorType} advance percent (${vendor.maxAdvancePercent}%) exceeds safe cap of 25%`
      );
      assert.ok(vendor.paymentMilestoneRule.length > 20);
    }
  });

  it("includes critical Indian wedding negotiation traps and red flags", () => {
    const vendors = getIndianVendorIntelligence("Wedding");

    const venue = vendors.find((v) => v.id === "vendor-venue");
    assert.ok(venue);
    assert.ok(venue.mustAskQuestions.some((q) => q.toLowerCase().includes("royalty")));
    assert.ok(venue.hiddenCostRedFlags.some((rf) => rf.toLowerCase().includes("diesel")));

    const catering = vendors.find((v) => v.id === "vendor-catering");
    assert.ok(catering);
    assert.ok(catering.mustAskQuestions.some((q) => q.toLowerCase().includes("mineral water")));
    assert.ok(catering.hiddenCostRedFlags.some((rf) => rf.toLowerCase().includes("overtime")));

    const sound = vendors.find((v) => v.id === "vendor-sound-dj");
    assert.ok(sound);
    assert.ok(sound.mustAskQuestions.some((q) => q.toLowerCase().includes("10 pm")));
  });
});
