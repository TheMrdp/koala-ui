import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"

import { SuggestionsDemo, CategoriesDemo } from "./demos"

export const metadata = {
  title: "Suggestions",
}

export default function SuggestionsDocsPage() {
  return (
    <>
      <DocHeader
        title="Suggestions"
        description="Inline AI edit suggestions over a body of text. The AI marks spans that could be improved with a colored dotted underline; click one to see the proposed replacement and a reason, then Apply to swap it in place or Dismiss to keep the original. The Grammarly / Notion 'suggested edits' pattern, built on our Popover."
      />

      <ComponentPreview
        previewClassName="items-start"
        code={`<Suggestions onApply={review} onDismiss={review}>
  Our onboarding flow{" "}
  <SuggestionMark
    variant="clarity"
    suggestion="helps new users get started in minutes"
    reason="Be specific about the outcome, not just that it is good."
  >
    is really good for users
  </SuggestionMark>
  . We{" "}
  <SuggestionMark variant="tone" suggestion="believe" reason="A confident verb reads stronger.">
    kinda think
  </SuggestionMark>{" "}
  it{" "}
  <SuggestionMark variant="grammar" suggestion="increases" reason="Subject-verb agreement.">
    increase
  </SuggestionMark>{" "}
  activation.
</Suggestions>`}
      >
        <SuggestionsDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation
          component="suggestions"
          dependencies="npm install radix-ui tailwind-variants tailwind-merge"
        />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Suggestions, SuggestionMark } from "@/components/ui/suggestions"

export function Review() {
  return (
    <Suggestions onApply={(next, original) => save(next)}>
      The deadline is{" "}
      <SuggestionMark
        variant="grammar"
        suggestion="Friday"
        reason="Capitalize the day of the week."
      >
        friday
      </SuggestionMark>
      .
    </Suggestions>
  )
}`}
        />
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap each improvable span in a{" "}
          <code className="font-mono text-sm">SuggestionMark</code> with its{" "}
          <code className="font-mono text-sm">suggestion</code> (the replacement) and an optional{" "}
          <code className="font-mono text-sm">reason</code>. Applying swaps the children for the
          suggestion in place; dismissing keeps the original. Both fire the root&apos;s{" "}
          <code className="font-mono text-sm">onApply</code> /{" "}
          <code className="font-mono text-sm">onDismiss</code> so you can persist the edit or
          tick down a counter.
        </p>
      </DocSection>

      <DocSection title="Categories">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">variant</code> tints the underline and the
          popover badge, so a reader can tell a grammar fix from a tone or clarity nudge at a
          glance: <code className="font-mono text-sm">grammar</code>,{" "}
          <code className="font-mono text-sm">clarity</code>,{" "}
          <code className="font-mono text-sm">tone</code>, and a neutral{" "}
          <code className="font-mono text-sm">default</code>.
        </p>
        <ComponentPreview
          previewClassName="items-start"
          code={`<SuggestionMark variant="grammar" suggestion="their house" reason="Possessive, not a contraction.">
  they're house
</SuggestionMark>

<SuggestionMark variant="clarity" suggestion="use the tools" reason="Plainer words read faster.">
  utilize the tooling
</SuggestionMark>

<SuggestionMark variant="tone" suggestion="we believe" reason="Confident, active voice.">
  we kinda think
</SuggestionMark>`}
        >
          <CategoriesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="font-mono text-sm font-semibold">Suggestions</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              The prose container and context for the marks. Forwards all native{" "}
              <code className="font-mono text-sm">div</code> props.
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">onApply?(suggestion, original)</code>: fired
                when any mark is applied.
              </li>
              <li>
                <code className="font-mono text-sm">onDismiss?(original)</code>: fired when any
                mark is dismissed.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold">SuggestionMark</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              One improvable span. The children are the original text; applying replaces them with{" "}
              <code className="font-mono text-sm">suggestion</code>.
            </p>
            <ul className="mt-2 flex flex-col gap-1.5 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">suggestion</code>: the replacement text
                (required).
              </li>
              <li>
                <code className="font-mono text-sm">variant?</code>:{" "}
                <code className="font-mono text-sm">default</code> ·{" "}
                <code className="font-mono text-sm">grammar</code> ·{" "}
                <code className="font-mono text-sm">clarity</code> ·{" "}
                <code className="font-mono text-sm">tone</code>.
              </li>
              <li>
                <code className="font-mono text-sm">label?</code> /{" "}
                <code className="font-mono text-sm">reason?</code>: the popover badge text and
                one-line explanation.
              </li>
              <li>
                <code className="font-mono text-sm">onApply? / onDismiss?</code>: per-mark hooks
                (the root&apos;s run too).
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "What goes in the children of a SuggestionMark versus the suggestion prop?", a: "The children are the original text the user wrote, and the `suggestion` prop is the replacement. When the user clicks Apply, the children are swapped for the suggestion in place; Dismiss keeps the children." },
            { q: "What does the variant prop change?", a: "It tints both the dotted underline on the span and the badge in the popover, so a reader can tell categories apart at a glance. The options are `grammar` (destructive red), `clarity` (info), `tone` (purple), and a neutral `default`." },
            { q: "When do I use the root onApply versus the per-mark onApply?", a: "Put `onApply` and `onDismiss` on the root `Suggestions` to handle every mark in one place, for example to persist the edit or tick down a counter. The root callback receives the suggestion and the original; a per-mark hook fires alongside it and receives just the suggestion." },
            { q: "Why does the badge label say Grammar when I did not set one?", a: "The badge defaults to the variant's name. Pass `label` on the `SuggestionMark` to override it with custom copy, and `reason` to add the one-line explanation shown beneath the diff." },
            { q: "Does the mark stay interactive after the user decides?", a: "No. Once a mark is applied or dismissed it collapses to plain text, the accepted replacement or the kept original, and the popover trigger is gone. Each mark owns its own resolved status." },
            { q: "What is the marked span rendered as for accessibility?", a: "It is a real focusable button that opens our Popover, so it is reachable by keyboard and shows a focus ring. The word's text color is inherited so it stays readable; only the underline and hover tint carry the category color." },
          ]}
        />
      </DocSection>
    </>
  )
}
