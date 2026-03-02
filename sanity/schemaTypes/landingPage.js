import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
      description: 'Internal reference name, e.g. "Byron Bay Buyers Agent"',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', slugify: input => input.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') },
      validation: Rule => Rule.required(),
      description: 'e.g. byron-bay-buyers-agent',
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Byron Shire', value: 'byron' },
          { title: 'Tweed Shire', value: 'tweed' },
          { title: 'Ballina Shire', value: 'ballina' },
          { title: 'Gold Coast', value: 'gold-coast' },
          { title: 'Lismore / Northern Rivers', value: 'northern-rivers' },
        ],
      },
    }),

    // ─── SEO ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    }),

    // ─── HERO ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
    }),

    // ─── MARKET STATS BAR ─────────────────────────────────────────────────────
    defineField({
      name: 'marketStats',
      title: 'Market Stats Bar',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'value', title: 'Value', type: 'string' }),
          defineField({ name: 'label', title: 'Label', type: 'string' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
      validation: Rule => Rule.max(4),
    }),

    // ─── INFO SPLIT SECTIONS ──────────────────────────────────────────────────
    defineField({
      name: 'infoSplits',
      title: 'Info Split Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Section Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
          defineField({
            name: 'bullets',
            title: 'Bullet Points',
            type: 'array',
            of: [{ type: 'string' }],
          }),
          defineField({
            name: 'image',
            title: 'Section Image',
            type: 'image',
            options: { hotspot: true },
          }),
          defineField({
            name: 'imageSide',
            title: 'Image Position',
            type: 'string',
            options: { list: ['left', 'right'] },
            initialValue: 'right',
          }),
        ],
        preview: { select: { title: 'title' } },
      }],
    }),

    // ─── SUBURBS ──────────────────────────────────────────────────────────────
    defineField({
      name: 'suburbs',
      title: 'Suburbs List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Suburbs served in this area.',
    }),

    // ─── APPROACH ─────────────────────────────────────────────────────────────
    defineField({
      name: 'approach',
      title: 'Our Approach Section',
      type: 'object',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 4 }),
        defineField({
          name: 'bullets',
          title: 'Key Points',
          type: 'array',
          of: [{ type: 'string' }],
        }),
      ],
    }),

    // ─── FAQ ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'faqItems',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 5 }),
          defineField({
            name: 'bullets',
            title: 'Answer Bullets (optional)',
            type: 'array',
            of: [{ type: 'string' }],
            description: 'Additional bullet points below the answer text.',
          }),
        ],
        preview: { select: { title: 'question' } },
      }],
    }),

    // ─── VIDEO TESTIMONIALS ───────────────────────────────────────────────────
    defineField({
      name: 'testimonialVideos',
      title: 'Video Testimonials',
      type: 'array',
      of: [{ type: 'testimonialVideo' }],
    }),

    // ─── CTA ──────────────────────────────────────────────────────────────────
    defineField({
      name: 'ctaHeading',
      title: 'CTA Heading',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Book a Free Consultation',
    }),

    // ─── JSON-LD ──────────────────────────────────────────────────────────────
    defineField({
      name: 'jsonLd',
      title: 'Custom JSON-LD',
      type: 'text',
      rows: 10,
      description: 'Optional override for structured data. Leave blank to auto-generate.',
    }),
  ],

  preview: {
    select: { title: 'title', subtitle: 'region' },
  },

  orderings: [
    { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
});
