"use client"

import * as React from "react"

import { tv } from "@/lib/tv"
import { FieldContextProvider } from "@/lib/field-context"

// ─── Variants ─────────────────────────────────────────────────────────────────

// Field is now a pure wiring + layout layer: it generates the ids/aria the control, label,
// and hint share, and stacks them. The label/hint *styling* lives in `Label`/`Hint`, which
// Field re-exports below, so a field reads identically whether you compose it with the
// shared primitives or the input-local parts.
const fieldVariants = tv({
  base: "flex w-full flex-col gap-1.5",
})

// ─── Field ────────────────────────────────────────────────────────────────────

export interface FieldProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Drives the destructive tone and `aria-invalid` on the control and hint. */
  hasError?: boolean
  /** Dims the label and disables the control. */
  disabled?: boolean
  /** Appends a destructive asterisk to the label. */
  required?: boolean
}

function Field({
  hasError = false,
  disabled = false,
  required = false,
  className,
  children,
  ...props
}: FieldProps) {
  // Stable ids so the label's `htmlFor`, the control's `id`, and the hint's
  // `aria-describedby` all line up without the consumer touching them.
  const id = React.useId()
  const hintId = React.useId()

  // Only advertise `aria-describedby` when a Hint is actually present, so the control never
  // points at a missing node. A child's `type` can't be inspected reliably across the
  // Server→Client boundary, so the hint registers itself on mount instead. SSR and the first
  // client render agree (no hint → no attr), avoiding a hydration mismatch.
  const [hasHint, setHasHint] = React.useState(false)
  const registerHint = React.useCallback(() => {
    setHasHint(true)
    return () => setHasHint(false)
  }, [])
  const describedBy = hasHint ? hintId : undefined

  const context = React.useMemo(
    () => ({ id, hintId, describedBy, registerHint, hasError, disabled, required }),
    [id, hintId, describedBy, registerHint, hasError, disabled, required],
  )

  return (
    <FieldContextProvider value={context}>
      <div
        data-slot="field"
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        className={fieldVariants({ className })}
        {...props}
      >
        {children}
      </div>
    </FieldContextProvider>
  )
}

// ─── FieldRow ─────────────────────────────────────────────────────────────────

// Lays sibling fields side by side on a single row, stacking on narrow viewports. Pure
// layout, no context, so it composes with anything (two Fields, a Field + a button…).
export type FieldRowProps = React.ComponentPropsWithoutRef<"div">

function FieldRow({ className, ...props }: FieldRowProps) {
  return (
    <div
      data-slot="field-row"
      className={fieldRowVariants({ className })}
      {...props}
    />
  )
}

const fieldRowVariants = tv({
  base: "grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2",
})

export { Field, FieldRow, fieldVariants }

// FieldLabel / FieldHint are the shared Label / Hint primitives. They read the Field context
// above for their id/aria wiring and error/disabled state, so `<Field><FieldLabel>…` works
// unchanged. Re-exported (not re-implemented) so there's exactly one label recipe in the DS.
export {
  Label as FieldLabel,
  Hint as FieldHint,
  type LabelProps as FieldLabelProps,
  type HintProps as FieldHintProps,
} from "@/components/ui/label"
