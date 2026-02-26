import React from "react";
import ReviewsWidget from "../shared/ReviewsWidget";

export default function TestimonialsPlaceholder() {
  return (
    <section className="py-20 bg-white">
      <div className="site-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-6">Hear From Our Clients</h2>
          <ReviewsWidget />
        </div>
      </div>
    </section>
  );
}
