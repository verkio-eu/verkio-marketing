import { useTranslations } from "next-intl";
import { Section } from "./Section";

const ITEM_KEYS = [0, 1, 2, 3, 4, 5] as const;

export function WhatWeDontHave() {
  const t = useTranslations("whatWeDontHave");
  return (
    <Section eyebrow={t("eyebrow")} title={t("headline")} lead={t("subhead")}>
      <ul role="list" className="max-w-2xl divide-y divide-ink/[0.06] rounded-xl border border-ink/[0.08]">
        {ITEM_KEYS.map((i) => (
          <li key={i} className="flex items-start gap-3 px-5 py-4 text-[15px] text-foreground">
            <span aria-hidden="true" className="mt-3 inline-block h-px w-4 shrink-0 bg-ink/30" />
            <span>{t(`items.${i}`)}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
