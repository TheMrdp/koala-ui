import { ArrowRight, Plus } from "@phosphor-icons/react/ssr"

import { Button } from "@/components/ui/button"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Button",
}

export default function ButtonDocsPage() {
  return (
    <>
      <DocHeader
        title="Button"
        description="Triggers an action or event. The reference single-element component: one tv recipe, Radix Slot for asChild, semantic tokens only."
      />

      <ComponentPreview
        code={`<Button>
  <Plus /> New project
</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Learn more</Button>`}
      >
        <Button>
          <Plus /> New project
        </Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="ghost">Learn more</Button>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="button" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Button } from "@/components/ui/button"

export function Example() {
  return <Button>Click me</Button>
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <ComponentPreview
          code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>
<Button loading>Loading</Button>`}
        >
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
          <Button loading>Loading</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three sizes on a 4px grid - <code className="font-mono text-sm">sm</code> (32px),{" "}
          <code className="font-mono text-sm">md</code> (36px, the default), and{" "}
          <code className="font-mono text-sm">lg</code> (40px). The label stays{" "}
          <code className="font-mono text-sm">text-sm</code> across the scale; only height,
          padding, and the icon gap step up - so a larger button reads as the same control
          with more presence, not bigger text.
        </p>
        <ComponentPreview
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> tightens the control for
          application UI - compact is one tier shorter than the same-named comfortable size
          (md: <code className="font-mono text-sm">h-8</code> vs{" "}
          <code className="font-mono text-sm">h-9</code>). The visual shrinks but a
          pseudo-element keeps the hit target ≥40px. Set it per-button or for a whole subtree
          with <code className="font-mono text-sm">DensityProvider</code> - see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>.
        </p>
        <ComponentPreview
          code={`<Button density="comfortable">Comfortable</Button>
<Button density="compact">Compact</Button>`}
        >
          <Button density="comfortable">Comfortable</Button>
          <Button density="compact">Compact</Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Icons">
        <p className="mt-4 text-pretty text-muted-foreground">
          Icons are composed as children, not props - the recipe sizes any{" "}
          <code className="font-mono text-sm">svg</code> to{" "}
          <code className="font-mono text-sm">size-4</code> and a{" "}
          <code className="font-mono text-sm">gap</code> spaces it from the label. Put the icon
          before or after the text to place it <strong>left</strong> or{" "}
          <strong>right</strong>. A button carrying an icon trims its horizontal padding one
          step (<code className="font-mono text-sm">has-[&gt;svg]:px-*</code>) - an icon reads
          lighter than a text edge, so this keeps it optically balanced. For an{" "}
          <strong>icon-only</strong> button set{" "}
          <code className="font-mono text-sm">iconOnly</code> - it collapses to a square at any
          size - and always pass an <code className="font-mono text-sm">aria-label</code>, since
          there is no visible text. Koala warns in development if an{" "}
          <code className="font-mono text-sm">iconOnly</code> button has no accessible name.
        </p>
        <ComponentPreview
          code={`{/* Icon left */}
<Button>
  <Plus /> New project
</Button>

{/* Icon right */}
<Button variant="outline">
  Continue <ArrowRight />
</Button>

{/* No icon */}
<Button variant="secondary">Save</Button>

{/* Icon only */}
<Button iconOnly aria-label="Add">
  <Plus />
</Button>`}
        >
          <Button>
            <Plus /> New project
          </Button>
          <Button variant="outline">
            Continue <ArrowRight />
          </Button>
          <Button variant="secondary">Save</Button>
          <Button iconOnly aria-label="Add">
            <Plus />
          </Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <ComponentPreview
          code={`<Button disabled>Disabled</Button>
<Button variant="outline" disabled>Disabled</Button>`}
        >
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled
          </Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Loading">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">loading</code> shows a spinner and marks the
          button busy (<code className="font-mono text-sm">aria-busy</code>) while an action is
          in flight. The label is hidden but its space is reserved, so the button never reflows;
          it&apos;s also disabled so it can&apos;t be re-triggered. The spinner respects{" "}
          <code className="font-mono text-sm">prefers-reduced-motion</code>.
        </p>
        <ComponentPreview
          code={`<Button loading>Saving</Button>
<Button variant="outline" loading>Saving</Button>
<Button loading iconOnly aria-label="Saving" />`}
        >
          <Button loading>Saving</Button>
          <Button variant="outline" loading>
            Saving
          </Button>
          <Button loading iconOnly aria-label="Saving" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="As child">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use <code className="font-mono text-sm">asChild</code> to render the
          button styles on a different element - e.g. a Next.js{" "}
          <code className="font-mono text-sm">Link</code> - via Radix Slot, with no
          extra wrapper.
        </p>
        <ComponentPreview
          code={`<Button asChild>
  <a href="/docs">Documentation</a>
</Button>`}
        >
          <Button asChild>
            <a href="/docs">Documentation</a>
          </Button>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Button</code> forwards every native{" "}
          <code className="font-mono text-sm">{`<button>`}</code> prop, plus{" "}
          <code className="font-mono text-sm">variant</code>,{" "}
          <code className="font-mono text-sm">size</code>,{" "}
          <code className="font-mono text-sm">iconOnly</code>,{" "}
          <code className="font-mono text-sm">density</code>,{" "}
          <code className="font-mono text-sm">static</code> (disable the press scale), and{" "}
          <code className="font-mono text-sm">loading</code> (spinner + busy state). Pass{" "}
          <code className="font-mono text-sm">asChild</code> to render a different element via{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/utilities/slot"
            className="underline underline-offset-4"
          >
            Radix Slot
          </a>
          .
        </p>
      </DocSection>
    </>
  )
}
