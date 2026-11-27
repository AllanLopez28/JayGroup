import type { PortalIconName } from "@/lib/types";

export interface PortalIconProps {
  name: PortalIconName;
  size?: number;
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}

export function PortalIcon({
  name,
  size = 18,
  className,
  filled = false,
  strokeWidth,
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 1.5}
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
          strokeWidth={strokeWidth ?? 1.7}
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
          strokeWidth={strokeWidth ?? 1.6}
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
          strokeWidth={strokeWidth ?? 3}
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
          strokeWidth={strokeWidth ?? 1.5}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
        </svg>
      );

    case "close":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.8}
          aria-hidden="true"
          className={className}
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );

    case "dollar":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.4}
          aria-hidden="true"
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9.2c-.6-.8-1.7-1.2-3-1.2-1.7 0-3 .8-3 2s1.3 1.6 3 2 3 .9 3 2.1-1.3 1.9-3 1.9c-1.4 0-2.6-.5-3.2-1.3M12 6.5V8M12 16v1.5" />
        </svg>
      );

    case "hourglass":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.4}
          aria-hidden="true"
          className={className}
        >
          <path d="M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
        </svg>
      );

    case "sparkles":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.4}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7zM5 16l.5 1.2 1.2.5-1.2.5L5 19.4l-.5-1.2-1.2-.5 1.2-.5z" />
        </svg>
      );

    case "users":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.4}
          aria-hidden="true"
          className={className}
        >
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 19c.6-3.3 3-5 6-5s5.4 1.7 6 5M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.3c1.8.7 3 2.3 3.5 4.7" />
        </svg>
      );

    case "clock":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.4}
          aria-hidden="true"
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l-2 2" />
        </svg>
      );

    case "calendar-cancel":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.4}
          aria-hidden="true"
          className={className}
        >
          <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4M10 13l4 4M14 13l-4 4" />
        </svg>
      );

    case "clipboard":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M9 4h6l1 2h3v15H5V6h3z" />
          <path d="M9 11h6M9 15h4" />
        </svg>
      );

    case "clock-overtime":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5h4" />
        </svg>
      );

    case "calendar-minus":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
          <path d="M3.5 9.5h17M9 14h6" />
        </svg>
      );

    case "shield-check":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M12 3l8 4v5c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V7z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );

    case "no-wall":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M4 20L20 4M8 4h12v12" />
        </svg>
      );

    case "ban":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M5.6 5.6l12.8 12.8" />
        </svg>
      );

    case "wine":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M8 3h8l-1 7a3 3 0 0 1-6 0zM12 13v8M9 21h6" />
        </svg>
      );

    case "volume":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <path d="M3 10v4h4l5 4V6L7 10zM16 9a4 4 0 0 1 0 6" />
        </svg>
      );

    case "lock":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth ?? 1.6}
          aria-hidden="true"
          className={className}
        >
          <rect x="4" y="10" width="16" height="11" rx="1.5" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
  }
}
