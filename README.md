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

## Testimonials (About page)

Reviews live in `src/testimonials.json`. Authenticity rules are enforced in code (`src/testimonials.ts`) and by tests:

- A review appears on the live site **only** when `source_status` is `"verified"`, `approval_status` is `"approved"`, `publishable` is `true`, and the client has a `name` plus a `role` or `company`. Anything else is hidden.
- Demo cards (`"source_status": "demo_content"`, currently 9) are layout placeholders with no client identity. They appear **only** on `npm run dev` (with one small preview note above the carousel), never in the production build. Replace them with real reviews as they come in.
- If no review qualifies, the whole section is hidden.
- The carousel is text only: no client photos, logos or star ratings (`rating` stays `null`). Cards scroll with the arrow buttons, by mouse drag, by touch swipe or with the keyboard.
- The home page's "More about us" link goes to `/about#testimonials` (and scrolls there) when reviews are visible, otherwise to `/about`.

**Adding a real review**

1. Get the client's written permission to publish their words, name, role and company.
2. Edit for clarity only; keep their meaning and do not add claims they did not make.
3. Add an entry: `source_status: "verified"`, `approval_status: "approved"`, `publishable: true`, with `client.name` and `role` or `company`. Never invent results or numbers.
4. Run `npm run check`.

**Questions to collect genuine feedback**

- What problem were you trying to solve, and why did you choose us?
- What was it like to work with us (communication, pace, how we handled changes)?
- What, if anything, surprised you?
- What changed in your day-to-day work after launch?
- Would you recommend us, and to whom?
- May we publish your name, role and company alongside your words?
- Web: how did the finished site compare with what you expected? Marketing automation: which manual tasks went away? AI agents: which conversations does the assistant handle, and how well does it hand off to your team?

**Review-request draft**

> Subject: A quick favor?
>
> Hi [name], thank you again for working with us on [project]. If you have a few minutes, we would be grateful for a short, honest review of the experience: what you needed, how the collaboration went, and what has changed since. Your own words are best, and we will only publish them, with your name and company, if you say yes. Reply to this email with your thoughts and your permission. Thank you.

## Performance

Measured with Lighthouse on the production build (mobile, simulated slow 4G): performance 97–98, accessibility 100, best practices 100, SEO 100; about 250 KB per page; no third-party requests; layout shift 0.

- Fonts are self-hosted and preloaded (`public/fonts/`); no Google Fonts.
- Each page's main image has 800w / 1200w / full-size variants (`src/seo.json` → `lcpImage`) and is preloaded in that page's HTML at build time.
- `vercel.json` sets long-lived immutable caching for hashed assets and fonts, and 1 day + stale-while-revalidate for images and logos.
- To re-check: `npx lighthouse <url> --only-categories=performance` (add `--preset=desktop` for desktop).
