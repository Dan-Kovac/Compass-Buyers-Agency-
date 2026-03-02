import homePage from './homePage';
import aboutPage from './aboutPage';
import servicesPage from './servicesPage';
import contactPage from './contactPage';
import areasPage from './areasPage';
import whoWeWorkWithPage from './whoWeWorkWithPage';
import privacyPolicyPage from './privacyPolicyPage';
import siteSettings from './siteSettings';

// Collection types — one document per item
import blogPost from './blogPost';
import acquisition from './acquisition';
import teamMember from './teamMember';
import testimonial from './testimonial';
import caseStudy from './caseStudy';
import landingPage from './landingPage';

// Reusable object types
import seoFields from './objects/seoFields';
import testimonialVideo from './objects/testimonialVideo';

export const schemaTypes = [
  // Reusable objects — must be registered before documents that reference them
  seoFields,
  testimonialVideo,

  // Singleton page documents — one document per page
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  areasPage,
  whoWeWorkWithPage,
  privacyPolicyPage,

  // Collection documents — many documents per type
  blogPost,
  acquisition,
  teamMember,
  testimonial,
  caseStudy,
  landingPage,
];
