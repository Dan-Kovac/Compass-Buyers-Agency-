import React from "react";

/* ═══════════════════════════════════════════════════════════════════
   GoogleReviewsStrip — EmbedSocial-style card slider
   ─────────────────────────────────────────────────────────────────
   Centred cards with avatar, name, date, stars, text, Google logo.
   3-up carousel with prev/next arrows on desktop, swipe on mobile.
   Gentle scroll-reveal animation on first appearance.
   ═══════════════════════════════════════════════════════════════════ */

/* ── Scroll-reveal hook ── */
function useReveal(options = {}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function StarIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#F4B400" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function GoogleGIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

const AVATAR_COLOURS = ["#4285F4", "#EA4335", "#34A853", "#7B1FA2", "#FF6D00", "#00897B", "#5C6BC0"];

function ReviewerAvatar({ name, index }) {
  const initial = (name || "?")[0].toUpperCase();
  return (
    <div
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: AVATAR_COLOURS[index % AVATAR_COLOURS.length],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ color: "#fff", fontSize: "1.25rem", fontWeight: 500, lineHeight: 1 }}>
        {initial}
      </span>
    </div>
  );
}

/** Navigation arrow button */
function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Previous reviews" : "Next reviews"}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "1px solid #e0e0e0",
        background: disabled ? "#f5f5f5" : "#fff",
        cursor: disabled ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.2s ease",
        opacity: disabled ? 0.4 : 1,
        boxShadow: disabled ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "var(--bright-grey)";
          e.currentTarget.style.borderColor = "#ccc";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = "#fff";
          e.currentTarget.style.borderColor = "#e0e0e0";
        }
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: disabled ? "#bbb" : "var(--ink)" }}
      >
        {direction === "left" ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 6 15 12 9 18" />
        )}
      </svg>
    </button>
  );
}

/* ── Real Google reviews (sourced from Google Business Profile, March 2026) ── */
const DEFAULT_REVIEWS = [
  {
    name: "Massimo",
    text: "Compass Buyer's Agency helped us purchase our first home, and we couldn't be happier. Nick was fantastic to work with -- professional, responsive, and very efficient throughout the whole process. He made everything feel simple and stress-free, and his guidance gave us real confidence as first-time buyers. Highly recommend!",
    date: "Just now",
    stars: 5,
  },
  {
    name: "Emily F.",
    text: "I cannot recommend Lee from Compass highly enough. After being outbid on several homes, a colleague suggested we reach out to the Compass team, and from the moment we began working with Lee, our entire buying experience changed for the better. He is not only an expert in his field but also genuinely kind, reliable and transparent.",
    date: "1 week ago",
    stars: 5,
  },
  {
    name: "Lia Mason",
    text: "These guys made it happen for my partner and I. We are now able to own our perfect home in the dream location. I actually can't believe how easy they made the process for us. We were complete novices at the whole thing, so they sorted out and explained everything to us. 10 out of 10 for service and support!",
    date: "3 weeks ago",
    stars: 5,
  },
  {
    name: "Nikala Cunningham",
    text: "10/10 experience with Nick and the Compass team! Very prompt communication, big hustle and all 'round good humans. Without them we would not have been able to secure our new beautiful home for the price we did or as quickly as we did. We are so excited to be starting our next chapter on the Gold Coast!",
    date: "1 month ago",
    stars: 5,
  },
  {
    name: "Samm Smith",
    text: "Harley helped us buy our first home within 2 days of engaging with Compass after months and months of us searching. He made the experience so seamless and easy, getting us a place off market and keeping in contact with us every step of the way. He did all the liaising and negotiating, saving us money, time and taking the stress off of us.",
    date: "1 month ago",
    stars: 5,
  },
  {
    name: "Shan T.",
    text: "We had such a positive experience working with Compass Buyers Agency and are genuinely so grateful for their help in what is an incredibly competitive market. From the very first interaction, Nick was warm, personable and incredibly responsive. Harley kept us in the loop with off-market opportunities we never would have found on our own.",
    date: "1 month ago",
    stars: 5,
  },
  {
    name: "Chris Carrodus",
    text: "We recently purchased an amazing family home in Cabarita through Compass and we couldn't be happier with the experience. Lee, Chris, Nick and team are super professional, knowledgeable and responsive. They managed the whole process for us, including search, valuation, negotiation -- significantly reducing our stress levels and saving us time and money.",
    date: "2 months ago",
    stars: 5,
  },
  {
    name: "Alyssa Siegel",
    text: "The Compass team is fantastic. Harley was our agent and we could not have had a better experience. We were buying from overseas so we really needed his guidance and we trusted him completely. He went above and beyond at every stage of the process.",
    date: "2 months ago",
    stars: 5,
  },
  {
    name: "Sarah Maddox",
    text: "A huge 5 stars to Harley and Nick at Compass Agency for their hard work finding us a townhouse in Pottsville! Their dedication to the brief, local knowledge and excellent communication made the buying process stress-free. Highly recommend to anyone looking to buy in the Northern Rivers.",
    date: "2 months ago",
    stars: 5,
  },
  {
    name: "Paula Dowson",
    text: "We've been so blessed to purchase two properties through Compass. My husband and I worked closely with Nic and Harley, and the experience was outstanding. When I first shared my list of must-haves with Nic, I honestly thought it would be impossible to find something within our price range -- yet he delivered within just a few days!",
    date: "4 months ago",
    stars: 5,
  },
  {
    name: "Holly Anne Miller",
    text: "10/10 -- Highly Recommend! We recently worked with Nick from Compass Buyers Agency and honestly couldn't be more impressed. His professionalism, communication, and deep knowledge of the Gold Coast market made the entire experience stress-free and genuinely enjoyable. Nick went above and beyond to help us secure our dream home.",
    date: "4 months ago",
    stars: 5,
  },
];

export default function GoogleReviewsStrip({
  reviews = DEFAULT_REVIEWS,
  rating = "5.0",
  reviewCount = "84",
  googleUrl = "https://www.google.com/maps/place/Compass+Buyers+Agency/@-28.3309,153.5581,17z/data=!4m8!3m7!1s0x6b9101d32b37e8d1:0x8e5d5e5e5e5e5e5e!8m2!3d-28.3309!4d153.5581!9m1!1b1!16s%2Fg%2F11t_3qk7y5",
}) {
  const [page, setPage] = React.useState(0);
  const [cardsPerView, setCardsPerView] = React.useState(3);
  const [sectionRef, sectionVisible] = useReveal();

  // Responsive cards per view
  React.useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.ceil(reviews.length / cardsPerView);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  // Reset page if resize changes cardsPerView
  React.useEffect(() => {
    if (page >= totalPages) setPage(Math.max(0, totalPages - 1));
  }, [cardsPerView, totalPages, page]);

  const visibleReviews = reviews.slice(
    page * cardsPerView,
    page * cardsPerView + cardsPerView
  );

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "var(--section-padding) 0",
        background: "#fff",
        opacity: sectionVisible ? 1 : 0,
        transform: sectionVisible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.9s cubic-bezier(0.25, 0.1, 0.25, 1), transform 0.9s cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      <div className="site-container">

        {/* ── Header bar ── */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.15s, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.15s",
          }}
        >
          {/* Left: title + rating */}
          <div>
            <h3
              style={{
                fontSize: "clamp(1.125rem, 2.5vw, 1.375rem)",
                fontWeight: 400,
                color: "var(--ink)",
                margin: "0 0 0.375rem 0",
                fontFamily: "var(--font-heading, MinervaModern, serif)",
              }}
            >
              Customer reviews on Google
            </h3>
            <div className="flex items-center" style={{ gap: "0.5rem" }}>
              <div className="flex items-center" style={{ gap: "2px" }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} size={16} />
                ))}
              </div>
              <span style={{ fontSize: "0.875rem", color: "var(--stone)" }}>
                {rating} rating from {reviewCount} reviews
              </span>
            </div>
          </div>

          {/* Right: CTA — links to Google reviews */}
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            style={{
              background: "var(--hills)",
              color: "#fff",
              fontSize: "0.8125rem",
              fontWeight: 500,
              padding: "0.625rem 1.25rem",
              borderRadius: "999px",
              textDecoration: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            See all reviews <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        {/* ── Carousel ── */}
        <div className="flex items-center" style={{ gap: "clamp(0.5rem, 1.5vw, 1rem)" }}>
          {/* Left arrow — hidden on mobile */}
          <div className="hidden sm:block">
            <ArrowButton direction="left" onClick={() => setPage((p) => p - 1)} disabled={!canPrev} />
          </div>

          {/* Cards */}
          <div
            className="flex-1 grid"
            style={{
              gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
              gap: "clamp(0.75rem, 2vw, 1.25rem)",
            }}
          >
            {visibleReviews.map((review, i) => {
              const globalIndex = page * cardsPerView + i;
              return (
                <div
                  key={globalIndex}
                  className="flex flex-col items-center text-center"
                  style={{
                    background: "#fff",
                    border: "1px solid #e8e8e8",
                    borderRadius: "12px",
                    padding: "clamp(1.5rem, 3vw, 2rem) clamp(1.25rem, 2.5vw, 1.5rem)",
                    transition: "box-shadow 0.4s ease, transform 0.4s ease, opacity 0.7s cubic-bezier(0.25,0.1,0.25,1)",
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "translateY(0)" : "translateY(20px)",
                    transitionDelay: sectionVisible ? `${0.25 + i * 0.12}s` : "0s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Avatar */}
                  <ReviewerAvatar name={review.name} index={globalIndex} />

                  {/* Name */}
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "0.9375rem",
                      color: "var(--ink)",
                      marginTop: "0.875rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {review.name}
                  </div>

                  {/* Date */}
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--stone)",
                      marginTop: "0.125rem",
                    }}
                  >
                    {review.date}
                  </div>

                  {/* Stars */}
                  <div
                    className="flex items-center justify-center"
                    style={{ gap: "2px", marginTop: "0.75rem" }}
                  >
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} size={18} />
                    ))}
                  </div>

                  {/* Review text */}
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "var(--ink)",
                      marginTop: "0.875rem",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {review.text}
                  </p>

                  {/* Google G logo — anchored to bottom */}
                  <div style={{ marginTop: "auto" }}>
                    <GoogleGIcon size={20} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right arrow — hidden on mobile */}
          <div className="hidden sm:block">
            <ArrowButton direction="right" onClick={() => setPage((p) => p + 1)} disabled={!canNext} />
          </div>
        </div>

        {/* ── Dots (mobile pagination) ── */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-center sm:hidden"
            style={{ gap: "0.5rem", marginTop: "1.25rem" }}
          >
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Page ${i + 1}`}
                style={{
                  width: i === page ? 20 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  background: i === page ? "var(--hills)" : "#d9d9d9",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
