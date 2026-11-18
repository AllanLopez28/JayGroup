import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function AmenitySpotlight() {
  return (
    <Section id="featured" tone="light">
      <Container className="space-y-4">
        <Eyebrow>Amenity Spotlight · Greenpoint, Brooklyn</Eyebrow>
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          Life at <em>The Dome</em>
        </h2>
      </Container>
    </Section>
  );
}
