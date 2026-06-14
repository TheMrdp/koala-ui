import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { ScaleRow } from "@/components/docs/foundation"

export const metadata = { title: "Spacing & Layout" }

// A representative slice of Tailwind's dynamic spacing scale (base = 0.25rem).
const SPACING = [
  { step: "1", w: "w-1", rem: "0.25rem" },
  { step: "2", w: "w-2", rem: "0.5rem" },
  { step: "3", w: "w-3", rem: "0.75rem" },
  { step: "4", w: "w-4", rem: "1rem" },
  { step: "6", w: "w-6", rem: "1.5rem" },
  { step: "8", w: "w-8", rem: "2rem" },
  { step: "12", w: "w-12", rem: "3rem" },
  { step: "16", w: "w-16", rem: "4rem" },
  { step: "24", w: "w-24", rem: "6rem" },
]

const CONTAINERS = [
  ["max-w-sm", "24rem"],
  ["max-w-md", "28rem"],
  ["max-w-lg", "32rem"],
  ["max-w-2xl", "42rem"],
  ["max-w-3xl", "48rem"],
  ["max-w-5xl", "64rem"],
  ["max-w-7xl", "80rem"],
]

export default function SpacingPage() {
  return (
    <>
      <DocHeader
        title="Spacing & Layout"
        description="Spacing and container widths are Tailwind v4 defaults - used as-is. The whole scale derives from a single 0.25rem base. For responsive thresholds, see Breakpoints."
      />

      <DocSection title="Spacing scale">
        <p className="mt-4 text-pretty text-muted-foreground">
          Every <code className="font-mono text-sm">p-*</code>,{" "}
          <code className="font-mono text-sm">m-*</code>,{" "}
          <code className="font-mono text-sm">gap-*</code> and{" "}
          <code className="font-mono text-sm">size-*</code> step is{" "}
          <code className="font-mono text-sm">0.25rem × n</code>.
        </p>
        <div className="mt-4">
          {SPACING.map((s) => (
            <ScaleRow key={s.step} name={s.step} meta={s.rem}>
              <div className={`${s.w} h-4 rounded-sm bg-primary`} />
            </ScaleRow>
          ))}
        </div>
      </DocSection>

      <DocSection title="Containers">
        <div className="mt-4">
          {CONTAINERS.map(([name, rem]) => (
            <ScaleRow key={name} name={name} meta={rem}>
              <div className="h-3 rounded-sm bg-accent" style={{ width: rem, maxWidth: "100%" }} />
            </ScaleRow>
          ))}
        </div>
      </DocSection>
    </>
  )
}
