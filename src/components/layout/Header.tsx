"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Container } from "@/components/ui/Container";
import { useMobileMenu } from "@/hooks/useMobileMenu";
import { useScrollState } from "@/hooks/useScrollState";
import { mainNav, mobileNav, siteConfig } from "@/lib/data/site";

const MOBILE_MENU_ID = "mobile-menu";

export function Header() {
  const { isSolid, isHidden } = useScrollState();
  const { isOpen, toggle, close, burgerRef, firstLinkRef } = useMobileMenu();
  const [hasFocusWithin, setHasFocusWithin] = useState(false);

  const showSolid = isSolid || isOpen;
  const shouldHide = isHidden && !isOpen && !hasFocusWithin;

  const handleFocusCapture = () => {
    setHasFocusWithin(true);
  };

  const handleBlurCapture = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setHasFocusWithin(false);
    }
  };

  return (
    <>
      <header
        onFocusCapture={handleFocusCapture}
        onBlurCapture={handleBlurCapture}
        className={`header-safe-top fixed left-0 right-0 z-60 transition-[background-color,transform,backdrop-filter] duration-500 ease-soft ${
          showSolid ? "bg-night/78 backdrop-blur-[14px]" : "bg-transparent"
        } ${shouldHide ? "-translate-y-[110%]" : "translate-y-0"}`}
      >
        <Container
          className={`flex items-center justify-between gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr] transition-[padding] duration-500 ease-soft ${
            showSolid ? "py-[10px]" : "py-[18px]"
          }`}
        >
          <Link
            href="#top"
            aria-label={siteConfig.logo.ariaLabel}
            onClick={isOpen ? close : undefined}
            className="shrink-0 justify-self-start"
          >
            <Image
              src={siteConfig.logo.src}
              alt={siteConfig.logo.alt}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              priority
              className={`-my-5 -ml-5 w-auto max-w-none transition-[height] duration-500 ease-soft ${
                showSolid ? "h-[88px]" : "h-[108px]"
              }`}
            />
          </Link>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-[6px] justify-self-center rounded-full border border-line-dark bg-night/28 p-[5px] backdrop-blur-[8px] lg:flex"
          >
            {mainNav.map((item) =>
              item.children?.length ? (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-[9px] font-sans text-[11.5px] font-medium uppercase tracking-[0.14em] text-mist transition-colors duration-350 group-hover:bg-mist group-hover:text-night hover:bg-mist hover:text-night"
                  >
                    <span>{item.label}</span>
                    <svg
                      viewBox="0 0 10 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.35"
                      aria-hidden="true"
                      className="h-[6px] w-[10px] transition-transform duration-300 ease-soft group-hover:rotate-180 group-focus-within:rotate-180"
                    >
                      <path d="M1 1l4 4 4-4" />
                    </svg>
                  </Link>

                  <div className="pointer-events-none invisible absolute left-0 top-full pt-2.5 opacity-0 translate-y-1 transition-[opacity,transform,visibility] duration-250 ease-soft group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div
                      role="menu"
                      aria-label={`${item.label} submenu`}
                      className="min-w-[164px] rounded-2xl border border-line-dark bg-night/92 p-1.5 shadow-[0_18px_40px_rgba(7,12,24,0.45)] backdrop-blur-[14px]"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className="block rounded-xl px-3.5 py-2.5 font-sans text-[11.5px] font-medium uppercase tracking-[0.14em] text-mist/88 transition-colors duration-300 hover:bg-mist hover:text-night"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-[9px] font-sans text-[11.5px] font-medium uppercase tracking-[0.14em] text-mist transition-colors duration-350 hover:bg-mist hover:text-night"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div aria-hidden="true" className="hidden lg:block" />

          <button
            ref={burgerRef}
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
            onClick={toggle}
            className="relative block h-12 w-12 shrink-0 cursor-pointer rounded-full border border-line-dark bg-night/35 text-mist lg:hidden"
          >
            <span
              aria-hidden="true"
              className={`absolute left-[14px] right-[14px] top-[19px] h-[1.5px] bg-mist transition-transform duration-400 ease-soft ${
                isOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-[14px] right-[14px] top-[27px] h-[1.5px] bg-mist transition-transform duration-400 ease-soft ${
                isOpen ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </Container>
      </header>

      <MobileMenu
        id={MOBILE_MENU_ID}
        isOpen={isOpen}
        items={mobileNav}
        onClose={close}
        firstLinkRef={firstLinkRef}
      />
    </>
  );
}
