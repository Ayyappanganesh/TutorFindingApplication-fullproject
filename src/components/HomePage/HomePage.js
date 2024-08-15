import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import TestimonialsSection from './TestimonialsSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div id="hero-section">
        <HeroSection />
      </div>
      <div id="about-section">
        <AboutSection />
      </div>
      <div id="testimonials-section">
        <TestimonialsSection />
      </div>
      <div id="contact-section">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
