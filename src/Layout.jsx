import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose } from
"@/components/ui/sheet";
import { fetchSiteSettings, fetchPageSEO, urlFor, STATIC_SEO } from "@/lib/sanityClient";
import StickyMobileCTA from "@/components/shared/StickyMobileCTA";

const navigationItems = [
{ title: "Home", url: createPageUrl("Home") },
{ title: "What we do", url: createPageUrl("Services") },
{ title: "Who we help", url: createPageUrl("WhoWeWorkWith") },
{ title: "Our team", url: createPageUrl("About") },
{ title: "Areas", url: createPageUrl("Areas") },
{ title: "Acquisitions", url: createPageUrl("Acquisitions") },
{ title: "Blog", url: createPageUrl("Blog") },
{ title: "Contact", url: createPageUrl("Contact") }];


export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [brand, setBrand] = React.useState(null);
  const [seo, setSeo] = React.useState(null);
  const [brandLoaded, setBrandLoaded] = React.useState(false);
  const isHome = currentPageName === "Home";

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        const settings = await fetchSiteSettings();
        setBrand(settings || null);
      } catch (err) {
        console.warn("Could not load site settings, using defaults");
        setBrand(null);
      } finally {
        setBrandLoaded(true);
      }
    })();
  }, []);


  React.useEffect(() => {
    (async () => {
      if (!currentPageName) return;
      try {
        const seoData = await fetchPageSEO(currentPageName);
        // Fall back to hardcoded SEO for pages without Sanity singletons
        setSeo(seoData || STATIC_SEO[currentPageName] || null);
      } catch {
        setSeo(STATIC_SEO[currentPageName] || null);
      }
    })();
  }, [currentPageName]);

  React.useEffect(() => {
    const upsertMeta = (attr, key, value) => {
      if (value == null || value === "") return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    const upsertCanonical = (href) => {
      if (!href) return;
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    const defaultTitle = brand?.defaultMetaTitle || brand?.siteName || "Compass Buyers Agency";

    if (!seo) {
      document.title = defaultTitle;
      return;
    }

    document.title = seo.metaTitle || defaultTitle;

    const description = seo.metaDescription || brand?.defaultMetaDescription || "";
    const ogImageUrl = seo.ogImage ? urlFor(seo.ogImage).width(1200).url() : (brand?.defaultOgImage ? urlFor(brand.defaultOgImage).width(1200).url() : null);

    const robots = `${seo.noIndex ? "noindex" : "index"}, follow`;
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "description", description);
    upsertCanonical(seo.canonicalUrl || "");
    upsertMeta("property", "og:title", seo.metaTitle || defaultTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", brand?.siteName || "Compass Buyers Agency");
    if (typeof window !== "undefined") {
      upsertMeta("property", "og:url", window.location.href);
    }
    if (ogImageUrl) upsertMeta("property", "og:image", ogImageUrl);

    // Twitter Card meta
    upsertMeta("name", "twitter:card", ogImageUrl ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", seo.metaTitle || defaultTitle);
    upsertMeta("name", "twitter:description", description);
    if (ogImageUrl) upsertMeta("name", "twitter:image", ogImageUrl);
    upsertMeta("name", "twitter:site", "@compassbuyersagency");
  }, [seo, brand]);


  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className={`min-h-screen bg-white transition-opacity duration-200 ${brandLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        :root {
          --hills: #4B7371;
          --ink: #232323;
          --bright-grey: #ECEBEA;
          --sea-breeze: #D6EFFB;
          --sand: #F2ECCE;
          --stone: #767470;
          --container-width: 80rem;
          --font-heading: 'MinervaModern', Georgia, "Times New Roman", serif;
          --font-body: 'Aeonik', "Helvetica Neue", Helvetica, Arial, sans-serif;
          --h1-fs: 72px;
          --h1-lh: 1.05;
          --h1-mb: 32px;
          --h2-fs: 44px;
          --h2-lh: 1.15;
          --h2-mb: 24px;
          --h3-fs: 28px;
          --h3-lh: 1.2;
          --h3-mb: 16px;
          --body-fs: 18px;
          --body-lh: 28px;
          --body-mb: 20px;
          --radius-lg: 8px;
          --radius-xl: 16px;
          --border: #E8E7E5;
          --shadow-card: 0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
          --shadow-hover: 0 20px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04);
          --btn-height: 48px;
          --btn-minw: 140px;

          /* Typography weights — deploy unused Aeonik weights for contrast */
          --font-heading-regular: 400;
          --font-body-light: 300;
          --font-body-regular: 400;
          --font-body-medium: 500;
          --font-body-bold: 700;

          /* Spacing scale for section padding variety */
          --section-compact: 2.5rem;
          --section-standard: 4rem;
          --section-standard-lg: 6rem;
          --section-breathing: 5rem;
          --section-breathing-lg: 8rem;
        }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          :root {
            --h1-fs: 42px;
            --h1-lh: 1.1;
            --h1-mb: 24px;
            --h2-fs: 30px;
            --h2-lh: 1.2;
            --h2-mb: 16px;
            --h3-fs: 22px;
            --h3-lh: 1.25;
            --h3-mb: 12px;
            --body-lh: 27px;
            --body-mb: 16px;
            --btn-height: 52px;
            --btn-minw: 120px;
            /* Tighter section spacing on mobile */
            --section-breathing-lg: 4rem;
            --section-standard-lg: 3rem;
            --section-breathing: 3rem;
            --section-standard: 2.5rem;
          }
        }
        .site-container {
          max-width: var(--container-width);
          margin-left: auto;
          margin-right: auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
        @media (min-width: 640px) {
          .site-container { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
        @media (min-width: 1024px) {
          .site-container { padding-left: 2rem; padding-right: 2rem; }
        }
        .rounded-token { border-radius: var(--radius-lg); }
        .text-balance { text-wrap: balance; }
        html, body {
          font-family: var(--font-body);
          color: var(--ink);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: 0.005em;
          font-size: var(--body-fs);
          line-height: var(--body-lh);
          background: #fff;
        }
        h1, h2, h3, h4, h5, h6 {
          font-family: var(--font-heading);
          color: var(--ink);
          font-weight: 400;
          line-height: 1.15;
        }
        h1 {
          font-size: var(--h1-fs);
          line-height: var(--h1-lh);
          font-weight: 400;
          letter-spacing: -0.03em;
          margin-bottom: var(--h1-mb);
        }
        h2 {
          font-size: var(--h2-fs);
          line-height: var(--h2-lh);
          font-weight: 400;
          letter-spacing: -0.02em;
          margin-bottom: var(--h2-mb);
        }
        h3 {
          font-size: var(--h3-fs);
          line-height: var(--h3-lh);
          font-weight: 400;
          letter-spacing: -0.01em;
          margin-bottom: var(--h3-mb);
        }
        p {
          font-size: var(--body-fs);
          line-height: var(--body-lh);
          margin-bottom: var(--body-mb);
        }
        a { text-decoration: none; }
        a:hover { text-decoration: none; }
        .surface {
          background: #fff;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          transition: box-shadow .5s ease, border-color .5s ease, background-color .5s ease;
        }
        .surface:hover {
          box-shadow: var(--shadow-hover);
          border-color: rgba(0,0,0,0.06);
        }
        .surface:focus-within {
          box-shadow: var(--shadow-hover);
          border-color: rgba(0,0,0,0.06);
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
          width: 0;
          height: 0;
        }
        /* ── ScrollReveal animations ─────────────────────────── */
        .sr {
          opacity: 0;
          transition-property: opacity, transform;
          transition-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
          will-change: opacity, transform;
        }
        .sr-fade-up    { transform: translateY(12px) scale(0.98); }
        .sr-fade-in    { transform: scale(0.98); }
        .sr-fade-left  { transform: translateX(16px); }
        .sr-fade-right { transform: translateX(-16px); }
        .sr-visible {
          opacity: 1 !important;
          transform: none !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .sr { opacity: 1; transform: none; transition: none; }
          .surface { transition: none; }
        }
        .btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--btn-height);
          min-width: var(--btn-minw);
          padding: 0 32px;
          border-radius: var(--radius-lg);
          font-family: var(--font-body);
          font-weight: 500;
          letter-spacing: 0.02em;
          transition: box-shadow .4s ease, background-color .4s ease, color .4s ease, border-color .4s ease, opacity .2s ease;
          font-size: 16px;
        }
        .btn-cta:hover {
          box-shadow: 0 12px 32px rgba(75,115,113,0.2);
        }
        .btn-cta:active {
          opacity: 0.85;
        }
        .btn-cta:focus-visible {
          outline: 2px solid var(--hills);
          outline-offset: 2px;
        }
        .btn-outline-brand {
          background: #fff;
          color: var(--hills);
          border: 1px solid var(--hills);
        }
        .btn-outline-brand:hover {
          background: var(--hills);
          color: #fff;
          border-color: var(--hills);
        }
        .btn-secondary-invert {
          background: #fff !important;
          color: var(--hills) !important;
          border: 2px solid #fff !important;
          border-radius: var(--radius-lg) !important;
        }
        .btn-secondary-invert:hover {
          background: rgba(255,255,255,0.9) !important;
          color: var(--hills) !important;
        }
        @media (max-width: 640px) {
          .btn-cta {
            width: 100%;
            min-width: 0;
          }
        }
        /* Image hover zoom on cards */
        .surface img {
          transition: transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .surface:hover img {
          transform: scale(1.012);
        }
        /* Subtle icon shift on feature cards */
        .surface .lucide {
          transition: opacity .5s ease;
        }
        .surface:hover .lucide {
          opacity: 0.7;
        }
        /* ── Background wash utilities (layered, atmospheric) ──── */
        .bg-sand-wash {
          background:
            radial-gradient(ellipse at 20% 50%, rgba(242,236,206,0.15) 0%, transparent 70%),
            linear-gradient(180deg, rgba(242,236,206,0.08) 0%, rgba(242,236,206,0.18) 100%);
        }
        .bg-sea-wash {
          background:
            radial-gradient(ellipse at 80% 30%, rgba(214,239,251,0.12) 0%, transparent 60%),
            linear-gradient(170deg, rgba(214,239,251,0.06) 0%, rgba(214,239,251,0.14) 100%);
        }
        .bg-hills-wash {
          background:
            radial-gradient(ellipse at 30% 80%, rgba(75,115,113,0.06) 0%, transparent 50%),
            linear-gradient(175deg, rgba(75,115,113,0.03) 0%, rgba(75,115,113,0.08) 100%);
        }
        .bg-warm-gradient {
          background: linear-gradient(165deg, #ffffff 0%, rgba(242,236,206,0.12) 50%, rgba(214,239,251,0.06) 100%);
        }

        /* ── Dark editorial section — contrast breaks ────────── */
        .bg-editorial-dark {
          background: linear-gradient(175deg, var(--ink) 0%, #1a2f2e 100%);
          color: #fff;
        }
        .bg-editorial-dark .eyebrow,
        .bg-editorial-dark .eyebrow-label { color: var(--sand); }
        .bg-editorial-dark h2,
        .bg-editorial-dark h3 { color: #fff !important; }
        .bg-editorial-dark p { color: rgba(255,255,255,0.8); }
        .bg-editorial-dark a { color: rgba(255,255,255,0.85); }
        .bg-editorial-dark a:hover { color: #fff; }

        /* ── Warm cream — richer than sand-wash ──────────────── */
        .bg-cream {
          background: linear-gradient(180deg, #FAF7EE 0%, #F5F0E1 100%);
        }

        /* ── Subtle texture overlay ──────────────────────────── */
        .bg-textured { position: relative; }
        .bg-textured::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        .bg-textured > * { position: relative; z-index: 1; }
        /* ── Section eyebrow labels ─────────────────────────── */
        .eyebrow,
        .eyebrow-label {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: var(--font-body-medium);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--hills);
          margin-bottom: 0.75rem;
        }

        /* ── Large editorial stat number ─────────────────────── */
        .stat-number {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 3rem;
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--hills);
        }
        @media (min-width: 768px) {
          .stat-number { font-size: 3.5rem; }
        }
        @media (min-width: 1024px) {
          .stat-number { font-size: 4rem; }
        }

        /* ── Pullquote — Aeonik Light, large, constrained ──── */
        .pullquote {
          font-family: var(--font-body);
          font-weight: var(--font-body-light);
          font-size: 1.5rem;
          line-height: 1.5;
          color: var(--stone);
          max-width: 38ch;
        }
        @media (max-width: 768px) {
          .pullquote { font-size: 1.25rem; }
        }

        /* ── Section divider — thin decorative line ──────────── */
        .section-divider {
          width: 48px;
          height: 1px;
          background: var(--sand);
          margin: 0 auto;
        }
        .section-divider.left { margin: 0; }

        /* ── Intro paragraph — first text after heading ──────── */
        .intro-text {
          font-family: var(--font-body);
          font-weight: var(--font-body-light);
          font-size: 1.25rem;
          line-height: 1.6;
          color: var(--stone);
          max-width: 52ch;
        }
        @media (max-width: 768px) {
          .intro-text { font-size: 1.125rem; }
        }
        /* ── Link hover ─────────────────────────── */
        a { transition: color .3s ease; }
        /* ── Focus visible for all interactive elements ──── */
        a:focus-visible, button:focus-visible, [role="button"]:focus-visible {
          outline: 2px solid var(--hills);
          outline-offset: 2px;
        }
        /* ── Skip navigation link ─────────────────────── */
        .skip-link {
          position: absolute;
          top: -100%;
          left: 1rem;
          z-index: 100;
          padding: 0.75rem 1.5rem;
          background: var(--hills);
          color: #fff;
          border-radius: var(--radius-lg);
          font-weight: 500;
          font-size: 0.875rem;
          text-decoration: none;
          transition: top 0.2s ease;
        }
        .skip-link:focus {
          top: 0.5rem;
        }
        @media (prefers-reduced-motion: reduce) {
          .surface img, .surface:hover img { transform: none; transition: none; }
          .surface .lucide, .surface:hover .lucide { opacity: 1; transition: none; }
          a { transition: none; }
          .btn-cta { transition: none; }
          .skip-link { transition: none; }
        }
      `}</style>

      <a href="#main-content" className="skip-link">Skip to main content</a>

      <header
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isHome && !isScrolled
            ? 'py-4'
            : isScrolled
              ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
              : 'bg-white py-4'
        }`}
        style={isHome && !isScrolled ? { background: 'transparent' } : undefined}
      >
        <div className="site-container">
            <div className="flex justify-between items-center">
              <Link to={createPageUrl("Home")} className="flex items-center">
                <img
                  src={brand?.logo ? urlFor(brand.logo).height(80).url() : "/images/compass-logo.png"}
                  alt={brand?.siteName || "Compass Buyers Agency"}
                  className="h-7 md:h-8 w-auto transition-all duration-300"
                  style={isHome && !isScrolled ? { filter: 'brightness(0) invert(1)' } : undefined} />

                <span className="sr-only">{brand?.siteName || "Compass Buyers Agency"}</span>
              </Link>

              <nav className="hidden xl:flex items-center gap-8" aria-label="Primary navigation">
                {navigationItems.
                filter((item) => item.title !== "Contact" && !(currentPageName === "Home" && item.title === "Home")).
                map((item) =>
                <Link
                  key={item.title}
                  to={item.url}
                  aria-current={location.pathname === item.url ? "page" : undefined}
                  className={`text-[16px] transition-colors duration-300 ${
                    isHome && !isScrolled
                      ? location.pathname === item.url
                        ? 'text-white font-medium'
                        : 'text-white/70 hover:text-white font-normal'
                      : location.pathname === item.url
                        ? 'text-[var(--hills)] font-medium'
                        : 'text-[var(--ink)]/70 hover:text-[var(--hills)] font-normal'
                  }`}
                >
                  {item.title}
                </Link>
                )}
                <Link to={createPageUrl("Contact")}>
                  <Button className={`btn-cta text-[14px] ${
                    isHome && !isScrolled
                      ? 'bg-white/10 backdrop-blur-sm text-white border border-white/25 hover:bg-white/20'
                      : 'bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white'
                  }`}>
                    Speak to an Agent
                  </Button>
                </Link>
              </nav>

              {/* Mobile/Tablet: Phone + Hamburger */}
              <div className="xl:hidden flex items-center gap-3">
                <a
                  href="tel:0403536390"
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                    isHome && !isScrolled
                      ? 'border-white/30 hover:bg-white/10'
                      : 'border-[var(--stone)]/30 hover:bg-[var(--bright-grey)]/50'
                  }`}
                  aria-label="Call Compass Buyers Agency"
                >
                  <Phone className="h-4 w-4" style={{ color: isHome && !isScrolled ? '#fff' : 'var(--hills)' }} />
                </a>
                <Sheet>
                  <SheetTrigger asChild>
                    <button
                      className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors ${
                        isHome && !isScrolled
                          ? 'border-white/30 bg-transparent hover:bg-white/10'
                          : 'border-[var(--stone)]/30 bg-transparent hover:bg-[var(--bright-grey)]/50'
                      }`}
                      aria-label="Open menu"
                    >
                      <Menu className="h-5 w-5" style={{ color: isHome && !isScrolled ? '#fff' : 'var(--hills)' }} />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] max-w-[90vw] bg-white">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center py-6 border-b border-[var(--bright-grey)]">
                        <div className="flex items-center">
                          <img
                            src={brand?.logo ? urlFor(brand.logo).height(80).url() : "/images/compass-logo.png"}
                            alt={brand?.siteName || "Compass Buyers Agency"}
                            className="h-7 w-auto" />

                          <span className="sr-only">{brand?.siteName || "Compass Buyers Agency"}</span>
                        </div>
                        <SheetClose />
                      </div>
                      
                      <nav className="flex flex-col space-y-6 py-8" aria-label="Mobile navigation">
                        {navigationItems.
                        filter((item) => item.title !== "Contact" && !(currentPageName === "Home" && item.title === "Home")).
                        map((item) =>
                        <SheetClose asChild key={item.title}>
                            <Link
                            to={item.url}
                            aria-current={location.pathname === item.url ? "page" : undefined}
                            className={`text-lg font-medium transition-colors duration-200 capitalize ${
                              location.pathname === item.url
                                ? 'text-[var(--hills)]'
                                : 'text-[var(--ink)] hover:text-[var(--hills)]'
                            }`}
                          >
                            {item.title}
                          </Link>
                          </SheetClose>
                        )}
                      </nav>

                      <div className="mt-auto py-6 border-t border-[var(--bright-grey)]">
                        <SheetClose asChild>
                          <Link to={createPageUrl("Contact")}>
                            <Button className="btn-cta w-full bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                              Speak to an Agent
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
        </div>
      </header>

      <main id="main-content" className={isHome ? '' : 'pt-20'}>
        {children}
      </main>

      <StickyMobileCTA />

      <footer className="bg-editorial-dark text-white" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="site-container py-12 md:py-16 pb-24 md:pb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">

              {/* Col 1: Brand + contact */}
              <div>
                <div
                  className="text-lg mb-3"
                  style={{ color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 400, letterSpacing: "-0.01em" }}>
                  {brand?.siteName || "Compass Buyers Agency"}
                </div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", fontWeight: 300, lineHeight: 1.65, maxWidth: "28ch", marginBottom: "1.25rem" }}>
                  Northern Rivers and Gold Coast buyers agents. Local knowledge, honest advice.
                </p>
                <div className="space-y-1.5" style={{ fontSize: "0.875rem" }}>
                  <div><a href="tel:0403536390" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>0403 536 390</a></div>
                  <div><a href="mailto:hello@compassbuyersagency.com.au" className="hover:text-white transition-colors" style={{ color: "rgba(255,255,255,0.6)" }}>hello@compassbuyersagency.com.au</a></div>
                </div>
                <div className="flex gap-5 mt-5">
                  <a href="https://www.instagram.com/compassbuyersagency/" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem" }} className="hover:text-white/90 transition-colors">Instagram</a>
                  <a href="https://www.facebook.com/compassbuyersagency/" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8125rem" }} className="hover:text-white/90 transition-colors">Facebook</a>
                </div>
              </div>

              {/* Col 2: Pages */}
              <div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.875rem" }}>Pages</div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2" style={{ fontSize: "0.875rem" }}>
                  {navigationItems.map((item) =>
                    <li key={item.title}>
                      <Link to={item.url} className="hover:text-white/90 transition-colors" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>{item.title}</Link>
                    </li>
                  )}
                  <li><Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white/90 transition-colors" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>Privacy Policy</Link></li>
                </ul>
              </div>

              {/* Col 3: Service areas */}
              <div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontWeight: 500, fontSize: "0.6875rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.875rem" }}>Service Areas</div>
                <ul className="space-y-2" style={{ fontSize: "0.875rem" }}>
                  <li><Link to={createPageUrl("ByronBayBuyersAgent")} className="hover:text-white/90 transition-colors" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>Byron Bay</Link></li>
                  <li><Link to={createPageUrl("GoldCoastBuyersAgent")} className="hover:text-white/90 transition-colors" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>Gold Coast</Link></li>
                  <li><Link to={createPageUrl("TweedHeadsBuyersAgent")} className="hover:text-white/90 transition-colors" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>Tweed Heads</Link></li>
                  <li><Link to={createPageUrl("NorthernRiversBuyersAgent")} className="hover:text-white/90 transition-colors" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 300 }}>Northern Rivers</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-8" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", lineHeight: 1.6 }}>
              We acknowledge the Bundjalung, Gumbaynggirr and Yaegl people as the Traditional Owners of the land on which we live and work. We pay our respects to their Elders past, present and emerging.
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
                &copy; {new Date().getFullYear()} {brand?.siteName || "Compass Buyers Agency"}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
                Built by Roadmap Labs
              </div>
            </div>
        </div>
      </footer>

      </div>
  );

      }
