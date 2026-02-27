import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }] }, initialValue: 'draft' }),
    defineField({ name: 'property_type', title: 'Property Type', type: 'string', options: { list: ['house', 'apartment', 'townhouse', 'acreage', 'investment', 'commercial'] } }),
    defineField({ name: 'location', title: 'Location', type: 'string', options: { list: ['Byron Bay', 'Ballina', 'Kingscliff', 'Cabarita', 'Tweed Heads', 'Mullumbimby', 'Lennox Head', 'Other'] } }),
    defineField({ name: 'client_type', title: 'Client Type', type: 'string', options: { list: ['first-home-buyer', 'upgrader', 'investor', 'interstate-relocator', 'international-buyer', 'downsizer'] } }),
    defineField({ name: 'purchase_price', title: 'Purchase Price', type: 'string' }),
    defineField({ name: 'timeframe', title: 'Timeframe', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Content (HTML)', type: 'text', rows: 20 }),
    defineField({ name: 'featured_image', title: 'Featured Image URL', type: 'url' }),
    defineField({ name: 'client_name', title: 'Client Name', type: 'string' }),
    defineField({ name: 'client_testimonial', title: 'Client Testimonial', type: 'text', rows: 3 }),
    defineField({ name: 'challenges_overcome', title: 'Challenges Overcome', type: 'text', rows: 4 }),
    defineField({ name: 'results_achieved', title: 'Results Achieved', type: 'text', rows: 4 }),
    defineField({ name: 'property_images', title: 'Property Image URLs', type: 'array', of: [{ type: 'url' }] }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'published_date', title: 'Published Date', type: 'date' }),
    defineField({ name: 'meta_title', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'meta_description', title: 'Meta Description', type: 'text', rows: 2 }),
  ],
  preview: {
    select: { title: 'title', location: 'location', status: 'status' },
    prepare({ title, location, status }) {
      return { title, subtitle: `${location || ''} · ${status === 'published' ? '✅' : '📝'}` };
    },
  },
  orderings: [
    { title: 'Published Date, New', name: 'publishedDateDesc', by: [{ field: 'published_date', direction: 'desc' }] },
  ],
});
