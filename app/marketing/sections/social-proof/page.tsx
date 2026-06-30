import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Social proof sections" }

const VARIANTS = [
  "social-proof-section-1",
  "social-proof-section-2",
  "social-proof-section-3",
  "social-proof-section-4",
  "social-proof-section-5",
] as const

export default function SocialProofSectionsPage() {
  return (
    <>
      <DocHeader
        title="Social Proof"
        description="The logo-led trust band: customer logos (a colored symbol beside the name) that tell a visitor who already builds on the product. Pick the airy cloud, an infinite marquee, a bordered grid, an editorial split with a headline count, or a bento that frames a featured customer story beside the wall."
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
        <Installation component="section-header" />
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          Every variant is built to adapt to the frame, not the viewport. The cloud lays its logos in
          a balanced grid (two up on a phone, four across above, never a full row over a lone orphan),
          the bordered grid collapses from four columns to two, the split folds to one stacked column,
          and the bento drops to a single column below the lg breakpoint. The marquee stays edge to
          edge at any width and pauses on hover. Drag the handle or pick a breakpoint on any preview
          to watch it adapt.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "Do the logos animate?",
              a: "Yes. The cloud, bordered grid, and split walls quietly rotate: the whole wall rolls from one set of customers to the next in a single synchronized pass, so the strip refreshes calmly without pulling focus from the headline. It's a pure CSS animation (both logos stay mounted and stacked, so a swap never shifts layout), and the outgoing brand is hidden from assistive tech. The marquee expresses motion by drifting instead, and every variant holds a static, legible set under prefers-reduced-motion.",
            },
            {
              q: "Are the logos real images?",
              a: "No. These are placeholder brand logos from the shared set at /docs/logos: fictional companies, each a colored inline-SVG symbol beside an invented wordmark, so the section stays dependency-free, re-themes cleanly, and never ships a binary asset. Swap the brand list for your own customers, or drop an <img> in place of any lockup. The bento variant's featured customer card is likewise an image placeholder (a dark surface with the stat overlaid) you can back with a real case-study photo.",
            },
            {
              q: "Where do the logos come from?",
              a: "From the placeholder logo set documented at /docs/logos. Each is a hand-drawn inline SVG that paints with one literal brand color, set beside its wordmark, and the set is ordered around the hue wheel so a wall reads as a real, varied customer list. Import PLACEHOLDER_BRANDS and map it, or pass your own brands in the same shape.",
            },
            {
              q: "Does the marquee respect reduced motion?",
              a: "Yes. The drift runs on the shared marquee token, pauses on hover, and stops entirely under prefers-reduced-motion, so visitors who opt out of animation get a static, legible strip.",
            },
            {
              q: "Can I preview it in another theme?",
              a: "Yes. The preview follows the site theme, so switch it from the top-right of the docs to confirm the logos and hairlines read in light, dark, and moonlight.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
