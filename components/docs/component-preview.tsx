"use client"

import * as React from "react"
import { Eye, Code } from "@phosphor-icons/react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { CodeSnippet } from "./code-snippet"

interface ComponentPreviewProps {
  /** The live, rendered example. */
  children: React.ReactNode
  /** Source for the example, shown under the "Code" tab. */
  code: string
  filename?: string
  /** Extra classes for the preview stage (e.g. layout for the demo). */
  previewClassName?: string
}

export function ComponentPreview({
  children,
  code,
  filename,
  previewClassName,
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="my-6">
      <TabsList>
        <TabsTrigger value="preview"><Eye />Preview</TabsTrigger>
        <TabsTrigger value="code"><Code />Code</TabsTrigger>
      </TabsList>

      <TabsContent
        value="preview"
        className="rounded-lg border border-border bg-background"
      >
        <div
          className={cn(
            "flex min-h-50 flex-wrap items-center justify-center gap-4 p-10",
            previewClassName,
          )}
        >
          {children}
        </div>
      </TabsContent>

      <TabsContent value="code">
        <CodeSnippet code={code} filename={filename} />
      </TabsContent>
    </Tabs>
  )
}
