import React from "react";
import { format } from "date-fns";

export default function MetaRow({
  author,
  date,
  category,
  location,
  type,
  data,
  className = ""
}) {
  // Prefer explicit prop, then item's published_date, then created/updated
  const rawDate =
    date ||
    data?.published_date ||
    data?.publishedDate ||
    data?.created_date ||
    data?.updated_date ||
    null;

  const dateLabel = rawDate ? format(new Date(rawDate), "MMM d, yyyy") : null;

  const parts = [
    author ? `By ${author}` : null,
    dateLabel,
    category || location || null
  ].filter(Boolean);

  return (
    <div className={`text-sm text-[var(--ink)]/70 flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      {parts.map((p, i) => (
        <span key={i} className="whitespace-pre-line">
          {p}
        </span>
      ))}
    </div>
  );
}
