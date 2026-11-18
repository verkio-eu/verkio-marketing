import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { eyebrow, h1Page, pill, pillShape, textLink } from "@/app/[locale]/components/styles";
import { RoadmapRequestModal } from "@/app/components/RoadmapRequestModal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roadmap" });
  const url = `https://verkio.eu/${locale}/roadmap`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/roadmap`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/roadmap`,
      },
    },
  };
}

type RoadmapSize = "major" | "minor";
type RoadmapStatus = "implemented";

const roadmapItems: { key: string; size: RoadmapSize; status?: RoadmapStatus }[] = [
  { key: "auditLog", size: "minor", status: "implemented" },
  { key: "publicApi", size: "major", status: "implemented" },
  { key: "sharedMailbox", size: "major", status: "implemented" },
  { key: "emailAliases", size: "minor", status: "implemented" },
  { key: "fileStorage", size: "major", status: "implemented" },
  { key: "sharedMailboxWorkflow", size: "major", status: "implemented" },
  { key: "sieveFilters", size: "minor", status: "implemented" },
  { key: "sharedMailboxAcls", size: "minor", status: "implemented" },
  { key: "externalForwarding", size: "minor", status: "implemented" },
  { key: "domainAutoSetup", size: "minor", status: "implemented" },
  { key: "webmail", size: "major", status: "implemented" },
  { key: "calendar", size: "major", status: "implemented" },
  { key: "contacts", size: "major", status: "implemented" },
  { key: "wiki", size: "major", status: "implemented" },
  { key: "messaging", size: "major", status: "implemented" },
  { key: "notifications", size: "minor", status: "implemented" },
  { key: "discountCodes", size: "minor", status: "implemented" },
  { key: "schedule", size: "minor", status: "implemented" },
  { key: "sendLaterSnooze", size: "minor", status: "implemented" },
  { key: "pwaInstall", size: "minor", status: "implemented" },
  { key: "gdprPortability", size: "minor", status: "implemented" },
  { key: "pgpSmime", size: "major", status: "implemented" },
  { key: "universalSearch", size: "major", status: "implemented" },
  { key: "tier2Encryption", size: "major", status: "implemented" },
  { key: "samlSso", size: "major", status: "implemented" },
  { key: "migration", size: "major" },
  { key: "ssoScim", size: "major", status: "implemented" },
  { key: "signInWithVerkio", size: "major", status: "implemented" },
  { key: "boards", size: "major", status: "implemented" },
  { key: "forms", size: "major", status: "implemented" },
  { key: "crm", size: "major", status: "implemented" },
  { key: "autoTranslate", size: "major", status: "implemented" },
  { key: "transparencyLog", size: "major", status: "implemented" },
  { key: "dsrPortal", size: "major", status: "implemented" },
  { key: "eidasSigning", size: "major" },
  { key: "calendarPolls", size: "minor" },
  { key: "compliance", size: "major" },
  { key: "realtimeDocs", size: "major" },
  { key: "transactionalEmail", size: "major" },
  { key: "ediscovery", size: "major" },
];

/** The roadmap, as Branchscope's: a timeline down a hairline, a dot and a pill for each item. */
function RoadmapList() {
  const t = useTranslations("roadmap");
  return (
    <section className="mx-auto max-w-3xl px-4 pt-20 pb-24 sm:px-6">
      <p className={eyebrow}>{t("eyebrow")}</p>
      <h1 className={`mt-4 ${h1Page}`}>{t("headline")}</h1>
      <p className="mt-4 text-[16px] text-muted-foreground">{t("subhead")}</p>
      <div className="mt-8">
        <RoadmapRequestModal />
      </div>
      <ol className="relative mt-14 space-y-8 border-l border-ink/[0.08] pl-6">
        {roadmapItems.map(({ key, size, status }) => {
          const isMajor = size === "major";
          const isImplemented = status === "implemented";
          const note = t.has(`items.${key}.note`) ? t(`items.${key}.note`) : null;
          return (
            <li key={key} className={`relative ${isImplemented ? "opacity-60" : ""}`}>
              <span
                aria-hidden="true"
                className={`absolute top-1.5 -left-[29px] size-2.5 rounded-full ${
                  isImplemented ? "bg-ok" : isMajor ? "bg-primary" : "bg-ink/20"
                }`}
              />
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h2
                  className={
                    isMajor
                      ? "text-[17px] font-semibold tracking-[-0.01em] text-foreground"
                      : "text-[15px] font-medium text-foreground"
                  }
                >
                  {t(`items.${key}.name`)}
                </h2>
                {isImplemented ? (
                  <span className={`${pillShape} border-ok/30 text-ok`}>{t("statusImplemented")}</span>
                ) : (
                  <span className={pill}>{t(`items.${key}.date`)}</span>
                )}
              </div>
              <p className={`mt-1 max-w-xl text-muted-foreground ${isMajor ? "text-[15px] leading-relaxed" : "text-sm"}`}>
                {t(`items.${key}.description`)}
              </p>
              {note && <p className="mt-2 max-w-xl text-xs text-muted-foreground">* {note}</p>}
            </li>
          );
        })}
      </ol>
      <div className="mt-12">
        <Link href="/" className={textLink}>
          ← {t("backLink")}
        </Link>
      </div>
    </section>
  );
}

export default async function Roadmap({
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
        <RoadmapList />
      </main>
      <Footer />
    </>
  );
}
