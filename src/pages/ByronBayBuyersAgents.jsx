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

export default function ByronBayBuyersAgents() {
  React.useEffect(() => {
    const target = createPageUrl("ByronBayBuyersAgent");
    if (typeof window !== "undefined") {
      window.location.replace(target);
    }
  }, []);

  return (
    <div className="site-container py-12">
      <h1>Redirecting…</h1>
      <p className="text-gray-600">Taking you to our updated Byron Bay Buyers Agent page.</p>
    </div>
  );
}
