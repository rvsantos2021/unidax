import type { Metadata } from "next";
import Link from "next/link";
import { solutionsPage } from "@/lib/content";
import { getCasesCMS } from "@/lib/cms";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { DarkPanel } from "@/components/dark-panel";
import { CtaSection } from "@/components/cta-section";
import { SectionHead } from "@/components/section-head";

export const metadata: Metadata = {
  title: "Soluções | UNIDAX",
  description:
    "Soluções de IA e tecnologia empresarial que combinam estratégia, dados e sistemas para resolver desafios reais de negócio.",
  openGraph: {
    title: "Soluções | UNIDAX",
    description:
      "Soluções de IA e tecnologia empresarial que combinam estratégia, dados e sistemas para resolver desafios reais de negócio.",
  },
};

export default async function SolucoesPage() {
  const cases = await getCasesCMS();
  return (
    <main>
      {/* 3.2 — Hero + Proposição de valor */}
      <PageHero
        eyebrow="Soluções"
        title="Do problema ao resultado. Sem atalhos."
        text="Uma solução UNIDAX combina estratégia, dados, sistemas e IA para resolver um desafio específico de negócio — do diagnóstico ao deploy, com resultado mensurável."
      />

      <section className="section solucoes-value">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Por que é diferente</div>
            <h2>Uma solução, não uma ferramenta.</h2>
            <p className="content-intro">
              Enquanto ferramentas resolvem tarefas, soluções resolvem problemas. A UNIDAX entrega projetos completos — da estratégia ao código — com resultado mensurável e equipe dedicada.
            </p>
          </Reveal>
          <div className="solucoes-differentials">
            {solutionsPage.differentials.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="solucoes-diff-card">
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3.3 — Grid de soluções */}
      <section className="section solucoes-grid-section" id="solucoes">
        <div className="container">
          <SectionHead
            eyebrow="Portfólio"
            title="Soluções para desafios reais de negócio."
            text="Cada solução combina tecnologia, dados e experiência setorial para entregar resultado mensurável."
          />
          <div className="solucoes-grid">
            {solutionsPage.solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <article className="solucoes-card">
                  <h3>{s.title}</h3>
                  <p className="solucoes-card-tagline">{s.tagline}</p>
                  <p>{s.description}</p>
                  <ul className="solucoes-capabilities">
                    {s.capabilities.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                  <Link
                    className="btn btn-outline solucoes-card-cta"
                    href={s.href}
                    aria-label={`Falar sobre ${s.title}`}
                  >
                    Falar sobre essa solução
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3.4 — Metodologia (stepper) */}
      <section className="section solucoes-method">
        <div className="container">
          <Reveal>
            <div className="eyebrow">Como implementamos</div>
            <h2>Do diagnóstico à escala, sem pular etapas.</h2>
          </Reveal>
          <div className="solucoes-stepper">
            {solutionsPage.methodology.map((step, i) => (
              <Reveal key={step.num} delay={i * 70}>
                <div className="solucoes-step">
                  <div className="solucoes-step-num">{step.num}</div>
                  <strong>{step.title}</strong>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 — Segmentos com DarkPanel */}
      <DarkPanel
        eyebrow="Por segmento"
        title="Soluções aplicadas ao seu setor."
      >
        <div className="solucoes-segments">
          {solutionsPage.segments.map((seg, i) => (
            <Reveal key={seg.title} delay={i * 60}>
              <div className="solucoes-segment">
                <h3>{seg.title}</h3>
                <ul>
                  {seg.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </DarkPanel>

      {/* 3.6 — Cases condicional */}
      {cases.length > 0 && (
        <section className="section cases">
          <div className="container">
            <Reveal>
              <div className="eyebrow">Casos reais</div>
              <h2>Clientes que transformaram o negócio.</h2>
            </Reveal>
            <div className="case-grid" style={{ marginTop: 40 }}>
              {cases.slice(0, 3).map((c, i) => (
                <Reveal key={c.slug} delay={i * 70}>
                  <article className="case">
                    <div className="case-art">
                      <span className="case-brand">{c.client}</span>
                    </div>
                    <div className="case-body">
                      <div className="tag">{c.category}</div>
                      <strong>{c.title}</strong>
                      <p>{c.summary}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3.6 — CtaSection final */}
      <CtaSection
        title="Qual desafio a sua operação enfrenta hoje?"
        text="Vamos mapear as soluções certas para o seu contexto — sem template e sem promessa vaga."
        label="Iniciar uma conversa"
      />
    </main>
  );
}
