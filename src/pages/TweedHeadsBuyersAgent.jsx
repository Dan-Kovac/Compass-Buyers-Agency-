import React from "react";
import LandingPageTemplate from "../components/landing/LandingPageTemplate";

const DATA = {
  heroTitle: "Tweed Heads Buyers Agent",
  heroSubtitle: "Kingscliff. Cabarita. Pottsville. Same beaches as Byron, 35% cheaper. Stock 36% below five-year norms.",

  marketStats: [
    { value: "$2.015M", label: "Kingscliff Median" },
    { value: "35%", label: "Below Byron" },
    { value: "38%", label: "Off-Market" },
    { value: "52%", label: "Interstate Buyers" },
  ],

  infoSplits: [
    {
      title: "Why the Tweed Coast Works",
      description: "The same beaches as Byron, a fraction of the competition, and genuine value. Kingscliff and Cabarita have built their own identity, and buyers are catching on.",
      bullets: [
        "Kingscliff median ~$2.015M (about 35% discount to Byron Bay)",
        "Cabarita ~$1.85M, Pottsville ~$1.65M",
        "~52% interstate buyers",
        "~66 days on market; quality trades faster",
        "2-3 bidders vs Byron's 5+ on comparable stock",
      ],
    },
    {
      title: "Why Use a Buyers Agent in Tweed",
      description: "Stock is tight, off-market deals are common, and the due diligence traps are real. We solve those problems before they cost you.",
      bullets: [
        "Better value than Byron, but stock remains tight",
        "Off-market advantage (~38% of deals)",
        "Flood mapping critical (Cudgen Creek, low-lying pockets)",
        "Interstate buyers miss Tweed Shire nuance",
        "Council overlays add complexity",
      ],
    },
  ],

  suburbs: ["Kingscliff", "Cabarita Beach", "Pottsville", "Banora Point", "Tweed Heads"],

  approach: {
    heading: "Our Approach on the Tweed Coast",
    body: "Local since the 2010s. Streets like Pearl St, Bellevue Pde and Salt Village aren't just names in listings; they define outcomes.",
    bullets: [
      "~38% of our Tweed deals are off-market",
      "Flood certificate analysis and council overlay familiarity",
      "Average negotiation result: ~5.8% under asking (~$117k median saving)",
      "Buy-side discipline to avoid over-paying in hype pockets",
    ],
  },

  faqHeading: "Tweed Heads FAQ",
  faqItems: [
    {
      question: "What is the median in Kingscliff?",
      bullets: ["Kingscliff ~ $2.015M", "Cabarita ~ $1.85M; Pottsville ~ $1.65M; Banora Point ~ $895k"],
      answer: "Kingscliff sits around $2.015M for houses, making it the premium suburb on the Tweed Coast. Cabarita Beach is close behind at roughly $1.85M, Pottsville around $1.65M, and Banora Point offers entry-level buying around $895k. Salt Village and the beachfront streets of Kingscliff command the highest prices, while the blocks west of Kingscliff Road offer better value with the same village access.",
    },
    {
      question: "Is Kingscliff cheaper than Byron Bay?",
      bullets: ["Yes: about 35% cheaper", "Similar beaches; easier airport access (~15 minutes to OOL)"],
      answer: "Yes, about 35% cheaper on median. Kingscliff gives you a similar beachside lifestyle to Byron, with better infrastructure, more restaurant options than most people expect, and Gold Coast Airport about 15 minutes away. The community is more family-oriented and less tourist-heavy than Byron, which many buyers see as an advantage. Long-term growth has tracked strongly as more Sydney and Melbourne buyers discover the Tweed Coast.",
    },
    {
      question: "Do I need a buyers agent in Tweed?",
      bullets: ["Around 38% of deals are off-market", "Stock ~36% below five-year norms; flood mapping and overlays are critical"],
      answer: "Around 38% of sales on the Tweed Coast happen off-market or pre-listing, particularly in Kingscliff and Cabarita where agents often place properties through their networks before going public. Stock is roughly 36% below five-year averages, which means there's less to choose from and good homes move fast. Flood mapping near Cudgen Creek, Tweed Shire council overlays, and varying lot sizes add complexity that catches interstate buyers off guard. A local buyers agent cuts through that and gets you to the right properties before they're gone.",
    },
    {
      question: "Best suburb on the Tweed Coast?",
      bullets: ["Kingscliff for amenity", "Cabarita for surf", "Pottsville for family value"],
      answer: "It depends on what you're after. Kingscliff has the best amenity: cafes, restaurants, Salt Village, and a walkable town centre right on the beach. Cabarita Beach is quieter, with arguably the best surf on the coast and a more laid-back, less developed feel. Pottsville offers the strongest family value with larger blocks, a protected river beach for kids, and prices roughly 20% below Kingscliff. We help buyers compare these options against their budget, lifestyle, and investment goals.",
    },
    {
      question: "Key risks?",
      bullets: ["Flood zones near Cudgen Creek and low-lying Pottsville pockets", "Council overlays; limited premium-street stock"],
      answer: "Flood mapping is the primary risk on the Tweed Coast. Properties near Cudgen Creek in Kingscliff and low-lying pockets of Pottsville can carry elevated flood risk, which directly affects insurance premiums and can reduce resale appeal. Tweed Shire council overlays vary across suburbs and can restrict what you can build or renovate. Premium-street stock is also limited, which means the best addresses get bid up quickly and there's no shortcut to finding them except through agent relationships. We run flood certificates and council checks on every property before recommending it.",
    },
    {
      question: "Time to buy?",
      bullets: ["~66 days on market on average", "Quality stock moves 30-45 days; off-market can close in 2-3 weeks"],
      answer: "The average days-on-market across the Tweed Coast is around 66, but quality listings on the best streets of Kingscliff and Cabarita move within 30-45 days. Off-market deals can close even faster, sometimes in 2-3 weeks if both parties are ready. Our clients typically go from initial briefing to securing a property within 4-8 weeks, depending on how specific their criteria are and what's available at the time.",
    },
  ],

  ctaHeading: "Buying on the Tweed Coast?",
  ctaButtonText: "Start a Conversation",

  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/tweed-heads-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Tweed Heads buyers agent covering the Tweed Coast corridor. Kingscliff median $2.015M (35% discount to Byron). 66 days on market. Stock 36% below five-year norms.",
    areaServed: { "@type": "City", name: "Tweed Heads" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  },
};

export default function TweedHeadsBuyersAgent() {
  return <LandingPageTemplate data={DATA} />;
}
