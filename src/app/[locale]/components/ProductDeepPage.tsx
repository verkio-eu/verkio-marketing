import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Section } from "./Section";
import { eyebrow, gradientText, h1, inkButton, lead, secondaryButton, sectionLead } from "./styles";

export type ProductSection = { key: string; bulletCount: number };

export type ProductDeepPageProps = {
  namespace: string;
  sections: ProductSection[];
  hasStandards: boolean;
  backLinkHref?: string;
};

export async function buildProductDeepPageMetadata({
  locale,
  namespace,
  slug,
}: {
  locale: string;
  namespace: string;
  slug: string;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace });
  const url = `https://verkio.eu/${locale}/product/${slug}`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/product/${slug}`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/product/${slug}`,
      },
    },
  };
}

function CheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/** A product page's hero, as Branchscope's: centred, a large headline that fades, a lead and two buttons. */
function Hero({
  namespace,
  backLinkHref,
}: {
  namespace: string;
  backLinkHref: string;
}) {
  const t = useTranslations(namespace);
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 text-center sm:px-6 lg:pt-28">
      <p className={`animate-hero-in motion-reduce:animate-none ${eyebrow}`}>{t("eyebrow")}</p>
      <h1 className={`animate-hero-in motion-reduce:animate-none mx-auto mt-4 max-w-3xl ${h1}`}>{t("headline")}</h1>
      <p className={`animate-hero-in motion-reduce:animate-none mx-auto mt-6 max-w-2xl ${lead}`}>{t("body")}</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link href="/#waitlist" className={`animate-hero-in-later motion-reduce:animate-none ${inkButton}`}>
          {t("cta")}
        </Link>
        <Link href={backLinkHref} className={`animate-hero-in-latest motion-reduce:animate-none ${secondaryButton}`}>
          {t("backLink")}
        </Link>
      </div>
    </section>
  );
}

/** One capability, as Branchscope's features: a label, a headline and a paragraph beside its points; every other one is mirrored. */
function CapabilitySection({
  namespace,
  sectionKey,
  bulletCount,
  flip,
}: {
  namespace: string;
  sectionKey: string;
  bulletCount: number;
  flip: boolean;
}) {
  const t = useTranslations(`${namespace}.sections.${sectionKey}`);
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        <p className={eyebrow}>{t("eyebrow")}</p>
        <h2 className={`mt-3 text-3xl font-semibold tracking-[-0.025em] text-balance ${gradientText}`}>{t("headline")}</h2>
        <p className={`mt-4 ${sectionLead}`}>{t("body")}</p>
      </div>
      <ul role="list" className={`min-w-0 space-y-3 rounded-xl border border-ink/[0.08] bg-panel p-6 ${flip ? "lg:order-1" : ""}`}>
        {Array.from({ length: bulletCount }).map((_, idx) => (
          <li key={idx} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{t(`bullets.${idx}`)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function StandardsRow({ namespace }: { namespace: string }) {
  const t = useTranslations(`${namespace}.standards`);
  const items = t.raw("items") as string[];
  return (
    <Section eyebrow={t("eyebrow")} title={t("headline")} lead={t("body")}>
      <ul role="list" className="flex max-w-4xl flex-wrap gap-2">
        {items.map((s) => (
          <li key={s} className="rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs text-muted-foreground">
            {s}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function ProductDeepPage({
  namespace,
  sections,
  hasStandards,
  backLinkHref = "/product",
}: ProductDeepPageProps) {
  return (
    <>
      <Hero namespace={namespace} backLinkHref={backLinkHref} />
      {sections.map((s, idx) => (
        <CapabilitySection
          key={s.key}
          namespace={namespace}
          sectionKey={s.key}
          bulletCount={s.bulletCount}
          flip={idx % 2 === 1}
        />
      ))}
      {hasStandards && <StandardsRow namespace={namespace} />}
    </>
  );
}
