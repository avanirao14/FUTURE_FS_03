import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2, MapPin, Video, Sparkles } from 'lucide-react';
import { STYLING_SERVICES } from '../data/fashionData';
import { BookingFormState } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: preselectedService || STYLING_SERVICES[0].title,
    preferredDate: '',
    preferredTime: '11:30 AM',
    sessionMode: 'In-Studio (Bengaluru Atelier)',
    styleGoals: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1F1E1D]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-[#FAF8F5] border border-[#E3DCCE] max-w-2xl w-full p-6 sm:p-10 shadow-2xl z-10">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-[#78716C] hover:text-[#1F1E1D] transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-5 h-5" />
          </button>

          {isConfirmed ? (
            /* Confirmation View */
            <div className="py-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#6E2332]/10 text-[#6E2332] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-[0.25em] text-[#6E2332] font-semibold block mb-2 font-sans">
                Consultation Reserved
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] mb-4">
                We look forward to meeting you, {formData.fullName || 'Guest'}.
              </h3>
              <p className="text-sm text-[#57534E] font-sans max-w-lg mx-auto leading-relaxed mb-6">
                Your styling consultation for <strong className="text-[#1F1E1D]">{formData.serviceType}</strong> has been logged. Our styling director will send an email confirmation and styling questionnaire to <strong className="text-[#1F1E1D]">{formData.email}</strong>.
              </p>

              <div className="p-4 bg-[#FAF7F2] border border-[#E8E1D5] max-w-md mx-auto text-left text-xs space-y-2 mb-8 font-sans">
                <div className="flex justify-between text-[#78716C]">
                  <span>Mode:</span>
                  <span className="font-medium text-[#1F1E1D]">{formData.sessionMode}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Preferred Date:</span>
                  <span className="font-medium text-[#1F1E1D]">{formData.preferredDate || 'Upcoming Open Slot'}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Preferred Time:</span>
                  <span className="font-medium text-[#1F1E1D]">{formData.preferredTime}</span>
                </div>
                <div className="flex justify-between text-[#78716C]">
                  <span>Appointment Ref:</span>
                  <span className="font-mono text-[#6E2332]">LAYA-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-8 py-3 bg-[#1F1E1D] text-[#FAF8F5] text-xs uppercase tracking-widest font-sans font-medium hover:bg-[#6E2332] transition-colors"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <div>
              <div className="mb-6 border-b border-[#EAE3D6] pb-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-4 h-[1px] bg-[#6E2332]"></span>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#6E2332] font-semibold font-sans">
                    LĀYA Styling Concierge
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-[#1F1E1D]">
                  Book a Personal Styling Session
                </h3>
                <p className="text-xs sm:text-sm text-[#78716C] font-sans mt-1">
                  Private one-on-one appointments tailored to your silhouette, palette, and wardrobe aspirations.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service Selection */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                    Select Consultation *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                  >
                    {STYLING_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.duration})
                      </option>
                    ))}
                    <option value="Custom Styling Consultation">Custom Atelier Consultation</option>
                  </select>
                </div>

                {/* Session Mode */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                    Consultation Location / Mode *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-sans">
                    {[
                      { label: 'In-Studio (Bengaluru Atelier)', icon: MapPin },
                      { label: 'In-Studio (Mumbai Atelier)', icon: MapPin },
                      { label: 'Virtual Video Consultation', icon: Video },
                    ].map((mode) => (
                      <button
                        type="button"
                        key={mode.label}
                        onClick={() => setFormData({ ...formData, sessionMode: mode.label as any })}
                        className={`p-2.5 text-left border transition-colors flex items-center gap-2 cursor-pointer ${
                          formData.sessionMode === mode.label
                            ? 'border-[#6E2332] bg-[#6E2332]/5 text-[#6E2332] font-medium'
                            : 'border-[#D9D2C7] bg-[#FAF8F5] text-[#57534E] hover:border-[#A8A29E]'
                        }`}
                      >
                        <mode.icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{mode.label.split(' ')[0]} {mode.label.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Meera Ramanathan"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="meera@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                    />
                  </div>
                </div>

                {/* Phone & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 00000"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                    />
                  </div>
                </div>

                {/* Style Goals / Occasion Notes */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-sans text-[#57534E] mb-1.5">
                    What would you like our stylist to focus on?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.styleGoals}
                    onChange={(e) => setFormData({ ...formData, styleGoals: e.target.value })}
                    placeholder="e.g. Sister's wedding in December, daily professional drapes, or building a sustainable capsule..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-book-session w-full py-4 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Session Reservation</span>
                  </button>
                  <p className="text-[11px] text-center text-[#78716C] font-sans mt-2.5">
                    Complimentary rescheduling available up to 24 hours prior.
                  </p>
                </div>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
