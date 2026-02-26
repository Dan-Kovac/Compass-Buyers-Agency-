import React from "react";
import { Acquisition } from "@/entities/Acquisition";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function RecentAcquisitionsStrip({
  limit = 3,
  bg = "bright",
  showEyebrow = true,
  title = "Recent acquisitions",
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
        const list = await Acquisition.filter({ status: "published" }, "-purchase_date", limit);
        if (mounted) {
          setItems(list || []);
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
  }, [limit]);

  const bgClass = bg === "white" ? "bg-white" : "bg-[var(--bright-grey)]";

  return (
    <section className={`py-12 md:py-20 ${bgClass}`}>
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            {showEyebrow && (
              <div className="text-sm text-gray-600 mb-1">What We're Buying</div>
            )}
            <h2 className="mb-2">{title}</h2>
            <p className="text-gray-700">
              A snapshot of properties we've recently secured for clients across the Northern Rivers and Southern Gold Coast.
            </p>
          </div>
          <Button
            className="btn-cta self-start md:self-auto bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
            onClick={() => navigate(createPageUrl("Acquisitions"))}
            style={{ fontFamily: "var(--font-body)" }}
          >
            View All
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {loading ? (
            Array.from({ length: limit }).map((_, idx) => (
              <AcquisitionCard key={idx} item={null} />
            ))
          ) : items.length > 0 ? (
            items.map((it) => (
              <AcquisitionCard 
                key={it.id} 
                item={it} 
                onClick={() => navigate(createPageUrl("Acquisitions"))}
              />
            ))
          ) : (
            Array.from({ length: limit }).map((_, idx) => (
              <AcquisitionCard key={idx} item={null} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
