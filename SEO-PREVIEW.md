# Unpublished SEO corrections — 2026-11-24

## Safety and rollback

- The checkout was clean before work. HEAD matched the approved production baseline: `0e0962897e602c5222ca96a31eb965c82dffd478`.
- These changes are saved in preview only. No production deployment, stack upgrade, GSC submission, or Shopify data mutation was performed.
- GA4 `G-BBZEQ3LZ22` and Google verification `sfLy8jrEKzZyO20rBCR_3L8C00Ge0WMHhGaZTO9jZ2w` are unchanged.
- To discard this unpublished work, restore the baseline in Lovable version history without publishing. Production remains unchanged. Preserve any subsequent unrelated preview work before restoring an entire version.
- If these changes are separately approved and later published, restore that baseline through version history; republishing the rollback requires separate KC approval as well.

## Implemented

- Marked the existing static description/OG/Twitter tags as Helmet-owned (`data-rh="true"`). Helmet replaces them rather than appending duplicates, retaining the static no-JavaScript fallback and verification tag.
- Removed title truncation. Actual comparison: `Energize Lab Eilik: Smart Desktop Companion Bot with Emot…` → `Energize Lab Eilik: Smart Desktop Companion Bot with Emotional Intelligence (Blue Edition) — RobotMart`.
- Missing product and other noindex states now have `noindex, follow` and no canonical. Valid pages have one `index, follow` robots tag.
- `/glossary` navigates to `/resources/robotics-glossary` in the client. Buying Guides and FAQ link directly to the correct destination.
- Legacy `/products/<handle>` product navigation uses a verified public Shopify product destination, preserves query/hash, and never overrides known collections. Unknown `/collections/<handle>` is not treated as a product alias. Used-product aliases remain supported.
- Sitemap has 89 unique entries, down from 95: 64 public products and 25 static/collection pages. Duplicate `/collections/` entries were removed; collection canonicals remain `/products/<collection>`.
- Products use their actual Shopify `updatedAt` as `lastmod`. Static/collection dates are omitted because no authoritative page-specific change time exists. No current-date/build-time fallback. Incomplete/failed fetching preserves the existing sitemap instead of replacing it with a partial one.
- `llms.txt` includes five verified public product links, buying resources, the existing Tampa address, and only Unitree, LinkerBot, DM-Tac authorized-reseller scope. No expanded authorization claims.

## Verification

- 22 tests passed across SEO route resolution, sitemap rules, and existing sales-strategy tests.
- Browser checked About, G1, missing G1 handle, glossary alias, new/used product aliases, both humanoid collection paths, guides, FAQ, and an individual guide. One description, OG title, OG URL, and robots tag on every checked page; correct canonical on valid pages and none on the missing product.
- Verified the actual long product title remains complete. No browser runtime exceptions were observed in these checks; preview build logs report `build OK`.
- XML validation confirmed 89 unique URLs, all 64 product timestamps match the read-only Storefront response, no fabricated static dates, and all `llms.txt` links appear in the sitemap.

## Not implemented / not verified

- True HTTP 301 for `/glossary` and product aliases, and true HTTP 404 for missing products: current SPA responses remain HTTP 200. Client navigation is explicitly not a server redirect. No unsupported `_redirects`, edge rules, or architecture migration were added.
- Documented hosting limitation: official Lovable docs do not specify a configurable selective server/edge redirect mechanism for this Vite app. Product-only redirect rules require a separately supported hosting/gateway capability; collection routes must remain untouched.
- Unpublished/draft-only product handles cannot be verified through the public Storefront API and were not guessed or redirected to nonexistent pages. No additional draft-handle list was supplied.
- Google rendered HTML is not verified. Official docs describe on-demand prerendering on published public URLs for verified crawlers, while unverified requests can receive the SPA shell. Google can execute JavaScript; a spoofed User-Agent response does not prove what verified Googlebot receives. Inspect the published homepage, About, and G1 using GSC URL Inspection before drawing conclusions.
- No GSC sitemap submission was made. It needs access and separate write authorization; preview changes are not live yet.
- No new Lighthouse run or production changes are claimed.

Official references: https://docs.lovable.dev/features/seo-aeo and https://docs.lovable.dev/features/hosting.