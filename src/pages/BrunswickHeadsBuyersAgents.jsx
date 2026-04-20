import React, { useState, useEffect } from "react";
import AdLandingTemplate from "../components/landing/AdLandingTemplate";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";
import { fetchLandingPage, resolveImageUrl } from "@/lib/sanityClient";

/* ── Hardcoded fallbacks ── */
const FALLBACK = {
  seo: {
    metaTitle: "Brunswick Heads Buyers Agent | Village Coastal | Compass",
    metaDescription: "Brunswick Heads buyers agent. Village atmosphere, river and beach access. Tight stock in a sub-2,000 population pocket north of Byron.",
  },
  hero: {
    title: "Brunswick Heads Buyers Agent",
    subtitle: "Village charm, river frontage, Byron Shire address. ~$2.1M median. Tight stock. 40+ agent relationships across the shire.",
    ctaText: "Speak to an Agent",
  },
  stats: [
    { end: 15, suffix: "+", label: "Brunswick Properties Secured" },
    { end: 39, suffix: "%", label: "Off-Market Deals" },
    { end: 15, suffix: "+", label: "Years Local Experience" },
    { end: 100, suffix: "%", label: "Buyer Focused" },
  ],
  acquisitions: {
    suburb: "Brunswick Heads",
    lga: "Byron Shire",
    eyebrow: "Recent Brunswick Heads acquisitions",
  },
  faqItems: [
    {
      question: "What is the median house price in Brunswick Heads?",
      answer: "Brunswick Heads village sits at approximately $2.1M for houses. Ocean Shores is around $1.55M, New Brighton around $1.75M, and South Golden Beach around $1.65M. River-frontage properties and character cottages on the heritage streets command a significant premium above the median.",
    },
    {
      question: "Is Brunswick Heads cheaper than Byron Bay?",
      answer: "Roughly 14% lower than Byron town's $2.45M median. You're in the same shire with access to the same schools and council services, but in a quieter village. The Brunswick River, Torakina Beach, and Hotel Brunswick give it a community feel that Byron has largely lost to tourism.",
    },
    {
      question: "Do I need a buyers agent in Brunswick Heads?",
      answer: "About 39% of sales in the broader Brunswick area happen off-market. Stock is extremely tight: only around 80 house sales per year across Brunswick Heads, Ocean Shores and South Golden Beach combined. Well-priced homes rarely last a week. Flood mapping and Byron Shire heritage overlays add layers of complexity that catch out unprepared buyers.",
    },
    {
      question: "How much does a buyers agent cost in Brunswick Heads?",
      answer: "Buyers agent fees in Brunswick Heads typically range from 1.5% to 2.5% of the property price. Given the tight stock levels and 39% off-market rate, professional representation often pays for itself through access alone. We also navigate flood certificates and heritage overlays that can complicate transactions.",
    },
    {
      question: "How competitive is the Brunswick Heads property market?",
      answer: "Expect 2-4 serious bidders on quality listings. Less intense than Byron town, but faster than most interstate buyers expect. River-frontage properties and village character cottages attract the strongest competition, often selling within days of listing. Preparation and speed are non-negotiable.",
    },
    {
      question: "Brunswick Heads or Ocean Shores: which is better?",
      answer: "Brunswick Heads village offers walkable cafes, the river, Torakina Beach, and a tight-knit community at around $2.1M. Ocean Shores is larger and more suburban, with bigger blocks at roughly $1.55M. Both sit in Byron Shire with access to the same schools and services. Brunswick has stronger capital growth; Ocean Shores offers more house for your money.",
    },
    {
      question: "Is Brunswick Heads a good property investment?",
      answer: "Brunswick Heads has shown strong capital growth driven by its Byron Shire address and extreme scarcity. Very few properties come to market each year, and growing appeal among families and lifestyle buyers seeking village living keeps upward pressure on prices. The supply constraint is structural, not cyclical.",
    },
    {
      question: "What are the key risks when buying in Brunswick Heads?",
      answer: "Flood risk is the main concern near the Brunswick River and in low-lying Ocean Shores pockets, affecting insurance premiums and resale values. Byron Shire DCP overlays and heritage considerations on older cottages can limit renovation scope. Some rural-residential blocks rely on septic systems that require council approval to upgrade.",
    },
    {
      question: "What is the difference between a buyers agent and a real estate agent in Brunswick Heads?",
      answer: "A real estate agent works for the seller and is legally obligated to maximise the sale price. A buyers agent works exclusively for you. In Brunswick Heads, that means accessing the 39% of properties that sell off-market, navigating flood risk and heritage overlays, and moving quickly in a market where only 80 houses trade per year. We never list or sell property.",
    },
    {
      question: "Can you find off-market properties in Brunswick Heads?",
      answer: "About 39% of sales in the broader Brunswick area happen off-market. Our relationships with agents across Byron Shire mean we're often contacted about properties before they're listed. In a market where only 80 houses sell per year, off-market access is often the difference between securing and missing out.",
    },
  ],
  cta: {
    heading: "Eighty houses a year. You need the right one.",
    buttonText: "Start a Conversation",
  },
};

export default function BrunswickHeadsBuyersAgents() {
  const [page, setPage] = useState(null);
  useEffect(() => {
    fetchLandingPage("brunswick-heads-buyers-agent").then(setPage).catch(() => {});
  }, []);

  const seo = page?.seo || FALLBACK.seo;
  const faq = page?.faqItems?.length ? page.faqItems : FALLBACK.faqItems;
  const stats = page?.marketStats?.length ? page.marketStats : FALLBACK.stats;
  const acq = page?.acquisitionFilter || FALLBACK.acquisitions;

  return (
    <>
      <SEOHead
        title={seo.metaTitle ?? FALLBACK.seo.metaTitle}
        description={seo.metaDescription ?? FALLBACK.seo.metaDescription}
        canonicalPath="/brunswick-heads-buyers-agent"
      />
      <AdLandingTemplate
        hero={{
          title: page?.heroTitle ?? FALLBACK.hero.title,
          subtitle: page?.heroSubtitle ?? FALLBACK.hero.subtitle,
          ctaText: page?.heroCtaText ?? FALLBACK.hero.ctaText,
          ctaHref: page?.heroCtaHref || createPageUrl("Contact"),
          backgroundVideoUrl: page?.heroBackgroundVideoUrl || undefined,
          backgroundImageUrl: page?.heroImage ? resolveImageUrl(page.heroImage, null, { width: 1920 }) : undefined,
        }}
        stats={stats}
        acquisitions={{
          suburb: acq.suburb ?? FALLBACK.acquisitions.suburb,
          lga: acq.lga ?? FALLBACK.acquisitions.lga,
          eyebrow: acq.eyebrow ?? FALLBACK.acquisitions.eyebrow,
        }}
        faqItems={faq}
        imageBandSrc={page?.imageBandImage ? resolveImageUrl(page.imageBandImage, null, { width: 2000 }) : "/images/areas/mid-band.jpg"}
        imageBandAlt={page?.imageBandAlt || "Brunswick Heads coastline"}
        cta={{
          heading: page?.ctaHeading ?? FALLBACK.cta.heading,
          buttonText: page?.ctaButtonText ?? FALLBACK.cta.buttonText,
          buttonHref: page?.ctaButtonHref || createPageUrl("Contact"),
        }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(
        page?.jsonLd ? JSON.parse(page.jsonLd) : {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "LocalBusiness",
            "@id": "https://compassagency.com.au/#business",
            name: "Compass Buyers Agency",
            url: "https://compassagency.com.au/brunswick-heads-buyers-agent/",
            logo: "https://compassagency.com.au/logo.png",
            description: "Brunswick Heads buyers agent covering Brunswick Heads, Ocean Shores, New Brighton and South Golden Beach. Off-market access, flood analysis and Byron Shire expertise.",
            telephone: "+61403536390",
            email: "hello@compassbuyersagency.com.au",
            areaServed: [
              { "@type": "City", name: "Brunswick Heads" },
              { "@type": "City", name: "Ocean Shores" },
              { "@type": "City", name: "New Brighton" },
              { "@type": "City", name: "South Golden Beach" },
              { "@type": "City", name: "Mullumbimby" },
            ],
            priceRange: "$$",
          },
          {
            "@type": "Service",
            name: "Brunswick Heads Buyers Agent",
            description: "Buyers agent service specialising in Brunswick Heads and surrounds. Off-market access, flood certificate analysis, negotiation and Byron Shire planning expertise.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: { "@type": "City", name: "Brunswick Heads" },
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
