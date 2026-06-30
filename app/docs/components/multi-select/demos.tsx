"use client"

import { useState } from "react"
import {
  Code,
  PenNib,
  Megaphone,
  Package,
  ChartLineUp,
  EnvelopeSimple,
  DeviceMobile,
  ChatCircle,
  Desktop,
  Eye,
  PencilSimple,
  UploadSimple,
  UsersThree,
  CreditCard,
  Circle,
} from "@phosphor-icons/react"

import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectSwitchItem,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectSeparator,
} from "@/components/ui/multi-select"
import { Badge } from "@/components/ui/badge"

// Labels for the categories used across several demos: keeps the chip-rendering demo honest
// (the trigger maps the stored values back to display labels).
const CATEGORY_LABELS: Record<string, string> = {
  engineering: "Engineering",
  design: "Design",
  marketing: "Marketing",
  product: "Product",
  sales: "Sales",
}

export function MultiSelectCategoriesDemo() {
  return (
    <MultiSelect defaultValue={["engineering", "design"]}>
      <MultiSelectTrigger className="w-64">
        <MultiSelectValue placeholder="Select categories" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectItem value="engineering">
          <Code /> Engineering
        </MultiSelectItem>
        <MultiSelectItem value="design">
          <PenNib /> Design
        </MultiSelectItem>
        <MultiSelectItem value="marketing">
          <Megaphone /> Marketing
        </MultiSelectItem>
        <MultiSelectItem value="product">
          <Package /> Product
        </MultiSelectItem>
        <MultiSelectItem value="sales">
          <ChartLineUp /> Sales
        </MultiSelectItem>
      </MultiSelectContent>
    </MultiSelect>
  )
}

export function MultiSelectSwitchDemo() {
  return (
    <MultiSelect defaultValue={["email", "push"]}>
      <MultiSelectTrigger className="w-64">
        <MultiSelectValue
          placeholder="Notification channels"
          renderValue={(value) => `${value.length} channels on`}
        />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectSwitchItem value="email">
          <EnvelopeSimple /> Email
        </MultiSelectSwitchItem>
        <MultiSelectSwitchItem value="push">
          <DeviceMobile /> Push
        </MultiSelectSwitchItem>
        <MultiSelectSwitchItem value="sms">
          <ChatCircle /> SMS
        </MultiSelectSwitchItem>
        <MultiSelectSwitchItem value="desktop">
          <Desktop /> Desktop
        </MultiSelectSwitchItem>
      </MultiSelectContent>
    </MultiSelect>
  )
}

export function MultiSelectSectionsDemo() {
  return (
    <MultiSelect defaultValue={["read"]}>
      <MultiSelectTrigger className="w-64">
        <MultiSelectValue placeholder="Select permissions" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          <MultiSelectLabel>Content</MultiSelectLabel>
          <MultiSelectItem value="read">
            <Eye /> Read
          </MultiSelectItem>
          <MultiSelectItem value="write">
            <PencilSimple /> Write
          </MultiSelectItem>
          <MultiSelectItem value="publish">
            <UploadSimple /> Publish
          </MultiSelectItem>
        </MultiSelectGroup>
        <MultiSelectSeparator />
        <MultiSelectGroup>
          <MultiSelectLabel>Admin</MultiSelectLabel>
          <MultiSelectItem value="users">
            <UsersThree /> Manage users
          </MultiSelectItem>
          <MultiSelectItem value="billing" disabled>
            <CreditCard /> Billing (owner only)
          </MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  )
}

export function MultiSelectChipsDemo() {
  const [value, setValue] = useState<string[]>(["engineering", "product"])
  return (
    <MultiSelect value={value} onValueChange={setValue}>
      <MultiSelectTrigger className="w-72">
        <MultiSelectValue
          placeholder="Select categories"
          renderValue={(values) => (
            <span className="flex gap-1 overflow-hidden">
              {values.map((v) => (
                <Badge key={v} variant="secondary" size="sm" pill>
                  {CATEGORY_LABELS[v] ?? v}
                </Badge>
              ))}
            </span>
          )}
        />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectItem value="engineering">
          <Code /> Engineering
        </MultiSelectItem>
        <MultiSelectItem value="design">
          <PenNib /> Design
        </MultiSelectItem>
        <MultiSelectItem value="marketing">
          <Megaphone /> Marketing
        </MultiSelectItem>
        <MultiSelectItem value="product">
          <Package /> Product
        </MultiSelectItem>
      </MultiSelectContent>
    </MultiSelect>
  )
}

export function MultiSelectDensityDemo() {
  return (
    <div className="flex items-center gap-4">
      <MultiSelect defaultValue={["a"]}>
        <MultiSelectTrigger className="w-44">
          <MultiSelectValue placeholder="Comfortable" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="a">
            <Circle /> Option A
          </MultiSelectItem>
          <MultiSelectItem value="b">
            <Circle /> Option B
          </MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>
      <MultiSelect defaultValue={["a"]} density="compact">
        <MultiSelectTrigger className="w-44">
          <MultiSelectValue placeholder="Compact" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="a">
            <Circle /> Option A
          </MultiSelectItem>
          <MultiSelectItem value="b">
            <Circle /> Option B
          </MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  )
}
