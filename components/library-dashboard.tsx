"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { create } from "zustand";
import {
  Search,
  Sun,
  Moon,
  Copy,
  Check,
  ArrowUpRight,
  Command,
  Box,
  Sparkles,
  Landmark,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  components,
  collections,
  categories,
  codeSnippets,
  type CollectionId,
} from "@/lib/component-registry";

type ThemeState = { dark: boolean; toggle: () => void };
const useThemeStore = create<ThemeState>((set) => ({
  dark: true,
  toggle: () => set((state) => ({ dark: !state.dark })),
}));

const accentClass = {
  cyan: "text-cyan-300 border-cyan-400/30 bg-cyan-400/10",
  purple: "text-fuchsia-300 border-fuchsia-400/30 bg-fuchsia-400/10",
  green: "text-emerald-300 border-emerald-400/30 bg-emerald-400/10",
};

export function LibraryDashboard() {
  const [activeCollection, setActiveCollection] =
    useState<CollectionId>("library");
  const [activeCategory, setActiveCategory] = useState("All components");
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [copied, setCopied] = useState(false);
  const { dark, toggle } = useThemeStore();

  const visible = useMemo(
    () =>
      components.filter((item) => {
        const matchesCollection = item.collection === activeCollection;
        const matchesCategory =
          activeCategory === "All components" ||
          item.category === activeCategory;
        const matchesQuery =
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase());
        return matchesCollection && matchesCategory && matchesQuery;
      }),
    [activeCollection, activeCategory, query],
  );

  function copyCode(slug: string) {
    navigator.clipboard?.writeText(codeSnippets[slug] ?? `<${slug} />`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-[#080b10] text-slate-100"
          : "min-h-screen bg-slate-50 text-slate-900"
      }
    >
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-[#080b10]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-375 items-center gap-6 px-5 lg:px-8">
          <button
            onClick={() => setMobileNav(!mobileNav)}
            className="rounded-md p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
            aria-label="Toggle navigation"
          >
            {mobileNav ? <X size={18} /> : <Menu size={18} />}
          </button>
          <a href="#top" className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-lg font-semibold">
              <img src="/kinetix-logo.png" alt="Kinetix" className="size-6" />
              Kinetix
            </span>
          </a>
          <span className="hidden h-5 w-px bg-slate-700 sm:block" />
          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-400" /> v0.4.2{" "}
            <span className="text-slate-700">/</span> local-first
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label className="hidden items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs text-slate-500 md:flex">
              <Search size={14} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search components"
                className="w-36 bg-transparent outline-none placeholder:text-slate-600"
              />
              <kbd className="rounded border border-slate-700 px-1.5 py-0.5 font-mono text-[10px] text-slate-500">
                ⌘ K
              </kbd>
            </label>
            <button
              onClick={toggle}
              className="rounded-lg border border-slate-800 p-2 text-slate-400 hover:border-slate-600 hover:text-slate-100"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Button className="hidden h-9 bg-cyan-300 px-3 text-xs font-semibold text-[#071116] hover:bg-cyan-200 sm:flex">
              <Command data-icon="inline-start" /> Install
            </Button>
          </div>
        </div>
      </header>

      <div id="top" className="mx-auto flex max-w-[1500px]">
        <aside
          className={`${mobileNav ? "absolute inset-x-0 top-16 z-10 block bg-[#080b10]" : "hidden"} w-64 shrink-0 border-r border-slate-800/80 lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:overflow-y-auto`}
        >
          <div className="flex h-full flex-col px-4 py-7">
            <div className="mb-7 px-3">
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-600">
                Collections
              </p>
            </div>
            <nav className="flex flex-col gap-1">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => {
                    setActiveCollection(collection.id);
                    setActiveCategory("All components");
                    setMobileNav(false);
                  }}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${activeCollection === collection.id ? "bg-slate-800/80 text-slate-100" : "text-slate-500 hover:bg-slate-900 hover:text-slate-200"}`}
                >
                  <span
                    className={`size-2 rounded-full ${collection.accent === "cyan" ? "bg-cyan-300" : collection.accent === "purple" ? "bg-fuchsia-300" : "bg-emerald-300"}`}
                  />
                  <span className="flex-1">{collection.label}</span>
                  <span className="font-mono text-[10px] text-slate-600">
                    {collection.count}
                  </span>
                </button>
              ))}
            </nav>
            <div className="mt-10 border-t border-slate-800/70 pt-7">
              <p className="mb-4 px-3 font-mono text-[10px] uppercase tracking-[.2em] text-slate-600">
                Browse by type
              </p>
              <div className="flex flex-col gap-1">
                {["All components", ...categories].map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-md px-3 py-1.5 text-left text-xs ${activeCategory === category ? "text-cyan-300" : "text-slate-500 hover:text-slate-200"}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/50 p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold">
                <Sparkles size={14} className="text-cyan-300" /> Open source
              </div>
              <p className="text-xs leading-relaxed text-slate-500">
                Built in public. Copy, remix, and make it yours.
              </p>
              <button className="mt-4 flex items-center gap-1 text-xs text-slate-300 hover:text-cyan-300">
                View on GitHub <ArrowUpRight size={12} />
              </button>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-10 lg:px-12 lg:py-14">
          <section className="mb-14 max-w-3xl">
            <div className="mb-5 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-cyan-300">
              <span className="size-1.5 rounded-full bg-cyan-300" /> Component
              library
            </div>
            <h1 className="text-balance text-4xl font-semibold tracking-[-.04em] text-slate-50 sm:text-6xl">
              Interfaces with a point of view.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-400">
              A growing collection of considered components, motion primitives,
              and fintech patterns for building products that feel unmistakably
              yours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#components-grid">
                <Button className="bg-linear-to-br from-[#3eddf1] to-[#0455a7] px-4 py-5 rounded-2xl text-sm text-[#071116] hover:bg-cyan-600">
                  Browse components <ChevronRight data-icon="inline-end" />
                </Button>
              </a>
              <Link
                href="/docs"
                className="flex items-center gap-2 rounded-md px-2 py-2 text-sm text-slate-400 transition hover:text-cyan-300"
              >
                Read the philosophy <ArrowUpRight size={15} />
              </Link>
            </div>
          </section>

          <div id="components-grid" className="mb-7 flex items-end justify-between gap-4 border-b border-slate-800 pb-4 scroll-mt-24">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-600">
                01 / collection
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-100">
                {collections.find((c) => c.id === activeCollection)?.label}
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-600">
              {visible.length.toString().padStart(2, "0")} components
            </span>
          </div>
          <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory("All components")}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${activeCategory === "All components" ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-300" : "border-slate-800 text-slate-500 hover:text-slate-200"}`}
            >
              All components
            </button>
            {categories
              .filter((c) =>
                components.some(
                  (item) =>
                    item.collection === activeCollection && item.category === c,
                ),
              )
              .map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs ${activeCategory === category ? "border-cyan-300/50 bg-cyan-300/10 text-cyan-300" : "border-slate-800 text-slate-500 hover:text-slate-200"}`}
                >
                  {category}
                </button>
              ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((item, index) => (
              <article
                key={item.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-slate-800 bg-slate-900/45 transition hover:-translate-y-0.5 hover:border-slate-600"
              >
                <Link
                  href={`/components/${item.slug}`}
                  className="flex min-h-48 items-center justify-center border-b border-slate-800 bg-[#0d1219] p-7 transition group-hover:bg-[#0f1520]"
                >
                  <Preview
                    name={item.name}
                    accent={item.accent}
                    index={index}
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <span
                        className={`rounded-full border px-2 py-1 font-mono text-[9px] uppercase tracking-wider ${accentClass[item.accent]}`}
                      >
                        {item.status}
                      </span>
                      <span className="font-mono text-[10px] text-slate-600">
                        {item.category}
                      </span>
                    </div>
                    <Link
                      href={`/components/${item.slug}`}
                      className="block group-hover:text-cyan-300"
                    >
                      <h3 className="text-base font-semibold text-slate-100 transition group-hover:text-cyan-300">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-slate-800 pt-4">
                    <button
                      onClick={() => copyCode(item.slug)}
                      className="flex items-center gap-2 text-xs text-slate-500 hover:text-cyan-300"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}{" "}
                      {copied ? "Copied" : "Copy snippet"}
                    </button>
                    <Link
                      href={`/components/${item.slug}`}
                      className="flex items-center gap-1 text-xs text-slate-300 transition hover:text-cyan-300"
                    >
                      Explore & Code <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-800 py-20 text-center text-sm text-slate-500">
              No components match that search.
            </div>
          )}
          <section className="mt-20 grid gap-4 border-t border-slate-800 pt-8 md:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-600">
                The system
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                A small, opinionated layer between your idea and the browser.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-600">
                Built with
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                React, Tailwind, accessibility primitives, and a little
                restraint.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-600">
                Last updated
              </p>
              <p className="mt-3 font-mono text-sm text-slate-300">
                AUG 20, 2026 <span className="text-emerald-400">●</span>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function Preview({
  name,
  accent,
  index,
}: {
  name: string;
  accent: "cyan" | "purple" | "green";
  index: number;
}) {
  const color =
    accent === "cyan"
      ? "text-cyan-300 border-cyan-300/40"
      : accent === "purple"
        ? "text-fuchsia-300 border-fuchsia-300/40"
        : "text-emerald-300 border-emerald-300/40";
  if (name === "Button")
    return (
      <button
        className={`rounded-md border bg-slate-800 px-4 py-2 text-xs font-semibold ${color}`}
      >
        Continue <ArrowUpRight className="ml-1 inline" size={12} />
      </button>
    );
  if (name === "Input")
    return (
      <div className="w-full max-w-[210px] rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-600">
        you@example.com
      </div>
    );
  if (name === "OTP Input")
    return (
      <div className="flex gap-2">
        {[1, 4, 8, 2].map((n) => (
          <span
            key={n}
            className={`grid size-9 place-items-center rounded-md border bg-slate-900 font-mono text-sm ${color}`}
          >
            {n}
          </span>
        ))}
      </div>
    );
  if (name === "Naira Input")
    return (
      <div className="flex w-full max-w-[200px] items-center gap-2 rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-xs">
        <span className={color.split(" ")[0]}>₦</span>
        <span className="text-slate-300">125,000.00</span>
      </div>
    );
  if (name === "Transaction Status")
    return (
      <div
        className={`flex items-center gap-2 rounded-full border bg-slate-900 px-3 py-1.5 text-xs ${color}`}
      >
        <span className="size-1.5 rounded-full bg-emerald-300" /> Transfer
        successful
      </div>
    );
  if (name === "Skeleton Loader")
    return (
      <div className="flex w-full max-w-[200px] flex-col gap-2">
        <span className="h-3 w-2/3 rounded bg-slate-700" />
        <span className="h-3 w-full rounded bg-slate-800" />
        <span className="h-3 w-1/2 rounded bg-slate-800" />
      </div>
    );
  return (
    <div
      className={`relative flex size-24 items-center justify-center rounded-xl border bg-slate-900 text-center text-[10px] ${color}`}
    >
      <span>{name}</span>
      {index % 2 === 0 && (
        <span className="absolute -right-2 -top-2 size-3 rounded-full bg-current opacity-70" />
      )}
    </div>
  );
}
