/**
 * Convert a PascalCase (or camelCase) string to kebab-case.
 * Handles runs of uppercase like "HTMLParser" → "html-parser".
 *
 * Examples:
 *   "ByronBayBuyersAgent"  → "byron-bay-buyers-agent"
 *   "WhoWeWorkWith"        → "who-we-work-with"
 *   "Home"                 → "home"
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")   // camelCase boundary
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1-$2") // acronym boundary (e.g. HTMLParser)
    .toLowerCase();
}

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
  AcquisitionDetail: "/acquisitions/:slug",
  BlogPostDetail: "/blog/:slug",
  CaseStudies: "/case-studies",
  CaseStudyDetail: "/case-studies/:slug",
  TeamMemberDetail: "/team/:slug",
  PrivacyPolicy: "/privacy-policy",
  ByronBayBuyersAgent: "/byron-bay-buyers-agent",
  GoldCoastBuyersAgent: "/gold-coast-buyers-agent",
  TweedHeadsBuyersAgent: "/tweed-heads-buyers-agent",
  NorthernRiversBuyersAgent: "/northern-rivers-buyers-agent",
  BrunswickHeadsBuyersAgents: "/brunswick-heads-buyers-agent",
  SouthernGoldCoastBuyersAgents: "/southern-gold-coast-buyers-agent",
  ByronBay: "/byron-bay",
};

/**
 * Old PascalCase-style paths that should redirect to the new kebab-case slugs.
 * Used by App.jsx to register <Navigate> redirect routes.
 */
export const LEGACY_REDIRECTS: Record<string, string> = {
  // Auto-generated: PascalCase → kebab-case redirects (excluding parameterised routes)
  ...Object.fromEntries(
    Object.entries(PAGE_SLUGS)
      .filter(([key, slug]) => {
        const naive = "/" + key.toLowerCase();
        return slug !== "/" && slug !== naive && !slug.includes(":");
      })
      .map(([key, slug]) => ["/" + key, slug])
  ),
  // Old query-param detail pages → listing pages
  "/blog-post-detail": "/blog",
  "/acquisition-detail": "/acquisitions",
  "/case-study-detail": "/case-studies",
};

export function createPageUrl(pageName: string) {
  // Check for query params (e.g., "TeamMemberDetail?id=123")
  const [base, query] = pageName.split("?");
  const slug = PAGE_SLUGS[base];
  if (slug) {
    return query ? `${slug}?${query}` : slug;
  }
  // Fallback: convert PascalCase to kebab-case using the reusable utility
  return (
    "/" + toKebabCase(base) + (query ? `?${query}` : "")
  );
}
