# Implementation Plan: Homepage Redesign

## Overview

Implementação incremental do redesign da homepage UNIDAX em cinco etapas: (1) dados estáticos em `lib/content.ts`, (2) novo Client Component `HeroCarousel`, (3) atualização cirúrgica do `SiteHeader`, (4) integração em `app/page.tsx` com `HeroCarousel` e nova `SolucoesSection`, e (5) CSS em `globals.css` para carrossel e seção Soluções. Cada etapa é independente o suficiente para ser validada antes da próxima.

## Tasks

- [x] 1. Adicionar tipo `Solution` e constante `solutions` em `lib/content.ts`
  - Declarar o tipo `Solution` com campos `slug: string`, `title: string`, `text: string`, `tags: string[]` e `href: string`
  - Adicionar a constante exportada `solutions: Solution[]` com os quatro cards definidos no design (`ia-erp`, `agentes-atendimento`, `dados-ia`, `automacao-processos`)
  - Todos os textos devem estar em pt-BR; `href` de cada item deve começar com `/`
  - _Requisitos: 4.1, 4.4_

- [x] 2. Criar `components/hero-carousel.tsx`
  - [x] 2.1 Criar esqueleto do Client Component com interface `HeroCarouselProps`
    - Declarar `"use client"` no topo do arquivo
    - Exportar com named export: `export function HeroCarousel`
    - Definir e exportar `HeroCarouselProps`: `images: Array<{ src: string; alt: string; priority?: boolean }>`
    - Importar `useState`, `useEffect`, `useRef` do React e `Image` do `next/image`
    - _Requisitos: 2.9, 6.1_

  - [x] 2.2 Implementar estado, auto-rotação e `prefers-reduced-motion`
    - Declarar `const [active, setActive] = useState(0)` e `const [paused, setPaused] = useState(false)`
    - Declarar `timerRef` com `useRef<ReturnType<typeof setInterval> | null>(null)`
    - No `useEffect` principal: checar `window.matchMedia("(prefers-reduced-motion: reduce)").matches` antes de iniciar `setInterval` de 5000 ms
    - Cancelar o interval quando `paused` for `true` ou na desmontagem (`clearInterval` no return do `useEffect`)
    - Reiniciar o timer ao mudar de slide via controles (limpar e recriar o interval)
    - _Requisitos: 2.2, 2.3, 2.5, 7.6_

  - [x] 2.3 Implementar renderização das imagens com `next/image` e handler de erro
    - Renderizar cada imagem com `next/image`; passar `priority={true}` apenas para `images[0].priority === true`, demais sem `priority` (lazy por padrão)
    - Definir `sizes` responsivos: `"(max-width: 700px) 100vw, 100vw"`
    - Aplicar classe CSS `carousel-slide--active` no slide ativo para controlar opacidade/visibilidade via CSS
    - Implementar `onError` no elemento `<img>` subjacente: `setActive(i => (i + 1) % images.length)`
    - _Requisitos: 2.8, 6.1, 6.2, 6.3, 6.4_

  - [x] 2.4 Implementar controles de navegação e indicadores (dots) com acessibilidade
    - Adicionar botão "anterior" (`aria-label="Imagem anterior"`) e botão "próximo" (`aria-label="Próxima imagem"`)
    - Ao clicar em anterior/próximo: atualizar `active` com wrap-around (`(active - 1 + length) % length` / `(active + 1) % length`) e reiniciar o timer
    - Renderizar um `<button>` por imagem como indicador (dot); o dot ativo recebe `aria-current="true"` e `aria-label="Ir para imagem N de M"`
    - Adicionar `onFocus={() => setPaused(true)}` e `onBlur={() => setPaused(false)}` em todos os controles e dots
    - Garantir que todos os botões são ativáveis via Enter/Space (comportamento nativo de `<button>`)
    - _Requisitos: 2.3, 2.4, 7.1, 7.2, 7.6_

- [x] 3. Atualizar array `links` em `components/site-header.tsx`
  - Substituir o array `links` existente pelo novo:
    ```ts
    const links = [
      ["Home", "/"],
      ["IA & Transformação", "/ia"],
      ["Serviços", "/servicos"],
      ["Soluções", "/solucoes"],
      ["Insights", "/insights"],
      ["A UNIDAX", "/empresa"],
    ];
    ```
  - Remover o item `["Cases", "/cases"]` que estava presente antes
  - Não alterar nenhuma outra linha do componente (comportamentos scroll-aware, mobile toggle, Escape, `aria-*` permanecem intactos)
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [x] 4. Integrar `HeroCarousel` e adicionar `SolucoesSection` em `app/page.tsx`
  - [x] 4.1 Substituir o fundo estático do hero pelo `HeroCarousel`
    - Importar `HeroCarousel` de `@/components/hero-carousel`
    - Declarar a constante `heroImages` com os três objetos de imagem conforme o design (`hero.webp` com `priority: true`, `hero.png` e `home.png`)
    - Substituir `<div className="hero-bg" />` pela chamada `<HeroCarousel images={heroImages} />`
    - Garantir que `hero-copy` e `hero-visual` permanecem como filhos irmãos dentro de `hero-grid` (ordem e classes CSS inalteradas)
    - _Requisitos: 2.1, 2.6, 2.7, 3.1, 3.2_

  - [x] 4.2 Adicionar `SolucoesSection` inline após a seção Metodologia
    - Importar `solutions` de `@/lib/content`
    - Adicionar importação de `ArrowIcon` se já não presente (já está importado)
    - Inserir o bloco JSX da seção `solucoes` imediatamente após o fechamento `</section>` da seção `method`, antes da seção `services`
    - Estrutura: `<section className="section solucoes">` → `<div className="container">` → `<SectionHead>` com eyebrow "Soluções integradas", title e text em pt-BR → `<div className="solucoes-grid">` → `{solutions.map(...)}` com `<article className="solucao-card">` contendo tags, título, texto e link
    - Cada card deve ter `<Link href={item.href}>` para o destino definido em `solutions`; nenhum card deve retornar 404
    - _Requisitos: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 5. Adicionar CSS para carrossel e seção Soluções em `app/globals.css`
  - [x] 5.1 Adicionar estilos do `HeroCarousel`
    - Adicionar ao **final** de `globals.css` (nunca remover seletores existentes)
    - `.hero-carousel`: posicionamento absoluto cobrindo toda a área do hero (`position: absolute; inset: 0; z-index: 0`)
    - `.carousel-slide`: `position: absolute; inset: 0; opacity: 0; transition: opacity 0.6s ease`
    - `.carousel-slide--active`: `opacity: 1`
    - `.carousel-controls`: posicionamento dos botões anterior/próximo sobre o carrossel
    - `.carousel-dots`: container dos indicadores, centralizado na parte inferior do hero
    - `.carousel-dot` e `.carousel-dot--active`: estilo dos dots (dimensões, cor, transição)
    - Regra `@media (prefers-reduced-motion: reduce)` zerando `transition` de `.carousel-slide`
    - _Requisitos: 2.2, 2.4, 3.4, 7.4_

  - [x] 5.2 Adicionar estilos da `SolucoesSection`
    - `.solucoes-grid`: grid responsivo — 3 colunas em ≥ 1020px, 2 colunas em 700px–1019px, 1 coluna em < 700px (usar `grid-template-columns` com CSS custom properties existentes ou `repeat(3, 1fr)` com media queries)
    - `.solucao-card`: estilo de card (padding, border-radius, background, hover com `transform: translateY(-4px)`, transição suave)
    - `.solucao-tags`: container de badges de tecnologia (`display: flex; gap: 0.5rem; flex-wrap: wrap`)
    - `.solucao-tag`: estilo individual de badge (fundo semitransparente, border-radius, fonte pequena)
    - _Requisitos: 4.5, 5.1, 5.2, 7.5_

- [x] 6. Checkpoint — verificação pré-deploy
  - Executar `npm run check:routes` e garantir que não há erros de rotas
  - Executar `npm run typecheck` e corrigir todos os erros TypeScript reportados
  - Executar `npm run lint` e corrigir todos os avisos e erros de lint
  - Executar `npm run build` e confirmar build bem-sucedido sem erros de render
  - Garantir que todas as tarefas acima foram concluídas, perguntar ao usuário se há dúvidas antes de finalizar.

## Notes

- Tarefas marcadas com `*` são opcionais e podem ser puladas para um MVP mais rápido
- O design não inclui uma seção "Correctness Properties" — PBT não se aplica a esta feature (componentes de UI e dados estáticos); testes são de snapshot e comportamento de exemplo
- O CSS deve sempre ser adicionado ao final de `globals.css`, nunca sobrescrevendo seletores existentes usados por outras páginas
- O `HeroCarousel` deve cobrir 100% da área do hero com `position: absolute; inset: 0` para que o conteúdo textual (`.hero-copy`, `.hero-visual`) fique sobreposto via z-index
- A rota `/solucoes` não precisa existir para esta feature; os cards apontam para `/contato` como fallback seguro
- O item "Cases" é removido do menu de navegação conforme Requisito 1.1 (seis itens específicos, sem "Cases")

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "3"] },
    { "id": 2, "tasks": ["2.2", "2.3"] },
    { "id": 3, "tasks": ["2.4", "5.1", "5.2"] },
    { "id": 4, "tasks": ["4.1", "4.2"] }
  ]
}
```
