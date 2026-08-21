import Link from "next/link"
import { ArrowLeft, Box, Compass, Search, Home, Layers, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const suggestedComponents = [
    { name: "Button", slug: "button", collection: "library" },
    { name: "Naira Input", slug: "naira-input", collection: "fintech" },
    { name: "OTP Input", slug: "otp-input", collection: "fintech" },
    { name: "Tilt Card", slug: "tilt-card", collection: "motion" },
    { name: "Marquee", slug: "marquee", collection: "motion" },
  ]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#080b10] px-4 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background glow overlay */}
      <div className="pointer-events-none absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-xl text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-cyan-300">
          <span className="size-1.5 rounded-full bg-cyan-300 animate-pulse" />
          404 / Route Not Found
        </div>

        {/* Large Status Display */}
        <h1 className="mt-6 font-mono text-7xl font-extrabold tracking-tight text-white sm:text-8xl">
          <span className="bg-linear-to-b from-white via-slate-200 to-slate-600 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
          Component or page not found.
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          The requested interface URL does not exist in the Kinetix registry. It might have been moved, renamed, or is currently under active development.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <Button className="bg-linear-to-br from-[#3eddf1] to-[#0455a7] px-5 py-5 rounded-xl text-sm font-semibold text-[#071116] hover:bg-cyan-600">
              <Home size={15} /> Return Home
            </Button>
          </Link>

          <Link href="/components">
            <Button variant="outline" className="border-slate-800 bg-slate-900/60 px-4 py-5 rounded-xl text-sm text-slate-200 hover:border-slate-700 hover:text-white">
              <Layers size={15} /> Browse Components
            </Button>
          </Link>

          <Link href="/docs">
            <Button variant="ghost" className="px-3 py-5 text-sm text-slate-400 hover:text-cyan-300">
              <Compass size={15} /> Documentation
            </Button>
          </Link>
        </div>

        {/* Popular Components Quick Links */}
        <div className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 backdrop-blur-sm">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            Popular Primitives & Kits
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {suggestedComponents.map((item) => (
              <Link
                key={item.slug}
                href={`/components/${item.slug}`}
                className="rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Branding Footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600">
          <img src="/kinetix-logo.png" alt="Kinetix" className="size-4 opacity-70" />
          <span>Kinetix UI • Interfaces with a point of view</span>
        </div>
      </div>
    </div>
  )
}
