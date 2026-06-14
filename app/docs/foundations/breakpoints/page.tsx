import Link from "next/link"

import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { ScaleRow } from "@/components/docs/foundation"
import { CodeSnippet } from "@/components/docs/code-snippet"

export const metadata = { title: "Breakpoints" }

// Tailwind v4 defaults, used as-is. `min` drives the visual bar (relative to the 2xl ceiling).
const BREAKPOINTS = [
  { name: "sm", rem: "40rem", px: 640 },
  { name: "md", rem: "48rem", px: 768 },
  { name: "lg", rem: "64rem", px: 1024 },
  { name: "xl", rem: "80rem", px: 1280 },
  { name: "2xl", rem: "96rem", px: 1536 },
]

const CEILING = 1536

export default function BreakpointsPage() {
  return (
    <>
      <DocHeader
        title="Breakpoints"
        description="The five responsive thresholds Koala builds on — Tailwind v4 defaults, used verbatim. Styles are mobile-first: an unprefixed utility applies everywhere, a prefixed one applies from that width up."
      />

      <DocSection title="The scale">
        <p className="mt-4 text-pretty text-muted-foreground">
          Each breakpoint is a <code>min-width</code> media query. The bar shows where each
          one kicks in, relative to the <code>2xl</code> ceiling.
        </p>
        <div className="mt-6">
          {BREAKPOINTS.map((b) => (
            <ScaleRow key={b.name} name={b.name} meta={b.rem} detail={`≥ ${b.px}px`}>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(b.px / CEILING) * 100}%` }}
                />
              </div>
            </ScaleRow>
          ))}
        </div>
      </DocSection>

      <DocSection title="Mobile-first">
        <p className="mt-4 text-pretty text-muted-foreground">
          Write the small-screen layout with unprefixed utilities, then layer overrides at
          each breakpoint and up. Don&apos;t use <code>sm:</code> to target only mobile — it
          means <em>640px and wider</em>.
        </p>
        <div className="mt-4">
          <CodeSnippet
            filename="responsive.tsx"
            code={`// Stacked on phones, side-by-side from 640px (sm), wider gap from 1024px (lg).
<div className="flex flex-col gap-4 sm:flex-row lg:gap-8">
  <aside className="w-full sm:w-64">…</aside>
  <main className="flex-1">…</main>
</div>`}
          />
        </div>
      </DocSection>

      <DocSection title="Targeting a single range">
        <p className="mt-4 text-pretty text-muted-foreground">
          For styles that should apply <em>below</em> a breakpoint, use the{" "}
          <code>max-*</code> variants. Combine a min and a max prefix to scope a utility to a
          single band.
        </p>
        <div className="mt-4">
          <CodeSnippet
            filename="ranges.tsx"
            code={`<div className="max-sm:hidden">Hidden below 640px</div>
<div className="md:max-lg:bg-accent">Tinted only between 768px and 1024px</div>`}
          />
        </div>
      </DocSection>

      <DocSection title="Previewing breakpoints">
        <p className="mt-4 text-pretty text-muted-foreground">
          Media queries respond to the <em>viewport</em>, so you can&apos;t see a layout
          reflow just by resizing a column. The{" "}
          <Link href="/docs/sections/hero" className="font-medium text-foreground underline underline-offset-4">
            Marketing Sections
          </Link>{" "}
          preview renders each section inside an iframe, so its own breakpoints respond to the
          frame width — switch between Mobile (375px), Tablet (768px) and Desktop, or drag the
          handle to any width in between.
        </p>
      </DocSection>
    </>
  )
}
