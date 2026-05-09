import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const REGION_OPTIONS = ["All Regions", "Tweed Shire", "City of Gold Coast", "Byron Shire", "Ballina Shire", "Other"];

export default function AcquisitionFilters({ suburbs = [], filters, onChange }) {
  const [region, setRegion] = React.useState(filters.region || "All Regions");
  const [suburb, setSuburb] = React.useState(filters.suburb || "All Suburbs");

  React.useEffect(() => {
    onChange({ region, suburb });
  }, [region, suburb]); // eslint-disable-line

  const uniqueSuburbs = React.useMemo(() => {
    const s = Array.from(new Set((suburbs || []).filter(Boolean)));
    return ["All Suburbs", ...s];
  }, [suburbs]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "clamp(1rem, 2vw, 1.5rem)",
      }}
    >
      {/* Region — pill row */}
      <div>
        <p
          className="eyebrow-label"
          style={{
            fontSize: "0.6875rem",
            color: "var(--stone)",
            marginBottom: "0.625rem",
          }}
        >
          Filter by Region
        </p>
        <div
          role="radiogroup"
          aria-label="Region"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {REGION_OPTIONS.map((opt) => {
            const active = region === opt;
            return (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setRegion(opt)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: active ? 500 : 400,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.01em",
                  color: active ? "#fff" : "var(--ink)",
                  background: active ? "var(--hills)" : "var(--bright-grey)",
                  border: `1px solid ${active ? "var(--hills)" : "transparent"}`,
                  padding: "0.5rem 0.95rem",
                  borderRadius: "var(--radius-badge)",
                  cursor: "pointer",
                  transition:
                    "background 220ms ease, color 220ms ease, border-color 220ms ease, transform 220ms ease",
                  lineHeight: 1.3,
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "rgba(75,113,113,0.08)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "var(--bright-grey)";
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Suburb — minimal styled select */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1.25rem", flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 16rem", minWidth: "14rem" }}>
          <p
            className="eyebrow-label"
            style={{
              fontSize: "0.6875rem",
              color: "var(--stone)",
              marginBottom: "0.625rem",
            }}
          >
            Filter by Suburb
          </p>
          <Select value={suburb} onValueChange={setSuburb}>
            <SelectTrigger
              className="w-full"
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid var(--stone)",
                borderRadius: 0,
                paddingLeft: 0,
                paddingRight: "0.5rem",
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.9375rem",
                color: "var(--ink)",
                height: "auto",
              }}
            >
              <SelectValue placeholder="Select Suburb" />
            </SelectTrigger>
            <SelectContent>
              {uniqueSuburbs.map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(region !== "All Regions" || suburb !== "All Suburbs") && (
          <button
            type="button"
            onClick={() => {
              setRegion("All Regions");
              setSuburb("All Suburbs");
            }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--hills)",
              background: "transparent",
              border: "none",
              padding: "0.5rem 0",
              cursor: "pointer",
              letterSpacing: "0.02em",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
