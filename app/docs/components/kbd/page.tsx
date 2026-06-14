import { ArrowUp, Command, Option } from "@phosphor-icons/react/ssr"

import { Kbd } from "@/components/ui/kbd"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Kbd",
}

export default function KbdDocsPage() {
  return (
    <>
      <DocHeader
        title="Kbd"
        description="A keyboard key indicator for documenting shortcuts. Renders a native <kbd>; the default variant reads as a raised keycap and re-themes everywhere. Compose combos by placing several side by side."
      />

      <ComponentPreview
        code={`<Kbd><Command /></Kbd>
<Kbd>K</Kbd>
<Kbd variant="outline">Esc</Kbd>
<Kbd variant="solid">⏎ Enter</Kbd>`}
      >
        <Kbd>
          <Command />
        </Kbd>
        <Kbd>K</Kbd>
        <Kbd variant="outline">Esc</Kbd>
        <Kbd variant="solid">⏎ Enter</Kbd>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="kbd" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Kbd } from "@/components/ui/kbd"

export function Example() {
  return <Kbd>Esc</Kbd>
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">default</code> is a raised keycap (border +
          soft <code className="font-mono text-sm">shadow-xs</code>),{" "}
          <code className="font-mono text-sm">outline</code> is a flat hairline for dense
          inline help, and <code className="font-mono text-sm">solid</code> inverts for
          high-contrast callouts.
        </p>
        <ComponentPreview
          code={`<Kbd variant="default">K</Kbd>
<Kbd variant="outline">K</Kbd>
<Kbd variant="solid">K</Kbd>`}
        >
          <Kbd variant="default">K</Kbd>
          <Kbd variant="outline">K</Kbd>
          <Kbd variant="solid">K</Kbd>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          code={`<Kbd size="sm">⇧</Kbd>
<Kbd size="md">⇧</Kbd>
<Kbd size="lg">⇧</Kbd>`}
        >
          <Kbd size="sm">⇧</Kbd>
          <Kbd size="md">⇧</Kbd>
          <Kbd size="lg">⇧</Kbd>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Combinations">
        <p className="mt-4 text-pretty text-muted-foreground">
          Kbd is a single key by design. Build a shortcut by placing several side by side
          in an <code className="font-mono text-sm">inline-flex</code> row — each key keeps
          its own cap.
        </p>
        <ComponentPreview
          code={`<span className="inline-flex items-center gap-1">
  <Kbd><Command /></Kbd>
  <Kbd><ArrowUp /></Kbd>
  <Kbd>P</Kbd>
</span>
<span className="inline-flex items-center gap-1">
  <Kbd><Option /></Kbd>
  <Kbd>Tab</Kbd>
</span>`}
        >
          <span className="inline-flex items-center gap-1">
            <Kbd>
              <Command />
            </Kbd>
            <Kbd>
              <ArrowUp />
            </Kbd>
            <Kbd>P</Kbd>
          </span>
          <span className="inline-flex items-center gap-1">
            <Kbd>
              <Option />
            </Kbd>
            <Kbd>Tab</Kbd>
          </span>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Inline">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drop a key straight into running text — the <code className="font-mono text-sm">outline</code>{" "}
          variant sits quietly inside a sentence.
        </p>
        <ComponentPreview
          code={`<p>Press <Kbd variant="outline" size="sm">⌘</Kbd>{" "}
<Kbd variant="outline" size="sm">K</Kbd> to open the command menu.</p>`}
        >
          <p className="text-pretty text-foreground">
            Press <Kbd variant="outline" size="sm">⌘</Kbd>{" "}
            <Kbd variant="outline" size="sm">K</Kbd> to open the command menu.
          </p>
        </ComponentPreview>
      </DocSection>

    </>
  )
}
