import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenFindStyle: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenFindStyle }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#FAF7F2] border-t border-[#EAE3D6] text-[#1F1E1D] pt-24 pb-14">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E0D7C7]">
          
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.32em] font-light text-[#1F1E1D] block">
              LĀYA
            </span>
            <p className="text-[10px] uppercase tracking-[0.28em] font-sans text-[#6E2332] font-medium">
              Boutique & Personal Styling Studio
            </p>
            <p className="font-serif text-xl sm:text-2xl text-[#4A4642] italic font-light pt-1">
              “Wear your story.”
            </p>
            <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans font-light leading-relaxed max-w-sm pt-2">
              A bespoke sanctuary harmonizing Indian handcraft, mindful textiles, and personalized wardrobe consultations.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-sans font-semibold text-[#1F1E1D] block mb-4">
              Explore
            </span>
            <ul className="space-y-3 text-[12.5px] tracking-wide text-[#57534E] font-sans">
              <li>
                <a href="#hero" className="hover:text-[#6E2332] transition-colors">Home</a>
              </li>
              <li>
                <a href="#collections" className="hover:text-[#6E2332] transition-colors">Featured Collections</a>
              </li>
              <li>
                <button
                  onClick={onOpenFindStyle}
                  className="hover:text-[#6E2332] transition-colors text-left cursor-pointer"
                >
                  Find Your Style
                </button>
              </li>
              <li>
                <a href="#lookbook" className="hover:text-[#6E2332] transition-colors">Lookbook Archive</a>
              </li>
              <li>
                <a href="#styling" className="hover:text-[#6E2332] transition-colors">Styling Consultations</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#6E2332] transition-colors">The LĀYA Philosophy</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#6E2332] transition-colors">Contact & Ateliers</a>
              </li>
            </ul>
          </div>

          {/* Quick Actions / Ateliers */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-sans font-semibold text-[#1F1E1D] block mb-2">
              Private Sessions
            </span>
            <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed">
              Appointments available in our Bengaluru and Mumbai studios, as well as worldwide virtual video consultations.
            </p>
            
            <button
              onClick={onOpenBooking}
              className="btn-book-session w-full py-3.5 text-xs text-center cursor-pointer shadow-sm"
            >
              Book a Styling Session
            </button>

            {/* Back to top button */}
            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs text-[#78716C] hover:text-[#1F1E1D] transition-colors cursor-pointer"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Return to top</span>
              </button>
            </div>
          </div>

        </div>

        {/* Student Project Notice & Disclaimers */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#78716C] font-sans">
          
          <div className="p-4 bg-[#FAF8F5] border border-[#E0D7C7] max-w-xl">
            <p className="font-semibold text-[#1F1E1D] mb-0.5 tracking-wide">
              Student Project — Website Concept
            </p>
            <p className="text-[11px] leading-relaxed text-[#6B655F]">
              This project is a design concept and portfolio study for a contemporary luxury Indian boutique & styling studio. It is not an official commercial website for any real business.
            </p>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="text-[11px] text-[#8C8578]">
              Designed with care & reverence for Indian textile heritage.
            </p>
            <p className="text-[11px] text-[#8C8578]">
              © {new Date().getFullYear()} LĀYA Studio. All rights reserved.
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
};

