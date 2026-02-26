# Sanity CMS Setup — Compass Buyers Agency

## What this gives you
A hosted CMS studio at `your-studio-name.sanity.studio` where the client can log in and edit:
- Every text field and image on every static page (Home, About, Services, Contact, Areas, Who We Work With, Privacy Policy)
- Site-wide settings (logo, phone, email, address, footer copy, social links)

Blog posts, acquisitions, testimonials, case studies and team members remain in Base44.

---

## Step 1 — Create the Sanity project

```bash
cd /Users/danielkovac/Desktop/compass-site/sanity
npm install
npx sanity init --env
```

During init:
- Choose **"Create new project"**
- Project name: `Compass Buyers Agency`
- Dataset: `production`
- Project output path: **leave as-is** (you're already in the sanity folder)
- Template: **"Clean project with no predefined schemas"**

Copy the `projectId` that's printed at the end.

---

## Step 2 — Add the project ID everywhere

**`sanity/sanity.config.js`** — replace `YOUR_PROJECT_ID`
**`sanity/sanity.cli.js`** — replace `YOUR_PROJECT_ID`

**`/Users/danielkovac/Desktop/compass-site/.env.local`** (create this file):
```
VITE_SANITY_PROJECT_ID=your_project_id_here
VITE_SANITY_DATASET=production
```

---

## Step 3 — Run the studio locally

```bash
cd /Users/danielkovac/Desktop/compass-site/sanity
npm run dev
```

Opens at http://localhost:3333. You'll see:
- Site Settings
- Home Page
- About Page
- Services Page
- Contact Page
- Areas Page
- Who We Work With Page
- Privacy Policy Page

Fill in content for each document. Every page is a **singleton** — one document, always the same ID.

---

## Step 4 — Install the Sanity client in the React app

```bash
cd /Users/danielkovac/Desktop/compass-site
npm install @sanity/client @sanity/image-url
```

The client is already written at `src/lib/sanityClient.js`.

---

## Step 5 — Connect a page (example: Home)

In `src/pages/Home.jsx`, replace the static imports with a data fetch:

```jsx
import { useEffect, useState } from 'react';
import { fetchPage, urlFor } from '../lib/sanityClient';

export default function Home() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetchPage('homePage').then(setPage);
  }, []);

  if (!page) return null; // or a skeleton loader

  return (
    <>
      <HomeHero
        title={page.hero?.title}
        subtitle={page.hero?.subtitle}
        backgroundImageUrl={page.hero?.backgroundImage ? urlFor(page.hero.backgroundImage).width(1920).url() : undefined}
        ctaText={page.hero?.ctaText}
      />
      {/* ...pass other page.sections to their components */}
    </>
  );
}
```

Repeat for each page. Every component already accepts props — you're just swapping hardcoded strings for Sanity data.

---

## Step 6 — Deploy the studio

```bash
cd /Users/danielkovac/Desktop/compass-site/sanity
npm run deploy
```

Choose a studio hostname, e.g. `compass-agency`. The studio goes live at:
`https://compass-agency.sanity.studio`

Send the client this URL. They create their own Sanity account and you invite them as an Editor.

---

## Step 7 — Deploy the React app to Vercel

```bash
cd /Users/danielkovac/Desktop/compass-site
npm run build   # confirm it builds cleanly first
```

Then in Vercel dashboard:
- Import the `compass-site` repo
- Add env vars: `VITE_SANITY_PROJECT_ID` and `VITE_SANITY_DATASET`
- Deploy

---

## File map

```
compass-site/
├── sanity/
│   ├── package.json
│   ├── sanity.config.js        ← studio config + singleton structure
│   ├── sanity.cli.js
│   └── schemaTypes/
│       ├── index.js            ← registers all types
│       ├── siteSettings.js     ← logo, phone, email, address, footer, SEO defaults
│       ├── homePage.js         ← hero, about strip, services accordion, FAQ, etc.
│       ├── aboutPage.js        ← H1, subtitle, 2× feature splits, team heading, CTA
│       ├── servicesPage.js     ← H1, 4 segments, 7 process steps, why-choose-us, CTA
│       ├── contactPage.js      ← H1, contact details, office image, form headings
│       ├── areasPage.js        ← H1, 4 shires with suburb lists + images, CTA
│       ├── whoWeWorkWithPage.js← H1, 9 buyer segments (title/intro/needs/howWeHelp/image), CTA
│       └── privacyPolicyPage.js← H1, full portable-text body, ABN, last updated
└── src/
    └── lib/
        └── sanityClient.js     ← createClient, urlFor(), fetchPage(), fetchSiteSettings()
```
