"use client"

import * as React from "react"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"

import { createContext } from "@/lib/create-context"
import { tv, type VariantProps } from "@/lib/tv"

/**
 * RadioGroup — a Radix RadioGroup styled with Koala tokens. Multi-part (the group root and its
 * items), so the recipe lives in two slots and the shared `size` flows from `RadioGroup` to each
 * `RadioGroupItem` through a typed Context — never prop-drilled. Use it for a single choice from a
 * small, visible set; reach for a Select once the options grow long enough to want a dropdown.
 *
 * Sizes mirror Checkbox exactly (sm = 16px, md = 20px) so a radio and a checkbox line up pixel-for-
 * pixel in the same form. Unlike Checkbox, a radio keeps its ring when checked and fills only a
 * centered dot — the canonical "one of many" affordance.
 *
 * `"use client"` because Radix RadioGroup is interactive (roving focus + state). Each item renders
 * only the control; pair it with a `<label htmlFor>` for an accessible name and a larger hit target.
 */
export const radioGroupVariants = tv({
  slots: {
    root: "grid gap-2.5",
    item: [
      "peer relative inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-input bg-background shadow-xs",
      // Specific transition (never `transition: all`, #14); tactile press scale (#12).
      "transition-colors duration-fast ease-out active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // Checked keeps the ring but recolors it to the primary; the dot below carries the fill.
      "data-[state=checked]:border-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    indicator: "flex items-center justify-center",
    // The dot zooms in from the center the moment the item mounts as checked (#15 — staged enter).
    dot: "rounded-full bg-primary animate-in zoom-in-50 duration-fast ease-out",
  },
  variants: {
    size: {
      sm: { item: "size-4", dot: "size-1.5" },
      md: { item: "size-5", dot: "size-2" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

type RadioGroupSlots = ReturnType<typeof radioGroupVariants>
const [RadioGroupProvider, useRadioGroupContext] =
  createContext<{ slots: RadioGroupSlots }>("RadioGroup")

// ─── RadioGroup ─────────────────────────────────────────────────────────────────

export interface RadioGroupProps
  extends React.ComponentProps<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof radioGroupVariants> {}

export function RadioGroup({ className, size, ...props }: RadioGroupProps) {
  const slots = radioGroupVariants({ size })
  return (
    <RadioGroupProvider slots={slots}>
      <RadioGroupPrimitive.Root
        data-slot="radio-group"
        className={slots.root({ className })}
        {...props}
      />
    </RadioGroupProvider>
  )
}

// ─── RadioGroupItem ─────────────────────────────────────────────────────────────

export type RadioGroupItemProps = React.ComponentProps<typeof RadioGroupPrimitive.Item>

export function RadioGroupItem({ className, ...props }: RadioGroupItemProps) {
  const { slots } = useRadioGroupContext("RadioGroupItem")
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={slots.item({ className })}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className={slots.indicator()}>
        <span className={slots.dot()} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
