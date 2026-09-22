import "./style.css";
import { initNav } from "./modules/nav";
import { initReveal } from "./modules/reveal";
import { initCounters } from "./modules/counters";
import { initCustomizer } from "./modules/customizer";
import { initTestimonials } from "./modules/testimonials";
import { initPricing } from "./modules/pricing";
import { initAccordion } from "./modules/accordion";
import { initScrollTop } from "./modules/scrollTop";
import { initCtaForm } from "./modules/ctaForm";

function init(): void {
  initNav();
  initReveal();
  initCounters();
  initCustomizer();
  initTestimonials();
  initPricing();
  initAccordion();
  initScrollTop();
  initCtaForm();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
