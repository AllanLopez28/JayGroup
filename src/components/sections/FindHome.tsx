import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function FindHome() {
  return (
    <Section id="find" tone="dark">
      <Container className="space-y-4">
        <Eyebrow>Availability</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          Find your <em>new home</em>
        </h2>
      </Container>
    </Section>
  );
}
