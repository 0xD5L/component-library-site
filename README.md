# Kinetix — Interfaces with a point of view.

> A growing collection of considered components, motion primitives, and Nigerian fintech UI patterns for building products that feel unmistakably yours.

![Version](https://img.shields.io/badge/version-0.4.2-cyan?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is Kinetix?

Kinetix is an **open-source component library** built in public. It is a small, opinionated layer between your idea and the browser — focused on expressive interfaces, tactile motion, and trust-first fintech patterns.

Every component is built to be:
- **Copied, not installed** — own your UI code directly, no lock-in or black box `node_modules`
- **Interactive by default** — test variations, live props, and states in real-time playgrounds
- **Opinionated by design** — considered aesthetics with OKLCH design tokens and deep Obsidian dark mode
- **Accessible & resilient** — WAI-ARIA compliant, keyboard navigable, and built for real-world payment edge cases
- **Open to everyone** — free for personal and commercial use under the MIT license

---

## Key Features & Pages

| Page / Route | Description |
|---|---|
| **`/` (Dashboard)** | Overview of all collections, quick category filtering, animated mobile navigation, and live component preview cards. |
| **`/components` (Directory)** | Comprehensive directory with real-time search, multi-collection filters, status tags (Stable/New/Beta), and Grid/List view switchers. |
| **`/components/[slug]` (Playground)** | Interactive component stage with live controls (props, themes, sizes, variants), 1-click full TSX source code copy, usage examples, and props reference tables. |
| **`/docs` (Philosophy & Manifesto)** | Architectural breakdown, design principles, African fintech UX patterns, OKLCH design tokens, and setup guides. |

---

## Component Collections

Kinetix is organized into three focused collections:

### 🔵 Personal Library
Reusable foundations for expressive, high-contrast interfaces.

| Component | Slug | Category | Status | Description |
|---|---|---|---|---|
| **Button** | `button` | Buttons | `Stable` | Tactical actions with CVA variants, active press feedback, and icon slots. |
| **Card** | `card` | Cards | `Stable` | Quiet surfaces with optional glowing borders and structured sub-components. |
| **Modal** | `modal` | Overlays | `Stable` | Focused dialogs with backdrop blur, scroll locking, and ESC key handlers. |
| **Toast** | `toast` | Overlays | `New` | Transient notifications with semantic styles (success, error, warning, info). |
| **Input** | `input` | Forms | `Stable` | Form fields with leading icons, helper text, and validation error indicators. |
| **Skeleton Loader** | `skeleton-loader` | Feedback | `Stable` | Layout-preserving shimmering placeholders for async loading states. |

### 🟣 Motion Primitives
Small moments that make interfaces feel physical and alive.

| Component | Slug | Category | Status | Description |
|---|---|---|---|---|
| **Page Transition** | `page-transition` | Transitions | `Beta` | Smooth route and tab panel transitions (slide-up, fade, scale). |
| **Tilt Card** | `tilt-card` | Interactive | `New` | 3D cursor angle tracking with specular glare highlights. |
| **Marquee** | `marquee` | Content | `Stable` | Infinite hardware-accelerated ticker with pause-on-hover and edge fade masks. |

### 🟢 Nigerian Fintech UI Kit
Trust-first patterns for money in motion.

| Component | Slug | Category | Status | Description |
|---|---|---|---|---|
| **OTP Input** | `otp-input` | Verification | `Stable` | 4/6-digit verification with auto-advance, SMS clipboard paste, and PIN masking. |
| **Naira Input** | `naira-input` | Money | `New` | Real-time currency comma formatting (₦) with quick amount addition chips. |
| **Transaction Status** | `transaction-status` | Transactions | `Stable` | Detailed receipt cards for Success, Pending, Failed, and Reversed transfers. |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 16 (App Router)](https://nextjs.org) | App framework, dynamic routes & static generation |
| [React 19](https://react.dev) | Modern component rendering |
| [TypeScript 5.7](https://www.typescriptlang.org) | End-to-end type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling with `@theme` design tokens |
| [tw-animate-css](https://github.com/jamiebuilds/tw-animate-css) | Fluid entry & exit animations |
| [Base UI](https://base-ui.com) | Headless, unstyled accessible primitives |
| [Lucide React](https://lucide.dev) | Vector icon set |
| [Zustand](https://zustand-demo.pmnd.rs) | Lightweight state management for theme toggling |
| [CVA](https://cva.style) | Type-safe variant authoring |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Dynamic className composition (`cn`) |

---

## Project Structure

```
kinetix/
├── app/
│   ├── components/
│   │   ├── [slug]/
│   │   │   └── page.tsx        # Dynamic interactive component playground & code page
│   │   └── page.tsx            # Dedicated /components catalog & directory
│   ├── docs/
│   │   └── page.tsx            # Philosophy, architecture & fintech UX guide
│   ├── globals.css             # Global styles, OKLCH tokens, scrollbar & cursor theming
│   ├── layout.tsx              # Root layout with metadata & favicon config
│   └── page.tsx                # Home / Library dashboard entry point
│
├── components/
│   ├── component-playground.tsx # Interactive playground stage & source code viewer
│   ├── library-dashboard.tsx    # Main dashboard UI with animated mobile navigation
│   └── ui/
│       └── button.tsx           # Base Button primitive (CVA variants)
│
├── lib/
│   ├── component-data.ts       # Full TSX source codes, props tables, & installation recipes
│   ├── component-registry.ts   # Single source of truth for all components & collections
│   └── utils.ts                # cn() utility helper (clsx + tailwind-merge)
│
├── public/
│   ├── kinetix-logo.png        # Brand logo used in header & favicon
│   └── pointer.png             # Custom cursor (32×32px)
│
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── postcss.config.mjs          # PostCSS / Tailwind pipeline
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18
- [pnpm](https://pnpm.io) (recommended), npm, or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kinetix.git
cd kinetix
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Run the development server

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
pnpm build
pnpm start
```

---

## How to Consume Components in Your Project

### 1. Install base utilities

```bash
npm i clsx tailwind-merge class-variance-authority lucide-react @base-ui/react
```

### 2. Add the `cn()` helper

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 3. Copy any component TSX

Visit `/components/[slug]`, click **"Copy Component Code"**, paste into your `components/ui/` folder, and import it anywhere:

```tsx
import { NairaInput } from "@/components/ui/naira-input"

export function TransferWidget() {
  const [amount, setAmount] = useState(250000)

  return (
    <NairaInput
      value={amount}
      onChange={setAmount}
      label="Transfer Amount"
    />
  )
}
```

---

## How to Add a New Component to Kinetix

### Step 1 — Register in `lib/component-registry.ts`

```ts
export const components: ComponentEntry[] = [
  // ...
  {
    name: 'Badge',
    slug: 'badge',
    description: 'A tactile status pill with semantic color accents.',
    category: 'Labels',
    status: 'new',
    collection: 'library',
    accent: 'cyan',
  },
]
```

### Step 2 — Add full source & metadata in `lib/component-data.ts`

Add your component's `longDescription`, `installCommand`, `usageCode`, `sourceCode`, and `props` table.

### Step 3 — Add live interactive controls in `components/component-playground.tsx`

Add an interactive live preview case inside `ComponentPlayground` so developers can play with your component in real-time.

---

## Design Decisions & Architecture

- **Dark-first aesthetic** — deep `#080b10` Obsidian base with luminous neon accents (Cyan `#22d3ee`, Fuchsia `#e879f9`, Emerald `#34d399`)
- **OKLCH color space** — ensures uniform lightness and contrast across monitors
- **Zero runtime CSS-in-JS** — pure Tailwind CSS v4 cascade layers with zero runtime overhead
- **Custom scrollbar & cursor** — styled via `scrollbar-color` with WebKit fallbacks and a custom 32×32px cursor
- **Zustand store** — lightweight global state for instantaneous theme toggles

---

## Contributing

Kinetix is built in public for the global and African developer community. Contributions, suggestions, and bug reports are warmly welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-new-component`
3. Commit your changes: `git commit -m 'feat: add Badge component with interactive playground'`
4. Push to the branch: `git push origin feat/my-new-component`
5. Open a Pull Request

---

## License

MIT © Kinetix Contributors. Copy, remix, and build without permission.

---

<p align="center">Built in public. Interfaces with a point of view.</p>
