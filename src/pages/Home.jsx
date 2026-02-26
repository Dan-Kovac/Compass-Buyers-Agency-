import React from "react";
import HomeHero from "../components/home/HomeHero";
import AboutExpertise from "../components/home/AboutExpertise";
import ServicesAccordionShowcase from "../components/home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import InvestmentAndRelationship from "../components/home/InvestmentAndRelationship";
import WhyStandOutGrid from "../components/home/WhyStandOutGrid";
import Regions from "../components/home/Regions";
import TestimonialsPlaceholder from "../components/home/TestimonialsPlaceholder";
import CTASection from "../components/shared/CTASection.jsx";
import { createPageUrl } from "@/utils";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <HomeHero />
      <AboutExpertise />
      <ServicesAccordionShowcase />
      <RecentAcquisitionsStrip />
      <InvestmentAndRelationship />
      <TestimonialsPlaceholder />
      <Regions />
      <WhyStandOutGrid />
      <CTASection
        heading="Take the first step toward your Northern Rivers home with Compass"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />

      {/* Organization + LocalBusiness JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Compass Buyers Agency",
        "@id": "https://compassagency.com.au",
        url: "https://compassagency.com.au",
        logo: "https://compassagency.com.au/logo.png",
        image: "https://compassagency.com.au/og-image.png",
        description: "Independent buyers agent for Northern Rivers and Southern Gold Coast. Off-market access, local expertise, sharp negotiation.",
        telephone: "+61403536390",
        email: "hello@compassbuyersagency.com.au",
        areaServed: [
          { "@type": "City", name: "Byron Bay" },
          { "@type": "City", name: "Gold Coast" },
          { "@type": "City", name: "Tweed Heads" },
          { "@type": "AdministrativeArea", name: "Northern Rivers" }
        ],
        serviceType: "Buyers Agent",
        priceRange: "$$",
        sameAs: [
          "https://www.instagram.com/compassbuyersagency/",
          "https://www.facebook.com/compassbuyersagency/"
        ]
      }) }} />
    </div>
  );
}
