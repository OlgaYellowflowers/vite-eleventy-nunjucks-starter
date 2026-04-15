/**
 * Menu - Toggle functionality for mobile navigation
 */

export function initMenu() {
  const menu = document.getElementById('main-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.getElementById('menu-close');
  const menuOpenButton = document.querySelector('[data-menu-toggle]');

  if (!menu || !menuOpenButton) return;

  // Open menu
  menuOpenButton.addEventListener('click', () => {
    menu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  });

  // Close menu
  const closeMenu = () => {
    menu.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  menuClose?.addEventListener('click', closeMenu);
  menuOverlay?.addEventListener('click', closeMenu);

  // Close menu when clicking on menu items
  const menuItems = menu.querySelectorAll('.menu__item');
  menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      closeMenu();
      
      // Handle smooth scroll with header offset
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        const mainHeader = document.getElementById('main-header');
        
        if (targetSection && mainHeader) {
          const headerHeight = mainHeader.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}
