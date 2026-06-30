import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

export const metadata = { title: "Banner section" }

// One labeled preview per banner presentation, stacked like Tailwind Plus's banner gallery: each
// bar renders full-bleed and pinned to the top of its own short frame, with its own device/theme
// chrome. Slugs key into the sections registry (the iframe render target reads the same map).
const VARIANTS = ["banner", "banner-brand", "banner-dark", "banner-cta", "banner-countdown"] as const

export default function BannerSectionPage() {
  return (
    <>
      <DocHeader
        title="Banner"
        description="A full-bleed announcement bar for promos, release notes, and site-wide notices. Soft tones tint a background while the icon and action carry the hue, so it re-themes across every theme. Sits above the navbar or atop any page region."
      />

      <div className="flex flex-col gap-2">
        {VARIANTS.map((slug) => {
          const section = SECTIONS[slug]
          return (
            <PreviewFrame
              key={slug}
              id={slug}
              slug={slug}
              label={section.title}
              code={section.code}
              locked={section.locked}
              minHeight="13rem"
            />
          )
        })}
      </div>

      <DocSection title="Installation">
        <Installation component="banner" />
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          The bar keeps its icon, message, and action in one row on desktop and tightens as the
          frame narrows. Drag the handle or pick a breakpoint on any preview to see it adapt, and
          switch the per-frame theme to check the tint on each surface.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What is the difference between this and the Banner component?",
              a: "The component (in /docs/components/banner) is the configurable engine you install via the CLI. These sections are finished, copy-pasteable announcement bars built from it, ready to sit above a navbar or atop any page region.",
            },
            {
              q: "Can I preview it in another theme?",
              a: "Yes. The preview follows the site theme, so switch it from the top-right of the docs to confirm the soft tint reads in light, dark, and moonlight.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
