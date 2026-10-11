# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for Mian Muhammad Abubakar, deployed on Vercel at `https://mian-abubakar.vercel.app/`.

Stack: Vite 7, React 19, TypeScript, TanStack Router (file-based), Tailwind CSS v4, `motion` (animation), `three` (scroll-synced particle scene, lazy-loaded), `@radix-ui/react-icons`, self-hosted Geist fonts, and Vercel Analytics. There is no component library.

## Commands

```bash
npm run dev        # Vite dev server (client render, no prerender)
npm run build      # client build + SSR build + prerender of "/" into dist/index.html
npm run preview    # serve the built dist/ (use this to check hydration)
npm run lint       # eslint . (Prettier runs as an ESLint rule)
npm run format     # prettier --write .
npx tsc --noEmit   # type check (vite build does not type check)
```

There is no test suite.

## Architecture

- **Prerendering:** `npm run build` runs three steps:
  1. `vite build` for the client.
  2. `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
  3. `scripts/prerender.mjs`, which renders `<HomePage/>` to a string, injects it into `<div id="root">` in `dist/index.html`, and deletes `dist-ssr/`.
- **Client entry:** `src/main.tsx` hydrates `<HomePage/>` directly when the path is `/` and the root already has markup. Otherwise it client-renders the TanStack `RouterProvider`, which covers the dev server and 404s.
- **Why the home page bypasses the router:** the router wraps lazy routes in a `<Suspense>` on the client but not on the server. That caused hydration mismatches (React #418). Keep `entry-server.tsx` and the hydrate branch in `main.tsx` rendering the same tree.
- **Hydration-safe components:** anything in `HomePage` must render identically on the server and on the first client render. Read `window`/`navigator`/`localStorage` only inside effects. The theme toggle renders both icons and lets CSS pick one, for the same reason.
- **Routing:** `@tanstack/router-plugin/vite` generates `src/routes/routeTree.gen.ts` from `src/routes/`. Don't hand-edit that file. `src/routes/index.tsx` just mounts `HomePage`, and `__root.tsx` holds the 404 and error components.
- **Page composition:** `src/components/portfolio/HomePage.tsx` stacks, in reviewer-reading order: Nav, Hero, Story (agents stage with the metrics row, brain stage), Projects, Experience, Skills (titled "Stack"), About (portrait and education), Contact (with footer). It is wrapped in `ErrorBoundary`, so a runtime error shows a reload prompt instead of React unmounting the page.
  - Section ids (`top`, `story-agents`, `story-brain`, `projects`, `experience`, `skills`, `about`, `contact`) are public anchors and particle anchors; keep them stable. Nav labels and ids come from `SECTIONS` in `src/lib/site.ts`, which also holds contact details and `CONTACT_LABEL` (the one label used for every contact CTA).
  - Nav is a floating glass pill. It highlights the active section with an IntersectionObserver (no scroll listeners), has a mobile menu below `lg`, and owns the ⌘K `CommandMenu` (a native `<dialog>`). Command items' `run()` may return a status string; anything else is ignored. Keep `run` bodies in braces: `element.scrollIntoView()` returns a Promise in current Chrome, and rendering that object crashed the page (React #31).
  - Shared primitives: `Section`, `Reveal` (motion scroll-reveal, `blur` variant) and `Tag` in `ui.tsx`; button classes in `buttons.ts`; `spotlightHandlers()` in `spotlight.ts`.
- **Content is hardcoded:** copy and data live as arrays inside each section component.
  - The source of truth for the content is the PDFs in `src/assets/`: `Mian_Abubakar_Resume.pdf`, `Mian_Abubakar_Resume_Detailed.pdf` and `Mian_Abubakar_Projects.pdf`. Keep the site consistent with them. The years of experience and the project count appear in the Hero, Story metrics, About, `index.html` and `public/llms.txt`.
  - In `Projects.tsx`, the 3 featured projects carry a `flow` rendered by `ArchitectureDiagram` (real system components, no fake screenshots). The other 9 are grouped into `clusters` (one hairline per cluster), each with a short `summary` plus `details` in a native `<details>`. Client websites are a horizontal scroll-snap row.
- **Documents and analytics:** the PDFs are imported as assets in `src/lib/documents.ts`, which also exports `trackDownload` and `trackContact`. These wrap `@vercel/analytics`, and custom events need a Vercel Pro plan. `<Analytics/>` is mounted in `main.tsx`.
- **Styling/theme:** Tailwind v4 is configured entirely in `src/styles.css`. There is no `tailwind.config`.
  - The design language is "spatial glass": a deep near-black canvas with a slow aurora glow (`.aurora`) and fixed film grain (`.grain`) mounted once in `HomePage`, content on frosted glass panels (`.panel`), and one accent (`accent` #5e6ad2, `accent-text` for accent-colored text). Tokens: surfaces `bg`, `surface-1..3`; lines `line`, `line-strong`, `--glass-border`; ink `ink`, `ink-muted`, `ink-subtle`, `ink-faint` (`ink-faint` is below 4.5:1, decorative only). `.text-lit` is the gradient display-headline treatment.
  - Particle story (whole page): `ParticleField.tsx` mounts a fixed full-screen canvas behind the page and lazy-imports `particleScene.ts` (plain three.js) on idle. Every particle stores a position per formation: 0 orb (hero), 1 spiral (`#story-agents`), 2 brain (`#story-brain`), 3 data wave (`#projects`), 4 double helix (`#experience`), 5 lattice (`#skills`), 6 globe with Lahore/Dubai/London (`#about`), 7 orb (`#contact`). The vertex shader evaluates only the two formations being blended (`uMorph`), with a dimmed burst mid-transition. Each morph runs across a band of 70% of the viewport centred where the next section's top crosses mid-screen, so every section gets a stretch where its shape holds; progress is smoothed for inertia. Per-formation `INTENSITY` keeps shapes dimmer behind dense content. Formation positions are in viewport space (the offsets in `layout()`), so place them in empty margins or behind glass. 48k particles desktop, 16k under 768px; still frames under reduced motion; re-colours on theme change. Without WebGL only the `.hero-glow` CSS fallback shows.
  - Text over particles uses `.scrim` (soft background-coloured halo) and `.legible` (text shadow); gradient `.text-lit` text opts out of the shadow. Story and section titles use blur-to-sharp reveals (`Focus` in `Story.tsx`, `Reveal blur`, `.enter-blur` for the hero headline).
  - Cards with `.spotlight` + `spotlightHandlers()` get a cursor light and small 3D tilt by writing CSS variables directly (no React state); mouse only, disabled under reduced motion.
  - Write only the standard `backdrop-filter` property. Lightning CSS (Tailwind v4) collapses a hand-written `-webkit-backdrop-filter` + `backdrop-filter` pair down to the prefixed one, which Chrome ignores, and the glass silently loses its blur.
  - Dark is the default. Light mode overrides the same variables under `:root[data-theme="light"]`; an inline script in `index.html` applies a saved theme before first paint, and `src/lib/theme.ts` toggles it.
  - Shape system: 10px controls, 16px cards, 22px large panels and media (`--radius-control/card/media`); the nav, chips and nav controls are full pills. `.enter` is the CSS-only entrance for above-the-fold content (keeps LCP independent of JS).
  - Copy rules from the design pass: no em or en dashes, no middle-dot separators, curly apostrophes, sentence case.
  - Motion: `motion/react` for scroll reveals and the diagram draw-in, under `<MotionConfig reducedMotion="user">`; a `prefers-reduced-motion` CSS block covers the rest (aurora drift, entrances, tilt).
  - Responsive grids need an explicit `grid-cols-1` base (minmax(0,1fr)), or long unbreakable text widens the column and gets clipped by the page's `overflow-x-clip`.
  - Geist and Geist Mono are self-hosted via `@fontsource-variable/*` imports in `main.tsx`.
- **Images:** the portrait is `src/assets/abubakar.webp`. Keep images as compressed WebP (`cwebp` is available).

## SEO / deployment

- Static metadata lives in `index.html`: title, description, Open Graph/Twitter tags, canonical URL, and JSON-LD `Person` with `sameAs` links to LinkedIn and GitHub. `public/` holds `robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.png` and `favicon.svg`.
- If contact details or the domain change, update `index.html`, `public/llms.txt`, `public/robots.txt`, `public/sitemap.xml` and `src/lib/site.ts`.
- `vercel.json` runs `npm run build`, serves `dist/`, and rewrites unknown paths to `/index.html`. Real files such as the sitemap and PDFs are served before the rewrite applies.

## Conventions

- Prettier settings: 100-character lines, double quotes, semicolons, trailing commas.
- The lockfile is npm's `package-lock.json`. `bunfig.toml` sets a 24-hour `minimumReleaseAge` guard for bun installs.
