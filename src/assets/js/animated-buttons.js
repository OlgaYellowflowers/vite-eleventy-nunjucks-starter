/**
 * Animated Buttons - Pure CSS animations with dual arrow structure
 * JavaScript only handles DOM structure, all animations are CSS-driven
 */

export function initAnimatedButtons() {
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach((button) => {
    // Create dual arrow structure if not already present
    const arrowContainer = button.querySelector('.btn-arrow-container');
    if (!arrowContainer) {
      createDualArrowStructure(button);
    }
  });
}

function createDualArrowStructure(button) {
  const arrowSVG = button.querySelector('.btn-arrow');
  if (!arrowSVG) return;

  // Create container for both arrows
  const container = document.createElement('div');
  container.className = 'btn-arrow-container';

  // Create second arrow (the one that enters from left)
  const secondArrow = arrowSVG.cloneNode(true);
  secondArrow.classList.add('btn-arrow-secondary');

  // Replace single arrow with container
  arrowSVG.parentNode.insertBefore(container, arrowSVG);
  container.appendChild(arrowSVG);
  arrowSVG.classList.add('btn-arrow-primary');
  container.appendChild(secondArrow);
}
