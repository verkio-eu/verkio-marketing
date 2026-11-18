import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Footer, Header } from "./components/Layout";
import { eyebrow, h1Page, inkButton, lead } from "./components/styles";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <>
      <Header />
      <main>
        <section className="mx-auto max-w-2xl px-4 pt-24 pb-28 text-center sm:px-6 lg:pt-32">
          <p className={`font-mono ${eyebrow}`}>{t("eyebrow")}</p>
          <h1 className={`mt-4 ${h1Page}`}>{t("headline")}</h1>
          <p className={`mt-6 ${lead}`}>{t("body")}</p>
          <div className="mt-9">
            <Link href="/" className={inkButton}>
              ← {t("backLink")}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
