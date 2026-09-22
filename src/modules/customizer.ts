type SegmentKey = "barber" | "salon" | "clinic" | "studio";
type FontKey = "rounded" | "elegant" | "bold";

interface ServicePreset {
  name: string;
  price: string;
}

interface SegmentPreset {
  avatar: string;
  title: string;
  subtitle: string;
  services: ServicePreset[];
  cta: string;
}

const SEGMENT_PRESETS: Record<SegmentKey, SegmentPreset> = {
  barber: {
    avatar: "💈",
    title: "Barbearia do Zé",
    subtitle: "Agende seu horário em poucos toques",
    services: [
      { name: "Corte + Barba", price: "R$ 65" },
      { name: "Corte degradê", price: "R$ 45" },
      { name: "Barba terapia", price: "R$ 35" },
    ],
    cta: "Agendar agora",
  },
  salon: {
    avatar: "💇",
    title: "Studio Bela Vista",
    subtitle: "Reserve seu horário com a profissional ideal",
    services: [
      { name: "Escova modelada", price: "R$ 70" },
      { name: "Coloração", price: "R$ 180" },
      { name: "Hidratação", price: "R$ 90" },
    ],
    cta: "Reservar horário",
  },
  clinic: {
    avatar: "🩺",
    title: "Clínica VivaBem",
    subtitle: "Marque sua consulta com facilidade",
    services: [
      { name: "Consulta avaliação", price: "R$ 120" },
      { name: "Sessão fisioterapia", price: "R$ 90" },
      { name: "Retorno", price: "R$ 60" },
    ],
    cta: "Agendar consulta",
  },
  studio: {
    avatar: "🧘",
    title: "Studio Equilíbrio",
    subtitle: "Escolha sua aula e garanta sua vaga",
    services: [
      { name: "Aula experimental", price: "R$ 0" },
      { name: "Plano mensal", price: "R$ 220" },
      { name: "Aula avulsa", price: "R$ 45" },
    ],
    cta: "Garantir vaga",
  },
};

const SEGMENT_LABELS: Record<SegmentKey, string> = {
  barber: "Barbearia",
  salon: "Salão de beleza",
  clinic: "Clínica",
  studio: "Estúdio",
};

const FONT_LABELS: Record<FontKey, string> = {
  rounded: "Arredondada",
  elegant: "Elegante",
  bold: "Moderna",
};

function selectChip(group: HTMLElement, selected: HTMLElement): void {
  group.querySelectorAll<HTMLElement>(".chip, .swatch").forEach((chip) => {
    const isSelected = chip === selected;
    chip.classList.toggle("is-active", isSelected);
    chip.setAttribute("aria-checked", String(isSelected));
  });
}

export function initCustomizer(): void {
  const segmentGroup = document.getElementById("segmentGroup");
  const colorGroup = document.getElementById("colorGroup");
  const fontGroup = document.getElementById("fontGroup");
  const phoneMock = document.querySelector<HTMLElement>(".phone-mock");
  const previewScreen = document.getElementById("previewScreen");
  const previewAvatar = document.getElementById("previewAvatar");
  const previewTitle = document.getElementById("previewTitle");
  const previewSubtitle = document.getElementById("previewSubtitle");
  const previewServices = document.getElementById("previewServices");
  const previewCta = document.getElementById("previewCta");
  const summaryDot = document.getElementById("summaryDot");
  const summaryText = document.getElementById("summaryText");

  if (
    !segmentGroup ||
    !colorGroup ||
    !fontGroup ||
    !phoneMock ||
    !previewScreen ||
    !previewAvatar ||
    !previewTitle ||
    !previewSubtitle ||
    !previewServices ||
    !previewCta ||
    !summaryDot ||
    !summaryText
  ) {
    return;
  }

  const state: { segment: SegmentKey; color: string; colorName: string; font: FontKey } = {
    segment: "barber",
    color: "#7C5CFC",
    colorName: "Roxo",
    font: "rounded",
  };

  function render(): void {
    const preset = SEGMENT_PRESETS[state.segment];

    previewScreen!.style.setProperty("--preview-accent", state.color);
    previewAvatar!.textContent = preset.avatar;
    previewTitle!.textContent = preset.title;
    previewSubtitle!.textContent = preset.subtitle;
    previewCta!.textContent = preset.cta;
    phoneMock!.setAttribute("data-font", state.font);
    phoneMock!.style.setProperty("--phone-glow", state.color);

    previewServices!.innerHTML = "";
    preset.services.forEach((service) => {
      const row = document.createElement("div");
      row.className = "preview-service";
      row.innerHTML = `<span>${service.name}</span><strong>${service.price}</strong>`;
      previewServices!.appendChild(row);
    });

    summaryDot!.style.setProperty("--sw", state.color);
    summaryText!.textContent = `${SEGMENT_LABELS[state.segment]} · ${state.colorName} · ${FONT_LABELS[state.font]}`;
  }

  segmentGroup.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-segment]");
    if (!target) return;
    const segment = target.dataset["segment"] as SegmentKey | undefined;
    if (!segment) return;
    state.segment = segment;
    selectChip(segmentGroup, target);
    render();
  });

  colorGroup.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-color]");
    if (!target) return;
    const color = target.dataset["color"];
    if (!color) return;
    state.color = color;
    state.colorName = target.getAttribute("aria-label") ?? "";
    selectChip(colorGroup, target);
    render();
  });

  fontGroup.addEventListener("click", (event) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>("[data-font]");
    if (!target) return;
    const font = target.dataset["font"] as FontKey | undefined;
    if (!font) return;
    state.font = font;
    selectChip(fontGroup, target);
    render();
  });

  render();
}
