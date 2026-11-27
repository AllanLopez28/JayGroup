"use client";

import { useId, useRef } from "react";
import type { CSSProperties } from "react";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { useInView } from "@/hooks/useInView";
import type { AmenityAgreement } from "@/lib/types";

export interface AmenityTermsGlanceProps {
  agreement: AmenityAgreement;
}

export function AmenityTermsGlance({ agreement }: AmenityTermsGlanceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = useId();
  const inView = useInView(sectionRef, 0.2);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className={`dash-am-terms ${inView ? "is-in" : ""}`}
    >
      <div className="relative text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-brass">
          {agreement.eyebrow}
        </div>
        <h2
          id={headingId}
          className="mt-3 font-display text-[clamp(36px,3.6vw,50px)] font-normal leading-none tracking-[0.01em]"
        >
          {agreement.titlePrefix}{" "}
          <span className="text-cream">{agreement.titleEmphasis}</span>
        </h2>
        <span className="dash-am-rule" aria-hidden="true" />
      </div>

      <div className="relative mt-10 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-4 gap-y-[34px]">
        {agreement.glance.map((item, idx) => (
          <div
            key={item.label}
            style={{ "--i": idx } as CSSProperties}
            className="dash-am-item flex flex-col items-center gap-1.5 text-center"
          >
            <div className="relative mb-3.5 grid h-24 w-24 place-items-center rounded-full text-cream">
              <svg
                className="dash-am-ring"
                viewBox="0 0 98 98"
                aria-hidden="true"
              >
                <circle cx="49" cy="49" r="48" />
              </svg>
              <PortalIcon
                name={item.icon}
                size={30}
                strokeWidth={1.4}
                className="dash-am-ring-icon"
              />
            </div>
            <div className="font-display text-[clamp(30px,2.6vw,38px)] font-normal leading-none tabular-nums">
              {item.value}
            </div>
            <div className="dash-am-muted-copy max-w-[16ch] text-[11.5px] uppercase leading-[1.6] tracking-[0.2em]">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div
        aria-label={agreement.goodToKnowLabel}
        className="dash-am-know relative mt-11 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-px overflow-hidden rounded-[4px]"
      >
        {agreement.goodToKnow.map((item, idx) => (
          <div
            key={item.title}
            style={{ "--i": idx } as CSSProperties}
            className="dash-am-kn flex items-start gap-3.5 p-5"
          >
            <i
              aria-hidden="true"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] bg-portal-night-2 not-italic text-brass"
            >
              <PortalIcon name={item.icon} size={16} strokeWidth={1.6} />
            </i>
            <div>
              <b className="block text-sm font-semibold">{item.title}</b>
              <span className="dash-am-muted-copy mt-1 block text-[13px] leading-[1.5]">
                {item.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-7 flex flex-wrap items-center justify-between gap-4">
        <p className="dash-am-muted-copy m-0 max-w-[60ch] text-[13px]">
          {agreement.footnote}
        </p>
        <a
          href={agreement.pdfUrl}
          download={agreement.pdfFilename}
          className="dash-am-dlink inline-flex min-h-[48px] items-center gap-3 rounded-full pl-5 pr-2 text-xs font-semibold uppercase tracking-[0.1em] text-white no-underline"
        >
          <span>{agreement.downloadLinkLabel}</span>
          <i
            aria-hidden="true"
            className="dash-am-dlink-ic grid h-[34px] w-[34px] place-items-center rounded-full bg-brass not-italic text-portal-night"
          >
            <PortalIcon name="download" size={14} strokeWidth={2} />
          </i>
        </a>
      </div>
    </section>
  );
}
