import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Heart,
  Share2,
  Calendar,
  Check,
  Compass,
  Layers,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Sliders,
  Send,
  Loader2,
  Copy,
  Columns,
  ZoomIn,
  X,
  Maximize2,
  Palette,
  Scissors,
  Wand2,
  Download,
  Info
} from 'lucide-react';
import { AIStylistLook, AIStylistPreferences, CollectionItem, QuizAnswers, StyleProfileResult } from '../types';
import { COLLECTIONS_DATA } from '../data/fashionData';
import { QUIZ_QUESTIONS, calculateStyleProfile } from '../data/quizData';
import { AICoutureConceptPlate } from './AICoutureConceptPlate';
import { getVisualBundleForLook } from '../data/aiVisualCatalog';

interface AIStylistSectionProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onSelectCollection: (item: CollectionItem) => void;
}

const OCCASIONS = [
  'Everyday',
  'College',
  'Work',
  'Date',
  'Wedding',
  'Festive',
  'Party',
  'Travel',
  'Family Event',
  'Other'
];

const STYLES = [
  'Classic',
  'Traditional',
  'Modern',
  'Minimal',
  'Elegant',
  'Contemporary',
  'Bold',
  'Bohemian',
  'Casual',
  'Fusion',
  'Indo-Western'
];

const OUTFIT_TYPES = ['Indian', 'Western', 'Indo-Western', 'Fusion', 'No Preference'];

const COLOUR_MOODS = [
  'Bright',
  'Pastel',
  'Neutral',
  'Earthy',
  'Deep/Dark',
  'Monochrome',
  'Colourful',
  'No Preference'
];

const VIBES = ['Comfortable', 'Simple', 'Statement', 'Elegant', 'Trendy', 'Festive'];

const INSPIRATION_PROMPTS = [
  'I have a college cultural event next week. I want an Indian outfit that looks classic but modern, with bright colours.',
  'I’m attending a family wedding. I want something elegant, traditional and comfortable. I prefer rich jewel colours.',
  'I want a simple Indo-Western outfit for a casual day. I like earthy colours and breathable fabrics.',
  'Looking for a sharp workwear look with Indian handloom heritage in minimalist neutrals.'
];

const QUICK_REFINEMENTS = [
  'Make it more traditional',
  'Make it more modern',
  'Make it more colourful',
  'Make it more minimal',
  'Make it more comfortable',
  'Change the outfit',
  'Try a different colour',
  'Try another look'
];

export const AIStylistSection: React.FC<AIStylistSectionProps> = ({
  onOpenBooking,
  onSelectCollection
}) => {
  const [userPrompt, setUserPrompt] = useState('');
  const [preferences, setPreferences] = useState<AIStylistPreferences>({
    vibes: []
  });
  const [showPreferences, setShowPreferences] = useState(false);

  // Experience Mode: AI Stylist vs Style Compass Quiz
  const [activeMode, setActiveMode] = useState<'ai' | 'quiz'>('ai');
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({});
  const [quizResult, setQuizResult] = useState<StyleProfileResult | null>(null);
  const [isQuizTransitioning, setIsQuizTransitioning] = useState(false);

  // AI Generation State
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<'text' | 'image'>('text');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Look History & Results
  const [currentLook, setCurrentLook] = useState<AIStylistLook | null>(null);
  const [generatedLooks, setGeneratedLooks] = useState<AIStylistLook[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Refinement input
  const [refinementText, setRefinementText] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  // ChatGPT-Style AI Visualizer Studio State
  const [visualMode, setVisualMode] = useState<'runway' | 'plate' | 'textile' | 'flatlay'>('runway');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [variationIndex, setVariationIndex] = useState(0);
  const [isVaryingVisual, setIsVaryingVisual] = useState(false);
  const [promptCopied, setPromptCopied] = useState(false);
  const [showPromptDetails, setShowPromptDetails] = useState(false);

  // Saved Looks (localStorage persistence)
  const [savedLooks, setSavedLooks] = useState<AIStylistLook[]>([]);
  const [showSavedDrawer, setShowSavedDrawer] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Load saved looks on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('laya_saved_looks');
      if (stored) {
        setSavedLooks(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not read saved looks from localStorage', e);
    }
  }, []);

  const toggleSaveLook = (look: AIStylistLook) => {
    let updated: AIStylistLook[];
    const exists = savedLooks.some((l) => l.id === look.id);
    if (exists) {
      updated = savedLooks.filter((l) => l.id !== look.id);
    } else {
      updated = [look, ...savedLooks];
    }
    setSavedLooks(updated);
    try {
      localStorage.setItem('laya_saved_looks', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save to localStorage', e);
    }
  };

  const handleShareLook = async (look: AIStylistLook) => {
    const shareText = `LĀYA AI Stylist Look: ${look.lookName}\nStyle: ${look.styleConcept}\nTop: ${look.outfit.top}\nBottom: ${look.outfit.bottom}\nAccessories: ${look.accessories}\nPalette: ${look.colourPalette.map((c) => c.name).join(', ')}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopyFeedback(true);
        setTimeout(() => setCopyFeedback(false), 2500);
      }
    } catch (e) {
      console.warn('Clipboard write failed', e);
    }
  };

  const handleSelectVibe = (vibe: string) => {
    setPreferences((prev) => {
      const current = prev.vibes || [];
      const updated = current.includes(vibe)
        ? current.filter((v) => v !== vibe)
        : [...current, vibe];
      return { ...prev, vibes: updated };
    });
  };

  const handleGenerateLook = async (e?: React.FormEvent, overridePrompt?: string, overridePrefs?: AIStylistPreferences) => {
    if (e) e.preventDefault();
    const rawPrompt = (overridePrompt !== undefined ? overridePrompt : userPrompt).trim();
    const prefsToSend = overridePrefs !== undefined ? overridePrefs : preferences;

    const hasAnyPreference = Boolean(
      prefsToSend.occasion ||
      prefsToSend.style ||
      prefsToSend.outfitType ||
      prefsToSend.colourMood ||
      (prefsToSend.vibes && prefsToSend.vibes.length > 0)
    );

    if (!rawPrompt && !hasAnyPreference) {
      setErrorMessage('Please describe your styling idea, pick an inspiration prompt below, or select a style preference.');
      return;
    }

    const promptToSend = rawPrompt || 'Create a bespoke look matching my selected style preferences.';

    setErrorMessage(null);
    setIsLoading(true);
    setLoadingStep('text');

    try {
      // Generate text recommendation & curated fashion look from server-side Gemini
      const res = await fetch('/api/stylist/generate-look', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPrompt: promptToSend, preferences: prefsToSend })
      });

      if (!res.ok) {
        throw new Error('Server returned error response');
      }

      const lookData: AIStylistLook = await res.json();

      // Ensure visual details are populated
      if (!lookData.imageUrl || !lookData.textileDetailUrl || !lookData.flatlayUrl) {
        const bundle = getVisualBundleForLook(lookData, 0);
        lookData.imageUrl = lookData.imageUrl || bundle.runwayImageUrl;
        lookData.textileDetailUrl = lookData.textileDetailUrl || bundle.textileDetailUrl;
        lookData.flatlayUrl = lookData.flatlayUrl || bundle.flatlayUrl;
        lookData.lightingMood = lookData.lightingMood || bundle.lightingMood;
        lookData.isAiGenerated = true;
      }
      setVisualMode('runway');
      setVariationIndex(0);

      setCurrentLook(lookData);
      setGeneratedLooks((prev) => [lookData, ...prev.filter((l) => l.id !== lookData.id)]);
      setShowComparison(false);
      setIsLoading(false);

      // Smoothly scroll down to the generated look dossier so user immediately sees it
      setTimeout(() => {
        const dossierEl = document.getElementById('look-dossier-result');
        if (dossierEl) {
          dossierEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err: any) {
      console.error('Error generating look:', err);
      setErrorMessage("We couldn't create your look right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVariation = async () => {
    if (!currentLook) return;
    setIsVaryingVisual(true);
    try {
      const nextIndex = variationIndex + 1;
      setVariationIndex(nextIndex);
      const res = await fetch('/api/stylist/visual-variation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ look: currentLook, variationIndex: nextIndex })
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentLook((prev) => prev ? ({
          ...prev,
          imageUrl: data.imageUrl || prev.imageUrl,
          textileDetailUrl: data.textileDetailUrl || prev.textileDetailUrl,
          flatlayUrl: data.flatlayUrl || prev.flatlayUrl,
          lightingMood: data.lightingMood || prev.lightingMood,
        }) : null);
      } else {
        const bundle = getVisualBundleForLook(currentLook, nextIndex);
        setCurrentLook((prev) => prev ? ({
          ...prev,
          imageUrl: bundle.runwayImageUrl,
          textileDetailUrl: bundle.textileDetailUrl,
          flatlayUrl: bundle.flatlayUrl,
          lightingMood: bundle.lightingMood,
        }) : null);
      }
    } catch (err) {
      const bundle = getVisualBundleForLook(currentLook, variationIndex + 1);
      setCurrentLook((prev) => prev ? ({
        ...prev,
        imageUrl: bundle.runwayImageUrl,
        textileDetailUrl: bundle.textileDetailUrl,
        flatlayUrl: bundle.flatlayUrl,
        lightingMood: bundle.lightingMood,
      }) : null);
    } finally {
      setIsVaryingVisual(false);
    }
  };

  const handleCopyPrompt = (promptText: string) => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2500);
  };

  // Quiz Navigation & Actions
  const currentQuizQuestion = QUIZ_QUESTIONS[quizStep];
  const totalQuizQuestions = QUIZ_QUESTIONS.length;
  const currentQuizAnswer = currentQuizQuestion ? quizAnswers[currentQuizQuestion.key] : undefined;

  const handleSelectQuizOption = (label: string) => {
    setQuizAnswers((prev: QuizAnswers) => ({
      ...prev,
      [currentQuizQuestion.key]: label
    }));
  };

  const handleQuizNext = () => {
    if (!currentQuizAnswer) return;
    if (quizStep < totalQuizQuestions - 1) {
      setIsQuizTransitioning(true);
      setTimeout(() => {
        setQuizStep((prev) => prev + 1);
        setIsQuizTransitioning(false);
      }, 180);
    } else {
      setIsQuizTransitioning(true);
      setTimeout(() => {
        const result = calculateStyleProfile(quizAnswers);
        setQuizResult(result);
        setIsQuizTransitioning(false);
      }, 300);
    }
  };

  const handleQuizBack = () => {
    if (quizStep > 0) {
      setIsQuizTransitioning(true);
      setTimeout(() => {
        setQuizStep((prev) => prev - 1);
        setIsQuizTransitioning(false);
      }, 180);
    }
  };

  const handleQuizRestart = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const handleTransferQuizToAI = (result: StyleProfileResult) => {
    const prompt = `I'm dressing for ${quizAnswers.occasion || 'everyday'}. My style archetype is ${result.name} (${quizAnswers.styleFeel || 'contemporary'}), and I reach for ${quizAnswers.reachFor || 'Indian'} silhouettes in a ${quizAnswers.colourMood || 'soft neutral'} colour palette.`;
    const prefs: AIStylistPreferences = {
      occasion: quizAnswers.occasion,
      style: quizAnswers.styleFeel,
      outfitType: quizAnswers.reachFor,
      colourMood: quizAnswers.colourMood,
      vibes: ['Elegant', 'Comfortable']
    };
    setUserPrompt(prompt);
    setPreferences(prefs);
    setActiveMode('ai');
    handleGenerateLook(undefined, prompt, prefs);
  };

  const handleRefineLook = async (instruction: string) => {
    if (!currentLook || !instruction.trim()) return;

    setErrorMessage(null);
    setIsRefining(true);
    setLoadingStep('text');

    try {
      const res = await fetch('/api/stylist/refine-look', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLook,
          refinementInstruction: instruction
        })
      });

      if (!res.ok) {
        throw new Error('Server returned error refining look');
      }

      const refinedData: AIStylistLook = await res.json();
      setCurrentLook(refinedData);
      setGeneratedLooks((prev) => [refinedData, ...prev.filter((l) => l.id !== refinedData.id)]);
      setRefinementText('');

      setTimeout(() => {
        const dossierEl = document.getElementById('look-dossier-result');
        if (dossierEl) {
          dossierEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err) {
      console.error('Error in refinement:', err);
      setErrorMessage("We couldn't refine your look right now. Please try again.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleCreateAnotherLook = () => {
    const additionalInstruction = 'Create an entirely fresh, alternative silhouette and aesthetic direction that still respects my original theme.';
    handleRefineLook(additionalInstruction);
  };

  // Matched collections from LĀYA's 12 collection catalogue
  const matchedCollections = COLLECTIONS_DATA.filter((c) =>
    currentLook?.relatedCollections?.some((rc) =>
      c.title.toLowerCase().includes(rc.toLowerCase()) || rc.toLowerCase().includes(c.title.toLowerCase())
    )
  );

  return (
    <section id="ai-stylist" className="py-24 sm:py-32 lg:py-40 bg-[#FAF7F2] border-t border-[#EAE3D6] relative overflow-hidden">
      <div id="find-your-style" className="scroll-mt-24"></div>
      {/* Decorative Architectural Hairlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 grid grid-cols-4 lg:grid-cols-12">
          <div className="border-r border-[#DED6C7] h-full col-span-2"></div>
          <div className="border-r border-[#DED6C7] h-full col-span-2 hidden lg:block"></div>
          <div className="border-r border-[#DED6C7] h-full col-span-2"></div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
            <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
              AI Personal Stylist & Style Compass
            </span>
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight mb-3 text-balance">
            LĀYA AI STYLIST
          </h2>

          <p className="text-base sm:text-xl text-[#6B655F] font-serif font-light leading-relaxed text-balance">
            “Tell us your idea. We’ll create your look.”
          </p>

          <p className="text-xs sm:text-[13px] text-[#78716C] font-sans max-w-xl mx-auto mt-2">
            Speak naturally about your upcoming celebration, cultural event, mood, or lifestyle. Our intelligent stylist understands your story and tailors an ensemble with curated Indian handlooms.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex p-1 bg-[#F0EAE0] border border-[#DDD3C3]">
            <button
              type="button"
              onClick={() => setActiveMode('ai')}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'ai'
                  ? 'bg-[#1F1E1D] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6B655F] hover:text-[#1F1E1D]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B89667]" />
              <span>LĀYA AI Stylist (Conversational)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveMode('quiz')}
              className={`px-5 py-2.5 text-xs uppercase tracking-[0.16em] font-sans font-medium transition-all cursor-pointer flex items-center gap-2 ${
                activeMode === 'quiz'
                  ? 'bg-[#1F1E1D] text-[#FAF8F5] shadow-xs'
                  : 'text-[#6B655F] hover:text-[#1F1E1D]'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#B89667]" />
              <span>Style Compass Diagnostic (4 Steps)</span>
            </button>
          </div>
        </div>

        {activeMode === 'ai' ? (
          <>

        {/* Top Floating Bar for Saved Looks & History if available */}
        {(savedLooks.length > 0 || generatedLooks.length > 1) && (
          <div className="mb-6 flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#E2DBD0] text-xs font-sans">
            <div className="flex items-center gap-3">
              {generatedLooks.length > 1 && (
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="inline-flex items-center gap-1.5 text-[#57534E] hover:text-[#1F1E1D] cursor-pointer"
                >
                  <Columns className="w-3.5 h-3.5 text-[#6E2332]" />
                  <span>{showComparison ? 'Back to Focused Look' : `Compare Looks (${generatedLooks.length})`}</span>
                </button>
              )}
            </div>

            {savedLooks.length > 0 && (
              <button
                onClick={() => setShowSavedDrawer(!showSavedDrawer)}
                className="inline-flex items-center gap-1.5 text-[#6E2332] hover:text-[#551724] font-medium cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-[#6E2332]" />
                <span>Saved Looks ({savedLooks.length})</span>
              </button>
            )}
          </div>
        )}

        {/* Saved Looks Drawer */}
        {showSavedDrawer && (
          <div className="mb-8 p-6 bg-[#FAF8F5] border border-[#6E2332]/30 shadow-md">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EAE3D6]">
              <span className="font-serif text-xl text-[#1F1E1D]">Saved Wardrobe Dossiers</span>
              <button
                onClick={() => setShowSavedDrawer(false)}
                className="text-xs text-[#78716C] hover:text-[#1F1E1D] cursor-pointer"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {savedLooks.map((look) => (
                <div key={look.id} className="p-4 bg-[#FAF7F2] border border-[#E2DBD0] flex flex-col justify-between">
                  <div>
                    {look.imageUrl && (
                      <div className="aspect-[4/3] overflow-hidden mb-3 bg-[#E7DFD1]">
                        <img
                          src={look.imageUrl}
                          alt={look.lookName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h4 className="font-serif text-lg text-[#1F1E1D] mb-1">{look.lookName}</h4>
                    <p className="text-[11px] text-[#6B655F] line-clamp-2 mb-3">{look.styleConcept}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D6] text-xs">
                    <button
                      onClick={() => {
                        setCurrentLook(look);
                        setShowSavedDrawer(false);
                      }}
                      className="text-[#6E2332] font-medium hover:underline cursor-pointer"
                    >
                      View Look
                    </button>
                    <button
                      onClick={() => toggleSaveLook(look)}
                      className="text-[#78716C] hover:text-[#6E2332] cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* INPUT PROMPT & PREFERENCE CONTROLS                             */}
        {/* ============================================================== */}
        <div className="bg-[#FAF8F5] border border-[#E0D7C7] p-6 sm:p-10 shadow-[0_16px_40px_-15px_rgba(31,30,29,0.06)] mb-12">
          <form onSubmit={handleGenerateLook}>
            {/* Natural Language Prompt Area */}
            <div className="mb-6">
              <label className="block text-[11px] uppercase tracking-[0.2em] font-sans font-medium text-[#57534E] mb-2.5">
                Describe your occasion, mood, or outfit vision
              </label>

              <div className="relative">
                <textarea
                  rows={3}
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerateLook();
                    }
                  }}
                  placeholder="e.g. I have a college cultural event next week. I want an Indian outfit that looks classic but modern, with bright colours..."
                  className="w-full p-4 sm:p-5 bg-[#FAF7F2] border border-[#D9D0C1] text-sm sm:text-base text-[#1F1E1D] font-sans placeholder:text-[#9E978C] focus:outline-none focus:border-[#6E2332] focus:ring-1 focus:ring-[#6E2332]/30 transition-all leading-relaxed"
                />
              </div>

              {/* Sample Inspiration Chips */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-sans">
                <span className="text-[#8C8578] text-[11px]">Need inspiration? Try:</span>
                {INSPIRATION_PROMPTS.map((promptText, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setUserPrompt(promptText)}
                    className="text-[11px] text-[#6B655F] hover:text-[#6E2332] underline decoration-[#D0C7B8] hover:decoration-[#6E2332] transition-colors text-left cursor-pointer"
                  >
                    "{promptText.slice(0, 38)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Style Preferences Toggle */}
            <div className="border-t border-[#EAE3D6] pt-4 mb-6">
              <button
                type="button"
                onClick={() => setShowPreferences(!showPreferences)}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#57534E] hover:text-[#1F1E1D] font-medium transition-colors cursor-pointer py-1"
              >
                <Sliders className="w-3.5 h-3.5 text-[#6E2332]" />
                <span>
                  {showPreferences ? 'Hide Optional Style Preferences' : 'Add Optional Style Preferences (Occasion, Silhouette, Palette)'}
                </span>
                {showPreferences ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>

              {showPreferences && (
                <div className="mt-5 pt-4 border-t border-[#F2ECE1] space-y-6 text-xs font-sans">
                  {/* Occasion */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C] block mb-2">
                      Occasion
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {OCCASIONS.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, occasion: preferences.occasion === occ ? undefined : occ })}
                          className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                            preferences.occasion === occ
                              ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                              : 'bg-[#FAF7F2] text-[#57534E] border-[#D9D0C1] hover:border-[#6E2332]'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Style */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C] block mb-2">
                      Style Aesthetic
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {STYLES.map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, style: preferences.style === st ? undefined : st })}
                          className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                            preferences.style === st
                              ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                              : 'bg-[#FAF7F2] text-[#57534E] border-[#D9D0C1] hover:border-[#6E2332]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Outfit Type & Colour Mood Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C] block mb-2">
                        Outfit Type
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {OUTFIT_TYPES.map((ot) => (
                          <button
                            key={ot}
                            type="button"
                            onClick={() => setPreferences({ ...preferences, outfitType: preferences.outfitType === ot ? undefined : ot })}
                            className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                              preferences.outfitType === ot
                                ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                                : 'bg-[#FAF7F2] text-[#57534E] border-[#D9D0C1] hover:border-[#6E2332]'
                            }`}
                          >
                            {ot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C] block mb-2">
                        Colour Mood
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {COLOUR_MOODS.map((cm) => (
                          <button
                            key={cm}
                            type="button"
                            onClick={() => setPreferences({ ...preferences, colourMood: preferences.colourMood === cm ? undefined : cm })}
                            className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                              preferences.colourMood === cm
                                ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                                : 'bg-[#FAF7F2] text-[#57534E] border-[#D9D0C1] hover:border-[#6E2332]'
                            }`}
                          >
                            {cm}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Optional Nuances */}
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#78716C] block mb-2">
                      Sensory Vibe / Nuances
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {VIBES.map((vb) => {
                        const isVibeSelected = preferences.vibes?.includes(vb);
                        return (
                          <button
                            key={vb}
                            type="button"
                            onClick={() => handleSelectVibe(vb)}
                            className={`px-3 py-1.5 border transition-colors cursor-pointer ${
                              isVibeSelected
                                ? 'bg-[#6E2332] text-white border-[#6E2332]'
                                : 'bg-[#FAF7F2] text-[#57534E] border-[#D9D0C1] hover:border-[#6E2332]'
                            }`}
                          >
                            {vb}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-[#FAF0F0] border border-[#E3B8B8] text-xs font-sans text-[#7A2424] flex items-center justify-between">
                <span>{errorMessage}</span>
                <button
                  type="button"
                  onClick={() => handleGenerateLook()}
                  className="underline font-semibold ml-3 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Submit Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
              <div className="text-[11px] text-[#78716C] font-sans">
                Powered by LĀYA Atelier Intelligence · Tailored to your exact story
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn-book-session inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs shadow-md cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>LĀYA is creating your look…</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>CREATE MY LOOK</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ============================================================== */}
        {/* LOADING EXPERIENCE                                             */}
        {/* ============================================================== */}
        {isLoading && (
          <div className="bg-[#FAF8F5] border border-[#E0D7C7] p-12 text-center mb-12 shadow-sm animate-pulse">
            <div className="w-12 h-12 rounded-full bg-[#6E2332]/10 text-[#6E2332] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <h3 className="font-serif text-3xl text-[#1F1E1D] mb-2 font-light">
              {loadingStep === 'text' ? 'LĀYA is creating your look…' : 'Creating your LĀYA look…'}
            </h3>
            <p className="text-xs sm:text-sm text-[#78716C] font-sans max-w-md mx-auto leading-relaxed">
              {loadingStep === 'text'
                ? 'Synthesizing your occasion, silhouette balance, and artisanal Indian handlooms…'
                : 'Rendering your bespoke editorial fashion look and textile composition…'}
            </p>
          </div>
        )}

        {/* ============================================================== */}
        {/* COMPARE MULTIPLE LOOKS VIEW                                    */}
        {/* ============================================================== */}
        {showComparison && generatedLooks.length > 1 && (
          <div className="mb-14 bg-[#FAF8F5] border border-[#E0D7C7] p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#EAE3D6]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold block mb-1">
                  Atelier Comparison
                </span>
                <h3 className="font-serif text-3xl text-[#1F1E1D]">Compare Your Looks</h3>
              </div>
              <button
                onClick={() => setShowComparison(false)}
                className="text-xs uppercase tracking-wider text-[#57534E] hover:text-[#1F1E1D] underline cursor-pointer"
              >
                Close Comparison
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedLooks.map((look) => (
                <div
                  key={look.id}
                  className={`p-5 bg-[#FAF7F2] border transition-all ${
                    currentLook?.id === look.id ? 'border-[#6E2332] ring-1 ring-[#6E2332]/30 shadow-md' : 'border-[#E2DBD0]'
                  }`}
                >
                  {look.imageUrl && (
                    <div className="aspect-[3/4] overflow-hidden mb-4 bg-[#E7DFD1]">
                      <img
                        src={look.imageUrl}
                        alt={look.lookName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h4 className="font-serif text-2xl text-[#1F1E1D] mb-1">{look.lookName}</h4>
                  <p className="text-xs text-[#8E3547] uppercase tracking-wider mb-2">{look.styleConcept}</p>
                  <p className="text-xs text-[#57534E] mb-4 line-clamp-2">{look.outfit.top} · {look.outfit.bottom}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EAE3D6]">
                    <button
                      onClick={() => {
                        setCurrentLook(look);
                        setShowComparison(false);
                      }}
                      className="text-xs uppercase tracking-wider text-[#6E2332] font-medium hover:underline cursor-pointer"
                    >
                      {currentLook?.id === look.id ? 'Active Look' : 'View Full Details'}
                    </button>
                    <button
                      onClick={() => toggleSaveLook(look)}
                      className="text-xs text-[#78716C] hover:text-[#6E2332] cursor-pointer"
                    >
                      {savedLooks.some((l) => l.id === look.id) ? 'Saved' : 'Save'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* YOUR LĀYA LOOK DOSSIER DISPLAY                                 */}
        {/* ============================================================== */}
        {currentLook && !isLoading && (
          <div id="look-dossier-result" className="scroll-mt-28 bg-[#FAF8F5] border border-[#E0D7C7] p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(31,30,29,0.08)]">
            
            {/* Dossier Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#EAE3D6] gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6E2332]" />
                <span className="text-[10.5px] uppercase tracking-[0.26em] text-[#6E2332] font-semibold font-sans">
                  YOUR LĀYA LOOK
                </span>
              </div>

              {/* Actions: Save, Share, Compare */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleSaveLook(currentLook)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans transition-colors cursor-pointer border ${
                    savedLooks.some((l) => l.id === currentLook.id)
                      ? 'bg-[#6E2332] text-white border-[#6E2332]'
                      : 'bg-[#FAF7F2] text-[#57534E] border-[#D9D0C1] hover:border-[#6E2332]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${savedLooks.some((l) => l.id === currentLook.id) ? 'fill-white' : ''}`} />
                  <span>{savedLooks.some((l) => l.id === currentLook.id) ? 'Saved' : 'Save Look'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleShareLook(currentLook)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans bg-[#FAF7F2] text-[#57534E] border border-[#D9D0C1] hover:border-[#6E2332] transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copyFeedback ? 'Copied!' : 'Share'}</span>
                </button>

                {generatedLooks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setShowComparison(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans bg-[#FAF7F2] text-[#57534E] border border-[#D9D0C1] hover:border-[#6E2332] transition-colors cursor-pointer"
                  >
                    <Columns className="w-3.5 h-3.5 text-[#6E2332]" />
                    <span>Compare</span>
                  </button>
                )}
              </div>
            </div>

            {/* Main Visual & Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
              
              {/* Left Column: ChatGPT-Style AI Fashion Visualizer Studio */}
              <div className="lg:col-span-5">
                {/* Visualizer Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#EAE3D6]">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF5F2] border border-[#E3B8B8] text-[9.5px] uppercase font-sans tracking-[0.2em] text-[#6E2332] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#6E2332]" />
                    <span>ChatGPT AI Visual Studio</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleGenerateVariation}
                    disabled={isVaryingVisual}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF7F2] border border-[#D9D0C1] hover:border-[#6E2332] text-[10.5px] text-[#6E2332] font-sans font-medium transition-colors cursor-pointer disabled:opacity-50"
                    title="Generate an alternative editorial lighting or angle"
                  >
                    {isVaryingVisual ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                    <span>{isVaryingVisual ? 'Generating…' : 'Visual Variation'}</span>
                  </button>
                </div>

                {/* Perspective View Switcher Tabs */}
                <div className="grid grid-cols-4 gap-1 p-1 bg-[#ECE5D8] border border-[#DDD3C2] mb-3 text-[10px] font-sans">
                  <button
                    type="button"
                    onClick={() => setVisualMode('runway')}
                    className={`py-1.5 px-1 text-center font-medium transition-all cursor-pointer truncate ${
                      visualMode === 'runway'
                        ? 'bg-[#1F1E1D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#6B655F] hover:text-[#1F1E1D]'
                    }`}
                  >
                    Runway Look
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisualMode('plate')}
                    className={`py-1.5 px-1 text-center font-medium transition-all cursor-pointer truncate ${
                      visualMode === 'plate'
                        ? 'bg-[#1F1E1D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#6B655F] hover:text-[#1F1E1D]'
                    }`}
                  >
                    Atelier Plate
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisualMode('textile')}
                    className={`py-1.5 px-1 text-center font-medium transition-all cursor-pointer truncate ${
                      visualMode === 'textile'
                        ? 'bg-[#1F1E1D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#6B655F] hover:text-[#1F1E1D]'
                    }`}
                  >
                    Fabric Weave
                  </button>

                  <button
                    type="button"
                    onClick={() => setVisualMode('flatlay')}
                    className={`py-1.5 px-1 text-center font-medium transition-all cursor-pointer truncate ${
                      visualMode === 'flatlay'
                        ? 'bg-[#1F1E1D] text-white shadow-xs'
                        : 'bg-[#FAF7F2] text-[#6B655F] hover:text-[#1F1E1D]'
                    }`}
                  >
                    Flatlay & Accents
                  </button>
                </div>

                {/* Primary Visual Container */}
                {visualMode === 'plate' ? (
                  <AICoutureConceptPlate look={currentLook} onOpenZoom={() => setLightboxOpen(true)} />
                ) : (
                  <div className="p-3 bg-[#F5F0E6] border border-[#E0D7C7] shadow-sm relative group">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE5D8]">
                      {visualMode === 'runway' && currentLook.imageUrl && (
                        <img
                          src={currentLook.imageUrl}
                          alt={currentLook.lookName}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover zoom-subtle transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {visualMode === 'textile' && (
                        <img
                          src={currentLook.textileDetailUrl || currentLook.imageUrl}
                          alt={`${currentLook.lookName} - Textile & Weave Detail`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover zoom-subtle transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {visualMode === 'flatlay' && (
                        <img
                          src={currentLook.flatlayUrl || currentLook.imageUrl}
                          alt={`${currentLook.lookName} - Flatlay & Accessories`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover zoom-subtle transition-transform duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                        <span className="bg-[#FAF8F5]/94 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase font-sans tracking-[0.2em] text-[#6E2332] font-semibold border border-[#D9D0C1]">
                          {visualMode === 'runway' && 'Editorial Runway Visual'}
                          {visualMode === 'textile' && 'Textile & Zari Macro'}
                          {visualMode === 'flatlay' && 'Artisanal Flatlay'}
                        </span>
                        {currentLook.lightingMood && (
                          <span className="bg-[#1F1E1D]/85 text-white backdrop-blur-xs px-2 py-0.5 text-[8.5px] font-sans tracking-wide">
                            {currentLook.lightingMood}
                          </span>
                        )}
                      </div>

                      {/* Fullscreen Magnifier Overlay */}
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="absolute bottom-3 right-3 p-2 bg-[#FAF8F5]/90 hover:bg-white text-[#1F1E1D] border border-[#D9D0C1] transition-all cursor-pointer shadow-sm opacity-90 group-hover:opacity-100"
                        title="View Fullscreen High-Resolution"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Visual Caption Bar */}
                    <div className="mt-2.5 flex items-center justify-between text-[10.5px] font-sans text-[#78716C]">
                      <span>
                        {visualMode === 'runway' && 'Bespoke AI couture render · Non-catalog original'}
                        {visualMode === 'textile' && 'Authentic handloom zari & pure silk texture'}
                        {visualMode === 'flatlay' && 'Coordinated footwear, jewelry & clutch pairing'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="text-[#6E2332] hover:underline font-medium cursor-pointer"
                      >
                        Inspect Zoom
                      </button>
                    </div>
                  </div>
                )}

                {/* ChatGPT AI Visual Prompt Box */}
                <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#E5DDD0] font-sans text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#6E2332] font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      <span>ChatGPT / DALL·E Visual Prompt:</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(currentLook.imagePrompt)}
                      className="inline-flex items-center gap-1 text-[10px] text-[#6E2332] hover:underline font-medium cursor-pointer"
                    >
                      {promptCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{promptCopied ? 'Copied Prompt!' : 'Copy for ChatGPT'}</span>
                    </button>
                  </div>
                  <p className="text-[#57534E] text-[11px] leading-relaxed italic line-clamp-3">
                    &quot;{currentLook.imagePrompt}&quot;
                  </p>
                </div>

                {/* Footwear & Accessories Fast Spec */}
                <div className="mt-3 p-4 bg-[#FAF7F2] border border-[#E5DDD0] space-y-3 font-sans text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-0.5">
                      Curated Accessories:
                    </span>
                    <p className="text-[#3E3A36] leading-snug">{currentLook.accessories}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-0.5">
                      Recommended Footwear:
                    </span>
                    <p className="text-[#3E3A36] leading-snug">{currentLook.footwear}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Look Name, Style Concept, Why it Works, Outfit Breakdown */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#78716C] font-sans block mb-1">
                    Bespoke Atelier Recommendation
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1E1D] font-light mb-2 leading-tight">
                    {currentLook.lookName}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#8E3547] font-sans font-medium mb-4">
                    {currentLook.styleConcept}
                  </p>

                  <div className="p-4 bg-[#FAF5F2] border-l-2 border-[#6E2332] mb-6">
                    <span className="text-[10px] uppercase tracking-widest text-[#6E2332] font-semibold block mb-1">
                      Why This Look Works
                    </span>
                    <p className="text-xs sm:text-[13px] text-[#57534E] font-sans leading-relaxed">
                      {currentLook.whyThisWorks}
                    </p>
                  </div>

                  {/* Outfit Decomposition */}
                  <div className="space-y-3 mb-6 font-sans text-xs">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1F1E1D] font-semibold block">
                      Outfit Architecture
                    </span>
                    
                    <div className="p-3 bg-[#FAF7F2] border border-[#E5DDD0]">
                      <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-0.5">
                        Top / Kurta / Shirt
                      </span>
                      <p className="text-[#33312E]">{currentLook.outfit.top}</p>
                    </div>

                    <div className="p-3 bg-[#FAF7F2] border border-[#E5DDD0]">
                      <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-0.5">
                        Bottom
                      </span>
                      <p className="text-[#33312E]">{currentLook.outfit.bottom}</p>
                    </div>

                    {currentLook.outfit.layer && (
                      <div className="p-3 bg-[#FAF7F2] border border-[#E5DDD0]">
                        <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-0.5">
                          Layer / Dupatta / Cape
                        </span>
                        <p className="text-[#33312E]">{currentLook.outfit.layer}</p>
                      </div>
                    )}
                  </div>

                  {/* Colour Palette Chips */}
                  <div className="p-4 bg-[#F5F0E6] border border-[#E0D7C7] space-y-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E2332] font-semibold block font-sans">
                      Harmonized Colour Palette
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {currentLook.colourPalette.map((chip, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] border border-[#E2DBD0]">
                          <span
                            className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                            style={{ backgroundColor: chip.hex }}
                          />
                          <div className="truncate">
                            <span className="block text-[10px] font-sans text-[#33312E] truncate leading-none">
                              {chip.name}
                            </span>
                            <span className="text-[9px] font-mono text-[#8C8578] uppercase">
                              {chip.hex}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Styling Tips & Alternative Look */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-[#EAE3D6] mb-10">
              <div className="md:col-span-7 space-y-3">
                <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#1F1E1D] font-semibold block font-sans">
                  Stylist’s Master Tips
                </span>
                <div className="space-y-2 text-xs text-[#57534E] font-sans">
                  {currentLook.stylingTips.map((tip, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E2332] mt-1.5 shrink-0"></span>
                      <span className="leading-relaxed">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 p-5 bg-[#FAF7F2] border border-[#E2DBD0]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E2332] font-semibold block mb-1 font-sans">
                  Alternative Variation
                </span>
                <p className="text-xs text-[#57534E] font-sans leading-relaxed">
                  {currentLook.alternativeLook}
                </p>
              </div>
            </div>

            {/* ============================================================== */}
            {/* CONVERSATIONAL REFINEMENT (CHAT-LIKE ADJUSTMENTS)              */}
            {/* ============================================================== */}
            <div className="pt-8 border-t border-[#EAE3D6] mb-10">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-4 h-4 text-[#6E2332]" />
                <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-[#1F1E1D]">
                  Refine This Look With LĀYA
                </span>
              </div>
              <p className="text-xs text-[#78716C] font-sans mb-4">
                Want to tweak this look? Click a refinement suggestion or type your specific adjustment.
              </p>

              {/* Quick refinement pill buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {QUICK_REFINEMENTS.map((refinePrompt) => (
                  <button
                    key={refinePrompt}
                    type="button"
                    disabled={isRefining}
                    onClick={() => handleRefineLook(refinePrompt)}
                    className="px-3.5 py-1.5 bg-[#FAF7F2] border border-[#D9D0C1] hover:border-[#6E2332] text-xs font-sans text-[#57534E] hover:text-[#1F1E1D] transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {refinePrompt}
                  </button>
                ))}
              </div>

              {/* Custom refinement input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={refinementText}
                  onChange={(e) => setRefinementText(e.target.value)}
                  placeholder="Tell LĀYA what you'd like to change… (e.g. 'Keep the same outfit but make it more festive and use green')"
                  className="flex-grow px-4 py-2.5 bg-[#FAF7F2] border border-[#D9D0C1] text-xs sm:text-sm text-[#1F1E1D] font-sans placeholder:text-[#9E978C] focus:outline-none focus:border-[#6E2332]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleRefineLook(refinementText);
                    }
                  }}
                />
                <button
                  type="button"
                  disabled={isRefining || !refinementText.trim()}
                  onClick={() => handleRefineLook(refinementText)}
                  className="btn-book-session px-5 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isRefining ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Refine</span>
                </button>
              </div>
            </div>

            {/* ============================================================== */}
            {/* BESPOKE ATELIER BLUEPRINT & HANDLOOM SOURCING                   */}
            {/* ============================================================== */}
            <div className="pt-8 border-t border-[#EAE3D6] mb-10">
              <div className="flex items-center gap-2 mb-2">
                <Scissors className="w-4 h-4 text-[#6E2332]" />
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans">
                  Atelier Craftsmanship Protocol
                </span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#1F1E1D] font-light mb-2">
                HANDLOOM BLUEPRINT & BESPOKE TAILORING
              </h4>
              <p className="text-xs text-[#78716C] font-sans max-w-2xl mb-6">
                This ensemble is drafted as a bespoke individual creation based on your prompt—not pulled from ready-to-wear inventory. LĀYA partners with master artisanal guilds across India to craft your vision.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-5 bg-[#FAF7F2] border border-[#E2DBD0]">
                  <div className="w-8 h-8 rounded-full bg-[#6E2332]/10 text-[#6E2332] flex items-center justify-center mb-3">
                    <Palette className="w-4 h-4" />
                  </div>
                  <h5 className="font-serif text-lg text-[#1F1E1D] mb-1">Artisan Guild Weave</h5>
                  <p className="text-xs text-[#6B655F] font-sans leading-relaxed">
                    Sourced from Varanasi kadhwa brocades, Chanderi tissue loomed with fine zari, and unbleached Bengal mulmul.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] border border-[#E2DBD0]">
                  <div className="w-8 h-8 rounded-full bg-[#6E2332]/10 text-[#6E2332] flex items-center justify-center mb-3">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <h5 className="font-serif text-lg text-[#1F1E1D] mb-1">Precision Made-to-Measure</h5>
                  <p className="text-xs text-[#6B655F] font-sans leading-relaxed">
                    Sculpted to your exact proportions and posture. Every neckline, armhole, and kalidar flare is individually drafted.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] border border-[#E2DBD0]">
                  <div className="w-8 h-8 rounded-full bg-[#6E2332]/10 text-[#6E2332] flex items-center justify-center mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <h5 className="font-serif text-lg text-[#1F1E1D] mb-1">Couture Finishing</h5>
                  <p className="text-xs text-[#6B655F] font-sans leading-relaxed">
                    Finished with hand-rolled silk hems, antique electroplated brass hardware, and hand-embroidered French seams.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-8 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onOpenBooking(`AI Styling Session for: ${currentLook.lookName}`)}
                  className="btn-book-session w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Styling Session for This Look</span>
                </button>

                <button
                  type="button"
                  onClick={handleCreateAnotherLook}
                  disabled={isRefining}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#1F1E1D] text-[#1F1E1D] text-[11px] uppercase tracking-[0.18em] font-sans font-medium hover:bg-[#1F1E1D] hover:text-[#FAF8F5] transition-colors cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>CREATE ANOTHER LOOK</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setUserPrompt('');
                  setCurrentLook(null);
                }}
                className="text-xs uppercase tracking-wider text-[#78716C] hover:text-[#6E2332] font-sans cursor-pointer py-2"
              >
                Start Over
              </button>
            </div>

          </div>
        )}
        </>
      ) : (
        /* ============================================================== */
        /* STYLE COMPASS QUIZ VIEW                                        */
        /* ============================================================== */
        <div>
          {!quizResult ? (
            <div className="bg-[#FAF8F5] border border-[#E0D7C7] p-6 sm:p-10 lg:p-14 shadow-[0_16px_40px_-15px_rgba(31,30,29,0.06)] relative">
              {/* Consultation Progress Header */}
              <div className="mb-10 pb-6 border-b border-[#EAE3D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#78716C] font-semibold font-sans block mb-1">
                    Atelier Consultation Diagnostic
                  </span>
                  <p className="text-xs text-[#57534E] font-sans">
                    Question <strong className="text-[#1F1E1D] font-semibold">{quizStep + 1}</strong> of {totalQuizQuestions}
                  </p>
                </div>

                {/* Progress Indicator Track & Counter */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-[#6E2332] font-medium tracking-wider">
                    {quizStep + 1}/{totalQuizQuestions}
                  </span>
                  <div className="w-32 sm:w-44 h-1.5 bg-[#E8E1D3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6E2332] transition-all duration-400 ease-out"
                      style={{ width: `${((quizStep + 1) / totalQuizQuestions) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Active Question Title & Subtext */}
              <div className={`transition-opacity duration-200 ${isQuizTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                <div className="mb-8">
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] font-light leading-snug mb-2">
                    {currentQuizQuestion.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#78716C] font-sans font-light">
                    {currentQuizQuestion.subtext}
                  </p>
                </div>

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {currentQuizQuestion.options.map((opt) => {
                    const isSelected = currentQuizAnswer === opt.label;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelectQuizOption(opt.label)}
                        className={`group p-5 text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#6E2332] bg-[#FAF5F2] ring-1 ring-[#6E2332]/40 shadow-sm'
                            : 'border-[#E2DBD0] bg-[#FAF8F5] hover:border-[#6E2332]/40 hover:bg-[#FDFBF9]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <span className={`font-serif text-xl sm:text-2xl transition-colors ${
                            isSelected ? 'text-[#6E2332] font-normal' : 'text-[#1F1E1D] group-hover:text-[#6E2332]'
                          }`}>
                            {opt.label}
                          </span>
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isSelected
                              ? 'border-[#6E2332] bg-[#6E2332] text-white'
                              : 'border-[#D9D0C1] group-hover:border-[#6E2332]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[2.5]" />}
                          </span>
                        </div>
                        <p className="text-xs sm:text-[12.5px] text-[#6B655F] font-sans leading-relaxed">
                          {opt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Controls: Back & Continue */}
                <div className="flex items-center justify-between pt-6 border-t border-[#EAE3D6]">
                  <div>
                    {quizStep > 0 ? (
                      <button
                        type="button"
                        onClick={handleQuizBack}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-sans text-[#6B655F] hover:text-[#1F1E1D] transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Back</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-[#A8A092] font-sans">
                        Select an option to proceed
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleQuizNext}
                    disabled={!currentQuizAnswer}
                    className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 cursor-pointer ${
                      currentQuizAnswer
                        ? 'btn-book-session shadow-sm'
                        : 'bg-[#E5DFD4] text-[#A39C90] cursor-not-allowed border border-[#D9D2C5]'
                    }`}
                  >
                    <span>{quizStep === totalQuizQuestions - 1 ? 'Reveal Style Profile' : 'Continue'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================== */
            /* COMPLETED QUIZ RESULT VIEW                                     */
            /* ============================================================== */
            <div className={`bg-[#FAF8F5] border border-[#E0D7C7] p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(31,30,29,0.08)] transition-opacity duration-300 ${isQuizTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              {/* Dossier Header Tag */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#EAE3D6] gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#6E2332]" />
                  <span className="text-[10.5px] uppercase tracking-[0.26em] text-[#6E2332] font-semibold font-sans">
                    LĀYA Personal Style Archetype
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleQuizRestart}
                  className="inline-flex items-center gap-1.5 text-xs text-[#78716C] hover:text-[#1F1E1D] transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic</span>
                </button>
              </div>

              {/* Profile Overview: Main Hero Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
                {/* Left Column: Model Image with Museum Matting */}
                <div className="lg:col-span-5">
                  <div className="p-3 bg-[#F5F0E6] border border-[#E0D7C7] shadow-sm">
                    <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE5D8]">
                      <img
                        src={quizResult.image}
                        alt={quizResult.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover zoom-subtle"
                      />
                      <div className="absolute top-3.5 left-3.5 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase font-sans tracking-[0.2em] text-[#6E2332] font-semibold">
                        Archetype Portrait
                      </div>
                    </div>
                  </div>

                  {/* Textile & Silhouette Specs */}
                  <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#E5DDD0] space-y-3 font-sans text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-1">
                        Silhouette Focus:
                      </span>
                      <p className="text-[#3E3A36] leading-snug">{quizResult.silhouetteFocus}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-1">
                        Signature Handlooms:
                      </span>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {quizResult.idealFabrics.map((fab: string) => (
                          <span key={fab} className="px-2 py-0.5 bg-[#F2EDE4] text-[#4F4B47] text-[10.5px]">
                            {fab}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Narrative, Style Direction & Color Mood */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#78716C] font-sans block mb-1">
                      Your Sartorial Archetype
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1E1D] font-light mb-2 leading-tight">
                      {quizResult.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#8E3547] font-sans mb-4">
                      {quizResult.subtitle}
                    </p>

                    <div className="p-4 bg-[#FAF5F2] border-l-2 border-[#6E2332] mb-6">
                      <p className="font-serif text-lg sm:text-xl text-[#1F1E1D] italic leading-snug">
                        “{quizResult.description}”
                      </p>
                    </div>

                    {/* Recommended Style Direction */}
                    <div className="space-y-3 text-xs sm:text-[13.5px] text-[#57534E] font-sans leading-relaxed mb-6">
                      <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#1F1E1D] font-semibold block font-sans">
                        Recommended Style Direction
                      </span>
                      <p>{quizResult.styleDirection}</p>
                      <p className="text-[#6B655F] italic pt-1">{quizResult.personalizedNote}</p>
                    </div>

                    {/* Suggested Colour Mood Bar with Palette Chips */}
                    <div className="p-4 bg-[#F5F0E6] border border-[#E0D7C7] space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E2332] font-semibold font-sans">
                          Suggested Colour Mood:
                        </span>
                        <span className="text-xs font-serif text-[#1F1E1D]">
                          {quizResult.colourMoodTitle}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                        {quizResult.colourPalette.map((chip: { name: string; hex: string }) => (
                          <div key={chip.name} className="flex items-center gap-2 p-1.5 bg-[#FAF8F5] border border-[#E2DBD0]">
                            <span
                              className="w-4 h-4 rounded-full border border-black/15 shrink-0"
                              style={{ backgroundColor: chip.hex }}
                            />
                            <div className="truncate">
                              <span className="block text-[10px] font-sans text-[#33312E] truncate leading-none">
                                {chip.name}
                              </span>
                              <span className="text-[9px] font-mono text-[#8C8578] uppercase">
                                {chip.hex}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 Suggested Outfit Ideas */}
              <div className="pt-10 border-t border-[#EAE3D6] mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <Layers className="w-4 h-4 text-[#6E2332]" />
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#1F1E1D] font-light">
                    Three Curated Ensemble Blueprints
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {quizResult.outfitIdeas.map((outfit: { title: string; description: string; drapeTip: string }, oIdx: number) => (
                    <div key={oIdx} className="p-5 sm:p-6 bg-[#FAF7F2] border border-[#E2DBD0] flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#6E2332] font-serif block mb-1.5">
                          Outfit Blueprint 0{oIdx + 1}
                        </span>
                        <h5 className="font-serif text-xl text-[#1F1E1D] mb-3 leading-snug">
                          {outfit.title}
                        </h5>
                        <p className="text-xs text-[#57534E] font-sans leading-relaxed mb-4">
                          {outfit.description}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-[#EAE3D6] text-[11px] text-[#78716C] font-sans italic">
                        <strong className="not-italic text-[#6E2332] font-medium">Stylist Note: </strong>
                        {outfit.drapeTip}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bridge to AI Stylist Action */}
              <div className="p-8 bg-[#F6F1E8] border border-[#E0D7C7] flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-[#6E2332]" />
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans">
                      Bring This Profile to Life
                    </span>
                  </div>
                  <h5 className="font-serif text-2xl text-[#1F1E1D]">Generate Your Bespoke Look with AI Stylist</h5>
                  <p className="text-xs text-[#6B655F] font-sans mt-1 max-w-lg">
                    Transfer your diagnostic results into the conversational LĀYA AI Stylist to generate a full visual dossier, drape breakdown, and live modifications.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleTransferQuizToAI(quizResult)}
                  className="btn-book-session shrink-0 inline-flex items-center gap-2 px-7 py-3 text-xs shadow-md cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>CREATE BESPOKE LOOK NOW</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>

      {/* ============================================================== */}
      {/* HIGH-RESOLUTION LIGHTBOX MODAL                                 */}
      {/* ============================================================== */}
      {lightboxOpen && currentLook && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#141312]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FAF7F2] border border-[#DDD3C2] p-4 sm:p-8 shadow-2xl flex flex-col max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAE3D6]">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold block mb-0.5 font-sans">
                  High-Resolution AI Visual Inspection
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#1F1E1D]">
                  {currentLook.lookName}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 text-[#78716C] hover:text-[#1F1E1D] hover:bg-[#F2ECE1] transition-colors cursor-pointer"
                title="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Perspective Switcher */}
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-sans">
              <span className="text-[#8C8578] text-[11px]">View Angle:</span>
              <button
                type="button"
                onClick={() => setVisualMode('runway')}
                className={`px-3 py-1 text-xs transition-colors cursor-pointer border ${
                  visualMode === 'runway'
                    ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                    : 'bg-white text-[#57534E] border-[#D9D0C1]'
                }`}
              >
                Runway Model
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('plate')}
                className={`px-3 py-1 text-xs transition-colors cursor-pointer border ${
                  visualMode === 'plate'
                    ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                    : 'bg-white text-[#57534E] border-[#D9D0C1]'
                }`}
              >
                Digital Atelier Plate
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('textile')}
                className={`px-3 py-1 text-xs transition-colors cursor-pointer border ${
                  visualMode === 'textile'
                    ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                    : 'bg-white text-[#57534E] border-[#D9D0C1]'
                }`}
              >
                Textile Weave & Zari
              </button>
              <button
                type="button"
                onClick={() => setVisualMode('flatlay')}
                className={`px-3 py-1 text-xs transition-colors cursor-pointer border ${
                  visualMode === 'flatlay'
                    ? 'bg-[#1F1E1D] text-white border-[#1F1E1D]'
                    : 'bg-white text-[#57534E] border-[#D9D0C1]'
                }`}
              >
                Flatlay & Accents
              </button>
            </div>

            {/* Modal Image View */}
            <div className="relative aspect-[3/4] max-h-[60vh] mx-auto overflow-hidden bg-[#ECE5D8] border border-[#DDD3C2] mb-4">
              {visualMode === 'plate' ? (
                <AICoutureConceptPlate look={currentLook} />
              ) : (
                <img
                  src={
                    visualMode === 'textile'
                      ? currentLook.textileDetailUrl || currentLook.imageUrl
                      : visualMode === 'flatlay'
                      ? currentLook.flatlayUrl || currentLook.imageUrl
                      : currentLook.imageUrl
                  }
                  alt={currentLook.lookName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain bg-[#1F1E1D]/5"
                />
              )}
            </div>

            {/* Modal Footer Specs & Palette */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-3 border-t border-[#EAE3D6] text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold">
                  Chromatic Palette:
                </span>
                <div className="flex items-center gap-1.5">
                  {currentLook.colourPalette?.map((chip) => (
                    <div
                      key={chip.name}
                      className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                      style={{ backgroundColor: chip.hex }}
                      title={`${chip.name} (${chip.hex})`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleGenerateVariation}
                  disabled={isVaryingVisual}
                  className="inline-flex items-center gap-1.5 text-[#6E2332] hover:underline font-medium cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>Generate New Lighting Variation</span>
                </button>

                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="px-4 py-1.5 bg-[#1F1E1D] text-white text-xs cursor-pointer hover:bg-[#33312E]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
