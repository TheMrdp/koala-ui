import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "CTA sections" }

const VARIANTS = ["cta-section-1", "cta-section-2"] as const

export default function CtaSectionsPage() {
  return (
    <>
      <DocHeader
        title="CTA"
        description="Calls to action. Variant 1 is the install and source-ownership story (a lede and benefit checklist beside two code snippets); Variant 2 is the closing CTA, a brand-lit panel that funnels to pricing and the docs."
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
          Both compose the{" "}
          <a href="/docs/components/section-header" className="underline underline-offset-4">SectionHeader</a>{" "}
          lede and a{" "}
          <a href="/docs/components/button" className="underline underline-offset-4">Button</a> row;
          Variant 1 adds two stacked{" "}
          <a href="/docs/components/code-snippet" className="underline underline-offset-4">CodeSnippet</a>{" "}
          panels, and Variant 2 wraps the lede in a token-driven brand glow.
        </p>
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          Variant 1 lays the lede beside the code on desktop and stacks it on mobile; Variant 2 keeps
          its centered lede and action row, wrapping the buttons below the copy on narrow frames.
          Resize either preview to confirm the rhythm holds.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "How do the variants differ?",
              a: "Variant 1 is the mid-page install story that explains how Koala UI is delivered. Variant 2 is the closing call to action: a brand-lit panel at the bottom of a landing page that funnels to pricing and the docs.",
            },
            {
              q: "Does the glow on Variant 2 follow the theme?",
              a: "Yes. The brand glow is driven by the accent token, so it re-tints with the active accent and reads correctly in light, dark, and moonlight. Switch the site theme from the top-right of the docs to check.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
