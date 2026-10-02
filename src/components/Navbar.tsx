import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (serviceTitle?: string) => void;
  onOpenFindStyle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenFindStyle }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Collections', href: '#collections' },
    { label: 'Find Your Style', action: onOpenFindStyle },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Styling', href: '#styling' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);
    if (link.action) {
      link.action();
    } else if (link.href) {
      const el = document.querySelector(link.href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top Concept Announcement Bar - Understated, Fine Typography */}
      <div className="bg-[#1C1B1A] text-[#D8D0C2] text-[10px] sm:text-[11px] tracking-[0.24em] uppercase py-2 px-4 text-center font-sans border-b border-[#2B2927]">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
          <span>Student Project — Website Concept</span>
          <span className="text-[#6E2332]">·</span>
          <span className="text-[#A89F91]">Bengaluru & Mumbai Private Ateliers</span>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#FAF8F5]/96 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.03)] border-b border-[#EAE3D6] py-4'
            : 'bg-[#FAF8F5] border-b border-[#EAE3D6]/60 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Logo / Wordmark */}
          <a
            href="#hero"
            className="group flex flex-col items-start focus-visible:outline-none"
            aria-label="LĀYA Boutique Home"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.32em] font-light text-[#1F1E1D] group-hover:text-[#6E2332] transition-colors duration-300">
              LĀYA
            </span>
            <span className="text-[9px] tracking-[0.3em] uppercase font-sans text-[#78716C] -mt-0.5 group-hover:text-[#57534E] transition-colors">
              Boutique & Styling Studio
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-9">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item)}
                className={`text-[12.5px] tracking-[0.14em] uppercase font-sans transition-all duration-300 relative py-1 focus-visible:outline-none cursor-pointer group ${
                  item.label === 'Find Your Style'
                    ? 'text-[#6E2332] font-medium hover:text-[#8E3547]'
                    : 'text-[#44403C] hover:text-[#1F1E1D]'
                }`}
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#6E2332] transition-all duration-300 ease-out group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right Header Actions: Distinctive Book Session Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-session hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[11px] cursor-pointer"
            >
              <span>Book Session</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1F1E1D] hover:text-[#6E2332] transition-colors focus-visible:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1F1E1D]/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Sheet */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#FAF8F5] shadow-2xl p-8 flex flex-col justify-between border-l border-[#EAE3D6] z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#EAE3D6]">
                <div>
                  <span className="font-serif text-2xl tracking-[0.3em] text-[#1F1E1D] block">LĀYA</span>
                  <p className="text-[9px] tracking-[0.25em] uppercase text-[#78716C]">Boutique & Styling Studio</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#57534E] hover:text-[#1F1E1D] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-8 flex flex-col space-y-4">
                {navLinks.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleLinkClick(item)}
                    className="flex items-center justify-between text-left py-3 text-sm font-sans tracking-[0.1em] uppercase text-[#292524] hover:text-[#6E2332] border-b border-[#F4EFE6] transition-colors"
                  >
                    <span className={item.label === 'Find Your Style' ? 'text-[#6E2332] font-medium' : ''}>
                      {item.label}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#A8A29E]" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#EAE3D6] space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-book-session w-full py-3.5 text-xs text-center cursor-pointer"
              >
                Book a Styling Session
              </button>
              <p className="text-[11px] text-center text-[#78716C] font-sans">
                Student Concept · Indiranagar & Bandra Ateliers
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

