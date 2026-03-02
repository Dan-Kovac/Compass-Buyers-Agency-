/**
 * Seed SEO data from the spreadsheet into Sanity singleton page documents.
 *
 * Usage:
 *   node scripts/seed-seo.mjs
 *
 * Requires: SANITY_TOKEN env var (write token from manage.sanity.io)
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const SEO_DATA = [
  {
    docId: 'homePage',
    seo: {
      metaTitle: 'Buyers Agent Byron Bay to Gold Coast | Compass',
      metaDescription: 'Byron Bay to Gold Coast buyers agent. $2.45M median Byron, $1.65M Tweed. 42% of our deals are off-market. We find, assess, negotiate.',
      canonicalUrl: 'https://compassagency.com.au/',
      noIndex: false,
    },
  },
  {
    docId: 'servicesPage',
    seo: {
      metaTitle: 'Buyers Agent Services | Search to Settlement | Compass',
      metaDescription: 'Full-service buyer advocacy from search to settlement. Property sourcing, auction bidding, negotiation and portfolio strategy across Northern Rivers and Gold Coast.',
      canonicalUrl: 'https://compassagency.com.au/services',
      noIndex: false,
    },
  },
  {
    docId: 'whoWeWorkWithPage',
    seo: {
      metaTitle: 'Who We Work With | First Home to Prestige | Compass',
      metaDescription: 'Buyers agent for first home buyers, downsizers, investors, interstate movers and prestige buyers. Nine buyer segments, one process.',
      canonicalUrl: 'https://compassagency.com.au/who-we-work-with',
      noIndex: false,
    },
  },
  {
    docId: 'aboutPage',
    seo: {
      metaTitle: 'Our Team | Compass Buyers Agency',
      metaDescription: 'Meet the Compass team. Licensed buyers agents with street-level knowledge across Byron Bay, the Tweed Coast and Southern Gold Coast.',
      canonicalUrl: 'https://compassagency.com.au/about',
      noIndex: false,
    },
  },
  {
    docId: 'areasPage',
    seo: {
      metaTitle: 'Areas We Serve | Byron to Gold Coast | Compass',
      metaDescription: 'Buyers agent covering Byron, Ballina, Tweed and Gold Coast shires. 24 suburbs from $850k to $2.95M. Local street-level knowledge.',
      canonicalUrl: 'https://compassagency.com.au/areas',
      noIndex: false,
    },
  },
  {
    docId: 'contactPage',
    seo: {
      metaTitle: 'Contact Us | Talk to a Buyers Agent | Compass',
      metaDescription: 'Talk to a buyers agent today. Call 0403 536 390 or visit us at 32a Tweed Coast Road, Cabarita Beach. Free initial consultation.',
      canonicalUrl: 'https://compassagency.com.au/contact',
      noIndex: false,
    },
  },
  {
    docId: 'privacyPolicyPage',
    seo: {
      metaTitle: 'Privacy Policy | Compass Buyers Agency',
      metaDescription: 'Privacy policy for Compass Buyers Agency. How we collect, use and protect your personal information under the Privacy Act 1988.',
      canonicalUrl: 'https://compassagency.com.au/privacy-policy',
      noIndex: false,
    },
  },
];

async function main() {
  console.log('Seeding SEO data into Sanity...\n');

  for (const { docId, seo } of SEO_DATA) {
    try {
      await client.patch(docId).set({ seo }).commit();
      console.log(`  ✓ ${docId} — "${seo.metaTitle}"`);
    } catch (err) {
      console.error(`  ✗ ${docId} — ${err.message}`);
    }
  }

  console.log('\nDone.');
}

main();
