import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ComponentPlayground } from "@/components/component-playground"
import { components } from "@/lib/component-registry"
import { componentDetails } from "@/lib/component-data"

export async function generateStaticParams() {
  return components.map((comp) => ({
    slug: comp.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const comp = componentDetails[slug]

  if (!comp) {
    return {
      title: "Component Not Found — Kinetix",
    }
  }

  return {
    title: `${comp.name} — Kinetix Component Library`,
    description: comp.description,
  }
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const comp = componentDetails[slug]

  if (!comp) {
    notFound()
  }

  return <ComponentPlayground slug={slug} />
}
