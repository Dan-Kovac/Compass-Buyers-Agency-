import React from "react";

/**
 * Full-width atmospheric image divider.
 * Pure visual — no text, no CTA. Creates breathing room between sections.
 *
 * @param {string} src - Image URL
 * @param {string} alt - Alt text
 * @param {string} height - CSS height (default "280px")
 * @param {boolean} overlay - Adds warm tint overlay
 * @param {boolean} parallax - CSS parallax on desktop (background-attachment: fixed)
 */
export default function ImageBand({
  src,
  alt = "",
  height = "280px",
  mobileHeight = "180px",
  overlay = true,
  parallax = false,
}) {
  // Use window width to determine if mobile — but CSS handles the actual sizing
  const responsiveHeight = `clamp(${mobileHeight}, 20vw, ${height})`;

  if (parallax) {
    return (
      <div
        className="w-full relative"
        style={{
          height: responsiveHeight,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
        role="img"
        aria-label={alt}
      >
        {overlay && (
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(rgba(242,236,206,0.08), rgba(75,115,113,0.05))",
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="w-full relative overflow-hidden" style={{ height: responsiveHeight }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      {overlay && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(242,236,206,0.08), rgba(75,115,113,0.05))",
          }}
        />
      )}
    </div>
  );
}
