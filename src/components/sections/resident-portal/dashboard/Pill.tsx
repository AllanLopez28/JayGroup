import Link from "next/link";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";

export type PillVariant = "dark" | "light";

interface BasePillProps {
  children: ReactNode;
  variant?: PillVariant;
  small?: boolean;
  arrow?: boolean;
  className?: string;
  style?: CSSProperties;
}

type PillAsLinkProps = BasePillProps & {
  href: string;
  external?: boolean;
};

type PillAsButtonProps = BasePillProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BasePillProps> & {
    href?: undefined;
    external?: undefined;
  };

export type PillProps = PillAsLinkProps | PillAsButtonProps;

export function Pill(props: PillProps) {
  const {
    children,
    variant = "dark",
    small = false,
    arrow = false,
    className = "",
    style,
  } = props;

  const variantClasses =
    variant === "dark"
      ? "bg-navy text-white hover:bg-portal-night hover:shadow-[0_10px_24px_-12px_rgba(12,17,41,0.6)]"
      : "bg-mist text-portal-night hover:bg-white";

  const sizeClasses = small
    ? `min-h-[44px] ${arrow ? "pl-4 pr-[6px]" : "px-4"} text-[11.5px] font-semibold tracking-[0.06em] whitespace-nowrap`
    : `min-h-[52px] ${arrow ? "pl-[26px] pr-[7px]" : "px-[26px]"} text-[12.5px] font-bold tracking-[0.1em]`;

  const classes = [
    "dash-pill inline-flex items-center justify-between gap-4 rounded-full border-0 uppercase no-underline cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    variantClasses,
    sizeClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className={`dash-pill-ar grid shrink-0 place-items-center rounded-full bg-brass text-portal-night ${
            small ? "h-8 w-8" : "h-[38px] w-[38px]"
          }`}
        >
          <PortalIcon name="arrow" size={small ? 14 : 16} />
        </span>
      )}
    </>
  );

  if (typeof props.href === "string") {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          style={style}
        >
          {inner}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes} style={style}>
        {inner}
      </Link>
    );
  }

  const {
    variant: _variant,
    small: _small,
    arrow: _arrow,
    className: _className,
    style: _style,
    children: _children,
    type = "button",
    ...buttonAttrs
  } = props;
  void _variant;
  void _small;
  void _arrow;
  void _className;
  void _style;
  void _children;

  return (
    <button type={type} className={classes} style={style} {...buttonAttrs}>
      {inner}
    </button>
  );
}
