import React from "react";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/shared/ScrollReveal";

/**
 * Buyer segment section — consistent side-by-side layout.
 * imageLeft alternates per section for visual rhythm.
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
  showCta = true,
}) {
  const renderList = (items, label, isSecondList = false) =>
    items.length > 0 && (
      <div
        style={{
          marginTop: "clamp(1.5rem, 3vw, 2rem)",
          ...(isSecondList
            ? {
                borderTop: "1px solid var(--bright-grey)",
                paddingTop: "clamp(1.5rem, 3vw, 2rem)",
              }
            : {}),
        }}
      >
        <div
          className="eyebrow-label mb-3"
          style={{ fontSize: "0.6875rem" }}
        >
          {label}
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((n, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              <span
                className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--hills)]"
                aria-hidden="true"
              />
              <span style={{ fontWeight: "var(--font-body-light)" }}>{n}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <section id={id} className={`${bg} scroll-mt-24`} style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <div className={`grid lg:grid-cols-2 items-stretch ${imageLeft ? "lg:grid-flow-dense" : ""}`} style={{ gap: "clamp(2rem, 4vw, 4rem)" }}>
          {/* Image */}
          <ScrollReveal
            animation={imageLeft ? "fade-right" : "fade-left"}
            className={`${imageLeft ? "lg:col-start-1" : "lg:col-start-2"} h-full`}
          >
            <div
              className={`overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-full w-full`}
              style={{ borderRadius: "12px", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", minHeight: "clamp(280px, 40vw, 460px)" }}
            >
              <img
                src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"}
                alt={imageAlt || title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{ transition: "transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.015)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal
            animation={imageLeft ? "fade-left" : "fade-right"}
            delay={120}
            className={`${imageLeft ? "lg:col-start-2" : "lg:col-start-1 lg:row-start-1"} flex items-center`}
          >
            <div>
              {eyebrow && <p className="eyebrow-label">{eyebrow}</p>}
              <h2 className="mb-2">{title}</h2>
              {intro && (
                <p className="intro-text" style={{ maxWidth: "none" }}>
                  {intro}
                </p>
              )}

              {renderList(needs, "Common challenges", false)}
              {renderList(howWeHelp, "How we help", true)}

              {showCta && (
                <div className="mt-6">
                  <a
                    href={ctaHref}
                    className="btn-cta inline-flex items-center justify-center bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white transition-colors"
                  >
                    {ctaText}
                  </a>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
