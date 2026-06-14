import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  SidebarDemo,
  SidebarSwitcherDemo,
  SidebarSwitcherVariantDemo,
  SidebarItemDemo,
  SidebarDensityDemo,
} from "./demos"

export const metadata = { title: "Sidebar" }

const heroCode = `<Sidebar aria-label="Main">
  <SidebarHeader>
    {/* workspace switcher: a SidebarSwitcher in a DropdownMenu */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarSwitcher leading={<Logo />} title="Acme Inc" subtitle="Enterprise plan" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">…</DropdownMenuContent>
    </DropdownMenu>
  </SidebarHeader>

  <SidebarContent>
    {/* primary pages — first, unlabeled */}
    <SidebarGroup aria-label="Primary">
      <SidebarItem active><SquaresFour /> Dashboard</SidebarItem>
      <SidebarItem>
        <Tray /> Inbox
        <Badge variant="secondary" size="sm" className="ml-auto tabular-nums">8</Badge>
      </SidebarItem>
      <SidebarItem><Stack /> Projects</SidebarItem>
    </SidebarGroup>

    {/* favorites — starred pages, marked with their page color */}
    <SidebarGroup aria-label="Favorites">
      <SidebarGroupLabel>Favorites</SidebarGroupLabel>
      <SidebarItem><Dot className="bg-purple" /> Q3 Roadmap</SidebarItem>
      <SidebarItem><Dot className="bg-teal" /> Design System</SidebarItem>
    </SidebarGroup>

    {/* a clearly-labeled section */}
    <SidebarGroup aria-label="Workspace">
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarItem><UsersThree /> Members</SidebarItem>
      <SidebarItem><GearSix /> Settings</SidebarItem>
    </SidebarGroup>
  </SidebarContent>

  <SidebarFooter>
    {/* profile switcher: same trigger, menu opens upward */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarSwitcher leading={<Avatar />} title="Mara Okonkwo" subtitle="mara@acme.io" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start">…</DropdownMenuContent>
    </DropdownMenu>
  </SidebarFooter>
</Sidebar>`

export default function SidebarDocsPage() {
  return (
    <>
      <DocHeader
        title="Sidebar"
        description="The application navigation rail. Stack the parts you need: a workspace switcher up top, the primary pages first, clearly-labeled sections and favorites below, and a profile switcher pinned to the bottom. Both switchers are the same trigger, composed with the Dropdown Menu for the menu behavior."
      />

      <ComponentPreview previewClassName="block p-6" code={heroCode}>
        <SidebarDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="sidebar" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter,
  SidebarGroup, SidebarGroupLabel, SidebarItem, SidebarSwitcher,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar aria-label="Main">
      <SidebarHeader>{/* workspace switcher */}</SidebarHeader>
      <SidebarContent>
        <SidebarGroup aria-label="Primary">
          <SidebarItem active>{/* <Icon /> Label */}</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* profile switcher */}</SidebarFooter>
    </Sidebar>
  )
}`}
        />
      </DocSection>

      <DocSection title="Anatomy">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Sidebar</code> is a flex column on a{" "}
          <code className="font-mono text-sm">bg-card</code> surface.{" "}
          <code className="font-mono text-sm">SidebarHeader</code> and{" "}
          <code className="font-mono text-sm">SidebarFooter</code> pin to the top and bottom
          with a hairline separator; <code className="font-mono text-sm">SidebarContent</code>{" "}
          is the scroll region in between. Inside it,{" "}
          <code className="font-mono text-sm">SidebarGroup</code> is a navigation section —
          give it a <code className="font-mono text-sm">SidebarGroupLabel</code> when it needs
          a heading, or leave it unlabeled for the primary pages. Each{" "}
          <code className="font-mono text-sm">SidebarItem</code> is a row.
        </p>
      </DocSection>

      <DocSection title="Switchers">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">SidebarSwitcher</code> is one trigger used for
          both the workspace switcher (top) and the profile switcher (bottom): a{" "}
          <code className="font-mono text-sm">leading</code> visual, a{" "}
          <code className="font-mono text-sm">title</code>/<code className="font-mono text-sm">subtitle</code>{" "}
          stack, and an up/down caret. It renders a real{" "}
          <code className="font-mono text-sm">{`<button>`}</code>, so it drops straight into a{" "}
          <code className="font-mono text-sm">DropdownMenuTrigger asChild</code> — Radix owns
          the keyboard, focus, and ARIA; the switcher stays lit while its menu is open.
        </p>
        <ComponentPreview
          previewClassName="block p-6"
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <SidebarSwitcher leading={<Logo />} title="Acme Inc" subtitle="Enterprise plan" />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuItem><Buildings /> Acme Inc <Check className="ml-auto" /></DropdownMenuItem>
    <DropdownMenuItem><Rocket /> Skunkworks</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem><Plus /> Create workspace</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <SidebarSwitcherDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Minimal switcher">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">SidebarSwitcher</code> takes a{" "}
          <code className="font-mono text-sm">variant</code>. The default is the full
          identity row; <code className="font-mono text-sm">minimal</code> is smaller and
          lighter — a tighter gap, a small muted caret, and reduced padding — for a secondary
          or inline switcher. Pair it with a smaller{" "}
          <code className="font-mono text-sm">leading</code> (an{" "}
          <code className="font-mono text-sm">Avatar size=&quot;xs&quot;</code> or a compact
          logo tile) and drop the <code className="font-mono text-sm">subtitle</code> for the
          most compact trigger.
        </p>
        <ComponentPreview
          previewClassName="block p-6"
          code={`{/* smaller leading + no subtitle reads as the most compact trigger */}
<SidebarSwitcher
  variant="minimal"
  leading={<Avatar size="xs" />}
  title="Acme Inc"
/>`}
        >
          <SidebarSwitcherVariantDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Items">
        <p className="mt-4 text-pretty text-muted-foreground">
          A <code className="font-mono text-sm">SidebarItem</code> is a{" "}
          <code className="font-mono text-sm">{`<button>`}</code> by default; pass{" "}
          <code className="font-mono text-sm">asChild</code> to wrap an{" "}
          <code className="font-mono text-sm">{`<a>`}</code> or a Next{" "}
          <code className="font-mono text-sm">{`<Link>`}</code>. Mark the current page with{" "}
          <code className="font-mono text-sm">active</code> (it fills the row and sets{" "}
          <code className="font-mono text-sm">aria-current=&quot;page&quot;</code>). Lay the
          children out as <code className="font-mono text-sm">{`<Icon /> Label`}</code> and
          push a trailing <code className="font-mono text-sm">Badge</code> or count to the
          right with <code className="font-mono text-sm">ml-auto</code>.
        </p>
        <ComponentPreview
          previewClassName="block p-6"
          code={`<SidebarItem active><SquaresFour /> Active page</SidebarItem>
<SidebarItem><Stack /> Default page</SidebarItem>
<SidebarItem>
  <Tray /> With a count
  <Badge variant="secondary" size="sm" className="ml-auto tabular-nums">12</Badge>
</SidebarItem>
<SidebarItem disabled><GearSix /> Disabled page</SidebarItem>
<SidebarItem asChild>
  <a href="#"><CalendarBlank /> A real link (asChild)</a>
</SidebarItem>`}
        >
          <SidebarItemDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> on{" "}
          <code className="font-mono text-sm">Sidebar</code> flows through context to the zone
          padding, the inter-section gap, the row height, and the switcher padding.{" "}
          <code className="font-mono text-sm">compact</code> is the default (app UI);{" "}
          <code className="font-mono text-sm">comfortable</code> is roomier. Set it once here
          or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code> — see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">
            Density
          </a>
          .
        </p>
        <ComponentPreview
          previewClassName="block p-6"
          code={`<Sidebar density="comfortable" aria-label="Main">…</Sidebar>`}
        >
          <SidebarDensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Sidebar</code> renders an{" "}
          <code className="font-mono text-sm">{`<aside>`}</code> landmark and takes{" "}
          <code className="font-mono text-sm">density</code>, which flows through Context to
          every part. It defaults to <code className="font-mono text-sm">w-64</code> with a
          right border on a <code className="font-mono text-sm">bg-card</code> surface —
          override with <code className="font-mono text-sm">className</code> (e.g. drop the
          border and surface to nest it inside a{" "}
          <a href="/docs/components/layout" className="underline underline-offset-4">
            Layout
          </a>{" "}
          gutter).{" "}
          <code className="font-mono text-sm">SidebarGroup</code> renders a{" "}
          <code className="font-mono text-sm">{`<nav>`}</code>;{" "}
          <code className="font-mono text-sm">SidebarItem</code> takes{" "}
          <code className="font-mono text-sm">active</code> and{" "}
          <code className="font-mono text-sm">asChild</code>.{" "}
          <code className="font-mono text-sm">SidebarSwitcher</code> takes{" "}
          <code className="font-mono text-sm">leading</code>,{" "}
          <code className="font-mono text-sm">title</code>,{" "}
          <code className="font-mono text-sm">subtitle</code>,{" "}
          <code className="font-mono text-sm">caret</code>, and{" "}
          <code className="font-mono text-sm">variant</code> (
          <code className="font-mono text-sm">default</code> ·{" "}
          <code className="font-mono text-sm">minimal</code>). Every part forwards its native
          props and merges <code className="font-mono text-sm">className</code> last.
        </p>
      </DocSection>
    </>
  )
}
