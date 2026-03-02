#!/usr/bin/env node
/**
 * audit-acquisitions.mjs — Cross-reference acquisition spreadsheet with Sanity.
 *
 * Usage:
 *   cd /Users/danielkovac/Desktop/compass-site/sanity
 *   npm install xlsx       # one-time install
 *   SANITY_WRITE_TOKEN=xxx node scripts/audit-acquisitions.mjs [--dry-run] [--fix]
 *
 * Modes:
 *   --dry-run   (default) Report differences only, don't write to Sanity
 *   --fix       Actually push updates to Sanity
 *
 * This script:
 *   1. Reads the acquisitions spreadsheet
 *   2. Normalizes all data (prices, dates, agents, etc.)
 *   3. Fetches existing docs from Sanity
 *   4. Reports gaps and mismatches
 *   5. Optionally creates/updates documents
 */

import { createClient } from '@sanity/client';
import XLSX from 'xlsx';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// ── Config ──────────────────────────────────────────────
const SPREADSHEET_PATH = resolve(
  '/Users/danielkovac/Downloads/Compass Buyers Agency - Purchased Properties (1).xlsx'
);

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const DRY_RUN = !process.argv.includes('--fix');

// ── Manual overrides for known near-matches (typos / encoding) ──
// Maps spreadsheet title → Sanity _id for cases fuzzy matching can't catch
const MANUAL_MATCHES = {
  '1/3 Clara Lane, Casuarina': 'acquisition-69780ddd01396de0528772d9',    // Sanity has "1/3 ClaraÂ Lane"
  '10 Mcphail, Kingcliff': 'acquisition-69780ddd01396de0528772dd',         // Sanity has "10 Mcpahil, Kingcliff"
  '6 Flintwood Ave Pottsville': 'acquisition-69780ddd01396de0528772ff',    // Sanity has "6 Flintwood Avenue, Pottsville"
};

// ── Agent mapping (spreadsheet name → website display name) ──
const AGENT_MAP = {
  'Chris WH': 'Chris',
  'Harley Peachey': 'Harley',
  'Lee Dowdall': 'Lee',
  'Nick GR': 'Nick',       // support role, rarely credited on website
  'NIck GR': 'Nick',       // typo variant
  'Chris WG': 'Chris',     // assumed same person
};

// ── Region → LGA mapping ──
const REGION_LGA = {
  'Tweed Shire': 'Tweed Shire',
  'Tweed Coast': 'Tweed Shire',
  'Tweed Valley': 'Tweed Shire',
  'Byron Shire': 'Byron Shire',
  'Byron Bay': 'Byron Shire',
  'Ballina Shire': 'Ballina Shire',
  'Southern Gold Coast': 'City of Gold Coast',
  'Gold Coast': 'City of Gold Coast',
  'Brisbane': 'Other',
};

// ── Region → State mapping ──
const REGION_STATE = {
  'Tweed Shire': 'NSW',
  'Tweed Coast': 'NSW',
  'Tweed Valley': 'NSW',
  'Byron Shire': 'NSW',
  'Byron Bay': 'NSW',
  'Ballina Shire': 'NSW',
  'Southern Gold Coast': 'QLD',
  'Gold Coast': 'QLD',
  'Brisbane': 'QLD',
};

// ── Helpers ─────────────────────────────────────────────

/** Parse a messy price string/number into a clean integer */
function normalizePrice(val) {
  if (val == null || val === '' || val === '$') return null;
  if (typeof val === 'number') return Math.round(val);
  // Remove "AUD", "$", spaces, commas
  const cleaned = String(val).replace(/AUD/gi, '').replace(/[$,\s]/g, '').trim();
  if (!cleaned) return null;
  const num = parseInt(cleaned, 10);
  if (isNaN(num)) return null;
  // Sanity check: prices should be between 100k and 50M
  if (num < 100000 || num > 50000000) {
    // Try to fix known malformed values
    // "AUD 1,9500,0000" → probably 1,950,000
    // "AUD 1,1000,000" → probably 1,100,000
    const reparse = cleaned.replace(/(\d)0{3,}$/g, '$1').replace(/(\d{1,3})(\d{3})(\d{3})$/g, '$1$2$3');
    const reparsed = parseInt(reparse, 10);
    if (reparsed >= 100000 && reparsed <= 50000000) return reparsed;
    console.warn(`  ⚠ Suspect price: "${val}" → parsed as ${num}, skipping`);
    return null;
  }
  return num;
}

/** Parse messy date into YYYY-MM-DD */
function normalizeDate(val) {
  if (!val) return null;
  if (typeof val === 'number') {
    // Excel serial date
    const d = XLSX.SSF.parse_date_code(val);
    if (d) return `${d.y}-${String(d.m).padStart(2, '0')}-${String(d.d).padStart(2, '0')}`;
    return null;
  }
  const s = String(val).trim();
  // ISO format: 2024-06-21T00:00:00.000Z
  const isoMatch = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) return isoMatch[0];
  // DD/MM/YYYY format
  const dmyMatch = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (dmyMatch) {
    return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, '0')}-${dmyMatch[1].padStart(2, '0')}`;
  }
  return null;
}

/** Normalize market visibility */
function normalizeMarketVisibility(val) {
  if (!val) return null;
  const s = String(val).toLowerCase().trim();
  if (s.includes('off')) return 'off_market';
  if (s.includes('on')) return 'on_market';
  if (s.includes('auction')) return 'on_market'; // auctions are on-market
  return null;
}

/** Parse land size into { value, unit } */
function normalizeLandSize(val) {
  if (!val || val === '-') return { value: null, unit: 'sqm' };
  const s = String(val).trim().replace(/,/g, '');
  const haMatch = s.match(/([\d.]+)\s*ha/i);
  if (haMatch) return { value: parseFloat(haMatch[1]), unit: 'hectares' };
  const sqmMatch = s.match(/([\d.]+)\s*(?:sqm|m2|m²)/i);
  if (sqmMatch) return { value: parseFloat(sqmMatch[1]), unit: 'sqm' };
  const numOnly = parseFloat(s);
  if (!isNaN(numOnly)) return { value: numOnly, unit: 'sqm' };
  return { value: null, unit: 'sqm' };
}

/** Create a clean slug from title */
function makeSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Trim and normalize suburb */
function normalizeSuburb(val) {
  if (!val) return null;
  return String(val).trim();
}

/**
 * Normalize a title for fuzzy matching:
 * - lowercase, trim
 * - remove encoding artifacts (Â, etc.)
 * - strip trailing suburb names, postcodes, state codes
 * - collapse whitespace, remove trailing punctuation
 */
function normalizeTitle(title) {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\u00c2/g, '')       // remove Â encoding artifact
    .replace(/\s*(nsw|qld)\s*/gi, ' ')  // strip state codes
    .replace(/\s*\d{4}\s*/g, ' ') // strip postcodes
    .replace(/[.,\s]+$/g, '')     // strip trailing punctuation/spaces
    .replace(/\s+/g, ' ')         // collapse whitespace
    .trim();
}

/**
 * Try to match a spreadsheet title to a Sanity doc title.
 * Strategy:
 *  1. Exact normalized match
 *  2. Spreadsheet title starts with Sanity title (Sanity = "12 Paperbark Court", Sheet = "12 Paperbark Court, Banora Point")
 *  3. Sanity title starts with Spreadsheet title
 *  4. Strip everything after last comma in spreadsheet title and re-match
 */
function findBestMatch(sheetTitle, existingByNormTitle, allExisting) {
  const normSheet = normalizeTitle(sheetTitle);

  // 1. Exact normalized match
  if (existingByNormTitle.has(normSheet)) {
    return existingByNormTitle.get(normSheet);
  }

  // 2. Check if any Sanity title is a prefix of the spreadsheet title
  for (const [normSanity, doc] of existingByNormTitle.entries()) {
    if (normSheet.startsWith(normSanity) && normSheet.length - normSanity.length < 30) {
      return doc;
    }
    if (normSanity.startsWith(normSheet) && normSanity.length - normSheet.length < 30) {
      return doc;
    }
  }

  // 3. Strip suburb (after last comma) and retry
  const commaIdx = sheetTitle.lastIndexOf(',');
  if (commaIdx > 0) {
    const stripped = normalizeTitle(sheetTitle.substring(0, commaIdx));
    if (existingByNormTitle.has(stripped)) {
      return existingByNormTitle.get(stripped);
    }
    // Also check prefix match on stripped version
    for (const [normSanity, doc] of existingByNormTitle.entries()) {
      if (stripped.startsWith(normSanity) || normSanity.startsWith(stripped)) {
        return doc;
      }
    }
  }

  // 4. Try matching just the street number + street name (first 2-3 words)
  const sheetWords = normSheet.split(/[\s,]+/).slice(0, 3).join(' ');
  if (sheetWords.length > 5) {
    for (const [normSanity, doc] of existingByNormTitle.entries()) {
      const sanityWords = normSanity.split(/[\s,]+/).slice(0, 3).join(' ');
      if (sheetWords === sanityWords) {
        return doc;
      }
    }
  }

  return null;
}

// ── Main ────────────────────────────────────────────────

async function main() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Compass Acquisitions Data Audit');
  console.log(`  Mode: ${DRY_RUN ? 'DRY RUN (report only)' : '🔴 LIVE (writing to Sanity)'}`);
  console.log('═══════════════════════════════════════════════════════\n');

  // 1. Read spreadsheet
  console.log('📊 Reading spreadsheet...');
  const wb = XLSX.readFile(SPREADSHEET_PATH);
  const sheet = wb.Sheets['Acquisitions'] || wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });
  console.log(`   Found ${rows.length} rows\n`);

  // 2. Normalize spreadsheet data
  console.log('🔧 Normalizing data...');
  const issues = [];
  const normalized = rows.map((row, i) => {
    const title = (row['Task Name'] || '').trim();
    if (!title) {
      issues.push(`Row ${i + 2}: Missing title`);
      return null;
    }

    const rawPrice = row['Purchase Price (currency)'];
    const price = normalizePrice(rawPrice);
    if (!price && rawPrice) {
      issues.push(`Row ${i + 2}: Bad price "${rawPrice}" for "${title}"`);
    }

    const rawDate = row['Sign on Date (date)'];
    const date = normalizeDate(rawDate);

    const region = (row['Region'] || '').trim();
    const suburb = normalizeSuburb(row['Suburb']);
    const agentWebsite = (row['BA Purchased WEBSITE'] || '').trim();
    const agentActual = (row['BA Purchased Actual'] || '').trim();
    const marketType = normalizeMarketVisibility(row['Bought On Market/Off-Market/Auction']);
    const timeframe = row['Engagement Time (weeks)'] ? `${row['Engagement Time (weeks)']} weeks` : null;
    const beds = row['Bedroom (short text)'] != null ? parseInt(row['Bedroom (short text)'], 10) || null : null;
    const baths = row['Bathroom (short text)'] != null ? parseInt(row['Bathroom (short text)'], 10) || null : null;
    const cars = row['Car'] != null ? parseInt(row['Car'], 10) || null : null;
    const { value: landValue, unit: landUnit } = normalizeLandSize(row['Land Size (short text)']);
    const link = (typeof row['Link'] === 'string') ? row['Link'].trim() : null;

    return {
      title,
      slug: makeSlug(title),
      suburb,
      state: REGION_STATE[region] || 'NSW',
      lga: REGION_LGA[region] || 'Other',
      agent: AGENT_MAP[agentWebsite] || agentWebsite || AGENT_MAP[agentActual] || agentActual || null,
      purchase_price: price,
      price_display: price ? `$${price.toLocaleString('en-AU')}` : null,
      purchase_date: date,
      market_visibility: marketType,
      timeframe,
      beds,
      baths,
      cars,
      land_size: landValue,
      land_size_unit: landUnit,
      realestate_link: link,
      // Metadata from spreadsheet (not stored in Sanity, for reporting)
      _meta: {
        row: i + 2,
        rawPrice,
        rawDate,
        clientName: row['Client Name (short text)'],
        buyerOrigin: row['Buyer Origin (short text)'],
        sellingAgent: row['Selling Agent (short text)'],
        agentWebsite,
        agentActual,
        buyerType: row['Investor / Homebuyer'],
      },
    };
  }).filter(Boolean);

  console.log(`   Normalized ${normalized.length} properties`);
  if (issues.length) {
    console.log(`   ⚠ ${issues.length} data issues:`);
    issues.forEach(i => console.log(`     - ${i}`));
  }

  // 3. Fetch existing Sanity documents
  console.log('\n📡 Fetching existing Sanity acquisitions...');
  const existing = await client.fetch(
    `*[_type == "acquisition"] {
      _id,
      title,
      "slug": slug.current,
      suburb,
      state,
      lga,
      agent,
      purchase_price,
      price_display,
      purchase_date,
      market_visibility,
      timeframe,
      beds,
      baths,
      cars,
      land_size,
      land_size_unit,
      realestate_link,
      excerpt,
      main_image_url,
      status,
      featured
    }`
  );
  console.log(`   Found ${existing.length} existing documents\n`);

  // 4. Cross-reference
  console.log('🔍 Cross-referencing...\n');

  // Build lookup by normalized title
  const existingByNormTitle = new Map();
  existing.forEach(doc => {
    const key = normalizeTitle(doc.title);
    if (key) existingByNormTitle.set(key, doc);
  });

  const missing = [];
  const updates = [];
  const matched = [];
  const matchedSanityIds = new Set();

  // Build lookup by _id for manual matches
  const existingById = new Map();
  existing.forEach(doc => existingById.set(doc._id, doc));

  for (const row of normalized) {
    // Check manual overrides first (use normalized keys for robust matching)
    let doc = null;
    const manualKey = Object.keys(MANUAL_MATCHES).find(k =>
      normalizeTitle(k) === normalizeTitle(row.title)
    );
    if (manualKey) {
      doc = existingById.get(MANUAL_MATCHES[manualKey]) || null;
      if (doc) console.log(`  📌 Manual match: "${row.title}" → "${doc.title}" (${doc._id})`);
    }
    if (!doc) {
      doc = findBestMatch(row.title, existingByNormTitle, existing);
    }

    if (!doc) {
      missing.push(row);
      continue;
    }

    matchedSanityIds.add(doc._id);

    matched.push({ row, doc });

    // Check for fields that need updating
    const changes = [];

    // Fix title if it has encoding issues or typos (manual matches)
    if (MANUAL_MATCHES[row.title] && doc.title !== row.title) {
      // Use a cleaner title (strip suburb suffix from spreadsheet title)
      const commaIdx = row.title.lastIndexOf(',');
      const cleanTitle = commaIdx > 0 ? row.title.substring(0, commaIdx).trim() : row.title;
      if (doc.title !== cleanTitle) {
        changes.push({ field: 'title', from: doc.title, to: cleanTitle });
      }
    }

    if (row.cars != null && doc.cars !== row.cars) {
      changes.push({ field: 'cars', from: doc.cars, to: row.cars });
    }
    if (row.beds != null && doc.beds !== row.beds) {
      changes.push({ field: 'beds', from: doc.beds, to: row.beds });
    }
    if (row.baths != null && doc.baths !== row.baths) {
      changes.push({ field: 'baths', from: doc.baths, to: row.baths });
    }
    if (row.purchase_price != null && doc.purchase_price !== row.purchase_price) {
      changes.push({ field: 'purchase_price', from: doc.purchase_price, to: row.purchase_price });
    }
    if (row.price_display && doc.price_display !== row.price_display) {
      changes.push({ field: 'price_display', from: doc.price_display, to: row.price_display });
    }
    if (row.purchase_date && doc.purchase_date !== row.purchase_date) {
      changes.push({ field: 'purchase_date', from: doc.purchase_date, to: row.purchase_date });
    }
    if (row.agent && doc.agent !== row.agent) {
      changes.push({ field: 'agent', from: doc.agent, to: row.agent });
    }
    if (row.market_visibility && doc.market_visibility !== row.market_visibility) {
      changes.push({ field: 'market_visibility', from: doc.market_visibility, to: row.market_visibility });
    }
    if (row.land_size != null && doc.land_size !== row.land_size) {
      changes.push({ field: 'land_size', from: doc.land_size, to: row.land_size });
    }
    if (row.land_size_unit && doc.land_size_unit !== row.land_size_unit) {
      changes.push({ field: 'land_size_unit', from: doc.land_size_unit, to: row.land_size_unit });
    }
    if (row.lga && doc.lga !== row.lga) {
      changes.push({ field: 'lga', from: doc.lga, to: row.lga });
    }
    if (row.state && doc.state !== row.state) {
      changes.push({ field: 'state', from: doc.state, to: row.state });
    }
    if (row.realestate_link && !doc.realestate_link) {
      changes.push({ field: 'realestate_link', from: null, to: row.realestate_link });
    }
    if (row.timeframe && !doc.timeframe) {
      changes.push({ field: 'timeframe', from: null, to: row.timeframe });
    }
    if (row.suburb && doc.suburb !== row.suburb) {
      changes.push({ field: 'suburb', from: doc.suburb, to: row.suburb });
    }

    if (changes.length > 0) {
      updates.push({ doc, row, changes });
    }
  }

  // Also find Sanity docs not in spreadsheet
  const orphaned = existing.filter(doc => !matchedSanityIds.has(doc._id));

  // 5. Report
  console.log('═══════════════════════════════════════════════════════');
  console.log('  AUDIT REPORT');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Spreadsheet rows:     ${normalized.length}`);
  console.log(`  Sanity documents:     ${existing.length}`);
  console.log(`  Matched:              ${matched.length}`);
  console.log(`  Missing from Sanity:  ${missing.length}`);
  console.log(`  Needing updates:      ${updates.length}`);
  console.log(`  In Sanity but not in spreadsheet: ${orphaned.length}`);
  console.log('');

  if (missing.length) {
    console.log('── Missing from Sanity ────────────────────────────────');
    missing.forEach(r => {
      console.log(`  + ${r.title} (${r.suburb}, ${r.lga})`);
      console.log(`    Price: ${r.price_display || 'N/A'} | Agent: ${r.agent || 'N/A'} | Date: ${r.purchase_date || 'N/A'}`);
      console.log(`    Beds: ${r.beds || '-'} | Baths: ${r.baths || '-'} | Cars: ${r.cars || '-'} | Land: ${r.land_size || '-'}${r.land_size_unit}`);
    });
    console.log('');
  }

  if (updates.length) {
    console.log('── Fields needing update ──────────────────────────────');
    updates.forEach(({ doc, row, changes }) => {
      console.log(`  ~ ${doc.title} (${doc._id})`);
      changes.forEach(c => {
        console.log(`    ${c.field}: "${c.from}" → "${c.to}"`);
      });
    });
    console.log('');
  }

  if (orphaned.length) {
    console.log('── In Sanity but not in spreadsheet ───────────────────');
    orphaned.forEach(d => {
      console.log(`  ? ${d.title} (${d._id}) — ${d.suburb || 'no suburb'}`);
    });
    console.log('');
  }

  // Check for docs without excerpts
  const noExcerpt = existing.filter(d => !d.excerpt || d.excerpt.trim() === '');
  if (noExcerpt.length) {
    console.log(`── Missing excerpts (${noExcerpt.length}) ─────────────────────────`);
    noExcerpt.slice(0, 10).forEach(d => {
      console.log(`  - ${d.title} (${d._id})`);
    });
    if (noExcerpt.length > 10) console.log(`  ... and ${noExcerpt.length - 10} more`);
    console.log('');
  }

  // Check for docs without images
  const noImage = existing.filter(d => !d.main_image_url);
  if (noImage.length) {
    console.log(`── Missing images (${noImage.length}) ──────────────────────────`);
    noImage.slice(0, 10).forEach(d => {
      console.log(`  - ${d.title} (${d._id})`);
    });
    if (noImage.length > 10) console.log(`  ... and ${noImage.length - 10} more`);
    console.log('');
  }

  // 6. Apply fixes if --fix
  if (!DRY_RUN) {
    console.log('═══════════════════════════════════════════════════════');
    console.log('  APPLYING FIXES');
    console.log('═══════════════════════════════════════════════════════\n');

    // Update existing docs
    for (const { doc, changes } of updates) {
      const patch = {};
      for (const c of changes) {
        patch[c.field] = c.to;
      }
      try {
        await client.patch(doc._id).set(patch).commit();
        console.log(`  ✓ Updated ${doc.title}`);
      } catch (err) {
        console.error(`  ✗ Failed to update ${doc.title}: ${err.message}`);
      }
    }

    // Create missing docs
    for (const row of missing) {
      const doc = {
        _type: 'acquisition',
        title: row.title,
        slug: { _type: 'slug', current: row.slug },
        status: 'published',
        suburb: row.suburb,
        state: row.state,
        lga: row.lga,
        agent: row.agent,
        purchase_price: row.purchase_price,
        price_display: row.price_display,
        purchase_date: row.purchase_date,
        market_visibility: row.market_visibility,
        timeframe: row.timeframe,
        beds: row.beds,
        baths: row.baths,
        cars: row.cars,
        land_size: row.land_size,
        land_size_unit: row.land_size_unit,
        realestate_link: row.realestate_link,
        featured: false,
      };
      // Remove null fields
      Object.keys(doc).forEach(k => {
        if (doc[k] === null || doc[k] === undefined) delete doc[k];
      });
      try {
        const result = await client.create(doc);
        console.log(`  ✓ Created ${row.title} (${result._id})`);
      } catch (err) {
        console.error(`  ✗ Failed to create ${row.title}: ${err.message}`);
      }
    }

    console.log('\n✅ Fixes applied.');
  } else {
    console.log('ℹ  Dry run complete. Use --fix to apply changes.');
  }
}

main().catch(err => {
  console.error('\n💥 Fatal error:', err.message);
  process.exit(1);
});
