import { useEffect } from "react";

const BASE_URL = "https://compassagency.com.au";
const SITE_NAME = "Compass Buyers Agency";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.png`;

function upsertTag(kind, key, keyAttr, attr, value) {
  const head = document.head;
  const selector = `${kind}[${keyAttr}="${key}"]`;
  let el = head.querySelector(selector);
  if (value == null || value === "") {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement(kind);
    el.setAttribute(keyAttr, key);
    head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export default function SEOHead({
  title,
  description,
  ogImage,
  ogType = "website",
  canonicalPath = "",
  noIndex = false,
}) {
  useEffect(() => {
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    if (title) document.title = title;

    upsertTag("meta", "description", "name", "content", description);
    upsertTag("link", "canonical", "rel", "href", canonicalUrl);
    upsertTag("meta", "robots", "name", "content", noIndex ? "noindex, nofollow" : null);

    upsertTag("meta", "og:type", "property", "content", ogType);
    upsertTag("meta", "og:site_name", "property", "content", SITE_NAME);
    upsertTag("meta", "og:title", "property", "content", title);
    upsertTag("meta", "og:description", "property", "content", description);
    upsertTag("meta", "og:image", "property", "content", image);
    upsertTag("meta", "og:url", "property", "content", canonicalUrl);

    upsertTag("meta", "twitter:card", "name", "content", "summary_large_image");
    upsertTag("meta", "twitter:title", "name", "content", title);
    upsertTag("meta", "twitter:description", "name", "content", description);
    upsertTag("meta", "twitter:image", "name", "content", image);
  }, [title, description, ogImage, ogType, canonicalPath, noIndex]);

  return null;
}
