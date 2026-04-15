/**
 * Logo Carousel - Smooth Infinite Loop
 */

export function logoCarouselInfinite() {
  const track = document.querySelector('.logo-carousel__track');
  if (!track) return;

  const items = Array.from(track.querySelectorAll('.logo-carousel__item'));
  const itemCount = items.length;
  
  if (itemCount === 0) return;

  items.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  const images = track.querySelectorAll('img');
  let imagesLoaded = 0;

  function startCarousel() {
    const itemWidth = items[0].offsetWidth;
    const gap = parseInt(window.getComputedStyle(track).gap) || 0;
    const itemWithGap = itemWidth + gap;
    const oneSetWidth = itemWithGap * itemCount;

    let offset = 0;
    let isAnimating = true;
    const speed = 0.63;

    function animate() {
      if (isAnimating) {
        offset -= speed;

        if (offset <= -oneSetWidth) {
          offset = 0;
        }

        track.style.transform = `translateX(${offset}px)`;
      }

      requestAnimationFrame(animate);
    }

    animate();
  }

  if (images.length > 0) {
    images.forEach(img => {
      if (img.complete) {
        imagesLoaded++;
      } else {
        img.addEventListener('load', () => {
          imagesLoaded++;
          if (imagesLoaded === images.length) {
            startCarousel();
          }
        });
      }
    });

    setTimeout(startCarousel, 300);
  } else {
    startCarousel();
  }
}
