import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

interface CtaSectionProps {
  title: string;
  text: string;
  /** @default "/contato" */
  href?: string;
  /** @default "Falar com um especialista" */
  label?: string;
  /** Optional extra content rendered below the text (e.g. cta-note div) */
  children?: React.ReactNode;
}

export function CtaSection({
  title,
  text,
  href = "/contato",
  label = "Falar com um especialista",
  children,
}: CtaSectionProps) {
  return (
    <section className="cta">
      <div className="container cta-grid">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
          {children}
        </div>
        <Link className="btn btn-light" href={href}>
          {label} <ArrowIcon />
        </Link>
      </div>
    </section>
  );
}
