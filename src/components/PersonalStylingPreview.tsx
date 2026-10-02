import React from 'react';
import { Clock, MapPin, Video } from 'lucide-react';
import { STYLING_SERVICES } from '../data/fashionData';

interface PersonalStylingPreviewProps {
  onOpenBooking: (serviceTitle?: string) => void;
}

export const PersonalStylingPreview: React.FC<PersonalStylingPreviewProps> = ({ onOpenBooking }) => {
  return (
    <section id="styling" className="py-28 sm:py-36 lg:py-44 bg-[#F6F2EA] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
            <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
              Bespoke Styling Atelier
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight mb-6 text-balance">
            Your wardrobe. Your story. Our guidance.
          </h2>
          <p className="text-base sm:text-lg text-[#6B655F] font-serif font-light leading-relaxed text-balance">
            Personal styling is neither about rigid fashion rules nor temporary trends. It is an intentional sanctuary where your silhouette, comfort, and authentic character take precedence.
          </p>
        </div>

        {/* 3 Consultation Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {STYLING_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col justify-between p-8 sm:p-9 bg-[#FAF8F5] border luxury-card relative ${
                index === 0
                  ? 'border-[#6E2332]/70 shadow-[0_12px_36px_rgba(110,35,50,0.06)]'
                  : 'border-[#E2DBD0]'
              }`}
            >
              {index === 0 && (
                <div className="absolute -top-3 left-8 bg-[#6E2332] text-[#FAF8F5] text-[9.5px] uppercase font-sans font-medium tracking-[0.24em] px-3.5 py-1 shadow-sm">
                  Signature Atelier Edit
                </div>
              )}

              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-[#78716C] font-sans mb-5 pt-1">
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5 text-[#6E2332]" />
                    {service.duration}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                    {service.mode.includes('Virtual') ? (
                      <Video className="w-3.5 h-3.5 text-[#6E2332]" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-[#6E2332]" />
                    )}
                    {service.mode}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#1F1E1D] font-normal mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8E3547] font-sans font-medium mb-4">
                  {service.tagline}
                </p>
                <p className="text-xs sm:text-[13.5px] text-[#57534E] font-sans leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Inclusions */}
                <div className="pt-6 border-t border-[#EAE3D6] space-y-3 mb-8">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#78716C] font-semibold block mb-3 font-sans">
                    Consultation Framework
                  </span>
                  {service.includes.map((inc, iIdx) => (
                    <div key={iIdx} className="flex items-start gap-3 text-xs text-[#44403C] font-sans">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6E2332] mt-1.5 shrink-0"></span>
                      <span className="leading-relaxed">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-3.5 bg-[#F4EFE6] border border-[#E5DDD0] mb-6 text-[11px] text-[#6B655F] font-sans leading-relaxed">
                  <span className="font-semibold text-[#1F1E1D]">Ideal For: </span>
                  {service.idealFor}
                </div>

                <button
                  onClick={() => onOpenBooking(service.title)}
                  className={`w-full py-3.5 text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-all duration-300 cursor-pointer ${
                    index === 0
                      ? 'btn-book-session'
                      : 'bg-[#1F1E1D] text-[#FAF8F5] hover:bg-[#6E2332]'
                  }`}
                >
                  Book This Session
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Atmosphere & Studio Highlights Banner */}
        <div className="bg-[#FAF8F5] border border-[#E3DCCE] p-8 sm:p-14 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#6E2332] font-semibold font-sans block">
              Atelier Environment
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] font-light">
              Private, sensory, unhurried appointments.
            </h3>
            <p className="text-xs sm:text-sm text-[#57534E] font-sans font-light leading-relaxed max-w-2xl pt-1">
              Enjoy organic Darjeeling tea, touch master swatches, and experience private fitting suites bathed in natural daylight at our Bengaluru and Mumbai concept studios. Virtual clients receive fabric moodboard samples delivered ahead of their video session.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end gap-3.5">
            <button
              onClick={() => onOpenBooking()}
              className="btn-book-session w-full py-4 text-xs text-center cursor-pointer shadow-md"
            >
              <span>Book a Styling Session</span>
            </button>
            <p className="text-[11px] text-center text-[#78716C] font-sans">
              Complimentary 15-minute alignment call included.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

