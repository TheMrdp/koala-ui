import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

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

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">RadioGroup</code> forwards every{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/components/radio-group"
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Radix RadioGroup
          </a>{" "}
          root prop — <code className="font-mono text-sm">value</code>,{" "}
          <code className="font-mono text-sm">defaultValue</code>,{" "}
          <code className="font-mono text-sm">onValueChange</code>,{" "}
          <code className="font-mono text-sm">disabled</code>,{" "}
          <code className="font-mono text-sm">name</code>,{" "}
          <code className="font-mono text-sm">orientation</code>,{" "}
          <code className="font-mono text-sm">loop</code> — plus a shared{" "}
          <code className="font-mono text-sm">size</code> variant (
          <code className="font-mono text-sm">&quot;sm&quot; | &quot;md&quot;</code>, default{" "}
          <code className="font-mono text-sm">md</code>).{" "}
          <code className="font-mono text-sm">RadioGroupItem</code> forwards the Radix Item props (
          <code className="font-mono text-sm">value</code>,{" "}
          <code className="font-mono text-sm">disabled</code>) and reads the group&apos;s size from
          context. Both parts merge <code className="font-mono text-sm">className</code> last.
        </p>
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
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3.5 transition-colors duration-fast ease-out has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
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
