import { VendorItem } from "../types/event";

export function getIndianVendorIntelligence(eventType: string = "Wedding"): VendorItem[] {
  const venueBenchmark = eventType === "Corporate"
    ? "Rs. 2,00,000 - Rs. 6,00,000 per corporate banquet slot"
    : "Rs. 1,50,000 - Rs. 5,00,000 per slot depending on City Tier";

  return [
    {
      id: "vendor-venue",
      vendorType: "Venue & Banquet Lawn",
      benchmarkRate: venueBenchmark,
      maxAdvancePercent: 25,
      mustAskQuestions: [
        "Is there an outside vendor royalty fee or penalty if we do not use your empaneled decorator/caterer?",
        "Are power backup charges, AC runtime, and 50 KVA generator diesel included, or billed by the hour?",
        "What is the exact curfew timing for outdoor music vs indoor hall?",
        "How many valet parking spots and dedicated attendants are guaranteed in the contract?",
      ],
      hiddenCostRedFlags: [
        "Gen-set diesel fuel billed at inflated ₹1,500/hr after 4 initial hours.",
        "Corkage penalty of ₹300 - ₹500 per bottle if bringing own soft drinks or alcohol.",
        "Heavy kitchen cleaning fee (₹10,000 - ₹15,000) deducted from caution deposit post-event.",
        "AC shutdown sharp at 11:00 PM unless overtime surcharge is paid in cash.",
      ],
      paymentMilestoneRule: "Pay max 20% at booking, 60% one week prior to event, and hold 20% caution deposit until post-event inspection is signed off.",
    },
    {
      id: "vendor-catering",
      vendorType: "Catering & Beverage Management",
      benchmarkRate: "₹850 - ₹2,200 per plate (Veg/Non-veg & Live counters)",
      maxAdvancePercent: 20,
      mustAskQuestions: [
        "Is mineral water (packaged bottles/dispensers) and cooking ice included in the per-plate rate?",
        "What is your ratio of service waiters to guests (ideal is 1 server per 15-20 guests)?",
        "Do you have valid FSSAI certification and separate cooking stations for Jain/pure vegetarian food?",
        "What happens to untouched leftover food? Can we pack it for charitable distribution or family use?",
      ],
      hiddenCostRedFlags: [
        "Live counter fuel gas cylinders (LPG) billed separately as 'kitchen overhead'.",
        "Bone china crockery breakage fee charged at 4x retail market value.",
        "Overtime charges for live counter chefs extending past 11:30 PM.",
        "Service staff tip extortion demanded aggressively from host family during baraat/dinner.",
      ],
      paymentMilestoneRule: "15% booking token, 20% after successful menu tasting, 45% upon raw grocery arrival on event morning, final 20% after dinner count reconciliation.",
    },
    {
      id: "vendor-decor",
      vendorType: "Decor, Floral & Stage Rigging",
      benchmarkRate: "₹75,000 - ₹3,50,000 (Theme, Mandap, Lighting wash)",
      maxAdvancePercent: 25,
      mustAskQuestions: [
        "What proportion of the floral arrangements will be fresh seasonal blooms versus artificial silk flowers?",
        "Is the trussing structure, ambient amber LED wash, and serial fairy lighting included in the quote?",
        "What is your setup handover time? (Must be minimum 3 hours before guest arrival for photo shoot).",
        "Are rain-protection poly-covers and tarpaulin canopies included if weather turns damp?",
      ],
      hiddenCostRedFlags: [
        "Truss rigging labour and union transport unloading charges omitted from base quote.",
        "Cold pyro sparkler machines charged at ₹3,000 per shot extra.",
        "Heavy damage penalty if guests pluck floral strings or if wax drips on carpet.",
        "Replacing quoted fresh flowers with wilting market leftovers without prior intimation.",
      ],
      paymentMilestoneRule: "25% on 3D layout sign-off, 50% when stage trussing is erected on-site, 25% only after bride/groom photo session starts.",
    },
    {
      id: "vendor-sound-dj",
      vendorType: "Sound, DJ & Entertainment Crew",
      benchmarkRate: "₹35,000 - ₹1,20,000 (Line array, DJ, Dhol, Emcee)",
      maxAdvancePercent: 20,
      mustAskQuestions: [
        "Does your setup include proper line-array speakers, wireless lapel/handheld mics, and DJ monitor wedges?",
        "Who is responsible for paying PPL / IPRS / Novex music performance licenses?",
        "Do you have a backup laptop and audio mixer on stand-by if equipment fails?",
        "Can you seamlessly transition to low-bass acoustic mode when the 10 PM sound curfew applies?",
      ],
      hiddenCostRedFlags: [
        "Music license penalties levied by copyright monitoring inspectors during the event.",
        "Overtime fee of ₹5,000 - ₹10,000 per 30 minutes if party extends beyond schedule.",
        "Baraat mobile sound trolley diesel charged as separate add-on.",
        "Lack of voltage stabilizer causing speaker blowouts and host being blamed.",
      ],
      paymentMilestoneRule: "20% advance booking, 50% on soundcheck completion, remaining 30% at the end of the scheduled performance.",
    },
  ];
}
