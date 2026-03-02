import React from "react";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * Buyer segment section with A/B layout variation.
 *
 * - Even indexes (0, 2): Side-by-side, image 55% width, refined list with dashes
 * - Odd indexes (1, 3): Full-width image band at top, centered text below
 */
export default function SegmentSection({
  id,
  index = 0,
  title,
  eyebrow,
  intro,
  needs = [],
  howWeHelp = [],
  image,
  imageAlt,
  ctaText = "Speak to our team",
  ctaHref = createPageUrl("Contact"),
  imageLeft = false,
  squareImage = false,
  bg = "bg-white",
}) {
  const isVariantB = index % 2 === 1;

  // List renderer
  const renderList = (items, label) =>
    items.length > 0 && (
      <div className="mt-5">
        <div
          className="eyebrow-label mb-3"
          style={{ fontSize: "0.6875rem" }}
        >
          {label}
        </div>
        <ul className="space-y-2.5">
          {items.map((n, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              <span
                className="shrink-0 mt-1"
                style={{
                  color: "var(--hills)",
                  fontWeight: "var(--font-body-medium)",
                  fontSize: "0.875rem",
                }}
              >
                —
              </span>
              <span style={{ fontWeight: "var(--font-body-light)" }}>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  const ctaButton = (alignment = "") => (
    <div className={`mt-6 ${alignment}`}>
      <a
        href={ctaHref}
        className="btn-cta inline-flex items-center justify-center bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white transition-colors"
      >
        {ctaText}
      </a>
    </div>
  );

  // ── Variation B: Full-width image top, centered text below ──
  if (isVariantB) {
    return (
      <section id={id} className={`${bg} scroll-mt-24`} style={{ padding: "var(--section-standard) 0" }}>
        <div className="site-container">
          {/* Full-width image */}
          <ScrollReveal animation="fade-in">
            <div className="w-full overflow-hidden rounded-xl mb-8 md:mb-10" style={{ height: "280px" }}>
              <img
                src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Centered text content */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="max-w-2xl mx-auto text-center lg:text-left">
              {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
              <h2 className="mb-2">{title}</h2>
              {intro && (
                <p className="intro-text" style={{ maxWidth: "none" }}>
                  {intro}
                </p>
              )}

              <div className="text-left">
                {renderList(needs, "Common challenges")}
                {renderList(howWeHelp, "How we help")}
              </div>

              {ctaButton("text-center lg:text-left")}
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  // ── Variation A: Side-by-side, image 55% width ──
  return (
    <section id={id} className={`${bg} scroll-mt-24`} style={{ padding: "var(--section-standard) 0" }}>
      <div className="site-container">
        <div className={`grid lg:grid-cols-9 gap-8 md:gap-10 items-center ${imageLeft ? "lg:grid-flow-dense" : ""}`}>
          {/* Image — takes 5 of 9 columns (55%) */}
          <ScrollReveal
            animation={imageLeft ? "fade-right" : "fade-left"}
            className={`${imageLeft ? "lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-5"}`}
          >
            <div
              className={`overflow-hidden ${squareImage ? "aspect-[4/3] lg:aspect-square" : "aspect-[4/3]"} w-full`}
              style={{ borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
            >
              <img
                src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Content — takes 4 of 9 columns (45%) */}
          <ScrollReveal
            animation={imageLeft ? "fade-left" : "fade-right"}
            delay={120}
            className={`${imageLeft ? "lg:col-span-4 lg:col-start-6" : "lg:col-span-4 lg:col-start-1 lg:row-start-1"} flex items-center`}
          >
            <div>
              {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
              <h2 className="mb-2">{title}</h2>
              {intro && (
                <p className="intro-text" style={{ maxWidth: "none" }}>
                  {intro}
                </p>
              )}

              {renderList(needs, "Common challenges")}
              {renderList(howWeHelp, "How we help")}

              {ctaButton()}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
