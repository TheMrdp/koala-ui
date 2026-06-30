"use client"

import * as React from "react"

import {
  Pagination,
  PaginationRoot,
  PaginationInfo,
  PaginationControls,
  PaginationGoTo,
} from "@/components/ui/pagination"

/** Hero: every addon on, the full toolbar. */
export function FullDemo() {
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(20)
  return (
    <Pagination
      className="w-full max-w-2xl"
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
}

/** The default: just the page readout + prev/next. */
export function BasicDemo() {
  const [page, setPage] = React.useState(3)
  return (
    <Pagination
      className="w-full max-w-md"
      page={page}
      pageCount={10}
      onPageChange={setPage}
    />
  )
}

/** Toggle the go-to field on. */
export function GoToDemo() {
  const [page, setPage] = React.useState(7)
  return (
    <Pagination
      className="w-full max-w-md"
      page={page}
      pageCount={50}
      onPageChange={setPage}
      showGoTo
    />
  )
}

/** Toggle the rows-per-page select on. */
export function RowsPerPageDemo() {
  const [page, setPage] = React.useState(1)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  return (
    <Pagination
      className="w-full max-w-md"
      page={page}
      pageCount={12}
      onPageChange={setPage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={setRowsPerPage}
      rowsPerPageOptions={[10, 25, 50, 100]}
      showRowsPerPage
    />
  )
}

/** Same toolbar at both densities. */
export function DensityDemo() {
  const [a, setA] = React.useState(2)
  const [b, setB] = React.useState(2)
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">comfortable</span>
        <Pagination
          density="comfortable"
          page={a}
          pageCount={16}
          onPageChange={setA}
          showGoTo
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">compact</span>
        <Pagination
          density="compact"
          page={b}
          pageCount={16}
          onPageChange={setB}
          showGoTo
        />
      </div>
    </div>
  )
}

/** Composing the parts by hand via PaginationRoot for a bespoke layout. */
export function CustomLayoutDemo() {
  const [page, setPage] = React.useState(4)
  return (
    <PaginationRoot
      className="w-full max-w-md justify-center"
      page={page}
      pageCount={20}
      onPageChange={setPage}
    >
      <PaginationControls />
      <PaginationInfo />
      <PaginationGoTo label="Jump to" />
    </PaginationRoot>
  )
}
