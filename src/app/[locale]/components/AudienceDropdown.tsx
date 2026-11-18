"use client";

import { useTranslations } from "next-intl";
import { NavMenu } from "./NavMenu";

type ItemKey = "individuals" | "teams" | "itAdmins" | "developers";

type IconProps = React.ComponentPropsWithoutRef<"svg">;

const items: { key: ItemKey; href: string }[] = [
  { key: "individuals", href: "/for/individuals" },
  { key: "teams", href: "/for/teams" },
  { key: "itAdmins", href: "/for/it-admins" },
  { key: "developers", href: "/for/developers" },
];

function strokeProps(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

function IndividualIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <circle cx="12" cy="9" r="3.5" />
      <path d="M5 20a7 7 0 0114 0" />
    </svg>
  );
}

function TeamIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <circle cx="9" cy="9" r="3" />
      <path d="M3 19a6 6 0 0112 0" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M15 14a4.5 4.5 0 016 4" />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TerminalIcon(props: IconProps) {
  return (
    <svg {...strokeProps(props)}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 10l3 2-3 2M13 14h4" />
    </svg>
  );
}

const icons: Record<ItemKey, (props: IconProps) => React.JSX.Element> = {
  individuals: IndividualIcon,
  teams: TeamIcon,
  itAdmins: ShieldIcon,
  developers: TerminalIcon,
};

export function AudienceDropdown({ className = "" }: { className?: string }) {
  const t = useTranslations("nav.audienceMenu");
  const tNav = useTranslations("nav");
  return (
    <NavMenu
      label={tNav("for")}
      className={className}
      columns={2}
      items={items.map(({ key, href }) => {
        const Icon = icons[key];
        return {
          href,
          icon: <Icon className="size-4 text-foreground" aria-hidden="true" />,
          title: t(`${key}.name`),
          description: t(`${key}.description`),
        };
      })}
    />
  );
}
