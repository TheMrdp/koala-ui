import axe from "axe-core"

// Run axe against a rendered subtree and fail with a readable report if anything trips.
// color-contrast is disabled: jsdom has no layout engine, so contrast can't be computed and the
// rule would either no-op or throw. We assert structural a11y (roles, names, states, attributes),
// which is exactly where the hand-rolled components carry their risk.
export async function expectNoA11yViolations(container: Element): Promise<void> {
  const results = await axe.run(container, {
    rules: { "color-contrast": { enabled: false } },
  })

  if (results.violations.length > 0) {
    const report = results.violations
      .map((v) => {
        const nodes = v.nodes.map((n) => "    " + n.html).join("\n")
        return `  [${v.id}] ${v.help}\n${nodes}`
      })
      .join("\n")
    throw new Error(`Found ${results.violations.length} a11y violation(s):\n${report}`)
  }
}
