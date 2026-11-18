import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, productIcons, type ProductIconKey } from "./ProductIcons";
import { eyebrow, h1, iconBox, lead, pill } from "./styles";

const items: { key: ProductIconKey; href: string; comingSoon?: boolean }[] = [
  { key: "mail", href: "/product/mail" },
  { key: "calendar", href: "/product/calendar" },
  { key: "contacts", href: "/product/contacts" },
  { key: "files", href: "/product/files" },
  { key: "wikis", href: "/product/wikis" },
  { key: "messaging", href: "/product/messaging" },
  { key: "api", href: "/product/api" },
  { key: "signIn", href: "/product/sign-in-with-verkio", comingSoon: true },
];

/** Every product, as Branchscope's /product overview: a centred hero, then a card for each. */
export function ProductIndex() {
  const t = useTranslations("productIndex");
  const tMenu = useTranslations("nav.productMenu");
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-20 pb-8 text-center sm:px-6 lg:pt-28">
        <p className={`animate-hero-in motion-reduce:animate-none ${eyebrow}`}>{t("eyebrow")}</p>
        <h1 className={`animate-hero-in motion-reduce:animate-none mx-auto mt-4 max-w-3xl ${h1}`}>{t("headline")}</h1>
        <p className={`animate-hero-in motion-reduce:animate-none mx-auto mt-6 max-w-2xl ${lead}`}>{t("body")}</p>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <ul role="list" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ key, href, comingSoon }) => {
            const Icon = productIcons[key];
            return (
              <li key={key}>
                <Link
                  href={href}
                  className="group flex h-full gap-3 rounded-xl border border-ink/10 bg-ink/[0.02] p-4 transition-colors hover:bg-ink/[0.05]"
                >
                  <span className={`mt-0.5 ${iconBox}`}>
                    <Icon className="size-4 text-foreground" aria-hidden="true" />
                  </span>
                  <span className="grid min-w-0 content-start gap-1">
                    <span className="flex items-center gap-2 text-[15px] font-medium text-foreground">
                      {tMenu(`${key}.name`)}
                      {comingSoon && <span className={pill}>{tMenu("comingSoon")}</span>}
                    </span>
                    <span className="text-[13px] leading-relaxed text-muted-foreground">{tMenu(`${key}.description`)}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-medium text-primary group-hover:underline">
                      {t("learnMore")} <ArrowRight className="size-3.5" />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
