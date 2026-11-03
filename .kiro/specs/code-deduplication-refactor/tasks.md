# Implementation Plan: Code Deduplication Refactor

## Overview

Extração de seis padrões repetidos no código do site UNIDAX em componentes Server Components reutilizáveis e um helper TypeScript. Nenhuma alteração de comportamento visual ou funcional — o objetivo é uma única fonte de verdade para cada padrão, com tipagem estrita e zero dependências novas.

## Tasks

- [x] 1. Criar `lib/metadata.ts` com `OG_IMAGE_PATH` e `buildLandingMetadata`
  - Criar o arquivo `lib/metadata.ts` com a constante exportada `OG_IMAGE_PATH = "/opengraph-image"`
  - Implementar a função exportada `buildLandingMetadata(item: { title: string; description: string }, url: string): Metadata` retornando o objeto com `title`, `description`, `alternates.canonical`, `openGraph` (type, title, description, url, images) e `twitter` (card, title, description) conforme o design
  - Importar apenas `next` para o tipo `Metadata` — sem dependências externas novas
  - _Requisitos: 4.1, 4.2, 4.4, 4.5, 6.1_

- [x] 2. Migrar páginas de landing para `buildLandingMetadata` e `OG_IMAGE_PATH`
  - [x] 2.1 Atualizar `app/ia/[slug]/page.tsx` para importar `buildLandingMetadata` de `@/lib/metadata` e substituir o corpo inline do `generateMetadata` pela chamada ao helper
    - Remover a string literal `"/opengraph-image"` do arquivo após a extração
    - _Requisitos: 4.3, 4.6, 6.1, 6.2_

  - [x] 2.2 Atualizar `app/servicos/[slug]/page.tsx` da mesma forma que a tarefa 2.1
    - _Requisitos: 4.3, 4.6, 6.1, 6.2_

  - [x] 2.3 Atualizar `app/insights/[slug]/page.tsx` para importar `OG_IMAGE_PATH` de `@/lib/metadata` e referenciar a constante em vez da string literal `"/opengraph-image"`
    - O formato do objeto `Metadata` desse arquivo não muda — somente a string hardcoded é substituída pela constante
    - _Requisitos: 6.1, 6.2_

  - [x] 2.4 Atualizar `app/cases/[slug]/page.tsx` da mesma forma que a tarefa 2.3
    - _Requisitos: 6.1, 6.2_

- [x] 3. Checkpoint — verificação parcial
  - Garantir que `npm run typecheck` e `npm run lint` executem sem erros antes de continuar.

- [x] 4. Criar `components/cta-section.tsx`
  - Criar o Server Component `CtaSection` (sem `"use client"`) com a interface de props: `title: string`, `text: string`, `href?: string` (padrão `"/contato"`), `label?: string` (padrão `"Falar com um especialista"`), `children?: React.ReactNode`
  - Renderizar `<section className="cta"><div className="container cta-grid">…</div></section>` com `Link` e `ArrowIcon`, preservando exatamente as classes CSS existentes
  - O slot `children` é renderizado entre o parágrafo e o botão para suportar o `<div className="cta-note">` único da homepage
  - Exportar como named export
  - _Requisitos: 1.1, 1.2, 1.3, 1.5_

- [x] 5. Substituir CTAs inline por `<CtaSection>`
  - [x] 5.1 Substituir o bloco `<section className="cta">` em `app/page.tsx` por `<CtaSection>` passando `title`, `text` e o `<div className="cta-note">` como `children`
    - _Requisitos: 1.4, 1.6, 7.7, 7.8_

  - [x] 5.2 Substituir o bloco CTA inline em `app/ia/page.tsx` por `<CtaSection>` com `title`, `text` e `label` correspondentes ao texto atual
    - _Requisitos: 1.4, 1.6, 7.7, 7.8_

  - [x] 5.3 Substituir o bloco CTA inline em `app/servicos/page.tsx` por `<CtaSection>`
    - _Requisitos: 1.4, 1.6, 7.7, 7.8_

  - [x] 5.4 Substituir o bloco CTA inline em `app/cases/page.tsx` por `<CtaSection>`
    - _Requisitos: 1.4, 1.6, 7.7, 7.8_

  - [x] 5.5 Substituir o bloco CTA inline em `app/empresa/page.tsx` por `<CtaSection>`
    - _Requisitos: 1.4, 1.6, 7.7, 7.8_

- [x] 6. Criar `components/dark-panel.tsx`
  - Criar o Server Component `DarkPanel` (sem `"use client"`) com a interface: `eyebrow?: string`, `title: string`, `children: React.ReactNode`, `className?: string`
  - Renderizar `<section className={`section dark-panel${className ? ` ${className}` : ``}`}>` com `<div className="container">` e `<Reveal>` envolvendo o eyebrow (condicional), o `<h2>` e o `children`
  - Importar `Reveal` de `@/components/reveal`; não adicionar `"use client"` ao próprio componente
  - Exportar como named export
  - _Requisitos: 2.1, 2.2, 2.3, 2.5_

- [x] 7. Substituir dark panels inline por `<DarkPanel>`
  - [x] 7.1 Substituir a seção `dark-panel` com `id="metodologia"` em `app/ia/page.tsx` por `<DarkPanel eyebrow="Metodologia" title="Da primeira hipótese à operação." className="…">` mantendo o `id` via prop ou wrapping externo conforme melhor abordagem
    - Verificar que o conteúdo `children` (lista `bullet-list`) é preservado integralmente
    - _Requisitos: 2.4, 2.6, 7.7_

  - [x] 7.2 Substituir a seção `dark-panel ia-aifirst` em `app/ia/page.tsx` por `<DarkPanel className="ia-aifirst" id="ai-first" …>` ou equivalente que preserve as classes e o `id`
    - _Requisitos: 2.4, 2.6, 7.7_

  - [x] 7.3 Substituir o dark panel em `app/servicos/page.tsx` por `<DarkPanel>`
    - _Requisitos: 2.4, 2.6, 7.7_

  - [x] 7.4 Substituir o dark panel em `app/cases/page.tsx` por `<DarkPanel>`
    - _Requisitos: 2.4, 2.6, 7.7_

  - [x] 7.5 Substituir o dark panel em `app/empresa/page.tsx` por `<DarkPanel>`
    - _Requisitos: 2.4, 2.6, 7.7_

- [x] 8. Checkpoint — verificação parcial
  - Garantir que `npm run typecheck` e `npm run lint` executem sem erros antes de continuar.

- [x] 9. Criar `components/stats-block.tsx`
  - Criar o Server Component `StatsBlock` (sem `"use client"`) com a interface: `items: ReadonlyArray<readonly [string, string]>`, `borderless?: boolean` (padrão `false`)
  - Renderizar `<div className="stats" style={borderless ? { borderLeft: 0 } : undefined}>` com o loop de `<div className="stat"><strong>{value}</strong><span>{label}</span></div>`
  - A prop `items` deve ser compatível com `typeof stats` de `lib/content.ts` (tuple readonly)
  - Exportar como named export
  - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.6_

- [x] 10. Substituir stats blocks inline por `<StatsBlock>`
  - [x] 10.1 Substituir o bloco `.stats` em `app/page.tsx` por `<StatsBlock items={stats} />` mantendo o `<Reveal delay={100}>` envolvente existente
    - _Requisitos: 3.5, 7.7_

  - [x] 10.2 Substituir o bloco `.stats` em `app/empresa/page.tsx` por `<StatsBlock items={stats} borderless />`
    - _Requisitos: 3.5, 7.7_

- [x] 11. Criar `components/section-head.tsx`
  - Criar o Server Component `SectionHead` (sem `"use client"`) com a interface: `eyebrow: string`, `title: string`, `text: string`, `linkLabel?: string`, `linkHref?: string`
  - Quando `linkLabel` e `linkHref` forem fornecidos, renderizar o `<Link className="link">` com `<ArrowIcon />` à direita dentro do `.section-head`
  - Quando `linkLabel` ou `linkHref` estiverem ausentes (ou `linkLabel` presente mas `linkHref` falsy), omitir o link silenciosamente
  - Importar `Link` de `next/link` e `ArrowIcon` de `@/components/icons`
  - Exportar como named export
  - _Requisitos: 5.1, 5.2, 5.3, 5.4, 5.6_

- [x] 12. Substituir section-heads inline em `app/page.tsx` por `<SectionHead>`
  - [x] 12.1 Substituir o `.section-head` da seção de serviços IA (eyebrow "Inteligência artificial") por `<SectionHead>` mantendo o `<Reveal>` envolvente
    - _Requisitos: 5.5, 5.7, 7.7_

  - [x] 12.2 Substituir o `.section-head` da seção de cases por `<SectionHead>` mantendo o `<Reveal>` envolvente
    - _Requisitos: 5.5, 5.7, 7.7_

  - [x] 12.3 Substituir o `.section-head` da seção de insights por `<SectionHead>` mantendo o `<Reveal>` envolvente
    - _Requisitos: 5.5, 5.7, 7.7_

- [x] 13. Atualizar `components/seo/landing-page.tsx` para usar `CtaSection` e `DarkPanel`
  - Substituir o bloco `<section className="section dark-panel">` inline por `<DarkPanel eyebrow="Escopo possível" title="Um caminho claro da descoberta à execução.">`
  - Substituir o bloco `<section className="cta">` inline por `<CtaSection>` passando `title={item.cta}`, `text="Compartilhe o contexto…"`, `href={`/contato?interesse=…`}` e `label="Conversar com especialista"`
  - _Requisitos: 1.4, 2.4, 7.7_

- [x] 14. Checkpoint final — verificação completa
  - Executar `npm run check:routes` e confirmar saída sem erros
  - Executar `npm run typecheck` e confirmar saída sem erros
  - Executar `npm run lint` e confirmar saída sem erros
  - Executar `npm run build` e confirmar build sem erros de compilação
  - _Requisitos: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

## Notes

- Tarefas marcadas com `*` são opcionais e podem ser omitidas para entrega mais rápida. Este refactor não possui Correctness Properties no design (padrões puramente de renderização), portanto não há tarefas de property-based tests — apenas o build e o typecheck funcionam como validação de corretude.
- Cada tarefa referencia os requisitos específicos de `requirements.md` para rastreabilidade.
- Os checkpoints nas tarefas 3 e 8 garantem que erros de tipo sejam detectados cedo, antes de acumular mudanças.
- A ordem das tarefas segue dependências: `lib/metadata.ts` primeiro (sem deps internas), depois os componentes folha (`CtaSection`, `DarkPanel`, `StatsBlock`, `SectionHead`), depois os call-sites, e por último `landing-page.tsx` que depende de dois componentes novos.
- `DarkPanel` importa `Reveal` (Client Component), mas ele próprio permanece Server Component — isso é válido no Next.js App Router.
- Nenhum arquivo em `app/globals.css` deve ser tocado. Nenhuma dependência nova deve ser adicionada ao `package.json`.
- Todo texto visível ao usuário deve permanecer em português (pt-BR) — nenhuma string de UI deve ser criada ou alterada em inglês.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4"] },
    { "id": 2, "tasks": ["4", "6", "9", "11"] },
    { "id": 3, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5", "7.1", "7.2", "7.3", "7.4", "7.5", "10.1", "10.2", "12.1", "12.2", "12.3"] },
    { "id": 4, "tasks": ["13"] }
  ]
}
```
