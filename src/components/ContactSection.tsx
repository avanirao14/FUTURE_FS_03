import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { ATELIER_DETAILS } from '../data/fashionData';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'General In-Studio Visit',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 lg:py-44 bg-[#FAF8F5] border-t border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-[#6E2332]"></span>
            <span className="text-[10.5px] uppercase tracking-[0.3em] font-sans font-medium text-[#6E2332]">
              Atelier Concierge
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1F1E1D] font-light tracking-tight mb-4 text-balance">
            Visit our studios or connect with us.
          </h2>
          <p className="text-sm sm:text-base text-[#6B655F] font-sans font-light leading-relaxed">
            Whether you wish to experience our handcrafted collections in person, request fabric samples, or speak with a styling director, we welcome your inquiry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Atelier Details */}
          <div className="lg:col-span-5 space-y-8">
            {/* Bengaluru Atelier */}
            <div className="p-7 sm:p-8 bg-[#FAF7F2] border border-[#E2DBD0] luxury-card">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Bengaluru Atelier & Studio</span>
              </div>
              <p className="font-serif text-2xl text-[#1F1E1D] mb-1 font-light">Indiranagar Flagship</p>
              <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed mb-4">
                {ATELIER_DETAILS.addressBangalore}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#57534E] font-sans pt-4 border-t border-[#EAE3D6]">
                <Clock className="w-3.5 h-3.5 text-[#78716C]" />
                <span>Tue – Sun: 11:00 AM – 7:30 PM (By Appointment)</span>
              </div>
            </div>

            {/* Mumbai Atelier */}
            <div className="p-7 sm:p-8 bg-[#FAF7F2] border border-[#E2DBD0] luxury-card">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#6E2332] font-semibold font-sans mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Mumbai Atelier & Suite</span>
              </div>
              <p className="font-serif text-2xl text-[#1F1E1D] mb-1 font-light">Bandra West Atelier</p>
              <p className="text-xs sm:text-[13px] text-[#6B655F] font-sans leading-relaxed mb-4">
                {ATELIER_DETAILS.addressMumbai}
              </p>
              <div className="flex items-center gap-2 text-xs text-[#57534E] font-sans pt-4 border-t border-[#EAE3D6]">
                <Clock className="w-3.5 h-3.5 text-[#78716C]" />
                <span>Tue – Sun: 11:00 AM – 8:00 PM</span>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="p-6 bg-[#FAF7F2] border border-[#E2DBD0] space-y-3 text-xs sm:text-[13px] text-[#57534E] font-sans">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#6E2332]" />
                <span>{ATELIER_DETAILS.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#6E2332]" />
                <span>{ATELIER_DETAILS.email}</span>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 bg-[#FAF7F2] border border-[#E2DBD0]">
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1F1E1D] font-light mb-2">
                Send an Atelier Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#78716C] font-sans mb-8">
                Our concierge responds within 24 business hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 bg-[#FAF8F5] border border-[#6E2332]/30 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#6E2332]/10 text-[#6E2332] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#1F1E1D] mb-2">Inquiry Received</h4>
                  <p className="text-sm text-[#57534E] font-sans max-w-md mx-auto mb-6 leading-relaxed">
                    Thank you, {formData.name || 'valued guest'}. Your message has been routed to our atelier team. We look forward to connecting with you.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', interest: 'General In-Studio Visit', message: '' });
                    }}
                    className="px-6 py-2.5 border border-[#1F1E1D] text-xs uppercase tracking-widest text-[#1F1E1D] hover:bg-[#1F1E1D] hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-sans text-[#57534E] mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ananya Sen"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-sans text-[#57534E] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="ananya@example.com"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-sans text-[#57534E] mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-[0.16em] font-sans text-[#57534E] mb-2">
                        Area of Interest
                      </label>
                      <select
                        value={formData.interest}
                        onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                        className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                      >
                        <option>General In-Studio Visit</option>
                        <option>Festive & Bridal Wardrobe Curation</option>
                        <option>Signature Wardrobe Audit</option>
                        <option>Custom Handloom Drape Inquiries</option>
                        <option>Atelier Sourcing & Textile Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.16em] font-sans text-[#57534E] mb-2">
                      Your Message or Occasion Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about the occasion you are preparing for or your wardrobe aspirations..."
                      className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#D9D2C7] text-sm text-[#1F1E1D] focus:outline-none focus:border-[#6E2332]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1F1E1D] text-[#FAF8F5] text-[11px] uppercase tracking-[0.22em] font-sans font-medium hover:bg-[#6E2332] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

