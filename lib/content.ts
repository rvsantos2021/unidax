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

export type Insight = {
  slug: string; tag: string; title: string; meta: string; excerpt: string; publishedAt: string; status: "published" | "draft"; content: string[];
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
