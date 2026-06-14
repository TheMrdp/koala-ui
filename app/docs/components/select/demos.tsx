"use client"

import {
  Pizza,
  Hamburger,
  Fish,
  Egg,
  Coffee,
  Clock,
  Gift,
  Lightning,
  Buildings,
  Circle,
} from "@phosphor-icons/react"

import US from "country-flag-icons/react/3x2/US"
import GB from "country-flag-icons/react/3x2/GB"
import CA from "country-flag-icons/react/3x2/CA"
import DE from "country-flag-icons/react/3x2/DE"
import FR from "country-flag-icons/react/3x2/FR"
import JP from "country-flag-icons/react/3x2/JP"

import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select"
import { CircleFlag } from "@/components/docs/circle-flag"

// Icon + label both land inside SelectItem's ItemText, so wrap them in an
// inline-flex span for spacing + vertical centering. Phosphor icons get size-4
// automatically from the item recipe's `[&_svg:not([class*='size-'])]` rule.
function Option({ children }: { children: React.ReactNode }) {
  return <span className="flex items-center gap-2">{children}</span>
}

export function SelectDishDemo() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a dish" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="coffee">
          <Option>
            <Coffee /> Coffee
          </Option>
        </SelectItem>
        <SelectItem value="egg">
          <Option>
            <Egg /> Eggs benedict
          </Option>
        </SelectItem>
        <SelectItem value="fish">
          <Option>
            <Fish /> Grilled fish
          </Option>
        </SelectItem>
        <SelectItem value="burger">
          <Option>
            <Hamburger /> Hamburger
          </Option>
        </SelectItem>
        <SelectItem value="pizza">
          <Option>
            <Pizza /> Pizza
          </Option>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export function SelectCountryDemo() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ca">
          <Option>
            <CircleFlag flag={CA} /> Canada
          </Option>
        </SelectItem>
        <SelectItem value="fr">
          <Option>
            <CircleFlag flag={FR} /> France
          </Option>
        </SelectItem>
        <SelectItem value="de">
          <Option>
            <CircleFlag flag={DE} /> Germany
          </Option>
        </SelectItem>
        <SelectItem value="jp">
          <Option>
            <CircleFlag flag={JP} /> Japan
          </Option>
        </SelectItem>
        <SelectItem value="gb">
          <Option>
            <CircleFlag flag={GB} /> United Kingdom
          </Option>
        </SelectItem>
        <SelectItem value="us">
          <Option>
            <CircleFlag flag={US} /> United States
          </Option>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export function SelectTimezoneDemo() {
  return (
    <Select>
      <SelectTrigger className="w-64">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Europe</SelectLabel>
          <SelectItem value="cet">
            <Option>
              <Clock /> Central European Time (CET)
            </Option>
          </SelectItem>
          <SelectItem value="gmt">
            <Option>
              <Clock /> Greenwich Mean Time (GMT)
            </Option>
          </SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>North America</SelectLabel>
          <SelectItem value="cst">
            <Option>
              <Clock /> Central Standard Time (CST)
            </Option>
          </SelectItem>
          <SelectItem value="est">
            <Option>
              <Clock /> Eastern Standard Time (EST)
            </Option>
          </SelectItem>
          <SelectItem value="pst">
            <Option>
              <Clock /> Pacific Standard Time (PST)
            </Option>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export function SelectPlanDemo() {
  return (
    <Select>
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a plan" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="enterprise" disabled>
          <Option>
            <Buildings /> Enterprise (contact us)
          </Option>
        </SelectItem>
        <SelectItem value="free">
          <Option>
            <Gift /> Free
          </Option>
        </SelectItem>
        <SelectItem value="pro">
          <Option>
            <Lightning /> Pro
          </Option>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}

export function SelectDensityDemo() {
  return (
    <div className="flex items-center gap-4">
      <Select>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Comfortable" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">
            <Option>
              <Circle /> Option A
            </Option>
          </SelectItem>
          <SelectItem value="b">
            <Option>
              <Circle /> Option B
            </Option>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select>
        <SelectTrigger className="w-44" density="compact">
          <SelectValue placeholder="Compact" />
        </SelectTrigger>
        <SelectContent density="compact">
          <SelectItem value="a">
            <Option>
              <Circle /> Option A
            </Option>
          </SelectItem>
          <SelectItem value="b">
            <Option>
              <Circle /> Option B
            </Option>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
