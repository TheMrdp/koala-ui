/**
 * The docs CodeSnippet is now the canonical DS component. This file re-exports it so the
 * many `@/components/docs/code-snippet` imports across the docs keep resolving. The source
 * of truth lives in components/ui/code-snippet.
 */
export {
  CodeSnippet,
  codeSnippetVariants,
  type CodeSnippetProps,
} from "@/components/ui/code-snippet"
