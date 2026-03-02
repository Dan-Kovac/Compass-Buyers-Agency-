import React from "react";

const STATS = [
  { number: "62+", label: "Properties Secured" },
  { number: "42%", label: "Off-Market" },
  { number: "~5.5%", label: "Average Saving" },
  { number: "5\u2605", label: "Google Reviews" },
];

/**
 * TrustBar — a minimal horizontal stats strip for social proof.
 * Sits between the hero and the editorial content.
 */
export default function TrustBar() {
  return (
    <section className="bg-white border-b border-[var(--bright-grey)]">
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center justify-center py-8 md:py-10 ${
                i < STATS.length - 1 ? 'md:border-r md:border-[var(--bright-grey)]' : ''
              } ${i < 2 ? 'border-b md:border-b-0 border-[var(--bright-grey)]' : ''}`}
            >
              <span
                className="block mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--hills)",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </span>
              <span
                className="block"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 300,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--stone)",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
