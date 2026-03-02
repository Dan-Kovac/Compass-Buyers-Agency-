export default {
  name: 'privacyPolicyPage',
  title: 'Privacy Policy Page',
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
      initialValue: 'Privacy Policy',
    },

    // ─── BODY CONTENT ────────────────────────────────────────────────────────
    // Full portable text so the client can edit the entire policy document
    {
      name: 'body',
      title: 'Policy Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Underline', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  { name: 'href', title: 'URL', type: 'url' },
                ],
              },
            ],
          },
        },
      ],
      description: 'Full privacy policy text. You can edit headings and paragraphs here.',
    },

    // ─── LAST UPDATED ─────────────────────────────────────────────────────────
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'string',
      initialValue: 'February 2026',
      description: 'Displayed at the bottom of the policy page.',
    },

    // ─── ABN ─────────────────────────────────────────────────────────────────
    {
      name: 'abn',
      title: 'ABN',
      type: 'string',
      description: 'Appears in the opening paragraph. e.g. 12 345 678 901',
    },

  ],
  preview: {
    prepare() {
      return { title: 'Privacy Policy Page' };
    },
  },
};
