import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Stats sections" }

const VARIANTS = [
  "stats-section-1",
  "stats-section-2",
  "stats-section-3",
  "stats-section-4",
  "stats-section-5",
  "stats-section-6",
] as const

export default function StatsSectionsPage() {
  return (
    <>
      <DocHeader
        title="Stats"
        description="The library at a glance: a four-up band of metrics on one segmented surface, with tabular figures that keep the row steady. Collapses to a two-up grid on mobile."
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
        <Installation component="stat" />
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          The four metrics sit on one segmented row on desktop and fold to a two-up grid on mobile.
          The figures use <code className="font-mono text-sm">tabular-nums</code> so the band never
          reflows. Resize the preview to watch the columns collapse.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What is the difference between this and the Stat component?",
              a: "The component (in /docs/components/stat) is the installable engine. This section is a finished metrics band built from it: a four-up StatGroup on one segmented surface, ready to sit between two larger sections.",
            },
            {
              q: "Can I preview it in another theme?",
              a: "Yes. The preview follows the site theme, so switch it from the top-right of the docs to check the band in light, dark, or moonlight.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
