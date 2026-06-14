import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Specimen } from "@/components/docs/foundation"

export const metadata = { title: "Radius & Shadows" }

// `mult` is the factor each step applies to --radius (rounded-lg = 1× = --radius itself).
const RADIUS = [
  { name: "rounded-sm", mult: "0.6×" },
  { name: "rounded-md", mult: "0.8×" },
  { name: "rounded-lg", mult: "1×" },
  { name: "rounded-xl", mult: "1.4×" },
  { name: "rounded-2xl", mult: "1.8×" },
  { name: "rounded-3xl", mult: "2.2×" },
  { name: "rounded-4xl", mult: "2.6×" },
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
          (<code className="font-mono text-sm">rounded-sm</code> ={" "}
          <code className="font-mono text-sm">calc(var(--radius) × 0.6)</code> … up to{" "}
          <code className="font-mono text-sm">rounded-4xl</code>).
        </p>
        <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {RADIUS.map(({ name, mult }) => (
            <Specimen key={name} label={name} meta={mult}>
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
