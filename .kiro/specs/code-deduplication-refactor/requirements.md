# Requirements Document

## Introduction

O site da UNIDAX acumulou duplicidades de código ao longo das versões v4.x. Padrões idênticos ou quase-idênticos aparecem em múltiplas páginas: seções CTA, grids de cards, blocos de estatísticas, blocos escuros editoriais e helpers de metadados são escritos inline repetidas vezes em vez de serem extraídos como componentes ou utilitários compartilhados. Esta refatoração tem como objetivo identificar, abstrair e consolidar esses padrões sem introduzir regressivos visuais, funcionais ou de SEO.

---

## Glossary

- **CTA Section**: seção com fundo vermelho (`var(--red)`) contendo título, subtítulo e link principal para `/contato`. Aparece como última seção de quase todas as páginas.
- **Dark Panel Section**: seção com classe `dark-panel` e fundo `#09131b`, usada para destacar blocos editoriais (metodologia, diferenciais, integração etc.).
- **Stats Block**: grade de métricas numéricas (ex.: "+100 clientes"), renderizada via array `stats` de `lib/content.ts`.
- **Section Head**: bloco flex com eyebrow + título + parágrafo à esquerda e link "Ver todos" à direita, repetido em grids de cases, insights e serviços na homepage.
- **Metadata Helper**: objeto `Metadata` do Next.js composto manualmente inline em cada page, com campos `title`, `description`, `alternates.canonical`, `openGraph` e `twitter` repetidos com a mesma estrutura.
- **CMS Page Pattern**: padrão compartilhado por `app/ia/[slug]` e `app/servicos/[slug]`: `generateStaticParams` + `generateMetadata` + renderização de `<LandingPage>`, diferindo apenas pelo array de origem (`aiLandingPages` vs. `enterpriseLandingPages`) e pelo prefixo de rota.
- **Eyebrow**: rótulo decorativo em caixa alta com borda dourada à esquerda, renderizado como `<div className="eyebrow">`.
- **Reveal**: componente Client `<Reveal>` que envolve qualquer bloco com animação de scroll.
- **Server Component**: componente React sem `"use client"`, executado no servidor.
- **Client Component**: componente React com `"use client"`, executado no navegador.
- **LandingContent**: tipo TypeScript definido em `lib/seo-content.ts` descrevendo o schema de uma landing page de serviço.
- **Spec**: este documento de requisitos e suas derivações de design e tarefas.

---

## Requirements

### Requirement 1: Componente CtaSection reutilizável

**User Story:** Como desenvolvedor que mantém o site, quero um componente `<CtaSection>` parametrizável, para que eu possa alterar o CTA de qualquer página em um único lugar sem precisar editar múltiplos arquivos.

#### Acceptance Criteria

1. THE `CtaSection` Component SHALL aceitar as props `title` (string), `text` (string) e `href` (string, padrão `/contato`), e opcionalmente `label` (string, padrão "Falar com um especialista").
2. THE `CtaSection` Component SHALL ser um Server Component sem diretiva `"use client"`.
3. THE `CtaSection` Component SHALL renderizar HTML semanticamente equivalente ao bloco `<section className="cta">` existente, preservando as classes CSS `cta`, `cta-grid`, `btn btn-light` e o `<ArrowIcon />`.
4. WHEN o componente `CtaSection` for criado, THE `Codebase` SHALL substituir todas as ocorrências inline do bloco CTA vermelho nas seguintes pages: `app/page.tsx`, `app/ia/page.tsx`, `app/servicos/page.tsx`, `app/cases/page.tsx`, `app/empresa/page.tsx`.
5. THE `CtaSection` Component SHALL exportar um named export a partir de `components/cta-section.tsx`.
6. WHEN qualquer página renderizar `<CtaSection>`, THE `Browser` SHALL exibir o bloco CTA com aparência visual idêntica à versão anterior.

---

### Requirement 2: Componente DarkPanel reutilizável

**User Story:** Como desenvolvedor, quero um componente `<DarkPanel>` que encapsule o padrão de seção editorial escura, para não repetir a estrutura `<section className="section dark-panel"><div className="container">` em cada página.

#### Acceptance Criteria

1. THE `DarkPanel` Component SHALL aceitar as props `eyebrow` (string opcional), `title` (string), `children` (ReactNode) e `className` (string opcional).
2. THE `DarkPanel` Component SHALL ser um Server Component sem diretiva `"use client"`.
3. THE `DarkPanel` Component SHALL renderizar as classes CSS `section dark-panel` e envolver o conteúdo em `<div className="container">`, preservando a estrutura HTML existente.
4. WHEN o componente `DarkPanel` for criado, THE `Codebase` SHALL substituir as ocorrências inline do padrão dark panel em: `app/ia/page.tsx` (seções "metodologia" e "ai-first"), `app/servicos/page.tsx`, `app/cases/page.tsx`, `app/empresa/page.tsx`.
5. THE `DarkPanel` Component SHALL exportar um named export a partir de `components/dark-panel.tsx`.
6. WHEN qualquer página renderizar `<DarkPanel>`, THE `Browser` SHALL exibir a seção escura com aparência visual idêntica à versão anterior.

---

### Requirement 3: Componente StatsBlock reutilizável

**User Story:** Como desenvolvedor, quero um componente `<StatsBlock>` que renderize a grade de estatísticas, para não duplicar o loop sobre o array `stats` entre `app/page.tsx` e `app/empresa/page.tsx`.

#### Acceptance Criteria

1. THE `StatsBlock` Component SHALL aceitar a prop `items` (array de `readonly [string, string]`) e uma prop opcional `borderless` (boolean, padrão `false`).
2. THE `StatsBlock` Component SHALL ser um Server Component sem diretiva `"use client"`.
3. WHEN `borderless` for `true`, THE `StatsBlock` Component SHALL aplicar o estilo `borderLeft: 0` à `.stats` (comportamento atual em `app/empresa/page.tsx`).
4. THE `StatsBlock` Component SHALL renderizar HTML semanticamente equivalente ao bloco `.stats` existente, preservando classes `stat`, `strong` e `span`.
5. WHEN o componente `StatsBlock` for criado, THE `Codebase` SHALL substituir as duas ocorrências do bloco `.stats` em `app/page.tsx` e `app/empresa/page.tsx`.
6. THE `StatsBlock` Component SHALL exportar um named export a partir de `components/stats-block.tsx`.

---

### Requirement 4: Helper de metadados para páginas de landing

**User Story:** Como desenvolvedor, quero um helper `buildLandingMetadata` que construa o objeto `Metadata` do Next.js para páginas de serviço, para não repetir a mesma estrutura de `title`, `description`, `alternates`, `openGraph` e `twitter` em `app/ia/[slug]/page.tsx` e `app/servicos/[slug]/page.tsx`.

#### Acceptance Criteria

1. THE `buildLandingMetadata` Function SHALL aceitar os parâmetros `item` (objeto com `title` e `description`) e `url` (string com a URL canônica completa), e retornar um objeto `Metadata` do Next.js.
2. THE `buildLandingMetadata` Function SHALL produzir um objeto `Metadata` com campos `title`, `description`, `alternates.canonical`, `openGraph` (type, title, description, url, images) e `twitter` (card, title, description) idênticos à estrutura inline atual.
3. WHEN `buildLandingMetadata` for criado, THE `Codebase` SHALL substituir o bloco `generateMetadata` inline em `app/ia/[slug]/page.tsx` e `app/servicos/[slug]/page.tsx` por chamadas a esse helper.
4. THE `buildLandingMetadata` Function SHALL ser exportada como named export de `lib/metadata.ts`.
5. THE `lib/metadata.ts` Module SHALL importar somente de `next` e de módulos internos ao projeto, sem dependências externas novas.
6. WHEN qualquer página de landing for acessada, THE `Browser` SHALL receber os mesmos metatags `<head>` que recebia antes da refatoração.

---

### Requirement 5: Consolidação do padrão SectionHead

**User Story:** Como desenvolvedor, quero um componente `<SectionHead>` que renderize o cabeçalho de seções de grade (eyebrow + título + parágrafo + link), para não repetir esse bloco três vezes na homepage.

#### Acceptance Criteria

1. THE `SectionHead` Component SHALL aceitar as props `eyebrow` (string), `title` (string), `text` (string), `linkLabel` (string opcional) e `linkHref` (string opcional).
2. THE `SectionHead` Component SHALL ser um Server Component sem diretiva `"use client"`.
3. WHEN `linkLabel` e `linkHref` forem fornecidos, THE `SectionHead` Component SHALL renderizar o link `<Link className="link">` com `<ArrowIcon />` alinhado ao lado direito via a classe CSS `section-head`.
4. WHEN `linkLabel` ou `linkHref` forem omitidos, THE `SectionHead` Component SHALL renderizar apenas o bloco de texto, sem o link.
5. WHEN o componente `SectionHead` for criado, THE `Codebase` SHALL substituir as três ocorrências do bloco `.section-head` em `app/page.tsx` (seções IA, Cases e Insights).
6. THE `SectionHead` Component SHALL exportar um named export a partir de `components/section-head.tsx`.
7. WHEN qualquer seção renderizar `<SectionHead>`, THE `Browser` SHALL exibir o cabeçalho da seção com aparência visual idêntica à versão anterior.

---

### Requirement 6: Extração de constantes e tipos repetidos

**User Story:** Como desenvolvedor, quero que tipos e constantes usadas em múltiplos arquivos estejam definidos em um único lugar, para evitar dessincronização entre arquivos.

#### Acceptance Criteria

1. THE `lib/metadata.ts` Module SHALL centralizar a constante de URL base do OG image (`/opengraph-image`), atualmente escrita inline em `app/ia/[slug]/page.tsx`, `app/servicos/[slug]/page.tsx` e `app/cases/[slug]/page.tsx`.
2. WHEN a constante de OG image for extraída, THE `Codebase` SHALL referenciar essa constante nos três arquivos de page que a utilizavam inline.
3. THE `LandingContent` Type em `lib/seo-content.ts` SHALL ser a única definição do tipo de conteúdo de landing pages, sem redefinições em outros arquivos.
4. THE `Case` Type e `Insight` Type definidos em `lib/content.ts` SHALL ser a única fonte de verdade para esses tipos, sem redefinições em outros módulos.
5. IF um arquivo importar um tipo já definido em outro módulo do projeto, THEN THE `Linter` SHALL reportar erro de redeclaração, e esse erro SHALL ser corrigido removendo a definição redundante.

---

### Requirement 7: Manutenção de comportamento e ausência de regressivos

**User Story:** Como gestor de produto, quero garantir que a refatoração não introduza nenhuma regressão visual, funcional ou de SEO, para que o site continue operacional e corretamente indexado após as mudanças.

#### Acceptance Criteria

1. WHEN todos os componentes e helpers extraídos forem aplicados, THE `Build` SHALL concluir sem erros de tipo TypeScript (`npm run typecheck`) e sem erros de lint (`npm run lint`).
2. WHEN a refatoração for concluída, THE `check-routes Script` SHALL executar sem erros (`npm run check:routes`).
3. THE `Refactoring` SHALL NOT alterar nenhum valor de classe CSS existente em `app/globals.css`.
4. THE `Refactoring` SHALL NOT introduzir dependências novas em `package.json`.
5. THE `Refactoring` SHALL NOT converter nenhum Server Component existente em Client Component.
6. THE `Refactoring` SHALL NOT alterar a estrutura de rotas em `app/`, a não ser pela adição de novos arquivos em `components/` e `lib/`.
7. WHEN qualquer página que utilizava um bloco inline for substituída pelo componente extraído, THE `HTML` renderizado pelo servidor SHALL ser semanticamente equivalente ao HTML anterior (mesmas tags, mesmas classes CSS, mesma hierarquia de heading).
8. THE `Refactoring` SHALL NOT alterar nenhuma string visível ao usuário já presente no código, preservando todos os textos em português (pt-BR).
9. WHEN o formulário de contato em `app/contato/page.tsx` for acessado após a refatoração, THE `ContactForm` Component SHALL continuar funcionando sem alterações de comportamento.
10. IF a refatoração tocar em `lib/cms.ts` ou `lib/content.ts`, THEN THE `CMS Adapter` SHALL continuar retornando o fallback correto para `getPublishedInsightsCMS`, `getInsightCMS`, `getCasesCMS` e `getCaseCMS` quando Sanity não estiver configurado.
