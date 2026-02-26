import React from "react";
import SegmentsNav from "@/components/who/SegmentsNav";
import SegmentSection from "@/components/who/SegmentSection";
import CTASection from "@/components/shared/CTASection";
import { createPageUrl } from "@/utils";
import { Asset } from "@/entities/Asset";

export default function WhoWeWorkWith() {
  const segments = [
    { id: "first-home-buyers", label: "First Home Buyers" },
    { id: "downsizers", label: "Downsizers" },
    { id: "investors", label: "Property Investors" },
    { id: "interstate", label: "Interstate Buyers" },
    { id: "international", label: "International Buyers" },
    { id: "rural-acreage", label: "Rural & Acreage Buyers" },
    { id: "commercial", label: "Commercial Property Buyers" },
    { id: "developers", label: "Developers" },
    { id: "prestige", label: "Prestige Buyers" },
  ];
  const [assetImages, setAssetImages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const list = await Asset.list("-updated_date", 12); // Fetch up to 12 assets, ordered by updated_date descending
      const imgs = (list || []).filter((a) => a.type === "image" && a.url).map(a => a.url);
      setAssetImages(imgs);
    })();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="py-12 md:py-16 bg-white">
        <div className="site-container text-center">
          <div style={{ "--h1-mb": "8px", "--h1-mw": "100%" }}>
            <h1>Who We Work With</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From first‑home buyers to seasoned investors and relocators, we tailor our service to your goals,
            timelines and budget, giving you access, clarity and confidence throughout the process.
          </p>
        </div>
      </section>

      {/* Segments chip nav */}
      <div className="pb-4">
        <SegmentsNav segments={segments} />
      </div>

      {/* Sections */}
      <SegmentSection
        id="first-home-buyers"
        title="First Home Buyers"
        intro="Navigate your first purchase with a clear plan, off‑market access and help at every step."
        needs={[
          "Hard to know what's good value in fast‑moving markets",
          "Missing opportunities before inspection day",
          "Uncertainty around negotiations and contract terms",
        ]}
        howWeHelp={[
          "Brief, suburb selection and property comparables to set a clear strategy",
          "Private and off‑market access via our agent network",
          "End‑to‑end guidance from inspections to settlement",
        ]}
        image={assetImages[0] || "https://images.unsplash.com/photo-1512916206820-73b4f7ae252a?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Couple buying first home"
        imageLeft={false}
        squareImage
      />

      <SegmentSection
        id="downsizers"
        title="Downsizers"
        intro="Secure low‑maintenance, well‑located homes without compromise."
        needs={[
          "Finding quality, accessible homes near lifestyle essentials",
          "Avoiding renovation risk and hidden issues",
          "Selling and buying with minimal stress",
        ]}
        howWeHelp={[
          "Local shortlist focusing on amenity, access and liveability",
          "Thorough due diligence and building & pest coordination",
          "Negotiation of favourable terms and settlement flexibility",
        ]}
        image={assetImages[1] || "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Downsizers lifestyle"
        squareImage
      />

      <SegmentSection
        id="investors"
        title="Property Investors"
        intro="Data‑led purchases aligned to yield, growth and portfolio strategy."
        needs={[
          "Separating good deals from noise",
          "Understanding street‑level risks and overlays",
          "Securing assets before the wider market",
        ]}
        howWeHelp={[
          "Local insights and comparables beyond the portals",
          "Modelled returns, rental demand and risk assessment",
          "Access to pre‑market and off‑market opportunities",
        ]}
        image={assetImages[2] || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/4f242bdaa_CompassServices1.jpg"}
        imageAlt="Investor review"
        imageLeft
        squareImage
      />

      <SegmentSection
        id="interstate"
        title="Interstate Buyers"
        intro="Buy remotely with confidence. Inspections, due diligence and negotiations handled locally."
        needs={[
          "Inconsistent information when buying from afar",
          "Missing properties due to travel constraints",
          "Limited network for local services post‑purchase",
        ]}
        howWeHelp={[
          "FaceTime/recorded inspections and detailed reports",
          "On‑the‑ground access to pre‑market options",
          "Local network of trades and professionals to support your move",
        ]}
        image={assetImages[3] || "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Interstate move planning"
        squareImage
      />

      <SegmentSection
        id="international"
        title="International Buyers"
        intro="A seamless process across time zones, with careful compliance and representation."
        needs={[
          "Understanding FIRB and local regulations",
          "Finding the right home or investment from overseas",
          "Trusted local representation for inspections and negotiations",
        ]}
        howWeHelp={[
          "Clear guidance on requirements and timelines",
          "Curated options with video walkthroughs and analysis",
          "End‑to‑end coordination to settlement and beyond",
        ]}
        image={assetImages[4] || "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="International buyer support"
        imageLeft
        squareImage
      />

      <SegmentSection
        id="rural-acreage"
        title="Rural & Acreage Buyers"
        intro="Find your perfect lifestyle property with local knowledge of land, water and zoning."
        needs={[
          "Understanding water rights, soil quality and zoning restrictions",
          "Finding properties that match lifestyle goals and practical needs",
          "Navigating rural due diligence beyond standard building reports",
        ]}
        howWeHelp={[
          "Local expertise on rural markets, land values and property potential",
          "Coordination of specialist inspections for water, septic, fencing and infrastructure",
          "Access to off-market acreage and rural listings through our agent network",
        ]}
        image={assetImages[5] || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Rural acreage property"
        squareImage
      />

      <SegmentSection
        id="commercial"
        title="Commercial Property Buyers"
        intro="Strategic commercial property acquisition with market insight and rigorous analysis."
        needs={[
          "Limited transparency in commercial pricing and yields",
          "Complex lease structures and tenant risk assessment",
          "Finding properties that meet investment criteria",
        ]}
        howWeHelp={[
          "Commercial market analysis and comparable sales data",
          "Detailed lease review and tenant covenant assessment",
          "Negotiation expertise to secure favourable terms and pricing",
        ]}
        image={assetImages[6] || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Commercial property"
        imageLeft
        squareImage
      />

      <SegmentSection
        id="developers"
        title="Developers"
        intro="Site acquisition and feasibility support for residential and commercial development."
        needs={[
          "Identifying development sites with genuine potential",
          "Understanding planning controls, constraints and approval risk",
          "Securing sites at the right price to support project viability",
        ]}
        howWeHelp={[
          "Site sourcing with preliminary feasibility and planning assessment",
          "Network access to off-market development opportunities",
          "Expert negotiation to optimise acquisition price and contract terms",
        ]}
        image={assetImages[7] || "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Development site"
        squareImage
      />

      <SegmentSection
        id="prestige"
        title="Prestige Buyers"
        intro="Discreet acquisition of premium properties with uncompromising standards."
        needs={[
          "Access to exclusive, off-market and pre-market listings",
          "Privacy and discretion throughout the purchase process",
          "Expert assessment of quality, design and long-term value",
        ]}
        howWeHelp={[
          "Private access to prestige listings through our exclusive network",
          "Detailed property analysis and architect/builder referrals",
          "Confidential negotiation and seamless transaction management",
        ]}
        image={assetImages[8] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Prestige property"
        imageLeft
        squareImage
      />

      <CTASection
        heading="Ready to Get Started?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        eyebrow="Let's Talk About Your Goals"
      />
    </div>
  );
}
