import React from "react";
import { splitSentences } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  backgroundImage,
  height = "58vh",
  minHeight = "420px",
  objectPosition = "center",
}) {
  return (
    <section
      className="relative overflow-hidden flex items-end"
      style={{ minHeight, height }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundPosition: objectPosition,
        }}
        aria-hidden="true"
      />

      {/* Cinematic overlay — matches HomeHero */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.04) 40%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(35,35,35,0.45) 0%, transparent 65%)" }} />
      </div>

      {/* Content — lower-left, same as HomeHero */}
      <div className="relative z-10 w-full">
        <div className="site-container" style={{ paddingBottom: "clamp(2.5rem, 5vw, 4rem)", paddingTop: "clamp(5rem, 10vw, 7rem)" }}>
          <div style={{ maxWidth: "44rem" }}>
            {eyebrow && (
              <p
                className="eyebrow-label"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  marginBottom: "0.875rem",
                  opacity: 0,
                  animation: "pageHeroReveal 800ms cubic-bezier(0.25,0.46,0.45,0.94) 100ms forwards",
                }}
              >
                {eyebrow}
              </p>
            )}
            <h1
              style={{
                color: "#fff",
                fontWeight: 400,
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                marginBottom: subtitle ? "1rem" : 0,
                opacity: 0,
                animation: "pageHeroReveal 800ms cubic-bezier(0.25,0.46,0.45,0.94) 250ms forwards",
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontWeight: 300,
                  fontSize: "clamp(1rem, 1.4vw, 1.1875rem)",
                  lineHeight: 1.65,
                  maxWidth: "46ch",
                  margin: 0,
                  opacity: 0,
                  animation: "pageHeroReveal 800ms cubic-bezier(0.25,0.46,0.45,0.94) 420ms forwards",
                }}
              >
                {splitSentences(subtitle).map((s, i) => (
                  <span key={i} style={{ display: "block" }}>{s}</span>
                ))}
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pageHeroReveal {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pageHeroReveal {
            from { opacity: 1; transform: none; }
            to   { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </section>
  );
}
