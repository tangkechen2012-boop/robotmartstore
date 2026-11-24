
- Business details (address, phone, email, authorized brands) live in one shared company module; pages must read from it so the site stays consistent.
- Tracking IDs come from env vars and default empty; with an empty ID no tracking script loads.
- Per-page title/description/canonical/OG/JSON-LD come from the Seo component (React 19 native head tags, server-rendered); the root route head() holds only site-wide tags such as the Google verification meta, so pages never get duplicate titles.
- Missing pages use noindex, follow without a canonical; legacy product redirects require a verified product and never override known collection routes.
- Sitemap generation uses canonical collection paths and product-specific Shopify updatedAt, omits unknown dates, and leaves the existing sitemap intact on fetch failure.
- The storefront runs on TanStack Start SSR: route loaders prefetch Shopify data through the shared queryOptions factories so raw HTML has real content, and redirects/missing pages use loader redirect()/notFound() for real HTTP 301/404.
- Code rendered on the server must not need a DOM at import or render time (e.g. HTML sanitizing uses the pure-JS xss package, not DOMPurify); browser-only libraries load via dynamic import inside effects.
- The persisted cart store skips automatic hydration and is restored after mount (useCartSync) so server HTML and first client render match.
