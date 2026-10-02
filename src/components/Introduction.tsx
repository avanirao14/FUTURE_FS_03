import React from 'react';

export const Introduction: React.FC = () => {
  return (
    <section className="py-28 sm:py-36 lg:py-44 bg-[#FAF8F5] border-t border-[#EAE3D6] relative">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center justify-center mb-8">
          <span className="w-10 h-[1px] bg-[#C4BAA9]"></span>
          <span className="mx-4 font-sans text-[10.5px] tracking-[0.32em] text-[#6E2332] uppercase font-medium">
            The Philosophy
          </span>
          <span className="w-10 h-[1px] bg-[#C4BAA9]"></span>
        </div>

        {/* Heading with large editorial scaling */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl text-[#1F1E1D] font-light tracking-tight leading-[1.08] mb-10 text-balance">
          Style begins with you.
        </h2>

        {/* Brand Narrative */}
        <div className="space-y-6 text-[#4F4B47] text-lg sm:text-xl md:text-2xl font-serif font-light leading-relaxed max-w-3xl mx-auto text-balance">
          <p>
            At <strong className="font-normal text-[#1F1E1D]">LĀYA</strong>, we believe true elegance is never about conformity—it is an authentic dialogue between who you are and how you inhabit the world.
          </p>
        </div>

        <p className="text-sm sm:text-base text-[#78716C] font-sans font-light leading-relaxed max-w-2xl mx-auto mt-6 text-balance">
          By harmonizing thoughtfully curated Indian fashion with personalized wardrobe styling, we guide you beyond fleeting trends to discover ensembles that mirror your temperament, celebrate your silhouette, and honor your personal narrative.
        </p>

        {/* 3 Pillars Matrix - Clean, Airy, Editorial Presentation without mechanical icons */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-left border-t border-[#EAE3D6] pt-14">
          
          <div className="space-y-3">
            <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans block">
              Curated With Intent
            </span>
            <h3 className="font-serif text-2xl text-[#1F1E1D] font-normal">
              Heritage Weaves
            </h3>
            <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed">
              Every garment in our boutique is chosen for its artisanal integrity, tactile drape, and timeless silhouette, hand-sourced from India’s master weaver clusters.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans block">
              Personal Expression
            </span>
            <h3 className="font-serif text-2xl text-[#1F1E1D] font-normal">
              Empathetic Styling
            </h3>
            <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed">
              We reject one-size-fits-all styling formulas. Your consultation begins by listening to your memories, comfort boundaries, and personal aesthetic aspirations.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans block">
              Sustainable Grace
            </span>
            <h3 className="font-serif text-2xl text-[#1F1E1D] font-normal">
              Enduring Heirloom
            </h3>
            <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed">
              We advocate for heirloom longevity—pieces you cherish for decades, restyled seamlessly across casual days, cultural celebrations, and milestone soirées.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

