import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * StatsBar — horizontal strip of market statistics.
 *
 * Props:
 *   stats  Array<{ value: string, label: string }>   (max 4)
 */
export default function StatsBar({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <section className="bg-[var(--ink)]" style={{ padding: "var(--section-compact) 0" }}>
      <div className="site-container">
        <ScrollReveal animation="fade-up">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-x-16">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div
                  className="leading-tight text-white"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-1 text-white/60"
                  style={{
                    fontWeight: "var(--font-body-light)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
