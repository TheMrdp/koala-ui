"use client"

import { Lightbox, LightboxTrigger, type LightboxImage } from "@/components/ui/lightbox"

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`

const IMAGES: LightboxImage[] = [
  { src: img("1486312338219-ce68d2c6f44d"), alt: "Landing page concept on a laptop" },
  { src: img("1498050108023-c5249f4df085"), alt: "Code-forward product homepage" },
  { src: img("1467232004584-a241de8bcf5d"), alt: "Minimal hero layout workspace" },
  { src: img("1522202176988-66273c2fd55f"), alt: "Team collaborating in an office" },
  { src: img("1460925895917-afdab827c52f"), alt: "Analytics dashboard layout" },
  { src: img("1497032628192-86f99bcd76bc"), alt: "Open office careers page" },
]

/** A thumbnail grid whose tiles open the full-screen viewer. Arrows, thumbnails, and ←/→ work. */
export function LightboxDemo() {
  return (
    <Lightbox images={IMAGES}>
      <div className="grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
        {IMAGES.map((image, i) => (
          <LightboxTrigger
            key={image.src}
            index={i}
            className="aspect-[4/3] rounded-xl border border-border bg-card shadow-xs"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt ?? ""}
              draggable={false}
              loading="lazy"
              className="size-full select-none object-cover"
            />
          </LightboxTrigger>
        ))}
      </div>
    </Lightbox>
  )
}

/** A single trigger opening a one-image viewer (no arrows / thumbnails when there's one image). */
export function LightboxSingleDemo() {
  const single = [IMAGES[0]]
  return (
    <Lightbox images={single}>
      <LightboxTrigger
        index={0}
        label="See project"
        className="aspect-video w-full max-w-md rounded-xl border border-border bg-card shadow-xs"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={single[0].src}
          alt={single[0].alt ?? ""}
          draggable={false}
          className="size-full select-none object-cover"
        />
      </LightboxTrigger>
    </Lightbox>
  )
}
