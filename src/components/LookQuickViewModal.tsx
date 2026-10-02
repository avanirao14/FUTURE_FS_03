import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import { LookbookLook } from '../types';

interface LookQuickViewModalProps {
  look: LookbookLook | null;
  onClose: () => void;
  onBookStyling: (serviceTitle?: string) => void;
}

export const LookQuickViewModal: React.FC<LookQuickViewModalProps> = ({
  look,
  onClose,
  onBookStyling,
}) => {
  if (!look) return null;

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
            aria-label="Close look view"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Image */}
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#ECE5D8] border border-[#E0D8CB]">
                <img
                  src={look.image}
                  alt={look.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 text-[10px] uppercase font-sans tracking-widest text-[#6E2332]">
                  {look.category}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#6E2332] font-semibold font-sans block mb-1">
                  Editorial Archive
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] mb-2">
                  {look.title}
                </h3>
                <p className="text-sm text-[#57534E] font-sans leading-relaxed">
                  {look.concept}
                </p>
              </div>

              {/* Textile & Palette */}
              <div className="p-4 bg-[#FAF7F2] border border-[#ECE5D8] space-y-3 font-sans text-xs">
                <div>
                  <span className="font-semibold text-[#1F1E1D] block mb-1">
                    Textile Construction:
                  </span>
                  <p className="text-[#57534E]">{look.textile}</p>
                </div>

                <div>
                  <span className="font-semibold text-[#1F1E1D] block mb-1.5">
                    Curated Color Harmonies:
                  </span>
                  <div className="flex items-center gap-2">
                    {look.palette.map((hex, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span
                          className="w-5 h-5 rounded-full border border-black/10 shadow-xs inline-block"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-[10px] font-mono text-[#78716C]">{hex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Styling Notes */}
              <div className="p-4 bg-[#F5EFE4] border-l-2 border-[#6E2332] text-xs font-sans">
                <span className="font-semibold text-[#6E2332] flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Stylist’s Drapery & Accessorizing Note
                </span>
                <p className="text-[#57534E] leading-relaxed italic">
                  {look.stylingNotes}
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#EAE3D6]">
                <button
                  onClick={() => {
                    onClose();
                    onBookStyling(`Style Consultation for ${look.title}`);
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#6E2332] text-[#FAF8F5] text-xs uppercase tracking-[0.18em] font-sans font-medium hover:bg-[#551724] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Recreate / Tailor This Look For Me</span>
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
