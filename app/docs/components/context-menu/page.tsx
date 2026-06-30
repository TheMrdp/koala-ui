import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import {
  CardContextMenuDemo,
  ImageContextMenuDemo,
  ViewContextMenuDemo,
  SortContextMenuDemo,
  EditorContextMenuDemo,
} from "./demos"

export const metadata = {
  title: "Context Menu",
}

export default function ContextMenuDocsPage() {
  return (
    <>
      <DocHeader
        title="Context Menu"
        description="The actions menu that opens where you right-click. Built on Radix ContextMenu for keyboard navigation, focus management, and a11y; shares its surface, items, and density tuning with Dropdown Menu, but anchors to the cursor instead of a button."
      />

      {/* ── Hero: right-click a card ─────────────────────────────────── */}
      <ComponentPreview
        code={`<ContextMenu>
  <ContextMenuTrigger asChild>
    <Card className="w-72 cursor-default select-none transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-purple/10 text-purple">
            <FolderOpen className="size-5" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-base">Q3 Marketing Plan</CardTitle>
            <CardDescription>Edited 2 hours ago · 14 files</CardDescription>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Right-click to open the menu</p>
      </CardHeader>
    </Card>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuItem>
      <FolderOpen /> Open
      <ContextMenuShortcut>⏎</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <PencilSimple /> Rename
      <ContextMenuShortcut>⌘R</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Copy /> Duplicate
      <ContextMenuShortcut>⌘D</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <PushPin /> Pin to top
    </ContextMenuItem>
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <ShareNetwork /> Share
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-44">
        <ContextMenuItem>
          <Envelope /> Email
        </ContextMenuItem>
        <ContextMenuItem>
          <Link /> Copy link
          <ContextMenuShortcut>⌘L</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ChatCircle /> Send message
        </ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">
      <Trash /> Delete
      <ContextMenuShortcut>⌫</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
      >
        <CardContextMenuDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="context-menu" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  ContextMenu, ContextMenuTrigger, ContextMenuContent,
  ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut,
} from "@/components/ui/context-menu"
import { Card } from "@/components/ui/card"
import { Copy, PencilSimple, Trash } from "@phosphor-icons/react"

export function Example() {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Card className="w-72 select-none p-6">Right-click me</Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem>
          <PencilSimple /> Rename
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy /> Duplicate
          <ContextMenuShortcut>⌘D</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <Trash /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}`}
        />
      </DocSection>

      {/* ── Image trigger ────────────────────────────────────────────── */}
      <DocSection title="Any surface as the trigger">
        <p className="mt-4 text-pretty text-muted-foreground">
          Wrap any element with <code className="font-mono text-sm">ContextMenuTrigger</code> and{" "}
          <code className="font-mono text-sm">asChild</code>; the menu opens at the cursor anywhere
          inside it. An image is the classic right-click target.
        </p>
        <ComponentPreview
          code={`<ContextMenu>
  <ContextMenuTrigger asChild>
    <figure className="aspect-[3/2] w-72 overflow-hidden rounded-xl border border-border shadow-xs">
      <img src="/landscape.jpg" alt="Mountain landscape" className="size-full object-cover" />
    </figure>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-52">
    <ContextMenuItem>
      <CornersOut /> Open full size
    </ContextMenuItem>
    <ContextMenuItem>
      <ImageSquare /> Copy image
      <ContextMenuShortcut>⌘C</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Link /> Copy image address
    </ContextMenuItem>
    <ContextMenuSeparator />
    <ContextMenuItem>
      <DownloadSimple /> Save image
      <ContextMenuShortcut>⌘S</ContextMenuShortcut>
    </ContextMenuItem>
    <ContextMenuItem>
      <Star /> Add to favorites
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ImageContextMenuDemo />
        </ComponentPreview>
      </DocSection>

      {/* ── Checkbox items ───────────────────────────────────────────── */}
      <DocSection title="Checkbox items">
        <p className="mt-4 text-pretty text-muted-foreground">
          Toggle independent options straight from the menu.{" "}
          <code className="font-mono text-sm">ContextMenuCheckboxItem</code> keeps the menu open on
          click so several can be flipped in one pass.
        </p>
        <ComponentPreview
          code={`<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="flex h-40 w-72 items-center justify-center rounded-xl border border-dashed">
      Right-click the canvas
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-52">
    <ContextMenuLabel>View</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuCheckboxItem checked>Show grid</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem checked>Snap to grid</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Rulers</ContextMenuCheckboxItem>
    <ContextMenuCheckboxItem>Pixel preview</ContextMenuCheckboxItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <ViewContextMenuDemo />
        </ComponentPreview>
      </DocSection>

      {/* ── Radio items ──────────────────────────────────────────────── */}
      <DocSection title="Radio items">
        <p className="mt-4 text-pretty text-muted-foreground">
          A mutually exclusive choice lives in a{" "}
          <code className="font-mono text-sm">ContextMenuRadioGroup</code> with a shared{" "}
          <code className="font-mono text-sm">value</code>; the active row shows a check.
        </p>
        <ComponentPreview
          code={`<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="flex h-40 w-72 items-center justify-center rounded-xl border border-dashed">
      Right-click to sort
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-48">
    <ContextMenuLabel>Sort by</ContextMenuLabel>
    <ContextMenuSeparator />
    <ContextMenuRadioGroup value="modified">
      <ContextMenuRadioItem value="name">
        <TextAa /> Name
      </ContextMenuRadioItem>
      <ContextMenuRadioItem value="modified">
        <PencilSimple /> Last modified
      </ContextMenuRadioItem>
      <ContextMenuRadioItem value="size">
        <ArrowsOutCardinal /> Size
      </ContextMenuRadioItem>
    </ContextMenuRadioGroup>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <SortContextMenuDemo />
        </ComponentPreview>
      </DocSection>

      {/* ── Groups, submenus & shortcuts ─────────────────────────────── */}
      <DocSection title="Groups, submenus & shortcuts">
        <p className="mt-4 text-pretty text-muted-foreground">
          Section items with <code className="font-mono text-sm">ContextMenuGroup</code>, nest a{" "}
          <code className="font-mono text-sm">ContextMenuSub</code>, and add right-aligned hints with{" "}
          <code className="font-mono text-sm">ContextMenuShortcut</code> (decorative; wire the real
          binding in your app). Use <code className="font-mono text-sm">inset</code> to align items
          that have no leading icon.
        </p>
        <ComponentPreview
          code={`<ContextMenu>
  <ContextMenuTrigger asChild>
    <div className="flex h-40 w-72 items-center justify-center rounded-xl border border-dashed">
      Right-click the editor
    </div>
  </ContextMenuTrigger>
  <ContextMenuContent className="w-56">
    <ContextMenuGroup>
      <ContextMenuItem>
        <Copy /> Copy
        <ContextMenuShortcut>⌘C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem>
        <PencilSimple /> Cut
        <ContextMenuShortcut>⌘X</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset>
        Paste
        <ContextMenuShortcut>⌘V</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuGroup>
    <ContextMenuSeparator />
    <ContextMenuSub>
      <ContextMenuSubTrigger>
        <ShareNetwork /> Share
      </ContextMenuSubTrigger>
      <ContextMenuSubContent className="w-44">
        <ContextMenuItem>
          <Envelope /> Email link
        </ContextMenuItem>
        <ContextMenuItem>
          <Link /> Copy link
          <ContextMenuShortcut>⌘L</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ChatCircle /> Messages
        </ContextMenuItem>
      </ContextMenuSubContent>
    </ContextMenuSub>
    <ContextMenuSeparator />
    <ContextMenuItem variant="destructive">
      <Trash /> Delete
      <ContextMenuShortcut>⌫</ContextMenuShortcut>
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`}
        >
          <EditorContextMenuDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I use a Context Menu versus a Dropdown Menu?",
              a: "They share the same surface and items; the difference is how they open. A Dropdown Menu opens on click of a visible trigger button, so the affordance is obvious. A Context Menu opens on right-click (or long-press) of an arbitrary area like a card, row, image, or canvas, so it is best for secondary or power-user actions that should not take up button space. Many apps offer both: a more-actions button and the same actions on right-click.",
            },
            {
              q: "How do I make a card or any element the trigger?",
              a: "Pass `asChild` to ContextMenuTrigger and render your element inside it, such as a Card or a figure. Radix attaches the right-click handler and ARIA to your element instead of rendering its own wrapper, and the menu anchors to the cursor position within it.",
            },
            {
              q: "Why doesn't ContextMenuContent take a `side` or `sideOffset`?",
              a: "A context menu is positioned at the cursor where you right-clicked, not relative to a trigger element, so there is no side or gap to offset. Radix still flips the menu to stay on-screen and sets data-side, which drives the same fade-and-slide enter animation Dropdown Menu uses.",
            },
            {
              q: "Does ContextMenuShortcut bind the keyboard shortcut?",
              a: "No. ContextMenuShortcut is purely decorative right-aligned text rendered through the shared Kbd primitive, so it just displays the hint like ⌘R. Wire up the real key binding in your app with a global listener.",
            },
            {
              q: "How does it behave on touch devices?",
              a: "Radix opens the menu on long-press, the platform convention for touch. Keep the right-click actions reachable another way too (a more-actions button) since not every user will discover the long-press gesture.",
            },
            {
              q: "How do I tighten the menu for dense application UI?",
              a: "Set `density=\"compact\"` on ContextMenuContent, or drive it globally with DensityProvider since every part reads the density context. Compact reduces item padding and keeps the inner radius concentric with the content's rounded border.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}
