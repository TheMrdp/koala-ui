import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { CodeSnippet } from "@/components/ui/code-snippet"
import { MotionDemo } from "@/components/docs/motion-demo"
import { StaggerDemo } from "@/components/docs/stagger-demo"
import {
  OriginScaleDemo,
  PressDemo,
  ReducedMotionDemo,
  SpringDemo,
} from "@/components/docs/motion-demos"

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

      <DocSection title="Spring: overshoot for confirmation">
        <p className="mt-4 text-pretty text-muted-foreground">
          A fourth curve, <code className="font-mono text-sm">ease-spring</code>, overshoots
          past its end value before settling back. Reserve it for moments that should feel
          rewarding - a confirmation, a checkmark, a control that pops into place - never for
          routine UI movement, where the bounce reads as nervous. Press Play to compare the
          overshoot against a flat <code className="font-mono text-sm">ease-out</code>.
        </p>
        <div className="mt-6">
          <SpringDemo />
        </div>
        <CodeSnippet
          filename="confirm.tsx"
          className="mt-4"
          code={`// Spring overshoots past the end, then settles - a "pop" on confirmation.
<div
  className={cn(
    // Name 'scale', not 'transform': in Tailwind v4 scale-* sets its own CSS property.
    "transition-[scale,opacity] duration-base ease-spring",
    confirmed ? "scale-100 opacity-100" : "scale-50 opacity-0",
  )}
/>

// JS-driven animation
import { easing, duration } from "@/lib/motion"
element.animate(keyframes, {
  duration: duration.base,        // 300
  easing: easing.spring,          // cubic-bezier(0.34, 1.56, 0.64, 1)
})`}
        />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Compose the utilities directly in components, or import the constants from{" "}
          <code className="font-mono text-sm">lib/motion.ts</code> when animating from
          JS.
        </p>
        <CodeSnippet
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
        <CodeSnippet
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
        <CodeSnippet
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

      <DocSection title="Press and hover feedback">
        <p className="mt-4 text-pretty text-muted-foreground">
          Every interactive control confirms a press with a small scale-down -{" "}
          <code className="font-mono text-sm">active:scale-[0.96]</code>, never below 0.95 -
          and cards add a subtle hover lift. The feedback is what makes a surface feel
          tappable. Hover and press the cards below; expose a{" "}
          <code className="font-mono text-sm">static</code> prop to opt out where the motion
          would be distracting.
        </p>
        <div className="mt-6">
          <PressDemo />
        </div>
        <p className="mt-4 text-pretty text-muted-foreground">
          One Tailwind v4 trap lives here:{" "}
          <code className="font-mono text-sm">scale-*</code> and{" "}
          <code className="font-mono text-sm">translate-*</code> set their own standalone CSS
          properties, not <code className="font-mono text-sm">transform</code>. A{" "}
          <code className="font-mono text-sm">transition-[box-shadow,transform]</code> will
          silently fail to tween them - they snap. Name{" "}
          <code className="font-mono text-sm">scale</code> and{" "}
          <code className="font-mono text-sm">translate</code> in the list, or use the{" "}
          <code className="font-mono text-sm">transition-transform</code> utility, which
          already covers all four.
        </p>
        <CodeSnippet
          filename="action-card.tsx"
          className="mt-4"
          code={`// ✓ Press scale + hover lift, with scale/translate named in the transition.
<button
  className="cursor-pointer rounded-xl border border-border bg-card p-4
             transition-[scale,translate,box-shadow,border-color] duration-fast ease-out
             hover:-translate-y-0.5 hover:shadow-md
             active:scale-[0.97]"
/>

// ✗ scale-* and translate-* are standalone props in v4 - 'transform' won't reach them.
<button className="transition-[box-shadow,transform] hover:-translate-y-0.5 active:scale-[0.97]" />`}
        />
      </DocSection>

      <DocSection title="Enter animations: split and stagger">
        <p className="mt-4 text-pretty text-muted-foreground">
          Animating a container as one block looks mechanical. Break the content into chunks and
          stagger each by ~70-100&nbsp;ms so the reader perceives hierarchy rather than a single
          blob appearing. Reach for the <code className="font-mono text-sm">Stagger</code> primitive
          rather than hand-rolling per-item delays. It sets each child&rsquo;s delay off the motion
          tokens, plays once on mount, and falls back to no animation under reduced-motion.
        </p>
        <div className="mt-6">
          <StaggerDemo />
        </div>
        <CodeSnippet
          filename="stagger.tsx"
          className="mt-4"
          code={`import { Stagger } from "@/lib/stagger"

// ✓ Lists / grids: one wrapper, the cascade is automatic.
<Stagger className="grid grid-cols-3 gap-2">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>

// ✓ Below the fold: reveal as it scrolls in, with a soft focus pull.
<Stagger inView blur className="grid grid-cols-3 gap-2">
  {items.map((item) => (
    <Card key={item.id}>{item.name}</Card>
  ))}
</Stagger>

// ✗ Whole container in one shot
<div className="animate-fade-in">
  <h2>Title</h2>
  <p>Body</p>
  <Button>Action</Button>
</div>`}
        />
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Stagger</code> animates on mount by default: the right
          gate for &ldquo;load&rdquo; cascades. With stable keys, reordering reuses the DOM and
          won&rsquo;t replay; genuinely new content (a filter, a fresh page, a layout switch) mounts
          and cascades. The DataTable&rsquo;s cards layout uses it. Tune the gap with{" "}
          <code className="font-mono text-sm">step</code> (default 70&nbsp;ms); add{" "}
          <code className="font-mono text-sm">blur</code> for the 4px&nbsp;→&nbsp;0 focus pull and{" "}
          <code className="font-mono text-sm">inView</code> to hold the cascade until it scrolls into
          view (the same props a{" "}
          <a href="/docs/components/section-header" className="underline underline-offset-4">
            Section Header
          </a>{" "}
          takes, so a header and the grid below it can reveal as one). Direct children must forward{" "}
          <code className="font-mono text-sm">className</code> and{" "}
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
        <CodeSnippet
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

      <DocSection title="Scale from the origin">
        <p className="mt-4 text-pretty text-muted-foreground">
          A surface that scales open - a menu, a popover, a tooltip - should grow out of the
          control that opened it, not its own center. A menu that zooms from its midpoint
          looks like it materialized in space; one anchored to its trigger looks like it
          unfolded from the button. Radix exposes the resolved corner as a CSS variable, so
          pin <code className="font-mono text-sm">transform-origin</code> to it and let the{" "}
          <code className="font-mono text-sm">zoom-in-95</code> /{" "}
          <code className="font-mono text-sm">zoom-out-95</code> enter and exit do the rest.
          Open both panels and watch where each one grows from.
        </p>
        <div className="mt-6">
          <OriginScaleDemo />
        </div>
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
        <CodeSnippet
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
        <CodeSnippet
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

      <DocSection title="Respect reduced motion">
        <p className="mt-4 text-pretty text-muted-foreground">
          Some users set <code className="font-mono text-sm">prefers-reduced-motion</code> to
          avoid animation that triggers nausea or distraction. Honor it: a one-shot entrance
          should drop to an instant appear, and any ambient loop - a spinner, a shimmer, a
          marquee - should hold still. Tailwind&rsquo;s{" "}
          <code className="font-mono text-sm">motion-reduce:</code> and{" "}
          <code className="font-mono text-sm">motion-safe:</code> variants cover the inline
          cases; the <code className="font-mono text-sm">Stagger</code> primitive already
          gates itself this way. Flip the preference below and Replay to feel the difference a
          reduced-motion user gets: the same grid, but the cascade is gone.
        </p>
        <div className="mt-6">
          <ReducedMotionDemo />
        </div>
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
        <CodeSnippet
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
