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
  return (
    <>
      <noscript>
        <meta
          httpEquiv="refresh"
          content={`5;url=${residentPortalConfig.portalUrl}`}
        />
      </noscript>
      <ResidentPortalWelcome content={residentPortalConfig} />
    </>
  );
}
