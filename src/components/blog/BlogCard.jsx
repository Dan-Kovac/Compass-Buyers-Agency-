import React from "react";
import { resolveImageUrl } from "@/lib/sanityClient";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import { estimateReadingTime } from "@/utils/readingTime";
import { formatDate } from "@/utils/formatDate";

export default function BlogCard({ item }) {
  if (!item) {
    return (
      <div
        className="overflow-hidden bg-white h-full flex flex-col"
        style={{
          borderRadius: "var(--radius-card)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <div className="aspect-[16/10] bg-[var(--bright-grey)]" />
        <div style={{ padding: "clamp(1.25rem, 2.5vw, 1.5rem)" }}>
          <div className="h-3 w-1/3 bg-[var(--bright-grey)] rounded mb-3" />
          <div className="h-4 w-5/6 bg-[var(--bright-grey)] rounded mb-2" />
          <div className="h-4 w-2/3 bg-[var(--bright-grey)] rounded mb-4" />
          <div className="h-3 w-1/2 bg-[var(--bright-grey)] rounded" />
        </div>
      </div>
    );
  }

  const img = resolveImageUrl(item.image, item.featured_image, { width: 800 });
  const category = item.category || "";
  const title = item.title || "Untitled";
  const excerpt = item.excerpt || "";
  const readingTime = estimateReadingTime(item.content);
  const dateStr = formatDate(item.published_date || item.created_date, "short");

  return (
    <a
      href={`/blog/${item.slug || item.id}`}
      className="group h-full block"
    >
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
          className="shrink-0 overflow-hidden"
          style={{
            aspectRatio: "16/10",
            borderRadius: "var(--radius-card) var(--radius-card) 0 0",
          }}
        >
          {img ? (
            <img
              src={img}
              alt={title}
              className="block w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
              style={{ objectPosition: "center" }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <ImagePlaceholder title={title} className="w-full h-full" />
          )}
        </div>

        {/* Content */}
        <div
          className="flex-1 flex flex-col"
          style={{ padding: "clamp(1.25rem, 2.5vw, 1.5rem)" }}
        >
          {/* Category label */}
          {category && (
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
              {category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            </div>
          )}

          {/* Title */}
          <h3
            className="line-clamp-2"
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
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
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
              {excerpt}
            </p>
          )}

          {/* Meta row: date + reading time */}
          <div
            style={{
              marginTop: "auto",
              paddingTop: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: "var(--font-body-light)",
              color: "var(--stone)",
            }}
          >
            {dateStr && <span>{dateStr}</span>}
            {dateStr && readingTime && (
              <span style={{ color: "var(--bright-grey)", margin: "0 0.25rem" }}>{"\u00B7"}</span>
            )}
            {readingTime && <span>{readingTime} min read</span>}
          </div>
        </div>
      </div>
    </a>
  );
}
