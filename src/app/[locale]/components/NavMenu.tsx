"use client";

import { type PointerEvent, type ReactNode, type RefObject, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { iconBox, pill } from "./styles";

export interface NavMenuItem {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  /** A small pill beside the title (Coming soon). */
  badge?: string;
}

/** Keeps an open popover 16px inside the window, as Radix's collision padding does for Branchscope's. */
export function useInsideViewport(ref: RefObject<HTMLElement | null>, open: boolean) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    // Measured without the opening animation's zoom, which would make it look narrower than it is.
    el.style.translate = "";
    el.style.animation = "none";
    const { left, right } = el.getBoundingClientRect();
    el.style.animation = "";
    const overflowRight = right - (document.documentElement.clientWidth - 16);
    const overflowLeft = 16 - left;
    if (overflowRight > 0) el.style.translate = `${-Math.min(overflowRight, -overflowLeft)}px 0`;
    else if (overflowLeft > 0) el.style.translate = `${overflowLeft}px 0`;
  }, [ref, open]);
}

/** Closes an open popover on a click outside `ref` or Escape. */
export function useDismiss(ref: RefObject<HTMLElement | null>, open: boolean, close: () => void) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: globalThis.PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [ref, open, close]);
}

/**
 * A top-bar menu in the style of Branchscope's (and Linear's): it opens on hover (and on click, a tap or the
 * keyboard), and closes shortly after the pointer leaves both the button and the menu. A dropdown of one or two
 * columns, each item an icon in a small frame beside its title and description.
 */
export function NavMenu({
  label,
  items,
  columns = 1,
  className = "",
}: {
  label: string;
  items: NavMenuItem[];
  columns?: 1 | 2;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const hovering = useRef(false);
  const closing = useRef<ReturnType<typeof setTimeout>>(undefined);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useInsideViewport(panel, open);
  useDismiss(root, open, () => setOpen(false));
  useEffect(() => () => clearTimeout(closing.current), []);
  // Hover is a mouse's: a tap also sends pointerenter and pointerleave, which would open the menu and shut it again.
  const enter = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovering.current = true;
    clearTimeout(closing.current);
    setOpen(true);
  };
  const leave = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    hovering.current = false;
    clearTimeout(closing.current);
    closing.current = setTimeout(() => setOpen(false), 150);
  };
  return (
    <div ref={root} className="relative" onPointerEnter={enter} onPointerLeave={leave}>
      <button
        type="button"
        // A click on a menu the pointer already opened leaves it open, instead of toggling it shut.
        onClick={() => setOpen((was) => hovering.current || !was)}
        aria-expanded={open}
        aria-haspopup="menu"
        className={`items-center outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 ${open ? "text-foreground" : ""} ${className}`}
      >
        {label}
      </button>
      {open && (
        <div
          ref={panel}
          role="menu"
          className={`animate-menu-in motion-reduce:animate-none absolute top-full left-0 z-50 mt-2.5 origin-top-left rounded-xl border border-ink/10 bg-panel/95 p-1.5 text-foreground shadow-md backdrop-blur-md ${
            columns === 2 ? "grid w-[min(36rem,calc(100vw-2rem))] sm:grid-cols-2" : "w-80"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-lg p-3 outline-none transition-colors hover:bg-ink/[0.05] focus-visible:bg-ink/[0.05]"
            >
              <span className={`mt-0.5 ${iconBox}`}>{item.icon}</span>
              <span className="grid gap-0.5">
                <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                  {item.title}
                  {item.badge && <span className={pill}>{item.badge}</span>}
                </span>
                <span className="text-[13px] leading-snug text-muted-foreground">{item.description}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
