"use client"

import * as React from "react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { tv, type VariantProps } from "@/lib/tv"

/**
 * Checkbox — a Radix Checkbox styled with Koala tokens. Single-part, so one `tv` recipe with
 * `slots` (the box and its indicator icon scale together). Supports the tri-state
 * `"indeterminate"` value a "select all" needs, shown as a minus rather than a check.
 *
 * `"use client"` because Radix Checkbox is interactive (state + context). Pair it with a
 * `<label htmlFor>` for an accessible name and a larger hit target — see the docs.
 */
export const checkboxVariants = tv({
  slots: {
    root: [
      "peer inline-flex shrink-0 cursor-pointer items-center justify-center border border-input bg-background shadow-xs",
      // Specific transition (never `transition: all`, #14); tactile press scale (#12).
      "transition-colors duration-fast ease-out active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // Checked and indeterminate both fill with the primary; the indicator inherits the fg.
      "data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      "data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    indicator: "flex items-center justify-center text-current",
    icon: "",
  },
  variants: {
    // The corner radius scales with the box so both sizes read with the same roundness. `md`
    // (20px) uses the `rounded-sm` token; `sm` (16px) is 0.8× that — exactly its box ratio
    // (16/20) — so it stays proportional instead of looking over-rounded at the smaller size.
    size: {
      sm: { root: "size-4 rounded-[calc(var(--radius-sm)*0.8)]", icon: "size-3" },
      md: { root: "size-5 rounded-sm", icon: "size-3.5" },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

export interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

export function Checkbox({ className, size, checked, ...props }: CheckboxProps) {
  const { root, indicator, icon } = checkboxVariants({ size })
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      className={root({ className })}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className={indicator()}>
        {/*
         * Inline stroked glyph (not Phosphor's filled Check) so the symbol can *draw* itself:
         * `pathLength={1}` normalizes the path to length 1, so the dash math is a clean 1→0
         * regardless of the geometry. The `animate-check-draw` keyframe sweeps the dash offset.
         */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={icon()}
          aria-hidden
        >
          <path
            d={checked === "indeterminate" ? "M5 12h14" : "M5 12.5l4.5 4.5L19 7.5"}
            pathLength={1}
            className="animate-check-draw [stroke-dasharray:1]"
          />
        </svg>
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}
