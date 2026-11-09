# Design Document

## Overview

O enriquecimento da página `/empresa` adiciona e reestrutura seções em `app/empresa/page.tsx`, incorporando três ajustes visuais que alinham a página ao padrão visual da `/ia`: (1) stats com `.ia-impact-bar` substituindo `StatsBlock`, (2) "Posicionamento" e "Nossa história" fundidos em layout 2 colunas com `.authority-grid`, e (3) valores institucionais em cards `.problem` + `.iconbox` com ícones SVG. A implementação ocorre em dois arquivos: `app/empresa/page.tsx` e `app/globals.css`. Não há novos componentes, dependências externas, chamadas de rede ou lógica de transformação de dados.

## Architecture

A página permanece um Server Component puro — sem `"use client"`. O fluxo é estático:

```
app/empresa/page.tsx (Server Component)
  ├── PageHero                              [existente, inalterado]
  ├── section.section.authority             [NOVO — 2 colunas: Posicionamento + História]
  ├── section.section-sm.ia-impact-bar      [NOVO — substitui StatsBlock, padrão /ia]
  ├── section.section — Visão & Missão      [NOVO — .vmv-grid 2 cards]
  ├── section.section — Valores             [NOVO — .values-grid + cards .problem/.iconbox]
  ├── DarkPanel "Como pensamos"             [existente, inalterado]
  ├── section.section — Equipe             [NOVO — .content-intro + link]
  └── CtaSection                            [existente, inalterado]
```

Todos os imports via `@/` alias. Nenhum componente novo — o conteúdo de cada seção é declarado inline no `page.tsx`. O `Reveal` é Client Component e envolve blocos server-rendered normalmente.

## Components and Interfaces

### Componentes reutilizados (sem alteração)

| Componente | Uso nas novas seções |
|---|---|
| `Reveal` | Wrapper de scroll animation em cada nova seção |
| `DarkPanel` | Mantido; inalterado |
| `CtaSection` | Mantido; inalterado |
| `PageHero` | Mantido; inalterado |
| `ArrowIcon` | CTA da seção Equipe |
| `SparkIcon`, `TargetIcon`, `LayersIcon`, `UsersIcon`, `ShieldIcon`, `GaugeIcon`, `DatabaseIcon`, `BotIcon` | Ícones dos cards de valores |

### Ajuste 1 — Stats com `.ia-impact-bar` (substitui `StatsBlock`)

A seção `<section className="section services">` com `<StatsBlock borderless />` é substituída pelo padrão visual da `/ia`. Os dados são declarados inline na página:

```tsx
const impactStats = [
  { value: "+100",  label: "clientes atendidos pela UNIDAX" },
  { value: "+300",  label: "projetos realizados" },
  { value: "+280K", label: "horas de experiência acumulada em projetos" },
  { value: "+35",   label: "anos de experiência" },
] as const;
```

JSX:
```tsx
<section className="section-sm ia-impact-bar">
  <div className="container">
    <div className="ia-impact-grid">
      {impactStats.map((s) => (
        <Reveal key={s.value}>
          <div className="ia-impact-item">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

Classes `.ia-impact-bar`, `.ia-impact-grid`, `.ia-impact-item` **já existem** em `globals.css` — nenhum CSS novo necessário.

### Ajuste 2 — Posicionamento + História em layout 2 colunas

As duas seções consecutivas de fundo branco com `.content-intro` são fundidas em um único bloco usando `.authority-grid` (já existente). A classe `.authority` adiciona `border-bottom` e o pseudo-elemento decorativo dourado no canto superior esquerdo.

JSX:
```tsx
<section className="section authority">
  <div className="container">
    <div className="authority-grid">
      {/* Coluna esquerda — Posicionamento */}
      <Reveal>
        <div className="eyebrow">Posicionamento</div>
        <h2>IA sem perder o que já funciona.</h2>
        <p>O avanço da inteligência artificial não elimina a importância dos sistemas, dados, processos e pessoas que sustentam uma empresa. Nossa proposta é conectar esses mundos: preservar o conhecimento acumulado e acelerar a próxima etapa de transformação.</p>
      </Reveal>
      {/* Coluna direita — Nossa história */}
      <Reveal delay={100}>
        <div className="historia-card">
          <div className="eyebrow">Nossa história</div>
          <p>A UNIDAX nasceu há mais de 35 anos com foco em tecnologia para empresas. Ao longo desse tempo, acumulamos profundo conhecimento em Microsoft Dynamics e ERPs corporativos, entregando projetos em todo o Brasil e em mercados internacionais. Não somos uma empresa de tendências: somos especialistas em transformar operações reais em sistemas que funcionam — e que continuam funcionando.</p>
        </div>
      </Reveal>
    </div>
  </div>
</section>
```

Classes `.authority` e `.authority-grid` **já existem**. CSS novo mínimo necessário:

```css
.historia-card { background: var(--soft); border-radius: 16px; padding: 32px; border-left: 3px solid var(--gold) }
.historia-card p { font-size: 14px; line-height: 1.72 }
```

### Ajuste 3 — Valores em cards `.problem` + `.iconbox`

Os valores saem do `.bullet-list` e passam para cards com ícones, replicando o padrão dos "casos de uso" da `/ia`. Grid de 2 colunas para os 8 itens.

Dados inline na página:

```tsx
const valores = [
  { icon: <SparkIcon />,    label: "Inovação",           descricao: "Exploramos tecnologias emergentes quando elas resolvem problemas reais — não para acompanhar tendências." },
  { icon: <TargetIcon />,   label: "Excelência",         descricao: "Entregamos o que prometemos, com qualidade técnica verificável e atenção ao detalhe que sustenta operações críticas." },
  { icon: <LayersIcon />,   label: "Transparência",      descricao: "Comunicamos riscos, limitações e progresso sem filtro — porque decisões boas dependem de informação honesta." },
  { icon: <UsersIcon />,    label: "Colaboração",        descricao: "Trabalhamos junto ao cliente, não apenas para ele. O conhecimento do negócio está no cliente; a expertise técnica está conosco." },
  { icon: <ShieldIcon />,   label: "Confiança",          descricao: "Construída projeto a projeto, pela consistência entre o que dizemos e o que entregamos." },
  { icon: <GaugeIcon />,    label: "Simples e Funcional",descricao: "Preferimos a solução mais simples que resolve o problema. Complexidade desnecessária cria custo e fragilidade." },
  { icon: <DatabaseIcon />, label: "Sustentabilidade",   descricao: "Desenvolvemos sistemas pensados para durar — com arquitetura, documentação e manutenibilidade desde o início." },
  { icon: <BotIcon />,      label: "Acreditamos. Sempre!", descricao: "Acreditamos no potencial de cada cliente e de cada projeto. Essa postura define como enfrentamos os desafios difíceis." },
] as const;
```

JSX:
```tsx
<section className="section">
  <div className="container">
    <Reveal>
      <div className="eyebrow">Nossos valores</div>
      <h2>O que guia cada decisão.</h2>
    </Reveal>
    <div className="values-grid" style={{ marginTop: 40 }}>
      {valores.map((v, i) => (
        <Reveal key={v.label} delay={i * 60}>
          <div className="problem">
            <div className="iconbox">{v.icon}</div>
            <b>{v.label}</b>
            <p>{v.descricao}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </div>
</section>
```

Classes `.problem`, `.iconbox`, `.problem-grid` **já existem**. CSS novo mínimo necessário:

```css
.values-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px }
@media(max-width:700px) { .values-grid { grid-template-columns: 1fr } }
```

### Seção Visão & Missão (mantida do design anterior)

```tsx
<section className="section">
  <div className="container">
    <Reveal>
      <div className="vmv-grid">
        <div className="vmv-card">
          <div className="eyebrow">Visão</div>
          <h3>Ser referência em tecnologia aplicada ao negócio.</h3>
          <p>Queremos ser reconhecidos por transformar tecnologia em resultado concreto — não por seguir modismos, mas por entregar soluções que as empresas usam de verdade, por anos.</p>
        </div>
        <div className="vmv-card">
          <div className="eyebrow">Missão</div>
          <h3>Conectar tecnologia e operação com precisão.</h3>
          <p>Desenvolvemos e implantamos soluções de tecnologia que se encaixam na realidade de cada empresa — respeitando processos, dados e pessoas existentes para acelerar a próxima etapa.</p>
        </div>
      </div>
    </Reveal>
  </div>
</section>
```

Classes `.vmv-grid` e `.vmv-card` **já existem** em `globals.css`.

### Seção Equipe (mantida do design anterior)

```tsx
<section className="section">
  <div className="container content-intro">
    <Reveal>
      <div className="eyebrow">Nossa equipe</div>
      <h2>Especialistas comprometidos com o seu resultado.</h2>
      <p>Nossa equipe reúne consultores, desenvolvedores e especialistas em dados com experiência real em projetos corporativos. Cada projeto é conduzido por profissionais que conhecem a fundo as tecnologias que recomendam — e que permanecem acessíveis ao longo de toda a entrega.</p>
      <Link className="link" href="/contato">Fale com a equipe <ArrowIcon /></Link>
    </Reveal>
  </div>
</section>
```

Usa `.content-intro`, `.link` e `ArrowIcon` já existentes. Nenhum CSS novo.

## Data Models

Nenhum modelo de dados novo. Todo o conteúdo é texto estático declarado diretamente no JSX do `page.tsx` — não há consultas a `lib/cms.ts` nem `lib/content.ts` para as novas seções.

Estruturas de dados implícitas (usadas inline):

```ts
// Stats da barra de impacto
type ImpactStat = { value: string; label: string }

// Valores institucionais
type Valor = { icon: React.ReactNode; label: string; descricao: string }

// Visão & Missão
type VMVBloco = { eyebrow: string; titulo: string; texto: string }
```

## CSS Total Novo Necessário

Apenas dois blocos precisam ser adicionados ao `app/globals.css`:

```css
/* Empresa — história card (ajuste 2) */
.historia-card { background: var(--soft); border-radius: 16px; padding: 32px; border-left: 3px solid var(--gold) }
.historia-card p { font-size: 14px; line-height: 1.72 }

/* Empresa — valores grid (ajuste 3) */
.values-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 14px }
@media(max-width:700px) { .values-grid { grid-template-columns: 1fr } }
```

Classes que **NÃO precisam ser criadas** (já existem):

| Classe | Origem |
|---|---|
| `.ia-impact-bar`, `.ia-impact-grid`, `.ia-impact-item` | globals.css — IA page v4.5 |
| `.authority`, `.authority-grid` | globals.css — Shared sections |
| `.vmv-grid`, `.vmv-card` | globals.css — adicionado em v4 |
| `.problem`, `.iconbox`, `.problem-grid` | globals.css — problema-grid block |
| `.content-intro`, `.link` | globals.css — page hero / internal |

## Error Handling

Como a página é um Server Component estático sem chamadas externas nem lógica condicional nas novas seções, as superfícies de erro são mínimas:

| Cenário | Tratamento |
|---|---|
| Build com erro de TypeScript | Prevenido por tipagem estrita; `npm run typecheck` valida antes do deploy |
| Import incorreto de componente | Prevenido pelo path alias `@/` e checagem de tipos |
| CSS faltando classe | Somente `.historia-card` e `.values-grid` são novas — as demais reutilizadas já existem |
| Ícone SVG inválido | TypeScript previne; todos os ícones usados existem em `components/icons.tsx` |
| Componente `Reveal` sem children | TypeScript previne; `Reveal` aceita `React.ReactNode` obrigatório |

Não há tratamento de erro em runtime nas novas seções porque não há I/O, fetch, ou estado dinâmico.

## Testing Strategy

Por se tratar de uma feature de renderização de UI estática, a estratégia de testes é baseada em verificação de build, inspeção visual e testes de snapshot.

**Property-based testing não se aplica** — as novas seções são Server Components com conteúdo estático. Não há espaço de entrada variável sobre o qual propriedades universais possam ser formuladas.

### Verificação pré-deploy (obrigatória)

```bash
npm run typecheck    # Sem erros de TypeScript
npm run lint         # Sem erros de ESLint
npm run build        # Build de produção sem erros
```

### Checklist de integridade

- `app/empresa/page.tsx` não contém `"use client"`
- Todos os imports usam o alias `@/`
- `StatsBlock` foi removido dos imports e do JSX
- Todos os ícones importados existem em `components/icons.tsx`
- Ordem das seções: PageHero → Posicionamento+História (2 colunas) → Stats bar → VMV → Valores → DarkPanel → Equipe → CtaSection

### Testes de responsividade (inspeção visual)

| Viewport | Comportamento esperado |
|---|---|
| ≤ 700px | `.authority-grid` colapsa para 1 coluna (via media query existente em ≤ 1020px) |
| ≤ 700px | `.ia-impact-grid` exibe 2 itens por linha (via media query existente) |
| ≤ 700px | `.vmv-grid` colapsa para 1 coluna (via media query existente) |
| ≤ 700px | `.values-grid` colapsa para 1 coluna (nova media query) |
| Qualquer | Sem overflow horizontal |

### Testes de acessibilidade

- Estrutura de headings lógica: `h1` no PageHero, `h2` em cada seção nova, `h3` nos cards VMV
- Links com texto descritivo (`Fale com a equipe`)
- Ícones SVG nos cards de valores são decorativos — não precisam de `aria-label`
- Contraste adequado usando variáveis CSS existentes (`--red`, `--gold`, `--muted`, `--soft`)
