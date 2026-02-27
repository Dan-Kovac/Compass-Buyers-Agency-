import React from "react";
import { fetchAcquisitions } from "@/lib/sanityClient";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import AcquisitionFilters from "@/components/acquisitions/AcquisitionFilters";

export default function Acquisitions() {
  const [items, setItems] = React.useState([]);
  const [filters, setFilters] = React.useState({ region: "All Regions", suburb: "All Suburbs" });

  React.useEffect(() => {
    (async () => {
      const list = await fetchAcquisitions();
      setItems(list || []);
    })();
  }, []);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get("region") || urlParams.get("lga"); // support legacy ?lga
    const suburbParam = urlParams.get("suburb");
    if (regionParam || suburbParam) {
      setFilters((f) => ({
        ...f,
        region: regionParam || f.region,
        suburb: suburbParam || f.suburb
      }));
    }
  }, []);

  const allSuburbs = React.useMemo(() => Array.from(new Set(items.map((i) => i.suburb).filter(Boolean))), [items]);

  const filtered = items.filter((i) => {
    const regionOk = filters.region === "All Regions" || i.lga === filters.region;
    const suburbOk = filters.suburb === "All Suburbs" || i.suburb === filters.suburb;
    return regionOk && suburbOk;
  });

  return (
    <div className="bg-white">
      {/* Centered hero aligned with other pages */}
      <section className="py-12 bg-white">
        <div className="site-container">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mx-auto">
              Acquisitions
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              Browse properties we've purchased for clients. Filter by region or suburb to see activity in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal filter row (no search) */}
      <section className="py-6 bg-white border-t border-b border-[var(--border)]">
        <div className="site-container">
          <AcquisitionFilters
            suburbs={allSuburbs}
            filters={filters}
            onChange={setFilters}
          />
        </div>
      </section>

      {/* Grid */}
      <section className="py-10 bg-white">
        <div className="site-container">
          {filtered.length === 0 ? (
            <div className="text-gray-600">No acquisitions found. Try changing your filters.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((it) => (
                <AcquisitionCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
