import React from "react";
import { MapPin, Users, Clock, DollarSign } from "lucide-react";

export default function KeyStatsTable(props) {
  // Backward-compatible: accept item, caseStudy, record, data, or direct props
  const cs = props.item || props.caseStudy || props.record || props.data || props;
  if (!cs) return null;

  const pretty = (v) => {
    if (typeof v !== "string") return v;
    return v
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const propertyType = pretty(cs.property_type);
  const location = cs.location;
  const clientType = pretty(cs.client_type);
  const timeframe = cs.timeframe;
  const price = cs.purchase_price;
  const title = cs.title;
  const excerpt = cs.excerpt;
  const image = cs.featured_image;

  const StatPill = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    return (
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--border)] bg-white">
        <Icon className="w-4 h-4 text-[var(--hills)]" />
        <div className="text-sm">
          {label && <span className="text-[var(--ink)]/50 mr-1">{label}:</span>}
          <span className="text-[var(--ink)] font-medium">{value}</span>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-white">
      <div className="site-container">
        <div className="py-4 md:py-6">
          {/* Header row: image left, title+excerpt right */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            {/* Image thumbnail - render only when an image exists */}
            {image && (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden ring-1 ring-[var(--border)] bg-[var(--bright-grey)] shrink-0">
                <img
                  src={image}
                  alt={title || propertyType || "Property"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Text column */}
            <div className="flex-1 min-w-0">
              {/* Small chips above title for quick scan */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                {propertyType && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[var(--sea-breeze)]/60 text-[var(--hills)]">
                    {propertyType}
                  </span>
                )}
              </div>

              {/* Title */}
              {title && (
                <h1 className="text-2xl md:text-3xl font-semibold text-[var(--ink)] leading-tight mb-1 truncate">
                  {title}
                </h1>
              )}

              {/* Excerpt */}
              {excerpt && (
                <p className="text-[var(--ink)]/70 text-sm md:text-base leading-relaxed line-clamp-2">
                  {excerpt}
                </p>
              )}

              {/* Stat cells row under title/excerpt */}
              <div className="mt-3 flex flex-wrap items-center gap-2.5 md:gap-3">
                <StatPill icon={MapPin} label="Location" value={location} />
                <StatPill icon={Users} label="Client" value={clientType} />
                <StatPill icon={Clock} label="Timeframe" value={timeframe} />
                <StatPill icon={DollarSign} label="Price" value={price} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
