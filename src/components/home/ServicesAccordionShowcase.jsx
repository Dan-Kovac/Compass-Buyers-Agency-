import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

const DEFAULT_ITEMS = [
  { id: "buying", title: "Property buying", desc: "We work with you from the very first conversation through to settlement and beyond. That means defining the brief, sourcing on and off-market opportunities, inspecting in person, and negotiating to secure the right home at the right price and on the right terms." },
  { id: "auction", title: "Auction bidding", desc: "A clear pre-auction strategy, a calm hand on the day, and a buyer's advocate who keeps the emotion out of the room. We bid with discipline and a defined ceiling so you walk away protected, whatever the result." },
  { id: "due", title: "Due diligence", desc: "Independent research and a structured review of the property, the contract and the area. Valuations, building and pest, planning checks and legal review, all coordinated through trusted local specialists, so the decision you make is fully informed." },
  { id: "negotiate", title: "Negotiation & settlement", desc: "Once we've found the right property, we handle every conversation with the selling agent and every step of the contract through to settlement. Your interests sit on one side of the table, and so do we." },
  { id: "invest", title: "Investment advisory", desc: "For investors, we layer suburb selection, yield analysis and long-term capital growth thinking into a portfolio strategy tailored to your goals, not a generic spreadsheet." },
];

const DEFAULT_TEAM_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/0b49c2526_6.png";

/**
 * Dark editorial accordion showcase with team image.
 * Modernised: rotating arrow icons, softer borders, crossfade image transitions.
 */
export default function ServicesAccordionShowcase({
  heading = "How we help you buy with confidence",
  teamImageUrl,
  teamImageAlt = "Our team",
  items,
} = {}) {
  const displayItems = (items && items.length > 0
    ? items.map((it, i) => ({ id: it._key || `item-${i}`, title: it.title, desc: it.description }))
    : DEFAULT_ITEMS);

  const imgSrc = teamImageUrl || DEFAULT_TEAM_IMAGE;

  return (
    <section
      style={{
        padding: "var(--section-padding) 0",
        background: "linear-gradient(175deg, var(--ink) 0%, #1a2f2e 100%)",
      }}
    >
      <div className="site-container">
        <ScrollReveal animation="fade-in">
          <p className="eyebrow-label text-center" style={{ color: "var(--sand)" }}>Our Services</p>
          <h2 className="text-center mb-12 md:mb-16" style={{ color: "#fff" }}>{heading}</h2>
        </ScrollReveal>
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Left: accordion */}
          <ScrollReveal animation="fade-right" className="space-y-3">
            <Accordion type="single" collapsible defaultValue={displayItems[0]?.id} className="space-y-3">
              {displayItems.slice(0, 4).map((it) =>
              <AccordionItem
                key={it.id}
                value={it.id}
                className="border border-white/[0.08] rounded-xl px-5 sm:px-6 bg-white/[0.03] hover:bg-white/[0.06] transition-colors duration-500">
                <AccordionTrigger className="py-5 sm:py-6 text-left items-start group [&>svg]:hidden no-underline hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <span
                      className="text-xl sm:text-2xl text-white"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {it.title}
                    </span>
                    <div className="ml-4 shrink-0 text-white/40 transition-transform duration-500 group-data-[state=open]:rotate-90">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-0 pb-6">
                  <p
                    className="leading-relaxed mb-3"
                    style={{
                      fontWeight: "var(--font-body-light)",
                      fontSize: "1.0625rem",
                      color: "rgba(255,255,255,0.65)",
                      lineHeight: "1.7",
                    }}
                  >
                    {it.desc}
                  </p>
                  <Link
                    to={createPageUrl("Services")}
                    className="inline-flex items-center gap-1.5 text-[14px]"
                    style={{ color: "var(--sand)", fontWeight: 500 }}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </AccordionContent>
              </AccordionItem>
              )}
            </Accordion>
          </ScrollReveal>

          {/* Right: image */}
          <ScrollReveal animation="fade-left" delay={100} className="rounded-xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto h-auto">
            <img
              src={imgSrc}
              alt={teamImageAlt}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
