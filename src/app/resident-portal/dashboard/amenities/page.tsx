import type { Metadata } from "next";
import { AmenityBooking } from "@/components/sections/resident-portal/dashboard/amenities/AmenityBooking";
import { amenitiesContent, residentDemo } from "@/lib/data/residentDashboard";
import { todayInNewYork } from "@/lib/portal/amenities";

export const metadata: Metadata = {
  title: "Book a space",
};

export default function ResidentDashboardAmenitiesPage() {
  const minDate = todayInNewYork();

  return (
    <AmenityBooking
      title={amenitiesContent.title}
      subtitlePrefix={amenitiesContent.subtitlePrefix}
      buildingName={residentDemo.profile.building}
      spacesGroupLabel={amenitiesContent.spacesGroupLabel}
      spaces={amenitiesContent.spaces}
      defaultSpaceId={amenitiesContent.defaultSpaceId}
      dateLabel={amenitiesContent.dateLabel}
      minDate={minDate}
      pickDatePlaceholder={amenitiesContent.pickDatePlaceholder}
      guestsLabel={amenitiesContent.guestsLabel}
      guestOptions={amenitiesContent.guestOptions}
      defaultGuestOptionId={amenitiesContent.defaultGuestOptionId}
      durationLabel={amenitiesContent.durationLabel}
      durationGroupLabel={amenitiesContent.durationGroupLabel}
      defaultDurationHours={amenitiesContent.defaultDurationHours}
      startTimeLabel={amenitiesContent.startTimeLabel}
      startTimeGroupLabel={amenitiesContent.startTimeGroupLabel}
      startHours={amenitiesContent.startHours}
      defaultStartHour={amenitiesContent.defaultStartHour}
      submitLabel={amenitiesContent.submitLabel}
      summaryEstimatePrefix={amenitiesContent.summaryEstimatePrefix}
      summaryRentalSuffix={amenitiesContent.summaryRentalSuffix}
      summaryCleaningSuffix={amenitiesContent.summaryCleaningSuffix}
      dialogCopy={amenitiesContent.dialog}
      toastDurationMs={amenitiesContent.toastDurationMs}
    />
  );
}
