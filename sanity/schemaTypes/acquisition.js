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
    defineField({ name: 'purchase_price', title: 'Purchase Price', type: 'number', description: 'Internal record. Hidden on the site when Price Confidential is on.' }),
    defineField({ name: 'price_confidential', title: 'Price Confidential', type: 'boolean', initialValue: false, description: 'When on, the site shows "Price on request" with a Contact CTA instead of the dollar figure.' }),
    defineField({ name: 'price_display', title: 'Price Display Override', type: 'string', description: 'Optional. Overrides both the price and the confidential label (e.g. "Mid $3M range").' }),
    defineField({ name: 'purchase_date', title: 'Purchase Date', type: 'date' }),
    defineField({ name: 'agent', title: 'Agent Name (legacy)', type: 'string', description: 'First name only. Use Team Member field instead for new acquisitions.' }),
    defineField({ name: 'team_member', title: 'Team Member', type: 'reference', to: [{ type: 'teamMember' }], description: 'Link to the team member who secured this property.' }),
    defineField({ name: 'market_visibility', title: 'Market Visibility', type: 'string', options: { list: [{ title: 'On Market', value: 'on_market' }, { title: 'Off Market', value: 'off_market' }] }, initialValue: 'on_market' }),
    defineField({ name: 'timeframe', title: 'Timeframe (e.g. "4 weeks")', type: 'string' }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'main_image', title: 'Main Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'main_image_url', title: 'Main Image URL (legacy)', type: 'url', hidden: true }),
    defineField({ name: 'agent_photo', title: 'Agent Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'agent_image', title: 'Agent Image URL (legacy)', type: 'url', hidden: true }),
    defineField({ name: 'realestate_link', title: 'Realestate.com.au Link', type: 'url' }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'seo', title: 'SEO', type: 'seoFields' }),
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
