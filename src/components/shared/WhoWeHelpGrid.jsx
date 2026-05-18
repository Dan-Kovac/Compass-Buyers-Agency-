import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const DEFAULT_SEGMENTS = [
  {
    title: "Prestige & Luxury",
    description: "Discreet access to premium and off-market properties across the region. Dealing in the luxury prestige sector requires decades of experience, strong commercial acumen and an intimate knowledge of navigating complex transactions.",
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

export default function WhoWeHelpGrid({
  eyebrow = "Who We Help",
  heading = "Bespoke and Personalised Service",
  intro = "From first conversations to settlement, we tailor our approach to how you buy, what you need and where you want to be.",
  segments = DEFAULT_SEGMENTS,
  primaryCta = { label: "Start a Conversation", href: createPageUrl("Contact") },
  secondaryCta = { label: "View All Services", href: createPageUrl("Services") },
}) {
  const [whoRef, whoVisible] = useReveal();

  return (
    <section
      ref={whoRef}
      style={{
        padding: "var(--section-padding) 0",
        background: "var(--ink)",
        color: "#fff",
      }}
    >
      <div className="site-container">
        <div
          style={{
            maxWidth: "36rem",
            marginBottom: "clamp(2.5rem, 5vw, 3.5rem)",
            opacity: whoVisible ? 1 : 0,
            transform: whoVisible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s cubic-bezier(0.25,0.1,0.25,1), transform 0.8s cubic-bezier(0.25,0.1,0.25,1)",
          }}
        >
          <p className="eyebrow-label" style={{ color: "var(--sea-breeze)" }}>{eyebrow}</p>
          <h2 style={{ color: "#fff", marginBottom: "0.75rem" }}>{heading}</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.0625rem", lineHeight: 1.7, margin: 0 }}>
            {intro}
          </p>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "1px", background: "rgba(255,255,255,0.08)", borderRadius: "var(--radius-card)", overflow: "hidden" }}
        >
          {segments.map((seg, i) => (
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

        {(primaryCta || secondaryCta) && (
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
            {primaryCta && (
              <Link
                to={primaryCta.href}
                className="btn-cta"
                style={{
                  background: "#fff",
                  color: "var(--ink)",
                  border: "1px solid #fff",
                }}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                to={secondaryCta.href}
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
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
