import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"

import {
  CommandDialogDemo,
  CommandInlineDemo,
  CommandDensityDemo,
} from "./command-demos"

export const metadata = { title: "Command" }

export default function CommandDocsPage() {
  return (
    <>
      <DocHeader
        title="Command"
        description="A searchable command palette: the ⌘K menu. A filtered list of actions over a search field, with full keyboard control: arrows move the highlight, Enter runs the active row, and focus never leaves the input. Built on Radix Dialog for the focus trap, scroll lock, and animations; filtering and the roving highlight are hand-rolled with no cmdk dependency."
      />

      <ComponentPreview code={HERO_CODE} previewClassName="min-h-64">
        <CommandDialogDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="command" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={USAGE_CODE}
        />
        <p className="mt-4 text-pretty text-muted-foreground">
          Each <code className="font-mono text-sm">CommandItem</code> has a required{" "}
          <code className="font-mono text-sm">value</code> (its searchable identity) and an optional{" "}
          <code className="font-mono text-sm">keywords</code> array for synonyms. A row that
          doesn&apos;t match the query removes itself, so empty groups and the{" "}
          <code className="font-mono text-sm">CommandEmpty</code> state collapse on their own.
        </p>
      </DocSection>

      <DocSection title="Inline">
        <p className="mt-4 text-pretty text-muted-foreground">
          Skip <code className="font-mono text-sm">CommandDialog</code> and use{" "}
          <code className="font-mono text-sm">Command</code> directly to embed the palette in a page
          or a Popover. It brings its own surface, so it reads as a finished card on any background.
          Disabled rows stay visible but drop out of the keyboard order.
        </p>
        <ComponentPreview code={INLINE_CODE} previewClassName="min-h-96 items-start">
          <CommandInlineDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="Keyboard">
        <p className="mt-4 text-pretty text-muted-foreground">
          The search field keeps focus while you navigate (the active row is announced through{" "}
          <code className="font-mono text-sm">aria-activedescendant</code>):{" "}
          <code className="font-mono text-sm">↑</code> / <code className="font-mono text-sm">↓</code>{" "}
          move the highlight (wrapping at the ends),{" "}
          <code className="font-mono text-sm">Home</code> / <code className="font-mono text-sm">End</code>{" "}
          jump to the first and last rows, <code className="font-mono text-sm">Enter</code> runs the
          active row, and (inside <code className="font-mono text-sm">CommandDialog</code>){" "}
          <code className="font-mono text-sm">Esc</code> closes. Wire a global{" "}
          <code className="font-mono text-sm">⌘K</code> / <code className="font-mono text-sm">Ctrl+K</code>{" "}
          listener to toggle the dialog.
        </p>
        <CodeSnippet filename="shortcut.tsx" className="mt-4" code={SHORTCUT_CODE} />
      </DocSection>

      <DocSection title="Density">
        <p className="mt-4 text-pretty text-muted-foreground">
          Like the rest of Koala, Command honors the cross-cutting{" "}
          <code className="font-mono text-sm">density</code> axis (or a{" "}
          <code className="font-mono text-sm">DensityProvider</code>):{" "}
          <code className="font-mono text-sm">compact</code> tightens the search height and row
          padding for an information-dense surface, never touching color or radius.
        </p>
        <ComponentPreview code={DENSITY_CODE} previewClassName="min-h-96 items-start">
          <CommandDensityDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">Command</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              The palette root and search/highlight state owner. Forwards every other{" "}
              <code className="font-mono text-sm">div</code> prop.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">search</code> /{" "}
                <code className="font-mono text-sm">defaultSearch</code> /{" "}
                <code className="font-mono text-sm">onSearchChange</code>: the query string
                (controlled or not).
              </li>
              <li>
                <code className="font-mono text-sm">filter</code>:{" "}
                <code className="font-mono text-sm">(search, value, keywords?) =&gt; number</code>;
                return <code className="font-mono text-sm">0</code> to hide a row, any positive number
                to keep it. Defaults to a case-insensitive substring match.
              </li>
              <li>
                <code className="font-mono text-sm">onSelect</code>: fires when any row is chosen
                (after that row&apos;s own <code className="font-mono text-sm">onSelect</code>).
              </li>
              <li>
                <code className="font-mono text-sm">label</code>: accessible name for the result list.
              </li>
              <li>
                <code className="font-mono text-sm">density</code>:{" "}
                <code className="font-mono text-sm">comfortable</code> (default) or{" "}
                <code className="font-mono text-sm">compact</code>.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">CommandDialog</h3>
            <p className="mt-1 text-pretty text-muted-foreground">
              Wraps <code className="font-mono text-sm">Command</code> in a Radix Dialog. Takes all{" "}
              <code className="font-mono text-sm">Command</code> props plus:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">open</code> /{" "}
                <code className="font-mono text-sm">defaultOpen</code> /{" "}
                <code className="font-mono text-sm">onOpenChange</code>: dialog open state.
              </li>
              <li>
                <code className="font-mono text-sm">closeOnSelect</code>: close after a row is chosen
                (default <code className="font-mono text-sm">true</code>).
              </li>
              <li>
                <code className="font-mono text-sm">title</code> /{" "}
                <code className="font-mono text-sm">description</code>: visually hidden labels for
                assistive tech.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-foreground">
              CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem,
              CommandSeparator, CommandShortcut
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <code className="font-mono text-sm">CommandInput</code>: the search field (combobox).
                Pass <code className="font-mono text-sm">hideIcon</code> to drop the leading glyph.
              </li>
              <li>
                <code className="font-mono text-sm">CommandList</code>: the scrolling{" "}
                <code className="font-mono text-sm">listbox</code> viewport.
              </li>
              <li>
                <code className="font-mono text-sm">CommandEmpty</code>: shown only when no row
                matches.
              </li>
              <li>
                <code className="font-mono text-sm">CommandGroup</code>: a labeled section (
                <code className="font-mono text-sm">heading</code>) that hides when all its rows
                filter out.
              </li>
              <li>
                <code className="font-mono text-sm">CommandItem</code>: a selectable row.{" "}
                <code className="font-mono text-sm">value</code> (required),{" "}
                <code className="font-mono text-sm">keywords</code>,{" "}
                <code className="font-mono text-sm">disabled</code>,{" "}
                <code className="font-mono text-sm">onSelect(value)</code>.
              </li>
              <li>
                <code className="font-mono text-sm">CommandShortcut</code>: trailing key hint; drop{" "}
                <code className="font-mono text-sm">Kbd</code> children inside.
              </li>
            </ul>
          </div>
        </div>
      </DocSection>

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I reach for Command versus DropdownMenu or Select?",
              a: "Use Command for an open-ended, searchable list of actions or destinations (the ⌘K pattern), where typing to filter is the primary interaction. DropdownMenu and Select are for short, fixed sets that you pick from without searching.",
            },
            {
              q: "Do I need to render CommandDialog, or can I drop Command straight into a page?",
              a: "Command is self-contained and brings its own surface, so you can render it inline in a page or inside a Popover. Wrap it in CommandDialog only when you want the modal behavior: Radix gives you the focus trap, scroll lock, Escape-to-close, and enter/exit animations.",
            },
            {
              q: "How does filtering decide which CommandItem rows show?",
              a: "Each CommandItem has a required `value` (its searchable identity) plus an optional `keywords` array of synonyms, and the default filter does a case-insensitive substring match against both. A non-matching row renders nothing, so empty CommandGroup sections and the CommandEmpty state collapse on their own.",
            },
            {
              q: "Can I customize the match logic, for example to add fuzzy scoring?",
              a: "Yes. Pass a `filter` prop of type `(search, value, keywords?) => number` to Command: return `0` to hide a row and any positive number to keep it. An empty query keeps everything by default.",
            },
            {
              q: "How do I run an action when a row is chosen, and close the dialog?",
              a: "Put `onSelect(value)` on each CommandItem for its own handler, or a single `onSelect` on Command (or CommandDialog) that fires for any chosen row. Inside CommandDialog, rows close the palette by default; set `closeOnSelect={false}` to keep it open.",
            },
            {
              q: "How does keyboard navigation and screen reader support work?",
              a: "Focus stays in CommandInput while arrow keys move the highlight (wrapping at the ends), Home and End jump to the first and last rows, and Enter runs the active row. The active row is communicated to assistive tech via `aria-activedescendant`, and disabled rows stay visible but drop out of the keyboard order.",
            },
          ]}
        />
      </DocSection>
    </>
  )
}

const HERO_CODE = `const [open, setOpen] = useState(false)

useEffect(() => {
  function onKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", onKeyDown)
  return () => document.removeEventListener("keydown", onKeyDown)
}, [])

<button type="button" onClick={() => setOpen(true)} aria-label="Search"
  className="group flex h-9 w-64 items-center gap-2 rounded-md border border-input bg-background pl-2.5 pr-2 text-sm text-muted-foreground shadow-xs transition-[border-color,box-shadow,scale] duration-fast ease-out hover:border-ring/50 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:border-transparent">
  <MagnifyingGlass className="size-4 shrink-0" />
  <span className="flex-1 text-left">Search components…</span>
  <span className="flex items-center gap-1">
    <Kbd size="sm" variant="ghost">⌘</Kbd>
    <Kbd size="sm" variant="ghost">K</Kbd>
  </span>
</button>

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem value="New file" keywords={["create"]} onSelect={run}>
        <FilePlus /> New file
        <CommandShortcut><Kbd size="sm">⌘</Kbd><Kbd size="sm">N</Kbd></CommandShortcut>
      </CommandItem>
      <CommandItem value="Invite member" onSelect={run}>
        <UserPlus /> Invite member
      </CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem value="Profile" onSelect={run}>
        <User /> Profile
      </CommandItem>
      <CommandItem value="Billing" onSelect={run}>
        <CreditCard /> Billing
      </CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>`

const USAGE_CODE = `import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"

export function Example() {
  return (
    <Command label="Quick actions">
      <CommandInput placeholder="Search actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Create">
          <CommandItem value="New project" onSelect={() => create()}>
            New project
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  )
}`

const INLINE_CODE = `<Command label="Quick actions">
  <CommandInput placeholder="Search actions…" />
  <CommandList>
    <CommandEmpty>Nothing matches that.</CommandEmpty>
    <CommandGroup heading="Create">
      <CommandItem value="New project"><Plus /> New project</CommandItem>
      <CommandItem value="Invite teammate"><UserPlus /> Invite teammate</CommandItem>
    </CommandGroup>
    <CommandGroup heading="Navigate">
      <CommandItem value="Dashboard"><ChartBar /> Dashboard</CommandItem>
      <CommandItem value="Account"><User /> Account</CommandItem>
      <CommandItem value="Support" disabled><Lifebuoy /> Support (offline)</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`

const SHORTCUT_CODE = `const [open, setOpen] = useState(false)

useEffect(() => {
  function onKeyDown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()
      setOpen((o) => !o)
    }
  }
  document.addEventListener("keydown", onKeyDown)
  return () => document.removeEventListener("keydown", onKeyDown)
}, [])`

const DENSITY_CODE = `<Command label="Theme" density="compact">
  <CommandInput placeholder="Search themes…" />
  <CommandList>
    <CommandGroup heading="Appearance">
      <CommandItem value="Light"><Sun /> Light</CommandItem>
      <CommandItem value="Dark"><Moon /> Dark</CommandItem>
      <CommandItem value="System"><Gear /> System</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`
