import React from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function ProcessSteps({ steps = [], title, eyebrow }) {
  return (
    <section className="bg-cream" style={{ padding: "var(--section-breathing-lg) 0" }}>
      <div className="site-container">
        {(eyebrow || title) && (
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
              {title && <h2 className="mb-0">{title}</h2>}
            </div>
          </ScrollReveal>
        )}

        {/* Vertical timeline */}
        <div className="max-w-3xl mx-auto">
          <StaggerGroup stagger={100}>
            {steps.map((s, i) => (
              <ScrollReveal key={i}>
                <div className="flex gap-5 md:gap-8 pb-8 md:pb-10 relative">
                  {/* Vertical connector line */}
                  {i < steps.length - 1 && (
                    <div
                      className="absolute left-[21px] md:left-[25px] top-[52px] md:top-[56px] bottom-0 w-px"
                      style={{ background: "var(--sand)" }}
                    />
                  )}

                  {/* Step number circle */}
                  <div className="shrink-0">
                    <div
                      className="w-[42px] h-[42px] md:w-[50px] md:h-[50px] rounded-full border border-[var(--hills)]/25 flex items-center justify-center relative"
                      style={{ background: "linear-gradient(180deg, #FAF7EE 0%, #F5F0E1 100%)", zIndex: 1 }}
                    >
                      <span
                        className="text-[var(--hills)]"
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontWeight: 400,
                          fontSize: "1.0625rem",
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {String(s.step).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="pt-1.5 md:pt-2.5">
                    <h3
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: "var(--font-body-medium)",
                        fontSize: "1.0625rem",
                        letterSpacing: "0",
                        marginBottom: "4px",
                        lineHeight: "1.3",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontWeight: "var(--font-body-light)",
                        color: "var(--stone)",
                        fontSize: "0.9375rem",
                        lineHeight: "1.65",
                        marginBottom: "0",
                      }}
                    >
                      {s.description}
                    </p>
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
