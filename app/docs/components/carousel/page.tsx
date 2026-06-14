import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

import { BasicDemo, ImageCardDemo, ControlledDemo } from "./demos"

export const metadata = {
  title: "Carousel",
}

export default function CarouselDocsPage() {
  return (
    <>
      <DocHeader
        title="Carousel"
        description="A horizontal slide viewer with clickable indicator dots. The track translates between full-width slides; dots morph to a pill on the active slide, and ←/→ step it while focused. Controlled or uncontrolled. Distinct from Pagination, which is the data-table page toolbar."
      />

      <ComponentPreview
        code={`<Carousel label="Product highlights">
  <CarouselContent>
    <CarouselSlide>{/* slide one */}</CarouselSlide>
    <CarouselSlide>{/* slide two */}</CarouselSlide>
    <CarouselSlide>{/* slide three */}</CarouselSlide>
  </CarouselContent>
  <CarouselIndicators />
</Carousel>`}
      >
        <BasicDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="carousel" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Carousel, CarouselContent, CarouselSlide, CarouselIndicators,
} from "@/components/ui/carousel"

export function Example() {
  return (
    <Carousel label="Product highlights">
      <CarouselContent>
        <CarouselSlide>{/* … */}</CarouselSlide>
        <CarouselSlide>{/* … */}</CarouselSlide>
      </CarouselContent>
      <CarouselIndicators />
    </Carousel>
  )
}`}
        />
      </DocSection>

      <DocSection title="On images / cards">
        <p className="mt-4 text-pretty text-muted-foreground">
          For photo galleries, add{" "}
          <code className="font-mono text-sm">CarouselPrevious</code> /{" "}
          <code className="font-mono text-sm">CarouselNext</code> — overlay arrows that reveal
          on hover (and on keyboard focus), and stay hidden at the first/last slide. Pass{" "}
          <code className="font-mono text-sm">overlay</code> to{" "}
          <code className="font-mono text-sm">CarouselIndicators</code> to float the dots over
          the bottom-right of the image; over photos they switch to fixed white so they stay
          legible on any background.
        </p>
        <ComponentPreview
          code={`<Carousel label="Photo gallery">
  <CarouselContent>
    <CarouselSlide><img … /></CarouselSlide>
    <CarouselSlide><img … /></CarouselSlide>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
  <CarouselIndicators overlay />
</Carousel>`}
        >
          <ImageCardDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Controlled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">index</code> and{" "}
          <code className="font-mono text-sm">onIndexChange</code> to drive the active slide
          from your own state — e.g. to pair the dots with external prev/next buttons or a
          step counter. Omit them for uncontrolled use with{" "}
          <code className="font-mono text-sm">defaultIndex</code>.
        </p>
        <ComponentPreview
          code={`const [index, setIndex] = useState(0)

<Carousel index={index} onIndexChange={setIndex}>
  <CarouselContent>{/* slides */}</CarouselContent>
  <CarouselIndicators />
</Carousel>
<Button onClick={() => setIndex((i) => i - 1)}>Previous</Button>
<Button onClick={() => setIndex((i) => i + 1)}>Next</Button>`}
        >
          <ControlledDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
