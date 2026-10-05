# AXN Studios website

Static marketing site for AXN Studios — React 19, Vite 7, TypeScript, Tailwind 4, wouter. No backend, database or API.

## Commands

| Command                | What it does                                                      |
| ---------------------- | ----------------------------------------------------------------- |
| `npm install`          | Install dependencies                                              |
| `npm run dev`          | Dev server on http://localhost:5173 (next free port if busy)      |
| `npm run check`        | Everything CI runs: format, lint, typecheck, tests, build         |
| `npm run build`        | Build to `dist/public`, then pre-render per-route HTML + sitemap  |
| `npm run serve`        | Preview the production build                                      |
| `npm test`             | Vitest (jsdom) — pages, SEO meta, `index.html`, `vercel.json`     |
| `npm run format`       | Prettier (`format:check` to verify only)                          |

## Where things live

- `src/App.tsx` — pages, header/footer and all page content (arrays at the top).
- `src/index.css` — all styles (hand-written classes, monochrome design).
- `src/seo.json` — page titles, descriptions, site URL, OG image. Used by the app **and** by `scripts/prerender.mjs`.
- `scripts/prerender.mjs` — post-build: writes `about.html`, `contact.html`, `404.html`, `sitemap.xml`, `robots.txt`.
- `vercel.json` — security headers (CSP etc.), clean URLs, asset caching. No catch-all rewrite: unknown URLs return a real 404.

## Deploying (Vercel)

Output directory `dist/public`, build command `npm run build` (both set in `vercel.json`). Changing the domain: edit `url` in `src/seo.json` **and** the absolute URLs in `index.html` (a test fails if they drift).

## Adding a page

1. Add the route in `Router` (`src/App.tsx`) and a `<PageMeta page="/new" />` in the page.
2. Add `"/new": { title, description }` to `src/seo.json`.
3. `npm run check`.
