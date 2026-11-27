import type { CSSProperties } from "react";
import { CountUp } from "@/components/sections/resident-portal/dashboard/CountUp";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import type { PaymentRecord, ResidentProfile } from "@/lib/types";

export interface PaymentsViewProps {
  title: string;
  accountPrefix: string;
  monthlyRentLabel: string;
  nextRentDueLabel: string;
  autopayLabel: string;
  tableCaption: string;
  columns: {
    date: string;
    description: string;
    amount: string;
    status: string;
    receipt: string;
  };
  unavailableTooltip: string;
  manageGoCtaLabel: string;
  manageGoUrl: string;
  profile: ResidentProfile;
  payments: readonly PaymentRecord[];
}

export function PaymentsView({
  title,
  accountPrefix,
  monthlyRentLabel,
  nextRentDueLabel,
  autopayLabel,
  tableCaption,
  columns,
  unavailableTooltip,
  manageGoCtaLabel,
  manageGoUrl,
  profile,
  payments,
}: PaymentsViewProps) {
  return (
    <section aria-label={title}>
      <div className="flex flex-col gap-6 rounded-[4px] border border-portal-line bg-white p-[clamp(24px,3vw,40px)]">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <SplitWords className="dash-h1" segments={[{ text: title }]} />
          <span
            className="dash-st text-xs uppercase tracking-[0.14em] text-brass-dark"
            style={{ "--i": 1 } as CSSProperties}
          >
            {accountPrefix} {profile.accountId}
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3.5">
          <div
            className="dash-st rounded-[4px] bg-portal-night p-[22px] text-white"
            style={{ "--i": 2 } as CSSProperties}
          >
            <div className="text-[11px] uppercase tracking-[0.16em] text-brass">
              {monthlyRentLabel}
            </div>
            <CountUp
              target={profile.monthlyRent}
              className="mt-3 font-display text-[44px] leading-none tabular-nums"
            />
            <div className="mt-2 text-[13px] text-[#c9cdd8]">
              {profile.unit} · {profile.building}
            </div>
          </div>

          <div
            className="dash-st rounded-[4px] bg-portal-bg p-[22px]"
            style={{ "--i": 3 } as CSSProperties}
          >
            <div className="text-xs uppercase tracking-[0.12em] text-portal-slate">
              {nextRentDueLabel}
            </div>
            <div className="mt-3 font-display text-[44px] leading-none tabular-nums text-portal-night">
              {profile.nextRentDueDate}
            </div>
            <div className="mt-2 text-[13px] text-portal-slate">
              {profile.autopayNote}
            </div>
          </div>

          <div
            className="dash-st rounded-[4px] bg-portal-bg p-[22px]"
            style={{ "--i": 4 } as CSSProperties}
          >
            <div className="text-xs uppercase tracking-[0.12em] text-portal-slate">
              {autopayLabel}
            </div>
            <div className="mt-3 font-display text-[44px] leading-none text-success">
              {profile.autopayStatusLabel}
            </div>
            <div className="mt-2 text-[13px] text-portal-slate">
              {profile.autopayMethod}
            </div>
          </div>
        </div>

        <div
          className="dash-st overflow-x-auto"
          style={{ "--i": 5 } as CSSProperties}
        >
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <caption className="sr-only">{tableCaption}</caption>
            <thead>
              <tr className="border-b border-portal-line text-[11.5px] uppercase tracking-[0.12em] text-portal-slate">
                <th scope="col" className="pb-2.5 pr-3 font-medium">
                  {columns.date}
                </th>
                <th scope="col" className="pb-2.5 pr-3 font-medium">
                  {columns.description}
                </th>
                <th scope="col" className="pb-2.5 pr-3 font-medium">
                  {columns.amount}
                </th>
                <th scope="col" className="pb-2.5 pr-3 font-medium">
                  {columns.status}
                </th>
                <th scope="col" className="pb-2.5 text-right font-medium">
                  {columns.receipt}
                </th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, idx) => (
                <tr
                  key={payment.id}
                  style={{ "--i": idx } as CSSProperties}
                  className="dash-tr-row border-b border-[#eef0f4] transition-colors duration-300 hover:bg-[#fafbfc]"
                >
                  <td className="py-3 pr-3 tabular-nums">{payment.date}</td>
                  <td className="py-3 pr-3 text-portal-slate">
                    {payment.description}
                  </td>
                  <td className="py-3 pr-3 font-semibold tabular-nums">
                    {payment.amountFormatted}
                  </td>
                  <td className="py-3 pr-3">
                    <span className="inline-block rounded-full bg-success-bg px-2.5 py-1 text-xs font-semibold text-success">
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    {payment.receiptUrl ? (
                      <a
                        href={payment.receiptUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={payment.receiptLabel}
                        className="dash-dl-btn inline-grid h-11 w-11 place-items-center rounded-full border border-portal-line-2 bg-white text-portal-night transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                      >
                        <PortalIcon name="download" size={16} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        aria-label={`${payment.receiptLabel} (${unavailableTooltip})`}
                        title={unavailableTooltip}
                        className="dash-dl-btn inline-grid h-11 w-11 cursor-not-allowed place-items-center rounded-full border border-portal-line-2 bg-white text-portal-slate opacity-50"
                      >
                        <PortalIcon name="download" size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pill
          href={manageGoUrl}
          external
          variant="dark"
          arrow
          className="dash-st self-start"
          style={{ "--i": 6 } as CSSProperties}
        >
          {manageGoCtaLabel}
        </Pill>
      </div>
    </section>
  );
}
