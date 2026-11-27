"use client";

import { useState } from "react";
import type { ChangeEvent, CSSProperties, DragEvent, FormEvent } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import { useToast } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import { submitRenewalDocuments } from "@/lib/portal/actions";
import type { RenewalRequirement, RenewalStep } from "@/lib/types";

export interface RenewalUploadProps {
  title: string;
  leaseEndsPrefix: string;
  leaseEndDate: string;
  dropTitle: string;
  dropHintPrefix: string;
  dropHintAction: string;
  inputAriaLabel: string;
  selectedFilesLabel: string;
  requiredHeading: string;
  uploadedLabel: string;
  missingLabel: string;
  missingFileFallback: string;
  submitLabel: string;
  toastMessage: string;
  steps: readonly RenewalStep[];
  requirements: readonly RenewalRequirement[];
}

export function RenewalUpload({
  title,
  leaseEndsPrefix,
  leaseEndDate,
  dropTitle,
  dropHintPrefix,
  dropHintAction,
  inputAriaLabel,
  selectedFilesLabel,
  requiredHeading,
  uploadedLabel,
  missingLabel,
  missingFileFallback,
  submitLabel,
  toastMessage,
  steps,
  requirements,
}: RenewalUploadProps) {
  const { showToast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addFileList = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      return;
    }
    const nextNames = Array.from(fileList).map((file) => file.name);
    setSelectedFiles((prev) => {
      const merged = new Set([...prev, ...nextNames]);
      return Array.from(merged);
    });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFileList(event.target.files);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    addFileList(event.dataTransfer.files);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await submitRenewalDocuments({ files: selectedFiles });
      showToast(toastMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section aria-label={title}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 rounded-[4px] border border-portal-line bg-white p-[clamp(24px,3vw,40px)]"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <SplitWords className="dash-h1" segments={[{ text: title }]} />
          <span
            className="dash-st text-xs uppercase tracking-[0.14em] text-brass-dark"
            style={{ "--i": 1 } as CSSProperties}
          >
            {leaseEndsPrefix} {leaseEndDate}
          </span>
        </div>

        <ol
          className="dash-st m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-3 sm:gap-2.5"
          style={{ "--i": 2 } as CSSProperties}
        >
          {steps.map((step) => (
            <li
              key={step.id}
              className={`flex flex-col gap-2 text-sm ${
                step.current
                  ? "font-semibold text-portal-night"
                  : "text-portal-slate"
              }`}
            >
              <span
                aria-hidden="true"
                className="relative block h-[3px] overflow-hidden rounded-[3px] bg-portal-line"
              >
                {step.current && (
                  <i className="dash-step-bar absolute inset-0 bg-brass" />
                )}
              </span>
              <span>{step.label}</span>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-6">
          <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-3">
            <label
              onDragEnter={handleDragOver}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ "--i": 3 } as CSSProperties}
              className={`dash-drop dash-st relative flex min-h-[240px] cursor-pointer flex-col items-center justify-center gap-2.5 rounded-[4px] border-[1.5px] border-dashed p-5 text-center transition-colors duration-300 ${
                isDragging
                  ? "is-over border-navy bg-[#f1f3f8]"
                  : "border-[#c5cad6] bg-[#f8f9fb] hover:border-navy hover:bg-[#f1f3f8]"
              }`}
            >
              <PortalIcon
                name="upload"
                size={30}
                className="dash-drop-icon text-navy"
              />
              <b className="text-base font-semibold text-portal-night">
                {dropTitle}
              </b>
              <span className="text-[13px] text-portal-slate">
                {dropHintPrefix} <u>{dropHintAction}</u>
              </span>
              <input
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                aria-label={inputAriaLabel}
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </label>

            {selectedFiles.length > 0 && (
              <div className="rounded-[4px] border border-portal-line bg-portal-bg px-3.5 py-3">
                <div className="text-[11px] uppercase tracking-[0.12em] text-portal-slate">
                  {selectedFilesLabel}
                </div>
                <ul className="mt-1.5 space-y-1 text-sm text-portal-night">
                  {selectedFiles.map((fileName) => (
                    <li key={fileName} className="truncate font-medium">
                      {fileName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex min-w-0 flex-1 basis-[320px] flex-col gap-2.5">
            <div className="text-[11.5px] uppercase tracking-[0.12em] text-portal-slate">
              {requiredHeading}
            </div>

            {requirements.map((req, idx) => {
              const isUploaded = req.status === "uploaded";
              return (
                <div
                  key={req.id}
                  style={{ "--i": idx } as CSSProperties}
                  className="dash-ri flex min-h-[56px] items-center gap-3 rounded-[4px] bg-portal-bg px-3.5 py-2 text-sm"
                >
                  <span
                    aria-hidden="true"
                    className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full text-white ${
                      isUploaded ? "bg-success" : "bg-[#c5cad6]"
                    }`}
                  >
                    <PortalIcon name="check" size={12} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <b className="font-semibold text-portal-night">
                      {req.title}
                    </b>
                    <span className="truncate text-xs text-portal-slate">
                      {req.fileName ?? missingFileFallback}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 text-xs font-semibold ${
                      isUploaded ? "text-success" : "text-brass-dark"
                    }`}
                  >
                    {isUploaded ? uploadedLabel : missingLabel}
                  </span>
                </div>
              );
            })}

            <Pill
              type="submit"
              variant="dark"
              disabled={isSubmitting}
              className="dash-st mt-1.5 self-start"
              style={{ "--i": 6 } as CSSProperties}
            >
              {submitLabel}
            </Pill>
          </div>
        </div>
      </form>
    </section>
  );
}
