import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Swatch, SwatchGroup } from "@/components/docs/foundation"

export const metadata = { title: "Colors" }

export default function ColorsPage() {
  return (
    <>
      <DocHeader
        title="Colors"
        description="Components reference semantic color roles - never raw palette values - so all four themes restyle from one place. Switch themes in the header to see every swatch update live."
      />

      <DocSection title="Surfaces">
        <div className="mt-6">
          <SwatchGroup title="Backgrounds & surfaces">
            <Swatch surface="bg-background" token="bg-background" description="App background" bordered />
            <Swatch surface="bg-card" token="bg-card" description="Cards, raised panels" bordered />
            <Swatch surface="bg-popover" token="bg-popover" description="Popovers, menus" bordered />
            <Swatch surface="bg-muted" token="bg-muted" description="Subtle fills" />
            <Swatch surface="bg-secondary" token="bg-secondary" description="Secondary fills" />
            <Swatch surface="bg-accent" token="bg-accent" description="Hover / active accent" />
          </SwatchGroup>
        </div>
      </DocSection>

      <DocSection title="Content">
        <div className="mt-6">
          <SwatchGroup title="Text & foreground">
            <Swatch surface="bg-foreground" token="text-foreground" description="Primary text" />
            <Swatch surface="bg-muted-foreground" token="text-muted-foreground" description="Secondary text" />
            <Swatch surface="bg-card-foreground" token="text-card-foreground" description="Text on cards" />
          </SwatchGroup>
        </div>
      </DocSection>

      <DocSection title="Brand & state">
        <div className="mt-6">
          <SwatchGroup title="Actions & status">
            <Swatch surface="bg-primary" token="bg-primary" description="Primary actions" />
            <Swatch surface="bg-secondary" token="bg-secondary" description="Secondary actions" />
            <Swatch surface="bg-destructive" token="bg-destructive" description="Destructive / error" />
          </SwatchGroup>
        </div>
      </DocSection>

      <DocSection title="Lines & focus">
        <div className="mt-6">
          <SwatchGroup title="Borders & rings">
            <Swatch surface="bg-border" token="border-border" description="Default borders" />
            <Swatch surface="bg-input" token="border-input" description="Form field borders" />
            <Swatch surface="bg-ring" token="ring-ring" description="Focus rings" />
          </SwatchGroup>
        </div>
      </DocSection>

      <DocSection title="The full palette">
        <p className="mt-4 text-pretty text-muted-foreground">
          Tailwind v4&rsquo;s entire 27-color oklch palette ships out of the box
          (<code className="font-mono text-sm">bg-blue-500</code>,{" "}
          <code className="font-mono text-sm">text-rose-600</code>, …) and is available
          when you need a literal color. For anything that should respond to theming,
          prefer a semantic role above.
        </p>
      </DocSection>
    </>
  )
}
