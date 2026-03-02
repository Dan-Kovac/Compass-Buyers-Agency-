#!/usr/bin/env node
/**
 * populate-seo.mjs — Populates SEO fields in Sanity for all pages.
 *
 * Usage:
 *   cd /Users/danielkovac/Desktop/compass-site/sanity
 *   node scripts/populate-seo.mjs
 *
 * This script writes metaTitle, metaDescription, and canonicalUrl
 * to each page document's `seo` object. Data sourced from
 * Compass-SEO-Map.xlsx (hardcoded below for reliability).
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Set in env before running
});

const SEO_DATA = [
  {
    _id: 'homePage',
    seo: {
      metaTitle: 'Buyers Agent Byron Bay to Gold Coast | Compass',
      metaDescription: 'Byron Bay to Gold Coast buyers agent. $2.45M median Byron, $1.65M Tweed. 42% of our deals are off-market. We find, assess, negotiate.',
      canonicalUrl: 'https://compassagency.com.au/',
    },
  },
  {
    _id: 'servicesPage',
    seo: {
      metaTitle: 'Buyers Agent Services | Search to Settlement | Compass',
      metaDescription: 'Full-service buyer advocacy from search to settlement. Property sourcing, auction bidding, negotiation and portfolio strategy across Northern Rivers and Gold Coast.',
      canonicalUrl: 'https://compassagency.com.au/services',
    },
  },
  {
    _id: 'whoWeWorkWithPage',
    seo: {
      metaTitle: 'Who We Work With | First Home to Prestige | Compass',
      metaDescription: 'Buyers agent for first home buyers, downsizers, investors, interstate movers and prestige buyers. Nine buyer segments, one process.',
      canonicalUrl: 'https://compassagency.com.au/who-we-work-with',
    },
  },
  {
    _id: 'aboutPage',
    seo: {
      metaTitle: 'Our Team | Compass Buyers Agency',
      metaDescription: 'Meet the Compass team. Licensed buyers agents with street-level knowledge across Byron Bay, the Tweed Coast and Southern Gold Coast.',
      canonicalUrl: 'https://compassagency.com.au/about',
    },
  },
  {
    _id: 'areasPage',
    seo: {
      metaTitle: 'Areas We Serve | Byron to Gold Coast | Compass',
      metaDescription: 'Buyers agent covering Byron, Ballina, Tweed and Gold Coast shires. 24 suburbs from $850k to $2.95M. Local street-level knowledge.',
      canonicalUrl: 'https://compassagency.com.au/areas',
    },
  },
  {
    _id: 'contactPage',
    seo: {
      metaTitle: 'Contact Us | Talk to a Buyers Agent | Compass',
      metaDescription: 'Talk to a buyers agent today. Call 0403 536 390 or visit us at 32a Tweed Coast Road, Cabarita Beach. Free initial consultation.',
      canonicalUrl: 'https://compassagency.com.au/contact',
    },
  },
  {
    _id: 'privacyPolicyPage',
    seo: {
      metaTitle: 'Privacy Policy | Compass Buyers Agency',
      metaDescription: 'Privacy policy for Compass Buyers Agency. How we collect, use and protect your personal information under the Privacy Act 1988.',
      canonicalUrl: 'https://compassagency.com.au/privacy-policy',
      noIndex: true,
    },
  },
];

async function main() {
  console.log('Populating SEO data for', SEO_DATA.length, 'pages...\n');

  for (const page of SEO_DATA) {
    try {
      await client.patch(page._id)
        .set({ seo: page.seo })
        .commit();
      console.log(`  ✓ ${page._id} — "${page.seo.metaTitle}"`);
    } catch (err) {
      console.error(`  ✗ ${page._id} — ${err.message}`);
    }
  }

  console.log('\nDone! SEO data populated for all singleton pages.');
  console.log('\nNote: Landing page SEO should be set in Sanity Studio');
  console.log('directly on each landingPage document.');
}

main().catch(console.error);
