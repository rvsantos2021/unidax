# Implementation Plan: Enriquecimento da Página de Desenvolvimento de IA

## Overview

O enriquecimento da landing page `/ia/desenvolvimento-de-sistemas-de-ia` envolve três arquivos: estender o tipo `LandingContent` com um campo opcional `capabilities` e enriquecer a entrada correspondente em `lib/seo-content.ts`; adicionar renderização condicional da seção de capacidades em `components/seo/landing-page.tsx`; e adicionar estilos CSS para `.capability-card` em `app/globals.css`. As 8 landing pages restantes permanecem inalteradas — o campo é opcional e a renderização é condicional.

## Tasks

- [x] 1. Estender a camada de dados com o tipo de capacidades e enriquecer o conteúdo da página de IA
  - [x] 1.1 Adicionar campo `capabilities?` ao tipo `LandingContent` e enriquecer a entrada `desenvolvimento-de-sistemas-de-ia` em `lib/seo-content.ts`
    - Adicionar o campo opcional `capabilities?: { title: string; text: string }[]` ao tipo `LandingContent` — o `?` garante compatibilidade retroativa com as 9 landing pages existentes (Req 7.7)
    - Enriquecer o campo `intro` da entrada `desenvolvimento-de-sistemas-de-ia` com o texto: "Transformamos ideias e necessidades de negócio em sistemas de IA que funcionam em produção. Da descoberta do caso de uso à arquitetura, do piloto à operação contínua, conectamos modelos, dados, agentes e sistemas existentes com critérios claros de qualidade, segurança e governança." (Req 1.1, 1.2)
    - Adicionar o array `capabilities` com 6 capacidades focadas em IA (cada uma com `title` e `text`), conforme definido na seção "Conteúdo enriquecido" do design: (1) Aplicações com IA integrada, (2) Portais de conhecimento inteligentes, (3) Arquitetura de sistemas de IA, (4) Integração de IA com sistemas corporativos, (5) Avaliação de qualidade e governança de IA, (6) Operação contínua de IA (MLOps) (Req 2.2, 2.3, 6.1, 6.2)
    - Expandir `deliverables` de 4 para 6 itens, mantendo os 4 existentes e adicionando: "Avaliação de qualidade, métricas e governança de IA" e "Operação contínua, monitoramento e evolução (MLOps)" (Req 4.1, 4.2)
    - Expandir `faqs` de 3 para 6 perguntas focadas em desenvolvimento de sistemas de IA. Manter as 3 existentes e adicionar 3 novas: "Quanto tempo leva para colocar um sistema de IA em produção?", "O que acontece depois que o sistema de IA entra em operação?", "A UNIDAX trabalha com modelos open source e proprietários?" — com respostas focadas em IA, não em software genérico (Req 5.1, 6.1)
    - Manter os `benefits` existentes sem alteração (Aderência ao negócio, Integração com sistemas, Pronta para evoluir) (Req 3.1, 3.2)
    - Manter os campos `slug`, `title`, `h1`, `eyebrow`, `description`, `cta`, `serviceType` sem alteração
    - _Requirements: 1.1, 1.2, 2.2, 2.3, 3.1, 3.2, 4.1, 4.2, 5.1, 6.1, 6.2, 7.6, 7.7_

- [x] 2. Adicionar renderização condicional da seção de capacidades ao componente LandingPage
  - [x] 2.1 Inserir bloco de renderização de capacidades entre a seção de benefícios e o DarkPanel em `components/seo/landing-page.tsx`
    - Adicionar o guard `item.capabilities && item.capabilities.length > 0` antes de renderizar a seção — quando `capabilities` está ausente ou vazio, a seção é omitida sem erros de renderização (Req 2.6)
    - Renderizar a nova seção após o bloco `section.services` (benefícios) e antes do `<DarkPanel>`, com a estrutura: `<section className="section">` contendo `<div className="container">`, um `<Reveal>` com `<div className="eyebrow">Capacidades de IA</div>`, `<h2>O que construímos em sistemas de IA.</h2>` e um parágrafo de introdução, seguido de `<div className="capability-grid detail-grid">` mapeando `item.capabilities` para `<article className="capability-card detail-card">` com `<span className="number">0{index + 1}</span>`, `<h3>{cap.title}</h3>` e `<p>{cap.text}</p>` (Req 2.1, 2.4)
    - Envolver cada card em `<Reveal key={cap.title} delay={index * 70}>` para animação de entrada, reutilizando o mesmo padrão das seções existentes (Req 2.4)
    - O `<h2>` e o parágrafo de introdução da seção são literais em pt-BR (não dados do modelo), pois a seção é específica de IA e só renderiza quando `capabilities` existe (Req 7.6)
    - Não adicionar diretiva `"use client"` — o componente permanece um Server Component puro (Req 7.4)
    - Não alterar a seção "Abordagem UNIDAX" existente (que contém o `item.intro`) — ela permanece como contêiner da introdução enriquecida (Req 1.3)
    - Não alterar `PageHero`, `CtaSection`, `FaqSection`, `DarkPanel` nem a seção de benefícios — apenas inserir a nova seção entre benefícios e DarkPanel (Req 7.1, 7.2, 5.2, 5.3)
    - _Requirements: 1.3, 2.1, 2.4, 2.6, 5.2, 5.3, 7.1, 7.2, 7.4, 7.6_

- [x] 3. Adicionar estilos CSS para a seção de capacidades
  - [x] 3.1 Adicionar a classe `.capability-card` a `app/globals.css`
    - Adicionar `.capability-card` estendendo `.detail-card` com um acento visual superior (borda ou gradiente no topo do card), distinguindo capacidades dos benefícios sem criar um padrão visual novo (Req 2.4)
    - Não criar arquivos CSS separados, módulos CSS ou CSS-in-JS — todo o CSS deve estar em `app/globals.css` (Req 7.5)
    - A responsividade mobile (coluna única em viewport ≤700px) é herdada do `.detail-grid` já existente, que colapsa para 1 coluna em `@media (max-width:700px)` — não adicionar regras de breakpoint adicionais para o grid (Req 2.5)
    - Usar as mesmas custom properties CSS já definidas em `:root` (ex.: `--red`, `--gold`, `--line`, `--radius`) (Req 2.4)
    - _Requirements: 2.4, 2.5, 7.5_

- [x] 4. Checkpoint — Verificar build, tipos, lint e rotas
  - Executar `npm run check:routes` e confirmar que não há regressão na consistência entre arquivos de página e catálogos de slug (Req 7.3)
  - Executar `npm run typecheck` e confirmar que `LandingContent` é compatível com todas as 9 landing pages (Req 7.7) e que não há uso de `any` ou `ts-ignore`
  - Executar `npm run lint` e confirmar que não há falhas de lint em `app/`, `components/`, `lib/` (Req 7.3)
  - Executar `npm run build` e confirmar que a compilação não tem erros de TypeScript e que as páginas estáticas são geradas (Req 7.3, 7.4)
  - Garantir que todas as verificações passem; perguntar ao usuário caso surjam dúvidas.

## Notes

- O campo `capabilities` é opcional (`?`) no tipo `LandingContent` — as 8 landing pages restantes (2 de IA + 6 de serviços) não precisam declará-lo e permanecem idênticas (Req 7.7)
- A seção de capacidades só renderiza quando `capabilities` existe e tem ao menos 1 item — o guard trata `undefined` e array vazio de forma idêntica (Req 2.6)
- Os `benefits`, `PageHero` (CTA → `/contato`), `CtaSection` final (→ `/contato?interesse=...`) e `FaqSection` (JSON-LD `FAQPage` + accordion `details`/`summary`) não são alterados — o caminho de conversão e a acessibilidade são preservados (Req 7.1, 7.2, 5.2, 5.3)
- O conteúdo enriquecido foca em aspectos específicos de IA — modelos, agentes, conhecimento, automação inteligente, governança de IA, MLOps — e não duplica as capacidades genéricas de software da página `/servicos/desenvolvimento-de-sistemas` (Req 6.1, 6.2)
- Todo o texto novo é em pt-BR (Req 7.6)
- O projeto não possui framework de testes (sem Jest/Vitest); a verificação usa os comandos de build/lint/typecheck/check:routes do projeto (Req 7.3)
- O design omite Correctness Properties (decisão D8) — não há property tests a escrever

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "3.1"] },
    { "id": 1, "tasks": ["2.1"] }
  ]
}
```
