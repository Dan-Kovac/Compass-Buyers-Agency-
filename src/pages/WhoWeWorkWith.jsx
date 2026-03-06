import React, { useState, useEffect } from "react";
import SegmentCardGrid from "@/components/who/SegmentCardGrid";
import SegmentSection from "@/components/who/SegmentSection";
import CTASection from "@/components/shared/CTASection";
import ImageBand from "@/components/shared/ImageBand";
import PullQuoteBreak from "@/components/shared/PullQuoteBreak";
import { createPageUrl } from "@/utils";
import { fetchPage, urlFor } from "@/lib/sanityClient";
import ScrollReveal from "@/components/shared/ScrollReveal";
import SEOHead from "../components/shared/SEOHead";

const fallbackSegments = [
  {
    id: "first-home-buyers",
    title: "First Home Buyers",
    intro: "Navigate your first purchase with a clear plan, off\u2011market access and help at every step.",
    needs: [
      "Hard to know what's good value in fast\u2011moving markets",
      "Missing opportunities before inspection day",
      "Uncertainty around negotiations and contract terms",
    ],
    howWeHelp: [
      "Brief, suburb selection and property comparables to set a clear strategy",
      "Private and off\u2011market access via our agent network",
      "End\u2011to\u2011end guidance from inspections to settlement",
    ],
    imageUrl: "https://images.unsplash.com/photo-1512916206820-73b4f7ae252a?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Couple buying first home",
  },
  {
    id: "downsizers",
    title: "Downsizers",
    intro: "Secure low\u2011maintenance, well\u2011located homes without compromise.",
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
    imageUrl: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Downsizers lifestyle",
  },
  {
    id: "prestige",
    title: "Prestige Buyers",
    intro: "Discreet, high\u2011touch representation for premium and luxury properties.",
    needs: [
      "Access to off\u2011market prestige stock before public listing",
      "Privacy throughout the search and negotiation process",
      "Expert assessment of build quality and long\u2011term value",
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
    intro: "Data\u2011led purchases aligned to yield, growth and portfolio strategy.",
    needs: [
      "Separating good deals from noise",
      "Understanding street\u2011level risks and overlays",
      "Securing assets before the wider market",
    ],
    howWeHelp: [
      "Local insights and comparables beyond the portals",
      "Modelled returns, rental demand and risk assessment",
      "Access to pre\u2011market and off\u2011market opportunities",
    ],
    imageUrl: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/4f242bdaa_CompassServices1.jpg",
    imageAlt: "Investor review",
  },
  {
    id: "interstate",
    title: "Interstate Buyers",
    intro: "Buy remotely with confidence. Inspections, due diligence and negotiations handled locally.",
    needs: [
      "Inconsistent information when buying from afar",
      "Missing properties due to travel constraints",
      "Limited network for local services post\u2011purchase",
    ],
    howWeHelp: [
      "FaceTime/recorded inspections and detailed reports",
      "On\u2011the\u2011ground access to pre\u2011market options",
      "Local network of trades and professionals to support your move",
    ],
    imageUrl: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Interstate move planning",
  },
  {
    id: "international",
    title: "International Buyers",
    intro: "A seamless process across time zones, with careful compliance and representation.",
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
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "International property buying",
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
    intro: "Strategic acquisition of commercial assets aligned to your investment goals.",
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
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Commercial property",
  },
];

/* Rendering order: 3 thematic trios (Lifestyle -> Remote/Investor -> Specialist) */
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

/* Background cycle per trio position */
const bgCycle = [
  /* Trio 1 */ "bg-white", "bg-sand-wash", "bg-white",
  /* Trio 2 */ "bg-sand-wash", "bg-white", "bg-sand-wash",
  /* Trio 3 */ "bg-white", "bg-sand-wash", "bg-white",
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

  /* If some segments weren't in the order array, append them */
  const orderedIds = new Set(segmentOrder);
  const extras = segments.filter((s) => !orderedIds.has(s.id));
  const allSegments = [...renderSegments, ...extras];

  /* Split into trios */
  const trio1 = allSegments.slice(0, 3);
  const trio2 = allSegments.slice(3, 6);
  const trio3 = allSegments.slice(6, 9);

  return (
    <div className="bg-white">
      <SEOHead
        title={page?.seo?.metaTitle || "Who We Work With | Compass Buyers Agency"}
        description={page?.seo?.metaDescription || "Whether you're a first home buyer, investor, downsizer or buying from interstate, Compass Buyers Agency tailors its approach to your situation."}
        ogImage={page?.seo?.ogImage ? urlFor(page.seo.ogImage).width(1200).url() : undefined}
        canonicalPath="/who-we-work-with"
      />

      {/* 1. Page Hero */}
      <section className="bg-warm-gradient page-header">
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Our Clients</p>
              <h1>
                {page?.heading || "Who We Work With"}
              </h1>
              <p className="intro-text" style={{ maxWidth: "48ch", margin: "1.25rem auto 0" }}>
                {page?.subtitle || "Every buyer is different. Whether you're chasing a sea change, growing a portfolio or buying from interstate, we shape our approach around you."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Segment Card Grid */}
      <SegmentCardGrid segments={allSegments} />

      {/* 3-5. Trio 1: Lifestyle Buyers */}
      {trio1.map((seg, i) => (
        <SegmentSection
          key={seg.id}
          id={seg.id}
          index={i}
          title={seg.title}
          intro={seg.intro}
          needs={seg.needs || []}
          howWeHelp={seg.howWeHelp || []}
          image={seg.imageUrl}
          imageAlt={seg.imageAlt}
          imageLeft={i % 2 === 1}
          squareImage
          bg={bgCycle[i]}
          showCta={false}
        />
      ))}

      {/* 6. Image Band Break 1 */}
      <ImageBand
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Byron Bay coastline at golden hour"
        height="320px"
        mobileHeight="200px"
        overlay
      />

      {/* 7-9. Trio 2: Remote & Investor Buyers */}
      {trio2.map((seg, i) => (
        <SegmentSection
          key={seg.id}
          id={seg.id}
          index={i + 3}
          title={seg.title}
          intro={seg.intro}
          needs={seg.needs || []}
          howWeHelp={seg.howWeHelp || []}
          image={seg.imageUrl}
          imageAlt={seg.imageAlt}
          imageLeft={i % 2 === 1}
          squareImage
          bg={bgCycle[i + 3]}
          showCta={false}
        />
      ))}

      {/* 10. Pull Quote Break */}
      <PullQuoteBreak
        quote={page?.pullQuote?.quote || "No two buyers are the same. We listen first, then build a plan that fits your life, not the other way around."}
        attribution={page?.pullQuote?.attribution || "Bryce Holdaway, Compass Buyers Agency"}
        bg="cream"
      />

      {/* 11-13. Trio 3: Specialist Buyers */}
      {trio3.map((seg, i) => (
        <SegmentSection
          key={seg.id}
          id={seg.id}
          index={i + 6}
          title={seg.title}
          intro={seg.intro}
          needs={seg.needs || []}
          howWeHelp={seg.howWeHelp || []}
          image={seg.imageUrl}
          imageAlt={seg.imageAlt}
          imageLeft={i % 2 === 1}
          squareImage
          bg={bgCycle[i + 6]}
          showCta={false}
        />
      ))}

      {/* 14. Image Band Break 2 */}
      <ImageBand
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
        alt="Luxury coastal property at dusk"
        height="280px"
        mobileHeight="180px"
        overlay
      />

      {/* 15. CTA */}
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
