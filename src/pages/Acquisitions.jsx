import React from "react";
import { fetchAcquisitions } from "@/lib/sanityClient";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import AcquisitionFilters from "@/components/acquisitions/AcquisitionFilters";
import CTASection from "@/components/shared/CTASection.jsx";
import { createPageUrl } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function Acquisitions() {
  const [items, setItems] = React.useState([]);
  const [filters, setFilters] = React.useState({ region: "All Regions", suburb: "All Suburbs" });
  const navigate = useNavigate();

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
      <section className="section-padding bg-white">
        <div className="site-container">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}
          >
            <h1>Acquisitions</h1>
            <p className="text-[var(--ink)]/70 text-base md:text-lg">
              Browse properties we've secured for clients. Filter by region or suburb to see activity in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal filter row (no search) */}
      <section className="section-padding-sm bg-white border-t border-b border-[var(--border)]">
        <div className="site-container">
          <AcquisitionFilters
            suburbs={allSuburbs}
            filters={filters}
            onChange={setFilters}
          />
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="site-container">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-xl font-semibold text-[var(--ink)]/80 mb-2">No acquisitions found</div>
              <p className="text-[var(--ink)]/50 mb-6">Try changing your filters to see more results.</p>
              <button
                type="button"
                onClick={() => setFilters({ region: "All Regions", suburb: "All Suburbs" })}
                className="inline-flex items-center px-4 py-2 rounded-token border border-[var(--border)] text-[var(--ink)]/70 hover:bg-[var(--bright-grey)]/50"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => (
                <AcquisitionCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Looking for a Buyers Agent?"
        buttonText="Book a Free Consultation"
        onButtonClick={() => navigate(createPageUrl("Contact"))}
        supportingText="We'll help you find and secure the right property."
      />
    </div>
  );
}
