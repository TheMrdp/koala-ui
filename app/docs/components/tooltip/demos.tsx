"use client"

// Live tooltip demos live here, in a Client Component, so the trigger icons come from the
// interactive `@phosphor-icons/react` build. The docs page is a Server Component (it exports
// `metadata`); importing the regular icon build there throws (`createContext` in RSC), while
// the `/ssr` build resolves to `undefined` once Tippy re-renders the cloned trigger on the
// client. Keeping every interactive preview in this file sidesteps both. See [[tooltip-docs-page-rsc-crash]].

import {
  Info,
  Copy,
  FloppyDisk,
  Trash,
  PencilSimple,
  Question,
  Lock,
  FilePlus,
  MagnifyingGlass,
  GearSix,
} from "@phosphor-icons/react"

import { Tooltip, TooltipGroup } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { InputRoot, InputField, InputSuffixButton } from "@/components/ui/input"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Specimen } from "@/components/docs/foundation"

const PLACEMENTS = ["top", "right", "bottom", "left"] as const

export function HeroDemo() {
  return (
    <Button iconOnly aria-label="Save changes">
      <FloppyDisk />
    </Button>
  )
}

export function PlacementDemo() {
  return (
    <>
      {PLACEMENTS.map((placement) => (
        <Specimen key={placement} label={placement}>
          <Tooltip content="Tooltip" placement={placement}>
            <Button variant="outline" iconOnly tooltip={false} aria-label={placement}>
              <Info />
            </Button>
          </Tooltip>
        </Specimen>
      ))}
    </>
  )
}

export function IconContentDemo() {
  return (
    <Tooltip
      content={
        <>
          <Copy className="size-3.5" /> Copy to clipboard
        </>
      }
    >
      <Button variant="ghost" iconOnly tooltip={false} aria-label="Copy">
        <Copy />
      </Button>
    </Tooltip>
  )
}

export function InteractiveDemo() {
  return (
    <Tooltip
      interactive
      delay={[150, 80]}
      content={
        <>
          Read the{" "}
          <a href="/docs" className="underline underline-offset-2">
            docs
          </a>
        </>
      }
    >
      <Button variant="outline" iconOnly tooltip={false} aria-label="More info">
        <Info />
      </Button>
    </Tooltip>
  )
}

export function GroupDemo() {
  return (
    <TooltipGroup>
      <Tooltip content="Edit" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Edit">
          <PencilSimple />
        </Button>
      </Tooltip>
      <Tooltip content="Copy" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Copy">
          <Copy />
        </Button>
      </Tooltip>
      <Tooltip content="Save" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Save">
          <FloppyDisk />
        </Button>
      </Tooltip>
      <Tooltip content="Delete" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Delete">
          <Trash />
        </Button>
      </Tooltip>
    </TooltipGroup>
  )
}

export function FormInputDemo() {
  return (
    <div className="w-72 space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium">API key</label>
        <InputRoot>
          <InputField placeholder="sk-…" />
          <Tooltip content="Your secret key - never share this publicly">
            <InputSuffixButton aria-label="API key help">
              <Question />
            </InputSuffixButton>
          </Tooltip>
        </InputRoot>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Webhook URL</label>
        <InputRoot>
          <InputField placeholder="https://…" />
          <Tooltip content="Must be HTTPS and return 200 within 5 s" placement="right">
            <InputSuffixButton aria-label="Webhook URL requirements">
              <Info />
            </InputSuffixButton>
          </Tooltip>
        </InputRoot>
      </div>
    </div>
  )
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Create webhook</DialogTitle>
          <DialogDescription>
            Koala will POST a JSON payload to this URL on each event.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium">Endpoint URL</label>
              <Tooltip content="Must be HTTPS and publicly reachable" trigger="mouseenter">
                <button
                  type="button"
                  aria-label="Endpoint URL help"
                  className="rounded text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                >
                  <Info className="size-3.5" />
                </button>
              </Tooltip>
            </div>
            <InputRoot>
              <InputField placeholder="https://…" />
            </InputRoot>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-sm font-medium">Secret</label>
              <Tooltip
                content="Signs the X-Koala-Signature header"
                placement="right"
                trigger="mouseenter"
              >
                <button
                  type="button"
                  aria-label="Secret help"
                  className="rounded text-muted-foreground transition-colors duration-fast ease-out hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                >
                  <Lock className="size-3.5" />
                </button>
              </Tooltip>
            </div>
            <InputRoot>
              <InputField placeholder="whsec_…" />
            </InputRoot>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Create webhook</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function KeyboardShortcutDemo() {
  return (
    <TooltipGroup>
      <Tooltip
        placement="bottom"
        content={
          <>
            New file <Kbd size="sm" className="ml-1">⌘N</Kbd>
          </>
        }
      >
        <Button variant="ghost" iconOnly tooltip={false} aria-label="New file">
          <FilePlus />
        </Button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        content={
          <>
            Search <Kbd size="sm" className="ml-1">⌘K</Kbd>
          </>
        }
      >
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Search">
          <MagnifyingGlass />
        </Button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        content={
          <>
            Settings <Kbd size="sm" className="ml-1">⌘,</Kbd>
          </>
        }
      >
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Settings">
          <GearSix />
        </Button>
      </Tooltip>
    </TooltipGroup>
  )
}

export function ShiftAwayDemo() {
  return (
    <Tooltip content="Shift-away on exit" placement="top">
      <Button variant="outline" iconOnly tooltip={false} aria-label="Info">
        <Info />
      </Button>
    </Tooltip>
  )
}

export function GlideDemo() {
  return (
    <TooltipGroup>
      <Tooltip content="Edit" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Edit">
          <PencilSimple />
        </Button>
      </Tooltip>
      <Tooltip content="Copy" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Copy">
          <Copy />
        </Button>
      </Tooltip>
      <Tooltip content="Save" placement="top">
        <Button variant="ghost" iconOnly tooltip={false} aria-label="Save">
          <FloppyDisk />
        </Button>
      </Tooltip>
    </TooltipGroup>
  )
}
