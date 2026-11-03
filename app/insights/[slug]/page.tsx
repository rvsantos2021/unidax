import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/lib/content";
import { getInsightCMS, getPublishedInsightsCMS } from "@/lib/cms";
import { OG_IMAGE_PATH } from "@/lib/metadata";

export async function generateStaticParams() {
  const publishedInsights = await getPublishedInsightsCMS();
  return publishedInsights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = await getInsightCMS(slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    alternates: { canonical: `/insights/${item.slug}` },
    openGraph: {
      type: "article", publishedTime: item.publishedAt, section: item.tag,
      title: item.title, description: item.excerpt,
      url: `${site.url}/insights/${item.slug}`,
      images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: item.title }],
    },
    twitter: { card: "summary_large_image", title: item.title, description: item.excerpt },
  };
}

export default async function Insight({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await getInsightCMS(slug);
  if (!item) notFound();
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: item.title, description: item.excerpt, datePublished: item.publishedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/insights/${item.slug}`,
  };
  return <main>
    <article className="article-page"><div className="container article-container">
      <div className="eyebrow">{item.tag}</div><h1>{item.title}</h1>
      <p className="article-lead">{item.excerpt}</p>
      <div className="article-meta">{new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(`${item.publishedAt}T12:00:00`))} · {item.meta}</div>
      <div className="article-content">{item.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      <Link className="link" href="/insights">← Voltar para Insights</Link>
    </div></article>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
  </main>;
}
