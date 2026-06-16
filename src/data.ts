import { PhotographyPackage, Testimonial } from './types';

// Let's reference the generated image paths. We can pass image references or keys to look up.
export const PACKAGES: PhotographyPackage[] = [
  {
    id: 'birthday',
    title: 'Birthday Shoots & Caricature',
    price: 170,
    duration: '1 Hour Session',
    edits: '15 Signature Edits + 1 Digital Caricature Art',
    category: 'birthday',
    imageUrl: 'birthday_portrait',
    brief: 'Capture the magical sparkle, laughter, and milestone of your special day with custom creative lighting, plus a digital caricature style rendering.',
    features: [
      'Indoor/Outdoor Euclid location',
      'Free use of custom sketch props and silver balloons',
      'Online proofing gallery (24-hour turnaround)',
      'Digital download of both Realistic & Caricature renders'
    ]
  },
  {
    id: 'graduation',
    title: 'Graduation Portraits',
    price: 185,
    duration: '1.5 Hour Session',
    edits: '20 Master-Retouched High-Res Images',
    category: 'graduation',
    imageUrl: 'grad_portrait',
    brief: 'Celebrate academic milestone achievements with elegant, high-impact dark-ambient and warm golden-hour campus portraits.',
    features: [
      'Cap & gown caricature graphic sketch overlay optional',
      '2 outfit changes permitted',
      'Stylized cinematic custom grading profiles',
      'Advanced blemish lighting retouching'
    ]
  },
  {
    id: 'couple',
    title: 'Couple Portraits',
    price: 175,
    duration: '1 Hour Session',
    edits: '15 High-End Cinematic Images',
    category: 'couple',
    imageUrl: 'couple_portrait',
    brief: 'Candid and gorgeous stories of love, captured in realistic high-contrast or caricature sketch options.',
    features: [
      'Relaxed, fun natural posing guidance',
      'Sunset matching time slot priority',
      'Includes premium digital filter packs',
      'High-resolution downloads for print and web'
    ]
  },
  {
    id: 'family',
    title: 'Family Summer Sessions',
    price: 210,
    duration: '1.5 Hour Session',
    edits: '20 Premium Fine-Art Images',
    category: 'family',
    imageUrl: 'family_portrait',
    brief: 'A fun, laughing outdoor session to freeze time with family, stylized with ultra-clean modern lighting.',
    features: [
      'Valid for up to 6 family members',
      'Includes a physical 8x10 souvenir print',
      'Euclid coastline outdoor park scenic spots',
      'Custom organic summer color tones'
    ]
  },
  {
    id: 'branding',
    title: 'Personal Branding & Avatar',
    price: 190,
    duration: '1 Hour Session',
    edits: '12 Professional Headshots + 1 Cartoon Avatar',
    category: 'branding',
    imageUrl: 'branding_headshot',
    brief: 'Uniquely elevate your business social media, web portfolio, and LinkedIn with a blend of hyper-real portraits and stylized cartoon avatars.',
    features: [
      'Modern executive portrait lighting setup',
      'Full commercial licensing rights included',
      'High contrast studio background choices',
      'Blemish correction & high-end detail sharpening'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marcus Henderson',
    role: '2026 Grad student',
    quote: 'My graduation portraits turned out absolutely incredible! EMMYSS guided my poses so I didn\'t feel awkward at all. Highly recommend their summer deals.',
    location: 'Euclid, OH',
    rating: 5
  },
  {
    id: 't2',
    name: 'Tasha & Devonte',
    role: 'Couples Shoot',
    quote: 'The sunset field session was hands-down the best experience we\'ve had with a photographer. Pure magic, warm tones, and completely stress-free.',
    location: 'Cleveland, OH',
    rating: 5
  },
  {
    id: 't3',
    name: 'Sarah Jenkins',
    role: 'Creative Entrepreneur',
    quote: 'Clean editing is an understatement! These portraits gave my personal brand a huge premium boost. Professional, high quality, and fast delivery.',
    location: 'Euclid, OH',
    rating: 5
  }
];

export const FAQ = [
  {
    question: "Do you provide location recommendations in Euclid?",
    answer: "Yes! We specialize in stunning outdoor Euclid locations including public beach parks, sun-drenched forests, and urban brick lanes."
  },
  {
    question: "How long does it take to get my edited photos?",
    answer: "You will receive an online proofing gallery within 48 hours to select your favorites. Your final, professional, high-res edits are delivered in 5-7 days!"
  },
  {
    question: "What should I wear for our outdoor session?",
    answer: "Once you book, EMMYSS sends a detailed Summer Style Guide recommending color palettes (neutrals and earth tones look gorgeous) and clothing configurations."
  },
  {
    question: "Can I buy additional edited photos?",
    answer: "Absolutely! Additional professional edits can be added to any package for $15 per photo."
  }
];
