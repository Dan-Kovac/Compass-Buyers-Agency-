import React from "react";
import SegmentsNav from "@/components/who/SegmentsNav";
import SegmentSection from "@/components/who/SegmentSection";
import CTASection from "@/components/shared/CTASection";
import { createPageUrl } from "@/utils";
import { fetchPage, urlFor } from "@/lib/sanityClient";
import ScrollReveal from "@/components/shared/ScrollReveal";

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
      "Clear guidance on requirements and timelines",
      "Curated options with video walkthroughs and analysis",
      "End\u2011to\u2011end coordination to settlement and beyond",
    ],
    imageUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "International buyer support",
  },
  {
    id: "rural-acreage",
    title: "Rural & Acreage Buyers",
    intro: "Find your perfect lifestyle property with local knowledge of land, water and zoning.",
    needs: [
      "Understanding water rights, soil quality and zoning restrictions",
      "Finding properties that match lifestyle goals and practical needs",
      "Navigating rural due diligence beyond standard building reports",
    ],
    howWeHelp: [
      "Local expertise on rural markets, land values and property potential",
      "Coordination of specialist inspections for water, septic, fencing and infrastructure",
      "Access to off-market acreage and rural listings through our agent network",
    ],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Rural acreage property",
  },
  {
    id: "commercial",
    title: "Commercial Property Buyers",
    intro: "Strategic commercial property buying backed by market insight and rigorous analysis.",
    needs: [
      "Limited transparency in commercial pricing and yields",
      "Complex lease structures and tenant risk assessment",
      "Finding properties that meet investment criteria",
    ],
    howWeHelp: [
      "Commercial market analysis and comparable sales data",
      "Detailed lease review and tenant covenant assessment",
      "Negotiation expertise to secure favourable terms and pricing",
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Commercial property",
  },
  {
    id: "developers",
    title: "Developers",
    intro: "Site sourcing and feasibility support for residential and commercial development.",
    needs: [
      "Identifying development sites with genuine potential",
      "Understanding planning controls, constraints and approval risk",
      "Securing sites at the right price to support project viability",
    ],
    howWeHelp: [
      "Site sourcing with preliminary feasibility and planning assessment",
      "Network access to off-market development opportunities",
      "Expert negotiation to secure the right price and contract terms",
    ],
    imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Development site",
  },
  {
    id: "prestige",
    title: "Prestige Buyers",
    intro: "Discreet sourcing and purchase of premium properties, handled with care.",
    needs: [
      "Access to exclusive, off-market and pre-market listings",
      "Privacy and discretion throughout the purchase process",
      "Expert assessment of quality, design and long-term value",
    ],
    howWeHelp: [
      "Private access to prestige listings through our exclusive network",
      "Detailed property analysis and architect/builder referrals",
      "Confidential negotiation and seamless transaction management",
    ],
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop",
    imageAlt: "Prestige property",
  },
];

/* Cycle through 4 background treatments for visual variety */
const bgCycle = ["bg-white", "bg-sand-wash", "bg-white", "bg-sea-wash"];

export default function WhoWeWorkWith() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("whoWeWorkWithPage").then(setPage).catch(() => {});
  }, []);

  const sanitySegments = page?.segments;
  const useSanity = sanitySegments?.length > 0;

  const navItems = useSanity
    ? sanitySegments.map((s) => ({ id: s.id?.current || "", label: s.title || "" }))
    : fallbackSegments.map((s) => ({ id: s.id, label: s.title }));

  const renderSegments = useSanity ? sanitySegments : fallbackSegments;

  return (
    <div className="bg-white">
      {/* Editorial page header */}
      <section
        className="bg-warm-gradient"
        style={{ padding: "var(--section-breathing-lg) 0 var(--section-standard-lg)" }}
      >
        <div className="site-container text-center">
          <ScrollReveal>
            <p className="eyebrow-label">Our Clients</p>
            <h1 className="mb-4">{page?.heading || "Who We Work With"}</h1>
            <p className="intro-text mx-auto" style={{ maxWidth: "36rem" }}>
              {page?.subtitle ||
                "Different goals need different approaches. Whether you're buying your first home, relocating interstate or building a portfolio, here's how we adapt."}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Segments chip nav */}
      <div className="pb-6">
        <SegmentsNav segments={navItems} />
      </div>

      {/* Sections — A/B layout variation with cycling backgrounds */}
      {renderSegments.map((seg, i) => {
        const id = useSanity ? (seg.id?.current || `segment-${i}`) : seg.id;
        const imageUrl = useSanity
          ? seg.image
            ? urlFor(seg.image).width(800).url()
            : undefined
          : seg.imageUrl;

        return (
          <SegmentSection
            key={id}
            id={id}
            title={seg.title}
            intro={seg.intro}
            needs={seg.needs || []}
            howWeHelp={seg.howWeHelp || []}
            image={imageUrl}
            imageAlt={seg.imageAlt}
            imageLeft={i > 0 && i % 2 === 0}
            squareImage
            bg={bgCycle[i % bgCycle.length]}
            index={i}
          />
        );
      })}

      {/* CTA */}
      <CTASection
        heading={page?.cta?.heading || "Tell us what you're looking for"}
        buttonText={page?.cta?.buttonText || "Start a Conversation"}
        buttonHref={createPageUrl("Contact")}
        variant="warm"
      />
    </div>
  );
}
