import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tsconfigPaths from "vite-tsconfig-paths"

// Component + a11y tests run in jsdom against the real component source. The `@/` alias is
// resolved from tsconfig by vite-tsconfig-paths so tests import components the same way the app does.
// Tests live under test/ (never inside components/ui) so the distribution CLI never ships them.
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["test/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "packages/**"],
    // No CSS pipeline needed: components produce class strings via tailwind-variants, never import CSS.
    css: false,
  },
})
