"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { PortalIcon } from "@/components/sections/resident-portal/dashboard/PortalIcon";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 2600;

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback((nextMessage: string) => {
    setMessage(nextMessage);
    setIsVisible(true);

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setIsVisible(false);
      timerRef.current = null;
    }, TOAST_DURATION_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`dash-toast fixed bottom-7 left-1/2 z-50 flex items-center gap-3 rounded-[4px] bg-portal-night px-5 py-3.5 text-sm text-white shadow-[0_20px_40px_-18px_rgba(12,17,41,0.6)] ${
          isVisible ? "is-show" : ""
        }`}
      >
        <span
          aria-hidden="true"
          className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-brass text-portal-night"
        >
          <PortalIcon name="check" size={12} />
        </span>
        <span>{message}</span>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
