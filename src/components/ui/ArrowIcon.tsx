export interface ArrowIconProps {
  className?: string;
}

export function ArrowIcon({ className = "h-2.5 w-4" }: ArrowIconProps) {
  return (
    <svg
      viewBox="0 0 16 10"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      aria-hidden="true"
      className={className}
    >
      <path d="M0 5h14M10 1l4 4-4 4" />
    </svg>
  );
}
