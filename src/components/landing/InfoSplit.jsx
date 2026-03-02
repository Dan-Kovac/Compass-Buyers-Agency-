import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function InfoSplit({
  title,
  description,
  bullets = [],
  imageUrl,
  imageAlt = "",
  imageSide = "right",
}) {
  const imageFirst = imageSide === "left";
  return (
    <section className="bg-white" style={{ padding: "var(--section-standard) 0" }}>
      <div className="site-container">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-center">
          {imageFirst && (
            <ScrollReveal animation="fade-right" className="lg:col-span-3">
              <div
                className="aspect-[4/3] overflow-hidden"
                style={{ borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          )}

          <ScrollReveal
            animation={imageFirst ? "fade-left" : "fade-right"}
            delay={imageFirst ? 120 : 0}
            className={imageFirst ? "lg:col-span-2" : "lg:col-span-2"}
          >
            <div>
              {title && <h2 className="mb-3">{title}</h2>}
              {description && (
                <p
                  className="mb-5"
                  style={{
                    fontWeight: "var(--font-body-light)",
                    fontSize: "1.0625rem",
                    color: "var(--stone)",
                    lineHeight: "1.7",
                  }}
                >
                  {description}
                </p>
              )}
              {bullets?.length > 0 && (
                <ul className="space-y-2.5">
                  {bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3"
                      style={{
                        fontWeight: "var(--font-body-light)",
                        fontSize: "1.0625rem",
                        color: "var(--stone)",
                        lineHeight: "1.6",
                      }}
                    >
                      <span
                        className="shrink-0 mt-[2px]"
                        style={{ color: "var(--hills)", fontWeight: "var(--font-body-medium)" }}
                      >
                        —
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </ScrollReveal>

          {!imageFirst && (
            <ScrollReveal animation="fade-left" delay={120} className="lg:col-span-3">
              <div
                className="aspect-[4/3] overflow-hidden"
                style={{ borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
              >
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </section>
  );
}
