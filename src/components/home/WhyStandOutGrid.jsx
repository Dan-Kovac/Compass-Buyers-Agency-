import React from "react";
import { Command, Shield, Search, BadgeCheck, Compass, SlidersHorizontal } from "lucide-react";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

const ICONS = [Command, Search, BadgeCheck, Shield, Compass, SlidersHorizontal];

const DEFAULT_CARDS = [
  { title: "Personalised search", description: "Tailored to your goals, budget and timeline. No cookie-cutter shortlists." },
  { title: "Off-market access", description: "42% of our deals never hit the portals. Local agent relationships make the difference." },
  { title: "Independent advice", description: "We work exclusively for buyers. Never list or sell. Zero conflict of interest." },
  { title: "Risk management", description: "Building reports, flood maps, council checks, contract review. We flag problems early." },
  { title: "Local expertise", description: "Based on the Tweed Coast. We know these streets, these agents, these markets." },
  { title: "Negotiation edge", description: "Average 5.5% below asking across 62+ completed buys. Price and terms, handled." },
];

export default function WhyStandOutGrid({
  heading = "Why Compass Stands Out",
  cards,
} = {}) {
  const features = (cards && cards.length > 0 ? cards : DEFAULT_CARDS).map((c, i) => ({
    icon: ICONS[i % ICONS.length],
    title: c.title,
    desc: c.description,
  }));

  return (
    <section className="bg-white" style={{ padding: "var(--section-standard-lg) 0" }}>
      <div className="site-container">
        <ScrollReveal className="text-center mb-10 md:mb-14">
          <p className="eyebrow-label">The Compass Difference</p>
          <h2>{heading}</h2>
        </ScrollReveal>

        {/* Mobile: horizontal swipe carousel */}
        <div className="md:hidden relative -mx-4 px-4" aria-roledescription="carousel" aria-label="Why Compass features">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="surface p-5 sm:p-8 group min-w-[85%] snap-start"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--sea-breeze)]/40 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" style={{ color: "var(--hills)" }} />
                </div>
                <div className="mb-1 capitalize" style={{ fontWeight: "var(--font-body-medium)", fontSize: "1.125rem" }}>{title}</div>
                <p style={{ fontWeight: "var(--font-body-light)", color: "var(--stone)", lineHeight: "1.6" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet: grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StaggerGroup stagger={80}>
            {features.map(({ icon: Icon, title, desc }) => (
              <ScrollReveal key={title}>
                <div className="surface p-8 group h-full">
                  <div className="w-12 h-12 rounded-full bg-[var(--sea-breeze)]/40 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6" style={{ color: "var(--hills)" }} />
                  </div>
                  <div className="mb-1 capitalize" style={{ fontWeight: "var(--font-body-medium)", fontSize: "1.125rem" }}>{title}</div>
                  <p style={{ fontWeight: "var(--font-body-light)", color: "var(--stone)", lineHeight: "1.6" }}>{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
