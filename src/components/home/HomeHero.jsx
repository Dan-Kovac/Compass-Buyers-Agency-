import React from "react";
import { fetchSiteSettings } from "@/lib/sanityClient";
import { createPageUrl } from "@/utils";
import ReviewsBadge from "../shared/ReviewsBadge";

export default function HomeHero({ title, subtitle, backgroundImageUrl, backgroundVideoUrl, ctaHref, ctaText } = {}) {
  const [brand, setBrand] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 3000);

    (async () => {
      try {
        const settings = await fetchSiteSettings();
        if (mounted) {
          setBrand(settings || null);
          setLoading(false);
          clearTimeout(timeout);
        }
      } catch (err) {
        console.warn("Could not load site settings for hero");
        if (mounted) {
          setBrand(null);
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    })();

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  // Slow-motion playback for dreamy coastal feel; pause for reduced-motion users
  React.useEffect(() => {
    if (!videoRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      videoRef.current.pause();
    } else {
      videoRef.current.playbackRate = 0.85;
    }
  }, [loading]);

  const hasVideo = backgroundVideoUrl || brand?.hero_background_video_url;

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background */}
      {hasVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={backgroundVideoUrl || brand.hero_background_video_url}
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
            backgroundImage: `url('${
              backgroundImageUrl ||
              brand?.hero_background_image_url ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
            }')`
          }}
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
                className="text-white/80 mb-0 text-balance"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
                  lineHeight: 1.65,
                  maxWidth: "48ch",
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

            <div className="mt-6 md:mt-8 hidden sm:flex items-center gap-5" style={{ opacity: 0, animation: 'heroReveal 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 900ms forwards' }}>
              <span className="text-white/50" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.02em' }}>62+ properties secured</span>
              <span className="w-px h-3.5 bg-white/25" />
              <span className="text-white/50" style={{ fontSize: '13px', fontWeight: 300, letterSpacing: '0.02em' }}>Byron Bay to Gold Coast</span>
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
