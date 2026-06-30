import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { cn } from "@/lib/utils"
import {
  SelectPlanDemo,
  DropdownActionsDemo,
  WrongDropdownAsSelectDemo,
  DialogDeleteDemo,
  ToastSaveDemo,
  TooltipToolbarDemo,
  TabularNumsDemo,
  ConcentricRadiusDemo,
  IconAnimationDemo,
  ShadowVsBorderDemo,
  ImageOutlineDemo,
  TextWrapDemo,
  AntialiasingDemo,
  InterruptibleAnimationDemo,
  StaggeredEnterDemo,
  OpticalAlignmentDemo,
} from "./demos"

export const metadata = {
  title: "Patterns",
}

function PatternCard({
  verdict,
  label,
  caption,
  children,
}: {
  verdict: "do" | "dont"
  label: string
  caption: string
  children: React.ReactNode
}) {
  const isDo = verdict === "do"
  return (
    // Outer card: rounded-2xl (16px). Inner preview is inset with mx-2 (8px gap),
    // so inner radius = 16 - 8 = 8px = rounded-lg. ✓ concentric border radius.
    <div
      className={cn(
        "rounded-2xl border",
        isDo ? "border-border" : "border-destructive/30",
      )}
    >
      {/* Header - dot indicator is lighter than a full icon */}
      <div className="flex items-center gap-2.5 px-4 pb-2.5 pt-3.5">
        <span
          className={cn(
            "size-2 shrink-0 rounded-full",
            isDo ? "bg-emerald-500" : "bg-destructive",
          )}
        />
        <span className="text-sm font-medium">{label}</span>
      </div>

      {/* Preview - inset 8px each side, shadow-inner adds depth without a border */}
      <div
        className={cn(
          "mx-2 flex min-h-52 items-center justify-center overflow-hidden rounded-lg p-8 shadow-inner",
          isDo ? "bg-muted/50" : "bg-destructive/5",
        )}
      >
        {children}
      </div>

      {/* Footer */}
      <p className="px-4 py-3 text-pretty text-sm text-muted-foreground">
        {caption}
      </p>
    </div>
  )
}

export default function PatternsPage() {
  return (
    <>
      <DocHeader
        title="Patterns"
        description="Component decision guide - when to reach for which piece, with live examples of each pattern in context."
      />

      {/* ── Select vs. Dropdown Menu ──────────────────────────────── */}
      <DocSection title="Select vs. Dropdown Menu">
        <p className="mt-4 text-pretty text-muted-foreground">
          Both open a list on click - but they model different interactions.{" "}
          <strong className="text-foreground">Select carries a value</strong>{" "}
          (part of a form, trigger echoes the selection).{" "}
          <strong className="text-foreground">Dropdown Menu triggers actions</strong>{" "}
          (commands run, trigger stays fixed).
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PatternCard
            verdict="do"
            label="Select - picking a value"
            caption="Click an option - the trigger updates to echo your choice. Correct for plan, country, sort order, or any form field."
          >
            <SelectPlanDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Dropdown Menu - triggering actions"
            caption={`The trigger always reads "My account". Clicking an item runs a command - nothing is stored in the trigger.`}
          >
            <DropdownActionsDemo />
          </PatternCard>
        </div>

        <div className="mt-4">
          <PatternCard
            verdict="dont"
            label="Don't - Dropdown for value selection"
            caption={`Click any option. The trigger stays "Plan" - users can't tell what's selected, and the value can't be read as a form field.`}
          >
            <WrongDropdownAsSelectDemo />
          </PatternCard>
        </div>

        <p className="mt-5 text-pretty text-muted-foreground">
          Quick smell test: should the trigger echo whatever was picked? Use{" "}
          <strong className="text-foreground">Select</strong>. Should it stay the same
          label regardless? Use{" "}
          <strong className="text-foreground">Dropdown Menu</strong>.
        </p>
      </DocSection>

      {/* ── Dialog vs. Toast ─────────────────────────────────────── */}
      <DocSection title="Dialog vs. Toast">
        <p className="mt-4 text-pretty text-muted-foreground">
          <strong className="text-foreground">Dialog demands a decision</strong> - it
          blocks the page until the user acts.{" "}
          <strong className="text-foreground">Toast is a passive observer</strong> - it
          confirms what already happened and dismisses itself.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PatternCard
            verdict="do"
            label="Dialog - requires a response"
            caption="A destructive action needs explicit confirmation. The page blocks until the user decides - cancel or delete."
          >
            <DialogDeleteDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Toast - status feedback"
            caption="The save already happened. Toast confirms it without interrupting the user's flow - it disappears on its own."
          >
            <ToastSaveDemo />
          </PatternCard>
        </div>

        <p className="mt-5 text-pretty text-muted-foreground">
          Never use a Toast to report an error the user must act on - those get missed.
          Use a Dialog, or inline validation next to the field instead.
        </p>
      </DocSection>

      {/* ── Tooltip - when to escalate ───────────────────────────── */}
      <DocSection title="Tooltip - and when to escalate">
        <p className="mt-4 text-pretty text-muted-foreground">
          Tooltips are <strong className="text-foreground">supplementary labels</strong>
          , not content containers - they follow the WAI-ARIA tooltip role strictly. Hover
          the toolbar: the bubble glides between triggers via{" "}
          <code className="font-mono text-sm">TooltipGroup</code>.
        </p>

        <div className="mt-6">
          <PatternCard
            verdict="do"
            label="Tooltip - labelling icon controls"
            caption="Hover any button. Labels clarify icons without adding visual weight to the layout."
          >
            <TooltipToolbarDemo />
          </PatternCard>
        </div>

        <ul className="mt-5 space-y-1.5 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Never</span> put a link,
            button, or form inside a Tooltip - screen readers won’t reach it and pointer
            users can’t reliably click it.
          </li>
          <li>
            If the overlay needs to be{" "}
            <span className="font-medium text-foreground">clickable</span>, use a{" "}
            <strong className="text-foreground">Dropdown Menu</strong> (supports hover
            open).
          </li>
          <li>
            If it needs a{" "}
            <span className="font-medium text-foreground">form or a destructive action</span>
            , escalate to a <strong className="text-foreground">Dialog</strong>.
          </li>
        </ul>
      </DocSection>

      {/* ── Details that make interfaces feel better ─────────────── */}
      <DocSection title="Details that make interfaces feel better">
        {/* Attribution */}
        <div className="mt-4 rounded-xl border border-border bg-muted/30 px-4 py-3">
          <p className="text-sm text-muted-foreground">
            Sourced from{" "}
            <a
              href="https://jakub.kr/writing/details-that-make-interfaces-feel-better"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Details that make interfaces feel better
            </a>{" "}
            by{" "}
            <a
              href="https://jakub.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2 transition-opacity hover:opacity-70"
            >
              Jakub Krehel
            </a>
            . Worth reading in full.
          </p>
        </div>

        <p className="mt-4 text-pretty text-muted-foreground">
          No single detail here is a feature - each one is a fraction of a second, a pixel,
          a rendering quirk. Stacked, they’re the difference between a UI that was{" "}
          <em>built</em> and one that was <em>designed</em>.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <PatternCard
            verdict="do"
            label="Tabular numbers"
            caption="Watch the left counter: proportional digits shift width as values change (narrow 1 vs wide 9). The right stays locked. font-variant-numeric: tabular-nums makes every digit equal-width."
          >
            <TabularNumsDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Concentric border radius"
            caption="outer radius − gap = inner radius. With p-2 (8px) and a rounded-2xl (16px) wrapper, the inner surface wants rounded-lg (8px). Mismatching makes corners look accidental."
          >
            <ConcentricRadiusDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Animate icons on entry"
            caption="Hover each button. Opacity-only pops the icon in abruptly. Adding scale makes the entry feel physical - the icon grows into place rather than materialising out of nowhere."
          >
            <IconAnimationDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Shadows over solid borders"
            caption="Layered box-shadows with rgba transparency adapt to any background. Solid borders assume a fixed surface colour; shadows cooperate with whatever is underneath."
          >
            <ShadowVsBorderDemo />
          </PatternCard>
        </div>

        <div className="mt-4">
          <PatternCard
            verdict="do"
            label="Image outlines"
            caption="A 1px inset outline at 10% opacity defines the edge of images and gradients against any background - especially on light-on-light or dark-on-dark surfaces where the boundary would otherwise dissolve."
          >
            <ImageOutlineDemo />
          </PatternCard>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <PatternCard
            verdict="do"
            label="Text wrap: balance"
            caption="Distributes a heading's text evenly across lines, preventing a short orphaned word on the last line. Pair with text-wrap: pretty on body copy."
          >
            <TextWrapDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Font smoothing"
            caption="-webkit-font-smoothing: antialiased switches macOS from subpixel to grayscale rendering - slightly thinner, crisper strokes. Apply once on the root; already set in globals.css."
          >
            <AntialiasingDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Interruptible animations"
            caption="Hover out of each bar mid-way. The keyframe bar snaps back to zero - it can't be interrupted. The transition bar reverses smoothly from wherever it is."
          >
            <InterruptibleAnimationDemo />
          </PatternCard>

          <PatternCard
            verdict="do"
            label="Staggered enter, subtle exit"
            caption="Items cascade in with 75 ms delays - enter takes 350 ms. Exit fires all at once in 180 ms with no stagger. Exits should be faster and quieter than entrances."
          >
            <StaggeredEnterDemo />
          </PatternCard>
        </div>

        <div className="mt-4">
          <PatternCard
            verdict="do"
            label="Optical alignment"
            caption="A trailing arrow shifts the button's visual weight right - equal padding (24/24) looks off-balance. Reducing the right side to 18px restores the feel. Toggle Show Padding to measure."
          >
            <OpticalAlignmentDemo />
          </PatternCard>
        </div>
      </DocSection>
    </>
  )
}
