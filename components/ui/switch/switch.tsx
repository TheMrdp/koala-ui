"use client"

import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { tv } from "@/lib/tv"

/**
 * Switch — a Radix Switch styled with Koala tokens. Conceptually single-part, so one `tv`
 * recipe with `slots` (the track and its thumb scale together). Use it for an instant,
 * self-applying boolean (notifications on/off); reach for a Checkbox when the choice is
 * submitted with a form.
 *
 * `"use client"` because Radix Switch is interactive (state + context). It renders only the
 * control — pair it with a `<label htmlFor>` for an accessible name and a larger hit target.
 */
// polish: the 20px-tall track sits under the 40px hit target on the
// short axis, so a transparent pseudo-element extends the vertical click area without changing
// the visual.
const hitX =
  "relative before:absolute before:inset-x-0 before:top-1/2 before:h-10 before:-translate-y-1/2 before:content-['']"

export const switchVariants = tv({
  slots: {
    root: [
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5",
      // Single size: a 20×36 track. The thumb's checked travel = 36 − 16 − 2×2 = 16px.
      "h-5 w-9",
      hitX,
      // Specific transition (never `transition: all`, #14); tactile press scale (#12).
      "transition-colors duration-fast ease-out active:scale-[0.96]",
      // Focus ring is always the accent — one universal indicator, regardless of the on-color
      // (Checkbox does the same: it fills `primary` but rings `brand`).
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // Off track is the form-control fill; on fills with the primary.
      "bg-input data-[state=checked]:bg-primary",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    // The thumb is a fixed surface-colored disc that slides; the shadow lifts it off both
    // track states in every theme. Checked, it slides 16px to land flush at the far edge.
    thumb: [
      "pointer-events-none block size-4 rounded-full bg-background shadow-sm",
      // Only the slide transitions — the position is the one property that animates (#14).
      "transition-transform duration-fast ease-out",
      "data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-4",
    ],
  },
})

export interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
  /** Disable the tactile scale-on-press, e.g. where motion would distract. */
  static?: boolean
}

export function Switch({ className, static: isStatic = false, ...props }: SwitchProps) {
  const { root, thumb } = switchVariants()
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      // `static` neutralizes the press scale; twMerge keeps it (and `className`) last.
      className={root({ className: cn(isStatic && "active:scale-100", className) })}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={thumb()} />
    </SwitchPrimitive.Root>
  )
}
