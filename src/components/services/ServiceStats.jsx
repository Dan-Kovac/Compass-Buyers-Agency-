import React from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function ServiceStats({
  eyebrow = "By the Numbers",
  items = [
    { value: "70+", label: "Properties Secured" },
    { value: "42%", label: "Off-Market Deals" },
    { value: "~5.5%", label: "Avg. Saving Below Asking" },
    { value: "100%", label: "Buyer-Only Focus" },
  ],
  bg = "bg-sand-wash",
}) {
  return (
    <section className={bg} style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <ScrollReveal className="text-center mb-8 md:mb-10">
          {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StaggerGroup stagger={100}>
            {items.map(({ value, label }, i) => (
              <ScrollReveal key={i} animation="scale-subtle">
                <div className="text-center">
                  <div className="stat-number mb-1">{value}</div>
                  <div
                    className="stat-label"
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
