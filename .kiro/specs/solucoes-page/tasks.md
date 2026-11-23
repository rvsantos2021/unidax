# Implementation Plan: Página /solucoes

## Overview

Implementação incremental da rota `/solucoes` como `async` Server Component no Next.js 15 App Router. As tarefas seguem a ordem natural de dependência: dados → estilos → componente de página → verificação. Nenhuma tarefa cria arquivo fora dos três targets (`lib/content.ts`, `app/globals.css`, `app/solucoes/page.tsx`), e nenhuma exportação existente é modificada.

## Tasks

- [x] 1. Adicionar tipo `FullSolution` e constante `solutionsPage` em `lib/content.ts`
  - [x] 1.1 Declarar e exportar o tipo `FullSolution` ao final do arquivo
    - Campos: `slug: string`, `title: string`, `tagline: string`, `description: string`, `capabilities: string[]`, `href: string`
    - Usar `export type FullSolution = { ... }` — sem alterar nenhum tipo ou constante acima dessa linha
    - _Requisitos: 9.3, 9.5, 12.5_

  - [x] 1.2 Declarar e exportar a constante `solutionsPage` com as 6 soluções completas
    - Array `solutions: FullSolution[]` com os slugs `ia-erp`, `agentes-atendimento`, `dados-ia`, `automacao-processos`, `transformacao-digital`, `ia-produtividade`
    - Cada item deve ter: `slug`, `title`, `tagline`, `description`, `capabilities` (mínimo 5 itens), `href: "/contato"`
    - Referenciar o design.md para os textos de cada solução em pt-BR
    - Tipar o array com `as FullSolution[]`
    - _Requisitos: 4.1, 4.2, 4.3, 9.1, 9.2, 9.4_

  - [x] 1.3 Adicionar os arrays `differentials`, `methodology` e `segments` ao objeto `solutionsPage`
    - `differentials`: 3 itens com `title` e `text` em pt-BR — "Orientada a resultado", "Integrada ao negócio", "Preparada para escalar"
    - `methodology`: 4 itens com `num` ("01"–"04"), `title` e `text` em pt-BR — Diagnóstico, Desenho da solução, Piloto, Escala
    - `segments`: 5 itens com `title` e `bullets: string[]` — Educação, Saúde, Varejo e Distribuição, Serviços Financeiros, Indústria
    - Todos os strings em pt-BR; referenciar o design.md para os textos
    - _Requisitos: 3.3, 5.1, 5.2, 6.2, 6.3, 9.2, 9.4_

- [x] 2. Adicionar classes CSS de `/solucoes` em `app/globals.css`
  - [x] 2.1 Adicionar bloco de comentário de seção e classes da proposição de valor
    - Comentário delimitador: `/* ═══ Página /solucoes ═══ */`
    - `.solucoes-value`: `background: var(--soft)`
    - `.solucoes-differentials`: grid 3 colunas, `gap: 16px`, `margin-top: 40px`
    - `.solucoes-diff-card`: glassmorphism (`background: rgba(255,255,255,.04)`, `backdrop-filter: blur(12px)`, `-webkit-backdrop-filter`, `border: 1px solid rgba(255,255,255,.08)`, `border-radius: 16px`, `padding: 28px`); pseudo-elemento `::before` com gradiente vermelho→gold de 3px no topo
    - Tipografia dentro do card: `h3` branco 18px, `p` rgba branco 60% 13px sem margin-bottom
    - _Requisitos: 3.3, 3.4, 10.1, 10.2, 10.3, 10.4_

  - [x] 2.2 Adicionar classes do grid de soluções
    - `.solucoes-grid-section`: `background: var(--ink); color: #fff`; eyebrow e h2 em branco
    - `.solucoes-grid`: grid 2 colunas, `gap: 16px`, `margin-top: 40px`
    - `.solucoes-card`: glassmorphism idêntico ao diff-card; `display: flex; flex-direction: column; gap: 10px`; `transition: .25s`; `position: relative; overflow: hidden`; pseudo-elemento `::before` gradiente de 2px
    - `.solucoes-card:hover`: `border-color: rgba(255,255,255,.16)`, `transform: translateY(-4px)`, `box-shadow: 0 24px 60px rgba(0,0,0,.4)`
    - `.solucoes-card h3`: 20px, branco
    - `.solucoes-card-tagline`: 12px, `font-weight: 800`, `color: var(--gold)`, uppercase, `letter-spacing: .08em`
    - `.solucoes-card > p:not(.solucoes-card-tagline)`: 13px, rgba branco 60%, `line-height: 1.65`, `flex: 1`
    - `.solucoes-capabilities`: `list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 6px`
    - `.solucoes-capabilities li`: 10px, pill com `background: rgba(220,39,71,.12)`, `border: 1px solid rgba(220,39,71,.2)`
    - `.solucoes-card-cta`: `margin-top: auto; align-self: flex-start`
    - _Requisitos: 4.4, 4.5, 4.6, 4.7, 10.1, 10.3, 10.4_

  - [x] 2.3 Adicionar classes da metodologia (stepper)
    - `.solucoes-method`: `background: var(--soft)`
    - `.solucoes-stepper`: grid 4 colunas, `gap: 0`, `margin-top: 44px`, `position: relative`; pseudo-elemento `::before` linha horizontal em `var(--line)` em top 24px (z-index 0)
    - `.solucoes-step`: `position: relative; z-index: 1; padding: 0 20px 0 0; display: flex; flex-direction: column`
    - `.solucoes-step-num`: círculo 48×48px, `border-radius: 50%`, `border: 1px solid var(--line)`, `background: #fff`, número 11px vermelho
    - `.solucoes-step strong`: 16px, `display: block`, `margin-bottom: 8px`
    - `.solucoes-step p`: 12px, `color: var(--muted)`, `max-width: 200px`
    - _Requisitos: 5.3, 5.4, 10.1, 10.2_

  - [x] 2.4 Adicionar classes dos segmentos de mercado
    - `.solucoes-segments`: grid 5 colunas, `gap: 16px`, `margin-top: 36px`
    - `.solucoes-segment h3`: 14px, `color: var(--gold)`, `margin-bottom: 12px`
    - `.solucoes-segment ul`: `list-style: none; padding: 0; display: flex; flex-direction: column; gap: 10px`
    - `.solucoes-segment ul li`: 12px, `color: rgba(255,255,255,.65)`, `padding-left: 14px`; pseudo-elemento `::before` com "—" em vermelho posicionado absolute
    - _Requisitos: 6.1, 6.2, 6.3, 10.1, 10.2_

  - [x] 2.5 Adicionar media queries responsivas para todas as classes `solucoes-*`
    - `@media (max-width: 1020px)`: differentials 2 colunas, grid 2 colunas, stepper 2×2 (ocultar linha `::before`), segments 2 colunas
    - `@media (max-width: 700px)`: differentials 1 coluna, grid 1 coluna, card padding 20px, stepper 1 coluna com layout grid (num | título+texto), segments 1 coluna
    - _Requisitos: 3.4, 4.4, 4.5, 4.6, 5.3, 5.4, 6.2_

- [x] 3. Criar `app/solucoes/page.tsx` como Server Component
  - [x] 3.1 Criar o arquivo com estrutura base, metadata e imports
    - Criar o arquivo `app/solucoes/page.tsx` (sem `"use client"`)
    - Exportar `metadata` com `title: "Soluções | UNIDAX"` e `description` em pt-BR única em relação a outras páginas
    - Declarar `export default async function SolucoesPage()`
    - Adicionar os imports necessários: `Link` de `next/link`; `PageHero`, `Reveal`, `CtaSection`, `DarkPanel`, `SectionHead` de `@/components/`; `ArrowIcon` de `@/components/icons`; `getCasesCMS` de `@/lib/cms`; `solutionsPage` de `@/lib/content`
    - Chamar `const cases = await getCasesCMS()` dentro do componente
    - Envolver todo o conteúdo em `<main>`
    - _Requisitos: 1.1, 1.2, 1.3, 1.4, 11.4, 12.1_

  - [x] 3.2 Implementar seção Hero e seção de proposição de valor
    - Renderizar `<PageHero eyebrow="Soluções" title="..." text="..." />` como primeira seção — sem `<h1>` adicional fora do `PageHero`
    - Renderizar seção `className="section solucoes-value"` com `<div className="container">`
    - Dentro: parágrafo de posicionamento em pt-BR afirmando que combina estratégia, dados, sistemas e IA
    - Mapear `solutionsPage.differentials` em `<div className="solucoes-differentials">`, cada item em `<Reveal delay={i * 80}>` com `<div className="solucoes-diff-card"><h3>...</h3><p>...</p></div>`
    - Garantir que o `<h2>` da seção use a tag correta (não `<h1>`)
    - _Requisitos: 2.1, 2.2, 2.3, 3.1, 3.2, 3.3, 3.4, 11.1, 11.2_

  - [x] 3.3 Implementar seção grid de soluções
    - Renderizar `<section className="section solucoes-grid-section" id="solucoes">` com `<SectionHead>` para o cabeçalho da seção
    - Mapear `solutionsPage.solutions` em `<div className="solucoes-grid">`, cada item em `<Reveal delay={i * 60}>`
    - Cada `<article className="solucoes-card">` deve conter: `<h3>`, `<p className="solucoes-card-tagline">`, `<p>` (descrição), `<ul className="solucoes-capabilities">` com cada capability em `<li>`, e `<Link>` com `className="btn btn-outline solucoes-card-cta"` apontando para `s.href`
    - O `aria-label` de cada `<Link>` deve identificar a solução específica em pt-BR (ex.: `Falar sobre ${s.title}`)
    - _Requisitos: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 11.2, 11.3_

  - [x] 3.4 Implementar seção de metodologia (stepper)
    - Renderizar `<section className="section solucoes-method">` com cabeçalho `<h2>` e eyebrow em pt-BR
    - Mapear `solutionsPage.methodology` em `<div className="solucoes-stepper">`, cada item em `<Reveal delay={i * 70}>`
    - Cada `<div className="solucoes-step">` deve conter: `<div className="solucoes-step-num">{step.num}</div>`, `<strong>{step.title}</strong>`, `<p>{step.text}</p>`
    - Garantir que o bloco seja Server Component puro (sem estado/efeito)
    - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.5, 11.2_

  - [x] 3.5 Implementar seção de segmentos com `DarkPanel`
    - Renderizar `<DarkPanel eyebrow="Por segmento" title="...">` com título em pt-BR
    - Dentro do DarkPanel: `<div className="solucoes-segments">` mapeando `solutionsPage.segments`
    - Cada `<Reveal delay={i * 60}>` envolve `<div className="solucoes-segment"><h3>...</h3><ul>...</ul></div>`
    - Bullets em `<li>` para cada item de `seg.bullets`
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.5, 11.2_

  - [x] 3.6 Implementar seção de cases condicional e CtaSection final
    - Renderizar seção de cases apenas quando `cases.length > 0`: `{cases.length > 0 && (<section>…</section>)}`
    - Dentro: eyebrow, `<h2>`, grid `className="case-grid"` com `cases.slice(0, 3)` mapeados
    - Cada case card usa `<article className="case">` com `case-art` (cliente) e `case-body` (tag, título, resumo) — reutilizar markup do padrão existente em `app/page.tsx`
    - Renderizar `<CtaSection title="..." text="..." label="Iniciar uma conversa" />` como última seção dentro de `<main>`; `title` e `text` em pt-BR voltados ao contexto de soluções (não copiar o padrão genérico de outros pages)
    - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4_

- [x] 4. Checkpoint — Verificação pré-deploy
  - Executar `npm run typecheck` e confirmar zero erros TypeScript strict
  - Executar `npm run lint` e confirmar zero erros/warnings novos
  - Executar `npm run check:routes` e confirmar sucesso
  - Executar `npm run build` e confirmar que a rota `/solucoes` compila sem erro
  - Se qualquer verificação falhar, corrigir antes de considerar a tarefa concluída
  - _Requisitos: 12.1, 12.2, 12.3_

## Notes

- Tarefas marcadas com `*` são opcionais e podem ser ignoradas para MVP mais rápido
- O design document não define propriedades de corretude (Correctness Properties), pois a página é uma composição Server Component de dados estáticos — testes de propriedade não se aplicam
- Todas as verificações de tipos e linting cobrem a ausência de `any`, `ts-ignore` e importações de `studio/`
- A seção de cases omite completamente a seção HTML se `getCasesCMS()` retornar `[]` — sem placeholder visível
- O `DarkPanel` existente já envolve o children num `<Reveal>`, então não aninhe um `<Reveal>` extra no nível do título/eyebrow do segmento

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3"] },
    { "id": 2, "tasks": ["2.1", "2.2", "2.3", "2.4"] },
    { "id": 3, "tasks": ["2.5", "3.1"] },
    { "id": 4, "tasks": ["3.2", "3.3", "3.4", "3.5"] },
    { "id": 5, "tasks": ["3.6"] }
  ]
}
```
