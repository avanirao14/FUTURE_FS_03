import React from 'react';
import { Compass, Feather, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-28 sm:py-36 lg:py-44 bg-[#FAF8F5] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Editorial Layout: Left Narrative, Right Layered Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#6E2332]"></span>
              <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
                Our Provenance
              </span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight leading-[1.08] mb-8 text-balance">
              Born from a quiet reverence for Indian handcraft.
            </h2>

            <div className="space-y-6 text-[#57534E] text-sm sm:text-base font-sans font-light leading-relaxed">
              <p>
                <strong className="font-medium text-[#1F1E1D]">LĀYA</strong> was born out of a yearning for slowness in a world of accelerated fashion cycles. Named after the Sanskrit concept of cadence and rhythmic harmony, our studio bridges heirloom Indian textile craftsmanship with contemporary silhouette styling.
              </p>
              <p className="text-[#6B655F]">
                We believe your wardrobe is the most intimate gallery you will ever curate. Every saree, jacket, or kurta we design or recommend holds a lineage: the steady rhythm of a pit-loom in Maheshwar, the hand-guided needle of a zardozi karigar in Old Delhi, and the discerning vision of our styling consultants.
              </p>
              <p className="text-[#6B655F]">
                Rather than dictating rules, our team acts as thoughtful custodians of your personal style—helping you distill what resonates, release what feels borrowed, and step into looks that express your story with quiet assurance.
              </p>
            </div>

            {/* Quote Block */}
            <div className="mt-10 p-6 sm:p-7 bg-[#FAF7F2] border-l-2 border-[#6E2332] border-t border-r border-b border-[#ECE5D8]">
              <p className="font-serif text-xl sm:text-2xl text-[#1F1E1D] italic leading-snug">
                “Clothing is the poetry of how we choose to arrive in a room. It should never mask who you are; it should gently reveal it.”
              </p>
              <span className="block mt-3 text-[10.5px] uppercase tracking-[0.24em] text-[#78716C] font-sans font-medium">
                — Atelier Creative Direction, LĀYA
              </span>
            </div>

            {/* Core Values */}
            <div className="mt-12 grid grid-cols-2 gap-8 pt-8 border-t border-[#EAE3D6]">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#1F1E1D]">
                  <Feather className="w-4 h-4 text-[#6E2332]" />
                  <h4 className="font-serif text-xl font-normal">Weaver Stewardship</h4>
                </div>
                <p className="text-xs text-[#6B655F] font-sans leading-relaxed">
                  Honoring the generational memory preserved in hand-spun silks, fine mulmuls, and natural dyes.
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#1F1E1D]">
                  <Compass className="w-4 h-4 text-[#6E2332]" />
                  <h4 className="font-serif text-xl font-normal">Mindful Wardrobes</h4>
                </div>
                <p className="text-xs text-[#6B655F] font-sans leading-relaxed">
                  Focusing on versatile, heirloom silhouettes that transcend seasons, trends, and superficial codes.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Imagery with Museum Matting */}
          <div className="lg:col-span-6">
            <div className="relative">
              
              {/* Main Atelier Image with Passe-Partout Matting */}
              <div className="p-3 sm:p-4 bg-[#F5F0E6] border border-[#E0D7C7] shadow-sm">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85"
                    alt="LĀYA atelier space and handloom collection"
                    className="w-full h-full object-cover zoom-subtle"
                  />
                </div>
              </div>

              {/* Offset Overlapping Detail Image */}
              <div className="absolute -bottom-8 -left-6 sm:-bottom-12 sm:-left-10 w-44 sm:w-60 aspect-[3/4] overflow-hidden bg-[#FAF8F5] border-4 border-[#FAF8F5] shadow-xl hidden sm:block">
                <img
                  src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=85"
                  alt="Editorial client portrait at LĀYA"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Textile Badge */}
              <div className="absolute top-6 right-6 bg-[#FAF8F5]/96 backdrop-blur-xs p-4 border border-[#E0D8CB] shadow-md max-w-[190px]">
                <div className="flex items-center gap-1.5 text-[#6E2332] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[9.5px] uppercase tracking-[0.2em] font-semibold font-sans">
                    Artisanal Pledge
                  </span>
                </div>
                <p className="text-[11px] text-[#57534E] font-sans leading-tight">
                  100% small-batch handloom and cruelty-free organic silking.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

