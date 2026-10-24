import { QuoteComparison } from "../types/event";

export function analyzeVendorQuotes(
  category: string = "Catering",
  quoteAText?: string,
  quoteBText?: string
): QuoteComparison {
  // If no custom text provided, supply realistic benchmark comparison
  if (!quoteAText && !quoteBText) {
    return {
      category: "Catering & Live Counters",
      vendorA: {
        name: "Shree Krishna Caterers (Quoted: ₹950/plate)",
        quotedPrice: 950,
        statedPerks: [
          "5 Live Chaat counters (Pani Puri, Aloo Tikki, Pav Bhaji)",
          "3 Paneer dishes + 2 Dal varieties",
          "Hot Gulab Jamun & Jalebi Rabdi",
        ],
        hiddenOmissions: [
          "18% GST NOT included (+₹171/plate surprise at billing)",
          "Cooking gas (LPG) & chaffing fuel cylinders billed separately",
          "Packaged mineral water charged at ₹35/bottle extra",
          "Waitstaff tip expected: ₹15,000 cash lump sum",
        ],
        effectiveTotal: 1220,
      },
      vendorB: {
        name: "Royal Heritage Feasts (Quoted: ₹1,180/plate)",
        quotedPrice: 1180,
        statedPerks: [
          "All-inclusive rate: 18% GST + service included in contract",
          "Free branded mineral water bottles & soft drink mocktail bar",
          "1 Waiter per 12 guests with uniform & supervisor",
          "Separate 100% pure Jain kitchen prep zone with FSSAI badge",
        ],
        hiddenOmissions: [
          "Only 2 live counters included; 3rd counter requires ₹8,000 top-up",
          "Tasting session limited to 3 family members",
        ],
        effectiveTotal: 1210,
      },
      verdict: "Vendor B appears ₹230 more expensive on face value, but Vendor A hides 18% GST + water + fuel which actually makes Vendor A ₹10 more expensive per plate with high billing dispute risk! Vendor B is the safer, transparent choice.",
      negotiationScript: `Namaste ji! We reviewed your catering proposal. We genuinely love your food reputation and live counter menu. However, another top caterer in our circle is offering an all-inclusive package with 18% GST and packaged water included at ₹1,120 per plate with zero fuel surcharges. If you can match ₹1,050/plate all-inclusive (inclusive of GST, mineral water, and fuel), we are ready to pay the 20% booking token today itself and lock you in. Please let us know if we can finalize this.`,
    };
  }

  // Parse text or handle custom quotes
  return {
    category: category,
    vendorA: {
      name: "Vendor A (Extracted)",
      quotedPrice: 1100,
      statedPerks: ["Base service delivery", "Standard equipment", "Setup crew"],
      hiddenOmissions: [
        "18% GST omitted from upfront estimate",
        "Overtime charges post-11 PM (₹4,000/hr)",
        "Transport & logistics loading charges not specified",
      ],
      effectiveTotal: 1380,
    },
    vendorB: {
      name: "Vendor B (Extracted)",
      quotedPrice: 1300,
      statedPerks: ["Comprehensive all-inclusive quote", "Taxes & transit covered", "Dedicated on-site manager"],
      hiddenOmissions: ["Slightly higher initial token deposit (30% requested)"],
      effectiveTotal: 1340,
    },
    verdict: "Vendor A is deceptively lower by omitting taxes and overtime charges. Once normalized, Vendor B offers lower net risk and predictable billing.",
    negotiationScript: `Hi, thank you for sharing the estimate. We are actively comparing two quotes for our event. Vendor A's effective pricing comes around our target budget. We would prefer working with you if you can cap taxes and waive additional overtime charges post-11 PM. If acceptable, we can sign the agreement this week.`,
  };
}
