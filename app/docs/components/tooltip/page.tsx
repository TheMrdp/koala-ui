import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { MotionDemo } from "@/components/docs/motion-demo"
import {
  HeroDemo,
  PlacementDemo,
  IconContentDemo,
  InteractiveDemo,
  GroupDemo,
  FormInputDemo,
  DialogDemo,
  KeyboardShortcutDemo,
  ShiftAwayDemo,
  GlideDemo,
} from "./demos"

export const metadata = { title: "Tooltip" }

export default function TooltipDocsPage() {
  return (
    <>
      <DocHeader
        title="Tooltip"
        description="A small hint shown on hover or focus. Positioning, hover-intent and a11y come from Tippy.js in headless mode - Koala owns the bubble's markup, styled with our tokens. The one component built on a non-Radix primitive."
      />

      <ComponentPreview
        code={`<Button iconOnly aria-label="Save changes">
  <FloppyDisk />
</Button>`}
      >
        <HeroDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="tooltip" dependencies="npm install @tippyjs/react" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { FloppyDisk } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip"

export function Example() {
  return (
    <Tooltip content="Save changes">
      <Button iconOnly aria-label="Save changes">
        <FloppyDisk />
      </Button>
    </Tooltip>
  )
}`}
        />
      </DocSection>

      <DocSection title="Placement">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">placement</code> takes any Tippy placement
          (each also accepts a <code className="font-mono text-sm">-start</code> /{" "}
          <code className="font-mono text-sm">-end</code> suffix). The bubble grows out of
          the edge nearest the trigger.
        </p>
        <ComponentPreview
          previewClassName="gap-10"
          code={`<Tooltip content="Tooltip" placement="top">…</Tooltip>
<Tooltip content="Tooltip" placement="right">…</Tooltip>
<Tooltip content="Tooltip" placement="bottom">…</Tooltip>
<Tooltip content="Tooltip" placement="left">…</Tooltip>`}
        >
          <PlacementDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With an icon">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">content</code> is any node - a leading glyph
          sits a 4px gap from the label. Pair it with an icon-only button that would
          otherwise have no visible name.
        </p>
        <ComponentPreview
          code={`<Tooltip
  content={<><Copy /> Copy to clipboard</>}
>
  <Button variant="ghost" iconOnly aria-label="Copy">
    <Copy />
  </Button>
</Tooltip>`}
        >
          <IconContentDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Interactive">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">interactive</code> keeps the tooltip open while
          the pointer is over it, so it can hold a link or action. Tune the hover-intent with{" "}
          <code className="font-mono text-sm">delay</code> (
          <code className="font-mono text-sm">[open, close]</code> in ms).
        </p>
        <ComponentPreview
          code={`<Tooltip
  interactive
  delay={[150, 80]}
  content={<>Read the <a href="/docs" className="underline">docs</a></>}
>
  <Button variant="outline" iconOnly aria-label="More info">
    <Info />
  </Button>
</Tooltip>`}
        >
          <InteractiveDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Group">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap a set of tooltips in{" "}
          <code className="font-mono text-sm">TooltipGroup</code> to share a single bubble
          that <em>glides</em> from trigger to trigger - a Tippy singleton under the hood.
          Instead of each tooltip fading out and then in with its own delay, the bubble
          repositions instantly with a CSS <code className="font-mono text-sm">transform</code>{" "}
          transition. Use this for toolbars, avatar stacks, or any dense row of labeled
          controls.
        </p>
        <ComponentPreview
          previewClassName="gap-1"
          code={`import { Tooltip, TooltipGroup } from "@/components/ui/tooltip"

<TooltipGroup>
  <Tooltip content="Edit" placement="top">
    <Button variant="ghost" iconOnly aria-label="Edit">
      <PencilSimple />
    </Button>
  </Tooltip>
  <Tooltip content="Copy" placement="top">
    <Button variant="ghost" iconOnly aria-label="Copy">
      <Copy />
    </Button>
  </Tooltip>
  <Tooltip content="Save" placement="top">
    <Button variant="ghost" iconOnly aria-label="Save">
      <FloppyDisk />
    </Button>
  </Tooltip>
  <Tooltip content="Delete" placement="top">
    <Button variant="ghost" iconOnly aria-label="Delete">
      <Trash />
    </Button>
  </Tooltip>
</TooltipGroup>`}
        >
          <GroupDemo />
        </ComponentPreview>
        <p className="mt-4 text-pretty text-muted-foreground">
          The <code className="font-mono text-sm">delay</code> and{" "}
          <code className="font-mono text-sm">offset</code> props on individual{" "}
          <code className="font-mono text-sm">Tooltip</code>s inside a group are ignored -
          set them once on <code className="font-mono text-sm">TooltipGroup</code>.
        </p>
      </DocSection>

      <DocSection title="On form inputs">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap an <code className="font-mono text-sm">InputSuffixButton</code> in a{" "}
          <code className="font-mono text-sm">Tooltip</code> to surface field hints - password
          rules, format requirements, contextual help - without cluttering the label. Place the
          button directly inside <code className="font-mono text-sm">InputRoot</code> (not inside{" "}
          <code className="font-mono text-sm">InputSuffix</code>, which is{" "}
          <code className="font-mono text-sm">aria-hidden</code>) so keyboard users can reach it.
        </p>
        <ComponentPreview
          code={`<div className="w-72 space-y-4">
  <div className="space-y-1.5">
    <label className="text-sm font-medium">API key</label>
    <InputRoot>
      <InputField placeholder="sk-…" />
      <Tooltip content="Your secret key - never share this publicly">
        <InputSuffixButton aria-label="API key help">
          <Question />
        </InputSuffixButton>
      </Tooltip>
    </InputRoot>
  </div>
  <div className="space-y-1.5">
    <label className="text-sm font-medium">Webhook URL</label>
    <InputRoot>
      <InputField placeholder="https://…" />
      <Tooltip
        content="Must be HTTPS and return 200 within 5 s"
        placement="right"
      >
        <InputSuffixButton aria-label="Webhook URL requirements">
          <Info />
        </InputSuffixButton>
      </Tooltip>
    </InputRoot>
  </div>
</div>`}
        >
          <FormInputDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Inside a dialog">
        <p className="mt-4 text-pretty text-muted-foreground">
          Tippy appends its bubble to{" "}
          <code className="font-mono text-sm">document.body</code>, so tooltips always
          render above the dialog&apos;s stacking context - no extra{" "}
          <code className="font-mono text-sm">z-index</code> or portal config required.
          A small icon next to a form label is the most common pattern.
        </p>
        <ComponentPreview
          code={`<Dialog>
  <DialogTrigger asChild>
    <Button>Open dialog</Button>
  </DialogTrigger>
  <DialogContent size="sm">
    <DialogHeader>
      <DialogTitle>Create webhook</DialogTitle>
      <DialogDescription>
        Koala will POST a JSON payload to this URL on each event.
      </DialogDescription>
    </DialogHeader>
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium">Endpoint URL</label>
          <Tooltip content="Must be HTTPS and publicly reachable" trigger="mouseenter">
            <button
              type="button"
              aria-label="Endpoint URL help"
              className="rounded text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
            >
              <Info className="size-3.5" />
            </button>
          </Tooltip>
        </div>
        <InputRoot>
          <InputField placeholder="https://…" />
        </InputRoot>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium">Secret</label>
          <Tooltip
            content="Signs the X-Koala-Signature header"
            placement="right"
            trigger="mouseenter"
          >
            <button
              type="button"
              aria-label="Secret help"
              className="rounded text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
            >
              <Lock className="size-3.5" />
            </button>
          </Tooltip>
        </div>
        <InputRoot>
          <InputField placeholder="whsec_…" />
        </InputRoot>
      </div>
    </div>
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Create webhook</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`}
        >
          <DialogDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Keyboard shortcut hint">
        <p className="mt-4 text-pretty text-muted-foreground">
          Include a <code className="font-mono text-sm">Kbd</code> in{" "}
          <code className="font-mono text-sm">content</code> to pair an action name with
          its shortcut. Combine with{" "}
          <code className="font-mono text-sm">TooltipGroup</code> on a toolbar so the
          bubble glides between buttons instead of re-fading.
        </p>
        <ComponentPreview
          previewClassName="gap-1"
          code={`<TooltipGroup>
  <Tooltip
    placement="bottom"
    content={
      <>New file <Kbd size="sm" className="ml-1">⌘N</Kbd></>
    }
  >
    <Button variant="ghost" iconOnly aria-label="New file">
      <FilePlus />
    </Button>
  </Tooltip>
  <Tooltip
    placement="bottom"
    content={
      <>Search <Kbd size="sm" className="ml-1">⌘K</Kbd></>
    }
  >
    <Button variant="ghost" iconOnly aria-label="Search">
      <MagnifyingGlass />
    </Button>
  </Tooltip>
  <Tooltip
    placement="bottom"
    content={
      <>Settings <Kbd size="sm" className="ml-1">⌘,</Kbd></>
    }
  >
    <Button variant="ghost" iconOnly aria-label="Settings">
      <GearSix />
    </Button>
  </Tooltip>
</TooltipGroup>`}
        >
          <KeyboardShortcutDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Transitions">
        <p className="mt-4 text-pretty text-muted-foreground">
          Both transition styles are interruptible CSS transitions - never keyframe animations
          - so re-hovering mid-exit retargets smoothly without resetting from the beginning.
        </p>

        <h3 className="mt-6 mb-1 text-base font-semibold tracking-tight">
          Shift-away (standalone)
        </h3>
        <p className="text-pretty text-muted-foreground">
          The standalone <code className="font-mono text-sm">Tooltip</code> uses a shift-away
          effect: on exit the bubble scales to 95 % and slides a few pixels away from the
          trigger. The direction is derived from{" "}
          <code className="font-mono text-sm">data-placement</code> (stamped at mount from
          Popper.js), so the bubble always retreats toward its origin edge regardless of
          the configured placement.
        </p>
        <ComponentPreview
          code={`<Tooltip content="Shift-away on exit" placement="top">
  <Button variant="outline" iconOnly aria-label="Info">
    <Info />
  </Button>
</Tooltip>`}
        >
          <ShiftAwayDemo />
        </ComponentPreview>
        <CodeSnippet
          filename="tooltip.tsx - default transition classes"
          className="mt-4"
          code={`// Opacity + scale (95→100) + directional slide driven by data-placement
"data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100"
"data-[state=hidden]:scale-95 data-[state=visible]:scale-100"

// Retreats toward the nearest trigger edge on exit:
"data-[placement^=top]:data-[state=hidden]:-translate-y-1"
"data-[placement^=bottom]:data-[state=hidden]:translate-y-1"
"data-[placement^=left]:data-[state=hidden]:-translate-x-1"
"data-[placement^=right]:data-[state=hidden]:translate-x-1"`}
        />

        <h3 className="mt-8 mb-1 text-base font-semibold tracking-tight">
          Glide (singleton / group)
        </h3>
        <p className="text-pretty text-muted-foreground">
          Inside a <code className="font-mono text-sm">TooltipGroup</code> the shared bubble
          uses the <code className="font-mono text-sm">singleton</code> transition variant:
          opacity-only on the bubble element (no scale, so it doesn't shrink between
          consecutive triggers). Spatial motion is handled entirely by Tippy's{" "}
          <code className="font-mono text-sm">moveTransition</code> - a single{" "}
          <code className="font-mono text-sm">transform</code> transition that drives the
          positional glide.
        </p>
        <ComponentPreview
          previewClassName="gap-1"
          code={`// Hover slowly between the buttons to see the glide
<TooltipGroup>
  <Tooltip content="Edit"><Button …><PencilSimple /></Button></Tooltip>
  <Tooltip content="Copy"><Button …><Copy /></Button></Tooltip>
  <Tooltip content="Save"><Button …><FloppyDisk /></Button></Tooltip>
</TooltipGroup>`}
        >
          <GlideDemo />
        </ComponentPreview>
        <CodeSnippet
          filename="tooltip.tsx - singleton transition + moveTransition"
          className="mt-4"
          code={`// Bubble: opacity-only (no scale jitter as it glides between triggers)
"data-[state=hidden]:opacity-0 data-[state=visible]:opacity-100"
"scale-100"  // fixed - spatial motion is not on the bubble element

// Positional glide - set on the Tippy singleton source:
moveTransition="transform var(--duration-fast) var(--ease-out)"`}
        />

        <h3 className="mt-8 mb-1 text-base font-semibold tracking-tight">
          Base transition (shared)
        </h3>
        <p className="text-pretty text-muted-foreground">
          Both variants extend the same base transition declaration. Only specific properties
          are named - never{" "}
          <code className="font-mono text-sm">transition: all</code> - so unrelated properties
          (like <code className="font-mono text-sm">background-color</code>) aren't
          accidentally caught and the browser can composite the animation on the GPU.
        </p>
        <CodeSnippet
          filename="tooltip.tsx - base transition"
          className="mt-4"
          code={`// Tailwind class: "transition duration-fast ease-out"
// Expands to:
//   transition-property: opacity, transform, scale, filter;
//   transition-duration: var(--duration-fast); /* 160 ms */
//   transition-timing-function: var(--ease-out); /* cubic-bezier(0.23, 1, 0.32, 1) */`}
        />
      </DocSection>

      <DocSection title="Speed & delay">
        <p className="mt-4 text-pretty text-muted-foreground">
          The bubble always animates at{" "}
          <code className="font-mono text-sm">duration-fast</code> (160 ms) - fast enough
          not to block the user, slow enough to feel intentional rather than a jump cut.
          The three motion tokens side by side:
        </p>
        <div className="mt-6">
          <MotionDemo rows="duration" />
        </div>

        <p className="mt-8 text-pretty text-muted-foreground">
          The easing curve - for both the bubble animation and the singleton glide - is{" "}
          <code className="font-mono text-sm">ease-out</code>: an aggressive initial
          velocity that decelerates sharply. It reads as snappy without being harsh, and
          is the right curve for any short UI enter/exit:
        </p>
        <div className="mt-6">
          <MotionDemo rows="easing" />
        </div>

        <p className="mt-8 text-pretty text-muted-foreground">
          Hover-intent is separate from animation speed and is controlled by the{" "}
          <code className="font-mono text-sm">delay</code> prop - an{" "}
          <code className="font-mono text-sm">[open, close]</code> tuple in ms. Animation
          speed stays at 160 ms regardless.
        </p>
        <CodeSnippet
          filename="delay examples"
          className="mt-4"
          code={`// Default - 150 ms open intent, instant close
<Tooltip delay={[150, 0]} content="…">…</Tooltip>

// Interactive - give the user time to reach the bubble before it closes
<Tooltip interactive delay={[150, 80]} content={<a href="…">Link</a>}>…</Tooltip>

// Instant open (kiosk / touch UI with no hover ambiguity)
<Tooltip delay={0} content="…">…</Tooltip>

// Group - delay is set once and shared by all children
<TooltipGroup delay={[150, 0]}>
  <Tooltip content="Save">…</Tooltip>
  <Tooltip content="Copy">…</Tooltip>
</TooltipGroup>`}
        />
      </DocSection>

      <DocSection title="API reference">
        <h3 className="mt-6 mb-1 text-base font-semibold tracking-tight">Tooltip</h3>
        <p className="mb-4 text-pretty text-muted-foreground">
          Wraps a single trigger element that must forward its ref to a DOM node - Koala's{" "}
          <code className="font-mono text-sm">Button</code> does. The standalone path drives{" "}
          <code className="font-mono text-sm">tippy.js</code> imperatively to avoid the
          React 19 <code className="font-mono text-sm">element.ref</code> crash in{" "}
          <code className="font-mono text-sm">@tippyjs/react</code>.
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-6 font-medium text-foreground">Prop</th>
              <th className="pb-2 pr-6 font-medium text-foreground">Type</th>
              <th className="pb-2 font-medium text-foreground">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">content</td>
              <td className="py-2 pr-6 text-muted-foreground">ReactNode</td>
              <td className="py-2 text-muted-foreground">-</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">children</td>
              <td className="py-2 pr-6 text-muted-foreground">ReactElement</td>
              <td className="py-2 text-muted-foreground">-</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">placement</td>
              <td className="py-2 pr-6 text-muted-foreground">Tippy placement</td>
              <td className="py-2 font-mono text-muted-foreground">"top"</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">delay</td>
              <td className="py-2 pr-6 text-muted-foreground">[open, close] | number</td>
              <td className="py-2 font-mono text-muted-foreground">[150, 0]</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">offset</td>
              <td className="py-2 pr-6 text-muted-foreground">[skidding, distance]</td>
              <td className="py-2 font-mono text-muted-foreground">[0, 6]</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">interactive</td>
              <td className="py-2 pr-6 text-muted-foreground">boolean</td>
              <td className="py-2 font-mono text-muted-foreground">false</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">trigger</td>
              <td className="py-2 pr-6 text-muted-foreground">string</td>
              <td className="py-2 font-mono text-muted-foreground">"mouseenter focus"</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">disabled</td>
              <td className="py-2 pr-6 text-muted-foreground">boolean</td>
              <td className="py-2 font-mono text-muted-foreground">false</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">className</td>
              <td className="py-2 pr-6 text-muted-foreground">string</td>
              <td className="py-2 text-muted-foreground">-</td>
            </tr>
          </tbody>
        </table>

        <h3 className="mt-10 mb-1 text-base font-semibold tracking-tight">TooltipGroup</h3>
        <p className="mb-4 text-pretty text-muted-foreground">
          Provides a Tippy singleton source via React Context. Each child{" "}
          <code className="font-mono text-sm">Tooltip</code> feeds the shared bubble.
          The <code className="font-mono text-sm">delay</code>,{" "}
          <code className="font-mono text-sm">offset</code>, and{" "}
          <code className="font-mono text-sm">disabled</code> props on individual{" "}
          <code className="font-mono text-sm">Tooltip</code>s are ignored inside a group -
          set them here.
        </p>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-2 pr-6 font-medium text-foreground">Prop</th>
              <th className="pb-2 pr-6 font-medium text-foreground">Type</th>
              <th className="pb-2 font-medium text-foreground">Default</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">children</td>
              <td className="py-2 pr-6 text-muted-foreground">ReactNode</td>
              <td className="py-2 text-muted-foreground">-</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">delay</td>
              <td className="py-2 pr-6 text-muted-foreground">[open, close] | number</td>
              <td className="py-2 font-mono text-muted-foreground">[150, 0]</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">offset</td>
              <td className="py-2 pr-6 text-muted-foreground">[skidding, distance]</td>
              <td className="py-2 font-mono text-muted-foreground">[0, 6]</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">disabled</td>
              <td className="py-2 pr-6 text-muted-foreground">boolean</td>
              <td className="py-2 font-mono text-muted-foreground">false</td>
            </tr>
            <tr>
              <td className="py-2 pr-6 font-mono text-foreground">className</td>
              <td className="py-2 pr-6 text-muted-foreground">string</td>
              <td className="py-2 text-muted-foreground">-</td>
            </tr>
          </tbody>
        </table>
      </DocSection>
    </>
  )
}
