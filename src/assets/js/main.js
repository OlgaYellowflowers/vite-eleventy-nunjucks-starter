import '../scss/main.scss';
import $ from 'jquery';

import { initHeroBgAnimation } from './circle-animation.js';
import { initContactCtaBackgroundAnimation } from './contact-cta-background-animation.js';
import { initAnimatedButtons } from './animated-buttons.js';
import { initHeaderScroll } from './header-scroll.js';
import { initMenu } from './menu.js';
import { setupSectionAnimations } from './section-animations.js';
import { logoCarouselInfinite } from './logo-carousel.js';
import { syncAlignedCardDescriptions } from './aligned-cards.js';

window.jQuery = $;
window.$ = $;

// Starter mode: skip the logo reveal intro sequence and show the page immediately.
window.__heroSequenceStarted = true;
initHeroBgAnimation(true);

// Initialize contact-cta background circle animation on scroll into view
const contactCtaElement = document.getElementById("contact-cta__background");
if (contactCtaElement) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initContactCtaBackgroundAnimation();
        observer.unobserve(entry.target); // Only initialize once
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(contactCtaElement);
}

$(document).ready(function () {
  initHeaderScroll();
  initAnimatedButtons();
  initMenu();
  setupSectionAnimations();
  logoCarouselInfinite();
  syncAlignedCardDescriptions();
});

// Set the current year in the footer
function setFooterYear() {
  var yearSpan = document.getElementById('todayYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setFooterYear);
} else {
  setFooterYear();
}