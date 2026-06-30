import {
  Stat,
  StatGroup,
  StatLabel,
  StatValue,
} from "@/components/ui/stat"
import { Section } from "@/components/landing/section"
import { METRICS } from "@/components/landing/data"

/** Quality metrics band: the library at a glance, banded into one segmented surface. */
export function MetricsBand() {
  return (
    <Section className="py-12 sm:py-16">
      <StatGroup columns={4} variant="outline">
        {METRICS.map((metric) => (
          <Stat key={metric.label} density="comfortable" className="items-center text-center">
            <StatValue className="text-3xl sm:text-4xl">{metric.value}</StatValue>
            <StatLabel>{metric.label}</StatLabel>
          </Stat>
        ))}
      </StatGroup>
    </Section>
  )
}
