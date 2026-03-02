import React from "react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";
import SectionHeader from "@/components/shared/SectionHeader";

const DEFAULT_ITEMS = [
  { label: "Byron Shire", image: "https://images.unsplash.com/photo-1528150230181-99bbf7b22162?q=80&w=2070&auto=format&fit=crop" },
  { label: "Tweed Shire", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" },
  { label: "City of Gold Coast", image: "https://images.unsplash.com/photo-1614098635746-13c88b9c4a95?q=80&w=2070&auto=format&fit=crop" },
];

export default function Regions({
  heading = "Where We Buy",
  eyebrow = "Our Regions",
  subtitle = "Byron Shire, Tweed Shire and the City of Gold Coast. Three distinct markets, each with its own pricing, council rules and opportunities. Here's how we navigate them.",
  ctaText = "Explore Areas & Suburbs",
  bg = "bg-warm-gradient",
  items,
} = {}) {
  const lgaItems = (items && items.length > 0)
    ? items.map((it) => ({
        label: it.label,
        image: it.imageUrl || DEFAULT_ITEMS.find(d => d.label === it.label)?.image || DEFAULT_ITEMS[0].image,
      }))
    : DEFAULT_ITEMS;

  return (
    <section className="bg-white" style={{ padding: "var(--section-breathing-lg) 0" }}>
      <div className="site-container">
        <SectionHeader
          eyebrow={eyebrow}
          heading={heading}
          subtitle={subtitle}
        />

        {/* Tall destination cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 mb-12">
          <StaggerGroup stagger={120}>
            {lgaItems.map((it) => (
              <ScrollReveal key={it.label}>
                <div className="relative overflow-hidden group cursor-pointer h-[220px] sm:h-[320px] md:h-[420px] rounded-xl">
                  {/* Full-bleed image */}
                  <img
                    src={it.image}
                    alt={it.label}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />

                  {/* Gradient fade at bottom */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "linear-gradient(to top, rgba(35,35,35,0.6) 0%, rgba(35,35,35,0.05) 45%, transparent 65%)",
                    }}
                  />

                  {/* Bottom-aligned text */}
                  <div className="absolute bottom-6 left-6 right-6 z-10">
                    <h3
                      className="text-white mb-0"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontWeight: 400,
                        fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                        letterSpacing: "-0.01em",
                        lineHeight: 1.2,
                      }}
                    >
                      {it.label}
                    </h3>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </StaggerGroup>
        </div>

        <div className="flex justify-center">
          <a href={createPageUrl("Areas")}>
            <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
              {ctaText}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
