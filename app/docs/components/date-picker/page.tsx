import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  DatePickerHeroDemo,
  CalendarSingleDemo,
  CalendarRangeDemo,
  DatePickerSizesDemo,
  DateRangePresetsDemo,
  CustomPresetsDemo,
  ConstraintsDemo,
  CompactDensityDemo,
  FieldDemo,
  ReportRangeDemo,
} from "./demos"

export const metadata = {
  title: "Date Picker",
}

export default function DatePickerDocsPage() {
  return (
    <>
      <DocHeader
        title="Date Picker"
        description="A calendar surface plus two ready pickers — single date and date range — built over Radix Popover with a hand-rolled grid (native Date math, no date dependency). Selection reads the brand accent; the in-range fill is the neutral accent surface so the two never compete. Ships with rich quick-pick presets."
      />

      <ComponentPreview previewClassName="min-h-72 items-start" code={`const [date, setDate] = React.useState<Date>()

<DatePicker value={date} onChange={setDate} presets clearable />`}>
        <DatePickerHeroDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="date-picker" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { DatePicker } from "@/components/ui/date-picker"

export function Example() {
  const [date, setDate] = React.useState<Date>()
  return <DatePicker value={date} onChange={setDate} />
}`}
        />
      </DocSection>

      <DocSection title="Calendar">
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">Calendar</code> is the standalone grid the
          pickers wrap. Use it directly when you need an always-open calendar. The caption
          cycles day → month → year views; arrow keys move the focused day, PageUp/PageDown
          move a month, Home/End jump to the week edges.
        </p>
        <ComponentPreview
          previewClassName="min-h-80"
          code={`const [date, setDate] = React.useState<Date>(new Date())

<Calendar mode="single" selected={date} onSelect={setDate} />`}
        >
          <CalendarSingleDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Range selection">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">mode=&quot;range&quot;</code> to select a{" "}
          <code className="font-mono text-sm">{`{ from, to }`}</code> span. The first click sets
          the start, the second closes the range; hovering previews the span. Show multiple
          months with <code className="font-mono text-sm">numberOfMonths</code>.
        </p>
        <ComponentPreview
          previewClassName="min-h-80"
          code={`const [range, setRange] = React.useState<DateRange>()

<Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />`}
        >
          <CalendarRangeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Presets">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">presets</code> to render a quick-pick rail.
          Use <code className="font-mono text-sm">presets</code> (boolean) for the built-in set,
          or pass your own array. The single-date set ships{" "}
          <code className="font-mono text-sm">getDatePresets()</code>; the range set ships{" "}
          <code className="font-mono text-sm">getDateRangePresets()</code> with eleven common
          spans (Today, Last 7 days, This month, Last year, …).
        </p>
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`<DateRangePicker presets clearable />`}
        >
          <DateRangePresetsDemo />
        </ComponentPreview>
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`const presets = getDatePresets().slice(0, 3)

<DatePicker presets={presets} />`}
        >
          <CustomPresetsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Range with presets">
        <p className="mt-4 text-pretty text-muted-foreground">
          The combination most analytics surfaces want: a two-month range picker with the full
          preset rail.
        </p>
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`const presets = getDateRangePresets()

<DateRangePicker presets={presets} numberOfMonths={2} />`}
        >
          <ReportRangeDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`<DatePicker size="sm" />
<DatePicker size="md" />
<DatePicker size="lg" />`}
        >
          <DatePickerSizesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Constraints">
        <p className="mt-4 text-pretty text-muted-foreground">
          Bound the range with <code className="font-mono text-sm">min</code> /{" "}
          <code className="font-mono text-sm">max</code>, or disable arbitrary days with{" "}
          <code className="font-mono text-sm">isDateDisabled</code>. Disabled days are inert and
          struck through.
        </p>
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`<DatePicker
  min={today}
  max={endOfNextMonth}
  isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
/>`}
        >
          <ConstraintsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Like the rest of Koala, the calendar honors{" "}
          <code className="font-mono text-sm">density</code> — <code className="font-mono text-sm">compact</code>{" "}
          tightens cells and controls for dense application UI.
        </p>
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`<DatePicker density="compact" presets />`}
        >
          <CompactDensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Inside a Field">
        <p className="mt-4 text-pretty text-muted-foreground">
          Drop a picker inside a <code className="font-mono text-sm">Field</code> and it
          auto-wires the label, hint, <code className="font-mono text-sm">id</code>, and
          error/disabled state — no manual props.
        </p>
        <ComponentPreview
          previewClassName="min-h-72 items-start"
          code={`<Field>
  <FieldLabel>Start date</FieldLabel>
  <DatePicker block placeholder="Select a start date" />
  <FieldHint>Your subscription begins on this date.</FieldHint>
</Field>`}
        >
          <FieldDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three exports compose the surface — pick the altitude you need:
        </p>
        <div className="mt-4 space-y-4 text-pretty text-muted-foreground">
          <div>
            <code className="font-mono text-sm">DatePicker</code> — single date. Props:{" "}
            <code className="font-mono text-sm">value</code> /{" "}
            <code className="font-mono text-sm">defaultValue</code> /{" "}
            <code className="font-mono text-sm">onChange</code>,{" "}
            <code className="font-mono text-sm">placeholder</code>,{" "}
            <code className="font-mono text-sm">size</code> (sm · md · lg),{" "}
            <code className="font-mono text-sm">block</code>,{" "}
            <code className="font-mono text-sm">disabled</code>,{" "}
            <code className="font-mono text-sm">hasError</code>,{" "}
            <code className="font-mono text-sm">clearable</code>,{" "}
            <code className="font-mono text-sm">presets</code>,{" "}
            <code className="font-mono text-sm">format</code>,{" "}
            <code className="font-mono text-sm">min</code> /{" "}
            <code className="font-mono text-sm">max</code>,{" "}
            <code className="font-mono text-sm">isDateDisabled</code>,{" "}
            <code className="font-mono text-sm">weekStartsOn</code>,{" "}
            <code className="font-mono text-sm">locale</code>,{" "}
            <code className="font-mono text-sm">numberOfMonths</code>,{" "}
            <code className="font-mono text-sm">density</code>,{" "}
            <code className="font-mono text-sm">align</code>.
          </div>
          <div>
            <code className="font-mono text-sm">DateRangePicker</code> — same surface for a{" "}
            <code className="font-mono text-sm">{`{ from, to }`}</code> range (defaults to{" "}
            <code className="font-mono text-sm">numberOfMonths={`{2}`}</code> and the range
            preset set).
          </div>
          <div>
            <code className="font-mono text-sm">Calendar</code> — the standalone grid:{" "}
            <code className="font-mono text-sm">mode</code> (single · range),{" "}
            <code className="font-mono text-sm">selected</code> /{" "}
            <code className="font-mono text-sm">onSelect</code>,{" "}
            <code className="font-mono text-sm">month</code> /{" "}
            <code className="font-mono text-sm">onMonthChange</code>, plus the shared{" "}
            <code className="font-mono text-sm">min</code> /{" "}
            <code className="font-mono text-sm">max</code> /{" "}
            <code className="font-mono text-sm">isDateDisabled</code> /{" "}
            <code className="font-mono text-sm">weekStartsOn</code> /{" "}
            <code className="font-mono text-sm">numberOfMonths</code> /{" "}
            <code className="font-mono text-sm">density</code> props.
          </div>
          <div>
            Helpers <code className="font-mono text-sm">getDatePresets()</code> and{" "}
            <code className="font-mono text-sm">getDateRangePresets()</code> return ready-made
            preset arrays you can slice or extend.
          </div>
        </div>
      </DocSection>
    </>
  )
}
