export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Only one document of this type should ever exist
  __experimental_actions: ['update', 'publish'],
  fields: [

    // ─── GLOBAL IDENTITY ─────────────────────────────────────────────────────
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Compass Buyers Agency',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Northern NSW & Gold Coast Buyer Advocates',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: false },
    },
    {
      name: 'logoAlt',
      title: 'Logo (dark / footer variant)',
      type: 'image',
      options: { hotspot: false },
    },

    // ─── CONTACT DETAILS ─────────────────────────────────────────────────────
    // Single source of truth — used in nav, footer, contact page, JSON-LD
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '0403 536 390',
      description: 'Display format. e.g. 0403 536 390',
    },
    {
      name: 'phoneRaw',
      title: 'Phone Number (raw, no spaces)',
      type: 'string',
      initialValue: '0403536390',
      description: 'Used in tel: href. e.g. 0403536390',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      initialValue: 'hello@compassbuyersagency.com.au',
    },
    {
      name: 'address',
      title: 'Street Address',
      type: 'string',
      initialValue: '32a Tweed Coast Road Cabarita Beach, NSW 2487',
    },

    // ─── SOCIAL LINKS ─────────────────────────────────────────────────────────
    {
      name: 'facebookUrl',
      title: 'Facebook URL',
      type: 'url',
    },
    {
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    },

    // ─── NAV CTA ─────────────────────────────────────────────────────────────
    {
      name: 'navCtaLabel',
      title: 'Nav CTA Button Label',
      type: 'string',
      initialValue: 'Book a Call',
    },

    // ─── FOOTER ───────────────────────────────────────────────────────────────
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'footerCopyrightName',
      title: 'Footer Copyright Business Name',
      type: 'string',
      initialValue: 'Compass Buyers Agency',
    },
    {
      name: 'licenceNumber',
      title: 'Licence Number',
      type: 'string',
      description: 'Displayed in footer. e.g. Licence No. 123456',
    },
    {
      name: 'abn',
      title: 'ABN',
      type: 'string',
      description: 'Displayed in footer and Privacy Policy.',
    },

    // ─── DEFAULT SEO ─────────────────────────────────────────────────────────
    {
      name: 'defaultMetaTitle',
      title: 'Default Meta Title',
      type: 'string',
    },
    {
      name: 'defaultMetaDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'defaultOgImage',
      title: 'Default OG / Share Image',
      type: 'image',
      options: { hotspot: true },
    },

  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' };
    },
  },
};
