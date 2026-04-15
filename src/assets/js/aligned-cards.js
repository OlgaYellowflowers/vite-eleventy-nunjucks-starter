/**
 * Aligned Card Description Height Sync
 */

export function syncAlignedCardDescriptions() {
  function calculateAndSetMinHeight() {
    const $descriptions = $('.aligned-card__description');
    
    if ($descriptions.length) {
      let maxHeight = 0;
      
      $descriptions.css('min-height', 'auto');
      
      $descriptions.each(function () {
        const height = $(this).outerHeight();
        if (height > maxHeight) {
          maxHeight = height;
        }
      });
      
      if (maxHeight > 0) {
        $descriptions.css('min-height', maxHeight + 'px');
      }
    }
  }
  
  calculateAndSetMinHeight();
  
  $(window).on('resize', function () {
    calculateAndSetMinHeight();
  });
}
