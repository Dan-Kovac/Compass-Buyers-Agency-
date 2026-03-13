import React from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

/**
 * SegmentCardGrid — 3x3 responsive card grid replacing the chip nav.
 * Each card shows a lifestyle image, title, teaser, and "Learn more" link.
 * Clicking a card smooth-scrolls to the corresponding segment section.
 */
export default function SegmentCardGrid({ segments = [] }) {
  if (!segments.length) return null;

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="bg-white" style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <nav
          role="navigation"
          aria-label="Jump to buyer segment"
          className="segment-card-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(1, 1fr)",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          <StaggerGroup stagger={100}>
            {segments.map((seg) => (
              <ScrollReveal key={seg.id} animation="scale-subtle" duration={600}>
                <a
                  href={`#${seg.id}`}
                  className="segment-card"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(seg.id);
                  }}
                  aria-label={`Learn more about ${seg.title}`}
                >
                  {/* Card image */}
                  <div
                    className="segment-card-image"
                    style={{
                      aspectRatio: "3 / 2",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={seg.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"}
                      alt={seg.imageAlt || seg.title}
                      loading="lazy"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>

                  {/* Card text area */}
                  <div style={{ padding: "clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 3vw, 2rem)" }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)",
                        fontWeight: 400,
                        color: "var(--ink)",
                        lineHeight: 1.2,
                        marginBottom: "0.5rem",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {seg.title}
                    </h3>

                    {seg.intro && (
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontWeight: 300,
                          fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                          lineHeight: 1.55,
                          color: "var(--stone)",
                          marginBottom: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {seg.intro}
                      </p>
                    )}

                    <span
                      className="segment-card-link"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontWeight: 500,
                        fontSize: "0.875rem",
                        color: "var(--hills)",
                        marginTop: "0.75rem",
                        display: "inline-block",
                      }}
                    >
                      Learn more &rarr;
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </StaggerGroup>
        </nav>
      </div>
    </section>
  );
}