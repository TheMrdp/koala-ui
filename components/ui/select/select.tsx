"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "radix-ui"
import { CaretDown, Check } from "@phosphor-icons/react"

import { tv, type VariantProps } from "@/lib/tv"
import { cn } from "@/lib/utils"
import { useDensity } from "@/lib/density"
import { useFieldContext } from "@/lib/field-context"
import { Tooltip, type TooltipProps } from "@/components/ui/tooltip"

export const selectVariants = tv({
  slots: {
    trigger: [
      // `group` lets the chevron read data-state=open off the trigger.
      // rounded-md matches Button + Input: form controls share one control radius.
      "group flex w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input",
      // Opaque background that matches whatever surface the trigger sits on: reads `--surface`
      // if a container set one (e.g. Dialog → popover), else falls back to the page background:
      // same logic as Input, so the control blends in without ever looking "filled".
      "bg-[var(--surface,var(--background))] px-3 text-sm text-left text-foreground shadow-xs",
      "transition-[border-color,box-shadow] duration-fast ease-out",
      "hover:border-ring/50",
      "focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent",
      "active:scale-[0.99]",
      "disabled:cursor-not-allowed disabled:opacity-50",
      // Inside a Field with `hasError`, the trigger picks up aria-invalid and turns red.
      "aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive",
      "data-[placeholder]:text-muted-foreground",
      // The selected value mirrors the chosen item (leading icon + label). Lay it out as a
      // flex row so the icon stays aligned and correctly sized: a `line-clamp` here forces
      // `display: -webkit-box`, which distorts inline SVGs (e.g. a leading Sparkle rendered
      // doubled/oversized). `truncate` keeps long labels on one line; `min-w-0` lets them clip.
      "[&>span]:flex [&>span]:min-w-0 [&>span]:items-center [&>span]:gap-2 [&>span]:truncate",
      // Any icon in the trigger (mirrored value icon) gets a 1rem box and never shrinks; the
      // chevron keeps its own size (it already carries a `size-*`, so it's excluded).
      "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    chevron: [
      "size-4 shrink-0 text-muted-foreground",
      "transition-transform duration-fast ease-out",
      "group-data-[state=open]:rotate-180",
    ],
    content: [
      "relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden",
      "rounded-md border border-border bg-popover text-popover-foreground shadow-lg",
      // Enter: fade + zoom + slide. Exit: fade + slide only, softer than the enter.
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
      "data-[side=bottom]:slide-out-to-top-2 data-[side=top]:slide-out-to-bottom-2",
      "data-[state=open]:duration-fast data-[state=closed]:duration-[100ms] ease-out",
    ],
    item: [
      // Check sits on the right (pr-7) so leading icons/flags align flush-left regardless of
      // selection: the left edge is a stable optical line.
      "relative flex w-full cursor-pointer select-none items-center gap-2 pl-2 pr-7",
      "text-sm font-medium outline-none",
      "transition-colors duration-fast ease-out",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    ],
    // The label span Radix mirrors into the trigger value. Flex so a leading icon sits inline
    // with the text (Tailwind's preflight makes SVGs `display:block`, which would otherwise
    // stack the icon above the label): no per-option flex wrapper needed. `min-w-0` lets a
    // long label truncate rather than push the check off the row.
    itemText: "flex min-w-0 items-center gap-2 [&_svg]:text-muted-foreground",
    itemIndicator: "absolute right-2 flex size-4 items-center justify-center",
    label: "px-2 font-medium text-muted-foreground",
    separator: "-mx-1 h-px bg-border",
    scrollButton: "flex cursor-default items-center justify-center py-1 text-muted-foreground",
  },
  variants: {
    density: {
      comfortable: {
        // content rounded-md (~10px) − viewport p-1.5 (6px) ≈ 4px → rounded-sm keeps items concentric
        trigger: "h-10",
        content: "",
        item: "py-2 rounded-sm",
        label: "py-1.5 text-xs",
        separator: "my-1.5",
      },
      compact: {
        // content rounded-md (~10px) − viewport p-1 (4px) ≈ 6px → rounded-sm keeps items concentric
        trigger: "h-8",
        content: "",
        item: "py-1.5 rounded-sm",
        label: "py-1 text-xs",
        separator: "my-1",
      },
    },
  },
  defaultVariants: { density: "comfortable" },
})

// Viewport padding is not in the recipe because it's applied inline (position-conditional).
const viewportPadding: Record<"comfortable" | "compact", string> = {
  comfortable: "p-1.5",
  compact: "p-1",
}

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export interface SelectTriggerProps
  extends React.ComponentProps<typeof SelectPrimitive.Trigger>,
    VariantProps<typeof selectVariants> {}

export function SelectTrigger({
  className,
  children,
  density,
  id,
  "aria-describedby": ariaDescribedBy,
  ...props
}: SelectTriggerProps) {
  const d = useDensity(density)
  const slots = selectVariants({ density: d })
  // Surrounding Field (if any) supplies the id + aria wiring; explicit props still win.
  const field = useFieldContext()
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      id={id ?? field?.id}
      aria-describedby={ariaDescribedBy ?? field?.describedBy}
      aria-invalid={field?.hasError || undefined}
      className={slots.trigger({ className })}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDown className={slots.chevron()} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export interface SelectContentProps
  extends React.ComponentProps<typeof SelectPrimitive.Content>,
    VariantProps<typeof selectVariants> {}

export function SelectContent({
  className,
  children,
  position = "popper",
  sideOffset = 6,
  density,
  ...props
}: SelectContentProps) {
  const d = useDensity(density)
  const slots = selectVariants({ density: d })
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        position={position}
        sideOffset={sideOffset}
        className={slots.content({ className })}
        {...props}
      >
        <SelectPrimitive.ScrollUpButton className={slots.scrollButton()}>
          <CaretDown className="size-4 rotate-180" />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport
          className={cn(
            // Soften the scroll edges into the popover (the only scroll cue, since the viewport's
            // scrollbar is hidden). `scroll-py-10` matches the fade depth so a keyboard-focused
            // item scrolls in clear of the fade, never half-dissolved. The native overflow scroll
            // (Radix sets `overflow:hidden auto`) is what the `scroll()` timeline tracks.
            "scroll-fade scroll-py-10",
            viewportPadding[d],
            position === "popper" && "w-full min-w-[var(--radix-select-trigger-width)]",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className={slots.scrollButton()}>
          <CaretDown className="size-4" />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export interface SelectItemProps
  extends React.ComponentProps<typeof SelectPrimitive.Item>,
    VariantProps<typeof selectVariants> {
  /**
   * Optional hint shown on hover/keyboard-focus of the row. Use it for terse options whose
   * meaning isn't obvious from the label alone. "High" / "Medium" tells you nothing about the
   * trade-off, so a hint like "Optimizes for latency" earns its place. Supply any node (plain
   * text, or text plus a small leading glyph). When set, the row renders inside a {@link Tooltip}.
   */
  tooltip?: React.ReactNode
  /** Side the hint grows toward. Defaults to `"right"`, the open side of a left-aligned row. */
  tooltipPlacement?: TooltipProps["placement"]
}

export function SelectItem({
  className,
  children,
  density,
  tooltip,
  tooltipPlacement = "right",
  ...props
}: SelectItemProps) {
  const slots = selectVariants({ density: useDensity(density) })
  const item = (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={slots.item({ className })}
      {...props}
    >
      <span className={slots.itemIndicator()}>
        <SelectPrimitive.ItemIndicator>
          <Check className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className={slots.itemText()}>
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )

  if (!tooltip) return item

  // `mouseenter focus` (Tooltip's default) means arrowing through the list also surfaces the
  // hint, not just hovering, so the keyboard path stays informative. The tooltip portals to the
  // body, so it floats above the content's `overflow-hidden` without being clipped.
  return (
    <Tooltip content={tooltip} placement={tooltipPlacement} offset={[0, 8]}>
      {item}
    </Tooltip>
  )
}

export function SelectLabel({
  className,
  density,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label> & VariantProps<typeof selectVariants>) {
  const slots = selectVariants({ density: useDensity(density) })
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={slots.label({ className })}
      {...props}
    />
  )
}

export function SelectSeparator({
  className,
  density,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator> & VariantProps<typeof selectVariants>) {
  const slots = selectVariants({ density: useDensity(density) })
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={slots.separator({ className })}
      {...props}
    />
  )
}
