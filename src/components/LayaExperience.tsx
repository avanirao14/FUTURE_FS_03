import React from 'react';
import { ArrowRight, Layers, UserCheck, Sparkles } from 'lucide-react';

interface LayaExperienceProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onExploreCollections: () => void;
}

export const LayaExperience: React.FC<LayaExperienceProps> = ({
  onOpenBooking,
  onExploreCollections,
}) => {
  return (
    <section className="py-28 sm:py-36 lg:py-44 bg-[#FAF8F5] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28">
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
            <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
              Atelier Methodology
            </span>
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight mb-6 text-balance">
            The LĀYA Experience
          </h2>
          <p className="text-base sm:text-lg text-[#6B655F] font-serif font-light leading-relaxed text-balance max-w-xl mx-auto">
            A three-fold journey from rare textile discovery to personal wardrobe resonance.
          </p>
        </div>

        {/* 3 Pillars Editorial Narrative with Elevated Spacing */}
        <div className="space-y-28 sm:space-y-36 lg:space-y-44">
          
          {/* Pillar 1: Curated Collections */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#78716C] mb-4 font-sans">
                <span className="font-serif text-2xl text-[#6E2332]">01</span>
                <span>/ Textile Alchemy</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1E1D] font-light mb-6 leading-tight">
                Curated Collections
              </h3>
              <p className="text-sm sm:text-base text-[#57534E] font-sans font-light leading-relaxed mb-8">
                Our boutique houses hand-selected edits from heritage looms across India. Each piece represents an intimate partnership with master weavers in Varanasi, Chanderi, Maheshwar, and Bengal.
              </p>
              
              <div className="space-y-4 mb-10 text-xs sm:text-[13px] text-[#6B655F] font-sans border-l border-[#6E2332]/30 pl-5">
                <p>· Small-batch productions with non-repeating artisanal motifs.</p>
                <p>· Pure, breathable natural fibers: tussar, mulmul, katan, and linen.</p>
                <p>· Direct-to-artisan transparency honoring generational handcraft.</p>
              </div>

              <button
                onClick={onExploreCollections}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-sans font-medium text-[#1F1E1D] hover:text-[#6E2332] transition-colors border-b border-[#1F1E1D] hover:border-[#6E2332] pb-1 cursor-pointer"
              >
                <span>Discover In-Studio Garments</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="p-3 sm:p-4 bg-[#F5F0E6] border border-[#E0D7C7] shadow-sm">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=85"
                    alt="Curated textile studio rack at LĀYA"
                    className="w-full h-full object-cover zoom-subtle"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/92 backdrop-blur-xs px-3.5 py-1.5 text-[11px] font-sans tracking-wider text-[#1F1E1D] flex items-center gap-2 border border-[#E0D8CB]">
                    <Layers className="w-3 h-3 text-[#6E2332]" />
                    <span>Artisanal Weaves & Swatches</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pillar 2: Personal Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6">
              <div className="p-3 sm:p-4 bg-[#F5F0E6] border border-[#E0D7C7] shadow-sm">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=85"
                    alt="Personal styling consultation at LĀYA"
                    className="w-full h-full object-cover zoom-subtle"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/92 backdrop-blur-xs px-3.5 py-1.5 text-[11px] font-sans tracking-wider text-[#1F1E1D] flex items-center gap-2 border border-[#E0D8CB]">
                    <UserCheck className="w-3 h-3 text-[#6E2332]" />
                    <span>Private Consultation Atelier</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#78716C] mb-4 font-sans">
                <span className="font-serif text-2xl text-[#6E2332]">02</span>
                <span>/ Intuitive Guidance</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1E1D] font-light mb-6 leading-tight">
                Personal Styling
              </h3>
              <p className="text-sm sm:text-base text-[#57534E] font-sans font-light leading-relaxed mb-8">
                Wardrobe styling at LĀYA is collaborative, deeply respectful, and judgment-free. We delve into how you want to feel, decoding your color undertones, proportions, and everyday lifestyle needs.
              </p>

              <div className="space-y-4 mb-10 text-xs sm:text-[13px] text-[#6B655F] font-sans border-l border-[#6E2332]/30 pl-5">
                <p>· Color spectrum harmonization suited to South Asian and olive complexions.</p>
                <p>· Modern drape techniques that remain comfortable for hours.</p>
                <p>· Complete accessorizing from heirloom jewelry to footwear balance.</p>
              </div>

              <button
                onClick={() => onOpenBooking('Personal Styling Consultation')}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-sans font-medium text-[#1F1E1D] hover:text-[#6E2332] transition-colors border-b border-[#1F1E1D] hover:border-[#6E2332] pb-1 cursor-pointer"
              >
                <span>Reserve a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pillar 3: Looks Made for You */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-[#78716C] mb-4 font-sans">
                <span className="font-serif text-2xl text-[#6E2332]">03</span>
                <span>/ Bespoke Cohesion</span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1E1D] font-light mb-6 leading-tight">
                Looks Made for You
              </h3>
              <p className="text-sm sm:text-base text-[#57534E] font-sans font-light leading-relaxed mb-8">
                The outcome is an impeccably tailored, versatile wardrobe blueprint. Whether it is an unforgettable bridal ensemble, milestone festive gathering, or a refined executive rotation, your pieces communicate ease and distinction.
              </p>

              <div className="space-y-4 mb-10 text-xs sm:text-[13px] text-[#6B655F] font-sans border-l border-[#6E2332]/30 pl-5">
                <p>· Personalized digital lookbook with 15+ ready-to-wear combination formulas.</p>
                <p>· Custom alterations conducted by master tailors at our studio.</p>
                <p>· Post-session WhatsApp styling advisory for spontaneous occasion queries.</p>
              </div>

              <button
                onClick={() => onOpenBooking('Signature Wardrobe Edit')}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-sans font-medium text-[#1F1E1D] hover:text-[#6E2332] transition-colors border-b border-[#1F1E1D] hover:border-[#6E2332] pb-1 cursor-pointer"
              >
                <span>Begin Your Style Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="p-3 sm:p-4 bg-[#F5F0E6] border border-[#E0D7C7] shadow-sm">
                <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                    alt="Client portrait in custom LĀYA styled silhouette"
                    className="w-full h-full object-cover zoom-subtle"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#FAF8F5]/92 backdrop-blur-xs px-3.5 py-1.5 text-[11px] font-sans tracking-wider text-[#1F1E1D] flex items-center gap-2 border border-[#E0D8CB]">
                    <Sparkles className="w-3 h-3 text-[#6E2332]" />
                    <span>The Completed Signature Look</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

