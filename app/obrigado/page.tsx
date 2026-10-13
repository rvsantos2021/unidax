import Link from "next/link";
import { ArrowIcon } from "@/components/icons";
import { PageHero } from "@/components/page-hero";

export const metadata = {
  title: "Mensagem recebida",
  description: "Sua solicitação foi recebida pela equipe da UNIDAX.",
  robots: { index: false, follow: false },
};

export default function Obrigado() {
  return <main>
    <PageHero eyebrow="Obrigado" title="Recebemos sua mensagem." text="Nossa equipe vai analisar o contexto enviado e entrar em contato para entender o próximo passo." />
    <section className="section"><div className="container narrow-success">
      <div className="success-mark" aria-hidden="true">✓</div>
      <div className="eyebrow">Próximo passo</div>
      <h2>Vamos começar pelo problema certo.</h2>
      <p>Enquanto isso, conheça nossa abordagem de diagnóstico, estratégia, piloto, implementação e evolução.</p>
      <Link className="btn btn-primary" href="/ia#metodologia">Conhecer a abordagem <ArrowIcon /></Link>
    </div></section>
  </main>;
}
