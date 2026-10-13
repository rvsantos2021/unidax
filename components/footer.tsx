import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";

export function Footer() {
  return <footer className="site-footer"><div className="container footer-grid">
    <div><Image src="/assets/UNIDAX-branco.png" alt="UNIDAX" width={150} height={45} className="footer-logo"/><p>{site.tagline}</p></div>
    <div><h3>IA & Transformação</h3><Link href="/ia#desenvolvimento">Desenvolvimento de IA</Link><Link href="/ia#consultoria">Consultoria de IA</Link><Link href="/ia#agentes">Agentes de IA</Link><Link href="/ia#metodologia">Nossa abordagem</Link></div>
    <div><h3>Serviços</h3><Link href="/servicos">Visão geral</Link><Link href="/servicos#erp">ERP & Dynamics</Link><Link href="/servicos#dados">Data & Analytics</Link><Link href="/servicos#power">Power Platform</Link><Link href="/servicos#squads">Outsourcing & Squads</Link></div>
    <div><h3>Empresa</h3><Link href="/empresa">A UNIDAX</Link><Link href="/cases">Cases</Link><Link href="/insights">Insights</Link><Link href="/contato">Contato</Link><Link href="/privacidade">Privacidade</Link></div>
  </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} UNIDAX. Todos os direitos reservados.</span><span>{site.tagline}</span></div></footer>;
}
