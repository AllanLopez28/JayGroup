import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Portfolio() {
  return (
    <Section id="figures" tone="dark">
      <Container className="space-y-4">
        <Eyebrow>Portfolio</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          Featured <em>developments</em>
        </h2>
      </Container>
    </Section>
  );
}
