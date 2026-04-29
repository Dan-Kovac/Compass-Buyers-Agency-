import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * ShireFeature -- 50/50 shire destination showcase.
 * Full-width alternating layout adapted for suburb directory data.
 *
 * @param {string} title - Shire name (e.g. "Byron Shire")
 * @param {string} description - Editorial paragraph (from Sanity or fallback)
 * @param {string} image - Image URL
 * @param {string} imageAlt - Alt text for the image
 * @param {Array} suburbs - Array of { name, isLive, slug, landingPageSlug }
 * @param {boolean} imageLeft - Image on left side (default: false = image right)
 * @param {string} bg - Background class ("bg-white" | "bg-sand-wash")
 * @param {number} index - Section index for stagger calculation
 */
export default function ShireFeature({
  title,
  description,
  stat,
  image,
  imageAlt,
  suburbs = [],
  imageLeft = false,
  bg = "bg-white",
}) {
  const imgAnim = imageLeft ? "fade-right" : "fade-left";
  const textAnim = imageLeft ? "fade-left" : "fade-right";

  const fallbackDescription = `${suburbs.length} suburbs serviced across the shire, from coastal towns to hinterland villages.`;

  return (
    <section
      className={bg}
      style={{ padding: "var(--section-padding) 0" }}
    >
      <div className="site-container">
        <div
          className={`grid lg:grid-cols-2 items-stretch ${
            imageLeft ? "lg:grid-flow-dense" : ""
          }`}
          style={{ gap: "clamp(2rem, 4vw, 4rem)" }}
        >
          {/* Image column */}
          <ScrollReveal
            animation={imgAnim}
            className={`${
              imageLeft ? "lg:col-start-1" : "lg:col-start-2"
            } h-full`}
          >
            <div
              className="overflow-hidden shire-feature-image-wrap aspect-[4/3] lg:aspect-auto lg:h-full"
              style={{
                borderRadius: "var(--radius-card)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                minHeight: "clamp(280px, 40vw, 460px)",
              }}
            >
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  transition: "transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.015)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
            </div>
          </ScrollReveal>

          {/* Text column */}
          <ScrollReveal
            animation={textAnim}
            delay={120}
            className={`${
              imageLeft
                ? "lg:col-start-2"
                : "lg:col-start-1 lg:row-start-1"
            }`}
          >
            {/* Eyebrow */}
            <p className="eyebrow-label">{title}</p>

            {/* Shire title */}
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                fontWeight: 400,
                letterSpacing: "-0.015em",
                lineHeight: 1.15,
                color: "var(--ink)",
                marginBottom: "clamp(0.5rem, 1vw, 0.75rem)",
              }}
            >
              {title}
            </h2>

            {/* Divider -- left-aligned */}
            <div
              className="section-divider left"
              style={{
                margin: "clamp(0.75rem, 1.5vw, 1.25rem) 0",
              }}
            />
            {/* Badges row */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "clamp(0.75rem, 1.5vw, 1rem)",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "0.75rem",
                  fontWeight: "var(--font-body-medium)",
                  color: "var(--hills)",
                  background: "rgba(75,113,113,0.08)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "var(--radius-badge)",
                }}
              >
                {suburbs.length} suburbs
              </span>
              {stat && (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.75rem",
                    fontWeight: "var(--font-body-medium)",
                    color: "var(--white)",
                    background: "var(--hills)",
                    padding: "0.25rem 0.75rem",
                    borderRadius: "var(--radius-badge)",
                  }}
                >
                  {stat}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-body-light)",
                fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
                lineHeight: 1.65,
                color: "var(--stone)",
                marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
              }}
            >
              {description || fallbackDescription}
            </p>

            {/* Suburb list */}
            <div style={{ marginTop: "clamp(1rem, 2vw, 1.5rem)" }}>
              {suburbs.map((suburb, i) => {
                const isLast = i === suburbs.length - 1;
                return (
                  <div
                    key={suburb.name}
                    style={{
                      padding: `var(--suburb-row-py) 0`,
                      borderBottom: isLast ? "none" : "1px solid var(--bright-grey)",
                      minHeight: "44px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-body-medium)",
                        fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                        color: "var(--ink)",
                      }}
                    >
                      {suburb.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}