import { Reveal } from "@/components/reveal";

interface DarkPanelProps {
  /** Eyebrow label. Rendered with class "eyebrow light". */
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  /** Additional className appended to the outer <section> */
  className?: string;
}

export function DarkPanel({
  eyebrow,
  title,
  children,
  className,
}: DarkPanelProps) {
  return (
    <section className={`section dark-panel${className ? ` ${className}` : ""}`}>
      <div className="container">
        <Reveal>
          {eyebrow && <div className="eyebrow light">{eyebrow}</div>}
          <h2>{title}</h2>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
