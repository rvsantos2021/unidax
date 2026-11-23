export const site = {
  name: "UNIDAX",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.unidax.com.br",
  email: process.env.CONTACT_TO || "contato@unidax.com.br",
  phone: process.env.CONTACT_PHONE || "",
  tagline: "IA aplicada à transformação e eficiência empresarial.",
  description:
    "UNIDAX transforma desafios empresariais em soluções de tecnologia, dados e inteligência artificial, da estratégia à implementação.",
};

export const stats = [
  ["+100", "clientes"],
  ["+300", "projetos"],
  ["+280K", "horas"],
  ["+35", "anos de experiência"],
] as const;

export const aiServices = [
  { number: "01", slug: "desenvolvimento", title: "Desenvolvimento de sistemas de IA personalizados", text: "Soluções desenhadas para processos, dados e objetivos específicos do negócio — com arquitetura preparada para produção e evolução." },
  { number: "02", slug: "consultoria", title: "Consultoria estratégica em IA e transformação digital", text: "Diagnóstico, priorização, roadmap e avaliação de viabilidade para transformar oportunidades de IA em iniciativas executáveis." },
  { number: "03", slug: "agentes", title: "Agentes de IA para empresas", text: "Agentes capazes de compreender contexto, consultar conhecimento, interagir com sistemas e executar tarefas sob regras de negócio." },
] as const;

export const methodology = [
  ["01", "Diagnóstico", "Entender antes de implementar."],
  ["02", "Estratégia", "Priorizar o que realmente importa."],
  ["03", "Piloto", "Provar antes de escalar."],
  ["04", "Implementação", "Transformar prova em operação."],
  ["05", "Evolução", "Fazer a inteligência crescer com o negócio."],
] as const;

export const ecosystem = ["OpenAI", "Azure AI", "Microsoft Copilot", "Anthropic", "Google", "AWS", "Modelos Open Source", "Agentes de IA", "RAG & integrações"];

export const enterpriseServices = [
  ["ERP & Dynamics", "Implementação, evolução, integração e sustentação."],
  ["Desenvolvimento de sistemas", "Soluções personalizadas para necessidades específicas."],
  ["Data & Analytics", "Dados transformados em informação para decisões melhores."],
  ["Power Platform", "Automação, aplicações e produtividade empresarial."],
  ["Outsourcing & Squads", "Especialistas para acelerar projetos e iniciativas."],
  ["Suporte & Sustentação", "Continuidade, evolução e confiabilidade tecnológica."],
] as const;

export const clients = ["Simpress", "UniCeub", "AMIB", "SNEF", "Cinemark"];

export type Case = {
  slug: string; client: string; title: string; category: string; summary: string; status: "published" | "draft";
};
export const cases: Case[] = [
  { slug: "simpress", client: "Simpress", title: "Transformação e eficiência operacional", category: "Tecnologia empresarial", summary: "Case em construção com desafio, solução, tecnologia e resultados autorizados pelo cliente.", status: "draft" },
  { slug: "uniceub", client: "UniCeub", title: "Dados e inteligência para decisões", category: "Data & Analytics", summary: "Case em construção com contexto, arquitetura e indicadores validados para publicação.", status: "draft" },
  { slug: "amib", client: "AMIB", title: "Integração e automação", category: "Integração", summary: "Case em construção com escopo, solução e resultados autorizados pelo cliente.", status: "draft" },
];


export type PortableTextBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: "bullet" | "number";
  children?: { _type?: string; _key?: string; text?: string; marks?: string[] }[];
  markDefs?: { _key: string; _type?: string; href?: string }[];
};
export type Insight = {
  slug: string; tag: string; title: string; meta: string; excerpt: string; publishedAt: string; status: "published" | "draft"; content: string[] | PortableTextBlock[];
};
export const insights: Insight[] = [
  { slug: "processos-automatizados-com-ia", tag: "IA", title: "Como identificar processos que realmente deveriam ser automatizados com IA", meta: "Estratégia · 8 min", excerpt: "Um framework prático para separar automação de oportunidade real de inteligência artificial.", publishedAt: "2026-10-01", status: "published", content: ["Nem todo processo manual precisa de IA. O primeiro filtro é entender o volume, a variabilidade, o custo da decisão e a disponibilidade de dados.", "A oportunidade fica mais interessante quando existe contexto não estruturado, necessidade de interpretação ou decisões recorrentes que podem ser apoiadas por modelos e agentes.", "Antes de escalar, defina uma métrica operacional, construa um piloto controlado e valide segurança, governança e experiência do usuário."] },
  { slug: "nova-geracao-agentes-ia", tag: "Agentes", title: "Chatbots ficaram para trás? Entenda a nova geração de agentes de IA", meta: "IA · 7 min", excerpt: "O que diferencia uma interface conversacional de um agente capaz de executar tarefas e operar com contexto.", publishedAt: "2026-09-24", status: "published", content: ["Chatbots respondem. Agentes podem planejar, consultar fontes, usar ferramentas e executar etapas sob regras definidas.", "Em ambientes empresariais, isso exige integração com sistemas, controle de permissões, observabilidade e limites claros de autonomia.", "O ponto de partida continua sendo o processo de negócio: a arquitetura do agente deve servir ao fluxo, não o contrário."] },
  { slug: "roadmap-ia-sem-desperdicio", tag: "Transformação", title: "Como construir um roadmap de IA sem desperdiçar investimento", meta: "Estratégia · 6 min", excerpt: "Como priorizar iniciativas de IA por valor, viabilidade, risco e capacidade de execução.", publishedAt: "2026-09-17", status: "published", content: ["Um roadmap de IA precisa equilibrar impacto potencial e capacidade de execução. Comece com um portfólio pequeno de hipóteses.", "Classifique cada iniciativa por valor, complexidade, dependências de dados, risco e tempo para aprender.", "Pilotos bem escolhidos criam evidência para decidir onde investir — e onde não investir."] },
  { slug: "qualidade-dados-projetos-ia", tag: "Dados", title: "Por que a qualidade dos dados determina o sucesso de um projeto de IA", meta: "Dados · 6 min", excerpt: "Dados confiáveis, contexto e governança são parte da engenharia de IA, não uma etapa opcional.", publishedAt: "2026-09-10", status: "published", content: ["Modelos sofisticados não compensam dados incompletos, inconsistentes ou sem contexto operacional.", "Antes de treinar, recuperar ou conectar um modelo, avalie origem, qualidade, atualização, permissões e significado dos dados.", "Uma boa arquitetura de IA inclui governança e observabilidade desde o primeiro piloto."] },
];

export function getPublishedInsights() { return insights.filter((item) => item.status === "published"); }
export function getInsight(slug: string) { return insights.find((item) => item.slug === slug && item.status === "published"); }
export function getCase(slug: string) { return cases.find((item) => item.slug === slug); }

export type Solution = {
  slug: string;
  title: string;
  text: string;
  tags: string[];
  href: string;
};

export const solutions: Solution[] = [
  {
    slug: "ia-erp",
    title: "IA + ERP: decisões inteligentes no coração do negócio",
    text: "Integre inteligência artificial ao seu ERP para automatizar processos, antecipar demandas e apoiar decisões com dados em tempo real.",
    tags: ["IA", "ERP & Dynamics"],
    href: "/contato",
  },
  {
    slug: "agentes-atendimento",
    title: "Agentes de IA para atendimento e suporte",
    text: "Automatize triagem, resposta e encaminhamento com agentes conectados à base de conhecimento e aos sistemas da empresa.",
    tags: ["Agentes", "Suporte"],
    href: "/contato",
  },
  {
    slug: "dados-ia",
    title: "Dados + IA: da informação à ação",
    text: "Una uma camada analítica robusta com modelos de IA para transformar dados operacionais em recomendações e alertas automáticos.",
    tags: ["Dados", "IA"],
    href: "/contato",
  },
  {
    slug: "automacao-processos",
    title: "Automação inteligente de processos",
    text: "Combine Power Platform e IA para automatizar fluxos repetitivos, reduzir erros manuais e liberar equipes para trabalho de maior valor.",
    tags: ["Power Platform", "IA"],
    href: "/contato",
  },
];

// ─────────────────────────────────────────────
// Página /solucoes
// ─────────────────────────────────────────────

export type FullSolution = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  capabilities: string[];
  href: string;
};

export const solutionsPage = {
  solutions: [
    {
      slug: "ia-erp",
      title: "IA + ERP",
      tagline: "Decisão inteligente no coração da operação",
      description: "Integra IA ao Dynamics 365 para automação, previsão de demanda e apoio à decisão em tempo real. Reduz ciclos de aprovação, antecipa rupturas e conecta inteligência ao fluxo operacional.",
      capabilities: ["Integração IA-ERP", "Previsão de demanda", "Automação de aprovações", "Relatórios inteligentes", "Alertas preditivos"],
      href: "/contato",
    },
    {
      slug: "agentes-atendimento",
      title: "Agentes para Atendimento",
      tagline: "Atendimento que aprende, escalona e resolve",
      description: "Agentes conectados à base de conhecimento e sistemas para triagem e resolução autônoma. Reduz volume humano nos casos de baixa complexidade sem perder a qualidade.",
      capabilities: ["Agentes de triagem", "Base de conhecimento RAG", "Integração com CRM", "Escalada inteligente", "Relatórios de atendimento"],
      href: "/contato",
    },
    {
      slug: "dados-ia",
      title: "Dados + IA",
      tagline: "Da informação dispersa à inteligência acionável",
      description: "Camada analítica + IA para transformar dados operacionais em alertas e recomendações. Une governança de dados com modelos que geram insights no momento certo.",
      capabilities: ["Data lakehouse", "Modelos preditivos", "Dashboards IA-driven", "Alertas automáticos", "Governança de dados"],
      href: "/contato",
    },
    {
      slug: "automacao-processos",
      title: "Automação Inteligente",
      tagline: "Liberte sua equipe do trabalho repetitivo",
      description: "Power Platform + IA para eliminar gargalos manuais e automatizar fluxos. Extrai dados de documentos, valida regras de negócio e integra sistemas sem intervenção humana.",
      capabilities: ["Power Automate + IA", "Extração de documentos", "Aprovações automáticas", "Integração de sistemas", "Monitoramento de fluxos"],
      href: "/contato",
    },
    {
      slug: "transformacao-digital",
      title: "Transformação Digital",
      tagline: "Modernize a operação sem parar o negócio",
      description: "Projetos que conectam sistemas, dados e pessoas com estratégia e execução integradas. Da arquitetura à adoção, com gestão de mudança e sustentação contínua.",
      capabilities: ["Arquitetura de sistemas", "Migração de dados", "Integração via API", "Gestão de mudança", "Sustentação contínua"],
      href: "/contato",
    },
    {
      slug: "ia-produtividade",
      title: "IA para Produtividade",
      tagline: "Sua equipe com superpoderes de IA",
      description: "Copilot, busca semântica interna e assistentes por função para acelerar trabalho de conhecimento. Reduz tempo em tarefas repetitivas e eleva a qualidade das entregas.",
      capabilities: ["Microsoft Copilot", "Busca semântica interna", "Resumo de documentos", "Assistentes por função", "Treinamento e adoção"],
      href: "/contato",
    },
  ] as FullSolution[],

  differentials: [
    { title: "Orientada a resultado", text: "Cada solução parte de um problema de negócio definido e tem métricas de sucesso acordadas antes do início." },
    { title: "Integrada ao negócio", text: "Conectamos estratégia, dados, sistemas e pessoas — sem tratar IA como camada separada da operação." },
    { title: "Preparada para escalar", text: "Arquiteturas pensadas para evoluir: do piloto à operação plena, sem refazer do zero." },
  ],

  methodology: [
    { num: "01", title: "Diagnóstico", text: "Mapeamos o problema, os dados disponíveis e as restrições antes de propor qualquer tecnologia." },
    { num: "02", title: "Desenho da solução", text: "Definimos arquitetura, integrações, critérios de sucesso e o plano de implementação." },
    { num: "03", title: "Piloto", text: "Validamos o valor em escala controlada antes de comprometer investimento e equipe." },
    { num: "04", title: "Escala", text: "Expandimos com governança, monitoramento contínuo e plano de evolução acordado." },
  ],

  segments: [
    {
      title: "Educação",
      bullets: ["Agentes para suporte a alunos e coordenação acadêmica", "Automação de processos administrativos e rematrícula"],
    },
    {
      title: "Saúde",
      bullets: ["Triagem inteligente e assistência a prontuários", "Analytics preditivo para gestão de leitos e recursos"],
    },
    {
      title: "Varejo e Distribuição",
      bullets: ["Previsão de demanda e reposição automática", "Automação de atendimento e fidelização com IA"],
    },
    {
      title: "Serviços Financeiros",
      bullets: ["Análise de crédito e detecção de anomalias com IA", "Automação de compliance e processamento de documentos"],
    },
    {
      title: "Indústria",
      bullets: ["Manutenção preditiva e qualidade assistida por IA", "Integração ERP + chão de fábrica com agentes inteligentes"],
    },
  ],
};
