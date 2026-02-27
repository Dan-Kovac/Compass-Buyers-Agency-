import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: Rule => Rule.required() }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }] }, initialValue: 'draft' }),
    defineField({ name: 'category', title: 'Category', type: 'string', options: { list: ['market-insights', 'buying-tips', 'local-knowledge', 'case-studies', 'industry-news', 'suburb-profiles'] } }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'author', title: 'Author', type: 'string' }),
    defineField({ name: 'featured_image', title: 'Featured Image URL', type: 'url' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'content', title: 'Content (HTML)', type: 'text', rows: 20 }),
    defineField({ name: 'published_date', title: 'Published Date', type: 'date' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'meta_title', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'meta_description', title: 'Meta Description', type: 'text', rows: 2 }),
    defineField({ name: 'gallery_images', title: 'Gallery Image URLs', type: 'array', of: [{ type: 'url' }] }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle === 'published' ? '✅ Published' : '📝 Draft' };
    },
  },
  orderings: [
    { title: 'Published Date, New', name: 'publishedDateDesc', by: [{ field: 'published_date', direction: 'desc' }] },
  ],
});
