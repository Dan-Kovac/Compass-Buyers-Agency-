/**
 * Mark 351 Cudgen Rd as off-market and remove the realestate.com.au link.
 *
 * Run from repo root:
 *   SANITY_AUTH_TOKEN=<editor-token> node sanity/scripts/fix-cudgen-rd.mjs
 *
 * Get a token at https://www.sanity.io/manage > project 31tdhl52 > API > Tokens (Editor permissions).
 */
import { createClient } from '@sanity/client';

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error('Missing SANITY_AUTH_TOKEN env var.');
  process.exit(1);
}

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const matches = await client.fetch(
  `*[_type == "acquisition" && (title match "*351*Cudgen*" || title match "*Cudgen*351*")]{_id, title, market_visibility, realestate_link}`
);

if (matches.length === 0) {
  console.error('No acquisition matched "351 Cudgen". Aborting.');
  process.exit(1);
}
if (matches.length > 1) {
  console.error('Multiple matches — review and narrow query:', matches);
  process.exit(1);
}

const doc = matches[0];
console.log('Updating:', doc);

await client
  .patch(doc._id)
  .set({ market_visibility: 'off_market' })
  .unset(['realestate_link'])
  .commit();

console.log('Done. 351 Cudgen Rd is now off-market and the realestate link is cleared.');
