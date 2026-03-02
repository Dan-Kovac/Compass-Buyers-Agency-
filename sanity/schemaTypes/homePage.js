export default {
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [

    // ─── SEO ────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
    },

    // ─── HERO ───────────────────────────────────────────────────────────────
    {
      name: 'hero',
      title: 'Hero',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Heading',
          type: 'string',
          initialValue: 'Property Acquisition Experts',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 3,
          initialValue: 'Leading Northern NSW & Gold Coast Buyer Advocates',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'ctaText',
          title: 'CTA Button Label',
          type: 'string',
          initialValue: 'Book a Free Consultation',
        },
      ],
    },

    // ─── ABOUT / REVIEW STRIP ───────────────────────────────────────────────
    {
      name: 'aboutExpertise',
      title: 'About / Review Strip',
      type: 'object',
      fields: [
        {
          name: 'quoteText',
          title: 'Quote Text',
          type: 'text',
          rows: 3,
        },
        {
          name: 'authorName',
          title: 'Author Name',
          type: 'string',
          initialValue: 'Mick Caine',
        },
        {
          name: 'authorRole',
          title: 'Author Role',
          type: 'string',
          initialValue: 'Property buyer',
        },
        {
          name: 'authorAvatar',
          title: 'Author Avatar',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

    // ─── SERVICES ACCORDION ─────────────────────────────────────────────────
    {
      name: 'servicesAccordion',
      title: 'Services Accordion Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Explore Our Services',
        },
        {
          name: 'teamImage',
          title: 'Team Image (right side)',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'items',
          title: 'Accordion Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Item Title', type: 'string' },
                { name: 'description', title: 'Item Description', type: 'text', rows: 3 },
              ],
              preview: { select: { title: 'title' } },
            },
          ],
        },
      ],
    },

    // ─── ACQUISITIONS STRIP (eyebrow + headings only — cards are CMS) ───────
    {
      name: 'acquisitionsStrip',
      title: 'Recent Acquisitions Strip (text only)',
      type: 'object',
      fields: [
        {
          name: 'eyebrow',
          title: 'Eyebrow Label',
          type: 'string',
          initialValue: 'Recent Acquisitions',
        },
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
        },
        {
          name: 'subheading',
          title: 'Subheading',
          type: 'text',
          rows: 2,
        },
      ],
    },

    // ─── RELATIONSHIP SECTION ───────────────────────────────────────────────
    {
      name: 'relationship',
      title: 'Relationship-First Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'A Relationship-First Approach',
        },
        {
          name: 'body',
          title: 'Body Paragraph',
          type: 'text',
          rows: 4,
        },
        {
          name: 'checklistItems',
          title: 'Checklist Items (max 3)',
          type: 'array',
          of: [{ type: 'string' }],
          validation: Rule => Rule.max(3),
        },
        {
          name: 'image',
          title: 'Photo',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },

    // ─── WHY COMPASS STANDS OUT ─────────────────────────────────────────────
    {
      name: 'whyCompass',
      title: 'Why Compass Stands Out',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Why Compass Stands Out',
        },
        {
          name: 'cards',
          title: 'Feature Cards (max 6)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'title', title: 'Card Title', type: 'string' },
                { name: 'description', title: 'Card Description', type: 'text', rows: 2 },
              ],
              preview: { select: { title: 'title' } },
            },
          ],
          validation: Rule => Rule.max(6),
        },
      ],
    },

    // ─── REGIONS ────────────────────────────────────────────────────────────
    {
      name: 'regions',
      title: 'Areas We Serve',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Areas We Serve',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
        },
        {
          name: 'items',
          title: 'Region Cards (max 3)',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'label', title: 'Region Name', type: 'string' },
                {
                  name: 'image',
                  title: 'Region Image',
                  type: 'image',
                  options: { hotspot: true },
                },
              ],
              preview: { select: { title: 'label', media: 'image' } },
            },
          ],
          validation: Rule => Rule.max(3),
        },
        {
          name: 'ctaText',
          title: 'CTA Button Label',
          type: 'string',
          initialValue: 'Explore All Areas',
        },
      ],
    },

    // ─── HOME FAQ ────────────────────────────────────────────────────────────
    {
      name: 'faq',
      title: 'FAQ Section',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Section Heading',
          type: 'string',
          initialValue: 'Frequently Asked Questions',
        },
        {
          name: 'items',
          title: 'FAQ Items',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'question', title: 'Question', type: 'string' },
                { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
              ],
              preview: { select: { title: 'question' } },
            },
          ],
        },
      ],
    },

    // ─── CONTACT STRIP ───────────────────────────────────────────────────────
    {
      name: 'contactStrip',
      title: 'Contact Strip',
      type: 'object',
      fields: [
        {
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Get Started',
        },
        {
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
          rows: 2,
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: { hotspot: true },
        },
        {
          name: 'primaryButtonLabel',
          title: 'Primary Button Label',
          type: 'string',
          initialValue: 'Book a Free Consultation',
        },
        {
          name: 'secondaryButtonLabel',
          title: 'Secondary Button Label',
          type: 'string',
          initialValue: 'Call Us Now',
        },
      ],
    },

    // ─── VIDEO TESTIMONIALS ─────────────────────────────────────────────────
    {
      name: 'testimonialVideos',
      title: 'Video Testimonials',
      type: 'array',
      of: [{ type: 'testimonialVideo' }],
    },

  ],
  preview: {
    prepare() {
      return { title: 'Home Page' };
    },
  },
};
