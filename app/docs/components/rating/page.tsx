import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  RatingDemo,
  SizesDemo,
  TonesDemo,
  VariantsDemo,
  ReadOnlyDemo,
  CustomDemo,
  DisabledDemo,
} from "./rating-examples-demo"

export const metadata = { title: "Rating" }

export default function RatingDocsPage() {
  return (
    <>
      <DocHeader
        title="Rating"
        description="A 1-to-N star rating built on Radix RadioGroup: roving focus, arrow keys, and hover preview for free. Active stars render solid (Phosphor's fill weight) by default, the one place the DS opts out of its outline-only rule, because a filled star is the universal affordance. A colored glyph is clipped over an empty one, so a half star reads cleanly in a read-only average. The outline variant keeps the tinted-outline look."
      />

      <ComponentPreview code={HERO_CODE}>
        <RatingDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="rating" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Rating } from "@/components/ui/rating"

export function Example() {
  const [value, setValue] = useState(4)
  return <Rating value={value} onValueChange={setValue} aria-label="Rate your experience" />
}`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">sm</code> (16px),{" "}
          <code className="font-mono text-sm">md</code> (20px), and{" "}
          <code className="font-mono text-sm">lg</code> (28px) line up with the rest of the control
          scale.
        </p>
        <ComponentPreview code={SIZES_CODE}>
          <SizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Tones">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">tone</code> recolors the active glyph, independent of
          the icon: <code className="font-mono text-sm">amber</code> (default) is the vivid
          review-gold for stars, and <code className="font-mono text-sm">red</code> is the love-red
          that suits a <code className="font-mono text-sm">Heart</code>. Both ride dedicated rating
          tokens, brighter than the <code className="font-mono text-sm">warning</code> status hue.
        </p>
        <ComponentPreview code={TONES_CODE}>
          <TonesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">filled</code> (default) is the classic solid-star look:
          the active glyph renders at Phosphor&apos;s <code className="font-mono text-sm">fill</code>{" "}
          weight, the rest stay outline. <code className="font-mono text-sm">outline</code> keeps the
          DS rule, drawing the active star as a tinted outline instead.
        </p>
        <ComponentPreview code={VARIANTS_CODE}>
          <VariantsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Read-only & fractional">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">readOnly</code> renders a static display and accepts
          fractional values: an average like <code className="font-mono text-sm">4.3</code> shows a
          partly-filled star via the clip overlay.
        </p>
        <ComponentPreview code={READ_ONLY_CODE}>
          <ReadOnlyDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Custom icon & length">
        <p className="mt-4 text-pretty text-muted-foreground">
          Swap the star for any Phosphor icon with <code className="font-mono text-sm">icon</code>,
          and set the scale length with <code className="font-mono text-sm">max</code>. Recolor the
          fill with <code className="font-mono text-sm">tone</code>:{" "}
          <code className="font-mono text-sm">amber</code> (default review-gold) or{" "}
          <code className="font-mono text-sm">red</code>, which suits a heart. The icon follows the
          active variant: solid by default, outline with{" "}
          <code className="font-mono text-sm">{`variant="outline"`}</code>.
        </p>
        <ComponentPreview code={CUSTOM_CODE}>
          <CustomDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <ComponentPreview code={DISABLED_CODE}>
          <DisabledDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "How do I show a fractional average like 4.3 stars?", a: "Set `readOnly` and pass the fractional `value`. Read-only mode drops the RadioGroup for a static display and clips a colored glyph over an empty one, so a partly-filled star reads cleanly. Interactive ratings only commit whole numbers." },
            { q: "Why does Rating use a solid star when the DS is outline-only?", a: "The default `filled` variant renders the active glyph at Phosphor's `fill` weight, the one documented place the DS opts out of icons-always-outline, because a filled star is the universal affordance. Use `variant=\"outline\"` to keep the tinted-outline look." },
            { q: "What keyboard and accessibility behavior do I get for free?", a: "Interactive ratings ride on Radix RadioGroup, so you get roving focus, arrow-key increment and decrement, and a single selected value. Pass `aria-label` to name the group; it also builds each star's label like \"Rate 3 of 5\"." },
            { q: "How do I change the number of stars or the icon?", a: "Set `max` for the scale length (default 5) and pass any Phosphor icon to `icon` (for example Heart). Recolor the fill with `tone`: `amber` (default review-gold) or `red`, which suits a heart. The custom icon follows the active variant: solid by default, outline with `variant=\"outline\"`." },
            { q: "Is Rating controlled or uncontrolled, and can I submit it in a form?", a: "Both: use `defaultValue` for uncontrolled or `value` with `onValueChange` to control it. Pass a `name` and it maps to the underlying RadioGroup form field." },
            { q: "What are the available sizes?", a: "`sm` (16px), `md` (20px, default), and `lg` (28px), which line up with the rest of the control scale." },
          ]}
        />
      </DocSection>
    </>
  )
}

const HERO_CODE = `const [value, setValue] = useState(4)

<Rating value={value} onValueChange={setValue} size="lg" aria-label="Rate your experience" />`

const SIZES_CODE = `<Rating size="sm" defaultValue={3} />
<Rating size="md" defaultValue={3} />
<Rating size="lg" defaultValue={3} />`

const TONES_CODE = `import { Heart } from "@phosphor-icons/react"

<Rating tone="amber" defaultValue={4} size="lg" />
<Rating tone="red" icon={Heart} defaultValue={4} size="lg" />`

const VARIANTS_CODE = `<Rating variant="outline" defaultValue={4} size="lg" />
<Rating variant="filled" defaultValue={4} size="lg" />`

const READ_ONLY_CODE = `<Rating value={5} readOnly />
<Rating value={4.3} readOnly />
<Rating value={2.5} readOnly />`

const CUSTOM_CODE = `import { Heart } from "@phosphor-icons/react"

<Rating max={7} icon={Heart} tone="red" size="lg" defaultValue={3} aria-label="Rate with hearts" />`

const DISABLED_CODE = `<Rating defaultValue={3} disabled />`
