import React from "react";
import ShireOverview from "@/components/regions/ShireOverview";
import CTASection from "@/components/shared/CTASection.jsx";
import ImageBand from "@/components/shared/ImageBand";
import { createPageUrl } from "@/utils";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { fetchPage, urlFor } from "@/lib/sanityClient";

const fallbackShires = [
  {
    title: "Byron Shire",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    suburbs: [
      { name: "Byron Bay", isLive: true, slug: "byron-bay-market-update" },
      { name: "Bangalow", isLive: false },
      { name: "Brunswick Heads", isLive: true, slug: "brunswick-heads-profile" },
      { name: "Mullumbimby", isLive: false },
      { name: "Suffolk Park", isLive: false },
      { name: "Ocean Shores", isLive: false },
    ],
  },
  {
    title: "Tweed Shire",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
    suburbs: [
      { name: "Kingscliff", isLive: false },
      { name: "Cabarita Beach", isLive: false },
      { name: "Casuarina", isLive: false },
      { name: "Pottsville", isLive: false },
      { name: "Tweed Heads", isLive: false },
      { name: "Murwillumbah", isLive: false },
    ],
  },
  {
    title: "Ballina Shire",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
    suburbs: [
      { name: "Ballina", isLive: false },
      { name: "Lennox Head", isLive: false },
      { name: "Alstonville", isLive: false },
      { name: "Wollongbar", isLive: false },
      { name: "Cumbalum", isLive: false },
      { name: "Skennars Head", isLive: false },
    ],
  },
  {
    title: "City of Gold Coast",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1974&auto=format&fit=crop",
    suburbs: [
      { name: "Currumbin", isLive: false },
      { name: "Palm Beach", isLive: false },
      { name: "Tallebudgera", isLive: false },
      { name: "Burleigh Heads", isLive: false },
      { name: "Miami", isLive: false },
      { name: "Mermaid Beach", isLive: false },
    ],
  },
];

export default function Areas() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("areasPage").then(setPage).catch(() => {});
  }, []);

  const fallbackImageMap = Object.fromEntries(
    fallbackShires.map((s) => [s.title, s.image])
  );

  const shires = page?.shires?.length
    ? page.shires.map((s) => ({
        title: s.title,
        image: s.image
          ? urlFor(s.image).width(800).url()
          : fallbackImageMap[s.title] || undefined,
        suburbs: (s.suburbs || []).map((sub) => ({
          name: sub.name,
          isLive: sub.isLive || false,
          slug: sub.slug || undefined,
        })),
      }))
    : fallbackShires;

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial page header */}
      <section
        className="bg-warm-gradient"
        style={{ padding: "var(--section-breathing-lg) 0 var(--section-standard-lg)" }}
      >
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Where We Work</p>
              <h1 className="mb-4">{page?.heading || "Where We Buy"}</h1>
              <p
                className="intro-text mx-auto"
                style={{ maxWidth: "38rem" }}
              >
                {page?.subtitle ||
                  "Four shires, dozens of suburbs, one focus: finding you the right property at the right price. Every market has its own rhythm. Here's how we navigate them."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Shire cards */}
      <section
        className="bg-sand-wash"
        style={{ padding: "var(--section-standard-lg) 0" }}
      >
        <div className="site-container">
          <ShireOverview shires={shires} />
        </div>
      </section>

      {/* Image band */}
      <ImageBand
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Northern Rivers coastal scenery"
        height="280px"
        overlay
      />

      {/* CTA */}
      <CTASection
        heading={page?.cta?.heading || "Looking to buy in one of these areas?"}
        buttonText={page?.cta?.buttonText || "Start a Conversation"}
        buttonHref={createPageUrl("Contact")}
        variant="warm"
      />
    </div>
  );
}
