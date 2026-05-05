import React from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

const DEFAULT_PILLARS = [
  "Independent priority advice grounded in a proven due-diligence process",
  "Our in-house team supports you from brief to settlement, and well beyond",
  "You stay in control at every stage, with a clear, structured acquisition strategy",
];

const DEFAULT_STATS = [
  { value: "200+", label: "Client Success Stories" },
  { value: "38", label: "Day Average Engagement" },
  { value: "3–8%", label: "Average Client Saving" },
  { value: "100%", label: "Buyer Focused" },
];

/**
 * BuyerOnlyAdvantage — editorial section explaining the buyer-exclusive
 * model, followed by a secondary stat band on a sand wash. Sits below the
 * primary expertise band on the homepage.
 */
export default function BuyerOnlyAdvantage({
  eyebrow = "Working Exclusively for the Buyer",
  heading = "Our team represents buyers. No sales, no conflicts.",
  body = "Working only on the buyer's side of the table changes the nature of the advice you receive at every stage, and shapes the outcome you ultimately achieve. Every conversation, inspection and negotiation is handled by a core team of senior experts at Compass.",
  pillars = DEFAULT_PILLARS,
  stats = DEFAULT_STATS,
} = {}) {
  return (
    <section id="buyer-only" className="bg-sand-wash" style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        {/* Editorial copy */}
        <div className="grid lg:grid-cols-12" style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
          <ScrollReveal animation="fade-up" className="lg:col-span-5">
            <p className="eyebrow-label">{eyebrow}</p>
            <h2 className="mb-0" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>
              {heading}
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={120} className="lg:col-span-7">
            <p
              className="mb-6"
              style={{
                fontWeight: "var(--font-body-light)",
                fontSize: "1.0625rem",
                color: "var(--stone)",
                lineHeight: "1.75",
              }}
            >
              {body}
            </p>
            <ul className="space-y-3">
              {pillars.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    fontWeight: "var(--font-body-light)",
                    fontSize: "1.0625rem",
                    color: "var(--ink)",
                    lineHeight: "1.65",
                  }}
                >
                  <span
                    className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-[var(--hills)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>

        {/* Secondary stat band */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{
            marginTop: "clamp(3rem, 6vw, 5rem)",
            paddingTop: "clamp(2rem, 4vw, 3rem)",
            borderTop: "1px solid rgba(75, 115, 113, 0.12)",
            gap: "clamp(1.5rem, 3vw, 2.5rem)",
          }}
        >
          <StaggerGroup stagger={100}>
            {stats.map(({ value, label }, i) => (
              <ScrollReveal key={i} animation="scale-subtle">
                <div className="text-center">
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontWeight: 400,
                      fontSize: "clamp(2rem, 3.5vw, 3rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--hills)",
                      lineHeight: 1,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 300,
                      fontSize: "0.8125rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--stone)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
