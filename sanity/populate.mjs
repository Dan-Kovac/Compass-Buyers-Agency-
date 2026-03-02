/**
 * Sanity CMS Population Script
 * Populates all singleton page documents with the site's current live content.
 * Uploads images to Sanity's asset pipeline for proper studio management.
 *
 * Usage: SANITY_TOKEN=sk... node populate.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '31tdhl52',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function upsert(doc) {
  const { _id, _type, ...rest } = doc;
  try {
    await client.createOrReplace({ _id, _type, ...rest });
    console.log(`  ✅ ${_type} (${_id})`);
  } catch (err) {
    console.error(`  ❌ ${_type} (${_id}):`, err.message);
  }
}

/** Upload an image URL to Sanity assets and return a reference object */
const imageCache = new Map();
async function uploadImage(url, filename) {
  if (!url) return undefined;
  if (imageCache.has(url)) return imageCache.get(url);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload('image', buffer, {
      filename: filename || 'image.jpg',
    });
    const ref = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
    imageCache.set(url, ref);
    process.stdout.write(`    📷 Uploaded ${filename || url.slice(-30)}\n`);
    return ref;
  } catch (err) {
    console.warn(`    ⚠️  Image upload failed (${filename}): ${err.message}`);
    return undefined;
  }
}

// ─── Image URLs used across pages ─────────────────────────────────────────────

const IMG = {
  heroBackground: null, // no hero background image in current site
  aboutExpertiseAvatar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab9ef034e_unnamed1.png',
  servicesTeam: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/0b49c2526_6.png',
  relationshipPhoto: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg',
  featureSplit1: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/1a4591edc_CONTENTSHOOTJULY-31.jpg',
  featureSplit2: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/6c2c9c4ac_CONTENTSHOOTJULY-30.jpg',
  servicesFullService: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/7ee9b92c9_CONTENTSHOOTJULY-20.jpg',
  servicesSourcing: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/d62d38c74_CONTENTSHOOTJULY-16.jpg',
  whyChooseUs: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg',
  officeExterior: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/f4d8d6980_Screenshot2025-10-01at75412am.png',
};

// ─── Upload all images in parallel ────────────────────────────────────────────
console.log('\n📷 Uploading images to Sanity...');
const [
  imgExpertiseAvatar,
  imgServicesTeam,
  imgRelationship,
  imgFeatureSplit1,
  imgFeatureSplit2,
  imgServicesFullService,
  imgServicesSourcing,
  imgWhyChooseUs,
  imgOffice,
] = await Promise.all([
  uploadImage(IMG.aboutExpertiseAvatar, 'mick-caine-avatar.png'),
  uploadImage(IMG.servicesTeam, 'team-photo.png'),
  uploadImage(IMG.relationshipPhoto, 'chris-compass.jpg'),
  uploadImage(IMG.featureSplit1, 'content-shoot-31.jpg'),
  uploadImage(IMG.featureSplit2, 'content-shoot-30.jpg'),
  uploadImage(IMG.servicesFullService, 'content-shoot-20.jpg'),
  uploadImage(IMG.servicesSourcing, 'content-shoot-16.jpg'),
  uploadImage(IMG.whyChooseUs, 'chris-compass-2.jpg'),
  uploadImage(IMG.officeExterior, 'office-exterior.png'),
]);

// ═══════════════════════════════════════════════════════════════════════════════
// SITE SETTINGS — flat fields, matches schema exactly
// ═══════════════════════════════════════════════════════════════════════════════
console.log('\n📄 Populating page documents...');

await upsert({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Compass Buyers Agency',
  tagline: 'Property Acquisition Experts',
  phone: '0403 536 390',
  phoneRaw: '0403536390',
  email: 'hello@compassbuyersagency.com.au',
  address: '32a Tweed Coast Road, Cabarita Beach, NSW 2487',
  facebookUrl: 'https://www.facebook.com/compassbuyersagency/',
  instagramUrl: 'https://www.instagram.com/compassbuyersagency/',
  navCtaLabel: 'Book a Free Consult',
  footerTagline: 'Independent buyers advocacy for Northern NSW & Southern Gold Coast.',
  footerCopyrightName: 'Compass Buyers Agency',
  licenceNumber: '',
  abn: '',
  defaultMetaTitle: 'Compass Buyers Agency | Northern Rivers & Gold Coast Buyers Agents',
  defaultMetaDescription: 'Independent buyers agent for Northern Rivers and Southern Gold Coast. Off-market access, local expertise, sharp negotiation.',
});

// ═══════════════════════════════════════════════════════════════════════════════
// HOME PAGE — nested objects matching schema
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'homePage',
  _type: 'homePage',

  hero: {
    title: 'Property Acquisition Experts',
    subtitle: 'Leading Northern NSW & Gold Coast Buyer Advocates. 70% Off Market Acquisitions with hundreds of happy clients. Buy smarter with Compass.',
    ctaText: 'Start Your Search',
  },

  aboutExpertise: {
    quoteText: 'Compass made buying simple and stress-free. Their local knowledge, off-market access and sharp negotiation delivered a great outcome - highly recommend.',
    authorName: 'Mick Caine',
    authorRole: 'Property buyer',
    ...(imgExpertiseAvatar && { authorAvatar: imgExpertiseAvatar }),
  },

  servicesAccordion: {
    heading: 'Explore Our Services',
    ...(imgServicesTeam && { teamImage: imgServicesTeam }),
    items: [
      { _key: 'svc-1', title: 'Property buying', description: 'We search, evaluate and negotiate to secure the right property, at the right price and terms. End-to-end and stress-free.' },
      { _key: 'svc-2', title: 'Auction bidding', description: 'Professional strategy and on-the-day representation to keep emotion out and results in.' },
      { _key: 'svc-3', title: 'Due diligence', description: 'Independent research, valuations, building & pest, and legal review for informed decisions.' },
      { _key: 'svc-4', title: 'Negotiation & purchase', description: 'We handle every step of the deal to protect your position and deliver better outcomes.' },
      { _key: 'svc-5', title: 'Investment advisory', description: 'Data-led insights, suburb selection and portfolio strategy tailored to your goals.' },
    ],
  },

  acquisitionsStrip: {
    eyebrow: "What We're Buying",
    heading: 'Recent acquisitions',
    subheading: "A snapshot of properties we've recently secured for clients across the Northern Rivers and Southern Gold Coast.",
  },

  relationship: {
    heading: 'A Relationship-First Approach',
    body: 'Your partners for the full journey - not just the transaction. Expect transparent advice, streamlined communication and support from initial consult to settlement.',
    checklistItems: [
      'Tailored guidance for first-home buyers and investors',
      'Clear, timely updates you can rely on',
      'End-to-end coordination with trusted local partners',
    ],
    ...(imgRelationship && { image: imgRelationship }),
  },

  whyCompass: {
    heading: 'Why Compass Stands Out',
    cards: [
      { _key: 'w-1', title: 'Personalised search', description: 'Every brief tailored to your goals, budget and timeline.' },
      { _key: 'w-2', title: 'Off-market access', description: 'Local relationships open doors beyond the portals.' },
      { _key: 'w-3', title: 'Independent advice', description: 'We work exclusively for buyers. No conflicts.' },
      { _key: 'w-4', title: 'Risk management', description: 'Thorough due diligence to avoid costly mistakes.' },
      { _key: 'w-5', title: 'Local expertise', description: 'Northern Rivers and Southern Gold Coast specialists.' },
      { _key: 'w-6', title: 'Negotiation edge', description: 'Price and terms negotiated to protect your position.' },
    ],
  },

  regions: {
    heading: 'Areas We Serve',
    subtitle: "We specialise in Northern NSW & Southern QLD Byron Shire, Tweed Shire and the City of Gold Coast. We're across council rules and overlays in each region and stay in tune with the latest information as it relates to your investment.",
    ctaText: 'Explore Areas & Suburbs',
    items: [
      { _key: 'r-1', label: 'Byron Shire' },
      { _key: 'r-2', label: 'Tweed Shire' },
      { _key: 'r-3', label: 'City of Gold Coast' },
    ],
  },

  faq: {
    heading: 'Frequently Asked Questions',
    items: [
      { _key: 'faq-1', question: 'What is a Buyers Agent?', answer: "A Buyers Agent (buyers advocate) is a licensed professional who searches, evaluates, and negotiates property on behalf of the buyer, working exclusively for the buyer's interests." },
      { _key: 'faq-2', question: 'Why should I use a Buyers Agent?', answer: 'We can save you time and money with local knowledge, access to off-market properties, and expert negotiation, reducing stress and complexity.' },
      { _key: 'faq-3', question: "What's the difference between a Buyers Agent and a Selling Agent?", answer: "A Buyers Agent represents the buyer and is paid by the buyer; a Selling Agent represents the seller and acts in the vendor's best interests." },
      { _key: 'faq-4', question: 'What services do Buyers Agents provide?', answer: 'Full property search, appraisal and negotiation, auction bidding, vendor advocacy, development sourcing, and property management guidance.' },
      { _key: 'faq-5', question: 'How much does a Buyers Agent cost?', answer: 'Fees vary by service and complexity, typically an engagement fee plus a success fee, either fixed or a percentage of the price.' },
      { _key: 'faq-6', question: 'Can Buyers Agents help with investment properties?', answer: 'Yes. We identify, evaluate, and negotiate investment properties using data and market insights to target high-growth opportunities.' },
      { _key: 'faq-7', question: 'Do Buyers Agents have access to off-market properties?', answer: 'Yes. Our agent network and industry contacts give access to properties not publicly listed, especially valuable in competitive markets.' },
      { _key: 'faq-8', question: 'How do I choose the right Buyers Agent?', answer: 'Look for strong reputation, local expertise, independence, transparent research systems, and proven negotiation capability.' },
      { _key: 'faq-9', question: 'Can Buyers Agents help overseas buyers?', answer: 'Absolutely. We regularly assist expat and overseas buyers with end-to-end guidance and compliance with local regulations.' },
      { _key: 'faq-10', question: 'What is the typical process?', answer: 'Initial consultation, tailored search, evaluations and appraisals, negotiation and securing the property, then guiding you to settlement.' },
    ],
  },

  contactStrip: {
    heading: 'Take the first step toward your Northern Rivers home with Compass',
    subtitle: 'Free consultation. No obligation.',
    primaryButtonLabel: 'Book a Free Consultation',
    secondaryButtonLabel: 'Send an Email',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT PAGE — heading/subtitle flat, featureSplits & cta nested
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'aboutPage',
  _type: 'aboutPage',

  heading: 'Our Team',
  subtitle: "Local property professionals deeply embedded in our community, providing unique access to opportunities others simply can't.",

  featureSplit1: {
    title: 'Your Local Advantage',
    description: "As both locals and property professionals deeply embedded in our community, we provide unique access to off-market properties, pre-market and many options not published online. We ensure you have a proactive edge in identifying emerging opportunities in our region, making Compass your first choice in buying property in the local market.\n\nOur clients receive access to our network of professional services, from expert mortgage brokers, conveyancers, town planners, building & pest and local trades to support all aspects of the process. Your experience with us is streamlined and enjoyable, we are always in sync through each stage of the process.",
    imageAlt: 'Compass team meeting clients',
    ...(imgFeatureSplit1 && { image: imgFeatureSplit1 }),
  },

  featureSplit2: {
    title: 'Why Compass Buyers Agency?',
    description: "We simplify the buying process, cutting through stress and confusion with clarity and support at every step. Rely on us to guide you consistently, keeping your confidence high throughout.\n\nWe build lasting connections with our clients. You'll feel welcome and supported at all stages. We prioritise meaningful relationships over transactions, fostering a sense of community and guidance that extends well beyond settlement.",
    imageAlt: 'Compass team at office',
    ...(imgFeatureSplit2 && { image: imgFeatureSplit2 }),
  },

  teamSectionHeading: 'Meet Your Property Experts',

  cta: {
    heading: 'Ready to Start Your Property Journey?',
    buttonText: 'Contact Our Team',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// SERVICES PAGE — heading/subtitle flat, segments array, process/whyChooseUs/cta nested
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'servicesPage',
  _type: 'servicesPage',

  heading: 'Buyers Agent Services',
  subtitle: 'Independent buyers advocacy tailored to your needs - from search and due diligence to auction strategy and portfolio planning.',

  segments: [
    {
      _key: 'seg-1',
      title: 'Full-service buyers advocacy',
      intro: 'End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step.',
      needs: ['Limited time to manage inspections and shortlists', 'Competitive conditions and unclear value', 'Complex negotiations, terms and risk'],
      howWeHelp: ['Brief, suburb selection and comparables to set a clear strategy', 'Private and off-market access via our local agent network', 'Thorough due diligence and contract support to settlement'],
      imageAlt: 'Compass team members',
      ...(imgServicesFullService && { image: imgServicesFullService }),
    },
    {
      _key: 'seg-2',
      title: 'Sourcing & research',
      intro: 'We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly.',
      needs: ['Time consuming search across suburbs and agents', 'Missing pre-market and off-market opportunities', 'Difficult to compare real value street-by-street'],
      howWeHelp: ['Proactive agent outreach and access before the portals', 'Local insights and detailed property comparables', 'Shortlists refined to your brief with clear trade-offs'],
      imageAlt: 'Aerial view of Northern Rivers waterfront properties',
      ...(imgServicesSourcing && { image: imgServicesSourcing }),
    },
    {
      _key: 'seg-3',
      title: 'Auction bidding & negotiation',
      intro: 'Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations.',
      needs: ['Unclear tactics and pricing at auction', "High-pressure negotiations with vendors' agents", 'Risk of over-paying or poor contract terms'],
      howWeHelp: ['Auction plan with price guardrails and scenarios', 'Experienced on-the-day bidding and vendor negotiation', 'Sharp negotiation on price and terms that protect you'],
      imageAlt: 'Auction planning and representation',
    },
    {
      _key: 'seg-4',
      title: 'Portfolio strategy',
      intro: 'A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each acquisition.',
      needs: ['Unsure how to balance yield vs growth', 'Limited clarity on sequencing next purchases', 'Hard to assess risk at suburb and property level'],
      howWeHelp: ['Tailored strategy aligned to goals and timeframe', 'Modelled returns, rental demand and risk assessment', 'Buy rules and review cadence to keep you on track'],
      imageAlt: 'Portfolio planning session',
    },
  ],

  process: {
    heading: 'Our Process',
    steps: [
      { _key: 'st-1', stepNumber: '01', title: 'Discovery Call', description: "Start with a relaxed conversation about your goals and requirements and confirm we're a good fit to help." },
      { _key: 'st-2', stepNumber: '02', title: 'Strategy Session', description: 'Align on outcomes, approach, timelines and process, setting a tailored plan for your buying journey.' },
      { _key: 'st-3', stepNumber: '03', title: 'Property Search & Research', description: 'Deep-dive suburb insights, off-market and pre-market access, and comprehensive market investigation.' },
      { _key: 'st-4', stepNumber: '04', title: 'Property Inspections', description: 'We inspect on your behalf and present aligned options, saving you time while surfacing the best opportunities.' },
      { _key: 'st-5', stepNumber: '05', title: 'Negotiation & Auction Bidding', description: 'We manage negotiations and auction strategy to secure favourable terms and protect your financial position.' },
      { _key: 'st-6', stepNumber: '06', title: 'Contract to Settlement', description: 'We coordinate with your solicitor and financier, attend pre-settlement and ensure nothing is missed.' },
      { _key: 'st-7', stepNumber: '07', title: 'Post-Settlement Support', description: 'Smooth transition with preferred providers and local connections to get you settled quickly.' },
    ],
  },

  whyChooseUs: {
    title: 'Why choose Compass?',
    description: "As locals and property professionals, we provide unique access to off-market opportunities and pre-market options that aren't published online. With 30+ years of combined experience, we simplify the buying process and protect your position at each step.",
    imageAlt: 'Compass advisor speaking with a client',
    ...(imgWhyChooseUs && { image: imgWhyChooseUs }),
  },

  cta: {
    heading: 'Ready to Start Your Property Journey?',
    buttonText: 'Get Started Today',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// CONTACT PAGE — all flat fields
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'contactPage',
  _type: 'contactPage',

  heading: 'Talk to a Buyers Agent',
  subtitle: "Free consultation. No obligation. We'll answer your questions and outline how we can help.",
  phone: '0403 536 390',
  email: 'hello@compassbuyersagency.com.au',
  address: '32a Tweed Coast Road, Cabarita Beach, NSW 2487',
  officeImageAlt: 'Compass office exterior',
  ...(imgOffice && { officeImage: imgOffice }),
  bookCallLabel: 'Book a call',
  sendEmailLabel: 'Send an email',
  formTitle: 'Tell Us About Your Property',
  formSubtitle: "Share a few details and we'll be in touch within 24 hours.",
});

// ═══════════════════════════════════════════════════════════════════════════════
// AREAS PAGE — heading/subtitle flat, shires array, cta nested
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'areasPage',
  _type: 'areasPage',

  heading: 'Areas We Serve',
  subtitle: 'Compass Buyers Agency services buyers across Byron Shire, Tweed Shire, Ballina Shire and the City of Gold Coast. We help you find and secure property in any of these suburbs.',

  shires: [
    {
      _key: 'sh-1', title: 'Byron Shire',
      suburbs: [
        { _key: 's-1-1', name: 'Byron Bay', isLive: true, slug: 'byron-bay-market-update' },
        { _key: 's-1-2', name: 'Bangalow', isLive: false },
        { _key: 's-1-3', name: 'Brunswick Heads', isLive: true, slug: 'brunswick-heads-profile' },
        { _key: 's-1-4', name: 'Mullumbimby', isLive: false },
        { _key: 's-1-5', name: 'Suffolk Park', isLive: false },
        { _key: 's-1-6', name: 'Ocean Shores', isLive: false },
      ],
    },
    {
      _key: 'sh-2', title: 'Tweed Shire',
      suburbs: [
        { _key: 's-2-1', name: 'Kingscliff', isLive: false },
        { _key: 's-2-2', name: 'Cabarita Beach', isLive: false },
        { _key: 's-2-3', name: 'Casuarina', isLive: false },
        { _key: 's-2-4', name: 'Pottsville', isLive: false },
        { _key: 's-2-5', name: 'Tweed Heads', isLive: false },
        { _key: 's-2-6', name: 'Murwillumbah', isLive: false },
      ],
    },
    {
      _key: 'sh-3', title: 'Ballina Shire',
      suburbs: [
        { _key: 's-3-1', name: 'Ballina', isLive: false },
        { _key: 's-3-2', name: 'Lennox Head', isLive: false },
        { _key: 's-3-3', name: 'Alstonville', isLive: false },
        { _key: 's-3-4', name: 'Wollongbar', isLive: false },
        { _key: 's-3-5', name: 'Cumbalum', isLive: false },
        { _key: 's-3-6', name: 'Skennars Head', isLive: false },
      ],
    },
    {
      _key: 'sh-4', title: 'City of Gold Coast',
      suburbs: [
        { _key: 's-4-1', name: 'Currumbin', isLive: false },
        { _key: 's-4-2', name: 'Palm Beach', isLive: false },
        { _key: 's-4-3', name: 'Tallebudgera', isLive: false },
        { _key: 's-4-4', name: 'Burleigh Heads', isLive: false },
        { _key: 's-4-5', name: 'Miami', isLive: false },
        { _key: 's-4-6', name: 'Mermaid Beach', isLive: false },
      ],
    },
  ],

  cta: {
    heading: 'Ready to Find Your Property?',
    buttonText: 'Book a Free Consultation',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// WHO WE WORK WITH PAGE — heading/subtitle flat, segments array, cta nested
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'whoWeWorkWithPage',
  _type: 'whoWeWorkWithPage',

  heading: 'Who We Work With',
  subtitle: "From first-home buyers to seasoned investors and relocators, we tailor our service to your goals, timelines and budget, giving you access, clarity and confidence throughout the process.",

  segments: [
    { _key: 'w-1', id: { _type: 'slug', current: 'first-home-buyers' }, title: 'First Home Buyers', intro: 'Navigate your first purchase with a clear plan, off-market access and help at every step.', needs: ["Hard to know what's good value in fast-moving markets", 'Missing opportunities before inspection day', 'Uncertainty around negotiations and contract terms'], howWeHelp: ['Brief, suburb selection and property comparables to set a clear strategy', 'Private and off-market access via our agent network', 'End-to-end guidance from inspections to settlement'] },
    { _key: 'w-2', id: { _type: 'slug', current: 'downsizers' }, title: 'Downsizers', intro: 'Secure low-maintenance, well-located homes without compromise.', needs: ['Finding quality, accessible homes near lifestyle essentials', 'Avoiding renovation risk and hidden issues', 'Selling and buying with minimal stress'], howWeHelp: ['Local shortlist focusing on amenity, access and liveability', 'Thorough due diligence and building & pest coordination', 'Negotiation of favourable terms and settlement flexibility'] },
    { _key: 'w-3', id: { _type: 'slug', current: 'property-investors' }, title: 'Property Investors', intro: 'Data-led purchases aligned to yield, growth and portfolio strategy.', needs: ['Separating good deals from noise', 'Understanding street-level risks and overlays', 'Securing assets before the wider market'], howWeHelp: ['Local insights and comparables beyond the portals', 'Modelled returns, rental demand and risk assessment', 'Access to pre-market and off-market opportunities'] },
    { _key: 'w-4', id: { _type: 'slug', current: 'interstate-buyers' }, title: 'Interstate Buyers', intro: 'Buy remotely with confidence. Inspections, due diligence and negotiations handled locally.', needs: ['Inconsistent information when buying from afar', 'Missing properties due to travel constraints', 'Limited network for local services post-purchase'], howWeHelp: ['FaceTime/recorded inspections and detailed reports', 'On-the-ground access to pre-market options', 'Local network of trades and professionals to support your move'] },
    { _key: 'w-5', id: { _type: 'slug', current: 'international-buyers' }, title: 'International Buyers', intro: 'A seamless process across time zones, with careful compliance and representation.', needs: ['Understanding FIRB and local regulations', 'Finding the right home or investment from overseas', 'Trusted local representation for inspections and negotiations'], howWeHelp: ['Clear guidance on requirements and timelines', 'Curated options with video walkthroughs and analysis', 'End-to-end coordination to settlement and beyond'] },
    { _key: 'w-6', id: { _type: 'slug', current: 'rural-acreage' }, title: 'Rural & Acreage Buyers', intro: 'Find your perfect lifestyle property with local knowledge of land, water and zoning.', needs: ['Understanding water rights, soil quality and zoning restrictions', 'Finding properties that match lifestyle goals and practical needs', 'Navigating rural due diligence beyond standard building reports'], howWeHelp: ['Local expertise on rural markets, land values and property potential', 'Coordination of specialist inspections for water, septic, fencing and infrastructure', 'Access to off-market acreage and rural listings through our agent network'] },
    { _key: 'w-7', id: { _type: 'slug', current: 'commercial' }, title: 'Commercial Property Buyers', intro: 'Strategic commercial property acquisition with market insight and rigorous analysis.', needs: ['Limited transparency in commercial pricing and yields', 'Complex lease structures and tenant risk assessment', 'Finding properties that meet investment criteria'], howWeHelp: ['Commercial market analysis and comparable sales data', 'Detailed lease review and tenant covenant assessment', 'Negotiation expertise to secure favourable terms and pricing'] },
    { _key: 'w-8', id: { _type: 'slug', current: 'developers' }, title: 'Developers', intro: 'Site acquisition and feasibility support for residential and commercial development.', needs: ['Identifying development sites with genuine potential', 'Understanding planning controls, constraints and approval risk', 'Securing sites at the right price to support project viability'], howWeHelp: ['Site sourcing with preliminary feasibility and planning assessment', 'Network access to off-market development opportunities', 'Expert negotiation to optimise acquisition price and contract terms'] },
    { _key: 'w-9', id: { _type: 'slug', current: 'prestige' }, title: 'Prestige Buyers', intro: 'Discreet acquisition of premium properties with uncompromising standards.', needs: ['Access to exclusive, off-market and pre-market listings', 'Privacy and discretion throughout the purchase process', 'Expert assessment of quality, design and long-term value'], howWeHelp: ['Private access to prestige listings through our exclusive network', 'Detailed property analysis and architect/builder referrals', 'Confidential negotiation and seamless transaction management'] },
  ],

  cta: {
    eyebrow: '',
    heading: 'Ready to Get Started?',
    buttonText: 'Book a Free Consultation',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// PRIVACY POLICY PAGE — heading flat, body as portable text
// ═══════════════════════════════════════════════════════════════════════════════
await upsert({
  _id: 'privacyPolicyPage',
  _type: 'privacyPolicyPage',
  heading: 'Privacy Policy',
  lastUpdated: '2026-02-01',
  abn: '',
  body: [
    { _key: 'b-0', _type: 'block', style: 'normal', children: [{ _key: 's-0', _type: 'span', text: 'Compass Buyers Agency ("we", "us", "our") is committed to protecting your personal information in accordance with the Australian Privacy Principles under the Privacy Act 1988 (Cth).' }] },
    { _key: 'b-1', _type: 'block', style: 'h2', children: [{ _key: 's-1', _type: 'span', text: 'Information We Collect' }] },
    { _key: 'b-2', _type: 'block', style: 'normal', children: [{ _key: 's-2', _type: 'span', text: 'We may collect personal information including your name, email address, phone number, property preferences, budget range and purchase timeframe when you enquire through our website or engage our services.' }] },
    { _key: 'b-3', _type: 'block', style: 'h2', children: [{ _key: 's-3', _type: 'span', text: 'How We Use Your Information' }] },
    { _key: 'b-4', _type: 'block', style: 'normal', children: [{ _key: 's-4', _type: 'span', text: 'Respond to your enquiries and provide property buying services. Send you relevant property opportunities and market updates. Comply with legal and regulatory obligations. Improve our website and services.' }] },
    { _key: 'b-5', _type: 'block', style: 'h2', children: [{ _key: 's-5', _type: 'span', text: 'Disclosure' }] },
    { _key: 'b-6', _type: 'block', style: 'normal', children: [{ _key: 's-6', _type: 'span', text: 'We do not sell or rent your personal information. We may share information with third parties only where necessary to deliver our services (e.g. conveyancers, building inspectors) or where required by law.' }] },
    { _key: 'b-7', _type: 'block', style: 'h2', children: [{ _key: 's-7', _type: 'span', text: 'Data Security' }] },
    { _key: 'b-8', _type: 'block', style: 'normal', children: [{ _key: 's-8', _type: 'span', text: 'We take reasonable steps to protect your personal information from misuse, interference, loss and unauthorised access. Information is stored securely and access is restricted to authorised personnel.' }] },
    { _key: 'b-9', _type: 'block', style: 'h2', children: [{ _key: 's-9', _type: 'span', text: 'Your Rights' }] },
    { _key: 'b-10', _type: 'block', style: 'normal', children: [{ _key: 's-10', _type: 'span', text: 'You may request access to, correction of, or deletion of your personal information at any time by contacting us at hello@compassbuyersagency.com.au or calling 0403 536 390.' }] },
    { _key: 'b-11', _type: 'block', style: 'h2', children: [{ _key: 's-11', _type: 'span', text: 'Cookies' }] },
    { _key: 'b-12', _type: 'block', style: 'normal', children: [{ _key: 's-12', _type: 'span', text: 'Our website may use cookies and similar technologies to improve your browsing experience. You can manage cookie preferences through your browser settings.' }] },
    { _key: 'b-13', _type: 'block', style: 'h2', children: [{ _key: 's-13', _type: 'span', text: 'Changes to This Policy' }] },
    { _key: 'b-14', _type: 'block', style: 'normal', children: [{ _key: 's-14', _type: 'span', text: 'We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.' }] },
  ],
});

console.log('\n✨ All page documents populated with correct nested structure!');
console.log(`📷 ${imageCache.size} images uploaded to Sanity assets\n`);
