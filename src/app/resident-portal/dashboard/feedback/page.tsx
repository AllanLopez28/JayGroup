import type { Metadata } from "next";
import { FeedbackForm } from "@/components/sections/resident-portal/dashboard/FeedbackForm";
import { feedbackContent } from "@/lib/data/residentDashboard";

export const metadata: Metadata = {
  title: "Feedback",
};

export default function ResidentDashboardFeedbackPage() {
  return (
    <FeedbackForm
      title={feedbackContent.title}
      lead={feedbackContent.lead}
      ratingLabel={feedbackContent.ratingLabel}
      defaultRating={feedbackContent.defaultRating}
      topicLabel={feedbackContent.topicLabel}
      topics={feedbackContent.topics}
      defaultTopic={feedbackContent.defaultTopic}
      messageLabel={feedbackContent.messageLabel}
      messagePlaceholder={feedbackContent.messagePlaceholder}
      messageRequiredError={feedbackContent.messageRequiredError}
      anonymousLabel={feedbackContent.anonymousLabel}
      submitLabel={feedbackContent.submitLabel}
      toastMessage={feedbackContent.toastMessage}
    />
  );
}
