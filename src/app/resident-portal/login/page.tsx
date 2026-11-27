import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginPanel } from "@/components/sections/resident-portal/login/LoginPanel";
import { isDemoAuthMode } from "@/lib/auth/provider";
import { getSession } from "@/lib/auth/session";
import { residentLoginConfig } from "@/lib/data/residents";

export const metadata: Metadata = {
  title: "Sign in",
  robots: {
    index: false,
    follow: false,
  },
};

interface ResidentLoginPageProps {
  searchParams: Promise<{ next?: string | string[] }>;
}

export default async function ResidentLoginPage({
  searchParams,
}: ResidentLoginPageProps) {
  const session = await getSession();
  if (session) {
    redirect("/resident-portal/dashboard");
  }

  const params = await searchParams;
  const nextPath = typeof params.next === "string" ? params.next : undefined;

  return (
    <LoginPanel
      config={residentLoginConfig}
      isDemoMode={isDemoAuthMode()}
      nextPath={nextPath}
    />
  );
}
