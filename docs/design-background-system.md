# Section Background Alternation System

**Design spec for Phase 5B - Backgrounds**
**Compass Buyers Agency website**
**Designed: 2026-03-07**

---

## 1. Design Intent

The background system creates a slow, breathing rhythm as the visitor scrolls. Each colour shift marks a change in content purpose -- from narrative to proof to action -- the way a magazine uses paper stock and white space to signal what matters next. The palette stays within the coastal landscape: warm sand, open white, cool sea wash, and deep editorial dark. Nothing sudden. Nothing decorative for its own sake. Every shift earns its place.

---

## 2. Background Palette

Six background treatments. No more. Restraint is the system.

### Light Backgrounds (content sections)

| Token | CSS class | Visual | Use for |
|---|---|---|---|
| **White** | `bg-white` | Pure `#FFFFFF` | Primary content. Feature splits, FAQ, form sections. The default. |
| **Sand Wash** | `bg-sand-wash` | Warm radial gradient over faint sand linear | Alternating content. Feature splits, testimonials, team grids. Warmth without weight. |
| **Cream** | `bg-cream` | Solid linear gradient `#FAF7EE` to `#F5F0E1` | Elevated warm sections. Process steps, regions grid, pull quotes. Richer than sand wash. |
| **Sea Wash** | `bg-sea-wash` | Cool radial gradient over faint sea-breeze linear | Rare accent. Region links grid, special callouts. Cool counterpoint to sand. Use sparingly -- once per page maximum. |

### Warm Gradient (page headers only)

| Token | CSS class | Visual | Use for |
|---|---|---|---|
| **Warm Gradient** | `bg-warm-gradient` | White fading into faint sand, touched with sea-breeze | Interior page headers only. Never for content sections. |

### Dark Backgrounds (contrast sections)

| Token | CSS class | Visual | Use for |
|---|---|---|---|
| **Editorial Dark** | `bg-editorial-dark` | Ink `#232323` with subtle dark-teal gradient toward `#1a2f2e` | Stats bars, CTA sections, services accordion showcase. Maximum once or twice per page. |
| **Ink** (inline) | `backgroundColor: var(--ink)` | Solid `#232323` | Trust bar on homepage only. Pure black-like anchor. |

---

## 3. Alternation Rules

These rules govern how backgrounds flow section-to-section. The engineer should treat these as hard constraints.

### Never

1. **Never two identical backgrounds in a row.** White-white, sand-sand, cream-cream are all forbidden. Even if an ImageBand separates them visually, the sections themselves must differ.
2. **Never two dark sections in a row.** Editorial-dark followed by ink (or vice versa) creates a cave. Always place a light section or ImageBand between dark sections.
3. **Never use sea-wash more than once per page.** It is a cool accent that loses its power with repetition.
4. **Never use cream more than twice per page.** Cream is richer than sand wash and should feel intentional, not default.
5. **Never start a page with sand-wash or cream.** Interior pages open with `bg-warm-gradient` page headers. The homepage opens with the hero (dark video overlay). The first content section after any header should be white or sand-wash to establish contrast with what came before.

### Always

1. **A dark section (editorial-dark) must be preceded and followed by a light section or ImageBand.** Dark sections are punctuation marks -- they need breathing room.
2. **ImageBands act as palette resets.** After an ImageBand, the next section can use any light background regardless of what came before the band.
3. **The final CTA section uses `bg-editorial-dark` variant="dark".** Every page closes with a dark CTA. This is a brand signature. Non-negotiable.
4. **Page headers use `bg-warm-gradient` with the `page-header` class.** Applies to About, Services, Contact, Areas (text header variant), and Who We Work With. Homepage and landing pages use full-bleed hero components instead.
5. **The primary alternation pattern for content sections is: white, sand-wash, white, sand-wash.** Cream and sea-wash break this pattern intentionally for specific section types.

### Preferred Sequences

These are the ideal two-section and three-section patterns:

```
white  ->  sand-wash  ->  white           (standard alternation)
white  ->  sand-wash  ->  editorial-dark  (build to contrast)
white  ->  cream      ->  white           (warm emphasis)
sand-wash -> white    ->  sand-wash       (inverted alternation)
sand-wash -> editorial-dark -> white      (dark as punctuation)
```

---

## 4. Page-by-Page Specification

### 4.1 Homepage

The homepage is the brand's first impression. It moves from cinematic dark to warm light, builds trust, then closes dark. The rhythm is: immersive, proof, editorial, breathe, showcase, proof, warm, explore, answer, act.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Hero | `HomeHero` | Dark video overlay (inherent) | Cinematic entry. Full-bleed. Not a CSS background class. |
| 2 | Trust stats | `TrustBar` | `var(--ink)` inline | Dense dark bar. Anchors the hero to the content below. |
| 3 | Services accordion | `ServicesAccordionShowcase` | `bg-editorial-dark` | Dark editorial. Pairs with trust bar through visual weight but separated by different dark treatment (solid ink vs gradient). |
| 4 | Image band | `ImageBand` | Full-bleed image | Palette reset. Breathing room after two dark sections. |
| 5 | Acquisitions | `RecentAcquisitionsStrip` | **`bg-white`** | Clean showcase for property cards. White lets photography lead. |
| 6 | Testimonials | `TestimonialSection` | **`bg-sand-wash`** | Warm ground for video cards. Alternates from white. |
| 7 | Working with us | `InvestmentAndRelationship` | **`bg-white`** | Feature split with image. White keeps the image prominent. |
| 8 | Regions | `Regions` | **`bg-cream`** | Richer warm tone for destination cards. Cream signals "explore" -- a different content mode. |
| 9 | FAQ | `HomeFAQ` | **`bg-white`** | Clean, scannable. White for dense text content. |
| 10 | CTA | `CTASection` variant="dark" | `bg-editorial-dark` | Dark close. Brand signature. |

**Current state vs. spec changes:**
- Section 5 (Acquisitions): Currently `bg-white` -- **no change needed**.
- Section 7 (InvestmentAndRelationship): Currently `bg-white` -- **no change needed** (was previously labelled sand-wash in comments but renders white).
- Section 9 (FAQ): Currently `bg-white` -- **no change needed**.

### 4.2 About

The About page is personal and editorial. It moves from warm header through alternating story sections, pauses at a dark proof point, then closes with team and CTA.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Page header | `<section>` | `bg-warm-gradient` | Standard interior page header. |
| 2 | Philosophy quote | `PullQuoteBreak` | **`bg-white`** | White. Clean breath after the warm header. The quote stands alone. |
| 3 | Feature split 1 (Local Knowledge) | `FeatureSplit` variant="sand" | **`bg-sand-wash`** | Warm. Image right. Alternates from white. |
| 4 | Feature split 2 (Buyers Only) | `FeatureSplit` variant="white" | **`bg-white`** | Clean. Image left. Alternates from sand. |
| 5 | Stats band | `<section>` | `bg-editorial-dark` | Dark punctuation. Proof point between narrative and team. |
| 6 | Team grid | `<section>` | **`bg-sand-wash`** | Warm ground for white team cards. Cards pop on sand wash. |
| 7 | CTA | `CTASection` variant="dark" | `bg-editorial-dark` | Dark close. |

**Current state vs. spec:** Matches existing implementation. No changes needed.

### 4.3 Services

The Services page is the longest content page. It uses a strict white/sand alternation for the four service segments, broken by a dark stats section in the middle, an ImageBand, and a cream process section.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Page header | `<section>` | `bg-warm-gradient` | Standard interior page header. |
| 2 | Segments nav | `SegmentsNav` | `bg-white` (inherits from page) | Minimal. Navigation sits on white. |
| 3 | Segment 1 (Full advocacy) | `SegmentSection` | **`bg-white`** | First segment. Image right. |
| 4 | Segment 2 (Sourcing) | `SegmentSection` | **`bg-sand-wash`** | Alternates. Image left. |
| 5 | Stats break | `ServiceStats` | `bg-editorial-dark` | Dark punctuation between segment pairs. |
| 6 | Segment 3 (Auction) | `SegmentSection` | **`bg-white`** | Resumes alternation after dark. Image right. |
| 7 | Segment 4 (Portfolio) | `SegmentSection` | **`bg-sand-wash`** | Alternates. Image left. |
| 8 | Image band | `ImageBand` | Full-bleed image | Palette reset before process. |
| 9 | Process steps | `ProcessSteps` | **`bg-cream`** | Richer warm for the timeline. Cream signals a different content mode (process vs. features). |
| 10 | CTA | `CTASection` variant="dark" | `bg-editorial-dark` | Dark close. |

**Current state vs. spec:** Matches existing implementation. No changes needed.

### 4.4 Contact

The Contact page is short. Warm header, clean form section, atmospheric close.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Page header | `<section>` | `bg-warm-gradient` | Standard interior page header. |
| 2 | Contact grid + form | `<section>` | **`bg-white`** | Clean. The form card has its own warm internal gradient. White keeps the page light and approachable. |
| 3 | Image band | `ImageBand` | Full-bleed image | Atmospheric close. No CTA section -- the form IS the conversion. |

**Current state vs. spec:** Matches existing implementation. No changes needed. Note: Contact page intentionally omits the dark CTA because the entire page is a conversion point.

### 4.5 Areas

The Areas page uses a map-like rhythm: image hero, intro, then alternating shire features broken by an ImageBand, then a cool-toned links grid.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Hero | `AreasHero` | Full-bleed image overlay | Cinematic. Like homepage hero but without video. |
| 2 | Region intro | `<section>` | **`bg-white`** | Clean text intro. |
| 3 | Byron Shire | `ShireFeature` | **`bg-white`** | Image right. First shire on white. |
| 4 | Tweed Shire | `ShireFeature` | **`bg-sand-wash`** | Image left. Alternates. |
| 5 | Image band | `ImageBand` | Full-bleed image | Palette reset between shire pairs. |
| 6 | Ballina Shire | `ShireFeature` | **`bg-white`** | Image right. Resumes alternation. |
| 7 | Gold Coast | `ShireFeature` | **`bg-sand-wash`** | Image left. Alternates. |
| 8 | Region links grid | `RegionLinksGrid` | **`bg-sea-wash`** | Cool accent. Sea wash for the link cards -- signals navigation/exploration. Distinct from content sections. |
| 9 | CTA | `CTASection` variant="dark" | `bg-editorial-dark` | Dark close. |

**Current state vs. spec:** Matches existing implementation. No changes needed.

### 4.6 Who We Work With

The longest page. Nine segment sections in three trios, separated by an ImageBand and a PullQuoteBreak. Uses strict white/sand alternation within each trio.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Page header | `<section>` | `bg-warm-gradient` | Standard interior page header. |
| 2 | Segment card grid | `SegmentCardGrid` | **`bg-white`** | Navigation grid. White base for image cards. |
| 3 | Trio 1, Seg 1 (First Home) | `SegmentSection` | **`bg-white`** | Starts on white. |
| 4 | Trio 1, Seg 2 (Downsizers) | `SegmentSection` | **`bg-sand-wash`** | Alternates. |
| 5 | Trio 1, Seg 3 (Prestige) | `SegmentSection` | **`bg-white`** | Alternates back. |
| 6 | Image band | `ImageBand` | Full-bleed image | Palette reset between trios. |
| 7 | Trio 2, Seg 1 (Interstate) | `SegmentSection` | **`bg-sand-wash`** | Inverted start -- sand after the ImageBand reset. Breaks predictability. |
| 8 | Trio 2, Seg 2 (International) | `SegmentSection` | **`bg-white`** | Alternates. |
| 9 | Trio 2, Seg 3 (Investors) | `SegmentSection` | **`bg-sand-wash`** | Alternates. |
| 10 | Pull quote break | `PullQuoteBreak` | **`bg-cream`** | Warm editorial pause. Cream for emotional weight. |
| 11 | Trio 3, Seg 1 (Rural) | `SegmentSection` | **`bg-white`** | Resumes on white after cream. |
| 12 | Trio 3, Seg 2 (Developers) | `SegmentSection` | **`bg-sand-wash`** | Alternates. |
| 13 | Trio 3, Seg 3 (Commercial) | `SegmentSection` | **`bg-white`** | Alternates. |
| 14 | Image band | `ImageBand` | Full-bleed image | Breathing room before close. |
| 15 | CTA | `CTASection` variant="dark" | `bg-editorial-dark` | Dark close. |

**Current state vs. spec:** Matches existing implementation. No changes needed.

### 4.7 Landing Page Template

Landing pages follow a condensed version of the homepage pattern. Hero, stats, content splits, then shared components from the homepage.

| # | Section | Component | Background | Rationale |
|---|---|---|---|---|
| 1 | Hero | `LandingHero` | Full-bleed image/video overlay | Cinematic entry. |
| 2 | Stats bar | `StatsBar` | `bg-editorial-dark` (inherent) | Dark stats. Anchors hero. |
| 3+ | Info splits | `InfoSplit` / text sections | **Alternating `bg-white` / `bg-sand-wash`** | Standard content alternation. Starts white. |
| - | Image band | `ImageBand` | Full-bleed image | Palette reset. |
| - | Suburbs | `<section>` | **`bg-sand-wash`** | Warm ground for suburb listings. |
| - | Our approach | `<section>` | **`bg-white`** | Alternates from sand-wash. |
| - | FAQ | `<section>` | **`bg-[var(--bright-grey)]`** | **Change to `bg-sand-wash`** for consistency. Bright-grey reads cold against the warm palette. |
| - | Shared: AboutExpertise | `AboutExpertise` | `bg-cream` | Warm testimonial. |
| - | Shared: ServicesAccordion | `ServicesAccordionShowcase` | `bg-editorial-dark` | Dark editorial. |
| - | Shared: Acquisitions | `RecentAcquisitionsStrip` | `bg-white` | Clean showcase. |
| - | Shared: Testimonials | `TestimonialSection` | `bg-sand-wash` | Warm. Alternates. |
| - | Shared: Regions | `Regions` | `bg-cream` | Explore mode. |
| - | Shared: WhyStandOut | `WhyStandOutGrid` | `bg-white` | Clean grid. |
| - | CTA | `CTASection` variant="dark" | `bg-editorial-dark` | Dark close. |

**Spec change:** Landing page FAQ sections should use `bg-sand-wash` (or `bg-cream` if preceded by sand-wash) instead of `bg-[var(--bright-grey)]`. The bright-grey utility feels cold and technical against the warm coastal palette. This is the one change the engineer needs to make.

---

## 5. Edge Treatment Between Sections

### Decision: Straight edges. No curves, no gradients, no diagonal cuts.

**Rationale:**

Curved or angled section dividers belong to a different design language -- SaaS dashboards, tech startups, playful consumer brands. The Compass brand is editorial and coastal-luxury. Think architectural photography magazines. Sections are clean horizontal bands with generous padding. The rhythm comes from colour shifts and whitespace, not shape.

### Specific rules

1. **No SVG wave dividers, diagonal clips, or border-radius on section edges.** Sections are full-width rectangles.
2. **No CSS gradients bridging two sections.** Each section owns its own background. The transition is a clean, instant colour change.
3. **ImageBand components provide the only visual "softness" between sections.** Their full-bleed photography with warm overlay creates organic texture without artificial shapes.
4. **The warm gradient (`bg-warm-gradient`) on page headers provides a gentle colour transition at the top of interior pages.** This is not an edge treatment -- it is a background in its own right, starting near-white and drifting warm. It replaces the need for any gradient bridge from the navbar into the page.
5. **Hero sections with rounded corners on desktop (AreasHero, LandingHero) are acceptable.** These are contained within side margins and use `border-radius: var(--radius-xl)` as a cinematic framing device, not a section edge treatment.

---

## 6. Special Section Rules

### 6.1 Hero Sections

- **Homepage:** Full-bleed video with dark overlay. No background class -- the video IS the background. Followed by the ink TrustBar.
- **Interior pages (About, Services, Contact, Who We Work With):** `bg-warm-gradient` with `page-header` class. Centered text. Uses `--section-padding`.
- **Areas page:** `AreasHero` -- full-bleed image with warm coastal overlay gradient. Rounded corners on desktop.
- **Landing pages:** `LandingHero` -- full-bleed image/video with dark overlay. Similar to homepage hero.

### 6.2 CTA Sections

- **Always use `variant="dark"` with `bg-editorial-dark`** as the page closer. This is the brand signature.
- `variant="warm"` (bg-cream) and `variant="minimal"` (bg-white) exist but should not be used for page-closing CTAs. Reserve these for mid-page conversion moments if ever needed.
- The CTA section must never directly follow another dark section. Place a light section or ImageBand between.

### 6.3 Testimonial Sections

- **Always `bg-sand-wash`**. The warm wash provides warmth behind the video thumbnail cards without competing with the imagery. This is consistent across all pages that use `TestimonialSection`.

### 6.4 Stats / Trust Bars

- **TrustBar (homepage):** Solid `var(--ink)`. Dense, anchoring. No gradient.
- **ServiceStats / StatsBar:** `bg-editorial-dark`. Gradient treatment. Used as a punctuation mark within longer pages.
- Both must be preceded and followed by content of a different visual weight.

### 6.5 Pull Quote Breaks

- **Default: `bg-cream`** when used between content trios or as an emotional pause.
- **Alternative: `bg-white`** when used immediately after a warm header (as on the About page, where `bg-warm-gradient` into `bg-cream` would feel too monotone).
- Uses `--section-padding-compact` for tighter vertical rhythm -- it is a pause, not a full section.

### 6.6 ImageBands

- ImageBands are **not sections** in the content sense. They are atmospheric breathing room.
- They **carry no background class** -- the image itself is the background.
- They act as **palette resets**: after an ImageBand, any light background can follow regardless of what preceded the band.
- Warm overlay (`rgba(242,236,206,0.08)` to `rgba(75,115,113,0.05)`) is applied by default to keep imagery feeling warm and on-brand.
- Typical height: `clamp(180px, 20vw, 280px)`. Areas page mid-band is taller at `340px`.

### 6.7 FAQ Sections

- **Main pages (Home, Services):** `bg-white`. Clean, scannable. The accordion components provide enough visual structure.
- **Landing pages:** Should use `bg-sand-wash` (spec change from current `bg-[var(--bright-grey)]`).

### 6.8 Process Sections

- **`bg-cream`**. The process timeline (numbered steps) benefits from the warmer, richer cream background. It signals a shift from "what we do" to "how we do it."

---

## 7. Dark Section Rules

When a section uses `bg-editorial-dark` or inline `var(--ink)`, all text colours must adapt.

### Automatic colour rules (handled by existing CSS)

The `.bg-editorial-dark` class already sets:

| Element | Colour |
|---|---|
| Body text (`p`) | `rgba(255,255,255,0.8)` |
| Headings (`h2`, `h3`) | `#fff` |
| Eyebrow labels | `var(--sand)` -- the warm sand colour as an accent on dark |
| Links | `rgba(255,255,255,0.85)`, hover `#fff` |
| Stat numbers | `#fff` |
| Stat labels | `rgba(255,255,255,0.55)` |

### Button colours on dark backgrounds

- Primary CTA: White background, `var(--hills)` text. (`bg-white text-[var(--hills)]`)
- Secondary/phone link: `rgba(255,255,255,0.5)` with `var(--sand)` for the phone number.

### When NOT to use dark sections

- Never for content-heavy sections (feature splits, team grids, FAQ, form sections). Dark backgrounds reduce readability for long-form content.
- Never for sections with multiple white-backgrounded cards (the contrast becomes jarring).
- Dark sections should contain: stats, short CTA copy, accordion showcases, or single testimonials. Dense, punchy, short.

---

## 8. Implementation Notes for Engineering

### What needs to change

The audit reveals strong consistency already. One change is required:

1. **Landing page FAQ background:** In `LandingPageTemplate.jsx`, change `bg-[var(--bright-grey)]` to `bg-sand-wash` on the FAQ section wrapper (around line 275).

### What stays the same

All six main pages already follow the spec. The system documented here codifies the existing patterns into rules so future pages maintain consistency.

### CSS classes available (no new classes needed)

```css
.bg-white          /* Pure white */
.bg-sand-wash      /* Warm radial + linear gradient */
.bg-sea-wash       /* Cool radial + linear gradient */
.bg-warm-gradient  /* White -> faint sand/sea (page headers) */
.bg-cream          /* Solid warm gradient #FAF7EE -> #F5F0E1 */
.bg-editorial-dark /* Ink -> dark teal gradient, sets text colours */
```

### Deprecated / avoid

- `bg-[var(--bright-grey)]` -- Do not use for section backgrounds. The grey reads cold. Use `bg-sand-wash` instead. (The `--bright-grey` variable itself is fine for borders, skeleton loaders, and small UI elements.)
- Inline `background-color` on sections -- Use the CSS classes above for consistency and to benefit from the `.bg-editorial-dark` descendant text colour rules.

### Future landing page checklist

When building new landing pages, follow this background sequence:

```
Hero (dark overlay)
Stats bar (editorial-dark)
Info split 1 (white)
Info split 2 (sand-wash)
Info split 3 (white)
[repeat alternation for additional splits]
ImageBand (reset)
Suburbs (sand-wash)
Approach (white)
FAQ (sand-wash or cream)
Shared sections (follow their inherent backgrounds)
CTA (editorial-dark)
```

---

## 9. Visual Rhythm Summary

The background system creates a visual heartbeat:

```
LIGHT - LIGHT - DARK - breathe - LIGHT - LIGHT - WARM - LIGHT - DARK
```

Each page follows this macro pattern:
1. **Open warm or cinematic** (hero/header)
2. **Alternate white and sand-wash** for content
3. **Punctuate with dark** for proof or contrast
4. **Use ImageBands** as breathing room
5. **Use cream** for special content modes (process, regions, quotes)
6. **Close dark** with the CTA

The result should feel like turning pages in a well-designed property magazine -- each spread has its own mood, but they belong to the same publication.
