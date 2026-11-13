# Design Document

## Overview

Redesign incremental da homepage do site institucional UNIDAX com três mudanças principais: (1) atualização do menu de navegação com novos itens, (2) carrossel de imagens no hero, e (3) nova seção "Soluções". Todas as modificações preservam as seções existentes, respeitam a arquitetura do projeto (Server Components como padrão, `"use client"` apenas onde necessário) e mantêm o foco em geração de leads via `/contato`.

A abordagem é aditiva: novas constantes em `lib/content.ts`, um novo Client Component `HeroCarousel`, CSS adicionado ao final de `globals.css`, e atualizações cirúrgicas em `site-header.tsx` e `app/page.tsx`.

## Architecture

### Visão geral dos componentes afetados

```
app/
  page.tsx                  ← Atualizado: adiciona <SolucoesSection> e usa <HeroCarousel>
components/
  site-header.tsx           ← Atualizado: array `links` com novos itens
  hero-carousel.tsx         ← NOVO: Client Component para o carrossel
lib/
  content.ts                ← Atualizado: nova constante `solutions`
app/
  globals.css               ← Atualizado: estilos do carrossel e da seção Soluções
```

### Decisões de arquitetura

| Decisão | Escolha | Justificativa |
|---|---|---|
| `HeroCarousel` como Client Component | `"use client"` | Requer `setInterval`, `useState`, `useEffect` e event handlers — não pode ser Server Component |
| Resto da seção Hero | Permanece em `page.tsx` (Server) | Título, CTAs, eyebrow, nós e conexões são estáticos — não precisam de estado |
| `SolucoesSection` | Server Component inline em `page.tsx` | Dados estáticos de `lib/content.ts`; nenhuma interatividade necessária |
| Dados de `solutions` | `lib/content.ts` | Consistente com padrão do projeto para dados estáticos; sem dependência externa |
| Imagens do carrossel | `next/image` com `priority`/`lazy` | Já configurado em `next.config.ts` com AVIF + WebP; sem dependência nova |
| CSS | Adição ao final de `globals.css` | Regra do projeto: um único arquivo CSS |

### Fluxo de renderização

```
app/page.tsx (Server Component, async)
  ├── <section className="hero">
  │     ├── <div className="hero-bg-static" />     ← overlay de gradiente (Server)
  │     ├── <HeroCarousel />                        ← Client Component (imagens)
  │     └── <div className="hero-grid">
  │           ├── hero-copy (título, CTAs)          ← Server
  │           └── hero-visual (nós, conexões)       ← Server
  ├── ... (seções existentes preservadas)
  ├── <section className="section solucoes">       ← NOVA (Server)
  │     └── dados de solutions (lib/content.ts)
  └── ... (demais seções)
```

## Components and Interfaces

### 1. `HeroCarousel` — `components/hero-carousel.tsx`

**Tipo:** Client Component (`"use client"`)

```typescript
export interface HeroCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    priority?: boolean;
  }>;
}

export function HeroCarousel({ images }: HeroCarouselProps): JSX.Element
```

**Responsabilidades:**
- Renderizar as imagens com `next/image` (otimização automática)
- Gerenciar índice ativo com `useState`
- Avançar automaticamente a cada 5 s com `setInterval` via `useEffect`
- Pausar rotação quando qualquer controle recebe foco (`onFocus`/`onBlur`)
- Cancelar `setInterval` ao desmontar o componente
- Respeitar `prefers-reduced-motion`: desativar transições e auto-rotação
- Expor controles anterior/próximo com `aria-label` em pt-BR
- Expor indicadores de posição (dots) com `aria-label` e `aria-current`
- Tratar `onError` em `<img>` para avançar para a próxima imagem disponível

**Estado interno:**
```typescript
const [active, setActive] = useState(0);
const [paused, setPaused] = useState(false);
// ref para cancelar o interval
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
```

**Lógica de erro:** Se `next/image` disparar `onError` para a imagem ativa, o componente avança para `(active + 1) % images.length`, evitando layout quebrado.

---

### 2. `SolucoesSection` — inline em `app/page.tsx`

**Tipo:** Server Component (JSX inline — sem arquivo separado, pois é simples e específico da homepage)

**Renderiza:** grid de cards a partir da constante `solutions` de `lib/content.ts`.

**Props implícitas:** consume `solutions` importado de `@/lib/content`.

---

### 3. Atualização de `SiteHeader` — `components/site-header.tsx`

Substituição do array `links` hardcoded:

```typescript
// ANTES
const links = [
  ["IA & Transformação", "/ia"],
  ["Serviços", "/servicos"],
  ["Cases", "/cases"],
  ["Insights", "/insights"],
  ["A UNIDAX", "/empresa"],
];

// DEPOIS
const links = [
  ["Home", "/"],
  ["IA & Transformação", "/ia"],
  ["Serviços", "/servicos"],
  ["Soluções", "/solucoes"],
  ["Insights", "/insights"],
  ["A UNIDAX", "/empresa"],
];
```

Todos os comportamentos existentes (scroll-aware, mobile toggle, Escape, foco acessível, `aria-*`) são preservados sem alteração.

---

### 4. Nova constante `solutions` — `lib/content.ts`

```typescript
export type Solution = {
  slug: string;
  title: string;
  text: string;
  tags: string[];        // ex: ["IA", "ERP"]
  href: string;          // rota de destino (/solucoes/[slug] ou /contato fallback)
};

export const solutions: Solution[] = [
  {
    slug: "ia-erp",
    title: "IA + ERP: decisões inteligentes no coração do negócio",
    text: "Integre inteligência artificial ao seu ERP para automatizar processos, antecipar demandas e apoiar decisões com dados em tempo real.",
    tags: ["IA", "ERP & Dynamics"],
    href: "/contato",
  },
  {
    slug: "agentes-atendimento",
    title: "Agentes de IA para atendimento e suporte",
    text: "Automatize triagem, resposta e encaminhamento com agentes conectados à base de conhecimento e aos sistemas da empresa.",
    tags: ["Agentes", "Suporte"],
    href: "/contato",
  },
  {
    slug: "dados-ia",
    title: "Dados + IA: da informação à ação",
    text: "Una uma camada analítica robusta com modelos de IA para transformar dados operacionais em recomendações e alertas automáticos.",
    tags: ["Dados", "IA"],
    href: "/contato",
  },
  {
    slug: "automacao-processos",
    title: "Automação inteligente de processos",
    text: "Combine Power Platform e IA para automatizar fluxos repetitivos, reduzir erros manuais e liberar equipes para trabalho de maior valor.",
    tags: ["Power Platform", "IA"],
    href: "/contato",
  },
];
```

## Data Models

### `HeroCarouselProps.images`

As imagens do carrossel são definidas como constante local em `app/page.tsx` (Server Component pai que instancia `HeroCarousel`), passadas como prop:

```typescript
const heroImages = [
  { src: "/assets/img/hero.webp", alt: "UNIDAX — transformação empresarial com IA", priority: true },
  { src: "/assets/img/hero.png",  alt: "UNIDAX — inteligência artificial aplicada ao negócio", priority: false },
  { src: "/assets/img/home.png",  alt: "UNIDAX — tecnologia e inovação empresarial", priority: false },
];
```

A primeira imagem recebe `priority={true}` (pre-load), as demais `loading="lazy"` (comportamento padrão do `next/image` quando `priority` é omitido).

### `Solution`

```typescript
export type Solution = {
  slug: string;    // identificador kebab-case
  title: string;   // título do card (pt-BR)
  text: string;    // descrição curta (pt-BR)
  tags: string[];  // badges de tecnologia/área
  href: string;    // rota de destino
};
```

Armazenada em `lib/content.ts` como array de constantes tipadas — sem dependência de CMS ou fetch externo.

## Error Handling

### Falha de carregamento de imagem no carrossel (Requisito 2.8)

O `HeroCarousel` lida com falha de imagem de duas formas:
1. O `next/image` já inclui fallback automático via formatos (`avif → webp → original`).
2. Se a imagem não carrega de nenhuma forma, o handler `onError` no elemento `<img>` subjacente avança o índice: `setActive(i => (i + 1) % images.length)`.

Isso evita flash de imagem quebrada e mantém o layout intacto.

### `prefers-reduced-motion` (Requisito 2.5, 7.6)

Dentro do `useEffect` de `HeroCarousel`:

```typescript
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) return; // não inicia setInterval, não aplica transições CSS
```

A transição de opacidade entre slides é controlada por classe CSS; quando `reducedMotion` é `true`, a troca de slide ainda ocorre via controles manuais, mas sem animação e sem auto-rotação.

### Rota `/solucoes` inexistente (Requisito 4.3)

Os cards de Soluções apontam inicialmente para `/contato` como fallback seguro. O campo `href` em `Solution` suporta qualquer rota, então quando a rota `/solucoes/[slug]` for criada no futuro, basta atualizar a constante em `lib/content.ts` — sem mudança de componente.

## Testing Strategy

PBT **não é aplicável** a esta feature. Os componentes envolvidos são:
- **UI rendering** (`HeroCarousel`, seção Soluções): melhor cobertos por testes de snapshot e testes de comportamento de exemplo.
- **Dados estáticos** (`solutions` em `lib/content.ts`): validados por testes de schema/tipagem estática do TypeScript.
- **Atualização de array** (`links` em `site-header.tsx`): verificado por teste de exemplo (render + asserção de texto).

Não há funções puras com lógica de transformação, parsers, serializadores ou algoritmos que se beneficiem de geração randômica de inputs.

### Testes unitários / de comportamento

**`HeroCarousel`**

| Caso | Tipo | O que verificar |
|---|---|---|
| Render inicial | Exemplo | Primeira imagem visível, índice 0 ativo, dot 0 com `aria-current="true"` |
| Clique em "próximo" | Exemplo | Avança para slide 1, dot 1 ativo, timer reiniciado |
| Clique em "anterior" no slide 0 | Exemplo (edge case) | Vai para o último slide (wrap-around) |
| Clique em dot específico | Exemplo | Exibe slide correspondente |
| `prefers-reduced-motion` ativo | Exemplo | Nenhum `setInterval` iniciado; slides ainda navegáveis manualmente |
| Foco em controle | Exemplo | Rotação automática pausada |
| Blur em controle | Exemplo | Rotação automática retomada |
| `onError` em imagem | Edge case | Avança automaticamente para próximo slide |
| Desmontagem do componente | Edge case | `clearInterval` chamado (sem memory leak) |

**`SiteHeader`**

| Caso | Tipo | O que verificar |
|---|---|---|
| Render com novos itens | Exemplo | Links "Home" (/), "Soluções" (/solucoes) presentes |
| Ausência de "Cases" | Exemplo | Link "Cases" não presente no menu |
| Contagem total de itens | Exemplo | Exatamente 6 links de navegação + CTA |

**`solutions` (constante)**

| Caso | Tipo | O que verificar |
|---|---|---|
| Tipagem | Estático (TS) | Compilação sem erros com `tsc --noEmit` |
| Mínimo de 4 cards | Exemplo | `solutions.length >= 4` |
| Campos obrigatórios presentes | Exemplo | Cada item tem `slug`, `title`, `text`, `tags`, `href` não-vazios |
| `href` válido | Exemplo | Todo `href` começa com `/` |

### Testes de integração / smoke

| Verificação | Como |
|---|---|
| Homepage renderiza sem erros | `npm run build` (Next.js build estático — falha se há erro de render) |
| Rota `/contato` acessível a partir dos cards de Soluções | Build + `npm run check:routes` |
| Sem regressivos em outras páginas | `npm run typecheck` + `npm run lint` |

### Verificação pré-deploy (ordem obrigatória)

```bash
npm ci
npm run check:routes
npm run typecheck
npm run lint
npm run build
```
