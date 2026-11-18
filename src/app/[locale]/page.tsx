import { useTranslations } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Footer, Header } from "./components/Layout";
import { ConsoleEasterEgg } from "./components/ConsoleEasterEgg";
import { HomeNarrative } from "./components/HomeNarrative";
import { RotatingWord } from "./components/RotatingWord";
import { ArrowRight } from "./components/ProductIcons";
import { WaitlistCta } from "./components/WaitlistCta";
import { h1, inkButton, lead, secondaryButton } from "./components/styles";

async function StructuredData({ locale }: { locale: string }) {
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Verkio",
    url: `https://verkio.eu/${locale}`,
    logo: "https://verkio.eu/og-image.png",
    description: tMeta("description"),
    sameAs: [],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
    />
  );
}

function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const words = t.raw("rotatingWords") as string[];
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-[1fr_minmax(0,32rem)] lg:pt-28 lg:pb-28">
      <div className="relative z-10">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/[0.03] px-3 py-1 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
          {t("eyebrow")}
        </p>
        <h1 className={`animate-hero-in motion-reduce:animate-none ${h1}`}>
          {t("headlinePrefix")}
          <RotatingWord words={words} />
        </h1>
        <p className={`animate-hero-in motion-reduce:animate-none mt-6 max-w-xl ${lead}`}>{t("body1")}</p>
        <p className={`animate-hero-in motion-reduce:animate-none mt-4 max-w-xl ${lead}`}>{t("body2")}</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/#waitlist" className={`animate-hero-in-later motion-reduce:animate-none ${inkButton}`}>
            {tNav("joinWaitlist")} <ArrowRight className="size-4" />
          </Link>
          <Link href="/product" className={`animate-hero-in-latest motion-reduce:animate-none ${secondaryButton}`}>
            {tNav("product")}
          </Link>
        </div>
      </div>
      <div className="animate-hero-in motion-reduce:animate-none hidden lg:block">
        <video
          src="/images/euro-map.webm"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="h-auto w-full scale-110 origin-right"
        />
      </div>
    </section>
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <StructuredData locale={locale} />
      <ConsoleEasterEgg />
      <Header />
      <main>
        <Hero />
        <HomeNarrative />
        <WaitlistCta />
      </main>
      <Footer />
    </>
  );
}
