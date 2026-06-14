"use client"

import * as React from "react"
import {
  DotsThreeVertical,
  FunnelSimple,
  ArrowsDownUp,
  Export,
} from "@phosphor-icons/react"

import { AvatarRoot, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  DataTable,
  type ColumnDef,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCellText,
  DataTableToolbar,
  DataTableToolbarSection,
  DataTableSearch,
  DataTableEmpty,
} from "@/components/ui/data-table"

/* ------------------------------------------------------------------ data --- */

type Status = "Active" | "Invited" | "Suspended"

interface Member {
  id: string
  name: string
  email: string
  avatar?: string
  role: "Owner" | "Admin" | "Member" | "Viewer"
  team: "Engineering" | "Design" | "Marketing"
  status: Status
  balance: number
}

const members: Member[] = [
  { id: "1", name: "Aria Montgomery", email: "aria@koala.dev", role: "Owner", team: "Engineering", status: "Active", balance: 4820 },
  { id: "2", name: "Bruno Vasquez", email: "bruno@koala.dev", role: "Admin", team: "Engineering", status: "Active", balance: 1290 },
  { id: "3", name: "Cleo Nakamura", email: "cleo@koala.dev", role: "Member", team: "Design", status: "Invited", balance: 0 },
  { id: "4", name: "Dario Field", email: "dario@koala.dev", role: "Member", team: "Design", status: "Active", balance: 760 },
  { id: "5", name: "Esme Holloway", email: "esme@koala.dev", role: "Viewer", team: "Marketing", status: "Suspended", balance: -120 },
  { id: "6", name: "Finn Albrecht", email: "finn@koala.dev", role: "Member", team: "Marketing", status: "Active", balance: 3410 },
]

// A larger set so paging has somewhere to go — the six members cloned across pages with
// unique ids/emails and lightly varied balances.
const manyMembers: Member[] = Array.from({ length: 24 }, (_, i) => {
  const base = members[i % members.length]
  return {
    ...base,
    id: `m${i + 1}`,
    email: `${base.email.split("@")[0]}${i + 1}@koala.dev`,
    balance: base.balance + i * 35,
  }
})

// A page of cloned members starting at `start` — stands in for a server fetch in the infinite
// scroll demo.
const makeInfiniteRows = (start: number, count: number): Member[] =>
  Array.from({ length: count }, (_, i) => {
    const index = start + i
    const base = members[index % members.length]
    return {
      ...base,
      id: `inf-${index}`,
      email: `${base.email.split("@")[0]}${index + 1}@koala.dev`,
      balance: base.balance + index * 25,
    }
  })

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const statusVariant: Record<Status, React.ComponentProps<typeof Badge>["variant"]> = {
  Active: "success",
  Invited: "secondary",
  Suspended: "destructive",
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")

/* --------------------------------------------------------- cell renderers --- */

function MemberCell({ member }: { member: Member }) {
  return (
    <div className="flex items-center gap-3">
      <AvatarRoot size="sm">
        {member.avatar && <AvatarImage src={member.avatar} alt="" />}
        <AvatarFallback>{initials(member.name)}</AvatarFallback>
      </AvatarRoot>
      <TableCellText primary={member.name} secondary={member.email} />
    </div>
  )
}

function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" iconOnly aria-label="Row actions" tooltip={false}>
          <DotsThreeVertical weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>View profile</DropdownMenuItem>
        <DropdownMenuItem>Edit role</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* ---------------------------------------------------------------- columns --- */

const memberColumns: ColumnDef<Member>[] = [
  {
    accessorKey: "name",
    header: "Member",
    cell: ({ row }) => <MemberCell member={row.original} />,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Status>()
      return (
        <Badge variant={statusVariant[status]} size="sm">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    meta: { numeric: true },
    cell: ({ getValue }) => currency.format(getValue<number>()),
  },
  {
    id: "actions",
    header: "",
    meta: { align: "right" },
    cell: () => <RowActions />,
  },
]

/* ============================================================== demos === */

/** Action buttons for the toolbar's right slot — shared by the toolbar/showcase demos. All
 *  Koala-native Buttons; the icon-only ones get tooltips from their `aria-label`. */
function ToolbarActions() {
  return (
    <>
      <Button variant="outline" iconOnly aria-label="Filter">
        <FunnelSimple />
      </Button>
      <Button variant="outline" iconOnly aria-label="Export">
        <Export />
      </Button>
      <Button>Register</Button>
    </>
  )
}

/** Toolbar — built into the table with simple toggles: `searchable` adds a column-filtering
 *  search box, `toolbarActions` is the right-side slot for your buttons. */
export function ToolbarDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      enableSorting
      searchable
      className="min-w-[34rem]"
      toolbarActions={<ToolbarActions />}
    />
  )
}

/** A hand-composed toolbar for layouts the toggles don't cover — the parts are exported
 *  (`DataTableToolbar`, `DataTableToolbarSection`, `DataTableSearch`) so you can arrange them
 *  freely. Here filter/sort sit next to the search on the left. */
export function CustomToolbarDemo() {
  return (
    <DataTableToolbar>
      <DataTableToolbarSection>
        <DataTableSearch />
        <Button variant="outline" iconOnly aria-label="Filter">
          <FunnelSimple />
        </Button>
        <Button variant="outline" iconOnly aria-label="Sort">
          <ArrowsDownUp />
        </Button>
      </DataTableToolbarSection>
      <DataTableToolbarSection>
        <Button variant="outline" iconOnly aria-label="Export">
          <Export />
        </Button>
        <Button>Register</Button>
      </DataTableToolbarSection>
    </DataTableToolbar>
  )
}

/** Hero — the whole thing from booleans: a searchable, sortable, paginated table with toolbar
 *  actions and every cell type (avatar+text, muted text, status badge, numeric, row actions). */
export function ShowcaseDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={manyMembers}
      getRowId={(row) => row.id}
      enableSorting
      searchable
      viewOptions
      enableCardLayout
      enablePagination
      pageSize={8}
      pageSizeOptions={[8, 16, 24, 50, 100]}
      className="min-w-[34rem]"
      toolbarActions={<ToolbarActions />}
    />
  )
}

/** View options — the SlidersHorizontal dropdown switches layout (rows ⟷ cards) and shows/hides
 *  columns. Try toggling Role or Balance off, then flip to the cards layout. */
export function ViewOptionsDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      enableSorting
      searchable
      viewOptions
      enableCardLayout
      className="min-w-[34rem]"
    />
  )
}

/** Remembering view state — with a `persistKey`, the visible columns, sort, layout, and page size
 *  survive a reload. Hide a column or switch to cards, then refresh the page: it comes back. */
export function PersistenceDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      enableSorting
      viewOptions
      enableCardLayout
      persistKey="docs-members"
      className="min-w-[34rem]"
    />
  )
}

/** Pagination — client-side paging with a rows-per-page select. The toolbar drives TanStack's
 *  pagination state, which slices the rows the table renders. */
export function PaginationDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={manyMembers}
      getRowId={(row) => row.id}
      enableSorting
      enablePagination
      pageSize={8}
      pageSizeOptions={[8, 16, 24, 50, 100]}
      className="min-w-[34rem]"
    />
  )
}

/** Infinite scroll — rows load as you scroll near the end instead of paging. The demo simulates a
 *  fetch with a short delay; the table grows until all 48 rows are in. */
export function InfiniteScrollDemo() {
  const PAGE_SIZE = 8
  const TOTAL = 48
  const [rows, setRows] = React.useState<Member[]>(() => makeInfiniteRows(0, PAGE_SIZE))
  const [loadingMore, setLoadingMore] = React.useState(false)
  const hasMore = rows.length < TOTAL
  const handleLoadMore = React.useCallback(() => {
    setLoadingMore(true)
    // Stand-in for a server fetch.
    window.setTimeout(() => {
      setRows((prev) => [...prev, ...makeInfiniteRows(prev.length, PAGE_SIZE)].slice(0, TOTAL))
      setLoadingMore(false)
    }, 700)
  }, [])
  return (
    <div className="max-h-96 w-full overflow-auto">
      <DataTable
        columns={memberColumns}
        data={rows}
        getRowId={(row) => row.id}
        variant="container"
        onLoadMore={handleLoadMore}
        hasMore={hasMore}
        loadingMore={loadingMore}
        className="min-w-[34rem]"
      />
    </div>
  )
}

/** Loading — skeleton rows stand in while data is in flight, mirroring the real column layout
 *  so nothing reflows when it lands. */
export function LoadingDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={[]}
      loading
      enableSorting
      className="min-w-[34rem]"
    />
  )
}

/** Empty — no data yet. The default placeholder; here with a primary action to add the first row. */
export function EmptyDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={[]}
      enableSorting
      className="min-w-[34rem]"
      emptyState={
        <DataTableEmpty>
          <Button size="sm">Register</Button>
        </DataTableEmpty>
      }
    />
  )
}

/** No results — there is data, but nothing matched the search/filters. `kind="search"` swaps the
 *  icon and copy for the not-found case. */
export function NoResultsDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={[]}
      enableSorting
      className="min-w-[34rem]"
      emptyState={
        <DataTableEmpty kind="search">
          <Button size="sm" variant="ghost">
            Clear filters
          </Button>
        </DataTableEmpty>
      }
    />
  )
}

/** Many cell types (avatar+text, muted text, status badge, numeric) plus sortable columns. */
export function CellTypesDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      enableSorting
      className="min-w-[34rem]"
    />
  )
}

/** Container — the opt-in bordered, rounded card. For when the table stands on its own rather
 *  than inside something that already frames it. */
export function ContainerDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      variant="container"
      enableSorting
      className="min-w-[34rem]"
    />
  )
}

/** The default (chromeless) in context — dropped straight into a titled page section, the table
 *  sits on the page surface and carries only its own row rules. This is what the minimal default
 *  is for: no box stacked around content that is already laid out. */
export function DefaultInSectionDemo() {
  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-0.5">
        <h3 className="text-balance font-semibold">Team members</h3>
        <p className="text-pretty text-sm text-muted-foreground">
          People with access to this workspace.
        </p>
      </div>
      <DataTable
        columns={memberColumns}
        data={members}
        getRowId={(row) => row.id}
        className="min-w-[34rem]"
      />
    </div>
  )
}

/** Zebra striping for quicker row scanning on wide, dense tables. */
export function StripedDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      striped
      hoverable={false}
      className="min-w-[34rem]"
    />
  )
}

/** Density is the "condensed rows" axis — compact (default) vs the roomier comfortable. */
export function DensityDemo() {
  const [density, setDensity] = React.useState<"compact" | "comfortable">("compact")
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-2">
        {(["compact", "comfortable"] as const).map((d) => (
          <Button
            key={d}
            size="sm"
            variant={density === d ? "secondary" : "ghost"}
            className="capitalize"
            onClick={() => setDensity(d)}
          >
            {d === "compact" ? "Condensed" : "Comfortable"}
          </Button>
        ))}
      </div>
      <DataTable
        columns={memberColumns}
        data={members}
        getRowId={(row) => row.id}
        density={density}
        className="min-w-[34rem]"
      />
    </div>
  )
}

/** Click-to-sort headers — a muted up/down caret resolves to a solid directional one. */
export function SortingDemo() {
  return (
    <DataTable
      columns={memberColumns}
      data={members}
      getRowId={(row) => row.id}
      enableSorting
      initialSorting={[{ id: "balance", desc: true }]}
      className="min-w-[34rem]"
    />
  )
}

/** Group rows under an expandable header, with an aggregated balance per group. */
export function GroupingDemo() {
  const columns = React.useMemo<ColumnDef<Member>[]>(
    () => [
      { accessorKey: "team", header: "Team" },
      {
        accessorKey: "name",
        header: "Member",
        cell: ({ row }) => <MemberCell member={row.original} />,
        aggregatedCell: () => null,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant={statusVariant[getValue<Status>()]} size="sm">
            {getValue<Status>()}
          </Badge>
        ),
        aggregatedCell: () => null,
      },
      {
        accessorKey: "balance",
        header: "Balance",
        meta: { numeric: true },
        aggregationFn: "sum",
        cell: ({ getValue }) => currency.format(getValue<number>()),
        aggregatedCell: ({ getValue }) => currency.format(getValue<number>()),
      },
    ],
    [],
  )
  return (
    <DataTable
      columns={columns}
      data={members}
      getRowId={(row) => row.id}
      enableGrouping
      initialGrouping={["team"]}
      className="min-w-[34rem]"
    />
  )
}

/** Row selection with a header "select all", indeterminate state, and a live count. */
export function SelectionDemo() {
  const [selection, setSelection] = React.useState<Record<string, boolean>>({})
  const count = Object.values(selection).filter(Boolean).length
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex h-8 items-center text-sm text-muted-foreground">
        {count > 0 ? (
          <span>
            <span className="font-medium text-foreground tabular-nums">{count}</span> of{" "}
            <span className="tabular-nums">{members.length}</span> selected
          </span>
        ) : (
          <span>Select rows to act on them.</span>
        )}
      </div>
      <DataTable
        columns={memberColumns}
        data={members}
        getRowId={(row) => row.id}
        enableRowSelection
        onRowSelectionChange={setSelection}
        className="min-w-[34rem]"
      />
    </div>
  )
}

/** Sticky header — the header pins to the top while a capped-height body scrolls under it. */
export function StickyHeaderDemo() {
  const rows = React.useMemo(
    () => Array.from({ length: 4 }, (_, i) => members.map((m) => ({ ...m, id: `${m.id}-${i}` }))).flat(),
    [],
  )
  return (
    <DataTable
      columns={memberColumns}
      data={rows}
      getRowId={(row) => row.id}
      stickyHeader
      containerClassName="max-h-72"
      className="min-w-[34rem]"
    />
  )
}

/** Sticky column — pin a column (here the member) to the left while the rest scrolls sideways. */
export function StickyColumnDemo() {
  const columns = React.useMemo<ColumnDef<Member>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Member",
        meta: { sticky: "left" },
        cell: ({ row }) => <MemberCell member={row.original} />,
      },
      { accessorKey: "team", header: "Team" },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ getValue }) => (
          <Badge variant={statusVariant[getValue<Status>()]} size="sm">
            {getValue<Status>()}
          </Badge>
        ),
      },
      { accessorKey: "email", header: "Email", cell: ({ getValue }) => <span className="text-muted-foreground">{getValue<string>()}</span> },
      { accessorKey: "balance", header: "Balance", meta: { numeric: true }, cell: ({ getValue }) => currency.format(getValue<number>()) },
    ],
    [],
  )
  return (
    <DataTable
      columns={columns}
      data={members}
      getRowId={(row) => row.id}
      className="min-w-[52rem]"
    />
  )
}

/** Hand-built static table from the primitives — no TanStack — showing a footer total. */
export function PrimitivesDemo() {
  return (
    <Table className="min-w-[28rem]">
      <TableHeader>
        <TableRow>
          <TableHead>Member</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right">Balance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.slice(0, 4).map((m) => (
          <TableRow key={m.id}>
            <TableCell>
              <TableCellText primary={m.name} secondary={m.email} />
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[m.status]} size="sm">
                {m.status}
              </Badge>
            </TableCell>
            <TableCell numeric>{currency.format(m.balance)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell numeric>
            {currency.format(members.slice(0, 4).reduce((sum, m) => sum + m.balance, 0))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

/** Standalone selection checkbox preview — the shared Checkbox component the table uses. */
export function CheckboxDemo() {
  const [checked, setChecked] = React.useState<boolean | "indeterminate">("indeterminate")
  return (
    <div className="flex items-center gap-6">
      <Checkbox checked={checked} onCheckedChange={(v) => setChecked(v)} aria-label="Toggle" />
      <Checkbox checked aria-label="Checked" />
      <Checkbox checked="indeterminate" aria-label="Indeterminate" />
      <Checkbox checked={false} aria-label="Unchecked" />
      <Checkbox checked disabled aria-label="Disabled" />
    </div>
  )
}
