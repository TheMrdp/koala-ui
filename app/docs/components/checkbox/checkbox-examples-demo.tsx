"use client"

import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"

/** Hero: a checkbox paired with a label (the label is the larger hit target). */
export function CheckboxDemo() {
  return (
    <label htmlFor="terms" className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
      <Checkbox id="terms" defaultChecked />
      Accept terms and conditions
    </label>
  )
}

/** Every state: unchecked, checked, indeterminate, and the two disabled variants. */
export function StatesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      {[
        { label: "Unchecked", props: { checked: false } },
        { label: "Checked", props: { checked: true } },
        { label: "Indeterminate", props: { checked: "indeterminate" as const } },
        { label: "Disabled", props: { disabled: true } },
        { label: "Disabled checked", props: { disabled: true, checked: true } },
      ].map(({ label, props }) => (
        <div key={label} className="flex flex-col items-center gap-2">
          <Checkbox aria-label={label} {...props} />
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

/** Two sizes: sm (used inside dense tables) and md (the default). */
export function SizesDemo() {
  return (
    <div className="flex items-center gap-8">
      {(["sm", "md"] as const).map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Checkbox size={size} defaultChecked aria-label={size} />
          <span className="text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  )
}

/** A label with supporting text: the box optically aligns to the first line. */
export function WithLabelDemo() {
  return (
    <div className="flex items-start gap-3">
      <Checkbox id="notify" defaultChecked className="mt-0.5" />
      <label htmlFor="notify" className="flex cursor-pointer flex-col gap-0.5">
        <span className="text-sm font-medium leading-none">Email notifications</span>
        <span className="text-sm text-muted-foreground">
          Get notified when someone mentions you or replies to a thread.
        </span>
      </label>
    </div>
  )
}

/** A parent "select all" that goes indeterminate on a partial selection: the same pattern the
 *  DataTable's header checkbox uses. */
const ITEMS = ["Engineering", "Design", "Marketing"] as const

export function GroupDemo() {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({ Design: true })
  const selected = ITEMS.filter((i) => checked[i])
  const allChecked = selected.length === ITEMS.length
  const someChecked = selected.length > 0 && !allChecked

  return (
    <div className="flex w-56 flex-col gap-3">
      <label htmlFor="all" className="flex cursor-pointer items-center gap-2.5 text-sm font-medium">
        <Checkbox
          id="all"
          checked={allChecked ? true : someChecked ? "indeterminate" : false}
          onCheckedChange={(value) =>
            setChecked(Object.fromEntries(ITEMS.map((i) => [i, !!value])))
          }
        />
        Select all teams
      </label>
      <div className="ml-1 flex flex-col gap-2.5 border-l border-border pl-4">
        {ITEMS.map((item) => (
          <label
            key={item}
            htmlFor={item}
            className="flex cursor-pointer items-center gap-2.5 text-sm"
          >
            <Checkbox
              id={item}
              checked={!!checked[item]}
              onCheckedChange={(value) =>
                setChecked((prev) => ({ ...prev, [item]: !!value }))
              }
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  )
}
