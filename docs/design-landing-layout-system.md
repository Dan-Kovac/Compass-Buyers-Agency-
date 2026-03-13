# Landing Page Layout System

**Design spec for Phase 7 - Landing Pages**
**Compass Buyers Agency website**
**Designed: 2026-03-07**

---

## 1. Design Intent

Landing pages are the site's sharpest commercial tool. Each one targets a high-intent Google search ("buyers agent byron bay", "gold coast buyers agent") and needs to convert a stranger into a conversation. The layout system wraps these pages with trust signals, persistent calls-to-action, and clear navigation context -- without making the pages feel like an aggressive sales funnel. The mood stays consistent with the rest of the site: relaxed coastal luxury, generous space, warm tones. The conversion machinery should feel like helpful signposting, not pressure.

---

## 2. Current Architecture (Context)

### What exists today

- **6 landing pages**, each a React component that passes a hardcoded `DATA` object to `LandingPageTemplate.jsx`
- **LandingPageTemplate** renders: `LandingHero` > `StatsBar` > `InfoSplit`(s) > `ImageBand` > `Suburbs` > `Approach` > `FAQ` > shared sections (`AboutExpertise`, `ServicesAccordionShowcase`, `RecentAcquisitionsStrip`, `TestimonialSection`, `Regions`, `WhyStandOutGrid`) > `CTASection` > JSON-LD
- **LandingHero** has its own rounded-corner inset styling (mx-3/4/6/8 + mt-2/5) and staggered entrance animation
- **StatsBar** sits immediately below the hero -- dark ink background, compact padding, up to 4 stats
- **Layout.jsx** wraps all pages (including landing pages) with header, footer, and the existing `StickyMobileCTA`
- **StickyMobileCTA** already exists globally -- fixed bottom bar on mobile with "Call" and "Enquire" buttons, appears after 400px scroll, hidden on Contact page
- **RegionLinksGrid** already exists on the Areas page -- a 3-column card grid listing all 6 landing pages with text-only cards (no images)
- All landing pages are lazy-loaded in `pages.config.js`
- Routes defined via `PAGE_SLUGS` in `utils/index.ts` (all kebab-case, e.g. `/byron-bay-buyers-agent`)

### What the landing pages lack

1. No trust signals between the hero and content (the StatsBar shows market data, not credibility)
2. No breadcrumb navigation for SEO internal linking or user orientation
3. No cross-linking between landing pages (no "Explore nearby areas" at the end)
4. The StickyMobileCTA is generic -- it doesn't adapt its messaging for landing page context
5. The RegionLinksGrid uses text-only cards -- effective but not visually compelling enough for the Areas page hero position

---

## 3. LandingLayout Wrapper

### 3.1 Component Overview

Create `LandingLayout.jsx` in `/src/components/landing/`. This is **not** a replacement for `Layout.jsx` -- it wraps the content *inside* the existing Layout. Each landing page component will wrap its `<LandingPageTemplate>` call inside `<LandingLayout>`.

```
Layout.jsx (header, footer, StickyMobileCTA)
  └── LandingLayout.jsx (trust bar, breadcrumb, nearby areas)
        └── LandingPageTemplate.jsx (hero, content sections, CTA)
```

### 3.2 Props

```ts
interface LandingLayoutProps {
  children: React.ReactNode;
  regionName: string;         // e.g. "Byron Bay"
  breadcrumbLabel?: string;   // Override for breadcrumb text. Defaults to regionName
  nearbyAreas?: Array<{       // Other landing pages to cross-link
    name: string;
    slug: string;
    tagline?: string;
  }>;
}
```

### 3.3 Render Order

```
<div>
  {children}                    <!-- LandingPageTemplate renders hero + all content -->
  <NearbyAreasStrip />          <!-- Cross-links to other landing pages -->
</div>
```

**Important**: The trust bar and breadcrumb are injected *inside* `LandingPageTemplate`, not outside it. This is because they need to sit between the hero and the first content section. See section 4 for the injection strategy.

---

## 4. Trust Bar

### 4.1 Purpose

A compact horizontal strip of credibility signals that sits between the StatsBar and the first InfoSplit section. The StatsBar already handles market data ("$2.45M median", "42% off-market"). The trust bar handles company credibility -- who we are, what makes us different, why you should keep reading.

### 4.2 Position in Page Flow

```
LandingHero
StatsBar (market data -- dark ink background)
TrustBar <-- NEW
Breadcrumb <-- NEW
InfoSplit sections...
```

### 4.3 Implementation Strategy

Rather than building a separate wrapper, add `trustSignals` and `breadcrumb` as optional props to `LandingPageTemplate`. This avoids a wrapper-within-a-wrapper and keeps the render sequence clean.

```ts
// New props on LandingPageTemplate
trustSignals?: Array<{
  icon: string;       // Lucide icon name
  text: string;
}>;
breadcrumb?: {
  regionName: string;
  regionSlug?: string;
};
nearbyAreas?: Array<{
  name: string;
  slug: string;
  tagline?: string;
}>;
```

### 4.4 Visual Design

**Height**: 52px (desktop), auto-wrap on mobile
**Background**: `bg-sand-wash` (warm radial gradient -- consistent with the site's atmospheric palette)
**Border**: 1px solid `var(--border)` top and bottom for subtle separation

**Content**: Three trust points, horizontally centred, separated by a thin vertical divider.

| # | Icon (Lucide) | Text |
|---|---|---|
| 1 | `Shield` | Licensed Buyers Agent |
| 2 | `TrendingUp` | 42% Off-Market Access |
| 3 | `MapPin` | Northern Rivers & Gold Coast |

These three are hardcoded defaults. Individual landing pages can override them via the `trustSignals` prop if a specific region warrants different messaging (e.g., a Gold Coast page might say "Southern Gold Coast to Burleigh" instead of "Northern Rivers & Gold Coast").

**Typography**:
- Font: `var(--font-body)` (Aeonik)
- Size: 0.8125rem (13px)
- Weight: `var(--font-body-medium)` (500)
- Colour: `var(--ink)` for text, `var(--hills)` for icons
- Letter spacing: 0.01em
- Vertical divider: 1px solid `var(--border)`, height 20px, margin 0 1.5rem (desktop)

**Hover**: None. This is informational, not interactive.

### 4.5 Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| **Desktop** (>=1024px) | Single row, flexbox `justify-center`, `gap: 0`, items separated by vertical dividers |
| **Tablet** (768-1023px) | Single row, same as desktop but tighter horizontal padding. If items overflow, wrap to two rows (unlikely with 3 items) |
| **Mobile** (<768px) | Stack vertically. Each trust point on its own line. No dividers. Left-aligned within a centred block. Compact vertical padding (py-3). Icon + text on same line per item. |

### 4.6 CSS Class

```css
.trust-bar {
  padding: var(--section-padding-compact) 0;  /* Reuse existing compact spacing */
}
```

This is intentionally compact. The trust bar should feel like a ribbon, not a full section. Override the section-padding-compact only if it feels too tall -- target 52px total height on desktop.

---

## 5. Breadcrumb Navigation

### 5.1 Purpose

Provides user orientation ("where am I?") and creates SEO-valuable internal links back to the Areas hub page and the homepage. Google displays breadcrumbs in search results when marked up with JSON-LD, improving click-through rate.

### 5.2 Position

Immediately below the trust bar, above the first InfoSplit section. Sits inside `site-container`.

### 5.3 Visual Design

```
Home  >  Areas  >  Byron Bay
```

**Typography**:
- Font: `var(--font-body)` (Aeonik)
- Size: 0.8125rem (13px)
- Weight: `var(--font-body-light)` (300)
- Colour: `var(--stone)` for links, `var(--ink)` for current page (non-linked)
- Separator: `>` character in `var(--stone)` at 50% opacity, with `0 0.5rem` horizontal margin
- Link hover: `var(--hills)` colour transition

**Spacing**: `padding: 1rem 0 0 0` (top only -- minimal, since the trust bar above provides the section break). No bottom padding needed because the next section (InfoSplit) has its own `var(--section-padding)`.

### 5.4 Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| **Desktop/Tablet** (>=768px) | Visible. Full breadcrumb trail. |
| **Mobile** (<768px) | **Hidden**. Mobile screens don't need breadcrumbs -- the navigation hierarchy is clear from the hamburger menu, and breadcrumbs consume valuable above-the-fold space. |

### 5.5 JSON-LD Breadcrumb Schema

Add a `BreadcrumbList` schema alongside the existing `LocalBusiness` and `FAQPage` schemas at the bottom of `LandingPageTemplate`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://compassagency.com.au/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Areas",
      "item": "https://compassagency.com.au/areas"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Byron Bay Buyers Agent",
      "item": "https://compassagency.com.au/byron-bay-buyers-agent"
    }
  ]
}
```

---

## 6. Sticky Mobile CTA (Enhancement)

### 6.1 Current State

`StickyMobileCTA.jsx` already exists in `/src/components/shared/` and is rendered globally by `Layout.jsx`. It shows "Call" and "Enquire" buttons on mobile after 400px scroll, hidden on the Contact page.

### 6.2 Decision: Enhance, Don't Duplicate

Do **not** build a separate sticky CTA for landing pages. Instead, enhance the existing `StickyMobileCTA` to accept optional props via React context or direct prop drilling through Layout.

### 6.3 Landing Page Enhancement

When the current page is a landing page, the sticky CTA could show a slightly more specific label. However, the current "Call" + "Enquire" pattern is already strong and conversion-tested. The recommendation is to **leave the StickyMobileCTA as-is** for now and revisit only if analytics show low engagement on landing pages.

**Rationale**: The existing component already:
- Uses safe-area padding for notch phones
- Shows/hides based on scroll position (400px threshold)
- Hides on the Contact page
- Has the correct `z-50` stacking
- Uses the brand colours and typography

Adding landing-page-specific text ("Book Free Byron Bay Consultation") risks making the component overly complex for marginal gain. The call-to-action at this level should be generic ("Call" / "Enquire") because the user already knows the context from the page content.

### 6.4 One Small Fix

The existing component currently checks `location.pathname === "/contact"` to hide itself. This should be updated to also hide when the user has scrolled to the bottom CTA section of any page (where a large CTA block already provides the same action). This prevents visual redundancy at the page footer.

**Implementation**: Use an IntersectionObserver on the `CTASection` element. When the CTA section enters the viewport, hide the sticky bar. When it exits, show it again.

---

## 7. Nearby Areas Cross-Link Section

### 7.1 Purpose

At the bottom of each landing page (after the shared sections, before the final CTA), show 2-3 cards linking to other landing pages in the same region or nearby regions. This creates a web of internal links that:
- Keeps users exploring (reduces bounce)
- Distributes PageRank across landing pages
- Helps Google understand the geographic relationship between pages

### 7.2 Position in Page Flow

```
...shared sections (AboutExpertise, Services, Acquisitions, Testimonials, Regions, WhyStandOut)
NearbyAreasStrip <-- NEW
CTASection (final dark CTA)
```

### 7.3 Visual Design

**Section background**: `bg-white` (clean break before the dark CTA)
**Padding**: `var(--section-padding) 0`

**Header**:
- Eyebrow: "Explore Nearby"
- Heading: "Buyers Agent in Other Areas"
- Use `SectionHeader` component, align centre, no divider

**Cards**: 2-3 cards in a horizontal row. Each card uses the existing `.surface` utility class (white background, subtle border, card shadow, hover shadow lift).

| Element | Spec |
|---|---|
| Card width | Equal columns: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` |
| Card padding | `clamp(1.25rem, 2.5vw, 1.75rem)` |
| Region name | `var(--font-heading)`, `clamp(1.125rem, 1.8vw, 1.375rem)`, weight 400 |
| Tagline | `var(--font-body)`, `var(--font-body-light)`, `0.875rem`, `var(--stone)` |
| Arrow | Reuse `CardArrow` SVG from `RegionLinksGrid.jsx`. Slides right 4px on hover. |
| Card hover | `var(--shadow-hover)`, `translateY(-2px)`, border fades to transparent |

**Card content** (no images -- matches the existing RegionLinksGrid pattern):
```
┌──────────────────────────────┐
│  Byron Bay                   │
│  $2.45M median. 42% off-     │
│  market. 5+ competing        │
│  bidders.                    │
│                         →    │
└──────────────────────────────┘
```

### 7.4 Data Source

Each landing page's `DATA` object will include a `nearbyAreas` array. Example for the Tweed Heads page:

```js
nearbyAreas: [
  { name: "Byron Bay", slug: "/byron-bay-buyers-agent", tagline: "$2.45M median. Byron Shire's toughest market." },
  { name: "Gold Coast", slug: "/gold-coast-buyers-agent", tagline: "Southern Gold Coast from Burleigh to Coolangatta." },
  { name: "Brunswick Heads", slug: "/brunswick-heads-buyers-agent", tagline: "Village charm. Undervalued relative to Byron." },
]
```

### 7.5 Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| **Desktop** (>=1024px) | 3 cards in a row |
| **Tablet** (768-1023px) | 2 cards in a row (third wraps or is hidden if only 2 provided) |
| **Mobile** (<768px) | Single column stack. Full-width cards. |

### 7.6 Exclusion Rule

The nearby areas section should **not** show the current page's own region. Filter it out at render time by comparing `nearbyAreas[].slug` against `location.pathname`.

---

## 8. Landing Pages Directory (Areas Page Enhancement)

### 8.1 Decision: Enhance RegionLinksGrid, Don't Create a New Page

The Areas page already has `RegionLinksGrid` at the bottom. Rather than building a standalone "/landing-pages" directory page, **elevate the existing RegionLinksGrid** to be more visually compelling.

### 8.2 Current RegionLinksGrid Problems

1. Text-only cards feel sparse compared to the richly visual ShireFeature sections above
2. No images, no stats -- the cards don't give users a reason to click
3. The section is at the very bottom of a long page -- many users never reach it
4. The section heading ("Buyers Agent by Location") is generic

### 8.3 Enhanced RegionLinksGrid Design

**Keep its position** at the bottom of the Areas page (after the shires, before the CTA). Moving it higher would break the narrative flow of the page.

**Upgrade the cards** to include:
1. A representative image (aerial/lifestyle photo of the region)
2. One headline stat (e.g. "Median $2.45M" or "12 suburbs covered")
3. The region name and tagline

**Card structure**:
```
┌──────────────────────────────┐
│  ┌──────────────────────┐    │
│  │                      │    │
│  │   [Region Image]     │    │
│  │                      │    │
│  └──────────────────────┘    │
│                              │
│  Byron Bay                   │
│  $2.45M median. 42% off-    │
│  market access.              │
│                              │
│  View guide →                │
└──────────────────────────────┘
```

**Image specs**:
- Aspect ratio: 16:9
- `object-fit: cover`, `border-radius: var(--radius-lg)` on image container
- Height: ~160px desktop, ~140px mobile
- `overflow: hidden` on container for the subtle zoom-on-hover effect (reuse `.surface img` transition)
- Images can be hardcoded URLs initially (Unsplash or owned photography), with a path to Sanity later

**Updated data shape** for `RegionLinksGrid`:

```ts
interface RegionLink {
  name: string;
  slug: string;
  subtitle: string;
  image: string;         // NEW: image URL
  stat?: string;         // NEW: e.g. "Median $2.45M"
  statLabel?: string;    // NEW: e.g. "Median Price"
}
```

**Grid**: Keep the existing `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` responsive pattern. The 6 cards fill a clean 2x3 grid on desktop.

### 8.4 Section Styling

- **Background**: Keep `bg-sea-wash` (the cool counterpoint works well as a visual break before the dark CTA)
- **Section header**: Update heading to "Explore by Region" (more action-oriented)
- **Eyebrow**: Keep "Explore Further"

---

## 9. Navigation & Discovery

### 9.1 How Users Find Landing Pages

Landing pages serve three audiences:
1. **Google searchers**: Arrive directly from search ("buyers agent byron bay"). No navigation needed -- they're already there.
2. **Site explorers**: Browsing the main site, want to drill into a specific area. Need clear paths.
3. **Cross-navigators**: On one landing page, want to explore a different region. Need the nearby areas section.

### 9.2 Navigation Touchpoints

| Touchpoint | Current State | Recommendation |
|---|---|---|
| **Main nav "Areas" link** | Links to `/areas` page | Keep as-is. The Areas page is the hub. |
| **Areas page RegionLinksGrid** | Text-only cards at page bottom | Enhance with images and stats (section 8) |
| **Footer "Service Areas" column** | Lists 4 of 6 landing pages | Update to list all 6 landing pages |
| **Landing page "Nearby Areas"** | Does not exist | Add cross-link section (section 7) |
| **Shire suburb listings** | Some suburbs have `landingPageSlug` field | Ensure all relevant suburbs link to their landing page |

### 9.3 Decision: No Mega Menu

A mega menu dropdown under "Areas" in the main nav was considered and rejected:

- The nav currently has 8 items and a CTA button. Adding a mega menu adds visual complexity to the header, which conflicts with the minimalist brand.
- Landing pages are SEO entry points, not primary navigation destinations. Users who arrive via the main site naturally flow through Areas > RegionLinksGrid > Landing Page.
- The mobile sheet menu has no good mega-menu pattern -- it would require a nested accordion, which adds friction.
- The footer already lists landing pages. Adding them to the nav creates redundancy.

### 9.4 Footer Update

The footer's "Service Areas" column currently lists 4 of 6 landing pages. Update it to include all 6:

```
Service Areas
  Byron Bay
  Gold Coast
  Tweed Heads
  Northern Rivers
  Brunswick Heads        <-- ADD
  Southern Gold Coast    <-- ADD
```

---

## 10. File Structure

### New files

```
src/components/landing/TrustBar.jsx          — Trust signal strip
src/components/landing/Breadcrumb.jsx        — Breadcrumb navigation with JSON-LD
src/components/landing/NearbyAreasStrip.jsx  — Cross-link cards to related regions
```

### Modified files

```
src/components/landing/LandingPageTemplate.jsx  — Add TrustBar, Breadcrumb, NearbyAreasStrip
src/components/regions/RegionLinksGrid.jsx       — Upgrade cards with images and stats
src/Layout.jsx                                   — Add 2 missing landing pages to footer
```

### NOT modified

```
src/components/shared/StickyMobileCTA.jsx  — Leave as-is (already works well)
src/components/landing/LandingHero.jsx     — No changes needed
src/components/landing/StatsBar.jsx        — No changes needed
src/App.jsx                                — No route changes needed
src/utils/index.ts                         — No slug changes needed
```

---

## 11. Updated Landing Page Flow

After implementation, each landing page renders this sequence:

```
Layout.jsx header (fixed)
│
├── LandingHero (video/image, h1, subtitle, CTA button)
├── StatsBar (dark ink, 4 market stats)
├── TrustBar (sand-wash, 3 trust signals)                     ← NEW
├── Breadcrumb (Home > Areas > Region Name)                   ← NEW
├── InfoSplit sections (alternating backgrounds)
├── ImageBand (atmospheric)
├── Suburbs section (sand-wash)
├── Approach section (white)
├── FAQ section (sand-wash)
├── AboutExpertise (shared)
├── ServicesAccordionShowcase (shared)
├── RecentAcquisitionsStrip (shared)
├── TestimonialSection (shared)
├── Regions (shared)
├── WhyStandOutGrid (shared)
├── NearbyAreasStrip (white, 2-3 cross-link cards)            ← NEW
├── CTASection (dark, final conversion)
├── JSON-LD (LocalBusiness + FAQPage + BreadcrumbList)
│
Layout.jsx footer
StickyMobileCTA (mobile only, scroll-triggered)
```

---

## 12. Component Interaction Map

```
ByronBayBuyersAgent.jsx (page)
  ├── SEOHead (meta tags)
  └── LandingPageTemplate
        ├── LandingHero
        ├── StatsBar
        ├── TrustBar          ← receives trustSignals[] prop
        ├── Breadcrumb         ← receives breadcrumb.regionName prop
        ├── InfoSplit (x N)
        ├── ImageBand
        ├── Suburbs
        ├── Approach
        ├── FAQAccordion
        ├── [shared sections]
        ├── NearbyAreasStrip   ← receives nearbyAreas[] prop
        ├── CTASection
        └── JSON-LD scripts
```

---

## 13. Landing Page Data Updates

Each landing page's `DATA` object needs three new fields:

```js
// Add to each landing page's DATA object:

trustSignals: [
  { icon: "Shield", text: "Licensed Buyers Agent" },
  { icon: "TrendingUp", text: "42% Off-Market Access" },
  { icon: "MapPin", text: "Northern Rivers & Gold Coast" },
],

breadcrumb: {
  regionName: "Byron Bay",
},

nearbyAreas: [
  { name: "Brunswick Heads", slug: "/brunswick-heads-buyers-agent", tagline: "Village feel. Undervalued relative to Byron." },
  { name: "Northern Rivers", slug: "/northern-rivers-buyers-agent", tagline: "Hinterland to coast. The full Northern Rivers." },
  { name: "Gold Coast", slug: "/gold-coast-buyers-agent", tagline: "Southern Gold Coast from Burleigh to Coolangatta." },
],
```

If `trustSignals` is not provided, `TrustBar` uses hardcoded defaults. This means existing landing pages work without changes -- the trust bar just appears with sensible defaults.

---

## 14. Acceptance Criteria

### Trust Bar
- [ ] Renders between StatsBar and first InfoSplit on all landing pages
- [ ] Shows 3 trust signals with Lucide icons
- [ ] Compact height (~52px desktop)
- [ ] Sand-wash background with subtle borders
- [ ] Stacks vertically on mobile, horizontal on desktop
- [ ] Respects `prefers-reduced-motion`

### Breadcrumb
- [ ] Renders below trust bar: Home > Areas > [Region Name]
- [ ] Home and Areas are links; region name is plain text
- [ ] Hidden on mobile (<768px)
- [ ] BreadcrumbList JSON-LD schema injected
- [ ] Links use correct slugs from PAGE_SLUGS

### Nearby Areas Strip
- [ ] Renders between WhyStandOutGrid and CTASection
- [ ] Shows 2-3 cards linking to other landing pages
- [ ] Current page is excluded from the list
- [ ] Cards use .surface hover behaviour
- [ ] Responsive: 3-col desktop, 2-col tablet, 1-col mobile

### RegionLinksGrid Enhancement
- [ ] Cards include representative image (16:9 aspect)
- [ ] Cards include one headline stat
- [ ] Image zoom-on-hover matches .surface img behaviour
- [ ] All 6 landing pages represented

### Footer
- [ ] "Service Areas" column lists all 6 landing pages
- [ ] Links use correct kebab-case slugs

### General
- [ ] No new route changes needed
- [ ] No changes to StickyMobileCTA
- [ ] All new components use ScrollReveal for entrance animation
- [ ] All typography uses CSS custom properties (no hardcoded pixel values for font sizes)
- [ ] prefers-reduced-motion respected throughout

---

## 15. Engineering Notes

1. **TrustBar icon mapping**: Use a simple lookup object mapping icon name strings to Lucide React components. Import only the 3-4 icons needed (Shield, TrendingUp, MapPin, CheckCircle) to avoid bundle bloat.

2. **Breadcrumb JSON-LD**: Inject via `<script type="application/ld+json">` alongside the existing LocalBusiness and FAQPage schemas in `LandingPageTemplate`. Use the same `dangerouslySetInnerHTML` pattern.

3. **NearbyAreasStrip**: Extract the `CardArrow` SVG component from `RegionLinksGrid.jsx` into a shared location (or just duplicate it -- it's 15 lines). Both components need it.

4. **RegionLinksGrid images**: Start with Unsplash URLs hardcoded in the `regionLinks` array. These can be moved to Sanity later when the CMS-driven landing pages ticket is addressed.

5. **Build impact**: Three new leaf components (TrustBar, Breadcrumb, NearbyAreasStrip) are small. They'll be included in the landing page lazy chunks, not the main bundle. Estimated additional bundle size: < 3KB gzipped total.

6. **Testing**: Each landing page should be visually verified at 375px (mobile), 768px (tablet), and 1280px (desktop). The trust bar vertical stacking and breadcrumb hide/show are the main responsive concerns.
