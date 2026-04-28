import React from "react";
import { fetchAcquisitions } from "@/lib/sanityClient";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/shared/ScrollReveal";

/* ── Marquee row ─────────────────────────────────────────────────────────── */
function MarqueeRow({ items, direction = "left", duration = 60, ariaLabel }) {
  if (!items || items.length === 0) return null;

  // Duplicate the list so the keyframe can translate -50% and loop seamlessly
  const doubled = [...items, ...items];

  const animationName = direction === "left" ? "acqMarqueeLeft" : "acqMarqueeRight";

  return (
    <div
      className="acq-marquee"
      aria-label={ariaLabel}
      role="region"
    >
      <div
        className="acq-marquee__track"
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((it, idx) => (
          <div key={`${it.id || it.slug}-${idx}`} className="acq-marquee__item">
            <AcquisitionCard item={it} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────────── */
export default function RecentAcquisitionsStrip({
  limit = 8,
  bg = "white",
  showEyebrow = true,
  title = "Featured acquisitions",
  suburb,
  lga,
}) {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) setLoading(false);
    }, 3000);

    (async () => {
      try {
        const all = await fetchAcquisitions({ status: "published" });
        let pool = (all || []).filter(
          (i) =>
            (i.main_image?.asset || i.main_image_url) &&
            ((i.purchase_price || 0) > 0 || i.price_confidential || i.price_display)
        );

        // Location prioritisation when called from a landing page
        if (suburb || lga) {
          const suburbMatches = suburb ? pool.filter((i) => i.suburb === suburb) : [];
          const lgaMatches = lga ? pool.filter((i) => i.lga === lga && i.suburb !== suburb) : [];
          const remaining = pool.filter((i) => i.suburb !== suburb && i.lga !== lga);
          pool = [...suburbMatches, ...lgaMatches, ...remaining];
        }

        pool = pool.slice(0, Math.max(limit, 6));

        if (mounted) {
          setItems(pool);
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
  }, [limit, suburb, lga]);

  const bgClass = bg === "white" ? "bg-white" : "bg-[var(--bright-grey)]";

  if (!loading && items.length === 0) return null;

  /* Split by price — premium = top half, entry = bottom half.
     Keep at least 3 in each row when possible. */
  const sortKey = (i) => (i.price_confidential ? Number.MAX_SAFE_INTEGER : i.purchase_price || 0);
  const sortedDesc = [...items].sort((a, b) => sortKey(b) - sortKey(a));
  const splitPoint = Math.max(3, Math.ceil(sortedDesc.length / 2));
  const premium = sortedDesc.slice(0, Math.min(splitPoint, sortedDesc.length));
  const entryLevel = sortedDesc
    .slice(splitPoint)
    .reverse(); // ascending price — most accessible first
  const showEntryRow = entryLevel.length >= 2;

  return (
    <section className={bgClass} style={{ padding: "var(--section-padding) 0" }}>
      <style>{`
        @keyframes acqMarqueeLeft {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes acqMarqueeRight {
          0%   { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        .acq-marquee {
          position: relative;
          overflow: hidden;
          mask-image: linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%);
        }
        .acq-marquee__track {
          display: flex;
          gap: clamp(1rem, 2vw, 1.75rem);
          width: max-content;
          will-change: transform;
        }
        .acq-marquee:hover .acq-marquee__track,
        .acq-marquee:focus-within .acq-marquee__track {
          animation-play-state: paused;
        }
        .acq-marquee__item {
          flex: 0 0 auto;
          width: clamp(260px, 28vw, 340px);
        }
        @media (prefers-reduced-motion: reduce) {
          .acq-marquee__track {
            animation: none !important;
            transform: none !important;
          }
          .acq-marquee {
            overflow-x: auto;
          }
        }
        @media (max-width: 767px) {
          .acq-marquee {
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            mask-image: none;
            -webkit-mask-image: none;
            padding: 0 1rem;
          }
          .acq-marquee__track {
            animation: none !important;
            transform: none !important;
            width: max-content;
          }
          .acq-marquee__item {
            scroll-snap-align: start;
          }
        }
      `}</style>

      <div className="site-container">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            {showEyebrow && <p className="eyebrow-label">Our Work</p>}
            <h2 className="mb-2">{title}</h2>
            <p
              style={{
                fontWeight: "var(--font-body-light)",
                fontSize: "1.0625rem",
                color: "var(--stone)",
                lineHeight: "1.7",
              }}
            >
              From beachside Byron to the southern Gold Coast. A selection of standout properties we've secured for clients, across every price point.
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
      </div>

      <div className="space-y-6 md:space-y-8">
        {loading ? (
          <div className="site-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {Array.from({ length: 4 }).map((_, idx) => (
                <AcquisitionCard key={idx} item={null} />
              ))}
            </div>
          </div>
        ) : (
          <>
            <MarqueeRow
              items={premium}
              direction="left"
              duration={70}
              ariaLabel="Premium acquisitions"
            />
            {showEntryRow && (
              <MarqueeRow
                items={entryLevel}
                direction="right"
                duration={60}
                ariaLabel="Recent acquisitions across all price points"
              />
            )}
          </>
        )}
      </div>
    </section>
  );
}
