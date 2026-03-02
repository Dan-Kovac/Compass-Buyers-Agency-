export default {
  name: 'areasPage',
  title: 'Areas Page',
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
      initialValue: 'Areas We Serve',
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'text',
      rows: 3,
      initialValue: 'Compass Buyers Agency services buyers across Byron Shire, Tweed Shire, Ballina Shire and the City of Gold Coast.',
    },

    // ─── SHIRES ───────────────────────────────────────────────────────────────
    // Each shire has a title, image, and a list of suburbs
    {
      name: 'shires',
      title: 'Shires / Regions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Shire / Region Name', type: 'string' },
            {
              name: 'image',
              title: 'Shire Image',
              type: 'image',
              options: { hotspot: true },
            },
            {
              name: 'suburbs',
              title: 'Suburbs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'name', title: 'Suburb Name', type: 'string' },
                    {
                      name: 'isLive',
                      title: 'Has Profile Page?',
                      type: 'boolean',
                      initialValue: false,
                    },
                    {
                      name: 'slug',
                      title: 'Blog Profile Slug (if live)',
                      type: 'string',
                      description: 'e.g. byron-bay-market-update',
                    },
                  ],
                  preview: { select: { title: 'name' } },
                },
              ],
            },
          ],
          preview: { select: { title: 'title', media: 'image' } },
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
          initialValue: 'Ready to Find Your Property?',
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
      return { title: 'Areas Page' };
    },
  },
};
