import React from "react";
import { fetchAcquisitions } from "@/lib/sanityClient";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function RecentAcquisitionsStrip({
  limit = 6,
  bg = "bright",
  showEyebrow = true,
  title = "Featured acquisitions",
  sortBy = "value",
}) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 3000);

    (async () => {
      try {
        const all = await fetchAcquisitions({ status: "published" });
        let sorted = all || [];

        // Sort by highest purchase price first (best imagery, most impressive)
        // Falls back to most recent if no prices available
        if (sortBy === "value") {
          sorted = [...sorted].sort((a, b) => {
            const priceA = a.purchase_price || 0;
            const priceB = b.purchase_price || 0;
            if (priceB !== priceA) return priceB - priceA;
            // Tie-break by date
            return new Date(b.purchase_date || 0) - new Date(a.purchase_date || 0);
          });
        }

        // Also prioritise items that have images
        sorted = sorted.sort((a, b) => {
          const hasA = a.main_image_url ? 1 : 0;
          const hasB = b.main_image_url ? 1 : 0;
          return hasB - hasA;
        });

        const list = sorted.slice(0, limit);
        if (mounted) {
          setItems(list);
          setLoading(false);
          clearTimeout(timeout);
        }
      } catch (err) {
        console.warn("Could not load acquisitions");
        if (mounted) {
          setItems([]);
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    })();

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [limit, sortBy]);

  const bgClass = bg === "white" ? "bg-white" : "bg-[var(--bright-grey)]";

  return (
    <section className={bgClass} style={{ padding: "var(--section-breathing-lg) 0" }}>
      <div className="site-container">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            {showEyebrow && (
              <p className="eyebrow-label">Our Work</p>
            )}
            <h2 className="mb-2">{title}</h2>
            <p
              style={{
                fontWeight: "var(--font-body-light)",
                fontSize: "1.0625rem",
                color: "var(--stone)",
                lineHeight: "1.7",
              }}
            >
              From beachside Byron to the southern Gold Coast. A selection of standout properties we've secured for clients.
            </p>
          </div>
          <button
            className="text-[var(--hills)] text-[15px] font-medium hover:underline underline-offset-4 transition-all self-start md:self-auto"
            onClick={() => navigate(createPageUrl("Acquisitions"))}
            style={{ fontFamily: "var(--font-body)" }}
          >
            View all acquisitions &rarr;
          </button>
        </ScrollReveal>

        <div className="relative">
          <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            {loading ? (
              Array.from({ length: limit }).map((_, idx) => (
                <div key={idx} className="flex-shrink-0 w-[280px] md:w-[360px] snap-start">
                  <AcquisitionCard item={null} />
                </div>
              ))
            ) : items.length > 0 ? (
              items.map((it) => (
                <div key={it.id} className="flex-shrink-0 w-[280px] md:w-[360px] snap-start">
                  <AcquisitionCard
                    item={it}
                    onClick={() => navigate(createPageUrl("Acquisitions"))}
                  />
                </div>
              ))
            ) : (
              Array.from({ length: limit }).map((_, idx) => (
                <div key={idx} className="flex-shrink-0 w-[280px] md:w-[360px] snap-start">
                  <AcquisitionCard item={null} />
                </div>
              ))
            )}
          </div>

          {/* Mobile scroll fade hint */}
          <div
            className="absolute top-0 right-0 bottom-4 w-8 pointer-events-none md:hidden"
            style={{ background: `linear-gradient(to left, var(--bright-grey) 0%, transparent 100%)` }}
          />
        </div>
      </div>
    </section>
  );
}
