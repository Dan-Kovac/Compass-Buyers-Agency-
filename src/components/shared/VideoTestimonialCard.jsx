import React from "react";

/**
 * VideoTestimonialCard — minimal inline video player card.
 *
 * Props:
 *   videoSrc    string  — path to self-hosted mp4
 *   posterSrc   string  — poster image (webp/jpg)
 *   clientName  string
 *   subtitle    string  — e.g. "Purchased in Kingscliff"
 *   size        "default" | "large"
 */
export default function VideoTestimonialCard({ videoSrc, posterSrc, clientName, subtitle, size = "default" }) {
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => {
      videoRef.current?.play();
    });
  };

  const handleEnded = () => {
    setPlaying(false);
  };

  const widthClass = size === "large"
    ? "w-[260px] sm:w-[340px] md:w-[360px]"
    : "w-[240px] sm:w-[300px]";

  return (
    <div className={`group flex-shrink-0 ${widthClass}`}>
      {/* Video / Poster area — square aspect */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bright-grey)]">
        {playing ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            playsInline
            onEnded={handleEnded}
            poster={posterSrc}
          />
        ) : (
          <button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full cursor-pointer border-0 p-0 bg-transparent"
            aria-label={`Play testimonial from ${clientName}`}
          >
            {posterSrc ? (
              <img
                src={posterSrc}
                alt={`${clientName} testimonial`}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--hills)] to-[var(--ink)]" />
            )}

            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

            {/* Play button — prominent, clean */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" className="ml-1">
                  <path d="M0 0L18 10L0 20V0Z" fill="var(--ink)" />
                </svg>
              </div>
            </div>

            {/* Client name overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="text-white text-[15px] font-medium" style={{ fontFamily: 'var(--font-body)' }}>
                {clientName}
              </div>
              {subtitle && (
                <div className="text-white/60 text-[13px] mt-0.5" style={{ fontFamily: 'var(--font-body)' }}>
                  {subtitle}
                </div>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
