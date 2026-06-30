import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  RadioGroupDemo,
  SizesDemo,
  StatesDemo,
  WithDescriptionDemo,
  ControlledDemo,
} from "./radio-group-examples-demo"

export const metadata = { title: "Radio Group" }

export default function RadioGroupDocsPage() {
  return (
    <>
      <DocHeader
        title="Radio Group"
        description="A set of mutually exclusive options where exactly one can be selected, built on Radix RadioGroup. Sizes line up pixel-for-pixel with Checkbox, so radios and checkboxes sit flush in the same form."
      />

      <ComponentPreview previewClassName="block" code={HERO_CODE}>
        <RadioGroupDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="radio-group" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function Example() {
  return (
    <RadioGroup defaultValue="pro">
      <label htmlFor="pro" className="flex items-center gap-2.5">
        <RadioGroupItem id="pro" value="pro" />
        Pro
      </label>
    </RadioGroup>
  )
}`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">sm</code> (16px) matches the dense table checkbox;{" "}
          <code className="font-mono text-sm">md</code> (20px) is the default for forms. Set{" "}
          <code className="font-mono text-sm">size</code> on the group and every item inherits it
          through context.
        </p>
        <ComponentPreview code={SIZES_CODE}>
          <SizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="States">
        <p className="mt-4 text-pretty text-muted-foreground">
          Disable a single <code className="font-mono text-sm">RadioGroupItem</code> and roving
          focus skips it, or disable the whole <code className="font-mono text-sm">RadioGroup</code>{" "}
          at once.
        </p>
        <ComponentPreview code={STATES_CODE}>
          <StatesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With descriptions">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap each item in a bordered label and let the whole card become the hit target. The{" "}
          <code className="font-mono text-sm">has-[[data-state=checked]]</code> selector lights the
          selected card up without any JavaScript.
        </p>
        <ComponentPreview previewClassName="block" code={WITH_DESCRIPTION_CODE}>
          <WithDescriptionDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Controlled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">value</code> and{" "}
          <code className="font-mono text-sm">onValueChange</code> to own the selection. The group
          lays out horizontally here with a <code className="font-mono text-sm">grid-flow-col</code>{" "}
          override on <code className="font-mono text-sm">className</code>.
        </p>
        <ComponentPreview code={CONTROLLED_CODE}>
          <ControlledDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "When should I use a RadioGroup instead of a Select?", a: "Use RadioGroup for a single choice from a small, visible set so every option is in view. Reach for a Select once the options grow long enough to want a dropdown." },
            { q: "How do I set the size, and why does it match Checkbox?", a: "Set `size` on the RadioGroup (`sm` is 16px, `md` is 20px) and each RadioGroupItem inherits it through context. The sizes mirror Checkbox exactly so radios and checkboxes line up pixel-for-pixel in the same form." },
            { q: "RadioGroupItem renders only a circle. How do I give it a label and a bigger hit target?", a: "Pair each item with a `<label htmlFor>` matching the item's `id`. The label supplies the accessible name and extends the clickable area, since the item itself renders only the control." },
            { q: "How do the keyboard and disabled states behave?", a: "It is built on Radix RadioGroup, so arrow keys move roving focus and select. Disable a single RadioGroupItem and roving focus skips it, or set `disabled` on the whole RadioGroup at once." },
            { q: "How do I make the whole option card highlight when selected, without JavaScript?", a: "Wrap each item in a bordered label and use the `has-[[data-state=checked]]` selector to restyle the card. The checked item exposes `data-state=checked`, so CSS lights the selected card up on its own." },
            { q: "Is RadioGroup controlled or uncontrolled?", a: "Both. Use `defaultValue` to let it manage its own selection, or pass `value` with `onValueChange` to own the state. These props forward straight to Radix." },
          ]}
        />
      </DocSection>

    </>
  )
}

const HERO_CODE = `<RadioGroup defaultValue="Pro" className="w-56">
  {["Starter", "Pro", "Enterprise"].map((plan) => (
    <label key={plan} htmlFor={plan} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
      <RadioGroupItem id={plan} value={plan} />
      {plan}
    </label>
  ))}
</RadioGroup>`

const SIZES_CODE = `<RadioGroup size="sm" defaultValue="b">
  <RadioGroupItem value="a" />
  <RadioGroupItem value="b" />
</RadioGroup>

<RadioGroup size="md" defaultValue="b">
  <RadioGroupItem value="a" />
  <RadioGroupItem value="b" />
</RadioGroup>`

const STATES_CODE = `<RadioGroup defaultValue="on">
  <RadioGroupItem value="on" />
  <RadioGroupItem value="off" disabled />
</RadioGroup>

<RadioGroup defaultValue="x" disabled>
  <RadioGroupItem value="x" />
  <RadioGroupItem value="y" />
</RadioGroup>`

const WITH_DESCRIPTION_CODE = `const SHIPPING = [
  { value: "standard", title: "Standard", hint: "4–6 business days. Free." },
  { value: "express", title: "Express", hint: "2–3 business days. $9." },
]

<RadioGroup defaultValue="express" className="w-72">
  {SHIPPING.map(({ value, title, hint }) => (
    <label
      key={value}
      htmlFor={\`ship-\${value}\`}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3.5 transition-colors duration-fast ease-out has-[[data-state=checked]]:border-brand has-[[data-state=checked]]:bg-accent"
    >
      <RadioGroupItem id={\`ship-\${value}\`} value={value} className="mt-0.5" />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-medium leading-none">{title}</span>
        <span className="text-sm text-muted-foreground">{hint}</span>
      </span>
    </label>
  ))}
</RadioGroup>`

const CONTROLLED_CODE = `const [value, setValue] = useState("comfortable")

<RadioGroup value={value} onValueChange={setValue} className="grid-flow-col gap-5">
  {["comfortable", "compact"].map((option) => (
    <label key={option} htmlFor={\`d-\${option}\`} className="flex cursor-pointer items-center gap-2.5 text-sm font-medium capitalize">
      <RadioGroupItem id={\`d-\${option}\`} value={option} />
      {option}
    </label>
  ))}
</RadioGroup>`
