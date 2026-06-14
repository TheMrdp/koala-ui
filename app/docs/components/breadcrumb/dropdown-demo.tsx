"use client"

import {
  CaretDown,
  DotsThree,
  FileText,
  Folder,
  House,
} from "@phosphor-icons/react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const COLLAPSED = [
  { label: "Documentation", href: "#" },
  { label: "Components", href: "#" },
  { label: "Foundations", href: "#" },
]

const SIBLINGS = [
  { label: "Avatar", href: "#" },
  { label: "Badge", href: "#" },
  { label: "Button", href: "#" },
  { label: "Card", href: "#" },
]

// Shared ellipsis trigger: glyph-width visual, 40px tap target via a centered pseudo-element
// (polish), with hover + open-state color feedback.
const ellipsisTriggerClass = cn(
  "relative flex items-center justify-center rounded-sm text-muted-foreground",
  "transition-colors duration-fast ease-out hover:text-foreground data-[state=open]:text-foreground",
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "before:absolute before:inset-1/2 before:size-10 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
)

/** Collapsed ancestors: the ellipsis opens the DS DropdownMenu of hidden segments. */
export function BreadcrumbDropdownDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Show more pages" className={ellipsisTriggerClass}>
              <DotsThree aria-hidden weight="bold" className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {COLLAPSED.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <a href={item.href}>{item.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/**
 * Sibling navigation: the current crumb is itself the trigger - its label plus a caret that
 * rotates on open, dropping a menu of sibling pages to jump between.
 */
export function BreadcrumbSiblingDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                "group flex items-center gap-1 rounded-sm font-medium text-foreground outline-none",
                "transition-colors duration-fast ease-out",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              Breadcrumb
              <CaretDown
                aria-hidden
                className="size-3.5 text-muted-foreground transition-transform duration-fast ease-out group-data-[state=open]:rotate-180"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {SIBLINGS.map((item) => (
                <DropdownMenuItem key={item.label} asChild>
                  <a href={item.href}>{item.label}</a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

/**
 * Grouped menu: the collapsed dropdown carries a label and a separator, and its items lead
 * with icons - composing the DropdownMenu's Label/Separator parts inside a breadcrumb.
 */
export function BreadcrumbGroupedDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger aria-label="Show more pages" className={ellipsisTriggerClass}>
              <DotsThree aria-hidden weight="bold" className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Jump to</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <a href="#">
                  <House /> Home
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="#">
                  <Folder /> Documentation
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href="#">
                  <FileText /> Components
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
