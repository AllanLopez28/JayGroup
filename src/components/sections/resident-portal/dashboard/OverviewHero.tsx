import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { SplitWords } from "@/components/sections/resident-portal/dashboard/SplitWords";
import type { OverviewQuickAction, ResidentProfile } from "@/lib/types";

export interface OverviewHeroProps {
  eyebrow: string;
  heroImageSrc: string;
  heroImageAlt: string;
  welcomePrefix: string;
  welcomeEmphasis: string;
  leaseEndsPrefix: string;
  nextRentPrefix: string;
  duePrefix: string;
  profile: ResidentProfile;
  quickActions: readonly OverviewQuickAction[];
}

export function OverviewHero({
  eyebrow,
  heroImageSrc,
  heroImageAlt,
  welcomePrefix,
  welcomeEmphasis,
  leaseEndsPrefix,
  nextRentPrefix,
  duePrefix,
  profile,
  quickActions,
}: OverviewHeroProps) {
  return (
    <section aria-label="Overview">
      <div className="relative isolate flex min-h-[620px] flex-col justify-end gap-7 overflow-hidden rounded-[4px] p-[clamp(28px,4vw,56px)] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 overflow-hidden"
        >
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, calc(100vw - 248px)"
            className="dash-hero-img object-cover object-center"
          />
        </div>

        <div
          aria-hidden="true"
          className="dash-hero-overlay pointer-events-none absolute inset-0 -z-10"
        />

        <div
          className="dash-hk dash-st flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-brass"
          style={{ "--i": 0 } as CSSProperties}
        >
          {eyebrow}
        </div>

        <SplitWords
          className="dash-hero-h1"
          segments={[
            { text: welcomePrefix },
            { text: welcomeEmphasis, emphasis: true, breakAfter: true },
            { text: `${profile.firstName}.` },
          ]}
        />

        <div className="flex flex-wrap gap-2.5">
          <span
            className="dash-st rounded-full bg-mist/12 px-3.5 py-[9px] text-[13px] backdrop-blur-[4px]"
            style={{ "--i": 4 } as CSSProperties}
          >
            {profile.building}
          </span>
          <span
            className="dash-st rounded-full bg-mist/12 px-3.5 py-[9px] text-[13px] backdrop-blur-[4px]"
            style={{ "--i": 5 } as CSSProperties}
          >
            {profile.unit}
          </span>
          <span
            className="dash-st rounded-full bg-mist/12 px-3.5 py-[9px] text-[13px] backdrop-blur-[4px]"
            style={{ "--i": 6 } as CSSProperties}
          >
            {leaseEndsPrefix} {profile.leaseEndDate}
          </span>
          <span
            className="dash-st rounded-full bg-brass/22 px-3.5 py-[9px] text-[13px] text-cream backdrop-blur-[4px]"
            style={{ "--i": 7 } as CSSProperties}
          >
            {nextRentPrefix} {profile.monthlyRentFormatted} {duePrefix}{" "}
            {profile.nextRentDueDate}
          </span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
          {quickActions.map((action, idx) => (
            <Link
              key={action.id}
              href={action.href}
              style={{ "--i": 8 + idx } as CSSProperties}
              className={`dash-quick-card dash-st flex min-h-[104px] flex-col items-start gap-[18px] rounded-[4px] border p-[18px] text-left no-underline ${
                action.featured
                  ? "border-mist bg-mist text-portal-night hover:bg-white"
                  : "border-mist/18 bg-mist/8 text-white hover:border-mist/32 hover:bg-mist/16"
              }`}
            >
              <PortalIcon name={action.icon} size={22} />
              <span className="text-[15px] font-semibold">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
