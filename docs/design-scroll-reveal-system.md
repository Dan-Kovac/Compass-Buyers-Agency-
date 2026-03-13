# Scroll Reveal Animation System -- Design Spec

**Phase**: 5A - Animations
**Status**: Design complete, ready for engineering
**Date**: 2026-03-07

---

## 1. Design Philosophy

Compass is a coastal luxury brand. The animation system should feel like watching the tide come in: unhurried, inevitable, natural. Every entrance should communicate confidence and calm. Nothing should feel like it snaps, bounces, or demands attention.

**Principles:**
- Slow is luxurious. Fast is cheap.
- Opacity + transform only. Never animate layout properties.
- One animation per element. No sequenced multi-step reveals on a single node.
- Stagger creates rhythm, not spectacle.
- If you can't feel the animation, it's working.

---

## 2. Animation Vocabulary

Six named animation types. Each defines an initial (hidden) state; the visible state is always `opacity: 1; transform: none`.

### 2.1 `fade-up`
**Use for**: Section headings, body text, standalone content blocks.
```css
.sr-fade-up {
  opacity: 0;
  transform: translateY(24px);
}
```
The current `12px` offset is too subtle to register. `24px` gives enough travel to feel intentional without looking like a loading glitch. The previous `scale(0.98)` is removed. Scale on text blocks creates a perceptible blur flicker during the transition, which undermines the editorial crispness we want.

### 2.2 `fade-in`
**Use for**: CTA sections, pull quotes, full-width content that should materialise in place.
```css
.sr-fade-in {
  opacity: 0;
  transform: none;
}
```
Pure opacity fade. No spatial movement. This is the quietest entrance: for moments where the content should appear to have always been there, you just hadn't looked yet. Removing the current `scale(0.98)` -- the same blur-flicker reasoning applies.

### 2.3 `fade-left`
**Use for**: Content sliding in from the right edge (images on the right side of a split, text entering from the right).
```css
.sr-fade-left {
  opacity: 0;
  transform: translateX(40px);
}
```
Increased from the current `16px` to `40px`. The asymmetric split layouts (60/40) have wide gutters and large images; `16px` of travel is invisible against a 600px-wide image. `40px` gives the slide enough visual weight to feel deliberate on desktop, while remaining modest enough not to distract.

### 2.4 `fade-right`
**Use for**: Content sliding in from the left edge (images on the left side of a split, text entering from the left).
```css
.sr-fade-right {
  opacity: 0;
  transform: translateX(-40px);
}
```
Mirror of `fade-left`. Same rationale.

### 2.5 `scale-subtle`
**Use for**: Card grids, team cards, acquisition cards, testimonial cards. Elements that benefit from a slight growth effect.
```css
.sr-scale-subtle {
  opacity: 0;
  transform: scale(0.95);
}
```
New animation type. Cards are discrete surfaces; a scale-up from 95% creates a gentle "materialising" effect that complements the card's shadow and border-radius. This replaces the current pattern of using `fade-up` on cards, which creates an odd visual effect when cards are in a horizontal grid (they all slide up identically, looking mechanical rather than organic).

### 2.6 `fade-up-slow`
**Use for**: Hero section internal elements (tagline, subtitle, CTA button) that need a more dramatic, cinematic entrance.
```css
.sr-fade-up-slow {
  opacity: 0;
  transform: translateY(32px);
}
```
Slightly more travel than standard `fade-up`, paired with longer duration (see section 3). This is the "above the fold" reveal -- slower and more spacious because the user is arriving fresh at the page with nothing else competing for attention.

---

## 3. Timing and Easing

### 3.1 Base Duration

| Context | Duration | Rationale |
|---|---|---|
| Standard sections | `700ms` | Slow enough to feel luxurious. Fast enough not to frustrate. |
| Hero elements | `1000ms` | First impression, nobody is scrolling yet. |
| Card stagger children | `600ms` | Slightly faster because the stagger creates perceived duration. |
| CTA / pull quote | `800ms` | Materialise gently. |

The current component default is `1200ms`, which is too slow. At 1200ms, a user scrolling at normal speed reaches the next section before the current one finishes revealing, creating a queue of partially-visible elements. `700ms` is the sweet spot: perceptibly slow, never sluggish.

**Update the component default from `1200` to `700`.**

### 3.2 Easing Curve

```css
--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
```

This is an **expo-out** curve. The element moves quickly out of its hidden state (responding immediately to scroll) then decelerates to a gentle stop. The deceleration tail is where the luxury lives -- it makes the element look like it's settling into position rather than snapping.

Comparison with current easing:
- Current: `cubic-bezier(0.22, 0.61, 0.36, 1)` -- a standard ease-out, functional but generic.
- Proposed: `cubic-bezier(0.16, 1, 0.3, 1)` -- stronger deceleration, more personality.

The `1` in the second control point creates a slight overshoot tendency that softens the landing. The difference is subtle but perceptible on side-by-side comparison: the new curve feels more organic and less programmatic.

**Add `--ease-reveal` to `:root` in `index.css` alongside the existing `--ease-out`.**

### 3.3 Stagger Timing

| Grid type | Stagger delay | Rationale |
|---|---|---|
| 4-column stat bars | `100ms` | Tight, rhythmic. Stats should cascade quickly. |
| 3-column team/card grids | `120ms` | Standard rhythm. |
| 2-column content grids | `100ms` | Slightly tighter because fewer items. |
| Testimonial cards (4-col) | `80ms` | Many items, tighter stagger prevents the last card from appearing too late. |

The current `StaggerGroup` default is `150ms`, which is fine for 3-item grids but creates a `450ms` total delay for the last item in a 4-item grid. At that point, the first item has nearly finished animating before the fourth begins, which looks broken rather than intentional.

**Update the `StaggerGroup` default from `150` to `100`.**

---

## 4. Section-by-Section Mapping

This is the canonical reference for which animation + timing to use on every section type across the site.

### 4.1 Page Headers (all inner pages)
```
Pattern: Single ScrollReveal wrapping the header content block
Animation: fade-up
Duration: 700ms (default)
Delay: 0ms
```
All inner pages (About, Services, Contact, Areas, Who We Work With) use the same `page-header` class with centred eyebrow + h1 + subtitle. One `ScrollReveal` wraps the entire block. No stagger needed; the header is a single visual unit.

### 4.2 Hero Sections (Home)
```
Pattern: Multiple ScrollReveals for title, subtitle, CTA (within HomeHero component)
Animation: fade-up-slow
Duration: 1000ms
Delay: 0ms for title, 150ms for subtitle, 300ms for CTA
```
Hero is the first thing the user sees. The longer duration and staggered entrance creates a cinematic unfolding. The video background should already be playing (no scroll trigger needed for the hero itself). The text overlays within the hero should use `fade-up-slow` with cascading delays.

### 4.3 Stats / Trust Bars
```
Pattern: Section heading in ScrollReveal, stat items in StaggerGroup
Animation: fade-up (heading), scale-subtle (each stat)
Duration: 700ms
Stagger: 100ms between stats
```
Stats are small, punchy elements. The `scale-subtle` animation makes each number "pop" into existence. The tight stagger creates a quick cascade that feels like a counter sequence without actually animating the numbers (number animation is a separate concern, noted in section 7).

### 4.4 Feature Splits / Info Splits / Segment Sections
```
Pattern: Two ScrollReveals -- one for image, one for text
Animation: Image uses fade-left or fade-right (based on position), text uses the opposite
Duration: 700ms
Delay: 0ms for image, 120ms for text
```
This is the current pattern and it works well. The opposing directions create a "curtain opening" effect. The 120ms offset gives the image a head start, drawing the eye to the visual before the text appears. No changes to the pattern, just the updated transform distances (40px) and easing.

### 4.5 Card Grids (team cards, buyer segments, acquisitions, blog cards)
```
Pattern: StaggerGroup wrapping ScrollReveal around each card
Animation: scale-subtle
Duration: 600ms
Stagger: 120ms (3-col), 80ms (4-col)
```
Cards should grow into view rather than slide up. The `scale-subtle` animation starting at `scale(0.95)` creates a gentle expansion that works with the card's shadow and border-radius. The slightly shorter 600ms duration compensates for the stagger, keeping the total reveal sequence under 1 second for most grids.

### 4.6 FAQ Sections
```
Pattern: Section heading in ScrollReveal, accordion items NOT individually wrapped
Animation: fade-up (heading only)
Duration: 700ms
```
The accordion items should NOT be individually scroll-revealed. They are interactive elements; wrapping each in a ScrollReveal would make the user wait for the animation to complete before they can click. The accordion's own expand/collapse animation (handled by Radix/shadcn) provides the motion.

The heading ("Frequently Asked Questions") gets a standard `fade-up`.

### 4.7 CTA Sections
```
Pattern: Single ScrollReveal wrapping the entire CTA block
Animation: fade-in
Duration: 800ms
Delay: 0ms
```
CTAs should materialise, not fly in. The `fade-in` animation (pure opacity, no transform) creates a quiet, confident entrance. The dark background of `bg-editorial-dark` already provides strong visual separation from the section above, so spatial movement would be redundant.

### 4.8 Pull Quote / Blockquote Breaks
```
Pattern: Single ScrollReveal wrapping the quote
Animation: fade-in
Duration: 1200ms (exception: deliberately slow)
Delay: 0ms
```
Pull quotes are editorial pauses. The extended 1200ms duration here is intentional: it creates a moment of stillness. The quote should appear to slowly emerge, like text developing on photographic paper. This is the one place where the longer duration is correct.

### 4.9 Testimonial Sections
```
Pattern: Heading in ScrollReveal, video cards in StaggerGroup
Animation: fade-up (heading), scale-subtle (each card)
Duration: 700ms (heading), 600ms (cards)
Stagger: 80ms between cards
```
Video testimonial cards follow the card grid pattern. The tight 80ms stagger for a 4-column grid keeps the total sequence at 240ms, which feels like a wave rather than a queue.

### 4.10 Image Bands
```
Pattern: No ScrollReveal
Animation: none
```
Full-bleed image bands (`ImageBand` component) should NOT be scroll-revealed. They are atmospheric spacers. Fading them in draws attention to what should be a seamless visual transition. They should simply be present when scrolled into view.

### 4.11 Region / Shire Cards
```
Pattern: StaggerGroup wrapping ScrollReveal around each shire card
Animation: fade-up
Duration: 700ms
Stagger: 120ms
```
Region cards are taller and more content-heavy than other cards. The `fade-up` animation (rather than `scale-subtle`) works better here because the cards have large images and text blocks that benefit from directional movement.

---

## 5. Props API

### 5.1 Updated ScrollReveal Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `animation` | `string` | `"fade-up"` | Animation type. One of: `fade-up`, `fade-in`, `fade-left`, `fade-right`, `scale-subtle`, `fade-up-slow` |
| `delay` | `number` | `0` | Milliseconds to wait before animating. Added to any stagger delay from parent `StaggerGroup`. |
| `duration` | `number` | `700` | Transition duration in ms. Override for specific contexts (hero: 1000, cards: 600, quotes: 1200). |
| `threshold` | `number` | `0.15` | IntersectionObserver threshold (0-1). How much of the element must be visible before triggering. |
| `once` | `boolean` | `true` | Animate only once. When `false`, element re-hides when scrolled out and re-animates on re-entry. |
| `as` | `string` | `"div"` | HTML element type to render. |
| `className` | `string` | `""` | Additional CSS classes. |
| `style` | `object` | `{}` | Additional inline styles. |

### 5.2 Updated StaggerGroup Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `stagger` | `number` | `100` | Delay increment in ms between each child. |

### 5.3 No New Props Required

The existing API is clean and sufficient. The changes are:
1. Update `duration` default from `1200` to `700`.
2. Update `StaggerGroup` stagger default from `150` to `100`.
3. Add new CSS classes for `sr-scale-subtle` and `sr-fade-up-slow`.
4. Update existing CSS classes with revised transform values.
5. Update the easing curve in the `.sr` base class.

---

## 6. Responsive Behaviour

### 6.1 Mobile Animations (below 768px)

Mobile screens are smaller, so transform distances should be proportionally reduced. The user is also likely scrolling faster on mobile (thumb-flick vs trackpad).

```css
@media (max-width: 767px) {
  .sr-fade-up      { transform: translateY(16px); }
  .sr-fade-up-slow { transform: translateY(20px); }
  .sr-fade-left    { transform: translateX(24px); }
  .sr-fade-right   { transform: translateX(-24px); }
  .sr-scale-subtle { transform: scale(0.96); }
}
```

**Do NOT reduce duration on mobile.** The same 700ms feels correct on both viewports. What changes is the distance, not the speed.

**Do NOT disable transforms on mobile.** The fade+translate combination is GPU-composited and performs well on all modern mobile devices. Disabling transforms would make the mobile experience feel cheaper than desktop.

### 6.2 `prefers-reduced-motion`

Already handled in the component (`setVisible(true)` immediately, skipping the observer). The CSS layer also needs to match:

```css
@media (prefers-reduced-motion: reduce) {
  .sr {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

This is already present in `Layout.jsx`. No changes needed.

### 6.3 Performance Constraints

- **Only animate `opacity` and `transform`.** These are the only CSS properties that can be GPU-composited without triggering layout or paint. The current implementation already follows this rule. Do not introduce `filter`, `box-shadow`, `clip-path`, or any other properties into the animation system.
- **`will-change: opacity, transform`** is already set on `.sr`. This hints to the browser to promote the element to its own compositor layer. Keep this.
- **`rootMargin: "0px 0px -40px 0px"`** in the IntersectionObserver config triggers animations 40px before the element enters the viewport from below. This prevents the user from seeing the "jump" from hidden to visible. Keep this value.

---

## 7. Out of Scope (noted for future tickets)

These related animation concerns are intentionally excluded from this spec. They require separate design and engineering work.

- **Stat counter animation**: Animating numbers from 0 to their final value (e.g., "0%" to "42%"). Requires a separate `CountUp` component, not a ScrollReveal concern.
- **Image zoom-on-hover**: Already implemented inline on some components (`SegmentSection`, team cards). Not a scroll-triggered concern.
- **Parallax scrolling**: Intentionally excluded. Parallax is antithetical to the "calm, unhurried" brand ethos. It creates visual busyness.
- **Loading/skeleton animations**: The existing `animate-pulse` loading states are fine. Not a scroll-reveal concern.
- **Page transition animations**: Navigation transitions between pages. A React Router concern, not IntersectionObserver.

---

## 8. CSS Changes Summary

All CSS lives in the `<style>` block in `Layout.jsx` (lines 282-301). The updated block:

```css
/* -- ScrollReveal animations -- */
.sr {
  opacity: 0;
  transition-property: opacity, transform;
  transition-timing-function: var(--ease-reveal);
  will-change: opacity, transform;
}

.sr-fade-up      { transform: translateY(24px); }
.sr-fade-up-slow { transform: translateY(32px); }
.sr-fade-in      { transform: none; }
.sr-fade-left    { transform: translateX(40px); }
.sr-fade-right   { transform: translateX(-40px); }
.sr-scale-subtle { transform: scale(0.95); }

.sr-visible {
  opacity: 1 !important;
  transform: none !important;
}

@media (max-width: 767px) {
  .sr-fade-up      { transform: translateY(16px); }
  .sr-fade-up-slow { transform: translateY(20px); }
  .sr-fade-left    { transform: translateX(24px); }
  .sr-fade-right   { transform: translateX(-24px); }
  .sr-scale-subtle { transform: scale(0.96); }
}

@media (prefers-reduced-motion: reduce) {
  .sr {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

### New CSS custom property in `index.css` `:root`:
```css
--ease-reveal: cubic-bezier(0.16, 1, 0.3, 1);
```

---

## 9. Component Changes Summary

### `ScrollReveal.jsx`
- Change `duration` default from `1200` to `700`

### `StaggerGroup` (in same file)
- Change `stagger` default from `150` to `100`

### Per-component usage updates
After the core changes above, update specific component files to use the refined animation types where the section mapping (section 4) differs from current usage. Key changes:

| Component | Current | Target |
|---|---|---|
| `CTASection.jsx` | `animation="fade-in"` | No change (already correct) |
| `FeatureSplit.jsx` | `animation={imgAnim}` + `delay={120}` | No change (already correct) |
| `SegmentSection.jsx` | Same split pattern | No change (already correct) |
| `ServiceStats.jsx` items | `<ScrollReveal>` (default fade-up) | `animation="scale-subtle"` |
| Team cards in `About.jsx` | `animation="fade-up"` | `animation="scale-subtle"` + `duration={600}` |
| `TestimonialSection.jsx` items | `<ScrollReveal>` (default fade-up) | `animation="scale-subtle"` + `duration={600}` |
| `WhyStandOutGrid.jsx` items | `<ScrollReveal>` (default fade-up) | `animation="scale-subtle"` + `duration={600}` |
| `RecentAcquisitionsStrip.jsx` items | `<ScrollReveal>` (default fade-up) | `animation="scale-subtle"` + `duration={600}` |
| `SegmentCardGrid.jsx` items | `animation="fade-up"` | `animation="scale-subtle"` + `duration={600}` |
| `RegionLinksGrid.jsx` items | `<ScrollReveal>` (default fade-up) | `animation="scale-subtle"` + `duration={600}` |
| `Blog.jsx` post items | `<ScrollReveal>` (default fade-up) | `animation="scale-subtle"` + `duration={600}` |
| `PullQuoteBreak.jsx` | `animation="fade-in" duration={1200}` | No change (already correct) |

---

## 10. Audit of Current Usage (for reference)

ScrollReveal is used in **30+ component files** across the codebase. The current patterns are:

1. **Page headers**: Single `<ScrollReveal>` wrapping eyebrow + h1 + p (correct, keep).
2. **Split layouts**: Opposing `fade-left` / `fade-right` with 120ms offset (correct, keep).
3. **Card grids**: `fade-up` with `StaggerGroup` (change to `scale-subtle`).
4. **Stat bars**: `StaggerGroup` with default `fade-up` (change to `scale-subtle`).
5. **CTAs**: `fade-in` (correct, keep).
6. **Pull quotes**: `fade-in` at 1200ms (correct, keep).
7. **Standalone content**: Default `fade-up` (correct, keep).

The system is already well-structured. The changes are refinements, not a rewrite:
- More distinctive animation vocabulary (6 types vs 4)
- Better-calibrated timing (700ms default vs 1200ms)
- More organic easing curve
- Reduced mobile transform distances
- Cards get their own animation type (`scale-subtle`)
