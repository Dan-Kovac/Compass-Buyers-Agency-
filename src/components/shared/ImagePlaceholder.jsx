import React from "react";

/**
 * Branded placeholder for content without images.
 * Renders a warm gradient background with a large serif initial letter.
 *
 * @param {string} title - Title to extract first letter from
 * @param {string} className - Additional classes (e.g., aspect ratio)
 */
export default function ImagePlaceholder({ title = "", className = "" }) {
  const initial = (title.charAt(0) || "C").toUpperCase();

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        background: "linear-gradient(135deg, var(--sea-breeze) 0%, var(--sand) 100%)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(4rem, 8vw, 6rem)",
          fontWeight: 400,
          color: "var(--hills)",
          opacity: 0.18,
          lineHeight: 1,
          userSelect: "none",
        }}
        aria-hidden="true"
      >
        {initial}
      </span>
    </div>
  );
}
