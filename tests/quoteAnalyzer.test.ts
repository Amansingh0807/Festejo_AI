import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { analyzeVendorQuotes } from "../lib/engine/quoteAnalyzer";

describe("Vendor Quote Deconstruction Engine", () => {
  it("provides comprehensive benchmark comparison for default catering quotes", () => {
    const analysis = analyzeVendorQuotes();

    assert.strictEqual(analysis.category, "Catering & Live Counters");
    assert.ok(analysis.vendorA.name.includes("Shree Krishna"));
    assert.strictEqual(analysis.vendorA.quotedPrice, 950);
    assert.ok(analysis.vendorB.name.includes("Royal Heritage"));
    assert.strictEqual(analysis.vendorB.quotedPrice, 1180);

    // Hidden omissions detected in Vendor A
    const vendorAOmissions = analysis.vendorA.hiddenOmissions;
    assert.ok(vendorAOmissions.some((o) => o.includes("18% GST")));
    assert.ok(vendorAOmissions.some((o) => o.includes("fuel")));

    // Vendor A effective total should be higher once normalized
    assert.ok(analysis.vendorA.effectiveTotal > analysis.vendorA.quotedPrice);
    assert.strictEqual(analysis.vendorA.effectiveTotal, 1220);
    assert.strictEqual(analysis.vendorB.effectiveTotal, 1210);

    // Vendor B has lower effective cost despite higher face value quote
    assert.ok(analysis.vendorB.effectiveTotal <= analysis.vendorA.effectiveTotal);
    assert.ok(analysis.verdict.length > 20);
    assert.ok(analysis.negotiationScript.includes("Namaste"));
  });

  it("handles custom vendor quotation analysis and detects omitted taxes", () => {
    const analysis = analyzeVendorQuotes(
      "Decor",
      "Quoted Rs. 1,50,000 for floral arch",
      "Quoted Rs. 1,75,000 all inclusive"
    );

    assert.strictEqual(analysis.category, "Decor");
    assert.strictEqual(analysis.vendorA.quotedPrice, 150000);
    assert.strictEqual(analysis.vendorB.quotedPrice, 175000);

    assert.ok(analysis.vendorA.hiddenOmissions.some((o) => o.includes("GST")));
    assert.ok(analysis.negotiationScript.length > 20);
  });

  it("falls back to benchmark prices when quotes contain no numeric amounts", () => {
    const analysis = analyzeVendorQuotes(
      "Decor",
      "Custom floral design without rates",
      "Comprehensive package on inquiry"
    );

    assert.strictEqual(analysis.category, "Decor");
    assert.strictEqual(analysis.vendorA.quotedPrice, 1100);
    assert.strictEqual(analysis.vendorB.quotedPrice, 1300);
  });
});
