"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  ArrowLeft,
  Copy,
  Check,
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  Filter,
  Terminal,
  Layers,
  ShieldCheck,
  Zap,
  Grid,
  List,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  components,
  collections,
  categories,
  codeSnippets,
  type CollectionId,
} from "@/lib/component-registry"
import { componentDetails } from "@/lib/component-data"

const accentClass = {
  cyan: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  purple: "text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10",
  green: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
}

export default function ComponentsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCollection, setSelectedCollection] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null)

  const filteredComponents = useMemo(() => {
    return components.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCollection =
        selectedCollection === "all" || item.collection === selectedCollection

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus

      return matchesSearch && matchesCollection && matchesCategory && matchesStatus
    })
  }, [searchQuery, selectedCollection, selectedCategory, selectedStatus])

  const copyCode = (slug: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const snippet =
      codeSnippets[slug] ||
      componentDetails[slug]?.usageCode ||
      `<${slug} />`
    navigator.clipboard?.writeText(snippet)
    setCopiedSlug(slug)
    setTimeout(() => setCopiedSlug(null), 1600)
  }

  return (
    <div className="min-h-screen bg-[#080b10] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080b10]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
              <span>Back to Home</span>
            </Link>
            <span className="hidden h-4 w-px bg-slate-800 sm:block" />
            <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
              <span>Directory</span>
              <ChevronRight size={12} />
              <span className="text-cyan-300 font-medium">All Components</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition"
            >
              <span>Philosophy & Docs</span>
              <ArrowUpRight size={13} />
            </Link>

            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white"
            >
              <img src="/kinetix-logo.png" alt="Kinetix" className="size-5" />
              <span className="hidden sm:inline">Kinetix UI</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb-10 border-b border-slate-800/80 pb-10">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-cyan-300">
            <span className="size-1.5 rounded-full bg-cyan-300" /> Complete Catalog
          </div>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
                Browse Components
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                Explore the complete collection of 12 considered components, tactile interactions, and Nigerian fintech UI patterns. Click any component to test live props and copy source code.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-300">
                Total: <strong className="text-cyan-300">{components.length}</strong>
              </span>
              <span className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-300">
                Stable: <strong className="text-emerald-400">8</strong>
              </span>
              <span className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-slate-300">
                New / Beta: <strong className="text-fuchsia-300">4</strong>
              </span>
            </div>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <div className="mb-8 space-y-4">
          {/* Search bar & quick toggles */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search components by name, description, or category..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900/90 pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Status filter dropdown */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs text-slate-300 outline-none focus:border-cyan-400"
              >
                <option value="all">All Statuses</option>
                <option value="stable">Stable Only</option>
                <option value="new">New Only</option>
                <option value="beta">Beta Only</option>
              </select>

              {/* View mode toggle */}
              <div className="flex rounded-xl border border-slate-800 bg-slate-900 p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-slate-800 text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  }`}
                  aria-label="Grid View"
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`rounded-lg p-1.5 transition ${
                    viewMode === "list"
                      ? "bg-slate-800 text-cyan-300"
                      : "text-slate-400 hover:text-white"
                  }`}
                  aria-label="List View"
                >
                  <List size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4">
            <button
              onClick={() => setSelectedCollection("all")}
              className={`rounded-xl border px-3.5 py-1.5 text-xs font-medium transition ${
                selectedCollection === "all"
                  ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                  : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
              }`}
            >
              All Collections ({components.length})
            </button>
            {collections.map((col) => (
              <button
                key={col.id}
                onClick={() => setSelectedCollection(col.id)}
                className={`flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-medium transition ${
                  selectedCollection === col.id
                    ? col.accent === "cyan"
                      ? "border-cyan-400/60 bg-cyan-400/10 text-cyan-300"
                      : col.accent === "purple"
                      ? "border-fuchsia-400/60 bg-fuchsia-400/10 text-fuchsia-300"
                      : "border-emerald-400/60 bg-emerald-400/10 text-emerald-300"
                    : "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white"
                }`}
              >
                <span
                  className={`size-1.5 rounded-full ${
                    col.accent === "cyan"
                      ? "bg-cyan-300"
                      : col.accent === "purple"
                      ? "bg-fuchsia-300"
                      : "bg-emerald-300"
                  }`}
                />
                <span>{col.label}</span>
              </button>
            ))}
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition ${
                selectedCategory === "all"
                  ? "bg-slate-800 text-white font-medium"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              All categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-lg px-2.5 py-1 transition ${
                  selectedCategory === cat
                    ? "bg-slate-800 text-cyan-300 font-medium"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6 flex items-center justify-between text-xs text-slate-500 font-mono">
          <span>
            Showing <strong>{filteredComponents.length}</strong> of {components.length} components
          </span>
          {(searchQuery || selectedCollection !== "all" || selectedCategory !== "all" || selectedStatus !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCollection("all")
                setSelectedCategory("all")
                setSelectedStatus("all")
              }}
              className="text-cyan-400 hover:underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Component Cards Grid View */}
        {viewMode === "grid" && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredComponents.map((item, index) => (
              <article
                key={item.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40 transition hover:-translate-y-1 hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-950/20"
              >
                <Link
                  href={`/components/${item.slug}`}
                  className="flex min-h-44 items-center justify-center border-b border-slate-800/80 bg-[#0d1219] p-6 transition group-hover:bg-[#0f1520]"
                >
                  <DirectoryPreview name={item.name} accent={item.accent} index={index} />
                </Link>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${accentClass[item.accent]}`}
                      >
                        {item.status}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {item.category}
                      </span>
                    </div>

                    <Link href={`/components/${item.slug}`}>
                      <h3 className="text-base font-semibold text-white transition group-hover:text-cyan-300">
                        {item.name}
                      </h3>
                    </Link>

                    <p className="mt-2 text-xs leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
                    <button
                      onClick={(e) => copyCode(item.slug, e)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-cyan-300 transition"
                    >
                      {copiedSlug === item.slug ? (
                        <>
                          <Check size={13} className="text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy snippet</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={`/components/${item.slug}`}
                      className="flex items-center gap-1 text-xs font-semibold text-slate-300 transition hover:text-cyan-300"
                    >
                      Explore & Code <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Component List View */}
        {viewMode === "list" && (
          <div className="space-y-3">
            {filteredComponents.map((item, index) => (
              <div
                key={item.slug}
                className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-slate-600 hover:bg-slate-900/70"
              >
                <div className="flex items-center gap-4">
                  <div className="size-10 grid place-items-center rounded-xl border border-slate-800 bg-[#0d1219] font-mono text-xs font-bold text-cyan-300">
                    {item.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/components/${item.slug}`}
                        className="text-sm font-semibold text-white group-hover:text-cyan-300"
                      >
                        {item.name}
                      </Link>
                      <span
                        className={`rounded-full border px-2 py-0.2 font-mono text-[8px] uppercase tracking-wider ${accentClass[item.accent]}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 max-w-xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 sm:mt-0 flex items-center gap-3 self-end sm:self-center">
                  <span className="font-mono text-[10px] text-slate-500 uppercase">
                    {item.category}
                  </span>
                  <button
                    onClick={(e) => copyCode(item.slug, e)}
                    className="flex items-center gap-1 rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-400 hover:text-cyan-300"
                  >
                    {copiedSlug === item.slug ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedSlug === item.slug ? "Copied" : "Snippet"}</span>
                  </button>
                  <Link
                    href={`/components/${item.slug}`}
                    className="rounded-lg bg-cyan-400 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredComponents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-800 py-20 text-center">
            <SlidersHorizontal className="mx-auto size-8 text-slate-600" />
            <h3 className="mt-4 text-base font-semibold text-slate-200">
              No components match your search
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your query, collection filter, or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("")
                setSelectedCollection("all")
                setSelectedCategory("all")
                setSelectedStatus("all")
              }}
              className="mt-4 rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Footer Info Banner */}
        <section className="mt-16 rounded-2xl border border-slate-800 bg-[#0c1017] p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-300">
                <Sparkles size={14} />
                <span>Open Source • MIT License</span>
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">
                Want to learn the architectural philosophy behind Kinetix?
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-xl leading-relaxed">
                Read our manifesto on "Interfaces with a point of view", tactile micro-interactions, and African fintech payment patterns.
              </p>
            </div>
            <Link href="/docs">
              <Button className="bg-linear-to-br from-[#3eddf1] to-[#0455a7] px-5 py-4 rounded-xl text-xs text-[#071116] hover:bg-cyan-600">
                Read Philosophy & Docs <ArrowUpRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

function DirectoryPreview({
  name,
  accent,
  index,
}: {
  name: string
  accent: "cyan" | "purple" | "green"
  index: number
}) {
  const color =
    accent === "cyan"
      ? "text-cyan-300 border-cyan-300/40"
      : accent === "purple"
      ? "text-fuchsia-300 border-fuchsia-300/40"
      : "text-emerald-300 border-emerald-300/40"

  if (name === "Button")
    return (
      <button
        className={`rounded-lg border bg-slate-800 px-4 py-2 text-xs font-semibold ${color} shadow-sm`}
      >
        Continue <ArrowUpRight className="ml-1 inline" size={12} />
      </button>
    )

  if (name === "Input")
    return (
      <div className="w-full max-w-52.5 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-500">
        you@example.com
      </div>
    )

  if (name === "OTP Input")
    return (
      <div className="flex gap-2">
        {[1, 4, 8, 2].map((n) => (
          <span
            key={n}
            className={`grid size-9 place-items-center rounded-lg border bg-slate-900 font-mono text-sm ${color}`}
          >
            {n}
          </span>
        ))}
      </div>
    )

  if (name === "Naira Input")
    return (
      <div className="flex w-full max-w-50 items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs">
        <span className={color.split(" ")[0]}>₦</span>
        <span className="text-slate-300 font-mono">125,000.00</span>
      </div>
    )

  if (name === "Transaction Status")
    return (
      <div
        className={`flex items-center gap-2 rounded-full border bg-slate-900 px-3 py-1.5 text-xs ${color}`}
      >
        <span className="size-1.5 rounded-full bg-emerald-300" /> Transfer successful
      </div>
    )

  if (name === "Skeleton Loader")
    return (
      <div className="flex w-full max-w-50 flex-col gap-2">
        <span className="h-3 w-2/3 rounded bg-slate-700 animate-pulse" />
        <span className="h-3 w-full rounded bg-slate-800 animate-pulse" />
        <span className="h-3 w-1/2 rounded bg-slate-800 animate-pulse" />
      </div>
    )

  return (
    <div
      className={`relative flex size-24 items-center justify-center rounded-xl border bg-slate-900 text-center text-[10px] ${color}`}
    >
      <span>{name}</span>
      {index % 2 === 0 && (
        <span className="absolute -right-2 -top-2 size-3 rounded-full bg-current opacity-70" />
      )}
    </div>
  )
}
