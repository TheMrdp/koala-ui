import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

import {
  SliderDemo,
  SizesDemo,
  VariantsDemo,
  RangeDemo,
  StepsDemo,
  VerticalDemo,
  SquareDemo,
  EqualizerDemo,
  DisabledDemo,
  ControlledDemo,
  SettingsRowDemo,
} from "./slider-examples-demo"

export const metadata = { title: "Slider" }

export default function SliderDocsPage() {
  return (
    <>
      <DocHeader
        title="Slider"
        description="Pick a value — or a range — by dragging along a track. Built on Radix Slider: thumbs auto-render from the value array (one for a single value, two for a range), with an optional live value bubble and full keyboard support."
      />

      <ComponentPreview code={HERO_CODE}>
        <SliderDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="slider" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Slider } from "@/components/ui/slider"

export function Example() {
  return <Slider defaultValue={[60]} aria-label="Volume" />
}`}
        />
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three sizes scale the track thickness and thumb diameter together —{" "}
          <code className="font-mono text-sm">sm</code>,{" "}
          <code className="font-mono text-sm">md</code> (default), and{" "}
          <code className="font-mono text-sm">lg</code>.
        </p>
        <ComponentPreview code={SIZES_CODE}>
          <SizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">variant</code> tints the range, thumb border,
          and tooltip as one. <code className="font-mono text-sm">default</code> uses the
          form-control primary; <code className="font-mono text-sm">brand</code> picks up the
          active accent; and the status fills carry domain meaning.
        </p>
        <ComponentPreview code={VARIANTS_CODE}>
          <VariantsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Range">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass two values and you get a two-thumb range — no extra component. Each thumb drags
          independently and carries its own value bubble.
        </p>
        <ComponentPreview code={RANGE_CODE}>
          <RangeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Steps">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">step</code> snaps the thumb to discrete stops.
          Pair it with <code className="font-mono text-sm">min</code>/
          <code className="font-mono text-sm">max</code> and your own labels for a scaled
          control.
        </p>
        <ComponentPreview code={STEPS_CODE}>
          <StepsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Vertical">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">orientation=&quot;vertical&quot;</code> and
          give the root a height — the same recipe styles both axes via{" "}
          <code className="font-mono text-sm">data-orientation</code>.
        </p>
        <ComponentPreview code={VERTICAL_CODE}>
          <VerticalDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Square">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">shape=&quot;square&quot;</code> squares the rail and
          gives the thumb a fader-cap profile — corners stay concentric with the rail.
        </p>
        <ComponentPreview code={SQUARE_CODE}>
          <SquareDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Equalizer">
        <p className="mt-4 text-pretty text-muted-foreground">
          Square + vertical turns the slider into a fader. A row of them reads as an
          equalizer — each is an independent control.
        </p>
        <ComponentPreview code={EQUALIZER_CODE}>
          <EqualizerDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Disabled">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">disabled</code> dims the whole control and stops
          all interaction.
        </p>
        <ComponentPreview code={DISABLED_CODE}>
          <DisabledDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Controlled">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drive the slider from state with{" "}
          <code className="font-mono text-sm">value</code> and{" "}
          <code className="font-mono text-sm">onValueChange</code> (both arrays), or leave it
          uncontrolled with <code className="font-mono text-sm">defaultValue</code>.
        </p>
        <ComponentPreview code={CONTROLLED_CODE}>
          <ControlledDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="In a settings card">
        <p className="mt-4 text-pretty text-muted-foreground">
          The common shell: a labelled row with the live value trailing, the slider beneath.
        </p>
        <ComponentPreview previewClassName="block" code={SETTINGS_CODE}>
          <SettingsRowDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Slider</code> forwards every{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/components/slider"
            className="underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Radix Slider
          </a>{" "}
          prop — <code className="font-mono text-sm">value</code>,{" "}
          <code className="font-mono text-sm">defaultValue</code>,{" "}
          <code className="font-mono text-sm">onValueChange</code>,{" "}
          <code className="font-mono text-sm">min</code>,{" "}
          <code className="font-mono text-sm">max</code>,{" "}
          <code className="font-mono text-sm">step</code>,{" "}
          <code className="font-mono text-sm">orientation</code>,{" "}
          <code className="font-mono text-sm">disabled</code>,{" "}
          <code className="font-mono text-sm">name</code> — plus Koala additions:{" "}
          <code className="font-mono text-sm">size</code> (
          <code className="font-mono text-sm">sm | md | lg</code>),{" "}
          <code className="font-mono text-sm">variant</code> (
          <code className="font-mono text-sm">default | brand | success | warning | destructive</code>),{" "}
          <code className="font-mono text-sm">shape</code> (
          <code className="font-mono text-sm">round | square</code>),{" "}
          <code className="font-mono text-sm">tooltip</code> to show a live value bubble,{" "}
          <code className="font-mono text-sm">formatValue</code> to format it,{" "}
          <code className="font-mono text-sm">static</code> to disable the press scale, and{" "}
          <code className="font-mono text-sm">className</code>, merged last.
        </p>
      </DocSection>
    </>
  )
}

const HERO_CODE = `<Slider
  defaultValue={[60]}
  variant="brand"
  tooltip
  formatValue={(v) => \`\${v}%\`}
  aria-label="Brightness"
/>`

const SIZES_CODE = `<Slider size="sm" defaultValue={[50]} />
<Slider size="md" defaultValue={[50]} />
<Slider size="lg" defaultValue={[50]} />`

const VARIANTS_CODE = `<Slider variant="default" defaultValue={[55]} />
<Slider variant="brand" defaultValue={[55]} />
<Slider variant="success" defaultValue={[55]} />
<Slider variant="warning" defaultValue={[55]} />
<Slider variant="destructive" defaultValue={[55]} />`

const RANGE_CODE = `<Slider
  defaultValue={[25, 75]}
  variant="brand"
  tooltip
  formatValue={(v) => \`$\${v}\`}
  aria-label="Price range"
/>`

const STEPS_CODE = `<Slider defaultValue={[3]} min={0} max={5} step={1} tooltip aria-label="Rating" />`

const VERTICAL_CODE = `<Slider
  orientation="vertical"
  defaultValue={[70]}
  variant="brand"
  className="h-40"
/>`

const SQUARE_CODE = `<Slider shape="square" defaultValue={[60]} />
<Slider shape="square" size="lg" variant="brand" defaultValue={[40]} />`

const EQUALIZER_CODE = `const bands = ["60", "150", "400", "1k", "2.4k", "6k", "15k"]

<div className="flex items-end gap-5">
  {bands.map((label) => (
    <div key={label} className="flex flex-col items-center gap-3">
      <Slider
        orientation="vertical"
        shape="square"
        variant="brand"
        defaultValue={[50]}
        className="h-40"
        aria-label={\`\${label} Hz\`}
      />
      <span className="text-xs tabular-nums text-muted-foreground">{label}</span>
    </div>
  ))}
</div>`

const DISABLED_CODE = `<Slider defaultValue={[40]} disabled />`

const CONTROLLED_CODE = `const [value, setValue] = useState([35])

<Slider value={value} onValueChange={setValue} aria-label="Volume" />`

const SETTINGS_CODE = `const [value, setValue] = useState([72])

<div className="rounded-xl border border-border p-4">
  <div className="mb-3 flex items-center justify-between">
    <span className="flex items-center gap-2 text-sm font-medium">
      <Sun className="size-4 text-muted-foreground" />
      Brightness
    </span>
    <span className="text-sm tabular-nums text-muted-foreground">{value[0]}%</span>
  </div>
  <Slider value={value} onValueChange={setValue} variant="brand" />
</div>`
