import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const DEFAULT_CHECKLIST = [
  "76% of homes secured through off-market or pre-market channels, before they're advertised publicly",
  "On-the-ground experience across the Tweed Shire, Gold Coast, Byron Bay and Ballina regions",
  "Long-standing relationships with hundreds of local selling agents, plus access to top-tier legal, building and planning professionals",
];

export default function InvestmentAndRelationship({
  eyebrow = "What Local Expertise Means",
  heading = "Eighty years of property experience, all walking the same streets",
  body = "Our team has more than 80 years of combined personal and professional property experience across the Northern Rivers and the Gold Coast. Every property is inspected in person, by us, before any recommendation. That's how you get the micro-pocket, street-level insights most buyers will never see.",
  imageUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg",
  imageAlt = "Chris from Compass Buyers Agency speaking with a client",
  checklist = DEFAULT_CHECKLIST,
} = {}) {
  const items = checklist && checklist.length > 0 ? checklist : DEFAULT_CHECKLIST;

  return (
    <section className="bg-white" style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <div
          className="grid lg:grid-cols-2 items-stretch"
          style={{ gap: "clamp(2rem, 4vw, 4rem)" }}
        >
          {/* Image */}
          <ScrollReveal animation="fade-right" className="h-full">
            <div
              className="aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden"
              style={{
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                minHeight: "clamp(280px, 40vw, 460px)",
              }}
            >
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                style={{ transition: "transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1)" }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.015)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
              />
            </div>
          </ScrollReveal>

          {/* Copy */}
          <ScrollReveal animation="fade-left" delay={120}>
            <p className="eyebrow-label">{eyebrow}</p>
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
