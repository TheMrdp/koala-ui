import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import { PreviewFrame } from "@/components/docs/preview-frame"
import { SECTIONS } from "@/components/docs/sections-registry"

const section = SECTIONS.navbar

export const metadata = { title: `${section.title} section` }

export default function NavbarSectionPage() {
  return (
    <>
      <DocHeader title={section.title} description={section.description} />

      <PreviewFrame slug="navbar" code={section.code} locked={section.locked} />

      <DocSection title="Installation">
        <Installation component="navbar" />
      </DocSection>

      <DocSection title="Responsive">
        <p className="mt-4 text-pretty text-muted-foreground">
          Below the <code className="font-mono text-sm">md</code> breakpoint the inline links
          collapse into a hamburger that toggles the mobile menu, while the brand and primary
          action stay in the bar. Narrow the frame to trigger the switch.
        </p>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "What is the difference between this and the Navbar component?",
              a: "The component (in /docs/components/navbar) is the installable engine. This section is a finished bar built from it: brand, links, a dropdown, primary actions, and a mobile menu, ready to sit at the top of a page as sticky chrome.",
            },
            {
              q: "Why does the preview reflow when I resize it?",
              a: "The slab renders in an iframe pointed at an isolated route, so its own responsive utilities measure the iframe width. Narrow the frame and the links genuinely collapse into the hamburger, exactly as they would on a phone.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
