import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose } from
"@/components/ui/sheet";
import { SiteSettings } from "@/entities/SiteSettings";
import AdminPageNavigator from "@/components/admin/AdminPageNavigator";
import { PageSEO } from "@/entities/PageSEO";
import { RedirectRule } from "@/entities/RedirectRule";
import { base44 } from "@/api/base44Client";
import { EditModeProvider } from "@/components/cms/EditModeContext";
import EditModeToggle from "@/components/cms/EditModeToggle";
import GlobalEditableImages from "@/components/cms/GlobalEditableImages";

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
  const [fontsReady, setFontsReady] = React.useState(false);
  const [brandLoaded, setBrandLoaded] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

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
        const list = await SiteSettings.list();
        setBrand(list[0] || null);
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
      try {
        const me = await base44.auth.me();
        setUser(me);
        setIsAdmin(me?.role === 'admin');
        if (me?.role === 'admin') document.documentElement.classList.add('b44-edit-mode');
      } catch {
        setUser(null);
        setIsAdmin(false);
        document.documentElement.classList.remove('b44-edit-mode');
      }
    })();
  }, []);

  React.useEffect(() => {
    if (!brand) return;
    const addPreload = (href) => {
      if (!href) return null;
      const exists = Array.from(document.querySelectorAll('link[rel="preload"]')).some((l) => l.href === href);
      if (exists) return null;
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      return link;
    };
    const links = [];
    if (brand.heading_font_url_woff2) links.push(addPreload(brand.heading_font_url_woff2));
    if (brand.body_font_url_woff2) links.push(addPreload(brand.body_font_url_woff2));
  }, [brand]);

  React.useEffect(() => {
    if (!document.fonts || !document.fonts.ready) {
      setFontsReady(true);
      return;
    }
    document.fonts.ready.then(() => {
      setFontsReady(true);
    });
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!currentPageName) return;
      try {
        const found = await PageSEO.filter({ page_name: currentPageName }, "-updated_date", 1);
        setSeo(found && found.length ? found[0] : null);
      } catch {
        setSeo(null);
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

    if (!seo) {
      document.title = brand?.site_name || "Compass Buyers Agency";
      return;
    }

    if (seo.meta_title) {
      document.title = seo.meta_title;
    } else {
      document.title = brand?.site_name || "Compass Buyers Agency";
    }

    const robots = `${seo.index === false ? "noindex" : "index"}, ${seo.nofollow ? "nofollow" : "follow"}`;
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "description", seo.meta_description || "");
    upsertCanonical(seo.canonical_url || "");
    upsertMeta("property", "og:title", seo.og_title || seo.meta_title || "");
    upsertMeta("property", "og:description", seo.og_description || seo.meta_description || "");
    upsertMeta("property", "og:type", "website");
    if (typeof window !== "undefined") {
      upsertMeta("property", "og:url", window.location.href);
    }
    if (seo.og_image_url) upsertMeta("property", "og:image", seo.og_image_url);

    // Twitter Card meta
    upsertMeta("name", "twitter:card", seo.og_image_url ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", seo.og_title || seo.meta_title || "");
    upsertMeta("name", "twitter:description", seo.og_description || seo.meta_description || "");
    if (seo.og_image_url) upsertMeta("name", "twitter:image", seo.og_image_url);
  }, [seo, brand]);

  React.useEffect(() => {
    (async () => {
      try {
        const path = window.location.pathname;
        const rules = await RedirectRule.filter({ active: true, old_path: path }, "-updated_date", 1);
        if (rules && rules.length) {
          const target = rules[0].new_url;
          if (target && target !== path) {
            window.location.replace(target);
            return;
          }
        }
        // Fallback: map clean SEO slugs to internal routes
        const seoMap = {
          "/gold-coast-buyers-agent": createPageUrl("GoldCoastBuyersAgent"),
          "/buyers-agent-gold-coast": createPageUrl("GoldCoastBuyersAgent"),
          "/byron-bay-buyers-agent": createPageUrl("ByronBayBuyersAgent"),
          "/buyers-agent-byron-bay": createPageUrl("ByronBayBuyersAgent"),
          "/tweed-heads-buyers-agent": createPageUrl("TweedHeadsBuyersAgent"),
          "/buyers-agent-tweed-heads": createPageUrl("TweedHeadsBuyersAgent"),
          "/northern-rivers-buyers-agent": createPageUrl("NorthernRiversBuyersAgent"),
          "/buyers-agent-northern-rivers": createPageUrl("NorthernRiversBuyersAgent"),
        };
        const normalised = path?.replace(/\/$/, "");
        const target = seoMap[normalised] || seoMap[path];
        if (target && target !== path) {
          window.location.replace(target);
        }
      } catch {
        // ignore
      }
    })();
  }, [location.pathname]);

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.search]);

  React.useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <EditModeProvider>
    <div className={`min-h-screen bg-white transition-opacity duration-200 ${brandLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <style>{`
        :root {
          --hills: #4B7371;
          --ink: #232323;
          --bright-grey: #ECEBEA;
          --sea-breeze: #D6EFFB;
          --sand: #F2ECCE;
          --stone: #AFADA4;
          --container-width: 80rem;
          --font-heading: "Minerva Modern", Georgia, "Times New Roman", serif;
          --font-body: Aeonik, "Helvetica Neue", Helvetica, Arial, sans-serif;
          --h1-fs: 48px;
          --h1-lh: 54px;
          --h1-mb: 32px;
          --h1-mw: 80%;
          --h2-fs: 36px;
          --h2-lh: 44px;
          --h2-mb: 24px;
          --h3-fs: 28px;
          --h3-lh: 36px;
          --h3-mb: 16px;
          --body-fs: 18px;
          --body-lh: 28px;
          --body-mb: 20px;
          --radius-lg: 10px;
          --radius-xl: 16px;
          --border: #E8E7E5;
          --shadow-card: 0 6px 24px rgba(0,0,0,0.06);
          --shadow-hover: 0 12px 32px rgba(0,0,0,0.08);
          --btn-height: 44px;
          --btn-minw: 140px;
        }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          :root {
            --h1-fs: 32px;
            --h1-lh: 38px;
            --h1-mb: 24px;
            --h1-mw: 85%;
            --h2-fs: 26px;
            --h2-lh: 32px;
            --h2-mb: 16px;
            --h3-fs: 22px;
            --h3-lh: 28px;
            --h3-mb: 12px;
            --body-lh: 27px;
            --body-mb: 16px;
            --btn-height: 48px;
            --btn-minw: 120px;
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
          letter-spacing: -0.01em;
          line-height: 1.2;
          text-transform: capitalize;
        }
        h1 {
          font-size: var(--h1-fs) !important;
          line-height: var(--h1-lh) !important;
          font-weight: 600 !important;
          margin-bottom: var(--h1-mb) !important;
          max-width: var(--h1-mw);
        }
        h2 {
          font-size: var(--h2-fs) !important;
          line-height: var(--h2-lh) !important;
          font-weight: 600 !important;
          margin-bottom: var(--h2-mb) !important;
        }
        h3 {
          font-size: var(--h3-fs) !important;
          line-height: var(--h3-lh) !important;
          font-weight: 500 !important;
          margin-bottom: var(--h3-mb) !important;
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
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease, background-color .25s ease;
          will-change: transform, box-shadow;
        }
        .surface:hover {
          box-shadow: var(--shadow-hover);
          border-color: #e1e0dd;
          transform: translateY(-2px);
        }
        .surface:active {
          transform: translateY(-1px);
        }
        .surface:focus-within {
          box-shadow: var(--shadow-hover);
          border-color: #e1e0dd;
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
        @media (prefers-reduced-motion: reduce) {
          .surface { transition: none; }
          .surface:hover, .surface:active { transform: none; }
        }
        .btn-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--btn-height);
          min-width: var(--btn-minw);
          padding: 0 28px;
          border-radius: var(--radius-lg);
          font-family: var(--font-body);
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: transform .12s ease, box-shadow .2s ease, background-color .2s ease, color .2s ease, border-color .2s ease;
          will-change: transform;
          font-size: 16px;
        }
        .btn-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        .btn-cta:active {
          transform: translateY(0) scale(0.98);
        }
        .btn-outline-brand {
          background: #fff;
          color: var(--hills);
          border: 2px solid var(--hills);
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
      `}</style>

      {brand &&
      <style>{`
          ${brand.heading_font_name && brand.heading_font_url_woff2 ? `
          @font-face {
            font-family: '${brand.heading_font_name}';
            src: url('${brand.heading_font_url_woff2}') format('woff2');
            font-weight: 400 700;
            font-style: normal;
            font-display: swap;
          }` : ''}

          ${brand.body_font_name && brand.body_font_url_woff2 ? `
          @font-face {
            font-family: '${brand.body_font_name}';
            src: url('${brand.body_font_url_woff2}') format('woff2');
            font-weight: 300 700;
            font-style: normal;
            font-display: swap;
          }` : ''}

          :root {
            ${brand.heading_font_name ? `--font-heading: '${brand.heading_font_name}', Georgia, "Times New Roman", serif;` : ''}
            ${brand.body_font_name ? `--font-body: '${brand.body_font_name}', "Helvetica Neue", Helvetica, Arial, sans-serif;` : ''}
            ${brand.color_hills ? `--hills: ${brand.color_hills};` : ''}
            ${brand.color_ink ? `--ink: ${brand.color_ink};` : ''}
            ${brand.color_bright_grey ? `--bright-grey: ${brand.color_bright_grey};` : ''}
            ${brand.color_sea_breeze ? `--sea-breeze: ${brand.color_sea_breeze};` : ''}
            ${brand.color_sand ? `--sand: ${brand.color_sand};` : ''}
            ${brand.color_stone ? `--stone: ${brand.color_stone};` : ''}
            ${typeof brand.button_radius === 'number' ? `--radius-lg: ${brand.button_radius}px;` : ''}
            ${typeof brand.button_height === 'number' ? `--btn-height: ${brand.button_height}px;` : ''}
            ${typeof brand.button_min_width === 'number' ? `--btn-minw: ${brand.button_min_width}px;` : ''}
            ${typeof brand.body_font_size === 'number' ? `--body-fs: ${brand.body_font_size}px;` : ''}
            ${typeof brand.body_line_height_desktop === 'number' ? `--body-lh: ${brand.body_line_height_desktop}px;` : ''}
            ${typeof brand.body_margin_bottom_desktop === 'number' ? `--body-mb: ${brand.body_margin_bottom_desktop}px;` : ''}
            ${typeof brand.h1_desktop_size === 'number' ? `--h1-fs: ${brand.h1_desktop_size}px;` : ''}
            ${typeof brand.h1_desktop_line_height === 'number' ? `--h1-lh: ${brand.h1_desktop_line_height}px;` : ''}
            ${typeof brand.h1_desktop_margin_bottom === 'number' ? `--h1-mb: ${brand.h1_desktop_margin_bottom}px;` : ''}
            ${typeof brand.h1_desktop_max_width === 'number' ? `--h1-mw: ${brand.h1_desktop_max_width}%;` : ''}
            ${typeof brand.h2_desktop_size === 'number' ? `--h2-fs: ${brand.h2_desktop_size}px;` : ''}
            ${typeof brand.h2_desktop_line_height === 'number' ? `--h2-lh: ${brand.h2_desktop_line_height}px;` : ''}
            ${typeof brand.h2_desktop_margin_bottom === 'number' ? `--h2-mb: ${brand.h2_desktop_margin_bottom}px;` : ''}
            ${typeof brand.h3_desktop_size === 'number' ? `--h3-fs: ${brand.h3_desktop_size}px;` : ''}
            ${typeof brand.h3_desktop_line_height === 'number' ? `--h3-lh: ${brand.h3_desktop_line_height}px;` : ''}
            ${typeof brand.h3_desktop_margin_bottom === 'number' ? `--h3-mb: ${brand.h3_desktop_margin_bottom}px;` : ''}
          }

          @media (max-width: 768px) {
            :root {
              ${typeof brand.body_line_height_mobile === 'number' ? `--body-lh: ${brand.body_line_height_mobile}px;` : ''}
              ${typeof brand.body_margin_bottom_mobile === 'number' ? `--body-mb: ${brand.body_margin_bottom_mobile}px;` : ''}
              ${typeof brand.h1_mobile_size === 'number' ? `--h1-fs: ${brand.h1_mobile_size}px;` : ''}
              ${typeof brand.h1_mobile_line_height === 'number' ? `--h1-lh: ${brand.h1_mobile_line_height}px;` : ''}
              ${typeof brand.h1_mobile_margin_bottom === 'number' ? `--h1-mb: ${brand.h1_mobile_margin_bottom}px;` : ''}
              ${typeof brand.h1_mobile_max_width === 'number' ? `--h1-mw: ${brand.h1_mobile_max_width}%;` : ''}
              ${typeof brand.h2_mobile_size === 'number' ? `--h2-fs: ${brand.h2_mobile_size}px;` : ''}
              ${typeof brand.h2_mobile_line_height === 'number' ? `--h2-lh: ${brand.h2_mobile_line_height}px;` : ''}
              ${typeof brand.h2_mobile_margin_bottom === 'number' ? `--h2-mb: ${brand.h2_mobile_margin_bottom}px;` : ''}
              ${typeof brand.h3_mobile_size === 'number' ? `--h3-fs: ${brand.h3_mobile_size}px;` : ''}
              ${typeof brand.h3_mobile_line_height === 'number' ? `--h3-lh: ${brand.h3_mobile_line_height}px;` : ''}
              ${typeof brand.h3_mobile_margin_bottom === 'number' ? `--h3-mb: ${brand.h3_mobile_margin_bottom}px;` : ''}
              ${typeof brand.button_height_mobile === 'number' ? `--btn-height: ${brand.button_height_mobile}px;` : ''}
              ${typeof brand.button_min_width_mobile === 'number' ? `--btn-minw: ${brand.button_min_width_mobile}px;` : ''}
            }
          }
        `}</style>
      }

      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 backdrop-blur-sm py-5'}`
      }>
        <div className="mx-3 sm:mx-4 md:mx-6 lg:mx-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <Link to={createPageUrl("Home")} className="flex items-center">
                <img
                  src={brand?.logo_url || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/eba70ebd7_10COMPASS_LOGO.png"}
                  alt={brand?.site_name || "Compass Buyers Agency"}
                  className="h-7 md:h-9 w-auto" />

                <span className="sr-only">{brand?.site_name || "Compass Buyers Agency"}</span>
              </Link>

              <nav className="hidden xl:flex items-center space-x-10">
                {navigationItems.
                filter((item) => item.title !== "Contact" && !(currentPageName === "Home" && item.title === "Home")).
                map((item) =>
                <Link
                  key={item.title}
                  to={item.url}
                  className={`text-[18px] font-medium transition-colors duration-200 hover:text-[var(--hills)] ${
                  location.pathname === item.url ?
                  'text-[var(--hills)] border-b-2 border-[var(--hills)] pb-1' :
                  'text-[var(--ink)]/90'}`
                  }
                  style={{ fontFamily: 'var(--font-body)' }}>

                    {item.title}
                  </Link>
                )}
                <Link to={createPageUrl("Contact")}>
                  <Button
                    className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
                    style={{ fontFamily: 'var(--font-body)' }}>

                    Contact
                  </Button>
                </Link>
              </nav>

              {/* Mobile/Tablet: Hamburger only */}
              <div className="xl:hidden flex items-center gap-3">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="border-[var(--stone)]">
                      <Menu className="h-5 w-5" style={{ color: 'var(--hills)' }} />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] bg-white">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-center py-6 border-b border-[var(--bright-grey)]">
                        <div className="flex items-center">
                          <img
                            src={brand?.logo_url || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/eba70ebd7_10COMPASS_LOGO.png"}
                            alt={brand?.site_name || "Compass Buyers Agency"}
                            className="h-7 w-auto" />

                          <span className="sr-only">{brand?.site_name || "Compass Buyers Agency"}</span>
                        </div>
                        <SheetClose />
                      </div>
                      
                      <nav className="flex flex-col space-y-6 py-8">
                        {navigationItems.
                        filter((item) => item.title !== "Contact" && !(currentPageName === "Home" && item.title === "Home")).
                        map((item) =>
                        <SheetClose asChild key={item.title}>
                            <Link
                            to={item.url}
                            className={`text-[18px] font-medium transition-colors duration-200 capitalize ${
                            location.pathname === item.url ?
                            'text-[var(--hills)]' :
                            'text-[var(--ink)] hover:text-[var(--hills)]'}`
                            }
                            style={{ fontFamily: 'var(--font-body)' }}>

                              {item.title}
                            </Link>
                          </SheetClose>
                        )}
                      </nav>

                      <div className="mt-auto py-6 border-t border-[var(--bright-grey)]">
                        <SheetClose asChild>
                          <Link to={createPageUrl("Contact")}>
                            <Button
                              className="btn-cta w-full bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
                              style={{ fontFamily: 'var(--font-body)' }}>

                              Contact
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
        </div>
      </header>

      <main className="pt-20">
        {children}
      </main>

      <footer className="bg-transparent">
        <div className="site-container pb-10">
          <div className="bg-[var(--ink)] text-white rounded-[28px] p-8 md:p-10 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
              <div className="md:col-span-1">
                <div
                  className="text-2xl font-bold mb-2"
                  style={{ color: 'var(--sea-breeze)', fontFamily: 'var(--font-heading)' }}>

                  {brand?.site_name || "Compass Buyers Agency"}
                </div>
                <p className="text-white/80 mx-1 text-sm leading-relaxed max-w-sm">Your trusted partner in the Northern Rivers. We find, assess and secure the right property with local insight and care.

                </p>
              </div>

              <div>
                <div className="text-white/90 font-semibold mb-3">Main Pages</div>
                <ul className="space-y-2 text-white/75">
                  {navigationItems.map((item) =>
                  <li key={item.title}>
                      <Link to={item.url} className="hover:text-white transition-colors">
                        {item.title}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <div>
                <div className="text-white/90 font-semibold mb-3">Other Pages</div>
                <ul className="space-y-2 text-white/75">
                  <li><Link to={createPageUrl("Areas")} className="hover:text-white transition-colors">Areas</Link></li>
                  <li><Link to={createPageUrl("Acquisitions")} className="hover:text-white transition-colors">Acquisitions</Link></li>
                  <li><Link to={createPageUrl("Blog")} className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to={createPageUrl("PrivacyPolicy")} className="hover:text-white transition-colors">Privacy Policy</Link></li>
                </ul>

                <div className="text-white/90 font-semibold mt-5 mb-3">Service Areas</div>
                <ul className="space-y-2 text-white/75">
                  <li><Link to={createPageUrl("GoldCoastBuyersAgent")} className="hover:text-white transition-colors">Gold Coast Buyers Agent</Link></li>
                  <li><Link to={createPageUrl("ByronBayBuyersAgent")} className="hover:text-white transition-colors">Byron Bay Buyers Agent</Link></li>
                  <li><Link to={createPageUrl("TweedHeadsBuyersAgent")} className="hover:text-white transition-colors">Tweed Heads Buyers Agent</Link></li>
                  <li><Link to={createPageUrl("NorthernRiversBuyersAgent")} className="hover:text-white transition-colors">Northern Rivers Buyers Agent</Link></li>
                </ul>
              </div>

              <div>
                <div className="text-white/90 font-semibold mb-3">Follow us</div>
                <ul className="space-y-2 text-white/75">

                  <li><a href="https://www.instagram.com/compassbuyersagency/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="https://www.facebook.com/compassbuyersagency/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-white/70 text-sm leading-relaxed">
              We acknowledge the Bundjalung, Gumbaynggirr and Yaegl people as the Traditional Owners of the land on which we live and work. We honour the First Nations peoples&apos; culture and connection to land, sea and community. We pay our respects to their Elders past, present and emerging.
            </div>

            <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-white/60 text-sm">
                © {new Date().getFullYear()} {brand?.site_name || "Compass Buyers Agency"}. All rights reserved.
              </div>
              <div className="text-white/60 text-sm">
                Built by Roadmap Labs
              </div>
            </div>
          </div>
        </div>
      </footer>

      <AdminPageNavigator />
      {isAdmin && <EditModeToggle enabled={isAdmin} />}
      <GlobalEditableImages />
      </div>
      </EditModeProvider>);

      }
