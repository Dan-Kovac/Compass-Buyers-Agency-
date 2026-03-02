import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const DEFAULT_CHECKLIST = [
  "One point of contact from first call to settlement",
  "Weekly updates with clear next steps, not radio silence",
  "Local solicitor, building inspector and broker referrals included",
];

export default function InvestmentAndRelationship({
  heading = "What working with us looks like",
  body = "You'll deal with the same person from start to finish. We'll tell you when something's worth pursuing and when it isn't. No runaround, no surprises, no wasted weekends at open homes.",
  imageUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg",
  imageAlt = "Chris from Compass Buyers Agency speaking with a client",
  checklist = DEFAULT_CHECKLIST,
} = {}) {
  const items = checklist && checklist.length > 0 ? checklist : DEFAULT_CHECKLIST;

  return (
    <section className="bg-sand-wash" style={{ padding: "var(--section-breathing-lg) 0" }}>
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image — clean, generous */}
          <ScrollReveal animation="fade-right">
            <div className="aspect-[4/3] overflow-hidden rounded-xl">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </ScrollReveal>

          {/* Copy */}
          <ScrollReveal animation="fade-left" delay={120}>
            <p className="eyebrow-label">The Experience</p>
            <h2 className="mb-4" style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}>{heading}</h2>
            <p
              className="mb-6"
              style={{
                fontWeight: "var(--font-body-light)",
                fontSize: "1.0625rem",
                color: "var(--stone)",
                lineHeight: "1.7",
              }}
            >
              {body}
            </p>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{
                    fontWeight: "var(--font-body-light)",
                    fontSize: "1.0625rem",
                    color: "var(--stone)",
                    lineHeight: "1.6",
                  }}
                >
                  <span
                    className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--hills)]"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
