import {
  TextareaRoot,
  TextareaField,
  TextareaLabel,
  TextareaHint,
} from "@/components/ui/textarea"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { AutoResizeDemo, AddonCounterDemo, CounterDemo } from "./demos"

export const metadata = {
  title: "Textarea",
}

export default function TextareaDocsPage() {
  return (
    <>
      <DocHeader
        title="Textarea"
        description="A multi-line text field built from slots and Context: pairs with a label and hint, grows to fit its content, and carries an optional character counter in its footer. Each part is a named export."
      />

      <ComponentPreview
        code={`<div className="flex flex-col gap-1.5">
  <TextareaLabel htmlFor="message">Message</TextareaLabel>
  <TextareaRoot>
    <TextareaField id="message" placeholder="Write your message…" />
  </TextareaRoot>
</div>`}
      >
        <div className="flex w-full max-w-sm flex-col gap-1.5">
          <TextareaLabel htmlFor="message">Message</TextareaLabel>
          <TextareaRoot>
            <TextareaField id="message" placeholder="Write your message…" />
          </TextareaRoot>
        </div>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="textarea" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  TextareaRoot,
  TextareaField,
  TextareaLabel,
} from "@/components/ui/textarea"

export function Example() {
  return (
    <div className="flex flex-col gap-1.5">
      <TextareaLabel htmlFor="message">Message</TextareaLabel>
      <TextareaRoot>
        <TextareaField id="message" placeholder="Write your message…" />
      </TextareaRoot>
    </div>
  )
}`}
        />
      </DocSection>

      <DocSection title="Label & hint">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code>TextareaLabel</code> sits above the control. Wire it with{" "}
          <code>htmlFor</code> pointing at the <code>TextareaField</code>’s{" "}
          <code>id</code> so clicking the label focuses the field. Pass{" "}
          <code>required</code> to append a destructive asterisk.{" "}
          <code>TextareaHint</code> renders helper text below; give it an{" "}
          <code>id</code> and reference it from the field’s{" "}
          <code>aria-describedby</code>. Both are the shared DS{" "}
          <code>Label</code> / <code>Hint</code> primitives.
        </p>
        <ComponentPreview
          code={`<div className="flex flex-col gap-1.5">
  <TextareaLabel htmlFor="feedback" required>
    Feedback
  </TextareaLabel>
  <TextareaRoot>
    <TextareaField
      id="feedback"
      placeholder="What could be better?"
      aria-describedby="feedback-hint"
    />
  </TextareaRoot>
  <TextareaHint id="feedback-hint">
    Your notes go straight to the product team.
  </TextareaHint>
</div>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-1.5">
            <TextareaLabel htmlFor="feedback" required>
              Feedback
            </TextareaLabel>
            <TextareaRoot>
              <TextareaField
                id="feedback"
                placeholder="What could be better?"
                aria-describedby="feedback-hint"
              />
            </TextareaRoot>
            <TextareaHint id="feedback-hint">
              Your notes go straight to the product team.
            </TextareaHint>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Auto-resize">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code>autoResize</code> to <code>TextareaField</code> and the
          field grows to fit its content as you type, with no inner scrollbar. It
          rides the native CSS <code>field-sizing: content</code> where the
          browser supports it (no JavaScript at all), and falls back to a{" "}
          <code>scrollHeight</code> measurement everywhere else, so it works in
          every browser. Growth stays in sync on paste, autofill, or a
          controlled reset. It pins the drag handle to <code>none</code>, since
          manual dragging would fight the content height.
        </p>
        <ComponentPreview
          code={`<TextareaRoot>
  <TextareaField
    autoResize
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Start typing…"
  />
</TextareaRoot>`}
        >
          <AutoResizeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Character count addon">
        <p className="mt-4 text-pretty text-muted-foreground">
          For the common case, pass <code>showCount</code> to{" "}
          <code>TextareaField</code> and it renders the footer and counter for
          you, with no separate state and no extra parts. It tracks the field’s own
          length, so it works whether the field is controlled or uncontrolled.
          Add the native <code>maxLength</code> to show <code>current / max</code>{" "}
          and hard-cap the input.
        </p>
        <ComponentPreview
          code={`<TextareaRoot resize="none">
  <TextareaField
    showCount
    maxLength={180}
    placeholder="Tell us about yourself…"
  />
</TextareaRoot>`}
        >
          <AddonCounterDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Character counter (manual)">
        <p className="mt-4 text-pretty text-muted-foreground">
          For full control over the footer, compose it by hand.{" "}
          <code>TextareaFooter</code> is a slot inside the field’s border,
          ideal for a helper note on the left and a counter on the right.{" "}
          <code>TextareaCount</code> takes the current length and an optional{" "}
          <code>max</code>; it uses <code>tabular-nums</code> so the count never
          shifts the layout, and turns destructive once you go over. Pair it
          with <code>hasError</code> on the root to flush the whole field red.
        </p>
        <ComponentPreview
          code={`<TextareaRoot resize="none" hasError={value.length > 180}>
  <TextareaField
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Tell us about yourself…"
  />
  <TextareaFooter>
    <span>Markdown supported</span>
    <TextareaCount current={value.length} max={180} />
  </TextareaFooter>
</TextareaRoot>`}
        >
          <CounterDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three sizes scale padding, text, and the minimum height:{" "}
          <code>sm</code>, <code>md</code> (the default), and <code>lg</code>.
          Set <code>size</code> on <code>TextareaRoot</code>; every part picks it
          up from context.
        </p>
        <ComponentPreview
          code={`<TextareaRoot size="sm">
  <TextareaField placeholder="Small" />
</TextareaRoot>

<TextareaRoot size="md">
  <TextareaField placeholder="Medium (default)" />
</TextareaRoot>

<TextareaRoot size="lg">
  <TextareaField placeholder="Large" />
</TextareaRoot>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <TextareaLabel htmlFor="ta-sm">Small</TextareaLabel>
              <TextareaRoot size="sm">
                <TextareaField id="ta-sm" placeholder="Small" />
              </TextareaRoot>
            </div>
            <div className="flex flex-col gap-1.5">
              <TextareaLabel htmlFor="ta-md">Medium (default)</TextareaLabel>
              <TextareaRoot size="md">
                <TextareaField id="ta-md" placeholder="Medium" />
              </TextareaRoot>
            </div>
            <div className="flex flex-col gap-1.5">
              <TextareaLabel htmlFor="ta-lg">Large</TextareaLabel>
              <TextareaRoot size="lg">
                <TextareaField id="ta-lg" placeholder="Large" />
              </TextareaRoot>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Resize">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code>resize</code> prop on <code>TextareaRoot</code> controls the
          drag handle: <code>vertical</code> (default), <code>none</code>,{" "}
          <code>horizontal</code>, or <code>both</code>. The handle stays clipped
          to the field’s rounded corner.
        </p>
        <ComponentPreview
          code={`<TextareaRoot resize="none">
  <TextareaField placeholder="Can't be resized" />
</TextareaRoot>

<TextareaRoot resize="vertical">
  <TextareaField placeholder="Drag the bottom edge" />
</TextareaRoot>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <TextareaLabel htmlFor="ta-fixed">Fixed</TextareaLabel>
              <TextareaRoot resize="none">
                <TextareaField id="ta-fixed" placeholder="Can't be resized" />
              </TextareaRoot>
            </div>
            <div className="flex flex-col gap-1.5">
              <TextareaLabel htmlFor="ta-vertical">Vertical</TextareaLabel>
              <TextareaRoot resize="vertical">
                <TextareaField
                  id="ta-vertical"
                  placeholder="Drag the bottom edge"
                />
              </TextareaRoot>
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Error">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code>hasError</code> to <code>TextareaRoot</code> to switch the
          border and focus ring to the destructive color and set{" "}
          <code>aria-invalid</code> on the underlying <code>textarea</code>. Pass
          the same <code>hasError</code> to <code>TextareaHint</code> so the
          helper text doubles as the error message.
        </p>
        <ComponentPreview
          code={`<div className="flex flex-col gap-1.5">
  <TextareaLabel htmlFor="ta-error" required>Summary</TextareaLabel>
  <TextareaRoot hasError>
    <TextareaField
      id="ta-error"
      defaultValue="Too short"
      aria-describedby="ta-error-hint"
    />
  </TextareaRoot>
  <TextareaHint id="ta-error-hint" hasError>
    Add at least 20 characters.
  </TextareaHint>
</div>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-1.5">
            <TextareaLabel htmlFor="ta-error" required>
              Summary
            </TextareaLabel>
            <TextareaRoot hasError>
              <TextareaField
                id="ta-error"
                defaultValue="Too short"
                aria-describedby="ta-error-hint"
              />
            </TextareaRoot>
            <TextareaHint id="ta-error-hint" hasError>
              Add at least 20 characters.
            </TextareaHint>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <ComponentPreview
          code={`<div className="flex flex-col gap-1.5">
  <TextareaLabel htmlFor="ta-disabled">Message</TextareaLabel>
  <TextareaRoot disabled>
    <TextareaField id="ta-disabled" placeholder="Disabled" />
  </TextareaRoot>
</div>`}
        >
          <div className="flex w-full max-w-sm flex-col gap-1.5">
            <TextareaLabel htmlFor="ta-disabled">Message</TextareaLabel>
            <TextareaRoot disabled>
              <TextareaField id="ta-disabled" placeholder="Disabled" />
            </TextareaRoot>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "Why is the Textarea split into TextareaRoot and TextareaField?", a: "`TextareaRoot` owns the bordered surface, size, resize behavior, and error state and shares them through Context, while `TextareaField` is the actual `textarea` element. Splitting them lets the footer and counter live inside the same border as the input." },
            { q: "Should I use showCount or compose TextareaFooter and TextareaCount by hand?", a: "For the common case, pass `showCount` (and optionally `maxLength`) to `TextareaField` and it renders the footer and counter for you, tracking the field's own length whether controlled or uncontrolled. Compose `TextareaFooter` with `TextareaCount` manually only when you also want custom footer content like a helper note." },
            { q: "How do I make the field grow with its content?", a: "Pass `autoResize` to `TextareaField`. It rides the native CSS `field-sizing: content` where supported with no JS, and falls back to a `scrollHeight` measurement elsewhere. It also pins the drag handle to none, since manual dragging would fight the content height." },
            { q: "How do I wire up the label and hint accessibly?", a: "Point `TextareaLabel`'s `htmlFor` at the `TextareaField`'s `id` so clicking the label focuses it, and give `TextareaHint` an `id` referenced from the field's `aria-describedby`. Add `required` on the label to append a destructive asterisk." },
            { q: "How do I show an error state?", a: "Pass `hasError` to `TextareaRoot` to flip the border and focus ring to the destructive color and set `aria-invalid` on the textarea. Pass the same `hasError` to `TextareaHint` so the helper text doubles as the error message." },
            { q: "What is the difference between the size and resize props?", a: "`size` (`sm`, `md`, `lg`) scales padding, text, and the minimum height and is read from Context by every part. `resize` controls only the drag handle (`vertical` by default, or `none`, `horizontal`, `both`). Both are set on `TextareaRoot`." },
          ]}
        />
      </DocSection>

    </>
  )
}
