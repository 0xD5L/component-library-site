"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Copy,
  Check,
  Code,
  Eye,
  Terminal,
  Layers,
  Sparkles,
  Sliders,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Info,
  ShieldCheck,
  CreditCard,
  Zap,
  ArrowUpRight,
  Lock,
  ArrowDownLeft,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  AlertTriangle,
  Send,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { componentDetails, type ComponentDetail } from "@/lib/component-data"
import { components } from "@/lib/component-registry"

// Custom preview components implementation
export function ComponentPlayground({ slug }: { slug: string }) {
  const comp = componentDetails[slug] || componentDetails["button"]
  const [activeTab, setActiveTab] = useState<"preview" | "code" | "usage" | "install">("preview")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [previewDark, setPreviewDark] = useState(true)

  // Interactive controls states for different components
  // Button controls
  const [buttonVariant, setButtonVariant] = useState<"default" | "outline" | "secondary" | "ghost" | "destructive" | "link">("default")
  const [buttonSize, setButtonSize] = useState<"default" | "xs" | "sm" | "lg" | "icon">("default")
  const [buttonLoading, setButtonLoading] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("Confirm Action")
  const [buttonClickCount, setButtonClickCount] = useState(0)

  // Card controls
  const [cardGlow, setCardGlow] = useState(true)
  const [cardFooter, setCardFooter] = useState(true)

  // Modal controls
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Toast controls
  const [toasts, setToasts] = useState<Array<{ id: number; type: "success" | "error" | "warning" | "info"; title: string; message: string }>>([
    { id: 1, type: "success", title: "Transfer Successful", message: "₦250,000 sent to GTBank • 0124892110" },
  ])

  // Input controls
  const [inputValue, setInputValue] = useState("")
  const [inputError, setInputError] = useState("")
  const [inputIcon, setInputIcon] = useState(true)
  const [inputHelper, setInputHelper] = useState(true)

  // Skeleton controls
  const [skeletonLoaded, setSkeletonLoaded] = useState(false)

  // Page transition controls
  const [transitionTab, setTransitionTab] = useState<"overview" | "metrics" | "security">("overview")
  const [transitionVariant, setTransitionVariant] = useState<"slide-up" | "fade" | "scale">("slide-up")

  // Tilt card controls
  const [tiltMax, setTiltMax] = useState(15)
  const [tiltGlare, setTiltGlare] = useState(true)

  // Marquee controls
  const [marqueeSpeed, setMarqueeSpeed] = useState<"slow" | "normal" | "fast">("normal")
  const [marqueePause, setMarqueePause] = useState(true)
  const [marqueeReverse, setMarqueeReverse] = useState(false)

  // OTP Input controls
  const [otpLength, setOtpLength] = useState(4)
  const [otpValue, setOtpValue] = useState("")
  const [otpMask, setOtpMask] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)

  // Naira input controls
  const [nairaAmount, setNairaAmount] = useState(150000)

  // Transaction status controls
  const [txnStatus, setTxnStatus] = useState<"success" | "pending" | "failed" | "reversed">("success")

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedCode(type)
    setTimeout(() => setCopiedCode(null), 1800)
  }

  const addToast = (type: "success" | "error" | "warning" | "info") => {
    const messages = {
      success: { title: "Payment Received", message: "Account credited with ₦18,500 from Paystack." },
      error: { title: "Transaction Declined", message: "Insufficient funds in Nigerian Naira wallet." },
      warning: { title: "Session Expiring", message: "Your KYC authorization token will expire in 2 minutes." },
      info: { title: "Scheduled Maintenance", message: "NIBSS instant payment service maintenance at 02:00 AM." },
    }
    const newToast = { id: Date.now(), type, ...messages[type] }
    setToasts((prev) => [newToast, ...prev.slice(0, 2)])
  }

  // Related components in the same or other collections
  const relatedComponents = components.filter((c) => c.slug !== comp.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#080b10] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top sticky navigation bar */}
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
              <span className="capitalize text-slate-400">{comp.collection}</span>
              <ChevronRight size={12} />
              <span className="text-slate-200 font-medium">{comp.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copyToClipboard(comp.sourceCode, "header-copy")}
              className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-300"
            >
              {copiedCode === "header-copy" ? (
                <>
                  <Check size={13} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied Full Source</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Source TSX</span>
                </>
              )}
            </button>

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

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Component Header Information */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <span
              className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                comp.accent === "cyan"
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-300"
                  : comp.accent === "purple"
                  ? "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300"
                  : "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
              }`}
            >
              {comp.status}
            </span>
            <span className="font-mono text-xs text-slate-500">
              Collection: <strong className="capitalize text-slate-300">{comp.collection}</strong>
            </span>
            <span className="text-slate-700">•</span>
            <span className="font-mono text-xs text-slate-500">
              Category: <strong className="text-slate-300">{comp.category}</strong>
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {comp.name}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
            {comp.longDescription}
          </p>

          {/* Quick feature list */}
          <div className="mt-6 flex flex-wrap gap-2">
            {comp.features.map((feature, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800/80 bg-slate-900/50 px-3 py-1 text-xs text-slate-300"
              >
                <Sparkles size={12} className="text-cyan-400" />
                {feature}
              </span>
            ))}
          </div>
        </section>

        {/* Tabs: Interactive Playground vs Source Code vs Usage vs Install */}
        <div className="mb-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "preview"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye size={15} /> Interactive Playground
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "code"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Code size={15} /> Component Source (TSX)
            </button>
            <button
              onClick={() => setActiveTab("usage")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "usage"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers size={15} /> How to Use
            </button>
            <button
              onClick={() => setActiveTab("install")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${
                activeTab === "install"
                  ? "border-cyan-400 text-cyan-300"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Terminal size={15} /> Install & Dependencies
            </button>
          </div>

          <div className="hidden items-center gap-2 text-xs text-slate-500 sm:flex">
            <span>Ready to copy & paste</span>
          </div>
        </div>

        {/* TAB CONTENT 1: INTERACTIVE PLAYGROUND */}
        {activeTab === "preview" && (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Live Interactive Stage (8 cols) */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="flex items-center justify-between rounded-t-2xl border border-slate-800 bg-[#0c1017] px-5 py-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-rose-500/80" />
                  <span className="size-2.5 rounded-full bg-amber-500/80" />
                  <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 font-mono text-xs text-slate-400">Live Component Demo</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDark(!previewDark)}
                    className="flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200"
                  >
                    {previewDark ? <Sun size={13} /> : <Moon size={13} />}
                    <span>{previewDark ? "Dark View" : "Light View"}</span>
                  </button>
                </div>
              </div>

              {/* Playground Stage Area */}
              <div
                className={`relative flex min-h-110 flex-1 items-center justify-center rounded-b-2xl border border-t-0 border-slate-800 p-8 transition-colors ${
                  previewDark
                    ? "bg-[#090d14] text-slate-100"
                    : "bg-slate-100 text-slate-900"
                }`}
              >
                {/* Specific Live Component Renderers */}
                {comp.slug === "button" && (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div className="p-4">
                      <Button
                        variant={buttonVariant}
                        size={buttonSize}
                        disabled={buttonDisabled}
                        onClick={() => {
                          if (buttonLoading) return
                          setButtonClickCount((c) => c + 1)
                        }}
                        className={`transition-all ${
                          buttonVariant === "default"
                            ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                            : ""
                        }`}
                      >
                        {buttonLoading && (
                          <RefreshCw className="mr-2 size-4 animate-spin text-current" />
                        )}
                        <Sparkles className="mr-1.5 size-4" />
                        <span>{buttonText}</span>
                      </Button>
                    </div>
                    {buttonClickCount > 0 && (
                      <p className="font-mono text-xs text-cyan-400">
                        Triggered click event: {buttonClickCount} {buttonClickCount === 1 ? "time" : "times"}!
                      </p>
                    )}
                  </div>
                )}

                {comp.slug === "card" && (
                  <div
                    className={`w-full max-w-sm rounded-2xl border p-6 transition-all ${
                      cardGlow
                        ? "border-cyan-500/40 bg-slate-900/90 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                        : "border-slate-800 bg-slate-900/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        Tier 1 Account
                      </span>
                      <ShieldCheck className="size-4 text-emerald-400" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">Savings Vault</h3>
                    <p className="mt-1 text-xs text-slate-400">
                      Interest yield 14.5% p.a. locked for 90 days.
                    </p>
                    <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-950/60 p-4">
                      <p className="text-[11px] uppercase tracking-wider text-slate-500">
                        Available Balance
                      </p>
                      <p className="mt-1 font-mono text-2xl font-bold text-white">
                        ₦ 2,840,500.00
                      </p>
                    </div>
                    {cardFooter && (
                      <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4">
                        <span className="text-xs text-slate-400">Auto-renewal active</span>
                        <Button size="sm" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                          Withdraw
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {comp.slug === "modal" && (
                  <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-xs text-slate-400">
                      Click the trigger button below to launch the modal dialog.
                    </p>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
                    >
                      <Zap className="mr-2 size-4" /> Open Verification Modal
                    </Button>

                    {isModalOpen && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div
                          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                          onClick={() => setIsModalOpen(false)}
                        />
                        <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-800 bg-[#0d1219] p-6 text-slate-100 shadow-2xl animate-in fade-in zoom-in-95">
                          <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold text-white">Authorize Wire Transfer</h3>
                            <button
                              onClick={() => setIsModalOpen(false)}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="mt-2 text-xs text-slate-400">
                            Transferring <strong>₦250,000.00</strong> to <strong>Adeola Johnson (Kuda Bank)</strong>.
                          </p>
                          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-3.5 text-xs text-slate-300 space-y-1">
                            <div className="flex justify-between">
                              <span className="text-slate-500">Transfer Fee</span>
                              <span>₦10.75</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-500">VAT (7.5%)</span>
                              <span>₦0.81</span>
                            </div>
                          </div>
                          <div className="mt-6 flex justify-end gap-3">
                            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                              onClick={() => setIsModalOpen(false)}
                            >
                              Confirm & Send
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {comp.slug === "toast" && (
                  <div className="flex flex-col items-center gap-6 text-center w-full max-w-md">
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => addToast("success")}>
                        Trigger Success
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addToast("error")}>
                        Trigger Error
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addToast("warning")}>
                        Trigger Warning
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => addToast("info")}>
                        Trigger Info
                      </Button>
                    </div>

                    <div className="w-full space-y-2.5">
                      {toasts.map((t) => (
                        <div
                          key={t.id}
                          className={`flex items-start gap-3 rounded-xl border p-4 text-left shadow-lg backdrop-blur-md transition-all ${
                            t.type === "success"
                              ? "border-emerald-500/30 bg-emerald-950/40"
                              : t.type === "error"
                              ? "border-rose-500/30 bg-rose-950/40"
                              : t.type === "warning"
                              ? "border-amber-500/30 bg-amber-950/40"
                              : "border-cyan-500/30 bg-cyan-950/40"
                          }`}
                        >
                          <div className="mt-0.5">
                            {t.type === "success" && <CheckCircle2 className="size-4 text-emerald-400" />}
                            {t.type === "error" && <AlertCircle className="size-4 text-rose-400" />}
                            {t.type === "warning" && <AlertTriangle className="size-4 text-amber-400" />}
                            {t.type === "info" && <Info className="size-4 text-cyan-400" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xs font-semibold text-white">{t.title}</h4>
                            <p className="mt-0.5 text-xs text-slate-300">{t.message}</p>
                          </div>
                          <button
                            onClick={() => setToasts((prev) => prev.filter((item) => item.id !== t.id))}
                            className="text-slate-400 hover:text-white"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {comp.slug === "input" && (
                  <div className="w-full max-w-sm space-y-3">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Merchant Account Email
                    </label>
                    <div className="relative flex items-center">
                      {inputIcon && (
                        <span className="absolute left-3.5 text-slate-500">
                          <Send size={15} />
                        </span>
                      )}
                      <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                          if (e.target.value.includes("@") || e.target.value === "") {
                            setInputError("")
                          } else {
                            setInputError("Please provide a valid email address.")
                          }
                        }}
                        placeholder="adeola@kinetix.design"
                        className={`w-full rounded-xl border bg-slate-900/90 py-2.5 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition ${
                          inputIcon ? "pl-10 pr-4" : "px-4"
                        } ${
                          inputError
                            ? "border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
                            : "border-slate-800 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20"
                        }`}
                      />
                    </div>
                    {inputError ? (
                      <p className="text-xs text-rose-400">{inputError}</p>
                    ) : inputHelper ? (
                      <p className="text-xs text-slate-500">Used for transaction confirmation notices.</p>
                    ) : null}
                  </div>
                )}

                {comp.slug === "skeleton-loader" && (
                  <div className="w-full max-w-md">
                    <div className="mb-4 flex justify-between items-center">
                      <span className="text-xs text-slate-400">Toggle simulated async state</span>
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => setSkeletonLoaded(!skeletonLoaded)}
                      >
                        {skeletonLoaded ? "Show Loading Skeleton" : "Show Loaded State"}
                      </Button>
                    </div>

                    {!skeletonLoaded ? (
                      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                        <div className="flex items-center gap-4">
                          <div className="size-12 rounded-full bg-slate-800 animate-pulse" />
                          <div className="space-y-2 flex-1">
                            <div className="h-4 w-3/5 rounded bg-slate-800 animate-pulse" />
                            <div className="h-3 w-2/5 rounded bg-slate-800/60 animate-pulse" />
                          </div>
                        </div>
                        <div className="space-y-2 pt-2">
                          <div className="h-3 w-full rounded bg-slate-800 animate-pulse" />
                          <div className="h-3 w-4/5 rounded bg-slate-800/80 animate-pulse" />
                        </div>
                        <div className="flex justify-between pt-2">
                          <div className="h-8 w-24 rounded-lg bg-slate-800 animate-pulse" />
                          <div className="h-8 w-20 rounded-lg bg-slate-800/60 animate-pulse" />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 animate-in fade-in duration-300">
                        <div className="flex items-center gap-4">
                          <div className="grid size-12 place-items-center rounded-full bg-linear-to-tr from-cyan-400 to-blue-600 font-bold text-slate-950">
                            AJ
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">Adeola Johnson</h4>
                            <p className="text-xs text-slate-400">adeola@kinetix.design</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Primary administrator of Nigerian Fintech Workspace. Active since August 2026.
                        </p>
                        <div className="flex justify-between items-center border-t border-slate-800/60 pt-3">
                          <span className="text-xs text-emerald-400">KYC Verified Level 3</span>
                          <Button size="xs" className="bg-cyan-400 text-slate-950">Manage</Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {comp.slug === "page-transition" && (
                  <div className="w-full max-w-md space-y-4">
                    <div className="flex gap-2 border-b border-slate-800 pb-2">
                      {(["overview", "metrics", "security"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setTransitionTab(tab)}
                          className={`rounded-lg px-3 py-1.5 text-xs capitalize transition ${
                            transitionTab === tab
                              ? "bg-fuchsia-500/20 text-fuchsia-300 font-medium"
                              : "text-slate-400 hover:text-white"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    <div
                      key={transitionTab}
                      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 animate-in fade-in slide-in-from-bottom-3 duration-300"
                    >
                      {transitionTab === "overview" && (
                        <div>
                          <h4 className="font-bold text-white">System Overview</h4>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            99.99% uptime across all Nigerian payment routing nodes. Real-time settlement active.
                          </p>
                        </div>
                      )}
                      {transitionTab === "metrics" && (
                        <div>
                          <h4 className="font-bold text-fuchsia-300">Live Traffic & Volume</h4>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            12,480 API queries processed in the last 60 seconds with 8ms p95 latency.
                          </p>
                        </div>
                      )}
                      {transitionTab === "security" && (
                        <div>
                          <h4 className="font-bold text-emerald-400">2FA & Multi-sig Status</h4>
                          <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                            Hardware security modules online. Zero unauthorized intrusion attempts recorded.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {comp.slug === "tilt-card" && (
                  <div
                    style={{ perspective: "1000px" }}
                    className="w-full max-w-sm"
                  >
                    <div
                      className="group relative overflow-hidden rounded-2xl border border-fuchsia-500/30 bg-linear-to-br from-slate-900 via-[#130d22] to-slate-950 p-6 shadow-2xl transition hover:shadow-fuchsia-500/10"
                    >
                      {tiltGlare && (
                        <div className="pointer-events-none absolute -inset-full opacity-0 transition group-hover:opacity-30 group-hover:bg-linear-to-tr group-hover:from-transparent group-hover:via-fuchsia-300 group-hover:to-transparent" />
                      )}
                      <div className="flex items-center justify-between">
                        <CreditCard className="size-6 text-fuchsia-400" />
                        <span className="font-mono text-xs font-bold text-fuchsia-300">Kinetix Platinum</span>
                      </div>
                      <div className="mt-10 font-mono text-base tracking-widest text-slate-200">
                        5399 •••• •••• 8841
                      </div>
                      <div className="mt-6 flex justify-between text-xs text-slate-400">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-slate-500">Cardholder</p>
                          <p className="font-medium text-slate-200">ADEOLA JOHNSON</p>
                        </div>
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-slate-500">Expires</p>
                          <p className="font-medium text-slate-200">08/30</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {comp.slug === "marquee" && (
                  <div className="w-full overflow-hidden space-y-4">
                    <div className="relative overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
                      <div
                        className={`flex gap-6 whitespace-nowrap animate-marquee ${
                          marqueePause ? "hover:[animation-play-state:paused]" : ""
                        }`}
                        style={{
                          animationDirection: marqueeReverse ? "reverse" : "normal",
                          animationDuration:
                            marqueeSpeed === "fast" ? "12s" : marqueeSpeed === "slow" ? "40s" : "22s",
                        }}
                      >
                        {["Paystack", "Flutterwave", "Moniepoint", "Kuda", "PiggyVest", "Nomba", "Opay", "PalmPay"].map(
                          (name, idx) => (
                            <span
                              key={idx}
                              className="rounded-xl border border-slate-800 bg-slate-900/80 px-4 py-2 text-xs font-semibold text-slate-300 shadow-sm hover:border-fuchsia-400/50 hover:text-fuchsia-300"
                            >
                              ⚡ {name}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <p className="text-center text-xs text-slate-500">
                      Hover over the elements to test pause-on-hover effect.
                    </p>
                  </div>
                )}

                {comp.slug === "otp-input" && (
                  <div className="flex flex-col items-center gap-6 text-center">
                    <div>
                      <h4 className="font-semibold text-white">Enter SMS Authorization Code</h4>
                      <p className="mt-1 text-xs text-slate-400">
                        Type any digits into the boxes below (supports paste).
                      </p>
                    </div>

                    <div className="flex gap-2.5">
                      {Array.from({ length: otpLength }).map((_, i) => (
                        <input
                          key={i}
                          type={otpMask ? "password" : "text"}
                          inputMode="numeric"
                          maxLength={1}
                          value={otpValue[i] || ""}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "")
                            const arr = otpValue.split("")
                            arr[i] = val
                            const res = arr.join("").slice(0, otpLength)
                            setOtpValue(res)
                            if (res.length === otpLength) setOtpVerified(true)
                          }}
                          className="size-12 rounded-xl border border-slate-800 bg-slate-900/90 text-center font-mono text-lg font-bold text-emerald-400 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                        />
                      ))}
                    </div>

                    {otpVerified && (
                      <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20 px-3 py-1.5 text-xs text-emerald-300 animate-in fade-in">
                        <CheckCircle2 size={14} /> PIN Verified successfully!
                      </div>
                    )}
                  </div>
                )}

                {comp.slug === "naira-input" && (
                  <div className="w-full max-w-sm space-y-4">
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Amount to Transfer
                    </label>
                    <div className="relative flex items-center rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3 transition focus-within:border-emerald-400/80 focus-within:ring-2 focus-within:ring-emerald-400/20">
                      <span className="text-xl font-bold text-emerald-400 mr-2 select-none">₦</span>
                      <input
                        type="text"
                        value={new Intl.NumberFormat("en-NG").format(nairaAmount)}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, "")
                          setNairaAmount(raw ? parseInt(raw, 10) : 0)
                        }}
                        className="w-full bg-transparent font-mono text-2xl font-bold tracking-tight text-white placeholder:text-slate-700 outline-none"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[5000, 10000, 50000, 100000].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setNairaAmount((prev) => prev + preset)}
                          className="rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-1 font-mono text-xs text-slate-400 transition hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:text-emerald-300"
                        >
                          +₦{preset >= 1000 ? `${preset / 1000}k` : preset}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {comp.slug === "transaction-status" && (
                  <div className="w-full max-w-md">
                    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1219] p-6 text-slate-100 shadow-2xl">
                      <div className="flex flex-col items-center text-center">
                        <div className="grid size-14 place-items-center rounded-2xl border border-slate-800 bg-slate-900 shadow-inner">
                          {txnStatus === "success" && <CheckCircle2 className="size-7 text-emerald-400" />}
                          {txnStatus === "pending" && <RefreshCw className="size-7 text-amber-400 animate-spin" />}
                          {txnStatus === "failed" && <AlertCircle className="size-7 text-rose-400" />}
                          {txnStatus === "reversed" && <RotateCcw className="size-7 text-cyan-400" />}
                        </div>

                        <span
                          className={`mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${
                            txnStatus === "success"
                              ? "border-emerald-500/30 bg-emerald-950/30 text-emerald-300"
                              : txnStatus === "pending"
                              ? "border-amber-500/30 bg-amber-950/30 text-amber-300"
                              : txnStatus === "failed"
                              ? "border-rose-500/30 bg-rose-950/30 text-rose-300"
                              : "border-cyan-500/30 bg-cyan-950/30 text-cyan-300"
                          }`}
                        >
                          Transfer {txnStatus}
                        </span>

                        <h3 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white">
                          ₦ 250,000.00
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">Sent to Adeola Johnson</p>
                      </div>

                      <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-5 text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Destination Bank</span>
                          <span className="font-medium text-slate-200">GTBank • 0124892110</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Date & Time</span>
                          <span className="text-slate-200">Aug 21, 2026 • 11:42 AM</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-400">
                          <span>Reference ID</span>
                          <span className="font-mono text-slate-300">TXN-892410-ADE</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Live Controls Sidebar (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <Sliders size={15} className="text-cyan-400" />
                    <h3 className="text-sm font-semibold text-white">Component Controls</h3>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">Live</span>
                </div>

                <div className="mt-4 space-y-4">
                  {comp.slug === "button" && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-400">Variant</label>
                        <div className="mt-2 grid grid-cols-3 gap-1.5">
                          {(["default", "outline", "secondary", "ghost", "destructive", "link"] as const).map(
                            (v) => (
                              <button
                                key={v}
                                onClick={() => setButtonVariant(v)}
                                className={`rounded-lg border px-2 py-1 text-xs capitalize transition ${
                                  buttonVariant === v
                                    ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                    : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                                }`}
                              >
                                {v}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400">Size</label>
                        <div className="mt-2 grid grid-cols-4 gap-1.5">
                          {(["xs", "sm", "default", "lg"] as const).map((s) => (
                            <button
                              key={s}
                              onClick={() => setButtonSize(s)}
                              className={`rounded-lg border px-2 py-1 text-xs uppercase transition ${
                                buttonSize === s
                                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                                  : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-400">Button Text</label>
                        <input
                          type="text"
                          value={buttonText}
                          onChange={(e) => setButtonText(e.target.value)}
                          className="mt-1.5 w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-white outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                        <span className="text-xs text-slate-400">Loading State</span>
                        <input
                          type="checkbox"
                          checked={buttonLoading}
                          onChange={(e) => setButtonLoading(e.target.checked)}
                          className="accent-cyan-400"
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Disabled State</span>
                        <input
                          type="checkbox"
                          checked={buttonDisabled}
                          onChange={(e) => setButtonDisabled(e.target.checked)}
                          className="accent-cyan-400"
                        />
                      </div>
                    </>
                  )}

                  {comp.slug === "card" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Cyan Glow Border</span>
                        <input
                          type="checkbox"
                          checked={cardGlow}
                          onChange={(e) => setCardGlow(e.target.checked)}
                          className="accent-cyan-400"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Show Card Footer</span>
                        <input
                          type="checkbox"
                          checked={cardFooter}
                          onChange={(e) => setCardFooter(e.target.checked)}
                          className="accent-cyan-400"
                        />
                      </div>
                    </>
                  )}

                  {comp.slug === "otp-input" && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-400">PIN Length</label>
                        <div className="mt-2 flex gap-2">
                          {[4, 6].map((l) => (
                            <button
                              key={l}
                              onClick={() => {
                                setOtpLength(l)
                                setOtpValue("")
                                setOtpVerified(false)
                              }}
                              className={`flex-1 rounded-lg border py-1.5 text-xs transition ${
                                otpLength === l
                                  ? "border-emerald-400 bg-emerald-400/10 text-emerald-300"
                                  : "border-slate-800 bg-slate-900 text-slate-400"
                              }`}
                            >
                              {l} Digits
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-400">Mask Digits (PIN Mode)</span>
                        <input
                          type="checkbox"
                          checked={otpMask}
                          onChange={(e) => setOtpMask(e.target.checked)}
                          className="accent-emerald-400"
                        />
                      </div>
                    </>
                  )}

                  {comp.slug === "transaction-status" && (
                    <div>
                      <label className="block text-xs font-medium text-slate-400">Transaction Status</label>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {(["success", "pending", "failed", "reversed"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => setTxnStatus(st)}
                            className={`rounded-lg border py-1.5 text-xs capitalize transition ${
                              txnStatus === st
                                ? "border-emerald-400 bg-emerald-400/10 text-emerald-300 font-semibold"
                                : "border-slate-800 bg-slate-900 text-slate-400 hover:text-white"
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {comp.slug === "marquee" && (
                    <>
                      <div>
                        <label className="block text-xs font-medium text-slate-400">Scroll Velocity</label>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          {(["slow", "normal", "fast"] as const).map((sp) => (
                            <button
                              key={sp}
                              onClick={() => setMarqueeSpeed(sp)}
                              className={`rounded-lg border py-1.5 text-xs capitalize transition ${
                                marqueeSpeed === sp
                                  ? "border-fuchsia-400 bg-fuchsia-400/10 text-fuchsia-300 font-semibold"
                                  : "border-slate-800 bg-slate-900 text-slate-400"
                              }`}
                            >
                              {sp}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-slate-400">Pause on Hover</span>
                        <input
                          type="checkbox"
                          checked={marqueePause}
                          onChange={(e) => setMarqueePause(e.target.checked)}
                          className="accent-fuchsia-400"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">Reverse Direction</span>
                        <input
                          type="checkbox"
                          checked={marqueeReverse}
                          onChange={(e) => setMarqueeReverse(e.target.checked)}
                          className="accent-fuchsia-400"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quick Snippet Box */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">Quick Usage Snippet</span>
                  <button
                    onClick={() => copyToClipboard(comp.usageCode, "quick-snippet")}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-cyan-300"
                  >
                    {copiedCode === "quick-snippet" ? <Check size={12} /> : <Copy size={12} />}
                    <span>{copiedCode === "quick-snippet" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
                <pre className="mt-3 overflow-x-auto rounded-xl border border-slate-800 bg-[#070a0f] p-3 font-mono text-[11px] text-slate-300 leading-relaxed">
                  <code>{comp.usageCode}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: COMPONENT SOURCE CODE (TSX) */}
        {activeTab === "code" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-[#0c1017] px-6 py-4">
              <div>
                <p className="font-mono text-xs text-slate-400">Target File Path</p>
                <p className="font-mono text-sm font-semibold text-cyan-300">
                  components/ui/{comp.slug}.tsx
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(comp.sourceCode, "full-source-tab")}
                className="flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {copiedCode === "full-source-tab" ? (
                  <>
                    <Check size={14} /> Copied Source Code!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Component Code
                  </>
                )}
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-[#070a0f]">
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-2.5 text-xs text-slate-500 font-mono">
                <span>TypeScript React (TSX)</span>
                <span>{comp.sourceCode.split("\n").length} lines</span>
              </div>
              <pre className="overflow-x-auto p-6 font-mono text-xs text-slate-200 leading-relaxed">
                <code>{comp.sourceCode}</code>
              </pre>
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: USAGE GUIDE */}
        {activeTab === "usage" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">How to import and consume</h3>
                <button
                  onClick={() => copyToClipboard(comp.usageCode, "usage-tab-copy")}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs text-slate-300 hover:text-cyan-300"
                >
                  {copiedCode === "usage-tab-copy" ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedCode === "usage-tab-copy" ? "Copied" : "Copy Code"}</span>
                </button>
              </div>
              <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-[#070a0f] p-4 font-mono text-xs text-slate-300 leading-relaxed">
                <code>{comp.usageCode}</code>
              </pre>
            </div>

            {/* Props table */}
            <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6">
              <h3 className="text-base font-bold text-white mb-4">Props & API Reference</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-500 font-mono">
                      <th className="pb-3 pr-4 font-semibold">Prop</th>
                      <th className="pb-3 pr-4 font-semibold">Type</th>
                      <th className="pb-3 pr-4 font-semibold">Default</th>
                      <th className="pb-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {comp.props.map((p) => (
                      <tr key={p.name} className="hover:bg-slate-900/30">
                        <td className="py-3 pr-4 font-mono font-semibold text-cyan-300">{p.name}</td>
                        <td className="py-3 pr-4 font-mono text-slate-400">{p.type}</td>
                        <td className="py-3 pr-4 font-mono text-slate-500">{p.defaultValue || "—"}</td>
                        <td className="py-3 text-slate-300">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: INSTALLATION */}
        {activeTab === "install" && (
          <div className="space-y-6 max-w-3xl">
            <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6">
              <h3 className="text-base font-bold text-white">1. Install Required Dependencies</h3>
              <p className="mt-1 text-xs text-slate-400">
                Run this command in your terminal to install the necessary packages.
              </p>
              <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-[#070a0f] px-4 py-3 font-mono text-xs text-slate-200">
                <span>{comp.installCommand}</span>
                <button
                  onClick={() => copyToClipboard(comp.installCommand, "install-cmd")}
                  className="text-slate-400 hover:text-cyan-300"
                >
                  {copiedCode === "install-cmd" ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0c1017] p-6">
              <h3 className="text-base font-bold text-white">2. Create Component File</h3>
              <p className="mt-1 text-xs text-slate-400">
                Create a new file at <code>components/ui/{comp.slug}.tsx</code> and paste the source code into it.
              </p>
              <button
                onClick={() => copyToClipboard(comp.sourceCode, "install-source-copy")}
                className="mt-4 flex items-center gap-2 rounded-xl bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                {copiedCode === "install-source-copy" ? <Check size={14} /> : <Copy size={14} />}
                <span>Copy {comp.name} Source Code</span>
              </button>
            </div>
          </div>
        )}

        {/* Related components section */}
        <section className="mt-16 border-t border-slate-800 pt-10">
          <h2 className="text-xl font-bold text-white">Explore Other Components</h2>
          <p className="mt-1 text-xs text-slate-400">More considered UI patterns and motion primitives.</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedComponents.map((item) => (
              <Link
                key={item.slug}
                href={`/components/${item.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 hover:bg-slate-900/70"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase text-slate-500">{item.category}</span>
                  <ArrowUpRight size={14} className="text-slate-500 transition group-hover:text-cyan-300 group-hover:translate-x-0.5" />
                </div>
                <h3 className="mt-2 text-base font-semibold text-white group-hover:text-cyan-300">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
