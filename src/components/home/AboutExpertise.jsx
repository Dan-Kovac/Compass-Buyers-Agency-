import React from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function AboutExpertise({
  quoteText = "Compass made buying simple and stress-free. Their local knowledge, off-market access and sharp negotiation delivered a great outcome - highly recommend.",
  authorName = "Mick Caine",
  authorRole = "Property buyer",
  authorAvatarUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab9ef034e_unnamed1.png",
} = {}) {
  return (
    <section className="bg-cream" style={{ padding: "var(--section-standard-lg) 0" }}>
      <ScrollReveal className="site-container max-w-2xl text-center">
        {/* Subtle decorative quote mark */}
        <div
          className="leading-none select-none"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--hills)",
            opacity: 0.12,
            fontSize: "clamp(56px, 8vw, 88px)",
            marginBottom: "clamp(-16px, -2vw, -28px)",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <p
          className="text-[var(--ink)] mb-6 px-4 md:px-6"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            letterSpacing: "-0.01em",
            lineHeight: 1.5,
          }}
        >
          {quoteText}
        </p>

        <div className="flex items-center justify-center gap-2.5">
          <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--bright-grey)]">
            <img
              src={authorAvatarUrl}
              alt={authorName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-left">
            <div
              className="text-[13px] text-[var(--ink)]"
              style={{ fontWeight: 500 }}
            >
              {authorName}
            </div>
            <div
              className="text-[11px]"
              style={{ fontWeight: 300, color: "var(--stone)" }}
            >
              {authorRole}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
