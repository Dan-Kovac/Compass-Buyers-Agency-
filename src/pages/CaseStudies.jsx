import React from "react";
import { fetchCaseStudies } from "@/lib/sanityClient";
import CaseStudyCard from "@/components/caseStudies/CaseStudyCard";
import MinimalFilters from "@/components/caseStudies/MinimalFilters";
import CTASection from "@/components/shared/CTASection";
import SEOHead from "@/components/shared/SEOHead";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";
import { createPageUrl } from "@/utils";

export default function CaseStudies() {
  const [allItems, setAllItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Filters (single selection per group)
  const [propertyType, setPropertyType] = React.useState();
  const [location, setLocation] = React.useState();
  const [clientType, setClientType] = React.useState();

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
      <SEOHead
        title="Case Studies | Compass Buyers Agency"
        description="Real results from buyers across Northern Rivers and the Southern Gold Coast. See how we've helped clients secure property."
        canonicalPath="/case-studies"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Case Studies | Compass Buyers Agency",
            url: "https://compassagency.com.au/case-studies",
            description: "Buyer case studies from Compass Buyers Agency. Real briefs, real strategies, real outcomes from across Northern Rivers and the Southern Gold Coast.",
            isPartOf: { "@type": "WebSite", name: "Compass Buyers Agency", url: "https://compassagency.com.au" },
            about: {
              "@type": "RealEstateAgent",
              name: "Compass Buyers Agency",
              url: "https://compassagency.com.au",
            },
          }),
        }}
      />
      {/* Page header — standard pattern */}
      <section className="bg-warm-gradient page-header">
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Our Work</p>
              <h1>Case Studies</h1>
              <p>
                Real results from buyers across Northern Rivers and the Southern Gold Coast.
              </p>
            </div>
          </ScrollReveal>
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
      <section className="section-padding bg-sand-wash">
        <div className="site-container">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CaseStudyCard key={i} item={null} />
              ))}
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerGroup stagger={80}>
                {filtered.map((it) => (
                  <ScrollReveal key={it.id} animation="fade-up">
                    <CaseStudyCard item={it} />
                  </ScrollReveal>
                ))}
              </StaggerGroup>
            </div>
          ) : (
            <div className="text-center" style={{ padding: "var(--section-padding) 0" }}>
              <div className="text-xl font-medium text-[var(--ink)]/70 mb-2">No case studies match your filters</div>
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
        buttonHref={createPageUrl("Contact")}
        supportingText="Local expertise • Independent advice • Proven results"
      />
    </div>
  );
}
