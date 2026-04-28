import React from "react";

/**
 * ReviewsBadge — native Google reviews badge.
 * Replaces the third-party Embed My Reviews widget with a clean,
 * lightweight component that renders inline on the hero.
 *
 * Props let you override rating/count when data changes.
 * Styled for white-on-dark/video backgrounds by default.
 */

const GOOGLE_G = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

function Star({ filled = true, emptyColor = "rgba(255,255,255,0.25)" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 20 20"
      fill={filled ? "#FBBC05" : emptyColor}
      aria-hidden="true"
    >
      <path d="M10 1.12l2.39 5.73 6.18.57c.48.04.67.64.32.99l-4.68 4.2 1.4 6.05c.1.46-.4.82-.8.58L10 15.89l-5.41 3.35c-.42.24-.92-.12-.82-.58l1.4-6.05-4.68-4.2c-.35-.35-.16-.95.32-.99l6.18-.57L10 1.12z" />
    </svg>
  );
}

const VARIANTS = {
  dark: {
    bg: "rgba(255,255,255,0.1)",
    bgHover: "rgba(255,255,255,0.16)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderHover: "rgba(255,255,255,0.25)",
    color: "#fff",
    divider: "rgba(255,255,255,0.25)",
    count: "rgba(255,255,255,0.7)",
    starEmpty: "rgba(255,255,255,0.25)",
    blur: true,
  },
  light: {
    bg: "rgba(255,255,255,0.9)",
    bgHover: "#ffffff",
    border: "1px solid rgba(26,26,26,0.08)",
    borderHover: "rgba(26,26,26,0.16)",
    color: "var(--ink)",
    divider: "rgba(26,26,26,0.12)",
    count: "var(--stone)",
    starEmpty: "rgba(26,26,26,0.12)",
    blur: false,
  },
};

export default function ReviewsBadge({
  rating = 5.0,
  reviewCount = 84,
  href = "https://www.google.com/maps/place/Compass+Buyers+Agency",
  variant = "dark",
}) {
  const v = VARIANTS[variant] || VARIANTS.dark;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.625rem",
        padding: "0.5rem 0.875rem",
        background: v.bg,
        backdropFilter: v.blur ? "blur(12px)" : undefined,
        WebkitBackdropFilter: v.blur ? "blur(12px)" : undefined,
        borderRadius: "999px",
        border: v.border,
        textDecoration: "none",
        color: v.color,
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
        boxShadow: variant === "light" ? "0 1px 3px rgba(0,0,0,0.04)" : undefined,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = v.bgHover;
        e.currentTarget.style.borderColor = v.borderHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = v.bg;
        e.currentTarget.style.borderColor = v.border.split(" ").slice(-1)[0];
      }}
      aria-label={`Rated ${rating} out of 5 from ${reviewCount} Google reviews`}
    >
      {GOOGLE_G}

      <span
        style={{
          fontSize: "0.9375rem",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          lineHeight: 1,
        }}
      >
        {rating.toFixed(1)}
      </span>

      <span style={{ display: "inline-flex", gap: "1px", lineHeight: 0 }}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} filled={i < Math.round(rating)} emptyColor={v.starEmpty} />
        ))}
      </span>
    </a>
  );
}
