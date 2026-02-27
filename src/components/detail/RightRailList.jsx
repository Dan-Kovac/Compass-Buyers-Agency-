import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { fetchCaseStudies, fetchBlogPosts } from "@/lib/sanityClient";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop";

export default function RightRailList({ type, currentId, title = "Most viewed" }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      if (type === "case_study") {
        const list = await fetchCaseStudies({ status: "published" });
        setItems((list || []).filter((i) => i.id !== currentId).slice(0, 4));
      } else if (type === "blog_post") {
        const list = await fetchBlogPosts({ status: "published" });
        setItems((list || []).filter((i) => i.id !== currentId).slice(0, 4));
      }
    })();
  }, [type, currentId]);

  const toDetail = (item) =>
    type === "case_study"
      ? createPageUrl(`CaseStudyDetail?id=${item.id}`)
      : createPageUrl(`BlogPostDetail?id=${item.id}`);

  if (!items.length) return null;

  return (
    <div className="sticky top-28">
      <h3 className="text-base font-semibold mb-4">{title}</h3>
      <div className="grid gap-4">
        {items.map((it) => (
          <Link key={it.id} to={toDetail(it)}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex gap-3 p-3">
                <div className="w-24 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={it.featured_image || it.image || PLACEHOLDER_IMG}
                    alt={it.title || it.name || "Preview"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== PLACEHOLDER_IMG) {
                        e.currentTarget.src = PLACEHOLDER_IMG;
                      }
                    }}
                  />
                </div>
                <CardContent className="p-0">
                  <div className="text-sm text-gray-500">
                    {type === "case_study" ? (it.location || "—") : (it.category || "Blog")}
                  </div>
                  <div className="text-sm font-medium leading-snug line-clamp-2">
                    {it.title || "Untitled"}
                  </div>
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
