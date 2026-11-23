import type { Metadata } from "next";
import { ResidentPortalWelcome } from "@/components/sections/resident-portal/ResidentPortalWelcome";
import { brokerPortalConfig } from "@/lib/data/residents";

export const metadata: Metadata = {
  title: "Broker Portal",
  description: brokerPortalConfig.subtitle,
  robots: {
    index: false,
    follow: false,
  },
};

export default function BrokerPortalPage() {
  return (
    <>
      <noscript>
        <meta
          httpEquiv="refresh"
          content={`5;url=${brokerPortalConfig.portalUrl}`}
        />
      </noscript>
      <ResidentPortalWelcome content={brokerPortalConfig} />
    </>
  );
}
