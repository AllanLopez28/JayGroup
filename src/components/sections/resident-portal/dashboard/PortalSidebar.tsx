"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOutAction } from "@/app/resident-portal/login/actions";
import { Pill } from "@/components/sections/resident-portal/dashboard/Pill";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { useNavIndicator } from "@/hooks/useNavIndicator";
import type { PortalNavItem } from "@/lib/types";

export interface PortalBuildingTeamInfo {
  heading: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  manageGoLabel: string;
  manageGoUrl: string;
  signOutLabel: string;
}

export interface PortalSidebarProps {
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
}

function resolveActiveHref(
  pathname: string,
  items: readonly PortalNavItem[]
): string {
  const exact = items.find((item) => item.href === pathname);
  if (exact) {
    return exact.href;
  }
  const prefix = items.find(
    (item) =>
      item.href !== "/resident-portal/dashboard" &&
      pathname.startsWith(`${item.href}/`)
  );
  return prefix?.href ?? items[0]?.href ?? "/resident-portal/dashboard";
}

export function PortalSidebar({
  logo,
  portalLabel,
  navAriaLabel,
  navItems,
  buildingTeam,
}: PortalSidebarProps) {
  const pathname = usePathname();
  const activeHref = resolveActiveHref(pathname, navItems);
  const { navRef, indicatorRef, setItemRef } = useNavIndicator(activeHref);

  return (
    <aside className="z-30 flex w-full flex-col gap-3 bg-portal-night px-4 py-3 text-mist lg:fixed lg:inset-y-0 lg:left-0 lg:w-[248px] lg:gap-9 lg:overflow-y-auto lg:px-[22px] lg:py-8">
      <div className="flex items-center justify-between gap-4 lg:block">
        <Link
          href="/resident-portal/dashboard"
          aria-label={logo.ariaLabel}
          className="dash-side-logo inline-flex shrink-0 items-center px-1 lg:px-[10px]"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className="h-9 w-auto lg:h-10"
          />
        </Link>
        <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-brass lg:hidden">
          {portalLabel}
        </span>
      </div>

      <nav
        ref={navRef}
        aria-label={navAriaLabel}
        className="dash-nav-scroll relative flex flex-row items-center gap-1 overflow-x-auto pb-1.5 lg:flex-col lg:items-stretch lg:gap-1 lg:overflow-visible lg:pb-0"
      >
        <div className="hidden px-3 pb-2.5 text-[11px] uppercase tracking-[0.16em] text-brass lg:block">
          {portalLabel}
        </div>

        <span
          ref={indicatorRef}
          aria-hidden="true"
          className="dash-nav-ind absolute bottom-0 left-0 h-[2px] bg-brass opacity-0 lg:bottom-auto lg:right-0 lg:top-0 lg:h-11 lg:rounded-[4px] lg:bg-mist/10 lg:before:absolute lg:before:bottom-[10px] lg:before:left-0 lg:before:top-[10px] lg:before:w-[2px] lg:before:bg-brass lg:before:content-['']"
        />

        {navItems.map((item, idx) => {
          const isCurrent = item.href === activeHref;
          const delayMs = 150 + idx * 50;

          return (
            <Link
              key={item.id}
              ref={setItemRef(item.href)}
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              style={{ animationDelay: `${delayMs}ms` }}
              className={`dash-side-item group relative flex min-h-[44px] shrink-0 items-center gap-2.5 rounded-[4px] px-3 text-[14px] whitespace-nowrap transition-colors duration-300 lg:gap-3 lg:text-[14.5px] ${
                isCurrent
                  ? "font-semibold text-white"
                  : "text-[#c9cdd8] hover:text-white"
              }`}
            >
              <PortalIcon
                name={item.icon}
                size={18}
                className="shrink-0 transition-transform duration-400 ease-expo group-hover:translate-x-[2px]"
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="dash-side-team mt-auto hidden flex-col gap-3.5 rounded-[4px] border border-mist/14 p-[18px] lg:flex">
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
        >
          {buildingTeam.manageGoLabel}
        </Pill>
        <form action={signOutAction} className="pt-1">
          <button
            type="submit"
            className="flex min-h-[44px] w-full cursor-pointer items-center justify-center rounded-[4px] border border-mist/20 bg-transparent px-3 text-xs font-semibold uppercase tracking-[0.12em] text-mist/85 transition-colors duration-300 hover:border-mist/45 hover:bg-mist/8 hover:text-white"
          >
            {buildingTeam.signOutLabel}
          </button>
        </form>
      </div>
    </aside>
  );
}
