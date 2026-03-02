/**
 * pages.config.js - Page routing configuration
 *
 * Main navigation pages are eagerly loaded for instant transitions.
 * Detail pages, landing pages, and secondary pages are lazy-loaded
 * to reduce the initial bundle size.
 */
import { lazy } from 'react';

// Eager-loaded: main navigation pages (always needed quickly)
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Areas from './pages/Areas';
import Acquisitions from './pages/Acquisitions';
import Blog from './pages/Blog';
import WhoWeWorkWith from './pages/WhoWeWorkWith';
import __Layout from './Layout.jsx';

// Lazy-loaded: detail pages (only visited from listing pages)
const AcquisitionDetail = lazy(() => import('./pages/AcquisitionDetail'));
const BlogPostDetail = lazy(() => import('./pages/BlogPostDetail'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const TeamMemberDetail = lazy(() => import('./pages/TeamMemberDetail'));

// Lazy-loaded: landing pages (SEO entry points, not main nav)
const ByronBayBuyersAgent = lazy(() => import('./pages/ByronBayBuyersAgent'));
const GoldCoastBuyersAgent = lazy(() => import('./pages/GoldCoastBuyersAgent'));
const TweedHeadsBuyersAgent = lazy(() => import('./pages/TweedHeadsBuyersAgent'));
const NorthernRiversBuyersAgent = lazy(() => import('./pages/NorthernRiversBuyersAgent'));
const BrunswickHeadsBuyersAgents = lazy(() => import('./pages/BrunswickHeadsBuyersAgents'));
const SouthernGoldCoastBuyersAgents = lazy(() => import('./pages/SouthernGoldCoastBuyersAgents'));

// Lazy-loaded: secondary pages
const ByronBay = lazy(() => import('./pages/ByronBay'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

export const PAGES = {
    "About": About,
    "AcquisitionDetail": AcquisitionDetail,
    "Acquisitions": Acquisitions,
    "Areas": Areas,
    "Blog": Blog,
    "BlogPostDetail": BlogPostDetail,
    "BrunswickHeadsBuyersAgents": BrunswickHeadsBuyersAgents,
    "ByronBay": ByronBay,
    "ByronBayBuyersAgent": ByronBayBuyersAgent,
    "CaseStudies": CaseStudies,
    "CaseStudyDetail": CaseStudyDetail,
    "Contact": Contact,
    "GoldCoastBuyersAgent": GoldCoastBuyersAgent,
    "Home": Home,
    "NorthernRiversBuyersAgent": NorthernRiversBuyersAgent,
    "PrivacyPolicy": PrivacyPolicy,
    "Services": Services,
    "SouthernGoldCoastBuyersAgents": SouthernGoldCoastBuyersAgents,
    "TeamMemberDetail": TeamMemberDetail,
    "TweedHeadsBuyersAgent": TweedHeadsBuyersAgent,
    "WhoWeWorkWith": WhoWeWorkWith,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
