import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generateDependencyTimeline } from "../lib/engine/timelineShift";

describe("Reverse Dependency Timeline Engine", () => {
  it("generates structured timeline tasks with proper T-minus day offsets for Wedding", () => {
    const eventDateStr = "2026-12-15";
    const timeline = generateDependencyTimeline(eventDateStr, "Wedding");

    assert.ok(Array.isArray(timeline));
    assert.ok(timeline.length >= 6);

    // Verify task IDs and categories
    const categories = timeline.map((t) => t.category);
    assert.ok(categories.includes("Venue"));
    assert.ok(categories.includes("Catering"));
    assert.ok(categories.includes("Decor"));
    assert.ok(categories.includes("Permissions"));
    assert.ok(categories.includes("Logistics"));
    assert.ok(categories.includes("Execution"));

    // Verify critical T-minus days ordering
    const venueTask = timeline.find((t) => t.id === "task-venue");
    assert.ok(venueTask);
    assert.strictEqual(venueTask.tMinusDays, 90);
    assert.strictEqual(venueTask.status, "locked");

    const soundTask = timeline.find((t) => t.id === "task-sound-noc");
    assert.ok(soundTask);
    assert.strictEqual(soundTask.tMinusDays, 21);
    assert.ok(soundTask.indianContextTip.includes("10:00 PM"));

    const cateringBufferTask = timeline.find((t) => t.id === "task-headcount");
    assert.ok(cateringBufferTask);
    assert.strictEqual(cateringBufferTask.tMinusDays, 3);
    assert.ok(cateringBufferTask.indianContextTip.includes("80%"));
  });

  it("calculates exact calendar dates correctly based on event date", () => {
    const eventDateStr = "2026-11-20";
    const timeline = generateDependencyTimeline(eventDateStr, "Wedding");

    const eventDayTask = timeline.find((t) => t.tMinusDays === 0);
    assert.ok(eventDayTask);
    assert.strictEqual(eventDayTask.targetDate, "2026-11-20");

    const venueTask = timeline.find((t) => t.tMinusDays === 90);
    assert.ok(venueTask);
    // 90 days before 2026-11-20 is 2026-08-22
    const targetDate = new Date(venueTask.targetDate);
    const eventDate = new Date(eventDateStr);
    const diffDays = Math.round((eventDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24));
    assert.strictEqual(diffDays, 90);
  });

  it("generates tailored timeline for non-wedding events", () => {
    const eventDateStr = "2026-08-10";
    const timeline = generateDependencyTimeline(eventDateStr, "Birthday");

    assert.ok(Array.isArray(timeline));
    assert.ok(timeline.length >= 4);

    const hallTask = timeline.find((t) => t.id === "task-hall-book");
    assert.ok(hallTask);
    assert.strictEqual(hallTask.tMinusDays, 30);
    assert.ok(hallTask.indianContextTip.includes("society"));
  });
});
