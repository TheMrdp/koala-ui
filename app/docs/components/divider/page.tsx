import { GoogleLogo } from "@phosphor-icons/react/ssr"

import { Divider } from "@/components/ui/divider"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Divider",
}

export default function DividerDocsPage() {
  return (
    <>
      <DocHeader
        title="Divider"
        description="A thin rule that separates content — optionally with a centered label. Single-element like Badge; stroke styles ride border tokens, and the gradient variant fades a hairline out at both ends, so every form re-themes across all four themes."
      />

      <ComponentPreview
        previewClassName="flex-col items-stretch gap-6"
        code={`<Divider />
<Divider variant="dashed" />
<Divider>OR</Divider>
<Divider variant="gradient" />`}
      >
        <Divider />
        <Divider variant="dashed" />
        <Divider>OR</Divider>
        <Divider variant="gradient" />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="divider" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Divider } from "@/components/ui/divider"

export function Example() {
  return (
    <div>
      <p>Above</p>
      <Divider />
      <p>Below</p>
    </div>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          Four stroke styles. <code className="font-mono text-sm">solid</code>,{" "}
          <code className="font-mono text-sm">dashed</code>, and{" "}
          <code className="font-mono text-sm">dotted</code> ride the{" "}
          <code className="font-mono text-sm">border-*</code> utilities;{" "}
          <code className="font-mono text-sm">gradient</code> fades a hairline out at
          both ends for a softer separation between large surfaces.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-6"
          code={`<Divider variant="solid" />
<Divider variant="dashed" />
<Divider variant="dotted" />
<Divider variant="gradient" />`}
        >
          <Divider variant="solid" />
          <Divider variant="dashed" />
          <Divider variant="dotted" />
          <Divider variant="gradient" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With label">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass children to render a centered label between two lines — ideal for an
          &ldquo;OR&rdquo; separator in auth forms. The label is text or an icon; the
          flanking lines are <code className="font-mono text-sm">aria-hidden</code> so
          the a11y tree still exposes exactly one separator.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-6"
          code={`<Divider>OR</Divider>
<Divider variant="dashed">Continue with</Divider>
<Divider variant="gradient">
  <GoogleLogo /> Google
</Divider>`}
        >
          <Divider>OR</Divider>
          <Divider variant="dashed">Continue with</Divider>
          <Divider variant="gradient">
            <span className="inline-flex items-center gap-1.5">
              <GoogleLogo /> Google
            </span>
          </Divider>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Label position">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">labelPosition</code> sets where the label
          sits. <code className="font-mono text-sm">start</code> and{" "}
          <code className="font-mono text-sm">end</code> drop the line on that side so the
          label hugs the edge.
        </p>
        <ComponentPreview
          previewClassName="flex-col items-stretch gap-6"
          code={`<Divider labelPosition="start">Start</Divider>
<Divider labelPosition="center">Center</Divider>
<Divider labelPosition="end">End</Divider>`}
        >
          <Divider labelPosition="start">Start</Divider>
          <Divider labelPosition="center">Center</Divider>
          <Divider labelPosition="end">End</Divider>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Vertical">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">orientation=&quot;vertical&quot;</code> to
          separate inline content. The divider stretches to the height of its container, so
          place it in a flex row. Vertical dividers don&apos;t take a label.
        </p>
        <ComponentPreview
          code={`<div className="flex h-5 items-center gap-4">
  <span>Docs</span>
  <Divider orientation="vertical" />
  <span>Guides</span>
  <Divider orientation="vertical" variant="dashed" />
  <span>API</span>
  <Divider orientation="vertical" variant="gradient" />
  <span>Blog</span>
</div>`}
        >
          <div className="flex h-5 items-center gap-4 text-sm text-foreground">
            <span>Docs</span>
            <Divider orientation="vertical" />
            <span>Guides</span>
            <Divider orientation="vertical" variant="dashed" />
            <span>API</span>
            <Divider orientation="vertical" variant="gradient" />
            <span>Blog</span>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Divider</code> forwards every native{" "}
          <code className="font-mono text-sm">{`<div>`}</code> prop, plus{" "}
          <code className="font-mono text-sm">orientation</code> (
          <code className="font-mono text-sm">horizontal</code> /{" "}
          <code className="font-mono text-sm">vertical</code>),{" "}
          <code className="font-mono text-sm">variant</code> (
          <code className="font-mono text-sm">solid</code> /{" "}
          <code className="font-mono text-sm">dashed</code> /{" "}
          <code className="font-mono text-sm">dotted</code> /{" "}
          <code className="font-mono text-sm">gradient</code>),{" "}
          <code className="font-mono text-sm">labelPosition</code> (
          <code className="font-mono text-sm">start</code> /{" "}
          <code className="font-mono text-sm">center</code> /{" "}
          <code className="font-mono text-sm">end</code>), and{" "}
          <code className="font-mono text-sm">decorative</code> to drop the separator role
          from the a11y tree. Pass children to render a label (horizontal only). Behavior
          and ARIA come from{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/components/separator"
            className="underline underline-offset-4"
          >
            Radix Separator
          </a>
          .
        </p>
      </DocSection>
    </>
  )
}
