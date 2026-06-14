import { DensityProvider } from "@/lib/density"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = { title: "Density" }

// The compact (application-UI) spec, contrasted with the comfortable (marketing) default.
const SPEC = [
  ["Card padding / gap", "p-6 · gap-6", "p-4 · gap-4 (16px)"],
  ["Card title", "text-lg", "text-base (1rem)"],
  ["Card description", "text-sm muted", "text-sm muted"],
  ["Button height (md)", "h-9 (36px)", "h-8 (32px)"],
  ["Dialog padding / gap", "p-6 · gap-4", "p-4 · gap-3"],
  ["Tabs pill", "rounded-xl p-1", "rounded-lg p-0.5"],
]

const SAMPLE = (
  <Card className="w-60">
    <CardHeader>
      <CardTitle>Payout threshold</CardTitle>
      <CardDescription>Minimum balance before a payout triggers.</CardDescription>
    </CardHeader>
    <CardContent className="text-sm text-muted-foreground">$2,500.00</CardContent>
  </Card>
)

export default function DensityPage() {
  return (
    <>
      <DocHeader
        title="Density"
        description="Koala serves both marketing and application UI, the way Tailwind does. Density is the cross-cutting knob that retunes padding, gaps and control heights - without touching color or radius. comfortable is the marketing-first default; compact is the application-UI preset."
      />

      <DocSection title="Two densities">
        <p className="mt-4 text-pretty text-muted-foreground">
          The same Card, rendered <code className="font-mono text-sm">comfortable</code> (the
          default) and <code className="font-mono text-sm">compact</code>. Only spacing and
          title scale change - corners stay the brand 16px radius.
        </p>
        <ComponentPreview
          previewClassName="items-start"
          code={`<Card density="comfortable">…</Card>
<Card density="compact">…</Card>`}
        >
          <Card density="comfortable" className="w-60">
            <CardHeader>
              <CardTitle>Comfortable</CardTitle>
              <CardDescription>Generous spacing for marketing.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              p-6 · gap-6 · text-lg title.
            </CardContent>
          </Card>
          <Card density="compact" className="w-60">
            <CardHeader>
              <CardTitle>Compact</CardTitle>
              <CardDescription>Tight, dense application UI.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              p-4 · gap-4 · text-base title.
            </CardContent>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Application-UI spec">
        <p className="mt-4 text-pretty text-muted-foreground">
          The compact preset, modelled on a dense dashboard: 16px padding and gaps, 1rem card
          titles, 14px muted descriptions, and controls that aren&rsquo;t too tall.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="border-r border-border px-4 py-2.5 text-left font-medium" />
                <th className="border-r border-border px-4 py-2.5 text-left font-medium">comfortable</th>
                <th className="px-4 py-2.5 text-left font-medium">compact</th>
              </tr>
            </thead>
            <tbody>
              {SPEC.map(([label, comfy, compact], i) => (
                <tr key={label} className={i % 2 ? "bg-muted/40" : undefined}>
                  <td className="border-r border-border px-4 py-2.5">{label}</td>
                  <td className="border-r border-border px-4 py-2.5 font-mono text-xs text-muted-foreground">{comfy}</td>
                  <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{compact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Set it once for a subtree">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap an app shell in <code className="font-mono text-sm">DensityProvider</code> and
          every nested Koala component tightens up - no per-instance props. Resolution
          precedence is <strong>explicit prop &gt; nearest provider &gt; comfortable</strong>,
          so any component can opt back out.
        </p>
        <CodeSnippet
          filename="app-shell.tsx"
          className="mt-4"
          code={`import { DensityProvider } from "@/lib/density"

export function Dashboard({ children }) {
  // Everything inside renders compact unless a component sets density itself.
  return <DensityProvider density="compact">{children}</DensityProvider>
}`}
        />
        <ComponentPreview
          previewClassName="items-start gap-4"
          code={`<DensityProvider density="compact">
  <Card>…</Card>
  <Button>Save threshold</Button>
</DensityProvider>`}
        >
          <DensityProvider density="compact">
            {SAMPLE}
            <Button>Save threshold</Button>
          </DensityProvider>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Which components honor density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <strong>Button</strong>, <strong>Card</strong>, <strong>Dialog</strong> and{" "}
          <strong>Tabs</strong> retune for density. <strong>Avatar</strong> and{" "}
          <strong>Badge</strong> skip it - they already own explicit pixel{" "}
          <code className="font-mono text-sm">size</code> scales, so a spacing axis would be
          redundant.
        </p>
        <p className="mt-4 text-pretty text-muted-foreground">
          Reading density makes a component a client component. Card, Dialog and Tabs already
          were; <strong>Button</strong> is now{" "}
          <code className="font-mono text-sm">&quot;use client&quot;</code> too, so it can
          participate in provider-driven density.
        </p>
      </DocSection>
    </>
  )
}
