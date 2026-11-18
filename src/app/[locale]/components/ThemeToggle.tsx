"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTranslations } from "next-intl";
import { THEME_KEY } from "@/lib/theme";

/** The theme in use: the visitor's choice (a class on <html>), else the system's. */
function current(): "light" | "dark" {
  const html = document.documentElement.classList;
  if (html.contains("light")) return "light";
  if (html.contains("dark")) return "dark";
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Follows the theme: a change of the class on <html> (the toggle) or of the system's choice. */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const media = matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    media.removeEventListener("change", onChange);
  };
}

/**
 * Switches to the other theme. Where the browser has view transitions (and motion is welcome), the new theme grows
 * as a circle from the toggle over a still picture of the old one; elsewhere it changes at once.
 */
function switchTheme(next: "light" | "dark", from: HTMLElement, apply: () => void) {
  const change = () => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    apply();
  };
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return change();
  const { left, top, width, height } = from.getBoundingClientRect();
  const x = left + width / 2;
  const y = top + height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  // ready rejects only when the browser skips the transition; the theme has changed anyway, without the animation.
  document
    .startViewTransition(() => flushSync(change))
    .ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "cubic-bezier(0.2, 0.7, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    })
    .catch(() => {});
}

function SunIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

/** Light or dark, overriding the system's choice; kept in a cookie, applied before the first paint (ThemeScript). */
export function ThemeToggle() {
  const t = useTranslations("footer");
  // Unknown on the server (the page is static), so the moon until the browser says otherwise.
  const theme = useSyncExternalStore(subscribe, current, () => null);
  const next = theme === "dark" ? "light" : "dark";
  const label = next === "light" ? t("themeLight") : t("themeDark");
  return (
    <button
      type="button"
      onClick={(e) =>
        switchTheme(next, e.currentTarget, () => {
          document.cookie = `${THEME_KEY}=${next}; path=/; max-age=31536000; samesite=lax`;
        })
      }
      aria-label={label}
      title={label}
      className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
    >
      {theme === "dark" ? <SunIcon className="size-3.5" aria-hidden /> : <MoonIcon className="size-3.5" aria-hidden />}
    </button>
  );
}
