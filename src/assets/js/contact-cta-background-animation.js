/**
 * Contact CTA Background Circle Animation
 * Renders concentric circles and half-circles within the contact-cta__background element.
 */

export function initContactCtaBackgroundAnimation() {
  // Prevent double initialization
  if (window.__contactCtaBackgroundAnimationInitialized) {
    return;
  }
  window.__contactCtaBackgroundAnimationInitialized = true;

  const container = document.getElementById("contact-cta__background");
  if (!container) {
    console.warn("contact-cta__background container not found");
    return;
  }

  // ----------------------------
  // Canvas Setup
  // ----------------------------

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.style.position = "absolute";
  canvas.style.inset = "0";
  canvas.style.overflow = "hidden";
  canvas.style.display = "block";
  canvas.style.pointerEvents = "none";

  container.innerHTML = "";
  container.appendChild(canvas);

  const DPR = window.devicePixelRatio || 1;

  // -------------------
  // Circle Animation Settings
  // -------------------

  const RING_COUNT = 20;
  const BASE_RADIUS = 56;
  const RADIUS_STEP = 28;

  const STROKE_COLOR = "#E2E2E2";
  const STROKE_WIDTH = 12;

  const STAGGER = 47;
  const FINAL_OPACITY = 0.08;

  function drawRingOrArc(x, y, radius, opacity, index) {
    if (opacity <= 0) return;

    ctx.save();

    ctx.globalAlpha = opacity;
    ctx.strokeStyle = STROKE_COLOR;
    ctx.lineWidth = STROKE_WIDTH;

    if (index % 2 === 0) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
    } else {
      const startAngle = index % 4 === 1 ? 0 : Math.PI;
      const endAngle = startAngle + Math.PI;
      ctx.beginPath();
      ctx.arc(x, y, radius, startAngle, endAngle);
    }

    ctx.stroke();
    ctx.restore();
  }

  function startAnimation() {
    // ----------------------------
    // Animation Loop
    // ----------------------------

    const start = performance.now();
    let loggedOnce = false;

    function animate(now) {
      const elapsed = now - start;

      const containerWidth = canvas.width / DPR;
      const containerHeight = canvas.height / DPR;

      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;

      if (!loggedOnce) {
        loggedOnce = true;
      }

      ctx.clearRect(0, 0, containerWidth, containerHeight);

      for (let i = 0; i < RING_COUNT; i++) {
        const delay = i * STAGGER;
        const timeSinceAppear = elapsed - delay;

        // Only draw ring/arc if it's time for it to appear
        if (timeSinceAppear < 0) {
          continue;
        }

        const radius = BASE_RADIUS + i * RADIUS_STEP;
        drawRingOrArc(centerX, centerY, radius, FINAL_OPACITY, i);
      }

      // Keep animating to maintain all rings/arcs visible
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function resizeCanvas() {
    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn("Container has zero dimensions, skipping canvas resize");
      return;
    }

    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  // Try to resize immediately, then wait a frame if dimensions are 0
  resizeCanvas();
  
  if (canvas.width === 0 || canvas.height === 0) {
    requestAnimationFrame(() => {
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
      startAnimation();
    });
  } else {
    window.addEventListener("resize", resizeCanvas);
    startAnimation();
  }
}




