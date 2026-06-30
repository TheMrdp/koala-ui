import { ComponentPreview } from "@/components/docs/component-preview"
import { PremiumCode } from "@/components/docs/premium-code"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { ContactFormDemo } from "./demos"

export const metadata = { title: "Contact Form" }

export default function ContactFormDocsPage() {
  return (
    <>
      <DocHeader
        title="Contact Form"
        description="A complete contact block: a name and email row, a categorized subject Select, and a message Textarea with a live character count, all wired through Field for automatic label, aria, and error association. It manages its own state and confirms on submit."
      />

      <ComponentPreview
        locked
        code={`<ContactForm onSubmit={(data) => send(data)} />`}
      >
        <ContactFormDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="contact-form" />
      </DocSection>

      <DocSection title="Usage">
        <PremiumCode className="mt-4" />
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">ContactForm</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              Composes{" "}
              <a href="/docs/components/field" className="underline underline-offset-4">Field</a>,{" "}
              <a href="/docs/components/input" className="underline underline-offset-4">Input</a>,{" "}
              <a href="/docs/components/select" className="underline underline-offset-4">Select</a>, and{" "}
              <a href="/docs/components/textarea" className="underline underline-offset-4">Textarea</a>.
              Forwards all <code className="font-mono text-sm">&lt;div&gt;</code> props.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">onSubmit</code>:{" "}
                <code className="font-mono text-sm">(data: ContactFormData) =&gt; void | Promise&lt;void&gt;</code>
                , where <code className="font-mono text-sm">ContactFormData</code> is{" "}
                <code className="font-mono text-sm">{`{ name, email, subject, message }`}</code>.
              </li>
              <li>
                <code className="font-mono text-sm">title</code>,{" "}
                <code className="font-mono text-sm">description</code>,{" "}
                <code className="font-mono text-sm">action</code>: override the default copy.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I use ContactForm instead of composing Field, Input, Select, and Textarea myself?",
              a: "Reach for ContactForm when you want a drop-in `get in touch` block: it owns its own field state, validation wiring, and the loading to success flow out of the box. Compose the primitives yourself only when you need a different field set or custom validation, since ContactForm fixes the schema to name, email, subject, and message.",
            },
            {
              q: "What shape is the data passed to onSubmit, and how do I drive the loading spinner?",
              a: "onSubmit receives a `ContactFormData` object of `{ name, email, subject, message }`. Return a promise from your handler and the submit Button shows its loading state until that promise resolves, after which the form swaps to the success panel.",
            },
            {
              q: "How do I change the heading, supporting text, or submit button label?",
              a: "Pass the `title`, `description`, and `action` props to override the defaults (`Get in touch`, the intro line, and `Send message`). Set `description` to null if you want to drop the supporting line entirely.",
            },
            {
              q: "How does ContactForm handle density and how do nested controls blend with the card?",
              a: "The `density` prop accepts `compact` (16px, the default) or `comfortable` (24px), and falls back to the nearest DensityProvider when omitted. The root declares `--surface: var(--card)`, so the nested Input, Select, and Textarea blend with the panel instead of painting their own background block.",
            },
            {
              q: "Is the character counter and the field labeling accessible?",
              a: "Each control is wrapped in Field, which auto-associates its FieldLabel, hint, and aria attributes, so labels are programmatically tied to inputs. The message Textarea enforces a 500 character `maxLength` with a live TextareaCount, and the success state renders with `role=\"status\"` so it is announced to screen readers.",
            },
            {
              q: "Why does the subject Select wrap its icon and label in a span, and do I need to do that?",
              a: "Inside SelectItem the icon and label both land in the item text, so they are wrapped in an inline-flex span to sit on one row rather than stacking, matching the icon plus label Select pattern. ContactForm already handles this internally, so you only need the pattern if you build your own icon-bearing SelectItem rows.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
