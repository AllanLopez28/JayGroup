import type { CSSProperties } from "react";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import type { PortalDocument } from "@/lib/types";

export interface DocumentsViewProps {
  title: string;
  subtitle: string;
  unavailableTooltip: string;
  documents: readonly PortalDocument[];
}

export function DocumentsView({
  title,
  subtitle,
  unavailableTooltip,
  documents,
}: DocumentsViewProps) {
  return (
    <section aria-label={title}>
      <div className="flex flex-col gap-6 rounded-[4px] border border-portal-line bg-white p-[clamp(24px,3vw,40px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <SplitWords className="dash-h1" segments={[{ text: title }]} />
          <span
            className="dash-st text-sm text-portal-slate"
            style={{ "--i": 1 } as CSSProperties}
          >
            {subtitle}
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-3">
          {documents.map((doc, idx) => (
            <div
              key={doc.id}
              style={{ "--i": idx + 2 } as CSSProperties}
              className="dash-st flex min-h-[76px] items-center gap-3.5 rounded-[4px] border border-portal-line bg-white py-3 pl-4 pr-3 transition-[border-color,transform,box-shadow] duration-450 ease-expo hover:-translate-y-[2px] hover:border-navy hover:shadow-[0_14px_30px_-20px_rgba(12,17,41,0.5)]"
            >
              <span
                aria-hidden="true"
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-[4px] text-[10.5px] font-bold tracking-[0.06em] ${
                  doc.highlight
                    ? "bg-portal-night text-cream"
                    : "bg-portal-bg text-navy"
                }`}
              >
                {doc.fileType}
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <b className="text-[15px] font-semibold text-portal-night">
                  {doc.title}
                </b>
                <span className="text-[12.5px] text-portal-slate">
                  {doc.meta}
                </span>
              </span>

              {doc.fileUrl ? (
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={doc.downloadLabel}
                  className="dash-dl-btn grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy bg-navy text-white transition-colors duration-300 hover:border-brass hover:bg-brass hover:text-portal-night"
                >
                  <PortalIcon name="download" size={16} />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  aria-label={`${doc.downloadLabel} (${unavailableTooltip})`}
                  title={unavailableTooltip}
                  className="dash-dl-btn grid h-11 w-11 shrink-0 cursor-not-allowed place-items-center rounded-full border border-navy bg-navy text-white opacity-45"
                >
                  <PortalIcon name="download" size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
