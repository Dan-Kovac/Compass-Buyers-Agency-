import React from "react";
import HomeHero from "@/components/home/HomeHero";
import TrustBar from "@/components/home/TrustBar";
import ServicesAccordionShowcase from "@/components/home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "@/components/home/RecentAcquisitionsStrip";
import TestimonialSection from "@/components/shared/TestimonialSection";
import GoogleReviewsStrip from "@/components/landing/GoogleReviewsStrip";
import TeamStrip from "@/components/landing/TeamStrip";
import HomeFAQ from "@/components/home/HomeFAQ";
import ImageBand from "@/components/shared/ImageBand";
import CTASection from "@/components/shared/CTASection";
import WhoWeHelpGrid from "@/components/shared/WhoWeHelpGrid";

/**
 * AdLandingTemplate — conversion-optimised landing page template for Google Ads.
 * 11 sections: Hero → TrustBar → Services → Testimonials → Who We Help →
 * Team → Acquisitions → Google Reviews → FAQ → ImageBand → CTA
 */
export default function AdLandingTemplate({
  hero,
  stats,
  faqItems,
  imageBandSrc,
  imageBandAlt,
  cta,
  acquisitions,
}) {
  return (
    <div className="overflow-hidden">
      {/* 1. Full-screen hero — localised title + single CTA */}
      <HomeHero
        title={hero.title}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText || "Speak to an Agent"}
        ctaHref={hero.ctaHref}
        backgroundVideoUrl={hero.backgroundVideoUrl || "/videos/compass-hero.mp4"}
        backgroundImageUrl={hero.backgroundImageUrl}
      />

      {/* 2. Trust stats — localised count-up */}
      <TrustBar stats={stats} />

      {/* 3. Services accordion — shared from homepage */}
      <ServicesAccordionShowcase />

      {/* 4. Video testimonials — key social proof, high on page */}
      <TestimonialSection />

      {/* 5. Who we help — editorial grid with CTAs */}
      <WhoWeHelpGrid />

      {/* 6. Team photo strip — trust signal */}
      <TeamStrip />

      {/* 7. Recent acquisitions — filtered to suburb/region */}
      <RecentAcquisitionsStrip
        title={acquisitions?.eyebrow || "Recent local acquisitions"}
        suburb={acquisitions?.suburb}
        lga={acquisitions?.lga}
        limit={4}
      />

      {/* 8. Google reviews — custom-built social proof */}
      <GoogleReviewsStrip />

      {/* 9. FAQ — localised questions */}
      {faqItems && faqItems.length > 0 && (
        <HomeFAQ
          heading="Frequently Asked Questions"
          faqItems={faqItems}
        />
      )}

      {/* 10. Atmospheric image band */}
      <ImageBand
        src={imageBandSrc || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"}
        alt={imageBandAlt || "Aerial view of Northern Rivers coastline"}
        height="340px"
        mobileHeight="220px"
        overlay
        parallax={true}
      />

      {/* 11. CTA — dark variant, localised heading */}
      <CTASection
        heading={cta.heading || "Let's find your property"}
        supportingText={cta.supportingText}
        buttonText={cta.buttonText || "Start a Conversation"}
        buttonHref={cta.buttonHref}
        variant="dark"
      />
    </div>
  );
}
