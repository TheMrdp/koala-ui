"use client"

import {
  Cloud,
  SquaresFour,
  FolderSimple,
  Users,
  GearSix,
  EnvelopeSimple,
  Sun,
  Moon,
  Coffee,
  MoonStars,
  Plus,
  Check,
  UserCircle,
  CreditCard,
  SignOut,
} from "@phosphor-icons/react"

import {
  Layout,
  LayoutSidebar,
  LayoutContent,
  LayoutContainer,
  LayoutHeader,
  type LayoutContainerProps,
} from "@/components/ui/layout"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarSwitcher,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel, FieldHint } from "@/components/ui/field"
import { InputRoot, InputField, InputPrefix } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AvatarRoot, AvatarFallback } from "@/components/ui/avatar"
import type { Density } from "@/lib/density"
import { cn } from "@/lib/utils"

// ── The rail — the DS Sidebar, made transparent so it sits in the Layout gutter ───────
function AppSidebar({ density }: { density?: Density }) {
  return (
    // lg:flex on LayoutSidebar shows the rail only at wider sizes — forced on here, and
    // stripped of its gutter padding so the Sidebar fills it edge-to-edge.
    <LayoutSidebar className="flex p-0">
      <Sidebar
        density={density}
        aria-label="Main"
        className="w-full border-r-0 bg-transparent"
      >
        <SidebarHeader>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarSwitcher
                leading={
                  <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
                    <Cloud className="size-5" />
                  </span>
                }
                title="Nimbus"
                subtitle="Workspace"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuItem>
                <Cloud />
                Nimbus
                <Check className="ml-auto" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Plus />
                Create workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup aria-label="Primary">
            <SidebarItem>
              <SquaresFour />
              Overview
            </SidebarItem>
            <SidebarItem>
              <FolderSimple />
              Projects
            </SidebarItem>
            <SidebarItem>
              <Users />
              Team
            </SidebarItem>
            <SidebarItem active>
              <GearSix />
              Settings
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarSwitcher
                leading={
                  <AvatarRoot size="sm" className="shrink-0">
                    <AvatarFallback>MO</AvatarFallback>
                  </AvatarRoot>
                }
                title="Mara Okonkwo"
                subtitle="mara@nimbus.io"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-56">
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserCircle />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </LayoutSidebar>
  )
}

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "cream", label: "Cream", icon: Coffee },
  { value: "moonlight", label: "Moonlight", icon: MoonStars },
]

const notifications = [
  {
    id: "digest",
    label: "Weekly digest",
    hint: "A Monday summary of what changed across your projects.",
    defaultChecked: true,
  },
  {
    id: "mentions",
    label: "Mentions & comments",
    hint: "Get notified the moment a teammate mentions you.",
    defaultChecked: true,
  },
  {
    id: "marketing",
    label: "Product updates",
    hint: "Occasional news about new features. No spam.",
    defaultChecked: false,
  },
]

/** A settings row: heading + description on the left, controls on the right. The classic
 *  two-column settings layout, separated by hairline dividers — no nested cards (the panel
 *  is already `bg-card`, so same-color cards would read flat). */
function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-x-8 gap-y-5 border-t border-border py-8 md:grid-cols-3">
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="mt-1 text-sm text-pretty text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-col gap-5 md:col-span-2">{children}</div>
    </div>
  )
}

// ── The shared sidebar-indent shell, parameterized by the two documented axes ──────
function Shell({
  width,
  density,
}: {
  width?: LayoutContainerProps["width"]
  density?: Density
}) {
  return (
    <Layout density={density} className="h-[560px] overflow-hidden">
      <AppSidebar density={density} />

      <LayoutContent>
        <LayoutContainer width={width}>
          <LayoutHeader>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>General</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </LayoutHeader>

          <div>
            <h1 className="text-2xl font-semibold tracking-tight">General settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your account details and how Nimbus looks for you.
            </p>
          </div>

          <div className="mt-2">
            <Section
              title="Profile"
              description="This information is shown to your teammates."
            >
              <Field>
                <FieldLabel>Full name</FieldLabel>
                <InputRoot>
                  <InputField defaultValue="Mara Okonkwo" />
                </InputRoot>
              </Field>
              <Field>
                <FieldLabel>Email address</FieldLabel>
                <InputRoot>
                  <InputPrefix>
                    <EnvelopeSimple />
                  </InputPrefix>
                  <InputField type="email" defaultValue="mara@nimbus.io" />
                </InputRoot>
                <FieldHint>Used for sign-in and notifications.</FieldHint>
              </Field>
            </Section>

            <Section
              title="Appearance"
              description="Pick a theme and a name for this workspace."
            >
              <Field>
                <FieldLabel>Workspace name</FieldLabel>
                <InputRoot>
                  <InputField defaultValue="Nimbus HQ" />
                </InputRoot>
              </Field>
              <Field>
                <FieldLabel>Theme</FieldLabel>
                <Select defaultValue="dark">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        <span className="flex items-center gap-2">
                          <t.icon /> {t.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </Section>

            <Section
              title="Notifications"
              description="Choose what Nimbus emails you about."
            >
              {notifications.map((n) => (
                <label key={n.id} className="flex items-start gap-3">
                  <Checkbox defaultChecked={n.defaultChecked} className="mt-0.5" />
                  <span>
                    <span className="block text-sm font-medium">{n.label}</span>
                    <span className="block text-sm text-muted-foreground">{n.hint}</span>
                  </span>
                </label>
              ))}
            </Section>

            <div className="flex items-center justify-end gap-2 border-t border-border pt-6">
              <Button variant="ghost">Cancel</Button>
              <Button>Save changes</Button>
            </div>
          </div>
        </LayoutContainer>
      </LayoutContent>
    </Layout>
  )
}

// ── Anatomy blueprint — a labeled schematic that maps each slot to its region ──────
// Not a live render of the component: dashed "shells" with mono labels, mirroring the
// real nesting (Layout → Sidebar + Content → Container → Header) and proportions so the
// structure reads at a glance, the way Tailwind sketches its application shells.

/** One labeled shell: a dashed box with a small mono tag pinned to its top-left corner.
 *  `tone="panel"` paints the card surface to echo the real LayoutContent indent. */
function Region({
  label,
  className,
  tone = "muted",
  children,
}: {
  label: string
  className?: string
  tone?: "muted" | "panel"
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative rounded-lg border border-dashed border-border",
        tone === "panel" && "bg-card shadow-sm",
        className,
      )}
    >
      <span className="absolute left-2 top-2 z-10 rounded-sm bg-background/70 px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground ring-1 ring-border backdrop-blur-sm">
        {label}
      </span>
      {children}
    </div>
  )
}

export function LayoutAnatomyDemo() {
  return (
    <div className="w-full p-6">
      {/* Layout — the flex row on the bg-background canvas (the gutter). The padding is
          drawn wider than the real m-2 (8px) so the gutter is legible enough to label. */}
      <Region
        label="Layout"
        className="relative flex h-[460px] gap-2.5 bg-background p-5 pt-10"
      >
        {/* Gutter cota — the bg-background inset that frames the panel on every side. */}
        <span className="pointer-events-none absolute inset-y-5 right-1 flex items-center font-mono text-[10px] tracking-wide text-muted-foreground [writing-mode:vertical-rl]">
          gutter · m-2
        </span>

        {/* LayoutSidebar — the w-64 rail living in the gutter, with faux nav rows. */}
        <Region
          label="LayoutSidebar"
          className="hidden w-52 shrink-0 flex-col gap-2.5 p-3 pt-9 sm:flex"
        >
          <div className="h-7 rounded-md bg-muted/70" />
          <div className="mt-1 flex flex-col gap-1.5">
            <div className="h-4 w-3/4 rounded bg-muted" />
            <div className="h-4 w-2/3 rounded bg-muted" />
            <div className="h-4 w-3/5 rounded bg-muted" />
          </div>
          <div className="mt-auto h-7 rounded-md bg-muted/70" />
        </Region>

        {/* Flush seam — the left inset drops at lg (lg:ml-0), so the panel meets the rail. */}
        <div className="relative hidden items-center sm:flex" aria-hidden>
          <div className="h-full w-px bg-border" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm bg-background px-1 py-1 font-mono text-[10px] text-muted-foreground ring-1 ring-border [writing-mode:vertical-rl]">
            lg:ml-0
          </span>
        </div>

        {/* LayoutContent — the inset, rounded, elevated card panel ("the indent"). */}
        <Region
          label="LayoutContent"
          tone="panel"
          className="flex flex-1 rounded-2xl p-3 pt-9"
        >
          {/* LayoutContainer — the centered max-width column. */}
          <Region
            label="LayoutContainer"
            className="mx-auto flex w-full max-w-md flex-col gap-3 p-3 pt-9"
          >
            {/* LayoutHeader — the breadcrumbs band at the top of the column. */}
            <Region label="LayoutHeader" className="flex h-12 items-center px-3 pt-9">
              <div className="flex items-center gap-2 self-end pb-2.5">
                <div className="h-3 w-14 rounded bg-muted" />
                <div className="size-1 rounded-full bg-muted" />
                <div className="h-3 w-12 rounded bg-muted" />
              </div>
            </Region>

            {/* Your content — the striped placeholder, à la Tailwind's shell sketches. */}
            <div
              className="flex flex-1 items-center justify-center rounded-md border border-dashed border-border"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(-45deg, var(--border) 0, var(--border) 1px, transparent 1px, transparent 11px)",
              }}
            >
              <span className="rounded-sm bg-background/70 px-2 py-1 font-mono text-xs text-muted-foreground ring-1 ring-border backdrop-blur-sm">
                your page content
              </span>
            </div>
          </Region>
        </Region>
      </Region>
    </div>
  )
}

// ── Container-width blueprint — small multiples ────────────────────────────────────
// One diagram per width so the *relationship* reads at a glance (the live demo can only
// show one width at a time). Same bg-card panel in each; the dashed column is drawn as a
// fraction of it — wider = more of the panel, with the gutter shrinking to nothing at
// `full`. Fractions are schematic; the real max-w-* values are labeled below each.

const widthBlueprints = [
  { width: "narrow", token: "max-w-3xl", px: "768px", fraction: "52%" },
  { width: "default", token: "max-w-6xl", px: "1152px", fraction: "74%" },
  { width: "wide", token: "max-w-7xl", px: "1280px", fraction: "88%" },
  { width: "full", token: "max-w-none", px: "100%", fraction: "100%" },
] as const

export function LayoutWidthBlueprintDemo() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 p-6 lg:grid-cols-4">
      {widthBlueprints.map((b) => (
        <figure key={b.width} className="flex flex-col gap-2.5">
          {/* The panel (bg-card), echoing LayoutContent. */}
          <div className="h-36 rounded-xl bg-card p-2 shadow-sm ring-1 ring-border">
            {/* The centered column at this width — dashed, with faux content rows. */}
            <div
              className="mx-auto flex h-full flex-col gap-1.5 rounded-md border border-dashed border-border p-2"
              style={{ width: b.fraction }}
            >
              <div className="h-2 w-1/2 rounded-full bg-muted" />
              <div className="mt-0.5 flex-1 rounded bg-muted/60" />
              <div className="h-2 w-2/3 rounded-full bg-muted" />
            </div>
          </div>
          <figcaption className="flex flex-col gap-0.5">
            <span className="font-mono text-xs font-medium text-foreground">
              width=&quot;{b.width}&quot;
            </span>
            <span className="font-mono text-[11px] text-muted-foreground">
              {b.token} · {b.px}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export function LayoutShellDemo() {
  return <Shell />
}

export function LayoutWidthDemo() {
  return <Shell width="narrow" />
}

export function LayoutDensityDemo() {
  return <Shell density="comfortable" />
}
