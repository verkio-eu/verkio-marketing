"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  submitRoadmapRequest,
  type RoadmapRequestErrorKey,
} from "@/app/actions/roadmapRequest";
import { inkButton, input, label, textarea } from "@/app/[locale]/components/styles";

type FormState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | { status: "error"; errorKey: RoadmapRequestErrorKey };


export function RoadmapRequestForm() {
  const t = useTranslations("roadmap.requestForm");
  const [state, setState] = useState<FormState>({ status: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: "submitting" });

    const formData = new FormData(event.currentTarget);
    const result = await submitRoadmapRequest(formData);

    if (result.success) {
      setState({ status: "success" });
    } else {
      setState({ status: "error", errorKey: result.errorKey });
    }
  }

  if (state.status === "success") {
    return (
      <p className="text-sm text-muted-foreground">{t("successMessage")}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="rrf-website">Website</label>
        <input
          type="text"
          id="rrf-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label
          htmlFor="rrf-request"
          className={label}
        >
          {t("requestLabel")}
        </label>
        <textarea
          id="rrf-request"
          name="request"
          required
          minLength={10}
          maxLength={1000}
          rows={4}
          disabled={state.status === "submitting"}
          className={`${textarea} resize-y`}
          placeholder={t("requestPlaceholder")}
        />
      </div>

      <div>
        <label
          htmlFor="rrf-email"
          className={label}
        >
          {t("emailLabel")}{" "}
          <span className="font-normal text-muted-foreground">
            {t("emailOptional")}
          </span>
        </label>
        <input
          type="email"
          id="rrf-email"
          name="email"
          autoComplete="email"
          disabled={state.status === "submitting"}
          className={input}
          placeholder={t("emailPlaceholder")}
        />
      </div>

      <button
        type="submit"
        disabled={state.status === "submitting"}
        className={inkButton}
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
