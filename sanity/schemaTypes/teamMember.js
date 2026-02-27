import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'position', title: 'Position / Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 6, validation: Rule => Rule.required() }),
    defineField({ name: 'photo', title: 'Photo URL', type: 'url' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'credentials', title: 'Credentials', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'specialties', title: 'Specialties', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'linkedin_url', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'intro_video_url', title: 'Intro Video URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'active', title: 'Active', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'position', active: 'active' },
    prepare({ title, subtitle, active }) {
      return { title, subtitle: `${subtitle || ''}${active === false ? ' · Hidden' : ''}` };
    },
  },
  orderings: [
    { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
});
