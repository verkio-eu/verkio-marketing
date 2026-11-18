"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { applyStoredTheme, THEME_SCRIPT } from "@/lib/theme";

const never = () => () => {};

/**
 * The visitor's light or dark choice on <html>: in the server's HTML, a script that runs before the first paint. A
 * change of language renders the [locale] layout afresh in the browser, where React would not run a script (and warns),
 * so there the choice is applied before paint by an effect instead.
 */
export function ThemeScript() {
  const inBrowser = useSyncExternalStore(never, () => true, () => false);
  useLayoutEffect(applyStoredTheme, []);
  return inBrowser ? null : <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />;
}
