import { BudgetItem, CityTier, EventType, StressTestResult } from "../types/event";
export type { StressTestResult };

const MIN_PER_HEAD_THRESHOLDS: Record<CityTier, Record<EventType, number>> = {
  "Tier-1": {
    Wedding: 1800,
    Birthday: 850,
    Community: 500,
    Corporate: 1500,
  },
  "Tier-2": {
    Wedding: 1200,
    Birthday: 550,
    Community: 350,
    Corporate: 1000,
  },
  "Tier-3": {
    Wedding: 800,
    Birthday: 350,
    Community: 250,
    Corporate: 700,
  },
};

/**
 * Runs a deterministic feasibility stress test on proposed event financial parameters.
 * Calculates per-plate economics, enforces mandatory 10% contingency escrow,
 * detects deficits against city-tier benchmarks, and proposes actionable trade-offs.
 *
 * @param totalBudget - Total committed capital in Indian Rupees (INR)
 * @param guestCount - Total expected headcount
 * @param cityTier - City classification (Tier-1, Tier-2, or Tier-3)
 * @param eventType - Event category (Wedding, Birthday, Community, Corporate)
 * @returns Comprehensive StressTestResult object
 */
export function runBudgetStressTest(
  totalBudget: number,
  guestCount: number,
  cityTier: CityTier,
  eventType: EventType
): StressTestResult {
  const normalizedBudget = Math.max(0, totalBudget);
  const safeGuestCount = Math.max(1, guestCount);

  // 10% Mandatory Contingency Reserve
  const contingencyReserve = Math.round(normalizedBudget * 0.1);
  const usableBudget = normalizedBudget - contingencyReserve;
  const perHeadTotal = Math.round(usableBudget / safeGuestCount);

  const minRequiredPerHead = MIN_PER_HEAD_THRESHOLDS[cityTier]?.[eventType] ?? 1200;
  const isFeasible = perHeadTotal >= minRequiredPerHead;
  const recommendedMinBudget = Math.round((minRequiredPerHead * safeGuestCount) / 0.9);
  const deficit = isFeasible ? 0 : recommendedMinBudget - totalBudget;

  // Approx ~40% of usable budget is Food & Catering
  const perPlateCatering = Math.round((usableBudget * 0.38) / safeGuestCount);

  // Generate 3 Practical Trade-off Options if unfeasible
  const realisticGuestCut = Math.max(20, Math.floor(usableBudget / minRequiredPerHead));

  const tradeOffs = isFeasible
    ? []
    : [
        {
          id: "guest_cut",
          title: "Option A: Smart Guest Curation",
          desc: `Trim guest count from ${guestCount} to ${realisticGuestCut} guests. This brings per-head cost to a healthy ₹${minRequiredPerHead} without compromising decor, food, or photo quality.`,
          actionText: `Apply ${realisticGuestCut} Guests`,
          newGuestCount: realisticGuestCut,
        },
        {
          id: "format_shift",
          title: "Option B: Format & Venue Rebalance",
          desc: `Shift from full-course 5-star dinner to an elegant High-Tea / Live Chaat & Stalls format or opt for a Municipal/Community banquet hall. Saves ~35% on venue rental & food wastage.`,
          actionText: "Switch to High-Tea / Hybrid Hall Format",
        },
        {
          id: "budget_stretch",
          title: "Option C: Budget Realignment",
          desc: `Stretch total budget to ₹${recommendedMinBudget.toLocaleString(
            "en-IN"
          )} (an additional ₹${deficit.toLocaleString(
            "en-IN"
          )}). Guarantees realistic vendor deliverables in ${cityTier} standards.`,
          actionText: `Stretch Budget to ₹${(recommendedMinBudget / 100000).toFixed(1)}L`,
          newBudget: recommendedMinBudget,
        },
      ];

  return {
    totalBudget: normalizedBudget,
    contingencyReserve,
    usableBudget,
    perHeadTotal,
    perPlateCatering,
    isFeasible,
    minRequiredPerHead,
    deficit,
    recommendedMinBudget,
    tradeOffs,
  };
}

/**
 * Deterministic allocation generator where sum(allocatedAmount) === totalBudget EXACTLY.
 * 10% Mandatory Contingency Reserve is locked first.
 */
export function generateDeterministicBudget(
  totalBudget: number,
  guestCount: number,
  eventType: EventType
): BudgetItem[] {
  const safeGuests = Math.max(1, guestCount);
  const contingency = Math.round(totalBudget * 0.1);

  // Allocations based on Indian Event dynamics
  const categoryRatios: {
    category: string;
    percentage: number;
    inclusions: string;
    costSavingLever: string;
    riskFactor: "Low" | "Medium" | "High";
  }[] =
    eventType === "Wedding"
      ? [
          {
            category: "Food & Beverage (Catering)",
            percentage: 38,
            inclusions: "Live Chaat counters, Main course (3 paneer/veg curries, dal makhani, breads), Desserts (Gulab jamun & Kulfi), Welcome mocktails",
            costSavingLever: "Cap dessert variety to 2 high-impact live stations instead of 6 stagnant trays; save 8-12%",
            riskFactor: "High",
          },
          {
            category: "Venue & Power Logistics",
            percentage: 22,
            inclusions: "Main lawn/banquet rental, Gen-set diesel fuel quota (6 hrs backup), Valet staff & parking security",
            costSavingLever: "Negotiate daytime muhurat or weekday slot for 25% flat discount on base venue charge",
            riskFactor: "High",
          },
          {
            category: "Decor, Floral & Stage Rigging",
            percentage: 14,
            inclusions: "Mandap setup, Fairy-light canopy, Marigold & Rajnigandha fresh floral photobooth, Ambient warm wash LEDs",
            costSavingLever: "Replace exotic imported orchids with seasonal local marigold & brass diya clusters; saves ₹35,000+",
            riskFactor: "Medium",
          },
          {
            category: "Photography & Cinematic Reels",
            percentage: 8,
            inclusions: "2 Candid Photographers, 1 Traditional Videographer, 48-hr Instagram Teaser Reel, Drone flyover (outdoor permits)",
            costSavingLever: "Book local boutique crew over celebrity branding; ask for raw rushes + 3 reels package",
            riskFactor: "Low",
          },
          {
            category: "Sound, DJ & Cultural Artists",
            percentage: 5,
            inclusions: "Sound system with JBL line-array, DJ Console, Dhol trio for baraat entry, PPL/IPRS music permit compliance",
            costSavingLever: "Switch from live celebrity band to a tight DJ set with local folk dhol artists",
            riskFactor: "Medium",
          },
          {
            category: "Invites, Society NOC & Favors",
            percentage: 3,
            inclusions: "WhatsApp motion video invites, Custom mithai/dry-fruit favor boxes, Police 10 PM sound permission filing fee",
            costSavingLever: "Go 100% digital for extended circles, reserve physical boxes strictly for elder relatives",
            riskFactor: "Low",
          },
        ]
      : [
          {
            category: "Food, Snacks & Live Counters",
            percentage: 42,
            inclusions: "Live snack stalls (Pav Bhaji/Pasta), Main buffet, Cake/Dessert counter, Soft drinks & Mocktail bar",
            costSavingLever: "Opt for a high-energy live food stall format instead of heavy seated multi-course dinner",
            riskFactor: "High",
          },
          {
            category: "Venue & Society Logistics",
            percentage: 20,
            inclusions: "Clubhouse / Banquet Hall booking, Cleaning staff, Society security & NOC formalities",
            costSavingLever: "Use residential society clubhouse rather than commercial banquet to slash venue cost by 70%",
            riskFactor: "Medium",
          },
          {
            category: "Theme Decor & Lighting",
            percentage: 15,
            inclusions: "Balloon arch, Personalized photo-backdrop, LED string lighting, Cake table styling",
            costSavingLever: "Use reusable metallic geometric arches with pastel balloons instead of single-use cutouts",
            riskFactor: "Low",
          },
          {
            category: "Photography & Video Highlights",
            percentage: 6,
            inclusions: "1 Candid Photographer, 1 Highlight video, Family group shoots",
            costSavingLever: "Hire for 4 hours prime time instead of full day",
            riskFactor: "Low",
          },
          {
            category: "Entertainment & Games Host",
            percentage: 4,
            inclusions: "Anchor/Emcee for games, Kids activity coordinator, Bluetooth PA sound system",
            costSavingLever: "Engage an enthusiastic family emcee with scripted party games",
            riskFactor: "Low",
          },
          {
            category: "Return Gifts & Cake",
            percentage: 3,
            inclusions: "Themed return gift hampers, Custom fondant/artisan cake",
            costSavingLever: "Curate useful eco-friendly seed kits or storybooks in bulk wholesale",
            riskFactor: "Low",
          },
        ];

  // Distribute 90% across categories and calculate exact integers
  let allocatedSum = 0;
  const items: BudgetItem[] = [];

  categoryRatios.forEach((cat, index) => {
    // Exact proportion from totalBudget
    const amount = Math.round((totalBudget * cat.percentage) / 100);
    allocatedSum += amount;
    items.push({
      id: `budget-${index + 1}`,
      category: cat.category,
      percentage: cat.percentage,
      allocatedAmount: amount,
      perGuestAmount: Math.round(amount / safeGuests),
      inclusions: cat.inclusions,
      costSavingLever: cat.costSavingLever,
      riskFactor: cat.riskFactor,
    });
  });

  // Add 10% Mandatory Contingency Reserve
  const calculatedReserve = totalBudget - allocatedSum;
  items.push({
    id: "budget-contingency",
    category: "Statutory 10% Contingency Reserve",
    percentage: 10,
    allocatedAmount: calculatedReserve > 0 ? calculatedReserve : contingency,
    perGuestAmount: Math.round((calculatedReserve > 0 ? calculatedReserve : contingency) / safeGuests),
    inclusions: "Emergency buffer strictly reserved for weather disruptions, overtime vendor extensions, sudden guest influx, or generator fuel surges",
    costSavingLever: "Never touch this pool during initial booking. Lock in escrow until T-48 hours",
    riskFactor: "High",
  });

  // Verify deterministic arithmetic match
  const finalSum = items.reduce((acc, curr) => acc + curr.allocatedAmount, 0);
  if (finalSum !== totalBudget) {
    // Adjust minor 1-2 rupee rounding difference into Contingency Reserve so it is 100% exact
    const diff = totalBudget - finalSum;
    const contingencyItem = items.find((i) => i.id === "budget-contingency");
    if (contingencyItem) {
      contingencyItem.allocatedAmount += diff;
    }
  }

  return items;
}
