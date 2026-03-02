import React, { useState, useEffect } from "react";
import { fetchTeamMembers, fetchPage, urlFor } from "@/lib/sanityClient";
import { Mail } from "lucide-react";
import { createPageUrl } from "@/utils";
import CTASection from "../components/shared/CTASection.jsx";
import FeatureSplit from "../components/about/FeatureSplit";
import ImageBand from "../components/shared/ImageBand";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

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

  return (
    <div className="bg-white">
      {/* Page header */}
      <section className="bg-white" style={{ padding: "var(--section-standard) 0 var(--section-compact) 0" }}>
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">About Compass</p>
              <h1>
                {page?.heading || "The People Behind Compass"}
              </h1>
              <p className="intro-text mx-auto">
                {page?.subtitle || "Licensed buyers agents based on the Tweed Coast. We know these streets, these agents, and these markets because we live here."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature split 1 — white bg */}
      <FeatureSplit
        eyebrow="Local Knowledge"
        title={page?.featureSplit1?.title || "What Local Actually Means"}
        description={page?.featureSplit1?.description || "We're based in Cabarita Beach. We inspect properties in person, talk to selling agents weekly, and know which streets flood and which don't.\n\n\u2022 42% of our deals come from off-market or pre-market channels\n\u2022 Street-level knowledge across Byron, Ballina, Tweed and the southern Gold Coast\n\u2022 Established relationships with local agents, solicitors and building inspectors"}
        image={page?.featureSplit1?.image ? urlFor(page.featureSplit1.image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/1a4591edc_CONTENTSHOOTJULY-31.jpg"}
        imageAlt={page?.featureSplit1?.imageAlt || "Compass team meeting clients"}
        imageLeft={false}
        mobileImageFirst={true}
        variant="white"
      />

      {/* Atmospheric image band */}
      <ImageBand
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Aerial view of Northern Rivers coastline"
        height="260px"
        overlay
      />

      {/* Feature split 2 — cream bg for contrast */}
      <FeatureSplit
        eyebrow="Our Approach"
        title={page?.featureSplit2?.title || "Buyers Only. No Exceptions."}
        description={page?.featureSplit2?.description || "We only represent buyers. No selling. No conflicts. That changes the advice you get and the outcomes you get.\n\n\u2022 Independent advice with zero ties to selling agents or developers\n\u2022 One team from first call to settlement, not a hand-off between departments\n\u2022 You'll always know where things stand, no chasing for updates"}
        image={page?.featureSplit2?.image ? urlFor(page.featureSplit2.image).width(800).url() : "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/6c2c9c4ac_CONTENTSHOOTJULY-30.jpg"}
        imageAlt={page?.featureSplit2?.imageAlt || "Compass team at office"}
        imageLeft={true}
        variant="cream"
        ctaLabel="Get in touch"
        ctaHref={createPageUrl("Contact")}
      />

      {/* Team section — editorial portrait cards */}
      <section className="bg-warm-gradient" style={{ padding: "var(--section-breathing-lg) 0" }}>
        <div className="site-container">
          <ScrollReveal className="text-center mb-12 md:mb-16">
            <p className="eyebrow-label">The Team</p>
            <h2>
              {page?.teamSectionHeading || "Who you'll work with"}
            </h2>
            <p className="intro-text mx-auto">
              Every conversation, inspection and negotiation is handled by the people you see here. No hand-offs, no call centres.
            </p>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] rounded-lg bg-[var(--bright-grey)]" />
                  <div className="pt-5">
                    <div className="h-0.5 w-8 bg-[var(--bright-grey)] rounded-full mb-3" />
                    <div className="h-5 bg-[var(--bright-grey)] rounded w-2/3 mb-2" />
                    <div className="h-4 bg-[var(--bright-grey)] rounded w-1/2 mb-4" />
                    <div className="h-3 bg-[var(--bright-grey)] rounded w-full mb-1.5" />
                    <div className="h-3 bg-[var(--bright-grey)] rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              <StaggerGroup stagger={120}>
              {teamMembers.map((m) => (
                <ScrollReveal key={m.id}>
                <div className="group flex flex-col h-full">
                  {/* Portrait photo */}
                  <div className="relative overflow-hidden aspect-[4/5] rounded-lg ring-1 ring-black/[0.04]">
                    <img
                      src={m.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                  </div>

                  <div className="pt-5 flex-1 flex flex-col">
                    <div className="h-0.5 w-8 rounded-full bg-[var(--hills)]/60 mb-3" />

                    <div
                      className="text-[var(--ink)] leading-tight"
                      style={{ fontFamily: "var(--font-heading)", fontSize: "1.375rem", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "2px" }}
                    >
                      {m.name}
                    </div>

                    <div style={{ fontWeight: "var(--font-body-light)", color: "var(--stone)", fontSize: "0.9375rem", marginBottom: "12px" }}>
                      {m.position}
                    </div>

                    {m.bio && (
                      <p
                        className="line-clamp-3 flex-1"
                        style={{ fontWeight: "var(--font-body-light)", color: "var(--stone)", fontSize: "0.9375rem", lineHeight: "1.65", marginBottom: "0" }}
                      >
                        {m.bio}
                      </p>
                    )}

                    {Array.isArray(m.specialties) && m.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {m.specialties.slice(0, 4).map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] px-2.5 py-0.5 rounded-full border border-[var(--border)] text-[var(--stone)]"
                            style={{ fontWeight: "var(--font-body-regular)" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="mt-4 text-sm text-[var(--hills)] hover:underline underline-offset-2 inline-flex items-center gap-1.5"
                        style={{ fontWeight: "var(--font-body-medium)" }}
                      >
                        <Mail className="w-3.5 h-3.5" /> Get in touch
                      </a>
                    )}
                  </div>
                </div>
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

      {/* Coastal image band — rhythm break before CTA */}
      <ImageBand
        src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2000&auto=format&fit=crop"
        alt="Ocean waves at golden hour"
        height="200px"
        overlay
      />

      {/* CTA — warm variant */}
      <CTASection
        heading={page?.cta?.heading || "Have questions? We're happy to chat."}
        buttonText={page?.cta?.buttonText || "Get in Touch"}
        buttonHref={createPageUrl("Contact")}
        supportingText="No sales pitch. Just honest advice from people who know these markets inside out."
        variant="warm"
      />
    </div>
  );
}
