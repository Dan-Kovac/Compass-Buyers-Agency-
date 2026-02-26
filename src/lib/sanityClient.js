import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ─── Client ──────────────────────────────────────────────────────────────────
// projectId and dataset must match sanity/sanity.config.js
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true, // fast cached reads; set false if you need live preview
});

// ─── Image URL builder ───────────────────────────────────────────────────────
const builder = imageUrlBuilder(client);

/**
 * Convert a Sanity image reference into a URL string.
 *
 * Usage:
 *   urlFor(page.hero.backgroundImage).width(1920).url()
 *   urlFor(page.hero.backgroundImage).url()   // original size
 */
export function urlFor(source) {
  return builder.image(source);
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

/**
 * Fetch a singleton page document by its _id.
 * All our page documents have a fixed _id matching their type name
 * (e.g. homePage, aboutPage).
 */
export async function fetchPage(documentId) {
  return client.fetch(`*[_id == $id][0]`, { id: documentId });
}

/**
 * Fetch site-wide settings.
 */
export async function fetchSiteSettings() {
  return client.fetch(`*[_id == "siteSettings"][0]`);
}
