"use client"

import * as React from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

/** Hero — a single choice from a small, visible set, each item paired with a label. */
const PLANS = ["Starter", "Pro", "Enterprise"] as const

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="Pro" className="w-56">
      {PLANS.map((plan) => (
        <label
          key={plan}
          htmlFor={plan}
          className="flex cursor-pointer items-center gap-2.5 text-sm font-medium"
        >
          <RadioGroupItem id={plan} value={plan} />
          {plan}
        </label>
      ))}
    </RadioGroup>
  )
}

/** Two sizes — sm (matches a dense table's checkbox) and md (the default for forms). */
export function SizesDemo() {
  return (
    <div className="flex items-start gap-12">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <RadioGroup size={size} defaultValue="b">
            <RadioGroupItem value="a" aria-label={`${size} a`} />
            <RadioGroupItem value="b" aria-label={`${size} b`} />
          </RadioGroup>
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  )
}

/** States — a disabled item is skipped by keyboard navigation; the whole group can be disabled. */
export function StatesDemo() {
  return (
    <div className="flex items-start gap-12">
      <RadioGroup defaultValue="on" className="w-40">
        <label htmlFor="s-on" className="flex cursor-pointer items-center gap-2.5 text-sm">
          <RadioGroupItem id="s-on" value="on" />
          Enabled
        </label>
        <label
          htmlFor="s-off"
          className="flex cursor-not-allowed items-center gap-2.5 text-sm text-muted-foreground"
        >
          <RadioGroupItem id="s-off" value="off" disabled />
          Disabled item
        </label>
      </RadioGroup>

      <RadioGroup defaultValue="x" disabled className="w-40">
        <label htmlFor="g-x" className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <RadioGroupItem id="g-x" value="x" />
          Group disabled
        </label>
        <label htmlFor="g-y" className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <RadioGroupItem id="g-y" value="y" />
          Also disabled
        </label>
      </RadioGroup>
    </div>
  )
}

/** Each option carries supporting text — the dot optically aligns to the first line of the label. */
const SHIPPING = [
  { value: "standard", title: "Standard", hint: "4–6 business days. Free." },
  { value: "express", title: "Express", hint: "2–3 business days. $9." },
  { value: "overnight", title: "Overnight", hint: "Next business day. $24." },
] as const

export function WithDescriptionDemo() {
  return (
    <RadioGroup defaultValue="express" className="w-72">
      {SHIPPING.map(({ value, title, hint }) => (
        <label
          key={value}
          htmlFor={`ship-${value}`}
          className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3.5 transition-colors duration-fast ease-out has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent"
        >
          <RadioGroupItem id={`ship-${value}`} value={value} className="mt-0.5" />
          <span className="flex flex-col gap-0.5">
            <span className="text-sm font-medium leading-none">{title}</span>
            <span className="text-sm text-muted-foreground">{hint}</span>
          </span>
        </label>
      ))}
    </RadioGroup>
  )
}

/** A controlled group that reports the live selection. */
export function ControlledDemo() {
  const [value, setValue] = React.useState("comfortable")
  return (
    <div className="flex flex-col items-center gap-4">
      <RadioGroup value={value} onValueChange={setValue} className="grid-flow-col gap-5">
        {["comfortable", "compact"].map((option) => (
          <label
            key={option}
            htmlFor={`d-${option}`}
            className="flex cursor-pointer items-center gap-2.5 text-sm font-medium capitalize"
          >
            <RadioGroupItem id={`d-${option}`} value={option} />
            {option}
          </label>
        ))}
      </RadioGroup>
      <span className="text-xs text-muted-foreground">
        Density: <span className="font-medium text-foreground">{value}</span>
      </span>
    </div>
  )
}
