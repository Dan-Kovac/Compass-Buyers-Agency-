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
import Regions from "../components/home/Regions";
import { fetchPage } from "@/lib/sanityClient";

export default function Services() {
  const navigate = useNavigate();
  const [assetImages, setAssetImages] = React.useState([]);
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("servicesPage").then(setPage).catch(() => {});
  }, []);

  React.useEffect(() => {
    (async () => {
      const list = await Asset.list("-updated_date", 10);
      const imgs = (list || []).filter((a) => a.type === "image" && a.url).map(a => a.url);
      setAssetImages(imgs);
    })();
  }, []);

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

  const processSteps = (page?.processSteps && page.processSteps.length > 0)
    ? page.processSteps.map((s, i) => ({ step: String(i + 1), title: s.title, description: s.description }))
    : defaultProcessSteps;

  return (
    <div className="bg-white">
      <section className="py-12 bg-white">
        <div className="site-container">
          <div className="max-w-3xl mx-auto text-center" style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mx-auto">
              {page?.heading || "Buyers Agent Services"}
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              {page?.subtitle || "Independent buyers advocacy tailored to your needs - from search and due diligence to auction strategy and portfolio planning."}
            </p>
          </div>
        </div>
      </section>

      <div className="pb-4">
        <SegmentsNav segments={segments} />
      </div>

      <SegmentSection
        id="full-advocacy"
        title={page?.seg1Title || "Full\u2011service buyers advocacy"}
        intro={page?.seg1Intro || "End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step."}
        needs={page?.seg1Needs || [
          "Limited time to manage inspections and shortlists",
          "Competitive conditions and unclear value",
          "Complex negotiations, terms and risk",
        ]}
        howWeHelp={page?.seg1HowWeHelp || [
          "Brief, suburb selection and comparables to set a clear strategy",
          "Private and off\u2011market access via our local agent network",
          "Thorough due diligence and contract support to settlement",
        ]}
        image={page?.seg1ImageUrl || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/7ee9b92c9_CONTENTSHOOTJULY-20.jpg"}
        imageAlt={page?.seg1ImageAlt || "Compass team members"}
        imageLeft={false}
      />

      <SegmentSection
        id="sourcing-research"
        title={page?.seg2Title || "Sourcing & research"}
        intro={page?.seg2Intro || "We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly."}
        needs={page?.seg2Needs || [
          "Time consuming search across suburbs and agents",
          "Missing pre\u2011market and off\u2011market opportunities",
          "Difficult to compare real value street\u2011by\u2011street",
        ]}
        howWeHelp={page?.seg2HowWeHelp || [
          "Proactive agent outreach and access before the portals",
          "Local insights and detailed property comparables",
          "Shortlists refined to your brief with clear trade\u2011offs",
        ]}
        image={page?.seg2ImageUrl || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/d62d38c74_CONTENTSHOOTJULY-16.jpg"}
        imageAlt={page?.seg2ImageAlt || "Aerial view of Northern Rivers waterfront properties"}
        imageLeft
      />

      <SegmentSection
        id="auction-negotiation"
        title={page?.seg3Title || "Auction bidding & negotiation"}
        intro={page?.seg3Intro || "Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations."}
        needs={page?.seg3Needs || [
          "Unclear tactics and pricing at auction",
          "High\u2011pressure negotiations with vendors' agents",
          "Risk of over\u2011paying or poor contract terms",
        ]}
        howWeHelp={page?.seg3HowWeHelp || [
          "Auction plan with price guardrails and scenarios",
          "Experienced on\u2011the\u2011day bidding and vendor negotiation",
          "Sharp negotiation on price and terms that protect you",
        ]}
        image={page?.seg3ImageUrl || assetImages[2] || "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"}
        imageAlt={page?.seg3ImageAlt || "Auction planning and representation"}
        imageLeft={false}
      />

      <SegmentSection
        id="portfolio-strategy"
        title={page?.seg4Title || "Portfolio strategy"}
        intro={page?.seg4Intro || "A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each acquisition."}
        needs={page?.seg4Needs || [
          "Unsure how to balance yield vs growth",
          "Limited clarity on sequencing next purchases",
          "Hard to assess risk at suburb and property level",
        ]}
        howWeHelp={page?.seg4HowWeHelp || [
          "Tailored strategy aligned to goals and timeframe",
          "Modelled returns, rental demand and risk assessment",
          "Buy rules and review cadence to keep you on track",
        ]}
        image={page?.seg4ImageUrl || assetImages[3] || "https://images.unsplash.com/photo-1502005229762-cf1b2da7c52f?q=80&w=1600&auto=format&fit=crop"}
        imageAlt={page?.seg4ImageAlt || "Portfolio planning session"}
        imageLeft
      />

      <ServiceStats />

      <Regions />

      <RecentAcquisitionsStrip bg="white" showEyebrow={false} title="Recent acquisitions" />

      <ProcessSteps steps={processSteps} title={page?.processTitle || "How We Work With You"} />

      <FeatureSplit
        title={page?.whyTitle || "Why choose Compass?"}
        description={page?.whyDescription || `As locals and property professionals, we provide unique access to off\u2011market opportunities and pre\u2011market options that aren't published online. With 30+ years of combined experience, we simplify the buying process and protect your position at each step.`}
        image={page?.whyImageUrl || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg"}
        imageAlt={page?.whyImageAlt || "Compass advisor speaking with a client"}
        imageLeft={false}
        mobileImageFirst={true}
        variant="white"
        ctaLabel={page?.whyCtaLabel || "Learn more about us"}
        ctaHref={createPageUrl("About")}
      />

      <CTASection
        heading={page?.ctaHeading || "Ready to Start Your Property Journey?"}
        buttonText={page?.ctaButtonText || "Get Started Today"}
        onButtonClick={() => navigate(createPageUrl("Contact"))}
        supportingText="We're here to help you with your property purchase journey."
      />
    </div>
  );
}
