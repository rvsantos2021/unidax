import { ArrowIcon } from "./icons";
import Link from "next/link";

export function PageHero({ eyebrow, title, text, cta = "Fale com um especialista" }: { eyebrow: string; title: string; text: string; cta?: string }) {
  return <section className="page-hero"><div className="page-hero-glow"/><div className="container page-hero-inner"><div className="eyebrow light">{eyebrow}</div><h1>{title}</h1><p>{text}</p><Link className="btn btn-primary" href="/contato">{cta} <ArrowIcon /></Link></div></section>;
}
