import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function ContactStrip() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop')"
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />
      <div className="relative site-container py-16 md:py-20 text-white">
        <ScrollReveal>
          <h2 className="mb-4">Get Started</h2>
          <p className="text-white/90 text-lg mb-6">
            Talk to Northern Rivers’ trusted buyers agents. Free consultation, no obligation.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={120}>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            className="btn-cta w-full sm:w-auto bg-white text-[var(--hills)] hover:bg-[var(--bright-grey)]"
            onClick={() => navigate(createPageUrl("Contact"))}
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Contact Our Team
          </Button>
          <a href="tel:0403536390">
            <Button
              className="btn-cta w-full sm:w-auto btn-secondary-invert"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Call 0403 536 390
            </Button>
          </a>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
