import React from "react";
import { createPageUrl } from "@/utils";
import CTASection from "../components/shared/CTASection.jsx";
import ProcessSteps from "../components/services/ProcessSteps";
import ServiceStats from "../components/services/ServiceStats";
import SegmentsNav from "../components/who/SegmentsNav";
import SegmentSection from "../components/who/SegmentSection";
import ImageBand from "../components/shared/ImageBand";
import SEOHead from "../components/shared/SEOHead";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Services() {
  const segments = [
    { id: "full-advocacy", label: "Full-service advocacy" },
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

  const processSteps = defaultProcessSteps;

  return (
    <div className="bg-white">
      <SEOHead
        title="Buyers Agent Services | Search to Settlement | Compass"
        description="Full-service buyer advocacy from search to settlement. Property sourcing, auction bidding, negotiation and portfolio strategy across Northern Rivers and Gold Coast."
        canonicalPath="/services"
      />
      {/* Page header */}
      <section className="bg-warm-gradient page-header">
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Our Services</p>
              <h1>
                How We Help You Buy
              </h1>
              <p>
                From finding the right property to handing you the keys. We search, assess, negotiate and manage the process so you don't have to.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div style={{ paddingBottom: "var(--section-padding-compact)" }}>
        <SegmentsNav segments={segments} />
      </div>

      {/* Segment 1 — white, image right */}
      <SegmentSection
        id="full-advocacy"
        title="Full-service buyers advocacy"
        intro="End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step."
        needs={[
          "Limited time to manage inspections and shortlists",
          "Competitive conditions and unclear value",
          "Complex negotiations, terms and risk",
        ]}
        howWeHelp={[
          "Brief, suburb selection and comparables to set a clear strategy",
          "Private and off-market access via our local agent network",
          "Thorough due diligence and contract support to settlement",
        ]}
        image="/images/pages/services.jpg"
        imageAlt="Compass team members"
        imageLeft={false}
        bg="bg-white"
        index={0}
      />

      {/* Segment 2 — sand-wash, image left */}
      <SegmentSection
        id="sourcing-research"
        title="Sourcing & research"
        intro="We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly."
        needs={[
          "Time consuming search across suburbs and agents",
          "Missing pre-market and off-market opportunities",
          "Difficult to compare real value street-by-street",
        ]}
        howWeHelp={[
          "Proactive agent outreach and access before the portals",
          "Local insights and detailed property comparables",
          "Shortlists refined to your brief with clear trade-offs",
        ]}
        image="/images/services/portfolio-strategy.webp"
        imageAlt="Aerial view of Northern Rivers waterfront properties"
        imageLeft
        bg="bg-sand-wash"
        index={1}
      />

      {/* Dark stats break — contrast section between segment pairs */}
      <ServiceStats
        eyebrow="By the Numbers"
        bg="bg-editorial-dark"
        items={[
          { value: "70+", label: "Properties Secured" },
          { value: "42%", label: "Off-Market Deals" },
          { value: "~5.5%", label: "Avg. Saving Below Asking" },
          { value: "100%", label: "Buyer-Only Focus" },
        ]}
      />

      {/* Segment 3 — white, image right */}
      <SegmentSection
        id="auction-negotiation"
        title="Auction bidding & negotiation"
        intro="Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations."
        needs={[
          "Unclear tactics and pricing at auction",
          "High-pressure negotiations with vendors' agents",
          "Risk of over-paying or poor contract terms",
        ]}
        howWeHelp={[
          "Auction plan with price guardrails and scenarios",
          "Experienced on-the-day bidding and vendor negotiation",
          "Sharp negotiation on price and terms that protect you",
        ]}
        image="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop"
        imageAlt="Auction planning and representation"
        imageLeft={false}
        bg="bg-white"
        index={2}
      />

      {/* Segment 4 — sand-wash, image left */}
      <SegmentSection
        id="portfolio-strategy"
        title="Portfolio strategy"
        intro="A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each buy."
        needs={[
          "Unsure how to balance yield vs growth",
          "Limited clarity on sequencing your next buys",
          "Hard to assess risk at suburb and property level",
        ]}
        howWeHelp={[
          "Tailored strategy aligned to goals and timeframe",
          "Modelled returns, rental demand and risk assessment",
          "Buy rules and review cadence to keep you on track",
        ]}
        image="/images/services/portfolio-strategy.webp"
        imageAlt="Compass buyers agent on a call reviewing a portfolio strategy"
        imageLeft
        bg="bg-sand-wash"
        index={3}
      />

      {/* Image band — atmospheric break before process */}
      <ImageBand
        src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
        alt="Coastal property interior"
        height="280px"
        overlay
      />

      {/* Process steps — cream bg */}
      <ProcessSteps steps={processSteps} title="How We Work With You" />

      {/* CTA — dark variant */}
      <CTASection
        heading="Thinking about buying in the Northern Rivers or Gold Coast?"
        buttonText="Start a Conversation"
        buttonHref={createPageUrl("Contact")}
        supportingText="Free consultation. No obligation. We'll give you honest advice on your situation."
        variant="dark"
      />

      {/* ProfessionalService + Service JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "ProfessionalService",
            "@id": "https://compassagency.com.au/#business",
            name: "Compass Buyers Agency",
            url: "https://compassagency.com.au/services",
            description: "Full-service buyer advocacy from search to settlement. Property sourcing, auction bidding, negotiation and portfolio strategy across Northern Rivers and Gold Coast.",
            telephone: "+61467634565",
            email: "hello@compassbuyersagency.com.au",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Cabarita Beach",
              addressLocality: "Cabarita Beach",
              addressRegion: "NSW",
              postalCode: "2488",
              addressCountry: "AU",
            },
            areaServed: [
              { "@type": "City", name: "Byron Bay" },
              { "@type": "City", name: "Gold Coast" },
              { "@type": "City", name: "Tweed Heads" },
              { "@type": "AdministrativeArea", name: "Northern Rivers" },
            ],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Buyers Agency Services",
              itemListElement: [
                { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://compassagency.com.au/services#full-advocacy", name: "Full-Service Buyers Advocacy" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://compassagency.com.au/services#sourcing-research", name: "Sourcing and Research" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://compassagency.com.au/services#auction-negotiation", name: "Auction Bidding and Negotiation" } },
                { "@type": "Offer", itemOffered: { "@type": "Service", "@id": "https://compassagency.com.au/services#portfolio-strategy", name: "Portfolio Strategy" } },
              ],
            },
            priceRange: "$$",
          },
          {
            "@type": "Service",
            "@id": "https://compassagency.com.au/services#full-advocacy",
            name: "Full-Service Buyers Advocacy",
            description: "End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: [{ "@type": "City", name: "Byron Bay" }, { "@type": "City", name: "Gold Coast" }, { "@type": "AdministrativeArea", name: "Northern Rivers" }],
            serviceType: "Buyers Agent",
          },
          {
            "@type": "Service",
            "@id": "https://compassagency.com.au/services#sourcing-research",
            name: "Sourcing and Research",
            description: "We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: [{ "@type": "City", name: "Byron Bay" }, { "@type": "City", name: "Gold Coast" }, { "@type": "AdministrativeArea", name: "Northern Rivers" }],
            serviceType: "Property Sourcing",
          },
          {
            "@type": "Service",
            "@id": "https://compassagency.com.au/services#auction-negotiation",
            name: "Auction Bidding and Negotiation",
            description: "Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: [{ "@type": "City", name: "Byron Bay" }, { "@type": "City", name: "Gold Coast" }, { "@type": "AdministrativeArea", name: "Northern Rivers" }],
            serviceType: "Auction Bidding",
          },
          {
            "@type": "Service",
            "@id": "https://compassagency.com.au/services#portfolio-strategy",
            name: "Portfolio Strategy",
            description: "A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each buy.",
            provider: { "@id": "https://compassagency.com.au/#business" },
            areaServed: [{ "@type": "City", name: "Byron Bay" }, { "@type": "City", name: "Gold Coast" }, { "@type": "AdministrativeArea", name: "Northern Rivers" }],
            serviceType: "Investment Strategy",
          },
        ],
      }) }} />
    </div>
  );
}
