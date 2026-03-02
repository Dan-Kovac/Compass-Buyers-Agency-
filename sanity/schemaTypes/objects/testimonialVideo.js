import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'testimonialVideo',
  title: 'Testimonial Video',
  type: 'object',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'e.g. "Purchased in Kingscliff"',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'Self-hosted MP4 path, e.g. /videos/testimonials/alyssa.mp4',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Thumbnail shown before the video plays.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
      description: 'Featured testimonials appear on the Home page.',
    }),
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'subtitle' },
  },
});
