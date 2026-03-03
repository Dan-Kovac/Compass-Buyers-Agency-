import React from "react";

export default function SegmentsNav({ segments = [] }) {
  if (!segments.length) return null;

  return (
    <div className="site-container">
      <div
        className="flex flex-row flex-wrap justify-center gap-2 py-3"
        role="navigation"
        aria-label="Jump to segment"
      >
        {segments.map((s) => (
          <button
            key={s.id}
            type="button"
            className="shrink-0 rounded-full border border-[var(--bright-grey)] hover:bg-[var(--hills)] hover:text-white hover:border-[var(--hills)] transition-all whitespace-nowrap px-4 py-1.5 bg-white text-[var(--stone)]"
            style={{
              fontSize: "0.8125rem",
              fontWeight: "var(--font-body-regular)",
              fontFamily: "var(--font-body)",
            }}
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
