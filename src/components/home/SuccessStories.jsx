import React from "react";
import { fetchCaseStudies } from "@/lib/sanityClient";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import CaseStudyCard from "@/components/caseStudies/CaseStudyCard";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function SuccessStories() {
  const [items, setItems] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const all = await fetchCaseStudies({ status: "published" });
      const list = (all || []).slice(0, 3);
      setItems(list || []);
    })();
  }, []);

  return (
    <section className="section-padding-lg bg-[var(--sea-breeze)]">
      <div className="site-container">
        {/* Header with copy and CTA aligned to the right */}
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <h2 className="mb-2">Recent Success</h2>
              <p className="text-[var(--ink)]/70">
                A selection of recent case studies and properties we’ve acquired for clients across the
                Northern Rivers. Explore how we source, assess and secure the right home or investment.
              </p>
            </div>
            <Button
              className="btn-cta btn-outline-brand self-start md:self-auto"
              onClick={() => navigate(createPageUrl("CaseStudies"))}
              style={{ fontFamily: ‘var(--font-body)’ }}
            >
              View All
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.length > 0 ? (
              items.map((cs) => (
                <CaseStudyCard key={cs.id} item={cs} />
              ))
            ) : (
              [0, 1, 2].map((i) => <CaseStudyCard key={i} item={null} />)
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
