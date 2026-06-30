"use client"

import * as React from "react"

import { Field, FieldLabel } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/input"
import {
  PasswordStrength,
  PasswordStrengthMeter,
  PasswordStrengthLabel,
  PasswordStrengthList,
  type PasswordRule,
} from "@/components/ui/password-strength"

// ─── Hero: input + meter + inline label ─────────────────────────────────────────

export function PasswordStrengthDemo() {
  const [value, setValue] = React.useState("Koala42")

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <PasswordInput
        placeholder="Create a password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <PasswordStrength value={value}>
        <PasswordStrengthMeter />
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">
            Password strength
          </span>
          <PasswordStrengthLabel placeholder="-" />
        </div>
      </PasswordStrength>
    </div>
  )
}

// ─── With the requirements checklist ─────────────────────────────────────────────

export function PasswordStrengthRequirementsDemo() {
  const [value, setValue] = React.useState("koala")

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <PasswordInput
        placeholder="Create a password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <PasswordStrength value={value} className="gap-3">
        <PasswordStrengthMeter />
        <PasswordStrengthList />
      </PasswordStrength>
    </div>
  )
}

// ─── Inside a Field ──────────────────────────────────────────────────────────────

export function PasswordStrengthFieldDemo() {
  const [value, setValue] = React.useState("")

  return (
    <Field className="max-w-sm">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput
        placeholder="Create a password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <PasswordStrength value={value} className="mt-0.5">
        <PasswordStrengthMeter />
      </PasswordStrength>
    </Field>
  )
}

// ─── Custom policy ───────────────────────────────────────────────────────────────

const corporateRules: PasswordRule[] = [
  { id: "length", label: "At least 12 characters", test: (v) => v.length >= 12 },
  {
    id: "case",
    label: "Upper & lowercase letters",
    test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  { id: "number", label: "At least one number", test: (v) => /\d/.test(v) },
  {
    id: "symbol",
    label: "At least one symbol (!@#$…)",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
  { id: "no-spaces", label: "No spaces", test: (v) => v.length > 0 && !/\s/.test(v) },
]

export function PasswordStrengthCustomDemo() {
  const [value, setValue] = React.useState("")

  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <PasswordInput
        placeholder="Create a password"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <PasswordStrength value={value} rules={corporateRules} className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <PasswordStrengthMeter className="max-w-[60%]" />
          <PasswordStrengthLabel placeholder="-" />
        </div>
        <PasswordStrengthList />
      </PasswordStrength>
    </div>
  )
}
