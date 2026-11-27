import type { Metadata } from "next";
import { PaymentsView } from "@/components/sections/resident-portal/dashboard/PaymentsView";
import { paymentsContent, residentDemo } from "@/lib/data/residentDashboard";

export const metadata: Metadata = {
  title: "Payments",
};

export default function ResidentDashboardPaymentsPage() {
  return (
    <PaymentsView
      title={paymentsContent.title}
      accountPrefix={paymentsContent.accountPrefix}
      monthlyRentLabel={paymentsContent.monthlyRentLabel}
      nextRentDueLabel={paymentsContent.nextRentDueLabel}
      autopayLabel={paymentsContent.autopayLabel}
      tableCaption={paymentsContent.tableCaption}
      columns={paymentsContent.columns}
      unavailableTooltip={paymentsContent.unavailableTooltip}
      manageGoCtaLabel={paymentsContent.manageGoCtaLabel}
      manageGoUrl={paymentsContent.manageGoUrl}
      profile={residentDemo.profile}
      payments={residentDemo.payments}
    />
  );
}
