/** Where the visitor's light or dark choice is kept: a cookie, read before the first paint (THEME_SCRIPT). */
export const THEME_KEY = "verkio-theme";

const STORED = `(?:^|; )${THEME_KEY}=(light|dark)(?:;|$)`;

/**
 * Run as <head> is parsed, before the first paint: the visitor's choice, if any, as a class on <html>, which wins over
 * the system's (globals.css). The pages are static, so the server can't render it, as Branchscope's does.
 */
export const THEME_SCRIPT = `try{var m=document.cookie.match(/${STORED}/);if(m)document.documentElement.classList.add(m[1])}catch(e){}`;

/** The same, from the browser's code: after React renders <html> afresh (a change of language), the class is gone. */
export function applyStoredTheme() {
  const choice = document.cookie.match(new RegExp(STORED))?.[1];
  if (!choice) return;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(choice);
}
