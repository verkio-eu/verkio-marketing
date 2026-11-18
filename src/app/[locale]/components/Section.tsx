import { type ReactNode, useId } from "react";
import { eyebrow as eyebrowClass, h2, sectionLead } from "./styles";

/** A landing-page section, as Branchscope's: a label, a headline that fades, a lead, then its content. */
export function Section({
  id,
  eyebrow,
  title,
  lead,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  const titleId = useId();
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6" aria-labelledby={titleId}>
      {eyebrow && <p className={eyebrowClass}>{eyebrow}</p>}
      <h2 id={titleId} className={`max-w-2xl text-balance ${eyebrow ? "mt-3" : ""} ${h2}`}>
        {title}
      </h2>
      {lead && <p className={`mt-4 max-w-2xl ${sectionLead}`}>{lead}</p>}
      {children && <div className="mt-12">{children}</div>}
    </section>
  );
}
