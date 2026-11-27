import type { Metadata } from "next";
import { ResidentPortalWelcome } from "@/components/sections/resident-portal/ResidentPortalWelcome";
import { residentPortalConfig } from "@/lib/data/residents";

export const metadata: Metadata = {
  title: "Resident Portal",
  description: residentPortalConfig.subtitle,
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResidentPortalPage() {
  return <ResidentPortalWelcome content={residentPortalConfig} />;
}
