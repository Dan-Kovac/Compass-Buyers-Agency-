import React from "react";
import { Button } from "@/components/ui/button";

export default function SegmentsNav({ segments = [] }) {
  if (!segments.length) return null;

  return (
    <div className="site-container">
      {/* Clean tabs navigation - all in one view */}
      <div className="surface rounded-token p-4 sm:p-5">
        <div className="flex flex-row flex-wrap justify-center gap-2">
          {segments.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0"
              onClick={(e) => {
                // Smoothly scroll to the section while keeping anchor fallback
                const el = document.getElementById(s.id);
                if (el) {
                  e.preventDefault();
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              <Button 
                variant="outline" 
                className="rounded-full border-[var(--border)] hover:bg-[var(--hills)] hover:text-white hover:border-[var(--hills)] transition-all whitespace-nowrap text-sm px-4 py-2 h-auto"
              >
                {s.label}
              </Button>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
