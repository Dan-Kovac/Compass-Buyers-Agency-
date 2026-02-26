import homePage from './homePage';
import aboutPage from './aboutPage';
import servicesPage from './servicesPage';
import contactPage from './contactPage';
import areasPage from './areasPage';
import whoWeWorkWithPage from './whoWeWorkWithPage';
import privacyPolicyPage from './privacyPolicyPage';
import siteSettings from './siteSettings';

export const schemaTypes = [
  // Singleton page documents — one document per page
  siteSettings,
  homePage,
  aboutPage,
  servicesPage,
  contactPage,
  areasPage,
  whoWeWorkWithPage,
  privacyPolicyPage,
];
