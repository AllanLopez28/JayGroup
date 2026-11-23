import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-brass focus:px-5 focus:py-2.5 focus:font-sans focus:font-medium focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-night"
      >
        Skip to content
      </a>
      <Header />
      <main id="top">{children}</main>
      <Footer />
    </>
  );
}
