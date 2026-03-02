import React from "react";
import ReviewsWidget from "../shared/ReviewsWidget";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function TestimonialsPlaceholder() {
  return (
    <section className="section-padding-lg bg-white">
      <div className="site-container">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6">Hear From Our Clients</h2>
            <ReviewsWidget />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
