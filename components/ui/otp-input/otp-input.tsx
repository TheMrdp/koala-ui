"use client"

import * as React from "react"
import { tv, type VariantProps } from "@/lib/tv"
import { Label, Hint } from "@/components/ui/label"

// ─── Variants ─────────────────────────────────────────────────────────────────

const otpInputVariants = tv({
  slots: {
    // Outer field wrapper: stacks label · control · hint.
    field: "flex flex-col gap-2",
    // The row of digit slots.
    control: "flex items-center gap-2",
    // Inserted between groups of slots when `separator` is set.
    separator:
      "flex shrink-0 select-none items-center justify-center self-center leading-none text-muted-foreground/60",
    // The line drawn for the "dash" separator.
    separatorDash: "rounded-full bg-border",
    slot: [
      "text-center font-medium tabular-nums caret-brand",
      "rounded-lg border border-input bg-background text-foreground",
      "placeholder:text-muted-foreground/40",
      // Hide the placeholder while focused: it only guides empty, unfocused slots.
      "focus:placeholder:text-transparent",
      "appearance-none outline-none",
      "transition-[border-color,box-shadow,background-color] duration-fast ease-out",
      "selection:bg-brand/20",
      // The focused slot lifts above its neighbours so its ring is never clipped.
      "focus:z-10 focus:border-brand focus:brand-ring",
      "disabled:cursor-not-allowed",
      // Filled slots read a touch heavier than empty ones.
      "data-[filled=true]:border-ring",
      // Re-apply focus ring on filled slots (data-attr selector has same specificity as :focus, last wins).
      "data-[filled=true]:focus:border-brand data-[filled=true]:focus:brand-ring",
      // Hide the number-spinner affordances some browsers add to numeric fields.
      "[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
    ],
  },
  variants: {
    size: {
      sm: {
        control: "gap-1.5",
        slot: "size-10 rounded-md text-base",
        separator: "text-xl",
        separatorDash: "h-0.5 w-2",
      },
      md: {
        control: "gap-2",
        slot: "size-12 rounded-lg text-lg",
        separator: "text-2xl",
        separatorDash: "h-0.5 w-2.5",
      },
      lg: {
        control: "gap-2.5",
        slot: "size-14 rounded-xl text-xl",
        separator: "text-3xl",
        separatorDash: "h-0.5 w-3",
      },
    },
    hasError: {
      true: {
        slot: [
          "border-destructive caret-destructive",
          "focus:border-destructive focus:destructive-ring",
        ],
      },
    },
    disabled: {
      true: {
        control: "opacity-50 pointer-events-none select-none",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Size = NonNullable<VariantProps<typeof otpInputVariants>["size"]>

const onlyDigits = (value: string) => value.replace(/\D/g, "")

/** Map any incoming string to a fixed-length array of single digits (positions preserved). */
const toChars = (value: string | undefined, length: number) => {
  const digits = onlyDigits(value ?? "")
  return Array.from({ length }, (_, i) => digits[i] ?? "")
}

// ─── OTPInput ─────────────────────────────────────────────────────────────────

export interface OTPInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<"div">,
    "onChange" | "defaultValue"
  > {
  /** Number of digit slots. Defaults to 6. */
  length?: number
  size?: Size
  hasError?: boolean
  disabled?: boolean
  /** Field label rendered above the slots and wired as the group's accessible name. */
  label?: React.ReactNode
  /** Helper text below the slots. Turns destructive when `hasError` is set. */
  hint?: React.ReactNode
  /** Appends a destructive asterisk to the label. */
  required?: boolean
  /** Controlled value: the concatenated digits. */
  value?: string
  /** Uncontrolled initial value. */
  defaultValue?: string
  /** Fires on every edit with the concatenated digits. */
  onChange?: (value: string) => void
  /** Fires once, when the last empty slot is filled. */
  onComplete?: (value: string) => void
  autoFocus?: boolean
  /** Renders a hidden input so the value participates in native form submission. */
  name?: string
  /** Single placeholder character shown in empty slots. */
  placeholder?: string
  /**
   * Visual separator inserted between groups of slots. `"dash"` draws a short
   * divider line, `"dot"` renders a centered `·`, or pass any node for a custom
   * mark. Omit for a plain, evenly-spaced row.
   */
  separator?: "dash" | "dot" | React.ReactNode
  /**
   * Slots per group before a `separator` is drawn. Defaults to two even halves
   * (`Math.ceil(length / 2)`). Ignored when `separator` is unset.
   */
  groupSize?: number
  /** Class applied to each digit slot. */
  slotClassName?: string
  "aria-label"?: string
}

function OTPInput({
  length = 6,
  size = "md",
  hasError = false,
  disabled = false,
  value: valueProp,
  defaultValue = "",
  onChange,
  onComplete,
  autoFocus = false,
  name,
  placeholder,
  separator,
  groupSize,
  label,
  hint,
  required = false,
  className,
  slotClassName,
  "aria-label": ariaLabel = "One-time passcode",
  ...props
}: OTPInputProps) {
  const isControlled = valueProp !== undefined
  const [internalChars, setInternalChars] = React.useState(() =>
    toChars(defaultValue, length),
  )

  // Single source of truth for what each slot renders.
  const chars = isControlled
    ? toChars(valueProp, length)
    : // Keep internal state aligned if `length` changes between renders.
      internalChars.length === length
      ? internalChars
      : toChars(internalChars.join(""), length)

  const refs = React.useRef<Array<HTMLInputElement | null>>([])

  const labelId = React.useId()
  const hintId = React.useId()
  const hasLabel = label != null
  const hasHint = hint != null

  const slots = otpInputVariants({ size, hasError, disabled })

  const hasSeparator = separator != null && separator !== false
  // Slots per group: explicit, else two even halves.
  const groupCount = groupSize ?? Math.ceil(length / 2)

  const renderSeparator = (key: number) => (
    <div
      key={`sep-${key}`}
      role="separator"
      aria-hidden="true"
      data-slot="otp-input-separator"
      className={slots.separator()}
    >
      {separator === "dash" ? (
        <span className={slots.separatorDash()} />
      ) : separator === "dot" ? (
        "·"
      ) : (
        separator
      )}
    </div>
  )

  const emit = (nextChars: string[]) => {
    if (!isControlled) setInternalChars(nextChars)
    const joined = nextChars.join("")
    onChange?.(joined)
    const wasComplete = chars.every(Boolean)
    if (!wasComplete && joined.length === length) onComplete?.(joined)
  }

  const focusSlot = (index: number) => {
    const clamped = Math.max(0, Math.min(index, length - 1))
    const el = refs.current[clamped]
    el?.focus()
    el?.select()
  }

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const digit = onlyDigits(event.target.value)
    // Deletions arrive as an empty value, handled in keydown so we ignore them here.
    if (!digit) return
    const next = [...chars]
    next[index] = digit.slice(-1)
    emit(next)
    focusSlot(index + 1)
  }

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    switch (event.key) {
      case "Backspace": {
        event.preventDefault()
        const next = [...chars]
        if (chars[index]) {
          // Clear the current slot, stay put.
          next[index] = ""
          emit(next)
        } else if (index > 0) {
          // Already empty: step back and clear the previous slot.
          next[index - 1] = ""
          emit(next)
          focusSlot(index - 1)
        }
        break
      }
      case "Delete": {
        event.preventDefault()
        const next = [...chars]
        next[index] = ""
        emit(next)
        break
      }
      case "ArrowLeft":
        event.preventDefault()
        focusSlot(index - 1)
        break
      case "ArrowRight":
        event.preventDefault()
        focusSlot(index + 1)
        break
      case "Home":
        event.preventDefault()
        focusSlot(0)
        break
      case "End":
        event.preventDefault()
        focusSlot(length - 1)
        break
    }
  }

  const handlePaste = (
    index: number,
    event: React.ClipboardEvent<HTMLInputElement>,
  ) => {
    event.preventDefault()
    const digits = onlyDigits(event.clipboardData.getData("text"))
    if (!digits) return
    const next = [...chars]
    let cursor = index
    for (const digit of digits) {
      if (cursor >= length) break
      next[cursor] = digit
      cursor++
    }
    emit(next)
    focusSlot(cursor)
  }

  return (
    <div data-slot="otp-input" className={slots.field({ className })} {...props}>
      {hasLabel ? (
        // Shared Label primitive, but *not* an htmlFor label (the control is a group, not one
        // input): we give it an id, the group references it via aria-labelledby, and clicking
        // it focuses the first slot. Standalone (no Field), so it adds no htmlFor of its own.
        <Label
          id={labelId}
          data-slot="otp-input-label"
          required={required}
          disabled={disabled}
          onClick={() => focusSlot(0)}
        >
          {label}
        </Label>
      ) : null}

      <div
        role="group"
        aria-label={hasLabel ? undefined : ariaLabel}
        aria-labelledby={hasLabel ? labelId : undefined}
        aria-describedby={hasHint ? hintId : undefined}
        data-slot="otp-input-control"
        data-error={hasError || undefined}
        data-disabled={disabled || undefined}
        className={slots.control()}
      >
        {Array.from({ length }, (_, index) => {
        const startsNewGroup =
          hasSeparator &&
          groupCount > 0 &&
          index > 0 &&
          index % groupCount === 0
        return (
        <React.Fragment key={index}>
        {startsNewGroup ? renderSeparator(index) : null}
        <input
          ref={(el) => {
            refs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={hasError || undefined}
          placeholder={placeholder}
          value={chars[index]}
          data-filled={chars[index] ? "true" : undefined}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className={slots.slot({ className: slotClassName })}
        />
        </React.Fragment>
        )
        })}
        {name ? (
          <input type="hidden" name={name} value={chars.join("")} />
        ) : null}
      </div>

      {hasHint ? (
        <Hint id={hintId} data-slot="otp-input-hint" hasError={hasError}>
          {hint}
        </Hint>
      ) : null}
    </div>
  )
}

export { OTPInput, otpInputVariants }
