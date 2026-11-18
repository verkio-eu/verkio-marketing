"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  joinWaitlist,
  type WaitlistErrorKey,
} from "@/app/actions/waitlist";
import { inkButton, input, label } from "@/app/[locale]/components/styles";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; errorKey: WaitlistErrorKey };

export function WaitlistForm() {
  const t = useTranslations("waitlist");
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const result = await joinWaitlist(formData);

    if (result.success) {
      setState({ status: "success" });
    } else {
      setState({ status: "error", errorKey: result.errorKey });
    }
  }

  if (state.status === "success") {
    return <p className="text-center text-sm text-muted-foreground">{t("successMessage")}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          {t("emailLabel")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          disabled={state.status === "submitting"}
          className={input}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <div>
        <label htmlFor="company" className={label}>
          {t("companyLabel")}{" "}
          <span className="font-normal text-muted-foreground">
            {t("companyOptional")}
          </span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          autoComplete="organization"
          disabled={state.status === "submitting"}
          maxLength={255}
          className={input}
          placeholder={t("companyPlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className={`${inkButton} w-full`}
      >
        {state.status === "submitting" ? t("submitting") : t("submit")}
      </button>

      {state.status === "error" && (
        <p className="text-sm text-destructive" role="alert">
          {t(state.errorKey)}
        </p>
      )}
    </form>
  );
}
