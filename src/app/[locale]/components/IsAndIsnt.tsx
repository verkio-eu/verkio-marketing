import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "./Section";
import { eyebrow, h1, h2Closing, inkButton, lead, secondaryButton } from "./styles";

const isCount = 6;
const isntCount = 7;

function Hero() {
  const t = useTranslations("isAndIsnt");
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 text-center sm:px-6 lg:pt-28">
      <p className={`animate-hero-in motion-reduce:animate-none ${eyebrow}`}>{t("eyebrow")}</p>
      <h1 className={`animate-hero-in motion-reduce:animate-none mx-auto mt-4 max-w-3xl ${h1}`}>{t("headline")}</h1>
      <p className={`animate-hero-in motion-reduce:animate-none mx-auto mt-6 max-w-2xl ${lead}`}>{t("body")}</p>
    </section>
  );
}

function ItemList({ group, count }: { group: "is" | "isnt"; count: number }) {
  const t = useTranslations(`isAndIsnt.${group}`);
  return (
    <Section eyebrow={t("eyebrow")} title={t("headline")}>
      <ul role="list" className="max-w-3xl divide-y divide-ink/[0.06] rounded-xl border border-ink/[0.08]">
        {Array.from({ length: count }).map((_, idx) => (
          <li key={idx} className="px-5 py-4">
            <p className="text-[15px] font-medium text-foreground">{t(`items.${idx}.name`)}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(`items.${idx}.body`)}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/** The closing call to action, as Branchscope's: centred, a large headline that fades, two buttons. */
function FitNote() {
  const t = useTranslations("isAndIsnt.fit");
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
      <p className={eyebrow}>{t("eyebrow")}</p>
      <h2 className={`mt-3 ${h2Closing}`}>{t("headline")}</h2>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t("body")}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/#waitlist" className={inkButton}>
          {t("cta")}
        </Link>
        <Link href="/why-verkio" className={secondaryButton}>
          {t("backLink")}
        </Link>
      </div>
    </section>
  );
}

export function IsAndIsnt() {
  return (
    <>
      <Hero />
      <ItemList group="is" count={isCount} />
      <ItemList group="isnt" count={isntCount} />
      <FitNote />
    </>
  );
}
