export interface ComponentProp {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export interface ComponentDetail {
  name: string
  slug: string
  category: string
  status: 'stable' | 'beta' | 'new'
  collection: 'library' | 'motion' | 'fintech'
  accent: 'cyan' | 'purple' | 'green'
  description: string
  longDescription: string
  dependencies: string[]
  installCommand: string
  usageCode: string
  sourceCode: string
  props: ComponentProp[]
  features: string[]
}

export const componentDetails: Record<string, ComponentDetail> = {
  button: {
    name: 'Button',
    slug: 'button',
    category: 'Buttons',
    status: 'stable',
    collection: 'library',
    accent: 'cyan',
    description: 'Actions with clear hierarchy, tactile feedback, and comprehensive variant styling.',
    longDescription: 'A versatile, accessible button primitive powered by Class Variance Authority (CVA) and Base UI. Includes tactile active micro-interactions, responsive icon positioning, loading indicators, and tailored focus rings.',
    dependencies: ['@base-ui/react', 'class-variance-authority', 'clsx', 'tailwind-merge', 'lucide-react'],
    installCommand: 'npm i @base-ui/react class-variance-authority clsx tailwind-merge lucide-react',
    features: [
      '6 design variants: default, outline, secondary, ghost, destructive, and link',
      '7 size scales including compact icon-only options',
      'Built-in slot support for leading and trailing icons',
      'Accessible focus rings with outline-ring offset styling',
      'Automatic tactile translate-y feedback on press',
    ],
    props: [
      { name: 'variant', type: "'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'", defaultValue: "'default'", description: 'Visual style treatment of the button.' },
      { name: 'size', type: "'default' | 'xs' | 'sm' | 'lg' | 'icon' | 'icon-xs' | 'icon-sm' | 'icon-lg'", defaultValue: "'default'", description: 'Size and internal padding dimensions.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Prevents user interactions and dims opacity.' },
      { name: 'className', type: 'string', defaultValue: 'undefined', description: 'Additional custom Tailwind CSS class overrides.' },
      { name: 'children', type: 'React.ReactNode', defaultValue: 'undefined', description: 'Button label or nested element content.' },
    ],
    usageCode: `import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">
        Get Started <ArrowRight className="size-4" />
      </Button>

      <Button variant="outline">
        <Sparkles className="size-4" /> View Docs
      </Button>

      <Button variant="destructive" size="sm">
        Delete item
      </Button>
    </div>
  )
}`,
    sourceCode: `import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm shadow-black/20",
        outline:
          "border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white dark:border-slate-800 dark:bg-slate-900/40",
        secondary:
          "bg-slate-800 text-slate-100 hover:bg-slate-700/90 border border-slate-700/50",
        ghost:
          "hover:bg-slate-800/80 text-slate-300 hover:text-white",
        destructive:
          "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25",
        link: "text-cyan-400 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-2 px-3.5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs [&_svg]:size-3",
        sm: "h-7.5 gap-1.5 rounded-md px-2.5 text-xs [&_svg]:size-3.5",
        lg: "h-11 gap-2.5 px-5 text-base rounded-xl [&_svg]:size-5",
        icon: "size-9",
        "icon-sm": "size-7.5 rounded-md",
        "icon-lg": "size-11 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }`,
  },

  card: {
    name: 'Card',
    slug: 'card',
    category: 'Cards',
    status: 'stable',
    collection: 'library',
    accent: 'cyan',
    description: 'A quiet, high-clarity surface for grouping related content and actions.',
    longDescription: 'Designed for high contrast, dark aesthetic readability, and flexible structuring. Cards support header actions, description blurbs, rich bodies, and pinned footers with seamless border gradients.',
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm i clsx tailwind-merge',
    features: [
      'Segmented sub-components: CardHeader, CardTitle, CardDescription, CardContent, CardFooter',
      'Optional subtle gradient glow on hover',
      'Seamless border highlights that work across dark and light palettes',
      'Responsive internal padding configurations',
    ],
    props: [
      { name: 'className', type: 'string', defaultValue: 'undefined', description: 'Custom classes to append to card container.' },
      { name: 'glow', type: 'boolean', defaultValue: 'false', description: 'Enables interactive subtle border glow on hover.' },
    ],
    usageCode: `import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Account Overview</CardTitle>
        <CardDescription>Monthly spending across wallets</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-slate-100">₦ 1,450,200.00</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">View breakdown</Button>
        <Button size="sm">Add money</Button>
      </CardFooter>
    </Card>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-800/90 bg-slate-900/60 backdrop-blur-sm text-slate-100 shadow-xl shadow-black/30 transition hover:border-slate-700",
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold leading-none tracking-tight text-slate-100", className)} {...props} />
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-slate-400 leading-relaxed", className)} {...props} />
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0", className)} {...props} />
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0 border-t border-slate-800/60 mt-4", className)} {...props} />
}`,
  },

  modal: {
    name: 'Modal',
    slug: 'modal',
    category: 'Overlays',
    status: 'stable',
    collection: 'library',
    accent: 'cyan',
    description: 'Focused interruptions without losing context. Keyboard navigable and accessible.',
    longDescription: 'A lightweight modal dialog that handles background scroll locking, keyboard ESC dismissal, click outside detection, and backdrop blur with smooth scale-in transitions.',
    dependencies: ['lucide-react', 'clsx', 'tailwind-merge'],
    installCommand: 'npm i lucide-react clsx tailwind-merge',
    features: [
      'Accessible focus trap and escape key handler',
      'Backdrop blur with subtle radial gradient glow',
      'Smooth entry and exit animations',
      'Customizable width presets (sm, md, lg, max)',
    ],
    props: [
      { name: 'isOpen', type: 'boolean', defaultValue: 'false', description: 'Controls modal open/close state.' },
      { name: 'onClose', type: '() => void', defaultValue: 'undefined', description: 'Callback triggered when user requests closing.' },
      { name: 'title', type: 'string', defaultValue: 'undefined', description: 'Modal title text displayed in header.' },
    ],
    usageCode: `import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { Button } from "@/components/ui/button"

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Wire Transfer"
      >
        <p className="text-sm text-slate-400">
          Are you sure you want to transfer ₦50,000 to Access Bank?
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </div>
      </Modal>
    </>
  )
}`,
    sourceCode: `import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: ModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-2xl border border-slate-800 bg-[#0d1219] p-6 text-slate-100 shadow-2xl shadow-cyan-950/20 animate-in fade-in zoom-in-95 duration-200",
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div>
            {title && <h2 className="text-lg font-semibold text-slate-100">{title}</h2>}
            {description && <p className="mt-1 text-xs text-slate-400">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
          >
            <X size={16} />
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}`,
  },

  toast: {
    name: 'Toast',
    slug: 'toast',
    category: 'Overlays',
    status: 'new',
    collection: 'library',
    accent: 'cyan',
    description: 'Transient feedback that stays out of the way. Stackable and auto-expiring.',
    longDescription: 'An expressive notification component supporting success, warning, error, and info styles. Features countdown indicators, action buttons, and fluid spring animations.',
    dependencies: ['lucide-react', 'clsx'],
    installCommand: 'npm i lucide-react clsx',
    features: [
      '4 semantic status styles: success, error, warning, and info',
      'Auto-dismiss with configurable timeout',
      'Action button slot with callback support',
      'Floating bottom-right or top-right positioning',
    ],
    props: [
      { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", defaultValue: "'info'", description: 'Semantic type and icon.' },
      { name: 'title', type: 'string', defaultValue: 'undefined', description: 'Primary bold alert summary.' },
      { name: 'message', type: 'string', defaultValue: 'undefined', description: 'Descriptive secondary message.' },
      { name: 'onClose', type: '() => void', defaultValue: 'undefined', description: 'Callback to dismiss toast.' },
    ],
    usageCode: `import { Toast } from "@/components/ui/toast"

export function Example() {
  return (
    <Toast
      type="success"
      title="Transfer Dispatched"
      message="₦250,000 sent to Adeola Johnson. Ref #89342"
      onClose={() => console.log("closed")}
    />
  )
}`,
    sourceCode: `import * as React from "react"
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ToastProps {
  type?: "success" | "error" | "warning" | "info"
  title: string
  message?: string
  onClose?: () => void
  className?: string
}

export function Toast({
  type = "info",
  title,
  message,
  onClose,
  className,
}: ToastProps) {
  const iconMap = {
    success: <CheckCircle2 className="size-4 text-emerald-400" />,
    error: <AlertCircle className="size-4 text-rose-400" />,
    warning: <AlertTriangle className="size-4 text-amber-400" />,
    info: <Info className="size-4 text-cyan-400" />,
  }

  const borderMap = {
    success: "border-emerald-500/30 bg-emerald-950/20",
    error: "border-rose-500/30 bg-rose-950/20",
    warning: "border-amber-500/30 bg-amber-950/20",
    info: "border-cyan-500/30 bg-cyan-950/20",
  }

  return (
    <div
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-md transition-all",
        borderMap[type],
        className
      )}
    >
      <div className="mt-0.5 shrink-0">{iconMap[type]}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-semibold text-slate-100">{title}</h4>
        {message && <p className="mt-0.5 text-xs text-slate-400 leading-relaxed">{message}</p>}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}`,
  },

  input: {
    name: 'Input',
    slug: 'input',
    category: 'Forms',
    status: 'stable',
    collection: 'library',
    accent: 'cyan',
    description: 'A considered starting point for every form. Supports clear buttons, icons, and error states.',
    longDescription: 'Engineered for smooth usability and pristine typography. Includes support for leading/trailing icon adornments, validation error borders, character counters, and accessibility labels.',
    dependencies: ['clsx', 'tailwind-merge', 'lucide-react'],
    installCommand: 'npm i clsx tailwind-merge lucide-react',
    features: [
      'Leading icon and trailing action addon slots',
      'Interactive clear-text quick button',
      'Invalid / Error message indicator animation',
      'Smooth cyan focus glow that matches the design system',
    ],
    props: [
      { name: 'label', type: 'string', defaultValue: 'undefined', description: 'Label text shown above input.' },
      { name: 'error', type: 'string', defaultValue: 'undefined', description: 'Validation error text to display below.' },
      { name: 'placeholder', type: 'string', defaultValue: 'undefined', description: 'Ghost placeholder text.' },
    ],
    usageCode: `import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Example() {
  return (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Email address"
        placeholder="alex@company.com"
        type="email"
      />
      <Input
        label="Search components"
        icon={<Search className="size-4" />}
        placeholder="Type to search..."
      />
    </div>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, icon, type = "text", ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 pointer-events-none text-slate-500">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={cn(
              "w-full rounded-lg border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition",
              "focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20",
              error && "border-rose-500/80 focus:border-rose-400 focus:ring-rose-400/20",
              icon && "pl-9",
              className
            )}
            {...props}
          />
        </div>
        {error ? (
          <p className="text-xs text-rose-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500">{helperText}</p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"`,
  },

  'skeleton-loader': {
    name: 'Skeleton Loader',
    slug: 'skeleton-loader',
    category: 'Feedback',
    status: 'stable',
    collection: 'library',
    accent: 'cyan',
    description: 'Loading states that preserve layout rhythm and prevent jarring content shifts.',
    longDescription: 'Low-contrast pulsing placeholders that mirror final typography and card dimensions, preventing cumulative layout shift (CLS) during data fetching.',
    dependencies: ['clsx', 'tailwind-merge'],
    installCommand: 'npm i clsx tailwind-merge',
    features: [
      'Subtle shimmer animation with adjustable speed',
      'Configurable geometric shapes (text, circle, rounded rectangular card)',
      'Preserves precise spacing rhythm during async state changes',
    ],
    props: [
      { name: 'className', type: 'string', defaultValue: 'undefined', description: 'Defines width, height, and border radius.' },
      { name: 'animate', type: 'boolean', defaultValue: 'true', description: 'Toggles pulse/shimmer animation.' },
    ],
    usageCode: `import { Skeleton } from "@/components/ui/skeleton"

export function Example() {
  return (
    <div className="flex items-center gap-4 p-4 border border-slate-800 rounded-xl">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  )
}`,
    sourceCode: `import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-800/80 dark:bg-slate-800/60",
        className
      )}
      {...props}
    />
  )
}`,
  },

  'page-transition': {
    name: 'Page Transition',
    slug: 'page-transition',
    category: 'Transitions',
    status: 'beta',
    collection: 'motion',
    accent: 'purple',
    description: 'Soft continuity between routes and views with physics-based timing.',
    longDescription: 'A smooth view wrapper component that transitions elements cleanly with subtle blur, translation offsets, and fade-in animations on tab and page route switches.',
    dependencies: ['clsx'],
    installCommand: 'npm i clsx',
    features: [
      'Fade, Slide-Up, and Scale transition presets',
      'Configurable spring timing and stagger delays',
      'Works with Next.js App Router subroutes and tab panels',
    ],
    props: [
      { name: 'variant', type: "'fade' | 'slide-up' | 'scale' | 'blur'", defaultValue: "'slide-up'", description: 'Animation transition profile.' },
      { name: 'children', type: 'React.ReactNode', defaultValue: 'undefined', description: 'Content rendered inside the transitioned container.' },
    ],
    usageCode: `import { PageTransition } from "@/components/ui/page-transition"

export function Example({ viewKey, children }: { viewKey: string; children: React.ReactNode }) {
  return (
    <PageTransition key={viewKey} variant="slide-up">
      {children}
    </PageTransition>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface PageTransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "fade" | "slide-up" | "scale" | "blur"
  children: React.ReactNode
}

export function PageTransition({
  variant = "slide-up",
  children,
  className,
  ...props
}: PageTransitionProps) {
  const variantStyles = {
    fade: "animate-in fade-in duration-300",
    "slide-up": "animate-in fade-in slide-in-from-bottom-4 duration-300 ease-out",
    scale: "animate-in fade-in zoom-in-95 duration-250",
    blur: "animate-in fade-in duration-400 blur-none",
  }

  return (
    <div className={cn("w-full", variantStyles[variant], className)} {...props}>
      {children}
    </div>
  )
}`,
  },

  'tilt-card': {
    name: 'Tilt Card',
    slug: 'tilt-card',
    category: 'Interactive',
    status: 'new',
    collection: 'motion',
    accent: 'purple',
    description: 'A tactile physical 3D perspective response to cursor hover movement.',
    longDescription: 'Tracks mouse coordinates across the card surface in real-time and applies smooth 3D CSS perspective transforms and reflective glare lighting without heavy canvas dependencies.',
    dependencies: ['clsx'],
    installCommand: 'npm i clsx',
    features: [
      'Real-time mouse angle tracking with 3D perspective',
      'Dynamic glare specular reflection highlight',
      'Smooth reset on mouse leave with CSS interpolation',
      'Customizable max tilt angle and depth layers',
    ],
    props: [
      { name: 'maxTilt', type: 'number', defaultValue: '15', description: 'Maximum degrees of rotation along X and Y axes.' },
      { name: 'glare', type: 'boolean', defaultValue: 'true', description: 'Displays dynamic cursor specular highlight.' },
    ],
    usageCode: `import { TiltCard } from "@/components/ui/tilt-card"

export function Example() {
  return (
    <TiltCard maxTilt={18} className="p-8 max-w-sm bg-slate-900 border border-fuchsia-500/30">
      <h3 className="text-lg font-bold text-fuchsia-300">Kinetic Visa Card</h3>
      <p className="mt-4 font-mono text-sm text-slate-400">•••• •••• •••• 4290</p>
      <div className="mt-8 flex justify-between text-xs text-slate-500">
        <span>Adeola Johnson</span>
        <span>08/29</span>
      </div>
    </TiltCard>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  maxTilt?: number
  glare?: boolean
  children: React.ReactNode
}

export function TiltCard({
  maxTilt = 15,
  glare = true,
  children,
  className,
  ...props
}: TiltCardProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)
  const [coords, setCoords] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setCoords({ x, y })
  }

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setCoords({ x: 0, y: 0 })
  }

  const rotateX = coords.y * -maxTilt
  const rotateY = coords.x * maxTilt

  return (
    <div
      style={{ perspective: "1000px" }}
      className="inline-block w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)\`
            : "rotateX(0deg) rotateY(0deg) scale(1)",
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl transition-shadow",
          className
        )}
        {...props}
      >
        {glare && isHovered && (
          <div
            style={{
              background: \`radial-gradient(circle at \${(coords.x + 0.5) * 100}% \${(coords.y + 0.5) * 100}%, rgba(240,171,252,0.15), transparent 60%)\`,
            }}
            className="pointer-events-none absolute inset-0 z-10"
          />
        )}
        <div className="relative z-20">{children}</div>
      </div>
    </div>
  )
}`,
  },

  marquee: {
    name: 'Marquee',
    slug: 'marquee',
    category: 'Content',
    status: 'stable',
    collection: 'motion',
    accent: 'purple',
    description: 'Continuous smooth loop movement for logos, tickers, words, and signals.',
    longDescription: 'High-performance CSS-animated ticker that infinitely loops child items with optional pause-on-hover, speed control, gradient edge fade masks, and reverse direction.',
    dependencies: ['clsx'],
    installCommand: 'npm i clsx',
    features: [
      'Infinite seamless looping with hardware acceleration',
      'Pause on hover support for readable tickers',
      'Left-to-right and right-to-left direction toggles',
      'Built-in linear gradient edge masks for smooth appearance/exit',
    ],
    props: [
      { name: 'speed', type: "'slow' | 'normal' | 'fast'", defaultValue: "'normal'", description: 'Duration and velocity of the scroll animation.' },
      { name: 'pauseOnHover', type: 'boolean', defaultValue: 'true', description: 'Freezes movement when user hovers.' },
      { name: 'reverse', type: 'boolean', defaultValue: 'false', description: 'Reverses scrolling direction.' },
    ],
    usageCode: `import { Marquee } from "@/components/ui/marquee"

export function Example() {
  const partners = ["Paystack", "Flutterwave", "Moniepoint", "Kuda", "PiggyVest", "Nomba"]

  return (
    <Marquee pauseOnHover className="py-4">
      {partners.map((name) => (
        <span key={name} className="mx-6 text-sm font-semibold text-slate-400 hover:text-white">
          {name}
        </span>
      ))}
    </Marquee>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
  reverse?: boolean
  children: React.ReactNode
}

export function Marquee({
  speed = "normal",
  pauseOnHover = true,
  reverse = false,
  children,
  className,
  ...props
}: MarqueeProps) {
  const speedDurations = {
    slow: "45s",
    normal: "25s",
    fast: "12s",
  }

  return (
    <div
      className={cn(
        "group relative flex overflow-hidden mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        style={{
          animationDuration: speedDurations[speed],
          animationDirection: reverse ? "reverse" : "normal",
        }}
        className={cn(
          "flex shrink-0 animate-marquee items-center gap-6",
          pauseOnHover && "group-hover:paused"
        )}
      >
        {children}
        {children}
      </div>
      <div
        aria-hidden="true"
        style={{
          animationDuration: speedDurations[speed],
          animationDirection: reverse ? "reverse" : "normal",
        }}
        className={cn(
          "flex shrink-0 animate-marquee items-center gap-6",
          pauseOnHover && "group-hover:paused"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}`,
  },

  'otp-input': {
    name: 'OTP Input',
    slug: 'otp-input',
    category: 'Verification',
    status: 'stable',
    collection: 'fintech',
    accent: 'green',
    description: 'A calm, legible verification moment with auto-focus, paste, and backspace handling.',
    longDescription: 'Essential for Nigerian 2FA, SMS tokens, and transaction authorization PINs. Handles seamless forward jumping, backward deletion, full clipboard paste, numeric masking, and completion callbacks.',
    dependencies: ['clsx'],
    installCommand: 'npm i clsx',
    features: [
      'Automatic cursor jump to next field upon character input',
      'Backspace handles backward jumps and single cell clearing',
      'Supports full OTP paste from SMS or Authenticator',
      'Configurable length (4, 6, or 8 digits) and secret PIN masking',
    ],
    props: [
      { name: 'length', type: 'number', defaultValue: '4', description: 'Number of input digit cells.' },
      { name: 'onComplete', type: '(otp: string) => void', defaultValue: 'undefined', description: 'Callback fired once all digits are populated.' },
      { name: 'mask', type: 'boolean', defaultValue: 'false', description: 'Obscures numbers as security dots.' },
    ],
    usageCode: `import { OtpInput } from "@/components/ui/otp-input"

export function Example() {
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-400">Enter the 6-digit code sent to +234 803 *** 4912</p>
      <OtpInput
        length={6}
        onComplete={(code) => alert(\`Verifying code: \${code}\`)}
      />
    </div>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface OtpInputProps {
  length?: number
  value?: string
  onChange?: (value: string) => void
  onComplete?: (value: string) => void
  mask?: boolean
  className?: string
}

export function OtpInput({
  length = 4,
  value = "",
  onChange,
  onComplete,
  mask = false,
  className,
}: OtpInputProps) {
  const [internalValue, setInternalValue] = React.useState(value)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const currentVal = value !== undefined ? value : internalValue

  const digits = Array.from({ length }, (_, i) => currentVal[i] || "")

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value
    const char = rawVal.slice(-1)

    if (char && !/^\\d+$/.test(char)) return

    const newDigits = [...digits]
    newDigits[index] = char
    const newOtp = newDigits.join("")

    setInternalValue(newOtp)
    onChange?.(newOtp)

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newOtp.length === length && !newOtp.includes("")) {
      onComplete?.(newOtp)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\\D/g, "").slice(0, length)
    if (!pasted) return
    setInternalValue(pasted)
    onChange?.(pasted)
    if (pasted.length === length) {
      onComplete?.(pasted)
      inputRefs.current[length - 1]?.focus()
    } else {
      inputRefs.current[pasted.length]?.focus()
    }
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type={mask ? "password" : "text"}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digits[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="size-12 rounded-xl border border-slate-800 bg-slate-900/90 text-center font-mono text-lg font-bold text-emerald-300 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
        />
      ))}
    </div>
  )
}`,
  },

  'naira-input': {
    name: 'Naira Input',
    slug: 'naira-input',
    category: 'Money',
    status: 'new',
    collection: 'fintech',
    accent: 'green',
    description: 'Currency entry built for clarity, precision, and confidence in transactions.',
    longDescription: 'A specialized currency component featuring high-contrast ₦ sign styling, automated thousand-separator formatting, quick addition amount chips (+₦5k, +₦10k, +₦50k), and decimal validation.',
    dependencies: ['clsx'],
    installCommand: 'npm i clsx',
    features: [
      'Automatic commas and currency symbol prefix formatting',
      'Quick addition pill presets (+₦5,000, +₦20,000, +₦50,000, +₦100,000)',
      'Raw number and formatted string change callbacks',
      'Max limit and balance warning indicator',
    ],
    props: [
      { name: 'value', type: 'number', defaultValue: '0', description: 'Numeric amount value.' },
      { name: 'onChange', type: '(amount: number) => void', defaultValue: 'undefined', description: 'Callback receiving clean numeric amount.' },
      { name: 'label', type: 'string', defaultValue: "'Amount to Transfer'", description: 'Label heading text.' },
    ],
    usageCode: `import { useState } from "react"
import { NairaInput } from "@/components/ui/naira-input"

export function Example() {
  const [amount, setAmount] = useState(150000)

  return (
    <div className="max-w-md">
      <NairaInput
        value={amount}
        onChange={setAmount}
        label="Send Money"
      />
      <p className="mt-2 text-xs text-slate-500">
        Available Balance: ₦1,240,500.00
      </p>
    </div>
  )
}`,
    sourceCode: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface NairaInputProps {
  value?: number
  onChange?: (val: number) => void
  label?: string
  maxAmount?: number
  presets?: number[]
  className?: string
}

export function NairaInput({
  value = 0,
  onChange,
  label = "Amount",
  maxAmount,
  presets = [5000, 10000, 50000, 100000],
  className,
}: NairaInputProps) {
  const formatNumber = (num: number) => {
    if (!num && num !== 0) return ""
    return new Intl.NumberFormat("en-NG").format(num)
  }

  const [displayValue, setDisplayValue] = React.useState(value ? formatNumber(value) : "")

  React.useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(value ? formatNumber(value) : "")
    }
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "")
    const num = raw ? parseInt(raw, 10) : 0
    setDisplayValue(raw ? formatNumber(num) : "")
    onChange?.(num)
  }

  const handlePresetClick = (addAmount: number) => {
    const current = value || 0
    const nextVal = current + addAmount
    onChange?.(nextVal)
    setDisplayValue(formatNumber(nextVal))
  }

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <label className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center rounded-2xl border border-slate-800 bg-slate-900/90 px-4 py-3.5 transition focus-within:border-emerald-400/80 focus-within:ring-2 focus-within:ring-emerald-400/20">
        <span className="text-xl font-bold text-emerald-400 mr-2 select-none">₦</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="0.00"
          value={displayValue}
          onChange={handleInputChange}
          className="w-full bg-transparent font-mono text-2xl font-bold tracking-tight text-slate-100 placeholder:text-slate-700 outline-none"
        />
      </div>
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => handlePresetClick(preset)}
              className="rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-1 font-mono text-xs text-slate-400 transition hover:border-emerald-500/40 hover:bg-emerald-950/20 hover:text-emerald-300"
            >
              +₦{preset >= 1000 ? \`\${preset / 1000}k\` : preset}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}`,
  },

  'transaction-status': {
    name: 'Transaction Status',
    slug: 'transaction-status',
    category: 'Transactions',
    status: 'stable',
    collection: 'fintech',
    accent: 'green',
    description: 'States that make the outcome and next step crystal clear for financial transfers.',
    longDescription: 'A complete transaction receipt state card covering Successful, Processing/Pending, Failed, and Reversed states. Displays timestamps, reference IDs, beneficiary metadata, and receipt download buttons.',
    dependencies: ['lucide-react', 'clsx'],
    installCommand: 'npm i lucide-react clsx',
    features: [
      '4 distinct state variations: success, pending, failed, reversed',
      'Animated status badge with pulse effect',
      'Complete transfer details breakdown (Recipient, Bank, Ref ID, Fee)',
      'Action triggers for Sharing receipt, Downloading PDF, and Reporting issues',
    ],
    props: [
      { name: 'status', type: "'success' | 'pending' | 'failed' | 'reversed'", defaultValue: "'success'", description: 'Current status outcome of the transaction.' },
      { name: 'amount', type: 'number', defaultValue: 'undefined', description: 'Transaction monetary value in Naira.' },
      { name: 'recipient', type: 'string', defaultValue: 'undefined', description: 'Beneficiary account holder name.' },
      { name: 'reference', type: 'string', defaultValue: 'undefined', description: 'Unique transaction tracking identifier.' },
    ],
    usageCode: `import { TransactionStatus } from "@/components/ui/transaction-status"

export function Example() {
  return (
    <TransactionStatus
      status="success"
      amount={250000}
      recipient="Adeola Johnson"
      bank="GTBank • 0124892110"
      reference="TXN-98420-ADE"
      timestamp="Aug 21, 2026 • 11:42 AM"
    />
  )
}`,
    sourceCode: `import * as React from "react"
import { CheckCircle2, Clock, XCircle, RefreshCw, Copy, Check, ArrowDownLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TransactionStatusProps {
  status: "success" | "pending" | "failed" | "reversed"
  amount: number
  recipient: string
  bank?: string
  reference: string
  timestamp?: string
  className?: string
}

export function TransactionStatus({
  status = "success",
  amount,
  recipient,
  bank,
  reference,
  timestamp = "Today, Just now",
  className,
}: TransactionStatusProps) {
  const [copied, setCopied] = React.useState(false)

  const config = {
    success: {
      label: "Transfer Successful",
      icon: <CheckCircle2 className="size-6 text-emerald-400" />,
      badge: "border-emerald-500/30 bg-emerald-950/30 text-emerald-300",
      accent: "from-emerald-500/10 to-transparent",
    },
    pending: {
      label: "Transfer Pending",
      icon: <Clock className="size-6 text-amber-400 animate-spin" />,
      badge: "border-amber-500/30 bg-amber-950/30 text-amber-300",
      accent: "from-amber-500/10 to-transparent",
    },
    failed: {
      label: "Transfer Failed",
      icon: <XCircle className="size-6 text-rose-400" />,
      badge: "border-rose-500/30 bg-rose-950/30 text-rose-300",
      accent: "from-rose-500/10 to-transparent",
    },
    reversed: {
      label: "Amount Refunded",
      icon: <RefreshCw className="size-6 text-cyan-400" />,
      badge: "border-cyan-500/30 bg-cyan-950/30 text-cyan-300",
      accent: "from-cyan-500/10 to-transparent",
    },
  }[status]

  const copyRef = () => {
    navigator.clipboard.writeText(reference)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div
      className={cn(
        "relative max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1219] p-6 text-slate-100 shadow-2xl",
        className
      )}
    >
      <div className={cn("absolute inset-x-0 top-0 h-32 bg-linear-to-b opacity-50", config.accent)} />
      
      <div className="relative flex flex-col items-center text-center">
        <div className="grid size-14 place-items-center rounded-2xl border border-slate-800 bg-slate-900 shadow-inner">
          {config.icon}
        </div>
        
        <span className={cn("mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold", config.badge)}>
          {config.label}
        </span>

        <h3 className="mt-3 font-mono text-3xl font-bold tracking-tight text-white">
          ₦{new Intl.NumberFormat("en-NG", { minimumFractionDigits: 2 }).format(amount)}
        </h3>
        <p className="mt-1 text-xs text-slate-400">Sent to {recipient}</p>
      </div>

      <div className="mt-6 space-y-3 border-t border-slate-800/80 pt-5 text-xs">
        {bank && (
          <div className="flex justify-between text-slate-400">
            <span>Destination Bank</span>
            <span className="font-medium text-slate-200">{bank}</span>
          </div>
        )}
        <div className="flex justify-between text-slate-400">
          <span>Date & Time</span>
          <span className="text-slate-200">{timestamp}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Transaction Ref</span>
          <button
            onClick={copyRef}
            className="flex items-center gap-1 font-mono text-slate-300 hover:text-cyan-300"
          >
            {reference} {copied ? <Check size={12} /> : <Copy size={12} />}
          </button>
        </div>
      </div>
    </div>
  )
}`,
  },
}
