"use client"

import * as React from "react"
import { X } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * DataTableSelectionBar: the floating bulk-action pill that appears while rows are selected.
 * A presentational shell (count · clear · actions) styled as a centered, rounded bar that sticks
 * to the bottom of the table region and slides up on mount. `DataTable` mounts it for you when
 * `enableRowSelection` and `renderSelectionActions` are set; it's exported for hand-composed
 * tables over a TanStack instance you own.
 *
 * Pure layout: drop any `Button`s in as `children` (Export, Delete, …). The count is
 * `tabular-nums` so it doesn't jitter as the selection grows.
 */
export interface DataTableSelectionBarProps extends React.ComponentProps<"div"> {
  /** How many rows are selected, shown as "N selected". */
  count: number
  /** Clears the selection (the × button). */
  onClear: () => void
  /** Bulk-action controls, rendered after the divider. */
  children?: React.ReactNode
}

export function DataTableSelectionBar({
  count,
  onClear,
  children,
  className,
  ...props
}: DataTableSelectionBarProps) {
  return (
    <div
      data-slot="data-table-selection-bar"
      role="status"
      aria-live="polite"
      // sticky + centered so it floats over the rows while the body scrolls, without pushing
      // layout. `pointer-events-none` lets clicks fall through the empty gutter; the inner pill
      // re-enables them.
      className="pointer-events-none sticky inset-x-0 bottom-4 z-30 flex justify-center"
      {...props}
    >
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-2 rounded-full border border-border bg-popover py-1.5 pl-4 pr-1.5 text-sm text-popover-foreground shadow-lg",
          "animate-in fade-in-0 slide-in-from-bottom-2 zoom-in-95 duration-base ease-out",
          className,
        )}
      >
        <span className="font-medium tabular-nums">
          {count} selected
        </span>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          onClick={onClear}
          aria-label="Clear selection"
          className="size-7 rounded-full text-muted-foreground"
        >
          <X />
        </Button>
        {children != null && (
          <>
            <span aria-hidden className="mx-0.5 h-5 w-px bg-border" />
            <div className="flex items-center gap-1.5">{children}</div>
          </>
        )}
      </div>
    </div>
  )
}
