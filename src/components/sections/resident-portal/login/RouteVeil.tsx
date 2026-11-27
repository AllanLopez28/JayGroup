"use client";

export interface RouteVeilProps {
  active: boolean;
}

export function RouteVeil({ active }: RouteVeilProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <div className={`login-veil${active ? " is-on" : ""}`} />
    </div>
  );
}
