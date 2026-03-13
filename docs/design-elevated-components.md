# Phase 5C: Elevated Component Design Spec

**Project**: Compass Buyers Agency
**Author**: Frontend Designer
**Date**: 2026-03-07
**Status**: Design spec (not yet implemented)
**Covers**: Card elevation system, Who We Work With cards, InfoSplit polish, Byron Bay landing polish, typography within cards

---

## 1. Card Elevation System

### Design Rationale

The current codebase has two implicit elevation levels defined in `Layout.jsx`:

- `--shadow-card: 0 8px 32px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` (used by `.surface`)
- `--shadow-hover: 0 20px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)` (used on `.surface:hover`, `.team-card:hover`)

The `.segment-card` uses a lighter shadow: `0 2px 12px rgba(0,0,0,0.04)`.

This spec formalises three elevation tiers as CSS custom properties, bringing consistency across all card types while keeping the feel soft, warm, and unhurried.

### Elevation Tokens (add to `:root` in `index.css`)

```css
/* Elevation system */
--elevation-0: none;
--elevation-1: 0 1px 3px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.04);
--elevation-2: 0 2px 6px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06);
--elevation-hover: 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.08);
```

### Level 0: Flat

- **Use case**: Content differentiation without depth. Feature grid cards on `bg-sand-wash` sections, stat blocks, metadata chips.
- `box-shadow: var(--elevation-0)`
- `background: #fff` or `var(--bright-grey)` depending on parent section background
- `border: 1px solid rgba(0,0,0,0.04)` (barely visible, just enough to define the edge)
- `border-radius: var(--radius-card)` (12px)

### Level 1: Subtle Lift

- **Use case**: Content cards that sit on the page without demanding attention. WhyStandOutGrid cards, segment nav cards, blog listing cards.
- `box-shadow: var(--elevation-1)`
- `background: #fff`
- `border: 1px solid rgba(0,0,0,0.04)`
- `border-radius: var(--radius-card)` (12px)

### Level 2: Elevated

- **Use case**: Interactive cards, featured content, acquisition cards, cards with imagery that need to float.
- `box-shadow: var(--elevation-2)`
- `background: #fff`
- `border: 1px solid rgba(0,0,0,0.04)`
- `border-radius: var(--radius-card)` (12px)

### Mapping existing components to elevation levels

| Component | Current Shadow | Target Level |
|---|---|---|
| `.surface` (WhyStandOutGrid, etc.) | `--shadow-card` (level 2 equivalent) | Level 1 resting, Level 2 on hover |
| `.segment-card` | `0 2px 12px rgba(0,0,0,0.04)` | Level 1 resting, Level 2 on hover |
| `.team-card` | `0 1px 3px rgba(0,0,0,0.04)` | Level 1 resting, Level 2 on hover |
| `AcquisitionCard` | via `.surface` | Level 2 resting (image-heavy), hover lifts shadow |
| `InfoSplit` image | inline `0 8px 32px rgba(0,0,0,0.08)` | Level 2 (matches well already) |

### Implementation note

Replace the existing `--shadow-card` and `--shadow-hover` values with the new tokens. The `.surface` class should use `--elevation-1` as its resting state and `--elevation-hover` on hover. This is a subtle reduction from the current `--shadow-card` (which is quite prominent for non-image cards) and will give the grid cards a quieter, more editorial presence.

---

## 2. Card Hover States

### Transition Timing

All card hover transitions must match the brand's slow, luxurious feel. The current `0.5s ease` on `.surface` is appropriate. Standardise across all card types:

```css
transition:
  box-shadow 0.5s var(--ease-out),
  transform 0.5s var(--ease-out),
  border-color 0.5s var(--ease-out);
```

The existing `--ease-out: cubic-bezier(0.25, 0.1, 0.25, 1)` is the correct curve. Do not shorten the duration below 400ms.

### Transform on Hover

- **Level 0 cards**: No transform. Shadow remains `none`.
- **Level 1 cards**: `transform: translateY(-2px)` on hover. Shadow transitions from `--elevation-1` to `--elevation-hover`.
- **Level 2 cards**: `transform: translateY(-3px)` on hover. Shadow transitions from `--elevation-2` to `--elevation-hover`.

### What NOT to do on hover

- No background colour change. Cards remain `#fff`.
- No border colour change to brand colours. The subtle `rgba(0,0,0,0.06)` darkening on the existing `.surface:hover` border is fine.
- No text colour transitions (the existing `group-hover:text-[var(--hills)]` on AcquisitionCard h3 is acceptable as the only exception, because it is a navigational card).
- No scale transforms on the card itself. Image `scale(1.03)` on hover within the card is retained.

### Image Hover (within cards)

Retain the existing slow zoom pattern:

```css
.card img {
  transition: transform 1.2s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.card:hover img {
  transform: scale(1.03);
}
```

The 1.2s duration with the custom cubic-bezier is exactly right for the brand. Do not change this.

---

## 3. Who We Work With: Buyer Segment Cards

### Current State

`SegmentCardGrid.jsx` renders 9 cards in a 1/2/3 column grid. Each card has:
- A `16/10` aspect ratio image
- A title in `--font-heading` at `clamp(1.125rem, 1.8vw, 1.375rem)`
- A 2-line clamped intro paragraph
- A "Learn more" text link

The cards use `.segment-card` styles defined in `Layout.jsx`. The grid itself uses the `.segment-card-grid` class with responsive media queries.

### Design Refinements

#### Card Dimensions and Grid

The existing responsive grid is correct:
- **Mobile** (< 768px): 1 column, full-width cards
- **Tablet** (768px+): 2 columns
- **Desktop** (1024px+): 3 columns

**Gap**: Keep `clamp(1rem, 2vw, 1.5rem)`. This is well-calibrated.

#### Image Treatment

- **Aspect ratio**: Change from `16/10` to `3/2`. The current `16/10` is slightly awkward for landscape property/lifestyle photos. `3/2` gives more vertical room and aligns with common photographic proportions.
- **Image overlay**: Add a very subtle gradient at the bottom of the image to improve text contrast if the image bleeds into the card body:

```css
.segment-card .segment-card-image::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, rgba(0,0,0,0.03), transparent);
  pointer-events: none;
}
```

This is extremely subtle (3% opacity black) and only serves to soften the hard edge between image and card body.

#### Title Typography

- **Font**: `var(--font-heading)` (MinervaModern) -- keep as-is
- **Size**: `clamp(1.125rem, 1.8vw, 1.375rem)` -- keep as-is, this reads well
- **Weight**: 400 (the only weight MinervaModern should use at this size)
- **Colour**: `var(--ink)` (#232323)
- **Line-height**: 1.2
- **Letter-spacing**: `-0.01em`
- **Margin-bottom**: `0.5rem` (keep as-is)

#### Description Text

- **Font**: `var(--font-body)` (Aeonik)
- **Weight**: 300 (`var(--font-body-light)`)
- **Size**: `clamp(0.875rem, 1vw, 0.9375rem)` -- keep as-is, deliberately small to create hierarchy
- **Colour**: `var(--stone)` (#767470)
- **Line-height**: 1.55
- **Line clamp**: Keep at 2 lines. This forces concise intro copy and keeps cards uniform height.

#### "Learn More" Link

- **Font**: `var(--font-body)`, weight 500
- **Size**: `0.875rem` (14px) -- keep as-is
- **Colour**: `var(--hills)` (#4B7371)
- **Hover**: Underline with `text-underline-offset: 4px` (already implemented via `.segment-card-link`)
- **Arrow**: Keep the `&rarr;` character. Do not replace with an SVG or icon component.
- **Margin-top**: `0.75rem` -- keep as-is

#### Card Padding (text area)

- Current: `clamp(1.25rem, 2.5vw, 1.75rem)` all sides
- **Refinement**: Slightly increase bottom padding for breathing room:

```css
padding: clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 3vw, 2rem);
```

#### Elevation

Apply **Level 1** resting state, **Level 2** equivalent on hover (already close to what exists). The current `.segment-card` shadow values are appropriate. Update to use the new tokens:

```css
.segment-card {
  box-shadow: var(--elevation-1);
}
.segment-card:hover {
  box-shadow: var(--elevation-hover);
  transform: translateY(-2px);
}
```

Add the `transform` to hover (currently missing) for physical lift feedback. Ensure the transition includes `transform`:

```css
.segment-card {
  transition:
    box-shadow 0.5s var(--ease-out),
    transform 0.5s var(--ease-out),
    border-color 0.5s var(--ease-out);
}
```

#### No Icon Treatment

The segment cards rely on photography to differentiate, not icons. This is correct for the brand. Do not add icons to these cards.

#### Active/Selected State

No active/selected state needed. These cards are anchor links to sections below. Once clicked, the page scrolls to the relevant section. There is no persistent selection state.

---

## 4. InfoSplit Component Polish

### Current State

`InfoSplit.jsx` renders a 5-column grid (`lg:grid-cols-5`), with the image taking 3 columns and text taking 2. Image has `border-radius: 12px` and `box-shadow: 0 8px 32px rgba(0,0,0,0.08)`. The image side alternates between splits via `imageSide` prop.

### Image Treatment

- **Border-radius**: Keep `12px` (`var(--radius-card)`). Consistent with the system.
- **Aspect ratio**: Keep `4/3`. This works well for landscape property and lifestyle photography.
- **Shadow**: Update to `var(--elevation-2)` for consistency:

```css
box-shadow: var(--elevation-2);
```

- **Image hover**: Add a very slow, subtle zoom on hover of the entire InfoSplit container (not just the image directly). This creates a "living" feel without being distracting:

```css
.info-split-image img {
  transition: transform 1.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.info-split:hover .info-split-image img {
  transform: scale(1.015);
}
```

The 1.015 scale is deliberately smaller than the card zoom (1.03) because the InfoSplit image is much larger. The 1.8s duration is slower to match the increased size.

### Text Side

#### Heading (h2)

- Already using base `h2` styles from `index.css`: `clamp(1.75rem, 3.5vw, 2.75rem)`, weight 400, MinervaModern
- `margin-bottom: 0.75rem` (the current `mb-3` is fine)
- No changes needed

#### Description Paragraph

- Current: `font-weight: var(--font-body-light)`, `font-size: 1.0625rem`, `color: var(--stone)`, `line-height: 1.7`
- This is well-calibrated. No changes.

#### Bullet Styling (em-dash pattern)

The em-dash bullet pattern is a strong brand element. Current implementation:

```jsx
<span style={{ color: "var(--hills)", fontWeight: "var(--font-body-medium)" }}>
  ---
</span>
```

**Refinements**:
- Keep the em-dash character and `--hills` colour
- The `font-weight: var(--font-body-medium)` on the dash makes it slightly heavier than the text. This is intentional and correct.
- Bullet text: `font-weight: var(--font-body-light)`, `font-size: 1.0625rem`, `color: var(--stone)`, `line-height: 1.6`
- **Spacing between bullets**: `space-y-2.5` (current) equals ~10px. This is slightly tight. Increase to `space-y-3` (~12px) for more editorial breathing room:

```css
gap: 0.75rem; /* 12px between bullets */
```

#### CTA Button (if present)

When an InfoSplit needs a CTA (not currently used but good to spec):
- Use `.btn-cta` class
- `margin-top: 2rem` above the button
- Background: `var(--hills)`
- Text: white

### Spacing Between Image and Text

- **Desktop (lg+)**: `gap: clamp(2rem, 4vw, 3.5rem)` -- the current `gap-14` (3.5rem) is appropriate but slightly large. Use the clamp for better scaling. The current `lg:gap-14` jumps to 56px which is generous. Reduce to `lg:gap-12` (48px) for tighter coupling between image and text.
- **Tablet/Mobile**: `gap: 2rem` -- the current `gap-8` (32px) is fine.

### Responsive Behaviour

- **Desktop (1024px+)**: Side-by-side, 5-column grid (3 image + 2 text)
- **Mobile (< 1024px)**: Image stacks above text, full width. This is already the default grid behaviour.

When stacked on mobile:
- Image takes full width at `aspect-ratio: 4/3`
- Text sits below with no extra top padding beyond the gap
- Bullets remain full-width

---

## 5. Byron Bay Landing Page Polish

### Current State Analysis

The Byron Bay page uses `LandingPageTemplate` which assembles: LandingHero, StatsBar, InfoSplit sections, ImageBand, Suburbs list, Approach section, FAQ, shared sections (AboutExpertise, ServicesAccordionShowcase, RecentAcquisitionsStrip, Testimonials, Regions, WhyStandOutGrid), and CTA.

### 5 Specific Design Refinements

#### 5.1 Hero Overlay Refinement

**Current**: Two gradient layers:
1. `linear-gradient(to right, rgba(35,35,35,0.55), rgba(75,115,113,0.15))` -- L-to-R dark-to-hills
2. `bg-gradient-to-t from-black/20 via-transparent to-transparent` -- bottom vignette

**Issue**: The left side at 55% opacity can feel heavy on some images. The hills-tinted right side at 15% sometimes makes the right edge look slightly green.

**Refinement**: Adjust the primary overlay to use pure dark tones with a gentler right falloff:

```css
background: linear-gradient(
  to right,
  rgba(35, 35, 35, 0.50),
  rgba(35, 35, 35, 0.15),
  rgba(35, 35, 35, 0.05)
);
```

This removes the hills tint from the overlay (the brand colour should come from the content, not the scrim) and creates a three-stop gradient that fades more naturally. Keep the bottom vignette as-is.

**Text positioning**: The current `max-w-3xl` with left-alignment is correct. The staggered entrance animation timing (0ms, 300ms, 500ms, 700ms) with `900ms` duration is luxuriously slow and on-brand. No changes needed.

#### 5.2 StatsBar Styling

**Current**: `bg-[var(--ink)]` (dark), white text, compact padding. Values in heading font at `clamp(1.75rem, 3vw, 2.5rem)`, labels uppercase at 0.75rem.

**Refinement**: The stats bar reads well but the transition from hero to dark stats bar is abrupt. Add a subtle top border to soften the edge:

```css
border-top: 1px solid rgba(255, 255, 255, 0.08);
```

Also, the stat values could use a finer letter-spacing. Current `-0.03em` is slightly tight for numbers. Adjust to `-0.02em`.

Add dividers between stat items (desktop only):

```css
/* Desktop stat dividers */
@media (min-width: 768px) {
  .stats-bar-item + .stats-bar-item {
    border-left: 1px solid rgba(255, 255, 255, 0.1);
    padding-left: 2rem;
  }
}
```

This creates a refined, segmented feel rather than items floating in space.

#### 5.3 Section Transitions (InfoSplit to ImageBand)

**Current**: InfoSplit sections alternate between `bg-white` but the template only uses `bg-white` for all InfoSplits (the `splitBgs` array alternates but is only used for text-only fallbacks).

**Refinement**: Alternate InfoSplit background colours properly:
- First InfoSplit: `bg-white`
- Second InfoSplit: `bg-sand-wash`
- Third (if exists): `bg-white`

This creates rhythm and prevents the "wall of white" effect when multiple InfoSplits stack. The `splitBgs` array in `LandingPageTemplate.jsx` already defines this (`["bg-white", "bg-sand-wash"]`) but it is only applied to the text-only fallback path, not to the main `<InfoSplit>` render. Apply the background class to the InfoSplit component.

#### 5.4 Suburbs Section -- Template Feel

**Current**: A simple 2-column flat list with em-dash bullets. The section heading is "Suburbs We Cover" with an "eyebrow-label" of "Coverage".

**Issue**: This section looks functional but template-like. It lacks the editorial quality of the rest of the page.

**Refinement**:
- Change layout to a horizontal pill/tag row instead of a stacked list:

```css
.suburb-tag {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.25rem;
  background: #fff;
  border: 1px solid var(--bright-grey);
  border-radius: var(--radius-badge); /* 999px -- pill shape */
  font-family: var(--font-body);
  font-weight: var(--font-body-regular);
  font-size: 0.9375rem;
  color: var(--ink);
  transition: border-color 0.3s var(--ease-out), background 0.3s var(--ease-out);
  text-decoration: none;
}
.suburb-tag:hover {
  border-color: var(--hills);
  background: rgba(75, 115, 113, 0.04);
}
```

Wrap in a `flex flex-wrap gap-3` container. This transforms the list into a modern, scannable tag cloud that feels bespoke rather than boilerplate.

#### 5.5 Shared Sections Overload

**Current**: After the FAQ, the template appends 6 shared sections: AboutExpertise, ServicesAccordionShowcase, RecentAcquisitionsStrip, TestimonialSection, Regions, WhyStandOutGrid, then CTA.

**Issue**: This creates an extremely long page tail. The landing page should funnel to conversion, not become a microsites. Six shared sections after the FAQ is excessive and dilutes the CTA urgency.

**Refinement (structural recommendation for engineering ticket)**:
- Keep: `WhyStandOutGrid` (social proof), `TestimonialSection` (trust), `CTASection` (conversion)
- Remove from landing pages: `ServicesAccordionShowcase` (belongs on Services page), `Regions` (belongs on Areas page), `AboutExpertise` (belongs on Home/About)
- Move `RecentAcquisitionsStrip` above `WhyStandOutGrid` for better flow

This reduces the post-FAQ section count from 6 to 3, creating a tighter conversion funnel: FAQ answers objections, WhyStandOutGrid reinforces value, Testimonials build trust, CTA captures the lead.

---

## 6. Typography Within Cards

### H3 Card Titles

All card titles should use consistent typographic treatment:

```css
.card-title {
  font-family: var(--font-heading);   /* MinervaModern */
  font-weight: 400;
  font-size: clamp(1.125rem, 1.8vw, 1.375rem);  /* 18px to 22px */
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin-bottom: 0.5rem;
}
```

**Note on existing inconsistency**: The WhyStandOutGrid uses `font-weight: var(--font-body-medium)` (500) with `font-size: 1.125rem` in the body font (Aeonik), while SegmentCardGrid uses `var(--font-heading)` at 400 weight. The correct approach is:
- For cards with imagery (SegmentCard, AcquisitionCard): Use `--font-heading` (MinervaModern) at 400 weight. The serif heading font pairs well with the imagery.
- For icon-based feature cards (WhyStandOutGrid): Use `--font-body` (Aeonik) at 500 weight (`--font-body-medium`). The sans-serif body font suits the compact, icon-led format.

Both are valid; the distinction is intentional, not inconsistent.

### Body Text Within Cards

```css
.card-body {
  font-family: var(--font-body);      /* Aeonik */
  font-weight: var(--font-body-light); /* 300 */
  font-size: clamp(0.875rem, 1vw, 0.9375rem);  /* 14px to 15px */
  line-height: 1.55;
  color: var(--stone);                 /* #767470 */
}
```

This is smaller and lighter than standard body text (`1.0625rem`) because card descriptions are secondary information. The reader scans cards; they do not read them linearly.

### Metadata (Dates, Tags, Locations)

```css
.card-meta {
  font-family: var(--font-body);
  font-weight: var(--font-body-regular); /* 400 */
  font-size: 0.8125rem;                  /* 13px */
  line-height: 1.4;
  color: var(--stone);
  letter-spacing: 0.01em;
}
```

This matches the existing `text-[13px] text-[var(--stone)]` pattern used in `AcquisitionCard` for location lines and bed/bath/car counts.

For uppercase metadata labels (like "Off Market" pill, eyebrow labels within cards):

```css
.card-meta-label {
  font-family: var(--font-body);
  font-weight: var(--font-body-regular); /* 400 */
  font-size: 0.6875rem;                  /* 11px */
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--hills);
}
```

This aligns with the existing `.eyebrow-label` pattern.

### CTA Links Within Cards

```css
.card-link {
  font-family: var(--font-body);
  font-weight: var(--font-body-medium);  /* 500 */
  font-size: 0.875rem;                   /* 14px */
  color: var(--hills);
  text-decoration: none;
  transition: text-decoration 0.3s var(--ease-out);
}
.card:hover .card-link {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
}
```

The underline should only appear on card hover (the entire card is the click target). The underline offset of 4px gives breathing room. The 1px thickness keeps it refined.

---

## 7. CSS Custom Properties Summary

Add all new tokens to `:root` in `index.css`, alongside the existing design tokens:

```css
/* Elevation system */
--elevation-0: none;
--elevation-1: 0 1px 3px rgba(0,0,0,0.03), 0 4px 16px rgba(0,0,0,0.04);
--elevation-2: 0 2px 6px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06);
--elevation-hover: 0 4px 12px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.08);
```

These replace the existing `--shadow-card` and `--shadow-hover` tokens in `Layout.jsx`. During migration, both sets can coexist. Once all components use the new tokens, remove the old ones.

---

## 8. Implementation Priority

1. **Add elevation tokens** to `index.css` `:root` (5 min)
2. **Update `.surface` class** in `Layout.jsx` to use `--elevation-1` / `--elevation-hover` (5 min)
3. **Update `.segment-card`** with `transform: translateY(-2px)` on hover and new shadow tokens (5 min)
4. **SegmentCardGrid image aspect ratio** change from `16/10` to `3/2` (2 min)
5. **InfoSplit background alternation** in `LandingPageTemplate.jsx` (10 min)
6. **LandingHero overlay** refinement (5 min)
7. **StatsBar dividers** (10 min)
8. **Suburbs section pill layout** (20 min)
9. **Landing page shared sections reduction** (15 min, separate ticket)

Total estimated engineering time: ~75 minutes across two sessions.

---

## 9. Accessibility Notes

- All hover states must also apply on `:focus-visible` for keyboard users
- The existing `.segment-card:focus-visible` outline is correct and should remain
- Card transforms on hover must respect `prefers-reduced-motion: reduce` (set transform to `none`)
- Image zooms within cards are already handled by the existing reduced-motion media query
- Ensure all elevation transitions include `transition: none` in the reduced-motion block

---

## 10. What This Spec Does NOT Cover

- **FeatureSplit component redesign**: Covered in a separate ticket (Phase 5C, second component group)
- **Stat counter animations**: Covered in Phase 5C stat counter ticket
- **Blog card redesign**: Out of scope for this phase; blog cards use the existing `.surface` pattern which will benefit from the elevation token update
- **Mobile-specific card layouts**: The existing responsive grid is well-calibrated. No mobile-specific card redesign needed.
- **New component creation**: This spec refines existing components only. No new React components are required.
