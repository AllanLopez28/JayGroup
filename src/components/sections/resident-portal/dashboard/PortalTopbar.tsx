"use client";

import { usePathname } from "next/navigation";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { useToast } from "@/components/sections/resident-portal/dashboard/ToastProvider";
import type { PortalNavItem, ResidentProfile } from "@/lib/types";

export interface PortalTopbarProps {
  portalLabel: string;
  navItems: readonly PortalNavItem[];
  profile: ResidentProfile;
  notificationsAriaLabel: string;
  notificationsToast: string;
  profileToast: string;
}

export function PortalTopbar({
  portalLabel,
  navItems,
  profile,
  notificationsAriaLabel,
  notificationsToast,
  profileToast,
}: PortalTopbarProps) {
  const pathname = usePathname();
  const { showToast } = useToast();

  const activeItem =
    navItems.find((item) => item.href === pathname) ??
    navItems.find(
      (item) =>
        item.href !== "/resident-portal/dashboard" &&
        pathname.startsWith(`${item.href}/`)
    ) ??
    navItems[0];

  const activeLabel = activeItem?.label ?? "Overview";

  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="text-[13px] text-portal-slate">
        {portalLabel}{" "}
        <span aria-hidden="true">/</span>{" "}
        <strong
          key={activeLabel}
          className="dash-crumb-swap font-semibold text-portal-night"
        >
          {activeLabel}
        </strong>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          type="button"
          aria-label={notificationsAriaLabel}
          onClick={() => showToast(notificationsToast)}
          className="relative grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-portal-line-2 bg-white text-portal-night transition-colors duration-300 hover:border-portal-night"
        >
          {profile.unreadNotifications > 0 && (
            <span
              aria-hidden="true"
              className="dash-dot-ping absolute right-[11px] top-[10px] h-2 w-2 rounded-full bg-brass"
            />
          )}
          <PortalIcon name="bell" size={18} />
        </button>

        <button
          type="button"
          onClick={() => showToast(profileToast)}
          className="flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded-full border border-portal-line-2 bg-white pl-1.5 pr-4 text-sm text-portal-night transition-colors duration-300 hover:border-portal-night"
        >
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-semibold text-cream"
          >
            {profile.initials}
          </span>
          <span>{profile.fullName}</span>
        </button>
      </div>
    </header>
  );
}
