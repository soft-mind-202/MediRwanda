import React from 'react';
import Navbar from '@components/Navbar';
import AdvancedHeroSection from '@components/AdvancedHeroSection';
import FeaturesSection from '@components/FeaturesSection';
import ServicesSection from '@components/ServicesSection';
import TestimonialsSection from '@components/TestimonialsSection';
import CTASection from '@components/CTASection';
import Footer from '@components/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <AdvancedHeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
