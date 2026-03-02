import React from "react";
import LandingPageTemplate from "../components/landing/LandingPageTemplate";

const DATA = {
  heroTitle: "Gold Coast Buyers Agent",
  heroSubtitle: "Coolangatta. Kirra. Rainbow Bay. 31% of deals never hit portals. We find what others miss.",

  marketStats: [
    { value: "$1.65M", label: "Median Price" },
    { value: "31%", label: "Off-Market" },
    { value: "580+", label: "Annual Sales" },
    { value: "54%", label: "Interstate Buyers" },
  ],

  infoSplits: [
    {
      title: "Why Buy on the Southern Gold Coast",
      description: "Village beaches, airport access, and genuine value against Byron. But don't mistake relaxed for easy. Quality stock is thin and the best homes rarely see a portal. Here's the current snapshot.",
      bullets: [
        "580+ houses transacted across the Southern Gold Coast in the last 12 months",
        "$1.65M median price across Coolangatta / Kirra / Rainbow Bay",
        "54% of buyers are interstate (Sydney/Melbourne downsizers)",
        "31% of transactions off-market before listing",
        "Stock 28% below five-year averages; cash buyers ~38%",
      ],
    },
    {
      title: "Why Use a Buyers Agent on the Gold Coast",
      description: "This corridor rewards precision and punishes blind spots. We solve for the details that derail interstate buyers and unlock homes that never hit the open market.",
      bullets: [
        "Strata complexity: building condition, special levies, sinking funds",
        "Flood and insurance mapping: premiums can swing outcomes by six figures",
        "Off-market access is critical. Best stock is placed, not advertised",
        "Interstate buyers miss micro-nuance between Coolangatta, Kirra and Rainbow Bay",
      ],
    },
  ],

  suburbs: ["Coolangatta", "Kirra", "Rainbow Bay", "Tugun", "Bilinga"],

  approach: {
    heading: "Our Approach on the Gold Coast",
    body: "We know which buildings have problems, which streets flood, and which agents call us first. That changes the deals you see and the price you pay.",
    bullets: [
      "Direct relationships across Southern Gold Coast agents",
      "Off-market pipeline: 73% of our deals via private networks",
      "Strata/building due diligence to avoid high-rise pitfalls",
      "Average negotiation result: 6.2% below asking (~$102k median saving)",
    ],
  },

  faqHeading: "Gold Coast FAQ",
  faqItems: [
    {
      question: "What is the median price on the Gold Coast?",
      bullets: ["Southern Gold Coast sits around $1.65M", "Range: Bilinga ~ $1.38M to Rainbow Bay beachfront ~ $2.3M"],
      answer: "The southern Gold Coast corridor sits around $1.65M as a median, but that varies significantly by suburb and proximity to the beach. Bilinga starts around $1.38M, Coolangatta is closer to $1.85M for houses, and Rainbow Bay beachfront can push above $2.3M. Units and apartments follow a different curve, particularly in high-rise pockets. We track every transaction across the corridor and can give you a realistic range based on what you're after.",
    },
    {
      question: "Is the Gold Coast cheaper than Byron Bay?",
      bullets: ["Yes: ~$1.65M vs Byron ~$2.45M (about 33% lower)", "Similar lifestyle with less competition and faster airport access"],
      answer: "Yes, roughly 33% cheaper. The southern Gold Coast median is around $1.65M versus Byron's $2.45M. You get similar beaches, a comparable lifestyle, and arguably better infrastructure: Gold Coast Airport is 10 minutes from Coolangatta, there are more dining and retail options, and you're within easy reach of Brisbane. Competition is also lower, with 2-3 bidders on most listings rather than Byron's 5+. For buyers who want the coastal lifestyle without the Byron premium, this corridor makes a strong case.",
    },
    {
      question: "Do I need a buyers agent on the Gold Coast?",
      bullets: ["About 31% of deals are off-market", "Strata and flood mapping require local expertise"],
      answer: "Around 31% of deals on the southern Gold Coast happen off-market, particularly beachside Coolangatta and Kirra where turnover is low and sellers rarely list publicly. Beyond access, there's real complexity here: strata buildings need careful due diligence on sinking funds, special levies, and building condition. Flood mapping affects insurance premiums in low-lying pockets. And the micro-differences between suburbs (Coolangatta village vs Kirra surf vs Rainbow Bay beachfront) can mean $200k-$400k in price variation over a few streets. A buyers agent helps you sort all of that before you commit.",
    },
    {
      question: "Best suburbs by budget?",
      bullets: ["Coolangatta ~ $1.85M (village vibe)", "Kirra ~ $2.1M (surf culture)", "Tugun ~ $1.45M (value)"],
      answer: "Tugun at around $1.45M is the value pick, with easy beach access, a local shopping strip, and a quieter residential feel. Coolangatta at roughly $1.85M gives you walkable village life, cafes, and a community that's held its character despite the growth around it. Kirra at about $2.1M is the premium surf suburb, with one of Australia's best point breaks and a tight-knit local culture. Bilinga at around $1.38M is often overlooked but sits right on the beach between the airport and Tugun.",
    },
    {
      question: "How competitive is it?",
      bullets: ["2-3 bidders vs Byron's 5+", "~54% interstate and ~38% cash buyers in premium pockets"],
      answer: "Less intense than Byron but more competitive than most buyers expect. Quality listings typically attract 2-3 serious bidders. In premium pockets like Kirra beachside or Rainbow Bay, that can climb higher. Around 54% of buyers are from interstate (mostly Sydney and Melbourne), and roughly 38% of transactions in the premium tier are cash, which means sellers often prefer clean, unconditional offers over higher prices with conditions. Having your finance pre-approved and a buyers agent who can move fast gives you a real edge.",
    },
    {
      question: "Key risks?",
      bullets: ["Flood/insurance in low-lying pockets", "Older towers with special levies; body corporate complexity"],
      answer: "The two biggest risks are flooding and strata. Low-lying areas in parts of Tugun and near Currumbin Creek carry elevated flood risk, which pushes insurance premiums up significantly. For apartments and units, older beachfront towers can have large special levies for repairs (think facade work, lift replacements, waterproofing), and body corporate complexity varies widely building to building. We review strata reports, sinking fund balances, and building inspection histories before recommending any unit. On houses, council overlays and proximity to flight paths (especially around Bilinga) are worth checking early.",
    },
    {
      question: "How long does buying take?",
      bullets: ["Average ~82 days on market", "Quality stock moves 30-45 days; off-market closes in 2-3 weeks"],
      answer: "The average time on market across the southern Gold Coast is around 82 days, but that figure includes overpriced listings that sit. Quality stock in desirable streets typically moves within 30-45 days, and off-market deals can close in 2-3 weeks if the buyer is ready. Our clients usually go from initial briefing to securing a property within 4-8 weeks, depending on how specific the search criteria are and what stock is available at the time.",
    },
  ],

  ctaHeading: "Buying on the Gold Coast? Talk to a local.",
  ctaButtonText: "Start a Conversation",

  localBusinessSchema: {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/gold-coast-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Gold Coast buyers agent specializing in Coolangatta, Kirra & Rainbow Bay. 31% of deals never hit portals. $1.65M median. Interstate buyers: we find, assess, secure.",
    areaServed: { "@type": "City", name: "Gold Coast" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  },
};

export default function GoldCoastBuyersAgent() {
  return <LandingPageTemplate data={DATA} />;
}
