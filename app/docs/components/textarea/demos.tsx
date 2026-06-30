"use client"

import * as React from "react"

import {
  TextareaRoot,
  TextareaField,
  TextareaFooter,
  TextareaCount,
  TextareaLabel,
  TextareaHint,
} from "@/components/ui/textarea"

export function AutoResizeDemo() {
  const [value, setValue] = React.useState(
    "This textarea grows as you type. Try adding a few more lines and watch it expand to fit.",
  )
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <TextareaLabel htmlFor="auto-resize">Release notes</TextareaLabel>
      <TextareaRoot>
        <TextareaField
          id="auto-resize"
          autoResize
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Start typing…"
        />
      </TextareaRoot>
      <TextareaHint>No scrollbar: the field resizes to its content.</TextareaHint>
    </div>
  )
}

export function AddonCounterDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <TextareaLabel htmlFor="addon-bio">Bio</TextareaLabel>
      <TextareaRoot resize="none">
        <TextareaField
          id="addon-bio"
          showCount
          maxLength={180}
          placeholder="Tell us about yourself…"
        />
      </TextareaRoot>
    </div>
  )
}

export function CounterDemo() {
  const MAX = 180
  const [value, setValue] = React.useState("")
  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <TextareaLabel htmlFor="bio">Bio</TextareaLabel>
      <TextareaRoot resize="none" hasError={value.length > MAX}>
        <TextareaField
          id="bio"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Tell us about yourself…"
        />
        <TextareaFooter>
          <span>Markdown supported</span>
          <TextareaCount current={value.length} max={MAX} />
        </TextareaFooter>
      </TextareaRoot>
    </div>
  )
}
