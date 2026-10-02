import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, RotateCcw, Check, Sparkles, Calendar, Layers, Compass } from 'lucide-react';
import { QUIZ_QUESTIONS, calculateStyleProfile } from '../data/quizData';
import { QuizAnswers, StyleProfileResult } from '../types';

interface FindYourStyleSectionProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onExploreCollections: () => void;
}

export const FindYourStyleSection: React.FC<FindYourStyleSectionProps> = ({
  onOpenBooking,
  onExploreCollections
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [calculatedResult, setCalculatedResult] = useState<StyleProfileResult | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentStepIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const currentAnswer = currentQuestion ? answers[currentQuestion.key] : undefined;

  const handleSelectOption = (label: string) => {
    setAnswers((prev: QuizAnswers) => ({
      ...prev,
      [currentQuestion.key]: label
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    if (currentStepIndex < totalQuestions - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev + 1);
        setIsTransitioning(false);
      }, 180);
    } else {
      // Calculate final style profile
      setIsTransitioning(true);
      setTimeout(() => {
        const result = calculateStyleProfile(answers);
        setCalculatedResult(result);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStepIndex((prev) => prev - 1);
        setIsTransitioning(false);
      }, 180);
    }
  };

  const handleRestart = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAnswers({});
      setCalculatedResult(null);
      setCurrentStepIndex(0);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <section id="find-your-style" className="py-28 sm:py-36 lg:py-44 bg-[#FAF7F2] border-t border-[#EAE3D6] relative overflow-hidden">
      
      {/* Background Architectural Watermark / Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 grid grid-cols-6 lg:grid-cols-12">
          <div className="border-r border-[#DED6C7] h-full col-span-2"></div>
          <div className="border-r border-[#DED6C7] h-full col-span-2 hidden lg:block"></div>
          <div className="border-r border-[#DED6C7] h-full col-span-2"></div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
            <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
              Interactive Diagnostic
            </span>
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight mb-4 text-balance">
            Find Your Style
          </h2>

          <p className="text-base sm:text-lg text-[#6B655F] font-serif font-light leading-relaxed text-balance">
            “Your style is personal. Let’s discover what feels like you.”
          </p>
        </div>

        {/* Dynamic Container: Quiz Stepper OR Completed Result Profile */}
        {!calculatedResult ? (
          /* ============================================================== */
          /* QUIZ STEPPER VIEW                                              */
          /* ============================================================== */
          <div className="bg-[#FAF8F5] border border-[#E0D7C7] p-6 sm:p-10 lg:p-14 shadow-[0_16px_40px_-15px_rgba(31,30,29,0.06)] relative">
            
            {/* Consultation Progress Header */}
            <div className="mb-10 pb-6 border-b border-[#EAE3D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#78716C] font-semibold font-sans block mb-1">
                  Atelier Consultation Diagnostic
                </span>
                <p className="text-xs text-[#57534E] font-sans">
                  Question <strong className="text-[#1F1E1D] font-semibold">{currentStepIndex + 1}</strong> of {totalQuestions}
                </p>
              </div>

              {/* Progress Indicator Track & Counter */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#6E2332] font-medium tracking-wider">
                  {currentStepIndex + 1}/{totalQuestions}
                </span>
                <div className="w-32 sm:w-44 h-1.5 bg-[#E8E1D3] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#6E2332] transition-all duration-400 ease-out"
                    style={{ width: `${((currentStepIndex + 1) / totalQuestions) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Active Question Title & Subtext */}
            <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="mb-8">
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] font-light leading-snug mb-2">
                  {currentQuestion.question}
                </h3>
                <p className="text-xs sm:text-sm text-[#78716C] font-sans font-light">
                  {currentQuestion.subtext}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {currentQuestion.options.map((opt) => {
                  const isSelected = currentAnswer === opt.label;
                  return (
                    <button
                      key={opt.label}
                      type="button"
                      onClick={() => handleSelectOption(opt.label)}
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
                  {currentStepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={handleBack}
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
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 cursor-pointer ${
                    currentAnswer
                      ? 'btn-book-session shadow-sm'
                      : 'bg-[#E5DFD4] text-[#A39C90] cursor-not-allowed border border-[#D9D2C5]'
                  }`}
                >
                  <span>{currentStepIndex === totalQuestions - 1 ? 'Reveal Style Profile' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* ============================================================== */
          /* COMPLETED RESULT VIEW (PERSONAL STYLIST PROFILE)               */
          /* ============================================================== */
          <div className={`bg-[#FAF8F5] border border-[#E0D7C7] p-6 sm:p-10 lg:p-14 shadow-[0_20px_50px_-15px_rgba(31,30,29,0.08)] transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            
            {/* Dossier Header Tag */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#EAE3D6] gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#6E2332]" />
                <span className="text-[10.5px] uppercase tracking-[0.26em] text-[#6E2332] font-semibold font-sans">
                  LĀYA Personal Style Profile Dossier
                </span>
              </div>
              <button
                onClick={handleRestart}
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
                      src={calculatedResult.image}
                      alt={calculatedResult.name}
                      className="w-full h-full object-cover zoom-subtle"
                    />
                    <div className="absolute top-3.5 left-3.5 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase font-sans tracking-[0.2em] text-[#6E2332] font-semibold">
                      Signature Archetype
                    </div>
                  </div>
                </div>

                {/* Textile & Silhouette Specs */}
                <div className="mt-4 p-4 bg-[#FAF7F2] border border-[#E5DDD0] space-y-3 font-sans text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-1">
                      Silhouette Focus:
                    </span>
                    <p className="text-[#3E3A36] leading-snug">{calculatedResult.silhouetteFocus}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#78716C] font-semibold block mb-1">
                      Signature Handlooms:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {calculatedResult.idealFabrics.map((fab: string) => (
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
                    {calculatedResult.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider text-[#8E3547] font-sans mb-4">
                    {calculatedResult.subtitle}
                  </p>

                  <div className="p-4 bg-[#FAF5F2] border-l-2 border-[#6E2332] mb-6">
                    <p className="font-serif text-lg sm:text-xl text-[#1F1E1D] italic leading-snug">
                      “{calculatedResult.description}”
                    </p>
                  </div>

                  {/* Recommended Style Direction */}
                  <div className="space-y-3 text-xs sm:text-[13.5px] text-[#57534E] font-sans leading-relaxed mb-6">
                    <span className="text-[10.5px] uppercase tracking-[0.2em] text-[#1F1E1D] font-semibold block font-sans">
                      Recommended Style Direction
                    </span>
                    <p>{calculatedResult.styleDirection}</p>
                    <p className="text-[#6B655F] italic pt-1">{calculatedResult.personalizedNote}</p>
                  </div>

                  {/* Suggested Colour Mood Bar with Palette Chips */}
                  <div className="p-4 bg-[#F5F0E6] border border-[#E0D7C7] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#6E2332] font-semibold font-sans">
                        Suggested Colour Mood:
                      </span>
                      <span className="text-xs font-serif text-[#1F1E1D]">
                        {calculatedResult.colourMoodTitle}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {calculatedResult.colourPalette.map((chip: { name: string; hex: string }) => (
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
                {calculatedResult.outfitIdeas.map((outfit: { title: string; description: string; drapeTip: string }, oIdx: number) => (
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
                      <span className="font-semibold text-[#6E2332] not-italic block mb-0.5">
                        Stylist’s Drape Tip:
                      </span>
                      {outfit.drapeTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Action CTAs */}
            <div className="pt-8 border-t border-[#EAE3D6] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onOpenBooking(`Consultation: ${calculatedResult.name}`)}
                  className="btn-book-session w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs shadow-md cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Styling Session for This Look</span>
                </button>

                <button
                  type="button"
                  onClick={onExploreCollections}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#1F1E1D] text-[#1F1E1D] text-[11px] uppercase tracking-[0.18em] font-sans font-medium hover:bg-[#1F1E1D] hover:text-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Explore Collections</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="text-xs uppercase tracking-wider text-[#78716C] hover:text-[#6E2332] transition-colors font-sans py-2 cursor-pointer"
              >
                Try Different Answers
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
