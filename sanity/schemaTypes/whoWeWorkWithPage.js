export default {
  name: 'whoWeWorkWithPage',
  title: 'Who We Work With Page',
  type: 'document',
  fields: [

    // ─── PAGE HEADER ─────────────────────────────────────────────────────────
    {
      name: 'heading',
      title: 'Page Heading (H1)',
      type: 'string',
      initialValue: 'Who We Work With',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'From first-home buyers to seasoned investors and relocators, we tailor our service to your goals, timelines and budget.',
    },

    // ─── BUYER SEGMENTS ───────────────────────────────────────────────────────
    // 9 segments: First Home Buyers, Downsizers, Investors, Interstate,
    //             International, Rural & Acreage, Commercial, Developers, Prestige
    {
      name: 'segments',
      title: 'Buyer Segments',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'id',
              title: 'Anchor ID (no spaces)',
              type: 'slug',
              description: 'Used for in-page navigation. e.g. first-home-buyers',
              options: { source: 'title' },
            },
            { name: 'title', title: 'Segment Title', type: 'string' },
            { name: 'intro', title: 'Intro Paragraph', type: 'text', rows: 2 },
            {
              name: 'needs',
              title: 'Client Needs (bullet list)',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.max(4),
            },
            {
              name: 'howWeHelp',
              title: 'How We Help (bullet list)',
              type: 'array',
              of: [{ type: 'string' }],
              validation: Rule => Rule.max(4),
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
      validation: Rule => Rule.max(9),
    },

    // ─── CTA SECTION ─────────────────────────────────────────────────────────
    {
      name: 'cta',
      title: 'CTA Section',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow Label',
          type: 'string',
          initialValue: "Let's Talk About Your Goals",
        },
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Ready to Get Started?',
        },
        {
          name: 'buttonText',
          title: 'Button Label',
          type: 'string',
          initialValue: 'Book a Free Consultation',
        },
      ],
    },

  ],
  preview: {
    prepare() {
      return { title: 'Who We Work With Page' };
    },
  },
};
