import React from "react";
import { fetchAcquisitions } from "@/lib/sanityClient";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function RecentAcquisitionsStrip({
  limit = 4,
  bg = "white",
  showEyebrow = true,
  title = "Featured acquisitions",
  sortBy = "value",
  suburb,
  lga,
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
          const hasA = (a.main_image?.asset || a.main_image_url) ? 1 : 0;
          const hasB = (b.main_image?.asset || b.main_image_url) ? 1 : 0;
          return hasB - hasA;
        });

        // Location-based filtering: suburb first, then LGA, then all
        let list;
        if (suburb || lga) {
          const suburbMatches = suburb ? sorted.filter(i => i.suburb === suburb) : [];
          const lgaMatches = lga ? sorted.filter(i => i.lga === lga && i.suburb !== suburb) : [];
          const remaining = sorted.filter(i => i.suburb !== suburb && i.lga !== lga);
          list = [...suburbMatches, ...lgaMatches, ...remaining].slice(0, limit);
        } else {
          list = sorted.slice(0, limit);
        }

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
  }, [limit, sortBy, suburb, lga]);

  const bgClass = bg === "white" ? "bg-white" : "bg-[var(--bright-grey)]";

  // Hide the entire section when there's no data (avoids permanent skeleton cards)
  if (!loading && items.length === 0) return null;

  return (
    <section className={bgClass} style={{ padding: "var(--section-padding) 0" }}>
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

        <StaggerGroup stagger={120}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {loading ? (
              Array.from({ length: limit }).map((_, idx) => (
                <ScrollReveal key={idx} animation="scale-subtle" duration={600}>
                  <AcquisitionCard item={null} />
                </ScrollReveal>
              ))
            ) : items.length > 0 ? (
              items.map((it) => (
                <ScrollReveal key={it.id} animation="scale-subtle" duration={600}>
                  <AcquisitionCard
                    item={it}
                    onClick={() => navigate(createPageUrl("Acquisitions"))}
                  />
                </ScrollReveal>
              ))
            ) : (
              Array.from({ length: limit }).map((_, idx) => (
                <ScrollReveal key={idx} animation="scale-subtle" duration={600}>
                  <AcquisitionCard item={null} />
                </ScrollReveal>
              ))
            )}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
