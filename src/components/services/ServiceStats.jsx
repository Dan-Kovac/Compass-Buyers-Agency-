import React from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function ServiceStats({
  eyebrow = "By the Numbers",
  items = [
    { value: "80", label: "Years Team Experience" },
    { value: "$3.6B", label: "In Transactions" },
    { value: "76%", label: "Off-Market Purchases" },
    { value: "#1", label: "Buyers Agency, Byron to Gold Coast" },
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
