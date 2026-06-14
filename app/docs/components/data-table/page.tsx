import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"

import {
  ShowcaseDemo,
  ToolbarDemo,
  CustomToolbarDemo,
  ViewOptionsDemo,
  PersistenceDemo,
  InfiniteScrollDemo,
  CellTypesDemo,
  ContainerDemo,
  DefaultInSectionDemo,
  StripedDemo,
  DensityDemo,
  SortingDemo,
  GroupingDemo,
  SelectionDemo,
  StickyHeaderDemo,
  StickyColumnDemo,
  PaginationDemo,
  LoadingDemo,
  EmptyDemo,
  NoResultsDemo,
  PrimitivesDemo,
  CheckboxDemo,
} from "./data-table-examples-demo"

export const metadata = { title: "Data Table" }

export default function DataTableDocsPage() {
  return (
    <>
      <DocHeader
        title="Data Table"
        description="A data grid built on TanStack Table for behavior — sorting, grouping, row selection, column pinning — with Koala styling on top. Use the DataTable to drive features from column defs, or compose the styled primitives directly for static tables."
      />

      <ComponentPreview previewClassName="block" code={SHOWCASE_CODE}>
        <ShowcaseDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation
          component="data-table"
          dependencies="npm install @tanstack/react-table radix-ui tailwind-variants tailwind-merge"
        />
      </DocSection>

      <DocSection title="Usage">
        <p className="mt-4 text-pretty text-muted-foreground">
          Koala splits the two concerns the way TanStack does. The{" "}
          <code className="font-mono text-sm">Table</code> primitives own the look; TanStack
          owns the behavior. <code className="font-mono text-sm">DataTable</code> wires them
          together — hand it <code className="font-mono text-sm">columns</code> and{" "}
          <code className="font-mono text-sm">data</code>, flip on the features you want, and
          ride alignment and pinning along on each column&rsquo;s{" "}
          <code className="font-mono text-sm">meta</code>.
        </p>
        <CodeSnippet filename="members-table.tsx" className="mt-4" code={USAGE_CODE} />
      </DocSection>

      <DocSection title="Container">
        <p className="mt-4 text-pretty text-muted-foreground">
          The table is chromeless by default — no border, radius, or fill, with the edge cells
          pulled flush — so it reads as lined records and drops into whatever already frames it.
          That is the <code className="font-mono text-sm">minimal</code> surface you see throughout
          this page. When the table needs to stand on its own, set{" "}
          <code className="font-mono text-sm">variant=&quot;container&quot;</code> to wrap it in the
          bordered, rounded card. Striping, hover, and pinned columns rebase onto each surface
          automatically, so every feature keeps working either way.
        </p>
        <ComponentPreview previewClassName="block" code={CONTAINER_CODE}>
          <ContainerDemo />
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          Left at its default, the table drops straight into the page section it belongs to — a
          settings panel, a dashboard block — sitting on the page surface with only its own row
          rules, no box stacked around content that&rsquo;s already laid out. The minimal surface
          renders on the page background; for a distinct surface, reach for{" "}
          <code className="font-mono text-sm">variant=&quot;container&quot;</code>.
        </p>
        <ComponentPreview previewClassName="block" code={DEFAULT_IN_SECTION_CODE}>
          <DefaultInSectionDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Toolbar">
        <p className="mt-4 text-pretty text-muted-foreground">
          The control rail above the table is built in and toggled with simple booleans — no
          wiring. <code className="font-mono text-sm">searchable</code> adds a search box that
          filters every column (TanStack&rsquo;s global filter), and{" "}
          <code className="font-mono text-sm">toolbarActions</code> is a right-side slot for your
          own buttons (filter, export, a primary action). The search and any icon buttons are Koala
          natives — <a href="/docs/components/input" className="underline underline-offset-4">Input</a>{" "}
          and <a href="/docs/components/button" className="underline underline-offset-4">Button</a> —
          so they share the system&rsquo;s focus rings, density, and press feedback.
        </p>
        <ComponentPreview previewClassName="block" code={TOOLBAR_CODE}>
          <ToolbarDemo />
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          Need a layout the toggles don&rsquo;t cover? The parts —{" "}
          <code className="font-mono text-sm">DataTableToolbar</code>,{" "}
          <code className="font-mono text-sm">DataTableToolbarSection</code>, and{" "}
          <code className="font-mono text-sm">DataTableSearch</code> — are exported, so you can
          compose your own rail and drop it above a plain <code className="font-mono text-sm">DataTable</code>.
        </p>
        <ComponentPreview previewClassName="block" code={CUSTOM_TOOLBAR_CODE}>
          <CustomToolbarDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="View options">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">viewOptions</code> adds a{" "}
          <code className="font-mono text-sm">SlidersHorizontal</code> dropdown to the toolbar for
          showing and hiding columns. Every column with a label appears as a checkbox — the menu
          stays open so you can toggle several at once. Give a column a{" "}
          <code className="font-mono text-sm">meta.label</code> for its name there (a string{" "}
          <code className="font-mono text-sm">header</code> is used as the fallback); the selection
          and icon-only action columns have no label, so they&rsquo;re left out.
        </p>
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">enableCardLayout</code> adds a Rows/Cards switch to the
          same dropdown and renders the rows as a responsive card grid when chosen — the first
          column becomes the card title, the rest stack as labelled fields, and an icon-only action
          rides along top-right. Pass <code className="font-mono text-sm">renderCard</code> to take
          over the card entirely. The cards cascade in on load via the shared{" "}
          <a href="/docs/foundations/motion" className="underline underline-offset-4">Stagger</a>{" "}
          primitive.
        </p>
        <ComponentPreview previewClassName="block" code={VIEW_OPTIONS_CODE}>
          <ViewOptionsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Remembering view state">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass a <code className="font-mono text-sm">persistKey</code> and the table remembers how
          the user left it — which columns are visible, the sort, the rows/cards layout, and the page
          size — by writing them to <code className="font-mono text-sm">localStorage</code> under that
          key. It&rsquo;s SSR-safe: the server renders the defaults and the saved state is applied
          after mount, so hydration stays clean. Hide a column or switch to cards below, then reload
          the page — it comes back the same.
        </p>
        <ComponentPreview previewClassName="block" code={PERSIST_CODE}>
          <PersistenceDemo />
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          Use a key that&rsquo;s unique per table (and per user, if you scope storage that way).
          Persistence is best-effort — unavailable or full storage fails quietly and the table just
          opens at its defaults.
        </p>
      </DocSection>

      <DocSection title="Cell types">
        <p className="mt-4 text-pretty text-muted-foreground">
          A column&rsquo;s <code className="font-mono text-sm">cell</code> renders anything —
          an avatar beside two-line text (<code className="font-mono text-sm">TableCellText</code>),
          a status <code className="font-mono text-sm">Badge</code>, a right-aligned figure
          (<code className="font-mono text-sm">meta.numeric</code> adds{" "}
          <code className="font-mono text-sm">tabular-nums</code>), or a row-action menu.
        </p>
        <ComponentPreview previewClassName="block" code={CELL_TYPES_CODE}>
          <CellTypesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sorting">
        <p className="mt-4 text-pretty text-muted-foreground">
          Set <code className="font-mono text-sm">enableSorting</code> to make headers
          click-to-sort. The header shows a muted up/down caret until active, then a solid
          directional one. Seed an order with{" "}
          <code className="font-mono text-sm">initialSorting</code>.
        </p>
        <ComponentPreview previewClassName="block" code={SORTING_CODE}>
          <SortingDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Row hover">
        <p className="mt-4 text-pretty text-muted-foreground">
          Rows highlight on hover by default — only body rows, never the header. Pass{" "}
          <code className="font-mono text-sm">hoverable={`{false}`}</code> to opt out (the
          striped example below does, so the zebra pattern stays crisp).
        </p>
      </DocSection>

      <DocSection title="Striped rows">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">striped</code> zebra-stripes even rows for
          faster scanning. The stripe is scoped to skip hovered and selected rows, so those
          states always read clearly.
        </p>
        <ComponentPreview previewClassName="block" code={STRIPED_CODE}>
          <StripedDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Condensed rows">
        <p className="mt-4 text-pretty text-muted-foreground">
          Density is Koala&rsquo;s cross-cutting spacing axis (see{" "}
          <a href="/docs/foundations/density" className="underline underline-offset-4">Density</a>
          ). For a table it&rsquo;s the condensed-rows knob:{" "}
          <code className="font-mono text-sm">compact</code> is the dense default;{" "}
          <code className="font-mono text-sm">comfortable</code> is roomier. Set it per-table
          or for a whole subtree with{" "}
          <code className="font-mono text-sm">DensityProvider</code>.
        </p>
        <ComponentPreview previewClassName="block" code={DENSITY_CODE}>
          <DensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Grouping">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">enableGrouping</code> with an{" "}
          <code className="font-mono text-sm">initialGrouping</code> column collapses rows
          into expandable groups. Give a column an{" "}
          <code className="font-mono text-sm">aggregationFn</code> and{" "}
          <code className="font-mono text-sm">aggregatedCell</code> to summarize each group —
          here the balance column sums per team.
        </p>
        <ComponentPreview previewClassName="block" code={GROUPING_CODE}>
          <GroupingDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="With checkboxes">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">enableRowSelection</code> prepends a checkbox
          column with a header &ldquo;select all&rdquo; that goes indeterminate on a partial
          selection. Subscribe with{" "}
          <code className="font-mono text-sm">onRowSelectionChange</code>; pass a stable{" "}
          <code className="font-mono text-sm">getRowId</code> so selection survives re-sorts.
        </p>
        <ComponentPreview previewClassName="block" code={SELECTION_CODE}>
          <SelectionDemo />
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          The selection control is the shared{" "}
          <a href="/docs/components/checkbox" className="underline underline-offset-4">Checkbox</a>{" "}
          component — checked, indeterminate, and disabled states:
        </p>
        <ComponentPreview code={CHECKBOX_CODE}>
          <CheckboxDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sticky header">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">stickyHeader</code> pins the header while the
          body scrolls. Cap the scroll container&rsquo;s height with{" "}
          <code className="font-mono text-sm">containerClassName</code> (e.g.{" "}
          <code className="font-mono text-sm">max-h-72</code>) to create the scroll.
        </p>
        <ComponentPreview previewClassName="block" code={STICKY_HEADER_CODE}>
          <StickyHeaderDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Sticky column">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pin a column to an edge with{" "}
          <code className="font-mono text-sm">meta: {`{ sticky: "left" }`}</code> (or{" "}
          <code className="font-mono text-sm">&quot;right&quot;</code>). It stays put — tracking
          the row&rsquo;s hover and selected background — while the rest scrolls sideways.
        </p>
        <ComponentPreview previewClassName="block" code={STICKY_COLUMN_CODE}>
          <StickyColumnDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Pagination">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">enablePagination</code> pages the rows client-side
          and drops a{" "}
          <a href="/docs/components/pagination" className="underline underline-offset-4">Pagination</a>{" "}
          toolbar below the table — prev/next, a &ldquo;Page X of Y&rdquo; readout, and a
          rows-per-page select. Set the initial page size with{" "}
          <code className="font-mono text-sm">pageSize</code> and the select&rsquo;s choices with{" "}
          <code className="font-mono text-sm">pageSizeOptions</code>. It shares the table&rsquo;s
          density, and pages are disabled while <code className="font-mono text-sm">loading</code>.
        </p>
        <ComponentPreview previewClassName="block" code={PAGINATION_CODE}>
          <PaginationDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Load on scroll">
        <p className="mt-4 text-pretty text-muted-foreground">
          For server-driven lists, swap paging for infinite scroll: pass{" "}
          <code className="font-mono text-sm">onLoadMore</code> and a{" "}
          <code className="font-mono text-sm">hasMore</code> flag, and the table fetches the next
          batch as a sentinel scrolls into view (prefetching ~200px early). Flip{" "}
          <code className="font-mono text-sm">loadingMore</code> while the request is in flight — it
          shows a loading row and blocks duplicate calls. You fetch and append to{" "}
          <code className="font-mono text-sm">data</code>; the sentinel watches the nearest scroll
          container (here a capped <code className="font-mono text-sm">max-h</code> wrapper) or the
          viewport. It replaces the pagination toolbar — the two are mutually exclusive.
        </p>
        <ComponentPreview previewClassName="block" code={INFINITE_SCROLL_CODE}>
          <InfiniteScrollDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Loading">
        <p className="mt-4 text-pretty text-muted-foreground">
          Pass <code className="font-mono text-sm">loading</code> to swap the rows for skeleton
          placeholders while data is in flight. They mirror the real column layout (numeric columns
          get a short right-aligned bar, the select column a checkbox-sized square) so the table
          doesn&rsquo;t reflow when data lands. Tune the count with{" "}
          <code className="font-mono text-sm">loadingRows</code>; the region is announced with{" "}
          <code className="font-mono text-sm">aria-busy</code>.
        </p>
        <ComponentPreview previewClassName="block" code={LOADING_CODE}>
          <LoadingDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Empty states">
        <p className="mt-4 text-pretty text-muted-foreground">
          When there are no rows, the table renders{" "}
          <code className="font-mono text-sm">DataTableEmpty</code> — a preset over{" "}
          <a href="/docs/components/empty-state" className="underline underline-offset-4">EmptyState</a>{" "}
          built for the two cases a grid hits. The default is{" "}
          <code className="font-mono text-sm">kind=&quot;empty&quot;</code> (nothing here yet);
          override the <code className="font-mono text-sm">emptyState</code> prop and pass action
          buttons as children.
        </p>
        <ComponentPreview previewClassName="block" code={EMPTY_CODE}>
          <EmptyDemo />
        </ComponentPreview>
        <p className="mt-6 text-pretty text-muted-foreground">
          When a search or filter comes up empty, switch to{" "}
          <code className="font-mono text-sm">kind=&quot;search&quot;</code> — the not-found icon
          and copy, with a &ldquo;clear filters&rdquo; escape hatch. With the built-in{" "}
          <code className="font-mono text-sm">searchable</code> toolbar this happens automatically:
          an active search that matches nothing falls back to the search-empty placeholder.
        </p>
        <ComponentPreview previewClassName="block" code={NO_RESULTS_CODE}>
          <NoResultsDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Primitives">
        <p className="mt-4 text-pretty text-muted-foreground">
          For a static or fully bespoke table, skip TanStack and compose the styled primitives
          directly — <code className="font-mono text-sm">Table</code>,{" "}
          <code className="font-mono text-sm">TableHeader</code>,{" "}
          <code className="font-mono text-sm">TableBody</code>,{" "}
          <code className="font-mono text-sm">TableFooter</code>,{" "}
          <code className="font-mono text-sm">TableRow</code>,{" "}
          <code className="font-mono text-sm">TableHead</code>,{" "}
          <code className="font-mono text-sm">TableCell</code>. The same variants (variant,
          striped, hover, density, sticky) apply.
        </p>
        <ComponentPreview previewClassName="block" code={PRIMITIVES_CODE}>
          <PrimitivesDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <h3 className="mt-6 text-base font-semibold">DataTable</h3>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-muted/50 text-left">
              <tr className="[&>th]:px-4 [&>th]:py-2.5 [&>th]:font-medium">
                <th>Prop</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody className="[&>tr]:border-t [&>tr]:border-border [&>tr>td]:px-4 [&>tr>td]:py-2.5 [&_code]:font-mono [&_code]:text-xs">
              {DATA_TABLE_PROPS.map((row) => (
                <tr key={row.prop} className="align-top">
                  <td><code>{row.prop}</code></td>
                  <td className="text-muted-foreground"><code>{row.type}</code></td>
                  <td className="text-pretty text-muted-foreground">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="mt-8 text-base font-semibold">Column meta</h3>
        <p className="mt-3 text-pretty text-muted-foreground">
          Per-column display hints on each <code className="font-mono text-sm">ColumnDef</code>
          &rsquo;s <code className="font-mono text-sm">meta</code>:{" "}
          <code className="font-mono text-sm">align</code> (
          <code className="font-mono text-sm">&quot;left&quot; | &quot;center&quot; | &quot;right&quot;</code>),{" "}
          <code className="font-mono text-sm">numeric</code> (right-align +{" "}
          <code className="font-mono text-sm">tabular-nums</code>),{" "}
          <code className="font-mono text-sm">sticky</code> (
          <code className="font-mono text-sm">&quot;left&quot; | &quot;right&quot;</code>),{" "}
          <code className="font-mono text-sm">label</code> (the column&rsquo;s name in the
          view-options menu and as a card-layout field label), and{" "}
          <code className="font-mono text-sm">className</code> for per-column tweaks (tighten
          padding, pin a width).
        </p>

        <h3 className="mt-8 text-base font-semibold">Primitives</h3>
        <p className="mt-3 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">Table</code> takes{" "}
          <code className="font-mono text-sm">variant</code>,{" "}
          <code className="font-mono text-sm">density</code>,{" "}
          <code className="font-mono text-sm">striped</code>,{" "}
          <code className="font-mono text-sm">hoverable</code>, and{" "}
          <code className="font-mono text-sm">stickyHeader</code>, flowing through Context to
          every part. <code className="font-mono text-sm">TableHead</code> and{" "}
          <code className="font-mono text-sm">TableCell</code> take{" "}
          <code className="font-mono text-sm">align</code> and{" "}
          <code className="font-mono text-sm">sticky</code>;{" "}
          <code className="font-mono text-sm">TableCell</code> also takes{" "}
          <code className="font-mono text-sm">numeric</code>.{" "}
          <code className="font-mono text-sm">TableRow</code> takes{" "}
          <code className="font-mono text-sm">selected</code>.
        </p>
      </DocSection>
    </>
  )
}

const DATA_TABLE_PROPS = [
  { prop: "columns", type: "ColumnDef<TData>[]", desc: "TanStack column definitions." },
  { prop: "data", type: "TData[]", desc: "Row data." },
  { prop: "getRowId", type: "(row, i) => string", desc: "Stable row id — keeps selection and grouping correct across re-sorts." },
  { prop: "enableSorting", type: "boolean", desc: "Click-to-sort headers. Default false." },
  { prop: "initialSorting", type: "SortingState", desc: "Initial sort order." },
  { prop: "enableRowSelection", type: "boolean", desc: "Prepend a checkbox column with select-all. Default false." },
  { prop: "onRowSelectionChange", type: "(s) => void", desc: "Called with the row-selection map on change." },
  { prop: "enableGrouping", type: "boolean", desc: "Expandable groups. Default false." },
  { prop: "initialGrouping", type: "GroupingState", desc: "Column id(s) to group by." },
  { prop: "enablePagination", type: "boolean", desc: "Page rows client-side with a Pagination toolbar below. Default false." },
  { prop: "pageSize", type: "number", desc: "Initial rows per page. Default 8." },
  { prop: "pageSizeOptions", type: "number[]", desc: "Rows-per-page choices. Default [8, 16, 24, 50, 100]." },
  { prop: "searchable", type: "boolean", desc: "Add a toolbar search box that filters every column. Default false." },
  { prop: "searchPlaceholder", type: "string", desc: 'Search box placeholder. Default "Search for anything".' },
  { prop: "toolbarActions", type: "ReactNode", desc: "Right-side toolbar slot for app buttons (filter, export, primary action)." },
  { prop: "toolbar", type: "boolean", desc: "Force the toolbar rail on. Auto-on when searchable or toolbarActions is set." },
  { prop: "viewOptions", type: "boolean", desc: "Add a View options dropdown to show/hide columns. Default false." },
  { prop: "enableCardLayout", type: "boolean", desc: "Add a Rows/Cards layout switch and render cards when chosen (implies viewOptions). Default false." },
  { prop: "defaultLayout", type: '"rows" | "cards"', desc: 'Initial layout when enableCardLayout is on. Default "rows".' },
  { prop: "renderCard", type: "(row) => ReactNode", desc: "Custom card renderer for the cards layout. Defaults to a generated card." },
  { prop: "loading", type: "boolean", desc: "Swap rows for skeleton placeholders while data loads. Default false." },
  { prop: "loadingRows", type: "number", desc: "How many skeleton rows to show while loading. Default 5." },
  { prop: "onLoadMore", type: "() => void", desc: "Enables infinite scroll: called near the end of the scroll to load the next batch (replaces pagination)." },
  { prop: "hasMore", type: "boolean", desc: "Whether more rows can be loaded. The load-more sentinel stops when false." },
  { prop: "loadingMore", type: "boolean", desc: "Whether a load-more fetch is in flight — shows a loading row and blocks duplicate calls." },
  { prop: "persistKey", type: "string", desc: "Persist visible columns, sort, layout, and page size to localStorage under this key (SSR-safe)." },
  { prop: "variant", type: '"minimal" | "container"', desc: 'Surface treatment. "minimal" (default) is chromeless and flush; "container" wraps it in the bordered card.' },
  { prop: "density", type: '"compact" | "comfortable"', desc: "Condensed-rows axis. Resolves via DensityProvider when omitted." },
  { prop: "striped", type: "boolean", desc: "Zebra-stripe even rows." },
  { prop: "hoverable", type: "boolean", desc: "Highlight rows on hover. Default true." },
  { prop: "stickyHeader", type: "boolean", desc: "Pin the header to the top of the scroll container." },
  { prop: "emptyState", type: "ReactNode", desc: "Shown when there are no rows. Defaults to <DataTableEmpty />." },
  { prop: "className", type: "string", desc: "Classes for the <table> element." },
  { prop: "containerClassName", type: "string", desc: "Classes for the scroll container (e.g. a max-height)." },
]

/* ------------------------------------------------------------ code blocks --- */

const SHOWCASE_CODE = `// The whole component from booleans + one actions slot.
<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enableSorting
  searchable
  viewOptions
  enableCardLayout
  enablePagination
  pageSize={8}
  pageSizeOptions={[8, 16, 24, 50, 100]}
  toolbarActions={
    <>
      <Button variant="outline" iconOnly aria-label="Filter"><FunnelSimple /></Button>
      <Button variant="outline" iconOnly aria-label="Export"><Export /></Button>
      <Button>Register</Button>
    </>
  }
/>`

const VIEW_OPTIONS_CODE = `// viewOptions: column show/hide. enableCardLayout: Rows/Cards switch + card grid.
<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enableSorting
  searchable
  viewOptions
  enableCardLayout
/>

// Name a column in the menu (and as a card field label):
const columns = [
  { accessorKey: "balance", header: "Balance", meta: { label: "Balance", numeric: true } },
]

// Or take over the card entirely:
<DataTable columns={columns} data={members} enableCardLayout renderCard={(row) => (
  <Card>…</Card>
)} />`

const PERSIST_CODE = `// Remembers visible columns, sort, layout, and page size across reloads.
<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enableSorting
  viewOptions
  enableCardLayout
  persistKey="members"
/>`

const INFINITE_SCROLL_CODE = `function MembersTable() {
  const [rows, setRows] = useState(() => fetchPage(0))
  const [loadingMore, setLoadingMore] = useState(false)
  const hasMore = rows.length < total

  async function loadMore() {
    setLoadingMore(true)
    const next = await fetchPage(rows.length)
    setRows((prev) => [...prev, ...next])
    setLoadingMore(false)
  }

  return (
    // The sentinel watches the nearest scroll container (or the viewport).
    <div className="max-h-96 overflow-auto">
      <DataTable
        columns={columns}
        data={rows}
        getRowId={(r) => r.id}
        variant="container"
        onLoadMore={loadMore}
        hasMore={hasMore}
        loadingMore={loadingMore}
      />
    </div>
  )
}`

const PAGINATION_CODE = `<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enablePagination
  pageSize={8}
  pageSizeOptions={[8, 16, 24, 50, 100]}
/>`

const LOADING_CODE = `<DataTable columns={columns} data={data} loading loadingRows={5} />`

const EMPTY_CODE = `import { DataTable, DataTableEmpty } from "@/components/ui/data-table"

<DataTable
  columns={columns}
  data={[]}
  emptyState={
    <DataTableEmpty>
      <Button size="sm">Register</Button>
    </DataTableEmpty>
  }
/>`

const NO_RESULTS_CODE = `// when a search/filter comes up empty
<DataTable
  columns={columns}
  data={filtered}
  emptyState={
    <DataTableEmpty kind="search">
      <Button size="sm" variant="ghost">Clear filters</Button>
    </DataTableEmpty>
  }
/>`

const TOOLBAR_CODE = `// searchable filters every column; toolbarActions is the right-side slot.
<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enableSorting
  searchable
  toolbarActions={
    <>
      <Button variant="outline" iconOnly aria-label="Filter"><FunnelSimple /></Button>
      <Button variant="outline" iconOnly aria-label="Export"><Export /></Button>
      <Button>Register</Button>
    </>
  }
/>`

const CUSTOM_TOOLBAR_CODE = `import {
  DataTable,
  DataTableToolbar,
  DataTableToolbarSection,
  DataTableSearch,
} from "@/components/ui/data-table"

// Compose your own rail, then drop it above a plain DataTable.
<div className="flex flex-col gap-4">
  <DataTableToolbar>
    <DataTableToolbarSection>
      <DataTableSearch />
      <Button variant="outline" iconOnly aria-label="Filter"><FunnelSimple /></Button>
      <Button variant="outline" iconOnly aria-label="Sort"><ArrowsDownUp /></Button>
    </DataTableToolbarSection>
    <DataTableToolbarSection>
      <Button variant="outline" iconOnly aria-label="Export"><Export /></Button>
      <Button>Register</Button>
    </DataTableToolbarSection>
  </DataTableToolbar>

  <DataTable columns={columns} data={members} enableSorting />
</div>`

const USAGE_CODE = `import {
  DataTable,
  TableCellText,
  type ColumnDef,
} from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

type Member = {
  id: string
  name: string
  email: string
  status: "Active" | "Invited" | "Suspended"
  balance: number
}

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Member",
    cell: ({ row }) => (
      <TableCellText primary={row.original.name} secondary={row.original.email} />
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <Badge size="sm">{getValue<string>()}</Badge>,
  },
  {
    accessorKey: "balance",
    header: "Balance",
    meta: { numeric: true },
    cell: ({ getValue }) => \`$\${getValue<number>()}\`,
  },
]

export function MembersTable({ data }: { data: Member[] }) {
  return (
    <DataTable
      columns={columns}
      data={data}
      getRowId={(row) => row.id}
      enableSorting
      enableRowSelection
    />
  )
}`

const CELL_TYPES_CODE = `<DataTable columns={columns} data={members} getRowId={(r) => r.id} enableSorting />

// columns: avatar + two-line text, muted text, status Badge,
// numeric (meta.numeric), and a DropdownMenu row-action cell.`

const SORTING_CODE = `<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enableSorting
  initialSorting={[{ id: "balance", desc: true }]}
/>`

const CONTAINER_CODE = `// "minimal" (default, chromeless + flush) or "container" (bordered card)
<DataTable columns={columns} data={members} variant="container" enableSorting />`

const DEFAULT_IN_SECTION_CODE = `// Default (minimal) dropped straight into a page section — no box of its own.
<section>
  <h3 className="font-semibold">Team members</h3>
  <p className="text-sm text-muted-foreground">People with access to this workspace.</p>
  <DataTable columns={columns} data={members} className="mt-4" />
</section>`

const STRIPED_CODE = `<DataTable columns={columns} data={members} striped hoverable={false} />`

const DENSITY_CODE = `// "compact" (condensed, the default) or "comfortable"
<DataTable columns={columns} data={members} density="compact" />`

const GROUPING_CODE = `const columns: ColumnDef<Member>[] = [
  { accessorKey: "team", header: "Team" },
  { accessorKey: "name", header: "Member", aggregatedCell: () => null },
  {
    accessorKey: "balance",
    header: "Balance",
    meta: { numeric: true },
    aggregationFn: "sum",
    cell: ({ getValue }) => format(getValue<number>()),
    aggregatedCell: ({ getValue }) => format(getValue<number>()),
  },
]

<DataTable
  columns={columns}
  data={members}
  enableGrouping
  initialGrouping={["team"]}
/>`

const SELECTION_CODE = `const [selection, setSelection] = useState({})

<DataTable
  columns={columns}
  data={members}
  getRowId={(r) => r.id}
  enableRowSelection
  onRowSelectionChange={setSelection}
/>`

const CHECKBOX_CODE = `<Checkbox checked onCheckedChange={...} />
<Checkbox checked="indeterminate" />
<Checkbox checked={false} />
<Checkbox checked disabled />`

const STICKY_HEADER_CODE = `<DataTable
  columns={columns}
  data={rows}
  stickyHeader
  containerClassName="max-h-72"
/>`

const STICKY_COLUMN_CODE = `const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Member",
    meta: { sticky: "left" }, // pinned while the rest scrolls sideways
    cell: ({ row }) => <MemberCell member={row.original} />,
  },
  { accessorKey: "team", header: "Team" },
  // …more columns than fit, forcing horizontal scroll
]

<DataTable columns={columns} data={members} className="min-w-[52rem]" />`

const PRIMITIVES_CODE = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Member</TableHead>
      <TableHead>Status</TableHead>
      <TableHead align="right">Balance</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {members.map((m) => (
      <TableRow key={m.id}>
        <TableCell>
          <TableCellText primary={m.name} secondary={m.email} />
        </TableCell>
        <TableCell><Badge size="sm">{m.status}</Badge></TableCell>
        <TableCell numeric>{format(m.balance)}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={2}>Total</TableCell>
      <TableCell numeric>{format(total)}</TableCell>
    </TableRow>
  </TableFooter>
</Table>`
