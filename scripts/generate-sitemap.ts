// Generates public/sitemap.xml. Runs before `vite dev` and `vite build` via npm predev/prebuild hooks.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { COLLECTION_HANDLES } from "../src/lib/seoRoutes";
import { canonicalEntries, productLastmod, renderSitemap, type SitemapEntry } from "./sitemap-utils";

const BASE_URL = "https://www.robotmart.store";
const SHOPIFY_DOMAIN = "hello-world-8lwxi.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_TOKEN = "d9baf3a3bace41452a5e8f95e63e0edd";

const staticEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/products", changefreq: "weekly", priority: "0.9" },
  { path: "/services-technology", changefreq: "monthly", priority: "0.8" },
  { path: "/custom-development", changefreq: "monthly", priority: "0.8" },
  { path: "/applications", changefreq: "monthly", priority: "0.8" },
  { path: "/procurement", changefreq: "monthly", priority: "0.7" },
  { path: "/brands", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.7" },
  { path: "/about", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/request-quote", changefreq: "monthly", priority: "0.7" },
  { path: "/support", changefreq: "monthly", priority: "0.6" },
  { path: "/buying-guides", changefreq: "monthly", priority: "0.8" },
  { path: "/buying-guides/how-to-choose-a-humanoid-robot", changefreq: "monthly", priority: "0.7" },
  { path: "/buying-guides/quadruped-robot-buyers-guide", changefreq: "monthly", priority: "0.7" },
  { path: "/faq", changefreq: "monthly", priority: "0.6" },
  { path: "/resources/robotics-glossary", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

for (const h of COLLECTION_HANDLES) {
  staticEntries.push({ path: `/products/${h}`, changefreq: "weekly", priority: "0.9" });
}

interface ProductRecord { handle: string; updatedAt: string }

async function fetchProducts(): Promise<ProductRecord[]> {
  const url = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const products: ProductRecord[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 20; i++) {
    const query = `query($cursor: String) {
      products(first: 100, after: $cursor) {
        edges { cursor node { handle updatedAt } }
        pageInfo { hasNextPage }
      }
    }`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables: { cursor } }),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) throw new Error(`Storefront returned HTTP ${res.status}`);
    const json = await res.json();
    if (json.errors || !json.data?.products) throw new Error("Invalid Storefront sitemap response");
    const edges = json.data.products.edges as Array<{ cursor: string; node: ProductRecord }>;
    products.push(...edges.map(e => e.node));
    if (!json.data.products.pageInfo.hasNextPage) return products;
    cursor = edges[edges.length - 1]?.cursor || null;
    if (!cursor) throw new Error("Missing product pagination cursor");
  }
  throw new Error("Product pagination incomplete; preserving existing sitemap");
}

try {
  const products = await fetchProducts();
  const productEntries: SitemapEntry[] = products.map(p => ({
    path: `/product/${p.handle}`,
    changefreq: "weekly",
    priority: "0.7",
    // Shopify's product-specific update time, never build or generation time.
    lastmod: productLastmod(p.updatedAt),
  }));
  const all = canonicalEntries([...staticEntries, ...productEntries]);
  writeFileSync(resolve("public/sitemap.xml"), renderSitemap(all, BASE_URL));
  console.log(`sitemap.xml written (${all.length} entries; ${products.length} products)`);
} catch (err) {
  console.warn("sitemap: preserving existing file because product fetch failed", err);
}
