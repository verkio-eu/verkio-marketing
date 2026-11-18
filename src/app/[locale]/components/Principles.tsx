import { useTranslations } from "next-intl";
import { Section } from "./Section";

const principleKeys = ["standards", "quiet", "unified", "leave"] as const;

/** Verkio's principles, numbered, as Branchscope's "how it works" steps. */
export function Principles() {
  const t = useTranslations("principles");
  return (
    <Section eyebrow={t("eyebrow")} title={t("headline")} lead={t("subhead")}>
      <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {principleKeys.map((key, idx) => (
          <div key={key} className="border-t border-ink/[0.08] pt-6">
            <p className="font-mono text-xs text-muted-foreground" aria-hidden="true">
              {String(idx + 1).padStart(2, "0")}
            </p>
            <dt className="mt-3 text-[15px] font-medium tracking-tight text-foreground">{t(`items.${key}.name`)}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`items.${key}.description`)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
