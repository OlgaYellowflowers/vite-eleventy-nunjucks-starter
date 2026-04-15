import gsap from "gsap";

export function initCircleAnimation() {
  // Intro sequence was removed for starter mode.
  window.__heroSequenceStarted = true;
  window.dispatchEvent(new CustomEvent("hero:sequence:complete"));
}

/**
 * Background Section Animation
 */
export function initHeroBgAnimation(triggerNow = false) {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;
  const heroFirstPart = document.querySelector(".hero__first-part");

  const createBg = (id, img, z) => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      Object.assign(el.style, {
        position: "absolute",
        inset: "auto",
        left: "0",
        right: "0",
        bottom: "0",
        height: "100vh",
        backgroundImage: `url('${img}')`,
        backgroundSize: "cover",
        backgroundPosition: "50% top",
        zIndex: z,
        willChange: "transform"
      });
      heroSection.insertBefore(el, heroSection.firstChild);
    }
    return el;
  };

  createBg("hero-bg-image", "/assets/images/placeholder-image.svg", "1");
  createBg("hero-bg-front-image", "/assets/images/placeholder-image.svg", "2");

  const run = () => {
    if (heroFirstPart) gsap.to(heroFirstPart, { y: "-100vh", duration: 1.4, ease: "power2.inOut" });
    setTimeout(initCircleWaveAnimation, 950);
  };

  if (triggerNow) run();
  return { trigger: run };
}

/**
 * Draws concentric circles with alternating half-circles.
 */
function initCircleWaveAnimation() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  const existingCanvas = document.getElementById("hero-circles-canvas");
  if (existingCanvas) {
    existingCanvas.remove();
  }

  const canvas = document.createElement("canvas");
  canvas.id = "hero-circles-canvas";
  const ctx = canvas.getContext("2d");

  Object.assign(canvas.style, {
    zIndex: 4,
    position: "absolute",
    inset: "0",
    pointerEvents: "none",
    display: "block"
  });

  heroSection.appendChild(canvas);
  const DPR = window.devicePixelRatio || 1;

  function resizeCanvas() {
    const rect = heroSection.getBoundingClientRect();
    canvas.width = rect.width * DPR;
    canvas.height = rect.height * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const start = performance.now();

  function animate(now) {
    const elapsed = now - start;
    const w = canvas.width / DPR;
    const h = canvas.height / DPR;

    ctx.clearRect(0, 0, w, h);

    const baseRadius = Math.max(48, h * 0.075);
    const spacing = 44;
    const count = Math.ceil((Math.max(w, h) + baseRadius * 2) / spacing) + 2;
    const centerX = w * 0.56;
    const centerY = h * 0.5;

    for (let i = 0; i < count; i++) {
      const time = elapsed - i * 90;
      if (time < 0) continue;

      const fade = 1 - Math.pow(1 - Math.min(1, time / 900), 3);
      const opacity = 0.14 * fade;
      const radius = baseRadius + i * spacing;

      if (opacity <= 0) continue;

      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = "#19747E";
      ctx.lineWidth = 10;

      if (i % 2 === 0) {
        // Full circle rings.
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Alternating top/bottom half-circles.
        const startAngle = i % 4 === 1 ? Math.PI : 0;
        const endAngle = startAngle + Math.PI;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
      }

      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


