# Implementation Plan: Enriquecimento da Página ERP e Microsoft Dynamics

## Overview

Três arquivos modificados, nenhum arquivo criado. A implementação segue a ordem natural de dependências: tipo de dados primeiro, depois conteúdo, componente e CSS.

## Tasks

- [x] 1. Expandir o tipo `LandingContent` em `lib/seo-content.ts`
  - Adicionar os dois campos opcionais ao tipo: `capabilitiesEyebrow?: string` e `capabilitiesTitle?: string`
  - Os demais campos existentes permanecem intactos
  - Verificar que TypeScript aceita propriedades opcionais sem quebrar as 8 entradas existentes que não declaram os novos campos
  - _Requisitos: 3.1, 3.3_

- [x] 2. Reescrever a entrada `erp-dynamics` em `lib/seo-content.ts`
  - [x] 2.1 Atualizar `h1`, `description` e `intro`
    - `h1`: `"Microsoft Dynamics 365: implementação, integração e evolução"`
    - `description`: `"Consultoria e implementação de Microsoft Dynamics 365 para unificar CRM, ERP e operação — com atenção à integração de dados, continuidade do negócio e evolução sustentável."`
    - `intro`: parágrafo descrito no design, mencionando Vendas, Marketing, Serviço, Finanças, Comércio e Cadeia de Fornecedores
    - _Requisitos: 1.1, 1.2, 1.3_

  - [x] 2.2 Reescrever o array `benefits` (3 itens)
    - Item 01: título "Alinhamento entre negócio e plataforma" + texto sobre levantamento de processos antes de configurar módulos
    - Item 02: título "Gestão de integração e dados" + texto sobre mapeamento de dependências e qualidade de dados
    - Item 03: título "Continuidade operacional" + texto sobre go-live, treinamento e sustentação pós-implantação
    - Garantir que nenhum item usa linguagem vaga ("soluções completas", "atendimento diferenciado")
    - _Requisitos: 2.1, 2.2, 2.3, 2.4_

  - [x] 2.3 Preencher `capabilitiesEyebrow`, `capabilitiesTitle` e array `capabilities` (6 itens)
    - `capabilitiesEyebrow`: `"Módulos Dynamics 365"`
    - `capabilitiesTitle`: `"Uma plataforma conectada para toda a empresa."`
    - 6 módulos em ordem: Dynamics 365 Sales, Marketing, Customer Service, Finance, Commerce, Supply Chain
    - Cada módulo com título em pt-BR e texto de 1–3 frases no estilo consultivo da UNIDAX
    - Nenhum item copia textualmente bullet points de site anterior
    - _Requisitos: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.4 Reescrever o array `deliverables` (7 itens)
    - Cobrir em ordem: (a) diagnóstico e requisitos, (b) design de solução e arquitetura, (c) configuração e implementação, (d) migração e integração de dados, (e) testes e validação, (f) go-live e treinamento, (g) sustentação pós-implantação
    - Cada item como frase nominal em pt-BR, clara e específica
    - _Requisitos: 4.1, 4.2, 4.3_

  - [x] 2.5 Reescrever o array `faqs` (5 itens)
    - FAQ 1: atendimento a ambientes Dynamics já implantados (legado)
    - FAQ 2: integração de Dynamics 365 com IA e dados analíticos
    - FAQ 3: tempo típico de uma implementação de Dynamics 365
    - FAQ 4: gestão de mudança e adoção pelos usuários
    - FAQ 5: relação com Microsoft para licenciamento
    - Cada resposta direta, honesta e específica ao contexto Dynamics — sem promessas vagas
    - _Requisitos: 5.1, 5.2, 5.3_

- [x] 3. Atualizar `components/seo/landing-page.tsx`
  - Localizar os dois literais hard-coded na seção `capabilities`:
    - `"Capacidades de IA"` → `{item.capabilitiesEyebrow ?? "Capacidades de IA"}`
    - `"O que construímos em sistemas de IA."` → `{item.capabilitiesTitle ?? "O que construímos em sistemas de IA."}`
  - Nenhuma outra linha do componente é alterada
  - Verificar que o componente continua sendo um Server Component (sem `"use client"`)
  - _Requisitos: 3.2, 3.5_

- [x] 4. Adicionar regra CSS responsiva em `app/globals.css`
  - Dentro do bloco `@media (max-width:1020px)` já existente, adicionar ao final do bloco:
    `.capability-grid{grid-template-columns:repeat(2,1fr)}`
  - Nenhum novo arquivo CSS, nenhum novo bloco `@media`
  - _Requisitos: 6.2, 6.3, 6.4_

- [x] 5. Verificação final
  - Executar a sequência pré-deploy:
    ```bash
    npm run check:routes
    npm run typecheck
    npm run lint
    npm run build
    ```
  - Garantir que todos os comandos retornam sem erros
  - Garantir que `npm run check:routes` não regride (nenhuma mudança na estrutura de rotas)
  - Verificar que as 8 landing pages existentes sem os novos campos continuam compilando sem erros de tipo
  - _Requisitos: 1.3, 2.4, 3.4, 6.3_

## Notes

- Tarefas marcadas com `*` são opcionais — não há tarefas opcionais neste plano, pois o design não inclui Correctness Properties (mudança é UI rendering + dados estáticos + CSS)
- O projeto não possui framework de testes (sem Jest/Vitest); a verificação é feita via typecheck + lint + build
- As 8 entradas existentes em `aiLandingPages` e `enterpriseLandingPages` que não declaram `capabilitiesEyebrow`/`capabilitiesTitle` continuam válidas — TypeScript permite omitir propriedades opcionais e o operador `??` no componente garante o fallback
- O campo `capabilities` já existe no tipo — apenas os dois campos novos são adicionados
- `lib/seo-content.ts` é conteúdo estático; `lib/cms.ts` não está envolvido nesta mudança

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.3", "2.4", "2.5"] },
    { "id": 2, "tasks": ["3", "4"] }
  ]
}
```
