import React from "react";
import { Command, Shield, Search, BadgeCheck, Compass, SlidersHorizontal } from "lucide-react";

const features = [
  { icon: Command, title: "Personalised search", desc: "Every brief tailored to your goals, budget and timeline." },
  { icon: Search, title: "Off‑market access", desc: "Local relationships open doors beyond the portals." },
  { icon: BadgeCheck, title: "Independent advice", desc: "We work exclusively for buyers. No conflicts." },
  { icon: Shield, title: "Risk management", desc: "Thorough due diligence to avoid costly mistakes." },
  { icon: Compass, title: "Local expertise", desc: "Northern Rivers and Southern Gold Coast specialists." },
  { icon: SlidersHorizontal, title: "Negotiation edge", desc: "Price and terms negotiated to protect your position." }
];

export default function WhyStandOutGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="site-container">
        <h2 className="text-center mb-8">Why Compass Stands Out</h2>

        {/* Mobile: horizontal swipe carousel */}
        <div className="md:hidden relative -mx-4 px-4" aria-roledescription="carousel" aria-label="Why Compass features">
          {/* edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent" aria-hidden="true" />
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="surface p-8 group min-w-[85%] snap-start transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--sea-breeze)]/40 flex items-center justify-center mb-5 transition-transform duration-200 group-hover:-translate-y-0.5">
                  <Icon className="w-6 h-6" style={{ color: 'var(--hills)' }} />
                </div>
                <div className="text-lg font-medium mb-1 capitalize">{title}</div>
                <p className="text-[var(--ink)]/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop/Tablet: grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div 
              key={title} 
              className="surface p-8 group transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--sea-breeze)]/40 flex items-center justify-center mb-5 transition-transform duration-200 group-hover:-translate-y-0.5">
                <Icon className="w-6 h-6" style={{ color: 'var(--hills)' }} />
              </div>
              <div className="text-lg font-medium mb-1 capitalize">{title}</div>
              <p className="text-[var(--ink)]/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
