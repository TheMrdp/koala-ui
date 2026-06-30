"use client"

import * as React from "react"
import {
  MagnifyingGlass,
  ShieldCheck,
  User,
  Eye,
  CurrencyDollar,
  CurrencyEur,
  CurrencyGbp,
} from "@phosphor-icons/react"

import { InputGroup, InputGroupAddon } from "@/components/ui/input-group"
import { InputRoot, InputField, InputPrefix } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

// Hero: an icon adornment lives *inside* the field segment (InputPrefix); the trailing
// action stays a real, filled Button. One ring wraps the whole row on focus.
export function SearchGroupDemo() {
  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <InputRoot>
          <InputPrefix>
            <MagnifyingGlass />
          </InputPrefix>
          <InputField placeholder="Search components" aria-label="Search" />
        </InputRoot>
        <Button>Search</Button>
      </InputGroup>
    </div>
  )
}

// Static text affixes via InputGroupAddon, on either side of the field.
export function AddonsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputRoot>
          <InputField placeholder="yourcompany" aria-label="Subdomain" />
        </InputRoot>
        <InputGroupAddon>.com</InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>@</InputGroupAddon>
        <InputRoot>
          <InputField placeholder="username" aria-label="Username" />
        </InputRoot>
      </InputGroup>
    </div>
  )
}

// The full [Select][input][Button] triple: a Select segment owns the leading affix,
// the field flexes to fill, the Button caps the row.
export function InviteGroupDemo() {
  return (
    <div className="w-full max-w-md">
      <InputGroup>
        <Select defaultValue="member">
          <SelectTrigger aria-label="Role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">
              <ShieldCheck /> Admin
            </SelectItem>
            <SelectItem value="member">
              <User /> Member
            </SelectItem>
            <SelectItem value="viewer">
              <Eye /> Viewer
            </SelectItem>
          </SelectContent>
        </Select>
        <InputRoot>
          <InputField
            type="email"
            placeholder="teammate@company.com"
            aria-label="Email to invite"
          />
        </InputRoot>
        <Button>Invite</Button>
      </InputGroup>
    </div>
  )
}

// [$][amount][currency]: an addon prefix, the flexible field, and a trailing Select.
export function AmountGroupDemo() {
  return (
    <div className="w-full max-w-sm">
      <InputGroup>
        <InputGroupAddon>$</InputGroupAddon>
        <InputRoot>
          <InputField
            inputMode="decimal"
            placeholder="0.00"
            defaultValue="1,250.00"
            className="tabular-nums"
            aria-label="Amount"
          />
        </InputRoot>
        <Select defaultValue="usd">
          <SelectTrigger aria-label="Currency">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">
              <CurrencyDollar /> USD
            </SelectItem>
            <SelectItem value="eur">
              <CurrencyEur /> EUR
            </SelectItem>
            <SelectItem value="gbp">
              <CurrencyGbp /> GBP
            </SelectItem>
          </SelectContent>
        </Select>
      </InputGroup>
    </div>
  )
}

// One height knob for the whole shell; give the inner controls the matching size.
export function SizesDemo() {
  const sizes = ["sm", "md", "lg"] as const
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {sizes.map((size) => (
        <InputGroup key={size} size={size}>
          <InputRoot size={size}>
            <InputPrefix>
              <MagnifyingGlass />
            </InputPrefix>
            <InputField placeholder={`Search (${size})`} aria-label={`Search ${size}`} />
          </InputRoot>
          <Button size={size}>Search</Button>
        </InputGroup>
      ))}
    </div>
  )
}

// hasError paints the whole shell red; disabled dims and locks the row.
export function StatesDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <InputGroup hasError>
        <InputGroupAddon>@</InputGroupAddon>
        <InputRoot>
          <InputField defaultValue="not an email" aria-label="Email" />
        </InputRoot>
      </InputGroup>

      <InputGroup disabled>
        <InputGroupAddon>https://</InputGroupAddon>
        <InputRoot>
          <InputField defaultValue="acme" disabled aria-label="Subdomain" />
        </InputRoot>
        <InputGroupAddon>.com</InputGroupAddon>
      </InputGroup>
    </div>
  )
}
