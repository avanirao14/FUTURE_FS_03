export interface CollectionItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  image: string;
  fabric: string;
  silhouette: string;
  stylingTip: string;
  highlights: string[];
}

export interface LookbookLook {
  id: string;
  title: string;
  category: 'Everyday' | 'Festive Luxe' | 'Contemporary' | 'Occasion';
  image: string;
  aspectRatio?: 'tall' | 'square' | 'wide';
  textile: string;
  concept: string;
  palette: string[];
  stylingNotes: string;
}

export interface StylingService {
  id: string;
  title: string;
  duration: string;
  mode: 'In-Studio' | 'Virtual' | 'In-Studio & Virtual';
  tagline: string;
  description: string;
  includes: string[];
  idealFor: string;
}

export interface BookingFormState {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  sessionMode: 'In-Studio (Bengaluru Atelier)' | 'In-Studio (Mumbai Atelier)' | 'Virtual Video Consultation';
  styleGoals: string;
}

export interface QuizAnswers {
  occasion?: string;
  styleFeel?: string;
  reachFor?: string;
  colourMood?: string;
  [key: string]: string | undefined;
}

export interface StyleProfileResult {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  styleDirection: string;
  personalizedNote: string;
  colourMoodTitle: string;
  colourPalette: { name: string; hex: string }[];
  silhouetteFocus: string;
  idealFabrics: string[];
  image: string;
  outfitIdeas: {
    title: string;
    description: string;
    drapeTip: string;
  }[];
}

export interface AIStylistPreferences {
  occasion?: string;
  style?: string;
  outfitType?: string;
  colourMood?: string;
  vibes?: string[];
}

export interface AIStylistRequest {
  userPrompt: string;
  preferences?: AIStylistPreferences;
  previousLook?: AIStylistLook;
  refinementInstruction?: string;
}

export interface AIStylistLook {
  id: string;
  lookName: string;
  styleConcept: string;
  whyThisWorks: string;
  outfit: {
    top: string;
    bottom: string;
    layer?: string;
  };
  colourPalette: { name: string; hex: string }[];
  accessories: string;
  footwear: string;
  stylingTips: string[];
  alternativeLook: string;
  relatedCollections: string[];
  imagePrompt: string;
  imageUrl?: string;
  textileDetailUrl?: string;
  flatlayUrl?: string;
  lightingMood?: string;
  isAiGenerated?: boolean;
  timestamp: number;
  userPrompt: string;
  appliedPreferences?: AIStylistPreferences;
}
