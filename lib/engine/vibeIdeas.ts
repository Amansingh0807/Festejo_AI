import { VibeIdea } from "../types/event";

export function getPersonalizedVibeIdeas(eventType: string = "Wedding"): VibeIdea[] {
  if (eventType === "Wedding") {
    return [
      {
        id: "vibe-1",
        title: "Marwar Heritage Courtyard & Brass Diya Twilight",
        culturalTag: "Royal Rajasthani & Traditional Indian",
        coreConcept: "A warm, dignified atmosphere inspired by royal courtyards with fragrant genda (marigold) cascades, brass urli floating lamps, and soulful live shehnai / flute acoustics at twilight.",
        smartSaverVersion: {
          description: "Use local yellow & orange marigold garlands sourced directly from wholesale flower mandis, paired with terracotta diyas and brass-painted clay thalis.",
          estimatedCost: 35000,
          diyHacks: [
            "Use clay earthen urlis with floating candles and rose petals instead of expensive heavy brass pieces.",
            "Hire a talented local folk flute artist for twilight entry instead of a 6-piece classical troupe.",
            "Fairy lights strung vertically in clusters create the visual effect of royal starry chandeliers.",
          ],
        },
        splurgeVersion: {
          description: "Authentic antique brass floor lamps, 1,000+ real wax lotus floating diyas, carved wooden heritage jharokha backdrops, and live Manganiyar Sufi folk ensemble from Jodhpur.",
          estimatedCost: 140000,
          luxuryHighlights: [
            "Handcrafted Rajasthani block-print shamianas with gold foil canopies.",
            "Live attar (Indian perfume bar) where guests receive bespoke glass vials.",
            "Choreographed royal petal shower during the varmala ceremony.",
          ],
        },
      },
      {
        id: "vibe-2",
        title: "Sufi Chai & Kebab Night (Intimate Sangeet / Lounge)",
        culturalTag: "Contemporary Boho-Mughal Fusion",
        coreConcept: "A cozy, Persian rug and low-seating baithak lounge with live kulhad chai counters, charcoal sigri kebabs, glowing Moroccan lanterns, and acoustic Sufi melodies.",
        smartSaverVersion: {
          description: "Low floor diwan seating using colorful bolster pillows (gaddas), cane stools, fairy light teepees, and a rustic clay kulhad cutting-chai bar.",
          estimatedCost: 28000,
          diyHacks: [
            "Borrow carpets and mattresses from family and drape with vibrant Bandhani dupattas.",
            "Set up a self-serve vintage samovar kettle with cardamon tea and warm rusk/biscuits.",
            "Curate a warm acoustic Sufi playlist through ambient warm-tone speakers.",
          ],
        },
        splurgeVersion: {
          description: "Imported Turkish rugs, brass hookah lounges (herbal/non-tobacco), live kebab grill station with chef theatre, and live acoustic Indie-Sufi playback singer.",
          estimatedCost: 110000,
          luxuryHighlights: [
            "Live tandoor and copper handi stations with royal Awadhi service ware.",
            "Ambient smoke haze with warm amber theatrical spotlighting.",
            "Custom monogrammed brass tea tumblers as guest takeaways.",
          ],
        },
      },
      {
        id: "vibe-3",
        title: "Kolkata Botanical Greenhouse & White Rajnigandha Elegance",
        culturalTag: "Subtle Floral Minimalism & Bengali Heritage",
        coreConcept: "Understated luxury focused on natural fragrance: heavy white Rajnigandha (tuberose) curtains, lush green monstera foliage, warm Edison filament bulbs, and silver bell chimes.",
        smartSaverVersion: {
          description: "Potted areca palms and ferns rented from local nurseries, white Rajnigandha strings for the photobooth, and hanging Edison filament bulbs on jute ropes.",
          estimatedCost: 32000,
          diyHacks: [
            "Rent potted plants from local plant nurseries at ₹40/pot instead of purchasing cut greenery.",
            "Focus fragrant Rajnigandha flowers only at guest eye level and entry gates.",
            "Use warm white fairy lights wrapped around natural tree branches.",
          ],
        },
        splurgeVersion: {
          description: "Full glasshouse marquee structure, suspended ceiling floral clouds of baby's breath and white orchids, live harp/sitar duet, and fine-dining plated dessert bar.",
          estimatedCost: 160000,
          luxuryHighlights: [
            "Custom 20-foot botanical glass wall with illuminated typography.",
            "Gourmet French patisserie infused with Indian flavours (Rasmalai Tres Leches).",
            "Fine-cut crystal glassware and personalized calligraphy menu cards.",
          ],
        },
      },
    ];
  }

  // Non-wedding
  return [
    {
      id: "vibe-nw-1",
      title: "Desi Carnival & Street Food Mela",
      culturalTag: "Vibrant Indian Festival",
      coreConcept: "A bustling celebratory carnival with colorful striped canopies, live popcorn/cotton candy wheels, puppet show, and fun desi carnival games (ring toss, dart balloons).",
      smartSaverVersion: {
        description: "Bright paper pinwheels, recycled kite paper buntings, chalkboard game signs, and DIY carnival booth tables draped in yellow and pink fabrics.",
        estimatedCost: 18000,
        diyHacks: [
          "Create game booths using sturdy cardboard cartons painted in circus stripes.",
          "Hire a neighborhood balloon sculptor for 2 hours.",
        ],
      },
      splurgeVersion: {
        description: "Full wooden carnival booths, motorized merry-go-round, professional stilt walkers, and personalized prize ticket redemption arcade.",
        estimatedCost: 75000,
        luxuryHighlights: ["Custom branded photo booth with instant polaroid prints", "Gourmet churro and nitro-ice cream station"],
      },
    },
    {
      id: "vibe-nw-2",
      title: "Midnight Neon Galaxy & Glow Disco",
      culturalTag: "Modern High-Energy",
      coreConcept: "Futuristic glow-in-the-dark zone with UV blacklights, neon face paint artists, LED wristbands synced to beat, and laser effects.",
      smartSaverVersion: {
        description: "UV blacklight tubes, neon paper masks, glowsticks purchased in wholesale packs, and dark room setup.",
        estimatedCost: 15000,
        diyHacks: ["Buy bulk neon tape to create glowing geometric dancefloor lines on the floor."],
      },
      splurgeVersion: {
        description: "Interactive LED pixel dancefloor, robotic laser dancer, cryo CO2 jet blasts, and silent disco headphones.",
        estimatedCost: 85000,
        luxuryHighlights: ["RGB infinity mirror tunnel photo booth", "Custom personalized neon wall sign that the host keeps forever"],
      },
    },
    {
      id: "vibe-nw-3",
      title: "Royal Indian Rajwada High-Tea",
      culturalTag: "Classic Indian Elegance",
      coreConcept: "Traditional afternoon royal feast with tiered mithai platters, savoury samosas & kachoris, cutting masala chai, and classical instrumental lounge music.",
      smartSaverVersion: {
        description: "Floral tablecloths, vintage copper kettles, tiered stainless steel stands with marigold decor.",
        estimatedCost: 16000,
        diyHacks: ["Use mason jars wrapped in jute cord for flower centerpieces."],
      },
      splurgeVersion: {
        description: "Silverware service, personalized tea sommelier tasting, live shahi tukda counter, and classical santoor recital.",
        estimatedCost: 65000,
        luxuryHighlights: ["Artisanal tea blends with personalized gift canisters for every guest"],
      },
    },
  ];
}
