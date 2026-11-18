// The marketing pages' shared classes, after Branchscope's (apps/web/app/(marketing)): headings that fade to the
// background, the electric-blue label above them, ink and secondary buttons, hairline cards.

// The padding lets descenders (g, y) show: the gradient only paints inside the box. The margin takes it back.
export const gradientText = "bg-gradient-to-b from-heading to-heading/55 bg-clip-text pb-[0.12em] -mb-[0.12em] text-transparent";

/** A page's headline (landing and product heroes). */
export const h1 = `text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.035em] text-balance sm:text-6xl ${gradientText}`;
/** A smaller page headline (roadmap, articles, legal pages). */
export const h1Page = `text-4xl font-semibold tracking-[-0.03em] sm:text-5xl ${gradientText}`;
/** A section's headline. */
export const h2 = `text-3xl font-semibold tracking-[-0.025em] sm:text-4xl ${gradientText}`;
/** The closing call to action's headline. */
export const h2Closing = `text-3xl font-semibold tracking-[-0.025em] sm:text-5xl ${gradientText}`;

/** The label above a headline. */
export const eyebrow = "text-sm font-medium text-primary";
/** A hero's lead paragraph. */
export const lead = "text-[17px] leading-relaxed text-pretty text-muted-foreground";
/** A section's lead paragraph. */
export const sectionLead = "text-[16px] leading-relaxed text-muted-foreground";

const button =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50";
/** Near-black in light mode, near-white in dark: the primary call to action. */
export const inkButton = `${button} bg-foreground text-background shadow-xs hover:bg-foreground/90 h-10 px-4`;
/** The top bar's call to action. */
export const inkButtonSm = `${button} bg-foreground text-background shadow-xs hover:bg-foreground/90 h-8 gap-1.5 px-3`;
/** Beside an ink button. */
export const secondaryButton =
  "inline-flex items-center gap-1.5 rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-ink/[0.07]";

/** A text link back or onwards. */
export const textLink = "inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline";
/** A link inside running text. */
export const inlineLink = "text-foreground underline underline-offset-4 hover:text-primary";

/** A grid of cards divided by hairlines: put `bg-page` on each cell. */
export const hairlineGrid = "grid gap-px overflow-hidden rounded-xl border border-ink/[0.06] bg-ink/[0.06]";
/** A card's icon in a small framed square. */
export const iconBox = "flex size-8 shrink-0 items-center justify-center rounded-md border border-ink/10 bg-ink/[0.03]";

/** A small pill beside a title (Coming soon, a date), and its shape for one in another colour. */
export const pillShape = "rounded-full border px-2 py-0.5 text-[11px] leading-none font-normal whitespace-nowrap";
export const pill = `${pillShape} border-ink/10 text-muted-foreground`;

/** The marketing pages' soft electric-blue glow behind the hero. */
export const heroGlow =
  "pointer-events-none absolute inset-x-0 top-0 h-[640px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,light-dark(rgba(10,102,255,0.12),rgba(31,117,255,0.24)),transparent)]";

/** A form field, as Branchscope's Input. */
export const input =
  "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50";
/** A multi-line form field, as Branchscope's Input otherwise. */
export const textarea = input.replace("h-9 ", "min-h-16 ").replace("py-1 ", "py-2 ");
/** A form field's label. */
export const label = "mb-2 block text-sm font-medium text-foreground";
