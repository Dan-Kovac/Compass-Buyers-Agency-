import React, { useState, useEffect, useRef, useCallback } from "react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";
import { createPageUrl } from "@/utils";

/**
 * Responsive column count hook — matches the CSS breakpoints
 * in Layout.jsx for .segment-card-grid.
 */
function useColumns() {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

/**
 * SegmentExpandPanel — detail panel that slides in below a card row.
 * Shows the segment's needs + how-we-help lists side by side.
 */
function SegmentExpandPanel({ segment, onClose }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
      panelRef.current.focus({ preventScroll: true });
    }
  }, [segment.id]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const renderList = (items, label) =>
    items && items.length > 0 && (
      <div>
        <div
          className="eyebrow-label"
          style={{ fontSize: "0.6875rem", marginBottom: "0.75rem" }}
        >
          {label}
        </div>
        <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3"
              style={{ color: "var(--ink)", opacity: 0.85 }}
            >
              <span
                className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--hills)]"
                aria-hidden="true"
              />
              <span style={{ fontWeight: "var(--font-body-light)" }}>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div
      ref={panelRef}
      className="segment-expand-panel"
      role="region"
      aria-labelledby={`segment-title-${segment.id}`}
      tabIndex={-1}
      style={{ position: "relative", outline: "none" }}
    >
      {/* Close button */}
      <button
        className="segment-expand-panel__close"
        onClick={onClose}
        aria-label="Close details"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="2" y1="2" x2="12" y2="12" />
          <line x1="12" y1="2" x2="2" y2="12" />
        </svg>
      </button>

      {/* Title + intro */}
      <h3
        id={`segment-title-${segment.id}`}
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: "clamp(1.25rem, 2vw, 1.625rem)",
          fontWeight: 400,
          color: "var(--ink)",
          lineHeight: 1.2,
          marginBottom: "0.5rem",
          letterSpacing: "-0.01em",
        }}
      >
        {segment.title}
      </h3>
      {segment.intro && (
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 300,
            fontSize: "clamp(0.9375rem, 1.1vw, 1.0625rem)",
            lineHeight: 1.6,
            color: "var(--stone)",
            maxWidth: "60ch",
            marginBottom: "clamp(1.25rem, 2.5vw, 1.75rem)",
          }}
        >
          {segment.intro}
        </p>
      )}

      {/* Two-column lists */}
      <div className="segment-expand-panel__grid">
        {renderList(segment.needs, "Common challenges")}
        {renderList(segment.howWeHelp, "How we help")}
      </div>

      {/* CTA */}
      <div style={{ marginTop: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
        <a
          href={createPageUrl("Contact")}
          className="btn-cta inline-flex items-center justify-center bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white transition-colors"
        >
          Start a Conversation
        </a>
      </div>
    </div>
  );
}

/**
 * SegmentCardGrid — compact 3x3 grid with click-to-expand detail panels.
 * All 9 buyer segments visible at once. Clicking a card expands a detail
 * panel below that row.
 */
export default function SegmentCardGrid({ segments = [] }) {
  const [activeId, setActiveId] = useState(null);
  const cols = useColumns();
  const cardRefs = useRef({});

  if (!segments.length) return null;

  const handleCardClick = useCallback((id) => {
    setActiveId((prev) => (prev === id ? null : id));
  }, []);

  const handleClose = useCallback(() => {
    const id = activeId;
    setActiveId(null);
    // Return focus to the card that was active
    if (id && cardRefs.current[id]) {
      cardRefs.current[id].focus({ preventScroll: true });
    }
  }, [activeId]);

  // Split segments into rows based on current column count
  const rows = [];
  for (let i = 0; i < segments.length; i += cols) {
    rows.push(segments.slice(i, i + cols));
  }

  const activeSegment = segments.find((s) => s.id === activeId);

  return (
    <section className="bg-white" style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        {rows.map((row, rowIndex) => {
          const rowHasActive = row.some((s) => s.id === activeId);

          return (
            <React.Fragment key={rowIndex}>
              {/* Card row */}
              <div
                className="segment-card-grid"
                style={rowIndex > 0 ? { marginTop: "clamp(1rem, 2vw, 1.5rem)" } : undefined}
              >
                {rowIndex === 0 ? (
                  <StaggerGroup stagger={80}>
                    {row.map((seg) => (
                      <ScrollReveal key={seg.id} animation="scale-subtle" duration={600}>
                        <SegmentCard
                          segment={seg}
                          isActive={seg.id === activeId}
                          onClick={handleCardClick}
                          cardRef={(el) => { cardRefs.current[seg.id] = el; }}
                        />
                      </ScrollReveal>
                    ))}
                  </StaggerGroup>
                ) : (
                  row.map((seg) => (
                    <SegmentCard
                      key={seg.id}
                      segment={seg}
                      isActive={seg.id === activeId}
                      onClick={handleCardClick}
                      cardRef={(el) => { cardRefs.current[seg.id] = el; }}
                    />
                  ))
                )}
              </div>

              {/* Expand panel — rendered after the row containing the active card */}
              {rowHasActive && activeSegment && (
                <SegmentExpandPanel
                  key={activeSegment.id}
                  segment={activeSegment}
                  onClose={handleClose}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Individual segment card — compact with square image.
 */
function SegmentCard({ segment, isActive, onClick, cardRef }) {
  return (
    <button
      ref={cardRef}
      className={`segment-card${isActive ? " segment-card--active" : ""}`}
      onClick={() => onClick(segment.id)}
      aria-expanded={isActive}
      aria-controls={`segment-panel-${segment.id}`}
      style={{
        width: "100%",
        textAlign: "left",
        font: "inherit",
        padding: 0,
      }}
    >
      {/* Card image */}
      <div
        className="segment-card-image"
        style={{
          aspectRatio: "4 / 3",
          overflow: "hidden",
        }}
      >
        <img
          src={segment.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop"}
          alt={segment.imageAlt || segment.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Card text */}
      <div style={{ padding: "clamp(0.875rem, 1.5vw, 1.25rem)" }}>
        <h3
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(1.0625rem, 1.5vw, 1.25rem)",
            fontWeight: 400,
            color: "var(--ink)",
            lineHeight: 1.2,
            marginBottom: "0.375rem",
            letterSpacing: "-0.01em",
          }}
        >
          {segment.title}
        </h3>

        {segment.intro && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 300,
              fontSize: "clamp(0.8125rem, 0.95vw, 0.875rem)",
              lineHeight: 1.5,
              color: "var(--stone)",
              marginBottom: 0,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {segment.intro}
          </p>
        )}

        <span
          className="segment-card-link"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            fontSize: "0.8125rem",
            color: "var(--hills)",
            marginTop: "0.625rem",
            display: "inline-block",
          }}
        >
          {isActive ? "Close \u2191" : "Learn more \u2192"}
        </span>
      </div>
    </button>
  );
}
