"use client";

import Link from "next/link";
import type { NavItem } from "@/lib/types";

export interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  items: NavItem[];
  onClose: () => void;
  firstLinkRef: React.RefObject<HTMLAnchorElement | null>;
}

export function MobileMenu({
  id,
  isOpen,
  items,
  onClose,
  firstLinkRef,
}: MobileMenuProps) {
  return (
    <nav
      id={id}
      aria-label="Mobile"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={`mobile-menu-panel fixed inset-0 z-55 flex flex-col justify-center gap-1 bg-night lg:hidden ${
        isOpen ? "is-open" : ""
      }`.trim()}
    >
      {items.map((item, index) => {
        const numberLabel = String(index + 1).padStart(2, "0");
        return (
          <div key={`${item.href}-${item.label}`} className="flex flex-col">
            <Link
              ref={index === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={onClose}
              className="mobile-nav-link flex items-baseline gap-3.5 py-1 text-mist transition-colors hover:text-brass"
            >
              <small className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-fog">
                {numberLabel}
              </small>
              <span>{item.label}</span>
            </Link>
            {item.children?.length ? (
              <div className="mb-1 ml-9 flex flex-col gap-1">
                {item.children.map((child) => (
                  <Link
                    key={`${child.href}-${child.label}`}
                    href={child.href}
                    onClick={onClose}
                    className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-mist/70 transition-colors hover:text-brass"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </nav>
  );
}
