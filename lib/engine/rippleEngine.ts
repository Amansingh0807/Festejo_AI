import { EventMetadata, RecoveryOption, RippleAnalysis } from "../types/event";

export interface RippleTriggerInput {
  variable: "guestCount" | "categoryCost" | "weather" | "subEventAdd";
  deltaValue?: number;
  newGuestCount?: number;
  categoryName?: string;
  weatherDetails?: string;
}

/**
 * Simulates downstream ripple effects and contingency drawdowns triggered by event shocks.
 * Models guest count variances, price escalations, and weather contingencies.
 *
 * @param currentMetadata - Current event state metadata
 * @param input - Trigger parameters describing the shock
 * @returns Comprehensive RippleAnalysis with recovery options
 */
export function calculateRippleEffect(
  currentMetadata: EventMetadata,
  input: RippleTriggerInput
): RippleAnalysis {
  const oldReserve = currentMetadata?.contingencyReserve ?? 0;
  let costDelta = 0;
  let triggerDescription = "";
  const affectedCategories: string[] = [];
  const downstreamImpacts: string[] = [];
  const recoveryOptions: RecoveryOption[] = [];

  if (input.variable === "guestCount" && input.newGuestCount) {
    const guestDiff = input.newGuestCount - currentMetadata.guestCount;
    // Food catering per plate + extra chairs/table service share (~₹1,200 per head)
    const incrementalCostPerHead = Math.max(800, currentMetadata.perPlateCatering + 350);
    costDelta = guestDiff * incrementalCostPerHead;

    triggerDescription = `Guest count increased by +${guestDiff} (from ${currentMetadata.guestCount} to ${input.newGuestCount} guests)`;
    affectedCategories.push("Food & Beverage (Catering)", "Venue Seating & Linens", "Valet Parking Logistics");

    downstreamImpacts.push(
      `Catering: Kitchen team requires +${guestDiff} Minimum Guarantee commitment and +2 live counter staff.`,
      `Decor: Venue layout needs +${Math.ceil(guestDiff / 8)} round banquet tables and +${guestDiff} banquet chairs.`,
      `Valet: Expecting ~${Math.ceil(guestDiff / 3)} additional vehicles; venue parking capacity may saturate.`,
      `Timeline: T-3 Headcount lock task needs urgent sign-off with caterer.`
    );

    recoveryOptions.push(
      {
        title: "Absorb via Contingency Reserve",
        impact: `Draw ₹${Math.min(costDelta, oldReserve).toLocaleString("en-IN")} from the 10% safety buffer. Zero cuts to guest experience.`,
        actionType: "absorb_buffer",
        recommendedDelta: costDelta,
      },
      {
        title: "Rebalance Decor & Lighting",
        impact: `Cut ₹${costDelta.toLocaleString("en-IN")} from elaborate floral ceiling trussing to fully offset the guest catering increase.`,
        actionType: "cut_category",
        recommendedDelta: costDelta,
      },
      {
        title: "Adjust Menu Format to Live Stalls",
        impact: `Switch dessert spread from 6 items to 2 live hot counters, saving ~₹${Math.round(costDelta * 0.6).toLocaleString("en-IN")}.`,
        actionType: "shift_format",
        recommendedDelta: Math.round(costDelta * 0.6),
      }
    );
  } else if (input.variable === "categoryCost" && input.deltaValue) {
    costDelta = input.deltaValue;
    const cat = input.categoryName || "Venue & Power Logistics";
    triggerDescription = `${cat} incurred a direct price escalation of +₹${costDelta.toLocaleString("en-IN")}`;
    affectedCategories.push(cat);

    downstreamImpacts.push(
      `Financial: ₹${costDelta.toLocaleString("en-IN")} immediate draw against your 10% Contingency Reserve.`,
      `Vendor Compliance: Review original booking SLA to verify if this price hike is legally permitted post-agreement.`,
      `Downstream: If buffer is depleted, subsequent vendor overtimes or rain backup cannot be absorbed.`
    );

    recoveryOptions.push(
      {
        title: "Absorb from Contingency Buffer",
        impact: `Utilize reserve buffer. Leaves ₹${Math.max(0, oldReserve - costDelta).toLocaleString("en-IN")} remaining for emergencies.`,
        actionType: "absorb_buffer",
        recommendedDelta: costDelta,
      },
      {
        title: "Negotiate Daytime / Hour Offset",
        impact: `Trim 1 hour of venue generator runtime or opt for daytime lighting wash to save ₹${Math.round(costDelta * 0.7).toLocaleString("en-IN")}.`,
        actionType: "cut_category",
        recommendedDelta: Math.round(costDelta * 0.7),
      },
      {
        title: "Trim Invitations & Physical Gifting",
        impact: `Switch remaining invitations to digital motion invites to recover ₹${Math.min(costDelta, 25000).toLocaleString("en-IN")}.`,
        actionType: "cut_category",
        recommendedDelta: Math.min(costDelta, 25000),
      }
    );
  } else if (input.variable === "weather") {
    costDelta = 42000;
    triggerDescription = "Sudden Monsoon / Rain forecast detected for outdoor lawn ceremonies";
    affectedCategories.push("Venue & Lawn Cover", "Decor & Floral Rigging", "Sound & Audio Protection");

    downstreamImpacts.push(
      "Decor: Lawn requires high-grade waterproof German Pagoda canopy / German Hangar tarping (+₹35,000 - ₹45,000).",
      "Audio/Electrical: DJ console and speaker line-arrays must be moved to elevated wooden pallets with waterproof sheathing.",
      "Footwear & Lawn: Wet turf requires coir carpet matting to prevent mud sticking to guests' ethnic wear.",
      "Timeline: Setup crew needs 4 extra hours at T-1 day to water-proof electrical distribution boxes."
    );

    recoveryOptions.push(
      {
        title: "Deploy Waterproof Pagoda Canopies (Absorb from Buffer)",
        impact: `Erect water-resistant pagoda canopies using ₹${costDelta.toLocaleString("en-IN")} from contingency reserve.`,
        actionType: "absorb_buffer",
        recommendedDelta: costDelta,
      },
      {
        title: "Free Shift to Indoor Banquet Hall",
        impact: "Trigger venue contract's indoor backup clause immediately at ₹0 extra cost (if indoor hall was reserved as secondary).",
        actionType: "shift_format",
        recommendedDelta: 0,
      },
      {
        title: "Trim Floral Ceiling Drops to Fund Waterproofing",
        impact: "Reallocate ₹35,000 from hanging floral ceiling installations to weather-proofing structures.",
        actionType: "cut_category",
        recommendedDelta: 35000,
      }
    );
  } else {
    // Default fallback
    costDelta = input.deltaValue || 30000;
    triggerDescription = "Dynamic Event Parameter Adjustment";
    affectedCategories.push("Contingency Reserve");
    downstreamImpacts.push("General budget realignments applied.");
    recoveryOptions.push({
      title: "Absorb via Buffer",
      impact: "Maintain original schedule with reserve absorption.",
      actionType: "absorb_buffer",
      recommendedDelta: costDelta,
    });
  }

  const remainingReserve = oldReserve - costDelta;
  const reserveBreached = remainingReserve < 0;
  const outOfPocketDeficit = reserveBreached ? Math.abs(remainingReserve) : 0;

  return {
    timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    trigger: triggerDescription,
    costDelta,
    oldReserve,
    remainingReserve: Math.max(0, remainingReserve),
    reserveBreached,
    outOfPocketDeficit,
    affectedCategories,
    downstreamOperationalImpact: downstreamImpacts,
    recoveryOptions,
  };
}
