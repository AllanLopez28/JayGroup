import type { Metadata } from "next";
import { ExtraKeyForm } from "@/components/sections/resident-portal/dashboard/ExtraKeyForm";
import { extraKeyContent } from "@/lib/data/residentDashboard";

export const metadata: Metadata = {
  title: "Extra key",
};

export default function ResidentDashboardExtraKeyPage() {
  return (
    <ExtraKeyForm
      titlePrefix={extraKeyContent.titlePrefix}
      titleEmphasis={extraKeyContent.titleEmphasis}
      description={extraKeyContent.description}
      feeLabel={extraKeyContent.feeLabel}
      feeAmount={extraKeyContent.feeAmount}
      feeNote={extraKeyContent.feeNote}
      keyTypeLabel={extraKeyContent.keyTypeLabel}
      keyTypes={extraKeyContent.keyTypes}
      quantityLabel={extraKeyContent.quantityLabel}
      quantities={extraKeyContent.quantities}
      defaultQuantity={extraKeyContent.defaultQuantity}
      reasonLabel={extraKeyContent.reasonLabel}
      reasonPlaceholder={extraKeyContent.reasonPlaceholder}
      submitLabel={extraKeyContent.submitLabel}
      toastMessage={extraKeyContent.toastMessage}
    />
  );
}
