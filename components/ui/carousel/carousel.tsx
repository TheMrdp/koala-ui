"use client"

import * as React from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"

import { cn } from "@/lib/utils"
import { createContext } from "@/lib/create-context"
import { tv } from "@/lib/tv"
import { Button } from "@/components/ui/button"

/**
 * Carousel: a horizontal slide viewer with clickable indicator dots ("pagination bullets").
 * Pattern: one `tv` recipe with `slots`, shared state (active index, slide count) flowing to
 * every part through React Context, never prop-drilled. See docs/ARCHITECTURE.md §2.
 *
 * Controlled (`index` + `onIndexChange`) or uncontrolled (`defaultIndex`). The track is a
 * single flex row translated by `index * 100%`; ArrowLeft/Right step it while the region is
 * focused. Distinct from {@link Pagination}, which is the data-table page toolbar.
 */
export const carouselVariants = tv({
  slots: {
    // `group` lets the overlay arrows reveal on hover of the whole carousel; `relative`
    // anchors the overlay arrows and (when `overlay`) the indicators to the image bounds.
    root: "group relative flex flex-col gap-3",
    // Concentric with the surface it sits on; clips the sliding track.
    viewport: "overflow-hidden rounded-lg",
    // Specific transition (never `transition: all`); honors reduced-motion.
    track: "flex transition-transform duration-base ease-out motion-reduce:transition-none",
    slide: "min-w-0 shrink-0 grow-0 basis-full",
    indicators: "flex items-center justify-center gap-1.5",
    // A dot that morphs into a pill when active (dots) or a fixed thin tick (lines). Height/width
    // come from the `variant` slot; this base owns color, transition, focus and the hit target.
    indicator: [
      "cursor-pointer rounded-full bg-border",
      "transition-[width,background-color] duration-base ease-out",
      "hover:bg-muted-foreground/40",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      // polish: a 40px-tall transparent hit target. Extends vertically
      // into free space; horizontally it fills only to the gap midpoint (half of gap-1.5 = 3px
      // each side) so the whole row is clickable with no dead zones and adjacent dots never overlap.
      "relative before:absolute before:-inset-x-[3px] before:top-1/2 before:h-10 before:-translate-y-1/2 before:content-['']",
    ],
    // A contained "2 / 5" readout. tabular-nums so digits never jitter; the active number rolls
    // (vertical odometer) and the window WIDTH stays compact to the current number, animating by
    // one digit-width when the count gains/loses a digit (99 -> 100) so the pill grows smoothly.
    fraction:
      "inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground tabular-nums",
    // Window over the active number: width = current digit count (in `ch`), animated; clips the
    // taller rolling column to a single line.
    fractionRoll:
      "relative inline-block h-[1em] overflow-hidden transition-[width] duration-base ease-out motion-reduce:transition-none",
    // The rolling column, right-anchored so the units stay put under the "/". An explicit max-digit
    // width sidesteps absolute shrink-to-fit; translateY rolls it one row per slide.
    fractionRollTrack:
      "absolute right-0 top-0 flex flex-col items-end transition-transform duration-base ease-out motion-reduce:transition-none",
    fractionDigit: "flex h-[1em] items-center leading-none tabular-nums",
    // A slide preview tile; the rest dim until hover. The brand selection ring is a separate
    // gliding element (`thumbRing`), not a per-tile toggle. 40px tall.
    thumb: [
      "relative h-10 w-14 shrink-0 cursor-pointer overflow-hidden rounded-md bg-muted",
      "ring-2 ring-transparent transition-[opacity,box-shadow,transform] duration-base ease-out",
      "active:scale-[0.96]",
      "outline-none focus-visible:ring-brand",
      "[&>img]:size-full [&>img]:object-cover",
      // image-outline polish (#11): a 1px inset edge in pure black/white (never a tinted neutral)
      // so thumbnails read as framed; flips to white in dark/moonlight so it never looks like dirt.
      "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:ring-1 after:ring-inset after:ring-black/10 dark:after:ring-white/10",
    ],
    // The single brand ring that GLIDES between thumbnails (equal-width tiles separated by gap-2),
    // so selection reads as one moving frame. Sits above the tiles and ignores pointer events.
    thumbRing:
      "pointer-events-none absolute left-0 top-0 z-10 h-10 w-14 rounded-md ring-2 ring-brand transition-transform duration-base ease-out motion-reduce:transition-none",
    // Overlay-only overrides layered onto an icon-only <Button>: position it on the image edge,
    // make it a circle, and swap the variant fill for a translucent blurred surface that stays
    // legible on any photo. Behavior (press scale, focus ring, 40px hit, icon sizing) all comes
    // from Button. Sits OUTSIDE the viewport's clip (root child) so it never gets cropped.
    arrow: [
      "absolute top-1/2 z-10 -translate-y-1/2 rounded-full",
      "bg-background/80 text-foreground shadow-md backdrop-blur-sm",
      "hover:bg-background hover:text-foreground",
    ],
  },
  variants: {
    // Active is COLOR only (fill on dots/lines; the ring for thumbnails lives in the compounds).
    // Each form owns its own size/shape so the dot's pill-morph never leaks into lines.
    active: {
      true: { indicator: "bg-foreground hover:bg-foreground" },
      false: {},
    },
    // The visual form of the indicator. Positioning (`overlay`/`align`) is orthogonal and composes
    // with every form. CarouselIndicators branches its rendering on this; see below.
    variant: {
      dots: { indicator: "h-1.5" },
      lines: { indicator: "h-0.5 w-6" },
      fraction: {},
      // `relative` anchors the gliding thumbRing; `mx-auto w-max` shrinks the row to its tiles and
      // centers it, so the ring's left-0 origin lines up with the first tile.
      thumbnails: { indicators: "relative mx-auto w-max gap-2" },
    },
    side: {
      left: { arrow: "left-2" },
      right: { arrow: "right-2" },
    },
    // Pointer-drag affordance: a grab cursor and `touch-action: pan-y` so the browser keeps
    // vertical page scrolling while we own the horizontal axis. `select-none` stops text/image
    // selection from fighting the drag.
    draggable: {
      true: { viewport: "cursor-grab touch-pan-y select-none" },
      false: {},
    },
    // While the finger/pointer is down we translate the track 1:1, so the snap transition must
    // be off (it re-enables on release to animate the settle). Cursor flips to grabbing.
    dragging: {
      true: { viewport: "cursor-grabbing", track: "transition-none" },
      false: {},
    },
    // Float the dots over the image instead of below it. Over arbitrary photos the theme tokens
    // can vanish, so the overlay dots switch to fixed white (same rationale as the dialog scrim);
    // see the compounds below. Horizontal placement comes from `align`.
    overlay: {
      true: { indicators: "absolute bottom-3 z-10" },
      false: {},
    },
    // Only meaningful under `overlay`: where the floating dots sit on the image. `end` (default)
    // tucks them bottom-right for cards/thumbnails; `center` bottom-centers them for full-bleed
    // heroes. Without `overlay` the dots sit below the image and `justify-center` already centers
    // them, so this is a no-op there (compounds gate on overlay:true).
    align: {
      end: {},
      center: {},
    },
  },
  compoundVariants: [
    // Dots morph width with active state; lines keep their fixed width and only swap color.
    { variant: "dots", active: true, class: { indicator: "w-5" } },
    { variant: "dots", active: false, class: { indicator: "w-1.5" } },
    // Overlay dots/lines switch to fixed white (theme tokens can vanish over a photo).
    { overlay: true, active: true, class: { indicator: "bg-white shadow-sm hover:bg-white" } },
    { overlay: true, active: false, class: { indicator: "bg-white/50 shadow-sm hover:bg-white/70" } },
    // Thumbnails: ring the active preview, dim the rest until hover.
    // Active is full opacity; the brand frame is the gliding thumbRing, not a per-tile ring.
    { variant: "thumbnails", active: true, class: { thumb: "opacity-100" } },
    { variant: "thumbnails", active: false, class: { thumb: "opacity-60 hover:opacity-100" } },
    // Fraction over a photo goes white the same way the dots do.
    {
      variant: "fraction",
      overlay: true,
      class: { fraction: "bg-black/55 text-white shadow-sm backdrop-blur-sm" },
    },
    // Overlay placement for dots/lines/fraction/thumbnails.
    { overlay: true, align: "end", class: { indicators: "right-3" } },
    { overlay: true, align: "center", class: { indicators: "left-1/2 -translate-x-1/2" } },
  ],
})

type CarouselSlots = ReturnType<typeof carouselVariants>

type CarouselContextValue = {
  index: number
  count: number
  setIndex: (i: number) => void
  slots: CarouselSlots
}

const [CarouselProvider, useCarouselContext] =
  createContext<CarouselContextValue>("Carousel")

/** Count the slides by finding the CarouselContent child and measuring its children. */
function countSlides(children: React.ReactNode): number {
  let count = 0
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === CarouselContent) {
      const content = child as React.ReactElement<CarouselContentProps>
      count = React.Children.toArray(content.props.children).length
    }
  })
  return count
}

// ─── Carousel (root) ────────────────────────────────────────────────────────────

export interface CarouselProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  /** Controlled active slide, 0-based. */
  index?: number
  /** Initial slide when uncontrolled. @default 0 */
  defaultIndex?: number
  /** Called with the next (clamped) index on navigation. */
  onIndexChange?: (index: number) => void
  /** Accessible label for the carousel region. @default "Carousel" */
  label?: string
}

export function Carousel({
  index: indexProp,
  defaultIndex = 0,
  onIndexChange,
  label = "Carousel",
  className,
  children,
  ...props
}: CarouselProps) {
  // Count slides synchronously from the CarouselContent child so the dots render on the
  // server too (an effect-set count would leave SSR with zero dots until hydration).
  const count = React.useMemo(() => countSlides(children), [children])
  const [uncontrolled, setUncontrolled] = React.useState(defaultIndex)
  const isControlled = indexProp != null
  const index = isControlled ? indexProp : uncontrolled

  const setIndex = React.useCallback(
    (i: number) => {
      const max = Math.max(count - 1, 0)
      const clamped = Math.min(Math.max(i, 0), max)
      if (!isControlled) setUncontrolled(clamped)
      onIndexChange?.(clamped)
    },
    [count, isControlled, onIndexChange],
  )

  const slots = carouselVariants()

  return (
    <CarouselProvider index={index} count={count} setIndex={setIndex} slots={slots}>
      <div
        data-slot="carousel"
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
        className={slots.root({ className })}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault()
            setIndex(index - 1)
          } else if (e.key === "ArrowRight") {
            e.preventDefault()
            setIndex(index + 1)
          }
        }}
        {...props}
      >
        {children}
      </div>
    </CarouselProvider>
  )
}

// ─── CarouselContent: viewport + sliding track ──────────────────────────────────

export interface CarouselContentProps extends React.ComponentProps<"div"> {
  /** Enable mouse/touch drag-to-swipe. @default true */
  draggable?: boolean
}

/**
 * Clips the track and translates it to the active slide. Children must be `CarouselSlide`s.
 *
 * Drag-to-swipe (when `draggable`): Pointer Events on the stationary viewport (so the moving
 * track never loses the pointer) with `setPointerCapture`. We wait for ~8px of mostly-horizontal
 * travel before claiming the gesture; vertical drags stay scrolls. The track follows the finger
 * 1:1 (transition off); past a width-relative threshold on release we step a slide, otherwise it
 * snaps back. Rubber-band resistance past the first/last slide signals the bound. A real drag
 * suppresses the trailing click so a swipe never fires a link inside a slide.
 */
export function CarouselContent({ className, children, draggable = true, ...props }: CarouselContentProps) {
  const { slots, index, count, setIndex } = useCarouselContext("CarouselContent")
  const [dragging, setDragging] = React.useState(false)
  const [offset, setOffset] = React.useState(0)
  // Transient gesture bookkeeping: read/written only in handlers, never during render.
  const drag = React.useRef<{
    pointerId: number
    startX: number
    startY: number
    width: number
    offset: number
    active: boolean
  } | null>(null)
  const didDrag = React.useRef(false)

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Ignore secondary/middle buttons and single-slide carousels; let those clicks through.
    if (!draggable || count <= 1 || (e.pointerType === "mouse" && e.button !== 0)) return
    drag.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      width: e.currentTarget.getBoundingClientRect().width,
      offset: 0,
      active: false,
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    const dx = e.clientX - d.startX
    const dy = e.clientY - d.startY
    if (!d.active) {
      // Not yet committed: bail until the gesture reads as a horizontal swipe, leaving
      // vertical/ambiguous moves to the browser's scroll.
      if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return
      d.active = true
      didDrag.current = true
      e.currentTarget.setPointerCapture(e.pointerId)
      setDragging(true)
    }
    // Rubber-band: only a third of the travel registers when dragging past either end.
    const overscroll = (index <= 0 && dx > 0) || (index >= count - 1 && dx < 0)
    d.offset = overscroll ? dx * 0.35 : dx
    setOffset(d.offset)
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    drag.current = null
    if (d.active) {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId)
      }
      const threshold = Math.max(40, d.width * 0.15)
      if (d.offset <= -threshold) setIndex(index + 1)
      else if (d.offset >= threshold) setIndex(index - 1)
    }
    setDragging(false)
    setOffset(0)
  }

  function suppressDragClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!didDrag.current) return
    // A completed swipe lands on a child (image/link); swallow the synthetic click it triggers.
    e.preventDefault()
    e.stopPropagation()
    didDrag.current = false
  }

  return (
    <div
      data-slot="carousel-viewport"
      className={slots.viewport({ draggable, dragging })}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClickCapture={suppressDragClick}
      onDragStart={(e) => e.preventDefault()}
    >
      <div
        data-slot="carousel-track"
        className={slots.track({ dragging, className })}
        style={{
          transform: dragging
            ? `translate3d(calc(${-index * 100}% + ${offset}px), 0, 0)`
            : `translateX(${-index * 100}%)`,
        }}
        {...props}
      >
        {children}
      </div>
    </div>
  )
}

// ─── CarouselSlide ────────────────────────────────────────────────────────────────

export type CarouselSlideProps = React.ComponentProps<"div">

export function CarouselSlide({ className, ...props }: CarouselSlideProps) {
  const { slots } = useCarouselContext("CarouselSlide")
  return (
    <div
      data-slot="carousel-slide"
      role="group"
      aria-roledescription="slide"
      className={slots.slide({ className })}
      {...props}
    />
  )
}

// ─── CarouselPrevious / CarouselNext: overlay nav arrows ────────────────────────

export type CarouselArrowProps = Omit<
  React.ComponentProps<typeof Button>,
  "iconOnly" | "size" | "variant"
>

// Reveal-on-hover (and on keyboard focus, for a11y). At a bound the arrow stays inert and
// hidden; `disabled:opacity-0` beats Button's own `disabled:opacity-50` (same variant prefix,
// merged last) for a clean disappear instead of a half-faded dead arrow.
function arrowReveal(disabled: boolean) {
  return disabled
    ? "disabled:opacity-0"
    : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
}

export function CarouselPrevious({ className, ...props }: CarouselArrowProps) {
  const { slots, index, setIndex } = useCarouselContext("CarouselPrevious")
  const disabled = index <= 0
  return (
    <Button
      data-slot="carousel-previous"
      variant="secondary"
      size="lg"
      iconOnly
      tooltip={false}
      aria-label="Previous slide"
      disabled={disabled}
      onClick={() => setIndex(index - 1)}
      className={slots.arrow({ side: "left", className: cn(arrowReveal(disabled), className) })}
      {...props}
    >
      <CaretLeft />
    </Button>
  )
}

export function CarouselNext({ className, ...props }: CarouselArrowProps) {
  const { slots, index, count, setIndex } = useCarouselContext("CarouselNext")
  const disabled = index >= count - 1
  return (
    <Button
      data-slot="carousel-next"
      variant="secondary"
      size="lg"
      iconOnly
      tooltip={false}
      aria-label="Next slide"
      disabled={disabled}
      onClick={() => setIndex(index + 1)}
      className={slots.arrow({ side: "right", className: cn(arrowReveal(disabled), className) })}
      {...props}
    >
      <CaretRight />
    </Button>
  )
}

// ─── CarouselIndicators: dots / lines / fraction / thumbnails ────────────────────

export interface CarouselIndicatorsProps extends React.ComponentProps<"div"> {
  /**
   * Visual form of the indicator. All forms compose with `overlay`/`align`.
   * - `dots` (default): pill-morphing bullets.
   * - `lines`: thin fixed-width ticks.
   * - `fraction`: a contained "2 / 5" readout (not per-slide clickable).
   * - `thumbnails`: one slide preview per slide (pass `thumbnails`).
   * @default "dots"
   */
  variant?: "dots" | "lines" | "fraction" | "thumbnails"
  /** Builds each item's accessible label. @default i => `Go to slide ${i + 1}` */
  dotLabel?: (index: number) => string
  /** Float the indicator over the image (white treatment) instead of below it. */
  overlay?: boolean
  /**
   * Where overlay indicators sit on the image: `end` (bottom-right, good for cards/thumbnails) or
   * `center` (bottom-centered, good for full-bleed heroes). Ignored without `overlay`.
   * @default "end"
   */
  align?: "end" | "center"
  /**
   * One node per slide (e.g. an `<img>`), rendered inside each thumb button. Required by - and only
   * used for - `variant="thumbnails"`; index it to match the slide order.
   */
  thumbnails?: React.ReactNode[]
}

export function CarouselIndicators({
  className,
  variant = "dots",
  dotLabel = (i) => `Go to slide ${i + 1}`,
  overlay = false,
  align = "end",
  thumbnails,
  ...props
}: CarouselIndicatorsProps) {
  const { slots, count, index, setIndex } = useCarouselContext("CarouselIndicators")
  if (count <= 1) return null

  // Fraction is a single readout, not one control per slide.
  if (variant === "fraction") {
    return (
      <div
        data-slot="carousel-indicators"
        className={slots.indicators({ variant, overlay, align, className })}
        {...props}
      >
        <span
          className={slots.fraction({ variant, overlay })}
          aria-label={`Slide ${index + 1} of ${count}`}
        >
          <span
            aria-hidden
            className={slots.fractionRoll()}
            // Width tracks the CURRENT number's digit count so the pill stays compact, then animates
            // when it gains/loses a digit. 1ch == one tabular digit.
            style={{ width: `${String(index + 1).length}ch` }}
          >
            <span
              className={slots.fractionRollTrack()}
              // Roll up one line per slide; the explicit width is the widest number so the column
              // never shrink-to-fits and every row's units align to the right edge.
              style={{
                width: `${String(count).length}ch`,
                transform: `translateY(calc(${index} * -1em))`,
              }}
            >
              {Array.from({ length: count }, (_, i) => (
                <span key={i} className={slots.fractionDigit()}>
                  {i + 1}
                </span>
              ))}
            </span>
          </span>
          <span aria-hidden>/ {count}</span>
        </span>
      </div>
    )
  }

  return (
    <div
      data-slot="carousel-indicators"
      className={slots.indicators({ variant, overlay, align, className })}
      {...props}
    >
      {variant === "thumbnails" && (
        <span
          aria-hidden
          className={slots.thumbRing()}
          // Glide to the active tile: tile width (100%) + gap-2 (0.5rem) per index step.
          style={{ transform: `translateX(calc((100% + 0.5rem) * ${index}))` }}
        />
      )}
      {Array.from({ length: count }, (_, i) => {
        const active = i === index
        const label = dotLabel(i)

        if (variant === "thumbnails") {
          return (
            <button
              key={i}
              type="button"
              aria-label={label}
              aria-current={active || undefined}
              onClick={() => setIndex(i)}
              className={slots.thumb({ variant, active })}
            >
              {thumbnails?.[i]}
            </button>
          )
        }

        // dots & lines: one morphing (dots) or fixed (lines) tick per slide.
        return (
          <button
            key={i}
            type="button"
            aria-label={label}
            aria-current={active || undefined}
            onClick={() => setIndex(i)}
            className={slots.indicator({ variant, active, overlay })}
          />
        )
      })}
    </div>
  )
}
