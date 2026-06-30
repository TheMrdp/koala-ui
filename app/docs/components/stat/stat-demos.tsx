"use client"

import {
  ShoppingBag,
  CurrencyDollar,
  Receipt,
  ArrowUUpLeft,
  DotsThree,
} from "@phosphor-icons/react"

import {
  Stat,
  StatGroup,
  StatHeader,
  StatLabel,
  StatValue,
  StatTrend,
  StatCaption,
  StatFooter,
  StatIcon,
  StatSparkline,
} from "@/components/ui/stat"
import { Button } from "@/components/ui/button"

/* A small Orders series reused across the sparkline demos. */
const ORDERS_TREND = [18, 22, 19, 27, 24, 31, 29, 38, 42]
const REFUNDS_TREND = [9, 8, 11, 7, 8, 6, 5, 6, 4]

/* ----------------------------------------------------------------- showcase --- */

export function ShowcaseDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat>
        <StatHeader>
          <StatLabel>Total orders</StatLabel>
          <StatIcon className="bg-primary/10 text-primary">
            <ShoppingBag />
          </StatIcon>
        </StatHeader>
        <StatValue>1,429</StatValue>
        <StatFooter>
          <StatTrend direction="up">12.4%</StatTrend>
          <StatCaption>vs last month</StatCaption>
        </StatFooter>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Revenue</StatLabel>
          <StatIcon className="bg-success/10 text-success">
            <CurrencyDollar />
          </StatIcon>
        </StatHeader>
        <StatValue>$84,200</StatValue>
        <StatFooter>
          <StatTrend direction="up">8.1%</StatTrend>
          <StatCaption>vs last month</StatCaption>
        </StatFooter>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Avg. order value</StatLabel>
          <StatIcon className="bg-info/10 text-info">
            <Receipt />
          </StatIcon>
        </StatHeader>
        <StatValue>$58.92</StatValue>
        <StatFooter>
          <StatTrend direction="down">2.3%</StatTrend>
          <StatCaption>vs last month</StatCaption>
        </StatFooter>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Refunds</StatLabel>
          <StatIcon className="bg-muted text-muted-foreground">
            <ArrowUUpLeft />
          </StatIcon>
        </StatHeader>
        <StatValue>32</StatValue>
        <StatFooter>
          {/* down is the good outcome here: inverted keeps the arrow honest, color green */}
          <StatTrend direction="down" inverted>
            5.0%
          </StatTrend>
          <StatCaption>vs last month</StatCaption>
        </StatFooter>
      </Stat>
    </div>
  )
}

/* -------------------------------------------------------------------- group --- */

export function GroupDemo() {
  return (
    <StatGroup className="w-full">
      <Stat>
        <StatHeader>
          <StatLabel>Total orders</StatLabel>
          <StatIcon className="bg-primary/10 text-primary">
            <ShoppingBag />
          </StatIcon>
        </StatHeader>
        <div className="flex items-center gap-2">
          <StatValue>1,429</StatValue>
          <StatTrend direction="up">12.4%</StatTrend>
        </div>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Revenue</StatLabel>
          <StatIcon className="bg-success/10 text-success">
            <CurrencyDollar />
          </StatIcon>
        </StatHeader>
        <div className="flex items-center gap-2">
          <StatValue>$84,200</StatValue>
          <StatTrend direction="up">8.1%</StatTrend>
        </div>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Avg. order value</StatLabel>
          <StatIcon className="bg-info/10 text-info">
            <Receipt />
          </StatIcon>
        </StatHeader>
        <div className="flex items-center gap-2">
          <StatValue>$58.92</StatValue>
          <StatTrend direction="down">2.3%</StatTrend>
        </div>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Refunds</StatLabel>
          <StatIcon className="bg-muted text-muted-foreground">
            <ArrowUUpLeft />
          </StatIcon>
        </StatHeader>
        <div className="flex items-center gap-2">
          <StatValue>32</StatValue>
          {/* down is the good outcome here: inverted keeps the arrow honest, color green */}
          <StatTrend direction="down" inverted>
            5.0%
          </StatTrend>
        </div>
      </Stat>
    </StatGroup>
  )
}

/* -------------------------------------------------------------------- parts --- */

export function AnatomyDemo() {
  return (
    <Stat className="w-full max-w-xs">
      <StatHeader>
        <StatLabel>Total orders</StatLabel>
        <StatIcon className="bg-primary/10 text-primary">
          <ShoppingBag />
        </StatIcon>
      </StatHeader>
      <StatValue>1,429</StatValue>
      <StatFooter>
        <StatTrend direction="up">12.4%</StatTrend>
        <StatCaption>vs last month</StatCaption>
      </StatFooter>
    </Stat>
  )
}

/* -------------------------------------------------------------------- trend --- */

export function TrendDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Stat>
        <StatLabel>Orders</StatLabel>
        <StatValue>1,429</StatValue>
        <StatTrend direction="up">12.4%</StatTrend>
      </Stat>
      <Stat>
        <StatLabel>Avg. order value</StatLabel>
        <StatValue>$58.92</StatValue>
        <StatTrend direction="down">2.3%</StatTrend>
      </Stat>
      <Stat>
        <StatLabel>Refunds</StatLabel>
        <StatValue>32</StatValue>
        <StatTrend direction="down" inverted>
          5.0%
        </StatTrend>
      </Stat>
      <Stat>
        <StatLabel>Open tickets</StatLabel>
        <StatValue>17</StatValue>
        <StatTrend direction="neutral">0.0%</StatTrend>
      </Stat>
    </div>
  )
}

/* ------------------------------------------------------------------ sparkline --- */

export function SparklineDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Stat>
        <StatHeader>
          <StatLabel>Orders this week</StatLabel>
          <StatTrend direction="up">18.2%</StatTrend>
        </StatHeader>
        <StatValue>1,429</StatValue>
        <StatSparkline data={ORDERS_TREND} tooltip className="mt-3 text-success" />
      </Stat>
      <Stat>
        <StatHeader>
          <StatLabel>Refunds this week</StatLabel>
          <StatTrend direction="down" inverted>
            9.0%
          </StatTrend>
        </StatHeader>
        <StatValue>32</StatValue>
        <StatSparkline data={REFUNDS_TREND} tooltip className="mt-3 text-destructive" />
      </Stat>
    </div>
  )
}

/* ------------------------------------------------------------------ variants --- */

export function VariantsDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-3">
      <Stat variant="default">
        <StatLabel>Default</StatLabel>
        <StatValue>1,429</StatValue>
        <StatTrend direction="up">12.4%</StatTrend>
      </Stat>
      <Stat variant="outline">
        <StatLabel>Outline</StatLabel>
        <StatValue>1,429</StatValue>
        <StatTrend direction="up">12.4%</StatTrend>
      </Stat>
      <Stat variant="elevated">
        <StatLabel>Elevated</StatLabel>
        <StatValue>1,429</StatValue>
        <StatTrend direction="up">12.4%</StatTrend>
      </Stat>
    </div>
  )
}

/* ------------------------------------------------------------------- density --- */

export function DensityDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Stat density="compact">
        <StatHeader>
          <StatLabel>Compact</StatLabel>
          <StatIcon className="bg-primary/10 text-primary">
            <ShoppingBag />
          </StatIcon>
        </StatHeader>
        <StatValue>1,429</StatValue>
        <StatTrend direction="up">12.4%</StatTrend>
      </Stat>
      <Stat density="comfortable">
        <StatHeader>
          <StatLabel>Comfortable</StatLabel>
          <StatIcon className="bg-primary/10 text-primary">
            <ShoppingBag />
          </StatIcon>
        </StatHeader>
        <StatValue>1,429</StatValue>
        <StatTrend direction="up">12.4%</StatTrend>
      </Stat>
    </div>
  )
}

/* --------------------------------------------------------------- interactive --- */

export function InteractiveDemo() {
  return (
    <div className="grid w-full gap-4 sm:grid-cols-2">
      <Stat asChild interactive>
        <a href="#orders">
          <StatHeader>
            <StatLabel>Total orders</StatLabel>
            <StatIcon className="bg-primary/10 text-primary">
              <ShoppingBag />
            </StatIcon>
          </StatHeader>
          <StatValue>1,429</StatValue>
          <StatFooter>
            <StatTrend direction="up">12.4%</StatTrend>
            <StatCaption>View all orders</StatCaption>
          </StatFooter>
        </a>
      </Stat>

      <Stat>
        <StatHeader>
          <StatLabel>Revenue</StatLabel>
          <Button variant="ghost" size="sm" iconOnly aria-label="More">
            <DotsThree />
          </Button>
        </StatHeader>
        <StatValue>$84,200</StatValue>
        <StatFooter>
          <StatTrend direction="up">8.1%</StatTrend>
          <StatCaption>vs last month</StatCaption>
        </StatFooter>
      </Stat>
    </div>
  )
}
