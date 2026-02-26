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

export default function GoldCoastBuyersAgent() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/gold-coast-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Gold Coast buyers agent specializing in Coolangatta, Kirra & Rainbow Bay. 31% of deals never hit portals. $1.65M median. Interstate buyers: we find, assess, secure.",
    areaServed: { "@type": "City", name: "Gold Coast" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  };

  return (
    <div className="overflow-hidden">
      <LandingHero
        title="Gold Coast Buyers Agent"
        subtitle="Coolangatta. Kirra. Rainbow Bay. 31% of deals never hit portals. We find what others miss."
      />

      {/* Market Positioning */}
      <section className="py-8 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Why Buy on the Southern Gold Coast</h2>
          <p className="text-gray-700 mb-4">Village beaches, airport access, and genuine value against Byron. But don’t mistake relaxed for easy-quality stock is thin and the best homes rarely see a portal. Here’s the current snapshot.</p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>580+ houses transacted across the Southern Gold Coast in the last 12 months</li>
            <li>$1.65M median price across Coolangatta / Kirra / Rainbow Bay</li>
            <li>54% of buyers are interstate (Sydney/Melbourne downsizers)</li>
            <li>31% of transactions off-market before listing</li>
            <li>Stock 28% below five-year averages; cash buyers ~38%</li>
          </ul>
        </div>
      </section>

      {/* Why Use a Buyers Agent Here */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Why Use a Buyers Agent on the Gold Coast</h2>
          <p className="text-gray-700 mb-4">This corridor rewards precision and punishes blind spots. We solve for the details that derail interstate buyers and unlock homes that never hit the open market.</p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Strata complexity: building condition, special levies, sinking funds</li>
            <li>Flood and insurance mapping: premiums can swing outcomes by six figures</li>
            <li>Off-market access is critical-best stock is placed, not advertised</li>
            <li>Interstate buyers miss micro-nuance between Coolangatta, Kirra and Rainbow Bay</li>
          </ul>
        </div>
      </section>

      {/* Suburbs We Cover */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Suburbs We Cover</h2>
          <p className="text-gray-700 mb-3">Focus suburbs on the Southern Gold Coast with direct links to our latest profiles and reports.</p>
          <ul className="grid sm:grid-cols-2 gap-y-2 list-disc ml-5 text-gray-700">
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=coolangatta`}>Coolangatta</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=kirra`}>Kirra</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=rainbow-bay`}>Rainbow Bay</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=tugun`}>Tugun</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=bilinga`}>Bilinga</a></li>
          </ul>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Our Approach on the Gold Coast</h2>
          <p className="text-gray-700 mb-4">Outcome-first advocacy designed for a competitive, strata-heavy market.</p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Direct relationships across Southern Gold Coast agents</li>
            <li>Off-market pipeline: 73% of our deals via private networks</li>
            <li>Strata/building due diligence to avoid high-rise pitfalls</li>
            <li>Average negotiation result: 6.2% below asking (~$102k median saving)</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-6 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-4">Gold Coast FAQ</h2>
          <FAQAccordion
            items={[
              { question: "What is the median price on the Gold Coast?", bullets: [
                "Southern Gold Coast sits around $1.65M",
                "Range: Bilinga ~ $1.38M to Rainbow Bay beachfront ~ $2.3M",
              ]},
              { question: "Is the Gold Coast cheaper than Byron Bay?", bullets: [
                "Yes: ~$1.65M vs Byron ~$2.45M (about 33% lower)",
                "Similar lifestyle with less competition and faster airport access",
              ]},
              { question: "Do I need a buyers agent on the Gold Coast?", bullets: [
                "About 31% of deals are off-market",
                "Strata and flood mapping require local expertise",
              ]},
              { question: "Best suburbs by budget?", bullets: [
                "Coolangatta ~ $1.85M (village vibe)",
                "Kirra ~ $2.1M (surf culture)",
                "Tugun ~ $1.45M (value)",
              ]},
              { question: "How competitive is it?", bullets: [
                "2-3 bidders vs Byron's 5+",
                "~54% interstate and ~38% cash buyers in premium pockets",
              ]},
              { question: "Key risks?", bullets: [
                "Flood/insurance in low-lying pockets",
                "Older towers with special levies; body corporate complexity",
              ]},
              { question: "How long does buying take?", bullets: [
                "Average ~82 days on market",
                "Quality stock moves 30-45 days; off-market closes in 2-3 weeks",
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
        heading="Ready to secure on the Gold Coast?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the median price on the Gold Coast?", acceptedAnswer: { "@type": "Answer", text: "Southern Gold Coast sits around $1.65M. Range from Bilinga at approximately $1.38M to Rainbow Bay beachfront at approximately $2.3M." }},
          { "@type": "Question", name: "Is the Gold Coast cheaper than Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Yes, approximately $1.65M versus Byron's $2.45M, about 33% lower. Similar lifestyle with less competition and faster airport access." }},
          { "@type": "Question", name: "Do I need a buyers agent on the Gold Coast?", acceptedAnswer: { "@type": "Answer", text: "About 31% of deals are off-market. Strata and flood mapping require local expertise." }},
          { "@type": "Question", name: "Best Gold Coast suburbs by budget?", acceptedAnswer: { "@type": "Answer", text: "Coolangatta approximately $1.85M for village vibe, Kirra approximately $2.1M for surf culture, and Tugun approximately $1.45M for value." }},
          { "@type": "Question", name: "How competitive is the Gold Coast market?", acceptedAnswer: { "@type": "Answer", text: "Typically 2-3 bidders versus Byron's 5+. Approximately 54% interstate and 38% cash buyers in premium pockets." }},
          { "@type": "Question", name: "What are key risks on the Gold Coast?", acceptedAnswer: { "@type": "Answer", text: "Flood and insurance mapping in low-lying pockets, and older towers with special levies and body corporate complexity." }},
          { "@type": "Question", name: "How long does buying on the Gold Coast take?", acceptedAnswer: { "@type": "Answer", text: "Average approximately 82 days on market. Quality stock moves in 30-45 days; off-market can close in 2-3 weeks." }},
        ]
      }) }} />
    </div>
  );
}
