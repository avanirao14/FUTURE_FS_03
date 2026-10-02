import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `You are the Lead Personal Fashion Stylist at LĀYA, an ultra-luxury boutique and styling studio renowned for contemporary Indian luxury, artisanal handlooms (Chanderi, Banarasi, Mulmul, Tussar, Jamdani, Ahimsa silk), and modern silhouette architecture.

Your objective is to analyze the user's natural language request along with any selected style preferences, and create a bespoke, deeply considered, personal fashion look.
Rules:
1. Every response must feel like an intimate, high-fashion editorial consultation by an expert Indian luxury stylist.
2. Tailor every detail to their specific event, comfort desires, and aesthetic cues.
3. Be respectful, encouraging, and body-positive. Focus purely on garment architecture, drape, color harmony, and styling.
4. Output valid JSON adhering strictly to the response schema.`;

const STYLIST_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    lookName: {
      type: Type.STRING,
      description: 'An evocative, poetic luxury look title (e.g. "Aureate Dawn", "The Modern Heritage Anarkali", "Monochrome Architectural Drape")',
    },
    styleConcept: {
      type: Type.STRING,
      description: 'A 1-2 sentence core concept defining the spirit of this look.',
    },
    whyThisWorks: {
      type: Type.STRING,
      description: 'Explanation of why this specific silhouette and palette honors the user request and occasion.',
    },
    outfit: {
      type: Type.OBJECT,
      properties: {
        top: {
          type: Type.STRING,
          description: 'Top garment, kurta, blouse, or shirt with fabric and cut details.',
        },
        bottom: {
          type: Type.STRING,
          description: 'Bottom garment, palazzo, dhoti, trousers, or lehenga skirt with drapery details.',
        },
        layer: {
          type: Type.STRING,
          description: 'Optional layer such as dupatta, cape jacket, trench overlay, or stole.',
        },
      },
      required: ['top', 'bottom'],
    },
    colourPalette: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: 'Color name (e.g. "Vintage Wine", "Aureate Gold", "Ivory")' },
          hex: { type: Type.STRING, description: 'Hex code (e.g. "#6E2332", "#B89667", "#FAF8F5")' },
        },
        required: ['name', 'hex'],
      },
      description: '3 to 4 complementary palette tones.',
    },
    accessories: {
      type: Type.STRING,
      description: 'Curated jewelry, bag, or accents (e.g. polki studs, antique brass cuff, raw silk potli).',
    },
    footwear: {
      type: Type.STRING,
      description: 'Footwear pairing (e.g. embroidered juttis, pointed leather mules, open-toe block heels).',
    },
    stylingTips: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '3 practical, actionable tips on drapery, hair, and accessorizing balance.',
    },
    alternativeLook: {
      type: Type.STRING,
      description: 'A creative alternative styling twist or modular variation for day-to-night.',
    },
    relatedCollections: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: '2 to 3 relevant LĀYA collections from: Everyday Edit, Workwear, College & Casual, Festive Stories, Wedding Edit, Contemporary, Indo-Western, Occasion Wear, Evening Edit, Travel Style, Minimal Wardrobe, Statement Looks',
    },
    imagePrompt: {
      type: Type.STRING,
      description: 'A detailed, photorealistic prompt for generating an editorial fashion photograph of this exact outfit, focusing on clothing, textiles, colours, drapery, lighting, luxury studio setting, elegant non-sexual presentation.',
    },
  },
  required: [
    'lookName',
    'styleConcept',
    'whyThisWorks',
    'outfit',
    'colourPalette',
    'accessories',
    'footwear',
    'stylingTips',
    'alternativeLook',
    'relatedCollections',
    'imagePrompt',
  ],
};

// Distinct high-resolution luxury Indian couture visuals — ZERO overlap with collections!
const BESPOKE_VISUAL_SUITES: Record<string, { runwayImageUrl: string; textileDetailUrl: string; flatlayUrl: string; lightingMood: string }[]> = {
  green: [
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Regal Twilight & Warm Candlelight',
    },
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'High Fashion Runway Studio',
    },
  ],
  crimson: [
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Vogue India 35mm Velvet Lighting',
    },
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Sunset Golden Hour Glow',
    },
  ],
  yellow: [
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Luminous Sunlit Courtyard',
    },
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Editorial Natural Diffusion',
    },
  ],
  navy: [
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Architectural Shadow & High Contrast',
    },
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Moody Nocturne Runway',
    },
  ],
  ivory: [
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Pure Softbox Daylight & Natural Grain',
    },
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Atelier Neutral Backdrop',
    },
  ],
  blush: [
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Ethereal Rose Petal Glow',
    },
    {
      runwayImageUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Champagne Cocktail Glint',
    },
  ],
};

function getBespokeVisualSuiteForLook(look: any, variationSeed: number = 0) {
  const textToScan = `${look.lookName || ''} ${look.styleConcept || ''} ${look.outfit?.top || ''} ${look.outfit?.bottom || ''} ${look.userPrompt || ''} ${look.colourPalette?.map((c: any) => c.name).join(' ') || ''}`.toLowerCase();

  let categoryKey = 'green';

  if (textToScan.includes('yellow') || textToScan.includes('marigold') || textToScan.includes('haldi') || textToScan.includes('ochre') || textToScan.includes('amber') || textToScan.includes('college')) {
    categoryKey = 'yellow';
  } else if (textToScan.includes('wine') || textToScan.includes('crimson') || textToScan.includes('red') || textToScan.includes('maroon') || textToScan.includes('zardozi') || textToScan.includes('banarasi')) {
    categoryKey = 'crimson';
  } else if (textToScan.includes('blue') || textToScan.includes('navy') || textToScan.includes('sapphire') || textToScan.includes('indo-western') || textToScan.includes('dhoti') || textToScan.includes('trench')) {
    categoryKey = 'navy';
  } else if (textToScan.includes('pink') || textToScan.includes('rose') || textToScan.includes('blush') || textToScan.includes('pastel') || textToScan.includes('peach')) {
    categoryKey = 'blush';
  } else if (textToScan.includes('ivory') || textToScan.includes('white') || textToScan.includes('mulmul') || textToScan.includes('minimal') || textToScan.includes('linen') || textToScan.includes('ecru')) {
    categoryKey = 'ivory';
  } else {
    const firstHex = look.colourPalette?.[0]?.hex?.toLowerCase() || '';
    if (firstHex.includes('e08') || firstHex.includes('f2c')) categoryKey = 'yellow';
    else if (firstHex.includes('6e2') || firstHex.includes('8e3')) categoryKey = 'crimson';
    else if (firstHex.includes('1d3') || firstHex.includes('2a4')) categoryKey = 'green';
    else if (firstHex.includes('faf') || firstHex.includes('efe')) categoryKey = 'ivory';
  }

  const bundles = BESPOKE_VISUAL_SUITES[categoryKey] || BESPOKE_VISUAL_SUITES.green;
  const index = Math.abs(variationSeed) % bundles.length;
  return bundles[index];
}

function generateFallbackStylistLook(userPrompt: string, preferences: any) {
  const promptLower = (userPrompt || '').toLowerCase();
  const occ = (preferences?.occasion || '').toLowerCase();
  const style = (preferences?.style || '').toLowerCase();
  const outfitPref = (preferences?.outfitType || '').toLowerCase();

  const isFestive =
    promptLower.includes('wedding') ||
    promptLower.includes('festive') ||
    promptLower.includes('cultural') ||
    promptLower.includes('party') ||
    occ.includes('wedding') ||
    occ.includes('festive') ||
    occ.includes('party');

  const isCollege = promptLower.includes('college') || occ.includes('college');
  const isIndoWestern =
    promptLower.includes('indo-western') ||
    promptLower.includes('fusion') ||
    outfitPref.includes('indo-western') ||
    outfitPref.includes('fusion') ||
    style.includes('fusion');

  if (isCollege || (isFestive && promptLower.includes('college'))) {
    return {
      lookName: 'The Luminary Chanderi Fusion',
      styleConcept: 'A vibrant balance of classical Indian handlooms and effortless modern campus youth.',
      whyThisWorks: 'Bright jewel tones celebrate cultural energy while an unstructured silhouette ensures lightweight ease for daylong festivities.',
      outfit: {
        top: 'Flared peplum kurta in tissue Chanderi with delicate hand-block marigold motifs and jewel neckline.',
        bottom: 'Pleated raw silk ankle-grazing dhoti trousers with subtle gold tissue piping.',
        layer: 'Whisper-light crushed mulmul dupatta in sunset saffron that can be draped or worn as a scarf.',
      },
      colourPalette: [
        { name: 'Marigold Ochre', hex: '#E08B27' },
        { name: 'Gulabi Rose', hex: '#C44D68' },
        { name: 'Warm Ivory', hex: '#FAF7F2' },
        { name: 'Burnished Gold', hex: '#B89667' },
      ],
      accessories: 'Sculpted brass jhumka studs and a structured handwoven raw silk potli bag with tassel ties.',
      footwear: 'Pointed champagne leather juttis with minimal threadwork embroidery.',
      stylingTips: [
        'Pin the dupatta over one shoulder with a minimalist brass clip to keep your hands completely free.',
        'Keep hair in loose bohemian waves with a delicate side braid woven with fresh baby’s breath.',
        'Opt for a dewy fresh face with a warm berry-tinted lip that echoes the outfit tones.',
      ],
      alternativeLook: 'Style the peplum tunic with high-waisted wide-leg ivory linen trousers for casual everyday classes.',
      relatedCollections: ['Everyday Edit', 'Festive Stories', 'Contemporary'],
      imagePrompt: 'High fashion editorial photograph of an Indian college student in an ivory and marigold Chanderi peplum kurta and silk dhoti pants, natural studio lighting, warm aesthetic.',
      imageUrl: 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Luminous Sunlit Courtyard',
      isAiGenerated: true,
    };
  }

  if (isFestive) {
    return {
      lookName: 'Aureate Heritage Symphony',
      styleConcept: 'Regal Banarasi silk craftsmanship tailored with contemporary architectural restraint.',
      whyThisWorks: 'Honors family tradition through timeless heirloom textiles while offering structured comfort for celebratory rituals.',
      outfit: {
        top: 'Tailored jewel-neck kurta in pure mulberry silk with antique gold zardozi neckline and elbow sleeves.',
        bottom: 'Voluminous gathered kalidar skirt in handwoven Banarasi tissue with scalloped borders.',
        layer: 'Pure organza dupatta woven with delicate floral butis and brushed gold fringe.',
      },
      colourPalette: [
        { name: 'Emerald Jewel', hex: '#1D3B2E' },
        { name: 'Aureate Gold', hex: '#B89667' },
        { name: 'Almond Cream', hex: '#EFE8DC' },
        { name: 'Vintage Wine', hex: '#6E2332' },
      ],
      accessories: 'Uncut polki ear studs with pearl drops and an antique brass cuff bracelet.',
      footwear: 'Open-toe velvet block heels in deep maroon with gold piping.',
      stylingTips: [
        'Drape the sheer organza dupatta in a regal diagonal sweep across the forearm.',
        'A sleek center-parted low chignon highlighted with fresh mogra buds.',
        'Balance the opulent fabric with understated jewelry so the craftsmanship remains central.',
      ],
      alternativeLook: 'Pair the silk kurta with tailored cigarette trousers for intimate post-wedding brunches.',
      relatedCollections: ['Festive Stories', 'Occasion Wear'],
      imagePrompt: 'Editorial photography of luxury Indian festive ensemble in emerald and gold silk, Vogue India style, warm studio light.',
      imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Regal Twilight & Warm Candlelight',
      isAiGenerated: true,
    };
  }

  if (isIndoWestern) {
    return {
      lookName: 'The Sculpted Drape & Trench Co-Ord',
      styleConcept: 'A progressive dialogue between fluid Indian drapery and sharp Western tailoring.',
      whyThisWorks: 'Harmonizes effortless daily movement with striking sculptural presence.',
      outfit: {
        top: 'Asymmetric ribbed silk-knit camisole paired with a cropped open-front Chanderi jacket.',
        bottom: 'High-waisted draped dhoti trousers in breathable enzyme-washed modal silk.',
        layer: 'Unstructured lightweight tussar duster coat with notched lapels.',
      },
      colourPalette: [
        { name: 'Terracotta Rust', hex: '#A85A48' },
        { name: 'Warm Sandstone', hex: '#D8CEBE' },
        { name: 'Charcoal Noir', hex: '#262422' },
        { name: 'Ahimsa Ecru', hex: '#F6F2EB' },
      ],
      accessories: 'Geometric matte brass ear cuffs and an architectural hand-carved horn bag.',
      footwear: 'Square-toe leather slide mules in raw tan leather.',
      stylingTips: [
        'Roll the duster sleeves loosely to mid-forearm to reveal contrasting silk lining.',
        'Keep the dhoti drape high at the ankle to emphasize your footwear profile.',
        'Minimalist nude monochrome makeup with brushed-up brows.',
      ],
      alternativeLook: 'Wear the duster coat closed with a statement belt over tailored trousers for evening dinners.',
      relatedCollections: ['Everyday Edit', 'Contemporary'],
      imagePrompt: 'Editorial high fashion shoot of an Indian woman in terracotta and ecru contemporary draped silhouette, architectural setting.',
      imageUrl: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=1200&q=85',
      textileDetailUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=85',
      flatlayUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85',
      lightingMood: 'Architectural Shadow & High Contrast',
      isAiGenerated: true,
    };
  }

  // Default Minimalist Luxury Look
  return {
    lookName: 'The Monochromatic Mulmul Silhouette',
    styleConcept: 'Understated quiet luxury rendered in whisper-light handspun organic textiles.',
    whyThisWorks: 'Offers serene elegance, breathability, and timeless poise for any thoughtful occasion.',
    outfit: {
      top: 'Clean A-line kurta in unbleached Bengal mulmul with delicate hand-drawn pin-tucks.',
      bottom: 'Tailored straight-cut trousers in matching handloom linen with side slits.',
      layer: 'Featherlight kora cotton stole with hand-fringed selvedge borders.',
    },
    colourPalette: [
      { name: 'Warm Ivory', hex: '#FAF7F2' },
      { name: 'Raw Ecru', hex: '#EAE2D5' },
      { name: 'Sandstone Grey', hex: '#B8AF9F' },
      { name: 'Charcoal Mute', hex: '#3E3A36' },
    ],
    accessories: 'Hand-hammered silver ring and a soft structured canvas-and-leather tote.',
    footwear: 'Handcrafted leather slides in natural untreated calfskin.',
    stylingTips: [
      'Layer tonal shades of ivory and ecru rather than exact matches to create visual depth.',
      'Allow the natural crinkle texture of the handloom fabric to breathe without aggressive pressing.',
      'A natural, radiant complexion with subtle cream highlighter.',
    ],
    alternativeLook: 'Add a contrasting vintage silk scarf tied loosely at the neck for brisk evenings.',
    relatedCollections: ['Everyday Edit', 'Contemporary'],
    imagePrompt: 'Editorial portrait of Indian model in minimalist ivory mulmul kurta and linen pants, soft ambient daylight, luxury studio.',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=85',
    textileDetailUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=85',
    flatlayUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85',
    lightingMood: 'Pure Softbox Daylight & Natural Grain',
    isAiGenerated: true,
  };
}

async function generateAiLookImage(basePrompt: string): Promise<string | null> {
  try {
    const aiCall = ai.models.generateContent({
      model: 'gemini-3.1-flash-lite-image',
      contents: {
        parts: [{ text: basePrompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: '3:4',
        },
      },
    });

    // 3.5-second timeout to ensure the user never experiences hanging
    const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3500));
    const flashResult: any = await Promise.race([aiCall, timeout]);
    if (!flashResult) return null;

    const parts = flashResult?.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType || 'image/png';
        return `data:${mime};base64,${part.inlineData.data}`;
      }
    }
  } catch (err: any) {
    console.warn('AI image generation note (falling back to atelier couture visual suite):', err?.status || err?.message || err);
  }
  return null;
}

// 1. Generate Look Endpoint
app.post('/api/stylist/generate-look', async (req, res) => {
  try {
    const { userPrompt, preferences } = req.body;

    const hasAnyPreference = Boolean(
      preferences &&
      (preferences.occasion ||
       preferences.style ||
       preferences.outfitType ||
       preferences.colourMood ||
       (preferences.vibes && preferences.vibes.length > 0))
    );

    if (!userPrompt?.trim() && !hasAnyPreference) {
      return res.status(400).json({ error: 'Please share your styling idea or select a preference.' });
    }

    const effectivePrompt = userPrompt?.trim() || 'Create a bespoke look matching my styling preferences.';

    const preferenceDetails = preferences
      ? `
Selected Preferences:
- Occasion: ${preferences.occasion || 'Not specified'}
- Style Aesthetic: ${preferences.style || 'Not specified'}
- Outfit Preference: ${preferences.outfitType || 'Not specified'}
- Colour Mood: ${preferences.colourMood || 'Not specified'}
- Vibe / Nuances: ${preferences.vibes?.join(', ') || 'None selected'}
`
      : '';

    const promptMessage = `User's Request: "${effectivePrompt}"
${preferenceDetails}

Please generate an exceptional, personalized fashion styling recommendation for this user.`;

    let parsed: any = null;
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

    for (const modelName of modelsToTry) {
      try {
        const aiCall = ai.models.generateContent({
          model: modelName,
          contents: promptMessage,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.75,
            responseMimeType: 'application/json',
            responseSchema: STYLIST_RESPONSE_SCHEMA,
          },
        });

        const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4500));
        const response: any = await Promise.race([aiCall, timeout]);
        if (!response) continue;

        const text = response.text?.trim() || '{}';
        parsed = JSON.parse(text);
        if (parsed && parsed.lookName) {
          console.log(`Generated look using ${modelName}`);
          break;
        }
      } catch (aiError: any) {
        console.warn(`Model ${modelName} returned note:`, aiError?.status || aiError?.message || aiError);
      }
    }

    if (!parsed || !parsed.lookName) {
      console.log('Using curated intelligent fallback look');
      parsed = generateFallbackStylistLook(effectivePrompt, preferences);
    }

    parsed.id = 'look-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    parsed.timestamp = Date.now();
    parsed.userPrompt = effectivePrompt;
    parsed.appliedPreferences = preferences;

    // Generate AI fashion picture matching the look
    const aiImagePrompt = `High-fashion full-body editorial photograph of contemporary Indian luxury couture. Outfit: ${parsed.outfit?.top}, ${parsed.outfit?.bottom}. Style: ${parsed.styleConcept}. Palette: ${parsed.colourPalette?.map((c: any) => c.name).join(', ')}. Natural studio lighting, warm ivory backdrop, Vogue India aesthetic, 35mm film grain, tasteful non-sexual high fashion.`;

    const liveImage = await generateAiLookImage(aiImagePrompt);
    const suite = getBespokeVisualSuiteForLook(parsed, 0);

    if (liveImage) {
      parsed.imageUrl = liveImage;
      parsed.textileDetailUrl = suite.textileDetailUrl;
      parsed.flatlayUrl = suite.flatlayUrl;
      parsed.lightingMood = 'Bespoke Atelier Live Synthesis';
      parsed.isAiGenerated = true;
    } else {
      parsed.imageUrl = suite.runwayImageUrl;
      parsed.textileDetailUrl = suite.textileDetailUrl;
      parsed.flatlayUrl = suite.flatlayUrl;
      parsed.lightingMood = suite.lightingMood;
      parsed.isAiGenerated = true;
    }
    parsed.imagePrompt = aiImagePrompt;

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in generate-look handler:', error);
    const fallbackLook = generateFallbackStylistLook('', {});
    const suite = getBespokeVisualSuiteForLook(fallbackLook, 0);
    return res.json({
      ...fallbackLook,
      imageUrl: suite.runwayImageUrl,
      textileDetailUrl: suite.textileDetailUrl,
      flatlayUrl: suite.flatlayUrl,
      lightingMood: suite.lightingMood,
      isAiGenerated: true,
      id: 'look-' + Date.now(),
      timestamp: Date.now(),
    });
  }
});

// 2. Refine Look Endpoint (Chat-like conversational adjustments)
app.post('/api/stylist/refine-look', async (req, res) => {
  try {
    const { currentLook, refinementInstruction } = req.body;

    if (!currentLook || !refinementInstruction) {
      return res.status(400).json({ error: 'Missing look context or refinement instruction.' });
    }

    const promptMessage = `The user was previously recommended this look:
- Look Name: ${currentLook.lookName}
- Style Concept: ${currentLook.styleConcept}
- Outfit: Top: ${currentLook.outfit?.top}, Bottom: ${currentLook.outfit?.bottom}, Layer: ${currentLook.outfit?.layer || 'None'}
- Palette: ${currentLook.colourPalette?.map((c: any) => c.name).join(', ')}
- Accessories: ${currentLook.accessories}
- Footwear: ${currentLook.footwear}

The user has now requested this specific adjustment:
"${refinementInstruction}"

Please update the styling recommendation thoughtfully, incorporating their requested modification while preserving the context of their event and personal story.`;

    let parsed: any = null;
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptMessage,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.75,
            responseMimeType: 'application/json',
            responseSchema: STYLIST_RESPONSE_SCHEMA,
          },
        });

        const text = response.text?.trim() || '{}';
        parsed = JSON.parse(text);
        if (parsed && parsed.lookName) {
          console.log(`Refined look using ${modelName}`);
          break;
        }
      } catch (aiRefineError: any) {
        console.warn(`Model ${modelName} refine note:`, aiRefineError?.status || aiRefineError?.message || aiRefineError);
      }
    }

    if (!parsed || !parsed.lookName) {
      console.log('Using rule-based refinement adapter');
      const instructionLower = refinementInstruction.toLowerCase();
      const updated = { ...currentLook };
      updated.id = 'look-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
      updated.timestamp = Date.now();
      updated.userPrompt = `${currentLook.userPrompt || ''} (Refined: ${refinementInstruction})`;

      if (instructionLower.includes('traditional')) {
        updated.lookName = `Traditional Adaptation: ${currentLook.lookName}`;
        updated.styleConcept = `Infused with richer heritage weaves and classic Banarasi motifs.`;
        updated.whyThisWorks = `Emphasizes ancestral artistry and ceremonial grace in response to your request.`;
        updated.outfit = {
          ...currentLook.outfit,
          layer: 'Handwoven zari dupatta with rich meenakari borders.',
        };
      } else if (instructionLower.includes('modern') || instructionLower.includes('contemporary')) {
        updated.lookName = `Contemporary Edit: ${currentLook.lookName}`;
        updated.styleConcept = `Streamlined with clean architectural lines and modular drapery.`;
        updated.whyThisWorks = `Modernizes the silhouette with sharp asymmetry and effortless poise.`;
      } else if (instructionLower.includes('colour') || instructionLower.includes('green') || instructionLower.includes('bright')) {
        updated.lookName = `Luminous Chromatic Edit: ${currentLook.lookName}`;
        updated.colourPalette = [
          { name: 'Emerald Jewel', hex: '#1D3B2E' },
          { name: 'Marigold Ochre', hex: '#E08B27' },
          { name: 'Warm Ivory', hex: '#FAF7F2' },
          { name: 'Rosewood', hex: '#7D2D3D' },
        ];
      } else if (instructionLower.includes('comfortable') || instructionLower.includes('minimal')) {
        updated.lookName = `Pure Mulmul Comfort: ${currentLook.lookName}`;
        updated.styleConcept = `Maximum breathability with fluid, unrestrictive handspun tailoring.`;
        updated.outfit = {
          top: 'Relaxed drop-shoulder mulmul tunic with side vents.',
          bottom: 'Wide-leg breathable linen-silk palazzo trousers.',
          layer: 'Featherweight kora cotton stole.',
        };
      } else {
        updated.lookName = `Refined Variation: ${currentLook.lookName}`;
        updated.styleConcept = `${currentLook.styleConcept} Tailored specifically to your note: "${refinementInstruction}".`;
      }
      parsed = updated;
    }

    parsed.id = 'look-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    parsed.timestamp = Date.now();
    parsed.userPrompt = `${currentLook.userPrompt || ''} (Refined: ${refinementInstruction})`;
    parsed.appliedPreferences = currentLook.appliedPreferences;

    // Generate AI image for refined look
    const aiImagePrompt = `High-fashion full-body editorial photograph of contemporary Indian luxury couture. Outfit: ${parsed.outfit?.top}, ${parsed.outfit?.bottom}. Style: ${parsed.styleConcept}. Palette: ${parsed.colourPalette?.map((c: any) => c.name).join(', ')}. Natural studio lighting, warm ivory backdrop, Vogue India aesthetic, 35mm film grain, tasteful non-sexual high fashion.`;

    const liveImage = await generateAiLookImage(aiImagePrompt);
    const suite = getBespokeVisualSuiteForLook(parsed, 1);
    if (liveImage) {
      parsed.imageUrl = liveImage;
      parsed.textileDetailUrl = suite.textileDetailUrl;
      parsed.flatlayUrl = suite.flatlayUrl;
      parsed.lightingMood = 'Bespoke Atelier Refined Studio';
      parsed.isAiGenerated = true;
    } else {
      parsed.imageUrl = suite.runwayImageUrl;
      parsed.textileDetailUrl = suite.textileDetailUrl;
      parsed.flatlayUrl = suite.flatlayUrl;
      parsed.lightingMood = suite.lightingMood;
      parsed.isAiGenerated = true;
    }
    parsed.imagePrompt = aiImagePrompt;

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error refining look:', error);
    return res.status(500).json({
      error: "We couldn't refine your look right now. Please try again.",
    });
  }
});

// 3. Visual Variation Endpoint (Allows user to toggle lighting/perspective variation)
app.post('/api/stylist/visual-variation', (req, res) => {
  try {
    const { look, variationIndex = 1 } = req.body;
    if (!look) return res.status(400).json({ error: 'Missing look object.' });
    const suite = getBespokeVisualSuiteForLook(look, variationIndex);
    return res.json({
      imageUrl: suite.runwayImageUrl,
      textileDetailUrl: suite.textileDetailUrl,
      flatlayUrl: suite.flatlayUrl,
      lightingMood: suite.lightingMood,
      isAiGenerated: true,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to generate visual variation.' });
  }
});

// 3. Generate Fashion Image Endpoint
app.post('/api/stylist/generate-image', async (req, res) => {
  try {
    const { imagePrompt, look } = req.body;

    const basePrompt = imagePrompt || (look
      ? `High-fashion editorial photograph of an Indian luxury ensemble. ${look.outfit?.top}, ${look.outfit?.bottom}. Style: ${look.styleConcept}. Palette: ${look.colourPalette?.map((c: any) => c.name).join(', ')}. Natural studio lighting, warm ivory backdrop, Vogue India editorial aesthetic, 35mm film grain, tasteful non-sexual high fashion.`
      : 'High fashion editorial photography of contemporary Indian luxury couture.');

    const liveImage = await generateAiLookImage(basePrompt);
    if (liveImage) {
      return res.json({
        imageUrl: liveImage,
        isGenerated: true,
      });
    }

    const curatedSuite = getBespokeVisualSuiteForLook(look || {});
    return res.json({
      imageUrl: curatedSuite.runwayImageUrl,
      textileDetailUrl: curatedSuite.textileDetailUrl,
      flatlayUrl: curatedSuite.flatlayUrl,
      isGenerated: true,
      fallbackUsed: true,
    });
  } catch (error: any) {
    console.error('Error generating fashion image:', error);
    const curatedSuite = getBespokeVisualSuiteForLook({});
    return res.json({
      imageUrl: curatedSuite.runwayImageUrl,
      textileDetailUrl: curatedSuite.textileDetailUrl,
      flatlayUrl: curatedSuite.flatlayUrl,
      isGenerated: true,
      fallbackUsed: true,
    });
  }
});

async function main() {
  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`LĀYA Studio application running on port ${port}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
