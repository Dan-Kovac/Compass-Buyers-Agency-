import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * Landing page slug map -- links suburbs to their dedicated landing pages.
 * As new landing pages are built, add entries here.
 */
const LANDING_PAGE_MAP = {
  "Byron Bay": "/byron-bay-buyers-agent",
  "Tweed Heads": "/tweed-heads-buyers-agent",
  "Brunswick Heads": "/brunswick-heads-buyers-agent",
  "Currumbin": "/southern-gold-coast-buyers-agent",
  "Palm Beach": "/southern-gold-coast-buyers-agent",
};

/**
 * Small inline arrow SVG for suburb links.
 */
function ArrowIcon({ className = "" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
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
          className={`grid lg:grid-cols-2 items-start ${
            imageLeft ? "lg:grid-flow-dense" : ""
          }`}
          style={{ gap: "clamp(2rem, 4vw, 4rem)" }}
        >
          {/* Image column */}
          <ScrollReveal
            animation={imgAnim}
            className={`${
              imageLeft ? "lg:col-start-1" : "lg:col-start-2"
            }`}
          >
            <div
              className="overflow-hidden shire-feature-image-wrap"
              style={{
                aspectRatio: "4 / 3",
                borderRadius: "var(--radius-card)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={image}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                loading="lazy"
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
            {/* Suburb count badge */}
            <span
              style={{
                display: "inline-block",
                fontSize: "0.75rem",
                fontWeight: "var(--font-body-medium)",
                color: "var(--hills)",
                background: "rgba(75,113,113,0.08)",
                padding: "0.25rem 0.75rem",
                borderRadius: "var(--radius-badge)",
                marginBottom: "clamp(0.75rem, 1.5vw, 1rem)",
              }}
            >
              {suburbs.length} suburbs
            </span>

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
                const landingSlug =
                  suburb.landingPageSlug || LANDING_PAGE_MAP[suburb.name];
                const isLast = i === suburbs.length - 1;

                return (
                  <div
                    key={suburb.name}
                    className="flex items-center justify-between"
                    style={{
                      padding: `var(--suburb-row-py) 0`,
                      borderBottom: isLast
                        ? "none"
                        : "1px solid var(--bright-grey)",
                      minHeight: "44px",
                    }}
                  >
                    {/* Suburb name */}
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
                    {/* Link states: landing page > blog profile > no link */}
                    {landingSlug ? (
                      <a
                        href={landingSlug}
                        className="shire-suburb-link"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          color: "var(--hills)",
                          fontWeight: "var(--font-body-medium)",
                          fontSize: "clamp(0.8125rem, 0.9vw, 0.875rem)",
                          textDecoration: "none",
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                          e.currentTarget.style.textUnderlineOffset = "4px";
                          const arrow = e.currentTarget.querySelector(".suburb-arrow");
                          if (arrow) arrow.style.transform = "translateX(3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                          const arrow = e.currentTarget.querySelector(".suburb-arrow");
                          if (arrow) arrow.style.transform = "translateX(0)";
                        }}
                      >
                        Explore area
                        <span
                          className="suburb-arrow"
                          style={{ transition: "transform 0.3s", display: "inline-flex" }}
                        >
                          <ArrowIcon />
                        </span>
                      </a>
                    ) : suburb.isLive && suburb.slug ? (
                      <a
                        href={`/blog-post-detail?slug=${encodeURIComponent(suburb.slug)}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.375rem",
                          color: "var(--stone)",
                          fontWeight: "var(--font-body-medium)",
                          fontSize: "clamp(0.8125rem, 0.9vw, 0.875rem)",
                          textDecoration: "none",
                          transition: "color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textDecoration = "underline";
                          e.currentTarget.style.textUnderlineOffset = "4px";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textDecoration = "none";
                        }}
                      >
                        View profile
                      </a>
                    ) : null}
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