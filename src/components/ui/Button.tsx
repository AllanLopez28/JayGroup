import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";

export type ButtonVariant = "solid" | "outline";

interface BaseButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  withArrow?: boolean;
  className?: string;
}

type ButtonAsLinkProps = BaseButtonProps & {
  href: string;
};

type ButtonAsButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  solid: "bg-brass text-night hover:opacity-90",
  outline: "border border-current text-current hover:border-brass hover:text-brass",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "solid",
    withArrow = false,
    className = "",
  } = props;

  const sharedClasses = `inline-flex items-center justify-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${variantClasses[variant]} ${className}`.trim();

  if (typeof props.href === "string") {
    return (
      <Link href={props.href} className={sharedClasses}>
        <span>{children}</span>
        {withArrow && <ArrowIcon />}
      </Link>
    );
  }

  const {
    variant: _variant,
    withArrow: _withArrow,
    className: _className,
    children: _children,
    ...buttonAttrs
  } = props;
  void _variant;
  void _withArrow;
  void _className;
  void _children;

  return (
    <button type="button" className={sharedClasses} {...buttonAttrs}>
      <span>{children}</span>
      {withArrow && <ArrowIcon />}
    </button>
  );
}
