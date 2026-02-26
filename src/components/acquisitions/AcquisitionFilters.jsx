import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const REGION_OPTIONS = ["All Regions", "Byron Shire", "Tweed Shire", "Ballina Shire", "City of Gold Coast", "Other"];

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
    <div className="flex flex-col md:flex-row gap-3 md:items-center">
      <Select value={region} onValueChange={setRegion}>
        <SelectTrigger className="w-full md:w-56 bg-white">
          <SelectValue placeholder="Select Region" />
        </SelectTrigger>
        <SelectContent>
          {REGION_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={suburb} onValueChange={setSuburb}>
        <SelectTrigger className="w-full md:w-56 bg-white">
          <SelectValue placeholder="Select Suburb" />
        </SelectTrigger>
        <SelectContent>
          {uniqueSuburbs.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
