import React from "react";
import BlogCard from "@/components/blog/BlogCard";

export default function SuburbProfilesStrip({ posts = [] }) {
  const list = Array.isArray(posts) ? posts : [];
  const primary = list.filter((p) => p && p.category === "suburb-profiles");

  // Fallback: if fewer than 2 explicitly categorised, pick likely suburb profiles by slug/title/tags
  let items = primary.slice(0, 2);
  if (items.length < 2) {
    const HINTS = ["byron", "brunswick", "kingscliff", "cabarita", "casuarina", "lennox", "ballina"];
    const isCandidate = (p) => {
      const title = String(p?.title || "").toLowerCase();
      const slug = String(p?.slug || "").toLowerCase();
      const tags = Array.isArray(p?.tags) ? p.tags.map((t) => String(t || "").toLowerCase()) : [];
      return HINTS.some((h) =>
        title.includes(h) || slug.includes(h) || tags.includes(h) || tags.some((t) => t.includes(h))
      );
    };
    const fallbacks = list.filter((p) => p && isCandidate(p) && !primary.find((q) => q.id === p.id));
    const combined = [...primary, ...fallbacks];
    // de-dupe by id
    const seen = new Set();
    items = combined.filter((p) => (p && !seen.has(p.id) ? (seen.add(p.id), true) : false)).slice(0, 2);
  }

  if (!items.length) return null;

  return (
    <div className="site-container">
      <div className="rounded-token border border-[var(--border)] bg-white p-5 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="mb-0 leading-tight">Featured Suburb Profiles</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((it) => (
            <BlogCard key={it.id} item={it} />
          ))}
        </div>
      </div>
    </div>
  );
}
