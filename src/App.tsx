/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { AIStylistSection } from './components/AIStylistSection';
import { FeaturedCollections } from './components/FeaturedCollections';
import { LayaExperience } from './components/LayaExperience';
import { LookbookPreview } from './components/LookbookPreview';
import { PersonalStylingPreview } from './components/PersonalStylingPreview';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';

import { BookingModal } from './components/BookingModal';
import { CollectionDetailModal } from './components/CollectionDetailModal';
import { LookQuickViewModal } from './components/LookQuickViewModal';

import { CollectionItem, LookbookLook } from './types';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string | undefined>(undefined);
  
  const [selectedCollection, setSelectedCollection] = useState<CollectionItem | null>(null);
  const [selectedLook, setSelectedLook] = useState<LookbookLook | null>(null);

  const handleOpenBooking = (serviceTitle?: string) => {
    setSelectedServiceTitle(serviceTitle);
    setIsBookingOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1E1D] flex flex-col font-sans selection:bg-[#6E2332]/20 selection:text-[#6E2332]">
      {/* 1. Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenFindStyle={() => handleScrollToSection('find-your-style')}
      />

      <main className="flex-grow">
        {/* 2. Hero Section */}
        <Hero
          onExploreCollection={() => handleScrollToSection('collections')}
          onOpenFindStyle={() => handleScrollToSection('find-your-style')}
        />

        {/* 3. Introduction */}
        <Introduction />

        {/* Interactive Feature: LĀYA AI Stylist */}
        <AIStylistSection
          onOpenBooking={(title) => handleOpenBooking(title)}
          onSelectCollection={(item) => setSelectedCollection(item)}
        />

        {/* 4. Featured Collections */}
        <FeaturedCollections
          onSelectCollection={(item) => setSelectedCollection(item)}
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 5. The LĀYA Experience */}
        <LayaExperience
          onOpenBooking={(title) => handleOpenBooking(title)}
          onExploreCollections={() => handleScrollToSection('collections')}
        />

        {/* 6. Lookbook Preview */}
        <LookbookPreview
          onSelectLook={(look) => setSelectedLook(look)}
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 7. Personal Styling Preview */}
        <PersonalStylingPreview
          onOpenBooking={(title) => handleOpenBooking(title)}
        />

        {/* 8. About Section */}
        <AboutSection />

        {/* Contact & Studio Concierge */}
        <ContactSection />

        {/* 9. Final Call to Action */}
        <FinalCta
          onOpenBooking={() => handleOpenBooking()}
          onOpenFindStyle={() => handleScrollToSection('find-your-style')}
        />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenFindStyle={() => handleScrollToSection('find-your-style')}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedService={selectedServiceTitle}
      />

      <CollectionDetailModal
        collection={selectedCollection}
        onClose={() => setSelectedCollection(null)}
        onBookStyling={(title) => {
          setSelectedCollection(null);
          handleOpenBooking(title);
        }}
      />

      <LookQuickViewModal
        look={selectedLook}
        onClose={() => setSelectedLook(null)}
        onBookStyling={(title) => {
          setSelectedLook(null);
          handleOpenBooking(title);
        }}
      />
    </div>
  );
}
