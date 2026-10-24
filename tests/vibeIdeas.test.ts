import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getPersonalizedVibeIdeas } from "../lib/engine/vibeIdeas";

describe("Vibe and Decor Theme Engine", () => {
  it("provides dual-tier (smart saver vs splurge) concepts for Wedding", () => {
    const vibes = getPersonalizedVibeIdeas("Wedding");

    assert.ok(Array.isArray(vibes));
    assert.ok(vibes.length >= 3);

    for (const vibe of vibes) {
      assert.ok(vibe.title.length > 5);
      assert.ok(vibe.culturalTag.length > 3);
      assert.ok(vibe.coreConcept.length > 20);

      // Smart saver assertions
      assert.ok(vibe.smartSaverVersion.estimatedCost > 0);
      assert.ok(vibe.smartSaverVersion.diyHacks.length >= 2);

      // Splurge assertions
      assert.ok(vibe.splurgeVersion.estimatedCost > vibe.smartSaverVersion.estimatedCost);
      assert.ok(vibe.splurgeVersion.luxuryHighlights.length >= 2);
    }
  });

  it("handles non-wedding event types gracefully with fallbacks", () => {
    const vibes = getPersonalizedVibeIdeas("Birthday");

    assert.ok(Array.isArray(vibes));
    assert.ok(vibes.length >= 1);
  });
});
