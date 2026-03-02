import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function BlogMinimalFilters({
  categoryOptions = [],
  tagOptions = [],
  value = { category: undefined, tag: undefined },
  onChange,
  onClear
}) {
  const showRow = categoryOptions.length || tagOptions.length;
  if (!showRow) return null;

  const handle = (field, v) => {
    const val = v === "all" ? undefined : v;
    onChange({ ...value, [field]: val });
  };

  const pretty = (v) =>
    (typeof v === "string"
      ? v
          .replace(/-/g, " ")
          .split(" ")
          .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
          .join(" ")
      : v);

  return (
    <div className="w-full bg-white">
      <div className="site-container">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
            <Select value={value.category || "all"} onValueChange={(v) => handle("category", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categoryOptions.map((opt) => (
                  <SelectItem key={opt} value={opt}>{pretty(opt)}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={value.tag || "all"} onValueChange={(v) => handle("tag", v)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="All tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {tagOptions.map((opt) => (
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
