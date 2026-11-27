import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { mobileNav, siteConfig } from "@/lib/data/site";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t border-line-dark bg-night-2 py-16 text-mist"
    >
      <Container className="space-y-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-3">
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-brass">
              Office
            </h2>
            <address className="not-italic text-sm text-fog">
              <p>{siteConfig.office.street}</p>
              <p>{siteConfig.office.cityStateZip}</p>
            </address>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-brass">
              Contact
            </h2>
            <ul className="space-y-1 text-sm text-fog">
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="hover:text-mist"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contact.emailHref}
                  className="hover:text-mist"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-brass">
              Explore
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-fog">
              {mobileNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-mist">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-line-dark pt-8 text-xs text-fog md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-serif italic text-mist">{siteConfig.tagline}</span>
            <span>{siteConfig.copyright}</span>
          </div>

          <ul className="flex flex-wrap items-center gap-4">
            {siteConfig.legalLinks.map((link) => (
              <li key={link.label}>
                {link.label === "Equal Housing Opportunity" ? (
                  <Link
                    href={link.href}
                    aria-label={link.label}
                    className="inline-flex items-center opacity-75 transition-opacity hover:opacity-100"
                  >
                    <Image
                      src={siteConfig.equalHousingLogo.src}
                      alt={siteConfig.equalHousingLogo.alt}
                      width={siteConfig.equalHousingLogo.width}
                      height={siteConfig.equalHousingLogo.height}
                      className="h-10 w-auto"
                    />
                  </Link>
                ) : (
                  <Link href={link.href} className="hover:text-mist">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
