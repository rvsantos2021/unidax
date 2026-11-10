# Requirements Document

## Introduction

Enriquecimento da página `/ia/desenvolvimento-de-sistemas-de-ia` com conteúdo adaptado do site atual (`/servicos/desenvolvimento/`), focado no contexto de desenvolvimento de sistemas de IA. O objetivo é tornar a página mais rica e atraente, apresentando as capacidades específicas de engenharia de IA da UNIDAX, sem duplicar o conteúdo da página `/servicos/desenvolvimento-de-sistemas` (desenvolvimento de software genérico) e sem perder as características do layout atual — cards numerados de benefícios, DarkPanel de entregas, FAQ em accordion e CTA final.

## Glossary

- **Sistema**: O site Next.js 15 da UNIDAX (App Router, TypeScript strict, CSS custom em `app/globals.css`)
- **Página_IA_Dev**: A landing page SEO em `/ia/desenvolvimento-de-sistemas-de-ia`, renderizada a partir de dados do tipo `LandingContent` definidos em `lib/seo-content.ts`
- **LandingContent**: Tipo TypeScript em `lib/seo-content.ts` que define a estrutura de dados compartilhada por todas as landing pages (3 de IA e 6 de serviços)
- **Componente_LandingPage**: Componente `LandingPage` em `components/seo/landing-page.tsx` que renderiza as landing pages a partir de dados `LandingContent`
- **Seção_Capacidades**: Nova seção da Página_IA_Dev que apresenta os tipos específicos de sistemas de IA que a UNIDAX desenvolve
- **Página_Servicos_Dev**: A landing page existente em `/servicos/desenvolvimento-de-sistemas` (desenvolvimento de software sob medida genérico) — conteúdo que não deve ser duplicado
- **PageHero**: Componente `PageHero` em `components/page-hero.tsx` — hero da landing page com CTA para `/contato`
- **DarkPanel**: Componente `DarkPanel` em `components/dark-panel.tsx` — painel escuro usado para exibir entregas
- **CtaSection**: Componente `CtaSection` em `components/cta-section.tsx` — bloco de CTA final com link para `/contato`
- **FaqSection**: Componente `FaqSection` em `components/seo/json-ld.tsx` — accordion de perguntas frequentes com schema JSON-LD `FAQPage`
- **CSS_Global**: Arquivo `app/globals.css` — único local onde CSS pode ser definido
- **Conteúdo_Adaptado**: Texto reformulado a partir do conteúdo do site atual, adaptado ao contexto de IA e ao tom direto e objetivo do novo site, em pt-BR

## Requirements

### Requirement 1: Introdução enriquecida

**User Story:** Como visitante da página de desenvolvimento de IA, quero uma introdução que comunique o valor da proposta de forma direta e inspiradora, para entender por que considerar a UNIDAX para construir sistemas de IA.

#### Acceptance Criteria

1. THE Página_IA_Dev SHALL exibir um texto de introdução que comunique a transformação de ideias e necessidades de negócio em sistemas de IA funcionais, adaptado ao tom direto do novo site.
2. THE Conteúdo_Adaptado da introdução SHALL manter o contexto de desenvolvimento de sistemas de IA, focando em modelos, dados, agentes e automação inteligente — sem se referir a desenvolvimento de software genérico.
3. THE Página_IA_Dev SHALL preservar a seção "Abordagem UNIDAX" existente como contêiner da introdução enriquecida.

### Requirement 2: Seção de capacidades de IA

**User Story:** Como potencial cliente, quero ver os tipos específicos de sistemas de IA que a UNIDAX desenvolve, para avaliar se a empresa atende ao meu caso de uso.

#### Acceptance Criteria

1. THE Página_IA_Dev SHALL renderizar a Seção_Capacidades entre a seção de benefícios e o DarkPanel de entregas.
2. WHEN a Seção_Capacidades é renderizada, THE Sistema SHALL exibir pelo menos 5 capacidades de desenvolvimento de IA, cada uma com título e descrição.
3. THE Seção_Capacidades SHALL apresentar capacidades focadas em IA, incluindo: aplicações com IA integrada, portais de conhecimento inteligentes, arquitetura de sistemas de IA, integração de IA com sistemas corporativos e operação contínua de IA.
4. THE Seção_Capacidades SHALL utilizar o padrão visual de cards do CSS_Global, reutilizando ou estendendo classes de estilo já existentes.
5. IF a página for acessada em dispositivo móvel (viewport inferior ou igual a 700px), THEN THE Sistema SHALL exibir as capacidades em coluna única, sem truncamento de texto.
6. WHERE uma LandingContent não incluir capacidades, THE Componente_LandingPage SHALL omitir a Seção_Capacidades sem gerar erros de renderização.

### Requirement 3: Preservação dos benefícios existentes

**User Story:** Como visitante, quero entender por que escolher a UNIDAX para desenvolvimento de IA, para tomar uma decisão informada.

#### Acceptance Criteria

1. THE Página_IA_Dev SHALL manter os benefícios existentes (Aderência ao negócio, Integração com sistemas, Pronta para evoluir) como seção de "por que escolher".
2. THE Página_IA_Dev SHALL manter os benefícios em cards numerados, conforme o padrão visual existente na grade de detalhe.

### Requirement 4: Entregas enriquecidas com ciclo de vida de IA

**User Story:** Como potencial cliente, quero entender o caminho completo da descoberta à operação de um sistema de IA, para avaliar o escopo e a maturidade da proposta.

#### Acceptance Criteria

1. THE Página_IA_Dev SHALL exibir as entregas no DarkPanel existente, incluindo as etapas de descoberta, arquitetura técnica, piloto e integração.
2. THE Página_IA_Dev SHALL incluir pelo menos 2 entregas adicionais que contemplem avaliação de qualidade, governança e operação contínua de sistemas de IA.
3. THE Página_IA_Dev SHALL manter as entregas no formato de bullet list do DarkPanel existente, com numeração sequencial.

### Requirement 5: Perguntas frequentes ampliadas

**User Story:** Como visitante com dúvidas sobre desenvolvimento de IA, quero encontrar respostas para perguntas comuns, para reduzir incerteza antes de iniciar uma conversa.

#### Acceptance Criteria

1. THE Página_IA_Dev SHALL exibir pelo menos 5 perguntas frequentes focadas em desenvolvimento de sistemas de IA.
2. WHEN as perguntas frequentes são renderizadas, THE Sistema SHALL gerar o esquema JSON-LD do tipo `FAQPage` para indexação por motores de busca.
3. THE Página_IA_Dev SHALL manter o formato de accordion acessível existente com elementos `details` e `summary`.

### Requirement 6: Não duplicação com a página de serviços

**User Story:** Como mantenedor do site, quero que o conteúdo da página de IA seja distinto da página de desenvolvimento de software genérico, para evitar canibalização de SEO e confusão do visitante.

#### Acceptance Criteria

1. THE Conteúdo_Adaptado SHALL focar em aspectos específicos de IA — modelos, agentes, conhecimento, automação inteligente, governança de IA — e não em desenvolvimento de software genérico como aplicativos móveis tradicionais, criação de websites ou fábrica de software convencional.
2. THE Página_IA_Dev SHALL não repetir as capacidades já cobertas pela Página_Servicos_Dev, incluindo desenvolvimento de sistemas sob medida genérico e outsourcing de squads.

### Requirement 7: Preservação do caminho de conversão e integridade técnica

**User Story:** Como mantenedor do site, quero que o enriquecimento não remova nem quebre o caminho de conversão para `/contato` e mantenha a integridade técnica da página.

#### Acceptance Criteria

1. THE Página_IA_Dev SHALL preservar o CtaSection final com link para `/contato` e o parâmetro `interesse` preenchido com o título do serviço.
2. THE Página_IA_Dev SHALL preservar o CTA do PageHero com link para `/contato`.
3. WHEN a Página_IA_Dev é construída com o comando `npm run build`, THE Sistema SHALL compilar sem erros de TypeScript e sem falhas de lint.
4. THE Componente_LandingPage SHALL permanecer um Server Component — sem diretiva `"use client"`.
5. THE Sistema SHALL aplicar estilos exclusivamente via CSS_Global, sem criar arquivos CSS separados, módulos CSS ou CSS-in-JS.
6. THE Sistema SHALL manter todos os textos exibidos ao usuário em pt-BR.
7. THE Sistema SHALL manter o tipo `LandingContent` compatível com todas as landing pages existentes (3 de IA e 6 de serviços), de forma que as demais páginas continuem renderizando sem alteração.
