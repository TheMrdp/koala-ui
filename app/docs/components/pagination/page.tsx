import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

import {
  FullDemo,
  BasicDemo,
  GoToDemo,
  RowsPerPageDemo,
  DensityDemo,
  CustomLayoutDemo,
} from "./demos"

export const metadata = {
  title: "Pagination",
}

export default function PaginationDocsPage() {
  return (
    <>
      <DocHeader
        title="Pagination"
        description="A toolbar for navigating a paged dataset — current page and total, prev/next, a go-to-page field, and a rows-per-page select. Each addon is toggled by a show* boolean, so the same component covers a bare prev/next bar or a full data-table footer."
      />

      <ComponentPreview
        previewClassName="px-6"
        code={`function Example() {
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(20)

  return (
    <Pagination
      page={page}
      pageCount={24}
      onPageChange={setPage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
      showInfo
      showControls
      showGoTo
      showRowsPerPage
    />
  )
}`}
      >
        <FullDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="pagination" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import { Pagination } from "@/components/ui/pagination"

export function Example() {
  const [page, setPage] = useState(1)

  return (
    <Pagination
      page={page}
      pageCount={10}
      onPageChange={setPage}
    />
  )
}`}
        />
      </DocSection>

      <DocSection title="Default">
        <p className="mt-4 text-pretty text-muted-foreground">
          Out of the box you get the page readout and prev/next controls. The component is
          fully controlled — drive it with <code className="font-mono text-sm">page</code>{" "}
          and <code className="font-mono text-sm">onPageChange</code>. The buttons disable
          themselves at the first and last page.
        </p>
        <ComponentPreview
          previewClassName="px-6"
          code={`<Pagination page={page} pageCount={10} onPageChange={setPage} />`}
        >
          <BasicDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Go to page">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">showGoTo</code> to add a numeric field for
          jumping to an arbitrary page. The value commits on{" "}
          <code className="font-mono text-sm">Enter</code> or blur and is clamped into range,
          so an out-of-bounds entry snaps back to the nearest valid page.
        </p>
        <ComponentPreview
          previewClassName="px-6"
          code={`<Pagination
  page={page}
  pageCount={50}
  onPageChange={setPage}
  showGoTo
/>`}
        >
          <GoToDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Rows per page">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">showRowsPerPage</code> and wire{" "}
          <code className="font-mono text-sm">rowsPerPage</code> /{" "}
          <code className="font-mono text-sm">onRowsPerPageChange</code> to let users choose
          how many rows to load. Customize the choices with{" "}
          <code className="font-mono text-sm">rowsPerPageOptions</code>.
        </p>
        <ComponentPreview
          previewClassName="px-6"
          code={`<Pagination
  page={page}
  pageCount={12}
  onPageChange={setPage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={setRowsPerPage}
  rowsPerPageOptions={[10, 25, 50, 100]}
  showRowsPerPage
/>`}
        >
          <RowsPerPageDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Like the rest of Koala, Pagination honors the{" "}
          <code className="font-mono text-sm">density</code> axis (prop or{" "}
          <code className="font-mono text-sm">DensityProvider</code>). The whole toolbar lands
          on one matched control height — a 40px row when comfortable, a 32px row when compact.
        </p>
        <ComponentPreview
          previewClassName="px-6"
          code={`<Pagination density="comfortable" page={page} pageCount={16} onPageChange={setPage} showGoTo />
<Pagination density="compact" page={page} pageCount={16} onPageChange={setPage} showGoTo />`}
        >
          <DensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Custom layout">
        <p className="mt-4 text-pretty text-muted-foreground">
          For a bespoke arrangement, drop the <code className="font-mono text-sm">show*</code>{" "}
          toggles and compose the parts yourself inside{" "}
          <code className="font-mono text-sm">PaginationRoot</code>. Every part —{" "}
          <code className="font-mono text-sm">PaginationInfo</code>,{" "}
          <code className="font-mono text-sm">PaginationControls</code>,{" "}
          <code className="font-mono text-sm">PaginationGoTo</code>,{" "}
          <code className="font-mono text-sm">PaginationRowsPerPage</code> — reads the shared
          state from context.
        </p>
        <ComponentPreview
          previewClassName="px-6"
          code={`<PaginationRoot page={page} pageCount={20} onPageChange={setPage}>
  <PaginationControls />
  <PaginationInfo />
  <PaginationGoTo label="Jump to" />
</PaginationRoot>`}
        >
          <CustomLayoutDemo />
        </ComponentPreview>
      </DocSection>

    </>
  )
}
