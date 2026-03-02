import React from "react";
import { createPageUrl } from "@/utils";
import ReviewsBadge from "../shared/ReviewsBadge";

export default function LandingHero({ title, subtitle, backgroundVideoUrl, backgroundImageUrl }) {
  const videoRef = React.useRef(null);

  // Slow-motion playback for dreamy coastal feel
  React.useEffect(() => {
    if (!videoRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      videoRef.current.pause();
    } else {
      videoRef.current.playbackRate = 0.85;
    }
  }, []);

  return (
    <section className="relative min-h-[60vh] md:min-h-[78vh] flex items-center overflow-hidden mx-3 sm:mx-4 md:mx-6 lg:mx-8 mt-2 md:mt-5" style={{ borderRadius: 'var(--radius-xl)' }}>
      {/* Background */}
      {backgroundVideoUrl ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideoUrl}
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
          style={{
            backgroundImage: `url('${backgroundImageUrl || "/images/compass-logo.png"}')`
          }}
          aria-hidden="true"
        />
      )}

      {/* Warm coastal overlay */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(35,35,35,0.55), rgba(75,115,113,0.15))' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      {/* Content with staggered entrance */}
      <div className="relative z-10 w-full">
        <div className="site-container py-12 md:py-24">
          <div className="max-w-3xl" style={{ "--h1-mb": "20px" }}>
            <div style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0ms forwards' }}>
              <div className="mb-4">
                <ReviewsBadge />
              </div>
            </div>

            <div style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 300ms forwards' }}>
              <h1
                className="text-white drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)]"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.05,
                }}
              >
                {title || "Property Acquisition Experts"}
              </h1>
            </div>

            {subtitle && (
              <div style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 500ms forwards' }}>
                <p
                  className="text-white/90 mb-0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] text-balance"
                  style={{
                    fontWeight: "var(--font-body-light)",
                    fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                    lineHeight: 1.6,
                    maxWidth: "48ch",
                  }}
                >
                  {subtitle}
                </p>
              </div>
            )}

            <div className="mt-5" style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 700ms forwards' }}>
              <a
                href={createPageUrl("Contact")}
                className="btn-cta bg-[var(--hills)] text-white hover:bg-[var(--hills)]/90"
              >
                Start a Conversation
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero entrance keyframes */}
      <style>{`
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
