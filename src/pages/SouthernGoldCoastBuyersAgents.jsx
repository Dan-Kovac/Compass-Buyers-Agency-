import React from "react";
import AdLandingTemplate from "../components/landing/AdLandingTemplate";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";

/* ── Hardcoded fallbacks ── */
const FALLBACK = {
  seo: {
    metaTitle: "Southern Gold Coast Buyers Agent | Coolangatta to Tugun | Compass",
    metaDescription: "Southern Gold Coast buyers agent. Coolangatta, Kirra, Bilinga and Tugun. Airport corridor with village beaches and $1.38M-$2.1M range.",
  },
  hero: {
    title: "Southern Gold Coast Buyers Agent",
    subtitle: "Burleigh. Currumbin. Palm Beach. $1.85M median. 28% off-market. Interstate buyers account for 49% of sales.",
    ctaText: "Speak to an Agent",
  },
  stats: [
    { end: 20, suffix: "+", label: "Southern GC Properties Secured" },
    { end: 28, suffix: "%", label: "Off-Market Deals" },
    { end: 15, suffix: "+", label: "Years Local Experience" },
    { end: 100, suffix: "%", label: "Buyer Focused" },
  ],
  acquisitions: {
    suburb: "Burleigh Heads",
    lga: "City of Gold Coast",
    eyebrow: "Recent Southern Gold Coast acquisitions",
  },
  faqItems: [
    {
      question: "What is the median house price on the Southern Gold Coast?",
      answer: "Burleigh Heads leads the corridor at around $1.85M, driven by the James Street precinct and beachfront national park. Currumbin sits around $1.55M, Palm Beach roughly $1.45M, and Elanora at about $1.25M offers the strongest family value in the corridor.",
    },
    {
      question: "Is the Southern Gold Coast cheaper than Byron Bay?",
      answer: "Roughly 25% cheaper. Burleigh at $1.85M versus Byron at $2.45M delivers a significant saving while offering a premium beach lifestyle. The Southern Gold Coast has better infrastructure, more dining options, Gold Coast Airport nearby, and a wider range of property types from beachfront apartments to acreage.",
    },
    {
      question: "Do I need a buyers agent on the Southern Gold Coast?",
      answer: "Around 28% of deals are off-market, especially in beachside Burleigh. Strata complexity is a genuine trap on the Gold Coast: older beachfront towers can carry massive special levies and building defects that aren't obvious on inspection. We review strata reports, body corporate minutes, and building histories before recommending any property.",
    },
    {
      question: "How much does a buyers agent cost on the Southern Gold Coast?",
      answer: "Buyers agent fees on the Southern Gold Coast typically range from 1.5% to 2.5% of the property price. The value comes from catching strata issues that can cost six figures, accessing the 28% of stock that sells off-market, and negotiation savings that typically outweigh the fee.",
    },
    {
      question: "How competitive is the Southern Gold Coast market?",
      answer: "Quality Burleigh listings typically attract 3-4 serious bidders. Palm Beach and Currumbin are slightly less competitive at 2-3 bidders. Around 49% of buyers are interstate, and many settle in cash, which gives them an edge over conditional offers. Preparation and speed matter.",
    },
    {
      question: "What are the best suburbs on the Southern Gold Coast?",
      answer: "Burleigh Heads is the premium suburb with James Street dining, the national park, and strong walkability. Currumbin offers a quieter family feel with Currumbin Alley surf and rock pools at roughly $1.55M. Palm Beach has a growing cafe strip and beachside lifestyle at a lower entry point. Elanora suits families wanting space and value at around $1.25M.",
    },
    {
      question: "Is the Southern Gold Coast a good property investment?",
      answer: "Burleigh Heads has shown consistent above-average capital growth, driven by lifestyle appeal, limited beachfront supply, and the James Street precinct. House prices increased 7.8% year-on-year across the southern corridor. Currumbin and Palm Beach offer growth potential at lower entry points. Rental demand is strong year-round.",
    },
    {
      question: "What are the key risks when buying on the Southern Gold Coast?",
      answer: "Three main risks. Flood mapping in low-lying Palm Beach and near Currumbin Creek affects insurance and resale. Strata issues on older beachfront towers, with special levies sometimes running into six figures for concrete cancer or facade repairs. Airport flight path noise in some Bilinga and northern Palm Beach streets affects livability and resale.",
    },
    {
      question: "What is the difference between a buyers agent and a real estate agent on the Southern Gold Coast?",
      answer: "A real estate agent works for the seller and is legally obligated to maximise the sale price. A buyers agent works exclusively for you. On the Southern Gold Coast, that means accessing the 28% of properties that sell off-market, reviewing strata reports for hidden liabilities on beachfront towers, and navigating flood mapping in low-lying areas. We never list or sell property.",
    },
    {
      question: "Can you find off-market properties on the Southern Gold Coast?",
      answer: "Around 28% of our Southern Gold Coast acquisitions were off-market. We maintain relationships with selling agents across Burleigh Heads, Currumbin, Palm Beach and surrounding suburbs who contact us before listing publicly. In beachside pockets where stock moves quickly, this early access is critical.",
    },
  ],
  cta: {
    heading: "Burleigh to Palm Beach. Local knowledge, smarter decisions.",
    buttonText: "Start a Conversation",
  },
};

export default function SouthernGoldCoastBuyersAgents() {
  const seo = FALLBACK.seo;
  const faq = FALLBACK.faqItems;
  const stats = FALLBACK.stats;
  const acq = FALLBACK.acquisitions;

  return (
    <>
      <SEOHead
        title={seo.metaTitle}
        description={seo.metaDescription}
        canonicalPath="/southern-gold-coast-buyers-agent"
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
        imageBandSrc="/images/landing/southern-gold-coast.jpg"
        imageBandAlt="Southern Gold Coast coastline"
        cta={{
          heading: FALLBACK.cta.heading,
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
            url: "https://compassagency.com.au/southern-gold-coast-buyers-agent/",
            logo: "https://compassagency.com.au/logo.png",
            description: "Southern Gold Coast buyers agent covering Burleigh Heads, Currumbin, Palm Beach and Elanora. Off-market access, strata due diligence and buyer-only representation.",
            telephone: "+61467634565",
            email: "hello@compassbuyersagency.com.au",
            areaServed: [
              { "@type": "City", name: "Burleigh Heads" },
              { "@type": "City", name: "Currumbin" },
              { "@type": "City", name: "Palm Beach" },
              { "@type": "City", name: "Currumbin Valley" },
              { "@type": "City", name: "Elanora" },
            ],
            priceRange: "$$",
          },
          {
            "@type": "Service",
            name: "Southern Gold Coast Buyers Agent",
            description: "Buyers agent service specialising in Southern Gold Coast property. Off-market access, strata analysis, negotiation and due diligence across Burleigh, Currumbin and Palm Beach.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: { "@type": "City", name: "Southern Gold Coast" },
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
