import React from "react";
import VideoTestimonialCard from "./VideoTestimonialCard";
import ScrollReveal from "./ScrollReveal";

/**
 * TestimonialSection — prominent video testimonials with scroll navigation.
 */

const DEFAULT_TESTIMONIALS = [
  {
    videoSrc: "/videos/testimonials/alyssa.mp4",
    posterSrc: "/videos/testimonials/alyssa-poster.jpg",
    clientName: "Alyssa",
    subtitle: "Buyer",
  },
  {
    videoSrc: "/videos/testimonials/calvin.mp4",
    posterSrc: "/videos/testimonials/calvin-poster.jpg",
    clientName: "Calvin",
    subtitle: "Buyer",
  },
  {
    videoSrc: "/videos/testimonials/julia.mp4",
    posterSrc: "/videos/testimonials/julia-poster.jpg",
    clientName: "Julia",
    subtitle: "Buyer",
  },
  {
    videoSrc: "/videos/testimonials/carradous.mp4",
    posterSrc: "/videos/testimonials/carradous-poster.jpg",
    clientName: "Mr Carradous",
    subtitle: "Buyer",
  },
];

export default function TestimonialSection({
  heading = "What Our Buyers Say",
  testimonials,
  className = "",
}) {
  const items = testimonials?.length ? testimonials : DEFAULT_TESTIMONIALS;
  const scrollRef = React.useRef(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector(":scope > div")?.offsetWidth || 320;
    el.scrollBy({ left: direction * (cardWidth + 20), behavior: "smooth" });
  };

  return (
    <section className={`bg-white ${className}`} style={{ padding: "var(--section-breathing-lg) 0" }}>
      <div className="site-container">
        {/* Header with navigation arrows */}
        <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-12">
          <div>
            <p className="eyebrow-label">Client Stories</p>
            <h2 className="mb-0">{heading}</h2>
          </div>

          {/* Desktop scroll arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canScrollLeft}
              className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-default hover:bg-[var(--bright-grey)]"
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canScrollRight}
              className="w-11 h-11 rounded-full border border-[var(--border)] flex items-center justify-center transition-all duration-200 disabled:opacity-25 disabled:cursor-default hover:bg-[var(--bright-grey)]"
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </ScrollReveal>

        {/* Scrollable row — larger cards */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
          >
            {items.map((t, i) => (
              <div key={i} className="snap-start flex-shrink-0">
                <VideoTestimonialCard
                  videoSrc={t.videoSrc}
                  posterSrc={t.posterSrc}
                  clientName={t.clientName}
                  subtitle={t.subtitle}
                  size="large"
                />
              </div>
            ))}
          </div>

          {/* Mobile scroll fade hint — right edge */}
          {canScrollRight && (
            <div
              className="absolute top-0 right-0 bottom-2 w-12 pointer-events-none md:hidden"
              style={{ background: "linear-gradient(to left, rgba(255,255,255,0.9) 0%, transparent 100%)" }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
