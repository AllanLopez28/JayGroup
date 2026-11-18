import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/lib/data/site";

export function Hero() {
  return (
    <Section ariaLabel="Introduction" tone="dark" className="flex items-center">
      <Container className="space-y-6">
        <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
          Built for New <em>York.</em>
        </h1>
        <p className="max-w-2xl text-lg text-fog">{siteConfig.description}</p>
      </Container>
    </Section>
  );
}
