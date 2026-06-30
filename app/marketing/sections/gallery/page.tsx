import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Gallery sections" }

const VARIANTS = [
  "gallery-section-1",
  "gallery-section-2",
  "gallery-section-3",
  "gallery-section-4",
] as const

export default function GallerySectionsPage() {
  return (
    <>
      <DocHeader
        title="Gallery"
        description="Marketing image walls built on the Gallery and Lightbox components: a tabbed fake-masonry of framed previews, a two-direction marquee that drifts past and pauses on hover, or a floating ring of frames that orbits a centered lede as you scroll. Every tile opens a full-screen lightbox."
      />

      <div className="flex flex-col gap-8">
        {VARIANTS.map((slug, i) => {
          const section = SECTIONS[slug]
          return (
            <PreviewFrame
              key={slug}
              id={slug}
              slug={slug}
              label={`Variant ${i + 1}`}
              code={section.code}
              locked={section.locked}
            />
          )
        })}
      </div>

      <DocSection title="Installation">
        <Installation component="gallery" />
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          The tab rail wraps and the fake-masonry wall reflows its columns as the frame narrows,
          dropping to a single stack on mobile. The marquee variant keeps its drift at any width and
          fades its frames into the band at both edges. The floating ring scales its ellipse with the
          stage and thins its inner frames on narrow widths so the centered lede always keeps its
          breathing room. Each tile opens a full-screen lightbox; resize the preview to see the
          layouts adapt.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What is the difference between this and the Gallery component?",
              a: "The component (in /docs/components/gallery) is the installable engine. This section is a finished concepts wall built from it: a heading, a tab rail, and a lightbox-backed masonry, ready to showcase work on a landing page.",
            },
            {
              q: "Can I preview it in another theme?",
              a: "Yes. The preview follows the site theme, so switch it from the top-right of the docs and the framed tiles and headings re-theme into light, dark, or moonlight along with everything else.",
            },
            {
              q: "How does the scroll rotation on the floating ring work?",
              a: "It is a pure-CSS scroll-driven animation (an animation-timeline tied to the section's journey through the viewport), the same family as the scroll-fade utility, so there is no JavaScript or scroll listener. The ring passes through a neutral angle while the section is centered and tilts a little as it enters and leaves. It respects prefers-reduced-motion (the ring holds still), and browsers without scroll-driven animations simply show the ring at its resting angle. The embedded preview frame is sized to the slab's height so it does not scroll internally; scroll the docs page, or open the preview in a new tab on a short viewport, to watch the ring turn.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
