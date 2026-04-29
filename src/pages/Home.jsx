import React from "react";
import HomeHero from "../components/home/HomeHero";
import TrustBar from "../components/home/TrustBar";
import ServicesAccordionShowcase from "../components/home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import InvestmentAndRelationship from "../components/home/InvestmentAndRelationship";
import Regions from "../components/home/Regions";
import CTASection from "../components/shared/CTASection.jsx";
import HomeFAQ from "../components/home/HomeFAQ";
import TestimonialSection from "../components/shared/TestimonialSection";
import ImageBand from "../components/shared/ImageBand";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";

export default function Home() {
  return (
    <div>
      <SEOHead
        title="Buyers Agent Byron Bay to Gold Coast | Compass"
        description="Byron Bay to Gold Coast buyers agent. $2.45M median Byron, $1.65M Tweed. 42% of our deals are off-market. We find, assess, negotiate."
        canonicalPath="/"
      />
      <HomeHero backgroundVideoUrl="/videos/compass-hero.mp4" />

      <TrustBar />

      <ServicesAccordionShowcase />

      <ImageBand
        src="/images/home/hinterland-morning.webp"
        alt="Northern Rivers hinterland at dawn"
        height="380px"
        mobileHeight="240px"
        parallax={true}
        overlay
      />

      <RecentAcquisitionsStrip />

      <TestimonialSection />

      <InvestmentAndRelationship />

      <Regions />

      <HomeFAQ />

      <CTASection
        heading="Let's find your property"
        buttonText="Start a Conversation"
        buttonHref={createPageUrl("Contact")}
        variant="dark"
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Compass Buyers Agency",
        "@id": "https://compassagency.com.au",
        url: "https://compassagency.com.au",
        logo: "https://compassagency.com.au/logo.png",
        image: "https://compassagency.com.au/og-image.png",
        description: "Independent buyers agent for Northern Rivers and Southern Gold Coast. Off-market access, local expertise, sharp negotiation.",
        telephone: "+61467634565",
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
