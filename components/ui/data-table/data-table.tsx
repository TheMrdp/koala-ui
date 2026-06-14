"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type Column,
  type ColumnDef,
  type GroupingState,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table as TanstackTable,
  type VisibilityState,
} from "@tanstack/react-table"
import { CaretDown, CaretUpDown, CaretUp, CaretRight, CircleNotch } from "@phosphor-icons/react"

import { useDensity, type Density } from "@/lib/density"
import { Stagger } from "@/lib/stagger"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardHeader,
  CardAction,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import { Pagination } from "@/components/ui/pagination"
import { DataTableEmpty } from "./data-table-empty"
import {
  DataTableToolbar,
  DataTableToolbarSection,
  DataTableSearch,
} from "./data-table-toolbar"
import {
  DataTableViewOptions,
  columnLabel,
  type DataTableLayout,
} from "./data-table-view-options"

/**
 * Per-column display hints. TanStack's `meta` is the documented escape hatch for passing
 * presentational config from a column def down to the cell renderer — we use it for alignment
 * and column pinning so the *behavior* (TanStack) and the *look* (these primitives) stay
 * declared in one place: the `ColumnDef`.
 */
declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Pin this column to an edge while the rest scrolls horizontally. */
    sticky?: "left" | "right"
    /** Text alignment for both the header and its cells. */
    align?: "left" | "center" | "right"
    /** `tabular-nums` + right alignment for figure columns. */
    numeric?: boolean
    /** Display name for the column in the view-options menu and as a card-layout field label.
     *  Falls back to a string `header`; columns with neither aren't user-toggleable. */
    label?: string
    /** Extra classes for this column's header and cells — e.g. to tighten padding or pin a width. */
    className?: string
  }
}

/**
 * DataTable — the TanStack-wired data grid. It owns the *behavior* (sorting, grouping, row
 * selection, column pinning) and renders into the Koala `Table` primitives, which own the
 * *look*. Drive features with flags; alignment and pinning ride along on each column's
 * `meta`. For static or fully bespoke tables, use the `Table` primitives directly.
 */
export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  /** Stable row id — required for selection/grouping to survive re-sorts. */
  getRowId?: (row: TData, index: number) => string

  /** Click-to-sort headers. @default false */
  enableSorting?: boolean
  initialSorting?: SortingState
  /** Leading checkbox column with a header "select all". @default false */
  enableRowSelection?: boolean
  onRowSelectionChange?: (selection: RowSelectionState) => void
  /** Collapse rows into expandable groups (pass `initialGrouping` to choose the column). @default false */
  enableGrouping?: boolean
  initialGrouping?: GroupingState
  /** Page the rows client-side and render a Pagination toolbar below the table. @default false */
  enablePagination?: boolean
  /** Initial rows per page. @default 8 */
  pageSize?: number
  /** Options offered by the rows-per-page select. @default [8, 16, 24, 50, 100] */
  pageSizeOptions?: number[]

  // — Toolbar (the control rail above the table). Each piece is its own toggle. —
  /** Force the toolbar rail on even with no search/actions. Auto-on when `searchable` or
   *  `toolbarActions` is set. @default false */
  toolbar?: boolean
  /** Add a search box that filters every column (TanStack global filter). @default false */
  searchable?: boolean
  /** Placeholder for the search box. @default "Search for anything" */
  searchPlaceholder?: string
  /** Right-cluster slot for app actions — filter/export/primary buttons, etc. */
  toolbarActions?: React.ReactNode
  /** Add a "View options" dropdown to the toolbar for showing/hiding columns. Give a column a
   *  `meta.label` (or a string header) for it to appear there. @default false */
  viewOptions?: boolean

  // — Layout (rows ⟷ cards) —
  /** Offer a Rows/Cards layout switch (in the view-options dropdown) and render cards when chosen.
   *  Implies `viewOptions`. @default false */
  enableCardLayout?: boolean
  /** Initial layout when `enableCardLayout` is on. @default "rows" */
  defaultLayout?: DataTableLayout
  /** Custom card renderer for the cards layout. Defaults to a generated card — the first column as
   *  the title, the rest as labelled fields, any icon-only action top-right. */
  renderCard?: (row: Row<TData>) => React.ReactNode

  /** Swap the rows for skeleton placeholders while data is in flight. @default false */
  loading?: boolean
  /** How many skeleton rows to show while `loading`. @default 5 */
  loadingRows?: number

  // — Infinite scroll (load on scroll). Mutually exclusive with `enablePagination`. —
  /** Called when the user scrolls near the end and there's more to load. Setting it enables
   *  infinite scroll and replaces the pagination toolbar; the consumer fetches and appends to
   *  `data`. The sentinel observes the nearest scroll container (or the viewport). */
  onLoadMore?: () => void
  /** Whether more rows can still be loaded. The sentinel stops firing (and hides) when false. */
  hasMore?: boolean
  /** Whether a load-more fetch is in flight — shows a loading row and blocks duplicate calls. */
  loadingMore?: boolean

  /** Persist view state (visible columns, sorting, layout, page size) to localStorage under this
   *  key, so the table reopens the way the user left it. SSR-safe — applied after mount. */
  persistKey?: string

  // — Presentational passthrough to <Table> —
  /** Surface treatment: `minimal` (chromeless, flush — the default) or `container` (bordered card). */
  variant?: "minimal" | "container"
  density?: Density
  striped?: boolean
  hoverable?: boolean
  stickyHeader?: boolean
  /**
   * Shown when there are no rows. Defaults to a `<DataTableEmpty />` ("No data yet"); pass
   * `<DataTableEmpty kind="search" />` when a search/filter came up empty, or any node.
   */
  emptyState?: React.ReactNode
  className?: string
  /** Classes for the scroll container — e.g. `max-h-96` to drive sticky-header scroll. */
  containerClassName?: string
}

const SELECT_COLUMN_ID = "__select__"
const PERSIST_PREFIX = "koala-data-table:"

export function DataTable<TData, TValue>({
  columns,
  data,
  getRowId,
  enableSorting = false,
  initialSorting = [],
  enableRowSelection = false,
  onRowSelectionChange,
  enableGrouping = false,
  initialGrouping = [],
  enablePagination = false,
  pageSize = 8,
  pageSizeOptions = [8, 16, 24, 50, 100],
  toolbar = false,
  searchable = false,
  searchPlaceholder = "Search for anything",
  toolbarActions,
  viewOptions = false,
  enableCardLayout = false,
  defaultLayout = "rows",
  renderCard,
  loading = false,
  loadingRows = 5,
  onLoadMore,
  hasMore = false,
  loadingMore = false,
  persistKey,
  variant,
  density,
  striped,
  hoverable,
  stickyHeader,
  emptyState,
  className,
  containerClassName,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>(initialSorting)
  const [grouping, setGrouping] = React.useState<GroupingState>(initialGrouping)
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  const [globalFilter, setGlobalFilter] = React.useState("")
  // The card layout is a sibling of the row layout, switched from the view-options dropdown.
  const [layout, setLayout] = React.useState<DataTableLayout>(defaultLayout)
  const resolvedDensity = useDensity(density)

  // — Persist view state to localStorage when `persistKey` is set. Read once after mount (so the
  //   server markup matches the defaults and hydration stays clean), then write on every change.
  //   `persistHydrated` gates the writer so it can't clobber stored state with defaults before the
  //   read lands. —
  const [persistHydrated, setPersistHydrated] = React.useState(false)
  React.useEffect(() => {
    if (!persistKey) return
    try {
      const raw = window.localStorage.getItem(`${PERSIST_PREFIX}${persistKey}`)
      if (raw) {
        const saved = JSON.parse(raw) as {
          columnVisibility?: VisibilityState
          sorting?: SortingState
          layout?: DataTableLayout
          pageSize?: number
        }
        if (saved.columnVisibility) setColumnVisibility(saved.columnVisibility)
        if (saved.sorting) setSorting(saved.sorting)
        if (saved.layout) setLayout(saved.layout)
        if (saved.pageSize) setPagination((prev) => ({ ...prev, pageSize: saved.pageSize! }))
      }
    } catch {
      // Unreadable/garbled storage — fall back to the defaults already in state.
    }
    setPersistHydrated(true)
  }, [persistKey])

  React.useEffect(() => {
    if (!persistKey || !persistHydrated) return
    try {
      window.localStorage.setItem(
        `${PERSIST_PREFIX}${persistKey}`,
        JSON.stringify({ columnVisibility, sorting, layout, pageSize: pagination.pageSize }),
      )
    } catch {
      // Quota/availability errors — persistence is best-effort, never fatal.
    }
  }, [persistKey, persistHydrated, columnVisibility, sorting, layout, pagination.pageSize])

  // Prepend the selection column when row selection is on. A leading checkbox column is the
  // expected shape, and keeping it here means consumers never hand-roll the header/all toggle.
  const tableColumns = React.useMemo<ColumnDef<TData, TValue>[]>(() => {
    if (!enableRowSelection) return columns
    const selectionColumn: ColumnDef<TData, TValue> = {
      id: SELECT_COLUMN_ID,
      enableSorting: false,
      enableGrouping: false,
      // `w-0` shrinks the column to its content and `pr-0` drops the right padding, so the
      // checkbox sits tight against the next column instead of floating in a wide cell.
      meta: { align: "center", className: "w-0 pr-0" },
      header: ({ table }) => (
        <Checkbox
          size="sm"
          checked={
            table.getIsAllPageRowsSelected()
              ? true
              : table.getIsSomePageRowsSelected()
                ? "indeterminate"
                : false
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all rows"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          size="sm"
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
    }
    return [selectionColumn, ...columns]
  }, [columns, enableRowSelection])

  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      grouping,
      rowSelection,
      columnVisibility,
      ...(enablePagination && { pagination }),
      ...(searchable && { globalFilter }),
    },
    getRowId,
    enableSorting,
    enableRowSelection,
    enableGrouping,
    onSortingChange: setSorting,
    onGroupingChange: setGrouping,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater
        onRowSelectionChange?.(next)
        return next
      })
    },
    getCoreRowModel: getCoreRowModel(),
    ...(searchable && { getFilteredRowModel: getFilteredRowModel() }),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enableGrouping && {
      getGroupedRowModel: getGroupedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
    }),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
  })

  const leafColumnCount = table.getVisibleLeafColumns().length

  // A search/filter that came up empty is a different story than a table with no data — default
  // the placeholder to the matching `kind` so "no results" vs "no data yet" reads right. An
  // explicit `emptyState` always wins.
  const isFiltered = searchable && globalFilter.trim().length > 0
  const resolvedEmptyState =
    emptyState ?? <DataTableEmpty kind={isFiltered ? "search" : "empty"} />

  // View options (column show/hide) ride along whenever the dropdown is asked for, or implicitly
  // when the layout switch needs somewhere to live. The cards layout only renders when enabled.
  const showViewOptions = viewOptions || enableCardLayout
  const isCards = enableCardLayout && layout === "cards"

  // The toolbar rail shows when explicitly on, or implicitly when it has something to hold.
  const showToolbar = toolbar || searchable || toolbarActions != null || showViewOptions

  const tableElement = (
    <Table
      variant={variant}
      density={resolvedDensity}
      striped={striped}
      hoverable={hoverable}
      stickyHeader={stickyHeader}
      className={className}
      containerProps={{ className: containerClassName, "aria-busy": loading || undefined }}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const meta = header.column.columnDef.meta
              const align = meta?.numeric ? "right" : meta?.align
              const canSort = enableSorting && header.column.getCanSort()
              const sorted = header.column.getIsSorted()
              return (
                <TableHead key={header.id} align={align} sticky={meta?.sticky} className={meta?.className}>
                  {header.isPlaceholder ? null : canSort ? (
                    <button
                      type="button"
                      onClick={header.column.getToggleSortingHandler()}
                      className={cn(
                        "group/sort -mx-1 inline-flex h-8 items-center gap-1.5 rounded-md px-1 font-medium",
                        "cursor-pointer outline-none transition-colors duration-fast ease-out",
                        "hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand",
                        align === "right" && "flex-row-reverse",
                      )}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortIndicator state={sorted} />
                    </button>
                  ) : (
                    flexRender(header.column.columnDef.header, header.getContext())
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody>
        {loading ? (
          // Skeleton rows mirror the real column layout so the table doesn't reflow when data
          // lands. The whole region is announced via `aria-busy` on the container — the
          // individual Skeletons stay decorative (aria-hidden).
          Array.from({ length: loadingRows }).map((_, rowIndex) => (
            <TableRow key={`skeleton-${rowIndex}`}>
              {table.getVisibleLeafColumns().map((column, colIndex) => {
                const meta = column.columnDef.meta
                const align = meta?.numeric ? "right" : meta?.align
                return (
                  <TableCell key={column.id} align={align} sticky={meta?.sticky} className={meta?.className}>
                    <SkeletonCell column={column} index={colIndex} />
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        ) : table.getRowModel().rows.length === 0 ? (
          <TableEmpty colSpan={leafColumnCount} className="h-auto p-0">
            {resolvedEmptyState}
          </TableEmpty>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} selected={row.getIsSelected()}>
              {row.getVisibleCells().map((cell) => {
                const meta = cell.column.columnDef.meta
                const align = meta?.numeric ? "right" : meta?.align
                const numeric = meta?.numeric

                // Grouped cell — the column the rows are grouped by. Render an expand toggle,
                // the group value, and the subtree count.
                if (cell.getIsGrouped()) {
                  return (
                    <TableCell key={cell.id} align={align} sticky={meta?.sticky} className={cn("font-medium", meta?.className)}>
                      <button
                        type="button"
                        onClick={row.getToggleExpandedHandler()}
                        className="-mx-1 inline-flex cursor-pointer items-center gap-1.5 rounded-md px-1 outline-none transition-colors duration-fast ease-out hover:text-foreground focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <CaretRight
                          weight="bold"
                          className={cn(
                            "size-3.5 text-muted-foreground transition-transform duration-fast ease-out",
                            row.getIsExpanded() && "rotate-90",
                          )}
                        />
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        <span className="text-muted-foreground tabular-nums">
                          ({row.subRows.length})
                        </span>
                      </button>
                    </TableCell>
                  )
                }

                // Aggregated cell — a summary for the group row (e.g. sum/avg), if the column
                // defines one. Placeholder cells (grouped-away values) render nothing.
                if (cell.getIsAggregated()) {
                  return (
                    <TableCell key={cell.id} align={align} numeric={numeric} sticky={meta?.sticky} className={cn("text-muted-foreground", meta?.className)}>
                      {flexRender(
                        cell.column.columnDef.aggregatedCell ?? cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  )
                }
                if (cell.getIsPlaceholder()) {
                  return <TableCell key={cell.id} align={align} sticky={meta?.sticky} className={meta?.className} />
                }

                return (
                  <TableCell key={cell.id} align={align} numeric={numeric} sticky={meta?.sticky} className={meta?.className}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )

  // Cards layout — the same rows, the same column cells, re-flowed into a responsive card grid.
  // Loading and empty states mirror the table's so switching layout never changes what's announced.
  const rows = table.getRowModel().rows
  const cardGridClass = "grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
  const cardsElement = loading ? (
    <div data-slot="data-table-cards" aria-busy className={cardGridClass}>
      {Array.from({ length: loadingRows }).map((_, index) => (
        <SkeletonCard key={`skeleton-card-${index}`} />
      ))}
    </div>
  ) : rows.length === 0 ? (
    <div data-slot="data-table-cards" className={cardGridClass}>
      <div className="col-span-full">{resolvedEmptyState}</div>
    </div>
  ) : (
    // The cards cascade in on mount via <Stagger> — on the skeleton→data hand-off, a fresh page,
    // or a switch from the rows layout. Stable row ids mean a re-sort reuses the DOM and doesn't
    // replay (polish).
    <Stagger data-slot="data-table-cards" className={cardGridClass}>
      {rows.map((row) =>
        renderCard ? renderCard(row) : <DataTableCard key={row.id} row={row} />,
      )}
    </Stagger>
  )

  const contentElement = isCards ? cardsElement : tableElement

  // Infinite scroll replaces paging: when `onLoadMore` is set, a sentinel below the content fetches
  // the next batch and the Pagination toolbar steps aside.
  const infiniteScroll = onLoadMore != null
  const showPagination = enablePagination && !infiniteScroll

  // Bare table when nothing wraps it — output stays identical to the pre-toolbar/pagination shape.
  if (!showToolbar && !showPagination && !infiniteScroll) return contentElement

  // Match the search box height to the table's density, the way Pagination sizes its controls.
  const searchSize = resolvedDensity === "compact" ? "sm" : "md"

  return (
    <div className="flex flex-col gap-4">
      {showToolbar && (
        <DataTableToolbar>
          {/* Both sections always render so `justify-between` spreads search ⟷ actions even when
              only one side is present. */}
          <DataTableToolbarSection>
            {searchable && (
              <DataTableSearch
                size={searchSize}
                placeholder={searchPlaceholder}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                disabled={loading}
              />
            )}
          </DataTableToolbarSection>
          <DataTableToolbarSection>
            {showViewOptions && (
              <DataTableViewOptions
                table={table}
                layout={layout}
                onLayoutChange={setLayout}
                enableLayout={enableCardLayout}
              />
            )}
            {toolbarActions}
          </DataTableToolbarSection>
        </DataTableToolbar>
      )}
      {contentElement}
      {infiniteScroll && (
        <LoadMoreSentinel
          onLoadMore={onLoadMore}
          hasMore={hasMore}
          loadingMore={loadingMore}
        />
      )}
      {showPagination && (
        // Client-side paging: the Pagination toolbar drives TanStack's pagination state, which
        // slices the row model. Disabled while loading so you can't page an empty skeleton.
        <Pagination
          page={table.getState().pagination.pageIndex + 1}
          pageCount={table.getPageCount()}
          onPageChange={(p) => table.setPageIndex(p - 1)}
          rowsPerPage={table.getState().pagination.pageSize}
          onRowsPerPageChange={(rows) => table.setPageSize(rows)}
          rowsPerPageOptions={pageSizeOptions}
          disabled={loading}
          density={resolvedDensity}
          showRowsPerPage
        />
      )}
    </div>
  )
}

/** Per-column loading placeholder. The select column gets a checkbox-sized square; numeric
 *  columns a short right-aligned bar; text columns a bar whose width varies by column so the
 *  skeleton reads as data, not a grid of identical blocks. */
const SKELETON_WIDTHS = ["w-28", "w-20", "w-32", "w-24"] as const

function SkeletonCell<TData>({ column, index }: { column: Column<TData>; index: number }) {
  const meta = column.columnDef.meta
  if (column.id === SELECT_COLUMN_ID) {
    return <Skeleton className="size-4 rounded-[0.3rem]" />
  }
  if (meta?.numeric) {
    return <Skeleton variant="text" className="ml-auto w-12" />
  }
  return <Skeleton variant="text" className={SKELETON_WIDTHS[index % SKELETON_WIDTHS.length]} />
}

/** Default card for the cards layout. Re-flows a row's cells: the selection checkbox and first
 *  column lead the header, an icon-only action column (no label) sits top-right, and the remaining
 *  labelled columns stack as `label — value` fields. Override the whole card with `renderCard`. */
function DataTableCard<TData>({
  row,
  className,
  style,
}: {
  row: Row<TData>
  // Forwarded to the Card root so a wrapping <Stagger> can attach its entrance class + delay.
  className?: string
  style?: React.CSSProperties
}) {
  const cells = row.getVisibleCells()
  const selectCell = cells.find((cell) => cell.column.id === SELECT_COLUMN_ID)
  const dataCells = cells.filter((cell) => cell.column.id !== SELECT_COLUMN_ID)
  const [primaryCell, ...restCells] = dataCells
  // Columns with no label (e.g. an icon-only actions column) become header actions, not fields.
  const fieldCells = restCells.filter((cell) => columnLabel(cell.column) !== undefined)
  const actionCells = restCells.filter((cell) => columnLabel(cell.column) === undefined)

  return (
    <Card
      data-state={row.getIsSelected() ? "selected" : undefined}
      style={style}
      className={cn(
        "transition-colors duration-fast ease-out data-[state=selected]:border-brand data-[state=selected]:ring-1 data-[state=selected]:ring-brand",
        className,
      )}
    >
      <CardHeader>
        <div className="flex min-w-0 items-center gap-3">
          {selectCell && flexRender(selectCell.column.columnDef.cell, selectCell.getContext())}
          {primaryCell && (
            <div className="min-w-0">
              {flexRender(primaryCell.column.columnDef.cell, primaryCell.getContext())}
            </div>
          )}
        </div>
        {actionCells.length > 0 && (
          <CardAction>
            {actionCells.map((cell) => (
              <React.Fragment key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </React.Fragment>
            ))}
          </CardAction>
        )}
      </CardHeader>
      {fieldCells.length > 0 && (
        <CardContent className="flex flex-col gap-2 text-sm">
          {fieldCells.map((cell) => (
            <div key={cell.id} className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">{columnLabel(cell.column)}</span>
              <span
                className={cn(
                  "text-right",
                  cell.column.columnDef.meta?.numeric && "tabular-nums",
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  )
}

/** Loading placeholder for the cards layout — mirrors the default card's shape (avatar + two lines
 *  in the header, a few labelled rows) so the grid doesn't reflow when data lands. */
function SkeletonCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton variant="text" className="w-24" />
            <Skeleton variant="text" className="w-32" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between">
            <Skeleton variant="text" className="w-16" />
            <Skeleton variant="text" className="w-20" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

/** Nearest scrollable ancestor of `node`, or `null` (meaning the viewport) if none. Lets the
 *  load-more sentinel observe whichever element actually scrolls — a capped container the consumer
 *  wrapped the table in, or the page itself. */
function getScrollParent(node: HTMLElement | null): HTMLElement | null {
  let el = node?.parentElement ?? null
  while (el) {
    const overflowY = getComputedStyle(el).overflowY
    if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
      return el
    }
    el = el.parentElement
  }
  return null
}

/** Infinite-scroll sentinel. Sits below the content and calls `onLoadMore` when it scrolls into
 *  view (prefetching ~200px early) as long as there's more to load and nothing's already in flight.
 *  Reads live props from a ref so the IntersectionObserver is set up once and never churns. */
function LoadMoreSentinel({
  onLoadMore,
  hasMore,
  loadingMore,
}: {
  onLoadMore: () => void
  hasMore: boolean
  loadingMore: boolean
}) {
  const ref = React.useRef<HTMLDivElement>(null)
  // Keep the latest callback + flags in a ref so the observer (set up once) always reads current
  // values without re-subscribing. Updated in an effect — never mutated during render.
  const stateRef = React.useRef({ onLoadMore, hasMore, loadingMore })
  React.useEffect(() => {
    stateRef.current = { onLoadMore, hasMore, loadingMore }
  })

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const state = stateRef.current
        if (entries[0]?.isIntersecting && state.hasMore && !state.loadingMore) {
          state.onLoadMore()
        }
      },
      { root: getScrollParent(el), rootMargin: "0px 0px 200px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      aria-live="polite"
      className="flex min-h-2 items-center justify-center py-2 text-sm text-muted-foreground"
    >
      {loadingMore && (
        <span className="inline-flex items-center gap-2">
          <CircleNotch className="size-4 animate-spin" />
          Loading more…
        </span>
      )}
    </div>
  )
}

/** Sort affordance: a muted up/down caret when unsorted, a solid directional caret when active. */
function SortIndicator({ state }: { state: false | "asc" | "desc" }) {
  if (state === "asc") return <CaretUp weight="bold" className="size-3.5" />
  if (state === "desc") return <CaretDown weight="bold" className="size-3.5" />
  return (
    <CaretUpDown
      weight="bold"
      className="size-3.5 text-muted-foreground/60 transition-colors duration-fast ease-out group-hover/sort:text-muted-foreground"
    />
  )
}

export type { ColumnDef, RowSelectionState, SortingState, GroupingState, TanstackTable }
