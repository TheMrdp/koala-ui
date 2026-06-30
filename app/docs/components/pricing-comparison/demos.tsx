"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  PricingComparison,
  PricingComparisonHeader,
  PricingComparisonPlan,
  PricingComparisonSection,
  PricingComparisonRow,
  PricingComparisonCell,
} from "@/components/ui/pricing-comparison"

/** The flagship matrix: three plans, the middle one featured, grouped feature sections. */
export function PricingComparisonDemo() {
  return (
    <PricingComparison featured={1} className="w-full">
      <PricingComparisonHeader label="Compare plans">
        <PricingComparisonPlan name="Starter" price="$0" period="/mo">
          <Button variant="outline" size="sm">
            Get started
          </Button>
        </PricingComparisonPlan>
        <PricingComparisonPlan
          name="Pro"
          price="$29"
          period="/mo"
          badge={
            <Badge variant="orange" dot pill size="sm">
              Popular
            </Badge>
          }
        >
          <Button size="sm">Start free trial</Button>
        </PricingComparisonPlan>
        <PricingComparisonPlan name="Enterprise" price="Custom">
          <Button variant="outline" size="sm">
            Contact sales
          </Button>
        </PricingComparisonPlan>
      </PricingComparisonHeader>

      <PricingComparisonSection title="Projects & team">
        <PricingComparisonRow label="Projects">
          <PricingComparisonCell>5</PricingComparisonCell>
          <PricingComparisonCell>Unlimited</PricingComparisonCell>
          <PricingComparisonCell>Unlimited</PricingComparisonCell>
        </PricingComparisonRow>
        <PricingComparisonRow label="Team members" hint="A seat is one active member per month.">
          <PricingComparisonCell>3</PricingComparisonCell>
          <PricingComparisonCell>Unlimited</PricingComparisonCell>
          <PricingComparisonCell>Unlimited</PricingComparisonCell>
        </PricingComparisonRow>
        <PricingComparisonRow label="Storage" hint="Pooled across the whole team, not per seat.">
          <PricingComparisonCell>1 GB</PricingComparisonCell>
          <PricingComparisonCell>100 GB</PricingComparisonCell>
          <PricingComparisonCell>1 TB</PricingComparisonCell>
        </PricingComparisonRow>
      </PricingComparisonSection>

      <PricingComparisonSection title="Support & security">
        <PricingComparisonRow label="Community support">
          <PricingComparisonCell included />
          <PricingComparisonCell included />
          <PricingComparisonCell included />
        </PricingComparisonRow>
        <PricingComparisonRow label="Priority support" hint="One-hour response on business days.">
          <PricingComparisonCell included={false} />
          <PricingComparisonCell included />
          <PricingComparisonCell included />
        </PricingComparisonRow>
        <PricingComparisonRow label="SSO & SAML">
          <PricingComparisonCell included={false} />
          <PricingComparisonCell included={false} />
          <PricingComparisonCell included />
        </PricingComparisonRow>
        <PricingComparisonRow label="Dedicated manager">
          <PricingComparisonCell included={false} />
          <PricingComparisonCell included={false} />
          <PricingComparisonCell included />
        </PricingComparisonRow>
      </PricingComparisonSection>
    </PricingComparison>
  )
}

/** A compact two-plan matrix with no highlighted column. */
export function PricingComparisonPlainDemo() {
  return (
    <PricingComparison className="mx-auto w-full max-w-xl">
      <PricingComparisonHeader>
        <PricingComparisonPlan name="Monthly" price="$29" period="/mo">
          <Button variant="outline" size="sm">
            Choose monthly
          </Button>
        </PricingComparisonPlan>
        <PricingComparisonPlan name="Annual" price="$23" period="/mo">
          <Button size="sm">Choose annual</Button>
        </PricingComparisonPlan>
      </PricingComparisonHeader>

      <PricingComparisonSection>
        <PricingComparisonRow label="Billed">
          <PricingComparisonCell>Monthly</PricingComparisonCell>
          <PricingComparisonCell>Yearly</PricingComparisonCell>
        </PricingComparisonRow>
        <PricingComparisonRow label="Effective price" hint="Annual is billed once at $276/yr.">
          <PricingComparisonCell>$348/yr</PricingComparisonCell>
          <PricingComparisonCell>$276/yr</PricingComparisonCell>
        </PricingComparisonRow>
        <PricingComparisonRow label="Cancel anytime">
          <PricingComparisonCell included />
          <PricingComparisonCell included />
        </PricingComparisonRow>
        <PricingComparisonRow label="Price lock">
          <PricingComparisonCell included={false} />
          <PricingComparisonCell included />
        </PricingComparisonRow>
      </PricingComparisonSection>
    </PricingComparison>
  )
}
