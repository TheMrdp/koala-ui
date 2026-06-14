"use client"

import * as React from "react"

import {
  Calendar,
  DatePicker,
  DateRangePicker,
  getDatePresets,
  getDateRangePresets,
  type DateRange,
} from "@/components/ui/date-picker"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"

// Hero — a single date picker with the built-in preset rail.
export function DatePickerHeroDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return <DatePicker value={date} onChange={setDate} presets clearable />
}

// Standalone calendar, single date.
export function CalendarSingleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-xs">
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </div>
  )
}

// Standalone calendar, range over two months.
export function CalendarRangeDemo() {
  const today = new Date()
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: today,
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
  })
  return (
    <div className="rounded-xl border border-border bg-card p-3 shadow-xs">
      <Calendar mode="range" selected={range} onSelect={setRange} numberOfMonths={2} />
    </div>
  )
}

// Trigger sizes.
export function DatePickerSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <DatePicker size="sm" placeholder="Small" />
      <DatePicker size="md" placeholder="Medium" />
      <DatePicker size="lg" placeholder="Large" />
    </div>
  )
}

// Range picker with the built-in range presets.
export function DateRangePresetsDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  return <DateRangePicker value={range} onChange={setRange} presets clearable />
}

// Custom presets passed explicitly.
export function CustomPresetsDemo() {
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const presets = React.useMemo(() => getDatePresets().slice(0, 3), [])
  return <DatePicker value={date} onChange={setDate} presets={presets} />
}

// Min / max + disabled weekends.
export function ConstraintsDemo() {
  const today = new Date()
  const min = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const max = new Date(today.getFullYear(), today.getMonth() + 2, 0)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  return (
    <DatePicker
      value={date}
      onChange={setDate}
      min={min}
      max={max}
      isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6}
      placeholder="Weekdays only"
    />
  )
}

// Compact density.
export function CompactDensityDemo() {
  return <DatePicker density="compact" presets placeholder="Compact" />
}

// Inside a Field (auto-wired id / label / hint).
export function FieldDemo() {
  return (
    <Field className="w-72">
      <FieldLabel>Start date</FieldLabel>
      <DatePicker block placeholder="Select a start date" />
      <FieldHint>Your subscription begins on this date.</FieldHint>
    </Field>
  )
}

// Range picker exposing the explicit range-preset builder.
export function ReportRangeDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>(undefined)
  const presets = React.useMemo(() => getDateRangePresets(), [])
  return <DateRangePicker value={range} onChange={setRange} presets={presets} numberOfMonths={2} />
}
