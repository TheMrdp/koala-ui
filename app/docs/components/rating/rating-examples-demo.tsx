"use client"

import * as React from "react"
import { Heart, Star } from "@phosphor-icons/react"

import { Rating } from "@/components/ui/rating"

/** Hero: an interactive 5-star rating with hover preview and keyboard support. */
export function RatingDemo() {
  const [value, setValue] = React.useState(4)
  return (
    <div className="flex flex-col items-center gap-3">
      <Rating value={value} onValueChange={setValue} size="lg" aria-label="Rate your experience" />
      <span className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground tabular-nums">{value}</span> of 5
      </span>
    </div>
  )
}

/** Three sizes line up with the rest of the control scale. */
export function SizesDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <Rating size={size} defaultValue={3} aria-label={`${size} rating`} />
          <span className="w-6 text-xs text-muted-foreground">{size}</span>
        </div>
      ))}
    </div>
  )
}

/** Read-only display supports fractional values: an average renders as a partly-filled star. */
export function ReadOnlyDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {[5, 4.3, 2.5].map((avg) => (
        <div key={avg} className="flex items-center gap-3">
          <Rating value={avg} readOnly aria-label="Average rating" />
          <span className="text-sm text-muted-foreground tabular-nums">{avg.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}

/** Any Phosphor icon works in place of the star, and the scale length is configurable. The `red`
 *  tone suits a heart: a filled heart reads as red, not gold. */
export function CustomDemo() {
  const [value, setValue] = React.useState(3)
  return (
    <Rating
      value={value}
      onValueChange={setValue}
      max={7}
      icon={Heart}
      tone="red"
      size="lg"
      aria-label="Rate with hearts"
    />
  )
}

/** Two tones recolor the active glyph: `amber` review-gold (default) for stars and a love-red that
 *  suits a heart. Both ride dedicated rating tokens, brighter than the warning status hue. */
const TONE_ROWS = [
  { tone: "amber", icon: Star, label: "amber" },
  { tone: "red", icon: Heart, label: "red" },
] as const

export function TonesDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      {TONE_ROWS.map(({ tone, icon, label }) => (
        <div key={tone} className="flex items-center gap-4">
          <Rating tone={tone} icon={icon} defaultValue={4} size="lg" aria-label={`${label} rating`} />
          <span className="w-12 text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  )
}

/** The opt-in filled variant: the active star renders solid, the rest stay outline. */
export function VariantsDemo() {
  return (
    <div className="flex flex-col items-center gap-5">
      {(["outline", "filled"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-4">
          <Rating variant={variant} defaultValue={4} size="lg" aria-label={`${variant} rating`} />
          <span className="w-12 text-xs text-muted-foreground">{variant}</span>
        </div>
      ))}
    </div>
  )
}

/** A disabled rating is dimmed and ignores input. */
export function DisabledDemo() {
  return <Rating defaultValue={3} disabled aria-label="Disabled rating" />
}
