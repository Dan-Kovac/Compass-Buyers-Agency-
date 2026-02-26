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

export default function SouthernGoldCoastBuyersAgents() {
  return (
    <div className="overflow-hidden">
      <HomeHero
        title="Southern Gold Coast Buyers’ Agents"
        subtitle="Trusted buyer advocacy across the Southern Gold Coast, from Currumbin to Burleigh and beyond."
      />
      <AboutExpertise />
      <ServicesAccordionShowcase />
      <RecentAcquisitionsStrip />
      <InvestmentAndRelationship />
      <TestimonialsPlaceholder />
      <Regions />
      <WhyStandOutGrid />
      <CTASection
        heading="Speak with a Southern Gold Coast Buyers’ Agent"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />
    </div>
  );
}
