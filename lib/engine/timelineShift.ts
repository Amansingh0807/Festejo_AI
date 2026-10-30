import { TimelineTask } from "../types/event";

/**
 * Generates an operational reverse timeline calculated backward from event day.
 * Enforces legal cutoffs (10 PM outdoor sound curfew) and catering 80-10 buffers.
 *
 * @param eventDateStr - Target event date in ISO format (YYYY-MM-DD)
 * @param eventType - Event category (Wedding, Birthday, Corporate, etc.)
 * @returns Array of interlinked TimelineTask items with T-minus offsets
 */
export function generateDependencyTimeline(
  eventDateStr: string,
  eventType: string = "Wedding"
): TimelineTask[] {
  const eventDate = new Date(eventDateStr);

  // Helper to format date
  const computeTargetDate = (tMinus: number) => {
    const d = new Date(eventDate);
    d.setDate(d.getDate() - tMinus);
    return d.toISOString().split("T")[0];
  };

  if (eventType === "Wedding") {
    return [
      {
        id: "task-venue",
        tMinusDays: 90,
        targetDate: computeTargetDate(90),
        taskTitle: "Lock Venue Contract & Verify In-House Monopoly Rules",
        category: "Venue",
        dependencyWarning: "CRITICAL: Do NOT sign decor or catering contracts before reading venue's vendor penalty clauses.",
        indianContextTip: "Check if the venue levies a 25-35% royalty fee on outside caterers or decorators, and confirm if air-conditioning & 15 KVA generator diesel is included in rental.",
        status: "locked",
      },
      {
        id: "task-caterer",
        tMinusDays: 60,
        targetDate: computeTargetDate(60),
        taskTitle: "Food Tasting & Caterer Service SLA Signing",
        category: "Catering",
        dependsOnTaskId: "task-venue",
        dependencyWarning: "Depends on Venue kitchen access confirmation & live-tandoor fire safety NOC.",
        indianContextTip: "Specify strictly: mineral water jar brand, number of live counter staff, separate Jain/pure veg preparation utensils, and no leftover recycling clause.",
        status: "in_progress",
      },
      {
        id: "task-decor",
        tMinusDays: 45,
        targetDate: computeTargetDate(45),
        taskTitle: "Mandap & Floral Production Blueprint Sign-Off",
        category: "Decor",
        dependsOnTaskId: "task-venue",
        dependencyWarning: "Requires venue ceiling hook load capacity & lawn dimensions before approving rigging.",
        indianContextTip: "Specify fresh flower grade vs artificial silk mix in writing. Require cold pyro fire-safety clearance certificate for indoor bride/groom entry.",
        status: "pending",
      },
      {
        id: "task-sound-noc",
        tMinusDays: 21,
        targetDate: computeTargetDate(21),
        taskTitle: "Police NOC & 10 PM Loudspeaker Permission Clearance",
        category: "Permissions",
        indianContextTip: "Indian Supreme Court strictly enforces outdoor acoustic cutoffs at 10:00 PM. Secure formal station clearance or plan indoor acoustic transition after 10 PM.",
        status: "pending",
      },
      {
        id: "task-genset",
        tMinusDays: 7,
        targetDate: computeTargetDate(7),
        taskTitle: "Power Load Audit & Silent Gen-Set Diesel Test",
        category: "Logistics",
        dependsOnTaskId: "task-decor",
        dependencyWarning: "Heavy AC + Sharpy moving head lights cause voltage drops without dedicated phase splitting.",
        indianContextTip: "Mandate at least 60 liters backup diesel on site with an on-duty electrician, especially during summer or peak festive grid loads.",
        status: "pending",
      },
      {
        id: "task-headcount",
        tMinusDays: 3,
        targetDate: computeTargetDate(3),
        taskTitle: "Final RSVPs & Caterer Floating Plate Cap (10% Buffer Rule)",
        category: "Catering",
        dependsOnTaskId: "task-caterer",
        dependencyWarning: "Lock minimum guaranteed plates (MG) vs actual floating plates.",
        indianContextTip: "Never commit 100% of invitees as Minimum Guarantee. Standard Indian wedding attrition is 15-20%. Commit 80% MG with a 10% overflow buffer provision.",
        status: "pending",
      },
      {
        id: "task-event-day",
        tMinusDays: 0,
        targetDate: computeTargetDate(0),
        taskTitle: "Event Day Shadow Coordinator & Muhurat Run of Show",
        category: "Execution",
        indianContextTip: "Assign one trusted family shadow to handle vendor milestone envelopes and verify bar/plate consumption counts before signing vendor clearance slips.",
        status: "pending",
      },
    ];
  }

  // Non-wedding (Birthday / Community / Corporate)
  return [
    {
      id: "task-hall-book",
      tMinusDays: 30,
      targetDate: computeTargetDate(30),
      taskTitle: "Book Society Hall / Venue & Obtain Managing Committee NOC",
      category: "Venue",
      indianContextTip: "Check society bylaws regarding lift usage for heavy equipment, vendor entry timings, and security caution deposits.",
      status: "locked",
    },
    {
      id: "task-theme-decor",
      tMinusDays: 14,
      targetDate: computeTargetDate(14),
      taskTitle: "Finalize Theme Decor, Cake & Custom Backdrop",
      category: "Decor",
      dependsOnTaskId: "task-hall-book",
      indianContextTip: "Confirm hall wall-mounting rules. Most Indian societies penalize tape marks on paint; use free-standing arch frames.",
      status: "in_progress",
    },
    {
      id: "task-snack-menu",
      tMinusDays: 7,
      targetDate: computeTargetDate(7),
      taskTitle: "Lock Live Snack Counters & Headcount (Kid-to-Adult Ratio)",
      category: "Catering",
      indianContextTip: "Kids consume 40% less main course but twice as many live counter items (fries, pasta, mocktails). Structure plate pricing accordingly.",
      status: "pending",
    },
    {
      id: "task-sound-host",
      tMinusDays: 3,
      targetDate: computeTargetDate(3),
      taskTitle: "Sound System Check & Emcee Schedule Rundown",
      category: "Entertainment",
      indianContextTip: "Ensure music volume complies with society 10 PM decibel rules to prevent security halting the event mid-celebration.",
      status: "pending",
    },
    {
      id: "task-day-execute",
      tMinusDays: 0,
      targetDate: computeTargetDate(0),
      taskTitle: "Event Day Setup & Hamper Distribution",
      category: "Execution",
      indianContextTip: "Double-check cake delivery refrigeration upon arrival and keep a first-aid kit ready for high-energy kid games.",
      status: "pending",
    },
  ];
}
