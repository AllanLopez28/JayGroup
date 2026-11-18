import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Approach() {
  return (
    <Section id="approach" tone="light">
      <Container className="space-y-4">
        <Eyebrow>Our Approach</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          One team. A connected <em>lifecycle.</em>
        </h2>
      </Container>
    </Section>
  );
}
