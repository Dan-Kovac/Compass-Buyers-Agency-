/**
 * migrate-base44-to-sanity.mjs
 *
 * One-shot migration: pulls all content from Base44's public API and
 * imports it into Sanity. Run once after you have a Sanity write token.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node migrate-base44-to-sanity.mjs
 *
 * Get a token at: https://www.sanity.io/manage/project/31tdhl52/api
 * → "Add API token" → Role: Editor → copy the token
 */

import { createClient } from "@sanity/client";

// ─── Config ──────────────────────────────────────────────────────────────────

const BASE44_APP_ID   = "689ff2310196c0788d148d78";
const BASE44_BASE_URL = `https://base44.app/api/apps/${BASE44_APP_ID}/entities`;

const SANITY_PROJECT = "31tdhl52";
const SANITY_DATASET = "production";
const SANITY_TOKEN   = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error("❌  SANITY_TOKEN env var is required.");
  console.error("   Get one at: https://www.sanity.io/manage/project/31tdhl52/api");
  process.exit(1);
}

const sanity = createClient({
  projectId: SANITY_PROJECT,
  dataset:   SANITY_DATASET,
  apiVersion: "2024-01-01",
  token:     SANITY_TOKEN,
  useCdn:    false,
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function fetchEntity(name) {
  const res = await fetch(`${BASE44_BASE_URL}/${name}`);
  if (!res.ok) throw new Error(`Failed to fetch ${name}: ${res.status}`);
  return res.json();
}

function slugify(str) {
  if (!str) return "";
  return str.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

async function upsert(doc) {
  // Use createOrReplace keyed on a deterministic _id derived from the Base44 id
  return sanity.createOrReplace({ ...doc });
}

function log(msg) { process.stdout.write(msg + "\n"); }
function progress(n, total, entity) {
  process.stdout.write(`\r  ${entity}: ${n}/${total} imported`);
  if (n === total) process.stdout.write("\n");
}

// ─── Transformers ────────────────────────────────────────────────────────────

function toBlogPost(r) {
  const slug = r.slug || slugify(r.title) || r.id;
  return {
    _id:           `blogPost-${r.id}`,
    _type:         "blogPost",
    title:          r.title,
    slug:           { _type: "slug", current: slug },
    status:         r.status || "published",
    category:       r.category || null,
    tags:           r.tags || [],
    author:         r.author || null,
    featured_image: r.featured_image || null,
    excerpt:        r.excerpt || null,
    content:        r.content || null,
    published_date: r.published_date || r.created_date || null,
    featured:       r.featured || false,
    meta_title:     r.meta_title || null,
    meta_description: r.meta_description || null,
  };
}

function toAcquisition(r) {
  const slug = r.slug || slugify(r.title) || r.id;
  return {
    _id:              `acquisition-${r.id}`,
    _type:            "acquisition",
    title:             r.title,
    slug:              { _type: "slug", current: slug },
    status:            r.status || "published",
    suburb:            r.suburb || null,
    state:             r.state || null,
    lga:               r.lga || null,
    property_type:     r.property_type || null,
    beds:              typeof r.beds === "number" ? r.beds : null,
    baths:             typeof r.baths === "number" ? r.baths : null,
    cars:              typeof r.cars === "number" ? r.cars : null,
    land_size:         r.land_size || null,
    land_size_unit:    r.land_size_unit || null,
    purchase_price:    typeof r.purchase_price === "number" ? r.purchase_price : null,
    price_display:     r.price_display || null,
    purchase_date:     r.purchase_date || null,
    agent:             r.agent || null,
    market_visibility: r.market_visibility || null,
    timeframe:         r.timeframe || null,
    excerpt:           r.excerpt || null,
    main_image_url:    r.main_image_url || null,
    realestate_link:   r.realestate_link || null,
    tags:              r.tags || [],
    featured:          r.featured || false,
  };
}

function toTeamMember(r) {
  return {
    _id:             `teamMember-${r.id}`,
    _type:           "teamMember",
    name:             r.name,
    position:         r.position || null,
    bio:              r.bio || null,
    photo:            r.photo || null,
    email:            r.email || null,
    phone:            r.phone || null,
    credentials:      r.credentials || [],
    specialties:      r.specialties || [],
    linkedin_url:     r.linkedin_url || null,
    intro_video_url:  r.intro_video_url || null,
    order:            typeof r.order === "number" ? r.order : 99,
    active:           r.active !== false,
  };
}

function toTestimonial(r) {
  return {
    _id:        `testimonial-${r.id}`,
    _type:      "testimonial",
    name:        r.name,
    location:    r.location || null,
    quote:       r.quote,
    photo_url:   r.photo_url || null,
    rating:      typeof r.rating === "number" ? r.rating : 5,
    status:      r.status || "published",
  };
}

function toCaseStudy(r) {
  const slug = r.slug || slugify(r.title) || r.id;
  return {
    _id:                  `caseStudy-${r.id}`,
    _type:                "caseStudy",
    title:                 r.title,
    slug:                  { _type: "slug", current: slug },
    status:                r.status || "published",
    property_type:         r.property_type || null,
    location:              r.location || null,
    client_type:           r.client_type || null,
    purchase_price:        typeof r.purchase_price === "number" ? r.purchase_price : null,
    timeframe:             r.timeframe || null,
    excerpt:               r.excerpt || null,
    content:               r.content || null,
    featured_image:        r.featured_image || null,
    client_name:           r.client_name || null,
    client_testimonial:    r.client_testimonial || null,
    challenges_overcome:   r.challenges_overcome || null,
    results_achieved:      r.results_achieved || null,
    featured:              r.featured || false,
    published_date:        r.published_date || r.created_date || null,
    meta_title:            r.meta_title || null,
    meta_description:      r.meta_description || null,
  };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function migrate() {
  log("\n🚀  Starting Base44 → Sanity migration\n");

  const jobs = [
    { name: "BlogPost",   transform: toBlogPost },
    { name: "Acquisition", transform: toAcquisition },
    { name: "TeamMember",  transform: toTeamMember },
    { name: "Testimonial", transform: toTestimonial },
    { name: "CaseStudy",   transform: toCaseStudy },
  ];

  const results = { success: 0, failed: 0, errors: [] };

  for (const { name, transform } of jobs) {
    log(`\n📦  Fetching ${name}...`);
    let records;
    try {
      records = await fetchEntity(name);
    } catch (err) {
      log(`  ⚠️  Could not fetch ${name}: ${err.message}`);
      continue;
    }

    log(`  → ${records.length} records found`);

    for (let i = 0; i < records.length; i++) {
      const r = records[i];
      try {
        await upsert(transform(r));
        results.success++;
      } catch (err) {
        results.failed++;
        results.errors.push({ entity: name, id: r.id, error: err.message });
      }
      progress(i + 1, records.length, name);
    }
  }

  log("\n─────────────────────────────────────────");
  log(`✅  Success: ${results.success} documents imported`);
  if (results.failed > 0) {
    log(`⚠️  Failed:  ${results.failed} documents`);
    results.errors.slice(0, 10).forEach(e =>
      log(`   ${e.entity} ${e.id}: ${e.error}`)
    );
  }
  log("─────────────────────────────────────────\n");
}

migrate().catch(err => {
  console.error("\n💥  Fatal error:", err.message);
  process.exit(1);
});
