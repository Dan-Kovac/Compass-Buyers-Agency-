// Collection types — one document per item
import blogPost from './blogPost';
import acquisition from './acquisition';
import teamMember from './teamMember';
import testimonial from './testimonial';
import caseStudy from './caseStudy';

// Reusable object types
import seoFields from './objects/seoFields';
import testimonialVideo from './objects/testimonialVideo';

export const schemaTypes = [
  // Reusable objects — must be registered before documents that reference them
  seoFields,
  testimonialVideo,

  // Collection documents — many documents per type
  blogPost,
  acquisition,
  teamMember,
  testimonial,
  caseStudy,
];
