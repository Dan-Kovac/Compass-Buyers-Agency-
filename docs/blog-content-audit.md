# Blog Content Audit -- Compass Buyers Agency

**Audit date**: 7 March 2026
**Source site**: https://compassagency.com.au (WordPress)
**Target CMS**: Sanity v3 (projectId `31tdhl52`, dataset `production`)
**Auditor**: Engineer (content migration prep)

---

## Summary

| Metric | Value |
|---|---|
| Total blog posts | 19 |
| Date range | 10 Feb 2022 -- 22 Dec 2025 |
| Authors | All attributed to "Compass Team" |
| Total word count (approx.) | 17,747 |
| Average word count | ~934 |
| Unique featured images | 16 |
| Inline/body images | ~24 |
| WordPress categories used | Residential, Monthly Reports, Local News, Neighbourhood, Commercial, Uncategorized |
| Sanity categories needed | market-insights, buying-tips, local-knowledge, case-studies, suburb-profiles, industry-news |
| Pagination on WP | 3 pages (8 + 9 + 2) |

### Posts by year

| Year | Count |
|---|---|
| 2022 | 1 |
| 2023 | 4 |
| 2024 | 6 |
| 2025 | 8 |

### WordPress category breakdown

| WP Category | Count |
|---|---|
| Residential | 11 |
| Monthly Reports | 4 |
| Neighbourhood | 5 (overlaps) |
| Local News | 2 |
| Commercial | 2 (overlaps) |
| Uncategorized | 1 |

Note: Some posts have multiple WP categories (e.g. "Neighbourhood, Residential").

---

## Sanity Category Mapping

| WordPress Category | Recommended Sanity Category | Rationale |
|---|---|---|
| Monthly Reports | `market-insights` | Quarterly/monthly market data and performance reports |
| Residential (market/suburb focus) | `local-knowledge` | Posts about specific suburbs, areas, lifestyle |
| Residential (how-to/advisory) | `buying-tips` | Posts advising buyers on process, strategy |
| Local News | `local-knowledge` | Regional development news, area profiles |
| Neighbourhood | `suburb-profiles` or `local-knowledge` | Suburb-specific content fits suburb-profiles; broader area content fits local-knowledge |
| Commercial | `local-knowledge` | Commercial category used for area guides |
| Uncategorized | `local-knowledge` | Assign based on content review |

---

## Complete Post Catalog

### Post 1

- **Title**: Q4 Market Report & Year Wrap-up
- **URL**: https://compassagency.com.au/q4-market-report-year-wrap-up/
- **Published**: 22 Dec 2025
- **Author**: Compass Team
- **WP Category**: Monthly Reports
- **Sanity Category**: `market-insights`
- **Word Count**: ~942
- **Featured Image**: `wp-content/uploads/2025/12/Compass-Team-scaled.jpg`
- **Body Images**: 1 (same image, 1024px variant)
- **Excerpt**: As 2025 wraps up, we wanted to say thanks. Whether you bought with us this year, started a conversation, or simply followed along, we appreciate you being part of our world.
- **Notes**: Contains 5 linked property case studies with external real estate URLs. Structured sections: Quick Snapshot, Market Conditions, Regional Performance Highlights, Compass Acquisitions. High migration value -- showcases team credibility.

---

### Post 2

- **Title**: Pottsville to Kingscliff: What's Driving Prices and Where the Value Sits in 2025
- **URL**: https://compassagency.com.au/pottsville-to-kingscliff-whats-driving-prices-and-where-the-value-sits-in-2025/
- **Published**: 15 Dec 2025
- **Author**: Compass Team
- **WP Category**: Local News
- **Sanity Category**: `suburb-profiles`
- **Word Count**: ~1,605
- **Featured Image**: `wp-content/uploads/2025/12/Northern-Rivers-buyers-Guides--scaled.jpg`
- **Body Images**: 2
- **Excerpt**: The 15-kilometre stretch from Pottsville to Kingscliff has become one of Australia's most watched coastal property corridors. Published median prices now range from $1.41 million in Pottsville to $2.1 million in Casuarina.
- **Notes**: Data-rich suburb comparison. Could double as a suburb-profiles piece. Check for overlap with existing Kingscliff suburb report draft in Sanity.

---

### Post 3

- **Title**: Q3 Market Report -- Northern Rivers & Southern Gold Coast
- **URL**: https://compassagency.com.au/northern-rivers-southern-gold-coast-market-report-q3-property/
- **Published**: 17 Oct 2025
- **Author**: Compass Team
- **WP Category**: Monthly Reports
- **Sanity Category**: `market-insights`
- **Word Count**: ~1,052
- **Featured Image**: `wp-content/uploads/2025/10/COMPASS-2-1.jpg`
- **Body Images**: 7 (mostly data screenshots/charts)
- **Excerpt**: Strong annual gains across Tweed, Byron, Ballina and the Southern Gold Coast reflect sustained demand. Compass secured 15 properties this quarter with 76% sourced through off-market channels.
- **Notes**: Heavy use of screenshot images for data tables/charts. These screenshots will need to be downloaded and potentially recreated as proper data visualisations or kept as images in Sanity.

---

### Post 4

- **Title**: May Property Market Update -- Northern Rivers & Southern Gold Coast
- **URL**: https://compassagency.com.au/may-property-market-update-northern-rivers-southern-gold-coast/
- **Published**: 4 Jun 2025
- **Author**: Compass Team
- **WP Category**: Monthly Reports
- **Sanity Category**: `market-insights`
- **Word Count**: ~1,226
- **Featured Image**: `wp-content/uploads/2025/06/Allera_Caba_Residences_Exterior_1522x1282.jpg`
- **Body Images**: 5+ (data screenshots, property photos)
- **Excerpt**: If you've been waiting for the right moment to buy, that moment might be now. After a patchy start to the year, the market has found its rhythm. More properties are coming to market, buyer competition has eased from frenzied to competitive.
- **Notes**: Mix of market data screenshots and property listing photos. Contains specific acquisition case studies with prices.

---

### Post 5

- **Title**: The Smart Buy: How to Confidently Navigate Byron Bay's Luxury Coastal Market
- **URL**: https://compassagency.com.au/the-smart-buy-how-to-confidently-navigate-byron-bays-luxury-coastal-market/
- **Published**: 31 May 2025
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `buying-tips`
- **Word Count**: ~971
- **Featured Image**: `wp-content/uploads/2025/05/COMPASS-22-1-scaled.jpg`
- **Body Images**: 3 (includes cross-referenced images from other posts)
- **Excerpt**: Buying a luxury coastal home in Byron Bay is a lifelong dream for many. Pristine beaches, laid-back lifestyle, strong community spirit -- no wonder demand has surged. But buying here isn't like buying in Sydney, Melbourne, or Brisbane.
- **Notes**: Strong evergreen content. Good candidate for SEO optimisation around "byron bay buyers agent" keyword.

---

### Post 6

- **Title**: Kingscliff, Cabarita Beach & Pottsville: The Luxury Developments Transforming the Tweed Coast
- **URL**: https://compassagency.com.au/kingscliff-cabarita-beach-pottsville-the-luxury-developments-transforming-the-tweed-coast/
- **Published**: 18 Mar 2025
- **Author**: Compass Team
- **WP Category**: Local News
- **Sanity Category**: `local-knowledge`
- **Word Count**: ~740
- **Featured Image**: `wp-content/uploads/2025/03/1899_2-2-1024x640-1.jpg`
- **Body Images**: 4 (development renders/exterior photos)
- **Excerpt**: Tweed Coast is quickly becoming one of Australia's most desirable coastal addresses. With pristine beaches, high-end developments, and a booming property market, the region is experiencing transformation.
- **Notes**: Features specific luxury developments (Allera Caba, Solis, 1899). Check image licensing -- some may be developer renders with usage restrictions.

---

### Post 7

- **Title**: Buying in Byron Bay: How to Approach One of Australia's Most Challenging Property Markets
- **URL**: https://compassagency.com.au/buying-in-byron-bay-how-to-approach-one-of-australias-most-challenging-property-markets/
- **Published**: 17 Mar 2025
- **Author**: Compass Team
- **WP Category**: Neighbourhood
- **Sanity Category**: `buying-tips`
- **Word Count**: ~789
- **Featured Image**: `wp-content/uploads/2025/03/Byron-Bay-Property-Finder.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: Byron Bay has transformed from a laid-back surf town into one of Australia's most exclusive real estate markets. With a median house price exceeding $3 million -- and values quadrupling over the past decade -- buyers need to be strategic.
- **Notes**: Strong SEO piece. Overlaps with Post 5 in topic -- consider consolidating or cross-linking in Sanity.

---

### Post 8

- **Title**: Your Guide to Coastal Living: Best Suburbs Around Byron Bay for New Buyers
- **URL**: https://compassagency.com.au/your-guide-to-coastal-living-best-suburbs-around-byron-bay-for-new-buyers/
- **Published**: 4 Nov 2024
- **Author**: Compass Team
- **WP Category**: Uncategorized
- **Sanity Category**: `local-knowledge`
- **Word Count**: ~1,107
- **Featured Image**: `wp-content/uploads/2024/01/COMPASS-PROFILE-24-1-1024x684.png`
- **Body Images**: 1 (featured only)
- **Excerpt**: Considering a move to the beautiful Northern Rivers area of New South Wales? With its gorgeous beaches, lush greenery, and lively communities, Byron Bay and its surrounding suburbs offer a perfect mix of relaxation and sophistication.
- **Notes**: Broad area guide covering multiple suburbs. Good evergreen content.

---

### Post 9

- **Title**: The Ultimate Guide to Buying Property in Northern Rivers: Top 5 Suburbs to Invest in 2024
- **URL**: https://compassagency.com.au/the-ultimate-guide-to-buying-property-in-northern-rivers-top-5-suburbs-to-invest-in-2024/
- **Published**: 18 Jun 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `buying-tips`
- **Word Count**: ~1,274
- **Featured Image**: `wp-content/uploads/2024/06/COMPASS-PROFILE-73-2new.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: Purchasing property in the Northern Rivers region offers a unique investment opportunity with its stunning landscapes and vibrant communities. From the pristine beaches to the charming towns, relocating to Northern Rivers promises a lifestyle that blends relaxation with adventure.
- **Notes**: Year-dated content (2024). May need title/content refresh or archiving during migration. Strong keyword target.

---

### Post 10

- **Title**: Nature's Performance Boost: Why the Northern Rivers is a Remote Work Game-changer
- **URL**: https://compassagency.com.au/natures-performance-boost-why-the-northern-rivers-is-a-remote-work-game-changer/
- **Published**: 11 Jun 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `local-knowledge`
- **Word Count**: ~633
- **Featured Image**: `wp-content/uploads/2024/06/COMPASS-20.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: When we think about what drives productivity and peak performance, we tend to focus on things like optimising our work systems, upgrading tech tools, grinding out those early morning routines.
- **Notes**: Lifestyle/remote-work angle. Lighter content, still relevant for target demographic.

---

### Post 11

- **Title**: Why Top-Earning Professionals in NSW Rely on Buyers Agents for Property Purchases
- **URL**: https://compassagency.com.au/why-top-earning-professionals-in-nsw-rely-on-buyers-agents-for-property-purchases/
- **Published**: 4 Jun 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `buying-tips`
- **Word Count**: ~1,561
- **Featured Image**: `wp-content/uploads/2024/02/Mask-group-1.jpg`
- **Body Images**: 2 (includes team photo)
- **Excerpt**: When it comes to navigating the competitive property market in New South Wales, top-earning professionals in the Northern Rivers region increasingly rely on Buyers Agents for their property purchases.
- **Notes**: Longest post on the site. Strong service-promotion content. Good for conversion.

---

### Post 12

- **Title**: Why People are Relocating to Kingscliff
- **URL**: https://compassagency.com.au/why-people-are-relocating-to-kingscliff/
- **Published**: 21 May 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `suburb-profiles`
- **Word Count**: ~956
- **Featured Image**: `wp-content/uploads/2024/05/COMPASS-1.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: Nestled in the idyllic Northern Rivers region of New South Wales, Kingscliff offers a serene escape from a busy city life. Situated 15 minutes from Gold Coast airport.
- **Notes**: Kingscliff-focused -- check overlap with existing Kingscliff suburb report draft in Sanity. Could be merged or superseded.

---

### Post 13

- **Title**: Creating a Storybook Childhood for your Children in the Northern Rivers
- **URL**: https://compassagency.com.au/creating-a-storybook-childhood-for-your-children-in-the-northern-rivers/
- **Published**: 14 May 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `local-knowledge`
- **Word Count**: ~535
- **Featured Image**: `wp-content/uploads/2024/05/COMPASS-6.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: There's a phenomenon taking shape among Australian professionals -- increasing numbers are abandoning major cities for the Northern Rivers region of New South Wales. For years, career advancement seemed inseparable from urban centres.
- **Notes**: Family lifestyle angle. Short post. Good for the "families relocating" buyer segment.

---

### Post 14

- **Title**: From Surfers' Haven to Property Hotspot: The Evolution of The Rainbow and Kirra Real Estate Market
- **URL**: https://compassagency.com.au/from-surfers-haven-to-property-hotspot-the-evolution-of-the-rainbow-and-kirra-real-estate-market/
- **Published**: 7 May 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `suburb-profiles`
- **Word Count**: ~1,157
- **Featured Image**: `wp-content/uploads/2024/05/coolangatta-rainbow-bay-aerial-2.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: Rainbow Bay and Kirra have emerged as sought-after destinations in the Southern Gold Coast, attracting a wave of interest from property buyers seeking a slice of paradise in a prime beachfront location.
- **Notes**: Gold Coast suburb profile. Supports the Southern Gold Coast landing page SEO strategy.

---

### Post 15

- **Title**: Navigating the Northern Rivers Real Estate Market: A Comprehensive Buyers Agent Guide
- **URL**: https://compassagency.com.au/navigating-the-northern-rivers-real-estate-market-a-comprehensive-buyers-agent-guide/
- **Published**: 1 May 2024
- **Author**: Compass Team
- **WP Category**: Residential
- **Sanity Category**: `buying-tips`
- **Word Count**: ~1,025
- **Featured Image**: `wp-content/uploads/2024/05/Northern-Rivers-Real-Estate-Market-1.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: Known for its beautiful beaches, thriving towns, and laid-back lifestyle, the Northern Rivers area offers a unique blend of charm and opportunity for potential property buyers.
- **Notes**: Comprehensive guide -- good pillar content for SEO. Featured on homepage.

---

### Post 16

- **Title**: The Importance of Local Market Knowledge in Northern Rivers Real Estate
- **URL**: https://compassagency.com.au/the-importance-of-local-market-knowledge-in-northern-rivers-real-estate/
- **Published**: 1 Feb 2023
- **Author**: Compass Team
- **WP Category**: Neighbourhood, Residential
- **Sanity Category**: `buying-tips`
- **Word Count**: ~500
- **Featured Image**: `wp-content/uploads/2023/12/northern-rivers.png`
- **Body Images**: 1 (featured only)
- **Excerpt**: Understanding the intricacies of the local Northern Rivers real estate market is not just a recommendation; it's a cornerstone for success.
- **Notes**: Short thought-leadership piece. Could be expanded during migration or archived.

---

### Post 17

- **Title**: Discover Your Dream Home on the Tweed Coast: Something for Everyone!
- **URL**: https://compassagency.com.au/discover-your-dream-home-on-the-tweed-coast-something-for-everyone/
- **Published**: 10 Jan 2023
- **Author**: Compass Team
- **WP Category**: Commercial, Neighbourhood
- **Sanity Category**: `local-knowledge`
- **Word Count**: ~464
- **Featured Image**: `wp-content/uploads/2023/01/COMPASS-2.jpg`
- **Body Images**: 2 (process hero graphic, team photo)
- **Excerpt**: If you are looking for the perfect coastal location to buy your dream home with something for your whole tribe, then look no further. The Tweed Coast truly has something for everyone.
- **Notes**: Short Tweed Coast overview. Exclamation mark in title breaks brand voice guidelines -- clean up during migration. Uses "tribe" which may need updating.

---

### Post 18

- **Title**: Coastal Charms: The Irresistible Allure of Tweed Coast's Crown Jewels
- **URL**: https://compassagency.com.au/coastal-charms-the-irresistible-allure-of-tweed-coasts-crown-jewels/
- **Published**: 1 Jan 2023
- **Author**: Compass Team
- **WP Category**: Commercial, Neighbourhood
- **Sanity Category**: `suburb-profiles`
- **Word Count**: ~570
- **Featured Image**: `wp-content/uploads/2023/01/COMPASS-3.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: Welcome to the Tweed Coast -- where the ocean's melody harmonises with the rhythm of coastal towns like Kingscliff, Casuarina and Cabarita.
- **Notes**: Covers Kingscliff, Casuarina, Cabarita. Poetic tone differs from later posts. Check overlap with Post 6 and suburb report drafts.

---

### Post 19

- **Title**: How a Buyers Agent Can Save You Time and Money
- **URL**: https://compassagency.com.au/how-a-buyers-agent-can-save-you-time-and-money/
- **Published**: 10 Feb 2022
- **Author**: Compass Team
- **WP Category**: Neighbourhood, Residential
- **Sanity Category**: `buying-tips`
- **Word Count**: ~432
- **Featured Image**: `wp-content/uploads/2022/02/COMPASS-4.jpg`
- **Body Images**: 1 (featured only)
- **Excerpt**: In the dynamic world of real estate, time and money are invaluable resources, and Compass Buyers Agency is committed to optimising both for our clients.
- **Notes**: Oldest post on the site. Very short. Core service value proposition -- could be expanded or merged into a services-focused pillar article.

---

## Sanity Category Distribution (Recommended)

| Sanity Category | Post Numbers | Count |
|---|---|---|
| `market-insights` | 1, 3, 4 | 3 |
| `buying-tips` | 5, 7, 9, 11, 15, 16, 19 | 7 |
| `local-knowledge` | 6, 8, 10, 13, 17 | 5 |
| `suburb-profiles` | 2, 12, 14, 18 | 4 |
| `case-studies` | -- | 0 |
| `industry-news` | -- | 0 |

**Observations**:
- No posts map naturally to `case-studies` or `industry-news`. These categories may be intended for future content.
- The Q4 report (Post 1) contains mini case studies within it, but the post itself is a market report.
- `buying-tips` is the largest category (7 posts). Consider whether some should be `local-knowledge` instead.

---

## Image Inventory

### Featured Images (16 unique files to download)

| # | File Path (relative to wp-content/uploads/) | Used By |
|---|---|---|
| 1 | `2025/12/Compass-Team-scaled.jpg` | Posts 1, 5, 13, 17 (reused) |
| 2 | `2025/12/Northern-Rivers-buyers-Guides--scaled.jpg` | Posts 2, 5, 13 (reused) |
| 3 | `2025/10/COMPASS-2-1.jpg` | Post 3 |
| 4 | `2025/06/Allera_Caba_Residences_Exterior_1522x1282.jpg` | Post 4 |
| 5 | `2025/05/COMPASS-22-1-scaled.jpg` | Post 5 |
| 6 | `2025/03/1899_2-2-1024x640-1.jpg` | Post 6 |
| 7 | `2025/03/Byron-Bay-Property-Finder.jpg` | Post 7 |
| 8 | `2024/01/COMPASS-PROFILE-24-1-1024x684.png` | Post 8 |
| 9 | `2024/06/COMPASS-PROFILE-73-2new.jpg` | Post 9 |
| 10 | `2024/06/COMPASS-20.jpg` | Post 10 |
| 11 | `2024/02/Mask-group-1.jpg` | Post 11 |
| 12 | `2024/05/COMPASS-1.jpg` | Post 12 |
| 13 | `2024/05/COMPASS-6.jpg` | Post 13 |
| 14 | `2024/05/coolangatta-rainbow-bay-aerial-2.jpg` | Post 14 |
| 15 | `2024/05/Northern-Rivers-Real-Estate-Market-1.jpg` | Post 15 |
| 16 | `2023/12/northern-rivers.png` | Post 16 |
| 17 | `2023/01/COMPASS-2.jpg` | Post 17 |
| 18 | `2023/01/COMPASS-3.jpg` | Post 18 |
| 19 | `2022/02/COMPASS-4.jpg` | Post 19 |

### Inline/Body Images (unique, not featured)

| # | Full URL | Used In |
|---|---|---|
| 1 | `wp-content/uploads/2025/10/Screenshot-2025-10-10-at-11.25.11-am-1024x663.png` | Post 3 |
| 2 | `wp-content/uploads/2025/10/Screenshot-2025-10-10-at-11.25.43-am-1024x682.png` | Post 3 |
| 3 | `wp-content/uploads/2025/10/Screenshot-2025-10-10-at-11.27.54-am-1024x561.png` | Post 3 |
| 4 | `wp-content/uploads/2025/10/Screenshot-2025-10-10-at-11.31.00-am-1024x561.png` | Post 3 |
| 5 | `wp-content/uploads/2025/10/Screenshot-2025-10-10-at-2.52.27-pm-1024x503.png` | Post 3 |
| 6 | `wp-content/uploads/2025/10/Screenshot-2025-10-10-at-11.44.56-am-1024x656.png` | Post 3 |
| 7 | `wp-content/uploads/2025/06/Screenshot-2025-06-04-at-9.31.18 pm-1-1024x744.png` | Post 4 |
| 8 | `wp-content/uploads/2025/06/Screenshot-2025-06-05-at-7.38.10 am-1024x1017.png` | Post 4 |
| 9 | `wp-content/uploads/2025/06/Pixie-957x1024.png` | Post 4 |
| 10 | `wp-content/uploads/2025/06/Pottsville-Road-1024x765.png` | Post 4 |
| 11 | `wp-content/uploads/2025/03/Allera_Caba_Residences_Exterior_1522x1282-1024x863.jpg` | Post 6 |
| 12 | `wp-content/uploads/2025/03/exterior-1-1024x649.jpg` | Post 6 |
| 13 | `wp-content/uploads/2025/03/Solis-1024x503.jpg` | Post 6 |
| 14 | `wp-content/uploads/2025/03/1899_2-3-1024x640-1.jpg` | Post 6 |
| 15 | `wp-content/uploads/2024/05/COMPASS-PROFILE-59-scaled-1-819x1024.jpg` | Post 11 |
| 16 | `wp-content/uploads/2023/12/process-hero-1024x489.png` | Post 17 |

**Total unique images to download**: ~35 files (19 featured + 16 inline)

---

## Migration Notes & Issues

### Content quality concerns

1. **Brand voice inconsistency**: Earlier posts (2022--2023) have a different tone from 2025 posts. The 2025 content follows the agreed "relaxed coastal luxury" creative direction more closely.
2. **Exclamation marks**: Post 17 title has an exclamation mark ("Something for Everyone!") which breaks brand guidelines.
3. **Em dashes**: Several posts use em dashes which need to be stripped per brand rules (use double hyphens or restructure sentences).
4. **"Tribe" usage**: Post 17 uses "tribe" which may need updating per modern copywriting standards.
5. **Year-dated content**: Post 9 title references "2024" -- needs updating or archiving.
6. **Short posts**: Posts 16 (500 words), 17 (464 words), 19 (432 words), and 13 (535 words) are quite thin. Consider expanding or consolidating during migration.

### Content overlap / consolidation opportunities

| Group | Posts | Topic | Recommendation |
|---|---|---|---|
| Byron Bay buying guides | 5, 7 | How to buy in Byron Bay | Consider merging into one comprehensive pillar article |
| Kingscliff profiles | 12, 18 (partial), 2 (partial) | Kingscliff as a destination | Consolidate with existing Kingscliff suburb report draft in Sanity |
| Northern Rivers guides | 8, 9, 15 | Northern Rivers overview/suburbs | Three overlapping area guides -- consolidate into one definitive guide |
| Tweed Coast profiles | 6, 17, 18 | Tweed Coast area guide | Significant overlap -- merge into one Tweed Coast feature |
| Buyers agent value prop | 11, 19 | Why use a buyers agent | Post 19 is very short and dated -- merge content into Post 11 |

### Technical migration requirements

1. **URL slugs**: All 19 posts have WordPress slugs that need mapping to Sanity slug format. Current WP slugs are already kebab-case so should transfer cleanly.
2. **301 redirects**: All 19 blog URLs need 301 redirects from old paths to new React router paths (e.g., `/blog/[slug]`).
3. **Image download**: All ~35 images need to be downloaded from WordPress and uploaded to Sanity's asset CDN.
4. **Screenshot images**: Posts 3 and 4 use macOS screenshot images for data tables. These should ideally be recreated as proper data visualisations or at minimum uploaded as-is.
5. **External links**: Posts 1 and 4 contain links to external real estate listing URLs (realestate.com.au) -- these will likely be dead links over time. Consider removing or noting them during migration.
6. **Schema markup**: WordPress posts have JSON-LD Article schema that the React `BlogPost.jsx` component should replicate.
7. **Author handling**: All posts attribute to "Compass Team" -- simplifies migration as no individual author profiles needed.
8. **Categories**: WP uses multi-category tagging (e.g., "Neighbourhood, Residential"). Sanity schema uses a single category select -- each post needs one primary category assigned.
9. **Existing Sanity drafts**: Three suburb profile reports already exist as drafts (Byron Bay, Kingscliff, Burleigh Heads). These are NEW content, not migrations of existing WP posts, but the Kingscliff content overlaps with Posts 2, 12, and 18.

### Recommended migration priority

| Priority | Posts | Reason |
|---|---|---|
| High -- migrate first | 1, 3, 4 | Market reports with time-sensitive data; establishes credibility |
| High -- migrate first | 5, 7, 15 | Byron Bay buying guides; key SEO targets |
| Medium | 2, 6, 14 | Suburb/area profiles; supports landing pages |
| Medium | 9, 11 | Buying guides with good length and depth |
| Low -- review needed | 8, 10, 12, 13 | Lighter content; may benefit from expansion |
| Low -- consolidate | 16, 17, 18, 19 | Short and/or overlapping; merge or archive |

---

## 301 Redirect Map (WordPress to New Site)

| WordPress URL | New React URL |
|---|---|
| `/q4-market-report-year-wrap-up/` | `/blog/q4-market-report-year-wrap-up` |
| `/pottsville-to-kingscliff-whats-driving-prices-and-where-the-value-sits-in-2025/` | `/blog/pottsville-to-kingscliff-whats-driving-prices-and-where-the-value-sits-in-2025` |
| `/northern-rivers-southern-gold-coast-market-report-q3-property/` | `/blog/northern-rivers-southern-gold-coast-market-report-q3-property` |
| `/may-property-market-update-northern-rivers-southern-gold-coast/` | `/blog/may-property-market-update-northern-rivers-southern-gold-coast` |
| `/the-smart-buy-how-to-confidently-navigate-byron-bays-luxury-coastal-market/` | `/blog/the-smart-buy-how-to-confidently-navigate-byron-bays-luxury-coastal-market` |
| `/kingscliff-cabarita-beach-pottsville-the-luxury-developments-transforming-the-tweed-coast/` | `/blog/kingscliff-cabarita-beach-pottsville-the-luxury-developments-transforming-the-tweed-coast` |
| `/buying-in-byron-bay-how-to-approach-one-of-australias-most-challenging-property-markets/` | `/blog/buying-in-byron-bay-how-to-approach-one-of-australias-most-challenging-property-markets` |
| `/your-guide-to-coastal-living-best-suburbs-around-byron-bay-for-new-buyers/` | `/blog/your-guide-to-coastal-living-best-suburbs-around-byron-bay-for-new-buyers` |
| `/the-ultimate-guide-to-buying-property-in-northern-rivers-top-5-suburbs-to-invest-in-2024/` | `/blog/the-ultimate-guide-to-buying-property-in-northern-rivers-top-5-suburbs-to-invest-in-2024` |
| `/natures-performance-boost-why-the-northern-rivers-is-a-remote-work-game-changer/` | `/blog/natures-performance-boost-why-the-northern-rivers-is-a-remote-work-game-changer` |
| `/why-top-earning-professionals-in-nsw-rely-on-buyers-agents-for-property-purchases/` | `/blog/why-top-earning-professionals-in-nsw-rely-on-buyers-agents-for-property-purchases` |
| `/why-people-are-relocating-to-kingscliff/` | `/blog/why-people-are-relocating-to-kingscliff` |
| `/creating-a-storybook-childhood-for-your-children-in-the-northern-rivers/` | `/blog/creating-a-storybook-childhood-for-your-children-in-the-northern-rivers` |
| `/from-surfers-haven-to-property-hotspot-the-evolution-of-the-rainbow-and-kirra-real-estate-market/` | `/blog/from-surfers-haven-to-property-hotspot-the-evolution-of-the-rainbow-and-kirra-real-estate-market` |
| `/navigating-the-northern-rivers-real-estate-market-a-comprehensive-buyers-agent-guide/` | `/blog/navigating-the-northern-rivers-real-estate-market-a-comprehensive-buyers-agent-guide` |
| `/the-importance-of-local-market-knowledge-in-northern-rivers-real-estate/` | `/blog/the-importance-of-local-market-knowledge-in-northern-rivers-real-estate` |
| `/discover-your-dream-home-on-the-tweed-coast-something-for-everyone/` | `/blog/discover-your-dream-home-on-the-tweed-coast-something-for-everyone` |
| `/coastal-charms-the-irresistible-allure-of-tweed-coasts-crown-jewels/` | `/blog/coastal-charms-the-irresistible-allure-of-tweed-coasts-crown-jewels` |
| `/how-a-buyers-agent-can-save-you-time-and-money/` | `/blog/how-a-buyers-agent-can-save-you-time-and-money` |

Note: The `/blog/` listing page itself also needs a redirect from the WordPress `/blog/` path.

---

## Next Steps

1. **Download all images** from WordPress (`wp-content/uploads/`) and upload to Sanity asset CDN
2. **Extract full post body HTML** from each WordPress post for Portable Text conversion
3. **Create Sanity blogPost documents** for each post using the category mappings above
4. **Review consolidation candidates** with the content team before migrating duplicative posts
5. **Set up 301 redirects** in Vercel configuration
6. **Update existing Sanity suburb report drafts** to reference or link to related migrated blog posts
7. **Apply brand voice cleanup** during content entry (em dashes, exclamation marks, tone consistency)
