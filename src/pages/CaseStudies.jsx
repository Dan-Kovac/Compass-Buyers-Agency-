import React from "react";
import { fetchCaseStudies } from "@/lib/sanityClient";
import CaseStudyCard from "@/components/caseStudies/CaseStudyCard";
import MinimalFilters from "@/components/caseStudies/MinimalFilters";
import CTASection from "@/components/shared/CTASection";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function CaseStudies() {
  const [allItems, setAllItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Filters (single selection per group)
  const [propertyType, setPropertyType] = React.useState();
  const [location, setLocation] = React.useState();
  const [clientType, setClientType] = React.useState();

  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const items = await fetchCaseStudies();
      setAllItems(Array.isArray(items) ? items : []);
      setLoading(false);
    })();
  }, []);

  // Tag options from items
  const uniq = (arr) => Array.from(new Set(arr.filter(Boolean)));
  const propertyTypeOptions = uniq(allItems.map((i) => i.property_type));
  const locationOptions = uniq(allItems.map((i) => i.location));
  const clientTypeOptions = uniq(allItems.map((i) => i.client_type));

  // Filtered results
  const filtered = allItems.filter((i) => {
    const a = !propertyType || i.property_type === propertyType;
    const b = !location || i.location === location;
    const c = !clientType || i.client_type === clientType;
    return a && b && c;
  });

  const value = { propertyType, location, clientType };
  const handleChange = (next) => {
    setPropertyType(next.propertyType);
    setLocation(next.location);
    setClientType(next.clientType);
  };
  const handleClear = () => {
    setPropertyType(undefined);
    setLocation(undefined);
    setClientType(undefined);
  };

  return (
    <div className="bg-white">
      {/* Minimal, fully centered hero on white */}
      <section className="section-padding bg-white">
        <div className="site-container">
          <div
            className="max-w-3xl mx-auto text-center"
            style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}
          >
            <h1>
              Case Studies
            </h1>
            <p className="text-[var(--ink)]/70 text-base md:text-lg">
              Real results from buyers across Northern Rivers and the Southern Gold Coast.
            </p>
          </div>
        </div>
      </section>

      {/* Minimal filter row */}
      <section className="section-padding-sm bg-white border-t border-b border-[var(--border)]">
        <MinimalFilters
          propertyTypeOptions={propertyTypeOptions}
          locationOptions={locationOptions}
          clientTypeOptions={clientTypeOptions.map((c) => (typeof c === "string" ? c : ""))}
          value={value}
          onChange={handleChange}
          onClear={handleClear}
        />
      </section>

      {/* Grid */}
      <section className="section-padding bg-white">
        <div className="site-container">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CaseStudyCard key={i} item={null} />
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((it) => (
                <CaseStudyCard key={it.id} item={it} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-xl font-semibold text-[var(--ink)]/70 mb-2">No case studies match your filters</div>
              <p className="text-[var(--ink)]/50 mb-6">Try clearing filters to see all results.</p>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center px-4 py-2 rounded-token border border-[var(--border)] text-[var(--ink)]/70 hover:bg-[var(--bright-grey)]/50"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        heading="Ready to buy with confidence?"
        buttonText="Book a Free Consultation"
        onButtonClick={() => navigate(createPageUrl("Contact"))}
        supportingText="Local expertise • Independent advice • Proven results"
      />
    </div>
  );
}
