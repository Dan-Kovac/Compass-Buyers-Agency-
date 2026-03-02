import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AcquisitionCard({ item }) {
  if (!item) {
    return (
      <div className="surface overflow-hidden rounded-xl animate-pulse h-full flex flex-col">
        <div className="aspect-[4/3] bg-[var(--bright-grey)]" />
        <div className="p-4 md:p-5">
          <div className="h-3 bg-[var(--bright-grey)] rounded w-40 mb-3" />
          <div className="h-5 bg-[var(--bright-grey)] rounded w-64 mb-2" />
          <div className="h-3 bg-[var(--bright-grey)] rounded w-32" />
        </div>
      </div>
    );
  }

  const stateFull = item.state === "QLD" ? "Queensland" : "New South Wales";
  const locationLine = [item.suburb, stateFull].filter(Boolean).join(", ");

  const market = item.market_visibility || "on_market";
  const marketLabel = market === "off_market" ? "Off‑market purchase" : "On‑market purchase";

  const detailUrl = createPageUrl(`AcquisitionDetail?id=${item.id}`);

  return (
    <Link
      to={detailUrl}
      className="surface overflow-hidden rounded-xl flex flex-col group relative h-full"
    >
      <div className="aspect-[4/3] bg-[var(--bright-grey)] relative overflow-hidden flex-shrink-0">
        {item.main_image_url ? (
          <img
            src={item.main_image_url}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        ) : null}

        {/* Hover overlay with slide-up animation */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-sm font-medium">View Details →</div>
        </div>

        {/* On/Off‑market pill */}
        <div
          className="absolute top-3 left-3 pointer-events-none"
          aria-label={marketLabel}
          title={marketLabel}
        >
          <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur px-3 py-1 text-xs font-medium text-[var(--ink)] border border-[var(--border)] shadow-sm">
            {market === "off_market" ? "Off Market" : "On Market"}
          </span>
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="text-[13px] text-[var(--stone)] mb-1">{locationLine}</div>
        <h3
          className="mb-2 truncate group-hover:text-[var(--hills)] transition-colors"
          title={item.title}
          style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "1.0625rem" }}
        >
          {item.title}
        </h3>
        {(item.beds > 0 || item.baths > 0 || item.cars > 0) && (
          <div className="text-[13px] text-[var(--stone)] mt-auto">
            {[
              item.beds > 0 && `${item.beds} bed${item.beds === 1 ? '' : 's'}`,
              item.baths > 0 && `${item.baths} bath${item.baths === 1 ? '' : 's'}`,
              item.cars > 0 && `${item.cars} car${item.cars === 1 ? '' : 's'}`
            ].filter(Boolean).join(' · ')}
          </div>
        )}
      </div>
    </Link>
  );
}
