import React, { useRef, useEffect } from "react";

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
  const imgRef = useRef(null);

  useEffect(() => {
    if (!parallax || !containerRef.current || !imgRef.current) return;
    const container = containerRef.current;
    const img = imgRef.current;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = (winH - rect.top) / (winH + rect.height);
      // Shift the image ±15% of container height as it scrolls through viewport
      const offset = (progress - 0.5) * rect.height * 0.3;
      img.style.transform = `translateY(${offset.toFixed(1)}px)`;
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [parallax]);

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden"
      style={{ height: responsiveHeight }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          position: "absolute",
          top: "-15%",
          left: 0,
          width: "100%",
          height: parallax ? "130%" : "100%",
          objectFit: "cover",
          objectPosition: "center",
          willChange: parallax ? "transform" : undefined,
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
