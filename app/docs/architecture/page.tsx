import { DocHeader, DocSection } from "@/components/docs/doc-page"

export const metadata = {
  title: "Architecture",
}

const STACK: [string, string][] = [
  ["Styling / variants", "tailwind-variants (tv) with slots"],
  ["Class merge", "tailwind-merge, extended for Koala tokens"],
  ["Behavior & a11y", "Radix UI primitives"],
  ["Polymorphism (asChild)", "Radix Slot"],
  ["Cross-part state", "React Context (typed helper)"],
  ["Theming", "CSS variables + semantic tokens + class strategy"],
]

export default function ArchitecturePage() {
  return (
    <>
      <DocHeader
        title="Architecture"
        description="The house style for building Koala UI - taking what scales from Tailwind, Untitled UI, and AlignUI, dropping what's clever-but-fragile."
      />

      <DocSection title="The stack">
        <div className="mt-4 overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <tbody>
              {STACK.map(([concern, choice], i) => (
                <tr
                  key={concern}
                  className={i % 2 ? "bg-muted/40" : undefined}
                >
                  <td className="border-r border-border px-4 py-2.5 font-medium whitespace-nowrap">
                    {concern}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{choice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="What we reject">
        <p className="mt-4 text-pretty text-muted-foreground">
          AlignUI&rsquo;s <code className="font-mono text-sm">recursiveCloneChildren</code>{" "}
          (matching children by <code className="font-mono text-sm">displayName</code>{" "}
          to inject props) is elegant in a demo and a liability at scale: it breaks
          under minification, breaks when a part is wrapped, and clones the subtree
          each render. We use <strong className="text-foreground">React Context</strong>{" "}
          for cross-part state - what Radix, React Aria, Ark, MUI, and Chakra all do
          internally.
        </p>
      </DocSection>

      <DocSection title="Full reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          The complete writeup lives in{" "}
          <code className="font-mono text-sm">docs/ARCHITECTURE.md</code> in the repo.
        </p>
      </DocSection>
    </>
  )
}
