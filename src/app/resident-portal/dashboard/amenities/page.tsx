import type { Metadata } from "next";
import { AmenityBooking } from "@/components/sections/resident-portal/dashboard/AmenityBooking";
import { amenitiesContent, residentDemo } from "@/lib/data/residentDashboard";

export const metadata: Metadata = {
  title: "Book a space",
};

export default function ResidentDashboardAmenitiesPage() {
  return (
    <AmenityBooking
      title={amenitiesContent.title}
      subtitlePrefix={amenitiesContent.subtitlePrefix}
      buildingName={residentDemo.profile.building}
      spacesGroupLabel={amenitiesContent.spacesGroupLabel}
      spaces={amenitiesContent.spaces}
      dateLabel={amenitiesContent.dateLabel}
      pickDatePlaceholder={amenitiesContent.pickDatePlaceholder}
      guestsLabel={amenitiesContent.guestsLabel}
      guestOptions={amenitiesContent.guestOptions}
      defaultGuests={amenitiesContent.defaultGuests}
      timeLabel={amenitiesContent.timeLabel}
      timeGroupLabel={amenitiesContent.timeGroupLabel}
      timeSlots={amenitiesContent.timeSlots}
      defaultTimeSlot={amenitiesContent.defaultTimeSlot}
      submitLabel={amenitiesContent.submitLabel}
      toastMessage={amenitiesContent.toastMessage}
      dateRequiredError={amenitiesContent.dateRequiredError}
    />
  );
}
