import React from "react";
import AdLandingTemplate from "../components/landing/AdLandingTemplate";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";

/* ── Hardcoded fallbacks ── */
const FALLBACK = {
  seo: {
    metaTitle: "Gold Coast Buyers Agent | Coolangatta to Kirra | Compass",
    metaDescription: "Gold Coast buyers agent covering Coolangatta, Kirra and Rainbow Bay. $1.65M median. 31% of deals are off-market. Strata and flood expertise.",
  },
  hero: {
    title: "Gold Coast Buyers Agent",
    subtitle: "From Coolangatta and Kirra through to Rainbow Bay and the hinterland, we work the southern Gold Coast at street level. Off-market access, careful strata and flood due diligence, and a team that represents the buyer only.",
    ctaText: "Speak to an Agent",
  },
  stats: [
    { end: 80, label: "Years Team Experience" },
    { end: 3.6, prefix: "$", suffix: "B", decimals: 1, label: "In Transactions" },
    { end: 76, suffix: "%", label: "Off-Market Purchases" },
    { text: "#1", label: "Buyers Agency, Byron to Gold Coast" },
  ],
  acquisitions: {
    suburb: "Coolangatta",
    lga: "City of Gold Coast",
    eyebrow: "Recent Gold Coast acquisitions",
  },
  faqItems: [
    {
      question: "What is the median house price on the Gold Coast?",
      answer: "The southern Gold Coast corridor sits around $1.65M as a median, but that varies significantly by suburb. Bilinga starts around $1.38M, Coolangatta is closer to $1.85M for houses, and Rainbow Bay beachfront pushes above $2.3M. Kirra sits between those two at roughly $1.95M.",
    },
    {
      question: "Is the Gold Coast cheaper than Byron Bay?",
      answer: "Roughly 33% cheaper. The southern Gold Coast median is around $1.65M versus Byron's $2.45M. You get comparable beaches, arguably better infrastructure, and Gold Coast Airport is 10 minutes from Coolangatta. The trade-off is higher density and more development, but the southern corridor retains a village feel that the central Gold Coast lost years ago.",
    },
    {
      question: "Do I need a buyers agent on the Gold Coast?",
      answer: "Around 31% of deals happen off-market, particularly in beachside Coolangatta and Kirra. Strata buildings on the Gold Coast need careful due diligence: sinking funds, special levies, and building condition reports. Older beachfront towers are where the biggest traps sit. Flood mapping in low-lying pockets also affects insurance costs and resale.",
    },
    {
      question: "How much does a buyers agent cost on the Gold Coast?",
      answer: "Gold Coast buyers agents typically charge between 1.5% and 2.5% of the property price, or a fixed fee. The value comes from off-market access, negotiation savings, and catching strata issues that can cost six figures on older beachfront towers. At these price points, one avoided problem usually covers the fee.",
    },
    {
      question: "How competitive is the Gold Coast property market?",
      answer: "Quality listings typically attract 2-3 serious bidders. In premium pockets like Kirra beachside, that can climb to 4-5. Around 54% of buyers are interstate, and roughly 38% of premium transactions settle in cash. Cash buyers hold an edge over conditional offers, which means preparation and speed matter.",
    },
    {
      question: "What are the best suburbs on the southern Gold Coast?",
      answer: "Coolangatta offers strong lifestyle and value with Greenmount Beach, the airport, and a walkable town centre. Kirra is a tightly held surf pocket with consistent capital growth. Rainbow Bay is the premium end, anchored by Snapper Rocks. Tugun offers a quieter alternative at a lower entry point, roughly $1.2M median.",
    },
    {
      question: "Is the Gold Coast a good property investment?",
      answer: "The southern Gold Coast has delivered consistent growth driven by interstate migration, infrastructure investment, and limited beachfront supply. Rental demand is strong year-round. Short-term holiday rental returns can significantly boost yield where body corporate rules allow it, but check the by-laws before assuming holiday letting is permitted.",
    },
    {
      question: "What are the key risks when buying on the Gold Coast?",
      answer: "Flooding and strata are the two biggest risks. Low-lying areas in parts of Tugun carry elevated flood risk that affects insurance and resale. Older beachfront towers can have special levies running into six figures for concrete cancer or facade repairs. We review strata reports, sinking fund balances, and building histories before recommending any property.",
    },
    {
      question: "What is the difference between a buyers agent and a real estate agent on the Gold Coast?",
      answer: "A real estate agent works for the seller and is legally obligated to maximise the sale price. A buyers agent works exclusively for you. On the Gold Coast, that means accessing the 31% of properties that sell off-market, reviewing strata reports for hidden liabilities, and negotiating against cashed-up interstate competition. We never list or sell property.",
    },
    {
      question: "Can you find off-market properties on the Gold Coast?",
      answer: "Around 31% of our Gold Coast acquisitions were off-market or pre-market. We maintain relationships with selling agents across Coolangatta, Kirra, Rainbow Bay and Tugun who contact us before listing publicly. In beachside pockets where stock is limited, early access often determines whether you secure or miss out.",
    },
  ],
  cta: {
    heading: "Buying on the southern Gold Coast starts with a local conversation",
    supportingText: "Tell us what you're looking for and we'll be in touch within 24 hours. No pressure, just a clear conversation about how we can help.",
    buttonText: "Speak with the Team",
  },
};

export default function GoldCoastBuyersAgent() {
  const seo = FALLBACK.seo;
  const faq = FALLBACK.faqItems;
  const stats = FALLBACK.stats;
  const acq = FALLBACK.acquisitions;

  return (
    <>
      <SEOHead
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonicalPath="/gold-coast-buyers-agent"
      />
      <AdLandingTemplate
        hero={{
          title: FALLBACK.hero.title,
          subtitle: FALLBACK.hero.subtitle,
          ctaText: FALLBACK.hero.ctaText,
          ctaHref: createPageUrl("Contact"),
        }}
        stats={stats}
        acquisitions={{
          suburb: acq.suburb,
          lga: acq.lga,
          eyebrow: acq.eyebrow,
        }}
        faqItems={faq}
        imageBandSrc="/images/landing/gold-coast.jpg"
        imageBandAlt="Gold Coast southern coastline"
        cta={{
          heading: FALLBACK.cta.heading,
          supportingText: FALLBACK.cta.supportingText,
          buttonText: FALLBACK.cta.buttonText,
          buttonHref: createPageUrl("Contact"),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": "https://compassagency.com.au/#business",
            name: "Compass Buyers Agency",
            url: "https://compassagency.com.au/gold-coast-buyers-agent/",
            logo: "https://compassagency.com.au/logo.png",
            description: "Gold Coast buyers agent covering Coolangatta, Kirra and Rainbow Bay. Off-market access, strata due diligence and buyer-only representation.",
            telephone: "+61467634565",
            email: "hello@compassbuyersagency.com.au",
            areaServed: [
              { "@type": "City", name: "Coolangatta" },
              { "@type": "City", name: "Kirra" },
              { "@type": "City", name: "Rainbow Bay" },
              { "@type": "City", name: "Tugun" },
              { "@type": "City", name: "Bilinga" },
            ],
            priceRange: "$$",
          },
          {
            "@type": "Service",
            name: "Gold Coast Buyers Agent",
            description: "Buyers agent service specialising in Southern Gold Coast property. Off-market access, strata analysis, negotiation and due diligence across Coolangatta, Kirra and Rainbow Bay.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: { "@type": "City", name: "Gold Coast" },
            serviceType: "Buyers Agent",
          },
          {
            "@type": "FAQPage",
            mainEntity: faq.map(f => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ],
      }) }} />
    </>
  );
}
