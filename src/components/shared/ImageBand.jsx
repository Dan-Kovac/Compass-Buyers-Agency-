import React, { useRef, useEffect, useState } from "react";

export default function ImageBand({
  src,
  alt = "",
  height = "280px",
  mobileHeight = "180px",
  overlay = true,
  parallax = false,
}) {
  const responsiveHeight = `clamp(${mobileHeight}, 20vw, ${height})`;
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ height: responsiveHeight }}
    >
      <style>{`
        @keyframes imageBandKenBurns {
          0%   { transform: scale(1.05) translate(0, 0); }
          50%  { transform: scale(1.10) translate(-1.5%, -1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .image-band-img { animation: none !important; transform: scale(1.02) !important; }
        }
      `}</style>
      <img
        className="image-band-img"
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transformOrigin: "center center",
          animation: inView
            ? "imageBandKenBurns 22s ease-in-out infinite"
            : "none",
          transform: inView ? undefined : "scale(1.05)",
          willChange: "transform",
        }}
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(rgba(242,236,206,0.08), rgba(75,115,113,0.05))",
          }}
        />
      )}
    </div>
  );
}
