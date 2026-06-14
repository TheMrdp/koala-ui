import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  PopoverBasicDemo,
  PopoverFormDemo,
  PopoverArrowDemo,
  PopoverAlignDemo,
  PopoverCompactDemo,
} from "./demos"

export const metadata = {
  title: "Popover",
}

export default function PopoverDocsPage() {
  return (
    <>
      <DocHeader
        title="Popover"
        description="A general-purpose floating surface over Radix Popover — focus management, dismiss, and collision-aware positioning. Hosts arbitrary content (forms, pickers, info cards) on the DS popover surface, with named parts and an exposed --surface so nested controls blend in."
      />

      <ComponentPreview code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <div className="space-y-1">
      <PopoverTitle>Invite teammates</PopoverTitle>
      <PopoverDescription>
        Share this workspace with anyone on your team.
      </PopoverDescription>
    </div>
  </PopoverContent>
</Popover>`}>
        <PopoverBasicDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="popover" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

export function Example() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Content</PopoverContent>
    </Popover>
  )
}`}
        />
      </DocSection>

      <DocSection title="With a form">
        <p className="mt-4 text-pretty text-muted-foreground">
          The canonical use case. Because the content exposes{" "}
          <code className="font-mono text-sm">--surface</code>, nested{" "}
          <code className="font-mono text-sm">Input</code>s paint the panel surface rather than
          the page. Wrap actions in <code className="font-mono text-sm">PopoverClose</code> to
          dismiss on click.
        </p>
        <ComponentPreview code={`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline"><Gear /> Dimensions</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    {/* title + inputs */}
    <PopoverClose asChild>
      <Button size="sm">Save</Button>
    </PopoverClose>
  </PopoverContent>
</Popover>`}>
          <PopoverFormDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With arrow & close button">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">showArrow</code> for a pointer toward the
          trigger, and use <code className="font-mono text-sm">PopoverCloseButton</code> for a
          styled top-right dismiss.
        </p>
        <ComponentPreview code={`<PopoverContent showArrow className="w-64">
  <PopoverCloseButton aria-label="Close">×</PopoverCloseButton>
  <PopoverTitle>Heads up</PopoverTitle>
  <PopoverDescription>…</PopoverDescription>
</PopoverContent>`}>
          <PopoverArrowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Alignment">
        <p className="mt-4 text-pretty text-muted-foreground">
          Control placement along the trigger with{" "}
          <code className="font-mono text-sm">align</code> (
          <code className="font-mono text-sm">start</code> ·{" "}
          <code className="font-mono text-sm">center</code> ·{" "}
          <code className="font-mono text-sm">end</code>) and{" "}
          <code className="font-mono text-sm">side</code> /{" "}
          <code className="font-mono text-sm">sideOffset</code> — all forwarded to Radix.
        </p>
        <ComponentPreview code={`<PopoverContent align="start">…</PopoverContent>
<PopoverContent align="center">…</PopoverContent>
<PopoverContent align="end">…</PopoverContent>`}>
          <PopoverAlignDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> tunes the content padding —{" "}
          <code className="font-mono text-sm">compact</code> for dense application UI. It also
          cascades from a surrounding{" "}
          <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview code={`<PopoverContent density="compact">…</PopoverContent>`}>
          <PopoverCompactDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
