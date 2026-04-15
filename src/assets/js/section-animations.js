/**
 * Section Animation Configurations
 * Sets up scroll animations for all page sections
 */

import { setupElementAnimation, setupSectionAnimation } from './animation-utils.js';

export function setupSectionAnimations() {
  // Features Section
  setupSectionAnimation('.features', [
    { selector: '.section-header__label', className: 'animate-slide-up', delay: 0 },
    { selector: '.section-header__main-line', className: 'animate-slide-left', delay: 150, stagger: 100 },
    { selector: '.section-header__aside', className: 'animate-slide-down', delay: 450 }
  ]);

  setupElementAnimation('.features .aligned-card', 'animate-slide-up', {
    delay: 600,
    stagger: 200,
    observerOptions: {
      threshold: 0.1, // 10% of card must be visible
      rootMargin: '0px' // No early trigger
    }
  });

  // Contact CTA Section
  setupSectionAnimation('.contact-cta', [
    { selector: '.contact-cta__label', className: 'animate-slide-up', delay: 0 },
    { selector: '.contact-cta__title-line', className: 'animate-slide-left', delay: 100, stagger: 50 },
    { selector: '.contact-cta__button', className: 'animate-scale-up', delay: 300 }
  ]);
}
