import React from "react";

/**
 * AreasHero -- Full-bleed atmospheric hero for the Areas page.
 * Follows the LandingHero visual pattern: full-bleed image, warm coastal
 * overlay gradients, staggered text entrance. No CTA button -- just image
 * + heading overlay for editorial tone.
 *
 * @param {string} heading - Main H1 text
 * @param {string} subtitle - Secondary paragraph text
 * @param {string} eyebrow - Small uppercase label (default: "Where We Buy")
 * @param {string} image - Hero image URL (Sanity or fallback)
 * @param {string} imageAlt - Alt text for the hero image
 */
export default function AreasHero({
  heading = "The Northern Rivers and Beyond",
  subtitle = "Four shires, dozens of suburbs, one focus: finding you the right property at the right price.",
  eyebrow = "Where We Buy",
  image,
  imageAlt = "Aerial view of the Northern Rivers coastline",
}) {
  const fallbackImage =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1920&auto=format&fit=crop";

  return (
    <section
      className="relative flex items-center overflow-hidden mx-0 sm:mx-4 md:mx-6 lg:mx-8 mt-0 md:mt-5"
      style={{
        minHeight: "var(--areas-hero-min-h)",
        borderRadius: "0",
      }}
    >
      {/* Responsive border-radius via media query */}
      <style>{`
        @media (min-width: 640px) {
          .areas-hero-section { border-radius: var(--radius-xl) !important; }
        }
        @keyframes areasHeroReveal {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes areasHeroReveal {
            from { opacity: 1; transform: none; }
            to   { opacity: 1; transform: none; }
          }
        }
      `}</style>

      {/* Re-apply class for border-radius targeting */}
      <div
        className="areas-hero-section absolute inset-0"
        style={{ borderRadius: "inherit" }}
      >
        {/* Background image */}
        <img
          src={image || fallbackImage}
          alt={imageAlt}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      {/* Warm coastal overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(35,35,35,0.50), rgba(75,115,113,0.12))",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.18), transparent)",
          }}
        />
      </div>

      {/* Content with staggered entrance */}
      <div className="relative z-10 w-full">
        <div
          className="site-container"
          style={{ padding: "clamp(3rem, 6vw, 6rem) 0" }}
        >
          <div style={{ maxWidth: "48rem" }}>
            {/* Eyebrow */}
            <div
              style={{
                opacity: 0,
                animation:
                  "areasHeroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms forwards",
              }}
            >
              <p
                className="eyebrow-label"
                style={{ color: "var(--sand)" }}
              >
                {eyebrow}
              </p>
            </div>

            {/* H1 */}
            <div
              style={{
                opacity: 0,
                animation:
                  "areasHeroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms forwards",
              }}
            >
              <h1
                style={{
                  color: "#fff",
                  fontWeight: 400,
                  fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.08,
                  textShadow: "0 3px 8px rgba(0,0,0,0.5)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {heading}
              </h1>
            </div>

            {/* Subtitle */}
            {subtitle && (
              <div
                style={{
                  opacity: 0,
                  animation:
                    "areasHeroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms forwards",
                }}
              >
                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: "var(--font-body-light)",
                    fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                    lineHeight: 1.6,
                    maxWidth: "48ch",
                    marginBottom: 0,
                  }}
                >
                  {subtitle}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}