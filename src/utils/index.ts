/**
 * Page name → URL slug mapping
 * Used by both createPageUrl (for links) and App.jsx (for routes)
 */
export const PAGE_SLUGS: Record<string, string> = {
  Home: "/",
  About: "/about",
  Services: "/services",
  Contact: "/contact",
  Areas: "/areas",
  WhoWeWorkWith: "/who-we-work-with",
  Blog: "/blog",
  Acquisitions: "/acquisitions",
  AcquisitionDetail: "/acquisition-detail",
  BlogPostDetail: "/blog-post-detail",
  CaseStudies: "/case-studies",
  CaseStudyDetail: "/case-study-detail",
  TeamMemberDetail: "/team-member-detail",
  PrivacyPolicy: "/privacy-policy",
  ByronBayBuyersAgent: "/byron-bay-buyers-agent",
  GoldCoastBuyersAgent: "/gold-coast-buyers-agent",
  TweedHeadsBuyersAgent: "/tweed-heads-buyers-agent",
  NorthernRiversBuyersAgent: "/northern-rivers-buyers-agent",
  BrunswickHeadsBuyersAgents: "/brunswick-heads-buyers-agents",
  SouthernGoldCoastBuyersAgents: "/southern-gold-coast-buyers-agents",
  ByronBay: "/byron-bay",
};

export function createPageUrl(pageName: string) {
  // Check for query params (e.g., "TeamMemberDetail?id=123")
  const [base, query] = pageName.split("?");
  const slug = PAGE_SLUGS[base];
  if (slug) {
    return query ? `${slug}?${query}` : slug;
  }
  // Fallback: convert PascalCase to kebab-case
  return (
    "/" +
    base
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase() +
    (query ? `?${query}` : "")
  );
}
