import { DocHeader } from "@/components/docs/doc-page"
import { ComponentsCatalog } from "@/components/docs/components-catalog"

export const metadata = {
  title: "Components",
}

export default function ComponentsIndexPage() {
  return (
    <>
      <DocHeader
        title="Components"
        description="Every Koala UI component, grouped by category with a live preview. Pick one to see its variants, API, and copy-paste source."
      />

      <ComponentsCatalog />
    </>
  )
}
