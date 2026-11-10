import { CtaSection } from "@/components/cta-section";
import { DarkPanel } from "@/components/dark-panel";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FaqSection, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { site } from "@/lib/content";
import type { LandingContent } from "@/lib/seo-content";

export function LandingPage({ item, kind }: { item: LandingContent; kind: "ia" | "servicos" }) {
  const path = `/${kind}/${item.slug}`;
  const crumbs = [{ name: "Início", url: site.url }, { name: kind === "ia" ? "IA & Transformação" : "Serviços", url: `${site.url}/${kind === "ia" ? "ia" : "servicos"}` }, { name: item.title, url: `${site.url}${path}` }];
  const serviceSchema = { "@context": "https://schema.org", "@type": item.serviceType, name: item.title, description: item.description, url: `${site.url}${path}`, provider: { "@type": "Organization", name: site.name, url: site.url }, areaServed: { "@type": "Country", name: "Brasil" } };
  return <main>
    <BreadcrumbJsonLd items={crumbs} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c") }} />
    <PageHero eyebrow={item.eyebrow} title={item.h1} text={item.description} />
    <section className="section"><div className="container content-intro"><Reveal><div className="eyebrow">Abordagem UNIDAX</div><h2>Começar pelo desafio. Projetar a solução com critério.</h2><p>{item.intro}</p></Reveal></div></section>
    <section className="section services"><div className="container"><div className="detail-grid">{item.benefits.map((benefit, index) => <Reveal key={benefit.title} delay={index * 70}><article className="detail-card"><span className="number">0{index + 1}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></article></Reveal>)}</div></div></section>
    {item.capabilities && item.capabilities.length > 0 && (
      <section className="section">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Capacidades de IA</div>
            <h2>O que construímos em sistemas de IA.</h2>
            <p className="content-intro">Cada projeto de IA tem contornos próprios. Estes são os tipos de sistemas que desenhamos, integramos e colocamos em produção, sempre com qualidade, segurança e governança.</p>
          </Reveal>
          <div className="capability-grid detail-grid">
            {item.capabilities.map((cap, index) => (
              <Reveal key={cap.title} delay={index * 70}>
                <article className="capability-card detail-card">
                  <span className="number">0{index + 1}</span>
                  <h3>{cap.title}</h3>
                  <p>{cap.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    )}
    <DarkPanel eyebrow="Escopo possível" title="Um caminho claro da descoberta à execução.">
      <p className="content-intro">As entregas finais são definidas de acordo com o contexto, a complexidade e os objetivos de cada iniciativa.</p>
      <div className="bullet-list">
        {item.deliverables.map((deliverable, index) => (
          <Reveal key={deliverable} delay={index * 45}>
            <div className="bullet"><strong>0{index + 1} · {deliverable}</strong></div>
          </Reveal>
        ))}
      </div>
    </DarkPanel>
    <FaqSection items={item.faqs} />
    <CtaSection
      title={item.cta}
      text="Compartilhe o contexto. Ajudamos a definir o próximo passo mais adequado."
      href={`/contato?interesse=${encodeURIComponent(item.title)}`}
      label="Conversar com especialista"
    />
  </main>;
}
