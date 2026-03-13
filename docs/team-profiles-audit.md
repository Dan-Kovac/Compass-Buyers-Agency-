# Team Profiles Migration Audit

**Date**: 2026-03-07
**Source**: https://compassagency.com.au/our-story (WordPress, live site)
**Target**: Sanity CMS `teamMember` documents
**Auditor**: Engineering (content audit for CMS migration)

---

## Summary

| Metric | Value |
|---|---|
| Team members found on live site | 4 |
| Display order | Chris, Harley, Lee, Kovic |
| Members with photos | 4/4 |
| Members with email | 3/4 (Kovic missing) |
| Members with phone | 3/4 (Kovic missing) |
| Members with bios | 4/4 |
| Members with LinkedIn | 0/4 |
| Members with credentials | 0/4 (not listed on old site) |
| Members with specialties | 3/4 (inferred from bios, not structured) |
| Members with intro video | 0/4 |

**Overall data completeness**: ~55%. Core fields (name, position, bio, photo) are present for all members. Contact details exist for the three advocates but not admin staff. Structured fields (credentials, specialties, LinkedIn, video) are entirely absent from the old site and will need to be sourced from the client.

**Additional name in codebase**: "Bryce Holdaway" appears in the new React site as a quote attribution on the About and Who We Work With pages, but does not appear as a team member on the live WordPress site. This may be a principal/founder who should be added as a team member, or may be quote-attribution only. Needs client clarification.

**Filtered ID in code**: About.jsx line 227 filters out Sanity document `teamMember-68c27c6d1248fbc816dd0339`. This is likely a test record or a deactivated member already in Sanity that should be hidden from the grid. Confirm with Sanity Studio.

---

## Detailed Team Member Profiles

### 1. Chris Wallace-Harrison

| Field | Value | Source Status |
|---|---|---|
| **Full Name** | Chris Wallace-Harrison | Available |
| **Position** | Director & Buyers Advocate | Available |
| **Display Order** | 1 (first on page) | Available |
| **Photo URL** | `https://compassagency.com.au/wp-content/uploads/2025/04/Chris-Wallace-Harrison.jpg` | Available |
| **Email** | cwh@compassagency.com.au | Available |
| **Phone** | 0476 634 565 | Available |
| **LinkedIn** | Not listed | MISSING |
| **Credentials** | Not listed | MISSING |
| **Intro Video** | Not listed | MISSING |

**Bio (from live site)**:
Seasoned investor with a background in residential property development. Starting out as a Project and Development Manager, he has a rich history of managing high-end residential renovations and new builds. With two decades of personal property investing, Chris excels in research, due diligence, and value-add renovations. He is skilled at identifying properties matching specific criteria across various budgets. Family-oriented and actively engaged in the local Casuarina community, reflecting his commitment to creating impactful spaces for individuals and communities.

**Inferred Specialties** (from bio, not structured on old site):
- Property research
- Due diligence
- Value-add renovations
- Residential development
- High-end residential projects

**Notes**:
- Bio will need rewriting to match Compass brand voice (buyer-framed, no em dashes, Australian English)
- "Director" title suggests he should be order=1 in Sanity
- Phone number (0476 634 565) differs from the main Compass number (0403 536 390)

---

### 2. Harley Peachey

| Field | Value | Source Status |
|---|---|---|
| **Full Name** | Harley Peachey | Available |
| **Position** | Buyers Advocate - Tweed Shire & Gold Coast | Available |
| **Display Order** | 2 (second on page) | Available |
| **Photo URL** | `https://compassagency.com.au/wp-content/uploads/2025/04/Harley-Peachey.jpg` | Available |
| **Email** | hp@compassagency.com.au | Available |
| **Phone** | 0421 989 505 | Available |
| **LinkedIn** | Not listed | MISSING |
| **Credentials** | Not listed | MISSING |
| **Intro Video** | Not listed | MISSING |

**Bio (from live site)**:
Proud Tweed Shire and Gold Coast local with deep roots in the community and unmatched knowledge of the local property market. Former professional triathlete bringing discipline, drive, and a competitive mindset to real estate. Purchased his first home in Kingscliff in his early 20s. Background in coaching and education supports clear client communication. Sharp negotiation skills and strategic insights.

**Inferred Specialties** (from bio, not structured on old site):
- Negotiation
- Market knowledge (Tweed Shire, Gold Coast)
- Off-market deal sourcing
- Kingscliff / Tweed Coast

**Notes**:
- Position uses an en dash in "Tweed Shire & Gold Coast" -- needs standardisation
- Former professional triathlete is a strong personal brand angle
- Bio will need rewriting to match Compass brand voice

---

### 3. Lee Dowdall

| Field | Value | Source Status |
|---|---|---|
| **Full Name** | Lee Dowdall | Available |
| **Position** | Buyers Advocate - Gold Coast & Northern Rivers | Available |
| **Display Order** | 3 (third on page) | Available |
| **Photo URL** | `https://compassagency.com.au/wp-content/uploads/2025/04/Lee-Dowdall.jpg` | Available |
| **Email** | ld@compassagency.com.au | Available |
| **Phone** | 0408 690 921 | Available |
| **LinkedIn** | Not listed | MISSING |
| **Credentials** | Not listed | MISSING |
| **Intro Video** | Not listed | MISSING |

**Bio (from live site)**:
Nearly two decades of experience in the prestigious Sydney real estate market. Transitioned to Northern NSW to embrace a lifestyle centred around balance, community, and natural beauty. Passionate about real estate and helping others secure optimal properties and outcomes between Northern NSW and Southern Gold Coast.

**Inferred Specialties** (from bio, not structured on old site):
- Real estate (Sydney market background)
- Property sourcing (Northern NSW, Southern Gold Coast)

**Notes**:
- Bio is the shortest of the four -- will benefit from expansion
- Position uses an en dash -- needs standardisation
- Coverage area overlaps with Harley's -- may want to differentiate in specialties
- Bio will need rewriting to match Compass brand voice

---

### 4. Kovic Lusong

| Field | Value | Source Status |
|---|---|---|
| **Full Name** | Kovic Lusong | Available |
| **Position** | Buyers Agent Admin Assistant | Available |
| **Display Order** | 4 (last on page) | Available |
| **Photo URL** | `https://compassagency.com.au/wp-content/uploads/2025/05/10.jpg` | Available |
| **Email** | Not listed | MISSING |
| **Phone** | Not listed | MISSING |
| **LinkedIn** | Not listed | MISSING |
| **Credentials** | Bachelor of Science in Education | Available (in bio text) |
| **Intro Video** | Not listed | MISSING |

**Bio (from live site)**:
Holds a Bachelor of Science in Education. Diverse background in teaching, customer service, and administrative support. Began career in Early Education and High School settings, including teaching English as a Second Language in Czech Republic. Transitioned to BPO industry gaining experience in customer service, sales, and technical support. Proud new mum who cherishes time with her growing family while balancing professional and personal life with enthusiasm.

**Inferred Specialties** (from bio, not structured on old site):
- Administrative support
- Customer service
- Education background

**Notes**:
- Photo filename is generic (`10.jpg`) -- will need renaming during download
- No direct contact details listed on old site (admin role, likely internal)
- The filtered Sanity ID `teamMember-68c27c6d1248fbc816dd0339` in About.jsx may be this member or a different test record -- needs checking
- Bio will need rewriting to match Compass brand voice
- Consider whether admin staff should be displayed on the public team page (currently shown on old site)

---

## Unlisted Person: Bryce Holdaway

**Not on the live team page**, but referenced in the new React codebase:

| File | Usage |
|---|---|
| `About.jsx` line 107 | Philosophy quote attribution: "Bryce Holdaway, Compass Buyers Agency" |
| `WhoWeWorkWith.jsx` line 302 | Pull quote attribution: "Bryce Holdaway, Compass Buyers Agency" |
| `PullQuoteBreak.jsx` line 14 | Default attribution prop |

**Action required**: Clarify with client whether Bryce Holdaway is:
- A team member who should have a full profile in Sanity
- A founder/principal who appears in quotes only
- Someone who has departed and should be removed from attributions

---

## Photo Inventory

| Team Member | Photo URL | Filename | Notes |
|---|---|---|---|
| Chris Wallace-Harrison | `https://compassagency.com.au/wp-content/uploads/2025/04/Chris-Wallace-Harrison.jpg` | `Chris-Wallace-Harrison.jpg` | Good descriptive filename |
| Harley Peachey | `https://compassagency.com.au/wp-content/uploads/2025/04/Harley-Peachey.jpg` | `Harley-Peachey.jpg` | Good descriptive filename |
| Lee Dowdall | `https://compassagency.com.au/wp-content/uploads/2025/04/Lee-Dowdall.jpg` | `Lee-Dowdall.jpg` | Good descriptive filename |
| Kovic Lusong | `https://compassagency.com.au/wp-content/uploads/2025/05/10.jpg` | `10.jpg` | Generic filename, rename to `Kovic-Lusong.jpg` |

**Photo migration steps**:
1. Download all 4 images from the WordPress URLs above
2. Rename `10.jpg` to `Kovic-Lusong.jpg`
3. Upload to Sanity Media Library via Sanity Studio
4. Attach to respective `teamMember` documents via the `photo` field (image type with hotspot)

**Photo quality check**: All photos were uploaded April-May 2025. Resolution and aspect ratio should be verified against the new site's requirements (displayed at 800x1000 in the team card grid, 4:5 aspect ratio with `fit="crop"`).

---

## Gap Analysis: Live Site vs Sanity Schema

The Sanity `teamMember` schema (at `/Users/danielkovac/Desktop/compass-site/sanity/schemaTypes/teamMember.js`) defines the following fields. Here is the availability matrix:

| Sanity Field | Type | Required | Chris | Harley | Lee | Kovic | Action |
|---|---|---|---|---|---|---|---|
| `name` | string | Yes | Yes | Yes | Yes | Yes | Migrate as-is |
| `slug` | slug | Yes | -- | -- | -- | -- | Auto-generate from name |
| `position` | string | Yes | Yes | Yes | Yes | Yes | Migrate, standardise format |
| `bio` | text | Yes | Yes | Yes | Yes (short) | Yes | Rewrite all to brand voice |
| `photo` | image | No | Yes | Yes | Yes | Yes | Download and upload to Sanity |
| `email` | string | No | Yes | Yes | Yes | No | Migrate; ask client for Kovic's |
| `phone` | string | No | Yes | Yes | Yes | No | Migrate; ask client for Kovic's |
| `credentials` | array[string] | No | No | No | No | Partial (BSc Ed in bio) | Request from client for all |
| `specialties` | array[string] | No | Inferred | Inferred | Inferred | Inferred | Request structured list from client |
| `linkedin_url` | url | No | No | No | No | No | Request from client for all |
| `intro_video_url` | url | No | No | No | No | No | Request from client if available |
| `order` | number | No | 1 | 2 | 3 | 4 | Set during migration |
| `active` | boolean | No | true | true | true | TBD | Confirm Kovic's display status |

**Legend**: Yes = data available on live site; No = not available, needs sourcing; Inferred = can be derived from bio text but not structured; Partial = mentioned in bio but not as a discrete field; TBD = needs client decision.

---

## New Site Architecture Notes

The new React site has two team-related views:

1. **About page** (`/src/pages/About.jsx`):
   - Fetches team members from Sanity via `fetchTeamMembers()`
   - Renders a grid of team cards (3-column on desktop)
   - Each card links to `/team/{slug}` for the detail view
   - Filters out one specific Sanity ID (`teamMember-68c27c6d1248fbc816dd0339`)
   - Shows: photo (4:5 crop), name, position, bio (3-line clamp), specialty badges (max 3)

2. **Team Member Detail page** (`/src/pages/TeamMemberDetail.jsx`):
   - Route: `/team/:slug`
   - Fetches single member via `fetchTeamMember(slug)`
   - Shows: full photo or intro video (YouTube/direct), name, position, email, phone, LinkedIn, full bio, credentials badges, specialty badges
   - Also loads related acquisitions and blog posts by the team member's name
   - Includes Person JSON-LD structured data

3. **Acquisition Detail page** (`/src/pages/AcquisitionDetail.jsx`):
   - Cross-references team members to show agent info on acquisition pages

---

## Recommendations

### Immediate (before Sanity migration)

1. **Download photos**: Save all 4 headshots from the WordPress URLs listed above. Verify resolution is adequate for 800x1000px display at 2x (ideally 1600x2000px source).

2. **Client content request**: Send the client a structured form requesting:
   - LinkedIn URLs for Chris, Harley, and Lee
   - Any formal credentials/qualifications (e.g., licensed buyers agent number, REBAA membership, property licenses)
   - Structured list of specialties/areas for each advocate (3-5 per person)
   - Whether Kovic should appear on the public team page
   - Kovic's email if she should be listed
   - Whether Bryce Holdaway should have a team profile or is attribution-only
   - Whether any new team members have joined or anyone has departed
   - Any intro videos (even selfie-style 30-60sec clips) for the team profiles

3. **Bio rewriting**: All 4 bios need rewriting to:
   - Match Compass brand voice (buyer-framed, relaxed coastal luxury tone)
   - Follow Tredinnick writing standards (no em dashes, Australian English, no "purchase")
   - Be approximately the same length (Lee's is notably shorter)
   - Lead with value to the buyer, not resume history

### During Migration

4. **Slug generation**: Use `name` as source for slug auto-generation:
   - `chris-wallace-harrison`
   - `harley-peachey`
   - `lee-dowdall`
   - `kovic-lusong`

5. **Position standardisation**: Decide on consistent format:
   - Option A: "Director & Buyers Advocate" / "Buyers Advocate" / "Admin Assistant"
   - Option B: Include area: "Buyers Advocate, Tweed & Gold Coast" (use comma, not en dash)
   - The en dash format on the old site should not carry over

6. **Order field**: Set `order` values with gaps for future insertions:
   - Chris: 10
   - Harley: 20
   - Lee: 30
   - Kovic: 40 (or omit if `active: false`)

### Post-Migration

7. **Filtered ID cleanup**: Investigate `teamMember-68c27c6d1248fbc816dd0339` in Sanity Studio. If it is a test record, delete it. If it is a real member who should be hidden, set `active: false` and remove the hardcoded filter from About.jsx.

8. **Individual profile pages**: The new site already has `/team/:slug` routes built and ready. Each migrated team member will automatically get a detail page once their Sanity document is complete.

9. **SEO**: Each team member detail page generates Person JSON-LD. Ensure all fields are populated for maximum schema.org coverage.

---

## Raw Data Reference

### Live site URLs checked

| URL | Result |
|---|---|
| `https://compassagency.com.au/` | Homepage -- mentions Chris, links to "Our Story" |
| `https://compassagency.com.au/our-story` | Team profiles found (4 members) |
| `https://compassagency.com.au/about` | 404 (old site uses /our-story, not /about) |
| `https://compassagency.com.au/case-studies` | No team references |

### Navigation structure (old WordPress site)

Home | Our Story | Services | Process | Blog | Case Studies | Contact Us

Note: The new React site uses "About" as the nav label instead of "Our Story". This is already implemented.

---

*End of audit. File created for migration reference only -- no code files were modified.*
