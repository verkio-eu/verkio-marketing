import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { heroGlow } from "./components/styles";
import { ThemeScript } from "./components/ThemeScript";
import "../globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

const ogLocaleMap: Record<string, string> = {
  en: "en_US",
  de: "de_DE",
  fr: "fr_FR",
  nl: "nl_NL",
  es: "es_ES",
  it: "it_IT",
  pt: "pt_PT",
  pl: "pl_PL",
  cs: "cs_CZ",
  sv: "sv_SE",
  da: "da_DK",
  nb: "nb_NO",
  fi: "fi_FI",
  et: "et_EE",
  lv: "lv_LV",
  lt: "lt_LT",
  is: "is_IS",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const url = `https://verkio.eu/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://verkio.eu"),
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url,
      siteName: "Verkio",
      locale: ogLocaleMap[locale] ?? "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
    },
  };
}

// The browser's chrome takes the page's colour: --page in globals.css, light and dark.
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#08090a" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    // Light or dark: the visitor's choice (ThemeScript adds it as a class before the first paint), else the system's.
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-page font-sans text-foreground">
        {/* A soft electric-blue glow at the top of every page, behind everything (the page's colour is the canvas's). */}
        <div aria-hidden="true" className={`${heroGlow} -z-10`} />
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
