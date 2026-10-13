export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: item.url })) }} />;
}

export function FaqSection({ title = "Perguntas frequentes", items }: { title?: string; items: { question: string; answer: string }[] }) {
  const schema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) };
  return <section className="section"><div className="container"><JsonLd data={schema} /><div className="eyebrow">Dúvidas comuns</div><h2>{title}</h2><div className="faq-list">{items.map(({ question, answer }) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></div></section>;
}
