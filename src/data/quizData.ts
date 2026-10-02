import { QuizAnswers, StyleProfileResult } from '../types';

export interface QuizQuestion {
  id: number;
  question: string;
  subtext: string;
  key: keyof QuizAnswers;
  options: {
    label: string;
    description: string;
    subtleHint?: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'What are you dressing for?',
    subtext: 'Select the primary rhythm or upcoming chapter of your lifestyle.',
    key: 'occasion',
    options: [
      {
        label: 'Everyday',
        description: 'Mindful daily ease, relaxed movement, and breathable grace for life on the go.'
      },
      {
        label: 'College / Work',
        description: 'Polished confidence, tailored comfort, and understated professional presence.'
      },
      {
        label: 'Festive',
        description: 'Cultural celebrations, intimate family gatherings, pujas, and heirloom occasions.'
      },
      {
        label: 'Party / Occasion',
        description: 'High-octane soirées, milestone receptions, and memorable evening affairs.'
      }
    ]
  },
  {
    id: 2,
    question: 'Which style feels most like you?',
    subtext: 'Your intuitive aesthetic baseline when you look in the mirror.',
    key: 'styleFeel',
    options: [
      {
        label: 'Minimal',
        description: 'Purity of line, neutral harmonies, and architectural breathing room.'
      },
      {
        label: 'Classic',
        description: 'Refined symmetry, enduring heritage weaves, and timeless poise.'
      },
      {
        label: 'Contemporary',
        description: 'Sculptural asymmetry, modern Indian cuts, and progressive drapery.'
      },
      {
        label: 'Bold',
        description: 'Rich contrast, expressive silhouettes, and unapologetic self-assurance.'
      }
    ]
  },
  {
    id: 3,
    question: 'What do you usually reach for?',
    subtext: 'The silhouette grammar that feels most natural against your skin.',
    key: 'reachFor',
    options: [
      {
        label: 'Indian',
        description: 'Handloom sarees, fluid kurtas, mulmul dupattas, and artisanal textiles.'
      },
      {
        label: 'Western',
        description: 'Tailored trousers, unstructured linen blazers, slip dresses, and relaxed shirts.'
      },
      {
        label: 'Fusion',
        description: 'Indo-western layering, trench-kurtas, draped dhoti pants, and hybrid co-ords.'
      },
      {
        label: 'A little of everything',
        description: 'An eclectic, mood-driven wardrobe that transforms with the occasion.'
      }
    ]
  },
  {
    id: 4,
    question: 'Which colour mood attracts you?',
    subtext: 'The chromatic tones that elevate your spirit and complement your skin.',
    key: 'colourMood',
    options: [
      {
        label: 'Soft Neutrals',
        description: 'Warm ivory, raw ecru, sandstone beige, and pale almond.'
      },
      {
        label: 'Earthy Tones',
        description: 'Terracotta rust, olive sage, turmeric ochre, and warm slate.'
      },
      {
        label: 'Deep & Dramatic',
        description: 'Midnight indigo, vintage wine burgundy, charcoal, and forest emerald.'
      },
      {
        label: 'Bright & Playful',
        description: 'Rani magenta, gulabi pink, festive saffron, and marigold gold.'
      }
    ]
  }
];

// Color palette mappings based on selected color mood
const COLOR_MOOD_MAP: Record<string, { title: string; palette: { name: string; hex: string }[] }> = {
  'Soft Neutrals': {
    title: 'Warm Ivory & Sandstone Cadence',
    palette: [
      { name: 'Pure Ivory', hex: '#FAF7F2' },
      { name: 'Warm Ecru', hex: '#EAE2D5' },
      { name: 'Sandstone', hex: '#C7BBAA' },
      { name: 'Charcoal Mute', hex: '#3E3A36' }
    ]
  },
  'Earthy Tones': {
    title: 'Artisanal Clay & Botanical Hues',
    palette: [
      { name: 'Terracotta', hex: '#A85A48' },
      { name: 'Olive Sage', hex: '#68735C' },
      { name: 'Turmeric Ochre', hex: '#C99342' },
      { name: 'Raw Linen', hex: '#ECE4D4' }
    ]
  },
  'Deep & Dramatic': {
    title: 'Nocturne Wine & Midnight Silk',
    palette: [
      { name: 'Wine Burgundy', hex: '#6E2332' },
      { name: 'Forest Emerald', hex: '#264233' },
      { name: 'Midnight Indigo', hex: '#1D2A44' },
      { name: 'Antique Gold', hex: '#BFA15F' }
    ]
  },
  'Bright & Playful': {
    title: 'Luminous Festive Bloom',
    palette: [
      { name: 'Rani Magenta', hex: '#B82857' },
      { name: 'Saffron Gold', hex: '#E08B27' },
      { name: 'Coral Rose', hex: '#D15858' },
      { name: 'Cream Silk', hex: '#F7F3EA' }
    ]
  }
};

export function calculateStyleProfile(answers: QuizAnswers): StyleProfileResult {
  const { styleFeel = 'Minimal', occasion = 'Everyday', reachFor = 'Indian', colourMood = 'Soft Neutrals' } = answers;

  const moodData = COLOR_MOOD_MAP[colourMood] || COLOR_MOOD_MAP['Soft Neutrals'];

  // Base profile determinations based on Question 2 with nuance from Questions 1, 3, 4
  if (styleFeel === 'Minimal') {
    return {
      id: 'modern-minimalist',
      name: 'THE MODERN MINIMALIST',
      subtitle: 'Architectural Ease · Monochromatic Harmony · Thoughtful Breaths',
      description: 'Clean lines, effortless silhouettes and understated details define your style.',
      styleDirection: `Tailored around quiet luxury and textural purity. Designed specifically for your ${occasion.toLowerCase()} wardrobe, honoring your preference for ${reachFor.toLowerCase()} silhouettes. Your look thrives when the fabric itself is the protagonist—unbleached mulmul, enzyme-washed linen, and crisp tussar that fall in uncluttered, fluid lines.`,
      personalizedNote: `Our stylists recommend embracing a serene ${colourMood.toLowerCase()} palette, pairing subtle tone-on-tone textures with minimal hammered brass or matte silver accents.`,
      colourMoodTitle: moodData.title,
      colourPalette: moodData.palette,
      silhouetteFocus: 'Unstructured A-line kurtas, sculpted straight trousers, and featherlight raw-edge stoles',
      idealFabrics: ['Organic Bengal Mulmul', 'Handloom Linen', 'Matka Silk', 'Kora Cotton'],
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
      outfitIdeas: [
        {
          title: 'The Monochromatic Fluid Co-Ord',
          description: reachFor === 'Western' || reachFor === 'Fusion'
            ? 'A relaxed wide-leg linen pant paired with a notched tunic top and open-back leather slides.'
            : 'A clean A-line mulmul kurta with cigarette trousers and a whisper-thin tonal dupatta.',
          drapeTip: 'Keep accessories architectural—a single geometric cuff or thin horn-rimmed frame.'
        },
        {
          title: 'The Sculpted Asymmetric Overlay',
          description: 'A structured raw tussar waistcoat layered effortlessly over an ankle-length silk shift tunic.',
          drapeTip: 'Fasten only the top button to create a fluid, lengthening vertical drape as you walk.'
        },
        {
          title: 'The Unstudied Minimalist Drape',
          description: 'A tissue linen saree in muted tones worn with a boat-neck sleeveless raw silk blouse.',
          drapeTip: 'Allow the pallu to fall in natural, un-pleated folds over your forearm for effortless ease.'
        }
      ]
    };
  }

  if (styleFeel === 'Classic') {
    return {
      id: 'timeless-classic',
      name: 'THE TIMELESS CLASSIC',
      subtitle: 'Heirloom Heritage · Pristine Symmetry · Regal Simplicity',
      description: 'Elegant, refined and effortlessly polished. You prefer pieces that never feel outdated.',
      styleDirection: `Steeped in timeless Indian elegance and impeccably balanced proportions. Formulated for your ${occasion.toLowerCase()} moments with an affinity for ${reachFor.toLowerCase()} apparel. You appreciate the weight of history in a weave—the steady glint of fine zari, authentic Banarasi kadhwa motifs, and blouses cut with timeless grace that endure through every chapter.`,
      personalizedNote: `Anchored in your chosen ${colourMood.toLowerCase()} spectrum, this profile blends regal undertones with heirloom jewelry to create an aura of dignified, effortless poise.`,
      colourMoodTitle: moodData.title,
      colourPalette: moodData.palette,
      silhouetteFocus: 'Flared kalidar kurtas, tailored angrakhas, and authentic 6-yard heritage drapes',
      idealFabrics: ['Pure Katan Silk', 'Tissue Chanderi', 'Maheshwari Silk-Cotton', 'Real Zari Brocade'],
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      outfitIdeas: [
        {
          title: 'The Heirloom Banarasi Drape',
          description: 'A pure Katan silk saree woven with traditional floral jaal, styled with a high-neck elbow-sleeve blouse.',
          drapeTip: 'Secure the pleats crisply and drape the pallu across the shoulder with a heritage brooch.'
        },
        {
          title: 'The Royal Chanderi Angrakha',
          description: 'A side-tying flared angrakha in tissue Chanderi with delicate gota patti borders and tailored churidar.',
          drapeTip: 'Complement with antique polki ear studs and fresh jasmine gajra in an understated updo.'
        },
        {
          title: 'The Tailored Silk Kurta Ensemble',
          description: reachFor === 'Western' || reachFor === 'Fusion'
            ? 'A tailored silk button-down kurta over pleated ivory trousers with heritage leather mojaris.'
            : 'A jewel-toned raw silk straight kurta accompanied by an organza dupatta with scalloped borders.',
          drapeTip: 'Layer with a classic pendant necklace that rests gracefully at the collarbone.'
        }
      ]
    };
  }

  if (styleFeel === 'Contemporary') {
    return {
      id: 'contemporary-muse',
      name: 'THE CONTEMPORARY MUSE',
      subtitle: 'Progressive Silhouettes · Cultural Synthesis · Modern Dynamism',
      description: 'You enjoy modern silhouettes, thoughtful details and a fresh approach to fashion.',
      styleDirection: `A masterclass in modern Indian hybridity. Sculpted around your ${occasion.toLowerCase()} cadence and your preference for ${reachFor.toLowerCase()} dress codes. You re-interpret tradition on your own terms—pairing draped dhoti skirts with sharp jackets, wearing pre-pleated concept drapes with structured waistcoats, and curating pieces that transition effortlessly from day to twilight.`,
      personalizedNote: `Harmonized with your ${colourMood.toLowerCase()} affinity, our stylists recommend geometric balance, layered asymmetry, and modular pieces that can be styled at least three different ways.`,
      colourMoodTitle: moodData.title,
      colourPalette: moodData.palette,
      silhouetteFocus: 'Pre-pleated concept sarees, trench-kurtas, draped dhoti co-ords, and structured capes',
      idealFabrics: ['Crepe de Chine', 'Matka Silk', 'Handloom Tussar', 'Fluid Modal Satin'],
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      outfitIdeas: [
        {
          title: 'The Architectural Trench-Kurta',
          description: 'A structured tussar jacket-kurta with notched lapels worn over cigarette pants and minimal mule heels.',
          drapeTip: 'Cinched lightly with a hand-hammered leather and brass belt to accentuate the waistline.'
        },
        {
          title: 'The Pre-Pleated Concept Drape',
          description: 'A ready-to-wear pre-draped saree in fluid crepe with a tailored waistcoat top instead of a conventional blouse.',
          drapeTip: 'Let the sculptural pallu trail freely from one shoulder, kept in place with an internal snap.'
        },
        {
          title: 'The Draped Dhoti & Cape Co-Ord',
          description: 'Fluid pleated dhoti trousers paired with a cropped bralette and a diaphanous silk-organza cape.',
          drapeTip: 'Style with modern brushed metallic ear cuffs and an architectural acrylic or metal clutch.'
        }
      ]
    };
  }

  // Default to Bold Expression
  return {
    id: 'bold-expression',
    name: 'THE BOLD EXPRESSION',
    subtitle: 'Vibrant Magnetism · Confident Volumes · Unapologetic Grandeur',
    description: 'You love making an impression through colour, statement pieces and confident combinations.',
    styleDirection: `An exhilarating celebration of presence, saturation, and artisanal grandeur. Tailored for your ${occasion.toLowerCase()} plans with a penchant for ${reachFor.toLowerCase()} combinations. You wear fashion as an exhilarating proclamation—embracing jewel tones, dramatic kali volumes, and hand-embroidered textures that radiate luminous energy.`,
    personalizedNote: `Infused with your chosen ${colourMood.toLowerCase()} vibrancy, our recommendation centers on contrasting textures—raw silk against gossamer tissue, paired with statement artisanal jewelry that commands the room.`,
    colourMoodTitle: moodData.title,
    colourPalette: moodData.palette,
    silhouetteFocus: 'Voluminous tiered lehengas, dramatic floor-length capes, and sculpted statement drapes',
    idealFabrics: ['Heavy Raw Silk', 'Banarasi Brocade', 'Handwoven Velvet', 'Gilded Tissue Organza'],
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
    outfitIdeas: [
      {
        title: 'The Regal Statement Brocade Lehenga',
        description: 'A dramatic flared lehenga in rich brocade with zardozi wirework, paired with a sculpted sweetheart blouse and sheer dupatta.',
        drapeTip: 'Drape the dupatta in a sweeping regal cascade pinned at the shoulder and draped over the wrist.'
      },
      {
        title: 'The Jewel-Tone Colour-Blocked Ensemble',
        description: 'A saturated silk saree contrasting rich ruby with deep emerald borders, worn with an embroidered statement jacket.',
        drapeTip: 'Wear with a dramatic kundan choker and bold dark lip to complete the celebratory statement.'
      },
      {
        title: 'The Operatic Floor-Length Cape Set',
        description: reachFor === 'Western' || reachFor === 'Fusion'
          ? 'A dramatic floor-sweeping silk cape over tailored palazzo trousers and an embroidered corset top.'
          : 'A dramatic cape jacket worn over a gathered anarkali gown with rich antique zardozi shoulders.',
        drapeTip: 'Keep footwear towering and sleek, allowing the cape hem to float dramatically as you step.'
      }
    ]
  };
}
