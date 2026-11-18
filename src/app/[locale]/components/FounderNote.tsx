import { useTranslations } from "next-intl";
import { eyebrow } from "./styles";

export function FounderNote() {
  const t = useTranslations("founderNote");
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <figure className="mx-auto max-w-2xl">
        <p className={eyebrow}>{t("eyebrow")}</p>
        <blockquote className="mt-6 text-xl leading-relaxed tracking-[-0.01em] text-heading sm:text-2xl">{t("body")}</blockquote>
        <figcaption className="mt-6 flex items-center gap-4">
          {/* PLACEHOLDER — replace with a small founder photo (round, ~48px). */}
          <span
            aria-hidden="true"
            className="flex size-12 items-center justify-center rounded-full border border-dashed border-ink/15 bg-ink/[0.03] font-mono text-xs tracking-wider text-muted-foreground uppercase"
          >
            IMG
          </span>
          <span className="text-sm font-medium text-muted-foreground">{t("signature")}</span>
        </figcaption>
      </figure>
    </section>
  );
}
