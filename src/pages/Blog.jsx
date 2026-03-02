import React from "react";
import { fetchBlogPosts } from "@/lib/sanityClient";
import BlogCard from "@/components/blog/BlogCard";
import SuburbProfilesStrip from "@/components/blog/SuburbProfilesStrip";
import CTASection from "@/components/shared/CTASection.jsx";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { createPageUrl } from "@/utils";

export default function Blog() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
      {/* Editorial page header */}
      <section
        className="bg-warm-gradient"
        style={{ padding: "var(--section-breathing-lg) 0 var(--section-standard-lg)" }}
      >
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Insights</p>
              <h1 className="mb-4">Blog</h1>
              <p className="intro-text mx-auto" style={{ maxWidth: "36rem" }}>
                Market insights, buying tips, suburb profiles and local
                knowledge to help you make informed property decisions in the
                Northern Rivers and Southern Gold Coast.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section
        className="bg-white border-b border-[var(--border)]"
        style={{ padding: "var(--section-compact) 0" }}
      >
        <div className="site-container">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={!category}
              onClick={() => handleChange({ ...value, category: undefined })}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                !category
                  ? "bg-[var(--hills)] text-white border-[var(--hills)]"
                  : "bg-white text-[var(--ink)] border-[var(--border)] hover:bg-[var(--bright-grey)]"
              }`}
            >
              All
            </button>
            {categoryOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={category === cat}
                onClick={() => handleChange({ ...value, category: cat })}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  category === cat
                    ? "bg-[var(--hills)] text-white border-[var(--hills)]"
                    : "bg-white text-[var(--ink)] border-[var(--border)] hover:bg-[var(--bright-grey)]"
                }`}
              >
                {cat
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
            {(category || tag) && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-[var(--stone)] hover:text-[var(--hills)] underline underline-offset-2 ml-1 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {tagOptions.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {tagOptions.slice(0, 8).map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={tag === t}
                  onClick={() =>
                    handleChange({ ...value, tag: tag === t ? undefined : t })
                  }
                  className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                    tag === t
                      ? "bg-[var(--hills)]/10 text-[var(--hills)] border-[var(--hills)]/30"
                      : "text-[var(--stone)] border-[var(--border)] hover:bg-[var(--bright-grey)]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Suburb Profiles */}
      {!loading && (
        <section style={{ padding: "var(--section-standard) 0 0" }}>
          <SuburbProfilesStrip posts={posts} />
        </section>
      )}

      {/* Post grid */}
      <section
        style={{ padding: "var(--section-standard) 0 var(--section-standard-lg)" }}
      >
        <div className="site-container">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCard key={i} item={null} />
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filtered.map((it) => (
                <BlogCard key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 400,
                  fontSize: "1.375rem",
                  letterSpacing: "-0.01em",
                  marginBottom: "8px",
                }}
              >
                No posts match your filters
              </div>
              <p
                style={{
                  color: "var(--stone)",
                  fontWeight: "var(--font-body-light)",
                  fontSize: "1rem",
                  marginBottom: "24px",
                }}
              >
                Try clearing filters to see all posts.
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center px-4 py-2 rounded-full border border-[var(--border)] text-[var(--ink)] hover:bg-[var(--bright-grey)] transition-colors text-sm"
              >
                Clear filters
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
      />
    </div>
  );
}
