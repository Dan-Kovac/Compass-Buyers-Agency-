import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Asset } from "@/entities/Asset";
import CTASection from "../components/shared/CTASection.jsx";
import ProcessSteps from "../components/services/ProcessSteps";
import FeatureSplit from "../components/about/FeatureSplit";
import ServiceStats from "../components/services/ServiceStats";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import SegmentsNav from "../components/who/SegmentsNav";
import SegmentSection from "../components/who/SegmentSection";
import Regions from "../components/home/Regions"; // New import

export default function Services() {
  const navigate = useNavigate();
  const [assetImages, setAssetImages] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      // Fetch up to 10 most recently updated assets. Adjust the limit if more images are needed.
      const list = await Asset.list("-updated_date", 10);
      const imgs = (list || []).filter((a) => a.type === "image" && a.url).map(a => a.url);
      setAssetImages(imgs);
    })();
  }, []);

  // Chip navigation for the four core services
  const segments = [
    { id: "full-advocacy", label: "Full‑service advocacy" },
    { id: "sourcing-research", label: "Sourcing & research" },
    { id: "auction-negotiation", label: "Auction & negotiation" },
    { id: "portfolio-strategy", label: "Portfolio strategy" },
  ];

  // Process data (kept from your original page)
  const processSteps = [
    { step: "1", title: "Discovery Call", description: "Start with a relaxed conversation about your goals and requirements and confirm we're a good fit to help." },
    { step: "2", title: "Strategy Session", description: "Align on outcomes, approach, timelines and process, setting a tailored plan for your buying journey." },
    { step: "3", title: "Property Search & Research", description: "Deep-dive suburb insights, off-market and pre-market access, and comprehensive market investigation." },
    { step: "4", title: "Property Inspections", description: "We inspect on your behalf and present aligned options, saving you time while surfacing the best opportunities." },
    { step: "5", title: "Negotiation & Auction Bidding", description: "We manage negotiations and auction strategy to secure favourable terms and protect your financial position." },
    { step: "6", title: "Contract to Settlement", description: "We coordinate with your solicitor and financier, attend pre-settlement and ensure nothing is missed." },
    { step: "7", title: "Post-Settlement Support", description: "Smooth transition with preferred providers and local connections to get you settled quickly." },
  ];

  return (
    <div className="bg-white">
      {/* Uniform hero */}
      <section className="py-12 bg-white">
        <div className="site-container">
          <div className="max-w-3xl mx-auto text-center" style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mx-auto">
              Buyers Agent Services
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Independent buyers advocacy tailored to your needs - from search and due diligence to auction strategy and portfolio planning.
            </p>
          </div>
        </div>
      </section>

      {/* Chip tabs (aligned to site container, smooth scroll already global) */}
      <div className="pb-4">
        <SegmentsNav segments={segments} />
      </div>

      {/* Sections in the same look/feel as “Who we work with” */}
      <SegmentSection
        id="full-advocacy"
        title="Full‑service buyers advocacy"
        intro="End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step."
        needs={[
          "Limited time to manage inspections and shortlists",
          "Competitive conditions and unclear value",
          "Complex negotiations, terms and risk",
        ]}
        howWeHelp={[
          "Brief, suburb selection and comparables to set a clear strategy",
          "Private and off‑market access via our local agent network",
          "Thorough due diligence and contract support to settlement",
        ]}
        image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/7ee9b92c9_CONTENTSHOOTJULY-20.jpg"
        imageAlt="Compass team members"
        imageLeft={false}
      />

      <SegmentSection
        id="sourcing-research"
        title="Sourcing & research"
        intro="We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly."
        needs={[
          "Time consuming search across suburbs and agents",
          "Missing pre‑market and off‑market opportunities",
          "Difficult to compare real value street‑by‑street",
        ]}
        howWeHelp={[
          "Proactive agent outreach and access before the portals",
          "Local insights and detailed property comparables",
          "Shortlists refined to your brief with clear trade‑offs",
        ]}
        image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/d62d38c74_CONTENTSHOOTJULY-16.jpg"
        imageAlt="Aerial view of Northern Rivers waterfront properties"
        imageLeft
      />

      <SegmentSection
        id="auction-negotiation"
        title="Auction bidding & negotiation"
        intro="Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations."
        needs={[
          "Unclear tactics and pricing at auction",
          "High‑pressure negotiations with vendors’ agents",
          "Risk of over‑paying or poor contract terms",
        ]}
        howWeHelp={[
          "Auction plan with price guardrails and scenarios",
          "Experienced on‑the‑day bidding and vendor negotiation",
          "Sharp negotiation on price and terms that protect you",
        ]}
        image={assetImages[2] || "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Auction planning and representation"
        imageLeft={false}
      />

      <SegmentSection
        id="portfolio-strategy"
        title="Portfolio strategy"
        intro="A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each acquisition."
        needs={[
          "Unsure how to balance yield vs growth",
          "Limited clarity on sequencing next purchases",
          "Hard to assess risk at suburb and property level",
        ]}
        howWeHelp={[
          "Tailored strategy aligned to goals and timeframe",
          "Modelled returns, rental demand and risk assessment",
          "Buy rules and review cadence to keep you on track",
        ]}
        image={assetImages[3] || "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop"}
        imageAlt="Portfolio planning session"
        imageLeft
      />

      {/* Value highlights */}
      <ServiceStats />

      {/* Areas we service - NEW */}
      <Regions />

      {/* Recent acquisitions */}
      <RecentAcquisitionsStrip bg="white" showEyebrow={false} title="Recent acquisitions" />

      {/* Process */}
      <ProcessSteps steps={processSteps} title="How We Work With You" />

      {/* Why choose us */}
      <FeatureSplit
        title="Why choose Compass?"
        description={`As locals and property professionals, we provide unique access to off‑market opportunities and pre‑market options that aren't published online. With 30+ years of combined experience, we simplify the buying process and protect your position at each step.`}
        image="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg"
        imageAlt="Compass advisor speaking with a client"
        imageLeft={false}
        mobileImageFirst={true}
        variant="white"
        ctaLabel="Learn more about us"
        ctaHref={createPageUrl("About")}
      />

      {/* Contact CTA */}
      <CTASection
        heading="Ready to Start Your Property Journey?"
        buttonText="Get Started Today"
        onButtonClick={() => navigate(createPageUrl("Contact"))}
        supportingText="We're here to help you with your property purchase journey."
      />
    </div>
  );
}
