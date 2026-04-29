import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ─── Client ──────────────────────────────────────────────────────────────────
// projectId and dataset must match sanity/sanity.config.js
export const client = createClient({
  projectId: (import.meta.env.VITE_SANITY_PROJECT_ID || '31tdhl52').trim(),
  dataset: (import.meta.env.VITE_SANITY_DATASET || 'production').trim(),
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

/**
 * Resolve an image field that may be a Sanity image object OR a legacy URL string.
 * Returns a URL string or null.
 *
 * Usage:
 *   resolveImageUrl(item.main_image, item.main_image_url, { width: 800 })
 *   resolveImageUrl(member.photo)
 */
export function resolveImageUrl(imageOrUrl, legacyUrl, { width, height, fit } = {}) {
  // Prefer native Sanity image object
  if (imageOrUrl?.asset) {
    let b = urlFor(imageOrUrl);
    if (width) b = b.width(width);
    if (height) b = b.height(height);
    if (fit) b = b.fit(fit);
    return b.url();
  }
  // Fall back to legacy URL string (old data or URL field)
  if (typeof imageOrUrl === 'string' && imageOrUrl) return imageOrUrl;
  if (typeof legacyUrl === 'string' && legacyUrl) return legacyUrl;
  return null;
}

// ─── Fetch helpers ───────────────────────────────────────────────────────────

// ─── Blog Posts ───────────────────────────────────────────────────────────────

const BLOG_POST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  status,
  category,
  tags,
  author,
  image,
  featured_image,
  excerpt,
  content,
  published_date,
  featured,
  meta_title,
  meta_description,
  gallery,
  gallery_images
`;

/** Lightweight projection for listing pages — excludes heavy content/gallery fields */
const BLOG_POST_LIST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  status,
  category,
  tags,
  author,
  image,
  featured_image,
  excerpt,
  published_date,
  featured,
  meta_title,
  meta_description
`;

export async function fetchBlogPosts({ status = 'published', category, featured } = {}) {
  let filter = `_type == "blogPost" && status == $status`;
  const params = { status };
  if (category) { filter += ` && category == $category`; params.category = category; }
  if (featured !== undefined) { filter += ` && featured == $featured`; params.featured = featured; }
  return client.fetch(`*[${filter}] | order(published_date desc) { ${BLOG_POST_LIST_FIELDS} }`, params);
}

export async function fetchBlogPost(id) {
  return client.fetch(
    `*[_type == "blogPost" && (_id == $id || slug.current == $id)][0] { ${BLOG_POST_FIELDS} }`,
    { id }
  );
}

// ─── Acquisitions ─────────────────────────────────────────────────────────────

const ACQUISITION_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  status,
  suburb,
  state,
  lga,
  property_type,
  beds,
  baths,
  cars,
  land_size,
  land_size_unit,
  purchase_price,
  price_display,
  price_confidential,
  purchase_date,
  agent,
  market_visibility,
  timeframe,
  excerpt,
  main_image,
  main_image_url,
  agent_photo,
  agent_image,
  realestate_link,
  tags,
  featured
`;

export async function fetchAcquisitions({ status = 'published', featured } = {}) {
  let filter = `_type == "acquisition" && status == $status`;
  const params = { status };
  if (featured !== undefined) { filter += ` && featured == $featured`; params.featured = featured; }
  return client.fetch(`*[${filter}] | order(purchase_date desc) { ${ACQUISITION_FIELDS} }`, params);
}

export async function fetchAcquisition(id) {
  return client.fetch(
    `*[_type == "acquisition" && (_id == $id || slug.current == $id)][0] { ${ACQUISITION_FIELDS} }`,
    { id }
  );
}

// ─── Team Members ─────────────────────────────────────────────────────────────

const TEAM_MEMBER_FIELDS = `
  "id": _id,
  name,
  "slug": slug.current,
  position,
  bio,
  photo,
  email,
  phone,
  credentials,
  specialties,
  linkedin_url,
  intro_video_url,
  order,
  active
`;

export async function fetchTeamMembers({ activeOnly = true } = {}) {
  const filter = activeOnly
    ? `_type == "teamMember" && active == true`
    : `_type == "teamMember"`;
  return client.fetch(`*[${filter}] | order(order asc) { ${TEAM_MEMBER_FIELDS} }`);
}

export async function fetchTeamMember(idOrSlug) {
  return client.fetch(
    `*[_type == "teamMember" && (_id == $id || slug.current == $id)][0] { ${TEAM_MEMBER_FIELDS} }`,
    { id: idOrSlug }
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function fetchTestimonials({ status = 'published' } = {}) {
  return client.fetch(
    `*[_type == "testimonial" && status == $status] { "id": _id, name, location, quote, photo_url, rating, status }`,
    { status }
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

const CASE_STUDY_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  status,
  property_type,
  location,
  client_type,
  purchase_price,
  timeframe,
  excerpt,
  content,
  image,
  featured_image,
  client_name,
  client_testimonial,
  challenges_overcome,
  results_achieved,
  gallery,
  property_images,
  featured,
  published_date,
  meta_title,
  meta_description
`;

export async function fetchCaseStudies({ status = 'published', featured } = {}) {
  let filter = `_type == "caseStudy" && status == $status`;
  const params = { status };
  if (featured !== undefined) { filter += ` && featured == $featured`; params.featured = featured; }
  return client.fetch(`*[${filter}] | order(published_date desc) { ${CASE_STUDY_FIELDS} }`, params);
}

export async function fetchCaseStudy(id) {
  return client.fetch(
    `*[_type == "caseStudy" && (_id == $id || slug.current == $id)][0] { ${CASE_STUDY_FIELDS} }`,
    { id }
  );
}
