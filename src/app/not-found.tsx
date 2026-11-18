import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section tone="dark" className="flex items-center">
      <Container className="space-y-6">
        <h1 className="text-4xl font-medium tracking-tight">Page not found</h1>
        <Button href="/" variant="outline" withArrow>
          Return home
        </Button>
      </Container>
    </Section>
  );
}
