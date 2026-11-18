import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AudienceDropdown } from "./AudienceDropdown";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ProductDropdown } from "./ProductDropdown";
import { ThemeToggle } from "./ThemeToggle";
import { inkButtonSm } from "./styles";

const navLink = "rounded-md px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground";

export function Logo({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const markClass = size === "sm" ? "h-6 w-auto" : "h-8 w-auto";
  const textClass =
    size === "sm"
      ? "text-lg font-semibold tracking-tight leading-none"
      : "text-2xl font-semibold tracking-tight leading-none";
  return (
    <span className={`inline-flex items-center gap-x-2 ${className}`}>
      <VerkioMark className={markClass} />
      <span className={textClass}>Verkio</span>
    </span>
  );
}

export function VerkioMark({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 858.320694 586.538568"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      className={className}
    >
      <g
        transform="translate(-0.179576,586.554711) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path d="M3365 5859 c-449 -36 -750 -108 -1050 -253 -720 -347 -1175 -967 -1276 -1741 -29 -222 -6 -602 51 -841 11 -47 20 -89 20 -93 0 -4 -42 -20 -92 -36 -410 -122 -755 -443 -906 -840 -134 -350 -146 -715 -36 -1060 29 -90 109 -264 157 -340 206 -327 523 -547 917 -635 83 -19 167 -20 2933 -20 3035 0 2937 -1 3182 46 337 65 623 213 851 439 212 211 344 462 417 796 53 236 52 218 52 1659 0 1464 1 1424 -57 1675 -148 641 -583 1060 -1248 1205 -200 44 -162 43 -2035 45 -979 2 -1825 -1 -1880 -6z m3645 -504 c149 -18 235 -36 345 -76 170 -60 281 -127 392 -237 193 -190 297 -437 333 -791 16 -167 13 -2525 -4 -2671 -64 -534 -301 -851 -746 -1001 -167 -56 -274 -70 -575 -75 l-270 -5 55 53 c320 308 506 659 579 1088 28 164 35 322 22 480 -39 455 -199 859 -474 1197 l-67 82 433 334 c237 184 446 350 463 368 52 55 68 97 68 169 0 78 -21 127 -77 182 -71 69 -202 87 -283 39 -18 -11 -250 -187 -515 -392 l-481 -372 -36 22 c-137 83 -407 194 -524 216 -34 6 -39 11 -48 49 -84 322 -163 524 -294 748 -106 182 -202 306 -361 466 l-142 142 1046 0 c833 -1 1069 -3 1161 -15z m-3301 -29 c612 -114 1063 -491 1299 -1086 30 -76 94 -272 89 -275 -1 -1 -43 -14 -93 -28 -111 -32 -262 -96 -308 -131 -50 -38 -89 -124 -89 -195 2 -135 111 -245 243 -244 40 1 83 12 160 43 140 56 235 80 350 87 83 5 107 2 192 -21 245 -67 447 -187 641 -380 418 -417 569 -1103 363 -1649 -163 -434 -560 -786 -1027 -912 -210 -56 -156 -55 -2223 -55 -2109 0 -1991 -4 -2184 65 -293 105 -514 356 -595 675 -29 117 -31 376 -3 495 42 182 119 324 248 459 106 112 220 186 356 232 256 88 443 82 700 -22 144 -59 200 -62 280 -19 140 76 176 257 74 376 -62 73 -301 172 -480 201 l-81 12 -21 79 c-240 887 80 1662 860 2084 193 105 526 208 685 213 28 0 68 5 90 10 60 13 377 4 474 -14z" />
      </g>
    </svg>
  );
}

export function Header() {
  const t = useTranslations("nav");
  return (
    <header className="sticky top-0 z-20 border-b border-ink/[0.06] bg-page/70 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-6xl items-center gap-1 px-4 sm:px-6">
        <Link href="/" aria-label="Verkio" className="mr-auto text-foreground">
          <Logo size="sm" />
        </Link>
        <Link href="/product" className={`${navLink} inline-flex sm:hidden`}>
          {t("product")}
        </Link>
        <ProductDropdown className={`${navLink} hidden sm:inline-flex`} />
        <AudienceDropdown className={`${navLink} hidden sm:inline-flex`} />
        <Link href="/why-verkio" className={`${navLink} hidden sm:inline-flex`}>
          {t("whyVerkio")}
        </Link>
        <Link href="/#waitlist" className={`${inkButtonSm} ml-2`}>
          {t("joinWaitlist")}
        </Link>
      </nav>
    </header>
  );
}

function LinkedInIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
    </svg>
  );
}

export function Footer() {
  const tFooter = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();
  const columns: { title: string; links: [href: string, label: string][] }[] = [
    {
      title: tFooter("productHeading"),
      links: [
        ["/product", tNav("product")],
        ["/why-verkio", tNav("whyVerkio")],
      ],
    },
    {
      title: tFooter("resourcesHeading"),
      links: [
        ["/roadmap", tNav("roadmap")],
        ["/articles", tNav("articles")],
        ["/what-verkio-is-and-isnt", tFooter("isAndIsnt")],
      ],
    },
    {
      title: tFooter("legalHeading"),
      links: [
        ["/privacy", tFooter("privacy")],
        ["/terms", tFooter("terms")],
        ["/subprocessors", tFooter("subprocessors")],
      ],
    },
    {
      title: tFooter("contactHeading"),
      links: [
        ["mailto:hello@verkio.eu", "hello@verkio.eu"],
        ["/#waitlist", tNav("joinWaitlist")],
      ],
    },
  ];
  const link = "transition-colors hover:text-foreground";
  return (
    <footer className="relative border-t border-ink/[0.06]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 pt-14 pb-10 sm:grid-cols-4 sm:px-6 md:grid-cols-[1fr_repeat(4,9rem)]">
        <div className="col-span-2 sm:col-span-4 md:col-span-1">
          <Link href="/" aria-label="Verkio" className="flex items-center gap-2.5 font-semibold tracking-tight text-foreground">
            <VerkioMark className="h-5 w-auto" />
            Verkio
          </Link>
          <p className="mt-3 max-w-xs text-[13px] text-muted-foreground">{tFooter("tagline")}</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title}>
            <h2 className="text-[13px] font-medium text-foreground">{c.title}</h2>
            <ul className="mt-4 space-y-3 text-[13px] text-muted-foreground">
              {c.links.map(([href, label]) => (
                <li key={href}>
                  {href.startsWith("mailto:") ? (
                    <a href={href} className={link}>
                      {label}
                    </a>
                  ) : (
                    <Link href={href} className={link}>
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/[0.06] py-6 text-[13px] text-muted-foreground">
          <span className="mr-auto">
            © {year} Verkio. {tFooter("allRightsReserved")}.
          </span>
          <a
            href="https://www.linkedin.com/company/verkio/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-foreground"
            aria-label="LinkedIn"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <span className="inline-flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </span>
        </div>
      </div>
    </footer>
  );
}
