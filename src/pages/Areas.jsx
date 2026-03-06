import React from "react";
import AreasHero from "@/components/regions/AreasHero";
import ShireFeature from "@/components/regions/ShireFeature";
import RegionLinksGrid from "@/components/regions/RegionLinksGrid";
import CTASection from "@/components/shared/CTASection.jsx";
import SectionHeader from "@/components/shared/SectionHeader";
import ImageBand from "@/components/shared/ImageBand";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { createPageUrl } from "@/utils";
import { fetchPage, urlFor } from "@/lib/sanityClient";
import SEOHead from "../components/shared/SEOHead";

/* ── Fallback shire data ──────────────────────────────────────────────── */
const fallbackShires = [
  {
    title: "Byron Shire",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
    description:
      "From the world-famous lighthouse to the creative heart of Bangalow, Byron Shire offers a unique blend of coastal luxury and hinterland charm.",
    suburbs: [
      { name: "Byron Bay", isLive: true, slug: "byron-bay-market-update" },
      { name: "Bangalow", isLive: false },
      { name: "Brunswick Heads", isLive: true, slug: "brunswick-heads-profile" },
      { name: "Mullumbimby", isLive: false },
      { name: "Suffolk Park", isLive: false },
      { name: "Ocean Shores", isLive: false },
    ],
  },  {
    title: "Tweed Shire",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1974&auto=format&fit=crop",
    description:
      "Stretching from the Gold Coast border south to Murwillumbah, Tweed Shire combines beachside living with lush hinterland valleys.",
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
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop",
    description:
      "Home to Lennox Head and the Richmond River, Ballina Shire offers strong growth suburbs with a relaxed, family-friendly feel.",
    suburbs: [
      { name: "Ballina", isLive: false },
      { name: "Lennox Head", isLive: false },
      { name: "Alstonville", isLive: false },
      { name: "Wollongbar", isLive: false },
      { name: "Cumbalum", isLive: false },
      { name: "Skennars Head", isLive: false },
    ],
  },  {
    title: "City of Gold Coast",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1974&auto=format&fit=crop",
    description:
      "The southern Gold Coast blends surf culture with emerging lifestyle suburbs. Strong demand from interstate buyers and investors.",
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

/* ── Shire layout config ──────────────────────────────────────────────── */
const shireLayout = [
  { imageLeft: false, bg: "bg-white" },   // Byron
  { imageLeft: true, bg: "bg-sand-wash" }, // Tweed
  { imageLeft: false, bg: "bg-white" },   // Ballina
  { imageLeft: true, bg: "bg-sand-wash" }, // Gold Coast
];
export default function Areas() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("areasPage").then(setPage).catch(() => {});
  }, []);

  /* Build image fallback map from hardcoded data */
  const fallbackImageMap = Object.fromEntries(
    fallbackShires.map((s) => [s.title, s.image])
  );
  const fallbackDescriptionMap = Object.fromEntries(
    fallbackShires.map((s) => [s.title, s.description])
  );

  /* Map Sanity data into component-ready shape, with fallbacks */
  const shires = page?.shires?.length
    ? page.shires.map((s) => ({
        title: s.title,
        description: s.description || fallbackDescriptionMap[s.title] || undefined,
        image: s.image
          ? urlFor(s.image).width(1200).url()
          : fallbackImageMap[s.title] || undefined,
        suburbs: (s.suburbs || []).map((sub) => ({
          name: sub.name,
          isLive: sub.isLive || false,
          slug: sub.slug || undefined,
          landingPageSlug: sub.landingPageSlug || undefined,
        })),
      }))
    : fallbackShires;
  /* Split shires into first pair and second pair for image band placement */
  const firstPair = shires.slice(0, 2);
  const secondPair = shires.slice(2, 4);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={page?.seo?.metaTitle || "Areas We Cover | Compass Buyers Agency"}
        description={page?.seo?.metaDescription || "Buyers agent services across Byron Shire, Ballina Shire, Tweed Shire and the Gold Coast. Local knowledge from agents who live here."}
        ogImage={page?.seo?.ogImage ? urlFor(page.seo.ogImage).width(1200).url() : undefined}
        canonicalPath="/areas"
      />

      {/* Section 1: Hero */}
      <AreasHero
        heading={page?.heading || "The Northern Rivers and Beyond"}
        subtitle={
          page?.subtitle ||
          "Four shires, dozens of suburbs, one focus: finding you the right property at the right price."
        }
        image={
          page?.heroImage
            ? urlFor(page.heroImage).width(1920).url()
            : undefined
        }
      />

      {/* Section 2: Region intro */}
      <section
        className="bg-white"
        style={{ padding: "var(--section-standard) 0" }}
      >
        <div className="site-container">
          <ScrollReveal>
            <SectionHeader
              eyebrow="Our Region"
              heading="From the Hinterland to the Coast"
              subtitle="The Northern Rivers stretches from the Gold Coast border through Byron Bay and south to Ballina. Each shire has its own character, its own market, and its own opportunities."
              align="center"
              divider={true}
            />
          </ScrollReveal>
        </div>
      </section>
      {/* Sections 3-4: First pair of shires (Byron + Tweed) */}
      {firstPair.map((shire, i) => (
        <ShireFeature
          key={shire.title}
          title={shire.title}
          description={shire.description}
          image={shire.image}
          imageAlt={shire.title}
          suburbs={shire.suburbs}
          imageLeft={shireLayout[i]?.imageLeft ?? false}
          bg={shireLayout[i]?.bg ?? "bg-white"}
          index={i}
        />
      ))}

      {/* Section 5: Image band -- atmospheric breathing room */}
      <ImageBand
        src={
          page?.midBandImage
            ? urlFor(page.midBandImage).width(2000).url()
            : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        }
        alt="Northern Rivers hinterland landscape"
        height="340px"
        mobileHeight="200px"
        overlay
        parallax
      />

      {/* Sections 6-7: Second pair of shires (Ballina + Gold Coast) */}
      {secondPair.map((shire, i) => (
        <ShireFeature
          key={shire.title}
          title={shire.title}
          description={shire.description}
          image={shire.image}
          imageAlt={shire.title}
          suburbs={shire.suburbs}
          imageLeft={shireLayout[i + 2]?.imageLeft ?? false}
          bg={shireLayout[i + 2]?.bg ?? "bg-white"}
          index={i + 2}
        />
      ))}
      {/* Section 8: Landing pages grid */}
      <RegionLinksGrid />

      {/* Section 9: CTA */}
      <CTASection
        heading={
          page?.cta?.heading ||
          "Looking to buy in the Northern Rivers or Gold Coast?"
        }
        buttonText={page?.cta?.buttonText || "Start a Conversation"}
        buttonHref={createPageUrl("Contact")}
        supportingText="Free consultation. No obligation. Honest advice on your situation."
        variant="dark"
      />
    </div>
  );
}