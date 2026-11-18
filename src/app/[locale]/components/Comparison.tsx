"use client";

import { Fragment, useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "./Section";

const comparisonRows = [
  "infrastructure",
  "cloudAct",
  "gdpr",
  "keys",
  "standards",
  "dns",
  "ai",
  "unifiedSearch",
] as const;

function CheckPill() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
      <svg
        viewBox="0 0 16 16"
        className="h-3 w-3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 8l3 3 7-7" />
      </svg>
    </span>
  );
}

function DashPill() {
  return (
    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-ink/15 text-muted-foreground">
      <svg viewBox="0 0 16 16" className="h-3 w-3">
        <line
          x1="4"
          y1="8"
          x2="12"
          y2="8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function QuestionIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9.09 9.5a3 3 0 015.83 1c0 2-3 3-3 3" />
      <circle cx="12" cy="17" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Comparison() {
  const t = useTranslations("comparison");
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section id="comparison" eyebrow={t("eyebrow")} title={t("headline")} lead={t("subhead")}>
        <div className="overflow-x-auto rounded-xl border border-ink/[0.08]">
          <div className="min-w-[760px]">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink/[0.03] text-muted-foreground">
                <tr>
                  <th
                    scope="col"
                    className="w-2/5 px-5 py-3 font-medium"
                  >
                    <span className="sr-only">Feature</span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 align-bottom font-medium text-foreground"
                  >
                    {t("columns.verkio")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 align-bottom font-medium"
                  >
                    {t("columns.google")}
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 align-bottom font-medium"
                  >
                    {t("columns.microsoft")}
                  </th>
                  <th
                    scope="col"
                    className="w-16 px-4 py-3 text-center align-bottom text-xs font-medium tracking-wider uppercase"
                  >
                    {t("columns.info")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((key) => {
                  const isOpen = expanded === key;
                  return (
                    <Fragment key={key}>
                      <tr className="border-t border-ink/[0.06] align-top">
                        <th
                          scope="row"
                          className="px-5 py-4 align-top font-medium text-foreground"
                        >
                          {t(`rows.${key}.label`)}
                        </th>
                        <td className="px-4 py-4 align-top">
                          <span className="inline-flex items-center gap-2 font-medium text-foreground">
                            <CheckPill />
                            {t(`rows.${key}.verkio`)}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span className="inline-flex items-center gap-2 text-muted-foreground">
                            <DashPill />
                            {t(`rows.${key}.google`)}
                          </span>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <span className="inline-flex items-center gap-2 text-muted-foreground">
                            <DashPill />
                            {t(`rows.${key}.microsoft`)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center align-top">
                          <button
                            type="button"
                            onClick={() =>
                              setExpanded(isOpen ? null : key)
                            }
                            aria-expanded={isOpen}
                            aria-controls={`info-${key}`}
                            aria-label={t("infoLabel")}
                            className={`inline-flex items-center justify-center rounded-full transition-colors ${
                              isOpen
                                ? "text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <QuestionIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                      <tr id={`info-${key}`} aria-hidden={!isOpen}>
                        <td colSpan={5} className="p-0">
                          <div
                            className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                              isOpen
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div
                                className={`px-5 pb-5 transition-opacity duration-200 ${
                                  isOpen
                                    ? "opacity-100 delay-100"
                                    : "opacity-0"
                                }`}
                              >
                                <div className="rounded-lg bg-ink/[0.04] p-5 text-sm leading-relaxed text-muted-foreground">
                                  {t(`rows.${key}.info`)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </Section>
  );
}
