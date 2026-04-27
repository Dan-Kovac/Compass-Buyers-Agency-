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
    title: "Tweed Coast",
    image: "/images/areas/tweed-shire.jpg",
    stat: "100+ properties acquired",
    description:
      "Our number one focus. Kingscliff to Pottsville along the coast, through Banora Point, Terranora and Bilambil in the hinterland, then inland to Murwillumbah and the caldera. Medians range from $1.4M in Pottsville to $2.1M in Casuarina. Stock sits 36% below five-year averages.",
    suburbs: [
      { name: "Kingscliff", isLive: true, slug: "kingscliff-suburb-report-q1-2026" },
      { name: "Cabarita Beach", isLive: false },
      { name: "Casuarina", isLive: false },
      { name: "Pottsville", isLive: false },
      { name: "Tweed Heads", isLive: false },
      { name: "Banora Point", isLive: false },
      { name: "Terranora", isLive: false },
      { name: "Bilambil", isLive: false },
      { name: "Murwillumbah", isLive: false },
    ],
  },
  {
    title: "Gold Coast",
    image: "/images/areas/gold-coast.jpg",
    description:
      "Coolangatta to Burleigh Heads, covering the southern corridor where 67% of buyers are interstate. Median house prices grew 7.8% year-on-year. We focus on the southern end where lifestyle and value still intersect.",
    suburbs: [
      { name: "Currumbin", isLive: false },
      { name: "Palm Beach", isLive: false },
      { name: "Tallebudgera", isLive: false },
      { name: "Burleigh Heads", isLive: true, slug: "burleigh-heads-suburb-report-q1-2026" },
      { name: "Miami", isLive: false },
      { name: "Mermaid Beach", isLive: false },
    ],
  },
  {
    title: "Byron Shire",
    image: "/images/areas/byron-shire.jpg",
    description:
      "Byron Bay medians sit above $2.4M and 40% of stock moves off-market. Bangalow, Suffolk Park and the hinterland each have distinct pricing and character. We know which streets hold value and which carry risk.",
    suburbs: [
      { name: "Byron Bay", isLive: true, slug: "byron-bay-suburb-report-q1-2026" },
      { name: "Bangalow", isLive: false },
      { name: "Brunswick Heads", isLive: true, slug: "brunswick-heads-profile" },
      { name: "Mullumbimby", isLive: false },
      { name: "Suffolk Park", isLive: false },
      { name: "Ocean Shores", isLive: false },
    ],
  },
  {
    title: "Ballina Shire",
    image: "/images/areas/ballina-shire.jpg",
    description:
      "Lennox Head draws Byron-priced-out families, while Ballina and Cumbalum offer entry points from $850K. Richmond River frontage, strong school catchments and 15 minutes to Byron make this the shire most buyers underestimate.",
    suburbs: [
      { name: "Ballina", isLive: false },
      { name: "Lennox Head", isLive: false },
      { name: "Alstonville", isLive: false },
      { name: "Wollongbar", isLive: false },
      { name: "Cumbalum", isLive: false },
      { name: "Skennars Head", isLive: false },
    ],
  },
];

/* ── Shire layout config ──────────────────────────────────────────────── */
const shireLayout = [
  { imageLeft: false, bg: "bg-white" },    // Tweed Coast
  { imageLeft: true, bg: "bg-sand-wash" }, // Gold Coast
  { imageLeft: false, bg: "bg-white" },    // Byron Shire
  { imageLeft: true, bg: "bg-sand-wash" }, // Ballina Shire
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
  const fallbackStatMap = Object.fromEntries(
    fallbackShires.map((s) => [s.title, s.stat])
  );

  /* Map Sanity data into component-ready shape, with fallbacks */
  const shires = page?.shires?.length
    ? page.shires.map((s) => ({
        title: s.title,
        description: s.description || fallbackDescriptionMap[s.title] || undefined,
        stat: s.stat || fallbackStatMap[s.title] || undefined,
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
        title={page?.seo?.metaTitle || "Areas We Serve | Byron to Gold Coast | Compass"}
        description={page?.seo?.metaDescription || "Buyers agent covering Byron, Ballina, Tweed and Gold Coast shires. 24 suburbs from $850k to $2.95M. Local street-level knowledge."}
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
        style={{ padding: "var(--section-padding) 0" }}
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
          stat={shire.stat}
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
            : "/images/areas/mid-band.jpg"
        }
        alt="Northern Rivers coastline"
        height="340px"
        mobileHeight="200px"
        overlay
        parallax={true}
      />

      {/* Sections 6-7: Second pair of shires (Ballina + Gold Coast) */}
      {secondPair.map((shire, i) => (
        <ShireFeature
          key={shire.title}
          title={shire.title}
          description={shire.description}
          stat={shire.stat}
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