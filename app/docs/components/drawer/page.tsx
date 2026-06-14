import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  DrawerSidesShowcase,
  MobileSheetDemo,
  NestedSheetDemo,
  DrawerFormDemo,
  NavigationDrawerDemo,
} from "./demos"

export const metadata = {
  title: "Drawer",
}

export default function DrawerDocsPage() {
  return (
    <>
      <DocHeader
        title="Drawer"
        description="A panel that slides in from any edge of the screen. Built on Radix Dialog for focus trap, scroll lock and a11y; tuned for mobile with full-bleed side panels, a bottom-sheet grab handle, and swipe-to-dismiss."
      />

      <ComponentPreview
        code={`<Drawer>
  <DrawerTrigger asChild>
    <Button>Open drawer</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Notifications</DrawerTitle>
      <DrawerDescription>You're all caught up.</DrawerDescription>
    </DrawerHeader>
    <DrawerBody>{/* … */}</DrawerBody>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="ghost">Close</Button>
      </DrawerClose>
      <Button>Mark all read</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`}
      >
        <Drawer>
          <DrawerTrigger asChild>
            <Button>Open drawer</Button>
          </DrawerTrigger>
          <DrawerContent side="right">
            <DrawerHeader>
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerDescription>You&apos;re all caught up.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-muted-foreground">
                New activity from your workspace will appear here. Drag the header toward
                the right edge, press Escape, or tap outside to dismiss.
              </p>
            </DrawerBody>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="ghost">Close</Button>
              </DrawerClose>
              <Button>Mark all read</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="drawer" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader,
  DrawerBody, DrawerFooter, DrawerTitle, DrawerDescription, DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You're all caught up.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>{/* … */}</DrawerBody>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="ghost">Close</Button>
          </DrawerClose>
          <Button>Mark all read</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}`}
        />
      </DocSection>

      <DocSection title="Sides">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">side</code> on{" "}
          <code className="font-mono text-sm">DrawerContent</code> picks the edge the panel
          slides from — <code className="font-mono text-sm">top</code>,{" "}
          <code className="font-mono text-sm">right</code> (default),{" "}
          <code className="font-mono text-sm">bottom</code>, or{" "}
          <code className="font-mono text-sm">left</code>. Top and bottom render as sheets
          with a grab handle; left and right as full-height panels. Every variant animates
          with the dedicated <code className="font-mono text-sm">ease-drawer</code> curve.
        </p>
        <ComponentPreview
          code={`<DrawerContent side="top">…</DrawerContent>
<DrawerContent side="right">…</DrawerContent>  {/* default */}
<DrawerContent side="bottom">…</DrawerContent>
<DrawerContent side="left">…</DrawerContent>`}
        >
          <DrawerSidesShowcase />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Mobile — bottom sheet">
        <p className="mt-4 text-pretty text-muted-foreground">
          On touch devices the bottom sheet is the native pattern. It rounds its top corners,
          shows a grab handle, and pads past the home-indicator safe area. It is{" "}
          <strong className="text-foreground">swipe-to-dismiss</strong> by default — drag the
          handle or header down and release past ~45% (or flick) to close, handing the exit
          animation back to Radix. The drag only arms after a few pixels, so taps on the rows
          still register, and it never starts on the scrollable body — so a drag and a scroll
          never fight. Disable it with{" "}
          <code className="font-mono text-sm">swipeToClose=&#123;false&#125;</code>.
        </p>
        <ComponentPreview
          code={`<DrawerContent side="bottom" showClose={false}>
  <DrawerHeader>
    <DrawerTitle>Project roadmap</DrawerTitle>
    <DrawerDescription>Choose an action for this document.</DrawerDescription>
  </DrawerHeader>
  <DrawerBody>
    {actions.map((a) => (
      <DrawerClose asChild key={a.label}>
        <button className="…">{a.icon}{a.label}</button>
      </DrawerClose>
    ))}
  </DrawerBody>
</DrawerContent>`}
        >
          <MobileSheetDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Navigate inside the sheet">
        <p className="mt-4 text-pretty text-muted-foreground">
          A bottom sheet often needs to drill into nested views — an action sheet that opens
          a sub-panel, a settings menu, a multi-step filter — without ever leaving the sheet.
          Wrap the pages in <code className="font-mono text-sm">DrawerNav</code> and give each a{" "}
          <code className="font-mono text-sm">DrawerView</code>: only the active view renders,
          it enters with a native horizontal push (from the right going forward, the left on
          back), and the sheet&apos;s height animates to fit it. A{" "}
          <code className="font-mono text-sm">DrawerNavTrigger</code> drills in; a{" "}
          <code className="font-mono text-sm">DrawerNavBack</code> (which renders nothing at the
          root, so you can place it in a shared header) pops. The stack resets when the sheet
          closes, and swipe-down still dismisses the whole sheet from any view.
        </p>
        <ComponentPreview
          code={`<DrawerContent side="bottom" showClose={false}>
  <DrawerNav defaultView="root">
    <DrawerView view="root">
      <DrawerHeader className="flex-row items-center gap-1">
        <DrawerNavBack />            {/* hidden at the root */}
        <DrawerTitle>Settings</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <DrawerNavTrigger view="notifications" asChild>
          <button className="…">Notifications <CaretRight /></button>
        </DrawerNavTrigger>
      </DrawerBody>
    </DrawerView>

    <DrawerView view="notifications">
      <DrawerHeader className="flex-row items-center gap-1">
        <DrawerNavBack />
        <DrawerTitle>Notifications</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>{/* toggles… */}</DrawerBody>
    </DrawerView>
  </DrawerNav>
</DrawerContent>`}
        >
          <NestedSheetDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Form panel">
        <p className="mt-4 text-pretty text-muted-foreground">
          A right-side panel is the desktop home for an edit form — it keeps the underlying
          page visible for context. Compose labelled{" "}
          <a href="/docs/components/input" className="underline underline-offset-4">Input</a>{" "}
          parts in the <code className="font-mono text-sm">DrawerBody</code> and land focus on
          the first field with{" "}
          <code className="font-mono text-sm">onOpenAutoFocus</code>.
        </p>
        <ComponentPreview
          code={`<DrawerContent
  side="right"
  onOpenAutoFocus={(e) => { e.preventDefault(); nameRef.current?.focus() }}
>
  <DrawerHeader>
    <DrawerTitle>Edit profile</DrawerTitle>
    <DrawerDescription>Update your details.</DrawerDescription>
  </DrawerHeader>
  <DrawerBody>
    <div className="grid gap-4">
      <div className="grid gap-1.5">
        <InputLabel htmlFor="name">Full name</InputLabel>
        <InputRoot><InputField ref={nameRef} id="name" /></InputRoot>
      </div>
      {/* … */}
    </div>
  </DrawerBody>
  <DrawerFooter>
    <DrawerClose asChild><Button variant="ghost">Cancel</Button></DrawerClose>
    <DrawerClose asChild><Button>Save changes</Button></DrawerClose>
  </DrawerFooter>
</DrawerContent>`}
        >
          <DrawerFormDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Navigation menu">
        <p className="mt-4 text-pretty text-muted-foreground">
          A left drawer makes a compact, off-canvas navigation menu for small screens. The{" "}
          <code className="font-mono text-sm">DrawerBody</code> scrolls independently while the
          header and footer stay pinned; each link is wrapped in{" "}
          <code className="font-mono text-sm">DrawerClose</code> so picking one dismisses the
          panel.
        </p>
        <ComponentPreview
          code={`<DrawerContent side="left" size="sm">
  <DrawerHeader>
    <DrawerTitle>Koala</DrawerTitle>
    <DrawerDescription>Workspace navigation</DrawerDescription>
  </DrawerHeader>
  <DrawerBody>
    <nav className="flex flex-col gap-1">
      {items.map((i) => (
        <DrawerClose asChild key={i.label}>
          <a href={i.href} className="…">{i.icon}{i.label}</a>
        </DrawerClose>
      ))}
    </nav>
  </DrawerBody>
  <DrawerFooter className="sm:justify-start">…</DrawerFooter>
</DrawerContent>`}
        >
          <NavigationDrawerDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sizes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">size</code> caps the panel&apos;s cross-axis
          extent — the <em>width</em> of left/right panels and the <em>height</em> of
          top/bottom sheets. Panels stay full-bleed below the cap, so on a phone they fill the
          screen and on desktop they settle into a panel. Four steps:{" "}
          <code className="font-mono text-sm">sm</code>,{" "}
          <code className="font-mono text-sm">md</code> (default),{" "}
          <code className="font-mono text-sm">lg</code>,{" "}
          <code className="font-mono text-sm">xl</code>.
        </p>
        <ComponentPreview
          code={`<DrawerContent side="right" size="sm">…</DrawerContent>
<DrawerContent side="right" size="md">…</DrawerContent>  {/* default */}
<DrawerContent side="right" size="lg">…</DrawerContent>
<DrawerContent side="bottom" size="lg">…</DrawerContent>  {/* caps height */}`}
        >
          <div className="flex flex-wrap gap-3">
            {(["sm", "md", "lg", "xl"] as const).map((size) => (
              <Drawer key={size}>
                <DrawerTrigger asChild>
                  <Button variant="outline">Right · {size}</Button>
                </DrawerTrigger>
                <DrawerContent side="right" size={size}>
                  <DrawerHeader>
                    <DrawerTitle>Size {size}</DrawerTitle>
                    <DrawerDescription>
                      Panel width is capped at the {size} step; it shrinks to fit narrow
                      viewports.
                    </DrawerDescription>
                  </DrawerHeader>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button>Done</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            ))}
          </div>
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> tightens padding, gaps and the
          title for application UI; it re-provides itself to the header, body and footer so
          every part stays in sync. Best driven once via{" "}
          <code className="font-mono text-sm">DensityProvider</code> — see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>.
        </p>
        <ComponentPreview
          code={`<DrawerContent side="right" density="compact">…</DrawerContent>`}
        >
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Open compact</Button>
            </DrawerTrigger>
            <DrawerContent side="right" density="compact">
              <DrawerHeader>
                <DrawerTitle>Compact drawer</DrawerTitle>
                <DrawerDescription>
                  Tighter padding and a 1rem title for dense application UI.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button>Got it</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ComponentPreview>
      </DocSection>

    </>
  )
}
