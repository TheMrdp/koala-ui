"use client"

import * as React from "react"
import { ImageSquare, ChartBar, MapPin, Camera } from "@phosphor-icons/react"

import {
  Carousel,
  CarouselContent,
  CarouselSlide,
  CarouselPrevious,
  CarouselNext,
  CarouselIndicators,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

const SLIDES = [
  { id: "a", icon: ImageSquare, label: "Slide one" },
  { id: "b", icon: ChartBar, label: "Slide two" },
  { id: "c", icon: MapPin, label: "Slide three" },
  { id: "d", icon: Camera, label: "Slide four" },
]

function Slide({ icon: Icon, label }: { icon: typeof ImageSquare; label: string }) {
  return (
    <div className="flex aspect-[16/9] flex-col items-center justify-center gap-3 bg-gradient-to-br from-accent to-muted text-muted-foreground">
      <Icon className="size-10" aria-hidden />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}

/** Uncontrolled: click a dot or focus the carousel and press ←/→. */
export function BasicDemo() {
  return (
    <Carousel className="w-full max-w-sm" label="Demo carousel">
      <CarouselContent>
        {SLIDES.map(({ id, icon, label }) => (
          <CarouselSlide key={id}>
            <Slide icon={icon} label={label} />
          </CarouselSlide>
        ))}
      </CarouselContent>
      <CarouselIndicators />
    </Carousel>
  )
}

// Rich gradient "photos" so the white overlay dots/arrows read on a dark surface without
// shipping real image assets. With real <img>s, add the 1px image outline (principle #11).
const PHOTOS = [
  { id: "a", from: "from-indigo-500", to: "to-purple-700", label: "Detective Bureau" },
  { id: "b", from: "from-sky-500", to: "to-cyan-700", label: "Evidence Room" },
  { id: "c", from: "from-amber-500", to: "to-rose-700", label: "Briefing" },
  { id: "d", from: "from-emerald-500", to: "to-teal-700", label: "Field Unit" },
]

/** Card / image carousel: arrows reveal on hover, dots float bottom-right over the image. */
export function ImageCardDemo() {
  return (
    <Carousel className="w-full max-w-sm" label="Photo gallery">
      <CarouselContent>
        {PHOTOS.map(({ id, from, to, label }) => (
          <CarouselSlide key={id}>
            <div
              className={`flex aspect-[4/3] items-end bg-gradient-to-br ${from} ${to} p-4`}
            >
              <span className="text-sm font-semibold text-white drop-shadow">{label}</span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselIndicators overlay />
    </Carousel>
  )
}

const VARIANTS = ["dots", "lines", "fraction", "thumbnails"] as const

// A 100-slide set for the fraction cell so its odometer crosses the 99 -> 100 digit boundary and
// the smooth width-grow is visible. Reuses the gallery icons, cycling through them.
const FRACTION_SLIDES = Array.from({ length: 100 }, (_, i) => ({
  id: `fraction-${i}`,
  icon: SLIDES[i % SLIDES.length].icon,
  label: `Slide ${i + 1}`,
}))

/**
 * One closed set of indicator forms, all driven by the same `variant` prop. Positioning
 * (`overlay`/`align`) is orthogonal and composes with each. Never hand-roll a new indicator.
 */
export function IndicatorVariantsDemo() {
  return (
    <div className="grid w-full gap-8 sm:grid-cols-2">
      {VARIANTS.map((variant) => {
        // Fraction isn't per-slide clickable and shines on big counts: give it a 100-slide gallery
        // starting at 99/100 (hover-reveal arrows to navigate) so the odometer roll + smooth
        // width-grow show. The others stay on the shared 4-slide set, navigated by their indicator.
        const isFraction = variant === "fraction"
        const slides = isFraction ? FRACTION_SLIDES : SLIDES
        return (
          <div key={variant} className="flex flex-col gap-2">
            <span className="text-xs font-medium text-muted-foreground">{variant}</span>
            <Carousel
              className="w-full"
              label={`${variant} indicator`}
              defaultIndex={isFraction ? slides.length - 2 : 0}
            >
              <CarouselContent>
                {slides.map(({ id, icon, label }) => (
                  <CarouselSlide key={id}>
                    <Slide icon={icon} label={label} />
                  </CarouselSlide>
                ))}
              </CarouselContent>
              {isFraction && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
              <CarouselIndicators
                variant={variant}
                thumbnails={
                  variant === "thumbnails"
                    ? SLIDES.map(({ id, icon: Icon }) => (
                        <div
                          key={id}
                          className="flex size-full items-center justify-center bg-gradient-to-br from-accent to-muted text-muted-foreground"
                        >
                          <Icon className="size-4" aria-hidden />
                        </div>
                      ))
                    : undefined
                }
              />
            </Carousel>
          </div>
        )
      })}
    </div>
  )
}

/** Overlay indicator floating over a full-bleed hero: white dots bottom-centered. */
export function OverlayHeroDemo() {
  return (
    <Carousel className="w-full max-w-md" label="Hero, centered dots">
      <CarouselContent>
        {PHOTOS.map(({ id, from, to, label }) => (
          <CarouselSlide key={id}>
            <div className={`flex aspect-video items-end bg-gradient-to-br ${from} ${to} p-4`}>
              <span className="text-sm font-semibold text-white drop-shadow">{label}</span>
            </div>
          </CarouselSlide>
        ))}
      </CarouselContent>
      <CarouselIndicators overlay align="center" />
    </Carousel>
  )
}

/** Controlled: drive `index` from your own state and external buttons. */
export function ControlledDemo() {
  const [index, setIndex] = React.useState(0)
  const last = SLIDES.length - 1

  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <Carousel index={index} onIndexChange={setIndex} label="Controlled carousel">
        <CarouselContent>
          {SLIDES.map(({ id, icon, label }) => (
            <CarouselSlide key={id}>
              <Slide icon={icon} label={label} />
            </CarouselSlide>
          ))}
        </CarouselContent>
        <CarouselIndicators />
      </Carousel>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          disabled={index <= 0}
          onClick={() => setIndex((i) => i - 1)}
        >
          Previous
        </Button>
        <span className="text-sm tabular-nums text-muted-foreground">
          {index + 1} / {SLIDES.length}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={index >= last}
          onClick={() => setIndex((i) => i + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
