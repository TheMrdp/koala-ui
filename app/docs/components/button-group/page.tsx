import {
  TextAlignCenter,
  TextAlignJustify,
  TextAlignLeft,
  TextAlignRight,
  TextB,
  TextItalic,
  TextUnderline,
} from "@phosphor-icons/react/ssr"

import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Button Group",
}

export default function ButtonGroupDocsPage() {
  return (
    <>
      <DocHeader
        title="Button Group"
        description="A set of related buttons arranged as a visual unit. Supports attached (fused pill) and detached (spaced) layouts, with shared variant, size, and density propagated via context."
      />

      <ComponentPreview
        code={`<ButtonGroup>
  <ButtonGroupItem>Day</ButtonGroupItem>
  <ButtonGroupItem>Week</ButtonGroupItem>
  <ButtonGroupItem>Month</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup size="sm">
  <ButtonGroupItem iconOnly aria-label="Align left">
    <TextAlignLeft />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Align center">
    <TextAlignCenter />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Align right">
    <TextAlignRight />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Justify">
    <TextAlignJustify />
  </ButtonGroupItem>
</ButtonGroup>`}
      >
        <ButtonGroup>
          <ButtonGroupItem>Day</ButtonGroupItem>
          <ButtonGroupItem>Week</ButtonGroupItem>
          <ButtonGroupItem>Month</ButtonGroupItem>
        </ButtonGroup>
        <ButtonGroup size="sm">
          <ButtonGroupItem iconOnly aria-label="Align left">
            <TextAlignLeft />
          </ButtonGroupItem>
          <ButtonGroupItem iconOnly aria-label="Align center">
            <TextAlignCenter />
          </ButtonGroupItem>
          <ButtonGroupItem iconOnly aria-label="Align right">
            <TextAlignRight />
          </ButtonGroupItem>
          <ButtonGroupItem iconOnly aria-label="Justify">
            <TextAlignJustify />
          </ButtonGroupItem>
        </ButtonGroup>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="button-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export function Example() {
  return (
    <ButtonGroup>
      <ButtonGroupItem>Day</ButtonGroupItem>
      <ButtonGroupItem>Week</ButtonGroupItem>
      <ButtonGroupItem>Month</ButtonGroupItem>
    </ButtonGroup>
  )
}`}
        />
      </DocSection>

      <DocSection title="Attached vs Detached">
        <p className="mt-4 text-pretty text-muted-foreground">
          By default, <code className="font-mono text-sm">attached</code> fuses buttons into a single
          pill - interior border radii are stripped and the shared 1px border is collapsed via a
          −1px margin overlap. Set{" "}
          <code className="font-mono text-sm">attached={"{false}"}</code> for a spaced layout where
          each button keeps its own rounding.
        </p>
        <ComponentPreview
          code={`{/* Attached (default) */}
<ButtonGroup>
  <ButtonGroupItem>Day</ButtonGroupItem>
  <ButtonGroupItem>Week</ButtonGroupItem>
  <ButtonGroupItem>Month</ButtonGroupItem>
</ButtonGroup>

{/* Detached */}
<ButtonGroup attached={false}>
  <ButtonGroupItem>Day</ButtonGroupItem>
  <ButtonGroupItem>Week</ButtonGroupItem>
  <ButtonGroupItem>Month</ButtonGroupItem>
</ButtonGroup>`}
        >
          <ButtonGroup>
            <ButtonGroupItem>Day</ButtonGroupItem>
            <ButtonGroupItem>Week</ButtonGroupItem>
            <ButtonGroupItem>Month</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup attached={false}>
            <ButtonGroupItem>Day</ButtonGroupItem>
            <ButtonGroupItem>Week</ButtonGroupItem>
            <ButtonGroupItem>Month</ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">variant</code> prop on{" "}
          <code className="font-mono text-sm">ButtonGroup</code> is inherited by every{" "}
          <code className="font-mono text-sm">ButtonGroupItem</code> inside it. Supports all the
          same variants as <a href="/docs/components/button" className="underline underline-offset-4">Button</a>.
        </p>
        <ComponentPreview
          code={`<ButtonGroup variant="primary">
  <ButtonGroupItem>One</ButtonGroupItem>
  <ButtonGroupItem>Two</ButtonGroupItem>
  <ButtonGroupItem>Three</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup variant="secondary">
  <ButtonGroupItem>One</ButtonGroupItem>
  <ButtonGroupItem>Two</ButtonGroupItem>
  <ButtonGroupItem>Three</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup variant="outline">
  <ButtonGroupItem>One</ButtonGroupItem>
  <ButtonGroupItem>Two</ButtonGroupItem>
  <ButtonGroupItem>Three</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup variant="ghost">
  <ButtonGroupItem>One</ButtonGroupItem>
  <ButtonGroupItem>Two</ButtonGroupItem>
  <ButtonGroupItem>Three</ButtonGroupItem>
</ButtonGroup>`}
          previewClassName="flex-col"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonGroup variant="primary">
              <ButtonGroupItem>One</ButtonGroupItem>
              <ButtonGroupItem>Two</ButtonGroupItem>
              <ButtonGroupItem>Three</ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup variant="secondary">
              <ButtonGroupItem>One</ButtonGroupItem>
              <ButtonGroupItem>Two</ButtonGroupItem>
              <ButtonGroupItem>Three</ButtonGroupItem>
            </ButtonGroup>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonGroup variant="outline">
              <ButtonGroupItem>One</ButtonGroupItem>
              <ButtonGroupItem>Two</ButtonGroupItem>
              <ButtonGroupItem>Three</ButtonGroupItem>
            </ButtonGroup>
            <ButtonGroup variant="ghost">
              <ButtonGroupItem>One</ButtonGroupItem>
              <ButtonGroupItem>Two</ButtonGroupItem>
              <ButtonGroupItem>Three</ButtonGroupItem>
            </ButtonGroup>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Inherits the same three sizes as Button - <code className="font-mono text-sm">sm</code>{" "}
          (32px), <code className="font-mono text-sm">md</code> (36px, the default), and{" "}
          <code className="font-mono text-sm">lg</code> (40px).
        </p>
        <ComponentPreview
          code={`<ButtonGroup size="sm">
  <ButtonGroupItem>Small</ButtonGroupItem>
  <ButtonGroupItem>Group</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup size="md">
  <ButtonGroupItem>Medium</ButtonGroupItem>
  <ButtonGroupItem>Group</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup size="lg">
  <ButtonGroupItem>Large</ButtonGroupItem>
  <ButtonGroupItem>Group</ButtonGroupItem>
</ButtonGroup>`}
        >
          <ButtonGroup size="sm">
            <ButtonGroupItem>Small</ButtonGroupItem>
            <ButtonGroupItem>Group</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="md">
            <ButtonGroupItem>Medium</ButtonGroupItem>
            <ButtonGroupItem>Group</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <ButtonGroupItem>Large</ButtonGroupItem>
            <ButtonGroupItem>Group</ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> tightens the group for application UI -
          the same axis as Button and the rest of Koala. Set it per-group or for a whole subtree
          with <code className="font-mono text-sm">DensityProvider</code>. See{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>.
        </p>
        <ComponentPreview
          code={`<ButtonGroup density="comfortable">
  <ButtonGroupItem>Comfortable</ButtonGroupItem>
  <ButtonGroupItem>Group</ButtonGroupItem>
</ButtonGroup>

<ButtonGroup density="compact">
  <ButtonGroupItem>Compact</ButtonGroupItem>
  <ButtonGroupItem>Group</ButtonGroupItem>
</ButtonGroup>`}
        >
          <ButtonGroup density="comfortable">
            <ButtonGroupItem>Comfortable</ButtonGroupItem>
            <ButtonGroupItem>Group</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup density="compact">
            <ButtonGroupItem>Compact</ButtonGroupItem>
            <ButtonGroupItem>Group</ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Icon-only">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">iconOnly</code> on each item to collapse it to a
          square. Always pass an <code className="font-mono text-sm">aria-label</code> - Koala warns
          in development if one is missing.
        </p>
        <ComponentPreview
          code={`{/* Alignment toolbar */}
<ButtonGroup size="sm">
  <ButtonGroupItem iconOnly aria-label="Align left">
    <TextAlignLeft />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Align center">
    <TextAlignCenter />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Align right">
    <TextAlignRight />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Justify">
    <TextAlignJustify />
  </ButtonGroupItem>
</ButtonGroup>

{/* Formatting toolbar */}
<ButtonGroup size="sm">
  <ButtonGroupItem iconOnly aria-label="Bold">
    <TextB />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Italic">
    <TextItalic />
  </ButtonGroupItem>
  <ButtonGroupItem iconOnly aria-label="Underline">
    <TextUnderline />
  </ButtonGroupItem>
</ButtonGroup>`}
        >
          <ButtonGroup size="sm">
            <ButtonGroupItem iconOnly aria-label="Align left">
              <TextAlignLeft />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Align center">
              <TextAlignCenter />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Align right">
              <TextAlignRight />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Justify">
              <TextAlignJustify />
            </ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="sm">
            <ButtonGroupItem iconOnly aria-label="Bold">
              <TextB />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Italic">
              <TextItalic />
            </ButtonGroupItem>
            <ButtonGroupItem iconOnly aria-label="Underline">
              <TextUnderline />
            </ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Per-item overrides">
        <p className="mt-4 text-pretty text-muted-foreground">
          Any prop set directly on a{" "}
          <code className="font-mono text-sm">ButtonGroupItem</code> overrides the group context.
          Mix variants within the same group to give one action more visual weight - keep all items
          the same surface style (both bordered, or both filled) so the joined edges look intentional.
        </p>
        <ComponentPreview
          code={`{/* secondary base + primary confirm - both have a solid fill */}
<ButtonGroup variant="secondary">
  <ButtonGroupItem>Cancel</ButtonGroupItem>
  <ButtonGroupItem variant="primary">Save changes</ButtonGroupItem>
</ButtonGroup>

{/* detached - mixed variants always work when items are separated */}
<ButtonGroup attached={false}>
  <ButtonGroupItem>Discard</ButtonGroupItem>
  <ButtonGroupItem variant="destructive">Delete</ButtonGroupItem>
</ButtonGroup>`}
        >
          <ButtonGroup variant="secondary">
            <ButtonGroupItem>Cancel</ButtonGroupItem>
            <ButtonGroupItem variant="primary">Save changes</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup attached={false}>
            <ButtonGroupItem>Discard</ButtonGroupItem>
            <ButtonGroupItem variant="destructive">Delete</ButtonGroupItem>
          </ButtonGroup>
        </ComponentPreview>
      </DocSection>

    </>
  )
}
