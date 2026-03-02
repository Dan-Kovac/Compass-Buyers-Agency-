import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MinimalFilters({
  propertyTypeOptions = [],
  locationOptions = [],
  clientTypeOptions = [],
  value = { propertyType: undefined, location: undefined, clientType: undefined },
  onChange,
  onClear
}) {
  const showRow = propertyTypeOptions.length || locationOptions.length || clientTypeOptions.length;
  if (!showRow) return null;

  const handle = (field, v) => {
    const val = v === "all" ? undefined : v;
    onChange({ ...value, [field]: val });
  };

  const pretty = (v) => (typeof v === "string" ? v.replace(/-/g, " ") : v);

  return (
    <div className="w-full bg-white">
      <div className="site-container">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <Select value={value.propertyType || "all"} onValueChange={(v) => handle("propertyType", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All property types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All property types</SelectItem>
                {propertyTypeOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{pretty(opt)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={value.location || "all"} onValueChange={(v) => handle("location", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locationOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{pretty(opt)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={value.clientType || "all"} onValueChange={(v) => handle("clientType", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All clients" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All clients</SelectItem>
                {clientTypeOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{pretty(opt)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="text-sm text-[var(--ink)]/50 hover:text-[var(--hills)] underline underline-offset-2 self-start md:self-auto"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
