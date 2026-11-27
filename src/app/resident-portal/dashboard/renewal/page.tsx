import type { Metadata } from "next";
import { RenewalUpload } from "@/components/sections/resident-portal/dashboard/RenewalUpload";
import { renewalContent, residentDemo } from "@/lib/data/residentDashboard";

export const metadata: Metadata = {
  title: "Lease renewal",
};

export default function ResidentDashboardRenewalPage() {
  return (
    <RenewalUpload
      title={renewalContent.title}
      leaseEndsPrefix={renewalContent.leaseEndsPrefix}
      leaseEndDate={residentDemo.profile.leaseEndDate}
      dropTitle={renewalContent.dropTitle}
      dropHintPrefix={renewalContent.dropHintPrefix}
      dropHintAction={renewalContent.dropHintAction}
      inputAriaLabel={renewalContent.inputAriaLabel}
      selectedFilesLabel={renewalContent.selectedFilesLabel}
      requiredHeading={renewalContent.requiredHeading}
      uploadedLabel={renewalContent.uploadedLabel}
      missingLabel={renewalContent.missingLabel}
      missingFileFallback={renewalContent.missingFileFallback}
      submitLabel={renewalContent.submitLabel}
      toastMessage={renewalContent.toastMessage}
      steps={residentDemo.renewalSteps}
      requirements={residentDemo.renewalRequirements}
    />
  );
}
