import React from "react";
import { fetchBlogPosts } from "@/lib/sanityClient";
import BlogCard from "@/components/blog/BlogCard";
import BlogMinimalFilters from "@/components/blog/BlogMinimalFilters";
import SuburbProfilesStrip from "@/components/blog/SuburbProfilesStrip";
import CTASection from "@/components/shared/CTASection.jsx";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function Blog() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [category, setCategory] = React.useState();
  const [tag, setTag] = React.useState();

  const navigate = useNavigate();

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

  // Keep URL in sync for shareable links (no navigation)
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
  const tagOptions = uniq(posts.flatMap((p) => Array.isArray(p.tags) ? p.tags : []));

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
      {/* Minimal, centered hero */}
      <section className="py-12 bg-white">
        <div className="site-container">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mx-auto">
              Blog
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Market insights, buying tips, suburb profiles and local knowledge to help you make informed property decisions in the Northern Rivers and Southern Gold Coast.
            </p>
          </div>
        </div>
      </section>

      {/* Priority quick-access row */}
      <section className="py-4 bg-white border-t border-[var(--border)]">
        <div className="site-container">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => handleChange({ ...value, category: undefined })}
              className={`px-4 py-2 rounded-full text-sm border ${!category ? 'bg-[var(--hills)] text-white border-[var(--hills)]' : 'bg-white text-[var(--ink)]/80 border-[var(--border)] hover:bg-[var(--bright-grey)]'}`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => handleChange({ ...value, category: "suburb-profiles" })}
              className={`px-4 py-2 rounded-full text-sm border ${category === 'suburb-profiles' ? 'bg-[var(--hills)] text-white border-[var(--hills)]' : 'bg-white text-[var(--ink)]/80 border-[var(--border)] hover:bg-[var(--bright-grey)]'}`}
            >
              Suburb Profiles
            </button>
          </div>
        </div>
      </section>

      {/* Minimal filter row - aligned with Case Studies */}
      <section className="py-6 bg-white border-t border-b border-[var(--border)]">
        <BlogMinimalFilters
          categoryOptions={categoryOptions}
          tagOptions={tagOptions}
          value={value}
          onChange={handleChange}
          onClear={handleClear}
        />
      </section>

      {/* Featured Suburb Profiles (first two) */}
      {!loading && (
        <section className="pt-4 pb-0 bg-white">
          <SuburbProfilesStrip posts={posts} />
        </section>
      )}

      {/* Grid of posts */}
      <section className="py-10 bg-white">
        <div className="site-container">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <BlogCard key={i} item={null} />
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => (
                <BlogCard key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-xl font-semibold text-gray-700 mb-2">No posts match your filters</div>
              <p className="text-gray-500 mb-6">Try clearing filters to see all posts.</p>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center px-4 py-2 rounded-md border border-[var(--border)] text-gray-700 hover:bg-gray-50"
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
        onButtonClick={() => navigate(createPageUrl("Contact"))}
        supportingText="Local expertise • Independent advice • Proven results"
      />
    </div>
  );
}
