import Link from "next/link";
import type { CSSProperties } from "react";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";
import { LoginForm } from "@/components/sections/resident-portal/login/LoginForm";
import type { ResidentLoginConfig } from "@/lib/data/residents";

export interface LoginPanelProps {
  config: ResidentLoginConfig;
  isDemoMode: boolean;
  nextPath?: string;
}

export function LoginPanel({ config, isDemoMode, nextPath }: LoginPanelProps) {
  const brandMaskStyle: CSSProperties = {
    "--i": 0,
    WebkitMaskImage: `url(${config.brandLogoSrc})`,
    maskImage: `url(${config.brandLogoSrc})`,
  } as CSSProperties;

  return (
    <div className="grid min-h-screen w-full place-items-center overflow-hidden bg-portal-bg px-4 py-[clamp(20px,4vw,56px)] font-sans text-portal-night">
      <main className="login-panel w-full max-w-[520px] rounded-[4px] border border-portal-line-2 bg-white p-[clamp(28px,5vw,52px)] shadow-[0_30px_60px_-40px_rgba(12,17,41,0.35)]">
        <div className="w-full">
          <Link
            href="/"
            aria-label={config.brandAriaLabel}
            style={brandMaskStyle}
            className="login-brand login-st mb-7"
          />

          <div
            style={{ "--i": 0 } as CSSProperties}
            className="login-st text-xs uppercase tracking-[0.16em] text-brass-dark"
          >
            {config.eyebrow}
          </div>

          <h1
            style={{ "--i": 1 } as CSSProperties}
            className="login-st mt-2.5 font-display text-[clamp(44px,4.4vw,60px)] font-normal leading-none tracking-[0.01em] text-portal-night"
          >
            {config.title}
          </h1>

          <p
            style={{ "--i": 2 } as CSSProperties}
            className="login-st mt-3 text-[15px] leading-[1.6] text-portal-slate"
          >
            {config.lead}
          </p>

          {isDemoMode && (
            <p
              style={{ "--i": 2 } as CSSProperties}
              className="login-st mt-2 font-mono text-[11px] leading-[1.5] text-brass-dark"
            >
              {config.demoNotice}
            </p>
          )}

          <LoginForm
            nextPath={nextPath}
            emailLabel={config.emailLabel}
            emailPlaceholder={config.emailPlaceholder}
            passwordLabel={config.passwordLabel}
            passwordPlaceholder={config.passwordPlaceholder}
            showPasswordLabel={config.showPasswordLabel}
            hidePasswordLabel={config.hidePasswordLabel}
            capsLockWarning={config.capsLockWarning}
            rememberLabel={config.rememberLabel}
            forgotPassword={config.forgotPassword}
            unavailableTooltip={config.unavailableTooltip}
            submitIdleLabel={config.submitIdleLabel}
            submitBusyLabel={config.submitBusyLabel}
            submitSuccessLabel={config.submitSuccessLabel}
          />

          <div
            style={{ "--i": 4 } as CSSProperties}
            className="login-st mt-[30px] flex items-center gap-3.5 text-xs uppercase tracking-[0.14em] text-portal-slate before:h-px before:flex-1 before:bg-portal-line-2 before:content-[''] after:h-px after:flex-1 after:bg-portal-line-2 after:content-['']"
          >
            {config.dividerLabel}
          </div>

          <div
            style={{ "--i": 5 } as CSSProperties}
            className="login-st mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-2.5"
          >
            {config.altCards.map((card) => {
              const cardContent = (
                <>
                  <small className="text-[12.5px] text-portal-slate">
                    {card.eyebrow}
                  </small>
                  <b className="flex items-center justify-between gap-2 text-[14.5px] font-semibold text-portal-night">
                    <span>{card.label}</span>
                    <PortalIcon name="arrow" size={16} />
                  </b>
                </>
              );

              if (card.href) {
                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    className="login-alt-card flex flex-col gap-1.5 rounded-[4px] border border-portal-line-2 p-4 no-underline"
                  >
                    {cardContent}
                  </Link>
                );
              }

              return (
                <div
                  key={card.id}
                  aria-disabled="true"
                  title={config.unavailableTooltip}
                  className="login-alt-card flex cursor-not-allowed flex-col gap-1.5 rounded-[4px] border border-portal-line-2 p-4 opacity-75"
                >
                  {cardContent}
                </div>
              );
            })}
          </div>

          <div
            style={{ "--i": 6 } as CSSProperties}
            className="login-st mt-[30px] flex flex-wrap justify-between gap-x-4 gap-y-2 border-t border-portal-line-2 pt-5 text-[13px] text-portal-slate"
          >
            <span>{config.helpLabel}</span>
            <span>
              <a
                href={config.helpPhoneHref}
                className="font-semibold text-navy no-underline hover:underline"
              >
                {config.helpPhone}
              </a>{" "}
              ·{" "}
              <a
                href={config.helpEmailHref}
                className="font-semibold text-navy no-underline hover:underline"
              >
                {config.helpEmail}
              </a>
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}
