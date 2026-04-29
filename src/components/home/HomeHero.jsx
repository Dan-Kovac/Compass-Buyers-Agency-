import React from "react";
import { createPageUrl } from "@/utils";
import ReviewsBadge from "../shared/ReviewsBadge";

export default function HomeHero({ title, subtitle, backgroundImageUrl, backgroundVideoUrl, ctaHref, ctaText } = {}) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    if (!videoRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      videoRef.current.pause();
    } else {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  const hasVideo = Boolean(backgroundVideoUrl);
  const posterUrl = backgroundImageUrl || "/videos/compass-hero-poster.jpg";

  return (
    <section className="relative flex items-end overflow-hidden hero-shell">
      {/* Background */}
      {hasVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideoUrl}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="metadata"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${posterUrl}')` }}
          aria-hidden="true"
        />
      )}

      {/* Cinematic overlay — dark bottom for text, left-side darken */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.02) 35%, rgba(0,0,0,0.5) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(35,35,35,0.4) 0%, transparent 65%)' }} />
      </div>

      {/* Content — positioned in lower portion for cinematic feel */}
      <div className="relative z-10 w-full">
        <div className="site-container pb-20 md:pb-32 pt-28 md:pt-32">
          <div className="max-w-3xl" style={{ "--h1-mb": "20px" }}>

            <div style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms forwards' }}>
              <div className="mb-5">
                <ReviewsBadge />
              </div>
            </div>

            <div style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms forwards' }}>
              <h1
                className="text-white"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(2.75rem, 5.5vw, 4.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {title || "Your Buyers Agent, Byron to the Gold Coast"}
              </h1>
            </div>

            <div style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms forwards' }}>
              <p
                className="text-white/80 mb-0"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                  lineHeight: 1.65,
                }}
              >
                {subtitle || "62+ properties secured across the Northern Rivers and Gold Coast. Most off-market. Local agents, honest advice, sharper deals."}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-7" style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 700ms forwards' }}>
              <a
                href={ctaHref || createPageUrl("Contact")}
                className="btn-cta bg-white text-[var(--ink)] hover:bg-white/90"
              >
                {ctaText || "Speak to an Agent"}
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile where sticky CTA lives */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2" style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 1200ms forwards' }}>
        <span className="text-white/40" style={{ fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 300 }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Hero entrance keyframes */}
      <style>{`
        .hero-shell { min-height: 100vh; min-height: 100svh; }
        @media (max-width: 767px) {
          .hero-shell { min-height: 85vh; min-height: 85svh; }
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes heroReveal {
            from { opacity: 1; transform: none; }
            to   { opacity: 1; transform: none; }
          }
        }
      `}</style>
    </section>
  );
}
