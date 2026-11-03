import Link from "next/link";
import { ArrowIcon } from "@/components/icons";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  text: string;
  /** When provided, a link is rendered on the right. */
  linkLabel?: string;
  /** Required when linkLabel is set. */
  linkHref?: string;
}

export function SectionHead({
  eyebrow,
  title,
  text,
  linkLabel,
  linkHref,
}: SectionHeadProps) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      {linkLabel && linkHref && (
        <Link className="link" href={linkHref}>
          {linkLabel} <ArrowIcon />
        </Link>
      )}
    </div>
  );
}
