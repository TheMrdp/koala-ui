import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import {
  AccountMenuDemo,
  EditMenuDemo,
  CheckboxMenuDemo,
  ThemeMenuDemo,
} from "./demos"

export const metadata = {
  title: "Dropdown Menu",
}

export default function DropdownMenuDocsPage() {
  return (
    <>
      <DocHeader
        title="Dropdown Menu"
        description="A contextual menu that opens on trigger. Built on Radix DropdownMenu for keyboard navigation, focus management, and a11y; animated with interruptible enter/exit transitions."
      />

      {/* ── Hero: account menu ──────────────────────────────────────── */}
      <ComponentPreview
        code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">My account</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-56">
    <DropdownMenuLabel className="flex flex-col gap-0.5">
      <span>Alex Johnson</span>
      <span className="font-normal text-xs text-muted-foreground">
        alex@example.com
      </span>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <UserCircle /> Profile
        <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <BellSimple /> Notifications
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard /> Billing
        <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Gear /> Settings
        <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <Users /> Team
      </DropdownMenuItem>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Plus /> Invite members
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="w-48">
          <DropdownMenuItem>
            <Envelope /> Email
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link /> Copy invite link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <ChatCircle /> Send message
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive focus:text-destructive">
      <SignOut /> Log out
      <DropdownMenuShortcut>⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
      >
        <AccountMenuDemo />
      </ComponentPreview>

      <DocSection title="Installation">
        <Installation component="dropdown-menu" />
      </DocSection>

      <DocSection title="Usage">
        <CodeSnippet
          filename="usage.tsx"
          className="mt-4"
          code={`import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Gear, SignOut, UserCircle } from "@phosphor-icons/react"

export function Example() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">My account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserCircle /> Profile
          <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Gear /> Settings
          <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <SignOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
        />
      </DocSection>

      {/* ── Editor / keyboard shortcuts ──────────────────────────────── */}
      <DocSection title="Keyboard shortcuts">
        <p className="mt-4 text-pretty text-muted-foreground">
          <code className="font-mono text-sm">DropdownMenuShortcut</code> renders right-aligned
          monospaced text - purely decorative; wire up the actual key binding in your app with a
          global listener.
        </p>
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Edit</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-52">
    <DropdownMenuLabel>Edit</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <FilePlus /> New file
      <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <PencilSimple /> Rename
      <DropdownMenuShortcut>F2</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <ShareNetwork /> Share
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-44">
        <DropdownMenuItem>
          <Envelope /> Email link
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link /> Copy link
          <DropdownMenuShortcut>⌘L</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ChatCircle /> Messages
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-destructive focus:text-destructive">
      <Trash /> Delete
      <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <EditMenuDemo />
        </ComponentPreview>
      </DocSection>

      {/* ── Checkbox items ───────────────────────────────────────────── */}
      <DocSection title="Checkbox items">
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">View</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-52">
    <DropdownMenuLabel>Appearance</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>Status bar</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Activity bar</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem checked>Panel</DropdownMenuCheckboxItem>
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Layout</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuCheckboxItem checked>Word wrap</DropdownMenuCheckboxItem>
    <DropdownMenuCheckboxItem>Minimap</DropdownMenuCheckboxItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <CheckboxMenuDemo />
        </ComponentPreview>
      </DocSection>

      {/* ── Radio items with icons ───────────────────────────────────── */}
      <DocSection title="Radio items">
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Theme</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-44">
    <DropdownMenuLabel>Theme</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuRadioGroup value="system">
      <DropdownMenuRadioItem value="light">
        <Sun /> Light
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="dark">
        <Moon /> Dark
      </DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="system">
        <Monitor /> System
      </DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <ThemeMenuDemo />
        </ComponentPreview>
      </DocSection>

      <DocSection title="API reference">
        <p className="mt-4 text-pretty text-muted-foreground">
          All parts accept a <code className="font-mono text-sm">density</code> prop (
          <code className="font-mono text-sm">comfortable · compact</code>) that tightens padding
          and item height for application UI. Drive density from a parent{" "}
          <code className="font-mono text-sm">DensityProvider</code> to keep the whole menu in
          sync without prop-drilling. Everything else passes through to the underlying{" "}
          <a
            href="https://www.radix-ui.com/primitives/docs/components/dropdown-menu"
            className="underline underline-offset-4"
          >
            Radix DropdownMenu
          </a>{" "}
          primitives -{" "}
          <code className="font-mono text-sm">DropdownMenu</code>,{" "}
          <code className="font-mono text-sm">DropdownMenuTrigger</code>,{" "}
          <code className="font-mono text-sm">DropdownMenuGroup</code>, and{" "}
          <code className="font-mono text-sm">DropdownMenuRadioGroup</code> are direct re-exports.
        </p>
      </DocSection>
    </>
  )
}
