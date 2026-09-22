# Agenza — Site institucional

Landing page de apoio para o SaaS **Agenza**: uma plataforma de agendamento
online que permite que cada negócio (barbearias, salões, clínicas, estúdios
etc.) personalize sua própria página de agendamento — cores, tipografia,
serviços e regras — sem escrever código.

Este repositório contém apenas o **site institucional** (marketing/vendas),
com um demo interativo de personalização, planos, depoimentos e FAQ.

## Stack

- [Vite](https://vitejs.dev/) — build tool
- TypeScript (strict mode)
- CSS moderno (custom properties, grid, clamp, `prefers-color-scheme`-ready)

## Scripts

```bash
npm install      # instala as dependências
npm run dev       # ambiente de desenvolvimento com hot reload
npm run build      # build de produção (type-check + bundle) em dist/
npm run preview    # serve o build de produção localmente
```

## Estrutura

```
index.html               ponto de entrada (HTML semântico)
src/style.css             design system e estilos
src/main.ts                bootstrap dos módulos da página
src/modules/
  nav.ts                    header fixo + menu mobile
  reveal.ts                  animações de entrada ao rolar a página
  counters.ts                contadores animados no hero
  customizer.ts               demo interativo de personalização
  testimonials.ts             carrossel de depoimentos
  pricing.ts                  alternância de plano mensal/anual
  accordion.ts                 FAQ em acordeão
  scrollTop.ts                  botão de voltar ao topo
  ctaForm.ts                     feedback do formulário de captura
```
