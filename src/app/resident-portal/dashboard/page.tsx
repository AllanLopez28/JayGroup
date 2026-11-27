import { OverviewHero } from "@/components/sections/resident-portal/dashboard/OverviewHero";
import {
  overviewContent,
  overviewQuickActions,
  residentDemo,
} from "@/lib/data/residentDashboard";

export default function ResidentDashboardOverviewPage() {
  return (
    <OverviewHero
      eyebrow={overviewContent.eyebrow}
      heroImageSrc={overviewContent.heroImageSrc}
      heroImageAlt={overviewContent.heroImageAlt}
      welcomePrefix={overviewContent.welcomePrefix}
      welcomeEmphasis={overviewContent.welcomeEmphasis}
      leaseEndsPrefix={overviewContent.leaseEndsPrefix}
      nextRentPrefix={overviewContent.nextRentPrefix}
      duePrefix={overviewContent.duePrefix}
      profile={residentDemo.profile}
      quickActions={overviewQuickActions}
    />
  );
}
