"use client"

import { Badge } from "@/components/ui/badge"
import {
  SectionHeader,
  SectionHeaderText,
  SectionHeaderHeading,
  SectionHeaderDescription,
} from "@/components/ui/section-header"
import {
  GalleryAccordion,
  GalleryAccordionItem,
  GalleryAccordionTrigger,
  GalleryAccordionPeek,
  GalleryAccordionContent,
  GalleryAccordionCaption,
  GalleryAccordionMedia,
  GalleryAccordionImage,
} from "@/components/ui/gallery"
import { Lightbox, LightboxTrigger, type LightboxImage } from "@/components/ui/lightbox"

const img = (id: string, w = 320) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

type Collection = {
  value: string
  title: string
  tagline: string
  caption: string
  count: number
  photos: { id: string; alt: string }[]
}

const COLLECTIONS: Collection[] = [
  {
    value: "brand",
    title: "Brand refresh",
    tagline: "The new mark, palette, and the system behind it.",
    caption: "A ground-up rebrand: wordmark studies, the final palette, and the guidelines we shipped.",
    count: 18,
    photos: [
      { id: "1561070791-2526d30994b5", alt: "Color palette swatches" },
      { id: "1558655146-9f40138edfeb", alt: "Logo studies on paper" },
      { id: "1626785774573-4b799315345d", alt: "Brand poster mockup" },
      { id: "1572044162444-ad60f128bdea", alt: "Stationery set" },
    ],
  },
  {
    value: "mobile",
    title: "Mobile app",
    tagline: "Onboarding, home, and the moments in between.",
    caption: "The full mobile flow, from first launch to the empty states nobody usually sees.",
    count: 24,
    photos: [
      { id: "1512941937669-90a1b58e7e9c", alt: "Phone on a desk" },
      { id: "1510557880182-3d4d3cba35a5", alt: "App screens" },
      { id: "1556656793-08538906a9f8", alt: "Mobile UI close-up" },
      { id: "1607252650355-f7fd0460ccdb", alt: "Hand holding a phone" },
    ],
  },
  {
    value: "system",
    title: "Design system",
    tagline: "Tokens, components, and the docs that tie them together.",
    caption: "Foundations to finished components: the tokens, the recipes, and the documentation site.",
    count: 42,
    photos: [
      { id: "1517292987719-0369a794ec0f", alt: "Component sheet" },
      { id: "1545235617-9465d2a55698", alt: "UI kit layout" },
      { id: "1559028012-481c04fa702d", alt: "Wireframe board" },
      { id: "1586717791821-3f44a563fa4c", alt: "Style guide spread" },
    ],
  },
  {
    value: "site",
    title: "Marketing site",
    tagline: "Landing pages, sections, and the launch microsite.",
    caption: "Every section of the new marketing site, plus the one-page microsite we built for launch.",
    count: 31,
    photos: [
      { id: "1467232004584-a241de8bcf5d", alt: "Minimal hero layout" },
      { id: "1499951360447-b19be8fe80f5", alt: "Bright homepage mockup" },
      { id: "1486312338219-ce68d2c6f44d", alt: "Laptop with a landing page" },
      { id: "1498050108023-c5249f4df085", alt: "Code-forward homepage" },
    ],
  },
  {
    value: "illustration",
    title: "Illustration",
    tagline: "Spot art and the scenes we drew for the release.",
    caption: "Hand-drawn spot illustrations and the larger scenes that anchor each launch page.",
    count: 12,
    photos: [
      { id: "1513364776144-60967b0f800f", alt: "Illustration on a screen" },
      { id: "1502691876148-a84978e59af8", alt: "Sketchbook and pens" },
      { id: "1495567720989-cebdbdd97913", alt: "Drawing tablet" },
      { id: "1452860606245-08befc0ff44b", alt: "Abstract art print" },
    ],
  },
]

function CollectionRow({ collection }: { collection: Collection }) {
  const peek = collection.photos.map((p) => ({ src: img(p.id, 80), alt: p.alt }))
  const more = collection.count - collection.photos.length
  // Full-resolution sources for the full-screen viewer (the strip tiles stay small).
  const lightboxImages: LightboxImage[] = collection.photos.map((p) => ({
    src: img(p.id, 1280),
    alt: p.alt,
  }))
  return (
    <GalleryAccordionItem value={collection.value}>
      <GalleryAccordionTrigger
        tagline={collection.tagline}
        count={collection.count}
        peek={<GalleryAccordionPeek images={peek} />}
      >
        {collection.title}
      </GalleryAccordionTrigger>
      <GalleryAccordionContent>
        <GalleryAccordionCaption>{collection.caption}</GalleryAccordionCaption>
        {/* Each tile opens the browsable Lightbox at its index (the canonical Gallery pairing). */}
        <Lightbox images={lightboxImages}>
          <GalleryAccordionMedia>
            {collection.photos.map((photo, i) => (
              <LightboxTrigger key={photo.id} index={i} asChild>
                <GalleryAccordionImage
                  className="h-44 w-60"
                  src={img(photo.id, 480)}
                  alt={photo.alt}
                  action="View"
                  overlay={i === collection.photos.length - 1 && more > 0 ? `+${more}` : undefined}
                />
              </LightboxTrigger>
            ))}
          </GalleryAccordionMedia>
        </Lightbox>
      </GalleryAccordionContent>
    </GalleryAccordionItem>
  )
}

/** The accordion gallery: a vertical index of collections that open to a staggered photo strip. */
export function GalleryAccordionDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl px-2">
      <SectionHeader size="md" className="mb-10">
        <SectionHeaderText className="gap-4">
          <Badge dot pill className="self-start">
            Selected work
          </Badge>
          <SectionHeaderHeading>A look inside every release.</SectionHeaderHeading>
          <SectionHeaderDescription>
            Five collections from the past year. Open one to see the work behind it.
          </SectionHeaderDescription>
        </SectionHeaderText>
      </SectionHeader>

      <GalleryAccordion defaultValue="brand">
        {COLLECTIONS.map((collection) => (
          <CollectionRow key={collection.value} collection={collection} />
        ))}
      </GalleryAccordion>
    </div>
  )
}

/** Compact density tightens the rows for a denser index. */
export function GalleryAccordionCompactDemo() {
  return (
    <div className="mx-auto w-full max-w-3xl px-2">
      <GalleryAccordion density="compact" defaultValue="system">
        {COLLECTIONS.map((collection) => (
          <CollectionRow key={collection.value} collection={collection} />
        ))}
      </GalleryAccordion>
    </div>
  )
}
