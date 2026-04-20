import React, { useState, useEffect } from "react";
import AdLandingTemplate from "../components/landing/AdLandingTemplate";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";
import { fetchLandingPage, resolveImageUrl } from "@/lib/sanityClient";

/* ── Hardcoded fallbacks ── */
const FALLBACK = {
  seo: {
    metaTitle: "Northern Rivers Buyers Agent | Byron to Tweed | Compass",
    metaDescription: "Northern Rivers buyers agent from Byron to Tweed. Regional median $1.65M. 1,200+ annual transactions. 15+ suburbs, $850k to $2.95M.",
  },
  hero: {
    title: "Northern Rivers Buyers Agent",
    subtitle: "Byron to Tweed specialists. 1,200+ annual transactions. Median $1.65M. We cover 15+ suburbs from $850k to $2.95M.",
    ctaText: "Speak to an Agent",
  },
  stats: [
    { end: 70, suffix: "+", label: "Properties Secured" },
    { end: 150, prefix: "$", suffix: "M+", label: "In Property Value" },
    { end: 15, suffix: "+", label: "Years Experience" },
    { end: 100, suffix: "%", label: "Buyer Focused" },
  ],
  acquisitions: {
    eyebrow: "Recent Northern Rivers acquisitions",
  },
  faqItems: [
    {
      question: "What is the median house price in the Northern Rivers?",
      answer: "The Northern Rivers regional median sits around $1.65M, but the spread is wide. Byron town is closer to $2.95M. The Tweed Coast ranges from $1.65M to $2M. Hinterland towns sit between $1.2M and $1.85M. Inland centres like Lismore and Casino offer entry points from $550k to $850k.",
    },
    {
      question: "What are the best value suburbs in the Northern Rivers?",
      answer: "Pottsville on the Tweed Coast sits around $1.65M with genuine coastal living and less competition than Kingscliff. Bangalow in the hinterland is around $1.85M with a village main street and Saturday markets. Ballina at roughly $1.15M gives you river and beach access. It's one of the most undervalued towns in the region relative to its amenity.",
    },
    {
      question: "Do I need a buyers agent in the Northern Rivers?",
      answer: "The Northern Rivers spans three council areas: Byron, Ballina, and Tweed. Each has different planning rules, flood mapping, and development controls. Off-market deals are significant across the region, and navigating three sets of council regulations requires local knowledge that online research can't replicate.",
    },
    {
      question: "How much does a buyers agent cost in the Northern Rivers?",
      answer: "Buyers agent fees in the Northern Rivers typically range from 1.5% to 2.5% of the property price, or a fixed fee. The value comes from navigating three different council areas, accessing off-market stock, and avoiding costly issues like flood zones, planning restrictions, and building defects.",
    },
    {
      question: "Byron Bay or Tweed Coast: which is better value?",
      answer: "Byron has the stronger brand and higher median at around $2.45M, but extreme competition: 5+ bidders and very limited stock. The Tweed Coast is roughly 35% cheaper at $1.65M-$2M, with comparable beaches, better airport access, and 2-3 bidders instead of 5+. We cover both and can give you an honest side-by-side comparison based on your brief.",
    },
    {
      question: "Is the Northern Rivers a good property investment?",
      answer: "The Northern Rivers has delivered strong capital growth across most suburbs over the past decade, driven by lifestyle migration and supply constraints. Kingscliff grew 10.4%, Cabarita Beach 13.6%, and Bangalow has consistently outperformed Byron Shire averages. Risk varies significantly by suburb, so location selection is critical.",
    },
    {
      question: "What are the biggest risks when buying in the Northern Rivers?",
      answer: "Flooding is the biggest risk. Low-lying areas around the Brunswick River, Cudgen Creek, and parts of Ballina carry elevated flood risk that affects insurance and resale. Bushfire overlays apply near national parks. Rural properties need checks on water supply and septic systems. Each council has different rules, so due diligence needs to be shire-specific.",
    },
    {
      question: "What is the difference between a buyers agent and a real estate agent in the Northern Rivers?",
      answer: "A real estate agent works for the seller and is legally obligated to maximise the sale price. A buyers agent works exclusively for you. In the Northern Rivers, that means navigating three different council areas, accessing off-market stock across Byron, Ballina and Tweed shires, and managing flood and planning due diligence that varies suburb to suburb. We never list or sell property.",
    },
    {
      question: "Where should I buy in the Northern Rivers for families?",
      answer: "Bangalow has strong primary school options in Byron Shire with a village community feel at around $1.85M. Lennox Head in Ballina Shire offers excellent schools, beach access, and a family-friendly atmosphere at roughly half Byron prices. Pottsville on the Tweed Coast has larger blocks, good schools, and a relaxed coastal community at around $1.65M.",
    },
    {
      question: "Can you find off-market properties in the Northern Rivers?",
      answer: "A significant portion of sales across the Northern Rivers happen off-market, particularly in Byron, Kingscliff, and Bangalow. Our relationships with 40+ selling agents across three shires give our clients access to properties before they're publicly listed. In tight markets, this access consistently makes the difference.",
    },
  ],
  cta: {
    heading: "Three shires. Fifteen suburbs. One conversation.",
    buttonText: "Start a Conversation",
  },
};

export default function NorthernRiversBuyersAgent() {
  const [page, setPage] = useState(null);
  useEffect(() => {
    fetchLandingPage("northern-rivers-buyers-agent").then(setPage).catch(() => {});
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
        canonicalPath="/northern-rivers-buyers-agent"
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
        imageBandSrc={page?.imageBandImage ? resolveImageUrl(page.imageBandImage, null, { width: 2000 }) : "/images/areas/byron-shire.jpg"}
        imageBandAlt={page?.imageBandAlt || "Northern Rivers beach at dawn"}
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
            url: "https://compassagency.com.au/northern-rivers-buyers-agent/",
            logo: "https://compassagency.com.au/logo.png",
            description: "Northern Rivers buyers agent covering Byron Bay to the Tweed Coast. Off-market access, multi-shire due diligence and buyer-only representation across 15+ suburbs.",
            telephone: "+61403536390",
            email: "hello@compassbuyersagency.com.au",
            areaServed: [
              { "@type": "AdministrativeArea", name: "Northern Rivers" },
              { "@type": "City", name: "Byron Bay" },
              { "@type": "City", name: "Bangalow" },
              { "@type": "City", name: "Ballina" },
              { "@type": "City", name: "Lennox Head" },
              { "@type": "City", name: "Kingscliff" },
            ],
            priceRange: "$$",
          },
          {
            "@type": "Service",
            name: "Northern Rivers Buyers Agent",
            description: "Buyers agent service covering the Northern Rivers region from Byron Bay to the Tweed Coast. Multi-suburb comparisons, off-market access and cross-shire due diligence.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: { "@type": "AdministrativeArea", name: "Northern Rivers" },
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
