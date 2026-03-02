export default {
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [

    // ─── SEO ────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    },

    // ─── PAGE HEADER ─────────────────────────────────────────────────────────
    {
      name: 'heading',
      title: 'Page Heading (H1)',
      type: 'string',
      initialValue: 'Our Team',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 3,
    },

    // ─── FEATURE SPLIT 1 ─────────────────────────────────────────────────────
    {
      name: 'featureSplit1',
      title: 'Feature Section 1',
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

    // ─── FEATURE SPLIT 2 ─────────────────────────────────────────────────────
    {
      name: 'featureSplit2',
      title: 'Feature Section 2',
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

    // ─── TEAM SECTION HEADING ─────────────────────────────────────────────────
    // Individual team members come from Base44 CMS — only the section heading is editable here
    {
      name: 'teamSectionHeading',
      title: 'Team Section Heading',
      type: 'string',
      initialValue: 'Meet Your Property Experts',
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
      return { title: 'About Page' };
    },
  },
};
