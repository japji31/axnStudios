# Loomsville — Agent Handoff Context

A single briefing an agent can read to pick this project up mid-build. Copy the "System prompt" section below as-is.

---

## System prompt

You are continuing work on **Loomsville**, a premium farm-cotton bedding and home-textile brand site built on TanStack Start (React 19, Vite, Tailwind v4 via `src/styles.css`). No backend is enabled; all data is local.

**Brand rules (never substitute):**
- Positioning: "The elegance of comfort, in its purest form."
- Voice: warm, understated, sensory, confident. No exclamation marks, no sale-shouting. Calm declarative sentences, tactile words (soft, breathable, refined, woven).
- Palette: Ivory `#F5EFE2` (primary bg, never stark white), Charcoal `#2B2621` (body text, dark sections, primary buttons), Sage Grove `#7E8A6B` (signature accent — CTAs, links, hover), Sand Dune `#C9A876` (badges, highlights), Dusty Rose `#C6A199` (sparing details), Mocha `#6B4E3D` (footer/grounding), Slate Blue `#6E7C87` (occasional cool contrast).
- Type: Fraunces (serif, 300–600, italic for accent phrases) for all headings; Karla (400–700) for body, buttons, labels. H1 up to ~6rem / line-height ~1; body 1–1.15rem / line-height 1.65–1.7; labels small, uppercase, wide tracking.
- Motif: literal "woven thread" — interlaced curved lines — in hero backgrounds and section dividers. It is the only bold device; keep everything else quiet.
- Motion: scroll reveals fade-and-rise, `cubic-bezier(0.16,1,0.3,1)`, 250–450ms, ~90ms stagger. Hover animates transform/opacity only, 200–300ms, no bounce. Respect `prefers-reduced-motion`.

**Stack rules:** file-based routes in `src/routes` (never edit `routeTree.gen.ts`); shared chrome goes in `src/routes/__root.tsx` around `<Outlet />`; navigate with `<Link to params>`, never interpolated `href`; every content route needs its own `head()` with unique title/description/og tags.

---

## What is done

**Homepage (complete and verified)**
- `src/routes/index.tsx` (467 lines) — sticky nav, hero "Woven for rest.", craft ticker, our-story, collections grid, features strip, testimonials, newsletter band, footer. Nav and footer are currently inline in this file.
- `src/styles.css` (345 lines) — full brand system: CSS variables for the exact palette, typography scale, reveal animations, nav, buttons, hero weave, marquee, story, collections, features, testimonials, newsletter, footer.
- `src/routes/__root.tsx` — Loomsville metadata plus Fraunces/Karla Google Font links.
- Fixed: hero button text was invisible because `.lv a { color: inherit }` beat `.btn-primary`. Selector is now `.lv a:not(.btn)`. Verified in browser.

**Multi-page split (partial)**
- `src/lib/catalog.ts` — 4 collections (Cotton Muse, Loom Elan, Artisan Prints, Loomsville Royale), 10 products with thread count, weave, description, colourways, sizes, stock levels, ₹ prices; helpers `formatINR`, `getProduct`, `getCollection`, `productsInCollection`, `stockLabel`.
- `src/lib/cart.tsx` — `CartProvider` / `useCart`, lines keyed by slug + size, persisted to `localStorage` under `loomsville-cart`; add, update qty, remove, clear, count, subtotal.
- `src/components/SiteNav.tsx` — shared sticky nav matching the reference screenshot: Home, About us, Shop, Collections, Contact us with hover dropdowns, centered emblem, search/user/cart icons, cart badge, mobile menu.
- `src/components/SiteFooter.tsx` — shared footer, catalog-driven links, socials.
- `src/components/ProductCard.tsx` — inventory card linking to `/shop/$slug`.
- `src/routes/shop.tsx` — inventory landing: full stock grid, collection filters, search, sort (featured / price asc / desc), result count, empty state.
- `src/routes/shop.$slug.tsx` — product detail: breadcrumbs, specs, size and quantity pickers, add to cart, related products.

---

## What is left

1. `src/routes/collections.tsx` — landing listing all four collections with inventory summaries.
2. `src/routes/collections.$slug.tsx` — per-collection page listing its products.
3. `src/routes/cart.tsx` — cart lines, quantity controls, remove, subtotal, checkout CTA placeholder.
4. `src/routes/about.tsx` — sections `#standard`, `#loom`, `#people` (the About dropdown targets).
5. `src/routes/contact.tsx` — sections `#write`, `#studio`, `#care` (the Contact dropdown targets).
6. Wire `CartProvider` + `SiteNav` + `SiteFooter` into `src/routes/__root.tsx` around `<Outlet />`, and remove the now-duplicated inline nav and footer from `src/routes/index.tsx`.
7. Add page styles to `src/styles.css`: page header block, filter toolbar and chips, product-detail grid, cart table, dropdown panels, responsive breakpoints.
8. Give every new route its own `head()` metadata, then check `/tmp/observability/build-errors.log` and walk each route in the browser.

## Current state note

Because step 6 has not run, the new routes are not mounted in the shared layout — the site still renders as the single homepage. Nothing is broken; the new pages just are not reachable yet.

## Technical details

- Route files map dots to slashes: `shop.$slug.tsx` declares `createFileRoute("/shop/$slug")`.
- Cart state is client-only; guard localStorage reads so SSR and hydration match.
- No Lovable Cloud / database is enabled. Add one only if the user asks for real orders, accounts, or persisted inventory.
