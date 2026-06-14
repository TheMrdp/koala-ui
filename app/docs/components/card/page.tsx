import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = { title: "Card" }

export default function CardDocsPage() {
  return (
    <>
      <DocHeader
        title="Card"
        description="A surface that groups related content. The reference multi-part component: one tv recipe with slots, shared variants flowing to every part through React Context."
      />

      <ComponentPreview
        previewClassName="block"
        code={`<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Upgrade to Pro</CardTitle>
    <CardDescription>Unlock every theme and component.</CardDescription>
  </CardHeader>
  <CardContent className="text-sm text-muted-foreground">
    Billed annually. Cancel anytime from settings.
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="ghost">Learn more</Button>
    <Button>Upgrade</Button>
  </CardFooter>
</Card>`}
      >
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>Unlock every theme and component.</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Billed annually. Cancel anytime from settings.
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="ghost">Learn more</Button>
            <Button>Upgrade</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="card" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Card, CardHeader, CardTitle,
  CardDescription, CardContent, CardFooter,
} from "@/components/ui/card"

export function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Supporting text.</CardDescription>
      </CardHeader>
      <CardContent>Body content.</CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  )
}`}
        />
      </DocSection>

      <DocSection title="Anatomy">
        <ComponentPreview
          previewClassName="block"
          code={`<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Upgrade to Pro</CardTitle>
    <CardDescription>Unlock every theme and component.</CardDescription>
    <CardAction>
      <Button size="sm" variant="ghost">Dismiss</Button>
    </CardAction>
  </CardHeader>
  <CardContent className="text-sm text-muted-foreground">
    Billed annually. Cancel anytime from settings.
  </CardContent>
  <CardFooter className="gap-2">
    <Button variant="ghost">Maybe later</Button>
    <Button>Upgrade</Button>
  </CardFooter>
</Card>`}
        >
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>Unlock every theme and component.</CardDescription>
              <CardAction>
                <Button size="sm" variant="ghost">
                  Dismiss
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Billed annually. Cancel anytime from settings.
            </CardContent>
            <CardFooter className="gap-2">
              <Button variant="ghost">Maybe later</Button>
              <Button>Upgrade</Button>
            </CardFooter>
          </Card>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">elevated</code> drops the border and leans
          on shadow for depth - shadows over borders.
        </p>
        <ComponentPreview
          previewClassName="items-stretch"
          code={`<Card variant="default">…</Card>
<Card variant="outline">…</Card>
<Card variant="elevated">…</Card>`}
        >
          {(["default", "outline", "elevated"] as const).map((v) => (
            <Card key={v} variant={v} className="w-56">
              <CardHeader>
                <CardTitle className="capitalize">{v}</CardTitle>
                <CardDescription>variant=&quot;{v}&quot;</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                The quick brown fox jumps over the lazy dog.
              </CardContent>
            </Card>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> flows from the root through
          context to every part&rsquo;s padding and the title scale.{" "}
          <code className="font-mono text-sm">compact</code> is the Koala default (16px
          padding & gaps, 1rem title);{" "}
          <code className="font-mono text-sm">comfortable</code> is the spacious
          alternative for marketing layouts. Set it per-card or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code> - see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>.
        </p>
        <ComponentPreview
          previewClassName="items-start"
          code={`<Card>…</Card>
<Card density="comfortable">…</Card>`}
        >
          {(["compact", "comfortable"] as const).map((d) => (
            <Card key={d} density={d} className="w-56">
              <CardHeader>
                <CardTitle className="capitalize">{d}</CardTitle>
                <CardDescription>
                  {d === "compact" ? "Default." : "Spacious alternative."}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Shared via React Context.
              </CardContent>
            </Card>
          ))}
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Card</code> takes{" "}
          <code className="font-mono text-sm">variant</code> and{" "}
          <code className="font-mono text-sm">density</code>, which flow through Context to{" "}
          <code className="font-mono text-sm">CardHeader</code>,{" "}
          <code className="font-mono text-sm">CardTitle</code>,{" "}
          <code className="font-mono text-sm">CardDescription</code>,{" "}
          <code className="font-mono text-sm">CardAction</code>,{" "}
          <code className="font-mono text-sm">CardContent</code>, and{" "}
          <code className="font-mono text-sm">CardFooter</code>. Every part is a{" "}
          <code className="font-mono text-sm">{`<div>`}</code> that forwards its native props
          and merges <code className="font-mono text-sm">className</code> last.
        </p>
      </DocSection>
    </>
  )
}
