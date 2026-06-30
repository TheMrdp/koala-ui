"use client"

import * as React from "react"

import { Divider } from "@/components/ui/divider"
import { Switch } from "@/components/ui/switch"

const SECTIONS = [
  { id: "account", label: "Account", description: "Name, email, and avatar" },
  { id: "billing", label: "Billing", description: "Plan, invoices, and payment" },
  { id: "team", label: "Team", description: "Members and their roles" },
] as const

/**
 * Smart dividers in a dynamic list. Each visible row is naively followed by a `<Divider />`;
 * the smart auto-collapse then removes whatever ends up orphaned: the trailing rule after the
 * last row, and any rule beside a row that toggled off. Empty the whole list and nothing is
 * stranded over the empty state. Flip "Keep dividers static" to switch the collapse off and
 * watch the orphaned trailing rule reappear: the same markup, with and without the guarantee.
 */
export function SmartDividerDemo() {
  const [shown, setShown] = React.useState<Record<string, boolean>>({
    account: true,
    billing: true,
    team: true,
  })
  const [isStatic, setIsStatic] = React.useState(false)

  function toggle(id: string) {
    setShown((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const visible = SECTIONS.filter((s) => shown[s.id])

  return (
    <div className="flex w-full max-w-md flex-col gap-5">
      {/* Controls */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-muted/40 p-4">
        {SECTIONS.map((s) => (
          <label
            key={s.id}
            htmlFor={`smart-${s.id}`}
            className="flex cursor-pointer items-center justify-between gap-4 text-sm"
          >
            <span className="font-medium text-foreground">Show {s.label}</span>
            <Switch id={`smart-${s.id}`} checked={shown[s.id]} onCheckedChange={() => toggle(s.id)} />
          </label>
        ))}
        {/* Intentional chrome, always between content: `static` so it never collapses. */}
        <Divider static className="my-1" />
        <label
          htmlFor="smart-static"
          className="flex cursor-pointer items-center justify-between gap-4 text-sm"
        >
          <span className="font-medium text-foreground">Keep dividers static</span>
          <Switch id="smart-static" checked={isStatic} onCheckedChange={setIsStatic} />
        </label>
      </div>

      {/* The list: a Divider naively follows every row; smart-collapse cleans up the orphans.
          Concentric radius: card rounded-xl (16px) − p-2 (8px) → rows rounded-lg (8px). */}
      <div className="rounded-xl border border-border bg-card p-2">
        {visible.length === 0 ? (
          <p className="px-3 py-8 text-center text-sm text-muted-foreground">No sections selected.</p>
        ) : (
          visible.map((s) => (
            <React.Fragment key={s.id}>
              <div className="rounded-lg px-3 py-2.5">
                <p className="text-sm font-medium text-foreground">{s.label}</p>
                <p className="text-sm text-pretty text-muted-foreground">{s.description}</p>
              </div>
              <Divider static={isStatic} />
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  )
}
