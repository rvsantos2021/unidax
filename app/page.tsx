import type { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowIcon, BotIcon, DatabaseIcon, FlowIcon,
  LayersIcon, ShieldIcon, SparkIcon,
} from "@/components/icons";
import { Reveal } from "@/components/reveal";
import {
  aiServices, clients, ecosystem,
  enterpriseServices, methodology, stats,
} from "@/lib/content";
import { aiLandingPages } from "@/lib/seo-content";
import { getCasesCMS, getPublishedInsightsCMS } from "@/lib/cms";

/* ── Ícone por tag de insight ───────────────────────────── */
const tagIcon: Record<string, ReactElement> = {
  IA:            <SparkIcon />,
  Agentes:       <BotIcon />,
  Transformacao: <LayersIcon />,
  Dados:         <DatabaseIcon />,
};

function tagClass(tag: string) {
  const map: Record<string, string> = {
    IA: "ia", Agentes: "agentes", Transformacao: "transformacao", Dados: "dados",
  };
  return `article-art article-art--${map[tag] ?? "ia"}`;
}

/* ── Variante visual por serviço IA ─────────────────────── */
const serviceArtVariant = ["dev", "consult", "agents"] as const;

/* ── Labels individuais dos cards de IA ─────────────────── */
const serviceLabels = [
  "01 · ENGENHARIA DE IA",
  "02 · ESTRATÉGIA",
  "03 · AGENTES INTELIGENTES",
] as const;

export default async function Home() {
  const [cases, insights] = await Promise.all([
    getCasesCMS(),
    getPublishedInsightsCMS(),
  ]);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow light">
              Inteligência artificial · Tecnologia · Transformação
            </div>
            <h1>
              IA aplicada à{" "}
              <strong>transformação e eficiência empresarial.</strong>
            </h1>
            <p>
              Transformamos desafios empresariais em soluções inteligentes,
              combinando estratégia, dados, sistemas e inteligência artificial
              para gerar eficiência, produtividade e resultados reais.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contato">
                Descubra onde a IA pode gerar valor <ArrowIcon />
              </Link>
              <Link className="btn btn-outline" href="/ia#metodologia">
                Conheça nossa abordagem
              </Link>
            </div>
            <div className="hero-meta">
              <span><i />Estratégia</span>
              <span><i />Engenharia</span>
              <span><i />IA aplicada</span>
              <span><i />Evolução contínua</span>
            </div>
          </div>

          <div
            className="hero-visual"
            aria-label="Ecossistema de inteligência artificial conectado ao negócio"
          >
            <div
              className="ai-core"
              style={{
                position: "absolute", left: "50%", top: "50%",
                width: "110px", height: "110px",
                transform: "translate(-50%,-50%)", borderRadius: "24px",
                backgroundColor: "transparent",
                boxShadow: "0 0 55px rgba(200,30,60,.65),0 0 110px rgba(180,20,50,.28)",
                display: "grid", placeItems: "center", zIndex: 4, overflow: "hidden",
              }}
            >
              <div className="ring" />
              <div className="ring ring2" />
              <div className="ring ring3" />
              <Image
                src="/assets/img/logo.png"
                alt=""
                width={70}
                height={70}
                style={{ display: "block", position: "relative", zIndex: 1 }}
              />
            </div>

            {(
              [
                ["Dados",     "informação e contexto",    DatabaseIcon, "n1"],
                ["IA",        "modelos e agentes",        SparkIcon,    "n2"],
                ["Processos", "automação e eficiência",   FlowIcon,     "n3"],
                ["Resultados","valor para o negócio",     LayersIcon,   "n4"],
                ["Pessoas",   "adoção e experiência",     BotIcon,      "n5"],
                ["Sistemas",  "ERP e integrações",        ShieldIcon,   "n6"],
              ] as const
            ).map(([title, sub, Icon, cls]) => {
              const I = Icon as typeof SparkIcon;
              return (
                <div className={`node ${cls}`} key={title}>
                  <div className="ni"><I /></div>
                  <b>{title}</b>
                  <small>{sub}</small>
                </div>
              );
            })}

            <div className="conn c1" />
            <div className="conn c2" />
            <div className="conn c3" />
            <div className="conn c4" />
            <div className="conn c5" />
            <div className="conn c6" />
          </div>
        </div>
      </section>

      {/* ── Autoridade ── */}
      <section className="section-sm authority">
        <div className="container authority-grid">
          <Reveal>
            <div className="eyebrow">Experiência que reduz risco</div>
            <h2>Você não precisa de mais uma ferramenta de IA.</h2>
            <p>
              Precisa saber onde a IA realmente pode gerar resultado. É aí que a
              UNIDAX entra: combinamos experiência em tecnologia empresarial com
              inteligência artificial para identificar oportunidades, validar soluções
              e implementar transformações que fazem sentido para o negócio.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div className="stats">
              {stats.map(([value, label]) => (
                <div className="stat" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Desafio ── */}
      <section className="section challenge">
        <div className="container challenge-grid">
          <Reveal>
            <div className="eyebrow">O desafio</div>
            <h2>A tecnologia mudou. Os desafios do negócio continuam.</h2>
            <p>
              Dados espalhados, processos manuais, sistemas desconectados e pressão
              por produtividade. Antes de escolher uma tecnologia, precisamos
              entender onde está o problema.
            </p>
          </Reveal>
          <div className="problem-grid">
            {(
              [
                ["Tenho dados, mas não consigo extrair valor.",        "Transforme informação dispersa em contexto para decisões melhores.", DatabaseIcon],
                ["Tenho processos que poderiam ser automatizados.",    "Identifique gargalos e automatize com segurança e governança.",       FlowIcon],
                ["Quero usar IA, mas não sei por onde começar.",       "Comece por um caso de uso relevante, mensurável e viável.",           SparkIcon],
              ] as const
            ).map(([title, text, Icon], i) => {
              const I = Icon as typeof SparkIcon;
              return (
                <Reveal delay={i * 80} key={title}>
                  <article className="problem">
                    <div className="iconbox"><I /></div>
                    <b>{title}</b>
                    <p>{text}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Metodologia ── */}
      <section className="section method" id="metodologia">
        <div className="container method-grid">
          <Reveal>
            <div className="eyebrow light">Nossa abordagem</div>
            <h2>Da primeira ideia à solução em produção.</h2>
            <p>
              Não começamos pela tecnologia. Começamos pelo problema. Entendemos o
              negócio, identificamos oportunidades, avaliamos viabilidade,
              construímos pilotos e implementamos soluções de inteligência artificial
              preparadas para gerar valor em escala.
            </p>
          </Reveal>
          <div className="steps">
            {methodology.map(([n, title, text], i) => (
              <Reveal key={n} delay={i * 70}>
                <div className="step">
                  <div className="step-num">{n}</div>
                  <div>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Serviços de IA — com imagens e links corrigidos ── */}
      <section className="section services" id="ia">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">Inteligência artificial</div>
                <h2>Inteligência artificial construída para o seu negócio.</h2>
                <p>
                  Da estratégia à engenharia: soluções de IA conectadas ao contexto,
                  aos dados e aos processos da sua empresa.
                </p>
              </div>
              <Link className="link" href="/ia">
                Conheça a prática de IA <ArrowIcon />
              </Link>
            </div>
          </Reveal>

          <div className="service-grid">
            {aiServices.map((s, i) => (
              <Reveal key={s.number} delay={i * 80}>
                <article className="service-card">
                  {/* Arte com imagem de fundo — sem ícone central */}
                  <div className={`service-art service-art--${serviceArtVariant[i]}`}>
                    <div className="service-art-img" />
                    <span className="service-num">{serviceLabels[i]}</span>
                  </div>
                  <div className="service-body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {/* Link correto para a landing page de cada serviço */}
                    <Link
                      className="link"
                      href={`/ia/${aiLandingPages[i]?.slug ?? ""}`}
                    >
                      Explorar serviço <ArrowIcon />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ecossistema ── */}
      <section className="section tech">
        <div className="container tech-grid">
          <Reveal>
            <div className="eyebrow light">Ecossistema tecnológico</div>
            <h2>A tecnologia certa para cada desafio.</h2>
            <p>
              Trabalhamos com diferentes plataformas, modelos e arquiteturas para
              escolher a tecnologia mais adequada a cada cenário — sem prender sua
              estratégia a um único fornecedor.
            </p>
            <Link className="link" href="/ia#tecnologias" style={{ color: "#ff7188" }}>
              Ver ecossistema <ArrowIcon />
            </Link>
          </Reveal>
          <div className="tech-cloud">
            {ecosystem.map((item, i) => (
              <Reveal key={item} delay={i % 3 * 70}>
                <div className="tech-item">
                  <span className="tech-icon">{item.slice(0, 2)}</span>
                  {item}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integração ── */}
      <section className="section integration-section">
        <div className="container integration-grid-3">
          <Reveal>
            <div className="eyebrow">IA não existe isoladamente</div>
            <h2>IA precisa conversar com o resto da empresa.</h2>
            <p>
              O verdadeiro potencial da inteligência artificial aparece quando ela
              está conectada aos dados, <strong>processos</strong>, sistemas e pessoas
              que fazem o negócio acontecer.{" "}
              <strong>sua estratégia a um único fornecedor.</strong>
            </p>
            <Link className="link" href="/servicos">
              Saiba mais <ArrowIcon />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="diagram">
              <div className="orbit one" />
              <div className="orbit two" />
              <div className="core">
                <Image src="/assets/img/logo.png" alt="UNIDAX" width={64} height={64} />
              </div>
              <div className="label lab1"><SparkIcon    style={{ width: 18, height: 18, color: "var(--red)" }} /> IA</div>
              <div className="label lab2"><DatabaseIcon style={{ width: 18, height: 18, color: "var(--red)" }} /> ERP</div>
              <div className="label lab3"><LayersIcon   style={{ width: 18, height: 18, color: "var(--red)" }} /> Dados</div>
              <div className="label lab4"><BotIcon      style={{ width: 18, height: 18, color: "var(--red)" }} /> Pessoas</div>
              <div className="label lab5"><FlowIcon     style={{ width: 18, height: 18, color: "var(--red)" }} /> Processos</div>
              <div className="label lab6"><ShieldIcon   style={{ width: 18, height: 18, color: "var(--red)" }} /> Sistemas</div>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="integration-services">
              <h3>E a tecnologia que sustenta tudo isso?</h3>
              <p>
                Nossa experiência em tecnologia empresarial continua sendo a base
                para construir transformações consistentes.
              </p>
              <ul className="integration-list">
                {enterpriseServices.map(([title]) => (
                  <li key={title}><ArrowIcon />{title}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Serviços empresariais ── */}
      <section className="section legacy">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">Tecnologia empresarial</div>
                <h2>E a tecnologia que sustenta tudo isso?</h2>
                <p>
                  Nossa experiência em tecnologia empresarial continua sendo a base
                  para construir transformações consistentes.
                </p>
              </div>
              <Link className="link" href="/servicos">
                Ver todos os serviços <ArrowIcon />
              </Link>
            </div>
          </Reveal>
          <div className="legacy-grid">
            {enterpriseServices.map(([title, text], i) => (
              <Reveal key={title} delay={i * 60}>
                <article className="legacy-card">
                  <div className="legacy-icon">
                    {[
                      <DatabaseIcon key="db" />,
                      <ShieldIcon   key="sh" />,
                      <LayersIcon   key="ly" />,
                      <FlowIcon     key="fl" />,
                      <BotIcon      key="bt" />,
                      <SparkIcon    key="sp" />,
                    ][i]}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cases ── */}
      <section className="section cases">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">Cases</div>
                <h2>Tecnologia aplicada. Resultado comprovado.</h2>
                <p>Experiência construída em parceria com organizações que confiam na UNIDAX.</p>
              </div>
              <Link className="link" href="/cases">
                Ver todos os cases <ArrowIcon />
              </Link>
            </div>
          </Reveal>
          <div className="case-grid">
            {cases.map((item, i) => (
              <Reveal key={item.client} delay={i * 80}>
                <article className="case">
                  <div className="case-art">
                    <span className="case-brand">{item.client}</span>
                  </div>
                  <div className="case-body">
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                    <Link className="link" href={`/cases/${item.slug}`}>
                      Ver case <ArrowIcon />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="clients">
            <b>Empresas que confiam na UNIDAX</b>
            {clients.map((c) => (
              <span className="client" key={c}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Insights — com ilustrações visuais ── */}
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="eyebrow">UNIDAX Insights</div>
                <h2>Conhecimento para transformar negócios.</h2>
                <p>
                  Conteúdo prático para líderes que precisam tomar decisões melhores
                  sobre tecnologia, dados e inteligência artificial.
                </p>
              </div>
              <Link className="link" href="/insights">
                Ver todos os insights <ArrowIcon />
              </Link>
            </div>
          </Reveal>
          <div className="insight-grid">
            {insights.map((item, i) => {
              const Icon = tagIcon[item.tag] ?? <SparkIcon />;
              return (
                <Reveal key={item.title} delay={i * 70}>
                  <article className="article">
                    {/* Arte com glow colorido por tag + ícone central */}
                    <div className={tagClass(item.tag)}>
                      <div className="article-art-glow" />
                      <div className="article-art-icon">{Icon}</div>
                      <span className="article-art-tag">{item.tag}</span>
                    </div>
                    <div className="article-body">
                      <span className="tag">{item.tag}</span>
                      <h3>
                        <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p>{item.meta}</p>
                      <Link className="link" href={`/insights/${item.slug}`}>
                        Ler insight <ArrowIcon />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta">
        <div className="container cta-grid">
          <div>
            <h2>Qual desafio sua empresa precisa resolver?</h2>
            <p>
              Talvez a resposta esteja em IA. Talvez esteja em dados, processos,
              sistemas ou integração. A primeira etapa é entender o problema.
            </p>
            <div className="cta-note">
              Vamos transformar a próxima oportunidade em uma solução inteligente.
            </div>
          </div>
          <Link className="btn btn-light" href="/contato">
            Fale com um especialista <ArrowIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}