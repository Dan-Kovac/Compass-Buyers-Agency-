import React from "react";
import { Link } from "react-router-dom";
import { resolveImageUrl } from "@/lib/sanityClient";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop";

export default function CaseStudyCard({ item }) {
  if (!item) {
    return (
      <div
        className="overflow-hidden bg-white h-full flex flex-col animate-pulse"
        style={{
          borderRadius: "var(--radius-card)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="aspect-[4/3] bg-[var(--bright-grey)]" />
        <div style={{ padding: "clamp(1.25rem, 2.5vw, 1.5rem)" }}>
          <div className="h-3 w-1/3 bg-[var(--bright-grey)] rounded mb-3" />
          <div className="h-5 w-5/6 bg-[var(--bright-grey)] rounded mb-2" />
          <div className="h-3 w-2/3 bg-[var(--bright-grey)] rounded" />
        </div>
      </div>
    );
  }

  const to = `/case-studies/${item.slug || item.id}`;
  const img = resolveImageUrl(item.image, item.featured_image, { width: 800 }) || PLACEHOLDER_IMG;

  return (
    <Link to={to} className="group h-full block">
      <div
        className="overflow-hidden bg-white h-full flex flex-col"
        style={{
          borderRadius: "var(--radius-card)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          transition: "box-shadow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div
          className="shrink-0 overflow-hidden relative"
          style={{
            aspectRatio: "4/3",
            borderRadius: "var(--radius-card) var(--radius-card) 0 0",
          }}
        >
          <img
            src={img}
            alt={item.title || "Case study"}
            className="block w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: "center" }}
            loading="lazy"
            decoding="async"
            onError={(e) => {
              if (e.currentTarget.src !== PLACEHOLDER_IMG) e.currentTarget.src = PLACEHOLDER_IMG;
            }}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Property type badge */}
          {item.property_type && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-[var(--ink)] border border-[var(--border)] shadow-sm">
                {item.property_type}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div
          className="flex-1 flex flex-col"
          style={{ padding: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
        >
          {/* Location label */}
          {item.location && (
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                fontWeight: "var(--font-body-medium)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--hills)",
                marginBottom: "0.625rem",
              }}
            >
              {item.location}
            </div>
          )}

          {/* Title */}
          <h3
            className="line-clamp-2 group-hover:text-[var(--hills)] transition-colors"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(1.125rem, 1.5vw, 1.3125rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              color: "var(--ink)",
              marginBottom: "0.5rem",
            }}
          >
            {item.title || "Untitled case study"}
          </h3>

          {/* Excerpt */}
          {item.excerpt && (
            <p
              className="line-clamp-2"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-body-light)",
                fontSize: "clamp(0.875rem, 1vw, 0.9375rem)",
                lineHeight: 1.65,
                color: "var(--stone)",
                marginBottom: 0,
              }}
            >
              {item.excerpt}
            </p>
          )}

          {/* Client type tag */}
          {item.client_type && (
            <div
              style={{
                marginTop: "auto",
                paddingTop: "1rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                fontWeight: "var(--font-body-light)",
                color: "var(--stone)",
              }}
            >
              {item.client_type}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
