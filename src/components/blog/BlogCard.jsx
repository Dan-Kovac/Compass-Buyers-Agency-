import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { createPageUrl } from "@/utils";

export default function BlogCard({ item }) {
  if (!item) {
    return (
      <div className="overflow-hidden rounded-token border border-[var(--border)] bg-white h-full">
        <div className="aspect-[4/3] bg-gray-100" />
        <div className="p-4">
          <div className="h-4 w-1/3 bg-gray-200 rounded mb-2" />
          <div className="h-5 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  const img = item.featured_image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop";
  const category = item.category || "";
  const title = item.title || "Untitled";
  const excerpt = item.excerpt || "";

  return (
    <a href={createPageUrl(`BlogPostDetail?id=${item.id}`)} className="h-full block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white h-full flex flex-col border-[var(--border)]">
        <div className="aspect-[4/3] bg-gray-100 shrink-0 overflow-hidden rounded-token">
          <img
            src={img}
            alt={title}
            className="block w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          {category && <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">{category.replace("-", " ")}</div>}
          <h3 className="font-semibold text-lg leading-snug line-clamp-2 mb-2 min-h-[3.5rem]">{title}</h3>
          {excerpt && <p className="text-sm text-gray-600 line-clamp-3">{excerpt}</p>}
        </CardContent>
      </Card>
    </a>
  );
}
