import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './schemaTypes/index';

const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // ── Blog ──────────────────────────────────────────────────────────────
      S.documentTypeListItem('blogPost').title('Blog Posts'),

      S.divider(),

      // ── Acquisitions ──────────────────────────────────────────────────────
      S.documentTypeListItem('acquisition').title('Acquisitions'),

      S.divider(),

      // ── Team ──────────────────────────────────────────────────────────────
      S.documentTypeListItem('teamMember').title('Team Members'),

      S.divider(),

      // ── Social proof ──────────────────────────────────────────────────────
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('caseStudy').title('Case Studies'),
    ]);

export default defineConfig({
  name: 'compass-buyers-agency',
  title: 'Compass Buyers Agency',

  projectId: '31tdhl52',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
