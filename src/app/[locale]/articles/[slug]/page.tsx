import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Footer, Header } from "@/app/[locale]/components/Layout";
import { h1Page, lead, textLink } from "@/app/[locale]/components/styles";
import {
  articles,
  articleSlugs,
} from "@/content/articles/registry";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    articleSlugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = articles[slug];
  if (!article) {
    return { title: "Not found — Verkio" };
  }

  const url = `https://verkio.eu/${locale}/articles/${slug}`;
  const title = `${article.meta.title} — Verkio`;

  return {
    title,
    description: article.meta.description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `https://verkio.eu/${l}/articles/${slug}`,
          ]),
        ),
        "x-default": `https://verkio.eu/${routing.defaultLocale}/articles/${slug}`,
      },
    },
    openGraph: {
      title: article.meta.title,
      description: article.meta.description,
      url,
      type: "article",
      publishedTime: article.meta.publishedAt,
      modifiedTime: article.meta.lastModified,
      tags: article.meta.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.meta.title,
      description: article.meta.description,
    },
  };
}

function ArticleStructuredData({
  slug,
  locale,
}: {
  slug: string;
  locale: string;
}) {
  const article = articles[slug];
  if (!article) return null;

  const url = `https://verkio.eu/${locale}/articles/${slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.meta.title,
    description: article.meta.description,
    datePublished: article.meta.publishedAt,
    dateModified: article.meta.lastModified,
    author: { "@type": "Organization", name: "Verkio" },
    publisher: {
      "@type": "Organization",
      name: "Verkio",
      logo: { "@type": "ImageObject", url: "https://verkio.eu/icon" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: article.meta.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `https://verkio.eu/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `https://verkio.eu/${locale}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.meta.title,
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const article = articles[slug];
  if (!article) notFound();

  const Body = article.default;

  return (
    <>
      <ArticleStructuredData slug={slug} locale={locale} />
      <Header />
      <main>
        <article className="mx-auto max-w-2xl px-4 pt-20 pb-24 sm:px-6 lg:pt-28">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
            <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
              Articles
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={article.meta.publishedAt}>
              {new Date(article.meta.publishedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span aria-hidden="true">·</span>
            <span>{article.meta.readingMinutes} min read</span>
          </div>
          <h1 className={`mt-4 ${h1Page}`}>{article.meta.title}</h1>
          <p className={`mt-6 ${lead}`}>{article.meta.description}</p>

          <div className="article-body mt-14">
            <Body />
          </div>

          <div className="mt-16">
            <Link href="/articles" className={textLink}>
              ← All articles
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
