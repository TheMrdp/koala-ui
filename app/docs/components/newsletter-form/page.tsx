import { ComponentPreview } from "@/components/docs/component-preview"
import { PremiumCode } from "@/components/docs/premium-code"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { NewsletterFormDemo, NewsletterFormInlineDemo } from "./demos"

export const metadata = { title: "Newsletter Form" }

export default function NewsletterFormDocsPage() {
  return (
    <>
      <DocHeader
        title="Newsletter Form"
        description="A ready-to-ship email-capture block. Drop it in and it works: it owns its own email state, validates the address, runs the loading → success flow, and blends into any surface. Two layouts: a self-contained card and a single-row inline signup for footers and heroes."
      />

      <ComponentPreview
        locked
        code={`<NewsletterForm onSubscribe={(email) => subscribe(email)} />`}
      >
        <NewsletterFormDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="newsletter-form" />
      </DocSection>

      <DocSection title="Usage">
        <PremiumCode className="mt-4" />
      </DocSection>

      <DocSection title="Inline">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">variant=&quot;inline&quot;</code> drops the card chrome
          for a single row, ideal inside a{" "}
          <a href="/docs/components/footer" className="underline underline-offset-4">Footer</a>{" "}
          or a hero section.
        </p>
        <ComponentPreview
          locked
          code={`<NewsletterForm variant="inline" action="Subscribe" />`}
        >
          <NewsletterFormInlineDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">NewsletterForm</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              A self-contained signup composed from{" "}
              <a href="/docs/components/input" className="underline underline-offset-4">Input</a>{" "}
              and{" "}
              <a href="/docs/components/button" className="underline underline-offset-4">Button</a>.
              Forwards all <code className="font-mono text-sm">&lt;div&gt;</code> props.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">variant</code>:{" "}
                <code className="font-mono text-sm">&quot;card&quot;</code> (default) or{" "}
                <code className="font-mono text-sm">&quot;inline&quot;</code>.
              </li>
              <li>
                <code className="font-mono text-sm">onSubscribe</code>:{" "}
                <code className="font-mono text-sm">(email: string) =&gt; void | Promise&lt;void&gt;</code>.
                Return a promise to keep the spinner up until your request resolves.
              </li>
              <li>
                <code className="font-mono text-sm">title</code>,{" "}
                <code className="font-mono text-sm">description</code>,{" "}
                <code className="font-mono text-sm">placeholder</code>,{" "}
                <code className="font-mono text-sm">action</code>,{" "}
                <code className="font-mono text-sm">fineprint</code>: override the default copy
                (card variant). Pass <code className="font-mono text-sm">null</code> to hide
                description or fineprint.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "Do I have to manage the email state myself?", a: "No. NewsletterForm is a ready-to-ship block: it owns its own email state, validates the address, and runs the loading then success flow. Drop it in and it works." },
            { q: "How do I hook it up to my mailing-list API?", a: "Wire `onSubscribe`, which receives the entered email on a valid submit. Return a promise from it to keep the spinner up until your request resolves, then the success panel replaces the form." },
            { q: "When should I use variant=\"inline\" instead of the card?", a: "Use `variant=\"inline\"` for a single-row signup in a Footer or hero section: it drops the card chrome (border, background, padding) down to just the input and button. The default `card` variant adds a heading, lead, and fine print." },
            { q: "How do I change the copy or hide parts of the card?", a: "Override `title`, `description`, `placeholder`, `action`, and `fineprint`. Pass `null` to `description` or `fineprint` to hide them entirely." },
            { q: "Why does the nested Input blend with the card instead of looking filled?", a: "The card root declares `--surface: var(--card)`, so the composed Input paints the panel surface rather than a darker `--background` block. That is the DS surface contract at work." },
            { q: "Does it honor density?", a: "Yes. Density tunes the card padding, gap, and title size, with `compact` (16px) as the default and `comfortable` (24px) for a roomier card; it also reads a surrounding DensityProvider." },
          ]}
        />
      </DocSection>
    </>
  )
}
