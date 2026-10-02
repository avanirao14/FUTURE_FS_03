import { CollectionItem, LookbookLook, StylingService } from '../types';

export const COLLECTIONS_DATA: CollectionItem[] = [
  {
    id: 'everyday-edit',
    number: '01',
    category: 'Everyday Edit',
    title: 'Everyday Edit',
    subtitle: 'Pure Linen & Breathable Hand-Spun Mulmul',
    description: 'Effortless fluid kurtas, relaxed co-ord sets, and breathable separates designed for mindful daily grace and ease of movement.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Organic Handwoven Cotton & Jamdani Linen',
    silhouette: 'Relaxed A-line kurtas, wide-leg trousers, fluid overlays',
    stylingTip: 'Pair with raw terracotta earrings and open-toe kolhapuri mules for an unstudied daytime look.',
    highlights: ['Small-batch handloom weave', 'Natural vegetable dyes', 'All-day breathable comfort']
  },
  {
    id: 'workwear',
    number: '02',
    category: 'Workwear',
    title: 'Workwear',
    subtitle: 'Structured Tussar Silks & Sharp Tailored Tunics',
    description: 'Clean architectural cuts, notched collar kurtas, and tailored trousers crafted for distinguished professional presence.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Handloom Tussar Silk & Mercerised Cotton',
    silhouette: 'Sharp straight-cut kurtas, pleated cigarette trousers, tailored waistcoats',
    stylingTip: 'Fasten a minimal hammered brass belt over the tussar tunic to define your waistline.',
    highlights: ['Wrinkle-resistant weave', 'Functional hidden pockets', 'Refined executive palette']
  },
  {
    id: 'college-casual',
    number: '03',
    category: 'College & Casual',
    title: 'College & Casual',
    subtitle: 'Lightweight Cottons, Co-Ords & Everyday Fusion',
    description: 'Youthful ease infused with artisanal character. Breezy short kurtis, relaxed palazzos, and denim-friendly handloom layers.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Block-Printed Chanderi & Soft Khadi Cotton',
    silhouette: 'Cropped tunics, tiered tiered midi skirts, fluid shrugs',
    stylingTip: 'Layer an unbuttoned printed ikat shirt over high-waisted linen trousers and canvas sneakers.',
    highlights: ['Effortless mix-and-match', 'Wash-and-wear natural fibers', 'Playful artisanal prints']
  },
  {
    id: 'festive-stories',
    number: '04',
    category: 'Festive Stories',
    title: 'Festive Stories',
    subtitle: 'Luminous Banarasi & Hand-Dyed Chanderi',
    description: 'Rich weaves steeped in celebratory warmth, delicate zari threads, and intricate resham hand-embroidery.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Pure Katan Silk & Tissue Chanderi with Zari Weft',
    silhouette: 'Sculpted angrakhas, tiered lehenga skirts, featherlight dupattas',
    stylingTip: 'Drape the tissue dupatta in an effortless one-shoulder cascade accented with antique temple studs.',
    highlights: ['Varanasi weaver guild collaboration', 'Real silver-gilded borders', 'Weightless festive drape']
  },
  {
    id: 'wedding-edit',
    number: '05',
    category: 'Wedding Edit',
    title: 'Wedding Edit',
    subtitle: 'Heirloom Kadhwa Brocades & Regal Sarees',
    description: 'Curated for brides, bridesmaids, and bridal entourages. Timeless heirloom zari silks and opulent celebratory master drapes.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Pure Katan Brocade & Heavy Organza with Zardozi',
    silhouette: 'Kalidar flared lehengas, authentic 6-yard bridal drapes, sculpted corsetry',
    stylingTip: 'Anchor the pallu with an antique brooch and style with heritage uncut polki jewelry.',
    highlights: ['Hand-drawn heirloom jaal', 'Gold-plated pure silver zari', 'Custom bridal fitting service']
  },
  {
    id: 'contemporary',
    number: '06',
    category: 'Contemporary',
    title: 'Contemporary',
    subtitle: 'Architectural Cuts & Modern Indo-Western Drapes',
    description: 'Where ancient Indian drapery meets modern sculptural tailoring. Pre-pleated concept drapes and asymmetric fluid capes.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Matka Silk, Crêpe de Chine & Structured Raw Tussar',
    silhouette: 'Structured trench-kurtas, draped dhoti trousers, belted tunics',
    stylingTip: 'Fasten a minimal hammered brass belt over the asymmetric silk jacket to redefine your waistline.',
    highlights: ['Modern modular silhouettes', 'Day-to-evening versatility', 'Architectural seamlines']
  },
  {
    id: 'indo-western',
    number: '07',
    category: 'Indo-Western',
    title: 'Indo-Western',
    subtitle: 'Hybrid Silhouettes, Dhoti Pants & Trench-Kurtas',
    description: 'The synthesis of Eastern drapery with Western tailoring: structured trench coats over fluid dhoti trousers and corset tops.',
    image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Raw Silk & Fine Wool-Silk Blends',
    silhouette: 'Dhoti-sarees, tailored pantsuits with cape jackets, corset kurtas',
    stylingTip: 'Style draped cowl trousers with a sharp notch-collar silk blazer and sleek pointed mules.',
    highlights: ['Seamless fusion lines', 'Effortless cocktail dressing', 'Modern tailored structure']
  },
  {
    id: 'occasion-wear',
    number: '08',
    category: 'Occasion Wear',
    title: 'Occasion Wear',
    subtitle: 'Regal Silhouettes for Milestone Chapters',
    description: 'Statuesque raw silk lehengas, hand-embroidered velvet accents, and opulent sarees tailored to leave an indelible impression.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Heavy Mulberry Raw Silk & Hand-Spun Organza',
    silhouette: 'Voluminous flared kalis, sculpted corsetry blouses, heirloom pallus',
    stylingTip: 'Keep hair in an undone textured chignon with fresh jasmine buds to balance the regal embroidery.',
    highlights: ['Hand-drawn floral motifs', 'Zardozi & pearl wirework', 'Custom-measured fittings']
  },
  {
    id: 'evening-edit',
    number: '09',
    category: 'Evening Edit',
    title: 'Evening Edit',
    subtitle: 'Nocturne Silks, Sheer Capes & Metallic Threads',
    description: 'Twilight sophistication in deep midnight, wine, and gilded tones with dramatic backless details and fluid evening capes.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Fluid Crepe Silk, Chiffon & Lurex Wefts',
    silhouette: 'Floor-sweeping capes, pre-draped evening gowns, slip silhouettes',
    stylingTip: 'Complement with dark plum lip lacquer and geometric geometric ear climbers.',
    highlights: ['Lustrous low-light drape', 'Subtle metallic reflections', 'Red-carpet movement']
  },
  {
    id: 'travel-style',
    number: '10',
    category: 'Travel Style',
    title: 'Travel Style',
    subtitle: 'Weightless Voiles, Anti-Crease Linens & Kaftans',
    description: 'Packable luxury designed for seamless transit, destination strolls, and sunny retreats in unrestrictive, fluid cuts.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Organic Bamboo Silk, Enzyme-Washed Linen & Crinkled Cotton',
    silhouette: 'Airy kaftans, wrap tunics, drawstring trousers, reversible overlays',
    stylingTip: 'Layer an airy linen kaftan over wide trousers with woven raffia flats and dark sunglasses.',
    highlights: ['Crinkle-resistant weaving', 'Featherlight carry-on friendly', 'Multi-climate breathability']
  },
  {
    id: 'minimal-wardrobe',
    number: '11',
    category: 'Minimal Wardrobe',
    title: 'Minimal Wardrobe',
    subtitle: 'Monochromatic Capsules & Timeless Geometry',
    description: 'A quiet capsule of 6 interchangeable artisan pieces in ivory, warm ecru, and charcoal for intentional, clutter-free dressing.',
    image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Undyed Ahimsa Silk & Unbleached Handspun Cotton',
    silhouette: 'Modular tunic shirts, straight-leg trousers, column dresses',
    stylingTip: 'Tone-on-tone dressing creates a serene, lengthening silhouette that transcends trends.',
    highlights: ['Zero-waste pattern drafting', '100% natural fiber lifecycle', 'Interchangeable modularity']
  },
  {
    id: 'statement-looks',
    number: '12',
    category: 'Statement Looks',
    title: 'Statement Looks',
    subtitle: 'High-Impact Zardozi & Theatrical Volumes',
    description: 'Unapologetic drama: sweeping flared kalis, sculptural shoulders, and artisanal statement wirework that commands the room.',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1200&q=85',
    fabric: 'Double-Woven Banarasi Silk & Embroidered Organza',
    silhouette: 'Exaggerated shoulders, architectural flounces, tiered trails',
    stylingTip: 'Let the garment be the sole hero; keep hair sleek and jewelry strictly minimal.',
    highlights: ['Couture atelier construction', 'Collector-grade hand embroidery', 'High-fashion editorial presence']
  }
];

export const LOOKBOOK_LOOKS: LookbookLook[] = [
  {
    id: 'look-1',
    title: 'Ivory & Gilded Zari Saree Drape',
    category: 'Festive Luxe',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: 'tall',
    textile: 'Tissue Chanderi Silk with Hand-woven Border',
    concept: 'Ethereal festive radiance captured in soft warm ivory and muted golden undertones.',
    palette: ['#FAF7F2', '#D4AF37', '#732738'],
    stylingNotes: 'Styled with polki uncut gemstone studs and a backless raw silk blouse.'
  },
  {
    id: 'look-2',
    title: 'Heritage Crimson Brocade Lehenga',
    category: 'Occasion',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: 'tall',
    textile: 'Kadhwa Weave Banarasi Brocade & Sheer Dupatta',
    concept: 'A celebratory ode to classic Indian wedding splendor with deep crimson and rich rose accents.',
    palette: ['#6E2332', '#9C4153', '#F2E8DC'],
    stylingNotes: 'Layered with an antique kundan choker and a delicate scalloped organza veil.'
  },
  {
    id: 'look-3',
    title: 'Minimalist Sandstone Linen Co-Ord',
    category: 'Everyday',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: 'square',
    textile: 'Enzyme-Washed Belgian & Bengal Linen',
    concept: 'Effortless daytime confidence for gallery strolls, studio meetings, and warm afternoons.',
    palette: ['#EFEBE4', '#3E3835', '#A69282'],
    stylingNotes: 'Paired with handcrafted leather flat slides and a soft woven raffia tote.'
  },
  {
    id: 'look-4',
    title: 'Sculptural Asymmetric Trench Kurta',
    category: 'Contemporary',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: 'tall',
    textile: 'Structured Handloom Tussar Silk',
    concept: 'Sharp tailoring infused with Indian hand-feel; a conversation starter for modern evenings.',
    palette: ['#282624', '#C9A66B', '#F7F5F0'],
    stylingNotes: 'Worn open over cigarette trousers with stacked brass cuff bracelets.'
  },
  {
    id: 'look-5',
    title: 'Heirloom Emerald & Gota Anarkali',
    category: 'Festive Luxe',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: 'tall',
    textile: 'Pure Chanderi with Hand-Done Gota Patti',
    concept: 'Deep jewel tones invoking royal garden soirees and candlelit sangeet festivities.',
    palette: ['#2D4A3E', '#C2A36B', '#FAF7F2'],
    stylingNotes: 'Accompanied by hand-embroidered potli bag and delicate floral haathphool.'
  },
  {
    id: 'look-6',
    title: 'Monochrome Fluid Silk Evening Cape',
    category: 'Contemporary',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1000&q=85',
    aspectRatio: 'square',
    textile: 'Crepe Silk with Raw Edge Detail',
    concept: 'Fluid drape that shifts dynamically with every stride, expressing quiet power.',
    palette: ['#1C1B1A', '#7A6E65', '#EFECE6'],
    stylingNotes: 'Paired with minimalist geometric earrings and matte dark lips.'
  }
];

export const STYLING_SERVICES: StylingService[] = [
  {
    id: 'signature-edit',
    title: 'The Signature Wardrobe Edit',
    duration: '90 Minutes',
    mode: 'In-Studio & Virtual',
    tagline: 'Refine, realign, and rediscover your daily and evening sartorial identity.',
    description: 'A dedicated one-on-one consultation focused on understanding your personal aesthetic, body architecture, lifestyle rhythm, and current wardrobe gaps.',
    includes: [
      'Comprehensive Silhouette & Proportions Diagnostic',
      'Curated Capsule Palette of 8 harmonious shades',
      '5 Complete Tailored Outfit Blueprints with accessories',
      'Personalized Digital Style Lookbook with styling notes'
    ],
    idealFor: 'Anyone seeking a cohesive, effortless signature look that feels genuinely authentic.'
  },
  {
    id: 'festive-occasion',
    title: 'Festive & Occasion Curation',
    duration: '120 Minutes',
    mode: 'In-Studio & Virtual',
    tagline: 'Bespoke guidance for weddings, celebrations, and life milestone events.',
    description: 'Navigate celebratory dress codes with grace. We coordinate your entire ensemble from heirloom drapes and blouse necklines to heritage jewelry and footwear pairings.',
    includes: [
      'Event & Function Mapping (Haldi, Mehendi, Sangeet, Reception)',
      'Fabric & Drape Customization Advisory',
      'Jewelry & Hair-Ornament Co-Ordination Guide',
      'Day-of Drapery & Fitting Rehearsal Support'
    ],
    idealFor: 'Brides, wedding party guests, and hosts preparing for multi-day celebrations.'
  },
  {
    id: 'capsule-refresh',
    title: 'Atelier Capsule Refresh',
    duration: '60 Minutes',
    mode: 'In-Studio & Virtual',
    tagline: 'Strategic additions to elevate your everyday rotation with artisanal pieces.',
    description: 'A focused, targeted session to inject fresh breath into your wardrobe through 3 to 4 versatile heirloom pieces that mix effortlessly with what you already own.',
    includes: [
      'Current Wardrobe Inventory Review',
      'Strategic Piece Recommendations from LĀYA Collections',
      'Mix-and-Match Multi-Way Styling Demonstration',
      'Textile Care & Longevity Masterclass'
    ],
    idealFor: 'Professionals and creatives seeking intentional, high-impact wardrobe updates.'
  }
];

export const ATELIER_DETAILS = {
  addressBangalore: '14, 12th Main Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
  addressMumbai: 'Bungalow 7, Pali Hill Road, Bandra West, Mumbai, Maharashtra 400050',
  phone: '+91 (080) 4125 9940',
  email: 'concierge@laya-studio.concept',
  hours: 'Tuesday – Sunday: 11:00 AM – 7:30 PM (Mondays Closed for Atelier Weaving & Curation)',
};
