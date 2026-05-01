import React from "react";
import { resolveImageUrl } from "@/lib/sanityClient";
import { estimateReadingTime } from "@/utils/readingTime";
import { formatDate } from "@/utils/formatDate";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ArticlePreviewFrame({ data = {}, settings = {}, type = "article" }) {
  const {
    title,
    content,
    excerpt,
    image,
    featured_image,
    gallery,
    property_images = [],
    author,
    created_date,
    published_date,
    category,
    tags = [],
    property_type,
    location,
    client_type,
  } = data;

  const heroImg = resolveImageUrl(image, featured_image, { width: 1200 });
  const feat = Array.isArray(gallery) && gallery.length
    ? gallery.map((g) => resolveImageUrl(g) || "").filter(Boolean)
    : Array.isArray(property_images) && property_images.length
    ? property_images
    : heroImg
    ? [heroImg]
    : [];

  const hero = feat[0] || null;
  const galleryImages = feat.slice(1);

  const maxW = settings.content_max_width ? `${settings.content_max_width}px` : "820px";

  const displayDate = published_date || created_date;
  const readingTime = estimateReadingTime(content);
  const dateStr = formatDate(displayDate, "long");

  const formatCategoryLabel = (cat) => {
    if (!cat) return "";
    return cat.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <article className="site-container" style={{ paddingTop: "var(--section-padding-compact)", paddingBottom: 0 }}>
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        {/* Category + property badges */}
        <ScrollReveal>
          {settings.show_badges !== false && (
            <div className="flex flex-wrap gap-2" style={{ marginBottom: "1.25rem" }}>
              {category && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    fontWeight: "var(--font-body-medium)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--hills)",
                    background: "rgba(75, 115, 113, 0.06)",
                    padding: "0.375rem 0.875rem",
                    borderRadius: "var(--radius-badge)",
                  }}
                >
                  {formatCategoryLabel(category)}
                </span>
              )}
              {property_type && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    fontWeight: "var(--font-body-medium)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "white",
                    background: "var(--hills)",
                    padding: "0.375rem 0.875rem",
                    borderRadius: "var(--radius-badge)",
                  }}
                >
                  {property_type}
                </span>
              )}
              {location && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    fontWeight: "var(--font-body-medium)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--stone)",
                    border: "1px solid var(--bright-grey)",
                    padding: "0.375rem 0.875rem",
                    borderRadius: "var(--radius-badge)",
                  }}
                >
                  {location}
                </span>
              )}
              {client_type && (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.6875rem",
                    fontWeight: "var(--font-body-medium)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--stone)",
                    border: "1px solid var(--bright-grey)",
                    padding: "0.375rem 0.875rem",
                    borderRadius: "var(--radius-badge)",
                  }}
                >
                  {client_type.replace(/-/g, " ")}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.12,
              color: "var(--ink)",
              marginBottom: "1rem",
              maxWidth: "820px",
            }}
          >
            {title || "Untitled"}
          </h1>

          {/* Excerpt / Standfirst */}
          {settings.show_excerpt !== false && excerpt && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-body-light)",
                fontSize: "clamp(1.0625rem, 1.4vw, 1.25rem)",
                lineHeight: 1.65,
                color: "var(--stone)",
                marginBottom: "1.5rem",
                maxWidth: "820px",
              }}
            >
              {excerpt}
            </p>
          )}

          {/* Meta row */}
          {settings.show_meta !== false && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.75rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: "var(--font-body-light)",
                color: "var(--stone)",
                marginBottom: "2rem",
                paddingBottom: "1.5rem",
                borderBottom: "1px solid var(--bright-grey)",
              }}
            >
              {author && (
                <>
                  <span>By {author}</span>
                  <span style={{ color: "var(--bright-grey)" }}>|</span>
                </>
              )}
              {dateStr && (
                <>
                  <span>{dateStr}</span>
                  <span style={{ color: "var(--bright-grey)" }}>|</span>
                </>
              )}
              {readingTime && <span>{readingTime} min read</span>}
            </div>
          )}
        </ScrollReveal>
      </div>

      {/* Hero image -- wider than text column for editorial impact */}
      {hero && (
        <ScrollReveal animation="fade-in" delay={200}>
          <div
            className="mx-auto overflow-hidden"
            style={{
              maxWidth: "min(1000px, 100%)",
              aspectRatio: "16/9",
              borderRadius: "var(--radius-card)",
              marginBottom: "2.5rem",
            }}
          >
            <img
              src={hero}
              alt={title || ""}
              className="w-full h-full object-cover"
              style={{ objectPosition: "center" }}
              loading="lazy"
              decoding="async"
            />
          </div>
        </ScrollReveal>
      )}

      {/* Article body */}
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />

        {/* Gallery (for case studies with additional images) */}
        {settings.show_gallery !== false && galleryImages.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 400,
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
                color: "var(--ink)",
                marginBottom: "1rem",
              }}
            >
              Gallery
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden"
                  style={{ borderRadius: "var(--radius-card)" }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
