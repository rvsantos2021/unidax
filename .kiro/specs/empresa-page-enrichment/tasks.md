# Implementation Plan: Enriquecimento da Página /empresa

## Overview

Reestruturar `app/empresa/page.tsx` com três ajustes visuais: (1) substituir `StatsBlock` pela barra `.ia-impact-bar`, (2) fundir "Posicionamento" e "Nossa história" em layout 2 colunas com `.authority-grid`, e (3) exibir os valores institucionais em cards `.problem` + `.iconbox` com ícones SVG. O CSS mínimo novo (`.historia-card` e `.values-grid`) é adicionado ao `app/globals.css`. A página permanece um Server Component puro.

## Tasks

- [x] 1. Adicionar CSS novo em `app/globals.css`
  - [x] 1.1 Inserir classes `.historia-card` e `.values-grid` no final de `app/globals.css`
    - Adicionar ao final do arquivo:
      ```css
      /* Empresa — história card */
      .historia-card{background:var(--soft);border-radius:16px;padding:32px;border-left:3px solid var(--gold)}
      .historia-card p{font-size:14px;line-height:1.72}

      /* Empresa — valores grid */
      .values-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
      @media(max-width:700px){.values-grid{grid-template-columns:1fr}}
      ```
    - NÃO adicionar: `.ia-impact-bar`, `.ia-impact-grid`, `.ia-impact-item`, `.authority`, `.authority-grid`, `.vmv-grid`, `.vmv-card`, `.problem`, `.iconbox` — já existem em `globals.css`
    - Usar exclusivamente custom properties já existentes (`--soft`, `--gold`, `--line`)
    - _Requirements: 3.5, 6.3_

- [x] 2. Atualizar `app/empresa/page.tsx`
  - [x] 2.1 Atualizar imports no topo do arquivo
    - Adicionar imports dos ícones: `ArrowIcon`, `SparkIcon`, `TargetIcon`, `LayersIcon`, `UsersIcon`, `ShieldIcon`, `GaugeIcon`, `DatabaseIcon`, `BotIcon` de `@/components/icons`
    - Adicionar import de `Link` de `next/link`
    - Remover import de `StatsBlock` de `@/components/stats-block`
    - Remover import de `stats` de `@/lib/content`
    - _Requirements: 5.4_

  - [x] 2.2 Declarar arrays de dados estáticos `impactStats` e `valores` inline no componente, antes do `return`
    - Declarar `impactStats` como `const` com 4 itens: `+100` clientes, `+300` projetos, `+280K` horas, `+35` anos
    - Declarar `valores` como `const` com 8 itens, cada um com `icon` (JSX), `label` e `descricao`
    - Usar `as const` em ambos os arrays para inferência de tipos estrita
    - Ícones: `SparkIcon` → Inovação, `TargetIcon` → Excelência, `LayersIcon` → Transparência, `UsersIcon` → Colaboração, `ShieldIcon` → Confiança, `GaugeIcon` → Simples e Funcional, `DatabaseIcon` → Sustentabilidade, `BotIcon` → Acreditamos. Sempre!
    - _Requirements: 3.1, 3.2_

  - [x] 2.3 Substituir seção "Posicionamento" por layout 2 colunas com `.authority-grid` (Ajuste 2)
    - Substituir o `<section className="section">` com `.content-intro` que contém "Posicionamento" por `<section className="section authority">`
    - Dentro de `<div className="authority-grid">`, coluna esquerda: `<Reveal>` com eyebrow "Posicionamento", `<h2>` e `<p>` existentes
    - Coluna direita: `<Reveal delay={100}>` com `<div className="historia-card">` contendo eyebrow "Nossa história" e texto da história da UNIDAX
    - Remover a seção separada "Nossa história" que existia logo abaixo (era uma `<section className="section">` duplicada com `.content-intro`)
    - _Requirements: 1.1, 1.2, 1.3, 5.1_

  - [x] 2.4 Substituir `StatsBlock` pela barra `.ia-impact-bar` (Ajuste 1)
    - Substituir `<section className="section services">` com `<StatsBlock items={stats} borderless />` por `<section className="section-sm ia-impact-bar">`
    - Dentro de `<div className="ia-impact-grid">`, mapear `impactStats` com `Reveal` em cada item `.ia-impact-item`
    - Cada `.ia-impact-item` contém `<strong>{s.value}</strong>` e `<span>{s.label}</span>`
    - _Requirements: 5.1_

  - [x] 2.5 Adicionar seção Visão & Missão após `.ia-impact-bar`
    - Estrutura: `<section className="section"><div className="container"><Reveal><div className="vmv-grid">...</div></Reveal></div></section>`
    - Primeiro `.vmv-card`: eyebrow "Visão", `<h3>` e `<p>` com conteúdo da visão
    - Segundo `.vmv-card`: eyebrow "Missão", `<h3>` e `<p>` com conteúdo da missão
    - _Requirements: 2.1, 2.2, 2.3_

  - [x] 2.6 Substituir seção de valores (`.bullet-list`) por cards `.problem` com ícones (Ajuste 3)
    - Substituir o `<section className="section">` com `.bullet-list` e 8 `.bullet` items por nova estrutura com `.values-grid`
    - Cabeçalho: `<Reveal>` com eyebrow "Nossos valores" e `<h2>` "O que guia cada decisão."
    - Grid: `<div className="values-grid" style={{ marginTop: 40 }}>` mapeando `valores` com `<Reveal delay={i * 60}>` em cada item
    - Cada card: `<div className="problem">` com `<div className="iconbox">{v.icon}</div>`, `<b>{v.label}</b>` e `<p>{v.descricao}</p>`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 2.7 Adicionar seção Equipe após `DarkPanel`, antes de `CtaSection`
    - Estrutura: `<section className="section"><div className="container content-intro"><Reveal>...</Reveal></div></section>`
    - eyebrow "Nossa equipe", `<h2>` "Especialistas comprometidos com o seu resultado."
    - `<p>` com texto institucional sobre o time sem fotos
    - `<Link className="link" href="/contato">Fale com a equipe <ArrowIcon /></Link>` como CTA secundário
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 3. Verificação de build
  - Executar `npm run typecheck` — deve completar sem erros de TypeScript
  - Executar `npm run lint` — deve completar sem erros de ESLint
  - Executar `npm run build` — build de produção deve finalizar sem falhas
  - Confirmar que `app/empresa/page.tsx` não contém `"use client"`
  - Confirmar que `StatsBlock` e `stats` não estão mais importados no arquivo
  - Confirmar ordem das seções: PageHero → authority → ia-impact-bar → VMV → Valores → DarkPanel → Equipe → CtaSection
  - _Requirements: 5.2, 5.3, 5.4_

## Notes

- Tasks marcadas com `*` são opcionais e podem ser puladas para MVP mais rápido
- As classes `.ia-impact-bar`, `.ia-impact-grid`, `.ia-impact-item`, `.authority`, `.authority-grid`, `.vmv-grid`, `.vmv-card`, `.problem`, `.iconbox` já existem em `globals.css` — Task 1.1 adiciona apenas `.historia-card` e `.values-grid`
- A seção "Nossa história" existente como `<section>` separada é removida e seu conteúdo migra para a coluna direita do `.authority-grid` (Task 2.3)
- O `Reveal` é um Client Component que envolve Server-rendered content normalmente — não quebra a restrição de Server Component
- A prop `delay` no `Reveal` é usada nos cards de valores para entrada escalonada (i * 60ms)

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1"] },
    { "id": 1, "tasks": ["2.2"] },
    { "id": 2, "tasks": ["2.3", "2.4"] },
    { "id": 3, "tasks": ["2.5", "2.6"] },
    { "id": 4, "tasks": ["2.7"] }
  ]
}
```
