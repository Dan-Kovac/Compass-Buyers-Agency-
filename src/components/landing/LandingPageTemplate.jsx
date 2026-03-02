import React from "react";
import LandingHero from "./LandingHero";
import StatsBar from "./StatsBar";
import InfoSplit from "./InfoSplit";
import FAQAccordion from "./FAQAccordion";
import AboutExpertise from "../home/AboutExpertise";
import ServicesAccordionShowcase from "../home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "../home/RecentAcquisitionsStrip";
import TestimonialSection from "../shared/TestimonialSection";
import Regions from "../home/Regions";
import WhyStandOutGrid from "../home/WhyStandOutGrid";
import CTASection from "../shared/CTASection";
import ImageBand from "../shared/ImageBand";
import ScrollReveal from "../shared/ScrollReveal";
import { createPageUrl } from "@/utils";
import { urlFor } from "@/lib/sanityClient";

/**
 * LandingPageTemplate — reusable template for all suburb/region landing pages.
 *
 * Accepts a `data` object matching the Sanity `landingPage` schema shape.
 * Works with both hardcoded data and Sanity-fetched documents.
 *
 * data shape:
 *   heroTitle, heroSubtitle, heroImage?, heroImageUrl?, heroVideoUrl?
 *   marketStats[]?           { value, label }
 *   infoSplits[]?            { title, description?, bullets[], image?, imageUrl?, imageSide }
 *   suburbs[]?               string[]  (flat list)
 *   suburbGroups[]?          { heading, items: string[] }  (grouped layout, e.g. Northern Rivers)
 *   suburbsHeading?          string  (defaults to "Suburbs We Cover")
 *   approach?                { heading, body?, bullets[] }
 *   faqItems[]?              { question, answer?, bullets[]? }
 *   faqHeading?              string  (defaults to "Frequently Asked Questions")
 *   testimonialVideos[]?     { videoSrc, posterSrc, clientName, subtitle }
 *   ctaHeading, ctaButtonText?
 *   localBusinessSchema?     object  (JSON-LD LocalBusiness)
 */

/* Background cycle for info splits */
const splitBgs = ["bg-white", "bg-sand-wash"];

export default function LandingPageTemplate({ data }) {
  if (!data) return null;

  const contactUrl = createPageUrl("Contact");
  const blogUrl = createPageUrl("Blog");

  // Resolve hero image: Sanity image ref or direct URL
  const heroImageUrl = data.heroImageUrl
    || (data.heroImage ? urlFor(data.heroImage).width(1920).quality(80).url() : undefined);

  return (
    <div className="overflow-hidden">
      {/* ─── 1. Hero ──────────────────────────────────────────────── */}
      <LandingHero
        title={data.heroTitle}
        subtitle={data.heroSubtitle}
        backgroundVideoUrl={data.heroVideoUrl}
        backgroundImageUrl={heroImageUrl}
      />

      {/* ─── 2. Stats Bar ─────────────────────────────────────────── */}
      {data.marketStats?.length > 0 && (
        <StatsBar stats={data.marketStats} />
      )}

      {/* ─── 3. Info Split Sections (varied backgrounds) ──────────── */}
      {data.infoSplits?.map((split, i) => {
        const imageUrl = split.imageUrl
          || (split.image ? urlFor(split.image).width(800).quality(80).url() : undefined);

        // If no image, render a simpler text-only section
        if (!imageUrl) {
          const bgClass = splitBgs[i % splitBgs.length];
          return (
            <section key={i} className={bgClass} style={{ padding: "var(--section-standard) 0" }}>
              <div className="site-container">
                <ScrollReveal>
                  <div className="max-w-3xl">
                    {split.title && <h2 className="mb-3">{split.title}</h2>}
                    {split.description && (
                      <p
                        className="mb-5"
                        style={{
                          fontWeight: "var(--font-body-light)",
                          fontSize: "1.0625rem",
                          color: "var(--stone)",
                          lineHeight: "1.7",
                        }}
                      >
                        {split.description}
                      </p>
                    )}
                    {split.bullets?.length > 0 && (
                      <ul className="space-y-2.5">
                        {split.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-3"
                            style={{
                              fontWeight: "var(--font-body-light)",
                              fontSize: "1.0625rem",
                              color: "var(--stone)",
                              lineHeight: "1.6",
                            }}
                          >
                            <span
                              className="shrink-0 mt-[2px]"
                              style={{ color: "var(--hills)", fontWeight: "var(--font-body-medium)" }}
                            >
                              —
                            </span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </ScrollReveal>
              </div>
            </section>
          );
        }

        return (
          <InfoSplit
            key={i}
            title={split.title}
            description={split.description}
            bullets={split.bullets}
            imageUrl={imageUrl}
            imageAlt={split.title || ""}
            imageSide={split.imageSide || (i % 2 === 0 ? "right" : "left")}
          />
        );
      })}

      {/* ─── 4. Atmospheric image band ────────────────────────────── */}
      <ImageBand
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Aerial view of Northern Rivers coastline"
        height="240px"
        overlay
      />

      {/* ─── 5. Suburbs ───────────────────────────────────────────── */}
      {(data.suburbs?.length > 0 || data.suburbGroups?.length > 0) && (
        <section className="bg-sand-wash" style={{ padding: "var(--section-standard) 0" }}>
          <div className="site-container">
            <ScrollReveal>
              <p className="eyebrow-label">Coverage</p>
              <h2 className="mb-4">{data.suburbsHeading || "Suburbs We Cover"}</h2>
            </ScrollReveal>

            {/* Grouped layout (e.g. Northern Rivers: Coastal / Hinterland / Inland) */}
            {data.suburbGroups?.length > 0 ? (
              <ScrollReveal animation="fade-up" delay={80}>
                <div className="grid md:grid-cols-3 gap-6">
                  {data.suburbGroups.map((group, gi) => (
                    <div key={gi}>
                      <h3
                        className="mb-2"
                        style={{ fontWeight: "var(--font-body-medium)" }}
                      >
                        {group.heading}
                      </h3>
                      <ul className="space-y-1.5">
                        {group.items.map((suburb, si) => (
                          <li
                            key={si}
                            className="flex items-center gap-2"
                            style={{
                              fontWeight: "var(--font-body-light)",
                              color: "var(--stone)",
                              fontSize: "1.0625rem",
                            }}
                          >
                            <span style={{ color: "var(--hills)" }}>—</span>
                            <a
                              className="hover:underline"
                              href={`${blogUrl}?category=suburb-profiles&tag=${suburb.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {suburb}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ) : (
              /* Flat 2-column list */
              <ScrollReveal animation="fade-up" delay={80}>
                <ul className="grid sm:grid-cols-2 gap-y-2">
                  {data.suburbs.map((suburb, si) => (
                    <li
                      key={si}
                      className="flex items-center gap-2"
                      style={{
                        fontWeight: "var(--font-body-light)",
                        color: "var(--stone)",
                        fontSize: "1.0625rem",
                      }}
                    >
                      <span style={{ color: "var(--hills)" }}>—</span>
                      <a
                        className="hover:underline"
                        href={`${blogUrl}?category=suburb-profiles&tag=${suburb.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {suburb}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            )}
          </div>
        </section>
      )}

      {/* ─── 6. Our Approach ──────────────────────────────────────── */}
      {data.approach && (
        <section className="bg-white" style={{ padding: "var(--section-standard) 0" }}>
          <div className="site-container">
            <ScrollReveal>
              <div className="max-w-3xl">
                <p className="eyebrow-label">Our Approach</p>
                <h2 className="mb-3">{data.approach.heading}</h2>
                {data.approach.body && (
                  <p
                    className="mb-5"
                    style={{
                      fontWeight: "var(--font-body-light)",
                      fontSize: "1.0625rem",
                      color: "var(--stone)",
                      lineHeight: "1.7",
                    }}
                  >
                    {data.approach.body}
                  </p>
                )}
                {data.approach.bullets?.length > 0 && (
                  <ul className="space-y-2.5">
                    {data.approach.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                        style={{
                          fontWeight: "var(--font-body-light)",
                          fontSize: "1.0625rem",
                          color: "var(--stone)",
                          lineHeight: "1.6",
                        }}
                      >
                        <span
                          className="shrink-0 mt-[2px]"
                          style={{ color: "var(--hills)", fontWeight: "var(--font-body-medium)" }}
                        >
                          —
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── 7. FAQ ───────────────────────────────────────────────── */}
      {data.faqItems?.length > 0 && (
        <section className="bg-[var(--bright-grey)]" style={{ padding: "var(--section-standard-lg) 0" }}>
          <div className="site-container">
            <ScrollReveal className="text-center mb-10 md:mb-14">
              <p className="eyebrow-label">Common Questions</p>
              <h2>{data.faqHeading || "Frequently Asked Questions"}</h2>
            </ScrollReveal>
            <FAQAccordion items={data.faqItems} />
          </div>
        </section>
      )}

      {/* ─── 8. Shared Sections ───────────────────────────────────── */}
      <AboutExpertise />
      <ServicesAccordionShowcase />
      <RecentAcquisitionsStrip />
      {data.testimonialVideos?.length > 0 ? (
        <TestimonialSection testimonials={data.testimonialVideos} />
      ) : (
        <TestimonialSection />
      )}
      <Regions />
      <WhyStandOutGrid />

      {/* ─── 9. CTA ───────────────────────────────────────────────── */}
      <CTASection
        heading={data.ctaHeading || "Ready to get started?"}
        buttonText={data.ctaButtonText || "Book a Free Consultation"}
        buttonHref={contactUrl}
        showReviewsCarousel={true}
        variant="dark"
      />

      {/* ─── JSON-LD ──────────────────────────────────────────────── */}
      {data.localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.localBusinessSchema) }}
        />
      )}
      {data.faqItems?.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: data.faqItems.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer
                    || (faq.bullets ? faq.bullets.join(". ") + "." : ""),
                },
              })),
            }),
          }}
        />
      )}
    </div>
  );
}
