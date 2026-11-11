# Requirements Document

## Introduction

Este documento especifica os requisitos para o enriquecimento da página de serviço `servicos/erp-dynamics` do site UNIDAX. A página atualmente apresenta conteúdo genérico e enxuto sobre ERP e Microsoft Dynamics. O objetivo é torná-la mais específica, relevante e convincente para decisores enterprise, incorporando os módulos do Dynamics 365 no estilo consultivo/técnico da UNIDAX, expandindo os entregáveis e as FAQs, e garantindo que o layout funcione corretamente em dispositivos móveis — tudo sem criar novos componentes ou arquivos CSS separados.

## Glossary

- **LandingContent**: Tipo TypeScript em `lib/seo-content.ts` que representa o conteúdo de uma página de SEO. Campos relevantes: `slug`, `title`, `h1`, `description`, `eyebrow`, `intro`, `benefits`, `capabilities`, `deliverables`, `faqs`, `cta`, `serviceType`.
- **capabilities**: Campo opcional de `LandingContent` (`{ title: string; text: string }[]`) que renderiza uma seção de grid numerado com título e texto, já suportada pelo componente `LandingPage`.
- **benefits**: Array de `{ title: string; text: string }` em `LandingContent`, renderizado como cards numerados na seção "Abordagem UNIDAX".
- **LandingPage**: Componente Server em `components/seo/landing-page.tsx` que renderiza a estrutura completa da página de SEO.
- **SEO_Content**: O arquivo `lib/seo-content.ts` que contém os arrays `aiLandingPages` e `enterpriseLandingPages` com os dados das páginas de SEO.
- **Dynamics_365**: Plataforma Microsoft que unifica CRM e ERP em módulos conectados: Vendas, Marketing, Serviço, Finanças, Comércio, Cadeia de Fornecedores.
- **globals.css**: Arquivo `app/globals.css` — único arquivo CSS do projeto; todos os estilos devem ser adicionados aqui.
- **capability-grid**: Classe CSS existente em `globals.css` que renderiza o grid de cards de capabilities.
- **capability-card**: Classe CSS existente em `globals.css` que estiliza cada card individual de capability.

## Requirements

### Requirement 1: Atualização de h1 e intro

**User Story:** Como visitante enterprise que pesquisa consultoria em Dynamics 365, eu quero encontrar um título e uma introdução que descrevam com precisão o que a UNIDAX oferece em Dynamics 365, para que eu possa avaliar rapidamente se a empresa tem a especialidade que procuro.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um `h1` para a entrada `erp-dynamics` que mencione explicitamente Microsoft Dynamics 365 e posicione a UNIDAX como parceira de implementação e evolução.
2. THE SEO_Content SHALL conter um `intro` para a entrada `erp-dynamics` que descreva a proposta de valor central de unificar CRM e ERP, conectando toda a empresa com cada cliente, em tom consultivo e direto.
3. THE SEO_Content SHALL manter todos os textos do campo `intro` em português do Brasil (pt-BR), sem termos em inglês expostos ao usuário final.

---

### Requirement 2: Revisão dos benefits

**User Story:** Como decisor de TI avaliando consultoras de Dynamics 365, eu quero ler benefícios concretos e diferenciados da abordagem da UNIDAX, para que eu possa entender o que torna o serviço relevante para o meu contexto.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter exatamente 3 itens no array `benefits` para a entrada `erp-dynamics`.
2. WHEN o array `benefits` for renderizado pelo componente `LandingPage`, THE LandingPage SHALL exibir cada item como um card numerado com título e texto descritivo.
3. THE SEO_Content SHALL garantir que cada item do array `benefits` descreva uma vantagem específica da abordagem da UNIDAX para projetos Dynamics 365, cobrindo os temas: alinhamento entre negócio e tecnologia, gestão de integração e dados, e continuidade operacional pós-implementação.
4. THE SEO_Content SHALL garantir que nenhum item de `benefits` use linguagem vaga como "soluções completas", "atendimento diferenciado" ou termos sem referência concreta ao contexto de ERP/CRM.

---

### Requirement 3: Preenchimento de capabilities com módulos do Dynamics 365

**User Story:** Como comprador enterprise avaliando módulos do Dynamics 365, eu quero ver uma seção que descreva cada módulo relevante com linguagem consultiva, para que eu possa identificar quais áreas da empresa podem ser endereçadas pela plataforma.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um array `capabilities` com exatamente 6 itens para a entrada `erp-dynamics`, correspondendo aos módulos: Vendas, Marketing, Serviço ao Cliente, Finanças, Comércio e Cadeia de Fornecedores.
2. WHEN o array `capabilities` for renderizado pelo componente `LandingPage`, THE LandingPage SHALL exibir cada módulo como um card numerado com título e texto descritivo, usando a classe `capability-card detail-card` existente.
3. THE SEO_Content SHALL garantir que cada item do array `capabilities` apresente o título do módulo em português e um texto de 1 a 3 frases descrevendo o valor de negócio que aquele módulo entrega, no estilo consultivo da UNIDAX.
4. THE SEO_Content SHALL garantir que nenhum item de `capabilities` copie textualmente os bullet points do site antigo; o conteúdo deve ser reescrito na voz editorial da UNIDAX.
5. WHEN a seção `capabilities` for renderizada em viewport com largura inferior a 700px, THE LandingPage SHALL exibir os cards em coluna única, sem sobreposição ou truncamento de conteúdo.

---

### Requirement 4: Expansão dos deliverables

**User Story:** Como gerente de projeto avaliando o escopo de um projeto Dynamics 365, eu quero ver uma lista de entregáveis que cubra o ciclo completo — do diagnóstico ao go-live e à sustentação —, para que eu possa entender o que esperar de cada etapa da parceria com a UNIDAX.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um array `deliverables` com no mínimo 6 itens para a entrada `erp-dynamics`.
2. THE SEO_Content SHALL garantir que o array `deliverables` cubra as seguintes fases em ordem: (a) diagnóstico e levantamento de requisitos, (b) design de solução e arquitetura de integração, (c) implementação e configuração dos módulos, (d) migração ou integração de dados, (e) testes e validação com usuários, (f) go-live e treinamento, (g) suporte e sustentação pós-implantação.
3. THE SEO_Content SHALL garantir que cada item de `deliverables` seja uma frase nominal em português, clara e específica, sem jargões técnicos sem contexto.

---

### Requirement 5: Ampliação das FAQs

**User Story:** Como decisor enterprise com dúvidas sobre implementação de Dynamics 365, eu quero encontrar respostas para perguntas reais que surgem em projetos deste porte, para que eu possa avançar na avaliação da UNIDAX com mais confiança.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um array `faqs` com no mínimo 5 itens para a entrada `erp-dynamics`.
2. THE SEO_Content SHALL garantir que o array `faqs` cubra os seguintes temas: (a) atendimento a ambientes Dynamics já existentes (legado), (b) integração de Dynamics com IA e dados, (c) tempo e custo típico de projetos de implementação, (d) gestão de mudança e adoção pelos usuários, (e) modelo de licenciamento e relação com a Microsoft.
3. THE SEO_Content SHALL garantir que cada resposta de FAQ seja direta, honesta e específica ao contexto de Dynamics 365, sem promessas vagas ou linguagem de marketing genérico.
4. WHEN as FAQs forem renderizadas pelo componente `LandingPage`, THE LandingPage SHALL exibir cada item como um `<details>` acessível com summary clicável, usando as classes `faq-item` existentes.

---

### Requirement 6: Ajuste de CSS para capabilities em mobile

**User Story:** Como usuário acessando o site pelo celular, eu quero que a seção de capabilities dos módulos Dynamics 365 seja legível e navegável em tela pequena, para que eu não precise dar zoom ou rolar horizontalmente.

#### Acceptance Criteria

1. WHILE o viewport tiver largura inferior ou igual a 700px, THE globals.css SHALL garantir que o seletor `.capability-grid` exiba seus filhos em coluna única (`grid-template-columns: 1fr`).
2. WHILE o viewport tiver largura entre 701px e 1020px, THE globals.css SHALL garantir que o seletor `.capability-grid` exiba seus filhos em 2 colunas (`grid-template-columns: repeat(2, 1fr)`).
3. THE globals.css SHALL conter as regras de responsividade para `.capability-grid` dentro dos blocos `@media` já existentes (`max-width: 1020px` e `max-width: 700px`), sem criar novos arquivos CSS ou blocos `@media` adicionais fora do padrão existente.
4. IF a seção `capabilities` for renderizada com 6 cards em viewport de 1180px ou superior, THEN THE globals.css SHALL manter o grid em 3 colunas (comportamento padrão herdado de `.detail-grid`).
