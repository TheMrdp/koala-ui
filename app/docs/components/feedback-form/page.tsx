import { ComponentPreview } from "@/components/docs/component-preview"
import { PremiumCode } from "@/components/docs/premium-code"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import { FeedbackFormDemo } from "./demos"

export const metadata = { title: "Feedback Form" }

export default function FeedbackFormDocsPage() {
  return (
    <>
      <DocHeader
        title="Feedback Form"
        description="A compact sentiment and comment block. A single-select rating row of five faces reveals an optional comment field once a face is picked, then submits. It owns its rating and message state; wire onSubmit to your feedback sink."
      />

      <ComponentPreview
        locked
        code={`<FeedbackForm onSubmit={({ rating, message }) => record(rating, message)} />`}
      >
        <FeedbackFormDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="feedback-form" />
      </DocSection>

      <DocSection title="Usage">
        <PremiumCode className="mt-4" />
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono font-semibold">FeedbackForm</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              Composes a single-select{" "}
              <a href="/docs/components/toggle-group" className="underline underline-offset-4">
                Toggle Group
              </a>{" "}
              and a{" "}
              <a href="/docs/components/textarea" className="underline underline-offset-4">Textarea</a>.
              Forwards all <code className="font-mono text-sm">&lt;div&gt;</code> props.
            </p>
            <ul className="mt-2 flex flex-col gap-1 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">onSubmit</code>:{" "}
                <code className="font-mono text-sm">{`(data: { rating, message }) => void | Promise<void>`}</code>.
                Rating is the chosen value <code className="font-mono text-sm">&quot;1&quot;</code>-
                <code className="font-mono text-sm">&quot;5&quot;</code>.
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
              q: "When should I reach for FeedbackForm instead of building my own rating UI?",
              a: "Use it whenever you want a quick sentiment plus optional comment in one card: it owns the rating and message state, reveals the comment field only after a face is picked, and shows a built-in success state, so you just wire `onSubmit`. Build your own only if you need a different scale or layout than the five-face row.",
            },
            {
              q: "What does the onSubmit callback receive, and how do I show a loading spinner?",
              a: "`onSubmit` is called with `{ rating, message }` where rating is the chosen value \"1\" through \"5\" and message is the comment text. Return a promise from it and the submit Button drives its own loading spinner until the promise resolves, then the card flips to the success state.",
            },
            {
              q: "Can I change the title, description, and button label?",
              a: "Yes. Pass `title`, `description`, and `action` to override the default copy. They are ReactNodes, so you can pass strings or richer markup, and setting `description` to null hides the description line.",
            },
            {
              q: "How does density affect the card?",
              a: "The `density` prop tunes the card padding, outer gap, title size, and success padding. `compact` is the 16px Koala default and `comfortable` is the roomier 24px option; omit the prop and it falls back to the nearest DensityProvider.",
            },
            {
              q: "Is the rating row accessible?",
              a: "It composes a single-select ToggleGroup labelled \"Rate your experience\", and each face carries an aria-label like \"Good\" or \"Terrible\". The live caption under the faces uses aria-live=\"polite\" so screen readers announce the chosen sentiment, and the success message is wrapped in a role=\"status\" region.",
            },
            {
              q: "Why does the submit button stay disabled, and what is the comment length cap?",
              a: "The submit Button is disabled until a face is selected, since a rating is required, and the comment field stays hidden until then. The Textarea is capped at 280 characters with a live count in its footer, so there is nothing extra to validate by hand.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
