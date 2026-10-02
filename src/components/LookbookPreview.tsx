import React, { useState } from 'react';
import { Eye, ArrowUpRight } from 'lucide-react';
import { LOOKBOOK_LOOKS } from '../data/fashionData';
import { LookbookLook } from '../types';

interface LookbookPreviewProps {
  onSelectLook: (look: LookbookLook) => void;
  onOpenBooking: (serviceTitle?: string) => void;
}

export const LookbookPreview: React.FC<LookbookPreviewProps> = ({
  onSelectLook,
  onOpenBooking
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Festive Luxe', 'Contemporary', 'Everyday', 'Occasion'];

  const filteredLooks = selectedFilter === 'All'
    ? LOOKBOOK_LOOKS
    : LOOKBOOK_LOOKS.filter(l => l.category === selectedFilter);

  return (
    <section id="lookbook" className="py-28 sm:py-36 lg:py-40 bg-[#FAF8F5] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header with Title and Filter Segmented Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#6E2332]"></span>
              <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
                Editorial Archive
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight text-balance">
              Lookbook Preview
            </h2>
            <p className="text-sm sm:text-[14.5px] text-[#6B655F] max-w-lg mt-3 font-sans font-light leading-relaxed">
              Curated drapes and sculpted silhouettes styled by our atelier. Click any look to examine textile origins, palette harmonies, and drapery composition.
            </p>
          </div>

          {/* Interactive Filter Controls - Refined Luxury Segmented Bar */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#F2EDE4] border border-[#E0D7C7]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-4 py-2 text-[11px] font-sans tracking-[0.16em] uppercase transition-all duration-300 cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-[#1F1E1D] text-[#FAF8F5] shadow-xs font-medium'
                    : 'text-[#57534E] hover:text-[#1F1E1D] hover:bg-[#EAE2D3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Editorial Grid with Museum Matting */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredLooks.map((look) => (
            <div
              key={look.id}
              onClick={() => onSelectLook(look)}
              className="group cursor-pointer flex flex-col bg-[#FAF8F5] border border-[#E2DBD0] luxury-card"
            >
              {/* Image Frame with Museum Matting */}
              <div className="p-3 bg-[#FAF8F5] pb-0">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src={look.image}
                    alt={look.title}
                    className="w-full h-full object-cover object-center zoom-subtle"
                  />

                  <div className="absolute inset-0 bg-[#1F1E1D]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>

                  {/* Top Corner Category Tag */}
                  <div className="absolute top-3.5 left-3.5 bg-[#FAF8F5]/92 backdrop-blur-xs px-2.5 py-1 text-[9.5px] uppercase font-sans tracking-[0.2em] text-[#6E2332] font-medium">
                    {look.category}
                  </div>

                  {/* Center Hover Action */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] text-[#1F1E1D] text-[10.5px] font-sans uppercase tracking-[0.2em] shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#6E2332]" />
                      <span>Examine Look</span>
                    </span>
                  </div>

                  {/* Bottom Color Swatches with Fine Outlines */}
                  <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-1 border border-[#E0D8CB]">
                    {look.palette.map((color, cIdx) => (
                      <span
                        key={cIdx}
                        className="w-3 h-3 rounded-full border border-black/15 inline-block"
                        style={{ backgroundColor: color }}
                        title={`Palette tone ${cIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Look Caption Content */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-[#1F1E1D] group-hover:text-[#6E2332] transition-colors duration-300 mb-2">
                    {look.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed mb-4 line-clamp-2">
                    {look.concept}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between text-xs font-sans">
                  <span className="text-[#57534E] text-[11.5px] font-normal truncate max-w-[200px]">
                    {look.textile}
                  </span>
                  <span className="text-[#6E2332] flex items-center gap-1 text-[11.5px] uppercase tracking-wider font-medium">
                    Inspect
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lookbook Footer Note */}
        <div className="mt-20 text-center">
          <p className="text-sm text-[#78716C] font-sans mb-4">
            Wish to try on or adapt any of these editorial ensembles?
          </p>
          <button
            onClick={() => onOpenBooking('Lookbook Styling Trial')}
            className="btn-book-session inline-flex items-center justify-center px-8 py-3.5 text-[11px] cursor-pointer"
          >
            <span>Book a Lookbook Styling Trial</span>
          </button>
        </div>

      </div>
    </section>
  );
};

