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

/** Uncontrolled — click a dot or focus the carousel and press ←/→. */
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

/** Card / image carousel — arrows reveal on hover, dots float bottom-right over the image. */
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

/** Controlled — drive `index` from your own state and external buttons. */
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
