import React from "react";
import { CaseStudy } from "@/entities/CaseStudy";
import CaseStudyCard from "@/components/caseStudies/CaseStudyCard";

export default function RelatedCaseStudies({ currentId, title = "Keep exploring" }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const list = await CaseStudy.list("-created_date", 12);
      const filtered = (list || []).filter((i) => i.id !== currentId).slice(0, 3);
      setItems(filtered);
    })();
  }, [currentId]);

  // Ensure exactly 3 display slots (fill with placeholders if fewer)
  const displayItems = items.length >= 3 ? items.slice(0, 3) : [...items, ...Array(Math.max(0, 3 - items.length)).fill(null)];

  return (
    <section className="mt-12">
      <h3 className="text-2xl font-semibold mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayItems.map((it, idx) => (
          <CaseStudyCard key={it?.id || `placeholder-${idx}`} item={it} />
        ))}
      </div>
    </section>
  );
}
