import React from "react";
import { fetchBlogPosts } from "@/lib/sanityClient";
import BlogCard from "@/components/blog/BlogCard";
import FeaturedPost from "@/components/blog/FeaturedPost";
import CTASection from "@/components/shared/CTASection.jsx";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";
import PageHero from "@/components/shared/PageHero";
import { createPageUrl } from "@/utils";
import SEOHead from "../components/shared/SEOHead";

const INITIAL_COUNT = 9;
const INCREMENT = 6;

export default function Blog() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [visibleCount, setVisibleCount] = React.useState(INITIAL_COUNT);
  const [allShownMessageVisible, setAllShownMessageVisible] = React.useState(false);

  const [category, setCategory] = React.useState();
  const [tag, setTag] = React.useState();

  React.useEffect(() => {
    (async () => {
      const list = await fetchBlogPosts();
      setPosts(Array.isArray(list) ? list : []);
      setLoading(false);
    })();
  }, []);

  // Read initial filters from URL (?tag=...&category=...)
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tagParam = params.get("tag");
    const catParam = params.get("category");
    if (tagParam) setTag(tagParam);
    if (catParam) setCategory(catParam);
  }, []);

  // Keep URL in sync for shareable links
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tag) params.set("tag", tag);
    const query = params.toString();
    const url = createPageUrl(`Blog${query ? `?${query}` : ""}`);
    window.history.replaceState(null, "", url);
  }, [category, tag]);

  const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));

  const rawCats = uniq(posts.map((p) => p.category));
  const categoryOptions = [...rawCats].sort((a, b) => {
    if (a === "suburb-profiles") return -1;
    if (b === "suburb-profiles") return 1;
    return String(a).localeCompare(String(b));
  });
  const tagOptions = uniq(
    posts.flatMap((p) => (Array.isArray(p.tags) ? p.tags : []))
  );

  const filtered = posts.filter((p) => {
    const a = !category || p.category === category;
    const b = !tag || (Array.isArray(p.tags) && p.tags.includes(tag));
    return a && b;
  });

  // Featured post selection: prefer featured flag, then most recent
  const featuredPost = filtered.find((p) => p.featured === true) || filtered[0];
  const featuredPostId = featuredPost?.id;

  // Grid posts exclude the featured post
  const gridPosts = filtered.filter((p) => p.id !== featuredPostId);
  const visiblePosts = gridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < gridPosts.length;

  const handleLoadMore = () => {
    const nextCount = visibleCount + INCREMENT;
    setVisibleCount(nextCount);
    if (nextCount >= gridPosts.length) {
      setAllShownMessageVisible(true);
      setTimeout(() => setAllShownMessageVisible(false), 2000);
    }
  };

  // Reset visible count when filters change
  React.useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [category, tag]);

  const value = { category, tag };
  const handleChange = (next) => {
    setCategory(next.category);
    setTag(next.tag);
  };
  const handleClear = () => {
    setCategory(undefined);
    setTag(undefined);
  };

  return (
    <div className="bg-white">
      <SEOHead
        title="Blog | Northern Rivers & Gold Coast Property Insights"
        description="Market updates, suburb profiles and buying guides for Byron Bay, Tweed Coast and Southern Gold Coast. Data-led insights from local buyers agents."
        canonicalPath="/blog"
      />

      {/* Blog CollectionPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog - Compass Buyers Agency",
            url: "https://compassagency.com.au/blog",
            description: "Market insights, buying tips, suburb profiles and local knowledge to help you make informed property decisions in the Northern Rivers and Southern Gold Coast.",
            publisher: {
              "@type": "Organization",
              name: "Compass Buyers Agency",
              url: "https://compassagency.com.au",
              logo: {
                "@type": "ImageObject",
                url: "https://compassagency.com.au/logo.png",
              },
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: filtered.slice(0, 10).map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `https://compassagency.com.au/blog/${p.slug?.current || p.slug || p.id}`,
                name: p.title,
              })),
            },
          }),
        }}
      />

      <PageHero
        eyebrow="Insights"
        title="Local Knowledge, Written Down"
        subtitle="Market insights, buying tips, suburb profiles and local knowledge to help you make informed property decisions in the Northern Rivers and Southern Gold Coast."
        backgroundImage="/images/pages/blog.jpg"
        objectPosition="center 60%"
      />

      {/* Filters */}
      <section
        style={{
          background: "white",
          padding: "var(--section-padding-compact) 0",
          boxShadow: "0 1px 0 0 rgba(0,0,0,0.04)",
        }}
      >
        <div className="site-container">
          <div className="flex flex-wrap items-center" style={{ gap: "0.5rem" }}>
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => handleChange({ ...value, category: undefined })}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                fontWeight: !category ? "var(--font-body-medium)" : "var(--font-body-regular)",
                letterSpacing: "0.01em",
                padding: "0.625rem 1.25rem",
                minHeight: "44px",
                borderRadius: "var(--radius-badge)",
                border: "1.5px solid",
                borderColor: !category ? "var(--hills)" : "var(--bright-grey)",
                background: !category ? "var(--hills)" : "transparent",
                color: !category ? "white" : "var(--ink)",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
              onMouseEnter={(e) => {
                if (category) {
                  e.currentTarget.style.background = "var(--bright-grey)";
                }
              }}
              onMouseLeave={(e) => {
                if (category) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              All
            </button>
            {categoryOptions.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => handleChange({ ...value, category: cat })}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? "var(--font-body-medium)" : "var(--font-body-regular)",
                    letterSpacing: "0.01em",
                    padding: "0.625rem 1.25rem",
                    minHeight: "44px",
                    borderRadius: "var(--radius-badge)",
                    border: "1.5px solid",
                    borderColor: isActive ? "var(--hills)" : "var(--bright-grey)",
                    background: isActive ? "var(--hills)" : "transparent",
                    color: isActive ? "white" : "var(--ink)",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "var(--bright-grey)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  {cat
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </button>
              );
            })}
            {(category || tag) && (
              <button
                type="button"
                onClick={handleClear}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  fontWeight: "var(--font-body-regular)",
                  color: "var(--stone)",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                  cursor: "pointer",
                  marginLeft: "0.25rem",
                  transition: "color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--hills)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--stone)";
                }}
              >
                Clear
              </button>
            )}
          </div>
          {tagOptions.length > 0 && (
            <div
              className="flex flex-wrap items-center"
              style={{ gap: "0.5rem", marginTop: "0.75rem" }}
            >
              {tagOptions.slice(0, 8).map((t) => {
                const isActive = tag === t;
                return (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      handleChange({ ...value, tag: tag === t ? undefined : t })
                    }
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      fontWeight: "var(--font-body-light)",
                      letterSpacing: "0.01em",
                      padding: "0.375rem 0.875rem",
                      minHeight: "36px",
                      borderRadius: "var(--radius-badge)",
                      border: isActive
                        ? "1px solid rgba(75, 115, 113, 0.25)"
                        : "1px solid var(--bright-grey)",
                      background: isActive
                        ? "rgba(75, 115, 113, 0.08)"
                        : "transparent",
                      color: isActive ? "var(--hills)" : "var(--stone)",
                      cursor: "pointer",
                      transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "var(--bright-grey)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Post */}
      {!loading && <FeaturedPost posts={posts} filteredPosts={filtered} />}

      {/* Post grid */}
      <section style={{ padding: "var(--section-padding) 0" }}>
        <div className="site-container">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCard key={i} item={null} />
              ))}
            </div>
          ) : visiblePosts.length ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                <StaggerGroup stagger={120}>
                  {visiblePosts.map((it) => (
                    <ScrollReveal key={it.id} animation="scale-subtle" duration={600}>
                      <BlogCard item={it} />
                    </ScrollReveal>
                  ))}
                </StaggerGroup>
              </div>

              {/* Load more / count */}
              {(hasMore || allShownMessageVisible) && (
                <div style={{ textAlign: "center", marginTop: "var(--section-padding-compact)" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.8125rem",
                      fontWeight: "var(--font-body-light)",
                      color: "var(--stone)",
                      marginBottom: hasMore ? "0.75rem" : 0,
                      transition: "opacity 0.5s ease",
                      opacity: allShownMessageVisible && !hasMore ? 1 : hasMore ? 1 : 0,
                    }}
                  >
                    {hasMore
                      ? `Showing ${visiblePosts.length} of ${gridPosts.length} articles`
                      : `Showing all ${gridPosts.length} articles`}
                  </p>
                  {hasMore && (
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      style={{
                        display: "inline-block",
                        fontFamily: "var(--font-body)",
                        fontSize: "0.9375rem",
                        fontWeight: "var(--font-body-medium)",
                        padding: "0.875rem 2.5rem",
                        border: "1.5px solid var(--bright-grey)",
                        borderRadius: "var(--radius-button)",
                        background: "transparent",
                        color: "var(--ink)",
                        minHeight: "48px",
                        minWidth: "200px",
                        cursor: "pointer",
                        transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--ink)";
                        e.currentTarget.style.background = "var(--ink)";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--bright-grey)";
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "var(--ink)";
                      }}
                    >
                      Load more articles
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "var(--section-padding) 0" }}>
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                  color: "var(--ink)",
                  marginBottom: "0.5rem",
                }}
              >
                No articles match your filters
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: "var(--font-body-light)",
                  fontSize: "1rem",
                  color: "var(--stone)",
                  marginBottom: "1.5rem",
                }}
              >
                Try a different category or browse all our articles.
              </p>
              <button
                type="button"
                onClick={handleClear}
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  fontWeight: "var(--font-body-medium)",
                  padding: "0.875rem 2.5rem",
                  border: "1.5px solid var(--bright-grey)",
                  borderRadius: "var(--radius-button)",
                  background: "transparent",
                  color: "var(--ink)",
                  minHeight: "48px",
                  minWidth: "200px",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--ink)";
                  e.currentTarget.style.background = "var(--ink)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--bright-grey)";
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--ink)";
                }}
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Want buyer insights tailored to you?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        supportingText="Local expertise, independent advice, proven results"
        variant="dark"
      />
    </div>
  );
}
