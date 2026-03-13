import React from "react";
import { fetchBlogPosts } from "@/lib/sanityClient";
import BlogCard from "@/components/blog/BlogCard";
import SectionHeader from "@/components/shared/SectionHeader";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";
import { createPageUrl } from "@/utils";

export default function RelatedBlogs({ currentId, limit = 3 }) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const list = await fetchBlogPosts();
      const filtered = (list || []).filter((p) => p.id !== currentId).slice(0, limit);
      setItems(filtered);
      setLoading(false);
    })();
  }, [currentId, limit]);

  return (
    <section
      className="bg-sand-wash"
      style={{
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div className="site-container">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Keep Reading"
            heading="Recent Articles"
            subtitle="More insights from the Northern Rivers and Gold Coast"
            align="center"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {loading ? (
            Array.from({ length: limit }).map((_, i) => (
              <BlogCard key={`skeleton-${i}`} item={null} />
            ))
          ) : items.length ? (
            <StaggerGroup stagger={120}>
              {items.map((it) => (
                <ScrollReveal key={it.id}>
                  <BlogCard item={it} />
                </ScrollReveal>
              ))}
            </StaggerGroup>
          ) : (
            Array.from({ length: limit }).map((_, i) => (
              <BlogCard key={`fallback-${i}`} item={null} />
            ))
          )}
        </div>

        {/* View all articles link */}
        <ScrollReveal>
          <div style={{ textAlign: "center", marginTop: "var(--section-padding-compact)" }}>
            <a
              href={createPageUrl("Blog")}
              className="text-link"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: "var(--font-body-medium)",
                fontSize: "0.9375rem",
              }}
            >
              View all articles &rarr;
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
