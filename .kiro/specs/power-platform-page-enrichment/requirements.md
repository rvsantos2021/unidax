# Requirements Document

## Introduction

Este documento especifica os requisitos para o enriquecimento da página de serviço `servicos/power-platform` do site UNIDAX. A página atualmente apresenta conteúdo genérico e enxuto sobre a Power Platform. O objetivo é torná-la mais específica, relevante e convincente para decisores enterprise, incorporando as cinco ferramentas da plataforma no estilo consultivo/técnico da UNIDAX, expandindo os entregáveis e as FAQs, e atualizando o `h1`, `description` e `intro` — tudo sem criar novos componentes ou arquivos CSS separados.

## Glossary

- **LandingContent**: Tipo TypeScript em `lib/seo-content.ts` que representa o conteúdo de uma página de SEO. Campos relevantes: `slug`, `title`, `h1`, `description`, `eyebrow`, `intro`, `benefits`, `capabilities`, `capabilitiesEyebrow`, `capabilitiesTitle`, `deliverables`, `faqs`, `cta`, `serviceType`.
- **capabilities**: Campo opcional de `LandingContent` (`{ title: string; text: string }[]`) que renderiza uma seção de grid numerado com título e texto, já suportada pelo componente `LandingPage`.
- **benefits**: Array de `{ title: string; text: string }` em `LandingContent`, renderizado como cards numerados na seção "Abordagem UNIDAX".
- **LandingPage**: Componente Server em `components/seo/landing-page.tsx` que renderiza a estrutura completa da página de SEO.
- **SEO_Content**: O arquivo `lib/seo-content.ts` que contém os arrays `aiLandingPages` e `enterpriseLandingPages` com os dados das páginas de SEO.
- **Power_Platform**: Conjunto de ferramentas Microsoft — Power Apps, Power Automate, Power Pages, Power BI e Copilot Studio — que permite desenvolver aplicações, automatizar processos, analisar dados e criar assistentes virtuais com abordagem low-code/no-code.
- **globals.css**: Arquivo `app/globals.css` — único arquivo CSS do projeto; todos os estilos devem ser adicionados aqui.
- **capability-grid**: Classe CSS existente em `globals.css` que renderiza o grid de cards de capabilities.
- **capability-card**: Classe CSS existente em `globals.css` que estiliza cada card individual de capability.

## Requirements

### Requirement 1: Atualização de h1, description e intro

**User Story:** Como visitante enterprise que pesquisa consultoria em Microsoft Power Platform, eu quero encontrar um título, uma descrição e uma introdução que descrevam com precisão o que a UNIDAX oferece na plataforma, para que eu possa avaliar rapidamente se a empresa tem a especialidade que procuro.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um `h1` para a entrada `power-platform` que inclua explicitamente o termo "Microsoft Power Platform" e contenha pelo menos um dos termos "implementação" ou "governança" para indicar a atuação da UNIDAX na plataforma.
2. THE SEO_Content SHALL conter uma `description` para a entrada `power-platform` que faça referência explícita a pelo menos três dos seguintes quatro temas: aplicações low-code, automação, dados e inteligência artificial — sem usar a expressão "alinhando com a proposta consultiva" ou equivalente subjetivo.
3. THE SEO_Content SHALL conter um `intro` para a entrada `power-platform` composto por entre 1 e 3 frases, descrevendo a proposta de valor de unificar apps, automação, analytics e assistentes virtuais em uma plataforma integrada ao ecossistema Microsoft, sem uso de adjetivos subjetivos como "moderno", "intuitivo" ou "robusto".
4. THE SEO_Content SHALL manter todos os textos dos campos `h1`, `description` e `intro` em português do Brasil (pt-BR), sem termos em inglês expostos ao usuário final como nomes de ferramentas que possuam equivalente em português — exceto nomes próprios de produtos Microsoft, que devem ser mantidos conforme nomenclatura oficial.

---

### Requirement 2: Revisão dos benefits

**User Story:** Como decisor de TI avaliando consultoras de Power Platform, eu quero ler benefícios concretos e diferenciados da abordagem da UNIDAX, para que eu possa entender o que torna o serviço relevante para o meu contexto.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter exatamente 3 itens no array `benefits` para a entrada com `slug === "power-platform"` em `enterpriseLandingPages`.
2. WHEN o array `benefits` for renderizado pelo componente `LandingPage`, THE LandingPage SHALL exibir cada item como um `<article>` com classe `detail-card`, contendo um elemento `<span>` com prefixo `0{index+1}`, um `<h3>` com o título e um `<p>` com o texto descritivo.
3. THE SEO_Content SHALL garantir que cada item do array `benefits` para `power-platform` descreva uma vantagem específica cobrindo exatamente os três temas: (a) avaliação do processo antes da automação, (b) integração com o ecossistema Microsoft e dados existentes, e (c) governança e sustentabilidade das soluções Power Platform.
4. THE SEO_Content SHALL garantir que nenhum item de `benefits` para `power-platform` contenha as expressões "soluções completas", "atendimento diferenciado", ou qualquer substantivo não acompanhado de critério mensurável ou referência concreta ao contexto de Power Platform — incluindo termos isolados como "Governança", "Automação com propósito" ou "Aplicações úteis" usados como títulos sem complemento que indique o que é avaliado ou garantido.
5. WHEN o campo `text` de qualquer item de `benefits` para `power-platform` descrever uma vantagem, THE SEO_Content SHALL garantir que o texto especifique ao menos um critério observável — tal como um tipo de elemento avaliado (ex.: volume, estabilidade de regras, dependências), uma ação concreta realizada (ex.: mapear, validar, revisar) ou um escopo delimitado (ex.: ambiente Microsoft 365, conectores licenciados, ciclo de vida da solução).

---

### Requirement 3: Preenchimento de capabilities com as ferramentas da Power Platform

**User Story:** Como comprador enterprise avaliando as ferramentas da Power Platform, eu quero ver uma seção que descreva cada ferramenta relevante com linguagem consultiva, para que eu possa identificar quais áreas da empresa podem ser endereçadas pela plataforma.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um array `capabilities` com exatamente 5 itens para a entrada `power-platform`, correspondendo, em ordem, às ferramentas: Power Apps, Power Automate, Power Pages, Power BI e Copilot Studio.
2. THE SEO_Content SHALL conter um campo `capabilitiesEyebrow` com o valor exato "Ferramentas Power Platform" para a entrada `power-platform`.
3. THE SEO_Content SHALL conter um campo `capabilitiesTitle` com um título de até 12 palavras para a entrada `power-platform`, que mencione explicitamente a Power Platform e faça referência a automação, aplicações ou produtividade empresarial.
4. WHEN o array `capabilities` for renderizado pelo componente `LandingPage`, THE LandingPage SHALL exibir cada ferramenta como um card com elemento `<span className="number">` sequencial, `<h3>` com o título e `<p>` com o texto descritivo, usando a classe `capability-card detail-card` em cada `<article>`.
5. THE SEO_Content SHALL garantir que cada item do array `capabilities` apresente o nome oficial da ferramenta Microsoft como campo `title` e um campo `text` com mínimo de 1 e máximo de 3 frases, onde cada frase descreve um resultado de negócio mensurável ou uma capacidade operacional concreta que aquela ferramenta entrega.
6. THE SEO_Content SHALL garantir que nenhum item do array `capabilities` reproduza sequências de 6 ou mais palavras consecutivas presentes nos campos `benefits[*].text` ou `intro` da entrada `power-platform`; o conteúdo deve ser original em relação ao restante da entrada.
7. WHEN a seção `capabilities` for renderizada em viewport com largura inferior a 700px, THE LandingPage SHALL exibir os cards em coluna única com `grid-template-columns: 1fr` aplicado ao seletor `.capability-grid` no breakpoint `max-width: 700px` em `globals.css`, sem sobreposição ou truncamento de conteúdo de qualquer card.

---

### Requirement 4: Expansão dos deliverables

**User Story:** Como gerente de projeto avaliando o escopo de um projeto Power Platform, eu quero ver uma lista de entregáveis que cubra o ciclo completo — do mapeamento à sustentação —, para que eu possa entender o que esperar de cada etapa da parceria com a UNIDAX.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um array `deliverables` com exatamente 6 itens para a entrada `power-platform`.
2. WHEN o array `deliverables` da entrada `power-platform` é avaliado, THE SEO_Content SHALL apresentar os itens na seguinte ordem: (a) mapeamento de processos e identificação de oportunidades, (b) seleção de ferramentas e proposta de solução, (c) implementação e configuração das ferramentas, (d) validação com usuários e ajustes, (e) orientação para governança de ambientes e acessos, (f) sustentação e evolução das soluções.
3. THE SEO_Content SHALL garantir que cada item do array `deliverables` seja uma string em português do Brasil com entre 3 e 12 palavras.
4. IF qualquer item do array `deliverables` contiver siglas ou termos técnicos sem qualificador em português (por exemplo, "Power Apps" sem complemento descritivo), THEN THE SEO_Content SHALL incluir um complemento em português de até 5 palavras imediatamente após o termo, descrevendo sua função.

---

### Requirement 5: Ampliação das FAQs

**User Story:** Como decisor enterprise com dúvidas sobre adoção de Power Platform, eu quero encontrar respostas para perguntas reais que surgem em projetos deste porte, para que eu possa avançar na avaliação da UNIDAX com mais confiança.

#### Acceptance Criteria

1. THE SEO_Content SHALL conter um array `faqs` com no mínimo 4 e no máximo 5 itens para a entrada `power-platform`.
2. IF a entrada for `power-platform`, THEN THE SEO_Content SHALL conter ao menos um item de FAQ endereçando cada um dos seguintes temas: (a) critérios para escolher qual ferramenta da Power Platform usar em cada situação, (b) integração da Power Platform com Dynamics 365 e outros sistemas Microsoft, (c) modelo de licenciamento Microsoft e implicações de custo, (d) quando preferir Power Platform em vez de desenvolvimento customizado, (e) governança, segurança e controle de ambientes.
3. THE SEO_Content SHALL garantir que cada resposta de FAQ da entrada `power-platform` contenha ao menos uma afirmação verificável sobre o tema abordado — como uma condição, limitação ou critério concreto — em vez de apenas enunciar benefícios genéricos.
4. WHEN as FAQs forem renderizadas pelo componente `LandingPage`, THE LandingPage SHALL exibir cada item como um elemento `<details>` com classe `faq-item` contendo um elemento `<summary>` com o texto da pergunta, de modo que cada pergunta seja focável via teclado e ativável por clique ou tecla Enter/Espaço.
