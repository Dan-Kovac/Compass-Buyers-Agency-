import React from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";

const DEFAULT_ITEMS = [
  { label: "Byron Shire", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop" },
  { label: "Tweed Shire", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop" },
  { label: "City of Gold Coast", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1974&auto=format&fit=crop" },
];

export default function Regions({
  heading = "Areas We Serve",
  subtitle = "We specialise in Northern NSW & Southern QLD Byron Shire, Tweed Shire and the City of Gold Coast. We're across council rules and overlays in each region and stay in tune with the latest information as it relates to your investment.",
  ctaText = "Explore Areas & Suburbs",
  items,
} = {}) {
  const lgaItems = (items && items.length > 0)
    ? items.map((it) => ({ label: it.label, image: it.imageUrl || DEFAULT_ITEMS.find(d => d.label === it.label)?.image || DEFAULT_ITEMS[0].image }))
    : DEFAULT_ITEMS;

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="site-container">
        <h2 className="text-center mb-4">{heading}</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">{subtitle}</p>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {lgaItems.map((it) =>
          <div
            key={it.label}
            className="surface p-0 flex flex-col overflow-hidden">
            <div className="aspect-[4/3] overflow-hidden relative">
              <img
                src={it.image}
                alt={it.label}
                className="w-full h-full object-cover"
                loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[var(--sea-breeze)] flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-[var(--hills)]" />
                </div>
                <div className="text-white font-medium drop-shadow">{it.label}</div>
              </div>
            </div>
          </div>
          )}
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
