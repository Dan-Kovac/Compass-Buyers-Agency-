import { Helmet } from "react-helmet-async";

const BASE_URL = "https://compassagency.com.au";
const SITE_NAME = "Compass Buyers Agency";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEOHead — reusable component for page-level meta tags.
 *
 * Props:
 *   title        – Page title (appears in browser tab)
 *   description  – Meta description (search snippets, OG/Twitter)
 *   ogImage      – Open Graph image URL (absolute)
 *   ogType       – OG type, defaults to "website"
 *   canonicalPath – Path portion of the canonical URL (e.g. "/about")
 *   noIndex      – If true, adds noindex directive
 */
export default function SEOHead({
  title,
  description,
  ogImage,
  ogType = "website",
  canonicalPath = "",
  noIndex = false,
}) {
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
