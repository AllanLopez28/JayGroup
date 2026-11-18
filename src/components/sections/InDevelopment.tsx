import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function InDevelopment() {
  return (
    <Section id="next" tone="paper">
      <Container className="space-y-4">
        <Eyebrow>Coming Soon</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          In <em>Development</em>
        </h2>
      </Container>
    </Section>
  );
}
