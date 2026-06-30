import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Calendar } from "@/components/ui/date-picker"
import { expectNoA11yViolations } from "../a11y"

// Fixed locale so day-button accessible names ("Wednesday, June 10, 2026") are deterministic in CI.
const JUNE_2026 = new Date(2026, 5, 1)

// Day buttons carry the full date as their accessible name; aria-selected lives on the parent gridcell.
function cellFor(name: RegExp): HTMLElement {
  const cell = screen.getByRole("button", { name }).closest('[role="gridcell"]')
  if (!cell) throw new Error(`no gridcell for ${name}`)
  return cell as HTMLElement
}

describe("Calendar", () => {
  it("exposes a labelled grid of days", () => {
    render(<Calendar locale="en-US" defaultMonth={JUNE_2026} />)
    expect(screen.getByRole("grid")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /June 15, 2026/ })).toBeInTheDocument()
  })

  it("grid roving keyboard moves the focused day (Right / Down)", async () => {
    const user = userEvent.setup()
    render(<Calendar locale="en-US" defaultMonth={JUNE_2026} />)

    const d10 = screen.getByRole("button", { name: /June 10, 2026/ })
    d10.focus()
    expect(d10).toHaveFocus()

    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("button", { name: /June 11, 2026/ })).toHaveFocus()

    await user.keyboard("{ArrowDown}") // +7 days
    expect(screen.getByRole("button", { name: /June 18, 2026/ })).toHaveFocus()
  })

  // GAP 1: every day inside the selected range must be exposed to AT, not just the endpoints.
  it("marks in-range days (not only endpoints) as aria-selected", () => {
    render(
      <Calendar
        mode="range"
        locale="en-US"
        defaultMonth={JUNE_2026}
        defaultSelected={{ from: new Date(2026, 5, 10), to: new Date(2026, 5, 12) }}
      />,
    )

    expect(cellFor(/June 10, 2026/)).toHaveAttribute("aria-selected", "true") // start
    expect(cellFor(/June 11, 2026/)).toHaveAttribute("aria-selected", "true") // middle (the gap)
    expect(cellFor(/June 12, 2026/)).toHaveAttribute("aria-selected", "true") // end

    // A day outside the range stays unselected.
    expect(cellFor(/June 20, 2026/)).not.toHaveAttribute("aria-selected")
  })

  // GAP 2: changing month via the chevron (which doesn't move focus to a day) must be announced.
  it("announces the visible month through a live region", async () => {
    const user = userEvent.setup()
    render(<Calendar locale="en-US" defaultMonth={JUNE_2026} />)

    const status = screen.getByRole("status")
    expect(status).toHaveTextContent("June 2026")

    await user.click(screen.getByRole("button", { name: "Next month" }))
    expect(status).toHaveTextContent("July 2026")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Calendar locale="en-US" defaultMonth={JUNE_2026} />)
    await expectNoA11yViolations(container)
  })
})
