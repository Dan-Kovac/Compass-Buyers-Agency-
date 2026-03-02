import React from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function ServiceStats({
  eyebrow = "By the Numbers",
  items = [
    { value: "62+", label: "Properties Secured" },
    { value: "~5.5%", label: "Avg. Saving Below Asking" },
    { value: "100%", label: "Buyer-Only Representation" },
  ],
  bg = "bg-sand-wash",
}) {
  return (
    <section className={bg} style={{ padding: "var(--section-standard-lg) 0" }}>
      <div className="site-container">
        <ScrollReveal className="text-center mb-8 md:mb-10">
          {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
          <div className="section-divider" />
        </ScrollReveal>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-20">
          <StaggerGroup stagger={120}>
            {items.map(({ value, label }, i) => (
              <ScrollReveal key={i}>
                <div className="text-center">
                  <div className="stat-number mb-1">{value}</div>
                  <div
                    style={{
                      fontWeight: "var(--font-body-light)",
                      fontSize: "0.875rem",
                      color: "var(--stone)",
                      letterSpacing: "0.02em",
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
