import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

const IMG_DIR = '/Users/danielkovac/Desktop/Roadmap Digital/Clients/Compass/compass-site/processed-images/jpeg';

// Map: post _id → source image filename
// Only posts with genuinely wrong/generic images are listed here.
const REPLACEMENTS = [
  // 0: Byron Bay Property Report — had alpine mountains
  { id: 'Coi90aDgVBbfPSN8wpRCC0',            file: 'byron-bay-1.jpg' },
  // 1: Kingscliff Property Report — had generic Caribbean beach
  { id: 'hmaCzZP5ttuxvyMMguNS9C',             file: 'buyers-agents-kingscliff.jpg' },
  // 2: Burleigh Heads Property Report — had close-up wave (generic stock)
  { id: 'hmaCzZP5ttuxvyMMguNSSO',             file: 'northern-rivers-property.jpg' },
  // 5: Q3 Market Report — had desert-beach aerial
  { id: 'blogPost-68fedd1e871a197a9b256b97',  file: 'q3-market-report.jpg' },
  // 12: Smart Buy — Byron Bay Luxury — duplicate of above aerial
  { id: 'blogPost-698eda811eac2ace049589fe',  file: 'byron-bay-property-market.jpg' },
  // 13: Kingscliff/Cabarita/Pottsville Luxury — had rendered bedroom
  { id: 'blogPost-698edab1650439b91cad2bb5',  file: '1p1671-casuarina-2025-04-22-165728.jpg' },
  // 16: City Life to Coastal Bliss — duplicate beach aerial
  { id: 'blogPost-698edb97c21d4d4f70bdd109',  file: 'content-shoot-july-02.jpg' },
  // 19: Why Top-Earning Professionals — had stock couple-in-kitchen
  { id: 'blogPost-698edc12e1dfab2e67bfdc92',  file: 'buyers-agents-kingscliff.jpg' },
  // 23: Navigating NR Market — duplicate surfer shot
  { id: 'blogPost-698edcad58e02d9542834a0e',  file: 'northern-rivers-real-estate-market-1.jpg' },
  // 24: Local Market Knowledge — had generic scrub beach path
  { id: 'blogPost-698edcd2fbc1362a5b37ce5b',  file: 'tweed-coast.jpg' },
  // 25: Discover Tweed Coast — had wooden staircase (completely wrong)
  { id: 'blogPost-68c2c1b2a73607d8bdc055a4',  file: 'bogangar.jpg' },
  // 26: Coastal Charms Cabarita — had dark architecture render
  { id: 'blogPost-68c2c109d17c006bafb967da',  file: '1p1671-casuarina-2025-04-22-165728.jpg' },
  // 27: How a Buyers Agent Saves Time — same dark architecture render
  { id: 'blogPost-68c2bcb5afb57ae297fdd551',  file: 'buyers-agent-.jpg' },
];

async function uploadImage(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = ext === 'png' ? 'image/png' : 'image/jpeg';

  const result = await client.assets.upload('image', buffer, {
    contentType,
    filename: path.basename(filePath),
  });

  return result._id; // e.g. "image-abc123-2000x1333-jpg"
}

async function run() {
  // Deduplicate uploads — same file used for multiple posts only uploads once
  const fileToAssetId = new Map();

  let patched = 0;
  let failed = 0;

  for (const { id, file } of REPLACEMENTS) {
    const filePath = path.join(IMG_DIR, file);

    if (!fs.existsSync(filePath)) {
      console.log(`  MISSING file: ${file} — skipping post ${id}`);
      failed++;
      continue;
    }

    try {
      // Reuse asset if already uploaded this run
      let assetId = fileToAssetId.get(file);
      if (!assetId) {
        process.stdout.write(`  Uploading ${file}… `);
        assetId = await uploadImage(filePath);
        fileToAssetId.set(file, assetId);
        console.log(`✓ ${assetId}`);
      } else {
        console.log(`  Reusing ${assetId} for ${file}`);
      }

      await client
        .patch(id)
        .set({
          image: {
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
          },
        })
        .commit();

      console.log(`  PATCHED: ${id}`);
      patched++;
    } catch (err) {
      console.error(`  ERROR on ${id}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\nDone. Patched: ${patched}, Failed: ${failed}`);
}

run().catch(console.error);
