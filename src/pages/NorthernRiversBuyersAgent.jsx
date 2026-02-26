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

export default function NorthernRiversBuyersAgent() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/northern-rivers-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Northern Rivers buyers agent covering Byron Bay, Brunswick Heads, Lennox Head, Ballina, Bangalow to the Tweed Coast. Regional median $1.65M. 400+ annual transactions.",
    areaServed: { "@type": "AdministrativeArea", name: "Northern Rivers" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  };

  return (
    <div className="overflow-hidden">
      <LandingHero
        title="Northern Rivers Buyers Agent"
        subtitle="Byron to Tweed specialists. 1,200+ annual transactions. Median $1.65M. We cover 15+ suburbs from $850k to $2.95M."
      />

      {/* Market Positioning */}
      <section className="py-8 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Why Northern Rivers</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Regional median around $1.65M (suburbs range ~$850k-$2.95M)</li>
            <li>1,200+ annual transactions across the region</li>
            <li>~58% interstate buyers sustain migration momentum</li>
            <li>Price tiers: Byron ~$2.45M; Tweed ~$1.65M-$2M; hinterland ~$1.2M-$1.8M</li>
            <li>Stock ~32% below pre-2020 levels</li>
          </ul>
        </div>
      </section>

      {/* Why Use a Buyers Agent Here */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Why Use a Buyers Agent Here</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Multi-suburb expertise to compare Byron vs Tweed vs hinterland value</li>
            <li>Off-market network across 40+ agent relationships</li>
            <li>Due diligence across Byron, Tweed and Ballina councils</li>
            <li>Help decide: pay Byron premium or choose a better-value alternative</li>
          </ul>
        </div>
      </section>

      {/* Suburbs We Cover */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Suburbs We Cover</h2>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div>
              <h3 className="font-semibold mb-1">Coastal</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=byron-bay`}>Byron Bay</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=suffolk-park`}>Suffolk Park</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=brunswick-heads`}>Brunswick Heads</a></li>
                <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=kingscliff`}>Kingscliff</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=cabarita`}>Cabarita</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=pottsville`}>Pottsville</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Hinterland</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=bangalow`}>Bangalow</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=federal`}>Federal</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=mullumbimby`}>Mullumbimby</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Inland</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=ballina`}>Ballina</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=lennox-head`}>Lennox Head</a>, <a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=alstonville`}>Alstonville</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Our Regional Approach</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Coverage from Byron to Tweed, coast to hinterland</li>
            <li>Multi-suburb comparisons to locate genuine value</li>
            <li>Off-market pipeline across 15+ suburbs</li>
            <li>Tailored negotiation: Byron minimal room, Ballina often 8-12% under ask</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-6 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-4">Northern Rivers FAQ</h2>
          <FAQAccordion
            items={[
              { question: "What is the regional median?", bullets: [
                "Around $1.65M overall",
                "Byron ~ $2.45M; Tweed ~ $1.65M-$2M; hinterland ~ $1.2M-$1.8M; inland ~ $850k-$1.15M",
              ]},
              { question: "Best value suburbs?", bullets: [
                "Pottsville ~ $1.65M (coastal)",
                "Bangalow ~ $1.85M (hinterland)",
                "Ballina ~ $1.15M (inland)",
              ]},
              { question: "Do I need a buyers agent here?", bullets: [
                "Region spans multiple councils and markets",
                "Off-market access and cross-shire diligence are essential",
              ]},
              { question: "Investment outlook?", bullets: [
                "Migration momentum strong; rental yields ~ 4-5%",
                "Demand driven by Sydney/Melbourne buyers and remote work",
              ]},
              { question: "Byron vs Tweed?", bullets: [
                "Byron: ~ $2.45M median and extreme competition",
                "Tweed: ~ $1.65M-$2M, about 35% cheaper with similar beaches",
              ]},
              { question: "How competitive is it overall?", bullets: [
                "Byron (5+ bidders), Tweed (2-3), hinterland (1-3), inland (minimal)",
                "Off-market access improves outcomes across tiers",
              ]},
              { question: "What are the risks?", bullets: [
                "Flood zones in low-lying areas",
                "Bushfire overlays; differing council rules",
                "Septic and water considerations on rural property",
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
        heading="Buying in the Northern Rivers?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the regional median price in Northern Rivers?", acceptedAnswer: { "@type": "Answer", text: "Around $1.65M overall. Byron approximately $2.45M, Tweed $1.65M-$2M, hinterland $1.2M-$1.8M, and inland $850k-$1.15M." }},
          { "@type": "Question", name: "Best value suburbs in Northern Rivers?", acceptedAnswer: { "@type": "Answer", text: "Pottsville approximately $1.65M for coastal, Bangalow approximately $1.85M for hinterland, and Ballina approximately $1.15M for inland." }},
          { "@type": "Question", name: "Do I need a buyers agent in the Northern Rivers?", acceptedAnswer: { "@type": "Answer", text: "The region spans multiple councils and markets. Off-market access and cross-shire diligence are essential." }},
          { "@type": "Question", name: "What is the investment outlook for Northern Rivers?", acceptedAnswer: { "@type": "Answer", text: "Migration momentum is strong with rental yields around 4-5%. Demand is driven by Sydney and Melbourne buyers and remote work." }},
          { "@type": "Question", name: "Byron Bay vs Tweed Coast - which is better value?", acceptedAnswer: { "@type": "Answer", text: "Byron has a median of approximately $2.45M with extreme competition. Tweed sits at $1.65M-$2M, about 35% cheaper with similar beaches." }},
          { "@type": "Question", name: "How competitive is the Northern Rivers property market?", acceptedAnswer: { "@type": "Answer", text: "Byron has 5+ bidders, Tweed 2-3, hinterland 1-3, and inland minimal competition. Off-market access improves outcomes across all tiers." }},
          { "@type": "Question", name: "What are the risks buying in the Northern Rivers?", acceptedAnswer: { "@type": "Answer", text: "Flood zones in low-lying areas, bushfire overlays, differing council rules, and septic and water considerations on rural property." }},
        ]
      }) }} />
    </div>
  );
}
