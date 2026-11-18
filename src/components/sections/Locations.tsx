import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Locations() {
  return (
    <Section id="locations" tone="paper">
      <Container className="space-y-4">
        <Eyebrow>Locations</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          Across <em>New York</em>
        </h2>
      </Container>
    </Section>
  );
}
