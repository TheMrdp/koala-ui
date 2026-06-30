import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import {
  LayoutShellDemo,
  LayoutWidthDemo,
  LayoutDensityDemo,
  LayoutAnatomyDemo,
  LayoutWidthBlueprintDemo,
  LayoutPageHeaderDemo,
  LayoutStickyHeaderDemo,
  LayoutMobileDemo,
  LayoutDocsDemo,
  LayoutResizableDemo,
  LayoutResizableInsetDemo,
  LayoutResizableInspectorDemo,
  SplitLayoutDemo,
  SplitLayoutReverseDemo,
} from "./demos"

export const metadata = { title: "Layout" }

const shellCode = `<Layout className="h-svh overflow-hidden">
  <LayoutSidebar className="p-0">
    {/* the DS Sidebar, made transparent to sit in the gutter */}
    <Sidebar aria-label="Main" className="w-full border-r-0 bg-transparent">
      <SidebarHeader>{/* workspace switcher */}</SidebarHeader>
      <SidebarContent>
        <SidebarGroup aria-label="Primary">
          <SidebarItem active><GearSix /> Settings</SidebarItem>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>{/* profile switcher */}</SidebarFooter>
    </Sidebar>
  </LayoutSidebar>

  <LayoutContent>            {/* the inset, rounded, elevated panel */}
    <LayoutContainer>        {/* centered max-width column */}
      <LayoutHeader>         {/* breadcrumbs row at the top */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Billing</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Invoices</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </LayoutHeader>

      <h1 className="text-2xl font-semibold">General settings</h1>

      {/* settings sections: Field + Input + Select + Checkbox */}
      <Field>
        <FieldLabel>Full name</FieldLabel>
        <InputRoot><InputField defaultValue="Mara Okonkwo" /></InputRoot>
      </Field>

      <div className="flex justify-end gap-2">
        <Button variant="ghost">Cancel</Button>
        <Button>Save changes</Button>
      </div>
    </LayoutContainer>
  </LayoutContent>
</Layout>`

export default function LayoutDocsPage() {
  return (
    <>
      <DocHeader
        title="Layout"
        description="The application and page shell. One set of parts, two variants: the default panel (the SaaS app-shell whose signature is the sidebar indent, with content in an elevated, rounded panel inset from the canvas) and flat, the three-column docs/reading shell with content sitting flat on the page and an aside for the table of contents."
      />

      <ComponentPreview previewClassName="block p-0" code={shellCode}>
        <LayoutShellDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="layout" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  Layout, LayoutSidebar, LayoutContent,
  LayoutContainer, LayoutHeader,
} from "@/components/ui/layout"

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Layout className="h-svh overflow-hidden">
      <LayoutSidebar>{/* nav */}</LayoutSidebar>
      <LayoutContent>
        <LayoutContainer>
          <LayoutHeader>{/* breadcrumbs */}</LayoutHeader>
          {children}
        </LayoutContainer>
      </LayoutContent>
    </Layout>
  )
}`}
        />
      </DocSection>

      <DocSection title="Variants">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">variant</code> picks the shell, and both share the
          same parts.{" "}
          <code className="font-mono text-sm">panel</code> (the default) is the SaaS app-shell
          documented throughout this page: content lives in an elevated, rounded card inset from
          the canvas, with the sidebar in the surrounding gutter.{" "}
          <code className="font-mono text-sm">flat</code> is the docs/reading shell. Content sits
          flat on the page, the rail and a right-hand{" "}
          <code className="font-mono text-sm">LayoutAside</code> are divided from it by hairlines,
          and the page scrolls as a whole (the content isn&rsquo;t its own scroll container) so a
          window scroll-spy can drive an &ldquo;on this page&rdquo; list. This very documentation
          site runs on the <code className="font-mono text-sm">flat</code> variant.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<Layout variant="flat">
  <LayoutSidebar>{/* the docs rail */}</LayoutSidebar>
  <LayoutContent>
    <LayoutContainer width="narrow">
      {children}
    </LayoutContainer>
  </LayoutContent>
  <LayoutAside>{/* on-this-page nav */}</LayoutAside>
</Layout>`}
        >
          <LayoutDocsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Anatomy">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Layout</code> is a flex row on the{" "}
          <code className="font-mono text-sm">bg-background</code> canvas.{" "}
          <code className="font-mono text-sm">LayoutContent</code> is the indent: a{" "}
          <code className="font-mono text-sm">bg-card</code> panel inset on every side
          (flush against the sidebar on the left), lifted with a shadow and a hairline
          ring so it reads as a contained surface in every theme.{" "}
          <code className="font-mono text-sm">LayoutContainer</code> centers the column
          and <code className="font-mono text-sm">LayoutHeader</code> lays out the
          breadcrumbs row.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-background">
          <LayoutAnatomyDemo />
        </div>
        <p className="mt-6 text-pretty text-muted-foreground">
          Space is distributed across three nested bands:
        </p>
        <ul className="mt-3 flex flex-col gap-2 text-pretty text-muted-foreground">
          <li>
            <strong className="font-medium text-foreground">Gutter</strong>: the{" "}
            <code className="font-mono text-sm">bg-background</code> canvas.{" "}
            <code className="font-mono text-sm">LayoutContent</code> insets{" "}
            <code className="font-mono text-sm">m-2</code> (8px) on every side so the
            panel floats; the left inset drops at{" "}
            <code className="font-mono text-sm">lg</code> so the panel sits flush against
            the rail. The <code className="font-mono text-sm">w-64</code> (256px) sidebar
            lives in this band.
          </li>
          <li>
            <strong className="font-medium text-foreground">Panel</strong>: the{" "}
            <code className="font-mono text-sm">bg-card</code> surface,{" "}
            <code className="font-mono text-sm">rounded-2xl</code> (16px). Nest surfaces
            inside it with a smaller, concentric radius (
            <code className="font-mono text-sm">16px − padding</code>).
          </li>
          <li>
            <strong className="font-medium text-foreground">Column</strong>:{" "}
            <code className="font-mono text-sm">LayoutContainer</code> centers a max-width
            column (<code className="font-mono text-sm">mx-auto</code>) and sets the
            content padding. Horizontal padding is responsive: it steps up at{" "}
            <code className="font-mono text-sm">sm</code> and{" "}
            <code className="font-mono text-sm">lg</code> so content breathes on wider
            viewports.
          </li>
        </ul>
        <ComponentPreview previewClassName="block p-0" code={shellCode}>
          <LayoutShellDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Container width">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">LayoutContainer</code> takes a{" "}
          <code className="font-mono text-sm">width</code>:{" "}
          <code className="font-mono text-sm">narrow</code> (
          <code className="font-mono text-sm">max-w-3xl</code>),{" "}
          <code className="font-mono text-sm">default</code> (
          <code className="font-mono text-sm">max-w-6xl</code>),{" "}
          <code className="font-mono text-sm">wide</code> (
          <code className="font-mono text-sm">max-w-7xl</code>), or{" "}
          <code className="font-mono text-sm">full</code>. These map to Tailwind&rsquo;s
          native <code className="font-mono text-sm">max-w-*</code> scale: use{" "}
          <code className="font-mono text-sm">narrow</code> (768px) for single-column
          forms and reading, <code className="font-mono text-sm">default</code> (1152px)
          for standard dashboards and two-column settings,{" "}
          <code className="font-mono text-sm">wide</code> (1280px) for dense tables and
          grids, and <code className="font-mono text-sm">full</code> for edge-to-edge
          canvases.
        </p>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-background">
          <LayoutWidthBlueprintDemo />
        </div>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<LayoutContainer width="narrow">…</LayoutContainer>`}
        >
          <LayoutWidthDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Page header">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">PageHeader</code> is the title band that sits
          inside the column, below the breadcrumbs. The heading and its supporting text go in{" "}
          <code className="font-mono text-sm">PageHeaderContent</code>; the trailing{" "}
          <code className="font-mono text-sm">PageHeaderActions</code> holds page-level
          triggers (an outline secondary plus a primary). It stacks on phones and splits into
          a row at <code className="font-mono text-sm">sm</code>, so the actions never crowd a
          long title.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<LayoutContainer width="wide">
  <LayoutHeader className="mb-4">
    <Breadcrumb>…</Breadcrumb>
  </LayoutHeader>

  <PageHeader>
    <PageHeaderContent>
      <PageHeaderHeading>Invoices</PageHeaderHeading>
      <PageHeaderDescription>
        Every charge across your workspace, with status and totals.
      </PageHeaderDescription>
    </PageHeaderContent>
    <PageHeaderActions>
      <Button variant="outline"><Export /> Export</Button>
      <Button><Plus /> New invoice</Button>
    </PageHeaderActions>
  </PageHeader>

  {/* page content */}
</LayoutContainer>`}
        >
          <LayoutPageHeaderDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sticky header">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">sticky</code> to{" "}
          <code className="font-mono text-sm">LayoutHeader</code> to pin the breadcrumbs and
          actions to the top of the scrolling panel. It bleeds to the column edges with a
          translucent, blurred fill (
          <code className="font-mono text-sm">bg-card/85</code> +{" "}
          <code className="font-mono text-sm">backdrop-blur-sm</code>) and the inset margins
          track the column&rsquo;s responsive padding, so it lines up at every breakpoint.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<LayoutHeader sticky>
  <Breadcrumb>…</Breadcrumb>
  <Button size="sm"><Plus /> New invoice</Button>
</LayoutHeader>`}
        >
          <LayoutStickyHeaderDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Mobile navigation">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">LayoutSidebar</code> is hidden below{" "}
          <code className="font-mono text-sm">lg</code>. On small screens, put a{" "}
          <code className="font-mono text-sm">LayoutMobileBar</code> at the top of{" "}
          <code className="font-mono text-sm">LayoutContent</code> and drop a{" "}
          <code className="font-mono text-sm">LayoutMobileSidebar</code> inside it: a
          hamburger that opens the same <code className="font-mono text-sm">Sidebar</code> in a
          left <a href="/docs/components/drawer" className="underline underline-offset-4">Drawer</a>
          , so one rail serves both layouts. The demo below is framed as a phone and forces the
          mobile bar on at every width.
        </p>
        <ComponentPreview previewClassName="block p-0" code={`<LayoutContent>
  <LayoutMobileBar>
    <LayoutMobileSidebar>
      <Sidebar className="h-full w-full border-r-0">…</Sidebar>
    </LayoutMobileSidebar>
    <Brand />
  </LayoutMobileBar>

  <LayoutContainer>{/* page */}</LayoutContainer>
</LayoutContent>`}>
          <LayoutMobileDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Resizable panels">
        <p className="mt-4 text-pretty text-muted-foreground">
          The shell composes with{" "}
          <a href="/docs/components/resizable" className="underline underline-offset-4">
            Resizable
          </a>{" "}
          to make the rail a drag instead of a constant. Wrap the columns in a{" "}
          <code className="font-mono text-sm">ResizablePanelGroup</code> on a fixed-height shell (
          <code className="font-mono text-sm">h-svh overflow-hidden</code>). The{" "}
          <code className="font-mono text-sm">Layout</code> parts still compose inside each{" "}
          <code className="font-mono text-sm">ResizablePanel</code>, which now owns the width the
          recipe used to fix at <code className="font-mono text-sm">w-64</code>. Hard{" "}
          <code className="font-mono text-sm">px</code> bounds keep the rail sensible at any size,
          and <code className="font-mono text-sm">collapsible</code> snaps it shut past half its min.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<Layout className="h-svh overflow-hidden">
  <ResizablePanelGroup>
    <ResizablePanel defaultSize={26} minSize="220px" maxSize="380px" collapsible className="p-0">
      <LayoutSidebar className="flex h-full w-full p-0">
        <Sidebar className="w-full border-r-0 bg-transparent">…</Sidebar>
      </LayoutSidebar>
    </ResizablePanel>

    <ResizableHandle withHandle />

    {/* m-0 drops the recipe gutter; the panel's p-2 supplies it instead */}
    <ResizablePanel defaultSize={74} className="p-2">
      <LayoutContent className="m-0 h-full">
        <LayoutContainer width="wide">{/* page */}</LayoutContainer>
      </LayoutContent>
    </ResizablePanel>
  </ResizablePanelGroup>
</Layout>`}
        >
          <LayoutResizableDemo />
        </ComponentPreview>

        <h3 className="mt-10 text-lg font-semibold tracking-tight">Inset sidebar</h3>
        <p className="mt-3 text-pretty text-muted-foreground">
          Pad both panels and give the rail its own card, so two surfaces face off across the
          draggable seam. The handle rides the{" "}
          <code className="font-mono text-sm">bg-background</code> gutter between them.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<ResizablePanel defaultSize={26} minSize="220px" maxSize="380px" className="p-2">
  <LayoutSidebar className="flex h-full w-full p-0">
    <Sidebar className="h-full w-full rounded-2xl border-0 shadow-sm ring-1 ring-border">…</Sidebar>
  </LayoutSidebar>
</ResizablePanel>`}
        >
          <LayoutResizableInsetDemo />
        </ComponentPreview>

        <h3 className="mt-10 text-lg font-semibold tracking-tight">Three panes</h3>
        <p className="mt-3 text-pretty text-muted-foreground">
          Add a second handle and a third panel for a collapsible right-hand inspector: the
          classic detail-view dashboard. Each handle resizes the pair on either side of it, so the
          three panes rebalance independently.
        </p>
        <ComponentPreview previewClassName="block p-0" code={`<ResizablePanelGroup>
  <ResizablePanel collapsible minSize="200px" maxSize="320px">{/* rail */}</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={56}>{/* content */}</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel collapsible minSize="260px" maxSize="380px">{/* inspector */}</ResizablePanel>
</ResizablePanelGroup>`}>
          <LayoutResizableInspectorDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Split layout">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">SplitLayout</code> is a second shell in this
          module for the full-viewport auth, onboarding, and marketing screens. It fills the
          viewport (<code className="font-mono text-sm">min-h-svh</code>) and splits into two
          columns at <code className="font-mono text-sm">lg</code>. One pane carries the content
          (a centered <code className="font-mono text-sm">SplitPaneBody</code> column); the other,{" "}
          <code className="font-mono text-sm">SplitMedia</code>, is a full-bleed image panel with
          an optional <code className="font-mono text-sm">SplitMediaOverlay</code> for a caption or
          testimonial. Below <code className="font-mono text-sm">lg</code> the grid collapses to a
          single column and the media pane drops away, so the form fills the screen on phones.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<SplitLayout>
  <SplitPane>                 {/* content side: centers a column */}
    <SplitPaneBody>           {/* the centered max-width column */}
      <Brand />
      <h1>Create an account</h1>

      <Button variant="outline" className="w-full"><GoogleLogo /> Google</Button>
      <Divider>or continue with email</Divider>

      <Field>
        <FieldLabel>Email address</FieldLabel>
        <InputRoot><InputField type="email" /></InputRoot>
      </Field>
      <Button className="w-full">Create account</Button>
    </SplitPaneBody>
  </SplitPane>

  <SplitMedia>                {/* full-bleed image side, hidden below lg */}
    <img className="absolute inset-0 size-full object-cover" src="/cover.jpg" alt="" />
    <SplitMediaOverlay>
      <p>Koala UI let us ship a polished product in days.</p>
    </SplitMediaOverlay>
  </SplitMedia>
</SplitLayout>`}
        >
          <SplitLayoutDemo />
        </ComponentPreview>

        <h3 className="mt-10 text-lg font-semibold tracking-tight">Media side &amp; ratio</h3>
        <p className="mt-3 text-pretty text-muted-foreground">
          Which side the media sits on is just DOM order. Put{" "}
          <code className="font-mono text-sm">SplitMedia</code> first for an image-left layout. The{" "}
          <code className="font-mono text-sm">ratio</code> prop divides the columns:{" "}
          <code className="font-mono text-sm">even</code> (the 50/50 default),{" "}
          <code className="font-mono text-sm">start</code>, or{" "}
          <code className="font-mono text-sm">end</code> to give the leading or trailing pane the
          larger 3:2 share. Here the media leads with <code className="font-mono text-sm">start</code>{" "}
          so the hero panel dominates.
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<SplitLayout ratio="start">
  <SplitMedia>                {/* media first, sits on the left */}
    <img className="absolute inset-0 size-full object-cover" src="/cover.jpg" alt="" />
    <SplitMediaOverlay className="justify-between">
      <Brand className="text-white" />
      <p>Welcome back to your workspace.</p>
    </SplitMediaOverlay>
  </SplitMedia>

  <SplitPane>
    <SplitPaneBody>{/* sign-in form */}</SplitPaneBody>
  </SplitPane>
</SplitLayout>`}
        >
          <SplitLayoutReverseDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">density</code> on{" "}
          <code className="font-mono text-sm">Layout</code> flows through context to the
          rail padding, the column&rsquo;s inner padding, and the header gap.{" "}
          <code className="font-mono text-sm">compact</code> is the default (app UI);{" "}
          <code className="font-mono text-sm">comfortable</code> is roomier. Either way
          the column&rsquo;s horizontal padding is responsive (
          <code className="font-mono text-sm">px-4 sm:px-6 lg:px-8</code> in{" "}
          <code className="font-mono text-sm">compact</code>), so the gutter grows with
          the viewport. Set it once here or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code>. See{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">
            Density
          </a>
          .
        </p>
        <ComponentPreview
          previewClassName="block p-0"
          code={`<Layout density="comfortable">…</Layout>`}
        >
          <LayoutDensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            { q: "When should I use the panel variant versus flat?", a: "Use `panel` (the default) for SaaS app-shells: content lives in an elevated, rounded card inset from the canvas with the sidebar in the gutter. Use `flat` for docs and reading shells where content sits flat on the page with a right-hand `LayoutAside` for an on-this-page nav, and the window scrolls as a whole." },
            { q: "Why doesn't LayoutSidebar show on mobile?", a: "`LayoutSidebar` is hidden below `lg` by design. On small screens, put a `LayoutMobileBar` at the top of `LayoutContent` with a `LayoutMobileSidebar`, which opens the same `Sidebar` in a left Drawer so one rail serves both layouts." },
            { q: "How do I control the content column width?", a: "Set `width` on `LayoutContainer`: `narrow` (768px) for forms and reading, `default` (1152px) for dashboards, `wide` (1280px) for dense tables, or `full` for edge-to-edge. These map to Tailwind's native `max-w-*` scale." },
            { q: "How do I keep the breadcrumb header in view while scrolling?", a: "Pass `sticky` to `LayoutHeader`. It pins to the top of the scrolling panel, bleeds to the column edges with a translucent blurred fill, and its inset margins track the column's responsive padding so it lines up at every breakpoint." },
            { q: "How do I make the sidebar draggable instead of fixed-width?", a: "Compose with Resizable: wrap the columns in a `ResizablePanelGroup` on a fixed-height shell (`h-svh overflow-hidden`). Each `ResizablePanel` now owns the width the recipe used to fix at `w-64`, and `collapsible` snaps the rail shut past half its min." },
            { q: "What is SplitLayout for, and how do I choose which side the media sits on?", a: "`SplitLayout` is a second shell for full-viewport auth, onboarding, and marketing screens that splits into two columns at `lg`. Which side `SplitMedia` sits on is just DOM order, and the `ratio` prop (`even`, `start`, or `end`) divides the columns." },
          ]}
        />
      </DocSection>

    </>
  )
}
