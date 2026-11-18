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
  solid: "btn-solid",
  outline: "btn-outline",
};

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "solid",
    withArrow = false,
    className = "",
  } = props;

  const sharedClasses = `btn ${variantClasses[variant]} ${className}`.trim();

  if (typeof props.href === "string") {
    return (
      <Link href={props.href} className={sharedClasses}>
        <span>{children}</span>
        {withArrow && <ArrowIcon className="btn-arrow" />}
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
      {withArrow && <ArrowIcon className="btn-arrow" />}
    </button>
  );
}
