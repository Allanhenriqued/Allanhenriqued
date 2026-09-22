export function initTestimonials(): void {
  const track = document.getElementById("testimonialTrack");
  const dotsWrap = document.getElementById("sliderDots");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");

  if (!track || !dotsWrap || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.querySelectorAll<HTMLElement>(".testimonial"));
  if (slides.length === 0) return;

  let current = 0;
  let timer: ReturnType<typeof setInterval> | null = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ir para depoimento ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    dotsWrap.appendChild(dot);
  });

  const dots = Array.from(dotsWrap.querySelectorAll<HTMLElement>("button"));

  function render(): void {
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === current);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === current);
    });
  }

  function goTo(index: number): void {
    current = (index + slides.length) % slides.length;
    render();
    restartAutoplay();
  }

  function next(): void {
    goTo(current + 1);
  }

  function prev(): void {
    goTo(current - 1);
  }

  function restartAutoplay(): void {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(next, 6000);
  }

  nextBtn.addEventListener("click", next);
  prevBtn.addEventListener("click", prev);

  render();
  restartAutoplay();
}
