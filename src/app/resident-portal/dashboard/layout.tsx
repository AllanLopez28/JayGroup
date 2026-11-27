import type { Metadata } from "next";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { PortalShell } from "@/components/sections/resident-portal/dashboard/PortalShell";
import { getSession } from "@/lib/auth/session";
import {
  portalNavItems,
  portalShellContent,
  residentDemo,
} from "@/lib/data/residentDashboard";
import { siteConfig } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Resident Portal",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResidentDashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect("/resident-portal/login");
  }

  return (
    <PortalShell
      logo={{
        src: siteConfig.logo.src,
        width: siteConfig.logo.width,
        height: siteConfig.logo.height,
        alt: siteConfig.logo.alt,
        ariaLabel: portalShellContent.logoAriaLabel,
      }}
      portalLabel={portalShellContent.portalLabel}
      navAriaLabel={portalShellContent.navAriaLabel}
      navItems={portalNavItems}
      buildingTeam={portalShellContent.buildingTeam}
      profile={residentDemo.profile}
      notificationsAriaLabel={portalShellContent.notificationsAriaLabel(
        residentDemo.profile.unreadNotifications
      )}
      notificationsToast={portalShellContent.notificationsToast}
      profileToast={portalShellContent.profileToast}
    >
      {children}
    </PortalShell>
  );
}
