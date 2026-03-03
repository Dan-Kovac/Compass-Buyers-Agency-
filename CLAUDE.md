# Compass Buyers Agency Website

## Project Overview
- **Client**: Compass Buyers Agency (compassagency.com.au)
- **Stack**: React 18 + Vite + Sanity v3 + CSS custom properties
- **Local path**: `/Users/danielkovac/Desktop/compass-site/`
- **Notion board**: Search Notion for "Product & Engineering" database filtered by Project = "Compass Website"
- **Status**: Active development (Design Elevation phase)

## Notion Workflow

This project uses a Notion-based delivery system. Before starting work:

1. **Check the board** — Read tickets from the Notion "Product & Engineering" database filtered to this project
2. **Claim a ticket** — Set Status to "In Progress" and Agent Role to your type
3. **Follow the ticket** — Use the Files, Description, and Acceptance Criteria fields
4. **When done** — Set Status to "Needs Review" and add a note about what changed

### Board Columns
- **Backlog** — Known work, not yet prioritised
- **To Do** — Prioritised and ready to pick up
- **In Progress** — An agent is actively working on it
- **In Review** — Agent finished, human needs to check
- **Done** — Reviewed and accepted

### Agent Roles
| Role | Picks up | Skill focus |
|------|----------|-------------|
| **BA** | Backlog audits, ticket creation, dependency mapping | Project decomposition, Notion integration |
| **Frontend Designer** | DESIGN: tickets | Layout, spacing, typography, color, animation decisions |
| **Engineer** | ENG: tickets | React components, CSS, Sanity integration, build fixes |
| **Copywriter** | COPY: tickets | Headlines, body text, CTAs, brand voice |
| **SEO Specialist** | SEO: tickets | Meta tags, structured data, URL strategy, redirects |
| **Tester** | QA/Bug tickets | Cross-device testing, visual regression, accessibility |
| **DevOps** | DEVOPS: tickets | Vercel deployment, CI/CD, domain config |

### Ticket Dependencies
- DESIGN tickets must be completed before their ENG counterparts
- COPY tickets should be resolved before ENG implements text content
- SEO tickets affecting URLs must be done before deployment
- Check the "Blocked By" field on every ticket before starting

## Architecture

### Pages
| Page | File | Sanity Doc |
|------|------|-----------|
| Home | `src/pages/Home.jsx` | `homePage` |
| About | `src/pages/About.jsx` | `aboutPage` |
| Services | `src/pages/Services.jsx` | `servicesPage` |
| Contact | `src/pages/Contact.jsx` | `contactPage` |
| Areas | `src/pages/Areas.jsx` | `areasPage` |
| Who We Work With | `src/pages/WhoWeWorkWith.jsx` | `whoWeWorkWithPage` |
| Blog | `src/pages/Blog.jsx` | `blogPost` (list) |
| Blog Post | `src/pages/BlogPost.jsx` | `blogPost` (single) |

### Landing Pages
- `src/pages/ByronBayBuyersAgent.jsx`
- `src/pages/GoldCoastBuyersAgent.jsx`
- `src/pages/TweedHeadsBuyersAgent.jsx`
- `src/pages/NorthernRiversBuyersAgent.jsx`
- All use `src/components/LandingHero.jsx`
- Brunswick Heads + Southern Gold Coast shells need rebuilding

### Key Directories
```
src/
  components/     # Shared UI components
  pages/          # Route-level page components
  lib/            # sanityClient.js, utilities
  styles/         # Global CSS, variables
  assets/         # Static images, icons
sanity/
  schemaTypes/    # One schema file per content type
public/
  videos/         # Hero video (when deployed)
```

### CMS (Sanity v3)
- **Project ID**: `31tdhl52` | **Dataset**: `production`
- **Studio**: `cd sanity && npx sanity dev`
- Pages fetch singleton docs via `fetchPage("homePage")` from `src/lib/sanityClient.js`
- Images use `urlFor()` builder
- Schemas use nested objects: `page.hero.title` not `page.heroTitle`
- All 6 main pages have hardcoded fallbacks if Sanity is unreachable

## Design System

### Brand Palette (CSS Custom Properties)
| Token | Hex | Use |
|-------|-----|-----|
| `--hills` | #2C4A3E | Deep green — headings, primary accents, hero overlays |
| `--ink` | #1A1A1A | Near-black — body text |
| `--bright-grey` | #F5F5F5 | Light sections, card backgrounds |
| `--sea-breeze` | #7BAE9E | Accent green — buttons, links, highlights |
| `--sand` | #F5E6D3 | Warm sections, alternating backgrounds |
| `--stone` | #8B7E74 | Muted text, borders, subtle elements |
| `--white` | #FFFFFF | Open space, clean sections |

### Typography
- Headings: MinervaModern (serif)
- Body: Aeonik (sans-serif)
- Both loaded via `@font-face` with `font-display: swap`

### Creative Direction
- **Mood**: Relaxed coastal luxury. Byron Bay golden hour.
- **Target buyer**: Wealthy, lifestyle-driven. Buying the feeling, not just a house.
- **Principle**: Less is more luxury. Fewer elements, larger, more space. Magazine not dashboard.
- **Animations**: Slow, gentle reveals. Nothing bouncy or attention-grabbing.
- **Palette as landscape**: sand = afternoon light, sea-breeze = morning ocean, hills = hinterland, stone = driftwood, white = open sky

## Copy Rules
- Australian English (colour, programme, organisation)
- No em dashes anywhere
- Never use "purchase" (use "buy" or "secure")
- Buyer-framed copy (focus on the buyer's journey, not the agency)
- Phone: 0403 536 390
- Email: hello@compassbuyersagency.com.au

## Build & Dev
```bash
# Dev server
cd /Users/danielkovac/Desktop/compass-site && npm run dev -- --host

# Production build
npm run build

# Sanity Studio
cd sanity && npx sanity dev
```

### Build Notes
- `legacySDKImports: true` MUST be set in `vite.config.js` (Sanity compatibility)
- React.lazy() code splitting is configured for all page routes
- Vendor chunking splits react, sanity, and framer-motion into separate chunks
- Last clean build: main 497KB (145KB gzipped)
