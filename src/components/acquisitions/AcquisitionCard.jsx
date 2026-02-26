import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function AcquisitionCard({ item }) {
  if (!item) {
    return (
      <div className="surface overflow-hidden rounded-token animate-pulse h-full flex flex-col">
        <div className="aspect-[4/3] bg-gray-200" />
        <div className="p-4 md:p-5">
          <div className="h-3 bg-gray-200 rounded w-40 mb-3" />
          <div className="h-5 bg-gray-200 rounded w-64 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-32" />
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
      className="surface overflow-hidden rounded-token flex flex-col group relative"
    >
      <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
        {item.main_image_url ? (
          <img
            src={item.main_image_url}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
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

      <div className="p-4 md:p-5">
        <div className="text-sm text-gray-500 mb-1">{locationLine}</div>
        <h3 className="text-lg font-semibold mb-2 truncate group-hover:text-[var(--hills)] transition-colors" title={item.title}>
          {item.title}
        </h3>
        {(item.beds != null || item.baths != null || item.cars != null) && (
          <div className="text-sm text-gray-600">
            {[
              (item.beds != null) && `${item.beds} bed${item.beds === 1 ? '' : 's'}`,
              (item.baths != null) && `${item.baths} bath${item.baths === 1 ? '' : 's'}`,
              (item.cars != null) && `${item.cars} car${item.cars === 1 ? '' : 's'}`
            ].filter(Boolean).join(' • ')}
          </div>
        )}
      </div>
    </Link>
  );
}
