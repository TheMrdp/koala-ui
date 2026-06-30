"use client"

import * as React from "react"
import { Dialog as DialogPrimitive, Slot } from "radix-ui"
import { X, CaretLeft, CaretRight } from "@phosphor-icons/react"

import { createContext } from "@/lib/create-context"
import { cn } from "@/lib/utils"
import { tv } from "@/lib/tv"

/**
 * Lightbox: a full-screen, browsable image viewer over Radix Dialog (focus trap, scroll lock,
 * Esc, a11y, enter/exit animations via Presence). Pattern: one `tv` recipe with `slots`, shared
 * through a typed React Context. See docs/ARCHITECTURE.md §2.
 *
 * Give it the image list once (`images`); `LightboxTrigger` opens the viewer at an index. The
 * viewer owns navigation (arrow buttons, ←/→ keys, a thumbnail rail, a counter) and loops. It
 * opens with a clean fade + soft zoom (no morph), and the chrome is a fixed dark wash (not theme
 * tokens) because it always sits over a photo, like the Dialog overlay.
 *
 * Pairs with `Gallery`: wrap a `GalleryItem action="…"` in a `LightboxTrigger asChild` so each
 * tile reveals its pill on hover and opens the viewer on click.
 */
export interface LightboxImage {
  src: string
  alt?: string
}

export const lightboxVariants = tv({
  slots: {
    // Dark scrim, fading via Radix Presence (data-state).
    overlay: [
      "fixed inset-0 z-50 bg-black/90",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "duration-base ease-out",
    ],
    // Full-screen click-to-close layer. The image + thumbnail rail are centered together as a
    // group (gap-3 between them) so the rail sits just under the image, not pinned to the floor.
    content: [
      "fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 px-4 py-4 cursor-zoom-out outline-none",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "duration-base ease-out",
    ],
    // The active image: sized to its own pixels (no letterbox bars), with a faint outline so a
    // light photo doesn't bleed into the black. Soft zoom-in on enter / per-image crossfade.
    image: [
      "h-auto w-auto max-h-[78vh] max-w-[90vw] min-h-0 rounded-lg object-contain shadow-2xl ring-1 ring-inset ring-white/10",
      "motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:duration-base motion-safe:ease-out",
    ],
    // Shared round, dark control (close + arrows): ≥40px, tactile press.
    control: [
      "inline-flex size-10 cursor-pointer items-center justify-center rounded-full",
      "bg-white/10 text-white backdrop-blur-sm transition-[background-color,transform] duration-fast ease-out",
      "hover:bg-white/20 active:scale-[0.96]",
      "outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
      "disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-5 [&_svg]:shrink-0",
    ],
    close: "absolute right-4 top-4 z-10",
    counter:
      "absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white tabular-nums backdrop-blur-sm",
    arrow: "absolute top-1/2 z-10 -translate-y-1/2",
    // Thumbnail rail. `relative w-max gap-2` so the gliding ring's left-0 origin lines up with
    // the first tile (equal-width tiles separated by gap-2), mirroring the Carousel.
    thumbs: "relative flex w-max shrink-0 items-center gap-2",
    thumb: [
      "relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden rounded-md",
      "opacity-50 transition-[opacity] duration-fast ease-out hover:opacity-100",
      "outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-brand",
      "data-[active=true]:opacity-100",
    ],
    // The single white ring that GLIDES between thumbnails (equal-width w-20 tiles + gap-2),
    // instead of a per-tile toggle — a fluid selection frame.
    thumbRing:
      "pointer-events-none absolute left-0 top-0 z-10 h-14 w-20 rounded-md ring-2 ring-white transition-transform duration-base ease-out motion-reduce:transition-none",
    thumbImage: "size-full object-cover",
    // ── Trigger tile (non-asChild): the image + its hover/focus pill ──────────────────────
    // The tile NEVER moves or scales — the only affordance is the pill fading in. Frame
    // (radius/border/aspect) is left to the consumer's className.
    trigger: [
      "group relative block cursor-pointer overflow-hidden",
      "outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    ],
    scrim:
      "pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-base ease-out group-hover:bg-black/30 group-focus-visible:bg-black/30",
    badgeLayer: "pointer-events-none absolute inset-0 grid place-items-center",
    badge: [
      "inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white shadow-md backdrop-blur-sm",
      // Settle-in with a gentle spring overshoot (a pelín de bounce), in place — no layout shift.
      "scale-90 opacity-0 transition-[opacity,transform] duration-base ease-spring",
      "group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100",
      "[&_svg]:size-3.5 [&_svg]:shrink-0",
    ],
  },
})

type LightboxSlots = ReturnType<typeof lightboxVariants>

const [LightboxProvider, useLightboxContext] = createContext<{
  images: LightboxImage[]
  index: number
  openAt: (index: number) => void
  close: () => void
  go: (delta: number) => void
  goTo: (index: number) => void
  slots: LightboxSlots
}>("Lightbox")

export interface LightboxProps {
  images: LightboxImage[]
  children?: React.ReactNode
  /** Controlled open state. Omit for uncontrolled. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Index to open at first (uncontrolled). @default 0 */
  defaultIndex?: number
}

export function Lightbox({ images, children, open: openProp, onOpenChange, defaultIndex = 0 }: LightboxProps) {
  const [openState, setOpenState] = React.useState(false)
  const [index, setIndex] = React.useState(defaultIndex)
  const slots = lightboxVariants()

  const open = openProp ?? openState
  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next)
      if (openProp === undefined) setOpenState(next)
    },
    [onOpenChange, openProp],
  )

  const openAt = React.useCallback(
    (i: number) => {
      setIndex(i)
      setOpen(true)
    },
    [setOpen],
  )
  const close = React.useCallback(() => setOpen(false), [setOpen])
  // Loop both ways so the arrows never dead-end.
  const go = React.useCallback(
    (delta: number) => setIndex((i) => (images.length ? (i + delta + images.length) % images.length : 0)),
    [images.length],
  )
  const goTo = React.useCallback((i: number) => setIndex(i), [])

  return (
    <LightboxProvider
      images={images}
      index={index}
      openAt={openAt}
      close={close}
      go={go}
      goTo={goTo}
      slots={slots}
    >
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        {children}
        <LightboxViewport />
      </DialogPrimitive.Root>
    </LightboxProvider>
  )
}

export interface LightboxTriggerProps extends React.ComponentProps<"button"> {
  /** Index into the Lightbox `images` list to open at. */
  index: number
  /**
   * Render onto the single child element (e.g. a `GalleryItem`) instead of a bare button. When
   * `asChild`, this trigger draws no pill — the wrapping element owns the hover affordance
   * (e.g. `GalleryItem action`), so set the label there instead.
   */
  asChild?: boolean
  /**
   * The hover/focus pill shown over the image (the only affordance — the tile never moves or
   * scales). Pass `null` to hide it. Ignored when `asChild`. @default "See image"
   */
  label?: React.ReactNode
}

/** Opens the viewer at `index`. Use `asChild` to make any tile (e.g. a GalleryItem) the trigger. */
export function LightboxTrigger({
  index,
  asChild = false,
  label = "See image",
  className,
  onClick,
  children,
  ...props
}: LightboxTriggerProps) {
  const { openAt, slots } = useLightboxContext("LightboxTrigger")
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event)
    if (!event.defaultPrevented) openAt(index)
  }

  // asChild: merge open-on-click onto the consumer's element (it brings its own pill/frame).
  if (asChild) {
    return (
      <Slot.Root data-slot="lightbox-trigger" className={className} onClick={handleClick} {...props}>
        {children}
      </Slot.Root>
    )
  }

  return (
    <button
      type="button"
      data-slot="lightbox-trigger"
      className={slots.trigger({ className })}
      onClick={handleClick}
      {...props}
    >
      {children}
      {label != null && (
        <>
          <span aria-hidden className={slots.scrim()} />
          <span aria-hidden className={slots.badgeLayer()}>
            <span className={slots.badge()}>{label}</span>
          </span>
        </>
      )}
    </button>
  )
}

/** The viewer itself: rendered by `Lightbox`, you never place it yourself. */
function LightboxViewport() {
  const { images, index, close, go, goTo, slots } = useLightboxContext("LightboxViewport")
  const image = images[index]
  const multiple = images.length > 1

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className={slots.overlay()} />
      <DialogPrimitive.Content
        data-slot="lightbox-content"
        className={slots.content()}
        onClick={close}
        onKeyDown={(event) => {
          if (!multiple) return
          if (event.key === "ArrowRight") {
            event.preventDefault()
            go(1)
          } else if (event.key === "ArrowLeft") {
            event.preventDefault()
            go(-1)
          }
        }}
        aria-label="Image viewer"
      >
        {/* Radix wants a titled, described dialog; keep them for SR users without showing chrome. */}
        <DialogPrimitive.Title className="sr-only">Image viewer</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">
          {image?.alt || `Image ${index + 1} of ${images.length}`}
        </DialogPrimitive.Description>

        {multiple && (
          <span className={slots.counter()}>
            {index + 1} / {images.length}
          </span>
        )}

        <DialogPrimitive.Close aria-label="Close" className={slots.close({ className: slots.control() })}>
          <X />
        </DialogPrimitive.Close>

        {multiple && (
          <button
            type="button"
            aria-label="Previous image"
            className={slots.arrow({ className: cn(slots.control(), "left-3 sm:left-5") })}
            onClick={(event) => {
              event.stopPropagation()
              go(-1)
            }}
          >
            <CaretLeft />
          </button>
        )}

        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={image.src}
            src={image.src}
            alt={image.alt ?? ""}
            draggable={false}
            className={slots.image()}
            onClick={(event) => event.stopPropagation()}
          />
        )}

        {multiple && (
          <button
            type="button"
            aria-label="Next image"
            className={slots.arrow({ className: cn(slots.control(), "right-3 sm:right-5") })}
            onClick={(event) => {
              event.stopPropagation()
              go(1)
            }}
          >
            <CaretRight />
          </button>
        )}

        {multiple && (
          <div className={slots.thumbs()} onClick={(event) => event.stopPropagation()}>
            {/* Single white ring that glides to the active tile: tile width (100%) + gap-2 per step. */}
            <span
              aria-hidden
              className={slots.thumbRing()}
              style={{ transform: `translateX(calc((100% + 0.5rem) * ${index}))` }}
            />
            {images.map((thumb, i) => (
              <button
                key={thumb.src}
                type="button"
                data-active={i === index}
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                className={slots.thumb()}
                onClick={() => goTo(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb.src}
                  alt=""
                  draggable={false}
                  loading="lazy"
                  className={slots.thumbImage()}
                />
              </button>
            ))}
          </div>
        )}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
