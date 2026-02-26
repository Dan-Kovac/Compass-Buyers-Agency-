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

export default function BrunswickHeadsBuyersAgents() {
  return (
    <div className="overflow-hidden">
      <HomeHero
        title="Brunswick Heads Buyers’ Agents"
        subtitle="Independent buyer representation in Brunswick Heads. Access, research and negotiation for better outcomes."
      />
      <AboutExpertise />
      <ServicesAccordionShowcase />
      <RecentAcquisitionsStrip />
      <InvestmentAndRelationship />
      <TestimonialsPlaceholder />
      <Regions />
      <WhyStandOutGrid />
      <CTASection
        heading="Talk to a Brunswick Heads Buyers’ Agent"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
      />
    </div>
  );
}
