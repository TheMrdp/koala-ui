import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Changelog sections" }

const VARIANTS = ["changelog-section-1"] as const

export default function ChangelogSectionsPage() {
  return (
    <>
      <DocHeader
        title="Changelog"
        description="The recent release log as a simple timeline of version cards: a pill version, a tabular date, and a short note per entry, with a CTA to the full docs below."
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
          A light composition over the surface tokens: a pill{" "}
          <a href="/docs/components/badge" className="underline underline-offset-4">Badge</a> for each
          version, a tabular date, and a{" "}
          <a href="/docs/components/button" className="underline underline-offset-4">Button</a> in the
          ghost variant for the trailing CTA.
        </p>
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          Each entry lays the version and date beside the note on desktop and stacks them on mobile.
          The dates use <code className="font-mono text-sm">tabular-nums</code> so the column stays
          aligned. Resize the preview to watch the rows recompose.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "Is the changelog a single component?",
              a: "No, it is a small composition: a pill Badge, a tabular date, and a short note per entry, laid out as a timeline of cards. Copy the slab and feed it your own release notes.",
            },
            {
              q: "Can I preview it in another theme?",
              a: "Yes. The preview follows the site theme, so switch it from the top-right of the docs to check the cards and pills in light, dark, or moonlight.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
