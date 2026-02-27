/**
 * Sanity CMS Population Script
 * Run with: node populate.mjs
 * Requires: SANITY_TOKEN environment variable with write access
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

async function upsert(doc) {
  const { _id, _type, ...rest } = doc;
  try {
    await client.createOrReplace({ _id, _type, ...rest });
    console.log(`✅ ${_type} (${_id})`);
  } catch (err) {
    console.error(`❌ ${_type} (${_id}):`, err.message);
  }
}

// ─── Site Settings ────────────────────────────────────────────────────────────
await upsert({
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Compass Buyers Agency',
  tagline: 'Property Acquisition Experts',
  logoAlt: 'Compass Buyers Agency',
  phone: '0403 536 390',
  phoneRaw: '+61403536390',
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

// ─── Home Page ────────────────────────────────────────────────────────────────
await upsert({
  _id: 'homePage',
  _type: 'homePage',

  // Hero
  heroTitle: 'Property Acquisition Experts',
  heroSubtitle: 'Leading Northern NSW & Gold Coast Buyer Advocates. 70% Off Market Acquisitions with hundreds of happy clients. Buy smarter with Compass.',
  heroCtaText: 'Start Your Search',

  // About Expertise / Featured Review
  expertiseQuoteText: 'Compass made buying simple and stress-free. Their local knowledge, off-market access and sharp negotiation delivered a great outcome - highly recommend.',
  expertiseAuthorName: 'Mick Caine',
  expertiseAuthorRole: 'Property buyer',
  expertiseAuthorAvatarUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/ab9ef034e_unnamed1.png',

  // Services Accordion
  servicesHeading: 'Explore Our Services',
  servicesTeamImageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/0b49c2526_6.png',
  servicesTeamImageAlt: 'Our team',
  servicesItems: [
    {
      _key: 'service-1',
      title: 'Property buying',
      description: 'We search, evaluate and negotiate to secure the right property, at the right price and terms. End-to-end and stress-free.',
    },
    {
      _key: 'service-2',
      title: 'Auction bidding',
      description: 'Professional strategy and on‑the‑day representation to keep emotion out and results in.',
    },
    {
      _key: 'service-3',
      title: 'Due diligence',
      description: 'Independent research, valuations, building & pest, and legal review for informed decisions.',
    },
    {
      _key: 'service-4',
      title: 'Negotiation & purchase',
      description: 'We handle every step of the deal to protect your position and deliver better outcomes.',
    },
    {
      _key: 'service-5',
      title: 'Investment advisory',
      description: 'Data‑led insights, suburb selection and portfolio strategy tailored to your goals.',
    },
  ],

  // Acquisitions Strip
  acquisitionsEyebrow: 'What We\'re Buying',
  acquisitionsHeading: 'Recent acquisitions',
  acquisitionsSubheading: 'A snapshot of properties we\'ve recently secured for clients across the Northern Rivers and Southern Gold Coast.',

  // Investment & Relationship
  relationshipHeading: 'A Relationship‑First Approach',
  relationshipBody: 'Your partners for the full journey - not just the transaction. Expect transparent advice, streamlined communication and support from initial consult to settlement.',
  relationshipImageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg',
  relationshipImageAlt: 'Chris from Compass Buyers Agency speaking with a client',
  relationshipChecklist: [
    { _key: 'check-1', item: 'Tailored guidance for first‑home buyers and investors' },
    { _key: 'check-2', item: 'Clear, timely updates you can rely on' },
    { _key: 'check-3', item: 'End‑to‑end coordination with trusted local partners' },
  ],

  // Why Stand Out Grid
  whyHeading: 'Why Compass Stands Out',
  whyCards: [
    { _key: 'why-1', title: 'Personalised search', description: 'Every brief tailored to your goals, budget and timeline.' },
    { _key: 'why-2', title: 'Off‑market access', description: 'Local relationships open doors beyond the portals.' },
    { _key: 'why-3', title: 'Independent advice', description: 'We work exclusively for buyers. No conflicts.' },
    { _key: 'why-4', title: 'Risk management', description: 'Thorough due diligence to avoid costly mistakes.' },
    { _key: 'why-5', title: 'Local expertise', description: 'Northern Rivers and Southern Gold Coast specialists.' },
    { _key: 'why-6', title: 'Negotiation edge', description: 'Price and terms negotiated to protect your position.' },
  ],

  // Regions
  regionsHeading: 'Areas We Serve',
  regionsSubtitle: 'We specialise in Northern NSW & Southern QLD Byron Shire, Tweed Shire and the City of Gold Coast. We\'re across council rules and overlays in each region and stay in tune with the latest information as it relates to your investment.',
  regionsCtaText: 'Explore Areas & Suburbs',
  regionsItems: [
    { _key: 'region-1', label: 'Byron Shire' },
    { _key: 'region-2', label: 'Tweed Shire' },
    { _key: 'region-3', label: 'City of Gold Coast' },
  ],

  // FAQ
  faqHeading: 'Frequently Asked Questions',
  faqItems: [
    { _key: 'faq-1', question: 'What is a Buyers Agent?', answer: 'A Buyers Agent (buyers advocate) is a licensed professional who searches, evaluates, and negotiates property on behalf of the buyer, working exclusively for the buyer\'s interests.' },
    { _key: 'faq-2', question: 'Why should I use a Buyers Agent?', answer: 'We can save you time and money with local knowledge, access to off-market properties, and expert negotiation, reducing stress and complexity.' },
    { _key: 'faq-3', question: 'What\'s the difference between a Buyers Agent and a Selling Agent?', answer: 'A Buyers Agent represents the buyer and is paid by the buyer; a Selling Agent represents the seller and acts in the vendor\'s best interests.' },
    { _key: 'faq-4', question: 'What services do Buyers Agents provide?', answer: 'Full property search, appraisal and negotiation, auction bidding, vendor advocacy, development sourcing, and property management guidance.' },
    { _key: 'faq-5', question: 'How much does a Buyers Agent cost?', answer: 'Fees vary by service and complexity, typically an engagement fee plus a success fee, either fixed or a percentage of the price.' },
    { _key: 'faq-6', question: 'Can Buyers Agents help with investment properties?', answer: 'Yes. We identify, evaluate, and negotiate investment properties using data and market insights to target high‑growth opportunities.' },
    { _key: 'faq-7', question: 'Do Buyers Agents have access to off‑market properties?', answer: 'Yes. Our agent network and industry contacts give access to properties not publicly listed, especially valuable in competitive markets.' },
    { _key: 'faq-8', question: 'How do I choose the right Buyers Agent?', answer: 'Look for strong reputation, local expertise, independence, transparent research systems, and proven negotiation capability.' },
    { _key: 'faq-9', question: 'Can Buyers Agents help overseas buyers?', answer: 'Absolutely. We regularly assist expat and overseas buyers with end‑to‑end guidance and compliance with local regulations.' },
    { _key: 'faq-10', question: 'What is the typical process?', answer: 'Initial consultation, tailored search, evaluations and appraisals, negotiation and securing the property, then guiding you to settlement.' },
  ],

  // Contact Strip
  contactStripHeading: 'Take the first step toward your Northern Rivers home with Compass',
  contactStripSubtitle: 'Free consultation. No obligation.',
  contactStripPrimaryButtonLabel: 'Book a Free Consultation',
  contactStripSecondaryButtonLabel: 'Send an Email',
});

// ─── About Page ───────────────────────────────────────────────────────────────
await upsert({
  _id: 'aboutPage',
  _type: 'aboutPage',

  heading: 'Our Team',
  subtitle: 'Local property professionals deeply embedded in our community, providing unique access to opportunities others simply can\'t.',

  featureSplit1Title: 'Your Local Advantage',
  featureSplit1Description: 'As both locals and property professionals deeply embedded in our community, we provide unique access to off-market properties, pre-market and many options not published online. We ensure you have a proactive edge in identifying emerging opportunities in our region, making Compass your first choice in buying property in the local market.\n\nOur clients receive access to our network of professional services, from expert mortgage brokers, conveyancers, town planners, building & pest and local trades to support all aspects of the process. Your experience with us is streamlined and enjoyable, we are always in sync through each stage of the process.',
  featureSplit1ImageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/1a4591edc_CONTENTSHOOTJULY-31.jpg',
  featureSplit1ImageAlt: 'Compass team meeting clients',

  featureSplit2Title: 'Why Compass Buyers Agency?',
  featureSplit2Description: 'We simplify the buying process, cutting through stress and confusion with clarity and support at every step. Rely on us to guide you consistently, keeping your confidence high throughout.\n\nWe build lasting connections with our clients. You\'ll feel welcome and supported at all stages. We prioritise meaningful relationships over transactions, fostering a sense of community and guidance that extends well beyond settlement.',
  featureSplit2ImageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/6c2c9c4ac_CONTENTSHOOTJULY-30.jpg',
  featureSplit2ImageAlt: 'Compass team at office',

  teamSectionHeading: 'Meet Your Property Experts',

  ctaHeading: 'Ready to Start Your Property Journey?',
  ctaButtonText: 'Contact Our Team',
});

// ─── Services Page ────────────────────────────────────────────────────────────
await upsert({
  _id: 'servicesPage',
  _type: 'servicesPage',

  heading: 'Buyers Agent Services',
  subtitle: 'Independent buyers advocacy tailored to your needs - from search and due diligence to auction strategy and portfolio planning.',

  segments: [
    {
      _key: 'seg-1',
      id: 'full-service',
      title: 'Full‑service buyers advocacy',
      intro: 'End-to-end representation to find, assess and secure the right property, often off-market, with your interests protected at every step.',
      needs: [
        'Limited time to manage inspections and shortlists',
        'Competitive conditions and unclear value',
        'Complex negotiations, terms and risk',
      ],
      howWeHelp: [
        'Brief, suburb selection and comparables to set a clear strategy',
        'Private and off‑market access via our local agent network',
        'Thorough due diligence and contract support to settlement',
      ],
      imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/7ee9b92c9_CONTENTSHOOTJULY-20.jpg',
      imageAlt: 'Compass team members',
    },
    {
      _key: 'seg-2',
      id: 'sourcing',
      title: 'Sourcing & research',
      intro: 'We halve the time it takes most buyers by handling research, outreach and inspections, surfacing the best options quickly.',
      needs: [
        'Time consuming search across suburbs and agents',
        'Missing pre‑market and off‑market opportunities',
        'Difficult to compare real value street‑by‑street',
      ],
      howWeHelp: [
        'Proactive agent outreach and access before the portals',
        'Local insights and detailed property comparables',
        'Shortlists refined to your brief with clear trade‑offs',
      ],
      imageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/d62d38c74_CONTENTSHOOTJULY-16.jpg',
      imageAlt: 'Aerial view of Northern Rivers waterfront properties',
    },
    {
      _key: 'seg-3',
      id: 'auction',
      title: 'Auction bidding & negotiation',
      intro: 'Keep emotion out and results in. Our team plans the strategy and represents you on the day or in pre-auction and private negotiations.',
      needs: [
        'Unclear tactics and pricing at auction',
        'High‑pressure negotiations with vendors\' agents',
        'Risk of over‑paying or poor contract terms',
      ],
      howWeHelp: [
        'Auction plan with price guardrails and scenarios',
        'Experienced on‑the‑day bidding and vendor negotiation',
        'Sharp negotiation on price and terms that protect you',
      ],
      imageAlt: 'Auction planning and representation',
    },
    {
      _key: 'seg-4',
      id: 'portfolio',
      title: 'Portfolio strategy',
      intro: 'A longer-term plan to grow your portfolio, aligning yield, growth and risk with clear criteria for each acquisition.',
      needs: [
        'Unsure how to balance yield vs growth',
        'Limited clarity on sequencing next purchases',
        'Hard to assess risk at suburb and property level',
      ],
      howWeHelp: [
        'Tailored strategy aligned to goals and timeframe',
        'Modelled returns, rental demand and risk assessment',
        'Buy rules and review cadence to keep you on track',
      ],
      imageAlt: 'Portfolio planning session',
    },
  ],

  processHeading: 'Our Process',
  processSteps: [
    { _key: 'step-1', title: 'Discovery Call', description: 'Start with a relaxed conversation about your goals and requirements and confirm we\'re a good fit to help.' },
    { _key: 'step-2', title: 'Strategy Session', description: 'Align on outcomes, approach, timelines and process, setting a tailored plan for your buying journey.' },
    { _key: 'step-3', title: 'Property Search & Research', description: 'Deep-dive suburb insights, off-market and pre-market access, and comprehensive market investigation.' },
    { _key: 'step-4', title: 'Property Inspections', description: 'We inspect on your behalf and present aligned options, saving you time while surfacing the best opportunities.' },
    { _key: 'step-5', title: 'Negotiation & Auction Bidding', description: 'We manage negotiations and auction strategy to secure favourable terms and protect your financial position.' },
    { _key: 'step-6', title: 'Contract to Settlement', description: 'We coordinate with your solicitor and financier, attend pre-settlement and ensure nothing is missed.' },
    { _key: 'step-7', title: 'Post-Settlement Support', description: 'Smooth transition with preferred providers and local connections to get you settled quickly.' },
  ],

  whyChooseUsTitle: 'Why choose Compass?',
  whyChooseUsDescription: 'As locals and property professionals, we provide unique access to off‑market opportunities and pre‑market options that aren\'t published online. With 30+ years of combined experience, we simplify the buying process and protect your position at each step.',
  whyChooseUsImageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg',
  whyChooseUsImageAlt: 'Compass advisor speaking with a client',
  whyChooseUsCtaLabel: 'Learn more about us',

  ctaHeading: 'Ready to Start Your Property Journey?',
  ctaButtonText: 'Get Started Today',
});

// ─── Contact Page ─────────────────────────────────────────────────────────────
await upsert({
  _id: 'contactPage',
  _type: 'contactPage',

  heading: 'Talk to a Buyers Agent',
  subtitle: 'Free consultation. No obligation. We\'ll answer your questions and outline how we can help.',

  phone: '0403 536 390',
  phoneRaw: '+61403536390',
  email: 'hello@compassbuyersagency.com.au',
  address: '32a Tweed Coast Road, Cabarita Beach, NSW 2487',

  officeImageUrl: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/f4d8d6980_Screenshot2025-10-01at75412am.png',
  officeImageAlt: 'Compass office exterior',

  bookCallLabel: 'Book a call',
  sendEmailLabel: 'Send an email',

  formTitle: 'Tell Us About Your Property',
  formSubtitle: 'Share a few details and we\'ll be in touch within 24 hours.',
});

// ─── Areas Page ───────────────────────────────────────────────────────────────
await upsert({
  _id: 'areasPage',
  _type: 'areasPage',

  heading: 'Areas We Serve',
  subtitle: 'Compass Buyers Agency services buyers across Byron Shire, Tweed Shire, Ballina Shire and the City of Gold Coast. We help you find and secure property in any of these suburbs.',

  shires: [
    {
      _key: 'shire-1',
      title: 'Byron Shire',
      suburbs: [
        { _key: 'sub-1-1', name: 'Byron Bay', isLive: true, slug: 'byron-bay' },
        { _key: 'sub-1-2', name: 'Bangalow', isLive: false, slug: 'bangalow' },
        { _key: 'sub-1-3', name: 'Brunswick Heads', isLive: true, slug: 'brunswick-heads' },
        { _key: 'sub-1-4', name: 'Mullumbimby', isLive: false, slug: 'mullumbimby' },
        { _key: 'sub-1-5', name: 'Suffolk Park', isLive: false, slug: 'suffolk-park' },
        { _key: 'sub-1-6', name: 'Ocean Shores', isLive: false, slug: 'ocean-shores' },
      ],
    },
    {
      _key: 'shire-2',
      title: 'Tweed Shire',
      suburbs: [
        { _key: 'sub-2-1', name: 'Kingscliff', isLive: false, slug: 'kingscliff' },
        { _key: 'sub-2-2', name: 'Cabarita Beach', isLive: false, slug: 'cabarita-beach' },
        { _key: 'sub-2-3', name: 'Casuarina', isLive: false, slug: 'casuarina' },
        { _key: 'sub-2-4', name: 'Pottsville', isLive: false, slug: 'pottsville' },
        { _key: 'sub-2-5', name: 'Tweed Heads', isLive: false, slug: 'tweed-heads' },
        { _key: 'sub-2-6', name: 'Murwillumbah', isLive: false, slug: 'murwillumbah' },
      ],
    },
    {
      _key: 'shire-3',
      title: 'Ballina Shire',
      suburbs: [
        { _key: 'sub-3-1', name: 'Ballina', isLive: false, slug: 'ballina' },
        { _key: 'sub-3-2', name: 'Lennox Head', isLive: false, slug: 'lennox-head' },
        { _key: 'sub-3-3', name: 'Alstonville', isLive: false, slug: 'alstonville' },
        { _key: 'sub-3-4', name: 'Wollongbar', isLive: false, slug: 'wollongbar' },
        { _key: 'sub-3-5', name: 'Cumbalum', isLive: false, slug: 'cumbalum' },
        { _key: 'sub-3-6', name: 'Skennars Head', isLive: false, slug: 'skennars-head' },
      ],
    },
    {
      _key: 'shire-4',
      title: 'City of Gold Coast',
      suburbs: [
        { _key: 'sub-4-1', name: 'Currumbin', isLive: false, slug: 'currumbin' },
        { _key: 'sub-4-2', name: 'Palm Beach', isLive: false, slug: 'palm-beach' },
        { _key: 'sub-4-3', name: 'Tallebudgera', isLive: false, slug: 'tallebudgera' },
        { _key: 'sub-4-4', name: 'Burleigh Heads', isLive: false, slug: 'burleigh-heads' },
        { _key: 'sub-4-5', name: 'Miami', isLive: false, slug: 'miami' },
        { _key: 'sub-4-6', name: 'Mermaid Beach', isLive: false, slug: 'mermaid-beach' },
      ],
    },
  ],

  ctaHeading: 'Ready to Find Your Property?',
  ctaButtonText: 'Book a Free Consultation',
});

// ─── Who We Work With Page ────────────────────────────────────────────────────
await upsert({
  _id: 'whoWeWorkWithPage',
  _type: 'whoWeWorkWithPage',

  heading: 'Who We Work With',
  subtitle: 'From first‑home buyers to seasoned investors and relocators, we tailor our service to your goals, timelines and budget, giving you access, clarity and confidence throughout the process.',

  segments: [
    {
      _key: 'wwww-1',
      id: 'first-home-buyers',
      title: 'First Home Buyers',
      intro: 'Navigate your first purchase with a clear plan, off‑market access and help at every step.',
      needs: [
        'Hard to know what\'s good value in fast‑moving markets',
        'Missing opportunities before inspection day',
        'Uncertainty around negotiations and contract terms',
      ],
      howWeHelp: [
        'Brief, suburb selection and property comparables to set a clear strategy',
        'Private and off‑market access via our agent network',
        'End‑to‑end guidance from inspections to settlement',
      ],
    },
    {
      _key: 'wwww-2',
      id: 'downsizers',
      title: 'Downsizers',
      intro: 'Secure low‑maintenance, well‑located homes without compromise.',
      needs: [
        'Finding quality, accessible homes near lifestyle essentials',
        'Avoiding renovation risk and hidden issues',
        'Selling and buying with minimal stress',
      ],
      howWeHelp: [
        'Local shortlist focusing on amenity, access and liveability',
        'Thorough due diligence and building & pest coordination',
        'Negotiation of favourable terms and settlement flexibility',
      ],
    },
    {
      _key: 'wwww-3',
      id: 'property-investors',
      title: 'Property Investors',
      intro: 'Data‑led purchases aligned to yield, growth and portfolio strategy.',
      needs: [
        'Separating good deals from noise',
        'Understanding street‑level risks and overlays',
        'Securing assets before the wider market',
      ],
      howWeHelp: [
        'Local insights and comparables beyond the portals',
        'Modelled returns, rental demand and risk assessment',
        'Access to pre‑market and off‑market opportunities',
      ],
    },
    {
      _key: 'wwww-4',
      id: 'interstate-buyers',
      title: 'Interstate Buyers',
      intro: 'Buy remotely with confidence. Inspections, due diligence and negotiations handled locally.',
      needs: [
        'Inconsistent information when buying from afar',
        'Missing properties due to travel constraints',
        'Limited network for local services post‑purchase',
      ],
      howWeHelp: [
        'FaceTime/recorded inspections and detailed reports',
        'On‑the‑ground access to pre‑market options',
        'Local network of trades and professionals to support your move',
      ],
    },
    {
      _key: 'wwww-5',
      id: 'international-buyers',
      title: 'International Buyers',
      intro: 'A seamless process across time zones, with careful compliance and representation.',
      needs: [
        'Understanding FIRB and local regulations',
        'Finding the right home or investment from overseas',
        'Trusted local representation for inspections and negotiations',
      ],
      howWeHelp: [
        'Clear guidance on requirements and timelines',
        'Curated options with video walkthroughs and analysis',
        'End‑to‑end coordination to settlement and beyond',
      ],
    },
    {
      _key: 'wwww-6',
      id: 'rural-acreage',
      title: 'Rural & Acreage Buyers',
      intro: 'Find your perfect lifestyle property with local knowledge of land, water and zoning.',
      needs: [
        'Understanding water rights, soil quality and zoning restrictions',
        'Finding properties that match lifestyle goals and practical needs',
        'Navigating rural due diligence beyond standard building reports',
      ],
      howWeHelp: [
        'Local expertise on rural markets, land values and property potential',
        'Coordination of specialist inspections for water, septic, fencing and infrastructure',
        'Access to off-market acreage and rural listings through our agent network',
      ],
    },
    {
      _key: 'wwww-7',
      id: 'commercial',
      title: 'Commercial Property Buyers',
      intro: 'Strategic commercial property acquisition with market insight and rigorous analysis.',
      needs: [
        'Limited transparency in commercial pricing and yields',
        'Complex lease structures and tenant risk assessment',
        'Finding properties that meet investment criteria',
      ],
      howWeHelp: [
        'Commercial market analysis and comparable sales data',
        'Detailed lease review and tenant covenant assessment',
        'Negotiation expertise to secure favourable terms and pricing',
      ],
    },
    {
      _key: 'wwww-8',
      id: 'developers',
      title: 'Developers',
      intro: 'Site acquisition and feasibility support for residential and commercial development.',
      needs: [
        'Identifying development sites with genuine potential',
        'Understanding planning controls, constraints and approval risk',
        'Securing sites at the right price to support project viability',
      ],
      howWeHelp: [
        'Site sourcing with preliminary feasibility and planning assessment',
        'Network access to off-market development opportunities',
        'Expert negotiation to optimise acquisition price and contract terms',
      ],
    },
    {
      _key: 'wwww-9',
      id: 'prestige',
      title: 'Prestige Buyers',
      intro: 'Discreet acquisition of premium properties with uncompromising standards.',
      needs: [
        'Access to exclusive, off-market and pre-market listings',
        'Privacy and discretion throughout the purchase process',
        'Expert assessment of quality, design and long-term value',
      ],
      howWeHelp: [
        'Private access to prestige listings through our exclusive network',
        'Detailed property analysis and architect/builder referrals',
        'Confidential negotiation and seamless transaction management',
      ],
    },
  ],

  ctaEyebrow: '',
  ctaHeading: 'Ready to Get Started?',
  ctaButtonText: 'Book a Free Consultation',
});

// ─── Privacy Policy Page ──────────────────────────────────────────────────────
await upsert({
  _id: 'privacyPolicyPage',
  _type: 'privacyPolicyPage',

  heading: 'Privacy Policy',
  lastUpdated: '2026-02-01',
  abn: '',

  body: [
    {
      _key: 'block-intro',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-intro', _type: 'span', text: 'Compass Buyers Agency ("we", "us", "our") is committed to protecting your personal information in accordance with the Australian Privacy Principles under the Privacy Act 1988 (Cth).' }],
    },
    {
      _key: 'block-h2-1',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-1', _type: 'span', text: 'Information We Collect' }],
    },
    {
      _key: 'block-collect',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-collect', _type: 'span', text: 'We may collect personal information including your name, email address, phone number, property preferences, budget range and purchase timeframe when you enquire through our website or engage our services.' }],
    },
    {
      _key: 'block-h2-2',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-2', _type: 'span', text: 'How We Use Your Information' }],
    },
    {
      _key: 'block-use-1',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-use-1', _type: 'span', text: 'Respond to your enquiries and provide property buying services' }],
    },
    {
      _key: 'block-use-2',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-use-2', _type: 'span', text: 'Send you relevant property opportunities and market updates' }],
    },
    {
      _key: 'block-use-3',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-use-3', _type: 'span', text: 'Comply with legal and regulatory obligations' }],
    },
    {
      _key: 'block-use-4',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-use-4', _type: 'span', text: 'Improve our website and services' }],
    },
    {
      _key: 'block-h2-3',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-3', _type: 'span', text: 'Disclosure' }],
    },
    {
      _key: 'block-disclosure',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-disclosure', _type: 'span', text: 'We do not sell or rent your personal information. We may share information with third parties only where necessary to deliver our services (e.g. conveyancers, building inspectors) or where required by law.' }],
    },
    {
      _key: 'block-h2-4',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-4', _type: 'span', text: 'Data Security' }],
    },
    {
      _key: 'block-security',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-security', _type: 'span', text: 'We take reasonable steps to protect your personal information from misuse, interference, loss and unauthorised access. Information is stored securely and access is restricted to authorised personnel.' }],
    },
    {
      _key: 'block-h2-5',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-5', _type: 'span', text: 'Your Rights' }],
    },
    {
      _key: 'block-rights',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-rights', _type: 'span', text: 'You may request access to, correction of, or deletion of your personal information at any time by contacting us at hello@compassbuyersagency.com.au or calling 0403 536 390.' }],
    },
    {
      _key: 'block-h2-6',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-6', _type: 'span', text: 'Cookies' }],
    },
    {
      _key: 'block-cookies',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-cookies', _type: 'span', text: 'Our website may use cookies and similar technologies to improve your browsing experience. You can manage cookie preferences through your browser settings.' }],
    },
    {
      _key: 'block-h2-7',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 'span-h2-7', _type: 'span', text: 'Changes to This Policy' }],
    },
    {
      _key: 'block-changes',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 'span-changes', _type: 'span', text: 'We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.' }],
    },
  ],
});

console.log('\n✨ All documents populated successfully!');
