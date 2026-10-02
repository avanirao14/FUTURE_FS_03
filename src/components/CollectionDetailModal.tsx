import React from 'react';
import { X, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CollectionItem } from '../types';

interface CollectionDetailModalProps {
  collection: CollectionItem | null;
  onClose: () => void;
  onBookStyling: (serviceTitle?: string) => void;
}

export const CollectionDetailModal: React.FC<CollectionDetailModalProps> = ({
  collection,
  onClose,
  onBookStyling,
}) => {
  if (!collection) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1F1E1D]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-[#FAF8F5] border border-[#E3DCCE] max-w-3xl w-full p-6 sm:p-10 shadow-2xl z-10">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#78716C] hover:text-[#1F1E1D] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Image */}
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE5D8] border border-[#E0D8CB]">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-sans tracking-widest text-[#6E2332]">
                  {collection.category}
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="md:col-span-7 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#6E2332] font-semibold font-sans block mb-1">
                  Collection Dossier
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] mb-1">
                  {collection.title}
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#78716C] font-sans mb-4">
                  {collection.subtitle}
                </p>

                <p className="text-sm text-[#57534E] font-sans leading-relaxed mb-6">
                  {collection.description}
                </p>

                {/* Fabric & Silhouette */}
                <div className="space-y-3.5 mb-6 text-xs font-sans">
                  <div className="p-3 bg-[#FAF7F2] border border-[#ECE5D8]">
                    <span className="font-semibold text-[#1F1E1D] uppercase tracking-wider text-[10px] block mb-1">
                      Textile & Weave
                    </span>
                    <p className="text-[#57534E]">{collection.fabric}</p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2] border border-[#ECE5D8]">
                    <span className="font-semibold text-[#1F1E1D] uppercase tracking-wider text-[10px] block mb-1">
                      Silhouette Architecture
                    </span>
                    <p className="text-[#57534E]">{collection.silhouette}</p>
                  </div>
                </div>

                {/* Styling Tip */}
                <div className="p-3.5 bg-[#F6EFE3] border-l-2 border-[#6E2332] text-xs font-sans mb-6">
                  <span className="font-semibold text-[#6E2332] block mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Atelier Styling Note
                  </span>
                  <p className="text-[#57534E] italic">{collection.stylingTip}</p>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 mb-8">
                  {collection.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#57534E] font-sans">
                      <Check className="w-3.5 h-3.5 text-[#6E2332]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#EAE3D6]">
                <button
                  onClick={() => {
                    onClose();
                    onBookStyling(`${collection.title} Fitting`);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#6E2332] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-sans font-medium hover:bg-[#551724] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book Fitting For This Edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 border border-[#D9D2C7] text-xs uppercase tracking-wider font-sans text-[#57534E] hover:text-[#1F1E1D] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
