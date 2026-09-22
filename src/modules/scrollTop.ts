export function initScrollTop(): void {
  const btn = document.getElementById("scrollTop");
  if (!btn) return;

  const onScroll = (): void => {
    btn.classList.toggle("is-visible", window.scrollY > 480);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  onScroll();
}
