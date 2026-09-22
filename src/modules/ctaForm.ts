export function initCtaForm(): void {
  const form = document.getElementById("ctaForm") as HTMLFormElement | null;
  const note = document.getElementById("ctaNote");
  const emailInput = document.getElementById("ctaEmail") as HTMLInputElement | null;

  if (!form || !note || !emailInput) return;

  const defaultNote = note.textContent ?? "";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (!email) return;

    note.textContent = `Prontinho! Enviamos um link de acesso para ${email}.`;
    note.style.color = "var(--accent-2)";
    form.reset();

    window.setTimeout(() => {
      note.textContent = defaultNote;
      note.style.color = "";
    }, 5000);
  });
}
