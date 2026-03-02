import React from "react";
import { createPageUrl } from "@/utils";

export default function BlogCard({ item }) {
  if (!item) {
    return (
      <div className="overflow-hidden rounded-lg ring-1 ring-black/[0.04] bg-white h-full">
        <div className="aspect-[4/3] bg-[var(--bright-grey)]" />
        <div className="p-5">
          <div className="h-3 w-1/3 bg-[var(--bright-grey)] rounded mb-3" />
          <div className="h-4 w-5/6 bg-[var(--bright-grey)] rounded mb-2" />
          <div className="h-4 w-2/3 bg-[var(--bright-grey)] rounded" />
        </div>
      </div>
    );
  }

  const img =
    item.featured_image ||
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop";
  const category = item.category || "";
  const title = item.title || "Untitled";
  const excerpt = item.excerpt || "";

  return (
    <a
      href={createPageUrl(`BlogPostDetail?id=${item.id}`)}
      className="group h-full block"
    >
      <div className="overflow-hidden rounded-lg ring-1 ring-black/[0.04] bg-white h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="aspect-[4/3] bg-[var(--bright-grey)] shrink-0 overflow-hidden">
          <img
            src={img}
            alt={title}
            className="block w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          {category && (
            <div
              className="mb-2"
              style={{
                fontSize: "0.6875rem",
                fontWeight: "var(--font-body-medium)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--stone)",
              }}
            >
              {category.replace(/-/g, " ")}
            </div>
          )}
          <h3
            className="line-clamp-2 mb-2"
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 400,
              fontSize: "1.1875rem",
              letterSpacing: "-0.01em",
              lineHeight: 1.3,
              minHeight: "3rem",
            }}
          >
            {title}
          </h3>
          {excerpt && (
            <p
              className="line-clamp-3"
              style={{
                fontWeight: "var(--font-body-light)",
                color: "var(--stone)",
                fontSize: "0.9375rem",
                lineHeight: 1.6,
                marginBottom: 0,
              }}
            >
              {excerpt}
            </p>
          )}
        </div>
      </div>
    </a>
  );
}
