"use client";

import { useTranslations } from "next-intl";
import { NavMenu } from "./NavMenu";
import { productIcons, type ProductIconKey } from "./ProductIcons";

type ItemKey = ProductIconKey;

const items: { key: ItemKey; href: string; comingSoon?: boolean }[] = [
  { key: "mail", href: "/product/mail" },
  { key: "calendar", href: "/product/calendar" },
  { key: "contacts", href: "/product/contacts" },
  { key: "files", href: "/product/files" },
  { key: "wikis", href: "/product/wikis" },
  { key: "messaging", href: "/product/messaging" },
  { key: "api", href: "/product/api" },
  { key: "signIn", href: "/product/sign-in-with-verkio", comingSoon: true },
];

export function ProductDropdown({ className = "" }: { className?: string }) {
  const t = useTranslations("nav.productMenu");
  const tNav = useTranslations("nav");
  return (
    <NavMenu
      label={tNav("product")}
      className={className}
      columns={2}
      items={items.map(({ key, href, comingSoon }) => {
        const Icon = productIcons[key];
        return {
          href,
          icon: <Icon className="size-4 text-foreground" aria-hidden="true" />,
          title: t(`${key}.name`),
          description: t(`${key}.description`),
          badge: comingSoon ? t("comingSoon") : undefined,
        };
      })}
    />
  );
}
