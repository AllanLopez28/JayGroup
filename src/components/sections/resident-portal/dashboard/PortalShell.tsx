import type { ReactNode } from "react";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import {
  PortalSidebar,
  type PortalBuildingTeamInfo,
} from "@/components/sections/resident-portal/dashboard/PortalSidebar";
import { PortalTopbar } from "@/components/sections/resident-portal/dashboard/PortalTopbar";
import { ToastProvider } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import type { PortalNavItem, ResidentProfile } from "@/lib/types";

export interface PortalShellProps {
  children: ReactNode;
  logo: {
    src: string;
    width: number;
    height: number;
    alt: string;
    ariaLabel: string;
  };
  portalLabel: string;
  navAriaLabel: string;
  navItems: readonly PortalNavItem[];
  buildingTeam: PortalBuildingTeamInfo;
  profile: ResidentProfile;
  notificationsAriaLabel: string;
  notificationsToast: string;
  profileToast: string;
}

export function PortalShell({
  children,
  logo,
  portalLabel,
  navAriaLabel,
  navItems,
  buildingTeam,
  profile,
  notificationsAriaLabel,
  notificationsToast,
  profileToast,
}: PortalShellProps) {
  return (
    <ToastProvider>
      <div className="min-h-screen overflow-x-clip bg-portal-bg font-sans text-portal-night">
        <PortalSidebar
          logo={logo}
          portalLabel={portalLabel}
          navAriaLabel={navAriaLabel}
          navItems={navItems}
          buildingTeam={buildingTeam}
        />

        <main className="min-w-0 px-5 pb-14 pt-7 sm:px-7 lg:pl-[calc(248px+clamp(20px,3vw,48px))] lg:pr-[clamp(20px,3vw,48px)]">
          <div className="mx-auto flex max-w-[1160px] flex-col gap-7">
            <PortalTopbar
              portalLabel={portalLabel}
              navItems={navItems}
              profile={profile}
              notificationsAriaLabel={notificationsAriaLabel}
              notificationsToast={notificationsToast}
              profileToast={profileToast}
            />

            <div className="min-w-0">{children}</div>

            {/* Mobile / Tablet building team footer box */}
            <aside
              aria-label={buildingTeam.heading}
              className="flex flex-col gap-3.5 rounded-[4px] bg-portal-night p-5 text-mist lg:hidden"
            >
              <div className="text-[11px] uppercase tracking-[0.16em] text-brass">
                {buildingTeam.heading}
              </div>
              <p className="m-0 text-sm leading-[1.6] text-mist">
                <a
                  href={buildingTeam.phoneHref}
                  className="block transition-colors hover:text-white"
                >
                  {buildingTeam.phone}
                </a>
                <a
                  href={buildingTeam.emailHref}
                  className="block transition-colors hover:text-white"
                >
                  {buildingTeam.email}
                </a>
              </p>
              <Pill
                href={buildingTeam.manageGoUrl}
                external
                variant="light"
                small
                arrow
                className="self-start"
              >
                {buildingTeam.manageGoLabel}
              </Pill>
            </aside>
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
