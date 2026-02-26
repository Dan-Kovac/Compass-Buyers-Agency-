/**
 * pages.config.js - Page routing configuration
 *
 * Admin pages use React.lazy() for code splitting.
 * Public pages are eagerly loaded for fast initial render.
 */
import { lazy } from 'react';

// Public pages (eagerly loaded)
import About from './pages/About';
import AcquisitionDetail from './pages/AcquisitionDetail';
import Acquisitions from './pages/Acquisitions';
import Areas from './pages/Areas';
import Blog from './pages/Blog';
import BlogPostDetail from './pages/BlogPostDetail';
import BrunswickHeadsBuyersAgents from './pages/BrunswickHeadsBuyersAgents';
import ByronBay from './pages/ByronBay';
import ByronBayBuyersAgent from './pages/ByronBayBuyersAgent';
import ByronBayBuyersAgents from './pages/ByronBayBuyersAgents';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Contact from './pages/Contact';
import GoldCoastBuyersAgent from './pages/GoldCoastBuyersAgent';
import Home from './pages/Home';
import NorthernRiversBuyersAgent from './pages/NorthernRiversBuyersAgent';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Services from './pages/Services';
import SouthernGoldCoastBuyersAgents from './pages/SouthernGoldCoastBuyersAgents';
import TeamMemberDetail from './pages/TeamMemberDetail';
import TweedHeadsBuyersAgent from './pages/TweedHeadsBuyersAgent';
import WhoWeWorkWith from './pages/WhoWeWorkWith';
import __Layout from './Layout.jsx';

// Admin pages (lazy loaded — only fetched when admin navigates to them)
const AcquisitionsManager = lazy(() => import('./pages/AcquisitionsManager'));
const BlogManager = lazy(() => import('./pages/BlogManager'));
const BrandSettings = lazy(() => import('./pages/BrandSettings'));
const CMSManager = lazy(() => import('./pages/CMSManager'));
const ContentImporter = lazy(() => import('./pages/ContentImporter'));
const ImageImporter = lazy(() => import('./pages/ImageImporter'));
const MediaLibrary = lazy(() => import('./pages/MediaLibrary'));
const SEOManager = lazy(() => import('./pages/SEOManager'));
const SuburbReportsMigrator = lazy(() => import('./pages/SuburbReportsMigrator'));
const TemplateEditor = lazy(() => import('./pages/TemplateEditor'));

export const PAGES = {
    "About": About,
    "AcquisitionDetail": AcquisitionDetail,
    "Acquisitions": Acquisitions,
    "AcquisitionsManager": AcquisitionsManager,
    "Areas": Areas,
    "Blog": Blog,
    "BlogManager": BlogManager,
    "BlogPostDetail": BlogPostDetail,
    "BrandSettings": BrandSettings,
    "BrunswickHeadsBuyersAgents": BrunswickHeadsBuyersAgents,
    "ByronBay": ByronBay,
    "ByronBayBuyersAgent": ByronBayBuyersAgent,
    "ByronBayBuyersAgents": ByronBayBuyersAgents,
    "CMSManager": CMSManager,
    "CaseStudies": CaseStudies,
    "CaseStudyDetail": CaseStudyDetail,
    "Contact": Contact,
    "ContentImporter": ContentImporter,
    "GoldCoastBuyersAgent": GoldCoastBuyersAgent,
    "Home": Home,
    "ImageImporter": ImageImporter,
    "MediaLibrary": MediaLibrary,
    "NorthernRiversBuyersAgent": NorthernRiversBuyersAgent,
    "PrivacyPolicy": PrivacyPolicy,
    "SEOManager": SEOManager,
    "Services": Services,
    "SouthernGoldCoastBuyersAgents": SouthernGoldCoastBuyersAgents,
    "SuburbReportsMigrator": SuburbReportsMigrator,
    "TeamMemberDetail": TeamMemberDetail,
    "TemplateEditor": TemplateEditor,
    "TweedHeadsBuyersAgent": TweedHeadsBuyersAgent,
    "WhoWeWorkWith": WhoWeWorkWith,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};
