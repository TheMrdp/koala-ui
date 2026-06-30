"use client"

import * as React from "react"
import { Popover as PopoverPrimitive, Slider as SliderPrimitive } from "radix-ui"
import { Check, Eyedropper, ImageSquare, UploadSimple, X } from "@phosphor-icons/react"

import { tv, type VariantProps } from "@/lib/tv"
import { cn } from "@/lib/utils"
import { useDensity, type Density } from "@/lib/density"
import { createContext } from "@/lib/create-context"
import { InputField, InputPrefix, InputRoot } from "@/components/ui/input"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

import {
  clamp,
  colorAtPosition,
  gradientToCss,
  hexToHsva,
  hsvaToHex,
  hsvaToRgba,
  hsvaToRgbaString,
  reconcileHsva,
  sortStops,
  stopsToBarCss,
  type GradientType,
  type GradientValue,
  type Hsva,
} from "./color"

/**
 * ColorPicker: a full HSV color picker: a draggable saturation/value square, a hue rail, an
 * optional alpha rail, a hex field, an eyedropper (where the browser supports it), and a row of
 * preset swatches. There is no Radix primitive for a 2D color field, so the square is hand-rolled
 * on pointer events (lint-safe: handlers, never effects); the 1D hue/alpha rails ride on
 * **Radix Slider** so keyboard, drag, and ARIA come for free, per the DS "Radix first" rule.
 *
 * HSV is the working model (see ./color): keeping it as the source of truth means dragging value
 * to black never loses the hue. `value`/`onValueChange` speak hex at the edges. State flows to the
 * parts through a typed Context, with named exports, never dot-notation (RSC-safe). Pass `children` to
 * recompose the parts in any order; omit them for the standard stacked layout.
 *
 * The colored gradients (hue spectrum, the white/black square overlays, the alpha checkerboard)
 * are the color space itself, not themeable surfaces: they're the one place literal colors are
 * correct. Everything chrome-side (borders, rings, text, the panel) stays on semantic tokens.
 *
 * Beyond a single solid color, the picker can edit a **gradient** (a draggable stop track plus a
 * linear/radial toggle and an angle rail) or an **image** fill (upload or URL with a cover/contain
 * fit). These are opt-in via `modes`; with two or more modes a segmented switcher renders at the
 * top. The gradient editor reuses the very same square/rails/hex to edit whichever stop is active
 * (the Context's `update` maps to the selected stop), so there's no second color editor. Solid's
 * hex `value`/`onValueChange` is unchanged; `onFillChange` is the single callback that speaks CSS
 * across all three modes (a hex, a `linear-gradient()/radial-gradient()`, or a `url("…")`).
 */

// ─── Constants ────────────────────────────────────────────────────────────────────

/**
 * A curated, theme-agnostic default palette for the preset row (Tailwind-500-ish hues): a full
 * spectrum then neutrals, sized to two even rows of the 8-column grid.
 */
export const defaultColorPresets = [
  "#ef4444", // red
  "#f97316", // orange
  "#f59e0b", // amber
  "#eab308", // yellow
  "#84cc16", // lime
  "#22c55e", // green
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f43f5e", // rose
  "#64748b", // slate
  "#000000", // black
  "#ffffff", // white
]

/** Pure-spectrum hue rail: constants of the color wheel, not theme surfaces. */
const HUE_GRADIENT =
  "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"

/** Alpha checkerboard: a constant 8px chequer so transparency reads on any backdrop. */
const CHECKER_STYLE: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(45deg, color-mix(in srgb, var(--muted-foreground) 22%, transparent) 25%, transparent 25%, transparent 75%, color-mix(in srgb, var(--muted-foreground) 22%, transparent) 75%), linear-gradient(45deg, color-mix(in srgb, var(--muted-foreground) 22%, transparent) 25%, transparent 25%, transparent 75%, color-mix(in srgb, var(--muted-foreground) 22%, transparent) 75%)",
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 4px 4px",
}

// ─── Variants ───────────────────────────────────────────────────────────────────

export const colorPickerVariants = tv({
  slots: {
    root: [
      "flex flex-col gap-3 rounded-xl",
      // Lets nested controls (the hex Input) paint this surface when the picker sits in a popover.
      "[--surface:var(--popover)]",
    ],
    // 2D saturation (x) / value (y) field. The crosshair + ring read on every backdrop color.
    area: [
      "relative w-full shrink-0 cursor-crosshair touch-none select-none overflow-hidden rounded-lg",
      "ring-1 ring-inset ring-black/10 outline-none",
      "focus-visible:ring-2 focus-visible:ring-brand",
    ],
    areaThumb: [
      "pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
      // White ring + faint dark halo so the handle reads on light and dark areas alike.
      "border-2 border-white shadow-[0_0_0_1.5px_rgba(0,0,0,0.25)]",
    ],
    // Hue + alpha rails share a shape; the track background is set per-rail inline.
    sliderRoot: "relative flex h-4 w-full touch-none select-none items-center",
    sliderTrack: "relative h-3 w-full grow overflow-hidden rounded-full ring-1 ring-inset ring-black/10",
    sliderThumb: [
      "block size-4 rounded-full border-2 border-white bg-transparent shadow-[0_0_0_1.5px_rgba(0,0,0,0.25)]",
      "cursor-grab active:cursor-grabbing",
      "transition-[scale] duration-fast ease-out active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
    ],
    // Left: live preview chip over a checkerboard. Right: the rails stacked.
    controls: "flex items-stretch gap-3",
    preview: "relative shrink-0 overflow-hidden rounded-md ring-1 ring-inset ring-black/10",
    rails: "flex min-w-0 flex-1 flex-col justify-center gap-3",
    // Hex field + eyedropper row.
    inputRow: "flex items-center gap-2",
    eyedropper: [
      "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md border border-input",
      "bg-[var(--surface,var(--background))] text-muted-foreground",
      "transition-[color,background-color,scale] duration-fast ease-out",
      "hover:bg-accent hover:text-foreground active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
      "[&_svg]:size-4 [&_svg]:shrink-0",
    ],
    // Mode switcher (Solid / Gradient / Image): a full-width segmented row of ToggleGroup pills.
    modes: "flex w-full gap-1.5",
    modeItem: "flex-1 px-0",
    // ── Gradient editor ──
    // Stop track: a checkerboard wrapper; the live stop gradient + handles layer on top.
    gradientBar: [
      "relative h-7 w-full cursor-copy touch-none select-none rounded-md ring-1 ring-inset ring-black/10",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand",
    ],
    gradientFill: "absolute inset-0 rounded-md",
    // A stop handle rides the track; its fill is the stop color over a white casing so light
    // stops still read. Selected gets the brand ring; it drags horizontally only.
    gradientStop: [
      "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full",
      "border-2 border-white bg-clip-padding shadow-[0_0_0_1.5px_rgba(0,0,0,0.25)]",
      "transition-[scale] duration-fast ease-out active:scale-[0.92] active:cursor-grabbing",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-popover",
      "data-[active=true]:ring-2 data-[active=true]:ring-brand data-[active=true]:ring-offset-1 data-[active=true]:ring-offset-popover",
    ],
    // Type toggle (Linear / Radial) + angle rail row.
    gradientControls: "flex items-center gap-2",
    angleRail: "flex min-w-0 flex-1 items-center gap-2",
    angleValue: "w-10 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground",
    // ── Image fill ──
    imageDropzone: [
      "flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg p-4 text-center",
      "border border-dashed border-input bg-[var(--surface,var(--background))] text-muted-foreground",
      "transition-[color,background-color,border-color] duration-fast ease-out",
      "hover:border-brand/50 hover:bg-accent hover:text-foreground",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-popover",
      "[&_svg]:size-6 [&_svg]:shrink-0",
    ],
    imagePreview: "group relative aspect-[16/10] w-full overflow-hidden rounded-lg ring-1 ring-inset ring-black/10",
    imageRemove: [
      "absolute right-1.5 top-1.5 flex size-7 cursor-pointer items-center justify-center rounded-md",
      "bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-fast ease-out",
      "group-hover:opacity-100 focus-visible:opacity-100",
      "outline-none focus-visible:ring-2 focus-visible:ring-white/70",
      "[&_svg]:size-4 [&_svg]:shrink-0",
    ],
    // Preset swatch grid.
    swatches: "grid grid-cols-8 gap-1.5",
    swatch: [
      "relative aspect-square w-full cursor-pointer rounded-md ring-1 ring-inset ring-black/10",
      "transition-[scale] duration-fast ease-out active:scale-[0.92]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 focus-visible:ring-offset-popover",
      // Selected check is drawn in the contrasting glyph color the swatch computes for itself.
      "[&_svg]:absolute [&_svg]:left-1/2 [&_svg]:top-1/2 [&_svg]:size-3.5 [&_svg]:-translate-x-1/2 [&_svg]:-translate-y-1/2",
    ],
    // Trigger swatch (opens the popover): shows the current color over a checkerboard.
    trigger: [
      "relative inline-flex shrink-0 cursor-pointer overflow-hidden rounded-md border border-input",
      "transition-[scale,box-shadow] duration-fast ease-out active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
    ],
    content: [
      "z-50 rounded-xl border border-border-soft bg-popover p-3 text-popover-foreground shadow-lg outline-none",
      "[--surface:var(--popover)]",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
      "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
      "data-[state=open]:duration-fast data-[state=closed]:duration-[100ms] ease-out",
    ],
  },
  variants: {
    // Density tunes the panel width and the SV square's height, never color or radius.
    density: {
      comfortable: { root: "w-80", area: "h-52", preview: "w-12", trigger: "size-9" },
      compact: { root: "w-72", area: "h-44", preview: "w-11", trigger: "size-8" },
    },
  },
  defaultVariants: {
    density: "comfortable",
  },
})

type ColorPickerSlots = ReturnType<typeof colorPickerVariants>

// ─── Modes ──────────────────────────────────────────────────────────────────────

/** The fill kinds the picker can edit. Solid is the classic single color; gradient and image
 * are opt-in via the `modes` prop and add the segmented switcher at the top of the panel. */
export type ColorPickerMode = "solid" | "gradient" | "image"

/** How an image fill sits in its box. Maps straight to CSS `object-fit`/`background-size`. */
export type ColorPickerImageFit = "cover" | "contain"

export interface ColorPickerImageValue {
  /** Image URL or data URL. Empty string = no image chosen yet. */
  src: string
  fit: ColorPickerImageFit
}

const MODE_LABELS: Record<ColorPickerMode, string> = {
  solid: "Solid",
  gradient: "Gradient",
  image: "Image",
}

const DEFAULT_GRADIENT: GradientValue = {
  type: "linear",
  angle: 90,
  stops: [
    { id: "g-0", color: "#6366f1", position: 0 },
    { id: "g-1", color: "#ec4899", position: 100 },
  ],
}

const DEFAULT_IMAGE: ColorPickerImageValue = { src: "", fit: "cover" }

const FALLBACK_HSVA: Hsva = { h: 217, s: 76, v: 96, a: 1 }

// A monotonic id source for stops added at runtime; deterministic-free since stops are only ever
// created in event handlers (never during render), so it can't desync SSR/hydration.
let stopIdSeq = 0
const nextStopId = () => `stop-${++stopIdSeq}`

/** The CSS value for a mode's current state: hex (solid), gradient string, or `url()` (image). */
function fillFor(
  mode: ColorPickerMode,
  hsva: Hsva,
  showAlpha: boolean,
  gradient: GradientValue,
  image: ColorPickerImageValue,
): string {
  if (mode === "gradient") return gradientToCss(gradient)
  if (mode === "image") return image.src ? `url("${image.src}")` : "none"
  return hsvaToHex(hsva, showAlpha)
}

// ─── Context ──────────────────────────────────────────────────────────────────────

interface ColorPickerContextValue {
  // The current color under edit. In gradient mode this maps to the active stop, so the square,
  // rails, hex field, and swatches all drive whichever stop is selected without special-casing.
  hsva: Hsva
  hex: string
  showAlpha: boolean
  update: (partial: Partial<Hsva>) => void
  // Mode switching.
  mode: ColorPickerMode
  modes: ColorPickerMode[]
  setMode: (mode: ColorPickerMode) => void
  // Gradient editing.
  gradient: GradientValue
  activeStopId: string
  setActiveStopId: (id: string) => void
  addStop: (position: number) => void
  removeStop: (id: string) => void
  moveStop: (id: string, position: number) => void
  setGradientType: (type: GradientType) => void
  setGradientAngle: (angle: number) => void
  // Image editing.
  image: ColorPickerImageValue
  setImage: (partial: Partial<ColorPickerImageValue>) => void
  slots: ColorPickerSlots
}

const [ColorPickerProvider, useColorPickerContext] =
  createContext<ColorPickerContextValue>("ColorPicker")

// ─── ColorPicker (root) ─────────────────────────────────────────────────────────────

export interface ColorPickerProps
  extends Omit<React.ComponentProps<"div">, "onChange" | "defaultValue">,
    VariantProps<typeof colorPickerVariants> {
  /** Controlled color as a hex string (`#rrggbb` or `#rrggbbaa`). Drives the solid color. */
  value?: string
  /** Initial color when uncontrolled. @default "#3b82f6" */
  defaultValue?: string
  /** Fires with the new hex string on every solid-color change. */
  onValueChange?: (hex: string) => void
  /**
   * The fill kinds to offer. With a single mode (the default) no switcher renders and the picker
   * behaves exactly as before. List two or more to add the Solid / Gradient / Image switcher.
   * @default ["solid"]
   */
  modes?: ColorPickerMode[]
  /** Controlled active mode. */
  mode?: ColorPickerMode
  /** Initial mode when uncontrolled. @default the first entry of `modes` */
  defaultMode?: ColorPickerMode
  /** Fires when the active mode changes. */
  onModeChange?: (mode: ColorPickerMode) => void
  /**
   * Fires with the composed CSS fill on any change, in every mode: a hex for solid, a
   * `linear-gradient()/radial-gradient()` for gradient, or `url("…")` for image. Use this (instead
   * of `onValueChange`) when you enable gradient/image so one callback covers the whole value.
   */
  onFillChange?: (fill: string) => void
  /** Initial gradient when uncontrolled. */
  defaultGradient?: GradientValue
  /** Initial image fill when uncontrolled. */
  defaultImage?: ColorPickerImageValue
  /** Show the alpha (transparency) rail. When on, emitted hex carries `aa` if alpha < 1. */
  showAlpha?: boolean
  /** Show the hex input + eyedropper row. @default true */
  showInput?: boolean
  /** Show the preset swatch grid. @default true */
  showPresets?: boolean
  /** Preset colors (hex) for the swatch grid. */
  presets?: string[]
  density?: Density
  /** Recompose the parts yourself. When omitted, the standard stacked layout renders. */
  children?: React.ReactNode
}

export function ColorPicker({
  className,
  value,
  defaultValue = "#3b82f6",
  onValueChange,
  modes = ["solid"],
  mode: controlledMode,
  defaultMode,
  onModeChange,
  onFillChange,
  defaultGradient,
  defaultImage,
  showAlpha = false,
  showInput = true,
  showPresets = true,
  presets = defaultColorPresets,
  density,
  children,
  ...props
}: ColorPickerProps) {
  const slots = colorPickerVariants({ density: useDensity(density) })

  // ── Solid state ──
  const [solidHsva, setSolidHsva] = React.useState<Hsva>(
    () => hexToHsva(value ?? defaultValue) ?? FALLBACK_HSVA,
  )

  // Sync an external (controlled) value → working HSV without losing hue on greys/black. The
  // React-recommended "adjust state during render on prop change" pattern (no effect, lint-safe).
  const [prevValue, setPrevValue] = React.useState(value)
  if (value !== undefined && value !== prevValue) {
    setPrevValue(value)
    const parsed = hexToHsva(value)
    if (parsed) setSolidHsva((curr) => reconcileHsva(parsed, curr))
  }

  // ── Mode state (controlled or uncontrolled) ──
  const [modeState, setModeState] = React.useState<ColorPickerMode>(
    () => defaultMode ?? modes[0] ?? "solid",
  )
  const mode = controlledMode ?? modeState

  // ── Gradient state ──
  const [gradient, setGradient] = React.useState<GradientValue>(
    () => defaultGradient ?? DEFAULT_GRADIENT,
  )
  const [activeStopId, setActiveStopId] = React.useState<string>(
    () => (defaultGradient ?? DEFAULT_GRADIENT).stops[0]?.id ?? "g-0",
  )

  // ── Image state ──
  const [image, setImageState] = React.useState<ColorPickerImageValue>(
    () => defaultImage ?? DEFAULT_IMAGE,
  )

  // The active gradient stop, with a guard for when the id falls out of the list (after a remove).
  const activeStop =
    gradient.stops.find((s) => s.id === activeStopId) ?? gradient.stops[0]
  const activeStopHsva = activeStop ? hexToHsva(activeStop.color) ?? FALLBACK_HSVA : FALLBACK_HSVA

  // The color the square/rails/hex/swatches edit: solid color, or the active stop in gradient mode.
  const editingHsva = mode === "gradient" ? activeStopHsva : solidHsva
  const hex = hsvaToHex(editingHsva, showAlpha)

  // Each mutation computes `next` from the current render (never inside a setState updater) so the
  // emit side-effects fire exactly once under StrictMode, mirroring the original `update`.
  const emit = onFillChange

  const updateSolid = React.useCallback(
    (partial: Partial<Hsva>) => {
      const next = { ...solidHsva, ...partial }
      setSolidHsva(next)
      const nextHex = hsvaToHex(next, showAlpha)
      onValueChange?.(nextHex)
      emit?.(nextHex)
    },
    [solidHsva, onValueChange, emit, showAlpha],
  )

  const updateActiveStop = React.useCallback(
    (partial: Partial<Hsva>) => {
      if (!activeStop) return
      const nextHsva = { ...activeStopHsva, ...partial }
      const nextColor = hsvaToHex(nextHsva, showAlpha)
      const stops = gradient.stops.map((s) =>
        s.id === activeStop.id ? { ...s, color: nextColor } : s,
      )
      const next = { ...gradient, stops }
      setGradient(next)
      emit?.(gradientToCss(next))
    },
    [activeStop, activeStopHsva, gradient, showAlpha, emit],
  )

  const update = mode === "gradient" ? updateActiveStop : updateSolid

  const setMode = React.useCallback(
    (next: ColorPickerMode) => {
      if (controlledMode === undefined) setModeState(next)
      onModeChange?.(next)
      emit?.(fillFor(next, solidHsva, showAlpha, gradient, image))
    },
    [controlledMode, onModeChange, emit, solidHsva, showAlpha, gradient, image],
  )

  const commitGradient = React.useCallback(
    (next: GradientValue) => {
      setGradient(next)
      emit?.(gradientToCss(next))
    },
    [emit],
  )

  const addStop = React.useCallback(
    (position: number) => {
      const pos = clamp(position, 0, 100)
      const id = nextStopId()
      const stops = [...gradient.stops, { id, color: colorAtPosition(gradient.stops, pos), position: pos }]
      setActiveStopId(id)
      commitGradient({ ...gradient, stops })
    },
    [gradient, commitGradient, setActiveStopId],
  )

  const removeStop = React.useCallback(
    (id: string) => {
      if (gradient.stops.length <= 2) return // a gradient needs at least two stops
      const stops = gradient.stops.filter((s) => s.id !== id)
      if (activeStopId === id) setActiveStopId(sortStops(stops)[0].id)
      commitGradient({ ...gradient, stops })
    },
    [gradient, activeStopId, commitGradient, setActiveStopId],
  )

  const moveStop = React.useCallback(
    (id: string, position: number) => {
      const pos = clamp(position, 0, 100)
      const stops = gradient.stops.map((s) => (s.id === id ? { ...s, position: pos } : s))
      commitGradient({ ...gradient, stops })
    },
    [gradient, commitGradient],
  )

  const setGradientType = React.useCallback(
    (type: GradientType) => commitGradient({ ...gradient, type }),
    [gradient, commitGradient],
  )

  const setGradientAngle = React.useCallback(
    (angle: number) => commitGradient({ ...gradient, angle: clamp(angle, 0, 360) }),
    [gradient, commitGradient],
  )

  const setImage = React.useCallback(
    (partial: Partial<ColorPickerImageValue>) => {
      const next = { ...image, ...partial }
      setImageState(next)
      emit?.(next.src ? `url("${next.src}")` : "none")
    },
    [image, emit],
  )

  // The standard stacked layout, picked by mode. Solid and the active gradient stop share the
  // same square/rails/hex/swatches (driven by the mode-aware `update`); image swaps in its own UI.
  const solidEditor = (
    <>
      <ColorPickerArea />
      <ColorPickerControls />
      {showInput && (
        <div className={slots.inputRow()}>
          <ColorPickerHexInput />
          <ColorPickerEyeDropper />
        </div>
      )}
      {showPresets && <ColorPickerSwatches presets={presets} />}
    </>
  )

  return (
    <ColorPickerProvider
      hsva={editingHsva}
      hex={hex}
      showAlpha={showAlpha}
      update={update}
      mode={mode}
      modes={modes}
      setMode={setMode}
      gradient={gradient}
      activeStopId={activeStop?.id ?? activeStopId}
      setActiveStopId={setActiveStopId}
      addStop={addStop}
      removeStop={removeStop}
      moveStop={moveStop}
      setGradientType={setGradientType}
      setGradientAngle={setGradientAngle}
      image={image}
      setImage={setImage}
      slots={slots}
    >
      <div data-slot="color-picker" className={slots.root({ className })} {...props}>
        {children ?? (
          <>
            {modes.length > 1 && <ColorPickerModes />}
            {mode === "gradient" && <ColorPickerGradient />}
            {mode === "image" ? <ColorPickerImage /> : solidEditor}
          </>
        )}
      </div>
    </ColorPickerProvider>
  )
}

// ─── ColorPickerModes (Solid / Gradient / Image switcher) ───────────────────────────

export function ColorPickerModes({ className }: { className?: string }) {
  const { mode, modes, setMode, slots } = useColorPickerContext("ColorPickerModes")
  if (modes.length < 2) return null
  return (
    <ToggleGroup
      type="single"
      size="sm"
      value={mode}
      // Radix clears on re-press; ignore the empty value so a mode is always selected.
      onValueChange={(next) => next && setMode(next as ColorPickerMode)}
      data-slot="color-picker-modes"
      className={slots.modes({ className })}
      aria-label="Fill type"
    >
      {modes.map((m) => (
        <ToggleGroupItem key={m} value={m} className={slots.modeItem()}>
          {MODE_LABELS[m]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

// ─── ColorPickerArea (saturation × value) ───────────────────────────────────────────

export function ColorPickerArea({ className }: { className?: string }) {
  const { hsva, update, slots } = useColorPickerContext("ColorPickerArea")
  const ref = React.useRef<HTMLDivElement>(null)

  function commitFromPointer(clientX: number, clientY: number) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = clamp((clientX - rect.left) / rect.width, 0, 1)
    const y = clamp((clientY - rect.top) / rect.height, 0, 1)
    update({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) })
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.currentTarget.setPointerCapture(e.pointerId)
    commitFromPointer(e.clientX, e.clientY)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // Only track while the press is captured (the button is held).
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    commitFromPointer(e.clientX, e.clientY)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 1
    let { s, v } = hsva
    switch (e.key) {
      case "ArrowRight":
        s = clamp(s + step, 0, 100)
        break
      case "ArrowLeft":
        s = clamp(s - step, 0, 100)
        break
      case "ArrowUp":
        v = clamp(v + step, 0, 100)
        break
      case "ArrowDown":
        v = clamp(v - step, 0, 100)
        break
      default:
        return
    }
    e.preventDefault()
    update({ s, v })
  }

  return (
    <div
      ref={ref}
      data-slot="color-picker-area"
      role="slider"
      tabIndex={0}
      aria-label="Saturation and brightness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={hsva.s}
      aria-valuetext={`saturation ${hsva.s}%, brightness ${hsva.v}%`}
      className={slots.area({ className })}
      style={{
        // Pure hue, then white→transparent (saturation) and transparent→black (value) overlays.
        backgroundColor: `hsl(${hsva.h} 100% 50%)`,
        backgroundImage:
          "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
    >
      <span
        className={slots.areaThumb()}
        style={{
          left: `${hsva.s}%`,
          top: `${100 - hsva.v}%`,
          backgroundColor: hsvaToRgbaString({ ...hsva, a: 1 }),
        }}
      />
    </div>
  )
}

// ─── Hue / Alpha rails (Radix Slider) ───────────────────────────────────────────────

export function ColorPickerHueSlider({ className }: { className?: string }) {
  const { hsva, update, slots } = useColorPickerContext("ColorPickerHueSlider")
  return (
    <SliderPrimitive.Root
      data-slot="color-picker-hue"
      className={slots.sliderRoot({ className })}
      min={0}
      max={360}
      step={1}
      value={[hsva.h]}
      onValueChange={([h]) => update({ h })}
      aria-label="Hue"
    >
      <SliderPrimitive.Track className={slots.sliderTrack()} style={{ backgroundImage: HUE_GRADIENT }} />
      <SliderPrimitive.Thumb
        className={slots.sliderThumb()}
        style={{ backgroundColor: `hsl(${hsva.h} 100% 50%)` }}
      />
    </SliderPrimitive.Root>
  )
}

export function ColorPickerAlphaSlider({ className }: { className?: string }) {
  const { hsva, update, slots } = useColorPickerContext("ColorPickerAlphaSlider")
  const opaque = hsvaToRgbaString({ ...hsva, a: 1 })
  return (
    <SliderPrimitive.Root
      data-slot="color-picker-alpha"
      className={slots.sliderRoot({ className })}
      min={0}
      max={100}
      step={1}
      value={[Math.round(hsva.a * 100)]}
      onValueChange={([a]) => update({ a: a / 100 })}
      aria-label="Alpha"
    >
      <SliderPrimitive.Track className={slots.sliderTrack()} style={CHECKER_STYLE}>
        {/* Transparent → opaque-color wash, laid over the checkerboard. */}
        <span
          className="absolute inset-0"
          style={{ backgroundImage: `linear-gradient(to right, transparent, ${opaque})` }}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={slots.sliderThumb()}
        style={{ backgroundColor: hsvaToRgbaString(hsva) }}
      />
    </SliderPrimitive.Root>
  )
}

// ─── ColorPickerControls (preview chip + the rails) ─────────────────────────────────

export function ColorPickerControls({ className }: { className?: string }) {
  const { showAlpha, slots } = useColorPickerContext("ColorPickerControls")
  return (
    <div data-slot="color-picker-controls" className={slots.controls({ className })}>
      <ColorPickerPreview />
      <div className={slots.rails()}>
        <ColorPickerHueSlider />
        {showAlpha && <ColorPickerAlphaSlider />}
      </div>
    </div>
  )
}

// ─── ColorPickerPreview (current color over a checkerboard) ──────────────────────────

export function ColorPickerPreview({ className }: { className?: string }) {
  const { hsva, slots } = useColorPickerContext("ColorPickerPreview")
  return (
    <div data-slot="color-picker-preview" className={slots.preview({ className })} style={CHECKER_STYLE}>
      <span className="absolute inset-0" style={{ backgroundColor: hsvaToRgbaString(hsva) }} />
    </div>
  )
}

// ─── ColorPickerHexInput ────────────────────────────────────────────────────────────

export function ColorPickerHexInput({ className }: { className?: string }) {
  const { hsva, showAlpha, update } = useColorPickerContext("ColorPickerHexInput")
  // Local draft so a half-typed value (e.g. "3b8") doesn't get clobbered by the live hex.
  const committed = hsvaToHex(hsva, showAlpha).replace(/^#/, "")
  const [draft, setDraft] = React.useState(committed)

  // When the color changes elsewhere (square, rail, preset), reflect it, unless the user is
  // mid-edit on a value that already resolves to the same color.
  const [prevCommitted, setPrevCommitted] = React.useState(committed)
  if (committed !== prevCommitted) {
    setPrevCommitted(committed)
    setDraft(committed)
  }

  function handleChange(raw: string) {
    const sanitized = raw.replace(/[^\da-f]/gi, "").slice(0, 8)
    setDraft(sanitized)
    const parsed = hexToHsva(sanitized)
    if (parsed) update(reconcileHsva(parsed, hsva))
  }

  return (
    <InputRoot size="sm" className={cn("flex-1", className)}>
      <InputPrefix>
        <span className="font-mono text-sm">#</span>
      </InputPrefix>
      <InputField
        data-slot="color-picker-hex"
        value={draft}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setDraft(committed)}
        spellCheck={false}
        autoComplete="off"
        aria-label="Hex color"
        className="font-mono uppercase tabular-nums"
      />
    </InputRoot>
  )
}

// ─── ColorPickerEyeDropper ──────────────────────────────────────────────────────────

interface EyeDropperResult {
  sRGBHex: string
}
interface EyeDropperConstructor {
  new (): { open: () => Promise<EyeDropperResult> }
}

/** Sample a pixel from anywhere on screen. Only renders where the browser ships the API. */
export function ColorPickerEyeDropper({ className }: { className?: string }) {
  const { update, hsva, slots } = useColorPickerContext("ColorPickerEyeDropper")
  const [supported, setSupported] = React.useState(false)

  // Feature-detect after mount so SSR and first client render agree (both render nothing). The
  // detection is nested in a named handler, not called synchronously in the effect body; the
  // repo's strict react-hooks lint flags a bare setState in an effect (see the date primitives).
  React.useEffect(() => {
    const detect = () => setSupported(typeof window !== "undefined" && "EyeDropper" in window)
    detect()
  }, [])

  if (!supported) return null

  async function pick() {
    try {
      const Ctor = (window as unknown as { EyeDropper: EyeDropperConstructor }).EyeDropper
      const { sRGBHex } = await new Ctor().open()
      const parsed = hexToHsva(sRGBHex)
      if (parsed) update(reconcileHsva(parsed, hsva))
    } catch {
      /* user dismissed the picker: ignore */
    }
  }

  return (
    <button
      type="button"
      data-slot="color-picker-eyedropper"
      aria-label="Pick a color from the screen"
      className={slots.eyedropper({ className })}
      onClick={pick}
    >
      <Eyedropper />
    </button>
  )
}

// ─── ColorPickerSwatches (presets) ───────────────────────────────────────────────────

export interface ColorPickerSwatchesProps {
  presets?: string[]
  className?: string
}

export function ColorPickerSwatches({
  presets = defaultColorPresets,
  className,
}: ColorPickerSwatchesProps) {
  const { hex, update, slots } = useColorPickerContext("ColorPickerSwatches")
  const currentHex = hex.toLowerCase()

  return (
    <div data-slot="color-picker-swatches" className={slots.swatches({ className })} role="group" aria-label="Color presets">
      {presets.map((preset) => {
        const parsed = hexToHsva(preset)
        const selected = preset.toLowerCase() === currentHex
        // Pick a check color that contrasts with the swatch (white on dark, dark on light).
        const checkOnDark = parsed ? hsvaToRgba(parsed).r * 0.299 + hsvaToRgba(parsed).g * 0.587 + hsvaToRgba(parsed).b * 0.114 < 150 : false
        return (
          <button
            key={preset}
            type="button"
            aria-label={preset}
            aria-pressed={selected}
            className={slots.swatch()}
            style={{ backgroundColor: preset }}
            onClick={() => parsed && update(reconcileHsva(parsed, parsed))}
          >
            {selected && <Check weight="bold" className={checkOnDark ? "text-white" : "text-black"} />}
          </button>
        )
      })}
    </div>
  )
}

// ─── ColorPickerGradient (stop track + type / angle) ────────────────────────────────

/**
 * The gradient editor's chrome: a stop track you click to add stops and drag to move them, a
 * Linear/Radial toggle, and an angle rail for linear gradients. The active stop's *color* is
 * edited by the shared square/rails/hex below it (the mode-aware `update`), so this part owns
 * only stop placement and the gradient geometry.
 */
export function ColorPickerGradient({ className }: { className?: string }) {
  const {
    gradient,
    activeStopId,
    setActiveStopId,
    addStop,
    removeStop,
    moveStop,
    setGradientType,
    setGradientAngle,
    slots,
  } = useColorPickerContext("ColorPickerGradient")
  const barRef = React.useRef<HTMLDivElement>(null)

  function positionFromClientX(clientX: number) {
    const el = barRef.current
    if (!el) return 0
    const rect = el.getBoundingClientRect()
    return clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
  }

  // Click on empty track adds a stop there; clicks that start on a handle stop propagation, so
  // this only fires for the track itself.
  function handleTrackPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    addStop(positionFromClientX(e.clientX))
  }

  function handleStopPointerDown(e: React.PointerEvent<HTMLButtonElement>, id: string) {
    e.stopPropagation()
    setActiveStopId(id)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handleStopPointerMove(e: React.PointerEvent<HTMLButtonElement>, id: string) {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
    moveStop(id, positionFromClientX(e.clientX))
  }

  function handleStopKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, id: string, position: number) {
    const step = e.shiftKey ? 10 : 1
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      moveStop(id, position - step)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      moveStop(id, position + step)
    } else if (e.key === "Delete" || e.key === "Backspace") {
      e.preventDefault()
      removeStop(id)
    }
  }

  const canRemove = gradient.stops.length > 2

  return (
    <div data-slot="color-picker-gradient" className={cn("flex flex-col gap-3", className)}>
      <div
        ref={barRef}
        className={slots.gradientBar()}
        style={CHECKER_STYLE}
        onPointerDown={handleTrackPointerDown}
        role="group"
        aria-label="Gradient stops"
      >
        <span
          className={slots.gradientFill({ className: "pointer-events-none" })}
          style={{ backgroundImage: stopsToBarCss(gradient.stops) }}
        />
        {gradient.stops.map((stop) => (
          <button
            key={stop.id}
            type="button"
            data-slot="color-picker-gradient-stop"
            data-active={stop.id === activeStopId}
            aria-label={`Color stop at ${Math.round(stop.position)}%${canRemove ? ", press Delete to remove" : ""}`}
            className={slots.gradientStop()}
            style={{ left: `${stop.position}%`, backgroundColor: stop.color }}
            onPointerDown={(e) => handleStopPointerDown(e, stop.id)}
            onPointerMove={(e) => handleStopPointerMove(e, stop.id)}
            onKeyDown={(e) => handleStopKeyDown(e, stop.id, stop.position)}
          />
        ))}
      </div>

      <div className={slots.gradientControls()}>
        <ToggleGroup
          type="single"
          size="sm"
          value={gradient.type}
          onValueChange={(next) => next && setGradientType(next as GradientType)}
          aria-label="Gradient type"
        >
          <ToggleGroupItem value="linear">Linear</ToggleGroupItem>
          <ToggleGroupItem value="radial">Radial</ToggleGroupItem>
        </ToggleGroup>

        {gradient.type === "linear" && (
          <div className={slots.angleRail()}>
            <SliderPrimitive.Root
              className={slots.sliderRoot()}
              min={0}
              max={360}
              step={1}
              value={[gradient.angle]}
              onValueChange={([a]) => setGradientAngle(a)}
              aria-label="Gradient angle"
            >
              <SliderPrimitive.Track className={slots.sliderTrack({ className: "bg-muted ring-black/5" })}>
                <SliderPrimitive.Range className="absolute h-full rounded-full bg-brand/30" />
              </SliderPrimitive.Track>
              <SliderPrimitive.Thumb className={slots.sliderThumb({ className: "bg-background" })} />
            </SliderPrimitive.Root>
            <span className={slots.angleValue()}>{Math.round(gradient.angle)}°</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── ColorPickerImage (upload / URL fill) ───────────────────────────────────────────

/** The image fill: an upload dropzone (or live preview once chosen), a URL field, and a fit toggle. */
export function ColorPickerImage({ className }: { className?: string }) {
  const { image, setImage, slots } = useColorPickerContext("ColorPickerImage")
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [urlDraft, setUrlDraft] = React.useState("")

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    const onLoad = () => setImage({ src: String(reader.result) })
    reader.onload = onLoad
    reader.readAsDataURL(file)
    // Clear so re-picking the same file fires `change` again.
    e.target.value = ""
  }

  function commitUrl() {
    const next = urlDraft.trim()
    if (next) setImage({ src: next })
  }

  return (
    <div data-slot="color-picker-image" className={cn("flex flex-col gap-3", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
        aria-hidden
        tabIndex={-1}
      />

      {image.src ? (
        <div className={slots.imagePreview()} style={CHECKER_STYLE}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.src}
            alt=""
            className={cn("size-full", image.fit === "cover" ? "object-cover" : "object-contain")}
          />
          <button
            type="button"
            className={slots.imageRemove()}
            onClick={() => setImage({ src: "" })}
            aria-label="Remove image"
          >
            <X weight="bold" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className={slots.imageDropzone()}
          onClick={() => fileInputRef.current?.click()}
        >
          <UploadSimple />
          <span className="text-sm font-medium text-foreground">Upload image</span>
          <span className="text-xs">or paste a URL below</span>
        </button>
      )}

      <div className={slots.inputRow()}>
        <InputRoot size="sm" className="flex-1">
          <InputPrefix>
            <ImageSquare className="size-4" />
          </InputPrefix>
          <InputField
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onBlur={commitUrl}
            onKeyDown={(e) => e.key === "Enter" && commitUrl()}
            placeholder="https://…"
            spellCheck={false}
            autoComplete="off"
            aria-label="Image URL"
          />
        </InputRoot>
      </div>

      {image.src && (
        <ToggleGroup
          type="single"
          size="sm"
          value={image.fit}
          onValueChange={(next) => next && setImage({ fit: next as ColorPickerImageFit })}
          className={slots.modes()}
          aria-label="Image fit"
        >
          <ToggleGroupItem value="cover" className={slots.modeItem()}>
            Cover
          </ToggleGroupItem>
          <ToggleGroupItem value="contain" className={slots.modeItem()}>
            Contain
          </ToggleGroupItem>
        </ToggleGroup>
      )}
    </div>
  )
}

// ─── Popover wrappers ─────────────────────────────────────────────────────────────────

export const ColorPickerPopover = PopoverPrimitive.Root
export const ColorPickerTrigger = PopoverPrimitive.Trigger

/**
 * A ready-made trigger swatch: a button showing the current color over a checkerboard. Wrap it in
 * `ColorPickerTrigger asChild` to open the panel. Pass the same `value` you give the picker.
 */
export interface ColorPickerTriggerSwatchProps
  extends Omit<React.ComponentProps<"button">, "value">,
    VariantProps<typeof colorPickerVariants> {
  value: string
}

export function ColorPickerTriggerSwatch({
  value,
  className,
  density,
  ...props
}: ColorPickerTriggerSwatchProps) {
  const slots = colorPickerVariants({ density: useDensity(density) })
  return (
    <button
      type="button"
      data-slot="color-picker-trigger-swatch"
      className={slots.trigger({ className })}
      style={CHECKER_STYLE}
      {...props}
    >
      <span className="absolute inset-0" style={{ backgroundColor: value }} />
    </button>
  )
}

export interface ColorPickerContentProps
  extends React.ComponentProps<typeof PopoverPrimitive.Content>,
    VariantProps<typeof colorPickerVariants> {}

/** Portals a ColorPicker panel into a positioned, animated popover. */
export function ColorPickerContent({
  className,
  align = "start",
  sideOffset = 8,
  density,
  children,
  ...props
}: ColorPickerContentProps) {
  const slots = colorPickerVariants({ density: useDensity(density) })
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="color-picker-content"
        align={align}
        sideOffset={sideOffset}
        className={slots.content({ className })}
        {...props}
      >
        {children}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}
