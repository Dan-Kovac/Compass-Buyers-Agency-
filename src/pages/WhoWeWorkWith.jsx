import React, { useState, useEffect } from "react";
import SegmentCardGrid from "@/components/who/SegmentCardGrid";
import CTASection from "@/components/shared/CTASection";

import TestimonialSection from "@/components/shared/TestimonialSection";
import RecentAcquisitionsStrip from "@/components/home/RecentAcquisitionsStrip";
import { createPageUrl } from "@/utils";
import { fetchPage, urlFor } from "@/lib/sanityClient";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SEOHead from "../components/shared/SEOHead";

const fallbackSegments = [
  {
    id: "first-home-buyers",
    title: "First Home Buyers",
    intro: "Navigate your first buy with a clear plan, off-market access and help at every step.",
    needs: [
      "Hard to know what's good value in fast-moving markets",
      "Missing opportunities before inspection day",
      "Uncertainty around negotiations and contract terms",
    ],
    howWeHelp: [
      "Brief, suburb selection and property comparables to set a clear strategy",
      "Private and off-market access via our agent network",
      "End-to-end guidance from inspections to settlement",
    ],
    imageUrl: "https://images.unsplash.com/photo-1512916206820-73b4f7ae252a?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Couple buying first home",
  },
  {
    id: "downsizers",
    title: "Downsizers",
    intro: "Secure low-maintenance, well-located homes without compromise.",
    needs: [
      "Finding quality, accessible homes near lifestyle essentials",
      "Avoiding renovation risk and hidden issues",
      "Selling and buying with minimal stress",
    ],
    howWeHelp: [
      "Local shortlist focusing on amenity, access and liveability",
      "Thorough due diligence and building & pest coordination",
      "Negotiation of favourable terms and settlement flexibility",
    ],
    imageUrl: "/images/who-we-work-with/downsizers.jpg",
    imageAlt: "Modern low-maintenance townhouse development ideal for downsizers",
  },
  {
    id: "prestige",
    title: "Prestige Buyers",
    intro: "Discreet, high-touch representation for premium and luxury properties.",
    needs: [
      "Access to off-market prestige stock before public listing",
      "Privacy throughout the search and negotiation process",
      "Expert assessment of build quality and long-term value",
    ],
    howWeHelp: [
      "Confidential search with access to our private network",
      "Detailed due diligence on premium properties",
      "Skilled negotiation protecting your position and price",
    ],
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Luxury coastal property",
  },
  {
    id: "investors",
    title: "Property Investors",
    intro: "Data-led acquisitions aligned to yield, growth and portfolio strategy.",
    needs: [
      "Separating good deals from noise",
      "Understanding street-level risks and overlays",
      "Securing assets before the wider market",
    ],
    howWeHelp: [
      "Local insights and comparables beyond the portals",
      "Modelled returns, rental demand and risk assessment",
      "Access to pre-market and off-market opportunities",
    ],
    imageUrl: "/images/pages/who-we-work-with.jpg",
    imageAlt: "Investor review",
  },
  {
    id: "interstate",
    title: "Interstate Buyers",
    intro: "Buy remotely with confidence. Inspections, due diligence and negotiations handled locally.",
    needs: [
      "Inconsistent information when buying from afar",
      "Missing properties due to travel constraints",
      "Limited network for local services after settlement",
    ],
    howWeHelp: [
      "FaceTime/recorded inspections and detailed reports",
      "On-the-ground access to pre-market options",
      "Local network of trades and professionals to support your move",
    ],
    imageUrl: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Interstate move planning",
  },
  {
    id: "international",
    title: "International Buyers",
    intro: "Buy from overseas with local representation, FIRB compliance and inspections handled on the ground.",
    needs: [
      "Understanding FIRB and local regulations",
      "Finding the right home or investment from overseas",
      "Trusted local representation for inspections and negotiations",
    ],
    howWeHelp: [
      "FIRB guidance and regulatory compliance support",
      "Video inspections, detailed reports and local market context",
      "Full representation from search through to settlement",
    ],
    imageUrl: "/images/who-we-work-with/international-buyers.jpg",
    imageAlt: "Compass agent beside a Just Bought sign in Kingscliff",
  },
  {
    id: "rural-acreage",
    title: "Rural & Acreage Buyers",
    intro: "Find the right property beyond the suburbs, from lifestyle acreage to working farms.",
    needs: [
      "Assessing water, access, zoning and land capability",
      "Understanding rural-specific risks and overlays",
      "Finding properties that rarely appear on public portals",
    ],
    howWeHelp: [
      "On-ground inspections with local knowledge of rural areas",
      "Due diligence on water rights, easements and land use",
      "Connections with rural-specialist solicitors and surveyors",
    ],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Rural acreage property",
  },
  {
    id: "developers",
    title: "Developers",
    intro: "Site acquisition with feasibility analysis and local planning insight.",
    needs: [
      "Identifying sites with genuine development potential",
      "Navigating council planning and zoning complexities",
      "Securing sites at the right price before competition",
    ],
    howWeHelp: [
      "Local market intelligence on upcoming and off-market sites",
      "Preliminary feasibility and planning overlay assessment",
      "Negotiation and due diligence tailored to development timelines",
    ],
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Property development site",
  },
  {
    id: "commercial",
    title: "Commercial Property Buyers",
    intro: "Commercial property buying backed by lease analysis, yield modelling and local market knowledge.",
    needs: [
      "Finding quality commercial assets with strong tenants",
      "Understanding commercial lease terms and yield analysis",
      "Navigating different due diligence requirements vs residential",
    ],
    howWeHelp: [
      "Targeted search across retail, office and industrial sectors",
      "Lease analysis, tenant assessment and yield modelling",
      "Negotiation with commercial-specific terms and conditions",
    ],
    imageUrl: "/images/who-we-work-with/commercial-property-buyers.jpg",
    imageAlt: "Compass agent at a property inspection",
  },
];

const segmentOrder = [
  "first-home-buyers",
  "downsizers",
  "prestige",
  "interstate",
  "international",
  "investors",
  "rural-acreage",
  "developers",
  "commercial",
];

export default function WhoWeWorkWith() {
  const [page, setPage] = useState(null);
  const [segments, setSegments] = useState(fallbackSegments);

  useEffect(() => {
    fetchPage("whoWeWorkWithPage")
      .then((data) => {
        setPage(data);
        if (data?.segments && data.segments.length > 0) {
          setSegments(
            data.segments.map((s) => ({
              ...s,
              imageUrl: s.image ? urlFor(s.image).width(1600).url() : s.imageUrl,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  /* Sort segments into the defined order, falling back to original order */
  const renderSegments = segmentOrder
    .map((id) => segments.find((s) => s.id === id))
    .filter(Boolean);

  const orderedIds = new Set(segmentOrder);
  const extras = segments.filter((s) => !orderedIds.has(s.id));
  const allSegments = [...renderSegments, ...extras];

  return (
    <div className="bg-white">
      <SEOHead
        title={page?.seo?.metaTitle || "Who We Work With | First Home to Prestige | Compass"}
        description={page?.seo?.metaDescription || "Buyers agent for first home buyers, downsizers, investors, interstate movers and prestige buyers. Nine buyer segments, one process."}
        ogImage={page?.seo?.ogImage ? urlFor(page.seo.ogImage).width(1200).url() : undefined}
        canonicalPath="/who-we-work-with"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Who We Work With | Compass Buyers Agency",
            url: "https://compassagency.com.au/who-we-work-with",
            description: "Buyer segments served by Compass Buyers Agency, from first home buyers and downsizers through to investors, interstate movers and prestige buyers.",
            isPartOf: { "@type": "WebSite", name: "Compass Buyers Agency", url: "https://compassagency.com.au" },
            about: {
              "@type": "RealEstateAgent",
              name: "Compass Buyers Agency",
              url: "https://compassagency.com.au",
            },
          }),
        }}
      />

      {/* 1. Hero */}
      <section className="bg-warm-gradient page-header">
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Our Clients</p>
              <h1>
                {page?.heading || "Who We Work With"}
              </h1>
              <p className="intro-text" style={{ margin: "1.25rem auto 0" }}>
                {page?.subtitle || "Every buyer is different. Whether you're chasing a sea change, growing a portfolio or buying from interstate, we shape our approach around you."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Compact segment grid with inline expand */}
      <SegmentCardGrid segments={allSegments} />

      {/* 3. Testimonials */}
      <TestimonialSection
        heading="Trusted by Buyers Across the Region"
        subtitle="Hear from real buyers about their experience working with Compass."
      />

      {/* 5. Recent acquisitions */}
      <RecentAcquisitionsStrip
        limit={4}
        bg="white"
        title="Properties We've Secured"
      />

      {/* 6. CTA */}
      <CTASection
        heading={page?.cta?.heading || "Tell us what you're looking for"}
        supportingText={page?.cta?.supportingText || "Every search starts with a conversation. We'll listen to your goals and explain how we can help."}
        buttonText={page?.cta?.buttonText || "Start a Conversation"}
        buttonHref={createPageUrl("Contact")}
        variant="dark"
      />
    </div>
  );
}
