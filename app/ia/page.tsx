import Link from "next/link";
import {
  ArrowIcon, SparkIcon, BotIcon, DatabaseIcon, FlowIcon,
  LayersIcon, ShieldIcon, TargetIcon, UsersIcon, GaugeIcon, LockIcon,
} from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { CtaSection } from "@/components/cta-section";
import { DarkPanel } from "@/components/dark-panel";
import { aiServices, ecosystem, methodology } from "@/lib/content";
import { aiLandingPages } from "@/lib/seo-content";

export const metadata = {
  title: "IA & Transformação | UNIDAX",
  description:
    "Transforme sua empresa com Inteligência Artificial aplicada ao negócio. A UNIDAX é sua parceira para a jornada AI First — da estratégia ao deploy em produção.",
};

/* ─────────────────────────────────────────────────────────────
   Dados
───────────────────────────────────────────────────────────── */

const impactStats = [
  { value: "73%",     label: "das Frontier Firms crescem acima da média do setor após adoção estrutural de IA" },
  { value: "3.4×",   label: "maior ROI em projetos de IA quando precedidos de diagnóstico estratégico" },
  { value: "68%",    label: "das tarefas repetitivas de gestão e análise são elegíveis à automação inteligente" },
  { value: "12 sem.",label: "tempo médio do piloto ao resultado mensurável com metodologia UNIDAX" },
] as const;

/** As quatro perguntas que definem o sucesso de qualquer projeto de IA */
const fourQuestions = [
  {
    num: "01",
    icon: <TargetIcon />,
    question: "Qual problema estamos resolvendo?",
    answer:
      "IA sem problema definido é experimento sem destino. A pergunta certa não é \u201cque modelo usar?\u201d, mas \u201cqual processo tem alta frequência, variabilidade controlável e impacto mensurável?\u201d. O diagnóstico começa aqui.",
    tag: "Problema",
    color: "#dc2747",
  },
  {
    num: "02",
    icon: <UsersIcon />,
    question: "Quem responde pelo processo?",
    answer:
      "Todo projeto de IA que funciona tem um dono de processo — alguém que conhece as exceções, valida os critérios de qualidade e responde pelo resultado operacional. Sem esse ator, a IA fica na prova de conceito para sempre.",
    tag: "Governança",
    color: "#f4ad1b",
  },
  {
    num: "03",
    icon: <GaugeIcon />,
    question: "Qual indicador deve mudar?",
    answer:
      "Sem métrica de negócio definida antes de começar, não há como saber se o projeto funcionou. Tempo, custo, taxa de erro, NPS, retrabalho: o indicador precisa existir, ser medido hoje e poder ser comparado depois do deploy.",
    tag: "Métricas",
    color: "#177245",
  },
  {
    num: "04",
    icon: <LockIcon />,
    question: "Quais controles permitem operar com segurança?",
    answer:
      "Autonomia sem controle é risco. Cada solução de IA precisa de limites claros: o que o modelo pode decidir sozinho, onde há supervisão humana, como auditar decisões, quem acessa os dados e o que acontece quando o modelo erra.",
    tag: "Controles",
    color: "#5b6ef0",
  },
] as const;

const frontierPoints = [
  {
    icon: <LayersIcon />,
    title: "IA integrada à estratégia",
    text: "Frontier Firms não usam IA como ferramenta pontual. Elas redesenham processos, produtos e modelos de negócio em torno das capacidades de IA \u2014 criando vantagem competitiva difícil de copiar.",
  },
  {
    icon: <FlowIcon />,
    title: "Fluxos de trabalho augmentados",
    text: "Cada processo crítico é revisitado com a pergunta: onde a IA amplia a capacidade humana? O resultado são equipes menores fazendo mais, com mais qualidade e menos retrabalho.",
  },
  {
    icon: <DatabaseIcon />,
    title: "Dados como ativo estratégico",
    text: "A base de qualquer Frontier Firm é a qualidade e o contexto dos dados. Governança, integração e semântica dos dados precedem \u2014 e garantem \u2014 a performance dos modelos.",
  },
  {
    icon: <ShieldIcon />,
    title: "Governança e responsabilidade",
    text: "Adotar IA de forma profunda exige controles claros: auditabilidade, limites de autonomia, supervisão humana nos pontos certos e conformidade com regulações de privacidade.",
  },
] as const;

const aiFirstPillars = [
  { num: "01", title: "Diagnóstico estratégico", text: "Identificar onde a IA cria valor real para o negócio antes de escolher tecnologia." },
  { num: "02", title: "Dados prontos para IA",   text: "Garantir qualidade, contexto e governança dos dados que vão alimentar os modelos." },
  { num: "03", title: "Piloto com critério",      text: "Provar valor com métricas de negócio antes de escalar investimento e equipe." },
  { num: "04", title: "Integração sistêmica",     text: "Conectar IA aos sistemas, processos e pessoas que vão usar a solução no dia a dia." },
  { num: "05", title: "Escala responsável",       text: "Expandir com governança, monitoramento, limites de autonomia e melhoria contínua." },
  { num: "06", title: "Evolução contínua",        text: "Revisitar resultados, ajustar modelos e incorporar novas capacidades à medida que o negócio evolui." },
] as const;

const useCases = [
  { icon: <BotIcon />,      title: "Atendimento e suporte inteligente",    text: "Agentes que compreendem contexto, consultam bases de conhecimento e resolvem demandas sem intervenção humana para casos de baixa complexidade." },
  { icon: <FlowIcon />,     title: "Automação de processos cognitivos",    text: "Classificação de documentos, extração de dados, triagem de solicitações e geração de relatórios \u2014 tarefas que consomem horas viram segundos." },
  { icon: <DatabaseIcon />, title: "Análise preditiva e decisão assistida",text: "Modelos que antecipam demanda, identificam riscos e recomendam ações \u2014 com transparência sobre a confiança e os limites da predição." },
  { icon: <SparkIcon />,    title: "Geração e revisão de conteúdo",        text: "Produção, tradução, revisão e personalização de textos, contratos e comunicações com supervisão humana nos pontos que importam." },
  { icon: <LayersIcon />,   title: "Busca e recuperação de conhecimento",  text: "Sistemas RAG que conectam colaboradores às informações certas, no momento certo, de documentos técnicos, manuais e bases internas." },
  { icon: <ShieldIcon />,   title: "Compliance e gestão de risco",         text: "Monitoramento contínuo de contratos, regulações e políticas internas \u2014 sinalizando desvios antes que se tornem problemas." },
] as const;

/* ─────────────────────────────────────────────────────────────
   SVG Illustrations (inline — sem dependência de arquivo)
───────────────────────────────────────────────────────────── */

/** Diagrama de rede neural estilizado para a seção Frontier Firm */
function NeuralNetSVG() {
  return (
    <svg viewBox="0 0 420 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ia-svg-illustration">
      {/* Camada input */}
      {[60, 110, 160, 210, 260].map((y, i) => (
        <g key={`in-${i}`}>
          <circle cx="60" cy={y} r="14" fill="#0d1b24" stroke="rgba(220,39,71,0.6)" strokeWidth="1.5"/>
          <circle cx="60" cy={y} r="6" fill="rgba(220,39,71,0.35)"/>
        </g>
      ))}
      {/* Camada hidden 1 */}
      {[80, 140, 200, 260].map((y, i) => (
        <g key={`h1-${i}`}>
          <circle cx="175" cy={y} r="16" fill="#0d1b24" stroke="rgba(244,173,27,0.55)" strokeWidth="1.5"/>
          <circle cx="175" cy={y} r="7" fill="rgba(244,173,27,0.3)"/>
        </g>
      ))}
      {/* Camada hidden 2 */}
      {[100, 170, 240].map((y, i) => (
        <g key={`h2-${i}`}>
          <circle cx="290" cy={y} r="18" fill="#0d1b24" stroke="rgba(91,110,240,0.6)" strokeWidth="1.5"/>
          <circle cx="290" cy={y} r="8" fill="rgba(91,110,240,0.3)"/>
        </g>
      ))}
      {/* Output */}
      <circle cx="380" cy="170" r="22" fill="#0d1b24" stroke="rgba(220,39,71,0.9)" strokeWidth="2"/>
      <circle cx="380" cy="170" r="10" fill="rgba(220,39,71,0.5)"/>

      {/* Conexões input → h1 */}
      {[60, 110, 160, 210, 260].flatMap((y1, i) =>
        [80, 140, 200, 260].map((y2, j) => (
          <line key={`c1-${i}-${j}`} x1="74" y1={y1} x2="159" y2={y2} stroke="rgba(255,255,255,0.055)" strokeWidth="1"/>
        ))
      )}
      {/* Conexões h1 → h2 */}
      {[80, 140, 200, 260].flatMap((y1, i) =>
        [100, 170, 240].map((y2, j) => (
          <line key={`c2-${i}-${j}`} x1="191" y1={y1} x2="272" y2={y2} stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>
        ))
      )}
      {/* Conexões h2 → output (destacadas) */}
      {[100, 170, 240].map((y, i) => (
        <line key={`c3-${i}`} x1="308" y1={y} x2="358" y2="170"
          stroke={i === 1 ? "rgba(220,39,71,0.7)" : "rgba(255,255,255,0.1)"} strokeWidth={i === 1 ? 2 : 1}/>
      ))}

      {/* Labels */}
      <text x="60" y="285" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="system-ui">Input</text>
      <text x="175" y="285" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="system-ui">Camadas ocultas</text>
      <text x="380" y="205" textAnchor="middle" fill="rgba(220,39,71,0.7)" fontSize="9" fontFamily="system-ui">Output</text>
    </svg>
  );
}

/** Gráfico de barras animado para a seção AI First */
function MetricBarsSVG() {
  const bars = [
    { x: 40,  h: 60,  label: "Antes", color: "rgba(255,255,255,0.18)" },
    { x: 100, h: 95,  label: "Piloto", color: "rgba(244,173,27,0.55)" },
    { x: 160, h: 130, label: "Escala", color: "rgba(220,39,71,0.7)" },
    { x: 220, h: 160, label: "Matur.", color: "rgba(220,39,71,0.95)" },
  ];
  return (
    <svg viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="ia-svg-illustration ia-svg-sm">
      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line key={y} x1="20" y1={200 - y} x2="280" y2={200 - y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="4 4"/>
      ))}
      {/* Bars */}
      {bars.map((b) => (
        <g key={b.label}>
          <rect x={b.x} y={200 - b.h - 20} width="44" height={b.h} rx="6" fill={b.color}/>
          <text x={b.x + 22} y="195" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8" fontFamily="system-ui">{b.label}</text>
        </g>
      ))}
      {/* Trend line */}
      <polyline points="62,124 122,89 182,54 242,24" stroke="rgba(244,173,27,0.8)" strokeWidth="2" strokeDasharray="5 3" fill="none"/>
      {[62, 122, 182, 242].map((x, i) => {
        const ys = [124, 89, 54, 24];
        return <circle key={x} cx={x} cy={ys[i]} r="4" fill="#f4ad1b"/>;
      })}
      <text x="150" y="18" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="system-ui">ROI acumulado ao longo da jornada AI First</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   Página
───────────────────────────────────────────────────────────── */

export default function IaPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <PageHero
        eyebrow="IA & Transformação"
        title="Sua empresa pode ser uma Frontier Firm."
        text="A UNIDAX transforma negócios com Inteligência Artificial — da estratégia AI First ao deploy em produção. Não vendemos tecnologia: construímos a solução para o seu desafio."
      />

      {/* ── Impacto em números ── */}
      <section className="section-sm ia-impact-bar">
        <div className="container">
          <div className="ia-impact-grid">
            {impactStats.map((s) => (
              <Reveal key={s.value}>
                <div className="ia-impact-item">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── O que fazemos ── */}
      <section className="section">
        <div className="container content-intro">
          <Reveal>
            <div className="eyebrow">O que fazemos</div>
            <h2>Não vendemos uma ferramenta.<br />Construímos a solução para o seu desafio.</h2>
            <p>
              Modelos e plataformas mudam rapidamente. Nosso papel é entender o processo,
              os dados, as restrições e o resultado esperado — e então selecionar arquitetura,
              tecnologia e forma de implementação. O objetivo é sempre o mesmo: IA que funciona
              em produção e gera resultado mensurável para o negócio.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Serviços de IA ── */}
      <section className="section services" id="desenvolvimento">
        <div className="container">
          <div className="detail-grid">
            {aiServices.map((s, i) => (
              <Reveal key={s.number} delay={i * 70}>
                <article className="detail-card">
                  <span className="number">{s.number}</span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                  <Link className="link" href={`/ia/${aiLandingPages[i]?.slug ?? ""}`}>
                    Conhecer a abordagem <ArrowIcon />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ── As 4 perguntas que definem o sucesso ──
          Posicionada logo após os serviços, antes do conceito
          Frontier Firm — funciona como filtro diagnóstico
      ══════════════════════════════════════════════════════ */}
      <section className="section ia-4q" id="quatro-perguntas">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Antes de implementar</div>
            <h2>4 perguntas que definem o sucesso de qualquer projeto de IA.</h2>
            <p className="content-intro" style={{ marginTop: 14 }}>
              A maioria dos projetos de IA falha antes do primeiro deploy. Não por falta de tecnologia
              — por falta de clareza. Na UNIDAX, todo engajamento começa respondendo estas quatro
              questões. Elas separam iniciativas que chegam à produção das que ficam no piloto eterno.
            </p>
          </Reveal>

          <div className="ia-4q-grid">
            {fourQuestions.map((q, i) => (
              <Reveal key={q.num} delay={i * 80}>
                <div className="ia-4q-card">
                  <div className="ia-4q-header">
                    <div className="ia-4q-icon" style={{ color: q.color, background: `${q.color}18` }}>
                      {q.icon}
                    </div>
                    <span className="ia-4q-tag" style={{ color: q.color }}>{q.tag}</span>
                    <span className="ia-4q-num">{q.num}</span>
                  </div>
                  <h3>{q.question}</h3>
                  <p>{q.answer}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Frase de reforço */}
          <Reveal>
            <div className="ia-4q-callout">
              <div className="ia-4q-callout-icon"><SparkIcon /></div>
              <div>
                <strong>Não sabe responder todas as quatro?</strong>
                <p>
                  Isso é normal — e é exatamente onde começa o trabalho da UNIDAX. O diagnóstico
                  inicial responde essas perguntas antes de qualquer linha de código.
                </p>
                <Link className="link" href="/contato">
                  Iniciar o diagnóstico <ArrowIcon />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Frontier Firm ── */}
      <section className="section ia-frontier" id="frontier-firm">
        <div className="container">
          <div className="ia-frontier-layout">
            {/* Coluna texto */}
            <div className="ia-frontier-text">
              <Reveal>
                <div className="eyebrow">Frontier Firm</div>
                <h2>O que separa as empresas que lideram das que ficam para trás.</h2>
                <p style={{ marginTop: 16, fontSize: 14, lineHeight: 1.75 }}>
                  O termo <strong>Frontier Firm</strong> — popularizado pelo MIT Work of the Future e pelo
                  relatório Work Trend Index da Microsoft — descreve organizações que adotam IA de forma
                  profunda e estrutural, não apenas como automação pontual. Essas empresas redesenham
                  processos inteiros, integram IA à tomada de decisão e criam capacidades que os
                  concorrentes levam anos para replicar.
                </p>
              </Reveal>
              <div className="ia-frontier-grid" style={{ marginTop: 32 }}>
                {frontierPoints.map((p, i) => (
                  <Reveal key={p.title} delay={i * 70}>
                    <div className="ia-frontier-card">
                      <div className="iconbox" style={{ marginBottom: 14 }}>{p.icon}</div>
                      <h3>{p.title}</h3>
                      <p>{p.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Coluna visual */}
            <Reveal delay={120} className="ia-frontier-visual">
              <div className="ia-visual-panel">
                <div className="ia-visual-label">Arquitetura de uma Frontier Firm</div>
                <NeuralNetSVG />
                <div className="ia-visual-legend">
                  {[
                    { color: "rgba(220,39,71,0.8)", label: "Dados & contexto" },
                    { color: "rgba(244,173,27,0.8)", label: "Modelos & agentes" },
                    { color: "rgba(91,110,240,0.8)", label: "Integrações" },
                  ].map((l) => (
                    <span key={l.label} className="ia-legend-item">
                      <i style={{ background: l.color }} />
                      {l.label}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bloco de destaque Frontier Firm */}
          <Reveal>
            <div className="ia-frontier-quote">
              <SparkIcon />
              <blockquote>
                &ldquo;Frontier Firms não são as maiores empresas — são as mais rápidas em transformar
                capacidades de IA em vantagem competitiva real. E a janela para entrar nesse grupo
                está se fechando.&rdquo;
              </blockquote>
              <cite>— Síntese UNIDAX sobre Work Trend Index, Microsoft 2024</cite>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AI First ── */}
      <div id="ai-first">
        <DarkPanel className="ia-aifirst" eyebrow="AI First" title="Uma estratégia, não uma ferramenta.">
          <div className="ia-aifirst-layout">
            <div className="ia-aifirst-text">
              <p style={{ maxWidth: 560, marginTop: 16 }}>
                Ser <strong style={{ color: "#fff" }}>AI First</strong> significa colocar a inteligência
                artificial no centro das decisões de negócio, de produto e de operação — antes de
                escolher a tecnologia. É uma postura estratégica: toda nova iniciativa começa pela
                pergunta &ldquo;como a IA pode ampliar o valor entregue aqui?&rdquo;, não pelo departamento de TI.
              </p>
              <p style={{ maxWidth: 560 }}>
                Empresas AI First constroem vantagem composta: cada modelo treinado, cada dado governado,
                cada processo augmentado torna a próxima iniciativa mais barata e mais rápida de entregar.
              </p>
            </div>
            <Reveal delay={100} className="ia-aifirst-chart">
              <div className="ia-visual-panel ia-visual-panel--dark">
                <div className="ia-visual-label ia-visual-label--light">Progressão de valor na jornada AI First</div>
                <MetricBarsSVG />
              </div>
            </Reveal>
          </div>

          <div className="ia-aifirst-pillars">
            {aiFirstPillars.map((p, i) => (
              <Reveal key={p.num} delay={i * 60}>
                <div className="bullet">
                  <strong>{p.num} · {p.title}</strong>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </DarkPanel>
      </div>

      {/* ── Casos de uso ── */}
      <section className="section" id="casos-de-uso">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Casos de uso</div>
            <h2>Onde a IA já entrega resultado nas empresas.</h2>
            <p className="content-intro" style={{ marginTop: 12 }}>
              Não existe um único caminho para adotar IA. Existe o caminho certo para o seu negócio,
              seus dados e seus objetivos. Estes são alguns dos casos que a UNIDAX implementa hoje.
            </p>
          </Reveal>
          <div className="ia-usecase-grid" style={{ marginTop: 40 }}>
            {useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 60}>
                <div className="problem">
                  <div className="iconbox">{u.icon}</div>
                  <b>{u.title}</b>
                  <p>{u.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metodologia ── */}
      <div id="metodologia">
        <DarkPanel
          eyebrow="Metodologia"
          title="Da primeira hipótese à operação."
        >
          <p className="content-intro">
            Cada etapa reduz incerteza e aumenta a clareza sobre valor, risco, viabilidade técnica
            e adoção. Nenhum cliente escala antes de ter evidência.
          </p>
          <div className="bullet-list">
            {methodology.map(([n, t, p], i) => (
              <Reveal key={n} delay={i * 60}>
                <div className="bullet">
                  <strong>{n} · {t}</strong>
                  <p>{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </DarkPanel>
      </div>

      {/* ── Ecossistema ── */}
      <section className="section" id="tecnologias">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Ecossistema</div>
            <h2>A tecnologia certa para cada cenário.</h2>
            <p className="content-intro">
              Trabalhamos com diferentes fornecedores, modelos e arquiteturas para evitar decisões
              baseadas em moda ou dependência de uma única plataforma. O modelo é escolhido depois
              que o problema está claro.
            </p>
          </Reveal>
          <div className="tech-cloud" style={{ marginTop: 40 }}>
            {ecosystem.map((e, i) => (
              <Reveal key={e} delay={i % 3 * 60}>
                <div className="tech-item" style={{ background: "#fff", borderColor: "#e4e8ec", color: "#15212a" }}>
                  <span className="tech-icon">{e.slice(0, 2)}</span>
                  {e}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Por que UNIDAX ── */}
      <section className="section ia-why" id="por-que-unidax">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Por que UNIDAX</div>
            <h2>35 anos construindo tecnologia que funciona na prática.</h2>
          </Reveal>
          <div className="ia-why-grid" style={{ marginTop: 40 }}>
            {/* Coluna de texto */}
            <Reveal>
              <div className="ia-why-text">
                <p>
                  A maioria dos projetos de IA falha não por falta de tecnologia, mas por falta de
                  contexto de negócio. A UNIDAX existe na interseção entre estratégia e engenharia:
                  entendemos o processo antes de escolher o modelo.
                </p>
                <p>
                  Com mais de 300 projetos entregues e +280 mil horas de experiência em transformação
                  digital, nosso diferencial é saber onde a IA gera valor real — e onde ela não
                  justifica o investimento.
                </p>
                <p>
                  Somos independentes de plataforma. Escolhemos a arquitetura que melhor serve o seu
                  caso de uso: modelos proprietários, open source, fine-tuning, RAG, agentes — o que
                  o problema exigir.
                </p>
                <Link className="btn btn-primary" href="/contato" style={{ marginTop: 12 }}>
                  Falar com a UNIDAX <ArrowIcon />
                </Link>
              </div>
            </Reveal>

            {/* Coluna de checkpoints */}
            <Reveal delay={80}>
              <div className="ia-why-points">
                {([
                  ["Independência de plataforma", "Escolhemos o melhor stack para cada problema, sem viés de fornecedor."],
                  ["Visão end-to-end", "Da estratégia ao deploy: estratégia, dados, engenharia e adoção em um único parceiro."],
                  ["Foco em produção", "Pilotos são ponto de partida, não destino. Nosso critério é o que funciona em operação."],
                  ["Expertise setorial", "+35 anos em empresas brasileiras de todos os setores — contexto que modelos não têm."],
                ] as const).map(([t, d]) => (
                  <div key={t} className="ia-why-point">
                    <div className="ia-why-check">✓</div>
                    <div>
                      <b>{t}</b>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        title="Tem um caso de uso em mente?"
        text="Vamos avaliar problema, dados, viabilidade e próximo passo — sem compromisso."
        label="Falar com a UNIDAX"
      />

    </main>
  );
}


