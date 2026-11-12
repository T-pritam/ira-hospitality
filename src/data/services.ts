// Services from irahospitality.co.in/services and the four detail pages.
// Intros are tightened; every offering in every list is kept.

export type ServiceGroup = { title: string; text?: string; items?: string[] };

export type Service = {
  slug: string;
  name: string;
  titleBold: string;
  titleLight: string;
  short: string; // one-line summary used on cards
  intro: string;
  highlights: string[]; // the 1–3 topics shown on the overview page
  groups: ServiceGroup[];
};

export const services: Service[] = [
  {
    slug: 'consulting',
    name: 'Consulting',
    titleBold: 'Consulting',
    titleLight: '',
    short:
      'Expert guidance for hotels, BnBs, restaurants, bars and cloud kitchens, from concept creation to brand launch, with operational efficiency.',
    intro:
      'We partner with hospitality brands to provide strategic guidance, operational insight and performance-driven solutions. From concept to execution, our consulting builds scalable models, elevates guest experiences and drives long-term profitability across every touchpoint.',
    highlights: [
      'Feasibility Study & Market Research',
      'Concept Development & Brand Positioning',
      'Business Plan Development & Financial Modelling',
    ],
    groups: [
      { title: 'Feasibility Study & Market Research', text: 'In-depth analysis of market trends, competition and financial viability.' },
      { title: 'Concept Development & Brand Positioning', text: 'Crafting unique concepts and positioning strategies to stand out.' },
      { title: 'Business Plan Development & Financial Modelling', text: 'Robust financial planning and business roadmaps for success.' },
      { title: 'Pre-Opening Planning & Launch Strategy', text: 'Comprehensive planning for a successful launch.' },
      { title: 'Menu Engineering & F&B Strategy', text: 'Optimising menus for profitability and guest satisfaction.' },
      { title: 'Cost Control & Profitability Consulting', text: 'Strategies to manage costs and maximise profits.' },
      { title: 'Revenue Management & Pricing Strategy', text: 'Dynamic pricing models to optimise revenue.' },
      { title: 'Staff Structuring, HR Planning, Recruitment & Training', text: 'Building and training high-performing teams.' },
      { title: 'Vendor & Supply Chain Consulting', text: 'Optimising procurement and supply chain processes.' },
      { title: 'Guest Journey Mapping & Experience Design', text: 'Designing seamless and memorable guest experiences.' },
      { title: 'Sales & Marketing Strategy Consulting', text: 'Driving growth through targeted sales and marketing.' },
      { title: 'Competitive Benchmarking & Industry Insights', text: 'Staying ahead with competitive analysis and insights.' },
      { title: 'Crisis Management & Turnaround Strategy', text: 'Navigating challenges and revitalising performance.' },
    ],
  },
  {
    slug: 'branding-marketing',
    name: 'Branding & Marketing',
    titleBold: 'Branding',
    titleLight: '& Marketing',
    short:
      'Distinctive hospitality brands, from positioning and storytelling to design and digital strategy, creating experiences that inspire guests and drive growth.',
    intro:
      'Crafting presence with purpose. For hospitality brands, marketing isn’t just about being seen, it’s about being remembered. We build thoughtful, guest-focused strategies that amplify your brand’s essence across every channel. From concept to campaign, every move is rooted in your story, shaped by insight and designed for emotional and commercial impact.',
    highlights: [
      'Branding & Identity Design',
      'Digital Marketing & Transformation',
      'Concept & Content Curation & Strategy',
    ],
    groups: [
      {
        title: 'Branding & Identity Design',
        text: 'We don’t just design brands, we shape experiences. Every element, from your logo to your marketing collateral, is crafted to echo your brand’s soul, so every touchpoint feels intentional, cohesive and unforgettable.',
        items: [
          'Logo Designing', 'Stationery Designing', 'Marketing Collaterals', 'Signage Solutions', 'Digital Assets',
          'Guest Communications', 'Promotional Materials', 'Brand Guidelines', 'Merchandising Support',
          'Digital Interfaces', 'Brand Identity Kit',
        ],
      },
      {
        title: 'Digital Marketing & Transformation',
        text: 'We shape your digital presence with intention and impact. Creative storytelling meets smart strategy to build digital journeys that captivate, convert and cultivate lasting brand love. Powered by data, driven by design.',
        items: ['Website Creation & Development', 'SEO Optimisation', 'Meta Ads', 'Google Ads', 'Social Media Management'],
      },
      {
        title: 'Concept & Content Curation & Strategy',
        text: 'Content with purpose: stories that spark emotion, build trust and leave a lasting impression. From words to visuals, every piece echoes your brand’s voice and vision across every digital touchpoint.',
        items: [
          'Lifestyle Photoshoot', 'Video Production', 'Brand Films', 'F&B Shoots', 'Blog Writing',
          'Social Media Creatives', 'Influencer Marketing',
        ],
      },
      {
        title: 'Narrative & Noise',
        text: 'Every brand has a story worth telling, and telling it to the right people makes all the difference. With deep industry relationships and an eye for what sparks conversation, we earn your brand visibility, credibility and a place top-of-mind.',
        items: ['Media & Influencer Outreach', 'Press Releases', 'Event PR'],
      },
    ],
  },
  {
    slug: 'hospitality-operations',
    name: 'Operations & Management',
    titleBold: 'Operations',
    titleLight: '& Management',
    short:
      'We optimise workflows, support talent acquisition, enhance service delivery and run training that improves guest experience and profitability.',
    intro:
      'End-to-end management focused on operational efficiency, asset performance and sustainable growth. From daily operations to industry-standard SOPs, we optimise cost structures and raise guest satisfaction. For independent properties or global brands, we drive operational excellence with a clear focus on profitability and long-term value.',
    highlights: ['Our Operational Expertise'],
    groups: [
      {
        title: 'Our Operational Expertise',
        items: [
          'Strategic Planning & Operational Setup',
          'Standard Operating Procedures (SOP) Development & Implementation',
          'Revenue Management & Dynamic Pricing Strategies',
          'Food & Beverage (F&B) Concept Development & Management',
          'Front Office & Guest Experience Management',
          'Housekeeping & Facility Management',
          'Human Resource Planning & Staff Training',
          'Vendor & Procurement Management',
          'Cost Control & Profit Optimisation',
          'Budgeting, Forecasting & Financial Reporting',
          'Brand Compliance & Quality Audits',
          'Sales, Marketing & Distribution Strategy',
          'Asset Management & Owner Representation',
          'Operational Excellence Audits & Performance Reviews',
        ],
      },
    ],
  },
  {
    slug: 'hospitality-digitize',
    name: 'Digitize',
    titleBold: 'Digitize',
    titleLight: '',
    short:
      'Digital ecosystems, from websites and apps to loyalty platforms, that enhance operations, elevate guest engagement and support targeted marketing.',
    intro:
      'We help brands embrace the digital shift, turning traditional operations into smart, data-driven ecosystems. From guest engagement to operational automation, our solutions drive efficiency, raise visibility and create seamless experiences across every touchpoint.',
    highlights: ['Our Digital Solutions'],
    groups: [
      {
        title: 'Our Digital Solutions',
        items: [
          'Digital Transformation Strategy & Consulting',
          'Website Design & Development (UX/UI focused)',
          'Online Reputation Management & Review Strategy',
          'CRM Implementation & Guest Data Management',
          'Digital Loyalty Programs & Guest Retention Solutions',
          'Digital Menu & Contactless Solutions (QR Based Tech)',
          'Online Booking Engine Integration',
          'Digital Payment & Wallet Solutions',
          'Data Analytics & Reporting Dashboards',
          'Brand Storytelling through Digital Platforms',
          'Technology Partner Sourcing & Implementation',
        ],
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
