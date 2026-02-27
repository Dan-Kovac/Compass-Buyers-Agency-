import React from "react";
import { fetchBlogPosts } from "@/lib/sanityClient";
import BlogCard from "@/components/blog/BlogCard";

export default function RelatedBlogs({ currentId, limit = 3, title = "Recent Articles" }) {
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
    <section className="py-10 bg-white">
      <div className="site-container">
        <div className="flex items-end justify-between gap-3 mb-6">
          <h3 className="text-2xl md:text-3xl font-semibold mb-0">{title}</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: limit }).map((_, i) => <BlogCard key={`skeleton-${i}`} item={null} />)
            : (items.length
              ? items.map((it) => <BlogCard key={it.id} item={it} />)
              : Array.from({ length: limit }).map((_, i) => <BlogCard key={`fallback-${i}`} item={null} />))}
        </div>
      </div>
    </section>
  );
}
