import React from "react";
import SectionHeader from "@/components/shared/SectionHeader";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

/**
 * Region link data -- maps to all existing landing pages.
 * Update this array as new landing pages are built.
 */
const regionLinks = [
  {
    name: "Tweed Coast",
    slug: "/tweed-heads-buyers-agent",
    subtitle: "Buyers agent services on the Tweed Coast",
  },
  {
    name: "Gold Coast",
    slug: "/gold-coast-buyers-agent",
    subtitle: "Buyers agent services on the Gold Coast",
  },
  {
    name: "Byron Bay",
    slug: "/byron-bay-buyers-agent",
    subtitle: "Buyers agent services in Byron Bay",
  },
  {
    name: "Northern Rivers",
    slug: "/northern-rivers-buyers-agent",
    subtitle: "Buyers agent across the Northern Rivers",
  },
];
const regionLinksExtra = [
  {
    name: "Brunswick Heads",
    slug: "/brunswick-heads-buyers-agent",
    subtitle: "Buyers agent services in Brunswick Heads",
  },
  {
    name: "Southern Gold Coast",
    slug: "/southern-gold-coast-buyers-agent",
    subtitle: "Buyers agent on the Southern Gold Coast",
  },
];

const allRegionLinks = [...regionLinks, ...regionLinksExtra];

/**
 * Arrow icon for link cards.
 */
function CardArrow({ className = "" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="var(--hills)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
/**
 * RegionLinksGrid -- 3-column card grid linking to all location landing pages.
 * Creates the SEO bridge from the Areas page to each suburb-specific page.
 */
export default function RegionLinksGrid() {
  return (
    <section
      className="bg-sea-wash"
      style={{ padding: "var(--section-padding) 0" }}
    >
      <div className="site-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Explore Further"
            heading="Buyers Agent by Location"
            subtitle="In-depth guides to each area we cover, with local market insight and recent results."
            align="center"
            divider={false}
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StaggerGroup stagger={100}>
            {allRegionLinks.map((link) => (
              <ScrollReveal key={link.slug} animation="scale-subtle" duration={600}>
                <a
                  href={link.slug}
                  className="region-link-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "white",
                    borderRadius: "var(--radius-card)",
                    padding: "clamp(1.25rem, 2.5vw, 1.75rem)",
                    border: "1px solid rgba(0,0,0,0.04)",
                    textDecoration: "none",
                    transition: "all 0.4s var(--ease-out)",
                    minHeight: "120px",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    const arrow = e.currentTarget.querySelector(".card-arrow");
                    if (arrow) arrow.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.04)";
                    e.currentTarget.style.transform = "translateY(0)";
                    const arrow = e.currentTarget.querySelector(".card-arrow");
                    if (arrow) arrow.style.transform = "translateX(0)";
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                        marginBottom: "clamp(0.25rem, 0.5vw, 0.5rem)",
                      }}
                    >
                      {link.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-body-light)",
                        fontSize: "clamp(0.8125rem, 0.9vw, 0.875rem)",
                        color: "var(--stone)",
                        lineHeight: 1.5,
                        marginBottom: 0,
                      }}
                    >
                      {link.subtitle}
                    </p>
                  </div>
                  <div className="flex justify-end mt-3">
                    <span
                      className="card-arrow"
                      style={{
                        transition: "transform 0.3s var(--ease-out)",
                        display: "inline-flex",
                      }}
                    >
                      <CardArrow />
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}