import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Tree, TreeItem } from "@/components/ui/tree"
import { expectNoA11yViolations } from "../a11y"

// "src" starts expanded -> visible rows in DOM order: src, index.ts, app, README.md.
// "app" is a collapsed branch, so page.tsx is unmounted until it expands.
function Files({ onValueChange }: { onValueChange?: (v: string) => void }) {
  return (
    <Tree aria-label="Project files" defaultExpandedValues={["src"]} onValueChange={onValueChange}>
      <TreeItem value="src" label="src">
        <TreeItem value="index" label="index.ts" />
        <TreeItem value="app" label="app">
          <TreeItem value="page" label="page.tsx" />
        </TreeItem>
      </TreeItem>
      <TreeItem value="readme" label="README.md" />
    </Tree>
  )
}

describe("Tree", () => {
  it("exposes the ARIA tree structure (roles, level, expanded state)", () => {
    render(<Files />)

    expect(screen.getByRole("tree", { name: "Project files" })).toBeInTheDocument()

    // Collapsed "app" keeps its child out of the tree.
    expect(screen.getAllByRole("treeitem")).toHaveLength(4)
    expect(screen.queryByRole("treeitem", { name: "page.tsx" })).not.toBeInTheDocument()

    const src = screen.getByRole("treeitem", { name: "src" })
    const app = screen.getByRole("treeitem", { name: "app" })
    const leaf = screen.getByRole("treeitem", { name: "index.ts" })

    expect(src).toHaveAttribute("aria-expanded", "true")
    expect(app).toHaveAttribute("aria-expanded", "false")
    expect(leaf).not.toHaveAttribute("aria-expanded") // leaves are not expandable

    expect(src).toHaveAttribute("aria-level", "1")
    expect(leaf).toHaveAttribute("aria-level", "2")
    expect(screen.getByRole("treeitem", { name: "README.md" })).toHaveAttribute("aria-level", "1")
  })

  it("roving keyboard moves focus across visible rows (Down/Up/Home/End)", async () => {
    const user = userEvent.setup()
    render(<Files />)

    const src = screen.getByRole("treeitem", { name: "src" })
    const index = screen.getByRole("treeitem", { name: "index.ts" })
    const app = screen.getByRole("treeitem", { name: "app" })
    const readme = screen.getByRole("treeitem", { name: "README.md" })

    src.focus()
    expect(src).toHaveFocus()

    await user.keyboard("{ArrowDown}")
    expect(index).toHaveFocus()

    await user.keyboard("{ArrowDown}")
    expect(app).toHaveFocus()

    await user.keyboard("{ArrowUp}")
    expect(index).toHaveFocus()

    await user.keyboard("{End}")
    expect(readme).toHaveFocus()

    await user.keyboard("{Home}")
    expect(src).toHaveFocus()
  })

  it("ArrowRight expands a collapsed branch from the keyboard", async () => {
    const user = userEvent.setup()
    render(<Files />)

    const app = screen.getByRole("treeitem", { name: "app" })
    app.focus()
    expect(app).toHaveAttribute("aria-expanded", "false")

    await user.keyboard("{ArrowRight}")

    expect(app).toHaveAttribute("aria-expanded", "true")
    expect(await screen.findByRole("treeitem", { name: "page.tsx" })).toBeInTheDocument()
  })

  it("activates a row with Enter (selection)", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Files onValueChange={onValueChange} />)

    const readme = screen.getByRole("treeitem", { name: "README.md" })
    readme.focus()
    await user.keyboard("{Enter}")

    expect(onValueChange).toHaveBeenCalledWith("readme")
    expect(readme).toHaveAttribute("aria-selected", "true")
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Files />)
    await expectNoA11yViolations(container)
  })
})
