export default {
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [

    // ─── PAGE HEADER ─────────────────────────────────────────────────────────
    {
      name: 'heading',
      title: 'Page Heading (H1)',
      type: 'string',
      initialValue: 'Talk to a Buyers Agent',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
      initialValue: 'Free consultation. No obligation. We\'ll answer your questions and outline how we can help.',
    },

    // ─── CONTACT DETAILS ─────────────────────────────────────────────────────
    {
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      initialValue: '0403 536 390',
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

    // ─── OFFICE IMAGE ─────────────────────────────────────────────────────────
    {
      name: 'officeImage',
      title: 'Office Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'officeImageAlt',
      title: 'Office Image Alt Text',
      type: 'string',
      initialValue: 'Compass office exterior',
    },

    // ─── SLIDE-OUT FORM HEADINGS ──────────────────────────────────────────────
    {
      name: 'formTitle',
      title: 'Slide-out Form Title',
      type: 'string',
      initialValue: 'Tell Us About Your Property',
    },
    {
      name: 'formSubtitle',
      title: 'Slide-out Form Subtitle',
      type: 'string',
      initialValue: 'Share a few details and we\'ll be in touch within 24 hours.',
    },

    // ─── CTA BUTTONS ─────────────────────────────────────────────────────────
    {
      name: 'bookCallLabel',
      title: 'Book a Call Button Label',
      type: 'string',
      initialValue: 'Book a call',
    },
    {
      name: 'sendEmailLabel',
      title: 'Send Email Button Label',
      type: 'string',
      initialValue: 'Send an email',
    },

  ],
  preview: {
    prepare() {
      return { title: 'Contact Page' };
    },
  },
};
