import React from "react";
import LandingPageTemplate from "../components/landing/LandingPageTemplate";

const DATA = {
  heroTitle: "Northern Rivers Buyers Agent",
  heroSubtitle: "Byron to Tweed specialists. 1,200+ annual transactions. Median $1.65M. We cover 15+ suburbs from $850k to $2.95M.",

  marketStats: [
    { value: "$1.65M", label: "Regional Median" },
    { value: "1,200+", label: "Annual Transactions" },
    { value: "58%", label: "Interstate Buyers" },
    { value: "15+", label: "Suburbs Covered" },
  ],

  infoSplits: [
    {
      title: "Why Northern Rivers",
      description: "From Byron's beachfront to Bangalow's hinterland to Ballina's river town charm, this region offers more variety than any single suburb. That's the opportunity and the challenge.",
      bullets: [
        "Regional median around $1.65M (suburbs range ~$850k-$2.95M)",
        "1,200+ annual transactions across the region",
        "~58% interstate buyers sustain migration momentum",
        "Price tiers: Byron ~$2.45M; Tweed ~$1.65M-$2M; hinterland ~$1.2M-$1.8M",
        "Stock ~32% below pre-2020 levels",
      ],
    },
    {
      title: "Why Use a Buyers Agent Here",
      description: "The Northern Rivers spans three shires, dozens of suburbs, and multiple market tiers. Having someone who knows all of them saves time, money, and mistakes.",
      bullets: [
        "Multi-suburb expertise to compare Byron vs Tweed vs hinterland value",
        "Off-market network across 40+ agent relationships",
        "Due diligence across Byron, Tweed and Ballina councils",
        "Help decide: pay Byron premium or choose a better-value alternative",
      ],
    },
  ],

  // Northern Rivers uses grouped suburb layout
  suburbGroups: [
    {
      heading: "Coastal",
      items: ["Byron Bay", "Suffolk Park", "Brunswick Heads", "Kingscliff", "Cabarita", "Pottsville"],
    },
    {
      heading: "Hinterland",
      items: ["Bangalow", "Federal", "Mullumbimby"],
    },
    {
      heading: "Inland",
      items: ["Ballina", "Lennox Head", "Alstonville"],
    },
  ],

  approach: {
    heading: "Our Regional Approach",
    body: "We don't just cover one suburb. We know the entire region, from Byron to Ballina to the Tweed, and we'll tell you honestly which area gives you the best outcome for your budget.",
    bullets: [
      "Coverage from Byron to Tweed, coast to hinterland",
      "Multi-suburb comparisons to locate genuine value",
      "Off-market pipeline across 15+ suburbs",
      "Tailored negotiation: Byron minimal room, Ballina often 8-12% under ask",
    ],
  },

  faqHeading: "Northern Rivers FAQ",
  faqItems: [
    {
      question: "What is the regional median?",
      bullets: ["Around $1.65M overall", "Byron ~ $2.45M; Tweed ~ $1.65M-$2M; hinterland ~ $1.2M-$1.8M; inland ~ $850k-$1.15M"],
      answer: "The Northern Rivers regional median sits around $1.65M, but the spread is wide. Byron town is closer to $2.95M, the Tweed Coast corridor ranges from $1.65M to $2M, hinterland towns like Bangalow and Federal sit between $1.2M and $1.85M, and inland centres like Ballina and Alstonville offer entry points from $850k to $1.15M. Understanding which tier matches your budget and lifestyle is the first step, and it's where we add the most value early on.",
    },
    {
      question: "Best value suburbs?",
      bullets: ["Pottsville ~ $1.65M (coastal)", "Bangalow ~ $1.85M (hinterland)", "Ballina ~ $1.15M (inland)"],
      answer: "Pottsville on the Tweed Coast sits around $1.65M and offers genuine coastal living with a family-friendly feel and less competition than Kingscliff. Bangalow in the hinterland is around $1.85M, with a village main street, Saturday markets, and strong creative community. Ballina at roughly $1.15M gives you river and beach access, a growing dining scene, and is one of the most undervalued towns in the region relative to its lifestyle. Lennox Head at around $1.75M is also worth considering for buyers who want surf, village, and proximity to Byron without the Byron price tag.",
    },
    {
      question: "Do I need a buyers agent here?",
      bullets: ["Region spans multiple councils and markets", "Off-market access and cross-shire diligence are essential"],
      answer: "The Northern Rivers spans three council areas (Byron, Ballina, Tweed), each with different planning rules, flood mapping, and development controls. A property that looks similar on paper can carry completely different risk profiles depending on which shire it falls in. Off-market deals account for a significant share of sales across the region, and our relationships with 40+ local agents give us access that online-only buyers simply don't have. If you're comparing across multiple suburbs or shires, a buyers agent saves you from expensive mistakes.",
    },
    {
      question: "Investment outlook?",
      bullets: ["Migration momentum strong; rental yields ~ 4-5%", "Demand driven by Sydney/Melbourne buyers and remote work"],
      answer: "Migration into the Northern Rivers remains strong, driven by remote work flexibility and lifestyle-motivated buyers from Sydney and Melbourne. Rental yields across the region sit around 4-5%, with higher yields in inland towns like Ballina and Alstonville and lower yields in premium coastal suburbs where capital growth is the main driver. Vacancy rates are extremely tight, particularly in Byron Shire where short-term rental regulations have limited supply. For investors, the key question is whether you're buying for yield, growth, or both, and that determines which suburb makes sense.",
    },
    {
      question: "Byron vs Tweed?",
      bullets: ["Byron: ~ $2.45M median and extreme competition", "Tweed: ~ $1.65M-$2M, about 35% cheaper with similar beaches"],
      answer: "Byron has the stronger brand and higher median (around $2.45M) but comes with extreme competition: 5+ bidders, 42% off-market, and very limited stock. The Tweed Coast (Kingscliff, Cabarita, Pottsville) is roughly 35% cheaper at $1.65M-$2M, with similar beach quality, better airport access, and 2-3 bidders instead of 5+. Many buyers start looking at Byron and end up on the Tweed once they compare what they get for the money. We cover both and give you an honest comparison based on your priorities.",
    },
    {
      question: "How competitive is it overall?",
      bullets: ["Byron (5+ bidders), Tweed (2-3), hinterland (1-3), inland (minimal)", "Off-market access improves outcomes across tiers"],
      answer: "Competition varies sharply by area. Byron town sees 5+ bidders on quality listings and is the most competitive market in the region. The Tweed Coast typically has 2-3 bidders. Hinterland towns like Bangalow and Mullumbimby see 1-3 depending on the property. Inland areas like Ballina and Alstonville have minimal competition on most listings. Off-market access improves outcomes across all tiers, but the advantage is most pronounced in Byron and Kingscliff where publicly listed stock attracts the most attention.",
    },
    {
      question: "What are the risks?",
      bullets: ["Flood zones in low-lying areas", "Bushfire overlays; differing council rules", "Septic and water considerations on rural property"],
      answer: "The Northern Rivers has three main risk categories. Flooding is the biggest: low-lying areas around the Brunswick River, Cudgen Creek, and parts of Ballina carry elevated risk, which affects insurance and resale value. Bushfire overlays apply to properties in Broken Head, parts of the hinterland, and rural blocks near national parks. For rural-residential properties, check whether you're on town water or relying on septic, bore water, and tanks, as these affect ongoing costs and what you can build. Each council has different rules, so due diligence needs to be shire-specific.",
    },
  ],

  ctaHeading: "Buying in the Northern Rivers?",
  ctaButtonText: "Start a Conversation",

  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/northern-rivers-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Northern Rivers buyers agent covering Byron Bay, Brunswick Heads, Lennox Head, Ballina, Bangalow to the Tweed Coast. Regional median $1.65M. 400+ annual transactions.",
    areaServed: { "@type": "AdministrativeArea", name: "Northern Rivers" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  },
};

export default function NorthernRiversBuyersAgent() {
  return <LandingPageTemplate data={DATA} />;
}
