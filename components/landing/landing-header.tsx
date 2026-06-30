"use client"

import * as React from "react"
import Link from "next/link"
import { CaretDown, FigmaLogo, DeviceMobile, Desktop } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Navbar,
  NavbarInner,
  NavbarBrand,
  NavbarNav,
  NavbarLink,
  NavbarActions,
  NavbarSpacer,
  NavbarMobileToggle,
  NavbarMobileMenu,
  NavbarMobileLink,
} from "@/components/ui/navbar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { BrandMark } from "@/components/landing/brand-mark"
import { AnnouncementBar } from "@/components/landing/announcement-bar"
import { NAV } from "@/components/landing/data"

/**
 * Sticky marketing header. Structure mirrors the original site: an announcement bar, the
 * brand, the Product / Solutions / Pricing / Templates / University / Resources nav, and the
 * Buy now + Preview actions. Styling/behavior come from our Navbar + DropdownMenu.
 */
export function LandingHeader() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <AnnouncementBar />
      <Navbar
        variant="floating"
        elevateOnScroll
        open={open}
        onOpenChange={setOpen}
        className="sticky top-0 z-50 pt-3"
      >
        <NavbarInner className="mx-auto max-w-7xl backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <NavbarBrand asChild>
            <Link href="/" aria-label="Koala UI home">
              <BrandMark />
            </Link>
          </NavbarBrand>

          <NavbarSpacer />

          <NavbarNav>
            {NAV.map((entry) =>
              entry.items ? (
                <DropdownMenu key={entry.label}>
                  <DropdownMenuTrigger asChild>
                    <NavbarLink asChild>
                      <button type="button">
                        {entry.label}
                        <CaretDown />
                      </button>
                    </NavbarLink>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {entry.items.map((item) => (
                      <DropdownMenuItem key={item.label} asChild>
                        <Link href={item.href}>{item.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavbarLink
                  key={entry.label}
                  asChild
                  className={entry.soon ? "text-foreground/40" : undefined}
                >
                  <Link href={entry.href ?? "#"}>
                    {entry.label}
                    {entry.soon && (
                      <Badge variant="secondary" size="sm" className="ml-1">
                        Soon
                      </Badge>
                    )}
                  </Link>
                </NavbarLink>
              ),
            )}
          </NavbarNav>

          <NavbarSpacer />

          <NavbarActions>
            <Button asChild size="sm">
              <Link href="#pricing">Buy now</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">
                  <FigmaLogo />
                  Preview
                  <CaretDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/docs">
                    <Desktop />
                    Preview Desktop
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/docs">
                    <DeviceMobile />
                    Preview Mobile
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <NavbarMobileToggle />
          </NavbarActions>
        </NavbarInner>

        <NavbarMobileMenu className="mx-3 mt-2 rounded-2xl border border-border bg-background shadow-sm">
          {NAV.map((entry) =>
            entry.items ? (
              <div key={entry.label} className="flex flex-col">
                <span className="px-3 pb-1 pt-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {entry.label}
                </span>
                {entry.items.map((item) => (
                  <NavbarMobileLink key={item.label} asChild onClick={() => setOpen(false)}>
                    <Link href={item.href}>{item.label}</Link>
                  </NavbarMobileLink>
                ))}
              </div>
            ) : (
              <NavbarMobileLink key={entry.label} asChild onClick={() => setOpen(false)}>
                <Link href={entry.href ?? "#"}>
                  {entry.label}
                  {entry.soon && (
                    <Badge variant="secondary" size="sm" className="ml-1">
                      Soon
                    </Badge>
                  )}
                </Link>
              </NavbarMobileLink>
            ),
          )}
          <div className="mt-3 flex flex-col gap-2 px-3 pt-2">
            <Button asChild variant="outline" onClick={() => setOpen(false)}>
              <Link href="/docs">Preview</Link>
            </Button>
            <Button asChild onClick={() => setOpen(false)}>
              <Link href="#pricing">Buy now</Link>
            </Button>
          </div>
        </NavbarMobileMenu>
      </Navbar>
    </>
  )
}
