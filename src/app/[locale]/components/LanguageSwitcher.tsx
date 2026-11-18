"use client";

import { useRef, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { useDismiss, useInsideViewport } from "./NavMenu";
import { ChevronDown } from "./ProductIcons";

type Locale = (typeof routing.locales)[number];

const labels: Record<Locale, string> = {
  en: "English",
  de: "Deutsch",
  fr: "Français",
  nl: "Nederlands",
  es: "Español",
  it: "Italiano",
  pt: "Português",
  pl: "Polski",
  cs: "Čeština",
  sv: "Svenska",
  da: "Dansk",
  nb: "Norsk",
  fi: "Suomi",
  et: "Eesti",
  lv: "Latviešu",
  lt: "Lietuvių",
  is: "Íslenska",
};

function GBFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" fill="#012169" />
      {/* White diagonals (St Andrew + St Patrick base) */}
      <path d="M0 0 L20 16 M20 0 L0 16" stroke="#fff" strokeWidth="3" />
      {/* Red diagonals (St Patrick), both directions */}
      <path d="M0 0 L20 16" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M20 0 L0 16" stroke="#C8102E" strokeWidth="1.2" />
      {/* White cross (St George base) */}
      <rect x="8" width="4" height="16" fill="#fff" />
      <rect y="6" width="20" height="4" fill="#fff" />
      {/* Red cross (St George) */}
      <rect x="9" width="2" height="16" fill="#C8102E" />
      <rect y="7" width="20" height="2" fill="#C8102E" />
    </svg>
  );
}

function SEFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" fill="#006AA7" />
      <rect x="6" width="2" height="16" fill="#FECC00" />
      <rect y="7" width="20" height="2" fill="#FECC00" />
    </svg>
  );
}

function DKFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" fill="#C8102E" />
      <rect x="6" width="2" height="16" fill="#fff" />
      <rect y="7" width="20" height="2" fill="#fff" />
    </svg>
  );
}

function NOFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" fill="#EF2B2D" />
      <rect x="5" width="3" height="16" fill="#fff" />
      <rect y="6.5" width="20" height="3" fill="#fff" />
      <rect x="6" width="1" height="16" fill="#002868" />
      <rect y="7.5" width="20" height="1" fill="#002868" />
    </svg>
  );
}

function FIFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" fill="#fff" />
      <rect x="6" width="2.5" height="16" fill="#003580" />
      <rect y="6.75" width="20" height="2.5" fill="#003580" />
    </svg>
  );
}

function ISFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" fill="#02529C" />
      <rect x="5" width="3" height="16" fill="#fff" />
      <rect y="6.5" width="20" height="3" fill="#fff" />
      <rect x="6" width="1" height="16" fill="#DC1E35" />
      <rect y="7.5" width="20" height="1" fill="#DC1E35" />
    </svg>
  );
}

function DEFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" y="0" fill="#000" />
      <rect width="20" height="16" y="5.33" fill="#DD0000" />
      <rect width="20" height="16" y="10.67" fill="#FFCE00" />
    </svg>
  );
}

function FRFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="6.67" height="16" x="0" fill="#0055A4" />
      <rect width="6.67" height="16" x="6.67" fill="#fff" />
      <rect width="6.67" height="16" x="13.33" fill="#EF4135" />
    </svg>
  );
}

function NLFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="16" y="0" fill="#AE1C28" />
      <rect width="20" height="16" y="5.33" fill="#fff" />
      <rect width="20" height="16" y="10.67" fill="#21468B" />
    </svg>
  );
}

function ESFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="4" y="0" fill="#AA151B" />
      <rect width="20" height="8" y="4" fill="#F1BF00" />
      <rect width="20" height="4" y="12" fill="#AA151B" />
    </svg>
  );
}

function ITFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="6.67" height="16" x="0" fill="#009246" />
      <rect width="6.67" height="16" x="6.67" fill="#fff" />
      <rect width="6.67" height="16" x="13.33" fill="#CE2B37" />
    </svg>
  );
}

function PLFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="8" y="0" fill="#fff" />
      <rect width="20" height="8" y="8" fill="#DC143C" />
    </svg>
  );
}

function PTFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="8" height="16" x="0" fill="#006600" />
      <rect width="12" height="16" x="8" fill="#FF0000" />
      <circle cx="8" cy="8" r="2" fill="#FFD700" stroke="#fff" strokeWidth="0.4" />
    </svg>
  );
}

function CSFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="8" y="0" fill="#fff" />
      <rect width="20" height="8" y="8" fill="#D7141A" />
      <polygon points="0,0 10,8 0,16" fill="#11457E" />
    </svg>
  );
}

function EEFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="5.33" y="0" fill="#0072CE" />
      <rect width="20" height="5.33" y="5.33" fill="#000" />
      <rect width="20" height="5.34" y="10.67" fill="#fff" />
    </svg>
  );
}

function LVFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="6.4" y="0" fill="#9E1B32" />
      <rect width="20" height="3.2" y="6.4" fill="#fff" />
      <rect width="20" height="6.4" y="9.6" fill="#9E1B32" />
    </svg>
  );
}

function LTFlag() {
  return (
    <svg
      viewBox="0 0 20 16"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <rect width="20" height="5.33" y="0" fill="#FDB913" />
      <rect width="20" height="5.33" y="5.33" fill="#006A44" />
      <rect width="20" height="5.34" y="10.67" fill="#C1272D" />
    </svg>
  );
}

const flags: Record<Locale, () => React.ReactElement> = {
  en: GBFlag,
  de: DEFlag,
  fr: FRFlag,
  nl: NLFlag,
  es: ESFlag,
  it: ITFlag,
  pt: PTFlag,
  pl: PLFlag,
  cs: CSFlag,
  sv: SEFlag,
  da: DKFlag,
  nb: NOFlag,
  fi: FIFlag,
  et: EEFlag,
  lv: LVFlag,
  lt: LTFlag,
  is: ISFlag,
};

function LanguagesIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 8 6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" />
    </svg>
  );
}

const flagFrame = "size-4 shrink-0 overflow-hidden rounded-full ring-1 ring-ink/10";

/** The footer's language menu, beside the theme toggle, as Branchscope's: every language with its flag. */
export function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, () => setOpen(false));
  useInsideViewport(menu, open);

  function switchTo(next: Locale) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t("language")}: ${labels[locale]}`}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-md text-[13px] text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
      >
        <LanguagesIcon className="size-3.5" aria-hidden="true" />
        {labels[locale]}
        <ChevronDown className="size-3.5 opacity-50" aria-hidden="true" />
      </button>
      {open && (
        <div
          ref={menu}
          role="menu"
          aria-label={t("language")}
          className="animate-menu-in motion-reduce:animate-none absolute right-0 bottom-full z-50 mb-2.5 grid w-[22rem] origin-bottom-right grid-cols-2 rounded-xl border border-ink/10 bg-panel/95 p-1.5 shadow-md backdrop-blur-md"
        >
          {routing.locales.map((l) => {
            const Flag = flags[l];
            return (
              <button
                key={l}
                type="button"
                role="menuitem"
                lang={l}
                aria-current={l === locale ? "true" : undefined}
                onClick={() => switchTo(l)}
                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] text-foreground outline-none transition-colors hover:bg-ink/[0.05] focus-visible:bg-ink/[0.05] ${
                  l === locale ? "bg-ink/[0.05] font-medium" : ""
                }`}
              >
                <span className={flagFrame}>
                  <Flag />
                </span>
                {labels[l]}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
