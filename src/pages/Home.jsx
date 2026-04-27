import React from "react";
import HomeHero from "../components/home/HomeHero";
import TrustBar from "../components/home/TrustBar";
import ServicesAccordionShowcase from "../components/home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import InvestmentAndRelationship from "../components/home/InvestmentAndRelationship";
import Regions from "../components/home/Regions";
import CTASection from "../components/shared/CTASection.jsx";
import HomeFAQ from "../components/home/HomeFAQ";
import TestimonialSection from "../components/shared/TestimonialSection";
import ImageBand from "../components/shared/ImageBand";
import SEOHead from "../components/shared/SEOHead";
import { createPageUrl } from "@/utils";
import { fetchPage, urlFor } from "@/lib/sanityClient";

export default function Home() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("homePage").then(setPage).catch(() => {});
  }, []);

  return (
    <div>
      <SEOHead
        title={page?.seo?.metaTitle || "Buyers Agent Byron Bay to Gold Coast | Compass"}
        description={page?.seo?.metaDescription || "Byron Bay to Gold Coast buyers agent. $2.45M median Byron, $1.65M Tweed. 42% of our deals are off-market. We find, assess, negotiate."}
        ogImage={page?.seo?.ogImage ? urlFor(page.seo.ogImage).width(1200).url() : undefined}
        canonicalPath="/"
      />
      {/* 1. Hero — dark video overlay, full bleed */}
      <HomeHero
        title={page?.hero?.title}
        subtitle={page?.hero?.subtitle}
        ctaText={page?.hero?.ctaText}
        backgroundVideoUrl={page?.hero?.backgroundVideoUrl || "/videos/COMPASS-WEBSITE-BANNER-CLEAN.mp4"}
        backgroundImageUrl={page?.hero?.backgroundImage ? urlFor(page.hero.backgroundImage).width(1920).url() : undefined}
      />

      {/* 2. Trust stats bar — social proof */}
      <TrustBar />

      {/* 3. Services accordion — dark editorial */}
      <ServicesAccordionShowcase
        heading={page?.servicesAccordion?.heading}
        teamImageUrl={page?.servicesAccordion?.teamImage ? urlFor(page.servicesAccordion.teamImage).width(800).url() : undefined}
        items={page?.servicesAccordion?.items}
      />

      {/* 4. Atmospheric parallax band — hinterland landscape */}
      <ImageBand
        src="/images/home/hinterland-morning.jpg"
        alt="Northern Rivers hinterland at dawn"
        height="380px"
        mobileHeight="240px"
        parallax={true}
        overlay
      />

      {/* 5. Featured acquisitions — bright grey bg */}
      <RecentAcquisitionsStrip
        eyebrow={page?.acquisitionsStrip?.eyebrow}
        title={page?.acquisitionsStrip?.heading}
        description={page?.acquisitionsStrip?.subheading}
      />

      {/* 6. Video Testimonials — social proof */}
      <TestimonialSection />

      {/* 7. Working with us — sand-wash bg, asymmetric split */}
      <InvestmentAndRelationship
        heading={page?.relationship?.heading}
        body={page?.relationship?.body}
        imageUrl={page?.relationship?.image ? urlFor(page.relationship.image).width(800).url() : undefined}
        checklist={page?.relationship?.checklistItems}
      />

      {/* 8. Regions — white bg with destination cards */}
      <Regions
        heading={page?.regions?.heading}
        subtitle={page?.regions?.subtitle}
        ctaText={page?.regions?.ctaText}
        items={page?.regions?.items?.map(it => ({
          label: it.label,
          imageUrl: it.image ? urlFor(it.image).width(1200).url() : undefined,
        }))}
      />

      {/* 9. FAQ — bright grey bg */}
      <HomeFAQ
        heading={page?.faq?.heading}
        faqItems={page?.faq?.items}
      />

      {/* 10. CTA — compact dark close */}
      <CTASection
        heading={page?.contactStrip?.heading || "Let's find your property"}
        buttonText={page?.contactStrip?.primaryButtonLabel || "Start a Conversation"}
        buttonHref={createPageUrl("Contact")}
        variant="dark"
      />

      {/* Organization + LocalBusiness JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Compass Buyers Agency",
        "@id": "https://compassagency.com.au",
        url: "https://compassagency.com.au",
        logo: "https://compassagency.com.au/logo.png",
        image: "https://compassagency.com.au/og-image.png",
        description: "Independent buyers agent for Northern Rivers and Southern Gold Coast. Off-market access, local expertise, sharp negotiation.",
        telephone: "+61467634565",
        email: "hello@compassbuyersagency.com.au",
        areaServed: [
          { "@type": "City", name: "Byron Bay" },
          { "@type": "City", name: "Gold Coast" },
          { "@type": "City", name: "Tweed Heads" },
          { "@type": "AdministrativeArea", name: "Northern Rivers" }
        ],
        serviceType: "Buyers Agent",
        priceRange: "$$",
        sameAs: [
          "https://www.instagram.com/compassbuyersagency/",
          "https://www.facebook.com/compassbuyersagency/"
        ]
      }) }} />
    </div>
  );
}
