import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";

export function Residents() {
  return (
    <Section id="residents" tone="light">
      <Container className="grid gap-12 md:grid-cols-2">
        <div className="space-y-4">
          <Eyebrow>For Residents</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Your building team, one click away.
          </h2>
        </div>

        <div className="space-y-4">
          <Eyebrow>For Brokers</Eyebrow>
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Live availability. Instant holds. Every status in one place.
          </h2>
        </div>
      </Container>
    </Section>
  );
}
