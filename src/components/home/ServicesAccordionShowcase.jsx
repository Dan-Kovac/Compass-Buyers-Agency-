import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight } from "lucide-react";

const DEFAULT_ITEMS = [
  { id: "buying", title: "Property buying", desc: "We search, evaluate and negotiate to secure the right property, at the right price and terms. End-to-end and stress-free." },
  { id: "auction", title: "Auction bidding", desc: "Professional strategy and on‑the‑day representation to keep emotion out and results in." },
  { id: "due", title: "Due diligence", desc: "Independent research, valuations, building & pest, and legal review for informed decisions." },
  { id: "negotiate", title: "Negotiation & purchase", desc: "We handle every step of the deal to protect your position and deliver better outcomes." },
  { id: "invest", title: "Investment advisory", desc: "Data‑led insights, suburb selection and portfolio strategy tailored to your goals." },
];

const DEFAULT_TEAM_IMAGE = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/0b49c2526_6.png";

export default function ServicesAccordionShowcase({
  heading = "Explore Our Services",
  teamImageUrl,
  teamImageAlt = "Our team",
  items,
} = {}) {
  const displayItems = (items && items.length > 0
    ? items.map((it, i) => ({ id: it._key || `item-${i}`, title: it.title, desc: it.description }))
    : DEFAULT_ITEMS);

  const imgSrc = teamImageUrl || DEFAULT_TEAM_IMAGE;

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="bg-[var(--hills)] mx-3 sm:mx-4 md:mx-6 lg:mx-8 py-12 md:py-16 px-4 sm:px-6 lg:px-8" style={{ borderRadius: 'var(--radius-xl)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center mb-12 text-white">{heading}</h2>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-stretch">
            {/* Left: accordion */}
            <div className="space-y-4">
              <Accordion type="single" collapsible defaultValue={displayItems[0]?.id} className="space-y-4">
                {displayItems.slice(0, 4).map((it) =>
                <AccordionItem
                  key={it.id}
                  value={it.id}
                  className="border border-white/20 rounded-token px-5 sm:px-6 bg-white/5 hover:bg-white/10 transition-colors">
                  <AccordionTrigger className="py-5 sm:py-6 text-left items-start group [&>svg]:hidden no-underline hover:no-underline">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xl sm:text-2xl font-medium text-white capitalize">{it.title}</span>
                      <div className="ml-4 shrink-0 text-white/70">
                        <Plus className="w-5 h-5 group-data-[state=open]:hidden" />
                        <Minus className="w-5 h-5 hidden group-data-[state=open]:block" />
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-0 pb-6 text-white/90 text-base sm:text-lg leading-relaxed">
                    <p>{it.desc}</p>
                    <Link
                      to={createPageUrl("Services")}
                      className="inline-flex items-center gap-1 mt-2 text-white hover:text-white/80 font-medium">
                      See more <ArrowRight className="w-4 h-4" />
                    </Link>
                  </AccordionContent>
                </AccordionItem>
                )}
              </Accordion>
            </div>

            {/* Right: image */}
            <div className="rounded-token overflow-hidden shadow-lg border border-white/20 aspect-[16/10] lg:aspect-auto h-auto">
              <img
                src={imgSrc}
                alt={teamImageAlt}
                className="w-full h-full object-cover"
                loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
