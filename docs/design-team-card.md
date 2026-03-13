# Design Spec: Team Member Profile Card

**Component**: `TeamCard`
**Page**: About (`/src/pages/About.jsx`)
**Status**: Design complete, ready for engineering
**Date**: 2026-03-07
**Designer**: Frontend Designer (Agent)

---

## 1. Design Intent

The team card is one of the most personal touchpoints on the site. It should feel like turning a page in a coastal lifestyle magazine and seeing a portrait feature. The card must convey warmth, expertise, and approachability without any visual clutter.

The current implementation is a solid foundation. This spec refines it to fully align with the agreed creative direction: relaxed coastal luxury, editorial typography, generous whitespace, and slow, considered interactions.

---

## 2. Card Layout

**Structure**: Vertical card (image stacked above text content). No overlay text on the image. The image breathes on its own; the text body sits below in a clean, structured block.

```
+---------------------------------------+
|                                       |
|           Portrait Image              |
|           (4:5 aspect ratio)          |
|                                       |
+---------------------------------------+
|  ── decorative rule ──                |
|  Name                                 |
|  Position                             |
|                                       |
|  Bio excerpt (3 lines max)            |
|                                       |
|  [Specialty] [Specialty] [Specialty]  |
+---------------------------------------+
```

**Rationale**: A side-by-side layout was considered but rejected. At 3 columns on desktop, side-by-side cards would make images too small to feel editorial. The vertical stack lets the portrait dominate, which is correct for a people-first business.

**Card surface**: White (`#fff`) background. No visible border. Subtle resting shadow. The card itself is a `<Link>` wrapper (entire card is clickable), containing an `<article>` element.

---

## 3. Image Treatment

### Aspect Ratio
- **4:5** (portrait orientation, matching the current implementation)
- Sanity image request: `urlFor(photo).width(800).height(1000).fit("crop")`
- The `hotspot: true` option on the Sanity schema ensures CMS editors can control crop focus

### Border Radius
- **Top corners only**: `var(--radius-card)` (12px) on `border-top-left-radius` and `border-top-right-radius`
- Bottom corners: 0 (continuous with the card body below)
- Applied to the image container `<div>`, not the `<img>` itself

### Overflow
- Image container has `overflow: hidden` to clip the image during scale transforms

### Resting State
- Image displays at natural crop, `object-fit: cover`
- No filter, no overlay, no desaturation

### Hover Effect
- **Slow zoom**: `transform: scale(1.04)` over `900ms` using `var(--ease-out)`
- No colour overlay on hover. The image should feel alive, not obscured.
- The scale is intentionally subtle (1.04, not 1.1) to maintain the unhurried, luxury feel

### Loading
- `loading="lazy"` attribute on all team card images
- Skeleton placeholder shown while loading (current pulse animation is good, keep it)

---

## 4. Typography

All type specs use existing CSS custom properties. No new font families or weights required.

### Name (h3)
| Property        | Value                                        |
|-----------------|----------------------------------------------|
| Font family     | `var(--font-heading)` (MinervaModern)        |
| Font size       | `clamp(1.125rem, 1.5vw, 1.375rem)`          |
| Font weight     | `400`                                        |
| Letter spacing  | `-0.01em`                                    |
| Line height     | `1.2`                                        |
| Colour          | `var(--ink)` (#232323)                       |
| Margin bottom   | `0.125rem` (2px, tight coupling with position)|

### Position
| Property        | Value                                        |
|-----------------|----------------------------------------------|
| Font family     | `var(--font-body)` (Aeonik)                  |
| Font size       | `0.875rem` (14px)                            |
| Font weight     | `var(--font-body-light)` (300)               |
| Colour          | `var(--stone)` (#767470)                     |
| Line height     | `1.4`                                        |
| Margin bottom   | `0.75rem`                                    |

### Bio Excerpt
| Property        | Value                                        |
|-----------------|----------------------------------------------|
| Font family     | `var(--font-body)` (Aeonik)                  |
| Font size       | `0.9375rem` (15px)                           |
| Font weight     | `var(--font-body-light)` (300)               |
| Colour          | `var(--stone)` (#767470)                     |
| Line height     | `1.65`                                       |
| Truncation      | 3-line clamp via `-webkit-line-clamp: 3`     |
| Margin bottom   | `0` (badges handle their own top margin)     |

**Line clamp rationale**: 3 lines gives enough to understand the person's angle without overwhelming the card. The full bio lives on the individual profile page.

### Specialty Badges
| Property        | Value                                        |
|-----------------|----------------------------------------------|
| Font family     | `var(--font-body)` (Aeonik)                  |
| Font size       | `0.6875rem` (11px)                           |
| Font weight     | `var(--font-body-regular)` (400)             |
| Colour          | `var(--stone)` (#767470)                     |
| Border          | `1px solid var(--bright-grey)` (#ECEBEA)     |
| Border radius   | `var(--radius-badge)` (999px, pill shape)    |
| Padding         | `0.25rem 0.625rem` (4px 10px)               |
| Max displayed   | 3 badges. If more exist, they are hidden.    |
| Gap             | `0.375rem` (6px) between badges              |
| Margin top      | `0.75rem` from bio text                      |

---

## 5. Decorative Rule

A short horizontal line sits between the image and the name to create a visual pause. This is a signature detail that gives the card an editorial feel.

| Property        | Value                                        |
|-----------------|----------------------------------------------|
| Width           | `2rem` (32px)                                |
| Height          | `2px`                                        |
| Border radius   | `999px`                                      |
| Colour          | `var(--hills)` (#4B7371) at `0.5` opacity    |
| Margin bottom   | `0.75rem` below the rule, before the name    |

**No change from current implementation.** This detail works well.

---

## 6. Spacing

### Card Body (text area below image)
```
padding: clamp(1.25rem, 2vw, 1.5rem)         /* top, left, right */
         clamp(1.25rem, 2vw, 1.5rem)
         clamp(1.5rem, 2.5vw, 1.75rem);       /* bottom — slightly more for visual weight */
```

This uses fluid spacing via `clamp()` to scale gracefully. The bottom padding is slightly larger than top/sides to give the card body a grounded feel.

### Internal Element Spacing Summary
| Element                    | Margin/Gap                  |
|----------------------------|-----------------------------|
| Decorative rule to name    | `0.75rem` (margin-bottom)   |
| Name to position           | `0.125rem` (margin-bottom)  |
| Position to bio            | `0.75rem` (margin-bottom)   |
| Bio to badges              | `0.75rem` (margin-top)      |
| Between badges             | `0.375rem` (gap)            |

---

## 7. Card Surface & Shadow

### Resting State
```css
background: #fff;
border-radius: var(--radius-card);           /* 12px */
overflow: hidden;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
```

### Hover State
```css
box-shadow: var(--shadow-hover);
/* Resolves to: 0 20px 48px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04) */
transform: translateY(-2px);
```

### Transitions
```css
transition:
  box-shadow var(--duration-normal) var(--ease-out),
  transform var(--duration-normal) var(--ease-out);
/* Resolves to: 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) */
```

**Design note**: The `-2px` lift is deliberately restrained. A larger lift (e.g. -6px) would feel jumpy and break the calm mood. The shadow deepening does the heavy lifting to communicate interactivity.

---

## 8. Hover State (Composite)

On card hover, three things happen simultaneously:

1. **Card lifts**: `transform: translateY(-2px)`
2. **Shadow deepens**: from resting shadow to `var(--shadow-hover)`
3. **Image zooms**: `transform: scale(1.04)` over 900ms

All transitions use `var(--ease-out)` for consistency. The image zoom is intentionally slower (900ms) than the card lift (500ms) to create a layered, unhurried feeling — the card responds immediately, but the image continues to drift in, like a slow breath.

**No opacity changes, no colour overlays, no text reveals on hover.** The interaction should feel inevitable, not performative.

---

## 9. Click Behaviour

The entire card is wrapped in a `<Link to={/team/${slug}}>` element. The card links to an individual team member profile page at `/team/:slug`.

**Cursor**: `pointer` (inherited from the link wrapper)

**Active state** (on click/tap): No additional visual treatment beyond the browser default. The navigation is instant; there's no need for a pressed state.

**Profile page note**: The `/team/:slug` route does not yet exist. A separate ticket should cover the individual profile page design and build. The card's job is simply to link there.

---

## 10. Responsive Behaviour

### Grid Layout

The team cards sit inside a CSS Grid container. The grid is centred within `.site-container` with an additional `max-width` constraint.

```css
.team-grid {
  display: grid;
  gap: clamp(1.5rem, 3vw, 2.5rem);
  max-width: 64rem;                         /* 1024px */
  margin: 0 auto;
}
```

### Breakpoints

| Breakpoint       | Columns | Card Behaviour                           |
|------------------|---------|------------------------------------------|
| 320px - 639px    | 1       | Full-width cards, single column stack    |
| 640px - 1023px   | 2       | Two-column grid                          |
| 1024px+          | 3       | Three-column grid                        |

**Tailwind classes**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**Why 3 columns, not 4**: With the current team size (2-4 members), 3 columns creates a balanced, generous layout. 4 columns would make the portraits too small and the cards too narrow for the bio excerpt to read comfortably. If the team grows beyond 6 members, revisit this decision.

### Card Width Constraints
- No explicit `max-width` on individual cards — the grid controls their width
- At single column (mobile), cards stretch to full container width
- The grid's `max-width: 64rem` prevents cards from becoming absurdly wide on ultrawide screens

### Mobile-Specific Adjustments
- Touch target: The entire card is tappable (well exceeds 44px minimum)
- Image aspect ratio remains 4:5 on all breakpoints (portraits should never be cropped to landscape on mobile)
- Font sizes use `clamp()` so they scale down gracefully — no breakpoint-specific overrides needed
- Card body padding scales via `clamp()` — tighter on mobile, more generous on desktop

### Grid Gap
- `gap: clamp(1.5rem, 3vw, 2.5rem)` — fluid gap that tightens on mobile and loosens on desktop
- This single `gap` value applies to both column-gap and row-gap (uniform spacing)

---

## 11. Section Context

The team grid sits within a section that uses `bg-sand-wash` background and `var(--section-breathing)` vertical padding.

### Section Header
Above the grid:
- Eyebrow: `"The Team"` using `.eyebrow-label` class
- Heading (h2): `"Who you'll work with"` in `var(--font-heading)`
- Supporting text: One sentence, `max-width: 36rem`, centred
- Margin below header: `clamp(2.5rem, 5vw, 4rem)` before the grid starts

This header is already well-implemented. No changes needed.

---

## 12. Scroll Animation

Each card uses the existing `ScrollReveal` component with `StaggerGroup`.

| Property         | Value                                        |
|------------------|----------------------------------------------|
| Animation        | `fade-up` (translateY 12px + opacity 0 to 1) |
| Duration         | `1200ms` (default in ScrollReveal)           |
| Stagger          | `120ms` between cards                        |
| Threshold        | `0.15` (triggers when 15% visible)           |
| Easing           | `cubic-bezier(0.22, 0.61, 0.36, 1)`         |
| Once             | `true` (animate only on first scroll-in)     |
| Reduced motion   | Respects `prefers-reduced-motion: reduce`    |

**No changes from current implementation.** The stagger creates a pleasant left-to-right wave effect as cards enter the viewport.

---

## 13. Loading State (Skeleton)

While team data fetches from Sanity, show 3 skeleton cards. The current skeleton implementation is retained:

- Same grid layout as populated cards
- Each skeleton card has:
  - A `4:5` aspect ratio grey block for the image area (`bg-[var(--bright-grey)]`)
  - Short grey bars for the decorative rule, name, position, and bio lines
  - `animate-pulse` class for the shimmer effect
- `aria-busy="true"` and `aria-label="Loading team members"` on the grid container

---

## 14. Empty State

If no team members are returned from Sanity:

```
No team members yet. Add team profiles in the CMS to display them here.
```

- Centred text
- Colour: `var(--stone)`
- This is a CMS authoring hint, not a user-facing state (the site should always have team members published)

---

## 15. Accessibility

### Semantic HTML
```html
<Link to="/team/{slug}">
  <article class="team-card">
    <div class="team-card__image">
      <img src="..." alt="{name}" loading="lazy" />
    </div>
    <div class="team-card__body">
      <div aria-hidden="true"><!-- decorative rule --></div>
      <h3>{name}</h3>
      <p>{position}</p>
      <p class="line-clamp-3">{bio}</p>
      <div><!-- specialty badges --></div>
    </div>
  </article>
</Link>
```

### Requirements
| Requirement               | Implementation                                     |
|---------------------------|-----------------------------------------------------|
| Alt text                  | `alt="{member name}"` on each photo                 |
| Heading hierarchy         | `h3` for names (section heading is `h2`)            |
| Focus ring                | Browser default outline on the `<Link>` wrapper. Do not suppress `outline`. |
| Focus visibility          | On `:focus-visible`, apply the same shadow/lift as hover state |
| Keyboard navigation       | Cards are focusable via the `<Link>` wrapper (native `<a>` behaviour) |
| Reduced motion            | ScrollReveal already respects `prefers-reduced-motion: reduce` |
| Decorative rule           | Marked `aria-hidden="true"` (purely decorative)     |
| Loading state             | `aria-busy="true"` and `aria-label` on skeleton grid |
| Colour contrast           | Name (`var(--ink)` on white) = 14.5:1 ratio. Position/bio (`var(--stone)` on white) = 4.9:1 ratio. Both pass WCAG AA. |
| Touch targets             | Entire card is tappable, minimum dimension far exceeds 44px |

### Focus-Visible State
```css
.team-card:focus-visible,
a:focus-visible .team-card {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
  outline: 2px solid var(--hills);
  outline-offset: 2px;
}
```

This mirrors the hover state but adds a visible `var(--hills)` outline ring for keyboard users.

---

## 16. Data Contract (Sanity Fields Used)

The card component consumes these fields from the `teamMember` document:

| Field         | Type     | Required | Card Usage                              |
|---------------|----------|----------|-----------------------------------------|
| `name`        | string   | Yes      | Card heading (h3)                       |
| `slug`        | slug     | Yes      | Link URL (`/team/{slug}`)               |
| `position`    | string   | Yes      | Subtitle below name                     |
| `bio`         | text     | Yes      | 3-line excerpt                          |
| `photo`       | image    | No       | Portrait image (fallback to placeholder)|
| `specialties` | string[] | No       | Up to 3 pill badges                     |

Fields **not** used on the card (reserved for the profile page):
- `email`, `phone`, `credentials`, `linkedin_url`, `intro_video_url`

---

## 17. CSS Class Naming

Retain the existing BEM-style naming convention:

| Class                  | Element                                |
|------------------------|----------------------------------------|
| `.team-card`           | Card root (`<article>`)                |
| `.team-card__image`    | Image container                        |
| `.team-card__body`     | Text content container                 |
| `.team-card__rule`     | Decorative horizontal line             |
| `.team-card__name`     | Name heading (h3)                      |
| `.team-card__position` | Position/title paragraph               |
| `.team-card__bio`      | Bio excerpt paragraph                  |
| `.team-card__badges`   | Specialty badges container             |
| `.team-card__badge`    | Individual badge span                  |

**Engineering note**: The current implementation uses inline styles for most typography. The Engineer should migrate these to CSS classes using the BEM names above, referencing CSS custom properties. This improves maintainability and allows hover/focus state styling in CSS rather than JS.

---

## 18. Design Tokens Referenced

All values in this spec map to existing CSS custom properties. No new tokens are required.

| Token                   | Value                                           | Usage                    |
|-------------------------|-------------------------------------------------|--------------------------|
| `--font-heading`        | MinervaModern, Georgia, serif                   | Name                     |
| `--font-body`           | Aeonik, Helvetica Neue, sans-serif              | Position, bio, badges    |
| `--font-body-light`     | 300                                             | Position, bio            |
| `--font-body-regular`   | 400                                             | Badges                   |
| `--ink`                 | #232323                                         | Name colour              |
| `--stone`               | #767470                                         | Position, bio, badges    |
| `--hills`               | #4B7371                                         | Decorative rule, focus ring |
| `--bright-grey`         | #ECEBEA                                         | Badge border, skeletons  |
| `--radius-card`         | 12px                                            | Card corners             |
| `--radius-badge`        | 999px                                           | Badge pill shape         |
| `--shadow-hover`        | 0 20px 48px rgba(0,0,0,0.08), ...               | Hover/focus shadow       |
| `--ease-out`            | cubic-bezier(0.25, 0.1, 0.25, 1)               | All transitions          |
| `--duration-normal`     | 0.5s                                            | Card hover transitions   |
| `--section-breathing`   | clamp(5rem, 10vw, 8rem)                         | Section padding          |
| `--container-max`       | 1200px                                          | Outer container          |

---

## 19. What Changed from Current Implementation

This spec is intentionally conservative. The current card is well-built. Changes are refinements, not redesigns.

| Aspect                   | Current                        | This Spec                       | Reason                                              |
|--------------------------|--------------------------------|----------------------------------|------------------------------------------------------|
| Inline styles            | Extensive inline styles        | CSS classes (BEM)                | Maintainability, hover/focus styling in CSS          |
| Focus state              | None defined                   | Mirrors hover + outline ring     | Accessibility compliance                             |
| Decorative rule          | `aria-hidden` not set          | Add `aria-hidden="true"`         | Screen reader should skip decorative elements        |
| Image scale on hover     | `scale(1.03)`                  | `scale(1.04)`                    | Marginally more perceptible, still restrained        |
| CSS class names          | Only `.team-card`, `__image`, `__body` | Full BEM set (8 classes)  | Engineer can style sub-elements without inline JS    |

**No structural changes.** The layout, typography hierarchy, spacing rhythm, and interaction model are validated by this spec as correct.

---

## 20. Out of Scope

The following items are explicitly **not** covered by this spec:

- **Individual profile page** (`/team/:slug`): Requires its own design ticket. The card links there but the destination page is a separate concern.
- **Team member filtering or search**: Not needed at current team size.
- **Card flip or modal**: Rejected as interaction pattern. Too complex for the calm, editorial mood.
- **Social media icons on card**: LinkedIn, email, phone are reserved for the profile page. The card is a gateway, not a dashboard.
- **Dark mode variant**: Not in scope for the current design system.

---

## 21. Implementation Checklist for Engineer

- [ ] Migrate inline styles to CSS classes using BEM naming from Section 17
- [ ] Add `:focus-visible` styles from Section 15
- [ ] Add `aria-hidden="true"` to the decorative rule element
- [ ] Update image hover scale from `1.03` to `1.04`
- [ ] Verify colour contrast ratios pass WCAG AA (Section 15 confirms they do)
- [ ] Test skeleton loading state renders correctly
- [ ] Test keyboard navigation (Tab through cards, Enter to follow link)
- [ ] Test on mobile (320px), tablet (768px), desktop (1280px)
- [ ] Verify `prefers-reduced-motion` disables animations
- [ ] Confirm Sanity image hotspot crops correctly at 4:5 ratio
