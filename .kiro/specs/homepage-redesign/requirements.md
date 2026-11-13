# Requirements Document

## Introduction

Redesign da página principal (homepage) do site institucional da UNIDAX, empresa brasileira de consultoria em tecnologia e IA. O objetivo é modernizar o visual, adicionar um carrossel de imagens no hero, ajustar o menu de navegação e introduzir novas seções, preservando todas as funcionalidades existentes e mantendo o foco em geração de leads via `/contato`. A abordagem é mobile-first, com reutilização máxima dos componentes e estilos já presentes no projeto.

## Glossary

- **Homepage**: Página principal do site, rota `/`, arquivo `app/page.tsx`.
- **Hero**: Seção de destaque no topo da homepage, que apresenta a proposta de valor principal da UNIDAX.
- **Carrossel**: Componente interativo que exibe múltiplas imagens em sequência, com transição automática e controles manuais.
- **SiteHeader**: Componente de cabeçalho global (`components/site-header.tsx`), presente em todas as páginas via `app/layout.tsx`.
- **Menu de Navegação**: Lista de links no `SiteHeader` que permite ao usuário navegar pelas seções do site.
- **Seção Soluções**: Nova seção na homepage que destaca soluções completas (combinação de IA + tecnologia empresarial) por segmento ou problema de negócio.
- **CTA**: Call-to-action — elemento que direciona o usuário para `/contato`.
- **WebP**: Formato de imagem moderno com boa compressão e qualidade, suportado nativamente pelo Next.js Image.
- **Server Component**: Componente React renderizado no servidor; padrão do projeto (Next.js App Router).
- **Client Component**: Componente React com `"use client"`, usado apenas quando há necessidade de estado, efeitos ou APIs de browser.
- **globals.css**: Único arquivo de estilos do projeto (`app/globals.css`); todo CSS novo deve ser adicionado aqui.
- **pt-BR**: Português do Brasil — idioma obrigatório para todas as strings voltadas ao usuário.

## Requirements

### Requisito 1: Menu de navegação atualizado

**User Story:** Como visitante do site, quero ver um menu de navegação claro e completo, para que eu possa acessar rapidamente todas as áreas relevantes da UNIDAX.

#### Critérios de Aceitação

1. THE SiteHeader SHALL exibir os seguintes itens de navegação, nesta ordem: "Home", "IA & Transformação", "Serviços", "Soluções", "Insights" e "A UNIDAX".
2. WHEN o item "Home" é clicado, THE SiteHeader SHALL navegar o usuário para a rota `/`.
3. WHEN o item "Soluções" é clicado, THE SiteHeader SHALL navegar o usuário para a rota `/solucoes`.
4. THE SiteHeader SHALL preservar todos os comportamentos existentes: scroll-aware, menu mobile com toggle, fechamento por tecla Escape e foco acessível.
5. THE SiteHeader SHALL manter o botão "Fale com um especialista" com link para `/contato` em todas as resoluções onde ele é exibido.
6. WHILE o menu mobile está aberto, THE SiteHeader SHALL ocultar o overflow do body e mostrar todos os seis itens de navegação com estilos adequados para toque.

---

### Requisito 2: Carrossel de imagens no hero

**User Story:** Como visitante da homepage, quero ver um hero dinâmico com carrossel de imagens, para que a página transmita modernidade e impacto visual logo no primeiro contato.

#### Critérios de Aceitação

1. THE Hero SHALL exibir um carrossel com as imagens `hero.webp`, `hero.png` e `home.png` já presentes em `public/assets/img/`, todas convertidas ou servidas em formato WebP (ou AVIF quando suportado pelo `next/image`).
2. THE Hero SHALL realizar transição automática entre as imagens do carrossel com intervalo de 5 segundos.
3. WHEN o usuário clica em um controle de navegação (anterior/próximo) ou em um indicador (ponto), THE Hero SHALL exibir a imagem correspondente e reiniciar o temporizador automático.
4. THE Hero SHALL exibir indicadores visuais (pontos ou traços) que comunicam quantas imagens existem e qual está ativa no momento.
5. WHILE `prefers-reduced-motion` está ativo, THE Hero SHALL desativar as transições animadas e a rotação automática do carrossel.
6. THE Hero SHALL preservar toda a sobreposição de conteúdo textual (título, subtítulo, CTAs, eyebrow) sobre as imagens do carrossel, mantendo legibilidade em todos os breakpoints.
7. THE Hero SHALL manter o overlay de gradiente existente sobre as imagens para garantir contraste do texto.
8. IF uma imagem do carrossel não carrega, THEN THE Hero SHALL exibir a próxima imagem disponível sem quebrar o layout.
9. THE HeroCarousel SHALL ser implementado como Client Component (usa `setInterval`, estado e eventos de clique), mantendo o resto da seção Hero como Server Component.

---

### Requisito 3: Visual moderno e incrementado no hero

**User Story:** Como visitante da homepage, quero um hero visualmente moderno e atraente, para que a UNIDAX transmita uma imagem de empresa inovadora.

#### Critérios de Aceitação

1. THE Hero SHALL manter os elementos existentes de conteúdo: eyebrow, h1 com destaque em negrito/gold, parágrafo descritivo, dois botões CTA e os quatro meta-badges.
2. THE Hero SHALL preservar o ecossistema visual animado com os seis nós (nodes) e conexões em telas a partir de 1020px de largura.
3. WHILE a largura de tela é menor que 700px, THE Hero SHALL ocultar o ecossistema visual de nós/conexões para priorizar o conteúdo textual.
4. THE Hero SHALL aplicar melhorias visuais incrementais (espaçamento, tipografia, animações suaves) por meio de adições em `globals.css` sem remover seletores CSS existentes.

---

### Requisito 4: Nova seção "Soluções" na homepage

**User Story:** Como visitante da homepage, quero ver uma seção de soluções que conecte IA e tecnologia empresarial a problemas de negócio concretos, para que eu possa identificar rapidamente a oferta mais relevante para minha empresa.

#### Critérios de Aceitação

1. THE Homepage SHALL exibir uma seção "Soluções" com no mínimo quatro cards, cada card representando uma combinação de IA + tecnologia aplicada a um problema ou segmento de negócio.
2. THE Homepage SHALL posicionar a seção "Soluções" após a seção de Metodologia e antes das seções de Serviços já existentes.
3. WHEN o usuário clica em um card de solução, THE Homepage SHALL navegar para a rota correspondente na área `/solucoes/[slug]` ou para `/contato` como fallback, sem retornar erro 404.
4. THE SolucoesSection SHALL ser implementada como Server Component e receber dados de `lib/content.ts` (nova constante `solutions`), sem dependências externas.
5. THE Homepage SHALL exibir a seção "Soluções" em grid de três colunas em desktop (≥ 1020px), duas colunas em tablet (700px–1019px) e uma coluna em mobile (< 700px).

---

### Requisito 5: Modernização visual incremental das seções existentes

**User Story:** Como visitante da homepage, quero que todas as seções do site tenham um visual coeso e moderno, para que a experiência seja consistente do início ao fim da página.

#### Critérios de Aceitação

1. THE Homepage SHALL preservar todas as seções existentes (Autoridade, Desafio, Metodologia, Serviços de IA, Ecossistema, Integração, Serviços Empresariais, Cases, Insights, CTA).
2. THE Homepage SHALL aplicar melhorias visuais somente via adições em `globals.css`, nunca removendo seletores CSS utilizados por outras páginas.
3. THE Homepage SHALL manter todos os links e CTAs existentes funcionando com as rotas corretas.
4. IF a seção Cases não possui casos publicados, THEN THE Homepage SHALL omitir essa seção sem exibir estado vazio ou erro.

---

### Requisito 6: Performance e qualidade de imagem

**User Story:** Como usuário mobile, quero que as imagens do hero carreguem rapidamente e com boa qualidade, para que a experiência seja fluida mesmo em conexões mais lentas.

#### Critérios de Aceitação

1. THE Hero SHALL servir todas as imagens do carrossel usando o componente `next/image` com otimização automática (WebP/AVIF via `next.config.ts` já configurado).
2. THE Hero SHALL definir `priority={true}` para a primeira imagem do carrossel e `loading="lazy"` para as demais, respeitando o comportamento padrão do `next/image`.
3. THE Hero SHALL especificar `sizes` adequados para cada breakpoint no componente `next/image`, garantindo que dispositivos mobile recebam imagens redimensionadas.
4. THE HeroCarousel SHALL pré-carregar as imagens do carrossel (via `<link rel="preload">` ou prop `priority`) para evitar flash de imagem branca na transição.

---

### Requisito 7: Acessibilidade e responsividade

**User Story:** Como usuário com necessidades de acessibilidade ou dispositivo mobile, quero que todas as funcionalidades novas e modificadas sejam acessíveis e responsivas, para que eu possa usar o site sem barreiras.

#### Critérios de Aceitação

1. THE HeroCarousel SHALL incluir `aria-label` descritivo em pt-BR nos controles de navegação (anterior/próximo) e nos indicadores de posição.
2. THE HeroCarousel SHALL manter o foco acessível: controles do carrossel devem ser alcançáveis por teclado (Tab) e ativáveis por Enter/Space.
3. THE SiteHeader SHALL manter os atributos `aria-label`, `aria-expanded` e `aria-controls` já presentes, atualizando apenas os labels dos novos itens de menu.
4. THE Homepage SHALL garantir que todos os textos sobre as imagens do carrossel atendam ao contraste mínimo WCAG AA (4.5:1 para texto normal).
5. THE Homepage SHALL ser funcional e visualmente coerente em viewports de 320px a 1440px de largura.
6. THE HeroCarousel SHALL pausar a rotação automática WHILE o usuário mantém foco em qualquer controle do carrossel.
