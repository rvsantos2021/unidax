# Requirements Document

## Introduction

Enriquecimento da página `/empresa` (`app/empresa/page.tsx`) do site institucional UNIDAX com conteúdo de história, visão, missão, valores e equipe extraídos do site atual (`/quem-somos/`). O objetivo é aprofundar a narrativa institucional sem remover nenhuma seção existente, mantendo o tom direto e objetivo do novo layout, e preservando o caminho de conversão para `/contato`.

## Glossary

- **Página_Empresa**: Server Component `app/empresa/page.tsx` que representa a rota `/empresa`
- **Sistema**: O site Next.js 15 da UNIDAX (App Router, TypeScript strict)
- **Seção_Historia**: Nova seção com a narrativa de origem e especialização da UNIDAX
- **Seção_VMV**: Nova seção que apresenta Visão, Missão e Valores em formato de cards ou bullets
- **Seção_Valores**: Bloco dos 8 valores institucionais da UNIDAX
- **Seção_Equipe**: Seção textual mencionando a equipe (sem fotos)
- **Componente_Existente**: Qualquer componente já presente em `components/` (`PageHero`, `Reveal`, `StatsBlock`, `DarkPanel`, `CtaSection`, `SectionHead`)
- **CSS_Global**: Arquivo `app/globals.css` — único local onde CSS pode ser adicionado
- **Conteúdo_Adaptado**: Texto reformulado com o tom do novo site (direto, objetivo, menos corporativo genérico), em pt-BR

## Requirements

### Requirement 1: Seção de história e especialização

**User Story:** Como visitante da página /empresa, quero entender a origem e especialização da UNIDAX, para avaliar a experiência e relevância da empresa para o meu negócio.

#### Acceptance Criteria

1. THE Página_Empresa SHALL renderizar a Seção_Historia após a seção "Posicionamento" existente e antes do StatsBlock.
2. WHEN a Seção_Historia é renderizada, THE Sistema SHALL exibir um texto adaptado que comunique a origem, especialização em Microsoft Dynamics e atuação nacional/internacional da UNIDAX.
3. THE Seção_Historia SHALL utilizar apenas Componentes_Existentes (`Reveal`, layout de container e `section`) sem introduzir novos componentes.
4. THE Sistema SHALL aplicar estilos exclusivamente via CSS_Global, sem criar arquivos CSS separados.

### Requirement 2: Visão e Missão

**User Story:** Como potencial cliente ou parceiro, quero conhecer a visão e missão da UNIDAX, para avaliar se os valores e direção da empresa estão alinhados com os meus objetivos.

#### Acceptance Criteria

1. THE Página_Empresa SHALL renderizar a Seção_VMV com visão e missão em destaque, posicionada após a Seção_Historia.
2. WHEN a Seção_VMV é renderizada, THE Sistema SHALL exibir a Visão e a Missão como dois blocos visualmente distintos.
3. THE Seção_VMV SHALL utilizar apenas Componentes_Existentes para estruturação, adaptando conteúdo ao tom direto do novo site.
4. IF a página for acessada em dispositivo móvel (viewport ≤ 700px), THEN THE Sistema SHALL empilhar os blocos de Visão e Missão verticalmente sem sobreposição.

### Requirement 3: Valores institucionais

**User Story:** Como visitante, quero ver os valores da UNIDAX organizados de forma clara, para entender a cultura e os princípios que guiam a empresa.

#### Acceptance Criteria

1. THE Página_Empresa SHALL renderizar a Seção_Valores com os 8 valores: Inovação, Excelência, Transparência, Colaboração, Confiança, Simples e Funcional, Sustentabilidade e "Acreditamos. Sempre!".
2. WHEN a Seção_Valores é renderizada, THE Sistema SHALL exibir cada valor com rótulo e breve descrição adaptada ao tom do novo site.
3. THE Seção_Valores SHALL ser posicionada após a Seção_VMV e antes do DarkPanel "Como pensamos" existente.
4. IF a página for acessada em dispositivo móvel (viewport ≤ 700px), THEN THE Sistema SHALL exibir os valores em coluna única, sem truncamento de texto.
5. THE Sistema SHALL aplicar estilos da Seção_Valores exclusivamente no CSS_Global.

### Requirement 4: Seção de equipe

**User Story:** Como visitante, quero saber algo sobre a equipe da UNIDAX, para ter confiança de que existe um time competente por trás das soluções.

#### Acceptance Criteria

1. THE Página_Empresa SHALL renderizar a Seção_Equipe após o DarkPanel "Como pensamos" existente e antes do CtaSection final.
2. WHEN a Seção_Equipe é renderizada, THE Sistema SHALL exibir um texto institucional sobre a equipe, sem fotos de pessoas.
3. THE Seção_Equipe SHALL utilizar apenas Componentes_Existentes para estruturação.
4. THE Seção_Equipe SHALL conter um CTA secundário (link) direcionando para `/contato` para preservar o caminho de conversão.

### Requirement 5: Preservação das seções existentes e integridade da página

**User Story:** Como mantenedor do site, quero que o enriquecimento não remova nem quebre seções existentes, para manter a coerência e qualidade do site atual.

#### Acceptance Criteria

1. THE Página_Empresa SHALL preservar integralmente as seções já existentes: `PageHero`, seção "Posicionamento", `StatsBlock`, `DarkPanel` "Como pensamos" e `CtaSection` final.
2. WHEN a Página_Empresa é construída (`npm run build`), THE Sistema SHALL compilar sem erros de TypeScript e sem falhas de lint.
3. THE Sistema SHALL manter `app/empresa/page.tsx` como Server Component — sem diretiva `"use client"`.
4. THE Sistema SHALL usar o path alias `@/` para todos os imports de componentes e utilitários.
5. IF um novo componente for estritamente necessário, THEN THE Sistema SHALL declará-lo em `components/` com kebab-case no nome de arquivo e named export, sem diretiva `"use client"`.
6. THE Sistema SHALL manter todos os textos exibidos ao usuário em pt-BR.

### Requirement 6: Conteúdo adaptado ao tom editorial do novo site

**User Story:** Como editor do site, quero que os textos novos adotem o mesmo tom direto e objetivo do restante do site, para garantir coerência editorial.

#### Acceptance Criteria

1. THE Conteúdo_Adaptado SHALL evitar linguagem corporativa genérica (ex.: "soluções de ponta", "excelência na entrega") substituindo por afirmações concretas e verificáveis.
2. THE Conteúdo_Adaptado SHALL manter frases curtas, na mesma linha do tom dos textos já existentes na página.
3. THE Sistema SHALL usar os mesmos custom properties CSS (`--red`, `--gold`, `--ink`, `--muted`, `--soft`, `--line`) nos novos estilos, sem definir novas variáveis de cor.
