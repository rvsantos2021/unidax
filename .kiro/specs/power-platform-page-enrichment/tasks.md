# Implementation Plan: Enriquecimento da Página Microsoft Power Platform

## Overview

Dois arquivos modificados, nenhum arquivo criado. A implementação segue a ordem natural de dependências: conteúdo primeiro, depois CSS.

## Tasks

- [ ] 1. Reescrever a entrada `power-platform` em `lib/seo-content.ts`
  - Localizar a entrada com `slug === "power-platform"` no array `enterpriseLandingPages`
  - Reescrever todos os campos de conteúdo conforme os requisitos
  - Manter os campos `slug`, `eyebrow`, `cta` e `serviceType` intactos
  - Verificar que TypeScript aceita a entrada sem erros — o tipo `LandingContent` não é alterado
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2, 5.3_

  - [ ] 1.1 Atualizar `h1`, `description` e `intro`
    - `h1`: `"Microsoft Power Platform: aplicações, automação e dados com governança"`
    - `description`: `"Consultoria e implementação de Microsoft Power Platform para desenvolver aplicações low-code, automatizar processos e analisar dados — integrado ao ecossistema Microsoft."`
    - `intro`: string com 2 frases — (1) descreve as 5 ferramentas integradas (Power Apps, Power Automate, Power Pages, Power BI e Copilot Studio) e a proposta de unificação; (2) posiciona a UNIDAX na implementação, configuração e governança com atenção aos processos reais, integrações e sustentabilidade das soluções
    - Sem adjetivos subjetivos ("moderno", "intuitivo", "robusto")
    - _Requisitos: 1.1, 1.2, 1.3, 1.4_

  - [ ] 1.2 Reescrever o array `benefits` (3 itens)
    - Item 01: título `"Avaliação antes de automatizar"` + texto mencionando volume, frequência e estabilidade das regras do processo para identificar o que vale automatizar
    - Item 02: título `"Integração com o ecossistema existente"` + texto sobre conexões com Microsoft 365, Dynamics 365, SharePoint e fontes de dados internas
    - Item 03: título `"Governança desde o início"` + texto sobre ambientes, políticas de acesso, ciclo de vida das soluções e plano de sustentação antes de colocar qualquer fluxo em produção
    - Nenhum item usa linguagem vaga ("soluções completas", "atendimento diferenciado") nem substantivo isolado sem critério mensurável
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 1.3 Preencher `capabilitiesEyebrow`, `capabilitiesTitle` e array `capabilities` (5 itens)
    - `capabilitiesEyebrow`: `"Ferramentas Power Platform"`
    - `capabilitiesTitle`: `"Uma plataforma integrada para aplicações, automação e dados empresariais."`
    - 5 ferramentas em ordem: Power Apps, Power Automate, Power Pages, Power BI, Copilot Studio
    - Cada item com nome oficial Microsoft como `title` e texto de 1–3 frases descrevendo resultado de negócio mensurável ou capacidade operacional concreta
    - Nenhum item reproduz sequências de 6 ou mais palavras do `intro` ou `benefits`
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ] 1.4 Reescrever o array `deliverables` (exatamente 6 itens em ordem)
    - Item 1: `"Mapeamento de processos e identificação de oportunidades"`
    - Item 2: `"Seleção de ferramentas e proposta de solução"`
    - Item 3: `"Implementação e configuração das ferramentas selecionadas"`
    - Item 4: `"Validação com usuários e ajustes de fluxo"`
    - Item 5: `"Orientação para governança de ambientes e políticas de acesso"`
    - Item 6: `"Sustentação e evolução das soluções implantadas"`
    - Cada item entre 3 e 12 palavras; termos técnicos como "Power Apps" com complemento descritivo em português quando necessário
    - _Requisitos: 4.1, 4.2, 4.3, 4.4_

  - [ ] 1.5 Reescrever o array `faqs` (5 itens)
    - FAQ 1: como escolher a ferramenta certa da Power Platform para cada necessidade
    - FAQ 2: integração da Power Platform com Dynamics 365 e outros sistemas Microsoft
    - FAQ 3: modelo de licenciamento Microsoft e implicações de custo
    - FAQ 4: quando usar Power Platform em vez de desenvolvimento customizado
    - FAQ 5: como garantir governança e segurança no uso da Power Platform
    - Cada resposta direta e honesta, com ao menos uma afirmação verificável (condição, limitação ou critério concreto) — sem promessas vagas
    - _Requisitos: 5.1, 5.2, 5.3_

- [ ] 2. Adicionar regra CSS mobile em `app/globals.css`
  - Localizar o bloco `@media (max-width: 700px)` já existente no arquivo
  - Adicionar ao final do bloco: `.capability-grid{grid-template-columns:1fr}`
  - Sem novo arquivo CSS, sem novo bloco `@media`
  - _Requisitos: 3.7_

- [ ] 3. Verificação final
  - Executar a sequência pré-deploy:
    ```bash
    npm run check:routes
    npm run typecheck
    npm run lint
    npm run build
    ```
  - Garantir que todos os comandos retornam sem erros
  - Garantir que `npm run check:routes` não regride (nenhuma mudança na estrutura de rotas)
  - Verificar que as demais landing pages (3 IA + 5 serviços enterprise) sem os campos alterados continuam compilando sem erros de tipo
  - _Requisitos: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 3.7, 4.1, 5.1_

## Notes

- Tarefas marcadas com `*` são opcionais — não há tarefas opcionais neste plano, pois o design não inclui Correctness Properties (mudança é conteúdo estático + uma regra CSS)
- O projeto não possui framework de testes (sem Jest/Vitest); a verificação é feita via typecheck + lint + build
- O tipo `LandingContent` já possui os campos opcionais `capabilities?`, `capabilitiesEyebrow?` e `capabilitiesTitle?` — não alterar o tipo
- `components/seo/landing-page.tsx` não recebe nenhuma alteração — o componente já usa `??` como fallback para os campos `capabilitiesEyebrow` e `capabilitiesTitle`
- As demais 8 landing pages (3 IA + 5 serviços enterprise) que não declaram os novos campos continuam válidas

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.3", "1.4", "1.5", "2"] },
    { "id": 1, "tasks": ["3"] }
  ]
}
```
