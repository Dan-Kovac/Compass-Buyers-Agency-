import React from "react";
import LandingPageTemplate from "../components/landing/LandingPageTemplate";

const DATA = {
  heroTitle: "Brunswick Heads Buyers Agent",
  heroSubtitle: "Village charm, river frontage, Byron Shire address. ~$2.1M median. Tight stock. 40+ agent relationships across the shire.",

  marketStats: [
    { value: "$2.1M", label: "Median Price" },
    { value: "~80", label: "Annual Sales" },
    { value: "39%", label: "Off-Market" },
    { value: "61%", label: "Interstate Buyers" },
  ],

  infoSplits: [
    {
      title: "Why Brunswick Heads",
      bullets: [
        "Median around $2.1M for houses (about 14% below Byron town)",
        "~80 house sales per year across Brunswick Heads, Ocean Shores and South Golden Beach",
        "~61% interstate buyers, primarily Sydney and Melbourne lifestyle movers",
        "Genuine village feel: the Brunswick River, Torakina Beach, Hotel Brunswick",
        "Stock ~30% below pre-2020 norms; well-priced homes rarely last a week",
      ],
    },
    {
      title: "Why Use a Buyers Agent in Brunswick Heads",
      bullets: [
        "Off-market rate ~39%; best river and beachside homes sell through networks",
        "Flood mapping critical: low-lying pockets near the river carry insurance risk",
        "Byron Shire planning rules (DCP, heritage overlays) add complexity",
        "Interstate buyers underestimate how fast good stock moves here",
        "Local knowledge separates a $1.8M Ocean Shores house from a $2.4M Brunswick village cottage",
      ],
    },
  ],

  suburbs: ["Brunswick Heads", "Ocean Shores", "New Brighton", "South Golden Beach", "Mullumbimby"],

  approach: {
    heading: "Our Approach in Brunswick Heads",
    body: "We live and work in Byron Shire. Brunswick Heads is not a suburb we visit; it is a market we know street by street.",
    bullets: [
      "Direct relationships with Brunswick, Ocean Shores and Mullumbimby agents",
      "~39% of our shire deals secured off-market or pre-listing",
      "Flood certificate analysis and council overlay navigation",
      "Average negotiation result: ~6.5% under asking in the broader Brunswick area",
      "Honest advice on where to stretch and where to walk away",
    ],
  },

  faqHeading: "Brunswick Heads FAQ",
  faqItems: [
    {
      question: "What is the median price in Brunswick Heads?",
      bullets: [
        "Brunswick Heads village ~ $2.1M for houses",
        "Ocean Shores ~ $1.55M; New Brighton ~ $1.75M; South Golden Beach ~ $1.65M",
      ],
      answer: "Brunswick Heads village has a median of approximately $2.1M for houses. Ocean Shores sits around $1.55M, New Brighton around $1.75M, and South Golden Beach around $1.65M. Within the village itself, river-frontage and character cottages on the heritage streets command a premium, while properties on the western side of the village offer better value with the same walkability to the river and Torakina Beach.",
    },
    {
      question: "Is Brunswick Heads cheaper than Byron Bay?",
      bullets: [
        "Yes: about 14% lower median than Byron town (~$2.45M)",
        "Similar shire, quieter village feel, direct river and beach access",
      ],
      answer: "Yes, roughly 14% lower than Byron town's $2.45M median. You're in the same shire with access to the same schools, council services, and Byron hinterland, but in a quieter village with its own distinct character. The Brunswick River, Torakina Beach, and Hotel Brunswick give the town a community feel that Byron has largely lost to tourism. For many buyers, that's the whole point.",
    },
    {
      question: "Do I need a buyers agent in Brunswick Heads?",
      bullets: [
        "About 39% of sales are off-market or pre-listing",
        "Stock is tight and good homes sell fast; flood mapping and shire planning rules add complexity",
      ],
      answer: "About 39% of sales in the broader Brunswick area happen off-market or pre-listing. Stock is tight (only around 80 house sales per year across Brunswick Heads, Ocean Shores and South Golden Beach), and well-priced homes rarely last a week on the market. Flood mapping near the Brunswick River, Byron Shire DCP overlays, and heritage considerations on older cottages add layers of complexity that catch first-time buyers in the area off guard. We know the streets, the risks, and the agents.",
    },
    {
      question: "Best suburb by budget?",
      bullets: [
        "Ocean Shores ~ $1.55M (larger blocks, family-friendly)",
        "South Golden Beach ~ $1.65M (beach access, relaxed)",
        "Brunswick village ~ $2.1M (walkable, river, character homes)",
      ],
      answer: "Ocean Shores at around $1.55M is the family pick: larger blocks, established trees, and a quiet residential feel with the beach a short drive away. South Golden Beach at $1.65M is more relaxed and bohemian, with direct beach access and a tight-knit community. Brunswick Heads village itself at $2.1M gives you walkability to everything: the river, the beach, cafes, the pub, and the Saturday markets. Each has a distinct personality despite being only minutes apart.",
    },
    {
      question: "How competitive is it?",
      bullets: [
        "2-4 bidders on quality listings; less than Byron but faster than most expect",
        "River-frontage and village cottages attract the strongest competition",
      ],
      answer: "Expect 2-4 serious bidders on quality listings. It's less intense than Byron town, but faster than most interstate buyers expect. River-frontage properties and village character cottages attract the strongest competition, often selling within days of listing. The buyers you're competing against tend to be lifestyle-motivated, often cash or pre-approved, and they've usually already decided this is where they want to be. Speed and readiness make the difference.",
    },
    {
      question: "What are the key risks?",
      bullets: [
        "Flood zones near the Brunswick River and low-lying Ocean Shores pockets",
        "Byron Shire DCP overlays and heritage considerations on older cottages",
        "Septic systems on some rural-residential blocks",
      ],
      answer: "Flood risk is the main concern: properties near the Brunswick River and in low-lying pockets of Ocean Shores can carry elevated flood mapping, which affects insurance premiums and long-term resale. Byron Shire DCP overlays and heritage considerations apply to many of the older village cottages, which can limit renovation scope. Some rural-residential blocks rely on septic systems rather than town sewerage. We run flood certificates, council searches, and building reports on every property before recommending it.",
    },
    {
      question: "How long does buying take?",
      bullets: [
        "Average ~55 days on market across the broader area",
        "Quality village stock moves in 20-30 days; off-market can settle in 2-3 weeks",
      ],
      answer: "Average days-on-market across the broader Brunswick area is around 55, but quality village stock moves much faster, often within 20-30 days. Off-market deals can settle in 2-3 weeks if both parties are ready. Our clients typically go from first conversation to keys in 4-8 weeks. The timeline depends on how specific your criteria are and what happens to be available, but we're upfront about realistic timeframes from the start.",
    },
  ],

  ctaHeading: "Buying in Brunswick Heads?",
  ctaButtonText: "Start a Conversation",

  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/brunswick-heads-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Brunswick Heads buyers agent covering Brunswick Heads, Ocean Shores, New Brighton and South Golden Beach. ~$2.1M median. 39% off-market. Byron Shire expertise.",
    areaServed: { "@type": "City", name: "Brunswick Heads" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  },
};

export default function BrunswickHeadsBuyersAgents() {
  return <LandingPageTemplate data={DATA} />;
}
