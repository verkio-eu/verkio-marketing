import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Section } from "./Section";
import { inlineLink } from "./styles";

export const faqKeys = [
  "hosting",
  "cloudAct",
  "clients",
  "launch",
  "migration",
  "pricing",
  "subprocessors",
  "leaving",
  "openSource",
  "ai",
] as const;

/** The questions, as Branchscope's: each opens in place, in one framed list. */
export function Faqs() {
  const t = useTranslations("faqs");
  return (
    <Section
      id="faqs"
      eyebrow={t("eyebrow")}
      title={t("headline")}
      lead={
        <>
          {t("contactPrompt")}{" "}
          <a href="mailto:hello@verkio.eu" className={inlineLink}>
            hello@verkio.eu
          </a>
        </>
      }
    >
      <div className="divide-y divide-ink/[0.06] rounded-xl border border-ink/[0.08]">
        {faqKeys.map((key) => (
          <details key={key} className="group px-5 py-4">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-medium text-foreground [&::-webkit-details-marker]:hidden">
              {t(`items.${key}.question`)}
              <span aria-hidden="true" className="text-muted-foreground transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(`items.${key}.answer`)}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

export async function FaqStructuredData({ locale }: { locale: string }) {
  const tFaqs = await getTranslations({ locale, namespace: "faqs" });
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqKeys.map((key) => ({
      "@type": "Question",
      name: tFaqs(`items.${key}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaqs(`items.${key}.answer`),
      },
    })),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
    />
  );
}
