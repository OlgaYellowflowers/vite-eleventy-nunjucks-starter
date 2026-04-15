/**
 * Section Visibility Animation Utility
 * Detects when sections become visible and applies animations to child elements
 */

export function getSectionObserverOptions(container) {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const containerHeight = container?.getBoundingClientRect().height || 0;
  const isSmallMobile = window.innerWidth <= 480;
  const isTallSection = viewportHeight > 0 && containerHeight > viewportHeight * 1.2;

  if (isSmallMobile || isTallSection) {
    return {
      threshold: 0.05,
      rootMargin: '0px 0px -10% 0px'
    };
  }

  return {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
}

export function setupSectionAnimation(containerSelector, animationConfig) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const initialStates = {
    'animate-slide-up': { opacity: '0', transform: 'translateY(-30px)' },
    'animate-slide-left': { opacity: '0', transform: 'translateX(-50px)' },
    'animate-slide-down': { opacity: '0', transform: 'translateY(30px)' },
    'animate-scale-up': { opacity: '0', transform: 'scale(0.95)' },
    'animate-fade-in': { opacity: '0' },
    'animate-service-title': { opacity: '0', transform: 'translateX(-20px)' },
    'animate-in': { opacity: '0' }
  };

  let animationsTriggered = false;
  let allAnimatedElements = []; // Track all elements that get animated

  animationConfig.forEach((config) => {
    const elements = container.querySelectorAll(config.selector);
    const initialState = initialStates[config.className] || {};
    
    elements.forEach((element) => {
      Object.assign(element.style, initialState);
      allAnimatedElements.push(element);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationsTriggered) {
          animationsTriggered = true;

          animationConfig.forEach((config) => {
            const elements = container.querySelectorAll(config.selector);
            
            elements.forEach((element, index) => {
              const delay = config.delay + (config.stagger || 0) * index;
              element.style.setProperty('--animation-delay', `${delay}ms`);
              element.classList.add(config.className);
            });
          });

          observer.unobserve(container);
        }
      });
    },
    getSectionObserverOptions(container)
  );

  observer.observe(container);
}

export function setupElementAnimation(selector, className, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const initialStates = {
    'animate-slide-up': { opacity: '0', transform: 'translateY(-30px)' },
    'animate-slide-left': { opacity: '0', transform: 'translateX(-50px)' },
    'animate-slide-down': { opacity: '0', transform: 'translateY(30px)' },
    'animate-scale-up': { opacity: '0', transform: 'scale(0.95)' },
    'animate-fade-in': { opacity: '0' },
    'animate-service-title': { opacity: '0', transform: 'translateX(-20px)' },
    'animate-in': { opacity: '0' }
  };

  const initialState = initialStates[className] || {};

  elements.forEach((element, index) => {
    Object.assign(element.style, initialState);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const delay = (options.delay || 0) + ((options.stagger || 0) * index);
        element.style.setProperty('--animation-delay', `${delay}ms`);
        element.classList.add(className);
        observer.unobserve(element);
      });
    }, options.observerOptions || getSectionObserverOptions(element));

    observer.observe(element);
  });
}
