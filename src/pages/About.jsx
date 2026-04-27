import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTeamMembers, fetchPage, urlFor } from "@/lib/sanityClient";
import { createPageUrl } from "@/utils";
import CTASection from "../components/shared/CTASection.jsx";
import FeatureSplit from "../components/about/FeatureSplit";

import SEOHead from "../components/shared/SEOHead";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

/* ── Fallback stat data ────────────────────────────────────────────────────── */
const DEFAULT_STATS = [
  { value: "70+", label: "Properties Secured" },
  { value: "42%", label: "Off-Market Deals" },
  { value: "~5.5%", label: "Avg. Saving Below Asking" },
  { value: "100%", label: "Buyer-Only Focus" },
];

export default function About() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetchPage("aboutPage").then(setPage).catch(() => {});
  }, []);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const members = await fetchTeamMembers();
      setTeamMembers(members);
    } catch (error) {
      console.error("Error loading team members:", error);
    }
    setIsLoading(false);
  };

  const stats = page?.stats?.length ? page.stats : DEFAULT_STATS;

  return (
    <div className="bg-white">
      <SEOHead
        title={page?.seo?.metaTitle || "Our Team | Compass Buyers Agency"}
        description={page?.seo?.metaDescription || "Meet the Compass team. Licensed buyers agents with street-level knowledge across Byron Bay, the Tweed Coast and Southern Gold Coast."}
        ogImage={page?.seo?.ogImage ? urlFor(page.seo.ogImage).width(1200).url() : undefined}
        canonicalPath="/about"
      />
      {/* AboutPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About Compass Buyers Agency",
            url: "https://compassagency.com.au/about",
            description: "Licensed buyers agents based on the Tweed Coast. Local knowledge, buyer-only representation, and a team that handles every step from search to settlement.",
            mainEntity: {
              "@type": "RealEstateAgent",
              name: "Compass Buyers Agency",
              url: "https://compassagency.com.au",
              telephone: "+61467634565",
              email: "hello@compassbuyersagency.com.au",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Cabarita Beach",
                addressLocality: "Cabarita Beach",
                addressRegion: "NSW",
                postalCode: "2488",
                addressCountry: "AU",
              },
              areaServed: [
                { "@type": "City", name: "Byron Bay" },
                { "@type": "City", name: "Gold Coast" },
                { "@type": "City", name: "Tweed Heads" },
                { "@type": "AdministrativeArea", name: "Northern Rivers" },
              ],
            },
          }),
        }}
      />

      {/* ── Section 0: Page Header ── bg-warm-gradient ─────────────────────── */}
      <section className="bg-warm-gradient page-header">
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">About Compass</p>
              <h1>
                {page?.heading || "Your Team on the Tweed Coast"}
              </h1>
              <p className="text-balance">
                {page?.subtitle || "Licensed buyers agents who live where you're looking. Local streets, local agents, local knowledge, all working for you."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 1: FeatureSplit 1 ── bg-sand-wash (image right) ───────── */}
      <FeatureSplit
        eyebrow="Local Knowledge"
        title={page?.featureSplit1?.title || "What Local Actually Means"}
        description={page?.featureSplit1?.description || "Your expert buying team with over 80 years combined experience. Every property is inspected in person, selling agents are consulted daily and weekly, and you get the micro-pocket, street-level insights most buyers never see.\n\n\u2022 74% of deals come from off-market or pre-market channels\n\u2022 Coverage across Tweed Shire, Gold Coast, Byron and Ballina\n\u2022 Deep relationships with hundreds of local agents, with access to top tier local professional services"}
        image={page?.featureSplit1?.image ? urlFor(page.featureSplit1.image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/1a4591edc_CONTENTSHOOTJULY-31.jpg"}
        imageAlt={page?.featureSplit1?.imageAlt || "Compass team meeting clients"}
        imageLeft={false}
        mobileImageFirst={true}
        variant="sand"
      />

      {/* ── Section 3: FeatureSplit 2 ── bg-white (image left) ────────────── */}
      <FeatureSplit
        eyebrow="Your Advantage"
        title={page?.featureSplit2?.title || "Buyers Only. No Exceptions."}
        description={page?.featureSplit2?.description || "You get a team that only represents buyers. No selling. No conflicts. That changes the advice you receive and the outcomes you achieve.\n\n\u2022 Independent advice with zero ties to selling agents or developers\n\u2022 One team from first call to settlement, no hand-offs between departments\n\u2022 You always know where things stand, no chasing for updates"}
        image={page?.featureSplit2?.image ? urlFor(page.featureSplit2.image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/6c2c9c4ac_CONTENTSHOOTJULY-30.jpg"}
        imageAlt={page?.featureSplit2?.imageAlt || "Compass team at office"}
        imageLeft={true}
        variant="white"
        ctaLabel="Start a Conversation"
        ctaHref={createPageUrl("Contact")}
      />

      {/* ── Section 4: Stats / Trust Band ── bg-editorial-dark ────────────── */}
      <section className="bg-editorial-dark" style={{ padding: "var(--section-padding) 0" }}>
        <div className="site-container">
          <ScrollReveal animation="fade-up">
            <dl
              className="grid grid-cols-2 lg:grid-cols-4 text-center"
              style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              <StaggerGroup stagger={100}>
                {stats.map((stat, i) => (
                  <ScrollReveal key={i} as="div" animation="scale-subtle">
                    <dt
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 400,
                        color: "#fff",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {stat.value}
                    </dt>
                    <dd
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.8125rem",
                        fontWeight: "var(--font-body-regular)",
                        color: "rgba(255,255,255,0.55)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        marginTop: "0.5rem",
                        marginLeft: 0,
                      }}
                    >
                      {stat.label}
                    </dd>
                  </ScrollReveal>
                ))}
              </StaggerGroup>
            </dl>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 5: Team Grid ── bg-sand-wash ──────────────────────────── */}
      <section className="bg-sand-wash" style={{ padding: "var(--section-padding) 0" }}>
        <div className="site-container">

          {/* Section header */}
          <ScrollReveal animation="fade-up">
            <div className="text-center" style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
              <p className="eyebrow-label">The Team</p>
              <h2>
                {page?.teamSectionHeading || "Who you'll work with"}
              </h2>
              <p className="text-balance" style={{ maxWidth: "36rem", margin: "0 auto" }}>
                Every conversation, inspection and negotiation is handled by the people you see here. No hand-offs, no call centres.
              </p>
            </div>
          </ScrollReveal>

          {/* Team cards */}
          {isLoading ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)", maxWidth: "64rem", margin: "0 auto" }}
              aria-busy="true"
              aria-label="Loading team members"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="team-card animate-pulse">
                  <div className="aspect-[4/5] bg-[var(--bright-grey)]" />
                  <div className="team-card__body">
                    <div className="h-0.5 w-8 bg-[var(--bright-grey)] rounded-full mb-3" />
                    <div className="h-5 bg-[var(--bright-grey)] rounded w-2/3 mb-1" />
                    <div className="h-3.5 bg-[var(--bright-grey)] rounded w-1/2 mb-3" />
                    <div className="h-3 bg-[var(--bright-grey)] rounded w-full mb-1.5" />
                    <div className="h-3 bg-[var(--bright-grey)] rounded w-5/6 mb-1.5" />
                    <div className="h-3 bg-[var(--bright-grey)] rounded w-4/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)", maxWidth: "64rem", margin: "0 auto" }}
            >
              <StaggerGroup stagger={120}>
                {teamMembers.map((m) => (
                    <ScrollReveal key={m.id} animation="scale-subtle" duration={600}>
                      <Link to={`/team/${m.slug}`} className="block h-full">
                        <article className="team-card">
                          {/* Portrait photo */}
                          <div className="team-card__image">
                            <img
                              src={
                                m.photo?.asset
                                  ? urlFor(m.photo).width(800).height(1000).fit("crop").url()
                                  : typeof m.photo === "string"
                                    ? m.photo
                                    : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"
                              }
                              alt={m.name}
                              loading="lazy"
                            />
                          </div>

                          {/* Card body */}
                          <div className="team-card__body">
                            {/* Decorative bar */}
                            <div
                              style={{
                                width: "2rem",
                                height: "2px",
                                borderRadius: "999px",
                                background: "var(--hills)",
                                opacity: 0.5,
                                marginBottom: "0.75rem",
                              }}
                            />

                            {/* Name */}
                            <h3
                              style={{
                                fontFamily: "var(--font-heading)",
                                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                                fontWeight: 400,
                                letterSpacing: "-0.01em",
                                color: "var(--ink)",
                                lineHeight: 1.2,
                                marginBottom: "0.125rem",
                              }}
                            >
                              {m.name}
                            </h3>

                            {/* Position */}
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "0.875rem",
                                fontWeight: "var(--font-body-light)",
                                color: "var(--stone)",
                                marginBottom: "0.75rem",
                                lineHeight: 1.4,
                              }}
                            >
                              {m.position}
                            </p>

                            {/* Bio excerpt -- 3-line clamp, no expand toggle */}
                            {m.bio && (
                              <p
                                className="line-clamp-3"
                                style={{
                                  fontFamily: "var(--font-body)",
                                  fontSize: "0.9375rem",
                                  fontWeight: "var(--font-body-light)",
                                  color: "var(--stone)",
                                  lineHeight: 1.65,
                                  marginBottom: 0,
                                }}
                              >
                                {m.bio}
                              </p>
                            )}

                            {/* Specialty badges (max 3) */}
                            {Array.isArray(m.specialties) && m.specialties.length > 0 && (
                              <div
                                style={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "0.375rem",
                                  marginTop: "0.75rem",
                                }}
                              >
                                {m.specialties.slice(0, 3).map((s, idx) => (
                                  <span
                                    key={idx}
                                    style={{
                                      fontSize: "0.6875rem",
                                      padding: "0.25rem 0.625rem",
                                      borderRadius: "var(--radius-badge)",
                                      border: "1px solid var(--bright-grey)",
                                      color: "var(--stone)",
                                      fontWeight: "var(--font-body-regular)",
                                    }}
                                  >
                                    {s}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* View Full Profile link */}
                            <span
                              className="segment-card-link"
                              style={{
                                fontFamily: "var(--font-body)",
                                fontWeight: 500,
                                fontSize: "0.8125rem",
                                color: "var(--hills)",
                                marginTop: "0.875rem",
                                display: "inline-block",
                              }}
                            >
                              View Full Profile &rarr;
                            </span>
                          </div>
                        </article>
                      </Link>
                    </ScrollReveal>
                  ))}
              </StaggerGroup>
            </div>
          ) : (
            <div className="text-center" style={{ color: "var(--stone)" }}>
              No team members yet. Add team profiles in the CMS to display them here.
            </div>
          )}
        </div>
      </section>

      {/* ── Section 6: CTA ── bg-editorial-dark ───────────────────────────── */}
      <CTASection
        heading={page?.cta?.heading || "Have questions? Start a conversation."}
        buttonText={page?.cta?.buttonText || "Start a Conversation"}
        buttonHref={createPageUrl("Contact")}
        supportingText="No sales pitch. Just honest advice from people who know these markets inside out."
        variant="dark"
      />
    </div>
  );
}
