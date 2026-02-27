import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'acquisition',
  title: 'Acquisition',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'status', title: 'Status', type: 'string', options: { list: [{ title: 'Draft', value: 'draft' }, { title: 'Published', value: 'published' }] }, initialValue: 'published' }),
    defineField({ name: 'suburb', title: 'Suburb', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'state', title: 'State', type: 'string', options: { list: ['NSW', 'QLD'] }, initialValue: 'NSW' }),
    defineField({ name: 'lga', title: 'LGA', type: 'string', options: { list: ['Byron Shire', 'Tweed Shire', 'Ballina Shire', 'City of Gold Coast', 'Other'] } }),
    defineField({ name: 'property_type', title: 'Property Type', type: 'string', options: { list: ['house', 'apartment', 'townhouse', 'acreage', 'duplex', 'unit', 'land', 'villa', 'other'] } }),
    defineField({ name: 'beds', title: 'Bedrooms', type: 'number' }),
    defineField({ name: 'baths', title: 'Bathrooms', type: 'number' }),
    defineField({ name: 'cars', title: 'Car Spaces', type: 'number' }),
    defineField({ name: 'land_size', title: 'Land Size', type: 'number' }),
    defineField({ name: 'land_size_unit', title: 'Land Size Unit', type: 'string', options: { list: ['sqm', 'acres', 'hectares'] }, initialValue: 'sqm' }),
    defineField({ name: 'purchase_price', title: 'Purchase Price', type: 'number' }),
    defineField({ name: 'price_display', title: 'Price Display Text', type: 'string' }),
    defineField({ name: 'purchase_date', title: 'Purchase Date', type: 'date' }),
    defineField({ name: 'agent', title: 'Agent Name', type: 'string' }),
    defineField({ name: 'market_visibility', title: 'Market Visibility', type: 'string', options: { list: [{ title: 'On Market', value: 'on_market' }, { title: 'Off Market', value: 'off_market' }] }, initialValue: 'on_market' }),
    defineField({ name: 'timeframe', title: 'Timeframe (e.g. "4 weeks")', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'main_image_url', title: 'Main Image URL', type: 'url' }),
    defineField({ name: 'agent_image', title: 'Agent Image URL', type: 'url' }),
    defineField({ name: 'realestate_link', title: 'Realestate.com.au Link', type: 'url' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'title', suburb: 'suburb', status: 'status' },
    prepare({ title, suburb, status }) {
      return { title, subtitle: `${suburb || ''} · ${status === 'published' ? '✅' : '📝'}` };
    },
  },
  orderings: [
    { title: 'Purchase Date, New', name: 'purchaseDateDesc', by: [{ field: 'purchase_date', direction: 'desc' }] },
  ],
});
