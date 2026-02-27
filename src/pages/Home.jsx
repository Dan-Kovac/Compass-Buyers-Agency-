import React from "react";
import HomeHero from "../components/home/HomeHero";
import AboutExpertise from "../components/home/AboutExpertise";
import ServicesAccordionShowcase from "../components/home/ServicesAccordionShowcase";
import RecentAcquisitionsStrip from "../components/home/RecentAcquisitionsStrip";
import InvestmentAndRelationship from "../components/home/InvestmentAndRelationship";
import WhyStandOutGrid from "../components/home/WhyStandOutGrid";
import Regions from "../components/home/Regions";
import TestimonialsPlaceholder from "../components/home/TestimonialsPlaceholder";
import CTASection from "../components/shared/CTASection.jsx";
import HomeFAQ from "../components/home/HomeFAQ";
import { createPageUrl } from "@/utils";
import { fetchPage } from "@/lib/sanityClient";

export default function Home() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("homePage").then(setPage).catch(() => {});
  }, []);

  return (
    <div className="overflow-hidden">
      <HomeHero
        title={page?.heroTitle}
        subtitle={page?.heroSubtitle}
        ctaText={page?.heroCtaText}
      />
      <AboutExpertise
        quoteText={page?.expertiseQuoteText}
        authorName={page?.expertiseAuthorName}
        authorRole={page?.expertiseAuthorRole}
        authorAvatarUrl={page?.expertiseAuthorAvatarUrl}
      />
      <ServicesAccordionShowcase
        heading={page?.servicesHeading}
        teamImageUrl={page?.servicesTeamImageUrl}
        teamImageAlt={page?.servicesTeamImageAlt}
        items={page?.servicesItems}
      />
      <RecentAcquisitionsStrip
        eyebrow={page?.acquisitionsEyebrow}
        title={page?.acquisitionsHeading}
        description={page?.acquisitionsSubheading}
      />
      <InvestmentAndRelationship
        heading={page?.relationshipHeading}
        body={page?.relationshipBody}
        imageUrl={page?.relationshipImageUrl}
        imageAlt={page?.relationshipImageAlt}
        checklist={page?.relationshipChecklist?.map(c => c.item)}
      />
      <TestimonialsPlaceholder />
      <Regions
        heading={page?.regionsHeading}
        subtitle={page?.regionsSubtitle}
        ctaText={page?.regionsCtaText}
      />
      <WhyStandOutGrid
        heading={page?.whyHeading}
        cards={page?.whyCards}
      />
      <HomeFAQ
        heading={page?.faqHeading}
        faqItems={page?.faqItems}
      />
      <CTASection
        heading={page?.contactStripHeading || "Take the first step toward your Northern Rivers home with Compass"}
        buttonText={page?.contactStripPrimaryButtonLabel || "Book a Free Consultation"}
        buttonHref={createPageUrl("Contact")}
        showReviewsCarousel={true}
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
        telephone: "+61403536390",
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
