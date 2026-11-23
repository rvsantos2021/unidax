# Requirements Document

## Introduction

A página `/solucoes` do site da UNIDAX deve ser uma vitrine completa das soluções orientadas a resultado de negócio que a empresa oferece — combinando IA com tecnologia empresarial. A página substitui a versão atual (extremamente rasa, com apenas Dynamics AX e Power Platform) por uma experiência visual moderna, coerente com o design system do novo site (dark theme, glassmorphism sutil, gradientes vermelho/gold, animações com `Reveal`).

O objetivo de negócio é a **geração de leads**: cada seção deve conduzir o visitante a uma conversão em `/contato`. A página é implementada como Server Component, com dados estáticos em `lib/content.ts` e cases via `getCasesCMS()`.

## Glossary

- **Solucoes_Page**: O Server Component em `app/solucoes/page.tsx` que compõe a rota `/solucoes`.
- **SolutionCard**: Componente visual (inline na página ou em `components/`) que exibe uma solução completa com nome, tagline, descrição, lista de capacidades e CTA.
- **Methodology_Stepper**: Bloco visual de 4 passos sequenciais (Diagnóstico → Desenho → Piloto → Escala) renderizado como Server Component.
- **Segment_Panel**: Bloco dark que lista segmentos de mercado com bullets de aplicação, usando o componente `DarkPanel` existente.
- **solutionsPage**: Constante TypeScript adicionada em `lib/content.ts` que armazena os dados estáticos da página (soluções, diferenciais, metodologia, segmentos).
- **Reveal**: Componente client existente em `components/reveal.tsx` que aplica animação de scroll-reveal com suporte a `prefers-reduced-motion`.
- **CMS**: Camada de dados em `lib/cms.ts` (server-only); expõe `getCasesCMS()` para busca de cases publicados com fallback automático para `lib/content.ts`.

---

## Requirements

### Requirement 1: Rota e estrutura da página

**User Story:** Como visitante do site, quero acessar `/solucoes` e ver uma página completa e coerente, para que eu compreenda rapidamente o portfólio de soluções da UNIDAX.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL ser implementada em `app/solucoes/page.tsx` como um `async` Server Component (sem `"use client"`).
2. THE Solucoes_Page SHALL exportar um objeto `metadata` com `title` e `description` em pt-BR compatíveis com Next.js 15 Metadata API.
3. THE Solucoes_Page SHALL importar dados exclusivamente de `@/lib/content` e `@/lib/cms`, nunca diretamente do SDK do Sanity.
4. THE Solucoes_Page SHALL compor todas as seções dentro de um elemento `<main>` único.
5. IF a construção (build) da página produzir erros de TypeScript strict (`strict: true`, sem `any`, sem `ts-ignore`), THEN THE Solucoes_Page SHALL ser corrigida antes do deploy.

---

### Requirement 2: Seção Hero

**User Story:** Como visitante, quero ver um hero impactante ao chegar na página, para que eu entenda imediatamente a proposta de valor das soluções.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL renderizar o componente `PageHero` existente como primeira seção visível.
2. THE PageHero SHALL receber `eyebrow="Soluções"`, um `title` em pt-BR que posicione soluções como caminho do problema ao resultado, e um `text` que explique a combinação de IA com tecnologia empresarial.
3. THE PageHero SHALL incluir o CTA padrão do componente apontando para `/contato`.

---

### Requirement 3: Seção de proposição de valor

**User Story:** Como visitante, quero ver de forma clara o diferencial das soluções UNIDAX, para que eu entenda por que são diferentes de ferramentas pontuais.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL renderizar uma seção de proposição de valor imediatamente após o Hero.
2. THE Solucoes_Page SHALL exibir um parágrafo de posicionamento em pt-BR afirmando que uma solução UNIDAX combina estratégia, dados, sistemas e IA para resolver um problema específico de negócio.
3. THE Solucoes_Page SHALL exibir exatamente 3 cards de diferencial com os títulos "Orientada a resultado", "Integrada ao negócio" e "Preparada para escalar", cada um com uma descrição curta em pt-BR.
4. WHEN a seção de proposição de valor estiver visível no viewport, THE Reveal SHALL animar cada card de diferencial com `delay` incremental entre os itens.

---

### Requirement 4: Seção de soluções (grid principal)

**User Story:** Como visitante, quero explorar as soluções disponíveis com clareza sobre o que cada uma resolve, para que eu identifique qual se aplica ao meu contexto.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL renderizar exatamente 6 `SolutionCard`s com os seguintes slugs (em ordem): `ia-erp`, `agentes-atendimento`, `dados-ia`, `automacao-processos`, `transformacao-digital`, `ia-produtividade`.
2. EACH SolutionCard SHALL exibir: nome da solução, tagline curta, descrição de 2-3 linhas, lista de capacidades envolvidas (mínimo 3 itens) e um botão ou link CTA em pt-BR apontando para `/contato`.
3. THE solutionsPage SHALL conter os dados das 6 soluções como constante tipada em `lib/content.ts`, seguindo o tipo `Solution` já existente ou um novo tipo `FullSolution` com os campos: `slug`, `title`, `tagline`, `description`, `capabilities` (array de strings) e `href`.
4. WHEN viewport for ≥ 1020px, THE SolutionCard grid SHALL exibir 2 colunas.
5. WHEN viewport for ≥ 700px e < 1020px, THE SolutionCard grid SHALL exibir 2 colunas compactas.
6. WHEN viewport for < 700px, THE SolutionCard grid SHALL exibir 1 coluna.
7. EACH SolutionCard SHALL receber animação `Reveal` com `delay` incremental.
8. THE SolutionCard CTA link SHALL ter `aria-label` em pt-BR que identifique a solução específica (ex.: "Falar sobre IA + ERP").

---

### Requirement 5: Seção de metodologia

**User Story:** Como visitante, quero entender como a UNIDAX implementa as soluções passo a passo, para que eu tenha confiança no processo antes de entrar em contato.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL renderizar a seção `Methodology_Stepper` com exatamente 4 passos em ordem: "Diagnóstico", "Desenho da solução", "Piloto", "Escala".
2. EACH passo do `Methodology_Stepper` SHALL exibir: número sequencial (01–04), título do passo e descrição curta em pt-BR.
3. WHEN viewport for ≥ 700px, THE Methodology_Stepper SHALL exibir os passos em layout horizontal (stepper).
4. WHEN viewport for < 700px, THE Methodology_Stepper SHALL exibir os passos em layout vertical empilhado.
5. THE Methodology_Stepper SHALL ser renderizado como Server Component (sem estado ou efeito de browser).

---

### Requirement 6: Seção por segmento de mercado

**User Story:** Como visitante de um setor específico, quero ver exemplos de como as soluções se aplicam ao meu segmento, para que eu visualize o valor concreto para o meu negócio.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL renderizar o `Segment_Panel` usando o componente `DarkPanel` existente.
2. THE Segment_Panel SHALL exibir exatamente 5 segmentos: "Educação", "Saúde", "Varejo e Distribuição", "Serviços Financeiros" e "Indústria".
3. EACH segmento SHALL exibir 1-2 bullets em pt-BR descrevendo aplicações concretas das soluções UNIDAX no contexto daquele setor.
4. THE Segment_Panel SHALL ser renderizado com `eyebrow` e `title` em pt-BR.
5. WHEN a seção estiver visível no viewport, THE Reveal SHALL animar cada item de segmento.

---

### Requirement 7: Seção de cases (condicional)

**User Story:** Como visitante, quero ver casos reais de clientes, para que eu tenha evidências concretas do resultado entregue pela UNIDAX.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL chamar `getCasesCMS()` no server para obter a lista de cases publicados.
2. WHEN `getCasesCMS()` retornar um ou mais cases, THE Solucoes_Page SHALL renderizar até 3 cards de case com: nome do cliente, título do case, categoria e resumo.
3. WHEN `getCasesCMS()` retornar array vazio, THE Solucoes_Page SHALL omitir completamente a seção de cases (sem seção vazia ou placeholder visível ao usuário).
4. THE cases cards SHALL ser renderizados como Server Components, sem estado client-side.
5. IF o array de cases contiver mais de 3 itens, THEN THE Solucoes_Page SHALL exibir apenas os 3 primeiros.

---

### Requirement 8: Seção CTA final

**User Story:** Como visitante que chegou ao fim da página, quero um convite claro para entrar em contato, para que eu saiba qual é o próximo passo.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL renderizar o componente `CtaSection` existente como última seção antes do `</main>`.
2. THE CtaSection SHALL receber `title` e `text` em pt-BR com mensagem voltada a soluções (não genérica de serviços).
3. THE CtaSection `href` SHALL apontar para `/contato`.
4. THE CtaSection `label` SHALL ser uma string em pt-BR diferente do padrão "Falar com um especialista" para diferenciar o contexto de soluções.

---

### Requirement 9: Dados estáticos em lib/content.ts

**User Story:** Como desenvolvedor, quero que todos os dados da página estejam centralizados em `lib/content.ts`, para que futuras atualizações de conteúdo sigam a convenção do projeto.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL consumir uma constante `solutionsPage` exportada de `@/lib/content`.
2. THE `solutionsPage` SHALL ser um objeto tipado com TypeScript strict contendo: array `solutions` (tipo `FullSolution[]`), array `differentials` (3 itens), array `methodology` (4 passos) e array `segments` (5 segmentos).
3. THE tipo `FullSolution` SHALL ser exportado de `lib/content.ts` com os campos: `slug: string`, `title: string`, `tagline: string`, `description: string`, `capabilities: string[]`, `href: string`.
4. THE `solutionsPage` constant SHALL conter strings exclusivamente em pt-BR.
5. WHEN o arquivo `lib/content.ts` for modificado para adicionar `solutionsPage`, THE modificação SHALL não alterar nenhuma exportação existente do arquivo (compatibilidade retroativa total).

---

### Requirement 10: CSS e design system

**User Story:** Como visitante, quero que a página `/solucoes` seja visualmente coerente com o restante do site, para que a experiência de navegação seja consistente.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL utilizar exclusivamente classes CSS definidas em `app/globals.css`; nenhum estilo inline SHALL ser usado exceto para valores dinâmicos (ex.: `delay` de animação como atributo de `style`).
2. WHEN novos seletores CSS forem necessários para a página, THE desenvolvedor SHALL adicioná-los em `app/globals.css` seguindo as convenções de nomenclatura existentes (kebab-case, prefixo de contexto como `solucoes-`).
3. THE SolutionCard SHALL aplicar glassmorphism sutil coerente com o design system existente (background semitransparente, `backdrop-filter`, borda leve).
4. THE paleta de cores dos elementos de destaque SHALL utilizar as custom properties existentes (`--color-primary` para vermelho e `--color-accent` para gold).
5. WHEN `prefers-reduced-motion: reduce` estiver ativo, THE Reveal SHALL desabilitar animações conforme implementação existente do componente.

---

### Requirement 11: Acessibilidade e SEO

**User Story:** Como usuário de tecnologia assistiva ou mecanismo de busca, quero que a página seja acessível e bem estruturada semanticamente, para que eu possa navegar e indexar o conteúdo corretamente.

#### Acceptance Criteria

1. THE Solucoes_Page SHALL ter exatamente um elemento `<h1>` (dentro do `PageHero`).
2. THE títulos das seções (soluções, metodologia, segmentos) SHALL usar `<h2>`; subtítulos dentro de cards SHALL usar `<h3>`.
3. EACH SolutionCard CTA SHALL ter `aria-label` em pt-BR identificando a ação e a solução específica.
4. THE metadata `title` e `description` exportados pela página SHALL ser únicos em relação a outras páginas do site e conter termos de busca relevantes em pt-BR.
5. THE Solucoes_Page SHALL não introduzir erros de acessibilidade detectáveis por ferramentas automatizadas (imagens sem `alt`, links sem texto acessível, contraste insuficiente em elementos adicionados).

---

### Requirement 12: Ausência de regressão

**User Story:** Como desenvolvedor, quero garantir que a adição da nova página não quebre nenhuma funcionalidade existente, para que o deploy seja seguro.

#### Acceptance Criteria

1. WHEN `npm run typecheck` for executado após a implementação, THE verificação SHALL concluir sem erros.
2. WHEN `npm run lint` for executado após a implementação, THE verificação SHALL concluir sem erros ou warnings novos.
3. WHEN `npm run check:routes` for executado após a implementação, THE verificação SHALL concluir com sucesso.
4. THE implementação de `app/solucoes/page.tsx` SHALL não modificar nenhum arquivo em `app/servicos/`, `app/ia/`, `app/cases/`, `app/insights/` ou qualquer outro diretório de página existente.
5. THE modificação em `lib/content.ts` SHALL não alterar o valor ou o tipo de nenhuma exportação existente (`site`, `stats`, `aiServices`, `methodology`, `ecosystem`, `enterpriseServices`, `clients`, `cases`, `insights`, `solutions`, `getPublishedInsights`, `getInsight`, `getCase`).
