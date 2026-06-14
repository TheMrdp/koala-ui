import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  LayoutShellDemo,
  LayoutWidthDemo,
  LayoutDensityDemo,
  LayoutAnatomyDemo,
  LayoutWidthBlueprintDemo,
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

      {/* settings sections — Field + Input + Select + Checkbox */}
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
        description="The SaaS app-shell. Its signature is the sidebar indent: content sits inside an elevated, rounded panel inset from the page canvas, with the sidebar living in the surrounding gutter. Inside, a centered max-width column carries the breadcrumbs."
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

      <DocSection title="Anatomy">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Layout</code> is a flex row on the{" "}
          <code className="font-mono text-sm">bg-background</code> canvas.{" "}
          <code className="font-mono text-sm">LayoutContent</code> is the indent — a{" "}
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
            <strong className="font-medium text-foreground">Gutter</strong> — the{" "}
            <code className="font-mono text-sm">bg-background</code> canvas.{" "}
            <code className="font-mono text-sm">LayoutContent</code> insets{" "}
            <code className="font-mono text-sm">m-2</code> (8px) on every side so the
            panel floats; the left inset drops at{" "}
            <code className="font-mono text-sm">lg</code> so the panel sits flush against
            the rail. The <code className="font-mono text-sm">w-64</code> (256px) sidebar
            lives in this band.
          </li>
          <li>
            <strong className="font-medium text-foreground">Panel</strong> — the{" "}
            <code className="font-mono text-sm">bg-card</code> surface,{" "}
            <code className="font-mono text-sm">rounded-2xl</code> (16px). Nest surfaces
            inside it with a smaller, concentric radius (
            <code className="font-mono text-sm">16px − padding</code>).
          </li>
          <li>
            <strong className="font-medium text-foreground">Column</strong> —{" "}
            <code className="font-mono text-sm">LayoutContainer</code> centers a max-width
            column (<code className="font-mono text-sm">mx-auto</code>) and sets the
            content padding. Horizontal padding is responsive — it steps up at{" "}
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
          <code className="font-mono text-sm">width</code> —{" "}
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
          <code className="font-mono text-sm">DensityProvider</code> — see{" "}
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

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Layout</code> takes{" "}
          <code className="font-mono text-sm">density</code>, which flows through Context
          to every part. By default the shell is{" "}
          <code className="font-mono text-sm">min-h-svh</code> and grows with the page;
          give the root{" "}
          <code className="font-mono text-sm">className=&quot;h-svh overflow-hidden&quot;</code>{" "}
          to pin the sidebar and let{" "}
          <code className="font-mono text-sm">LayoutContent</code> scroll on its own.{" "}
          <code className="font-mono text-sm">LayoutSidebar</code> renders an{" "}
          <code className="font-mono text-sm">{`<aside>`}</code> (hidden below{" "}
          <code className="font-mono text-sm">lg</code>);{" "}
          <code className="font-mono text-sm">LayoutContent</code> renders a{" "}
          <code className="font-mono text-sm">{`<main>`}</code> landmark.{" "}
          <code className="font-mono text-sm">LayoutContainer</code> adds a{" "}
          <code className="font-mono text-sm">width</code> prop. Every part forwards its
          native props and merges{" "}
          <code className="font-mono text-sm">className</code> last.
        </p>
      </DocSection>
    </>
  )
}
