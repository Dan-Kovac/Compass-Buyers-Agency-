import React from "react";
import LandingPageTemplate from "../components/landing/LandingPageTemplate";

const DATA = {
  heroTitle: "Byron Bay Buyers Agent",
  heroSubtitle: "Australia's toughest property market. $2.45M median. 5+ competing bidders. 42% never advertised. We know what you're up against.",

  marketStats: [
    { value: "$2.45M", label: "Median Price" },
    { value: "42%", label: "Off-Market" },
    { value: "5+", label: "Competing Bidders" },
    { value: "67%", label: "Interstate Buyers" },
  ],

  infoSplits: [
    {
      title: "Byron Market Reality Check",
      description: "Seller leverage, low stock and whisper listings define Byron. The market rewards speed and punishes hesitation.",
      bullets: [
        "About 400 houses sold last year at ~ $2.45M median",
        "~67% interstate buyers drive competition",
        "Median ~66 days on market; quality trades under 30",
        "~42% of sales are off-market via agent networks",
        "Expect 5+ bidders on desirable listings",
      ],
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
      imageSide: "right",
    },
    {
      title: "Why Use a Buyers Agent in Byron",
      description: "We compress timelines, widen access and protect you from costly traps unique to Byron.",
      bullets: [
        "Seller leverage is extreme: low stock, high demand",
        "Best properties often trade before public listing",
        "Due diligence traps: flood, bushfire, septic, E4 zoning",
        "Emotional bidding inflates prices. Discipline matters",
        "Move within 24-48 hours or miss it",
      ],
      imageUrl: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2069&auto=format&fit=crop",
      imageSide: "left",
    },
  ],

  suburbs: ["Byron Bay", "Suffolk Park", "Bangalow", "Brunswick Heads", "Broken Head"],

  approach: {
    heading: "Our Approach in Byron",
    body: "Brutally honest advice, fast execution and deep diligence.",
    bullets: [
      "15+ years of Byron agent relationships",
      "~58% of our Byron deals secured off-market",
      "Speed advantage: pre-approved clients move in 24-48 hours",
      "Strategic candour: we'll tell you when to walk",
      "Due diligence depth: flood, bushfire, septic, bores",
    ],
  },

  faqHeading: "Byron Bay FAQ",
  faqItems: [
    {
      question: "What is the median price in Byron Bay?",
      bullets: ["Postcode median ~ $2.45M", "Byron town ~ $2.95M; Suffolk Park ~ $2.38M; Bangalow ~ $1.85M"],
      answer: "The Byron Bay postcode median sits around $2.45M, but that figure masks big variation between suburbs. Byron town itself is closer to $2.95M for a house, while Suffolk Park trades around $2.38M and Bangalow in the hinterland is closer to $1.85M. Price also depends on proximity to the beach, block size, and whether the property has development potential. We track every sale in the shire and can give you a realistic range for whatever you're looking at.",
    },
    {
      question: "Is Byron Bay overpriced?",
      bullets: ["Trades 30-40% above comparable beach towns", "Premium driven by cultural capital and scarcity"],
      answer: "Byron trades at a 30-40% premium over comparable coastal towns like Noosa or Lennox Head. That gap is driven by scarcity (limited developable land, strict council controls) and cultural capital that's hard to replicate. Whether that premium is worth it depends on your goals. If you're buying a lifestyle property you'll hold for 10+ years, the long-term trajectory has been strong. If you're investing for yield, there are better numbers further along the coast. We'll give you an honest read on whether Byron makes sense for your situation.",
    },
    {
      question: "Do I need a buyers agent in Byron?",
      bullets: ["About 42% of sales are off-market", "5+ bidders common; relationships and disciplined negotiation are essential"],
      answer: "In Byron, around 42% of properties sell off-market or before they're publicly listed. That means nearly half the opportunities are invisible to buyers searching online. Add 5+ competing bidders on most quality listings, and the odds are stacked against anyone without agent relationships and a fast, disciplined approach. A buyers agent gives you access to those off-market deals, negotiates without the emotional attachment, and helps you avoid the due diligence traps (flood, bushfire, septic, zoning) that catch interstate buyers out.",
    },
    {
      question: "Best nearby alternatives?",
      bullets: ["Suffolk Park ~ 18% cheaper", "Bangalow ~ 25% cheaper", "Brunswick Heads ~ 14% cheaper"],
      answer: "Suffolk Park is about 18% cheaper than Byron town and only a five-minute drive south, with a quieter beach and more family-friendly feel. Bangalow in the hinterland is around 25% cheaper and popular with creative types and families who want space and a village main street. Brunswick Heads is roughly 14% cheaper, with a river, a proper pub, and a community that actively resists over-development. All three are within the Byron Shire, so you get the same council, same postcode cachet, and similar long-term growth trends at a lower entry point.",
    },
    {
      question: "How competitive is Byron?",
      bullets: ["Expect 5+ bidders on quality listings", "Sellers rarely counter low offers; speed and discipline decide outcomes"],
      answer: "Very. Quality listings in Byron regularly attract 5+ serious bidders, and that number climbs on beachside or hinterland view properties. Sellers know their leverage, so low-ball offers are typically ignored rather than countered. The properties that get the best results are the ones where the buyer moved fast, had their finance sorted, and made a clean offer within 24-48 hours. Coming in late with conditions usually means you miss out. That speed advantage is one of the main reasons our clients use us.",
    },
    {
      question: "What are key risks?",
      bullets: ["Flood zones: Belongil and parts of Suffolk", "Bushfire overlays: Broken Head", "E4 zoning limits, septic and water considerations on rural blocks"],
      answer: "The biggest due diligence risks in Byron are flood zones (Belongil, parts of Suffolk Park, and low-lying pockets near Tallow Creek), which can affect insurance premiums and resale value. Bushfire overlays apply to properties around Broken Head and some rural blocks in the hinterland. If you're looking at rural-residential land, check whether it's E4 zoning, which limits what you can build, and whether it's on town water or relies on septic and bore water. We run flood certificates, council overlay checks, and building and pest reports on every property before recommending it.",
    },
    {
      question: "Can I negotiate in Byron?",
      bullets: ["Limited room; sellers hold leverage", "First reasonable offer often wins"],
      answer: "There's less room to negotiate in Byron than in most Australian property markets. Sellers hold leverage because stock is low and demand is consistent. The best strategy is usually a strong first offer at a fair price, rather than trying to negotiate down from a low starting point. On off-market deals, there's sometimes more flexibility because the seller hasn't tested the open market. Our approach is to identify the property's true value, then position our client's offer to win without overpaying.",
    },
  ],

  ctaHeading: "Buying in Byron? Move fast, move smart.",
  ctaButtonText: "Start a Conversation",

  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/byron-bay-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Byron Bay buyers agent. $2.45M median, 67% interstate buyers, 5+ competing bidders. Off-market access and local diligence across Byron Shire.",
    areaServed: { "@type": "City", name: "Byron Bay" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  },
};

export default function ByronBayBuyersAgent() {
  return <LandingPageTemplate data={DATA} />;
}
