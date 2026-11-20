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
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-[9px] font-sans text-[11.5px] font-medium uppercase tracking-[0.14em] text-mist transition-colors duration-350 hover:bg-mist hover:text-night"
              >
                {item.label}
              </Link>
            ))}
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
