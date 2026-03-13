import React from "react";
import { resolveImageUrl } from "@/lib/sanityClient";
import ImagePlaceholder from "@/components/shared/ImagePlaceholder";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { estimateReadingTime } from "@/utils/readingTime";
import { formatDate } from "@/utils/formatDate";

/**
 * Hero featured post component for the Blog listing page.
 * Two-column split: 55% image left, 45% content right.
 *
 * Selection logic:
 * 1. If any post has `featured === true`, use the most recent featured post
 * 2. Otherwise, use the first post in the filtered results (most recent)
 * 3. If no posts match, skip this section entirely
 */
export default function FeaturedPost({ posts = [], filteredPosts = [] }) {
  // Selection: prefer featured post matching current filter, then most recent
  const pool = filteredPosts.length > 0 ? filteredPosts : posts;
  const featuredPost = pool.find((p) => p.featured === true) || pool[0];

  if (!featuredPost) return null;

  const img = resolveImageUrl(featuredPost.image, featuredPost.featured_image, { width: 1200 });
  const category = featuredPost.category || "";
  const title = featuredPost.title || "Untitled";
  const excerpt = featuredPost.excerpt || "";
  const readingTime = estimateReadingTime(featuredPost.content);
  const dateStr = formatDate(featuredPost.published_date || featuredPost.created_date, "long");
  const href = `/blog/${featuredPost.slug || featuredPost.id}`;

  return (
    <section className="bg-sand-wash" style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <a href={href} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
            {/* Image column */}
            <ScrollReveal animation="fade-right">
              <div
                className="overflow-hidden"
                style={{
                  aspectRatio: "16/10",
                  borderRadius: "var(--radius-card)",
                }}
              >
                {img ? (
                  <img
                    src={img}
                    alt={title}
                    className="block w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.02]"
                    style={{ objectPosition: "center" }}
                    loading="lazy"
                  />
                ) : (
                  <ImagePlaceholder title={title} className="w-full h-full" />
                )}
              </div>
            </ScrollReveal>

            {/* Content column */}
            <ScrollReveal animation="fade-left" delay={120}>
              <div className="flex flex-col justify-center">
                {/* Category badge */}
                {category && (
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.6875rem",
                      fontWeight: "var(--font-body-medium)",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--hills)",
                      marginBottom: "1rem",
                    }}
                  >
                    {category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                  </div>
                )}

                {/* Title */}
                <h2
                  className="line-clamp-3"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {title}
                </h2>

                {/* Excerpt */}
                {excerpt && (
                  <p
                    className="line-clamp-3"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: "var(--font-body-light)",
                      fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
                      lineHeight: 1.7,
                      color: "var(--stone)",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {excerpt}
                  </p>
                )}

                {/* Reading time + date row */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-body-light)",
                    fontSize: "0.8125rem",
                    color: "var(--stone)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
                  }}
                >
                  {readingTime && <span>{readingTime} min read</span>}
                  {readingTime && dateStr && (
                    <span style={{ color: "var(--bright-grey)" }}>|</span>
                  )}
                  {dateStr && <span>{dateStr}</span>}
                </div>

                {/* Read more link (hidden on mobile since card is tappable) */}
                <div
                  className="hidden lg:flex items-center gap-2"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: "var(--font-body-medium)",
                    fontSize: "0.9375rem",
                    color: "var(--hills)",
                    marginTop: "auto",
                  }}
                >
                  <span>Read article</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </a>
      </div>
    </section>
  );
}
