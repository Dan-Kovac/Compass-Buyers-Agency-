export default {
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [

    // ─── PAGE HEADER ─────────────────────────────────────────────────────────
    {
      name: 'heading',
      title: 'Page Heading (H1)',
      type: 'string',
      initialValue: 'Buyers Agent Services',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 3,
    },

    // ─── SERVICE SEGMENTS ─────────────────────────────────────────────────────
    // 4 segments: Full Search, Auction, Due Diligence, Vendor Advocacy
    {
      name: 'segments',
      title: 'Service Segments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Segment Title', type: 'string' },
            { name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 3 },
            {
              name: 'needs',
              title: 'Client Needs (bullet list)',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'howWeHelp',
              title: 'How We Help (bullet list)',
              type: 'array',
              of: [{ type: 'string' }],
            },
            {
              name: 'image',
              title: 'Section Image',
              type: 'image',
              options: { hotspot: true },
            },
            { name: 'imageAlt', title: 'Image Alt Text', type: 'string' },
          ],
          preview: { select: { title: 'title' } },
        },
      ],
      validation: Rule => Rule.max(4),
    },

    // ─── PROCESS STEPS ────────────────────────────────────────────────────────
    {
      name: 'process',
      title: 'Our Process Steps',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Our Process',
        },
        {
          name: 'steps',
          title: 'Steps',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'stepNumber', title: 'Step Number', type: 'string' },
                { name: 'title', title: 'Step Title', type: 'string' },
                { name: 'description', title: 'Step Description', type: 'text', rows: 2 },
              ],
              preview: { select: { title: 'title' } },
            },
          ],
          validation: Rule => Rule.max(7),
        },
      ],
    },

    // ─── WHY CHOOSE US (Feature Split at bottom) ──────────────────────────────
    {
      name: 'whyChooseUs',
      title: 'Why Choose Us (Feature Split)',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Heading',
          type: 'string',
        },
        {
          name: 'description',
          title: 'Body Text',
          type: 'text',
          rows: 5,
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
        },
      ],
    },

    // ─── CTA SECTION ─────────────────────────────────────────────────────────
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Ready to get started?',
        },
        {
          name: 'buttonText',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Get in touch',
        },
      ],
    },

  ],
  preview: {
    prepare() {
      return { title: 'Services Page' };
    },
  },
};
