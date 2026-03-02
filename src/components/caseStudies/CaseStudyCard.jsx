import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop";

export default function CaseStudyCard({ item }) {
  if (!item) {
    return (
      <div className="overflow-hidden rounded-token border border-[var(--border)] bg-white h-full">
        <div className="aspect-[4/3] bg-[var(--bright-grey)]" />
        <div className="p-4">
          <div className="h-4 w-1/3 bg-[var(--bright-grey)] rounded mb-2" />
          <div className="h-5 w-5/6 bg-[var(--bright-grey)] rounded" />
        </div>
      </div>
    );
  }

  const to = createPageUrl(`CaseStudyDetail?id=${item.id}`);

  return (
    <Link to={to} className="h-full block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-white h-full flex flex-col border-[var(--border)]">
        <div className="aspect-[4/3] bg-[var(--bright-grey)] shrink-0">
          <img
            src={item.featured_image || PLACEHOLDER_IMG}
            alt={item.title || "Case study"}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== PLACEHOLDER_IMG) e.currentTarget.src = PLACEHOLDER_IMG;
            }}
          />
        </div>
        <CardContent className="p-4 flex-1 flex flex-col">
          <div className="text-xs uppercase tracking-wide text-[var(--ink)]/50 mb-2">{item.location || "—"}</div>
          <h3 className="font-semibold text-lg leading-snug line-clamp-2 mb-2 min-h-[3.5rem]">{item.title || "Untitled case study"}</h3>
          {item.excerpt && (
            <p className="text-sm text-[var(--ink)]/70 line-clamp-3">{item.excerpt}</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
