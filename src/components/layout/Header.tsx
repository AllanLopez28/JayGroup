import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, mainNav, siteConfig } from "@/lib/data/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-dark bg-night/95 backdrop-blur">
      <Container className="flex h-[84px] items-center justify-between gap-6">
        <Link
          href="#top"
          className="font-display text-lg font-medium tracking-wider uppercase text-mist"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-[0.12em] text-fog transition-colors hover:text-mist"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Button href={headerCta.href} variant="outline" withArrow>
          {headerCta.label}
        </Button>
      </Container>
    </header>
  );
}
