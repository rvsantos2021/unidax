import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { clients } from "@/lib/content";
import { getCasesCMS } from "@/lib/cms";

export const metadata = { title: "Cases", description: "Experiência da UNIDAX em projetos de tecnologia, dados, integração e transformação." };

export default async function Cases() {
  const publishedCases = await getCasesCMS();
  return <main>
    <PageHero eyebrow="Cases" title="Experiência aplicada a desafios reais." text="A UNIDAX trabalha em parceria com organizações de diferentes contextos. Nesta primeira versão pública, apresentamos somente informações que podem ser divulgadas sem inventar resultados." />
    <section className="section"><div className="container">
      <Reveal><div className="eyebrow">Projetos</div><h2>Cases e experiências da UNIDAX.</h2>
        <p className="content-intro">Cada case é publicado somente após validação das informações e autorização do cliente. Não transformamos hipóteses em promessas.</p>
      </Reveal>
      {publishedCases.length > 0 ? <div className="case-detail-grid" style={{ marginTop: 45 }}>
        {publishedCases.map((item, i) => <Reveal key={item.slug} delay={i * 70}>
          <article className="case-detail"><div className="eyebrow">Cliente</div><h3>{item.client}</h3><p>{item.title}</p><p>{item.summary}</p>
            <Link className="link" href={`/cases/${item.slug}`}>Conhecer case <ArrowIcon /></Link>
          </article>
        </Reveal>)}
      </div> : <p className="content-intro" style={{ marginTop: 32 }}>Os cases detalhados estão em preparação e serão publicados assim que forem validados e autorizados.</p>}
      <div className="clients" style={{ marginTop: 50 }}><b>Empresas que confiam na UNIDAX</b>{clients.map((client) => <span className="client" key={client}>{client}</span>)}</div>
    </div></section>
    <section className="section dark-panel"><div className="container"><Reveal>
      <div className="eyebrow light">Próximo projeto</div><h2>Talvez seja a sua empresa.</h2>
      <p className="content-intro">Se você tem um desafio de eficiência, integração, dados ou IA, podemos começar pelo diagnóstico e construir o caminho de implementação.</p>
      <Link className="btn btn-primary" href="/contato">Iniciar conversa <ArrowIcon /></Link>
    </Reveal></div></section>
  </main>;
}
