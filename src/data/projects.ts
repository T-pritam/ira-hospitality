// Portfolio content from irahospitality.co.in/projects.
// Descriptions are tightened for readability; meaning, names and facts are unchanged.

export type GalleryItem = { src: string; alt: string; span?: 'full' | 'half' };

export type Project = {
  slug: string;
  name: string;
  category: string;
  tags: string[];
  headline: string; // the first sentence of the original description
  summary: string; // rest of the description, tightened
  location?: string;
  cover?: string; // card thumbnail; undefined = no image available on the source site
  gallery: GalleryItem[];
};

export const projects: Project[] = [
  {
    slug: 'baked-daily',
    name: 'Baked Daily',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Content Systems', 'Delivery Platform Integration'],
    headline: 'Craft as a Consistent Experience.',
    summary:
      'We translated artisanal values into a structured digital brand language, built for consistency, trust and recognition across online delivery platforms. It shows how storytelling and systemised branding work together at scale.',
    cover: 'baked-daily-thumbnail.jpg',
    gallery: [{ src: 'baked-daily-1.jpg', alt: 'Baked Daily brand board with logo and food photography', span: 'full' }],
  },
  {
    slug: 'dessert-kart',
    name: 'Dessert Kart',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Content Systems', 'Delivery Platform Integration'],
    headline: 'Craft as a Consistent Experience.',
    summary:
      'We translated artisanal values into a structured digital brand language, built for consistency, trust and recognition across online delivery platforms. It shows how storytelling and systemised branding work together at scale.',
    cover: 'dessert-kart-1.jpg',
    gallery: [
      { src: 'dessert-kart-3.jpg', alt: 'Dessert Kart poster with wordmark and dessert photograph', span: 'half' },
      { src: 'dessert-kart-6.jpg', alt: 'Dessert Kart tiramisu creative with coffee beans', span: 'half' },
      { src: 'dessert-kart-4.jpg', alt: 'Stacked pastel Dessert Kart dessert cups', span: 'half' },
      { src: 'dessert-kart-8.jpg', alt: 'Dessert Kart mango dessert cup creative', span: 'half' },
      { src: 'dessert-kart-10.jpg', alt: 'Dessert Kart kiosk with poster in a mall', span: 'half' },
      { src: 'dessert-kart-5.jpg', alt: 'Branded Dessert Kart package held against a white background', span: 'half' },
      { src: 'dessert-kart-9.jpg', alt: 'Dessert Kart strawberry dessert slice creative', span: 'half' },
      { src: 'dessert-kart-1.jpg', alt: 'Dessert Kart gold wordmark on pale teal stripes', span: 'half' },
    ],
  },
  {
    slug: 'indian-durbar',
    name: 'Indian Durbar | Conrad Bengaluru',
    category: 'Hospitality Branding',
    tags: ['Brand Narrative', 'Cuisine Conceptualisation', 'Guest Experience', 'Communication Design'],
    headline: 'Teen Punjab, Ek Mez.',
    summary:
      'This project began not with visuals, but with memory: bringing the culinary and cultural nuances of Malwa, Majha and Doaba together into one dining experience. Inside a five-star setting, restraint guided the approach. Instead of overt colour and spectacle, the brand draws on the warmth, craft and lived-in elegance of Punjab’s three regions, letting heritage unfold in a layered, contemporary way. Cuisine, storytelling and design were developed in parallel, so what arrives on the plate echoes the emotion of the space. Mr. Peg Singh was conceived as a playful guide through the beverage narrative, adding character while staying true to the restaurant’s refined tone. The result: a brand rooted in emotion and memory, where cultural depth and modern luxury meet at the same table.',
    location: 'Conrad Bengaluru',
    cover: 'indian-durbar-1.jpg',
    gallery: [
      { src: 'indian-durbar-2.jpg', alt: 'Indian Durbar material board of wood, leather and fabric swatches', span: 'full' },
      { src: 'indian-durbar-1.jpg', alt: 'Indian Durbar green and gold patterned brand visual', span: 'half' },
      { src: 'indian-durbar-16.jpg', alt: 'Hands holding the green Indian Durbar menu with gold emblem', span: 'half' },
      { src: 'indian-durbar-14.jpg', alt: 'Indian Durbar brass and wood signage', span: 'half' },
      { src: 'indian-durbar-15.jpg', alt: 'Indian Durbar gold-toned graphic panels', span: 'half' },
      { src: 'indian-durbar-7.jpg', alt: 'Indian Durbar team uniforms in dark and green', span: 'full' },
      { src: 'indian-durbar-9.jpg', alt: 'Indian Durbar menu and card collateral on dark green', span: 'half' },
      { src: 'indian-durbar-12.jpg', alt: 'Indian Durbar food and menu photograph in green and amber tones', span: 'half' },
      { src: 'indian-durbar-8.jpg', alt: 'Indian Durbar table setting with menu and cutlery', span: 'half' },
      { src: 'indian-durbar-10.jpg', alt: 'Indian Durbar menu in a dark green leaf-patterned scene', span: 'half' },
      { src: 'indian-durbar-13.jpg', alt: 'Indian Durbar illustrated cards and green booklet', span: 'full' },
    ],
  },
  {
    slug: 'iris-trident-pune',
    name: 'Iris | Trident Pune',
    category: 'Digital Brand Storytelling',
    tags: ['Menu Design', 'Beverage Storytelling', 'Design & Technology Integration'],
    headline: 'Clarity Through Visual Communication.',
    summary:
      'We sharpened beverage communication through thoughtful menu design and AI-generated visual representations, balancing aesthetic refinement with functional clarity to modernise how the bar offering is experienced. Good design systems simplify choice while reinforcing brand positioning.',
    location: 'Trident Pune',
    cover: 'iris-trident-pune-1.jpg',
    gallery: [
      { src: 'iris-trident-pune-2.jpg', alt: 'Iris menu pages with colourful food illustrations', span: 'half' },
      { src: 'iris-trident-pune-4.jpg', alt: 'Iris collage of menu pages and food and drink photography', span: 'half' },
      { src: 'iris-trident-pune-3.jpg', alt: 'Hand holding a red cocktail beside the open Iris menu', span: 'full' },
    ],
  },
  {
    slug: 'og-green',
    name: 'OG Green',
    category: 'Digital Brand Strategy',
    tags: ['Brand Identity', 'Digital Strategy', 'Aggregator Setup & Optimisation'],
    headline: 'Building for Online Discovery.',
    summary:
      'A digital-first brand system optimised for food delivery platforms. Identity, content and platform structure were aligned for discoverability, consistency and online performance, because digital environments demand precision-led branding.',
    cover: 'og-green-1.jpg',
    gallery: [
      { src: 'og-green-1.jpg', alt: 'OG Green emblem on a leafy dark background', span: 'half' },
      { src: 'og-green-3.jpg', alt: 'OG Green brand collage of cards, leaf icons and packaging', span: 'half' },
      { src: 'og-green-4.jpg', alt: 'OG Green palette board reading Natural. Bold. Fresh.', span: 'half' },
      { src: 'og-green-5.jpg', alt: 'OG Green salad bowl with leaf-icon wrap', span: 'half' },
      { src: 'og-green-8.jpg', alt: 'OG Green brand sheet with leaf icons', span: 'half' },
      { src: 'og-green-9.jpg', alt: 'Hand holding a dark green OG Green box', span: 'half' },
    ],
  },
  {
    slug: 'say-cheese',
    name: 'Say Cheese',
    category: 'Brand Identity',
    tags: ['Brand Identity', 'Visual Positioning', 'Delivery-First Brand Strategy'],
    headline: 'Designed for Recall at Speed.',
    summary:
      'A bold identity built for high-competition delivery platforms. Visual clarity and positioning were central to better discovery and repeat orders, proof that a strong identity drives performance in digital-first categories.',
    cover: 'say-cheese-pi7-image-tool-1.jpg',
    gallery: [
      { src: 'say-cheese-pi7-image-tool-1.jpg', alt: 'Say Cheese creative of hands kneading dough over a colourful pattern', span: 'half' },
      { src: 'say-cheese-pi7-image-tool.jpg', alt: 'Say Cheese brand stickers on green leaves', span: 'half' },
    ],
  },
  {
    slug: 'unamas',
    name: 'Unamas',
    category: 'Branded Collaterals',
    tags: ['Brand Refresh', 'Stall Design', 'High-Footfall Visual Strategy'],
    headline: 'Clarity in Competitive Physical Spaces.',
    summary:
      'We refreshed the identity and stall design to improve visibility and decision-making in a high-traffic mall. The work prioritised legibility, recall and spatial efficiency, showing how design directly impacts on-ground performance.',
    cover: 'unamas-thumbnail.jpg',
    gallery: [
      { src: 'unamas-para-text.jpg', alt: 'Unamas typography specimen sheet', span: 'half' },
      { src: 'unamas-hash-code.jpg', alt: 'Unamas pattern sheet with logo and illustrations', span: 'half' },
      { src: 'unamas-17.jpg', alt: 'Unamas red poster reading Juicy. Spicy. Yours.', span: 'half' },
      { src: 'unamas-16.jpg', alt: 'Unamas yellow poster reading Made your way', span: 'half' },
      { src: 'unamas-2.jpg', alt: 'Unamas poster reading Wrap it. Stack it. Sauce it like you mean it.', span: 'half' },
      { src: 'unamas-thumbnail.jpg', alt: 'Unamas poster with sombrero chef character', span: 'half' },
      { src: 'unamas-bottom-1.jpg', alt: 'Unamas strip of sombrero chef characters', span: 'half' },
      { src: 'unamas-bottom-2.jpg', alt: 'Unamas strip of sombrero chef characters, variant', span: 'half' },
    ],
  },
  {
    slug: 'feu',
    name: 'Feu',
    category: 'Operations & Branding',
    tags: ['F&B Operations Consulting', 'Brand & Service Alignment', 'Marketing Strategy'],
    headline: 'Where Brand Meets Daily Performance.',
    summary:
      'We aligned brand communication with on-ground operations and service delivery. By integrating marketing strategy with operational workflows, the brand experience grew stronger online and inside the restaurant, showing how operational clarity sustains brand consistency and guest trust.',
    cover: undefined, // images are missing on the source site
    gallery: [],
  },
  {
    slug: 'nest',
    name: 'Nest',
    category: 'Hospitality Branding',
    tags: ['Brand Identity', 'Environmental Design', 'Kids Experience Design'],
    headline: 'Creating Playful Spaces for Young Minds.',
    summary:
      'A complete brand identity and environmental design system for a children’s play and learning space. Vibrant visual storytelling meets functional design to engage children and parents alike. From passport-style activity guides to immersive wall graphics, every touchpoint was designed to spark curiosity and imagination.',
    cover: 'nest-wall.jpg',
    gallery: [
      { src: 'nest-passport.jpg', alt: 'Hand holding the blue Nest activity passport', span: 'half' },
      { src: 'nest-passport-flat.jpg', alt: 'Flat-lay of Nest passport pages and stationery', span: 'half' },
      { src: 'nest-mat-flat.jpg', alt: 'Flat-lay of the illustrated Nest activity mat', span: 'half' },
      { src: 'nest-wall-sticker.jpg', alt: 'Nest window wall stickers with colourful illustrations', span: 'half' },
      { src: 'nest-mat.jpg', alt: 'Child at a table using the Nest activity mat', span: 'half' },
      { src: 'nest-wall.jpg', alt: 'Nest sign on a wall in a bright play space', span: 'half' },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
