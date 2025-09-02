import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import ContactForm from './components/ContactForm';
import ProjectCarousel from './components/ProjectCarousel';

// Function to render React components into existing HTML
const renderReactComponents = () => {
  // Render Theme Toggle
  const themeToggleContainer = document.getElementById('theme-toggle');
  if (themeToggleContainer) {
    // Clear the existing content
    themeToggleContainer.innerHTML = '';
    const themeToggleRoot = createRoot(themeToggleContainer);
    themeToggleRoot.render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
  }

  // Render Contact Form
  const contactFormContainer = document.getElementById('contact-form-container');
  if (contactFormContainer) {
    const contactFormRoot = createRoot(contactFormContainer);
    contactFormRoot.render(
      <ThemeProvider>
        <ContactForm />
      </ThemeProvider>
    );
  }

  // Render Project Carousel
  const projectCarouselContainer = document.getElementById('project-carousel-container');
  if (projectCarouselContainer) {
    const projectCarouselRoot = createRoot(projectCarouselContainer);
    projectCarouselRoot.render(
      <ThemeProvider>
        <ProjectCarousel />
      </ThemeProvider>
    );
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Render individual components
  renderReactComponents();
});

// Also render when window loads (fallback)
window.addEventListener('load', renderReactComponents);
