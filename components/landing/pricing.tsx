import Link from "next/link"
import { Check } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/landing/section"
import { PRICING } from "@/components/landing/data"

/** Pricing: Free, Figma, and the highlighted Figma + React bundle. Pay once, use forever. */
export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Pay once, and use forever"
        description="No subscriptions. Choose the design kit, the code library, or both, and own it for good."
      />

      <div className="grid items-start gap-6 lg:grid-cols-3">
        {PRICING.map((tier) => (
          <Card
            key={tier.id}
            density="comfortable"
            variant={tier.featured ? "elevated" : "default"}
            className={cn(
              "h-full",
              tier.featured && "relative ring-2 ring-brand lg:-mt-4 lg:mb-4",
            )}
          >
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>{tier.name}</CardTitle>
                {tier.badge && <Badge variant="primary">{tier.badge}</Badge>}
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-4xl font-semibold tracking-tight tabular-nums">
                  {tier.price}
                </span>
                <span className="text-sm text-muted-foreground">{tier.cadence}</span>
              </div>
              <CardDescription className="mt-2">{tier.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                      <Check weight="bold" className="size-3" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                asChild
                size="lg"
                variant={tier.featured ? "primary" : "outline"}
                className="w-full"
              >
                <Link href={tier.cta.href}>{tier.cta.label}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Every plan includes free lifetime updates and a 14-day money-back guarantee.
      </p>
    </Section>
  )
}
