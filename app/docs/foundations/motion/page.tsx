import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { CodeBlock } from "@/components/docs/code-block"
import { MotionDemo } from "@/components/docs/motion-demo"
import { StaggerDemo } from "@/components/docs/stagger-demo"

export const metadata = { title: "Motion" }

export default function MotionPage() {
  return (
    <>
      <DocHeader
        title="Motion"
        description="Three easing curves and three durations, exposed as Tailwind utilities and mirrored in lib/motion.ts for JS animation. Never inline a raw cubic-bezier or ms value."
      />

      <DocSection title="Easing">
        <p className="mt-4 text-pretty text-muted-foreground">
          Same duration, different curves - press Play to compare.
        </p>
        <div className="mt-6">
          <MotionDemo rows="easing" />
        </div>
      </DocSection>

      <DocSection title="Duration">
        <p className="mt-4 text-pretty text-muted-foreground">
          Same curve (<code className="font-mono text-sm">ease-out</code>), different
          durations.
        </p>
        <div className="mt-6">
          <MotionDemo rows="duration" />
        </div>
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Compose the utilities directly in components, or import the constants from{" "}
          <code className="font-mono text-sm">lib/motion.ts</code> when animating from
          JS.
        </p>
        <CodeBlock
          filename="example.tsx"
          className="mt-4"
          code={`// CSS / Tailwind - preferred
<div className="transition-colors duration-base ease-out" />

// JS-driven animation
import { easing, duration } from "@/lib/motion"
element.animate(keyframes, {
  duration: duration.base,        // 300
  easing: easing.out,             // cubic-bezier(0.23, 1, 0.32, 1)
})`}
        />
      </DocSection>

      <DocSection title="Interruptible transitions">
        <p className="mt-4 text-pretty text-muted-foreground">
          Use CSS <code className="font-mono text-sm">transition</code> for any animation
          driven by interactive state - hover, focus, active, data attributes. CSS
          transitions can be reversed mid-flight; keyframe animations cannot. Reserve{" "}
          <code className="font-mono text-sm">@keyframes</code> for staged sequences that
          run once (spinners, skeleton pulses, entrance choreography).
        </p>
        <CodeBlock
          filename="button.tsx"
          className="mt-4"
          code={`// ✓ CSS transition - interruptible, reverses cleanly on mouse-out
<button className="bg-primary transition-colors duration-fast ease-out hover:bg-primary/80">
  Save
</button>

// ✗ Keyframe - fires once, cannot be reversed mid-animation
<button className="animate-pulse">Save</button>`}
        />
      </DocSection>

      <DocSection title="Specify properties, never transition-all">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">transition: all</code> triggers a
          style recalc on every CSS property change, including layout-affecting ones
          like <code className="font-mono text-sm">width</code> and{" "}
          <code className="font-mono text-sm">padding</code>. Always name the
          properties you actually animate. Tailwind&rsquo;s{" "}
          <code className="font-mono text-sm">transition-transform</code> covers{" "}
          <code className="font-mono text-sm">transform, translate, scale, rotate</code>{" "}
          in one utility.
        </p>
        <CodeBlock
          filename="card.tsx"
          className="mt-4"
          code={`// ✓ Specific - only the GPU-composited properties
<div className="transition-[opacity,transform] duration-base ease-out" />
<div className="transition-transform duration-fast ease-out hover:scale-[1.02]" />
<div className="transition-colors duration-fast ease-out" />

// ✗ Transitions layout + paint + composite on every change
<div className="transition-all duration-base" />`}
        />
      </DocSection>

      <DocSection title="Enter animations: split and stagger">
        <p className="mt-4 text-pretty text-muted-foreground">
          Animating a container as one block looks mechanical. Break the content into chunks and
          stagger each by ~70-100&nbsp;ms so the reader perceives hierarchy rather than a single
          blob appearing. Reach for the <code className="font-mono text-sm">Stagger</code> primitive
          rather than hand-rolling per-item delays — it sets each child&rsquo;s delay off the motion
          tokens, plays once on mount, and falls back to no animation under reduced-motion.
        </p>
        <div className="mt-6">
          <StaggerDemo />
        </div>
        <CodeBlock
          filename="stagger.tsx"
          className="mt-4"
          code={`import { Stagger } from "@/lib/stagger"

// ✓ Lists / grids — one wrapper, the cascade is automatic.
<Stagger className="grid grid-cols-3 gap-2">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>

// ✓ Fixed chunks — same idea when there's no list to map.
<Stagger>
  <h2>Title</h2>
  <p>Body text here.</p>
  <div><Button>Action</Button></div>
</Stagger>

// ✗ Whole container in one shot
<div className="animate-fade-in">
  <h2>Title</h2>
  <p>Body</p>
  <Button>Action</Button>
</div>`}
        />
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Stagger</code> animates on mount — the right gate for
          &ldquo;load&rdquo; cascades. With stable keys, reordering reuses the DOM and won&rsquo;t
          replay; genuinely new content (a filter, a fresh page, a layout switch) mounts and
          cascades. The DataTable&rsquo;s cards layout uses it. Tune the gap with{" "}
          <code className="font-mono text-sm">step</code> (default 70&nbsp;ms); direct children must
          forward <code className="font-mono text-sm">className</code> and{" "}
          <code className="font-mono text-sm">style</code>.
        </p>
      </DocSection>

      <DocSection title="Exit animations: stay subtle">
        <p className="mt-4 text-pretty text-muted-foreground">
          Exit animations should be softer than enters. A full-height collapse or a
          large translate draws too much attention to something leaving. Use a small fixed{" "}
          <code className="font-mono text-sm">translateY</code> (4–8 px) with a fade -
          the element slips away rather than crashing out.
        </p>
        <CodeBlock
          filename="toast.tsx"
          className="mt-4"
          code={`// ✓ Subtle exit - short distance, fades out
// Enter: slides up 8px + fades in
// Exit:  slides down 4px + fades out (half the travel, softer)
<div
  className={cn(
    "transition-[opacity,transform] duration-base ease-out",
    visible
      ? "translate-y-0 opacity-100"
      : "translate-y-1 opacity-0",   // 4 px - barely moves
  )}
/>

// ✗ Full collapse - too dramatic
<div className={cn(visible ? "h-auto opacity-100" : "h-0 opacity-0")} />`}
        />
      </DocSection>

      <DocSection title="Icon animations">
        <p className="mt-4 text-pretty text-muted-foreground">
          Never toggle icon visibility with a conditional render - the outgoing icon
          disappears instantly with no exit animation. Keep both icons in the DOM,
          position the secondary one absolutely, and cross-fade using{" "}
          <code className="font-mono text-sm">opacity</code>,{" "}
          <code className="font-mono text-sm">scale</code>, and{" "}
          <code className="font-mono text-sm">blur</code>. Enter: scale{" "}
          <code className="font-mono text-sm">0.25 → 1</code>, opacity{" "}
          <code className="font-mono text-sm">0 → 1</code>, blur{" "}
          <code className="font-mono text-sm">4px → 0</code>.
        </p>
        <CodeBlock
          filename="copy-button.tsx"
          className="mt-4"
          code={`"use client"
import { Check, Copy } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

const iconClass = (visible: boolean) =>
  cn(
    "transition-[opacity,transform,filter] duration-fast",
    // cubic-bezier(0.2,0,0,1) - the snappy curve for icon swaps
    "[transition-timing-function:cubic-bezier(0.2,0,0,1)]",
    visible
      ? "scale-100 opacity-100 blur-0"
      : "scale-[0.25] opacity-0 blur-[4px]",
  )

export function CopyButton({ onCopy }: { onCopy: () => void }) {
  const [copied, setCopied] = React.useState(false)

  return (
    <button
      onClick={() => { onCopy(); setCopied(true); setTimeout(() => setCopied(false), 1500) }}
      className="relative inline-flex size-7 items-center justify-center"
    >
      <Copy className={cn("absolute", iconClass(!copied))} />
      <Check className={cn("absolute", iconClass(copied))} />
    </button>
  )
}`}
        />
      </DocSection>

      <DocSection title="Skip animation on page load">
        <p className="mt-4 text-pretty text-muted-foreground">
          Elements that are visible on first render should not animate in - the user
          never asked for that transition. Gate CSS transitions behind a{" "}
          <code className="font-mono text-sm">data-mounted</code> attribute set in a{" "}
          <code className="font-mono text-sm">useEffect</code>. The attribute is absent
          during SSR and on the first paint, so the transition rule never fires.
        </p>
        <CodeBlock
          filename="panel.tsx"
          className="mt-4"
          code={`"use client"
import * as React from "react"

export function Panel({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null)

  // Set the attribute after the first paint - transitions only fire after this.
  React.useEffect(() => {
    ref.current?.setAttribute("data-mounted", "")
  }, [])

  return (
    <div
      ref={ref}
      // Without data-mounted the element is fully visible (no opacity-0 default).
      // Once mounted, hovering or state changes can transition freely.
      className="opacity-0 transition-opacity duration-base ease-out data-[mounted]:opacity-100"
    >
      {children}
    </div>
  )
}`}
        />
      </DocSection>

      <DocSection title="will-change">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">will-change</code> promotes an element to
          its own GPU layer before the animation starts, eliminating first-frame stutter.
          Only use it on properties the GPU can composite:{" "}
          <code className="font-mono text-sm">transform</code>,{" "}
          <code className="font-mono text-sm">opacity</code>, and{" "}
          <code className="font-mono text-sm">filter</code>. Overusing it wastes VRAM
          and can slow down everything else. Add it only when you observe a visible
          first-frame glitch.
        </p>
        <CodeBlock
          filename="drawer.tsx"
          className="mt-4"
          code={`// ✓ Composited property - GPU can handle this without a layout pass
<div className="will-change-transform transition-transform duration-slow ease-drawer" />

// ✗ will-change: all - promotes the element for *every* property, wastes VRAM
<div className="will-change-auto transition-all duration-base" />

// ✗ Left on permanently - keeps the layer alive even when not animating
// Only add will-change while animating; remove it after.`}
        />
      </DocSection>
    </>
  )
}
