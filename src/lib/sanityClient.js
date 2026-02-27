import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// ─── Client ──────────────────────────────────────────────────────────────────
// projectId and dataset must match sanity/sanity.config.js
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '31tdhl52',
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

// ─── Blog Posts ───────────────────────────────────────────────────────────────

const BLOG_POST_FIELDS = `
  "id": _id,
  title,
  "slug": slug.current,
  status,
  category,
  tags,
  author,
  featured_image,
  excerpt,
  content,
  published_date,
  featured,
  meta_title,
  meta_description,
  gallery_images
`;

export async function fetchBlogPosts({ status = 'published', category, featured } = {}) {
  let filter = `_type == "blogPost" && status == $status`;
  const params = { status };
  if (category) { filter += ` && category == $category`; params.category = category; }
  if (featured !== undefined) { filter += ` && featured == $featured`; params.featured = featured; }
  return client.fetch(`*[${filter}] | order(published_date desc) { ${BLOG_POST_FIELDS} }`, params);
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
  purchase_date,
  agent,
  market_visibility,
  timeframe,
  excerpt,
  main_image_url,
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

export async function fetchTeamMember(id) {
  return client.fetch(
    `*[_type == "teamMember" && _id == $id][0] { ${TEAM_MEMBER_FIELDS} }`,
    { id }
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
  featured_image,
  client_name,
  client_testimonial,
  challenges_overcome,
  results_achieved,
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
