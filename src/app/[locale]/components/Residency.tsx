import { useTranslations } from "next-intl";
import { Section } from "./Section";
import { hairlineGrid } from "./styles";

function LockIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  );
}

function GlobeIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
    </svg>
  );
}

function FlagIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 21V4" />
      <path d="M5 4h11l-2 4 2 4H5" />
    </svg>
  );
}

function ServerIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" strokeWidth="2" />
    </svg>
  );
}

function ShieldCheckIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3l8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

const residencyKeys = [
  "infrastructure",
  "encryption",
  "dns",
  "jurisdiction",
  "subprocessors",
] as const;

const residencyIcons = {
  infrastructure: ServerIcon,
  encryption: LockIcon,
  dns: GlobeIcon,
  jurisdiction: FlagIcon,
  subprocessors: ShieldCheckIcon,
};

/** Where the data lives, as Branchscope's security cards: a hairline grid, an icon, a title and a line each. */
export function Residency() {
  const t = useTranslations("residency");
  return (
    <Section id="residency" eyebrow={t("eyebrow")} title={t("headline")} lead={t("subhead")}>
      <ul role="list" className={`${hairlineGrid} sm:grid-cols-2 lg:grid-cols-5`}>
        {residencyKeys.map((key) => {
          const Icon = residencyIcons[key];
          return (
            <li key={key} className="bg-page p-6">
              <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-[15px] font-medium tracking-tight text-foreground">{t(`items.${key}.name`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(`items.${key}.description`)}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
