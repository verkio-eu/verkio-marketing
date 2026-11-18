import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { eyebrow, h1Page, lead, textLink } from "@/app/[locale]/components/styles";
import { articlesSortedByDate } from "@/content/articles/registry";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const url = `https://verkio.eu/${locale}/articles`;

  return {
    title: "Articles — Verkio",
    description:
      "Writing on data sovereignty, EU-resident infrastructure, GDPR, and the choices behind a European work suite.",
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `https://verkio.eu/${l}/articles`]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/articles`,
      },
    },
  };
}

function ArticleList() {
  return (
    <section className="mx-auto max-w-3xl px-4 pt-20 pb-24 sm:px-6 lg:pt-28">
      <p className={eyebrow}>Articles</p>
      <h1 className={`mt-4 ${h1Page}`}>Notes from building a sovereign EU work suite.</h1>
      <p className={`mt-6 ${lead}`}>
        Writing on data sovereignty, EU-resident infrastructure, GDPR,
        and the engineering choices behind Verkio.
      </p>
      <ul className="mt-14 divide-y divide-ink/[0.06] rounded-xl border border-ink/[0.08]">
        {articlesSortedByDate.map(({ meta }) => (
          <li key={meta.slug}>
            <Link href={`/articles/${meta.slug}`} className="group block p-5 transition-colors hover:bg-ink/[0.03]">
              <div className="flex items-center gap-x-3 text-[13px] text-muted-foreground">
                <time dateTime={meta.publishedAt}>
                  {new Date(meta.publishedAt).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{meta.readingMinutes} min read</span>
              </div>
              <h2 className="mt-2 text-lg font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
                {meta.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{meta.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-12">
        <Link href="/" className={textLink}>
          ← Back to home
        </Link>
      </div>
    </section>
  );
}

export default async function ArticlesIndex({
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
        <ArticleList />
      </main>
      <Footer />
    </>
  );
}
