import React from "react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * Asymmetric 60/40 feature split with editorial typography.
 *
 * @param {string} eyebrow - Small uppercase label above heading
 * @param {boolean} imageLeft - Whether image appears on left (default: false = image right)
 * @param {"white"|"bright"|"sand"|"sea"|"cream"} variant - Background variant
 */
export default function FeatureSplit({
  title,
  eyebrow,
  description,
  image,
  imageAlt,
  imageLeft = false,
  mobileImageFirst = false,
  variant = "white",
  ctaLabel,
  ctaHref,
}) {
  const bgMap = {
    white: "bg-white",
    bright: "bg-[var(--bright-grey)]",
    sand: "bg-sand-wash",
    sea: "bg-sea-wash",
    cream: "bg-cream",
  };
  const bg = bgMap[variant] || "bg-white";
  const imgAnim = imageLeft ? "fade-right" : "fade-left";
  const textAnim = imageLeft ? "fade-left" : "fade-right";

  return (
    <section className={bg} style={{ padding: "var(--section-standard-lg) 0" }}>
      <div className="site-container">
        {/* Asymmetric grid: 3/5 image, 2/5 text (60/40) */}
        <div className={`grid lg:grid-cols-5 gap-10 lg:gap-14 items-center ${imageLeft ? "lg:grid-flow-dense" : ""}`}>
          {/* Image — 3 of 5 columns */}
          <ScrollReveal
            animation={imgAnim}
            className={`lg:col-span-3 ${imageLeft ? "lg:col-start-1" : "lg:col-start-3"} ${mobileImageFirst ? "order-first lg:order-none" : ""}`}
          >
            <div
              className="aspect-[4/3] overflow-hidden"
              style={{
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
              }}
            >
              <img
                src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Text — 2 of 5 columns */}
          <ScrollReveal
            animation={textAnim}
            delay={120}
            className={`lg:col-span-2 ${imageLeft ? "lg:col-start-4" : "lg:col-start-1 lg:row-start-1"}`}
          >
            {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
            <h2 className="mb-4">{title}</h2>
            <div
              className="whitespace-pre-line leading-relaxed"
              style={{
                fontWeight: "var(--font-body-light)",
                fontSize: "1.0625rem",
                color: "var(--stone)",
                lineHeight: "1.7",
              }}
            >
              {description}
            </div>
            {ctaLabel && ctaHref && (
              <div className="mt-6">
                <a href={ctaHref}>
                  <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                    {ctaLabel}
                  </Button>
                </a>
              </div>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
