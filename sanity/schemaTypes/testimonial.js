import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Client Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'location', title: 'Location (e.g. "Byron Bay")', type: 'string' }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: Rule => Rule.required() }),
    defineField({ name: 'photo_url', title: 'Client Photo URL', type: 'url' }),
    defineField({ name: 'rating', title: 'Rating (out of 5)', type: 'number', initialValue: 5, validation: Rule => Rule.min(1).max(5) }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Published', value: 'published' }, { title: 'Draft', value: 'draft' }] }, initialValue: 'published' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'location' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle || '' };
    },
  },
});
