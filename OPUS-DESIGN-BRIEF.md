# Compass Buyers Agency — Design Uplift Brief for Opus

## What this is
Vite + React SPA for a premium Australian buyers agency. The site is **live and content-populated**, but the design needs a full uplift pass: fonts are not rendering correctly, animations are missing, and mobile experience is rough. Your job is to make it feel like a polished, high-end property brand.

---

## Live site
**https://compass-site.vercel.app**

Browse these pages specifically:
- `/` — Home
- `/about`
- `/acquisitions`
- `/blog`
- `/services`
- `/contact`
- `/team` (or click a team member from About)

---

## Codebase
`/Users/danielkovac/Desktop/compass-site/`

- **Framework**: Vite + React 18 + React Router
- **Styling**: Tailwind CSS + CSS custom properties
- **CMS**: Sanity (read-only on frontend via `src/lib/sanityClient.js`)
- **Deployment**: Vercel (auto-deploys from GitHub `main`)
- **Build**: `npm run build` — currently passes cleanly

---

## Brand system

### Fonts
Two custom fonts are loaded via `@font-face` in `src/index.css`:

| Role | Family | Files in `public/fonts/` |
|------|--------|--------------------------|
| Headings (h1–h6) | `MinervaModern` | `MinervaModern-Regular.otf`, `MinervaModern-Bold.otf` |
| Body / UI | `Aeonik` | `Aeonik-Light.otf`, `Aeonik-Regular.otf`, `Aeonik-Medium.otf`, `Aeonik-Bold.otf` |

CSS variables:
```css
--font-heading: 'MinervaModern', Georgia, "Times New Roman", serif;
--font-body: 'Aeonik', "Helvetica Neue", Helvetica, Arial, sans-serif;
```

### Colours
```css
--hills:       #4B7371   /* primary green — CTAs, accents */
--ink:         #232323   /* near-black body text */
--bright-grey: #ECEBEA   /* light section bg */
--sea-breeze:  #D6EFFB   /* pale blue section bg */
--sand:        #F2ECCE   /* warm cream bg */
--stone:       #AFADA4   /* muted grey for meta text */
```

### Brand voice rules (apply to any copy edits)
- No em dashes (use commas or restructure)
- No "purchase" — use "buy" or "secure"
- Australian English (colour, neighbourhood, etc.)
- Buyer-framed copy, not agency-focused

---

## Known issues to fix

### 1. 🔴 MinervaModern not rendering (PRIORITY)
`document.fonts` shows `MinervaModern 400 — unloaded` even though the `.otf` files return 200 from Vercel. Headings are falling back to Georgia. Aeonik loads fine.

**Likely fix**: The `@font-face` in `src/index.css` is declared before `@tailwind base` — this can cause it to be stripped. Move the `@font-face` blocks *after* `@tailwind utilities`, or add an explicit `<link>` preload in `index.html`. Also check if Tailwind's base reset is overriding `font-family` on headings.

**Test**: After fix, `document.fonts` should show `MinervaModern 400 — loaded` and h1 elements should render in a serif typeface noticeably different from Georgia.

### 2. 🟡 No scroll animations
The site is completely static — elements just appear. It needs subtle scroll-reveal animations that feel premium, not flashy:
- Fade-up on section entry (opacity 0→1, translateY 24px→0, 0.5s ease-out)
- Stagger on card grids (each card delayed by 80ms)
- Subtle parallax on hero background image
- No janky snap or bounce — smooth and confident

Recommended approach: a lightweight `useIntersectionObserver` hook + CSS transitions (avoid heavy libraries). Or use Framer Motion if the bundle size is acceptable.

### 3. 🟡 Mobile experience needs work
- Navigation hamburger menu behaviour (check it opens/closes cleanly)
- Hero section: text is too large on small screens, gets clipped
- Card grids: single-column on mobile but cards feel cramped — need more breathing room
- Acquisition cards: the beds/baths/cars info line wraps awkwardly on narrow screens
- CTA buttons: need minimum tap target of 44px height on mobile
- Section padding: inconsistent — some sections have too little padding on mobile

### 4. 🟠 Typography scale
Once MinervaModern loads, check the hierarchy feels right:
- H1: large, editorial, generous line-height (~1.05)
- H2: section headings, slightly tighter
- H3: card titles, should not compete with H2
- Body: Aeonik Regular/Light, comfortable line-height (~1.6)
- Currently `font-weight: 400` is forced on all headings — this is correct for MinervaModern but double-check it looks intentional

### 5. 🟢 Polish items
- Card hover states: subtle shadow lift + slight translateY(-2px)
- Button transitions: 200ms ease on bg-color and shadow
- Image loading: acquisition/blog card images should have a grey skeleton placeholder while loading
- Testimonials section on home page: currently just shows a static quote — should pull from Sanity's 3 testimonials and display them in a carousel or grid

---

## Key files

### Styles
- `src/index.css` — @font-face, CSS variables, base layer
- `tailwind.config.js` — font family tokens, custom keyframes

### Home page sections (biggest visual impact)
- `src/components/home/HomeHero.jsx` — hero section, font most visible here
- `src/components/home/RecentAcquisitionsStrip.jsx` — 3-column acquisition cards
- `src/components/home/TestimonialsPlaceholder.jsx` — currently static, should use Sanity
- `src/components/home/WhyStandOutGrid.jsx` — feature grid
- `src/components/home/Regions.jsx` — areas section
- `src/components/home/ServicesAccordionShowcase.jsx` — services list

### Shared
- `src/components/shared/CTASection.jsx` — bottom CTA on most pages
- `src/components/shared/ReviewsBadge.jsx` — star badge in hero
- `src/components/acquisitions/AcquisitionCard.jsx` — property card used across site

### CSS utility classes used (check `src/index.css` or grep the codebase)
- `.site-container` — max-width wrapper
- `.btn-cta` — primary CTA button
- `.btn-outline-brand` — outline variant

---

## Sanity data available (all populated, no auth needed for reads)
| Type | Count | Key fields |
|------|-------|-----------|
| acquisition | 55 | title, suburb, state, beds, baths, purchase_price, main_image_url, market_visibility (On/Off Market) |
| blogPost | 28 | title, excerpt, featured_image, category, published_date |
| teamMember | 5 | name, position, bio, photo |
| testimonial | 3 | name, quote, rating, location |
| caseStudy | 6 | title, excerpt, featured_image, property_type, location |

Sanity project: `31tdhl52`, dataset: `production`
Client in: `src/lib/sanityClient.js`

---

## Deploy workflow
```bash
cd /Users/danielkovac/Desktop/compass-site
npm run build          # verify no errors first
npx vercel --prod --yes
git add -A && git commit -m "..." && git push
```
Vercel auto-deploys on push to `main` too.

---

## What we want the end result to feel like
Think **premium Australian property brand** — the kind of site a boutique Sydney or Melbourne buyers agency would have. Clean, generous whitespace, confident typography, subtle motion that shows craft without showing off. Not flashy. Not corporate. Warm, local, trustworthy.

Reference: the colour palette (green, cream, warm grey) should feel like Northern NSW coastal — earthy, natural, considered.
