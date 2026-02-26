import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes/index';

// ─── Singleton structure ─────────────────────────────────────────────────────
// Each page document only ever has one instance (no list view — just open the doc).
const singletons = [
  'siteSettings',
  'homePage',
  'aboutPage',
  'servicesPage',
  'contactPage',
  'areasPage',
  'whoWeWorkWithPage',
  'privacyPolicyPage',
];

const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),

      S.listItem()
        .title('About Page')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

      S.listItem()
        .title('Services Page')
        .id('servicesPage')
        .child(S.document().schemaType('servicesPage').documentId('servicesPage')),

      S.listItem()
        .title('Contact Page')
        .id('contactPage')
        .child(S.document().schemaType('contactPage').documentId('contactPage')),

      S.listItem()
        .title('Areas Page')
        .id('areasPage')
        .child(S.document().schemaType('areasPage').documentId('areasPage')),

      S.listItem()
        .title('Who We Work With Page')
        .id('whoWeWorkWithPage')
        .child(S.document().schemaType('whoWeWorkWithPage').documentId('whoWeWorkWithPage')),

      S.listItem()
        .title('Privacy Policy Page')
        .id('privacyPolicyPage')
        .child(S.document().schemaType('privacyPolicyPage').documentId('privacyPolicyPage')),
    ]);

export default defineConfig({
  name: 'compass-buyers-agency',
  title: 'Compass Buyers Agency',

  // ⚠️  Fill these in after running `sanity init` — they come from sanity.io/manage
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Prevent the studio from showing a "create new" button for singleton types
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },

  document: {
    // Hide "New document" action for singleton types
    actions: (prev, context) =>
      singletons.includes(context.schemaType)
        ? prev.filter(({ action }) => !['duplicate', 'delete'].includes(action))
        : prev,
  },
});
