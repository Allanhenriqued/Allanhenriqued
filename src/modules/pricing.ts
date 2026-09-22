export function initPricing(): void {
  const switchBtn = document.getElementById("billingSwitch");
  const labels = document.querySelectorAll<HTMLElement>("[data-cycle-label]");
  const prices = document.querySelectorAll<HTMLElement>(".js-price");

  if (!switchBtn) return;

  function setCycle(annual: boolean): void {
    switchBtn!.setAttribute("aria-checked", String(annual));

    labels.forEach((label) => {
      const isAnnual = label.dataset["cycleLabel"] === "annual";
      label.classList.toggle("is-active", isAnnual === annual);
    });

    prices.forEach((price) => {
      const key = annual ? "annual" : "monthly";
      const value = price.dataset[key];
      if (value) price.textContent = value;
    });
  }

  switchBtn.addEventListener("click", () => {
    const isAnnual = switchBtn.getAttribute("aria-checked") === "true";
    setCycle(!isAnnual);
  });

  setCycle(false);
}
