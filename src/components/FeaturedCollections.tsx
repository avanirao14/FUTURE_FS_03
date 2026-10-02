import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CollectionItem } from '../types';
import { COLLECTIONS_DATA } from '../data/fashionData';

interface FeaturedCollectionsProps {
  onSelectCollection: (item: CollectionItem) => void;
  onOpenBooking: (serviceTitle?: string) => void;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({
  onSelectCollection,
  onOpenBooking
}) => {
  return (
    <section id="collections" className="py-28 sm:py-36 lg:py-40 bg-[#F6F2EA] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-[1px] bg-[#6E2332]"></span>
              <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
                Curated Categories
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight text-balance">
              Featured Collections
            </h2>
          </div>
          <p className="text-sm sm:text-[14.5px] text-[#6B655F] max-w-md font-sans font-light leading-relaxed">
            Four distinct sartorial capsules, thoughtfully designed and crafted with master artisans. Each edit explores textile heritage tailored for modern sensibilities.
          </p>
        </div>

        {/* 4 Category Cards Grid with Refined Proportions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7">
          {COLLECTIONS_DATA.map((item, index) => (
            <div
              key={item.id}
              onClick={() => onSelectCollection(item)}
              className="group cursor-pointer flex flex-col bg-[#FAF8F5] border border-[#E2DBD0] luxury-card"
            >
              {/* Image Frame with Refined Padding & Editorial Framing */}
              <div className="p-3 bg-[#FAF8F5] pb-0">
                <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center zoom-subtle"
                  />
                  
                  {/* Subtle scrim on hover */}
                  <div className="absolute inset-0 bg-[#1F1E1D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Corner Index Tag */}
                  <div className="absolute top-3.5 left-3.5 bg-[#FAF8F5]/90 backdrop-blur-xs px-2 py-0.5 text-[10px] font-serif tracking-widest text-[#1F1E1D]">
                    0{index + 1}
                  </div>

                  {/* Floating Quick Action */}
                  <div className="absolute bottom-3.5 right-3.5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] text-[#1F1E1D] text-[10.5px] font-sans tracking-[0.16em] uppercase shadow-md">
                      <span>View Edit</span>
                      <ArrowUpRight className="w-3 h-3 text-[#6E2332]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#8E3547] font-medium font-sans block mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-2xl text-[#1F1E1D] group-hover:text-[#6E2332] transition-colors duration-300 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed line-clamp-3 mb-5">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EAE3D6] flex items-center justify-between text-xs text-[#78716C] font-sans">
                  <span className="truncate max-w-[160px] text-[11.5px]">{item.fabric.split('&')[0]}</span>
                  <span className="font-medium text-[#6E2332] group-hover:text-[#551724] transition-colors flex items-center gap-1 text-[11.5px] uppercase tracking-wider">
                    Dossier
                    <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Styling */}
        <div className="mt-20 bg-[#FAF8F5] border border-[#E3DCCE] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#6E2332] font-semibold font-sans block">
              Bespoke Adaptation
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#1F1E1D] font-light">
              Looking for a customized fit or artisanal drape?
            </h4>
            <p className="text-xs sm:text-sm text-[#6B655F] font-sans leading-relaxed pt-1">
              Every piece in our collections can be tailored to your precise measurements or reimagined with alternative weaves during your private styling consultation.
            </p>
          </div>
          <button
            onClick={() => onOpenBooking('Custom Styling Consultation')}
            className="btn-book-session shrink-0 px-8 py-3.5 text-[11px] cursor-pointer"
          >
            Consult Our Stylist
          </button>
        </div>

      </div>
    </section>
  );
};

