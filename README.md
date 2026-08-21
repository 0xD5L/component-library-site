# Kinetix — Interfaces with a point of view.

> A growing collection of considered components, motion primitives, and Nigerian fintech UI patterns for building products that feel unmistakably yours.

![Version](https://img.shields.io/badge/version-0.4.2-cyan?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is Kinetix?

Kinetix is an **open-source component library** built in public. It is a small, opinionated layer between your idea and the browser — focused on expressive interfaces, fluid motion, and trust-first fintech patterns.

Every component is built to be:
- **Copied, not installed** — own your UI, don't depend on a black box
- **Opinionated by design** — each component has a clear point of view
- **Accessible by default** — keyboard-navigable and screen-reader friendly
- **Open to everyone** — free for personal and commercial use under MIT

---

## Collections

Kinetix is organized into three focused collections:

### 🔵 Personal Library
Reusable foundations for expressive interfaces.

| Component | Category | Status |
|---|---|---|
| Button | Buttons | Stable |
| Card | Cards | Stable |
| Modal | Overlays | Stable |
| Toast | Overlays | New |
| Input | Forms | Stable |
| Skeleton Loader | Feedback | Stable |

### 🟣 Motion Primitives
Small moments that make interfaces feel alive.

| Component | Category | Status |
|---|---|---|
| Page Transition | Transitions | Beta |
| Tilt Card | Interactive | New |
| Marquee | Content | Stable |

### 🟢 Nigerian Fintech UI Kit
Trust-first patterns for money in motion.

| Component | Category | Status |
|---|---|---|
| OTP Input | Verification | Stable |
| Naira Input | Money | New |
| Transaction Status | Transactions | Stable |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org) | App framework & routing |
| [React 19](https://react.dev) | UI rendering |
| [TypeScript 5.7](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com) | Utility-first styling |
| [tw-animate-css](https://github.com/jamiebuilds/tw-animate-css) | Animation utilities |
| [shadcn/ui](https://ui.shadcn.com) | Primitive component layer |
| [Base UI](https://base-ui.com) | Headless accessible primitives |
| [Lucide React](https://lucide.dev) | Icon system |
| [Zustand](https://zustand-demo.pmnd.rs) | Lightweight global state (theme) |
| [CVA](https://cva.style) | Component variant authoring |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging |

---

## Project Structure

```
kinetix/
├── app/
│   ├── globals.css          # Global styles, design tokens, scrollbar & cursor theming
│   ├── layout.tsx           # Root layout with metadata & favicon config
│   └── page.tsx             # Entry point — renders LibraryDashboard
│
├── components/
│   ├── library-dashboard.tsx # Main dashboard UI (sidebar, header, component grid)
│   └── ui/
│       └── button.tsx        # Button component (CVA variants)
│
├── lib/
│   ├── component-registry.ts # Single source of truth for all components & collections
│   └── utils.ts              # cn() utility (clsx + tailwind-merge)
│
├── public/
│   ├── kinetix-logo.png      # Brand logo used in header & favicon
│   └── pointer.png           # Custom cursor (32x32px)
│
├── components.json           # shadcn/ui configuration
├── next.config.mjs           # Next.js configuration
├── postcss.config.mjs        # PostCSS / Tailwind pipeline
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies & scripts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) >= 18
- [pnpm](https://pnpm.io) (recommended) or npm

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

### 3. Start the dev server

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

## How to Add a Component

All components are registered in a single file — `lib/component-registry.ts`.

### Step 1 — Add your entry to the registry

```ts
// lib/component-registry.ts
export const components: ComponentEntry[] = [
  // ...existing components
  {
    name: 'Badge',
    slug: 'badge',
    description: 'A small label for status and categorisation.',
    category: 'Labels',
    status: 'new',          // 'stable' | 'beta' | 'new'
    collection: 'library',  // 'library' | 'motion' | 'fintech'
    accent: 'cyan',         // 'cyan' | 'purple' | 'green'
  },
]
```

### Step 2 — Add a code snippet (optional)

```ts
export const codeSnippets: Record<string, string> = {
  badge: `<Badge variant="success">Paid</Badge>`,
}
```

### Step 3 — Add a preview (optional)

In `components/library-dashboard.tsx`, add a named branch inside the `Preview` function:

```tsx
if (name === 'Badge')
  return (
    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
      Paid
    </span>
  )
```

That's it — the dashboard picks it up automatically.

---

## Design Decisions

- **Dark-first** — the UI defaults to dark mode via Zustand, with light mode available via toggle
- **Opinionated palette** — OKLCH color tokens throughout for perceptually uniform color
- **Custom scrollbar** — styled via `scrollbar-color` (Firefox) and `::-webkit-scrollbar` (WebKit)
- **Custom cursor** — `pointer.png` served from `public/` and applied globally in CSS
- **No runtime CSS-in-JS** — Tailwind only, no style objects or emotion at runtime
- **Zustand for theme** — avoids React context overhead for a global toggle

---

## Contributing

Kinetix is built in public. Pull requests, issues, and forks are all very welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-component`
3. Commit your changes: `git commit -m 'feat: add Badge component'`
4. Push to your branch: `git push origin feat/my-component`
5. Open a Pull Request

Please follow the existing code style — TypeScript, Tailwind utility classes, and the component-registry pattern.

---

## License

MIT © Kinetix contributors. Copy, remix, and make it yours.

---

<p align="center">Built in public. Interfaces with a point of view.</p>
