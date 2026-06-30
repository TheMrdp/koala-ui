// Registers jest-dom matchers (toBeInTheDocument, toHaveAttribute, ...) on Vitest's `expect`,
// and tears down the rendered tree after every test. globals are off, so cleanup is wired
// explicitly rather than relying on a global afterEach.
import "@testing-library/jest-dom/vitest"
import { afterEach, vi } from "vitest"
import { cleanup } from "@testing-library/react"

afterEach(cleanup)

// jsdom doesn't implement scrollIntoView; components that scroll an active row into view
// (Command, Calendar, ...) would otherwise throw inside layout effects under test.
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn()
}
