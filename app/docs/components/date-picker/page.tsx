import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
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
        description="A calendar surface plus two ready pickers (single date and date range) built over Radix Popover with a hand-rolled grid (native Date math, no date dependency). Selection reads the brand accent; the in-range fill is the neutral accent surface so the two never compete. Ships with rich quick-pick presets."
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
          <code className="font-mono text-sm">density</code>: <code className="font-mono text-sm">compact</code>{" "}
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
          error/disabled state, with no manual props.
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

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I reach for the standalone Calendar instead of DatePicker or DateRangePicker?",
              a: "Use Calendar when you need an always-open grid inline on the page, such as a booking surface or a sidebar. DatePicker and DateRangePicker wrap that same Calendar in a Radix Popover with a trigger, so prefer them whenever the calendar should open from a field-like button.",
            },
            {
              q: "How do I switch the range picker to a single-date picker, and how does selection differ?",
              a: "They are separate exports: DatePicker resolves a single Date, while DateRangePicker resolves a `{ from, to }` DateRange. On the underlying Calendar this maps to `mode=\"single\"` versus `mode=\"range\"`, where the first range click sets `from` and the second closes the span with a hover preview in between.",
            },
            {
              q: "What is the difference between passing `presets` as a boolean versus an array?",
              a: "Passing `presets` as `true` renders the built-in rail: getDatePresets() for DatePicker and getDateRangePresets() for DateRangePicker. Pass your own array of `{ label, value }` items (DatePreset or DateRangePreset) to fully control the shortcuts shown.",
            },
            {
              q: "How do I disable specific days like weekends or dates outside a window?",
              a: "Bound the selectable window with the `min` and `max` props (both inclusive), and pass `isDateDisabled` for arbitrary rules, for example `(d) => d.getDay() === 0 || d.getDay() === 6` to block weekends. Disabled days become inert and render struck through.",
            },
            {
              q: "What keyboard navigation does the calendar grid support?",
              a: "The grid uses a roving tabindex, so arrow keys move the focused day, PageUp and PageDown shift by a month, and Home and End jump to the week edges. Enter or Space commits the focused day, and the caption button cycles the day, month, and year views.",
            },
            {
              q: "Do I need to wire up the label and error state when using a picker inside a Field?",
              a: "No. Both pickers read useFieldContext, so dropping a DatePicker inside a Field auto-wires the `id`, `aria-describedby`, disabled, and error state from the surrounding Field. You can still override explicitly with the `disabled`, `hasError`, and `id` props when used standalone.",
            },
          ]}
        />
      </DocSection>

    </>
  )
}
