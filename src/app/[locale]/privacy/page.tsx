import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { eyebrow, h1Page, lead, textLink } from "@/app/[locale]/components/styles";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "privacy" });
  const url = `https://verkio.eu/${locale}/privacy`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/privacy`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/privacy`,
      },
    },
  };
}

type Section = { heading: string; body: string };

function PrivacyContent() {
  const t = useTranslations("privacy");
  const sections = t.raw("sections") as Section[];

  return (
    <section className="mx-auto max-w-2xl px-4 pt-20 pb-24 sm:px-6 lg:pt-28">
      <p className={eyebrow}>{t("eyebrow")}</p>
      <h1 className={`mt-4 ${h1Page}`}>{t("headline")}</h1>
      <p className="mt-3 text-[13px] text-muted-foreground">{t("lastUpdated")}</p>
      <p className={`mt-6 ${lead}`}>{t("intro")}</p>

      {sections.map((section, idx) => (
        <div key={idx} className="mt-14">
          <h2 className="text-xl font-medium text-foreground">{section.heading}</h2>
          <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            {section.body.split("\n\n").map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-16">
        <Link href="/" className={textLink}>
          ← {t("backLink")}
        </Link>
      </div>
    </section>
  );
}

export default async function Privacy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Header />
      <main>
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
