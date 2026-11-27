import type { Metadata } from "next";
import { DocumentsView } from "@/components/sections/resident-portal/dashboard/DocumentsView";
import { documentsContent, residentDemo } from "@/lib/data/residentDashboard";

export const metadata: Metadata = {
  title: "Documents",
};

export default function ResidentDashboardDocumentsPage() {
  return (
    <DocumentsView
      title={documentsContent.title}
      subtitle={documentsContent.subtitle}
      unavailableTooltip={documentsContent.unavailableTooltip}
      documents={residentDemo.documents}
    />
  );
}
