# Compass Buyers Agency — Design System Specification

> Creative direction: Relaxed coastal luxury. Byron Bay golden hour. Calm, unhurried, high-end.
> Target buyer: Wealthy, lifestyle-driven. Buying the feeling of being there, not just a house.
> Principle: Less is more luxury. Fewer elements, larger, more space. Magazine not dashboard.

---

## 1. TYPOGRAPHY SCALE

All sizes use `clamp()` for fluid responsiveness. No fixed breakpoint jumps.

### Headings (MinervaModern)

| Token         | Size                              | Weight | Line-height | Letter-spacing | Colour        |
|---------------|-----------------------------------|--------|-------------|----------------|---------------|
| `h1-hero`     | `clamp(2.75rem, 5.5vw, 4.75rem)` | 400    | 1.05        | -0.03em        | white         |
| `h1-page`     | `clamp(2.25rem, 4.5vw, 3.5rem)`  | 400    | 1.1         | -0.02em        | var(--ink)    |
| `h2-section`  | `clamp(1.75rem, 3.5vw, 2.75rem)` | 400    | 1.15        | -0.015em       | var(--ink)    |
| `h3-card`     | `clamp(1.25rem, 2vw, 1.5rem)`    | 400    | 1.2         | -0.01em        | var(--ink)    |
| `h4-label`    | `clamp(1rem, 1.5vw, 1.25rem)`    | 400    | 1.3         | -0.005em       | var(--ink)    |

### Body (Aeonik)

| Token         | Size                                | Weight | Line-height | Colour        |
|---------------|-------------------------------------|--------|-------------|---------------|
| `body-lg`     | `clamp(1.0625rem, 1.3vw, 1.1875rem)` | 300  | 1.7         | var(--stone)  |
| `body`        | `clamp(0.9375rem, 1.1vw, 1.0625rem)` | 300  | 1.65        | var(--stone)  |
| `body-sm`     | `clamp(0.8125rem, 1vw, 0.9375rem)`   | 300  | 1.6         | var(--stone)  |
| `caption`     | `0.8125rem`                           | 300  | 1.5         | var(--stone)  |

### Utility Text

| Token         | Size        | Weight | Letter-spacing | Transform  | Colour          |
|---------------|-------------|--------|----------------|------------|-----------------|
| `eyebrow`     | `0.75rem`   | 400    | 0.08em         | uppercase  | var(--hills)    |
| `overline`    | `0.6875rem` | 400    | 0.12em         | uppercase  | var(--stone)    |
| `stat-number` | `clamp(2.5rem, 5vw, 4rem)` | 400 (MinervaModern) | -0.02em | none | var(--hills) |
| `stat-label`  | `0.8125rem` | 300    | 0.04em         | uppercase  | var(--stone)    |

---

## 2. SPACING RHYTHM

All section spacing uses CSS custom properties. 8px base unit.

### Section Padding (top/bottom)

| Token                    | Value                           | Use for                         |
|--------------------------|----------------------------------|---------------------------------|
| `--section-hero`         | `0` (hero fills viewport)        | Hero sections only              |
| `--section-breathing`    | `clamp(5rem, 10vw, 8rem)`       | Major section dividers, page headers |
| `--section-standard`     | `clamp(4rem, 8vw, 6rem)`        | Standard content sections       |
| `--section-compact`      | `clamp(2.5rem, 5vw, 3.5rem)`    | Tight sections (nav chips, filters) |
| `--section-tight`        | `clamp(1.5rem, 3vw, 2rem)`      | Minimal breathing (within groups) |

### Container

| Property    | Value                                    |
|-------------|------------------------------------------|
| Max-width   | `1200px`                                 |
| Padding-x   | `clamp(1.25rem, 5vw, 3rem)`             |
| Centring    | `margin: 0 auto`                         |

### Element Spacing

| Context               | Gap value       |
|-----------------------|-----------------|
| Card grids            | `gap-8 lg:gap-10` (32px / 40px) |
| Inline groups         | `gap-3` (12px)  |
| Stacked text blocks   | `gap-4` (16px) between heading and body |
| Section header to content | `mb-12 md:mb-16` (48px / 64px) |

---

## 3. SECTION BACKGROUND PATTERN

Every page follows a deliberate background rhythm. Never two identical backgrounds adjacent.

### Background Palette

| Token           | Value                | Feel                    |
|-----------------|----------------------|-------------------------|
| `bg-white`      | `#FFFFFF`            | Clean, open sky         |
| `bg-sand-wash`  | `var(--sand)` at 40% | Warm afternoon light    |
| `bg-cream`      | `var(--sand)` at 60% | Deeper warmth           |
| `bg-sea-wash`   | `var(--sea-breeze)` at 30% | Morning ocean      |
| `bg-warm-gradient` | Sand → white gradient | Soft editorial header |
| `bg-dark`       | `var(--hills)` or `var(--ink)` | Contrast/CTA breaks |
| `bg-bright-grey`| `var(--bright-grey)` | Neutral divider         |

### Page Background Sequence Rule

```
Page Header:  bg-warm-gradient (all pages except Home)
Section 1:    bg-white
Section 2:    bg-sand-wash
Section 3:    bg-white
[ImageBand]:  full-bleed image divider
Section 4:    bg-sand-wash or bg-sea-wash
...
CTA:          bg-dark (variant="dark" for all pages)
```

**Rule**: Alternate white and warm. Use `bg-sea-wash` sparingly as an accent (max once per page). Use `bg-dark` only for the final CTA and occasional contrast breaks (stats, testimonials).

---

## 4. ANIMATION CHOREOGRAPHY

### ScrollReveal Defaults

| Property     | Value                                    |
|-------------|------------------------------------------|
| Transform    | `translateY(24px)` → `translateY(0)`    |
| Opacity      | `0` → `1`                               |
| Duration     | `800ms`                                  |
| Easing       | `cubic-bezier(0.25, 0.1, 0.25, 1.0)`    |
| Trigger      | IntersectionObserver at `0.15` threshold |
| Once         | `true` (animate in once, don't animate out) |

### Animation Variants

| Variant       | Transform                           | Use for                     |
|---------------|-------------------------------------|-----------------------------|
| `fade-up`     | `translateY(24px)` → `0` (default) | Most content sections       |
| `fade-in`     | opacity only, no transform          | Images, backgrounds         |
| `fade-left`   | `translateX(40px)` → `0`           | Right-side content in splits|
| `fade-right`  | `translateX(-40px)` → `0`          | Left-side content in splits |

### Stagger Rules

| Context               | Stagger delay | Max items before no stagger |
|-----------------------|---------------|------------------------------|
| Card grids (3-4 cols) | `120ms`       | 6 items                      |
| Stat counters         | `150ms`       | 4 items                      |
| List items            | `80ms`        | 8 items                      |
| Split sections        | `0ms` (simultaneous fade-left + fade-right) | N/A |

### What Does NOT Animate

- Navigation elements
- Footer
- Form inputs
- Already-visible hero content (has its own entrance)
- Content within accordions/expandable sections
- Filter chips and controls

---

## 5. CARD PATTERNS

### Acquisition Card

```
Layout:       Vertical stack
Image:        aspect-[4/3], rounded-lg, overflow-hidden
              Hover: scale(1.03) over 500ms
Badge:        Top-left, absolute, rounded-full, px-3 py-1
              bg-white/90, text-[0.6875rem], font-weight 400
Title:        h3-card token, mt-4
Location:     eyebrow token, mt-1
Specs:        body-sm token, flex row, gap-4, mt-2, icons 16px
Shadow:       ring-1 ring-black/[0.04]
              Hover: shadow-lg over 300ms
Width:        Full width in grid (no fixed px widths)
Touch target: Entire card is clickable, min 44px tap area
```

### Team Member Card

```
Layout:       Vertical stack
Photo:        aspect-[4/5], rounded-lg, overflow-hidden, object-cover
              Hover: scale(1.05) over 600ms
Name:         h3-card token, mt-4
Role:         body-sm token, colour var(--stone)
Bio:          body-sm token, line-clamp-3, mt-2
Specialties:  Flex wrap, gap-1.5, mt-3
              Each: caption token, px-2.5 py-1, rounded-full
              border border-[var(--border)], bg transparent
Shadow:       ring-1 ring-black/[0.04]
```

### Blog Card

```
Layout:       Vertical stack
Image:        aspect-[16/10], rounded-lg, overflow-hidden
              Hover: scale(1.03) over 500ms
Category:     eyebrow token, mt-4, colour var(--hills)
Title:        h3-card token, mt-1.5, line-clamp-2
Excerpt:      body-sm token, line-clamp-2, mt-2
Date:         caption token, mt-3, colour var(--stone)
Shadow:       ring-1 ring-black/[0.04]
Touch target: Entire card clickable
```

### Region/Shire Card

```
Layout:       Vertical stack
Image:        aspect-[3/2], rounded-lg, overflow-hidden
              Hover: scale(1.03) over 500ms
              Overlay: bottom gradient for text legibility
Name:         h3-card token, white, absolute bottom-left
Subtitle:     body-sm token, white/80
Shadow:       none (overlay handles depth)
Touch target: Entire card clickable
```

---

## 6. BUTTON / CTA HIERARCHY

### Primary CTA

```
Font:         Aeonik, 0.9375rem, weight 400, letter-spacing 0.02em
Padding:      px-8 py-3.5 (generous)
Background:   var(--hills)
Colour:       white
Border:       none
Radius:       rounded-full
Hover:        background darkens 10%, translateY(-1px), shadow-md
Transition:   all 300ms ease
Min-width:    200px on desktop
Touch target: 48px minimum height
```

### Secondary CTA (outline)

```
Same sizing as primary
Background:   transparent
Border:       1.5px solid var(--hills)
Colour:       var(--hills)
Hover:        background var(--hills), colour white
```

### Text Link CTA

```
Font:         Aeonik, body token size, weight 400
Colour:       var(--hills)
Decoration:   none, underline on hover
Arrow:        " →" suffix, translateX(4px) on hover over 300ms
No background, no border, no padding
```

### Ghost CTA (on dark backgrounds)

```
Same sizing as primary
Background:   transparent
Border:       1.5px solid white/30
Colour:       white
Hover:        background white/10, border white/60
```

---

## 7. PAGE HEADER PATTERN

Every page (except Home) uses the same header structure:

```
Background:   bg-warm-gradient
Padding:      var(--section-breathing) top and bottom
Container:    max-w-3xl, centred
Content:
  1. Eyebrow label (eyebrow token, colour var(--hills))
  2. H1 (h1-page token)
  3. Intro paragraph (body-lg token, max-width 38rem)
Animation:    ScrollReveal fade-up on entire block
```

This creates a consistent "chapter opening" feel across every page.

---

## 8. IMAGEBAND STANDARDISATION

### Three sizes only:

| Size    | Desktop height | Mobile height | Use                           |
|---------|---------------|---------------|-------------------------------|
| Small   | `220px`       | `140px`       | Between tight sections        |
| Medium  | `280px`       | `180px`       | Standard atmospheric break    |
| Large   | `360px`       | `220px`       | Major section divider, hero-adjacent |

### Rules:
- Always `overlay={true}` for warm tint consistency
- Never the same image twice on the site (each page gets unique real photography)
- `object-position: center` (default), override per-image if horizon needs adjusting
- Lazy loaded, no parallax (parallax causes jank on mobile)

---

## 9. RESPONSIVE BREAKPOINTS

### Layout Tiers

| Breakpoint | Tailwind | Grid columns | Container padding | Section padding scale |
|-----------|----------|-------------|-------------------|-----------------------|
| Mobile    | default  | 1           | 1.25rem           | 60% of desktop        |
| Tablet    | `md:`    | 2           | 2rem              | 75% of desktop        |
| Desktop   | `lg:`    | 3-4         | 3rem              | 100%                  |
| Wide      | `xl:`    | Same as lg  | max-w caps at 1200px | 100%               |

### Mobile-Specific Rules

- All touch targets minimum 44x44px
- No horizontal scroll (except intentional carousels with snap)
- Card grids: 1 column on mobile, 2 on tablet, 3 on desktop
- FeatureSplit sections: Stack vertically, image on top
- Navigation: Hamburger with full-screen overlay
- Sticky mobile CTA bar at bottom (fixed, 60px height, above fold)
- Font sizes floor at mobile clamp minimum (never below 0.8125rem body)

---

## 10. HOME PAGE FIXES

### Fix 1: Hero sub-CTA copy

**Current**: Tiny 13px meta text under the CTA ("Backed by 70+ acquisitions...") barely visible.

**Decision**: REMOVE IT. The CTA button should be the final element in the hero hierarchy. The stats are better served in the TrustBar directly below. Less clutter = more luxury.

If the client insists on keeping it, increase to `0.875rem` (14px), weight 300, colour white/60, with 1rem top margin.

### Fix 2: Acquisitions — static grid, not scroll

**Current**: Horizontal scrolling strip with 280px/360px fixed-width cards, 6-item limit.

**New layout**:
```
Container:    max-w-6xl, centred
Grid:         grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
Gap:          gap-6 lg:gap-8
Cards:        Full width within grid cell (no fixed px widths)
              Same AcquisitionCard pattern from Section 5
Background:   bg-white
Padding:      var(--section-standard) top and bottom
Header:       Eyebrow + H2 + "View all →" text link, mb-12
Animation:    StaggerGroup with 120ms stagger on cards
```

If fewer than 4 acquisitions exist, centre the grid and let items take natural width. No empty placeholders.

### Fix 3: Stats section elevation

**Current**: TrustBar is minimal and doesn't hit hard enough.

**New design — dark contrast stats bar**:
```
Background:   var(--ink) (dark, high contrast break)
Padding:      var(--section-compact) top and bottom
Container:    max-w-5xl, centred
Layout:       flex, justify-between, items-center
              Mobile: grid-cols-2, gap-6

Stats (4 items):
  1. "70+"     — "Properties Secured"
  2. "$150M+"  — "In Property Value"
  3. "15+"     — "Years Experience"
  4. "100%"    — "Buyer Focused"

Number:       stat-number token (MinervaModern, large), colour white
Label:        stat-label token (Aeonik, uppercase), colour white/50
Dividers:     1px vertical line, white/10, between each stat (desktop only)
Animation:    StaggerGroup 150ms, numbers count up from 0 over 1.5s
              Use CSS counter or requestAnimationFrame
```

Place this DIRECTLY below the hero (before ServicesAccordionShowcase) for maximum impact.

---

## 11. PAGE-SPECIFIC ELEVATION SPECS

### SERVICES PAGE

**Current issues**: Structurally solid but feels long and repetitive. Too many segments stacked with same visual rhythm.

**Elevation**:
```
Section order:
  1. Page Header (bg-warm-gradient) — standardised
  2. SegmentsNav chips — keep, add smooth scroll-to-section
  3. Segment 1 (bg-white, image right)
  4. Segment 2 (bg-sand-wash, image left)
  5. Dark Stats Break (bg-ink) — reuse stats pattern from Home
     "200+ off-market properties sourced" / "Average 8% below asking" etc.
  6. Segment 3 (bg-white, image right)
  7. Segment 4 (bg-sand-wash, image left)
  8. ImageBand (medium, unique Services photo)
  9. ProcessSteps (bg-cream) — keep
  10. CTASection (variant="dark")

Removed: Regions (redundant, lives on Areas page), RecentAcquisitionsStrip
         (lives on Home), FeatureSplit "Why Choose" (fold into page header copy)
```

**SegmentSection elevation**:
```
Layout:       Two-column split, 55/45 ratio (content wider than image)
Image:        aspect-[4/3], rounded-lg, overflow-hidden
              ScrollReveal: fade-left or fade-right depending on position
Content:      ScrollReveal: opposite direction to image
              Eyebrow → H2 → Body paragraph → Bullet list (if applicable) → CTA link
Spacing:      gap-12 lg:gap-20 between columns
              Internal content: gap-4 between text elements
```

### ABOUT PAGE

**Current issues**: Team cards use inline styles. FeatureSplits feel disconnected. Page lacks editorial narrative flow.

**Elevation**:
```
Section order:
  1. Page Header (bg-warm-gradient) — "The People Behind Compass"
  2. FeatureSplit 1 (bg-white) — "What Local Actually Means"
     Image right, body-lg text, generous padding
  3. FeatureSplit 2 (bg-sand-wash) — "Buyers Only. No Exceptions."
     Image left, include CTA button
  4. ImageBand (medium, unique About photo — team on-site or office)
  5. Team Section (bg-white, NOT bg-warm-gradient — too busy)
     H2: "Meet the Team"
     Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3, gap-8 lg:gap-10
     Cards: Use standardised Team Member Card pattern
     StaggerGroup: 120ms
     Future: Cards link to /team/{slug} profile pages
  6. CTASection (variant="dark")

Removed: Second ImageBand (unnecessary, page isn't long enough)
```

**Team card cleanup**:
- Replace ALL inline styles with design system tokens
- Name: h3-card token
- Role: eyebrow token (uppercase, small, var(--hills))
- Bio: body-sm token, line-clamp-3
- Specialties: caption token badges

### CONTACT PAGE

**Current issues**: Feels clinical. Icon circles are small and cold. Form dominates.

**Elevation**:
```
Section order:
  1. Page Header (bg-warm-gradient) — "Let's Talk"
     Subtitle: "Whether you're ready to start searching or just
     exploring your options, we'd love to hear from you."
  2. Contact Section (bg-white, not bg-cream — cleaner)
     Layout: lg:grid-cols-2 (equal columns, not 2/3 split)
     Left: Contact details
       - Phone, Email, Address as stacked blocks
       - Each: icon (24px, var(--hills) colour, no background circle)
                + label (eyebrow token) + value (body token, var(--ink))
       - Spacing: gap-8 between contact blocks
       - Below contacts: horizontal rule, then social links
       - Social: "Follow us" eyebrow, then icon row (gap-4)
     Right: ContactFormCompact
       - Card treatment: bg-sand-wash, rounded-xl, p-8
       - Makes form feel warmer and distinct from contact info
     Animation: Left fade-right, Right fade-left, delay 120ms
  3. ImageBand (large, unique Contact photo — welcoming, human)
  4. CTASection (variant="dark") — ONLY if page doesn't have enough length
     Otherwise skip CTA (contact page IS the CTA)
```

### AREAS PAGE

**Current issues**: Too sparse. Shire cards need more visual impact. Suburb lists are just text.

**Elevation**:
```
Section order:
  1. Page Header (bg-warm-gradient) — "Where We Buy"
  2. Shire Cards (bg-white)
     Layout: grid-cols-1 md:grid-cols-2, gap-8
     Each card:
       - Hero image: aspect-[16/9], rounded-lg, overflow-hidden
         Bottom gradient overlay for text
         Shire name overlaid: h2-section token, white, bottom-left
       - Below image: Suburb list
         Grid: grid-cols-2 sm:grid-cols-3, gap-x-6 gap-y-2
         Each suburb: body-sm token, with subtle left border (2px var(--hills))
         Live suburbs: clickable, var(--hills) colour
         Future suburbs: var(--stone) colour
     Animation: StaggerGroup 120ms on cards
  3. ImageBand (medium, unique Areas photo — aerial coastline)
  4. CTASection (variant="dark")
```

### WHO WE WORK WITH PAGE

**Current issues**: 9 segments is too many — page becomes a wall of text. Visual rhythm is repetitive.

**Elevation**:
```
Section order:
  1. Page Header (bg-warm-gradient) — "Who We Work With"
  2. SegmentsNav chips — keep, smooth scroll-to-section
  3. Segments 1-3 (alternating bg-white / bg-sand-wash)
  4. ImageBand (medium) — visual breathing room
  5. Segments 4-6 (alternating bg-white / bg-sand-wash)
  6. ImageBand (small) — second breather
  7. Segments 7-9 (alternating bg-white / bg-sand-wash)
  8. CTASection (variant="dark")

Key change: Insert ImageBands every 3 segments to break the wall.
Never use bg-sea-wash on this page — keep it simple with just
white/sand alternation. Sea-wash feels too cold for buyer personas.
```

### BLOG PAGE

**Current issues**: Filter bar feels utilitarian. Cards lack warmth. No animation on card entrance.

**Elevation**:
```
Section order:
  1. Page Header (bg-warm-gradient) — "Insights"
  2. Filter Bar (bg-white, border-b)
     Styling: Category pills get rounded-full treatment
     Active pill: bg-[var(--hills)], text-white
     Inactive pill: bg-transparent, border border-[var(--border)], text var(--stone)
     Tags: Same pill pattern but smaller (caption token)
     Spacing: py var(--section-tight)
  3. Post Grid (bg-white)
     Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3, gap-8
     Cards: Standardised Blog Card pattern from Section 5
     Animation: StaggerGroup 120ms on cards
     Empty state: Centred, body-lg token, include "Show all posts" CTA
  4. CTASection (variant="dark")
```

---

## 12. IMPLEMENTATION PRIORITY

### Phase A — Foundation (do first)
1. Standardise CSS custom properties (consolidate from Layout.jsx inline styles to index.css)
2. Create utility classes for all typography tokens
3. Standardise section padding using the 4 tiers
4. Set all CTASections to variant="dark" consistently

### Phase B — Home Fixes
1. Remove or enlarge hero sub-CTA copy
2. Replace RecentAcquisitionsStrip with static 4-column grid
3. Build dark stats bar and place below hero

### Phase C — Page Elevation (one at a time)
1. Services (proof of concept — most section variety)
2. About (team cards + editorial flow)
3. Contact (warmth + form treatment)
4. Areas (shire cards + suburb lists)
5. Who We Work With (ImageBand breathing + simplified backgrounds)
6. Blog (filter bar + card animations)

### Phase D — Polish
1. Ensure ScrollReveal + StaggerGroup on every card grid
2. Verify all ImageBands use unique real photography
3. Mobile QA pass on every page
4. Accessibility audit (contrast, touch targets, focus states)
