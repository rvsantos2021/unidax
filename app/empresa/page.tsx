import { CtaSection } from "@/components/cta-section";
import { DarkPanel } from "@/components/dark-panel";
import { ArrowIcon, SparkIcon, TargetIcon, LayersIcon, UsersIcon, ShieldIcon, GaugeIcon, DatabaseIcon, BotIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import Link from "next/link";
export const metadata = { title: "A UNIDAX", description: "Conheça a UNIDAX e sua experiência em tecnologia empresarial, dados e transformação." };
export default function Empresa(){
  const impactStats = [
    { value: "+100",  label: "clientes atendidos pela UNIDAX" },
    { value: "+300",  label: "projetos realizados" },
    { value: "+280K", label: "horas de experiência acumulada em projetos" },
    { value: "+35",   label: "anos de experiência" },
  ] as const;

  const valores = [
    { icon: <SparkIcon />,    label: "Inovação",            descricao: "Exploramos tecnologias emergentes quando elas resolvem problemas reais — não para acompanhar tendências." },
    { icon: <TargetIcon />,   label: "Excelência",          descricao: "Entregamos o que prometemos, com qualidade técnica verificável e atenção ao detalhe que sustenta operações críticas." },
    { icon: <LayersIcon />,   label: "Transparência",       descricao: "Comunicamos riscos, limitações e progresso sem filtro — porque decisões boas dependem de informação honesta." },
    { icon: <UsersIcon />,    label: "Colaboração",        descricao: "Trabalhamos junto ao cliente, não apenas para ele. O conhecimento do negócio está no cliente; a expertise técnica está conosco." },
    { icon: <ShieldIcon />,   label: "Confiança",          descricao: "Construída projeto a projeto, pela consistência entre o que dizemos e o que entregamos." },
    { icon: <GaugeIcon />,    label: "Simples e Funcional", descricao: "Preferimos a solução mais simples que resolve o problema. Complexidade desnecessária cria custo e fragilidade." },
    { icon: <DatabaseIcon />, label: "Sustentabilidade",   descricao: "Desenvolvemos sistemas pensados para durar — com arquitetura, documentação e manutenibilidade desde o início." },
    { icon: <BotIcon />,      label: "Acreditamos. Sempre!", descricao: "Acreditamos no potencial de cada cliente e de cada projeto. Essa postura define como enfrentamos os desafios difíceis." },
  ] as const;

return <main><PageHero eyebrow="A UNIDAX" title="Experiência empresarial para uma nova era de tecnologia." text="Mais de 35 anos de experiência ajudam a transformar inovação em soluções que respeitam contexto, operação e resultado."/><section className="section authority">
      <div className="container">
        <div className="authority-grid">
          <Reveal>
            <div className="eyebrow">Posicionamento</div>
            <h2>IA sem perder o que já funciona.</h2>
            <p>O avanço da inteligência artificial não elimina a importância dos sistemas, dados, processos e pessoas que sustentam uma empresa. Nossa proposta é conectar esses mundos: preservar o conhecimento acumulado e acelerar a próxima etapa de transformação.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="historia-card">
              <div className="eyebrow">Nossa história</div>
              <p>A UNIDAX nasceu há mais de 35 anos com foco em tecnologia para empresas. Ao longo desse tempo, acumulamos profundo conhecimento em Microsoft Dynamics e ERPs corporativos, entregando projetos em todo o Brasil e em mercados internacionais. Não somos uma empresa de tendências: somos especialistas em transformar operações reais em sistemas que funcionam — e que continuam funcionando.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section><section className="section-sm ia-impact-bar"><div className="container"><div className="ia-impact-grid">{impactStats.map((s) => (<Reveal key={s.value}><div className="ia-impact-item"><strong>{s.value}</strong><span>{s.label}</span></div></Reveal>))}</div></div></section><section className="section"><div className="container"><Reveal><div className="vmv-grid"><div className="vmv-card"><div className="eyebrow">Visão</div><h3>Ser referência em tecnologia aplicada ao negócio.</h3><p>Queremos ser reconhecidos por transformar tecnologia em resultado concreto — não por seguir modismos, mas por entregar soluções que as empresas usam de verdade, por anos.</p></div><div className="vmv-card"><div className="eyebrow">Missão</div><h3>Conectar tecnologia e operação com precisão.</h3><p>Desenvolvemos e implantamos soluções de tecnologia que se encaixam na realidade de cada empresa — respeitando processos, dados e pessoas existentes para acelerar a próxima etapa.</p></div></div></Reveal></div></section><section className="section"><div className="container"><Reveal><div className="eyebrow">Nossos valores</div><h2>O que guia cada decisão.</h2></Reveal><div className="values-grid" style={{ marginTop: 40 }}>{valores.map((v, i) => (<Reveal key={v.label} delay={i * 60}><div className="problem"><div className="iconbox">{v.icon}</div><b>{v.label}</b><p>{v.descricao}</p></div></Reveal>))}</div></div></section><DarkPanel eyebrow="Como pensamos" title="Clareza antes da complexidade."><div className="bullet-list"><div className="bullet"><strong>Problema antes da ferramenta</strong><p>Começamos pelo contexto e pelo resultado desejado.</p></div><div className="bullet"><strong>Prova antes da escala</strong><p>Validamos hipóteses antes de comprometer grandes investimentos.</p></div><div className="bullet"><strong>Integração antes do isolamento</strong><p>IA precisa conversar com dados, sistemas, processos e pessoas.</p></div><div className="bullet"><strong>Evolução antes do projeto encerrado</strong><p>Uma solução útil precisa aprender, medir e evoluir.</p></div></div></DarkPanel><section className="section"><div className="container content-intro"><Reveal><div className="eyebrow">Nossa equipe</div><h2>Especialistas comprometidos com o seu resultado.</h2><p>Nossa equipe reúne consultores, desenvolvedores e especialistas em dados com experiência real em projetos corporativos. Cada projeto é conduzido por profissionais que conhecem a fundo as tecnologias que recomendam — e que permanecem acessíveis ao longo de toda a entrega.</p><Link className="link" href="/contato">Fale com a equipe <ArrowIcon /></Link></Reveal></div></section><CtaSection title="Vamos falar sobre o próximo passo?" text="Conte o desafio. A tecnologia vem depois." label="Fale com a UNIDAX"/></main>}
