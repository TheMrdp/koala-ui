import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Hero sections" }

// One numbered variant per preview, stacked on the family page (Flowbase-style). Each slug keys
// into the sections registry; the iframe render target reads the same map. The hero layouts come
// first; the social-proof strip that sits beneath a hero closes the page.
const VARIANTS = [
  "hero-section-1",
  "hero-section-3",
  "hero-section-4",
  "hero-section-5",
  "hero-section-2",
] as const

export default function HeroSectionsPage() {
  return (
    <>
      <DocHeader
        title="Hero"
        description="The opening section of a landing page. Five finished layouts: the centered marketing hero, a product-led spotlight, a two-column split, an editorial logo wall, and the logo-led social-proof strip that sits directly beneath a hero."
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

      <DocSection title="Built from">
        <p className="mt-4 text-pretty text-muted-foreground">
          Variants 1 to 4 are built on the{" "}
          <a href="/docs/components/hero" className="underline underline-offset-4">Hero</a> component:
          the same parts swap between a centered column and a two-column{" "}
          <code>split</code> via one <code>layout</code> prop, with{" "}
          <code>HeroHighlight</code> marking a keyword and <code>HeroMedia</code> holding the
          visual. Variants 2 and 3 leave <code>HeroMedia</code> as an image placeholder, ready for
          you to drop in a product screenshot, while Variant 4 fills it with a wall of customer
          logos. The closing variant composes the{" "}
          <a href="/docs/components/testimonials" className="underline underline-offset-4">Testimonials</a>{" "}
          parts. All are finished, copy-pasteable slabs ready to open a marketing page.
        </p>
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          Each preview renders inside an iframe, so the slab&apos;s own breakpoints respond to the{" "}
          <strong>frame</strong> width. Drag the handle or pick Mobile, Tablet, or Desktop on any
          variant to watch it recompose, and switch the per-frame theme to check it in dark or
          moonlight.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "How do the variants differ?",
              a: "Variant 1 is the classic centered hero. Variant 2 is a product-led spotlight: a headline whose highlighted keyword rotates through phrases in a wash that hugs each word and recolors per phrase, over a trusted-by logo strip and an image placeholder. Variant 3 is the two-column split, text beside an image placeholder. Variant 4 is an editorial split where a wall of customer logos is the visual. Variant 5 is the logo-led social-proof strip designed to sit directly under a hero.",
            },
            {
              q: "Why is the code locked?",
              a: "Hero is a flagship Pro family. The live previews stay fully interactive so you can size and theme them, while the full source ships with a Koala UI Pro license.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
