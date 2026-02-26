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

export default function ByronBay() {
  return (
    <div className="overflow-hidden">
      <HomeHero
        title="Byron Bay Property Specialists"
        subtitle="Local buyer advocacy for Byron Bay and surrounds. Research, access and negotiation to secure the right home."
      />
      <AboutExpertise />
      <ServicesAccordionShowcase />
      <RecentAcquisitionsStrip />
      <InvestmentAndRelationship />
      <TestimonialsPlaceholder />
      <Regions />
      <WhyStandOutGrid />
      <CTASection
        heading="Start your Byron Bay search with Compass"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />
    </div>
  );
}
