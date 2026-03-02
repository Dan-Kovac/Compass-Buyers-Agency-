#!/usr/bin/env node
/**
 * Acquisitions Data Audit + Migration Script
 *
 * Reads the spreadsheet, queries Sanity, cross-references data,
 * and generates Sanity mutation patches to fix all issues.
 *
 * Usage:
 *   node scripts/audit-acquisitions.mjs              # Audit only (dry run)
 *   SANITY_TOKEN=xxx node scripts/audit-acquisitions.mjs --apply   # Apply fixes
 */

import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';

const DRY_RUN = !process.argv.includes('--apply');

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN || undefined,
});

// ── Spreadsheet data (pre-extracted) ───────────────────────────────────────
// This is the full dataset from the Excel file, normalised.
const SPREADSHEET = [
  { title: "12 Paperbark Court, Banora Point", suburb: "Banora Point", price: 1126000, agent: "Chris WH", market: "On Market", beds: 4, baths: 2, cars: 2, land: "772sqm", type: "house", weeks: 2, date: "2024-06-21", buyerType: "Home Buyer" },
  { title: "86 Ash Drive Banora Point", suburb: "Banora Point", price: 1235000, agent: "Harley Peachey", market: "On Market", beds: 4, baths: 2, cars: 2, land: "788sqm", type: "house", weeks: 6, date: "2024-08-03", buyerType: "Home Buyer" },
  { title: "3 James Cook Drive, Banora Point", suburb: "Banora Point", price: 1260000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 2, land: "759 sqm", type: "house", weeks: 2, buyerType: "Home Buyer" },
  { title: "42 Kildare Drive", suburb: "Banora Point", price: 1120000, agent: "Harley Peachey", market: "On Market", beds: 4, baths: 2, cars: 2, land: "625sqm", type: "house", weeks: 4, date: "2024-11-21", buyerType: "Investor" },
  { title: "5/79-83 Tweed Coast Road, Bogangar", suburb: "Bogangar", price: 910000, agent: "Chris WH", market: "On Market", beds: 3, baths: 1, cars: 1, land: "2261sqm", type: "house", weeks: 6, date: "2024-10-17", buyerType: "Investor" },
  { title: "3/36 Hastings Road", suburb: "Bogangar", price: 990000, agent: "Chris WH", market: "Off Market", beds: 3, baths: 2, cars: 1, land: "613sqm", type: "house", weeks: 1.5, date: "2024-07-06", buyerType: "Home Buyer" },
  { title: "7 Oleander Avenue", suburb: "Bogangar", price: 1390000, agent: "Chris WH", market: "Off Market", beds: 3, baths: 1, cars: 1, land: "638sqm", type: "house", weeks: 2, date: "2024-10-16", buyerType: "Investor" },
  { title: "7 Ti Tree Avenue", suburb: "Bogangar", price: 1810000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 3, cars: 2, land: "717sqm", type: "house", weeks: 3, buyerType: "Home Buyer" },
  { title: "51 Ti Tree Avenue", suburb: "Bogangar", price: 1950000, agent: "Lee Dowdall", market: "On Market", beds: 7, baths: 3, cars: 2, land: "717sqm", type: "house", weeks: 6, date: "2024-10-29", buyerType: "Investor" },
  { title: "2/17 Poplar Avenue", suburb: "Bogangar", price: 1050000, agent: "Chris WH", market: "Off Market", beds: 2, baths: 1, cars: 1, land: "685sqm", type: "house", weeks: 3, date: "2024-12-07", buyerType: "Investor" },
  { title: "1 Lydford Close", suburb: "Bonogin", price: 3055000, agent: "Lee Dowdall", market: "On Market", beds: 5, baths: 4, cars: 5, land: "3854sqm", type: "acreage", weeks: 8, date: "2025-01-28", buyerType: "Home Buyer" },
  { title: "73 Butler Street", suburb: "Byron Bay", price: 2550000, agent: "Lee Dowdall", market: "On Market", beds: 7, baths: 4, cars: 2, land: "929sqm", type: "house", weeks: 3, date: "2024-11-30", buyerType: "Investor" },
  { title: "2/69 Grass Tree Circuit", suburb: "Cabarita Beach", price: 1240000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 1, land: null, type: "duplex", weeks: 6, buyerType: "Investor" },
  { title: "10 Reef Water", suburb: "Cabarita Beach", price: 1975000, agent: "Lee Dowdall", market: "Off Market", beds: 4, baths: 2, cars: 2, land: null, type: "house", weeks: 4, buyerType: "Home Buyer" },
  { title: "1/3 Clara Lane", suburb: "Casuarina", price: 1500000, agent: "Chris WH", market: "Off Market", beds: 3, baths: 2, cars: 1, land: "345sqm", type: "house", weeks: 4, date: "2024-07-03", buyerType: "Home Buyer" },
  { title: "1/6 Coogera Lane", suburb: "Casuarina", price: 1650000, agent: "Harley Peachey", market: "On Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 4, buyerType: "Investor" },
  { title: "30/40-47 Kamala Crescent", suburb: "Casuarina", price: 1390000, agent: "Harley Peachey", market: "Off Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 2, date: "2024-10-03", buyerType: "Investor" },
  { title: "17 Hyndes Lane", suburb: "Casuarina", price: 2850000, agent: "Lee Dowdall", market: "On Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 4, date: "2024-11-02", buyerType: "Home Buyer" },
  { title: "399 Casuarina Way", suburb: "Casuarina", price: 2375000, agent: "Harley Peachey", market: "Off Market", beds: 4, baths: 2, cars: 2, land: "771sqm", type: "house", weeks: 3, date: "2024-12-02", buyerType: "Home Buyer" },
  { title: "34 Daybreak Boulevard, Casuarina", suburb: "Casuarina", price: 2285000, agent: "Harley Peachey", market: "Off Market", beds: 4, baths: 2, cars: 2, land: "451sqm", type: "house", weeks: 9, date: "2024-12-14", buyerType: "Home Buyer" },
  { title: "PAMA Penthouse", suburb: "Casuarina", price: 3000000, agent: "Harley Peachey", market: "On Market", beds: 3, baths: 3, cars: 2, land: null, type: "apartment", weeks: 4, buyerType: "Investor" },
  { title: "351 Cudgen Road", suburb: "Cudgen", price: 2600000, agent: "Chris WH", market: "On Market", beds: 5, baths: 3, cars: 4, land: "16187sqm", type: "acreage", weeks: 4, date: "2024-07-01", buyerType: "Home Buyer" },
  { title: "765 Cudgera Creek Road, Cudgera Creek", suburb: "Cudgera Creek", price: 1795000, agent: "Harley Peachey", market: "Off Market", beds: 4, baths: 2, cars: 4, land: "16187sqm", type: "acreage", weeks: 1.5, date: "2024-12-02", buyerType: "Home Buyer" },
  { title: "1/5 Carstens Ct", suburb: "Currumbin Waters", price: 810000, agent: "Harley Peachey", market: "On Market", beds: 3, baths: 1, cars: 1, land: "618sqm", type: "duplex", weeks: 6, buyerType: "Home Buyer" },
  { title: "52 Howards Grass Road", suburb: "Howards Grass", price: 1050000, agent: "Harley Peachey", market: "On Market", beds: 4, baths: 2, cars: 2, land: "79000sqm", type: "acreage", weeks: 8, date: "2025-01-07", buyerType: "Home Buyer" },
  { title: "1 Seaside Avenue", suburb: "Kingscliff", price: 2850000, agent: "Harley Peachey", market: "Off Market", beds: 4, baths: 3, cars: 2, land: "608sqm", type: "house", weeks: 1, date: "2024-06-08", buyerType: "Home Buyer" },
  { title: "1/14 Dawes Avenue", suburb: "Kingscliff", price: 1000000, agent: "Harley Peachey", market: "Off Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 2, date: "2024-06-15", buyerType: "Investor" },
  { title: "10 McPahil, Kingscliff", suburb: "Kingscliff", price: 1550000, agent: "Harley Peachey", market: "Off Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 6, date: "2024-08-15", buyerType: "Investor" },
  { title: "22 Marine Parade", suburb: "Kingscliff", price: 7050000, agent: "Chris WH", market: "On Market", beds: 6, baths: 3, cars: 3, land: "911sqm", type: "house", weeks: 2, date: "2024-06-17", buyerType: "Home Buyer" },
  { title: "3/262 Marine Parade Kingscliff", suburb: "Kingscliff", price: 1300000, agent: "Chris WG", market: "On Market", beds: 3, baths: 2, cars: 1, land: "850sqm", type: "apartment", weeks: 5, date: "2024-08-08", buyerType: "Investor" },
  { title: "2/35 Nautilus Way", suburb: "Kingscliff", price: 1310000, agent: "Chris WH", market: "Off Market", beds: 3, baths: 2, cars: 1, land: "175sqm", type: "townhouse", weeks: 3, date: "2024-11-21", buyerType: "Investor" },
  { title: "2/29 Mistletoe Circuit", suburb: "Kingscliff", price: 1025000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 1, land: "680sqm", type: "townhouse", weeks: 2, date: "2024-12-07", buyerType: "Investor" },
  { title: "4 Oceanview Crescent", suburb: "Kingscliff", price: 4625000, agent: "Harley Peachey", market: "On Market", beds: 4, baths: 4, cars: 3, land: "708sqm", type: "house", weeks: 3, date: "2024-12-03", buyerType: "Home Buyer" },
  { title: "2 Valiant St, Kingscliff", suburb: "Kingscliff", price: 1575000, agent: "Harley Peachey", market: "On Market", beds: 3, baths: 1, cars: 1, land: "677sqm", type: "house", weeks: 3, date: "2024-12-19", buyerType: "Investor" },
  { title: "13 Gibson Street", suburb: "Kingscliff", price: 1950000, agent: "Harley Peachey", market: "Off Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 6, date: "2025-01-22", buyerType: "Home Buyer" },
  { title: "68 Cylinders Drive", suburb: "Kingscliff", price: 3100000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 2, cars: 2, land: "362sqm", type: "house", weeks: 8, date: "2025-01-15", buyerType: "Home Buyer" },
  { title: "113/439 Elizabeth Avenue", suburb: "Kippa Ring", price: 595000, agent: "Lee Dowdall", market: "Off Market", beds: 3, baths: 2, cars: 1, land: "128sqm", type: "townhouse", weeks: 2, buyerType: "Investor" },
  { title: "17 Killarney Cr", suburb: "Lennox Head", price: 1710000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 2, cars: 2, land: null, type: "house", weeks: 8, buyerType: "Home Buyer" },
  { title: "8 Granite St", suburb: "Lennox Head", price: 1535000, agent: "Lee Dowdall", market: "On Market", beds: 3, baths: 2, cars: 1, land: "607sqm", type: "house", weeks: 4, date: "2024-12-06", buyerType: "Home Buyer" },
  { title: "18 McPherson Drive", suburb: "Murwillumbah", price: 910000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 1, cars: 2, land: "669sqm", type: "house", weeks: 4, date: "2024-11-15", buyerType: "Investor" },
  { title: "198 Cranneys Road", suburb: "North Tumbulgum", price: 2460000, agent: "Chris WH", market: "On Market", beds: 4, baths: 3, cars: 4, land: "20230sqm", type: "acreage", weeks: 6, date: "2024-12-19", buyerType: "Home Buyer" },
  { title: "17 Glendale Crescent", suburb: "Ocean Shores", price: 1100000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 2, cars: 2, land: "602sqm", type: "house", weeks: 12, date: "2024-08-29", buyerType: "Home Buyer" },
  { title: "6 Flintwood Avenue, Pottsville", suburb: "Pottsville", price: 1250000, agent: "Harley Peachey", market: "Off Market", beds: 4, baths: 2, cars: 2, land: "794sqm", type: "house", weeks: 3, date: "2024-11-23", buyerType: "Home Buyer" },
  { title: "34 Seabreeze", suburb: "Pottsville", price: 2060000, agent: "Lee Dowdall", market: "Off Market", beds: 4, baths: 2, cars: 2, land: "616sqm", type: "house", weeks: 12, date: "2024-08-12", buyerType: "Home Buyer" },
  { title: "31 Elanora Avenue", suburb: "Pottsville", price: 7000000, agent: "Chris WH", market: "Off Market", beds: 5, baths: 4, cars: 4, land: null, type: "house", weeks: 2.5, date: "2024-08-20", buyerType: "Home Buyer" },
  { title: "7/23-27 Coronation Ave", suburb: "Pottsville", price: 1030000, agent: "Harley Peachey", market: "On Market", beds: 3, baths: 2, cars: 2, land: null, type: "townhouse", weeks: 4, date: "2024-12-14", buyerType: "Home Buyer" },
  { title: "9/30 Coronation Avenue, Pottsville", suburb: "Pottsville", price: 645000, agent: "Harley Peachey", market: "On Market", beds: 2, baths: 1, cars: 1, land: null, type: "unit", weeks: 3, date: "2024-07-26", buyerType: "Investor" },
  { title: "638 Pottsville Road", suburb: "Sleepy Hollow", price: 2120000, agent: "Chris WH", market: "On Market", beds: 3, baths: 2, cars: 4, land: "20230sqm", type: "acreage", weeks: 8, date: "2024-11-12", buyerType: "Home Buyer" },
  { title: "4 Sunnycrest Terranora", suburb: "Terranora", price: 2950000, agent: "Chris WH", market: "On Market", beds: 5, baths: 2, cars: 3, land: "10120sqm", type: "acreage", weeks: 6, date: "2024-10-28", buyerType: "Home Buyer" },
  { title: "Unit 13, 39-47 Soorley Street", suburb: "Tweed Heads South", price: 1015000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 2, land: null, type: "townhouse", weeks: 8, date: "2024-07-13", buyerType: "Investor" },
  { title: "1/10 Rose Street", suburb: "Tweed Heads West", price: 542000, agent: "Harley Peachey", market: "Off Market", beds: 2, baths: 1, cars: 1, land: "675sqm", type: "unit", weeks: 8, buyerType: "Home Buyer" },
  { title: "29 Ryder Street, Uki", suburb: "Uki", price: 1200000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 2, land: "850sqm", type: "house", weeks: 52, buyerType: "Home Buyer" },
  { title: "114 Booka Road", suburb: "Upper Crystal Creek", price: 1375000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 2, cars: 6, land: "101200sqm", type: "acreage", weeks: 12, date: "2024-09-17", buyerType: "Home Buyer" },
  { title: "28 Seafoam Close", suburb: "Varsity Lakes", price: 1975000, agent: "Lee Dowdall", market: "On Market", beds: 5, baths: 3, cars: 2, land: null, type: "house", weeks: 4, date: "2024-09-04", buyerType: "Home Buyer" },
  { title: "157 Warrick Park Rd", suburb: "Wooyung", price: 4950000, agent: "Chris WH", market: "Off Market", beds: 4, baths: 3, cars: 6, land: "20230sqm", type: "acreage", weeks: 2, date: "2024-08-08", buyerType: "Home Buyer" },
  // Additional 11 properties from spreadsheet not yet in Sanity:
  { title: "10/62 Cylinders Drive, Kingscliff", suburb: "Kingscliff", price: 871000, agent: "Harley Peachey", market: "On Market", beds: 2, baths: 2, cars: 1, land: null, type: "apartment", weeks: 6, buyerType: "Investor" },
  { title: "6 Narooma Drive, Pottsville", suburb: "Pottsville", price: 1300000, agent: "Harley Peachey", market: "On Market", beds: 4, baths: 2, cars: 2, land: "658sqm", type: "house", weeks: 4, date: "2024-11-19", buyerType: "Home Buyer" },
  { title: "2/3 Hungerford Lane, Kingscliff", suburb: "Kingscliff", price: 1550000, agent: "Chris WH", market: "Off Market", beds: 3, baths: 2, cars: 2, land: "299sqm", type: "townhouse", weeks: 2, date: "2024-06-26", buyerType: "Investor" },
  { title: "5/14 Dawes Avenue, Kingscliff", suburb: "Kingscliff", price: 925000, agent: "Harley Peachey", market: "Off Market", beds: 0, baths: 0, cars: 0, land: null, type: "land", weeks: 2, date: "2024-06-15", buyerType: "Investor" },
  { title: "23 Glendale Crescent, Ocean Shores", suburb: "Ocean Shores", price: 870000, agent: "Lee Dowdall", market: "On Market", beds: 3, baths: 1, cars: 2, land: "607sqm", type: "house", weeks: 4, date: "2024-09-22", buyerType: "Home Buyer" },
  { title: "38 Pacific Drive, Fingal Head", suburb: "Fingal Head", price: 2490000, agent: "Harley Peachey", market: "On Market", beds: 4, baths: 3, cars: 2, land: "708sqm", type: "house", weeks: 2, date: "2024-11-14", buyerType: "Home Buyer" },
  { title: "10 Rosewood Avenue, Cabarita Beach", suburb: "Cabarita Beach", price: 1725000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 2, land: "507sqm", type: "house", weeks: 4, date: "2024-09-02", buyerType: "Home Buyer" },
  { title: "8 Tasman Parade, Kingscliff", suburb: "Kingscliff", price: 2550000, agent: "Chris WH", market: "Off Market", beds: 4, baths: 2, cars: 2, land: "506sqm", type: "house", weeks: 3, date: "2024-10-01", buyerType: "Home Buyer" },
  { title: "26 Wommin Bay Road, Kingscliff", suburb: "Kingscliff", price: 1875000, agent: "Harley Peachey", market: "Off Market", beds: 3, baths: 2, cars: 2, land: "650sqm", type: "house", weeks: 5, date: "2024-12-19", buyerType: "Home Buyer" },
  { title: "29 Fig Tree Hill Drive, Lennox Head", suburb: "Lennox Head", price: 1920000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 2, cars: 2, land: "613sqm", type: "house", weeks: 6, buyerType: "Home Buyer" },
  { title: "28 Pacific Vista Drive, Byron Bay", suburb: "Byron Bay", price: 3350000, agent: "Lee Dowdall", market: "On Market", beds: 4, baths: 3, cars: 2, land: "647sqm", type: "house", weeks: 4, date: "2024-11-05", buyerType: "Home Buyer" },
];

// ── Agent name normalisation ───────────────────────────────────────────────
const AGENT_MAP = {
  'Chris WH': 'Chris WH',
  'Chris WG': 'Chris WH',  // Same person, different initials in some rows
  'Chris Wallace-Harrison': 'Chris WH',
  'Harley Peachey': 'Harley Peachey',
  'Lee Dowdall': 'Lee Dowdall',
  'Nick GR': 'Nick GR',
};

function normaliseAgent(name) {
  if (!name) return null;
  return AGENT_MAP[name.trim()] || name.trim();
}

// ── Title normalisation for fuzzy matching ─────────────────────────────────
function normTitle(t) {
  if (!t) return '';
  return t.toLowerCase().replace(/[^\w]/g, '');
}

// ── LGA mapping from region ────────────────────────────────────────────────
function regionToLGA(region) {
  if (!region) return null;
  const r = region.toLowerCase();
  if (r.includes('tweed') || r.includes('tweed coast') || r.includes('tweed valley')) return 'Tweed Shire';
  if (r.includes('byron')) return 'Byron Shire';
  if (r.includes('ballina')) return 'Ballina Shire';
  if (r.includes('gold coast')) return 'City of Gold Coast';
  return null;
}

// ── State from suburb ──────────────────────────────────────────────────────
function suburbToState(suburb) {
  const qld = ['Bonogin', 'Currumbin Waters', 'Varsity Lakes', 'Kippa Ring'];
  return qld.includes(suburb) ? 'QLD' : 'NSW';
}

// ── Market visibility mapping ──────────────────────────────────────────────
function marketToVisibility(m) {
  if (!m) return 'on_market';
  return m.toLowerCase().includes('off') ? 'off_market' : 'on_market';
}

// ── Parse land size ────────────────────────────────────────────────────────
function parseLandSize(s) {
  if (!s) return { size: null, unit: 'sqm' };
  const num = parseInt(String(s).replace(/[^\d]/g, ''));
  if (isNaN(num)) return { size: null, unit: 'sqm' };
  // Anything over 10000 sqm = probably worth noting as sqm still
  return { size: num, unit: 'sqm' };
}

// ── Main audit ─────────────────────────────────────────────────────────────
async function main() {
  console.log('=== COMPASS ACQUISITIONS AUDIT ===\n');

  // Fetch all from Sanity
  const sanityDocs = await client.fetch(
    `*[_type == "acquisition"] { _id, title, suburb, purchase_price, beds, baths, cars, agent, realestate_link, excerpt, main_image_url, market_visibility, property_type, purchase_date, price_display, land_size, land_size_unit, state, lga, timeframe, slug }`
  );

  console.log(`Sanity: ${sanityDocs.length} documents`);
  console.log(`Spreadsheet: ${SPREADSHEET.length} properties\n`);

  // Build Sanity lookup by normalised title
  const sanityByTitle = {};
  for (const doc of sanityDocs) {
    sanityByTitle[normTitle(doc.title)] = doc;
  }

  const patches = [];
  const creates = [];
  const issues = [];

  // Cross-reference each spreadsheet row with Sanity
  for (const ss of SPREADSHEET) {
    const key = normTitle(ss.title);
    const doc = sanityByTitle[key];

    if (!doc) {
      // Try fuzzy match (remove suburb from title)
      let found = null;
      for (const [k, v] of Object.entries(sanityByTitle)) {
        if (k.includes(key.slice(0, 15)) || key.includes(k.slice(0, 15))) {
          found = v;
          break;
        }
      }

      if (!found) {
        issues.push(`MISSING: "${ss.title}" not in Sanity`);
        const land = parseLandSize(ss.land);
        creates.push({
          _type: 'acquisition',
          title: ss.title,
          status: 'published',
          suburb: ss.suburb,
          state: suburbToState(ss.suburb),
          lga: regionToLGA(ss.region) || null,
          property_type: ss.type || 'house',
          beds: ss.beds || 0,
          baths: ss.baths || 0,
          cars: ss.cars || 0,
          land_size: land.size,
          land_size_unit: land.unit,
          purchase_price: ss.price,
          purchase_date: ss.date || null,
          agent: normaliseAgent(ss.agent),
          market_visibility: marketToVisibility(ss.market),
          timeframe: ss.weeks ? `${ss.weeks} weeks` : null,
          featured: false,
          slug: { _type: 'slug', current: ss.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 96) },
        });
        continue;
      }
      // Use fuzzy match
      issues.push(`FUZZY MATCH: "${ss.title}" → "${found.title}" (${found._id})`);
      sanityByTitle[key] = found; // update for patch below
    }

    const existing = sanityByTitle[key];
    if (!existing) continue;

    const patch = {};

    // Fix cars (most are 0 in Sanity, spreadsheet has real data)
    if (ss.cars !== null && ss.cars !== undefined && existing.cars !== ss.cars) {
      patch.cars = ss.cars;
      if (existing.cars === 0 && ss.cars > 0) {
        issues.push(`FIX cars: "${existing.title}" ${existing.cars} → ${ss.cars}`);
      }
    }

    // Fix beds (many are 0 in Sanity when they shouldn't be)
    if (ss.beds !== null && ss.beds !== undefined && existing.beds !== ss.beds && ss.beds > 0) {
      patch.beds = ss.beds;
      issues.push(`FIX beds: "${existing.title}" ${existing.beds} → ${ss.beds}`);
    }

    // Fix baths
    if (ss.baths !== null && ss.baths !== undefined && existing.baths !== ss.baths && ss.baths > 0) {
      patch.baths = ss.baths;
      issues.push(`FIX baths: "${existing.title}" ${existing.baths} → ${ss.baths}`);
    }

    // Fix purchase_date (all null in Sanity)
    if (ss.date && !existing.purchase_date) {
      patch.purchase_date = ss.date;
      issues.push(`FIX date: "${existing.title}" null → ${ss.date}`);
    }

    // Fix agent (some null, some inconsistent)
    const normAgent = normaliseAgent(ss.agent);
    if (normAgent && normaliseAgent(existing.agent) !== normAgent) {
      patch.agent = normAgent;
      issues.push(`FIX agent: "${existing.title}" "${existing.agent}" → "${normAgent}"`);
    }

    // Fix property_type (all "house" in Sanity)
    if (ss.type && ss.type !== 'house' && existing.property_type === 'house') {
      patch.property_type = ss.type;
      issues.push(`FIX type: "${existing.title}" house → ${ss.type}`);
    }

    // Fix price (13 Gibson St has $195M, should be $1.95M)
    if (ss.price && existing.purchase_price && Math.abs(existing.purchase_price - ss.price) > ss.price * 0.1) {
      patch.purchase_price = ss.price;
      issues.push(`FIX price: "${existing.title}" $${existing.purchase_price.toLocaleString()} → $${ss.price.toLocaleString()}`);
    }

    // Fix market_visibility
    const expectedVis = marketToVisibility(ss.market);
    if (expectedVis !== existing.market_visibility) {
      patch.market_visibility = expectedVis;
      issues.push(`FIX market: "${existing.title}" ${existing.market_visibility} → ${expectedVis}`);
    }

    // Fix timeframe
    if (ss.weeks && !existing.timeframe) {
      patch.timeframe = `${ss.weeks} weeks`;
    }

    // Fix land_size
    const land = parseLandSize(ss.land);
    if (land.size && !existing.land_size) {
      patch.land_size = land.size;
      patch.land_size_unit = land.unit;
    }

    // Fix state
    const expectedState = suburbToState(ss.suburb);
    if (expectedState !== existing.state) {
      patch.state = expectedState;
    }

    // Fix title encoding issues
    if (existing.title && existing.title.includes('Â')) {
      patch.title = existing.title.replace(/Â/g, '');
      issues.push(`FIX encoding: "${existing.title}" → "${patch.title}"`);
    }

    // Flag base44 image URLs
    if (existing.main_image_url && existing.main_image_url.includes('base44.app')) {
      issues.push(`BASE44 IMAGE: "${existing.title}" still uses base44.app URL`);
    }

    if (Object.keys(patch).length > 0) {
      patches.push({ _id: existing._id, title: existing.title, patch });
    }
  }

  // Report
  console.log('=== ISSUES FOUND ===');
  for (const issue of issues) {
    console.log(`  ${issue}`);
  }

  console.log(`\n=== SUMMARY ===`);
  console.log(`Issues: ${issues.length}`);
  console.log(`Patches needed: ${patches.length}`);
  console.log(`New documents to create: ${creates.length}`);

  // Count base44 images
  const base44Count = sanityDocs.filter(d => d.main_image_url && d.main_image_url.includes('base44.app')).length;
  console.log(`Base44 image URLs to migrate: ${base44Count}`);

  // Output patches
  if (patches.length > 0) {
    console.log('\n=== PATCHES ===');
    for (const p of patches) {
      console.log(`  ${p.title}: ${JSON.stringify(p.patch)}`);
    }
  }

  if (creates.length > 0) {
    console.log('\n=== NEW DOCUMENTS ===');
    for (const c of creates) {
      console.log(`  ${c.title} (${c.suburb}, $${c.purchase_price?.toLocaleString()})`);
    }
  }

  // Apply if not dry run
  if (!DRY_RUN) {
    if (!process.env.SANITY_TOKEN) {
      console.error('\n❌ SANITY_TOKEN required to apply changes');
      process.exit(1);
    }

    console.log('\n=== APPLYING PATCHES ===');
    let success = 0;
    let fail = 0;

    for (const p of patches) {
      try {
        await client.patch(p._id).set(p.patch).commit();
        console.log(`  ✓ ${p.title}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${p.title}: ${e.message}`);
        fail++;
      }
    }

    console.log('\n=== CREATING NEW DOCUMENTS ===');
    for (const c of creates) {
      try {
        const result = await client.create(c);
        console.log(`  ✓ ${c.title} → ${result._id}`);
        success++;
      } catch (e) {
        console.error(`  ✗ ${c.title}: ${e.message}`);
        fail++;
      }
    }

    console.log(`\nDone: ${success} succeeded, ${fail} failed`);
  } else {
    console.log('\n(Dry run — use --apply with SANITY_TOKEN to commit changes)');
  }
}

main().catch(console.error);
