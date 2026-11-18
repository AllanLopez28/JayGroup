import type { ReactNode } from "react";

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`container-site ${className}`.trim()}>{children}</div>
  );
}
