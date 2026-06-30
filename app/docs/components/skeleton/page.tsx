import { Skeleton } from "@/components/ui/skeleton"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

export const metadata = {
  title: "Skeleton",
}

export default function SkeletonDocsPage() {
  return (
    <>
      <DocHeader
        title="Skeleton"
        description="A loading placeholder that mirrors the shape of the content it stands in for. Single-element like Badge; the fill is a semantic token, so it re-themes everywhere, and the optional shimmer rides the shared motion tokens."
      />

      <ComponentPreview
        previewClassName="justify-start"
        code={`<div className="flex w-full max-w-sm items-center gap-4">
  <Skeleton variant="circle" className="size-12" />
  <div className="flex-1 space-y-2.5">
    <Skeleton variant="text" className="w-1/2" />
    <Skeleton variant="text" />
  </div>
</div>`}
      >
        <div className="flex w-full max-w-sm items-center gap-4">
          <Skeleton variant="circle" className="size-12" />
          <div className="flex-1 space-y-2.5">
            <Skeleton variant="text" className="w-1/2" />
            <Skeleton variant="text" />
          </div>
        </div>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="skeleton" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Skeleton } from "@/components/ui/skeleton"

export function Example() {
  return <Skeleton className="h-8 w-48" />
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          Three shapes cover most placeholders. <code className="font-mono text-sm">rectangle</code>{" "}
          is the default block; <code className="font-mono text-sm">circle</code> takes a single{" "}
          <code className="font-mono text-sm">size-*</code> for avatars and icons; and{" "}
          <code className="font-mono text-sm">text</code> matches the surrounding line-height
          exactly via the <code className="font-mono text-sm">1lh</code> unit.
        </p>
        <ComponentPreview
          code={`<Skeleton variant="rectangle" className="h-16 w-24" />
<Skeleton variant="circle" className="size-16" />
<Skeleton variant="text" className="w-40" />`}
        >
          <Skeleton variant="rectangle" className="h-16 w-24" />
          <Skeleton variant="circle" className="size-16" />
          <Skeleton variant="text" className="w-40" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Multi-line text">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">lines</code> with{" "}
          <code className="font-mono text-sm">variant=&quot;text&quot;</code> to render a paragraph-shaped
          block. The last line wraps short, the way real running text does.
        </p>
        <ComponentPreview
          previewClassName="justify-start"
          code={`<Skeleton variant="text" lines={4} className="max-w-md" />`}
        >
          <Skeleton variant="text" lines={4} className="max-w-md" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Animation">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">pulse</code> (the default) breathes opacity;{" "}
          <code className="font-mono text-sm">shimmer</code> sweeps a highlight driven by the{" "}
          <code className="font-mono text-sm">--animate-shimmer</code> motion token; and{" "}
          <code className="font-mono text-sm">none</code> holds a static placeholder. All three
          stop under <code className="font-mono text-sm">prefers-reduced-motion</code>.
        </p>
        <ComponentPreview
          code={`<Skeleton animation="pulse" className="h-10 w-28" />
<Skeleton animation="shimmer" className="h-10 w-28" />
<Skeleton animation="none" className="h-10 w-28" />`}
        >
          <Skeleton animation="pulse" className="h-10 w-28" />
          <Skeleton animation="shimmer" className="h-10 w-28" />
          <Skeleton animation="none" className="h-10 w-28" />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Composition">
        <p className="mt-4 text-pretty text-muted-foreground">
          Skeletons are layout primitives; compose them to trace the real content. Wrap the
          loading region in <code className="font-mono text-sm">aria-busy=&quot;true&quot;</code> so the
          placeholders (each <code className="font-mono text-sm">aria-hidden</code>) stay silent
          to screen readers while one status is announced for the whole region.
        </p>
        <ComponentPreview
          previewClassName="justify-start"
          code={`<div aria-busy="true" className="w-full max-w-sm rounded-xl border border-border p-4">
  <Skeleton variant="rectangle" className="h-40 w-full rounded-lg" />
  <div className="mt-4 space-y-2.5">
    <Skeleton variant="text" className="w-2/3" />
    <Skeleton variant="text" lines={2} />
  </div>
  <div className="mt-4 flex items-center gap-3">
    <Skeleton variant="circle" className="size-9" />
    <Skeleton variant="text" className="w-24" />
  </div>
</div>`}
        >
          <div
            aria-busy="true"
            className="w-full max-w-sm rounded-xl border border-border p-4"
          >
            <Skeleton variant="rectangle" className="h-40 w-full rounded-lg" />
            <div className="mt-4 space-y-2.5">
              <Skeleton variant="text" className="w-2/3" />
              <Skeleton variant="text" lines={2} />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <Skeleton variant="circle" className="size-9" />
              <Skeleton variant="text" className="w-24" />
            </div>
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "When should I reach for a Skeleton instead of a spinner?", a: "Use a Skeleton when you know the shape of the content that is loading, like a card or a list row, so the layout stays stable and there is no jump when the data arrives. A spinner is better for indeterminate, full-page waits where the eventual layout is unknown." },
            { q: "What is the difference between the rectangle, circle, and text variants?", a: "`rectangle` is the default block (pair it with width/height via `className`); `circle` is aspect-square so a single `size-*` reads as a round avatar placeholder; and `text` is `h-[1lh]` so it matches the surrounding line-height exactly." },
            { q: "How do I render a multi-line paragraph placeholder?", a: "Pass `lines` together with `variant=\"text\"` to stack that many lines, with the last one shortened the way real running text wraps. The prop is ignored for other variants and for `lines <= 1`." },
            { q: "Which animation should I pick, and does it respect reduced motion?", a: "`pulse` (the default) breathes opacity, `shimmer` sweeps a highlight via the `--animate-shimmer` token, and `none` holds static. All three stop automatically under `prefers-reduced-motion`." },
            { q: "How do I keep skeletons quiet for screen readers?", a: "Every Skeleton element is already `aria-hidden`, so wrap the loading region in `aria-busy=\"true\"` and announce one status for the whole region rather than letting each placeholder shout." },
          ]}
        />
      </DocSection>

    </>
  )
}
