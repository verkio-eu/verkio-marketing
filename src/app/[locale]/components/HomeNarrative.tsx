import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { hairlineGrid } from "./styles";

type BandKey = "send" | "plan" | "keep" | "talk" | "build";

const bands: { key: BandKey; items: readonly string[] }[] = [
  {
    key: "send",
    items: ["webmail", "shared", "rules", "aliases"],
  },
  {
    key: "plan",
    items: ["calendars", "contacts", "identity"],
  },
  {
    key: "keep",
    items: ["files", "wikis", "encryption", "openFormats"],
  },
  {
    key: "talk",
    items: ["channels", "threaded", "search"],
  },
  {
    key: "build",
    items: ["api", "webhooks", "audit", "signIn"],
  },
];

export function HomeNarrative() {
  const t = useTranslations("homeNarrative");
  return (
    <>
      {bands.map(({ key, items }) => (
        <Section key={key} eyebrow={t(`${key}.eyebrow`)} title={t(`${key}.headline`)} lead={t(`${key}.body`)}>
          <dl className={`${hairlineGrid} sm:grid-cols-2 ${items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
            {items.map((itemKey) => (
              <div key={itemKey} className="bg-page p-6">
                <dt className="text-[15px] font-medium tracking-tight text-foreground">{t(`${key}.items.${itemKey}.name`)}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`${key}.items.${itemKey}.description`)}</dd>
              </div>
            ))}
          </dl>
        </Section>
      ))}
    </>
  );
}
