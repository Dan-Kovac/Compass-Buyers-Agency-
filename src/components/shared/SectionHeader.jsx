import React from "react";

/**
 * Reusable editorial section header.
 * Standardises the eyebrow → heading → subtitle pattern across all pages.
 *
 * @param {string} eyebrow - Small uppercase label above heading
 * @param {string} heading - H2 heading text
 * @param {string} subtitle - Optional paragraph below heading (rendered in Aeonik Light)
 * @param {"left"|"center"} align - Text alignment (default "center")
 * @param {string} maxWidth - Max width for the header block
 * @param {boolean} divider - Show thin decorative line between eyebrow and heading
 * @param {boolean} dark - Invert colours for dark backgrounds
 */
export default function SectionHeader({
  eyebrow,
  heading,
  subtitle,
  align = "center",
  maxWidth = "48rem",
  divider = false,
  dark = false,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={`${isCenter ? "text-center mx-auto" : ""} mb-10 md:mb-14`}
      style={{ maxWidth }}
    >
      {eyebrow && (
        <p
          className="eyebrow-label"
          style={dark ? { color: "var(--sand)" } : undefined}
        >
          {eyebrow}
        </p>
      )}

      {divider && (
        <div
          className={`section-divider my-4 ${isCenter ? "" : "left"}`}
          style={dark ? { background: "rgba(255,255,255,0.15)" } : undefined}
        />
      )}

      <h2
        style={dark ? { color: "#fff" } : undefined}
      >
        {heading}
      </h2>

      {subtitle && (
        <p
          className="intro-text"
          style={{
            ...(isCenter ? { marginLeft: "auto", marginRight: "auto" } : {}),
            ...(dark ? { color: "rgba(255,255,255,0.75)" } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
