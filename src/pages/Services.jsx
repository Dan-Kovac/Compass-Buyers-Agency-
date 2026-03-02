import React from "react";
import { createPageUrl } from "@/utils";
import CTASection from "../components/shared/CTASection.jsx";
import ProcessSteps from "../components/services/ProcessSteps";
import FeatureSplit from "../components/about/FeatureSplit";
import ServiceStats from "../components/services/ServiceStats";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import SegmentsNav from "../components/who/SegmentsNav";
import SegmentSection from "../components/who/SegmentSection";
import Regions from "../components/home/Regions";
import ImageBand from "../components/shared/ImageBand";
import { fetchPage, urlFor } from "@/lib/sanityClient";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Services() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("servicesPage").then(setPage).catch(() => {});
  }, []);

  const seg = (i) => page?.segments?.[i];

  const segments = [
    { id: "full-advocacy", label: "Full\u2011service advocacy" },
    { id: "sourcing-research", label: "Sourcing & research" },
    { id: "auction-negotiation", label: "Auction & negotiation" },
    { id: "portfolio-strategy", label: "Portfolio strategy" },
  ];

  const defaultProcessSteps = [
    { step: "1", title: "Discovery Call", description: "Start with a relaxed conversation about your goals and requirements and confirm we're a good fit to help." },
    { step: "2", title: "Strategy Session", description: "Align on outcomes, approach, timelines and process, setting a tailored plan for your buying journey." },
    { step: "3", title: "Property Search & Research", description: "Deep-dive suburb insights, off-market and pre-market access, and comprehensive market investigation." },
    { step: "4", title: "Property Inspections", description: "We inspect on your behalf and present aligned options, saving you time while surfacing the best opportunities." },
    { step: "5", title: "Negotiation & Auction Bidding", description: "We manage negotiations and auction strategy to secure favourable terms and protect your financial position." },
    { step: "6", title: "Contract to Settlement", description: "We coordinate with your solicitor and financier, attend pre-settlement and ensure nothing is missed." },
    { step: "7", title: "Post-Settlement Support", description: "Smooth transition with preferred providers and local connections to get you settled quickly." },
  ];

  const processSteps = (page?.process?.steps && page.process.steps.length > 0)
    ? page.process.steps.map((s, i) => ({ step: s.stepNumber || String(i + 1), title: s.title, description: s.description }))
    : defaultProcessSteps;

  return (
    <div className="bg-white">
      {/* Page header */}
      <section className="bg-white" style={{ padding: "var(--section-standard) 0 var(--section-compact) 0" }}>
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Our Services</p>
              <h1>
                {page?.heading || "How We Help You Buy"}
              </h1>
              <p
                className="intro-text mx-auto"
              >
                {page?.subtitle || "From finding the right property to handing you the keys. We search, assess, negotiate and manage the process so you don't have to."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="pb-6">
        <SegmentsNav segments={segments} />
      </div>

      {/* Segment 1 — white */}
      <SegmentSection
        id="full-advocacy"
        title={seg(0)?.title || "Full\u2011service buyers advocacy"}
        intro={seg(0)?.intro || "End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step."}
        needs={seg(0)?.needs || [
          "Limited time to manage inspections and shortlists",
          "Competitive conditions and unclear value",
          "Complex negotiations, terms and risk",
        ]}
        howWeHelp={seg(0)?.howWeHelp || [
          "Brief, suburb selection and comparables to set a clear strategy",
          "Private and off\u2011market access via our local agent network",
          "Thorough due diligence and contract support to settlement",
        ]}
        image={seg(0)?.image ? urlFor(seg(0).image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/7ee9b92c9_CONTENTSHOOTJULY-20.jpg"}
        imageAlt={seg(0)?.imageAlt || "Compass team members"}
        imageLeft={false}
        bg="bg-white"
        index={0}
      />

      {/* Segment 2 — sand-wash */}
      <SegmentSection
        id="sourcing-research"
        title={seg(1)?.title || "Sourcing & research"}
        intro={seg(1)?.intro || "We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly."}
        needs={seg(1)?.needs || [
          "Time consuming search across suburbs and agents",
          "Missing pre\u2011market and off\u2011market opportunities",
          "Difficult to compare real value street\u2011by\u2011street",
        ]}
        howWeHelp={seg(1)?.howWeHelp || [
          "Proactive agent outreach and access before the portals",
          "Local insights and detailed property comparables",
          "Shortlists refined to your brief with clear trade\u2011offs",
        ]}
        image={seg(1)?.image ? urlFor(seg(1).image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/d62d38c74_CONTENTSHOOTJULY-16.jpg"}
        imageAlt={seg(1)?.imageAlt || "Aerial view of Northern Rivers waterfront properties"}
        imageLeft
        bg="bg-sand-wash"
        index={1}
      />

      {/* Image band — coastal interior, breaks the segment rhythm */}
      <ImageBand
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
        alt="Coastal property interior"
        height="240px"
        overlay
      />

      {/* Segment 3 — white */}
      <SegmentSection
        id="auction-negotiation"
        title={seg(2)?.title || "Auction bidding & negotiation"}
        intro={seg(2)?.intro || "Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations."}
        needs={seg(2)?.needs || [
          "Unclear tactics and pricing at auction",
          "High\u2011pressure negotiations with vendors' agents",
          "Risk of over\u2011paying or poor contract terms",
        ]}
        howWeHelp={seg(2)?.howWeHelp || [
          "Auction plan with price guardrails and scenarios",
          "Experienced on\u2011the\u2011day bidding and vendor negotiation",
          "Sharp negotiation on price and terms that protect you",
        ]}
        image={seg(2)?.image ? urlFor(seg(2).image).width(800).url() : "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"}
        imageAlt={seg(2)?.imageAlt || "Auction planning and representation"}
        imageLeft={false}
        bg="bg-white"
        index={2}
      />

      {/* Segment 4 — sea-wash for variety */}
      <SegmentSection
        id="portfolio-strategy"
        title={seg(3)?.title || "Portfolio strategy"}
        intro={seg(3)?.intro || "A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each buy."}
        needs={seg(3)?.needs || [
          "Unsure how to balance yield vs growth",
          "Limited clarity on sequencing next purchases",
          "Hard to assess risk at suburb and property level",
        ]}
        howWeHelp={seg(3)?.howWeHelp || [
          "Tailored strategy aligned to goals and timeframe",
          "Modelled returns, rental demand and risk assessment",
          "Buy rules and review cadence to keep you on track",
        ]}
        image={seg(3)?.image ? urlFor(seg(3).image).width(800).url() : "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop"}
        imageAlt={seg(3)?.imageAlt || "Portfolio planning session"}
        imageLeft
        bg="bg-sea-wash"
        index={3}
      />

      {/* Stats — dark contrast break */}
      <ServiceStats />

      {/* Process — cream bg */}
      <ProcessSteps steps={processSteps} title={page?.process?.heading || "How We Work With You"} />

      {/* Regions */}
      <Regions />

      {/* Recent acquisitions */}
      <RecentAcquisitionsStrip bg="white" showEyebrow={false} title="Recent acquisitions" />

      {/* Why choose us — sand variant FeatureSplit with eyebrow */}
      <FeatureSplit
        eyebrow="Why Compass"
        title={page?.whyChooseUs?.title || "Why choose Compass?"}
        description={page?.whyChooseUs?.description || `42% of our deals never hit the portals. We live on the Tweed Coast, inspect properties in person, and talk to local selling agents every week. That's how we find what others miss and negotiate harder than buyers can on their own.`}
        image={page?.whyChooseUs?.image ? urlFor(page.whyChooseUs.image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg"}
        imageAlt={page?.whyChooseUs?.imageAlt || "Compass advisor speaking with a client"}
        imageLeft={false}
        mobileImageFirst={true}
        variant="sand"
        ctaLabel="Learn more about us"
        ctaHref={createPageUrl("About")}
      />

      {/* CTA — warm variant (different from Home's dark) */}
      <CTASection
        heading={page?.cta?.heading || "Thinking about buying in the Northern Rivers or Gold Coast?"}
        buttonText={page?.cta?.buttonText || "Talk to Us"}
        buttonHref={createPageUrl("Contact")}
        supportingText="Free consultation. No obligation. We'll give you honest advice on your situation."
        variant="warm"
      />

      {/* ProfessionalService JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "Compass Buyers Agency",
        url: "https://compassagency.com.au/services",
        description: "Full-service buyer advocacy from search to settlement. Property sourcing, auction bidding, negotiation and portfolio strategy across Northern Rivers and Gold Coast.",
        telephone: "+61403536390",
        email: "hello@compassbuyersagency.com.au",
        areaServed: [
          { "@type": "City", name: "Byron Bay" },
          { "@type": "City", name: "Gold Coast" },
          { "@type": "City", name: "Tweed Heads" },
          { "@type": "AdministrativeArea", name: "Northern Rivers" },
        ],
        serviceType: ["Buyers Agent", "Property Sourcing", "Auction Bidding", "Negotiation"],
        priceRange: "$$",
      }) }} />
    </div>
  );
}
