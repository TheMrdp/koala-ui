import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Pricing sections" }

const VARIANTS = ["pricing-section-1"] as const

export default function PricingSectionsPage() {
  return (
    <>
      <DocHeader
        title="Pricing"
        description="A three-tier pricing table with a highlighted plan: tabular prices, a feature checklist of included and excluded items, and a bottom-pinned CTA on each card. The featured tier carries a brand ring."
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
        <Installation component="pricing" />
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          The three tiers sit side by side on desktop and stack into a single column on mobile, with
          the featured plan lifted and ringed. Because the preview renders inside an iframe, the
          layout responds to the <strong>frame</strong> width, so the presets and drag handle show
          the real layouts.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What is the difference between this and the Pricing component?",
              a: "The component (in /docs/components/pricing) is the installable engine. This section is a finished, copy-pasteable pricing table built from it: three tiers with feature checklists and bottom-pinned CTAs, ready to drop into a marketing page.",
            },
            {
              q: "Why is the featured tier highlighted?",
              a: "The middle plan carries a brand ring and a small lift to steer the eye to the recommended option. Set it with the featured flag on the tier.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
