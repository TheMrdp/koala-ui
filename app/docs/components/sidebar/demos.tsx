"use client"

import {
  SquaresFour,
  Tray,
  Stack,
  CalendarBlank,
  MagnifyingGlass,
  UsersThree,
  GearSix,
  Buildings,
  Rocket,
  Check,
  Plus,
  CreditCard,
  UserCircle,
  SignOut,
  Sparkle,
} from "@phosphor-icons/react"

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
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
import { AvatarRoot, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Kbd } from "@/components/ui/kbd"
import type { Density } from "@/lib/density"

type SwitcherVariant = "default" | "minimal"

// ── Workspace switcher (top) — SidebarSwitcher composed with the DS DropdownMenu ──────
function WorkspaceSwitcher({ variant }: { variant?: SwitcherVariant }) {
  const minimal = variant === "minimal"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarSwitcher
          variant={variant}
          leading={
            <span
              className={`grid shrink-0 place-items-center rounded-md bg-primary text-primary-foreground ${
                minimal ? "size-7" : "size-9"
              }`}
            >
              <Buildings className={minimal ? "size-4" : "size-5"} />
            </span>
          }
          title="Acme Inc"
          subtitle={minimal ? undefined : "Enterprise plan"}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
        <DropdownMenuItem>
          <Buildings />
          Acme Inc
          <Check className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Rocket />
          Skunkworks
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus />
          Create workspace
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// ── Profile switcher (bottom) — same trigger, menu opens upward ───────────────────────
function ProfileSwitcher({ variant }: { variant?: SwitcherVariant }) {
  const minimal = variant === "minimal"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarSwitcher
          variant={variant}
          leading={
            <AvatarRoot size={minimal ? "xs" : "sm"} className="shrink-0">
              <AvatarFallback>MO</AvatarFallback>
            </AvatarRoot>
          }
          title="Mara Okonkwo"
          subtitle={minimal ? undefined : "mara@acme.io"}
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
        <DropdownMenuItem>
          <Sparkle />
          Upgrade plan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** A colored page dot for the Favorites section, aligned to the icon column. */
function FavDot({ className }: { className: string }) {
  return (
    <span className="flex size-[1.125rem] shrink-0 items-center justify-center">
      <span className={`size-2 rounded-full ${className}`} />
    </span>
  )
}

// ── The full rail, parameterized by density for the demos ─────────────────────────────
function AppSidebar({ density }: { density?: Density }) {
  return (
    <Sidebar density={density} aria-label="Main" className="h-[600px]">
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>

      <SidebarContent>
        {/* Primary pages — first, unlabeled, the spine of the app. */}
        <SidebarGroup aria-label="Primary">
          <SidebarItem>
            <MagnifyingGlass />
            Search
            <Kbd size="sm" className="ml-auto">
              ⌘K
            </Kbd>
          </SidebarItem>
          <SidebarItem active>
            <SquaresFour />
            Dashboard
          </SidebarItem>
          <SidebarItem>
            <Tray />
            Inbox
            <Badge variant="secondary" size="sm" className="ml-auto tabular-nums">
              8
            </Badge>
          </SidebarItem>
          <SidebarItem>
            <Stack />
            Projects
          </SidebarItem>
          <SidebarItem>
            <CalendarBlank />
            Calendar
          </SidebarItem>
        </SidebarGroup>

        {/* Favorites — starred pages, marked with their page color. */}
        <SidebarGroup aria-label="Favorites">
          <SidebarGroupLabel>Favorites</SidebarGroupLabel>
          <SidebarItem>
            <FavDot className="bg-purple" />
            Q3 Roadmap
          </SidebarItem>
          <SidebarItem>
            <FavDot className="bg-teal" />
            Design System
          </SidebarItem>
          <SidebarItem>
            <FavDot className="bg-orange" />
            Hiring Plan
          </SidebarItem>
        </SidebarGroup>

        {/* A clearly-labeled workspace section. */}
        <SidebarGroup aria-label="Workspace">
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarItem>
            <UsersThree />
            Members
          </SidebarItem>
          <SidebarItem>
            <GearSix />
            Settings
          </SidebarItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <ProfileSwitcher />
      </SidebarFooter>
    </Sidebar>
  )
}

export function SidebarDemo() {
  return (
    <div className="flex w-full justify-center">
      <AppSidebar />
    </div>
  )
}

export function SidebarDensityDemo() {
  return (
    <div className="flex w-full justify-center">
      <AppSidebar density="comfortable" />
    </div>
  )
}

// ── Focused: switchers on their own ───────────────────────────────────────────────────
export function SidebarSwitcherDemo() {
  return (
    <Sidebar aria-label="Switchers" className="h-auto w-64 border-r-0">
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarFooter className="border-b-0 border-t-0">
        <ProfileSwitcher />
      </SidebarFooter>
    </Sidebar>
  )
}

// ── Focused: default vs minimal switcher, side by side ────────────────────────────────
export function SidebarSwitcherVariantDemo() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-6">
      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">default</span>
        <Sidebar aria-label="Default switchers" className="h-auto w-60 rounded-xl border">
          <SidebarHeader>
            <WorkspaceSwitcher />
          </SidebarHeader>
          <SidebarFooter>
            <ProfileSwitcher />
          </SidebarFooter>
        </Sidebar>
      </div>

      <div className="flex flex-col gap-2">
        <span className="px-1 text-xs font-medium text-muted-foreground">minimal</span>
        <Sidebar aria-label="Minimal switchers" className="h-auto w-60 rounded-xl border">
          <SidebarHeader>
            <WorkspaceSwitcher variant="minimal" />
          </SidebarHeader>
          <SidebarFooter>
            <ProfileSwitcher variant="minimal" />
          </SidebarFooter>
        </Sidebar>
      </div>
    </div>
  )
}

// ── Focused: item states ──────────────────────────────────────────────────────────────
export function SidebarItemDemo() {
  return (
    <Sidebar aria-label="Items" className="h-auto w-64 border-r-0">
      <SidebarContent>
        <SidebarGroup aria-label="States">
          <SidebarItem active>
            <SquaresFour />
            Active page
          </SidebarItem>
          <SidebarItem>
            <Stack />
            Default page
          </SidebarItem>
          <SidebarItem>
            <Tray />
            With a count
            <Badge variant="secondary" size="sm" className="ml-auto tabular-nums">
              12
            </Badge>
          </SidebarItem>
          <SidebarItem disabled>
            <GearSix />
            Disabled page
          </SidebarItem>
          <SidebarItem asChild>
            <a href="#">
              <CalendarBlank />
              A real link (asChild)
            </a>
          </SidebarItem>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
