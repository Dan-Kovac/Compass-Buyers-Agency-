import React from "react";
import { createPageUrl } from "@/utils";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function ShireOverview({ shires = [] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
      <StaggerGroup stagger={120}>
        {shires.map((shire) => (
          <ScrollReveal key={shire.title}>
            <div className="bg-white rounded-lg ring-1 ring-black/[0.04] overflow-hidden h-full flex flex-col">
              {/* Region image */}
              {shire.image && (
                <div className="aspect-[16/7] overflow-hidden">
                  <img
                    src={shire.image}
                    alt={shire.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="p-6 md:p-7 flex-1 flex flex-col">
                <h3
                  className="mb-1"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 400,
                    fontSize: "1.375rem",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {shire.title}
                </h3>
                <p
                  className="mb-5"
                  style={{
                    fontWeight: "var(--font-body-light)",
                    color: "var(--stone)",
                    fontSize: "0.875rem",
                  }}
                >
                  {shire.suburbs.length} suburbs serviced
                </p>

                <div className="space-y-0 divide-y divide-[var(--border)]/60 flex-1">
                  {shire.suburbs.map((suburb) => {
                    const isLive = suburb.isLive || false;
                    const profileUrl = suburb.slug
                      ? createPageUrl(
                          `BlogPostDetail?slug=${encodeURIComponent(suburb.slug)}`
                        )
                      : null;

                    return (
                      <div
                        key={suburb.name}
                        className="flex items-center justify-between py-2.5"
                      >
                        <span
                          style={{
                            fontWeight: "var(--font-body-medium)",
                            fontSize: "0.9375rem",
                          }}
                        >
                          {suburb.name}
                        </span>
                        {isLive && profileUrl ? (
                          <a
                            href={profileUrl}
                            className="text-[var(--hills)] hover:underline underline-offset-2 transition-colors"
                            style={{
                              fontWeight: "var(--font-body-medium)",
                              fontSize: "0.8125rem",
                            }}
                          >
                            View profile
                          </a>
                        ) : (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--stone)",
                              fontWeight: "var(--font-body-light)",
                              opacity: 0.6,
                            }}
                          >
                            Coming soon
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </StaggerGroup>
    </div>
  );
}
