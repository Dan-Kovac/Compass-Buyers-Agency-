import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function AreasHero({
  heading = "The Northern Rivers and Beyond",
  subtitle = "Four shires, dozens of suburbs, one focus: finding you the right property at the right price.",
  eyebrow = "Where We Buy",
}) {
  return (
    <section className="bg-warm-gradient page-header">
      <div className="site-container">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <p className="eyebrow-label">{eyebrow}</p>
            <h1>{heading}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
