import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"

import { Button } from "@/components/ui/button"
import { expectNoA11yViolations } from "../a11y"

// Smoke test: proves the harness works end-to-end (jsdom render, @/ alias resolution,
// jest-dom matchers, axe). If this fails, the test setup is broken, not the component.
describe("Button (smoke)", () => {
  it("renders an accessible button with its label", () => {
    render(<Button>Save changes</Button>)
    expect(screen.getByRole("button", { name: "Save changes" })).toBeInTheDocument()
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Button>Save changes</Button>)
    await expectNoA11yViolations(container)
  })
})
