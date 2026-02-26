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

export default function TweedHeadsBuyersAgent() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Compass Buyers Agency",
    "@id": "https://compassagency.com.au",
    url: "https://compassagency.com.au/tweed-heads-buyers-agent/",
    logo: "https://compassagency.com.au/logo.png",
    image: "https://compassagency.com.au/og-image.png",
    description: "Tweed Heads buyers agent covering the Tweed Coast corridor. Kingscliff median $2.015M (35% discount to Byron). 66 days on market. Stock 36% below five-year norms.",
    areaServed: { "@type": "City", name: "Tweed Heads" },
    serviceType: "Buyers Agent",
    priceRange: "$$",
  };

  return (
    <div className="overflow-hidden">
      <LandingHero
        title="Tweed Heads Buyers Agent"
        subtitle="Kingscliff. Cabarita. Pottsville. Same beaches as Byron, 35% cheaper. Stock 36% below five-year norms."
      />

      {/* Market Positioning */}
      <section className="py-8 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Why the Tweed Coast Works</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Kingscliff median ~$2.015M (≈35% discount to Byron Bay)</li>
            <li>Cabarita ~$1.85M, Pottsville ~$1.65M</li>
            <li>~52% interstate buyers</li>
            <li>~66 days on market; quality trades faster</li>
            <li>2-3 bidders vs Byron’s 5+ on comparable stock</li>
          </ul>
        </div>
      </section>

      {/* Why Use a Buyers Agent Here */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Why Use a Buyers Agent in Tweed</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Better value than Byron, but stock remains tight</li>
            <li>Off-market advantage (~38% of deals)</li>
            <li>Flood mapping critical (Cudgen Creek, low-lying pockets)</li>
            <li>Interstate buyers miss Tweed Shire nuance</li>
            <li>Council overlays add complexity</li>
          </ul>
        </div>
      </section>

      {/* Suburbs We Cover */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Suburbs We Cover</h2>
          <ul className="grid sm:grid-cols-2 gap-y-2 list-disc ml-5 text-gray-700">
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=kingscliff`}>Kingscliff</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=cabarita`}>Cabarita Beach</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=pottsville`}>Pottsville</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=banora-point`}>Banora Point</a></li>
            <li><a className="underline" href={`${createPageUrl("Blog")}?category=suburb-profiles&tag=tweed-heads`}>Tweed Heads</a></li>
          </ul>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-6 md:py-8 bg-white">
        <div className="site-container">
          <h2 className="mb-2">Our Approach on the Tweed Coast</h2>
          <p className="text-gray-700 mb-4">Local since 2010s-streets like Pearl St, Bellevue Pde and Salt Village aren’t just names in listings; they define outcomes.</p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>~38% of our Tweed deals are off-market</li>
            <li>Flood certificate analysis and council overlay familiarity</li>
            <li>Average negotiation result: ~5.8% under asking (~$117k median saving)</li>
            <li>Buy-side discipline to avoid over-paying in hype pockets</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-6 md:py-10 bg-white">
        <div className="site-container">
          <h2 className="mb-4">Tweed Heads FAQ</h2>
          <FAQAccordion
            items={[
              { question: "What is the median in Kingscliff?", bullets: [
                "Kingscliff ~ $2.015M",
                "Cabarita ~ $1.85M; Pottsville ~ $1.65M; Banora Point ~ $895k",
              ]},
              { question: "Is Kingscliff cheaper than Byron Bay?", bullets: [
                "Yes: about 35% cheaper",
                "Similar beaches; easier airport access (~15 minutes to OOL)",
              ]},
              { question: "Do I need a buyers agent in Tweed?", bullets: [
                "Around 38% of deals are off-market",
                "Stock ~36% below five-year norms; flood mapping and overlays are critical",
              ]},
              { question: "Best suburb on the Tweed Coast?", bullets: [
                "Kingscliff for amenity",
                "Cabarita for surf",
                "Pottsville for family value",
              ]},
              { question: "Key risks?", bullets: [
                "Flood zones near Cudgen Creek and low-lying Pottsville pockets",
                "Council overlays; limited premium-street stock",
              ]},
              { question: "Time to buy?", bullets: [
                "~66 days on market on average",
                "Quality stock moves 30-45 days; off-market can close in 2-3 weeks",
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
        heading="Buying on the Tweed Coast?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: "What is the median price in Kingscliff?", acceptedAnswer: { "@type": "Answer", text: "Kingscliff median is approximately $2.015M. Cabarita approximately $1.85M, Pottsville approximately $1.65M, and Banora Point approximately $895k." }},
          { "@type": "Question", name: "Is Kingscliff cheaper than Byron Bay?", acceptedAnswer: { "@type": "Answer", text: "Yes, about 35% cheaper with similar beaches and easier airport access, approximately 15 minutes to Gold Coast Airport." }},
          { "@type": "Question", name: "Do I need a buyers agent in Tweed Heads?", acceptedAnswer: { "@type": "Answer", text: "Around 38% of deals are off-market. Stock is approximately 36% below five-year norms, and flood mapping and overlays are critical." }},
          { "@type": "Question", name: "Best suburb on the Tweed Coast?", acceptedAnswer: { "@type": "Answer", text: "Kingscliff for amenity, Cabarita for surf, and Pottsville for family value." }},
          { "@type": "Question", name: "What are key risks buying in Tweed Heads?", acceptedAnswer: { "@type": "Answer", text: "Flood zones near Cudgen Creek and low-lying Pottsville pockets. Council overlays and limited premium-street stock." }},
          { "@type": "Question", name: "How long does it take to buy on the Tweed Coast?", acceptedAnswer: { "@type": "Answer", text: "Approximately 66 days on market on average. Quality stock moves in 30-45 days; off-market can close in 2-3 weeks." }},
        ]
      }) }} />
    </div>
  );
}
