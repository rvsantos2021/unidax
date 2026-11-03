import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/content";
import { getCasesCMS, getCaseCMS } from "@/lib/cms";
import { OG_IMAGE_PATH } from "@/lib/metadata";

export async function generateStaticParams() {
  const publishedCases = await getCasesCMS();
  return publishedCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseCMS(slug);
  if (!item) return {};
  return {
    title: `${item.client} — ${item.title}`,
    description: item.summary,
    alternates: { canonical: `/cases/${item.slug}` },
    openGraph: {
      title: `${item.client} — ${item.title}`,
      description: item.summary,
      url: `${site.url}/cases/${item.slug}`,
      images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: item.title }],
    },
  };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getCaseCMS(slug);
  if (!item) notFound();
  return <main>
    <section className="page-hero"><div className="container">
      <div className="eyebrow light">Case · {item.category}</div>
      <h1>{item.client}: {item.title}</h1><p>{item.summary}</p>
    </div></section>
    <section className="section"><div className="container article-container">
      <div className="eyebrow">Publicação responsável</div><h2>Case em construção</h2>
      <p className="content-intro">A UNIDAX só publica indicadores, resultados e informações técnicas após validação e autorização do cliente. O conteúdo detalhado deste case será disponibilizado quando estiver aprovado para divulgação.</p>
      <div className="placeholder">Desafio · contexto · solução · arquitetura · indicadores · resultados autorizados</div>
      <Link className="link" href="/cases">← Voltar para Cases</Link>
    </div></section>
  </main>;
}
