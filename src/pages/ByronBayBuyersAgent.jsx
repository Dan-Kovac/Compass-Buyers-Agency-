import React, { useState, useEffect } from "react";
import AdLandingTemplate from "../components/landing/AdLandingTemplate";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";
import { fetchLandingPage, resolveImageUrl } from "@/lib/sanityClient";

/* ── Hardcoded fallbacks ── */
const FALLBACK = {
  seo: {
    metaTitle: "Byron Bay Buyers Agent | $2.45M Median | Compass",
    metaDescription: "Byron Bay buyers agent. $2.45M median, 5+ competing bidders, 42% never advertised. We find off-market homes from Suffolk Park to Bangalow.",
  },
  hero: {
    title: "Byron Bay Buyers Agent",
    subtitle: "Australia's toughest property market. $2.45M median. 5+ competing bidders. 42% never advertised. We know what you're up against.",
    ctaText: "Speak to an Agent",
  },
  stats: [
    { end: 35, suffix: "+", label: "Byron Properties Secured" },
    { end: 42, suffix: "%", label: "Off-Market Deals" },
    { end: 15, suffix: "+", label: "Years Local Experience" },
    { end: 100, suffix: "%", label: "Buyer Focused" },
  ],
  acquisitions: {
    suburb: "Byron Bay",
    lga: "Byron Shire",
    eyebrow: "Recent Byron Bay acquisitions",
  },
  faqItems: [
    {
      question: "What is the median house price in Byron Bay?",
      answer: "Byron Bay's postcode median sits around $2.45M, but that masks significant variation. Byron town itself is closer to $2.95M for a house. Suffolk Park trades around $2.38M, and Bangalow in the hinterland is closer to $1.85M. Beachfront or north-facing properties regularly exceed $5M.",
    },
    {
      question: "Is Byron Bay overpriced?",
      answer: "Byron trades at a 30-40% premium over comparable coastal towns like Noosa or Lennox Head. That premium reflects genuine scarcity: strict planning controls, limited developable land, and a global brand that sustains demand. Prices corrected roughly 12% from the 2022 peak and have since stabilised. Whether the premium suits your situation depends on your holding period and what you're buying for.",
    },
    {
      question: "Do I need a buyers agent in Byron Bay?",
      answer: "Around 42% of Byron properties sell off-market or before they're publicly listed. Quality listings attract 5+ competing bidders, and sellers hold significant leverage. Without established agent relationships and a disciplined bidding strategy, interstate buyers consistently overpay or miss out entirely.",
    },
    {
      question: "How much does a buyers agent cost in Byron Bay?",
      answer: "Buyers agent fees in Byron Bay typically range from 1.5% to 2.5% of the property price, or a fixed fee depending on the brief. At Byron's $2.45M median, negotiation savings and off-market access typically outweigh the fee. We also catch issues during due diligence - flood zones, planning restrictions, building defects - that can save six figures.",
    },
    {
      question: "How competitive is the Byron Bay property market?",
      answer: "Quality listings regularly attract 5+ serious bidders. Sellers know their leverage, and lowball offers are ignored. Properties that transact quickest are ones where the buyer moved within 24-48 hours of first inspection. Cash and unconditional offers dominate the premium end of the market.",
    },
    {
      question: "What are the best suburbs near Byron Bay to buy in?",
      answer: "Suffolk Park offers beachside living at roughly 15% below Byron town. Bangalow delivers a hinterland village feel with strong capital growth and Saturday markets. Brunswick Heads gives you river and beach access with a quieter pace at around $2.1M. Lennox Head, technically Ballina Shire, offers similar coastal lifestyle at roughly 50% of Byron prices.",
    },
    {
      question: "Is Byron Bay a good property investment?",
      answer: "Byron has delivered consistent long-term capital growth, driven by genuine scarcity, a global brand, and planning controls that restrict new supply. Gross rental yields sit around 2.5-3%, but short-term holiday rental returns run significantly higher where council permits allow. The primary driver here is capital growth, not yield.",
    },
    {
      question: "What are the key risks when buying in Byron Bay?",
      answer: "Flood zones affect Belongil and parts of Suffolk Park, where insurance costs blow out and resale is harder. Bushfire overlays apply around Broken Head. E4 environmental zoning restricts what you can build on rural-residential blocks. Septic and bore water apply on rural properties outside the reticulated network. We run flood certificates, council overlay checks, and building reports on every property before recommending it.",
    },
    {
      question: "What is the difference between a buyers agent and a real estate agent in Byron Bay?",
      answer: "A real estate agent works for the seller and is legally obligated to maximise the sale price. A buyers agent works exclusively for you. In Byron Bay, that means accessing the 42% of properties that sell off-market, navigating flood and planning overlays, and negotiating against multiple competing bidders. We never list or sell property, so there's zero conflict of interest.",
    },
    {
      question: "Can you find off-market properties in Byron Bay?",
      answer: "Around 42% of our Byron acquisitions were off-market or pre-market. We maintain relationships with 40+ local selling agents who contact us before listing properties publicly. In a market where quality stock moves within days, early access is often the difference between securing and missing out.",
    },
  ],
  cta: {
    heading: "Buying in Byron? Move fast, move smart.",
    buttonText: "Start a Conversation",
  },
};

export default function ByronBayBuyersAgent() {
  const [page, setPage] = useState(null);
  useEffect(() => {
    fetchLandingPage("byron-bay-buyers-agent").then(setPage).catch(() => {});
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
        canonicalPath="/byron-bay-buyers-agent"
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
        imageBandSrc={page?.imageBandImage ? resolveImageUrl(page.imageBandImage, null, { width: 2000 }) : "/images/landing/byron-bay.jpg"}
        imageBandAlt={page?.imageBandAlt || "Byron Bay coastline at golden hour"}
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
            url: "https://compassagency.com.au/byron-bay-buyers-agent/",
            logo: "https://compassagency.com.au/logo.png",
            description: "Byron Bay buyers agent. Off-market access, local due diligence and buyer-only representation across Byron Shire.",
            telephone: "+61467634565",
            email: "hello@compassbuyersagency.com.au",
            areaServed: [
              { "@type": "City", name: "Byron Bay" },
              { "@type": "City", name: "Suffolk Park" },
              { "@type": "City", name: "Bangalow" },
              { "@type": "City", name: "Brunswick Heads" },
            ],
            priceRange: "$$",
          },
          {
            "@type": "Service",
            name: "Byron Bay Buyers Agent",
            description: "Buyers agent service specialising in Byron Bay property. Off-market access, auction bidding, negotiation and due diligence across Byron Shire.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: { "@type": "City", name: "Byron Bay" },
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
