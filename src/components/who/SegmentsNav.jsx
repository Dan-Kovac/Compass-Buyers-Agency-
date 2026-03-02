import React from "react";

export default function SegmentsNav({ segments = [] }) {
  if (!segments.length) return null;

  return (
    <div className="site-container">
      <div className="flex flex-row flex-wrap justify-center gap-2 py-2">
        {segments.map((s) => (
          <button
            key={s.id}
            type="button"
            className="shrink-0 rounded-full border border-[var(--border)] hover:bg-[var(--hills)] hover:text-white hover:border-[var(--hills)] transition-all whitespace-nowrap text-sm px-4 py-2 h-auto bg-white text-[var(--ink)]"
            onClick={() => {
              const el = document.getElementById(s.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
