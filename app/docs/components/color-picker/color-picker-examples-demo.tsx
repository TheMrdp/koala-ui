"use client"

import * as React from "react"

import {
  ColorPicker,
  ColorPickerSwatches,
  ColorPickerPopover,
  ColorPickerTrigger,
  ColorPickerTriggerSwatch,
  ColorPickerContent,
} from "@/components/ui/color-picker"
import { InputLabel } from "@/components/ui/input"

/** Hero: the full picker, with square, hue rail, hex field, eyedropper, and preset swatches. */
export function ColorPickerDemo() {
  const [color, setColor] = React.useState("#6366f1")
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker
        value={color}
        onValueChange={setColor}
        className="rounded-xl border border-border bg-popover p-3 shadow-xs"
      />
      <span className="font-mono text-sm tabular-nums text-muted-foreground">{color}</span>
    </div>
  )
}

/** In a popover: a trigger swatch opens the panel. The classic "pick a color" field affordance. */
export function ColorPickerPopoverDemo() {
  const [color, setColor] = React.useState("#22c55e")
  return (
    <div className="flex flex-col items-center gap-2">
      <InputLabel>Brand color</InputLabel>
      <ColorPickerPopover>
        <ColorPickerTrigger asChild>
          <ColorPickerTriggerSwatch value={color} aria-label="Choose brand color" />
        </ColorPickerTrigger>
        <ColorPickerContent>
          <ColorPicker value={color} onValueChange={setColor} />
        </ColorPickerContent>
      </ColorPickerPopover>
      <span className="font-mono text-sm tabular-nums text-muted-foreground">{color}</span>
    </div>
  )
}

/** Alpha: turn on the transparency rail; the emitted hex carries the `aa` byte under 100%. */
export function ColorPickerAlphaDemo() {
  const [color, setColor] = React.useState("#a855f7cc")
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker
        showAlpha
        value={color}
        onValueChange={setColor}
        className="rounded-xl border border-border bg-popover p-3 shadow-xs"
      />
      <span className="font-mono text-sm tabular-nums text-muted-foreground">{color}</span>
    </div>
  )
}

/** Fill modes: enable Solid, Gradient, and Image. `onFillChange` emits the CSS for any mode. */
export function ColorPickerModesDemo() {
  // Seeded to match the default gradient so the preview reads before the first interaction.
  const [fill, setFill] = React.useState("linear-gradient(90deg, #6366f1 0%, #ec4899 100%)")
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker
        modes={["solid", "gradient", "image"]}
        defaultMode="gradient"
        showAlpha
        defaultValue="#6366f1"
        onFillChange={setFill}
        className="rounded-xl border border-border bg-popover p-3 shadow-xs"
      />
      <div className="flex w-80 items-center gap-3">
        <div
          className="size-9 shrink-0 rounded-md ring-1 ring-inset ring-black/10"
          style={{ background: fill, backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <span className="truncate font-mono text-xs tabular-nums text-muted-foreground">{fill}</span>
      </div>
    </div>
  )
}

/** Presets only: pass a curated palette and hide the square for a quick swatch picker. */
export function ColorPickerPresetsDemo() {
  const [color, setColor] = React.useState("#f97316")
  const presets = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#84cc16",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#d946ef",
    "#f43f5e",
    "#78716c",
    "#0f172a",
  ]
  return (
    <div className="flex flex-col items-center gap-4">
      <ColorPicker
        value={color}
        onValueChange={setColor}
        presets={presets}
        className="w-56 rounded-xl border border-border bg-popover p-3 shadow-xs"
      >
        {/* Recompose: render only the swatch grid (no square / hue rail) for a quick picker. */}
        <ColorPickerSwatches presets={presets} className="grid-cols-4" />
      </ColorPicker>
      <span className="font-mono text-sm tabular-nums text-muted-foreground">{color}</span>
    </div>
  )
}
