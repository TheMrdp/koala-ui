"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { THEMES } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { theme, setTheme } = useTheme();

  // next-themes can't know the active theme during SSR, so the active state must
  // only be applied after mount - otherwise server/client HTML disagree (hydration).
  const [mounted, setMounted] = useState(false);
  // Mount guard for next-themes: the active theme is unknown during SSR, so we only
  // reflect it after hydration. Setting state once on mount is the intended use here.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <span
        aria-hidden
        className="inline-flex size-10 items-center justify-center rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-md"
      >
        K
      </span>

      <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Koala UI
      </h1>

      <p className="max-w-md text-pretty text-muted-foreground">
        Clean Next.js + Tailwind v4 base. Custom component library - starting from
        scratch.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {THEMES.map((t) => (
          <Button
            key={t}
            variant={mounted && theme === t ? "primary" : "outline"}
            onClick={() => setTheme(t)}
            className="capitalize"
          >
            {t}
          </Button>
        ))}
      </div>

      <Button asChild variant="link">
        <Link href="/docs">View the docs →</Link>
      </Button>
    </main>
  );
}
