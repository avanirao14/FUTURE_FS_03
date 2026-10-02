import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onOpenFindStyle: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onOpenFindStyle }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center bg-[#FAF8F5] overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28 lg:py-32">
      {/* Delicate Architectural Grid Hairlines for Quiet Structure */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 lg:px-12 grid grid-cols-4 lg:grid-cols-12">
          <div className="border-r border-[#E5DDD0] h-full col-span-1"></div>
          <div className="border-r border-[#E5DDD0] h-full col-span-1 hidden lg:block"></div>
          <div className="border-r border-[#E5DDD0] h-full col-span-2 lg:col-span-4"></div>
          <div className="border-r border-[#E5DDD0] h-full col-span-1 hidden lg:block"></div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* Left Column: Editorial Typography & Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1">
            
            {/* Atelier Kicker */}
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#6E2332]"></span>
              <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
                Autumn / Winter Atelier
              </span>
            </div>

            {/* Headline with Editorial Serif Emphasis */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-[#1F1E1D] tracking-[-0.02em] leading-[1.02] mb-8 text-balance">
              Wear your <span className="italic font-normal font-serif text-[#6E2332]">story.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-xl sm:text-2xl text-[#3D3A37] font-serif font-normal leading-relaxed max-w-xl mb-6 text-balance">
              Curated fashion, thoughtful styling, and looks designed around you.
            </p>

            {/* Editorial Descriptor */}
            <p className="text-sm sm:text-[14.5px] text-[#6B655F] font-sans font-light leading-relaxed max-w-xl mb-12">
              At LĀYA, we honor the intimacy between identity and silhouette. Discover handcrafted Indian textiles, timeless cuts, and intuitive personal styling shaped to your authentic cadence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              <button
                onClick={onExploreCollection}
                className="group inline-flex items-center justify-center gap-3 px-9 py-4 bg-[#1F1E1D] text-[#FAF8F5] text-[11px] uppercase tracking-[0.22em] font-sans font-medium transition-all duration-400 hover:bg-[#6E2332] shadow-sm cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-400 group-hover:translate-x-1" />
              </button>

              <button
                onClick={onOpenFindStyle}
                className="group inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-transparent border border-[#6E2332]/50 text-[#6E2332] hover:bg-[#6E2332]/5 text-[11px] uppercase tracking-[0.22em] font-sans font-medium transition-all duration-400 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#6E2332]" />
                <span>Find Your Style</span>
              </button>
            </div>

            {/* Subtle Brand Pillars - Clean Unboxed Typographic Presentation */}
            <div className="mt-16 pt-10 border-t border-[#EAE3D6] grid grid-cols-3 gap-8">
              <div>
                <span className="font-serif text-2xl text-[#1F1E1D] block">01</span>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E2332] font-medium font-sans mt-1">
                  Handloom Weaves
                </p>
                <p className="text-xs text-[#78716C] font-sans mt-0.5 hidden sm:block">
                  Artisanal small batches
                </p>
              </div>

              <div>
                <span className="font-serif text-2xl text-[#1F1E1D] block">02</span>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E2332] font-medium font-sans mt-1">
                  1-on-1 Styling
                </p>
                <p className="text-xs text-[#78716C] font-sans mt-0.5 hidden sm:block">
                  Silhouette diagnosis
                </p>
              </div>

              <div>
                <span className="font-serif text-2xl text-[#1F1E1D] block">03</span>
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#6E2332] font-medium font-sans mt-1">
                  Made For You
                </p>
                <p className="text-xs text-[#78716C] font-sans mt-0.5 hidden sm:block">
                  Bespoke fittings
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Hero Imagery with High-Fashion Matting */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Refined Museum-Matted Image Frame */}
              <div className="p-3 sm:p-4 bg-[#F5F0E6] border border-[#E0D7C7] shadow-[0_20px_50px_-15px_rgba(31,30,29,0.08)]">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E7DFD1]">
                  <img
                    src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=85"
                    alt="LĀYA Editorial Indian Silk Drape"
                    className="w-full h-full object-cover object-center zoom-subtle"
                  />
                  
                  {/* Subtle Gradient Scrim at Bottom for Editorial Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Editorial Caption on Image */}
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#E8E0D2] font-sans mb-1">
                      Tissue Chanderi Silk · Edition 04
                    </p>
                    <p className="font-serif text-lg sm:text-xl font-light tracking-wide">
                      The Gilded Aureate Drape
                    </p>
                  </div>
                </div>
              </div>

              {/* Offset Fine Hairline Accent Frame */}
              <div className="absolute -inset-2.5 sm:-inset-3 border border-[#6E2332]/25 pointer-events-none -z-10 translate-x-1.5 translate-y-1.5"></div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

