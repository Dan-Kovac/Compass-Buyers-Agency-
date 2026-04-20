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
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";

/* ── Buyer segments — top 6 by strategic value ── */
const BUYER_SEGMENTS = [
  {
    title: "Prestige & Luxury",
    description: "Discreet access to premium and off-market properties across the region. When the stakes are measured in millions, you want someone who's done this before.",
  },
  {
    title: "Interstate Relocators",
    description: "Moving from Sydney or Melbourne and buying sight-unseen is daunting. We handle inspections, due diligence and local intelligence so you can buy with confidence.",
  },
  {
    title: "Property Developers",
    description: "Site acquisition, zoning analysis and competitive bidding strategy for development opportunities across the Northern Rivers and Gold Coast.",
  },
  {
    title: "Property Investors",
    description: "Data-led acquisitions aligned to yield, growth and portfolio strategy. Many of our investor clients come back for their second and third.",
  },
  {
    title: "Sea-Changers",
    description: "You're buying a lifestyle as much as a house. We help you find the right pocket, the right street and the right property to match how you want to live.",
  },
  {
    title: "Downsizers",
    description: "Selling the family home and making the biggest decision in decades. We make sure you get it right, without the stress.",
  },
];

/* ── Scroll-reveal hook ── */
function useReveal() {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

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
  const [whoRef, whoVisible] = useReveal();

  return (
    <div className="overflow-hidden">
      {/* 1. Full-screen hero — localised title + single CTA */}
      <HomeHero
        title={hero.title}
        subtitle={hero.subtitle}
        ctaText={hero.ctaText || "Speak to an Agent"}
        ctaHref={hero.ctaHref}
        backgroundVideoUrl={hero.backgroundVideoUrl || "/videos/COMPASS-WEBSITE-BANNER-CLEAN.mp4"}
        backgroundImageUrl={hero.backgroundImageUrl}
      />

      {/* 2. Trust stats — localised count-up */}
      <TrustBar stats={stats} />

      {/* 3. Services accordion — shared from homepage */}
      <ServicesAccordionShowcase />

      {/* 4. Video testimonials — key social proof, high on page */}
      <TestimonialSection />

      {/* 5. Who we help — editorial grid with CTAs */}
      <section
        ref={whoRef}
        style={{
          padding: "var(--section-padding) 0",
          background: "var(--ink)",
          color: "#fff",
        }}
      >
        <div className="site-container">
          {/* Section heading */}
          <div
            style={{
              maxWidth: "36rem",
              marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
              opacity: whoVisible ? 1 : 0,
              transform: whoVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1), transform 0.8s cubic-bezier(0.25,0.1,0.25,1)",
            }}
          >
            <p className="eyebrow-label" style={{ color: "var(--sea-breeze)" }}>Who We Help</p>
            <h2 style={{ color: "#fff", marginBottom: "0.75rem" }}>
              Trusted by every type of buyer
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.0625rem", lineHeight: 1.7, margin: 0 }}>
              From first conversations to settlement, we tailor our approach to how you buy, what you need and where you want to be.
            </p>
          </div>

          {/* ── 3x2 grid — equal cards ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            style={{ gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-card)", overflow: "hidden" }}
          >
            {BUYER_SEGMENTS.map((seg, i) => (
              <div
                key={seg.title}
                style={{
                  background: "var(--ink)",
                  padding: "clamp(1.5rem, 3vw, 2.25rem)",
                  opacity: whoVisible ? 1 : 0,
                  transform: whoVisible ? "translateY(0)" : "translateY(16px)",
                  transition: "opacity 0.7s cubic-bezier(0.25,0.1,0.25,1), transform 0.7s cubic-bezier(0.25,0.1,0.25,1)",
                  transitionDelay: whoVisible ? `${0.15 + i * 0.08}s` : "0s",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(1.125rem, 2vw, 1.25rem)",
                    fontWeight: 400,
                    color: "#fff",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {seg.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.55)",
                    margin: 0,
                  }}
                >
                  {seg.description}
                </p>
              </div>
            ))}
          </div>

          {/* ── CTAs ── */}
          <div
            className="flex flex-wrap items-center"
            style={{
              gap: "1rem",
              marginTop: "clamp(2rem, 4vw, 3rem)",
              opacity: whoVisible ? 1 : 0,
              transform: whoVisible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.6s, transform 0.8s cubic-bezier(0.25,0.1,0.25,1) 0.6s",
            }}
          >
            <Link
              to={createPageUrl("Contact")}
              className="btn-cta"
              style={{
                background: "#fff",
                color: "var(--ink)",
                border: "1px solid #fff",
              }}
            >
              Start a Conversation
            </Link>
            <Link
              to={createPageUrl("Services")}
              className="btn-cta"
              style={{
                background: "transparent",
                color: "rgba(255,255,255,0.7)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              }}
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

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
        buttonText={cta.buttonText || "Start a Conversation"}
        buttonHref={cta.buttonHref}
        variant="dark"
      />
    </div>
  );
}
