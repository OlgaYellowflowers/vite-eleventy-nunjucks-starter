/**
 * Header Scroll - Animate logo on load and handle hero scroll state
 */

export function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const logoImg = document.querySelector('.header__logo img');
  const hasHero = Boolean(document.querySelector('.hero'));
  let logoAnimated = false;
  
  if (!header || !logoImg) return;

  function triggerLogoAnimation() {
    if (logoAnimated || !logoImg) return;
    logoAnimated = true;
    logoImg.style.animation = 'headerLogoSlideIn 625ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
  }

  function revealHeader() {
    header.classList.remove('site-header--hidden');
    header.classList.add('site-header--visible');

    setTimeout(() => {
      triggerLogoAnimation();
    }, 80);
  }

  // Keep header hidden while hero intro is waiting/playing.
  if (hasHero && !window.__heroSequenceStarted) {
    header.classList.add('site-header--hidden');

    window.addEventListener('hero:sequence:complete', revealHeader, { once: true });
    return;
  }

  revealHeader();

}

