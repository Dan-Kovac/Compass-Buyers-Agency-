import React, { useState, useEffect } from "react";
import { fetchTeamMembers } from "@/lib/sanityClient";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Mail, Phone, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import CTASection from "../components/shared/CTASection.jsx";
import FeatureSplit from "../components/about/FeatureSplit";
import { fetchPage } from "@/lib/sanityClient";

export default function About() {
  const navigate = useNavigate();
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
      <section className="py-12 bg-white">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center" style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mx-auto">
              {page?.heading || "Our Team"}
            </h1>
            <p className="text-gray-600 text-base md:text-lg">
              {page?.subtitle || "Local property professionals deeply embedded in our community, providing unique access to opportunities others simply can't."}
            </p>
          </div>
        </div>
      </section>

      <FeatureSplit
        title={page?.featureSplit1Title || "Your Local Advantage"}
        description={page?.featureSplit1Description || "As both locals and property professionals deeply embedded in our community, we provide unique access to off-market properties, pre-market and many options not published online."}
        image={page?.featureSplit1ImageUrl || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/1a4591edc_CONTENTSHOOTJULY-31.jpg"}
        imageAlt={page?.featureSplit1ImageAlt || "Compass team meeting clients"}
        imageLeft={false}
        mobileImageFirst={true}
        variant="white"
        mediaKey="about-feature-1"
      />

      <FeatureSplit
        title={page?.featureSplit2Title || "Why Compass Buyers Agency?"}
        description={page?.featureSplit2Description || "We simplify the buying process, cutting through stress and confusion with clarity and support at every step."}
        image={page?.featureSplit2ImageUrl || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/6c2c9c4ac_CONTENTSHOOTJULY-30.jpg"}
        imageAlt={page?.featureSplit2ImageAlt || "Compass team at office"}
        imageLeft={true}
        variant="white"
        ctaLabel="Get in touch"
        ctaHref={createPageUrl("Contact")}
        mediaKey="about-feature-2"
      />

      <section className="py-16 bg-gradient-to-b from-white to-[var(--sea-breeze)]/10">
        <div className="site-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--ink)] mb-2">
              {page?.teamSectionHeading || "Meet Your Property Experts"}
            </h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="surface p-6 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-200" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-full mt-4" />
                  <div className="h-3 bg-gray-200 rounded w-5/6 mt-2" />
                </div>
              ))}
            </div>
          ) : teamMembers && teamMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((m) => (
                <div key={m.id} className="surface p-6 group flex flex-col h-full">
                  <div className="flex-1">
                    <div className="relative rounded-token overflow-hidden aspect-square ring-1 ring-[var(--border)]">
                      {m.intro_video_url ? (
                        (m.intro_video_url.includes("youtube.com") || m.intro_video_url.includes("youtu.be")) ? (
                          <iframe src={m.intro_video_url.replace("watch?v=", "embed/")} title={`${m.name} introduction video`} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
                        ) : (
                          <video src={m.intro_video_url} poster={m.photo || undefined} controls className="w-full h-full object-cover" />
                        )
                      ) : (
                        <img src={m.photo || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop"} alt={m.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" loading="lazy" />
                      )}
                      <div className="absolute inset-0 bg-[var(--hills)] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300" />
                    </div>
                    <div className="mt-3 h-1 w-10 rounded-full bg-[var(--hills)]/70" />
                    <div className="mt-3">
                      <div className="text-lg font-semibold text-[var(--ink)] leading-tight tracking-tight">{m.name}</div>
                      <div className="text-gray-600">{m.position}</div>
                    </div>
                    {Array.isArray(m.specialties) && m.specialties.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {m.specialties.slice(0, 4).map((s, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-[var(--bright-grey)] text-[var(--ink)]">{s}</Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {m.email && <Button asChild variant="outline" className="w-full"><a href={`mailto:${m.email}`} className="w-full inline-flex items-center justify-center gap-2"><Mail className="w-4 h-4" /> Email</a></Button>}
                      {m.phone && <Button asChild variant="outline" className="w-full"><a href={`tel:${m.phone}`} className="w-full inline-flex items-center justify-center gap-2"><Phone className="w-4 h-4" /> Call</a></Button>}
                    </div>
                    <div className="mt-4">
                      <a href={createPageUrl(`TeamMemberDetail?id=${m.id}`)}><Button variant="outline" className="w-full">View Full Profile</Button></a>
                    </div>
                    {m.bio && (
                      <Collapsible className="mt-4">
                        <CollapsibleTrigger asChild>
                          <Button variant="link" className="px-0 text-[var(--hills)] hover:opacity-80 inline-flex items-center gap-1 group">
                            Read bio <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent><p className="text-gray-700 mt-3 leading-relaxed">{m.bio}</p></CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">No team members yet. Add team profiles in the CMS to display them here.</div>
          )}
        </div>
      </section>

      <CTASection
        heading={page?.ctaHeading || "Ready to Start Your Property Journey?"}
        buttonText={page?.ctaButtonText || "Contact Our Team"}
        onButtonClick={() => navigate(createPageUrl("Contact"))}
        supportingText="We're here to help you find and secure the right property."
      />
    </div>
  );
}
