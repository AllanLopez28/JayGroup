import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Retail() {
  return (
    <Section id="retail" tone="light">
      <Container className="space-y-4">
        <Eyebrow>Retail &amp; Commercial</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          Space for <em>neighborhood business</em>
        </h2>
      </Container>
    </Section>
  );
}
