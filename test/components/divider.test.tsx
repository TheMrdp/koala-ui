import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Divider } from "@/components/ui/divider"
import { expectNoA11yViolations } from "../a11y"

// The auto-collapse itself is pure CSS (globals.css), which jsdom doesn't evaluate, so these
// guard the contract that drives it: a divider is smart (tagged) by default, and `static` opts
// out by dropping the tag. The collapse rules only ever match a tagged rule, so this is the seam.
describe("Divider", () => {
  it("is smart by default (carries data-smart so the collapse rules apply)", () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('[data-slot="divider"]')).toHaveAttribute("data-smart")
  })

  it("opts out of the auto-collapse with `static`", () => {
    const { container } = render(<Divider static />)
    expect(container.querySelector('[data-slot="divider"]')).not.toHaveAttribute("data-smart")
  })

  it("a labeled divider exposes exactly one separator and stays smart", () => {
    render(<Divider>OR</Divider>)
    const separators = screen.getAllByRole("separator")
    expect(separators).toHaveLength(1)
    expect(separators[0]).toHaveAttribute("data-smart")
    expect(separators[0]).toHaveTextContent("OR")
  })

  it("has no a11y violations", async () => {
    const { container } = render(
      <div>
        <p>Above</p>
        <Divider />
        <p>Below</p>
      </div>,
    )
    await expectNoA11yViolations(container)
  })
})
