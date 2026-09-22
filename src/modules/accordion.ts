export function initAccordion(): void {
  const items = document.querySelectorAll<HTMLElement>(".accordion__item");
  if (items.length === 0) return;

  function setItemState(item: HTMLElement, open: boolean): void {
    const trigger = item.querySelector<HTMLElement>(".accordion__trigger");
    const panel = item.querySelector<HTMLElement>(".accordion__panel");
    if (!trigger || !panel) return;

    item.classList.toggle("is-open", open);
    trigger.setAttribute("aria-expanded", String(open));
    panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0px";
  }

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLElement>(".accordion__trigger");
    if (!trigger) return;

    setItemState(item, item.classList.contains("is-open"));

    trigger.addEventListener("click", () => {
      const willOpen = !item.classList.contains("is-open");
      items.forEach((other) => setItemState(other, other === item && willOpen));
    });
  });

  window.addEventListener("resize", () => {
    items.forEach((item) => {
      if (item.classList.contains("is-open")) {
        setItemState(item, true);
      }
    });
  });
}
