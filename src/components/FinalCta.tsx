import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';

interface FinalCtaProps {
  onOpenBooking: () => void;
  onOpenFindStyle: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onOpenBooking, onOpenFindStyle }) => {
  return (
    <section className="relative py-32 sm:py-40 lg:py-48 bg-[#1C1B1A] text-[#FAF8F5] overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* Kicker */}
        <div className="inline-flex items-center justify-center gap-3 mb-8">
          <span className="w-8 h-[1px] bg-[#B89667]"></span>
          <span className="text-[10.5px] uppercase tracking-[0.32em] font-sans font-medium text-[#D4AF37]">
            Begin Your Chapter
          </span>
          <span className="w-8 h-[1px] bg-[#B89667]"></span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.02em] text-[#FAF8F5] mb-8 text-balance">
          Let’s find your <span className="italic font-normal text-[#D4AF37]">signature style.</span>
        </h2>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-[#D9D2C7] font-serif font-light leading-relaxed max-w-2xl mx-auto mb-14 text-balance">
          Whether you are preparing for a once-in-a-lifetime celebration or curating an effortless daily rotation, our stylists are here to guide your journey.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          <button
            onClick={onOpenBooking}
            className="btn-book-session w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-xs tracking-[0.22em] shadow-lg cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book a Styling Session</span>
          </button>

          <button
            onClick={onOpenFindStyle}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 border border-[#FAF8F5]/30 text-[#FAF8F5] hover:bg-white/10 text-[11px] uppercase tracking-[0.22em] font-sans font-medium transition-all duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Find Your Style Preview</span>
          </button>
        </div>

        {/* Student Project Note in CTA */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-[#9E978C] font-sans">
          <span>Student Project — Concept Website</span>
          <span>·</span>
          <span>Boutique & Personal Styling Studio</span>
          <span>·</span>
          <span>Bengaluru & Mumbai Ateliers</span>
        </div>

      </div>
    </section>
  );
};

