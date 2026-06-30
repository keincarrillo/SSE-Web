# SSE-Web

Single-page marketing site for Smile Studio Experts (dental clinic). Vite + React + TypeScript, deployed on Vercel.

## Dev commands

- `bun dev` — start Vite dev server
- `bun run build` — typecheck (`tsc -b`) then build
- `bun run lint` — ESLint (flat config, ignores `dist/`)

No test suite exists. No formatter config (no Prettier).

## Stack specifics

- **React 19** with **React Compiler** (via `babel-plugin-react-compiler` + `@rolldown/plugin-babel` in `vite.config.ts`). Do not wrap effects in manual memoization — the compiler handles it.
- **Tailwind CSS v4** — imported via `@import 'tailwindcss'` in `src/index.css`. Custom theme tokens (colors, fonts) defined in `@theme` block there. Use `var(--color-*)` and `var(--font-*)` in CSS, or the Tailwind utility classes.
- **GSAP + ScrollTrigger** for scroll animations. Elements animate via `data-gsap` attributes (`fade-up`, `fade-in`, `fade-left`, `fade-right`, `line`, `scale`). Initial states are set in CSS (`src/index.css` lines 45-67). Do not remove those CSS rules.
- **Lenis** for smooth scrolling. Initialized in `useLenis` hook, exposed as `window.__lenis`. Scroll-to-top in `App.tsx` depends on this global.
- **react-router-dom v7** with `BrowserRouter`. Two routes: `/` (home) and `/servicios`. `vercel.json` rewrites all paths to `index.html` for SPA.

## Code organization

- `src/components/` — each section is a folder (`Hero/`, `Navbar/`, `Services/`, etc.) with a single `.tsx` file. Components are section-level, not reusable UI primitives.
- `src/components/components.css` — shared typography classes (`display-title`, `display-lg`, etc.). Use these instead of raw Tailwind font utilities for headings.
- `src/hooks/` — `useLenis` (smooth scroll) and `useScrollReveal` (GSAP scroll animations). `useScrollReveal` returns a ref to attach to the section container.
- `src/pages/ServicesPage.tsx` — the only page component beyond the home route.
- `src/assets/` — SVG logos (black/white variants for navbar).

## Conventions

- Language is Spanish (UI text, component names like `Servicios`, `Equipo`, `Testimonios`).
- No state management library. Local state only.
- No API calls or data fetching — all content is hardcoded in components.
- `src/data/` directory exists but is empty.
- GSAP animations use `gsap.context()` for cleanup. Always wrap GSAP effects in context and return `ctx.revert()`.
- The Navbar animates its inner `<div>`, never the `<header>` itself (backdrop-filter rendering issue on iOS Safari — see comment in `Navbar.tsx:16`).
