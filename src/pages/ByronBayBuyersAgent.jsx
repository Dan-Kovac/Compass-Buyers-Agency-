import React from "react";
import LandingHero from "../components/landing/LandingHero";
import AboutExpertise from "../components/home/AboutExpertise";
import ServicesAccordionShowcase from "../components/home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import TestimonialsPlaceholder from "../components/home/TestimonialsPlaceholder";
import Regions from "../components/home/Regions";
import WhyStandOutGrid from "../components/home/WhyStandOutGrid";
import CTASection from "../components/shared/CTASection.jsx";
import FAQAccordion from "../components/landing/FAQAccordion";
import InfoSplit from "../components/landing/InfoSplit";
import { createPageUrl } from "@/utils";

export default function ByronBayBuyersAgent() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/byron-bay-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Byron Bay buyers agent. $2.45M median, 67% interstate buyers, 5+ competing bidders. Off-market access and local diligence across Byron Shire.",
    areaServed: { "@type": "City", name: "Byron Bay" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  };

  return (
    <div className="overflow-hidden">
      <LandingHero
        title="Byron Bay Buyers Agent"
        subtitle="Australia's toughest property market. $2.45M median. 5+ competing bidders. 42% never advertised. We know what you're up against."
      />

      {/* Market Positioning */}
      <InfoSplit
        title="Byron Market Reality Check"
        description="Seller leverage, low stock and whisper listings define Byron. The market rewards speed and punishes hesitation."
        bullets={[
          "About 400 houses sold last year at ~ $2.45M median",
          "~67% interstate buyers drive competition",
          "Median ~66 days on market; quality trades under 30",
          "~42% of sales are off-market via agent networks",
          "Expect 5+ bidders on desirable listings",
        ]}
        imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
        imageAlt="Byron Bay coastline"
        imageSide="right"
      />

      {/* Why Use a Buyers Agent Here */}
      <InfoSplit
        title="Why Use a Buyers Agent in Byron"
        description="We compress timelines, widen access and protect you from costly traps unique to Byron."
        bullets={[
          "Seller leverage is extreme: low stock, high demand",
          "Best properties often trade before public listing",
          "Due diligence traps: flood, bushfire, septic, E4 zoning",
          "Emotional bidding inflates prices. Discipline matters",
          "Move within 24-48 hours or miss it",
        ]}
        imageUrl="https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2069&auto=format&fit=crop"
        imageAlt="Byron streets and coastline"
        imageSide="left"
      />

      {/* Suburbs We Cover */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Suburbs We Cover</h2>
          <ul className="grid sm:grid-cols-2 gap-y-2 list-disc ml-5 text-gray-700">
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=byron-bay`}>Byron Bay</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=suffolk-park`}>Suffolk Park</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=bangalow`}>Bangalow</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=brunswick-heads`}>Brunswick Heads</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=broken-head`}>Broken Head</a></li>
          </ul>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Our Approach in Byron</h2>
          <p className="text-gray-700 mb-4">Brutally honest advice, fast execution and deep diligence.</p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>15+ years of Byron agent relationships</li>
            <li>~58% of our Byron deals secured off-market</li>
            <li>Speed advantage: pre-approved clients move in 24-48 hours</li>
            <li>Strategic candour: we’ll tell you when to walk</li>
            <li>Due diligence depth: flood, bushfire, septic, bores</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-6 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-4">Byron Bay FAQ</h2>
          <FAQAccordion
            items={[
              { question: "What is the median price in Byron Bay?", bullets: [
                "Postcode median ~ $2.45M",
                "Byron town ~ $2.95M; Suffolk Park ~ $2.38M; Bangalow ~ $1.85M",
              ]},
              { question: "Is Byron Bay overpriced?", bullets: [
                "Trades 30-40% above comparable beach towns",
                "Premium driven by cultural capital and scarcity",
              ]},
              { question: "Do I need a buyers agent in Byron?", bullets: [
                "About 42% of sales are off-market",
                "5+ bidders common; relationships and disciplined negotiation are essential",
              ]},
              { question: "Best nearby alternatives?", bullets: [
                "Suffolk Park ~ 18% cheaper",
                "Bangalow ~ 25% cheaper",
                "Brunswick Heads ~ 14% cheaper",
              ]},
              { question: "How competitive is Byron?", bullets: [
                "Expect 5+ bidders on quality listings",
                "Sellers rarely counter low offers; speed and discipline decide outcomes",
              ]},
              { question: "What are key risks?", bullets: [
                "Flood zones: Belongil and parts of Suffolk",
                "Bushfire overlays: Broken Head",
                "E4 zoning limits, septic and water considerations on rural blocks",
              ]},
              { question: "Can I negotiate in Byron?", bullets: [
                "Limited room; sellers hold leverage",
                "First reasonable offer often wins",
              ]},
            ]}
          />
        </div>
      </section>
      <AboutExpertise />
      <ServicesAccordionShowcase />
      <RecentAcquisitionsStrip />
      <TestimonialsPlaceholder />
      <Regions />
      <WhyStandOutGrid />
      <CTASection
        heading="Buying in Byron? Move fast, move smart."
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the median price in Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Postcode median is approximately $2.45M. Byron town sits around $2.95M, Suffolk Park around $2.38M, and Bangalow around $1.85M." }},
          { "@type": "Question", name: "Is Byron Bay overpriced?", acceptedAnswer: { "@type": "Answer", text: "Byron trades 30-40% above comparable beach towns. The premium is driven by cultural capital and scarcity." }},
          { "@type": "Question", name: "Do I need a buyers agent in Byron?", acceptedAnswer: { "@type": "Answer", text: "About 42% of sales are off-market. With 5+ bidders common, relationships and disciplined negotiation are essential." }},
          { "@type": "Question", name: "Best nearby alternatives to Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Suffolk Park is approximately 18% cheaper, Bangalow approximately 25% cheaper, and Brunswick Heads approximately 14% cheaper." }},
          { "@type": "Question", name: "How competitive is Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Expect 5+ bidders on quality listings. Sellers rarely counter low offers; speed and discipline decide outcomes." }},
          { "@type": "Question", name: "What are key risks buying in Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Flood zones around Belongil and parts of Suffolk, bushfire overlays at Broken Head, and E4 zoning limits, septic and water considerations on rural blocks." }},
          { "@type": "Question", name: "Can I negotiate in Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Limited room as sellers hold leverage. First reasonable offer often wins." }},
        ]
      }) }} />
    </div>
  );
}
