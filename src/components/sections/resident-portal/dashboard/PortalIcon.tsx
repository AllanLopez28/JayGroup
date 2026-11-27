import type { PortalIconName } from "@/lib/types";

export interface PortalIconProps {
  name: PortalIconName;
  size?: number;
  className?: string;
  filled?: boolean;
}

export function PortalIcon({
  name,
  size = 18,
  className,
  filled = false,
}: PortalIconProps) {
  switch (name) {
    case "overview":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
      );

    case "payments":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 10h18M7 15h4" />
        </svg>
      );

    case "documents":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      );

    case "renewal":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5" />
        </svg>
      );

    case "key":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <circle cx="8" cy="15" r="4" />
          <path d="M11 12l9-9M17 6l3 3M15 8l2 2" />
        </svg>
      );

    case "amenities":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      );

    case "feedback":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M4 5h16v11H9l-5 4z" />
        </svg>
      );

    case "bell":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 21h4" />
        </svg>
      );

    case "arrow":
      return (
        <svg
          width={size}
          height={Math.round((size * 10) / 16)}
          viewBox="0 0 16 10"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
          className={className}
        >
          <path d="M1 5h13M10 1l4 4-4 4" />
        </svg>
      );

    case "download":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
        </svg>
      );

    case "upload":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 16V4M7 9l5-5 5 5M5 20h14" />
        </svg>
      );

    case "check":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          aria-hidden="true"
          className={className}
        >
          <path d="M5 12l5 5 9-10" />
        </svg>
      );

    case "star":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={filled ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
      );
  }
}
