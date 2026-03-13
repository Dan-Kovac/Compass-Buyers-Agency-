import React, { useState, useEffect } from "react";
import AdLandingTemplate from "../components/landing/AdLandingTemplate";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";
import { fetchLandingPage, resolveImageUrl } from "@/lib/sanityClient";

/* ── Hardcoded fallbacks ── */
const FALLBACK = {
  seo: {
    metaTitle: "Tweed Heads Buyers Agent | 35% Below Byron | Compass",
    metaDescription: "Tweed Coast buyers agent. Kingscliff $2.015M, Cabarita $1.85M, Pottsville $1.65M. Same beaches as Byron, 35% cheaper. 38% off-market.",
  },
  hero: {
    title: "Tweed Heads Buyers Agent",
    subtitle: "Kingscliff. Cabarita. Pottsville. Same beaches as Byron, 35% cheaper. Stock 36% below five-year norms.",
    ctaText: "Speak to an Agent",
  },
  stats: [
    { end: 20, suffix: "+", label: "Tweed Properties Secured" },
    { end: 38, suffix: "%", label: "Off-Market Deals" },
    { end: 15, suffix: "+", label: "Years Local Experience" },
    { end: 100, suffix: "%", label: "Buyer Focused" },
  ],
  acquisitions: {
    suburb: "Kingscliff",
    lga: "Tweed Shire",
    eyebrow: "Recent Tweed Coast acquisitions",
  },
  faqItems: [
    {
      question: "What is the median house price in Kingscliff?",
      answer: "Kingscliff sits around $2.015M for houses, making it the premium suburb on the Tweed Coast. Cabarita Beach is close behind at roughly $1.85M, Pottsville around $1.65M, and Banora Point offers entry-level buying around $895k. Casuarina and Salt, the newer beachfront estates, trade closer to $2.5M.",
    },
    {
      question: "Is Kingscliff cheaper than Byron Bay?",
      answer: "About 35% cheaper on median. Kingscliff delivers a comparable beachside lifestyle to Byron, with better infrastructure, more restaurant options than most people expect, and Gold Coast Airport about 15 minutes away. The Salt Village dining precinct has shifted perceptions in recent years. For buyers priced out of Byron, the Tweed Coast is the strongest alternative.",
    },
    {
      question: "Do I need a buyers agent on the Tweed Coast?",
      answer: "Around 38% of sales happen off-market, particularly in Kingscliff and Cabarita where agents place properties through their networks before listing. Stock sits roughly 36% below five-year averages, so competition for quality homes is concentrated. Flood mapping near Cudgen Creek adds genuine complexity that most interstate buyers underestimate.",
    },
    {
      question: "How much does a buyers agent cost on the Tweed Coast?",
      answer: "Buyers agent fees on the Tweed Coast typically range from 1.5% to 2.5% of the property price. At Kingscliff price points, that investment is often recovered through negotiation savings and avoiding properties with hidden flood risk, council overlays, or building defects that aren't obvious on inspection.",
    },
    {
      question: "What is the best suburb on the Tweed Coast?",
      answer: "Kingscliff has the strongest amenity: cafes, restaurants, Salt Village, and a walkable town centre on the beach. Cabarita is quieter with arguably the best surf on the coast. Pottsville offers the strongest family value with larger blocks at roughly 20% below Kingscliff. Casuarina and Salt deliver newer beachfront homes at a premium.",
    },
    {
      question: "Is the Tweed Coast a good property investment?",
      answer: "The Tweed Coast has outperformed most regional NSW markets over the past decade. Kingscliff and Cabarita have shown exceptional growth at +10.4% and +13.6% respectively in recent reporting periods. Strong interstate migration, Gold Coast Airport proximity, and limited beachfront supply continue to drive demand.",
    },
    {
      question: "What are the key risks when buying on the Tweed Coast?",
      answer: "Flood mapping is the primary risk. Properties near Cudgen Creek and low-lying Pottsville pockets carry elevated flood risk, affecting insurance premiums and resale. Tweed Shire council overlays vary across suburbs and can restrict what you build or renovate. We run flood certificates and council overlay checks on every property.",
    },
    {
      question: "Kingscliff or Cabarita Beach: which is better?",
      answer: "Kingscliff suits buyers who want walkable village amenity, Salt Village dining, and a town-centre feel. Cabarita suits buyers who prioritise surf quality, quiet streets, and a less developed coastal atmosphere. Kingscliff has stronger rental yield; Cabarita has shown higher recent capital growth at 13.6% annually.",
    },
    {
      question: "What is the difference between a buyers agent and a real estate agent on the Tweed Coast?",
      answer: "A real estate agent works for the seller and is legally obligated to maximise the sale price. A buyers agent works exclusively for you. On the Tweed Coast, that means accessing the 38% of properties that sell off-market, analysing flood certificates and council overlays, and navigating a market where stock sits 36% below five-year norms. We never list or sell property.",
    },
    {
      question: "Can you find off-market properties on the Tweed Coast?",
      answer: "Around 38% of our Tweed Coast acquisitions were off-market or pre-market. We maintain relationships with selling agents across Kingscliff, Cabarita, Pottsville and Banora Point who contact us before listing publicly. In a market this tight, off-market access often determines whether you secure or miss out.",
    },
  ],
  cta: {
    heading: "The Tweed Coast rewards preparation. Start here.",
    buttonText: "Start a Conversation",
  },
};

export default function TweedHeadsBuyersAgent() {
  const [page, setPage] = useState(null);
  useEffect(() => {
    fetchLandingPage("tweed-heads-buyers-agent").then(setPage).catch(() => {});
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
        canonicalPath="/tweed-heads-buyers-agent"
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
        imageBandSrc={page?.imageBandImage ? resolveImageUrl(page.imageBandImage, null, { width: 2000 }) : undefined}
        imageBandAlt={page?.imageBandAlt || undefined}
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
            url: "https://compassagency.com.au/tweed-heads-buyers-agent/",
            logo: "https://compassagency.com.au/logo.png",
            description: "Tweed Heads buyers agent covering Kingscliff, Cabarita Beach and Pottsville. Off-market access, flood analysis and buyer-only representation.",
            telephone: "+61403536390",
            email: "hello@compassbuyersagency.com.au",
            areaServed: [
              { "@type": "City", name: "Kingscliff" },
              { "@type": "City", name: "Cabarita Beach" },
              { "@type": "City", name: "Pottsville" },
              { "@type": "City", name: "Banora Point" },
              { "@type": "City", name: "Tweed Heads" },
            ],
            priceRange: "$$",
          },
          {
            "@type": "Service",
            name: "Tweed Heads Buyers Agent",
            description: "Buyers agent service specialising in Tweed Coast property. Off-market access, flood certificate analysis, negotiation and due diligence across Kingscliff, Cabarita and Pottsville.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: { "@type": "City", name: "Tweed Heads" },
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
