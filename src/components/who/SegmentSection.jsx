import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function SegmentSection({
  id,
  title,
  intro,
  needs = [],
  howWeHelp = [],
  image,
  imageAlt,
  ctaText = "Speak to our team",
  ctaHref = createPageUrl("Contact"),
  imageLeft = false,
  squareImage = false,
}) {
  return (
    <section id={id} className="py-12 md:py-16 bg-white scroll-mt-24">
      <div className="site-container">
        <div className={`grid lg:grid-cols-2 gap-8 md:gap-10 items-stretch ${imageLeft ? "" : ""}`}>
          {/* Image */}
          <div
            className={`rounded-token overflow-hidden border border-[var(--border)] ${
              imageLeft ? "" : "order-2 lg:order-2"
            } ${squareImage ? "aspect-[4/3] lg:aspect-square" : "aspect-[4/3]"} w-full`}
          >
            <img
              src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"}
              alt={imageAlt || title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className={`${imageLeft ? "" : "order-1 lg:order-1"} h-full flex items-center`}>
            <div>
              <h2 className="mb-2">{title}</h2>
              {intro && <p className="text-gray-700">{intro}</p>}

              {needs.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm text-gray-500 mb-2">Common challenges</div>
                  <ul className="space-y-2">
                    {needs.map((n, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-800">
                        <CheckCircle className="w-5 h-5 text-[var(--hills)] mt-[2px]" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {howWeHelp.length > 0 && (
                <div className="mt-5">
                  <div className="text-sm text-gray-500 mb-2">How we help</div>
                  <ul className="space-y-2">
                    {howWeHelp.map((n, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-800">
                        <CheckCircle className="w-5 h-5 text-[var(--hills)] mt-[2px]" />
                        <span>{n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6">
                <a href={ctaHref}>
                  <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                    {ctaText}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
