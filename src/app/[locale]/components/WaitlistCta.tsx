import { useTranslations } from "next-intl";
import { WaitlistForm } from "@/app/components/WaitlistForm";
import { eyebrow, h2Closing } from "./styles";

/** The closing call to action, as Branchscope's: centred, a large headline that fades, then the form. */
export function WaitlistCta() {
  const t = useTranslations("waitlist");
  const tHero = useTranslations("hero");
  return (
    <section id="waitlist" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 text-center sm:px-6">
      <p className={eyebrow}>{tHero("eyebrow")}</p>
      <h2 className={`mt-3 ${h2Closing}`}>{t("cardTitle")}</h2>
      <p className="mx-auto mt-4 max-w-lg text-muted-foreground">{t("cardSubtitle")}</p>
      <div className="mx-auto mt-10 max-w-md text-left">
        <WaitlistForm />
      </div>
    </section>
  );
}
