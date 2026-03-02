import React from "react";
import LandingPageTemplate from "../components/landing/LandingPageTemplate";

const DATA = {
  heroTitle: "Southern Gold Coast Buyers Agent",
  heroSubtitle: "Burleigh. Currumbin. Palm Beach. Where surf culture meets serious property. $1.85M median. Quality stock moves in weeks.",

  marketStats: [
    { value: "$1.85M", label: "Burleigh Median" },
    { value: "720+", label: "Annual Sales" },
    { value: "28%", label: "Off-Market" },
    { value: "49%", label: "Interstate Buyers" },
  ],

  infoSplits: [
    {
      title: "Why the Southern Gold Coast",
      bullets: [
        "Burleigh Heads median ~$1.85M; Currumbin ~$1.55M; Palm Beach ~$1.45M",
        "720+ house transactions per year across the corridor",
        "~49% interstate buyers, primarily Sydney and Melbourne families",
        "Strong owner-occupier market with genuine village character at each beach",
        "Stock ~25% below five-year averages; Burleigh beachside regularly trades off-market",
      ],
    },
    {
      title: "Why Use a Buyers Agent Here",
      bullets: [
        "Off-market rate ~28%; Burleigh beachside and Currumbin hill homes rarely see a portal",
        "Council overlays, flood mapping and strata complexity require local expertise",
        "James Street precinct has driven Burleigh premiums above comparable beaches",
        "Interstate buyers misjudge micro-differences between Palm Beach, Currumbin and Burleigh",
        "3-4 bidders on quality stock; disciplined strategy outperforms emotional bidding",
      ],
    },
  ],

  suburbs: ["Burleigh Heads", "Currumbin", "Palm Beach", "Currumbin Valley", "Elanora"],

  approach: {
    heading: "Our Approach on the Southern Gold Coast",
    body: "We know the difference between a Burleigh beachside street and one that floods, which towers have sinking fund problems, and which agents call us first. That detail changes outcomes.",
    bullets: [
      "Direct relationships across Burleigh, Currumbin and Palm Beach agents",
      "~28% of our Southern Gold Coast deals secured off-market",
      "Strata and body corporate due diligence on beachfront complexes",
      "Average negotiation result: ~5.5% under asking (~$102k median saving)",
      "Honest guidance on which streets carry flood or insurance risk",
    ],
  },

  faqHeading: "Southern Gold Coast FAQ",
  faqItems: [
    {
      question: "What is the median price on the Southern Gold Coast?",
      bullets: [
        "Burleigh Heads ~ $1.85M",
        "Currumbin ~ $1.55M; Palm Beach ~ $1.45M; Elanora ~ $1.25M",
      ],
      answer: "Burleigh Heads leads the corridor at around $1.85M median for houses, driven by the James Street precinct, the beachfront national park, and strong owner-occupier demand. Currumbin sits around $1.55M with a mix of beachside and hill properties. Palm Beach is roughly $1.45M with a growing village feel and cafe culture. Elanora at about $1.25M offers the best family value while still being close to the beach. Prices vary sharply by proximity to the water and quality of the street.",
    },
    {
      question: "Is the Southern Gold Coast cheaper than Byron Bay?",
      bullets: [
        "Yes: Burleigh ~ $1.85M vs Byron ~ $2.45M (about 25% lower)",
        "Better infrastructure, airport proximity and more stock diversity",
      ],
      answer: "Yes, roughly 25% cheaper. Burleigh at $1.85M versus Byron at $2.45M gives you a significant saving while still delivering a premium beach lifestyle. The Southern Gold Coast also has better infrastructure: more dining options, Gold Coast Airport nearby, better public transport, and a wider range of property types from beachfront apartments to hinterland acreage. The trade-off is a busier feel than Byron's village pace, though suburbs like Currumbin and Palm Beach still have genuine community character.",
    },
    {
      question: "Do I need a buyers agent on the Southern Gold Coast?",
      bullets: [
        "About 28% of deals are off-market, especially beachside Burleigh",
        "Strata complexity on beachfront; council overlays on hinterland fringe",
      ],
      answer: "Around 28% of deals here are off-market, especially beachside Burleigh where low-turnover properties change hands through agent networks. Strata complexity is a genuine trap on the Southern Gold Coast: older beachfront towers can carry massive special levies, poor sinking funds, and building defects that aren't obvious on inspection. We review strata reports, body corporate minutes, and building histories before recommending any unit or townhouse. On houses, council overlays and flood mapping in low-lying pockets add due diligence that's best handled by someone who knows the area.",
    },
    {
      question: "Best suburb by budget?",
      bullets: [
        "Elanora ~ $1.25M (family value, close to beaches)",
        "Palm Beach ~ $1.45M (village feel, strong cafe culture)",
        "Burleigh Heads ~ $1.85M (premium beachside, James Street precinct)",
      ],
      answer: "Elanora at around $1.25M is the family value pick: good schools, quiet streets, and all the southern beaches within a 10-minute drive. Palm Beach at roughly $1.45M has a strong cafe and dining scene, a growing village identity, and is one of the areas we see the most upside in. Burleigh Heads at $1.85M is the premium choice, anchored by the James Street lifestyle precinct, Burleigh Heads National Park, and one of Australia's best surf breaks. Currumbin at $1.55M splits the difference with a mix of beachside character and hinterland valley properties.",
    },
    {
      question: "How competitive is it?",
      bullets: [
        "3-4 bidders on quality Burleigh listings; Palm Beach and Currumbin slightly less",
        "~49% interstate buyers, mostly families with pre-approved budgets",
      ],
      answer: "Quality Burleigh listings typically attract 3-4 serious bidders. Palm Beach and Currumbin are slightly less competitive, with 2-3 bidders on most properties. Around 49% of buyers are interstate, primarily families from Sydney and Melbourne with pre-approved budgets, and many are cash buyers which gives them an edge on conditional offers. The corridor is less intense than Byron but more competitive than most buyers expect, especially on beachside stock. Being prepared and moving fast still makes a real difference.",
    },
    {
      question: "Key risks?",
      bullets: [
        "Flood mapping in low-lying Palm Beach and Currumbin Creek pockets",
        "Strata and special levies on older beachfront towers",
        "Airport flight path noise in some Bilinga/Palm Beach streets",
      ],
      answer: "Three main risks. First, flood mapping: low-lying areas in parts of Palm Beach and near Currumbin Creek carry elevated flood risk, which can add thousands per year to insurance premiums. Second, strata: older beachfront towers (especially 1980s-90s builds) can have large special levies for concrete cancer, waterproofing, and lift replacements, sometimes running into six figures. Third, airport flight path noise: some streets in Bilinga and northern Palm Beach sit under the Gold Coast Airport approach path, which affects livability and resale. We check all of these before recommending any property.",
    },
    {
      question: "Burleigh vs Coolangatta?",
      bullets: [
        "Burleigh: ~$1.85M, James Street lifestyle, stronger owner-occupier market",
        "Coolangatta: ~$1.65M, quieter, closer to airport, more apartment stock",
      ],
      answer: "Burleigh at around $1.85M is the lifestyle premium pick, centred on the James Street dining and retail precinct, the national park headland, and one of Australia's most consistent surf breaks. It has a stronger owner-occupier market and less apartment dominance. Coolangatta at $1.65M is quieter and more established, with closer airport access, a genuine village feel, and more apartment stock for buyers looking at that segment. We cover both and can help you compare based on your priorities, budget, and whether you're buying to live or invest.",
    },
  ],

  ctaHeading: "Buying on the Southern Gold Coast?",
  ctaButtonText: "Start a Conversation",

  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/southern-gold-coast-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Southern Gold Coast buyers agent covering Burleigh Heads, Currumbin, Palm Beach and Elanora. $1.85M Burleigh median. 720+ annual sales. Off-market access and local due diligence.",
    areaServed: { "@type": "City", name: "Southern Gold Coast" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  },
};

export default function SouthernGoldCoastBuyersAgents() {
  return <LandingPageTemplate data={DATA} />;
}
