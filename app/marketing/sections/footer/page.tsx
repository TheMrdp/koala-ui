import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Footer sections" }

// One numbered variant per preview, stacked on the family page (hero/gallery pattern). Each slug
// keys into the sections registry; the iframe render target reads the same map. The conventional
// brand + columns footer comes first, then the image overlay, then three newsletter-forward
// layouts (strip, card, centered).
const VARIANTS = [
  "footer",
  "footer-section-2",
  "footer-section-3",
  "footer-section-4",
  "footer-section-5",
] as const

export default function FooterSectionsPage() {
  return (
    <>
      <DocHeader
        title="Footer"
        description="The closing section of a page. Five finished layouts: the classic brand column with grouped link columns, a full-bleed image overlay, a newsletter strip over a wide link grid, a footer with a self-contained newsletter card, and a minimal centered footer. The signup blocks compose the canonical NewsletterForm."
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
        <Installation component="footer" />
      </DocSection>

      <DocSection title="Image overlay">
        <p className="mt-4 text-pretty text-muted-foreground">
          Variant 2 makes the image the protagonist: a full-bleed photo sits behind the nav, the
          link columns ride on top, and a minimal copyright and legal bar closes it at the
          bottom-left. A top-and-bottom scrim darkens the edges so the white text reads over the
          brighter middle of the image. Swap the{" "}
          <code className="font-mono text-sm">&lt;img&gt;</code> src for your own illustration or a
          next <code className="font-mono text-sm">&lt;Image&gt;</code>; the column titles, links,
          and copyright are already set white.
        </p>
      </DocSection>

      <DocSection title="Newsletter signup">
        <p className="mt-4 text-pretty text-muted-foreground">
          Variants 3 to 5 capture email with the canonical{" "}
          <a href="/docs/components/newsletter-form" className="underline underline-offset-4">
            NewsletterForm
          </a>
          , not a hand-rolled input. Variant 3 leads the footer with its{" "}
          <code className="font-mono text-sm">inline</code> layout (a single signup row over a wide
          link grid); Variant 4 anchors the right with its <code className="font-mono text-sm">card</code>{" "}
          layout (heading, lead, and fine print on its own concentric surface); Variant 5 centers the{" "}
          <code className="font-mono text-sm">inline</code> form under a minimal nav. Each ships the
          loading-to-success flow out of the box, so dropping one in just works; wire{" "}
          <code className="font-mono text-sm">onSubscribe</code> to your API.
        </p>
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          The link columns sit beside (or above) the brand on desktop and stack as the frame
          narrows, while the bottom bar wraps its copyright and legal links. The overlay variant
          folds its five columns from a single row to three, then two, and the scenic band keeps the
          image footprint at every width. The newsletter strip drops its signup under the lede, and
          the newsletter card moves below the columns. Resize the preview to watch each fold to
          mobile.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What is the difference between this and the Footer component?",
              a: "The component (in /docs/components/footer) is the installable engine. These sections are finished compositions built from it: Variant 1 is a brand column with social links over three link columns and a legal bottom bar; Variant 2 is a full-bleed image-overlay layout with five columns riding on top of an illustration.",
            },
            {
              q: "How does the image-overlay footer handle the image?",
              a: "A full-bleed <img> sits behind the nav with a top-and-bottom scrim so the white text reads over it. Swap the src for your own illustration or photo (or a next/Image); the columns and bottom bar are the standard Footer parts on a transparent root, so nothing else changes.",
            },
            {
              q: "How do I add a newsletter signup to a footer?",
              a: "Compose the NewsletterForm component, not a raw input. Variants 3 to 5 show the two layouts: `inline` (a single signup row, for the strip and the centered footer) and `card` (a self-contained panel with a heading and fine print, for the corner card). It owns its own email and submit state and ships the loading-to-success flow, so the footer stays dependency-free; wire `onSubscribe` to your API.",
            },
            {
              q: "Which footer should I use?",
              a: "Variant 1 for a standard product footer; Variant 2 when a brand image should lead; Variant 3 when newsletter signups matter and you have a lot of links; Variant 4 to feature the signup as a card beside the columns; Variant 5 for a simpler marketing page that wants a light, centered footer.",
            },
            {
              q: "Why does the preview reflow when I resize it?",
              a: "The slab renders in an iframe pointed at an isolated route, so its own responsive utilities measure the iframe width. Narrow the frame and the columns genuinely collapse, exactly as they would on a phone.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
