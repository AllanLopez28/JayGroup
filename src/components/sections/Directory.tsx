import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Directory() {
  return (
    <Section id="directory" tone="dark">
      <Container className="space-y-4">
        <Eyebrow>Directory</Eyebrow>
        {/* TODO: confirmar título */}
        <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
          Bushwick <em>Directory</em>
        </h2>
      </Container>
    </Section>
  );
}
