import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { eyebrow, h1Page, inlineLink, lead, textLink } from "@/app/[locale]/components/styles";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "subprocessors" });
  const url = `https://verkio.eu/${locale}/subprocessors`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `https://verkio.eu/${l}/subprocessors`,
          ]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/subprocessors`,
      },
    },
  };
}

type Row = {
  vendor: string;
  purposeKey: "hetzner" | "mollie";
  country: string;
  dpaUrl: string;
};

const ROWS: Row[] = [
  {
    vendor: "Hetzner Online GmbH",
    purposeKey: "hetzner",
    country: "Germany (EU)",
    dpaUrl: "https://www.hetzner.com/legal/order-processing",
  },
  {
    vendor: "Mollie B.V.",
    purposeKey: "mollie",
    country: "Netherlands (EU)",
    dpaUrl: "https://www.mollie.com/data-processing-agreement",
  },
];

const CUSTOMER_CATEGORIES = [
  "dns",
  "idp",
  "webhooks",
  "forwarding",
  "siem",
] as const;

function SubprocessorsContent() {
  const t = useTranslations("subprocessors");

  return (
    <section className="mx-auto max-w-3xl px-4 pt-20 pb-24 sm:px-6 lg:pt-28">
        <div className="max-w-2xl">
          <p className={eyebrow}>{t("eyebrow")}</p>
          <h1 className={`mt-4 ${h1Page}`}>{t("headline")}</h1>
          <p className="mt-3 text-[13px] text-muted-foreground">{t("lastUpdated")}</p>
          <p className={`mt-6 ${lead}`}>{t("intro")}</p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-xl border border-ink/[0.08]">
          <table className="w-full text-left text-sm">
            <thead className="bg-ink/[0.03] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">
                  {t("columns.vendor")}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t("columns.purpose")}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t("columns.country")}
                </th>
                <th className="px-5 py-3 font-medium">
                  {t("columns.dpa")}
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.vendor} className="border-t border-ink/[0.06]">
                  <td className="px-5 py-4 align-top font-medium text-foreground">
                    {row.vendor}
                  </td>
                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {t(`purposes.${row.purposeKey}`)}
                  </td>
                  <td className="px-5 py-4 align-top whitespace-nowrap text-muted-foreground">
                    {row.country}
                  </td>
                  <td className="px-5 py-4 align-top">
                    <a
                      href={row.dpaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      {t("dpaLink")}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-14 max-w-2xl">
          <h2 className="text-xl font-medium text-foreground">
            {t("customerHeading")}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            {t.rich("customerBody1", {
              strong: (chunks) => (
                <strong className="font-medium text-foreground">
                  {chunks}
                </strong>
              ),
            })}
          </p>
          <p className="mt-6 text-sm font-medium text-foreground">
            {t("customerCategoriesIntro")}
          </p>
          <ul className="mt-3 space-y-3">
            {CUSTOMER_CATEGORIES.map((key) => (
              <li key={key} className="text-[15px] leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  {t(`customerCategories.${key}.name`)}
                </span>{" "}
                — {t(`customerCategories.${key}.description`)}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[15px] leading-relaxed text-muted-foreground">
            {t("customerBody2")}
          </p>
        </div>

        <div className="mt-14 max-w-2xl">
          <h2 className="text-xl font-medium text-foreground">
            {t("noticeHeading")}
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
            {t.rich("noticeBody", {
              email: (chunks) => (
                <a
                  href="mailto:subprocessors@verkio.eu"
                  className={inlineLink}
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>

        <div className="mt-16">
          <Link href="/" className={textLink}>
            ← {t("backLink")}
          </Link>
        </div>
    </section>
  );
}

export default async function Subprocessors({
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
        <SubprocessorsContent />
      </main>
      <Footer />
    </>
  );
}
