import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * PullQuoteBreak — centred editorial quote block.
 * Reusable across pages. Provides an emotional reset between content sections.
 *
 * @param {string} quote - The quote text
 * @param {string} [attribution] - Attribution line (e.g. "Bryce Holdaway, Compass Buyers Agency")
 * @param {"cream"|"sand-wash"|"white"} [bg] - Background style
 */
export default function PullQuoteBreak({
  quote = "No two buyers are the same. We listen first, then build a plan that fits your life, not the other way around.",
  attribution = "Bryce Holdaway, Compass Buyers Agency",
  bg = "cream",
}) {
  const bgClass =
    bg === "cream"
      ? "bg-cream"
      : bg === "sand-wash"
        ? "bg-sand-wash"
        : "bg-white";

  return (
    <section
      className={bgClass}
      style={{ padding: "var(--section-compact) 0" }}
    >
      <div className="site-container">
        <ScrollReveal animation="fade-in" duration={1200}>
          <div style={{ maxWidth: "42rem", margin: "0 auto", textAlign: "center" }}>
            {/* Decorative divider */}
            <div className="section-divider" style={{ marginBottom: "clamp(1.5rem, 3vw, 2rem)" }} />

            {/* Quote */}
            <blockquote className="pullquote-block">
              {quote}
            </blockquote>

            {/* Attribution */}
            {attribution && (
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  color: "var(--hills)",
                  marginTop: "1.25rem",
                  marginBottom: 0,
                  textAlign: "center",
                }}
              >
                {attribution}
              </p>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}