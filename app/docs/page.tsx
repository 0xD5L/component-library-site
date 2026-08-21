"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Sparkles,
  BookOpen,
  Compass,
  Code2,
  Cpu,
  Layers,
  Palette,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  ChevronRight,
  ArrowUpRight,
  Terminal,
  HeartHandshake,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("philosophy")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyText = (text: string, id: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 1600)
  }

  const sections = [
    { id: "philosophy", label: "Core Philosophy", icon: Compass },
    { id: "principles", label: "Design Principles", icon: Lightbulb },
    { id: "fintech-ux", label: "Fintech & Money UX", icon: ShieldCheck },
    { id: "architecture", label: "Architecture & Stack", icon: Cpu },
    { id: "copy-not-install", label: "Copy, Don't Install", icon: Code2 },
    { id: "tokens", label: "Colors & OKLCH Tokens", icon: Palette },
    { id: "getting-started", label: "Getting Started", icon: Terminal },
    { id: "contributing", label: "Contributing & Open Source", icon: HeartHandshake },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#080b10] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top sticky navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#080b10]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300 transition hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <ArrowLeft size={14} className="transition group-hover:-translate-x-0.5" />
              <span>Back to Library</span>
            </Link>
            <span className="hidden h-4 w-px bg-slate-800 sm:block" />
            <div className="hidden items-center gap-2 text-xs text-slate-500 md:flex">
              <span>Documentation</span>
              <ChevronRight size={12} />
              <span className="text-cyan-300 font-medium">Philosophy & Guide</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
            >
              <span>Explore Components</span>
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

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Sidebar Table of Contents (sticky on desktop) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-24 space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-slate-500 mb-3">
                  Table of Contents
                </p>
                <nav className="flex flex-col space-y-1">
                  {sections.map((sec) => {
                    const Icon = sec.icon
                    const isSelected = activeSection === sec.id
                    return (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition ${
                          isSelected
                            ? "bg-cyan-500/10 text-cyan-300 font-semibold border-l-2 border-cyan-400"
                            : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                        }`}
                      >
                        <Icon size={14} className={isSelected ? "text-cyan-400" : "text-slate-500"} />
                        <span>{sec.label}</span>
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Sparkles size={14} className="text-cyan-300" />
                  <span>Open Source Manifesto</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  Every pattern in Kinetix is released under the MIT license. Fork it, tweak the tokens, and build without permission.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Docs Content */}
          <main className="lg:col-span-9 space-y-16">
            {/* Hero / Introduction */}
            <section className="border-b border-slate-800 pb-12">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.2em] text-cyan-300">
                <span className="size-1.5 rounded-full bg-cyan-300" /> Manifesto & Architecture
              </div>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Interfaces with a point of view.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-300 max-w-3xl">
                Most modern design systems are built for corporate neutrality — sanitized, safe, and indistinguishable from one another. <strong>Kinetix is different.</strong> It is an opinionated, tactile design toolkit built for expressive web products and African fintech applications where precision, clarity, and trust matter most.
              </p>
            </section>

            {/* SECTION 1: Core Philosophy */}
            <section id="philosophy" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <Compass className="size-5 text-cyan-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">1. Core Philosophy</h2>
              </div>
              <p className="text-sm leading-relaxed text-slate-300">
                When building modern web apps, the interface is not a passive canvas — it is the bridge between a human's intent and a system's execution. We believe:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <div className="flex items-center gap-2 font-semibold text-cyan-300 text-sm">
                    <Zap size={16} /> Tactile Over Sterile
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    A button should feel like you pressed something real. Active states trigger <code>translate-y-px</code> shifts; focus states reveal luminous rings; motion primitives preserve spatial orientation.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <div className="flex items-center gap-2 font-semibold text-fuchsia-300 text-sm">
                    <Layers size={16} /> Considered Restraint
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    Vibrant neon accents (Cyan, Fuchsia, Emerald) are used deliberately as signals and focus points, while background surfaces maintain a deep, calm, high-contrast dark foundation.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <div className="flex items-center gap-2 font-semibold text-emerald-300 text-sm">
                    <ShieldCheck size={16} /> Zero-Doubt Financial States
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    When money is in transit, users shouldn't wonder if a payment went through. Every status, transaction reference, and verification step is designed to inspire total confidence.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                  <div className="flex items-center gap-2 font-semibold text-amber-300 text-sm">
                    <Code2 size={16} /> Direct Code Ownership
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    No bloated npm packages that lock you into upstream breaking changes. Copy the TSX source code, customize the Tailwind utilities, and fit it directly into your own design system.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 2: Design Principles */}
            <section id="principles" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <Lightbulb className="size-5 text-fuchsia-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">2. Design Principles</h2>
              </div>
              
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800/90 bg-[#0c1017] p-6 space-y-3">
                  <h3 className="text-base font-semibold text-white">Rule 1: Visual Hierarchy Over Information Density</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every screen has one primary job. We use OKLCH color intensity and monospace sub-headers to guide the eye naturally to the primary action before any secondary controls.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800/90 bg-[#0c1017] p-6 space-y-3">
                  <h3 className="text-base font-semibold text-white">Rule 2: Physics-Based Continuity</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sudden pop-ins make interfaces feel cheap. Overlays zoom in at 95% scale with cubic-bezier easings; tilt cards smoothly calculate specular glare based on mouse coordinates; marquee tickers maintain continuous velocity without layout stutter.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800/90 bg-[#0c1017] p-6 space-y-3">
                  <h3 className="text-base font-semibold text-white">Rule 3: Respect the Keyboard & Screen Readers</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every interactive primitive in Kinetix (Modals, Buttons, OTP inputs, Dropdowns) is fully accessible via keyboard shortcuts (<code>Tab</code>, <code>Escape</code>, <code>Enter</code>, <code>Space</code>) and announces dynamic state changes cleanly to assistive technologies.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Fintech & Money UX */}
            <section id="fintech-ux" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-5 text-emerald-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">3. Nigerian & African Fintech UX Patterns</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Building financial software in emerging markets requires solving unique edge cases: intermittent network connectivity, USSD/SMS 2FA token friction, distinct currency notations, and high anxiety around instant settlement.
              </p>

              <div className="grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-2">
                  <div className="text-emerald-400 font-mono text-xl font-bold">₦ 250,000.00</div>
                  <h4 className="text-xs font-semibold text-white">Real-Time Currency Formatting</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Naira inputs automatically handle digit groupings, preserve decimal precision, and offer quick addition chips (+₦5k, +₦10k, +₦50k).
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-2">
                  <div className="text-emerald-400 font-mono text-xl font-bold">[ 4 • 9 • 1 • 2 ]</div>
                  <h4 className="text-xs font-semibold text-white">Resilient OTP & PIN Input</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Supports instant SMS clipboard pasting, auto-advancing focus, backward deletion, and secret masking for bank authorization.
                  </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-2">
                  <div className="text-emerald-400 font-mono text-xl font-bold">TXN-892410-ADE</div>
                  <h4 className="text-xs font-semibold text-white">Crystal-Clear Status Cards</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Separate states for Success, Processing, Failed, and Reversed with 1-click reference copying to resolve bank dispute tickets rapidly.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 4: Architecture & Stack */}
            <section id="architecture" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <Cpu className="size-5 text-cyan-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">4. Architecture & Technology Stack</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Kinetix is built on top of modern web standards with zero runtime CSS-in-JS overhead:
              </p>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-[#0c1017]">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-slate-800 bg-slate-900/60 font-mono text-slate-400">
                    <tr>
                      <th className="p-4 font-semibold">Technology</th>
                      <th className="p-4 font-semibold">Role in Kinetix</th>
                      <th className="p-4 font-semibold">Why We Chose It</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="p-4 font-semibold text-cyan-300">Next.js 16 + React 19</td>
                      <td className="p-4">Framework & Server Components</td>
                      <td className="p-4 text-slate-400">Blazing fast compilation, App Router nested layouts, and static optimization.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-cyan-300">Tailwind CSS v4</td>
                      <td className="p-4">Utility-First Styling Engine</td>
                      <td className="p-4 text-slate-400">Instant builds, native CSS cascade layers, and zero CSS runtime overhead.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-cyan-300">Base UI & Radix Primitives</td>
                      <td className="p-4">Headless Accessibility Layer</td>
                      <td className="p-4 text-slate-400">Guarantees WAI-ARIA compliance, focus trapping, and keyboard controls.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-cyan-300">Class Variance Authority (CVA)</td>
                      <td className="p-4">Type-Safe Component Variants</td>
                      <td className="p-4 text-slate-400">Declarative, type-checked size and color variant permutations.</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold text-cyan-300">Lucide React</td>
                      <td className="p-4">Consistent Vector Iconography</td>
                      <td className="p-4 text-slate-400">Crisp, tree-shakeable icons with uniform 24x24 grid strokes.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* SECTION 5: Copy, Don't Install */}
            <section id="copy-not-install" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <Code2 className="size-5 text-amber-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">5. The "Copy, Don't Install" Model</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Traditional component libraries are distributed as black-box <code>node_modules</code> packages. This creates three major issues:
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4">
                  <span className="text-xs font-semibold text-rose-400">Problem 1</span>
                  <h4 className="mt-1 text-sm font-semibold text-white">Dependency Bloat</h4>
                  <p className="mt-1 text-xs text-slate-400">You inherit hundreds of nested transitive dependencies you never asked for.</p>
                </div>
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4">
                  <span className="text-xs font-semibold text-rose-400">Problem 2</span>
                  <h4 className="mt-1 text-sm font-semibold text-white">Styling Prison</h4>
                  <p className="mt-1 text-xs text-slate-400">Overriding encapsulated styles requires awkward <code>!important</code> rules or custom theme providers.</p>
                </div>
                <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4">
                  <span className="text-xs font-semibold text-rose-400">Problem 3</span>
                  <h4 className="mt-1 text-sm font-semibold text-white">Breaking Upgrades</h4>
                  <p className="mt-1 text-xs text-slate-400">A minor package bump unexpectedly breaks your production checkout flow.</p>
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-6 text-xs text-slate-300 space-y-3">
                <h4 className="font-semibold text-cyan-300 text-sm">How Kinetix Works Instead</h4>
                <p className="leading-relaxed">
                  You copy the raw TypeScript component file directly into your own codebase (e.g. <code>components/ui/button.tsx</code>). You own every line of HTML and Tailwind CSS. Want to change a hover color from Cyan to Emerald? Edit line 12 directly — no pull request, no theme provider wrapper, no lock-in.
                </p>
              </div>
            </section>

            {/* SECTION 6: Colors & OKLCH Tokens */}
            <section id="tokens" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <Palette className="size-5 text-fuchsia-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">6. Colors & OKLCH Design Tokens</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Kinetix leverages the modern <code>oklch()</code> color space for perceptually uniform lightness and chroma across both dark and light modes:
              </p>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-slate-800 bg-[#080b10] p-4">
                  <div className="h-10 rounded-lg bg-[#080b10] border border-slate-700" />
                  <p className="mt-2 font-mono text-xs font-semibold text-white">Background</p>
                  <p className="font-mono text-[10px] text-slate-500">#080b10 • Deep Obsidian</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="h-10 rounded-lg bg-[#22d3ee] shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
                  <p className="mt-2 font-mono text-xs font-semibold text-cyan-300">Accent Cyan</p>
                  <p className="font-mono text-[10px] text-slate-500">Personal Library Foundation</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="h-10 rounded-lg bg-[#e879f9] shadow-[0_0_15px_rgba(232,121,249,0.3)]" />
                  <p className="mt-2 font-mono text-xs font-semibold text-fuchsia-300">Accent Purple</p>
                  <p className="font-mono text-[10px] text-slate-500">Motion & Primitives</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="h-10 rounded-lg bg-[#34d399] shadow-[0_0_15px_rgba(52,211,153,0.3)]" />
                  <p className="mt-2 font-mono text-xs font-semibold text-emerald-300">Accent Green</p>
                  <p className="font-mono text-[10px] text-slate-500">Fintech Settlement & Trust</p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Getting Started */}
            <section id="getting-started" className="scroll-mt-24 space-y-6">
              <div className="flex items-center gap-2">
                <Terminal className="size-5 text-cyan-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">7. Getting Started</h2>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-white">Step 1: Install base utility dependencies</h3>
                  <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#070a0f] p-3 font-mono text-xs text-slate-200">
                    <code>npm i clsx tailwind-merge class-variance-authority lucide-react @base-ui/react</code>
                    <button
                      onClick={() =>
                        copyText(
                          "npm i clsx tailwind-merge class-variance-authority lucide-react @base-ui/react",
                          "dep-copy"
                        )
                      }
                      className="text-slate-400 hover:text-cyan-300"
                    >
                      {copiedCode === "dep-copy" ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-white">Step 2: Add the <code>cn()</code> utility helper</h3>
                  <p className="text-xs text-slate-400">
                    Create <code>lib/utils.ts</code> in your project root:
                  </p>
                  <div className="rounded-xl border border-slate-800 bg-[#070a0f] p-4 font-mono text-xs text-slate-200">
                    <pre>
{`import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`}
                    </pre>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6 space-y-3">
                  <h3 className="text-sm font-semibold text-white">Step 3: Browse, explore, and copy components</h3>
                  <p className="text-xs text-slate-400">
                    Visit any component page in the library dashboard, test it live in the interactive playground, and copy its full source code.
                  </p>
                  <div className="pt-2">
                    <Link href="/">
                      <Button className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                        Browse 12+ Components <ChevronRight size={14} className="ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 8: Contributing */}
            <section id="contributing" className="scroll-mt-24 space-y-6 pb-16">
              <div className="flex items-center gap-2">
                <HeartHandshake className="size-5 text-cyan-400" />
                <h2 className="text-2xl font-bold tracking-tight text-white">8. Contributing & Open Source</h2>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Kinetix is an open-source collaboration. If you've designed a novel motion primitive, an expressive form input, or a resilient payment component, we'd love to include it!
              </p>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-4">
                <h4 className="text-sm font-semibold text-white">How to contribute a component:</h4>
                <ol className="list-decimal list-inside space-y-2 text-xs text-slate-400 leading-relaxed">
                  <li>Fork the repository on GitHub and create a new feature branch.</li>
                  <li>Register your component metadata in <code>lib/component-registry.ts</code>.</li>
                  <li>Add complete source code, props references, and usage examples to <code>lib/component-data.ts</code>.</li>
                  <li>Add an interactive live preview inside <code>components/component-playground.tsx</code>.</li>
                  <li>Submit a Pull Request with a short video or screenshot of your component in action!</li>
                </ol>
              </div>

              <div className="flex items-center justify-between border-t border-slate-800 pt-8">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-300"
                >
                  <ArrowLeft size={14} /> Back to Dashboard
                </Link>

                <p className="font-mono text-xs text-slate-500">
                  MIT License © 2026 Kinetix UI
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
