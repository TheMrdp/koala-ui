"use client"

import * as React from "react"
import { Gear, Info } from "@phosphor-icons/react"

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
  PopoverCloseButton,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { InputRoot, InputField, InputLabel } from "@/components/ui/input"

// Basic — title + description.
export function PopoverBasicDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-1">
          <PopoverTitle>Invite teammates</PopoverTitle>
          <PopoverDescription>
            Share this workspace with anyone on your team. They&apos;ll get an email invite.
          </PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// A small form — the canonical Popover use case (Input blends with the panel surface).
export function PopoverFormDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Gear /> Dimensions
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="space-y-1">
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-3 items-center gap-3">
              <InputLabel htmlFor="width">Width</InputLabel>
              <InputRoot size="sm" className="col-span-2">
                <InputField id="width" defaultValue="100%" />
              </InputRoot>
            </div>
            <div className="grid grid-cols-3 items-center gap-3">
              <InputLabel htmlFor="height">Height</InputLabel>
              <InputRoot size="sm" className="col-span-2">
                <InputField id="height" defaultValue="25px" />
              </InputRoot>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <PopoverClose asChild>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button size="sm">Save</Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// With a pointer arrow + a styled close button.
export function PopoverArrowDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" iconOnly aria-label="About">
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent showArrow className="w-64">
        <PopoverCloseButton aria-label="Close">
          <span aria-hidden>×</span>
        </PopoverCloseButton>
        <div className="space-y-1 pr-4">
          <PopoverTitle>Heads up</PopoverTitle>
          <PopoverDescription>
            Popovers reposition automatically to stay in view near the edges.
          </PopoverDescription>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// Alignment options.
export function PopoverAlignDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {(["start", "center", "end"] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              align=&quot;{align}&quot;
            </Button>
          </PopoverTrigger>
          <PopoverContent align={align} className="w-48">
            <PopoverDescription>
              Aligned to the <span className="font-medium text-foreground">{align}</span> edge.
            </PopoverDescription>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  )
}

// Compact density.
export function PopoverCompactDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Compact
        </Button>
      </PopoverTrigger>
      <PopoverContent density="compact" className="w-56">
        <PopoverDescription>Tighter padding for dense application UI.</PopoverDescription>
      </PopoverContent>
    </Popover>
  )
}
