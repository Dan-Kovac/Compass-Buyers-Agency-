import React from "react";

export default function ProcessSteps({ steps = [], title }) {
  return (
    <section className="py-12 md:py-16 bg-[var(--sea-breeze)]">
      <div className="site-container">
        {title && (
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] mb-0">{title}</h2>
          </div>
        )}
        <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8">
          {steps.map((s, i) => (
            <div key={i} className="bg-white border border-[var(--border)] rounded-token p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[var(--sand)] text-[var(--hills)] flex items-center justify-center font-semibold">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[var(--ink)] mb-1">{s.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
