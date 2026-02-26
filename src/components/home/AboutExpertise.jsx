import React from "react";

export default function AboutExpertise() {
  // Minimal featured review to sit directly under the hero
  return (
    <section className="py-14 md:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Stars */}
        <div className="flex justify-center gap-1 text-[var(--ink)] mb-5">
          {Array.from({ length: 5 }).map((_, i) =>
          <span key={i} className="text-xl md:text-2xl text-[var(--hills)]">★</span>
          )}
        </div>

        {/* Concise review (shortened for clarity and trust) */}
        <p className="text-lg md:text-xl leading-tight text-[var(--ink)] mb-6">
          Compass made buying simple and stress-free. Their local knowledge, off-market access and sharp negotiation delivered a great outcome - highly recommend.
        </p>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--bright-grey)]">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab9ef034e_unnamed1.png"
              alt="Mick Caine"
              className="w-full h-full object-cover"
              loading="lazy" />

          </div>
          <div className="text-left">
            <div className="font-medium text-[var(--ink)]">Mick Caine</div>
            <div className="text-sm text-gray-500">Property buyer</div>
          </div>
        </div>
      </div>
    </section>);

}
