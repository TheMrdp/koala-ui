import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeSnippet } from "@/components/docs/code-snippet"
import { Installation } from "@/components/docs/installation"
import { DocHeader, DocSection } from "@/components/docs/doc-page"
import { Faq } from "@/components/docs/faq"
import {
  AccountMenuDemo,
  UserMenuDemo,
  MoreActionsMenuDemo,
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
    <DropdownMenuItem variant="destructive">
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
        <DropdownMenuItem variant="destructive">
          <SignOut /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}`}
        />
      </DocSection>

      {/* ── Avatar trigger (user menu) ───────────────────────────────── */}
      <DocSection title="Avatar trigger">
        <p className="mt-4 text-pretty text-muted-foreground">
          Any element can be the trigger via <code className="font-mono text-sm">asChild</code>. A
          common pattern is a header avatar that opens an account menu, with the signed-in
          identity repeated as a non-interactive label at the top.
        </p>
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button
      aria-label="Open user menu"
      className="cursor-pointer rounded-full outline-none ring-ring ring-offset-2 ring-offset-background transition-transform duration-fast ease-out focus-visible:ring-2 active:scale-[0.96]"
    >
      <Avatar size="md">
        <AvatarImage src="/avatar.jpg" alt="Esteban Alonso" />
        <AvatarFallback>EA</AvatarFallback>
        <AvatarStatus variant="online" />
      </Avatar>
    </button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-60">
    <DropdownMenuLabel className="flex items-center gap-3 py-2 font-normal">
      <Avatar size="sm">
        <AvatarImage src="/avatar.jpg" alt="Esteban Alonso" />
        <AvatarFallback>EA</AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium leading-none text-foreground">
          Esteban Alonso
        </p>
        <p className="mt-1 truncate text-xs text-muted-foreground">esteban@koala.ui</p>
      </div>
    </DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>
        <UserCircle /> Profile
      </DropdownMenuItem>
      <DropdownMenuItem>
        <CreditCard /> Billing
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Gear /> Settings
      </DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <SignOut /> Log out
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <UserMenuDemo />
        </ComponentPreview>
      </DocSection>

      {/* ── Icon button trigger (more actions) ───────────────────────── */}
      <DocSection title="Icon button trigger">
        <p className="mt-4 text-pretty text-muted-foreground">
          A ghost <code className="font-mono text-sm">iconOnly</code> button makes a compact
          “more actions” menu for table rows and card headers. Align the content to the trigger
          edge with <code className="font-mono text-sm">align=&quot;end&quot;</code>.
        </p>
        <ComponentPreview
          code={`<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" iconOnly aria-label="More actions">
      <DotsThree />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-44">
    <DropdownMenuItem>
      <PencilSimple /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem>
      <Copy /> Duplicate
    </DropdownMenuItem>
    <DropdownMenuItem>
      <ShareNetwork /> Share
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <Trash /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`}
        >
          <MoreActionsMenuDemo />
        </ComponentPreview>
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
    <DropdownMenuItem variant="destructive">
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

      <DocSection title="FAQ">
        <Faq
          items={[
            {
              q: "When should I use a Dropdown Menu versus a Select?",
              a: "Use DropdownMenu for a list of actions or commands fired from a trigger, like a row's more-actions menu or an account menu. Reach for Select when the user is choosing a value to submit in a form; the menu's items run callbacks rather than holding a form value.",
            },
            {
              q: "How do I make an arbitrary element the trigger?",
              a: "Pass `asChild` to DropdownMenuTrigger and render your own element inside it, such as an Avatar button or a ghost iconOnly Button. Radix merges the trigger behavior and ARIA onto your element instead of rendering its own button.",
            },
            {
              q: "What is the difference between DropdownMenuCheckboxItem and DropdownMenuRadioItem?",
              a: "DropdownMenuCheckboxItem is an independent toggle driven by its own `checked` state, while DropdownMenuRadioItem is one mutually exclusive choice inside a DropdownMenuRadioGroup with a shared `value`. Both render the same Check indicator, since the exclusive-versus-toggle semantics live in the ARIA role and grouping, not the glyph.",
            },
            {
              q: "Does DropdownMenuShortcut actually bind the keyboard shortcut?",
              a: "No. DropdownMenuShortcut is purely decorative right-aligned text rendered through the shared Kbd primitive, so it just displays the hint like ⌘P. Wire up the real key binding in your app with a global listener.",
            },
            {
              q: "How do I keep items aligned when some have leading icons and others do not?",
              a: "Pass the `inset` prop to DropdownMenuItem (or DropdownMenuLabel and DropdownMenuSubTrigger) to add left padding that lines text up with icon-bearing siblings. This keeps a mixed list visually aligned without adding a placeholder icon.",
            },
            {
              q: "How do I style a destructive action like Delete or Log out?",
              a: "Pass `variant=\"destructive\"` to DropdownMenuItem. It colors the label red and, unlike the default muted leading icon, colors that icon red too so the whole row reads as one destructive unit; the hover background tints red to match. The check indicator on checkbox and radio items is never affected.",
            },
            {
              q: "How do I tighten the menu for dense application UI?",
              a: "Set `density=\"compact\"` on DropdownMenuContent, or drive it globally with DensityProvider since every part reads the density context. Compact reduces item padding and keeps the inner radius concentric with the content's rounded border.",
            },
          ]}
        />
      </DocSection>

    </>
  )
}
