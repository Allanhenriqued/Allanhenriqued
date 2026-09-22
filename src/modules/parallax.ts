interface ParallaxLayer {
  el: HTMLElement;
  speed: number;
}

export function initParallax(): void {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  const layers: ParallaxLayer[] = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"))
    .map((el) => ({ el, speed: Number(el.dataset["parallax"] ?? "0") }))
    .filter((layer) => Number.isFinite(layer.speed) && layer.speed !== 0);

  if (layers.length === 0) return;

  let ticking = false;

  function update(): void {
    const viewportCenter = window.innerHeight / 2;

    layers.forEach(({ el, speed }) => {
      const rect = el.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - viewportCenter) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    });

    ticking = false;
  }

  function requestUpdate(): void {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}
