import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { Section, SectionHeading } from "@/components/landing/section"
import { FAQ } from "@/components/landing/data"

/** FAQ: a single-open accordion, rewritten for the React + CLI product. */
export function Faq() {
  return (
    <Section id="faq" className="bg-muted/40">
      <SectionHeading
        eyebrow="FAQ"
        title="Have a question? We have answers"
        description="Everything you might want to know before you install."
      />

      <Accordion
        type="single"
        collapsible
        variant="separated"
        className="mx-auto max-w-3xl"
      >
        {FAQ.map((item, i) => (
          <AccordionItem key={item.question} value={`item-${i}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
