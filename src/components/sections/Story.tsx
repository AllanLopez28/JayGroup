import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Story() {
  return (
    <Section id="story" tone="dark">
      <Container className="space-y-4">
        <Eyebrow>Our Story · Since 2011</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          From a single brownstone to a full city block on the waterfront.
        </h2>
      </Container>
    </Section>
  );
}
