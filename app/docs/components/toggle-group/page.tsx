import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  ToggleGroupDemo,
  SingleVsMultipleDemo,
  SizesDemo,
  FeedbackCardDemo,
  FeedbackPopoverDemo,
  FeedbackInlineDemo,
} from "./toggle-group-examples-demo"

export const metadata = { title: "Toggle Group" }

export default function ToggleGroupDocsPage() {
  return (
    <>
      <DocHeader
        title="Toggle Group"
        description="A set of pressable pills that hold a selection, built on Radix ToggleGroup. Use type=single for a one-of-N choice (a rating, a view switch) or type=multiple for independent on/off toggles. A chosen pill carries the brand outline, and the control is its own label, so no paired inputs are needed."
      />

      <ComponentPreview code={HERO_CODE}>
        <ToggleGroupDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="toggle-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export function Example() {
  return (
    <ToggleGroup type="single" defaultValue="yes">
      <ToggleGroupItem value="yes">Yes</ToggleGroupItem>
      <ToggleGroupItem value="no">No</ToggleGroupItem>
    </ToggleGroup>
  )
}`}
        />
      </DocSection>

      <DocSection title="Single vs. multiple">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">{`type="single"`}</code> is a mutually exclusive
          choice: selecting one pill clears the rest.{" "}
          <code className="font-mono text-sm">{`type="multiple"`}</code> lets each pill toggle on and
          off independently, like a formatting band.
        </p>
        <ComponentPreview code={SINGLE_VS_MULTIPLE_CODE}>
          <SingleVsMultipleDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">sm</code> (32px) is the compact rating pill;{" "}
          <code className="font-mono text-sm">md</code> (40px) is the default. Set{" "}
          <code className="font-mono text-sm">size</code> on the group and every item inherits it
          through context.
        </p>
        <ComponentPreview code={SIZES_CODE}>
          <SizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Feedback card">
        <p className="mt-4 text-pretty text-muted-foreground">
          The classic {`"Was this useful?"`} prompt: a title, a question, and a Yes/No band on a
          card. Rendered open so it reads at a glance, with the group controlled so the selection is
          yours to send.
        </p>
        <ComponentPreview code={FEEDBACK_CARD_CODE}>
          <FeedbackCardDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Inline feedback">
        <p className="mt-4 text-pretty text-muted-foreground">
          The compact variant: just the question and a Yes/No band, no subtitle. Answering swaps the
          prompt for a thank-you, so the widget always feels resolved.
        </p>
        <ComponentPreview code={FEEDBACK_INLINE_CODE}>
          <FeedbackInlineDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Inside a popover">
        <p className="mt-4 text-pretty text-muted-foreground">
          The same content floated: drop the card into a{" "}
          <code className="font-mono text-sm">Popover</code> when the prompt should appear on demand
          rather than sit in the page.
        </p>
        <ComponentPreview code={FEEDBACK_CODE}>
          <FeedbackPopoverDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "When should I use ToggleGroup instead of RadioGroup or Switch?", a: "Use ToggleGroup when one or several options from a small, visible set should look chosen, like a rating or a view switch. Unlike RadioGroup the control is its own label, so no paired inputs are needed, and unlike Switch it can hold a one-of-N choice with `type=\"single\"`." },
            { q: "What is the difference between type=single and type=multiple?", a: "`type=\"single\"` is a mutually exclusive choice: selecting one `ToggleGroupItem` clears the rest. `type=\"multiple\"` lets each pill toggle on and off independently, like a bold/italic/underline formatting band." },
            { q: "How do I change the size of every pill at once?", a: "Set `size` on the `ToggleGroup` root and every `ToggleGroupItem` inherits it through context, so you never set it per item. `sm` is the 32px compact rating pill and `md` (40px) is the default." },
            { q: "Why does a selected pill have no fill, just an outline?", a: "A chosen pill draws a brand outline plus a soft brand halo (`data-[state=on]`) with the label and glyph in the foreground, matching Figma. The fill is left off deliberately so the pill blends with whatever surface it sits on rather than painting a block that fights nested surfaces." },
            { q: "Why does my pill look like a solid block on a colored card?", a: "The item background reads `var(--surface)`, so a colored container must declare `--surface` to blend in. The doc demos set `[--surface:var(--card)]` on the card root; without it the pill falls back to the page `--background`." },
            { q: "How do I label icon-only pills for screen readers?", a: "Give each icon-only `ToggleGroupItem` its own `aria-label`, and put an `aria-label` on the `ToggleGroup` for the group as a whole. Radix ToggleGroup handles roving focus and the pressed state, so keyboard users can arrow through and toggle with Space or Enter." },
          ]}
        />
      </DocSection>
    </>
  )
}

const HERO_CODE = `<ToggleGroup type="single" defaultValue="yes" aria-label="Was this useful?">
  <ToggleGroupItem value="yes">
    <ThumbsUp />
    Yes
  </ToggleGroupItem>
  <ToggleGroupItem value="no">
    <ThumbsDown />
    No
  </ToggleGroupItem>
</ToggleGroup>`

const SINGLE_VS_MULTIPLE_CODE = `<ToggleGroup type="single" defaultValue="grid" aria-label="View">
  <ToggleGroupItem value="list"><ListBullets />List</ToggleGroupItem>
  <ToggleGroupItem value="grid"><SquaresFour />Grid</ToggleGroupItem>
  <ToggleGroupItem value="board"><Kanban />Board</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="multiple" defaultValue={["bold"]} aria-label="Text style">
  <ToggleGroupItem value="bold" aria-label="Bold"><TextB /></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><TextItalic /></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><TextUnderline /></ToggleGroupItem>
</ToggleGroup>`

const SIZES_CODE = `<ToggleGroup type="single" size="sm" defaultValue="yes">
  <ToggleGroupItem value="yes"><ThumbsUp />Yes</ToggleGroupItem>
  <ToggleGroupItem value="no"><ThumbsDown />No</ToggleGroupItem>
</ToggleGroup>

<ToggleGroup type="single" size="md" defaultValue="yes">
  <ToggleGroupItem value="yes"><ThumbsUp />Yes</ToggleGroupItem>
  <ToggleGroupItem value="no"><ThumbsDown />No</ToggleGroupItem>
</ToggleGroup>`

const FEEDBACK_CODE = `const [rating, setRating] = useState("")

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Was this useful?</Button>
  </PopoverTrigger>
  <PopoverContent align="start" className="w-auto">
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <PopoverTitle className="text-base">Was this useful?</PopoverTitle>
        <PopoverDescription>How would you rate your overall experience?</PopoverDescription>
      </div>
      <ToggleGroup type="single" size="sm" value={rating} onValueChange={setRating}>
        <ToggleGroupItem value="yes"><ThumbsUp />Yes</ToggleGroupItem>
        <ToggleGroupItem value="no"><ThumbsDown />No</ToggleGroupItem>
      </ToggleGroup>
    </div>
  </PopoverContent>
</Popover>`

const FEEDBACK_CARD_CODE = `const [rating, setRating] = useState("yes")

<div className="w-72 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-sm [--surface:var(--card)]">
  <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-1">
      <p className="text-base font-semibold text-foreground">Was this useful?</p>
      <p className="text-sm text-muted-foreground">How would you rate your overall experience?</p>
    </div>
    <ToggleGroup type="single" size="sm" value={rating} onValueChange={setRating}>
      <ToggleGroupItem value="yes"><ThumbsUp />Yes</ToggleGroupItem>
      <ToggleGroupItem value="no"><ThumbsDown />No</ToggleGroupItem>
    </ToggleGroup>
  </div>
</div>`

const FEEDBACK_INLINE_CODE = `const [answer, setAnswer] = useState("")

<div className="w-64 rounded-xl border border-border bg-card p-4 text-card-foreground shadow-xs [--surface:var(--card)]">
  {answer ? (
    <p className="text-sm font-medium text-muted-foreground">Thanks for your feedback!</p>
  ) : (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold text-foreground">Was this useful?</p>
      <ToggleGroup type="single" size="sm" value={answer} onValueChange={setAnswer}>
        <ToggleGroupItem value="yes"><ThumbsUp />Yes</ToggleGroupItem>
        <ToggleGroupItem value="no"><ThumbsDown />No</ToggleGroupItem>
      </ToggleGroup>
    </div>
  )}
</div>`
