
- Business details (address, phone, email, authorized brands) live in one shared company module; pages must read from it so the site stays consistent.
- Tracking IDs come from env vars and default empty; with an empty ID no tracking script loads.
- Static page metadata is marked data-rh for Helmet ownership, so route tags replace defaults without losing the no-JS fallback or verification tag.
- Missing pages use noindex, follow without a canonical; legacy product redirects require a verified product and never override known collection routes.
- Sitemap generation uses canonical collection paths and product-specific Shopify updatedAt, omits unknown dates, and leaves the existing sitemap intact on fetch failure.
- This storefront remains a Vite SPA; client navigation is not HTTP 301/404, and server redirect rules must not be simulated with unsupported hosting files.
