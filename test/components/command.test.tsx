import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { expectNoA11yViolations } from "../a11y"

function Palette({ onSelect }: { onSelect?: (v: string) => void }) {
  return (
    <Command label="Commands">
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem value="Home" onSelect={onSelect}>
            Home
          </CommandItem>
          <CommandItem value="Settings" onSelect={onSelect}>
            Settings
          </CommandItem>
          <CommandItem value="Search" onSelect={onSelect}>
            Search
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

describe("Command", () => {
  it("wires up the combobox + listbox + options", () => {
    render(<Palette />)
    const combobox = screen.getByRole("combobox")
    expect(combobox).toHaveAttribute("aria-controls")
    expect(combobox).toHaveAttribute("aria-expanded", "true")
    // The combobox must always carry an accessible name (today it comes from the placeholder);
    // this guards against a future change that strips it and leaves the field unnamed for AT.
    expect(combobox).toHaveAccessibleName()
    expect(screen.getByRole("listbox", { name: "Commands" })).toBeInTheDocument()
    expect(screen.getAllByRole("option")).toHaveLength(3)
  })

  it("highlights the first option on mount (aria-activedescendant)", () => {
    render(<Palette />)
    const combobox = screen.getByRole("combobox")
    const home = screen.getByRole("option", { name: "Home" })
    expect(home).toHaveAttribute("aria-selected", "true")
    expect(combobox).toHaveAttribute("aria-activedescendant", home.id)
  })

  it("roving keyboard moves the active option (Down / Up / wraps)", async () => {
    const user = userEvent.setup()
    render(<Palette />)
    const combobox = screen.getByRole("combobox")
    combobox.focus()

    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("option", { name: "Settings" })).toHaveAttribute("aria-selected", "true")
    expect(combobox).toHaveAttribute(
      "aria-activedescendant",
      screen.getByRole("option", { name: "Settings" }).id,
    )

    await user.keyboard("{End}")
    expect(screen.getByRole("option", { name: "Search" })).toHaveAttribute("aria-selected", "true")

    await user.keyboard("{ArrowDown}") // wraps back to the first
    expect(screen.getByRole("option", { name: "Home" })).toHaveAttribute("aria-selected", "true")
  })

  it("runs the active option on Enter", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<Palette onSelect={onSelect} />)

    screen.getByRole("combobox").focus()
    await user.keyboard("{ArrowDown}") // -> Settings
    await user.keyboard("{Enter}")

    expect(onSelect).toHaveBeenCalledWith("Settings")
  })

  it("filters rows by query (non-matches leave the DOM)", async () => {
    const user = userEvent.setup()
    render(<Palette />)

    await user.type(screen.getByRole("combobox"), "set")
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(1)
    expect(options[0]).toHaveAccessibleName("Settings")

    await user.clear(screen.getByRole("combobox"))
    await user.type(screen.getByRole("combobox"), "zzzz")
    expect(screen.queryAllByRole("option")).toHaveLength(0)
  })

  it("has no a11y violations", async () => {
    const { container } = render(<Palette />)
    await expectNoA11yViolations(container)
  })
})
