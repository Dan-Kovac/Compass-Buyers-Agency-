import React from "react";
import { MapPin, Clock, DollarSign, Home } from "lucide-react";

export default function CaseStudyStatsInline({ location, property_type, timeframe, purchase_price }) {
  const Stat = ({ icon: Icon, label, value }) => {
    if (!value) return null;
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-white">
        <Icon className="w-4 h-4 text-[var(--hills)]" />
        <span className="text-sm">
          {label ? <span className="text-[var(--ink)]/50 mr-1">{label}:</span> : null}
          <span className="text-[var(--ink)] font-medium">{value}</span>
        </span>
      </div>
    );
  };

  if (!location && !property_type && !timeframe && !purchase_price) return null;

  return (
    <div className="site-container py-4">
      <div className="flex flex-wrap gap-2.5">
        <Stat icon={Home} label="Type" value={property_type} />
        <Stat icon={MapPin} label="Location" value={location} />
        <Stat icon={Clock} label="Timeframe" value={timeframe} />
        <Stat icon={DollarSign} label="Price" value={purchase_price} />
      </div>
    </div>
  );
}
