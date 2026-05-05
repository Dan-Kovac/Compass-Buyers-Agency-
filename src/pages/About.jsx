import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchTeamMembers, urlFor } from "@/lib/sanityClient";
import { createPageUrl } from "@/utils";
import CTASection from "../components/shared/CTASection.jsx";
import FeatureSplit from "../components/about/FeatureSplit";

import SEOHead from "../components/shared/SEOHead";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

/* ── Fallback stat data ────────────────────────────────────────────────────── */
const DEFAULT_STATS = [
  { value: "80", label: "Years Team Experience" },
  { value: "$3.6B", label: "In Transactions" },
  { value: "76%", label: "Off-Market Purchases" },
  { value: "#1", label: "Buyers Agency, Byron to Gold Coast" },
];

export default function About() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const members = await fetchTeamMembers();
      const order = ["lee", "aiden", "chris"];
      const sorted = [...(members || [])].sort((a, b) => {
        const ai = order.findIndex((n) => a.name?.toLowerCase().includes(n));
        const bi = order.findIndex((n) => b.name?.toLowerCase().includes(n));
        const aRank = ai === -1 ? 999 : ai;
        const bRank = bi === -1 ? 999 : bi;
        return aRank - bRank;
      });
      setTeamMembers(sorted);
    } catch (error) {
      console.error("Error loading team members:", error);
    }
    setIsLoading(false);
  };

  const stats = DEFAULT_STATS;

  return (
    <div className="bg-white">
      <SEOHead
        title="Our Team | Compass Buyers Agency"
        description="Meet the Compass team. A high-performing, collaborative group of licensed buyers agents with deep local knowledge across the Tweed Coast, Gold Coast and Byron Bay."
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
                Your Local Expert Team, Byron Bay to the Gold Coast
              </h1>
              <p className="text-balance">
                Compass is a high-performing, collaborative team of property professionals. Each agent has intimate knowledge of the local property markets, working to support each other as one team on every client brief.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Section 1: FeatureSplit 1 ── bg-sand-wash (image right) ───────── */}
      <FeatureSplit
        eyebrow="What Local Expertise Means"
        title="Eighty years of property experience, all walking the same streets"
        description={"Our team carries more than 80 years of combined personal and professional property experience across the Northern Rivers and the Gold Coast. Every property is inspected in person, by us, before any recommendation. Selling agents are spoken to daily and weekly. That's how you get the micro-pocket, street-level insights most buyers will never see.\n\n\u2022 76% of homes secured through off-market or pre-market channels\n\u2022 On-the-ground experience across the Tweed Shire, Gold Coast, Byron Bay and Ballina regions\n\u2022 Long-standing relationships with hundreds of local selling agents, plus access to top-tier legal, building and planning professionals"}
        image="/images/pages/about.jpg"
        imageAlt="Compass team meeting clients"
        imageLeft={false}
        mobileImageFirst={true}
        variant="sand"
      />

      {/* ── Section 3: FeatureSplit 2 ── bg-white (image left) ────────────── */}
      <FeatureSplit
        eyebrow="Working Exclusively for the Buyer"
        title="Our team represents buyers. No sales, no conflicts."
        description={"Working only on the buyer's side of the table changes the nature of the advice you receive at every stage, and shapes the outcome you ultimately achieve.\n\n\u2022 Independent priority advice grounded in a proven due-diligence process\n\u2022 Our in-house team supports you from brief to settlement, and well beyond\n\u2022 You stay in control at every stage, with a clear, structured acquisition strategy"}
        image="/images/pages/about-team.jpg"
        imageAlt="Compass buyers agents meeting clients"
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
                Who you'll work with
              </h2>
              <p className="text-balance" style={{ maxWidth: "40rem", margin: "0 auto" }}>
                Every conversation, inspection and negotiation is handled by a core team of senior experts at Compass. No hand-offs, no call centres, no faceless agents managing you from afar.
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
                              decoding="async"
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
        heading="Have questions? Start a conversation."
        buttonText="Start a Conversation"
        buttonHref={createPageUrl("Contact")}
        supportingText="No sales pitch. Just honest advice from people who know these markets inside out."
        variant="dark"
      />
    </div>
  );
}
