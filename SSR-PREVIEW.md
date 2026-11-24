# SSR Preview — TanStack Start migration (preview only, not published)

Base: unpublished preview commit `513f15af` (+ `42d9b88` sitemap timestamp housekeeping).
Production (www.robotmart.store) is untouched and stays at `0e096289` until a separate publish approval.

## What changed
- Framework: React + Vite SPA → TanStack Start (SSR) via Lovable's official in-project migration skill. React 18 → 19, Tailwind 3 → 4.
- Every route is a file in `src/routes/`; header/footer layout, analytics/consent tracker and cart sync live in `src/routes/__root.tsx`.
- Page metadata: `Seo` now renders native React 19 `<title>/<meta>/<link>` tags, which land in `<head>` of the server HTML (Helmet removed). Root head keeps only site-wide tags: charset, viewport, author, Google verification `sfLy8jrEKzZyO20rBCR_3L8C00Ge0WMHhGaZTO9jZ2w`, Shopify preconnect, fonts, Organization + WebSite JSON-LD.
- Shopify data: route loaders prefetch the same React Query queries the pages use (home, all products, collections, product + related, policies), and the data ships with the HTML (`@tanstack/react-router-ssr-query`). Storefront queries, token, cart, checkout and prices are unchanged.
- Redirects / status codes now real HTTP:
  - `/glossary` → 301 → `/resources/robotics-glossary`
  - `/products/<verified product handle>` → 301 → `/product/<handle>` (query kept). Known collection handles always win.
  - Unknown `/products/<x>`, `/collections/<x>`, `/product/<x>`, any unknown path → 404 with noindex, follow and no canonical.
  - Unknown buying guide → 307 → `/buying-guides` (previous behaviour).
- Product description HTML sanitising: DOMPurify (needs a browser DOM) replaced with the pure-JS `xss` allow-list (same tag/attribute list), so it works on the server.
- Cart: persisted cart now restores right after page load (avoids server/client mismatch). Behaviour unchanged.
- GA4 `G-BBZEQ3LZ22` + consent logic unchanged. GTM / Meta Pixel still empty.
- Brand theme (Deep Blue, cta-orange, glass, 1.5rem radii, shadows, animations, Plus Jakarta Sans) re-applied in `src/styles.css`.
- 3D: `FloatingRobot` (three.js) is not used on any page; packages upgraded for React 19. Hero uses a canvas effect started in `useEffect`, so it is client-only already.
- Sitemap (89 entries, real Shopify `updatedAt`, deduplicated) and `public/llms.txt` unchanged.

## Verification (dev server, raw HTML via curl, no JavaScript)
32/32 routes return 200 with exactly one title, one description, one og:title, canonical, `index, follow`, an H1 and main content; no SSR errors:
`/`, `/products`, `/product/unitree-go2-quadruped-robot-dog`, `/product/unitree-h1-humanoid-robot`, `/products/humanoid-robots`, `/collections/quadruped-robots` (canonical → `/products/quadruped-robots`), `/products/robot-accessories`, `/products/pre-owned`, `/products/robotic-arms`, `/contact`, `/about`, `/services-technology`, `/custom-development`, `/applications`, `/procurement`, `/request-quote`, `/support`, `/brands`, `/blog`, `/buying-guides`, two buying guides, `/faq`, `/resources/robotics-glossary`, `/privacy`, `/terms`, four `/policies/*` Shopify policies, contact-information, legal-notice.

Product pages (Go2, H1): server HTML contains Shopify description/spec table (e.g. Go2 "Dimensions (standing) 70 × 31 × 40 cm") and a `Product` JSON-LD built from live Shopify data (name, images, variant SKU, brand, offer).
Collections: BreadcrumbList / ItemList / FAQPage JSON-LD in HTML.

Status checks: `/glossary` 301, `/products/unitree-go2-quadruped-robot-dog?ref=x` 301 → `/product/unitree-go2-quadruped-robot-dog?ref=x`, `/products/nope-xyz` 404, `/product/nope-xyz` 404, `/random-missing` 404 (all noindex, follow, no canonical).

Browser (Chromium, desktop 1280 and mobile 390): home, Go2 product, humanoid collection and client-side navigation to /about — no console or hydration errors; title/canonical update on navigation (single canonical).

Gates: `bun run build` OK · `tsgo --noEmit` clean, 0 silenced lines · `vitest` 30/30 (incl. new sanitiser and collection-vs-product routing tests).

## Not verified / open
- Behaviour on the published host is unverified until the preview is published (separate approval). Real HTTP statuses were observed on the preview dev server.
- Google Search Console rendered-HTML inspection and sitemap submission: still pending.
- Add-to-cart / checkout were not clicked in this check (to avoid creating Shopify carts); the cart code is unchanged except for when the saved cart is restored.
- Pre-existing: mobile product page overflows ~28px to the right (same on the live site); not changed here.

## Rollback
Revert the migration message from chat history (restores the SPA and removes `.lovable/project.json`), or restore files from commit `42d9b88`. Production is unaffected either way.
