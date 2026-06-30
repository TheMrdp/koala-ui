import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Specimen } from "@/components/docs/foundation"

export const metadata = { title: "Radius & Shadows" }

// `mult` is the factor each step applies to --radius (rounded-lg = 1× = --radius itself).
// With --radius at 1rem (16px), the quarter-step scale lands every step on the 4px grid;
// `rem`/`px` are the resolved values at a 16px root font size.
const RADIUS = [
  { name: "rounded-sm", mult: "0.5×", rem: "0.5rem", px: "8px" },
  { name: "rounded-md", mult: "0.75×", rem: "0.75rem", px: "12px" },
  { name: "rounded-lg", mult: "1×", rem: "1rem", px: "16px" },
  { name: "rounded-xl", mult: "1.25×", rem: "1.25rem", px: "20px" },
  { name: "rounded-2xl", mult: "1.5×", rem: "1.5rem", px: "24px" },
  { name: "rounded-3xl", mult: "1.75×", rem: "1.75rem", px: "28px" },
  { name: "rounded-4xl", mult: "2×", rem: "2rem", px: "32px" },
]
const SHADOW = ["shadow-xs", "shadow-sm", "shadow-md", "shadow-lg", "shadow-xl"]

export default function SurfacesPage() {
  return (
    <>
      <DocHeader
        title="Radius & Shadows"
        description="The surface foundation. Radius is driven by a single --radius knob, so the whole scale re-rounds from one value. Shadows carry per-theme values so dark surfaces stay legible."
      />

      <DocSection title="Radius">
        <p className="mt-4 text-pretty text-muted-foreground">
          The scale is relative to <code className="font-mono text-sm">--radius</code>{" "}
          (<code className="font-mono text-sm">1rem</code> / 16px), so{" "}
          <code className="font-mono text-sm">rounded-lg</code> = the knob itself. Quarter-step
          multipliers keep every value on the 4px grid; px below are resolved at a 16px root.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {RADIUS.map(({ name, mult, rem, px }) => (
            <Specimen
              key={name}
              label={name}
              meta={
                <>
                  <span className="text-foreground">{px}</span>
                  {" · "}
                  {rem}
                  {" · "}
                  {mult}
                </>
              }
            >
              <div className={`size-20 border border-muted-foreground/30 bg-accent ${name}`} />
            </Specimen>
          ))}
        </div>
      </DocSection>

      <DocSection title="Shadows / elevation">
        <p className="mt-4 text-pretty text-muted-foreground">
          Switch to a dark theme in the header - the shadows shift to heavier, cooler
          values automatically.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 rounded-xl bg-background p-8 sm:grid-cols-5">
          {SHADOW.map((s) => (
            <Specimen key={s} label={s}>
              <div className={`size-16 rounded-lg bg-card ${s}`} />
            </Specimen>
          ))}
        </div>
      </DocSection>
    </>
  )
}
