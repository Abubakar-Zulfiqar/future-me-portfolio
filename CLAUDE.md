# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page personal portfolio for Mian Muhammad Abubakar, deployed on Vercel at `https://mian-abubakar.vercel.app/`.

Stack: Vite 7, React 19, TypeScript, TanStack Router (file-based), Tailwind CSS v4, and Vercel Analytics. There is no component library. The shadcn/ui scaffolding was removed.

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
- **Hydration-safe components:** anything in `HomePage` must render identically on the server and on the first client render. Read `window`/`matchMedia` only inside effects. `Hero` starts with 0 terminal lines and animates them in from an effect.
- **Routing:** `@tanstack/router-plugin/vite` generates `src/routes/routeTree.gen.ts` from `src/routes/`. Don't hand-edit that file. `src/routes/index.tsx` just mounts `HomePage`, and `__root.tsx` holds the 404 and error components.
- **Page composition:** `src/components/portfolio/HomePage.tsx` stacks the sections: Nav, Hero, About, Skills, Experience (with Education), Projects, Contact.
  - Each section is a `<section id="...">`. Nav links to them by anchor, highlights the active one with an IntersectionObserver, and has a mobile menu below `lg`.
  - `SectionLabel` is exported from `About.tsx`.
- **Content is hardcoded:** copy and data live as arrays inside each section component.
  - The source of truth for the content is the PDFs in `src/assets/`: `Mian_Abubakar_Resume.pdf`, `Mian_Abubakar_Resume_Detailed.pdf` and `Mian_Abubakar_Projects.pdf`. Keep the site consistent with them. The years of experience and the project count appear in the Hero, About, `index.html` and `public/llms.txt`.
  - In `Projects.tsx`, each project has a short `summary`, a longer `details` shown in a native `<details>`, and an optional `flow` for the architecture diagram.
- **Documents and analytics:** the PDFs are imported as assets in `src/lib/documents.ts`, which also exports `trackDownload` and `trackContact`. These wrap `@vercel/analytics`, and custom events need a Vercel Pro plan. `<Analytics/>` is mounted in `main.tsx`.
- **Styling/theme:** Tailwind v4 is configured entirely in `src/styles.css`. There is no `tailwind.config`.
  - Design tokens are CSS variables on `:root`, mapped through `@theme inline`. The theme is a dark retro terminal look: a green "phosphor" primary and an amber accent.
  - Custom utilities: `text-glow`, `shadow-glow`, `scanlines`, `scan-line`, `crt-flicker`, `cursor-blink`.
  - A `prefers-reduced-motion` block disables the animations. Reuse the tokens instead of hardcoding colors, and keep text at 11px or larger.
  - Fonts load from Google Fonts via `<link>` in `index.html`.
- **Images:** the portrait is `src/assets/abubakar.webp`. Keep images as compressed WebP (`cwebp` is available).

## SEO / deployment

- Static metadata lives in `index.html`: title, description, Open Graph/Twitter tags, canonical URL, and JSON-LD `Person` with `sameAs` links to LinkedIn and GitHub. `public/` holds `robots.txt`, `sitemap.xml`, `llms.txt`, `og-image.png` and `favicon.svg`.
- If contact details or the domain change, update `index.html`, `public/llms.txt`, `public/robots.txt`, `public/sitemap.xml`, `Contact.tsx` and `Nav.tsx`.
- `vercel.json` runs `npm run build`, serves `dist/`, and rewrites unknown paths to `/index.html`. Real files such as the sitemap and PDFs are served before the rewrite applies.

## Conventions

- Prettier settings: 100-character lines, double quotes, semicolons, trailing commas.
- The lockfile is npm's `package-lock.json`. `bunfig.toml` sets a 24-hour `minimumReleaseAge` guard for bun installs.
