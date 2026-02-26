import React from "react";
import ShireOverview from "@/components/regions/ShireOverview";
import CTASection from "@/components/shared/CTASection.jsx";
import { createPageUrl } from "@/utils";

export default function Areas() {
  const shires = [
    {
      title: "Byron Shire",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
      suburbs: [
        { name: "Byron Bay", isLive: true, slug: "byron-bay-market-update" },
        { name: "Bangalow", isLive: false },
        { name: "Brunswick Heads", isLive: true, slug: "brunswick-heads-profile" },
        { name: "Mullumbimby", isLive: false },
        { name: "Suffolk Park", isLive: false },
        { name: "Ocean Shores", isLive: false }
      ]
    },
    {
      title: "Tweed Shire",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
      suburbs: [
        { name: "Kingscliff", isLive: false },
        { name: "Cabarita Beach", isLive: false },
        { name: "Casuarina", isLive: false },
        { name: "Pottsville", isLive: false },
        { name: "Tweed Heads", isLive: false },
        { name: "Murwillumbah", isLive: false }
      ]
    },
    {
      title: "Ballina Shire",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
      suburbs: [
        { name: "Ballina", isLive: false },
        { name: "Lennox Head", isLive: false },
        { name: "Alstonville", isLive: false },
        { name: "Wollongbar", isLive: false },
        { name: "Cumbalum", isLive: false },
        { name: "Skennars Head", isLive: false }
      ]
    },
    {
      title: "City of Gold Coast",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1974&auto=format&fit=crop",
      suburbs: [
        { name: "Currumbin", isLive: false },
        { name: "Palm Beach", isLive: false },
        { name: "Tallebudgera", isLive: false },
        { name: "Burleigh Heads", isLive: false },
        { name: "Miami", isLive: false },
        { name: "Mermaid Beach", isLive: false }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Centered hero */}
      <section className="py-12 bg-white">
        <div className="site-container">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mx-auto">
              Areas We Serve
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Compass Buyers Agency services buyers across Byron Shire, Tweed Shire, Ballina Shire and the City of Gold Coast. 
              We help you find and secure property in any of these suburbs.
            </p>
          </div>
        </div>
      </section>

      {/* Consolidated Shires Section */}
      <section className="py-6 bg-white">
        <div className="site-container">
          <ShireOverview shires={shires} />
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Ready to Find Your Property?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
      />
    </div>
  );
}
