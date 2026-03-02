import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'seoFields',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Page title shown in search results and browser tab. 50-60 characters ideal.',
      validation: Rule => Rule.max(70).warning('Meta titles over 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Page description shown in search results. 120-160 characters ideal.',
      validation: Rule => Rule.max(170).warning('Meta descriptions over 160 characters may be truncated.'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Share Image (OG)',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown when the page is shared on social media. 1200x630px recommended.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Only set if this page duplicates content from another URL.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      initialValue: false,
      description: 'Enable to add noindex — page will not appear in Google.',
    }),
  ],
});
