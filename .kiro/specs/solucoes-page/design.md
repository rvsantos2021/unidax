# Design Document

## Overview

A página `/solucoes` é uma vitrine de portfólio orientada à geração de leads, que combina as capacidades de IA e tecnologia empresarial da UNIDAX em uma narrativa única de "problema → resultado". É implementada como um `async` Server Component no App Router do Next.js 15, composta inteiramente de componentes reutilizáveis do design system existente (`PageHero`, `Reveal`, `DarkPanel`, `CtaSection`) mais markup inline para as seções específicas da página.

A página não introduz nenhum componente client-side novo — toda interatividade de scroll-reveal já existe em `Reveal` (que é `"use client"` internamente). Os dados são estáticos (servidos de `lib/content.ts`) exceto a seção de cases, que é obtida via `getCasesCMS()` no servidor com fallback automático.

### Objetivos de design

- Coerência visual com `/ia` e `/servicos` (mesmo dark theme, glassmorphism, animações)
- Progressão narrativa: diferencial → soluções → metodologia → prova social (cases) → CTA
- Zero overhead de bundle client-side adicionado
- TypeScript strict sem qualquer `any` ou `ts-ignore`

---

## Architecture

```
app/solucoes/page.tsx          ← async Server Component (único arquivo novo)
lib/content.ts                 ← adiciona FullSolution, solutionsPage (append apenas)
app/globals.css                ← adiciona classes solucoes-* (append apenas)
```

Não há rota `[slug]` nesta fase. O `check:routes` não precisa de atualização em `seo-content.ts` pois `/solucoes` não é uma landing page SEO dinâmica — é uma rota estática de primeiro nível que já existirá ao criar `app/solucoes/page.tsx`.

### Fluxo de dados (server-side)

```
page.tsx (async Server Component)
  ├── import { solutionsPage } from "@/lib/content"   ← síncrono, sempre disponível
  └── await getCasesCMS()                             ← Sanity → fallback lib/content
        └── getCasesCMS retorna Case[]
              └── slice(0, 3) → renderizado condicionalmente
```

A chamada a `getCasesCMS()` é feita diretamente no componente page (padrão do projeto, igual a `app/page.tsx`).

---

## Components and Interfaces

### Componentes reutilizados (sem modificação)

| Componente | Arquivo | Uso na página |
|---|---|---|
| `PageHero` | `components/page-hero.tsx` | Seção 1 — hero da página |
| `Reveal` | `components/reveal.tsx` | Animação de scroll em todas as seções |
| `DarkPanel` | `components/dark-panel.tsx` | Seção 5 — segmentos de mercado |
| `CtaSection` | `components/cta-section.tsx` | Seção 7 — CTA final |
| `SectionHead` | `components/section-head.tsx` | Cabeçalho da seção de soluções |
| Ícones | `components/icons.tsx` | Cards de diferencial e cards de solução |

### Seções inline em `page.tsx`

Nenhuma seção tem sua própria abstração em `components/` — tudo fica inline, seguindo o padrão de `/ia/page.tsx` e `/servicos/page.tsx`.

#### Seção 1 — Hero
```tsx
<PageHero
  eyebrow="Soluções"
  title="Do problema ao resultado. Sem atalhos."
  text="Uma solução UNIDAX combina estratégia, dados, sistemas e IA para resolver um desafio específico de negócio — do diagnóstico ao deploy, com resultado mensurável."
/>
```

#### Seção 2 — Proposição de valor
```tsx
<section className="section solucoes-value">
  <div className="container">
    <Reveal>
      <div className="eyebrow">Por que é diferente</div>
      <h2>Uma solução, não uma ferramenta.</h2>
      <p className="content-intro">...</p>
    </Reveal>
    <div className="solucoes-differentials">
      {solutionsPage.differentials.map((d, i) => (
        <Reveal key={d.title} delay={i * 80}>
          <div className="solucoes-diff-card">
            <h3>{d.title}</h3>
            <p>{d.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

#### Seção 3 — Grid de soluções
```tsx
<section className="section solucoes-grid-section" id="solucoes">
  <div className="container">
    <SectionHead
      eyebrow="Portfólio"
      title="Soluções para desafios reais de negócio."
      text="Cada solução combina tecnologia, dados e experiência setorial para entregar resultado mensurável."
    />
    <div className="solucoes-grid">
      {solutionsPage.solutions.map((s, i) => (
        <Reveal key={s.slug} delay={i * 60}>
          <article className="solucoes-card">
            <h3>{s.title}</h3>
            <p className="solucoes-card-tagline">{s.tagline}</p>
            <p>{s.description}</p>
            <ul className="solucoes-capabilities">
              {s.capabilities.map((c) => <li key={c}>{c}</li>)}
            </ul>
            <Link
              className="btn btn-outline solucoes-card-cta"
              href={s.href}
              aria-label={`Falar sobre ${s.title}`}
            >
              Falar sobre essa solução <ArrowIcon />
            </Link>
          </article>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

**Nota sobre `btn-outline` em contexto claro:** a seção tem fundo escuro (`--ink`), portanto `btn-outline` (borda e texto branco semitransparente) funciona diretamente. O fundo da seção de soluções será `var(--ink)` conforme o design system dark.

#### Seção 4 — Metodologia (Methodology_Stepper)
```tsx
<section className="section solucoes-method">
  <div className="container">
    <Reveal>
      <div className="eyebrow">Como implementamos</div>
      <h2>Do diagnóstico à escala, sem pular etapas.</h2>
    </Reveal>
    <div className="solucoes-stepper">
      {solutionsPage.methodology.map((step, i) => (
        <Reveal key={step.num} delay={i * 70}>
          <div className="solucoes-step">
            <div className="solucoes-step-num">{step.num}</div>
            <strong>{step.title}</strong>
            <p>{step.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

#### Seção 5 — Segmentos (`DarkPanel`)
```tsx
<DarkPanel
  eyebrow="Por segmento"
  title="Soluções aplicadas ao seu setor."
>
  <div className="solucoes-segments">
    {solutionsPage.segments.map((seg, i) => (
      <Reveal key={seg.title} delay={i * 60}>
        <div className="solucoes-segment">
          <h3>{seg.title}</h3>
          <ul>
            {seg.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </Reveal>
    ))}
  </div>
</DarkPanel>
```

#### Seção 6 — Cases (condicional)
```tsx
{cases.length > 0 && (
  <section className="section cases">
    <div className="container">
      <Reveal>
        <div className="eyebrow">Casos reais</div>
        <h2>Clientes que transformaram o negócio.</h2>
      </Reveal>
      <div className="case-grid" style={{ marginTop: 40 }}>
        {cases.slice(0, 3).map((c, i) => (
          <Reveal key={c.slug} delay={i * 70}>
            <article className="case">
              <div className="case-art">
                <span className="case-brand">{c.client}</span>
              </div>
              <div className="case-body">
                <div className="tag">{c.category}</div>
                <strong>{c.title}</strong>
                <p>{c.summary}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)}
```

#### Seção 7 — CTA final
```tsx
<CtaSection
  title="Qual desafio a sua operação enfrenta hoje?"
  text="Vamos mapear as soluções certas para o seu contexto — sem template e sem promessa vaga."
  label="Iniciar uma conversa"
/>
```

---

## Data Models

### Tipo `FullSolution` (novo em `lib/content.ts`)

```typescript
export type FullSolution = {
  slug: string;          // identificador kebab-case único
  title: string;         // nome da solução (h3)
  tagline: string;       // frase curta de posicionamento
  description: string;   // descrição de 2-3 linhas
  capabilities: string[]; // lista de capacidades (mín. 3 itens)
  href: string;          // sempre "/contato" nesta fase
};
```

### Constante `solutionsPage` (nova em `lib/content.ts`)

```typescript
export const solutionsPage = {
  solutions: [
    {
      slug: "ia-erp",
      title: "IA + ERP",
      tagline: "Decisão inteligente no coração da operação",
      description: "Integra IA ao Dynamics 365 para automação, previsão de demanda e apoio à decisão em tempo real. Reduz ciclos de aprovação, antecipa rupturas e conecta inteligência ao fluxo operacional.",
      capabilities: ["Integração IA-ERP", "Previsão de demanda", "Automação de aprovações", "Relatórios inteligentes", "Alertas preditivos"],
      href: "/contato",
    },
    {
      slug: "agentes-atendimento",
      title: "Agentes para Atendimento",
      tagline: "Atendimento que aprende, escalona e resolve",
      description: "Agentes conectados à base de conhecimento e sistemas para triagem e resolução autônoma. Reduz volume humano nos casos de baixa complexidade sem perder a qualidade.",
      capabilities: ["Agentes de triagem", "Base de conhecimento RAG", "Integração com CRM", "Escalada inteligente", "Relatórios de atendimento"],
      href: "/contato",
    },
    {
      slug: "dados-ia",
      title: "Dados + IA",
      tagline: "Da informação dispersa à inteligência acionável",
      description: "Camada analítica + IA para transformar dados operacionais em alertas e recomendações. Une governança de dados com modelos que geram insights no momento certo.",
      capabilities: ["Data lakehouse", "Modelos preditivos", "Dashboards IA-driven", "Alertas automáticos", "Governança de dados"],
      href: "/contato",
    },
    {
      slug: "automacao-processos",
      title: "Automação Inteligente",
      tagline: "Liberte sua equipe do trabalho repetitivo",
      description: "Power Platform + IA para eliminar gargalos manuais e automatizar fluxos. Extrai dados de documentos, valida regras de negócio e integra sistemas sem intervenção humana.",
      capabilities: ["Power Automate + IA", "Extração de documentos", "Aprovações automáticas", "Integração de sistemas", "Monitoramento de fluxos"],
      href: "/contato",
    },
    {
      slug: "transformacao-digital",
      title: "Transformação Digital",
      tagline: "Modernize a operação sem parar o negócio",
      description: "Projetos que conectam sistemas, dados e pessoas com estratégia e execução integradas. Da arquitetura à adoção, com gestão de mudança e sustentação contínua.",
      capabilities: ["Arquitetura de sistemas", "Migração de dados", "Integração via API", "Gestão de mudança", "Sustentação contínua"],
      href: "/contato",
    },
    {
      slug: "ia-produtividade",
      title: "IA para Produtividade",
      tagline: "Sua equipe com superpoderes de IA",
      description: "Copilot, busca semântica interna e assistentes por função para acelerar trabalho de conhecimento. Reduz tempo em tarefas repetitivas e eleva a qualidade das entregas.",
      capabilities: ["Microsoft Copilot", "Busca semântica interna", "Resumo de documentos", "Assistentes por função", "Treinamento e adoção"],
      href: "/contato",
    },
  ] as FullSolution[],

  differentials: [
    { title: "Orientada a resultado", text: "Cada solução parte de um problema de negócio definido e tem métricas de sucesso acordadas antes do início." },
    { title: "Integrada ao negócio", text: "Conectamos estratégia, dados, sistemas e pessoas — sem tratar IA como camada separada da operação." },
    { title: "Preparada para escalar", text: "Arquiteturas pensadas para evoluir: do piloto à operação plena, sem refazer do zero." },
  ],

  methodology: [
    { num: "01", title: "Diagnóstico", text: "Mapeamos o problema, os dados disponíveis e as restrições antes de propor qualquer tecnologia." },
    { num: "02", title: "Desenho da solução", text: "Definimos arquitetura, integrações, critérios de sucesso e o plano de implementação." },
    { num: "03", title: "Piloto", text: "Validamos o valor em escala controlada antes de comprometer investimento e equipe." },
    { num: "04", title: "Escala", text: "Expandimos com governança, monitoramento contínuo e plano de evolução acordado." },
  ],

  segments: [
    {
      title: "Educação",
      bullets: ["Agentes para suporte a alunos e coordenação acadêmica", "Automação de processos administrativos e rematrícula"],
    },
    {
      title: "Saúde",
      bullets: ["Triagem inteligente e assistência a prontuários", "Analytics preditivo para gestão de leitos e recursos"],
    },
    {
      title: "Varejo e Distribuição",
      bullets: ["Previsão de demanda e reposição automática", "Automação de atendimento e fidelização com IA"],
    },
    {
      title: "Serviços Financeiros",
      bullets: ["Análise de crédito e detecção de anomalias com IA", "Automação de compliance e processamento de documentos"],
    },
    {
      title: "Indústria",
      bullets: ["Manutenção preditiva e qualidade assistida por IA", "Integração ERP + chão de fábrica com agentes inteligentes"],
    },
  ],
};
```

### Tipo `Case` (existente, sem alteração)

Reutilizado diretamente de `lib/content.ts` via `getCasesCMS()` que já retorna `Case[]`.

---

## CSS Architecture (`app/globals.css` additions)

Todas as classes seguem o prefixo `solucoes-` para escopo. São adicionadas ao final do arquivo, sem tocar em nenhuma regra existente.

### Classes a adicionar

```css
/* ═══════════════════════════════════════════════
   Página /solucoes
═══════════════════════════════════════════════ */

/* Seção de proposição de valor */
.solucoes-value { background: var(--soft); }
.solucoes-differentials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 40px;
}
.solucoes-diff-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 28px;
  position: relative;
}
.solucoes-diff-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-radius: 16px 16px 0 0;
  background: linear-gradient(90deg, var(--red), var(--gold));
}
.solucoes-diff-card h3 { font-size: 18px; color: #fff; }
.solucoes-diff-card p  { font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 0; }

/* Grid de soluções — fundo escuro */
.solucoes-grid-section { background: var(--ink); color: #fff; }
.solucoes-grid-section .eyebrow { color: #ff7890; }
.solucoes-grid-section h2 { color: #fff; }
.solucoes-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 40px;
}
.solucoes-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: .25s;
  position: relative;
  overflow: hidden;
}
.solucoes-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--red), var(--gold));
}
.solucoes-card:hover {
  border-color: rgba(255, 255, 255, 0.16);
  transform: translateY(-4px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, .4);
}
.solucoes-card h3  { font-size: 20px; color: #fff; }
.solucoes-card-tagline {
  font-size: 12px;
  font-weight: 800;
  color: var(--gold);
  text-transform: uppercase;
  letter-spacing: .08em;
  margin: 0;
}
.solucoes-card > p:not(.solucoes-card-tagline) {
  font-size: 13px;
  color: rgba(255, 255, 255, .6);
  line-height: 1.65;
  flex: 1;
  margin: 0;
}
.solucoes-capabilities {
  list-style: none;
  padding: 0;
  margin: 4px 0 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.solucoes-capabilities li {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: .06em;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(220, 39, 71, .12);
  color: rgba(255, 255, 255, .75);
  border: 1px solid rgba(220, 39, 71, .2);
}
.solucoes-card-cta { margin-top: auto; align-self: flex-start; }

/* Seção de metodologia */
.solucoes-method { background: var(--soft); }
.solucoes-stepper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: 44px;
  position: relative;
}
.solucoes-stepper::before {
  content: "";
  position: absolute;
  left: 0; right: 0;
  top: 24px;
  height: 1px;
  background: var(--line);
  z-index: 0;
}
.solucoes-step {
  position: relative;
  z-index: 1;
  padding: 0 20px 0 0;
  display: flex;
  flex-direction: column;
}
.solucoes-step-num {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: #fff;
  display: grid;
  place-items: center;
  font-size: 11px;
  font-weight: 800;
  color: var(--red);
  letter-spacing: .1em;
  margin-bottom: 20px;
}
.solucoes-step strong { font-size: 16px; display: block; margin-bottom: 8px; }
.solucoes-step p      { font-size: 12px; color: var(--muted); margin: 0; max-width: 200px; }

/* Seção de segmentos (dentro de DarkPanel) */
.solucoes-segments {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-top: 36px;
}
.solucoes-segment h3 {
  font-size: 14px;
  color: var(--gold);
  margin-bottom: 12px;
}
.solucoes-segment ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.solucoes-segment ul li {
  font-size: 12px;
  color: rgba(255, 255, 255, .65);
  padding-left: 14px;
  position: relative;
  line-height: 1.55;
}
.solucoes-segment ul li::before {
  content: "—";
  position: absolute;
  left: 0;
  color: var(--red);
  font-size: 10px;
  top: 1px;
}

/* ── Responsividade solucoes-* ── */

/* Tablet (≤ 1020px) */
@media (max-width: 1020px) {
  .solucoes-differentials { grid-template-columns: repeat(2, 1fr); }
  .solucoes-grid           { grid-template-columns: repeat(2, 1fr); }
  .solucoes-stepper        { grid-template-columns: repeat(2, 1fr); gap: 24px; }
  .solucoes-stepper::before{ display: none; }
  .solucoes-segments       { grid-template-columns: repeat(2, 1fr); gap: 20px; }
}

/* Mobile (≤ 700px) */
@media (max-width: 700px) {
  .solucoes-differentials  { grid-template-columns: 1fr; gap: 12px; margin-top: 28px; }
  .solucoes-grid           { grid-template-columns: 1fr; gap: 12px; }
  .solucoes-card           { padding: 20px; }
  .solucoes-stepper        { grid-template-columns: 1fr; gap: 20px; margin-top: 32px; }
  .solucoes-step           { display: grid; grid-template-columns: 50px 1fr; column-gap: 14px; }
  .solucoes-step-num       { margin-bottom: 0; align-self: start; }
  .solucoes-step strong    { margin-top: 10px; }
  .solucoes-step p         { grid-column: 2; max-width: 100%; }
  .solucoes-segments       { grid-template-columns: 1fr; gap: 16px; }
}
```

### Justificativa das classes

- `solucoes-differentials`: 3 colunas em desktop, 2 em tablet, 1 em mobile — mesmo padrão de `ia-frontier-grid`
- `solucoes-grid`: 2 colunas em desktop e tablet (≥700px), 1 coluna em mobile — requisito 4.4/4.5/4.6
- `solucoes-stepper`: horizontal em desktop (4 colunas), colapsa para grid 2×2 em tablet e 1 coluna com layout grid no mobile (padrão do `.step` existente)
- `solucoes-segments`: 5 colunas em desktop, 2 em tablet, 1 em mobile

---

## Error Handling

### `getCasesCMS()` retorna array vazio

Situação normal em desenvolvimento (Sanity não configurado) ou quando não há cases publicados. A seção de cases é renderizada condicionalmente com `{cases.length > 0 && (...)}` — nenhuma seção vazia ou placeholder é exibida ao usuário. Requisito 7.3.

### Fallback do CMS

`getCasesCMS()` já implementa fallback completo para `lib/content.ts` em `lib/cms.ts`. Os cases locais têm `status: "draft"`, portanto o fallback retorna `[]` — o que activa o comportamento de "seção omitida". Nenhum tratamento adicional é necessário em `page.tsx`.

### Build TypeScript

Todos os tipos são explícitos. `FullSolution[]` é declarado no array `solutions` via cast `as FullSolution[]`. O tipo `Case` vem de `lib/content.ts` via re-export implícito do `getCasesCMS()`. Nenhum `any` ou `ts-ignore` é introduzido.

### Semântica HTML e acessibilidade

- Um único `<h1>` dentro de `PageHero` (componente existente)
- Todas as seções usam `<h2>` para títulos principais
- Cards de solução usam `<h3>` internamente
- `aria-label` nos CTAs de cada `SolutionCard` identificam a solução específica
- Imagens: nenhuma imagem nova é adicionada; o hero usa o fundo existente via CSS do `PageHero`

---

## Testing Strategy

PBT não se aplica a esta feature. A página `/solucoes` é uma composição de Server Components que renderiza dados estáticos e CMS em HTML — não há lógica de transformação, parsing ou algoritmo com espaço de entrada variável que justifique testes de propriedade.

### Estratégia de testes

**Verificação pré-deploy (obrigatória, via CLI):**

```bash
npm run typecheck    # valida TypeScript strict em toda a base
npm run lint         # ESLint em app/, components/, lib/
npm run check:routes # valida consistência de rotas e slugs
npm run build        # confirma que a rota /solucoes compila sem erro
```

**Testes unitários (exemplo-based, opcionais nesta fase):**

A lógica de negócio testável é mínima. O único ponto de lógica é `cases.slice(0, 3)` e a renderização condicional. Exemplos a cobrir se um framework de testes for adicionado:

| Cenário | Comportamento esperado |
|---|---|
| `getCasesCMS()` retorna `[]` | Seção de cases não renderizada no HTML |
| `getCasesCMS()` retorna 2 cases | 2 cards renderizados |
| `getCasesCMS()` retorna 5 cases | Exatamente 3 cards renderizados |
| `solutionsPage.solutions` contém 6 itens | 6 `solucoes-card` no DOM |
| `solutionsPage.differentials` contém 3 itens | 3 `.solucoes-diff-card` no DOM |
| `solutionsPage.methodology` contém 4 itens | 4 `.solucoes-step` no DOM |
| `solutionsPage.segments` contém 5 itens | 5 `.solucoes-segment` no DOM |

**Verificação manual de acessibilidade:**
- Validar com axe DevTools ou Lighthouse que não há erros de contraste nos novos seletores `solucoes-*`
- Confirmar que `Tab` percorre os CTAs dos cards em ordem lógica
- Confirmar que `prefers-reduced-motion: reduce` desabilita as animações (comportamento já garantido pelo `Reveal` existente)
