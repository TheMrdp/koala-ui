import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Accordion",
}

export default function AccordionDocsPage() {
  return (
    <>
      <DocHeader
        title="Accordion"
        description="A stack of disclosure rows built on Radix Accordion — keyboard nav, ARIA, and single or multiple expansion. The height tween rides Koala's motion tokens, and the variant axis spans a flush minimal list to fully contained cards."
      />

      <ComponentPreview
        previewClassName="block"
        code={`<Accordion type="single" collapsible defaultValue="what">
  <AccordionItem value="what">
    <AccordionTrigger>What is Koala UI?</AccordionTrigger>
    <AccordionContent>
      A commercial React component library — polished, token-driven, and
      Radix-backed, built to ship design systems that feel finished on day one.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="themes">
    <AccordionTrigger>How does theming work?</AccordionTrigger>
    <AccordionContent>
      Every color is a semantic token redefined per theme, so all four themes —
      light, dark, cream, and moonlight — re-skin automatically.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="a11y">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Behavior and a11y come from Radix primitives — focus, keyboard, and ARIA are
      handled for you, never hand-rolled.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
      >
        <div className="mx-auto w-full max-w-xl">
          <Accordion type="single" collapsible defaultValue="what">
            <AccordionItem value="what">
              <AccordionTrigger>What is Koala UI?</AccordionTrigger>
              <AccordionContent>
                A commercial React component library — polished, token-driven, and
                Radix-backed, built to ship design systems that feel finished on day one.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="themes">
              <AccordionTrigger>How does theming work?</AccordionTrigger>
              <AccordionContent>
                Every color is a semantic token redefined per theme, so all four themes —
                light, dark, cream, and moonlight — re-skin automatically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="a11y">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Behavior and a11y come from Radix primitives — focus, keyboard, and ARIA are
                handled for you, never hand-rolled.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="accordion" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export function Example() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Section title</AccordionTrigger>
        <AccordionContent>Section body.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three levels of chrome along one axis.{" "}
          <code className="font-mono text-sm">minimal</code> is a flush list of rows split by
          hairlines; <code className="font-mono text-sm">card</code> wraps the set in a single
          bordered surface with dividers; <code className="font-mono text-sm">separated</code>{" "}
          gives every item its own standalone card.
        </p>
        <ComponentPreview
          previewClassName="block"
          code={`{/* minimal — borderless, hairline dividers (default) */}
<Accordion type="single" collapsible variant="minimal">…</Accordion>

{/* card — one container, shared dividers */}
<Accordion type="single" collapsible variant="card">…</Accordion>

{/* separated — each item is its own card */}
<Accordion type="single" collapsible variant="separated">…</Accordion>`}
        >
          <div className="mx-auto grid w-full max-w-2xl gap-8">
            {(["minimal", "card", "separated"] as const).map((variant) => (
              <div key={variant}>
                <p className="mb-3 font-mono text-xs text-muted-foreground">{variant}</p>
                <Accordion type="single" collapsible variant={variant} defaultValue="a">
                  <AccordionItem value="a">
                    <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
                    <AccordionContent>
                      Yes — plans are month-to-month and you can cancel from billing in two
                      clicks. Access lasts through the period you&apos;ve paid for.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Do you offer team seats?</AccordionTrigger>
                    <AccordionContent>
                      Every plan includes unlimited seats for your organization at no extra
                      per-user cost.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Single vs. multiple">
        <p className="mt-4 text-pretty text-muted-foreground">
          Radix drives expansion.{" "}
          <code className="font-mono text-sm">type=&quot;single&quot;</code> keeps one row open
          at a time — add <code className="font-mono text-sm">collapsible</code> to allow
          closing the open row. <code className="font-mono text-sm">type=&quot;multiple&quot;</code>{" "}
          lets several stay open at once.
        </p>
        <ComponentPreview
          previewClassName="block"
          code={`<Accordion type="multiple" variant="card" defaultValue={["one", "two"]}>
  <AccordionItem value="one">…</AccordionItem>
  <AccordionItem value="two">…</AccordionItem>
  <AccordionItem value="three">…</AccordionItem>
</Accordion>`}
        >
          <div className="mx-auto w-full max-w-xl">
            <Accordion type="multiple" variant="card" defaultValue={["one", "two"]}>
              <AccordionItem value="one">
                <AccordionTrigger>Shipping</AccordionTrigger>
                <AccordionContent>
                  Free worldwide shipping on orders over $50. Most orders arrive in 3–5
                  business days.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="two">
                <AccordionTrigger>Returns</AccordionTrigger>
                <AccordionContent>
                  30-day no-questions returns. We email a prepaid label as soon as you start
                  the return.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="three">
                <AccordionTrigger>Warranty</AccordionTrigger>
                <AccordionContent>
                  Every product is covered by a two-year limited warranty against
                  manufacturing defects.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Like Card and Dialog, Accordion honors Koala&apos;s density axis.{" "}
          <code className="font-mono text-sm">comfortable</code> is the spacious marketing
          default; <code className="font-mono text-sm">compact</code> tightens row height and
          inset for dense application UI. Set it per-instance or once via a{" "}
          <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview
          previewClassName="block"
          code={`<Accordion type="single" collapsible variant="card" density="compact">…</Accordion>`}
        >
          <div className="mx-auto grid w-full max-w-2xl gap-8 sm:grid-cols-2">
            {(["comfortable", "compact"] as const).map((density) => (
              <div key={density}>
                <p className="mb-3 font-mono text-xs text-muted-foreground">{density}</p>
                <Accordion type="single" collapsible variant="card" density={density} defaultValue="a">
                  <AccordionItem value="a">
                    <AccordionTrigger>Account</AccordionTrigger>
                    <AccordionContent>
                      Manage your profile, email, and password.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="b">
                    <AccordionTrigger>Notifications</AccordionTrigger>
                    <AccordionContent>
                      Choose which events email you.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Accordion</code> forwards every Radix{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/components/accordion"
            className="underline underline-offset-4"
          >
            Accordion Root
          </a>{" "}
          prop — <code className="font-mono text-sm">type</code> (
          <code className="font-mono text-sm">&quot;single&quot;</code> /{" "}
          <code className="font-mono text-sm">&quot;multiple&quot;</code>),{" "}
          <code className="font-mono text-sm">collapsible</code>,{" "}
          <code className="font-mono text-sm">value</code> /{" "}
          <code className="font-mono text-sm">defaultValue</code>,{" "}
          <code className="font-mono text-sm">onValueChange</code> — plus{" "}
          <code className="font-mono text-sm">variant</code> (
          <code className="font-mono text-sm">minimal</code> /{" "}
          <code className="font-mono text-sm">card</code> /{" "}
          <code className="font-mono text-sm">separated</code>) and{" "}
          <code className="font-mono text-sm">density</code>.{" "}
          <code className="font-mono text-sm">AccordionItem</code> needs a unique{" "}
          <code className="font-mono text-sm">value</code>. Each part forwards its native
          props and merges <code className="font-mono text-sm">className</code> last.
        </p>
      </DocSection>
    </>
  )
}
