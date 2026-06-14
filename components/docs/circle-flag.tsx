import * as React from "react"

import { cn } from "@/lib/utils"

// country-flag-icons typed its flag components as accepting plain HTML attributes
// (not SVGProps); we only pass className, so type to that to stay compatible.
type FlagComponent = React.ComponentType<{ className?: string }>

/**
 * Crops a 3:2 flag SVG (from `country-flag-icons`) into a circle: a square,
 * `overflow-hidden rounded-full` wrapper with the flag scaled to cover height
 * and centered, so the sides are clipped. `ring-border` gives a subtle edge so
 * mostly-white flags (e.g. Japan) still read against the surface.
 *
 * Defaults to `size-4` so it lines up with the Phosphor icons used elsewhere in
 * a SelectItem; pass `className` to resize.
 */
export function CircleFlag({
  flag: Flag,
  className,
}: {
  flag: FlagComponent
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-inset ring-border",
        className,
      )}
      aria-hidden="true"
    >
      {/* size-auto opts out of SelectItem's `[&_svg]:size-4` square rule. */}
      <Flag className="size-auto h-full w-auto max-w-none" />
    </span>
  )
}
