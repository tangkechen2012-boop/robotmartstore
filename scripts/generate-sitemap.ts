// Generates public/sitemap.xml. Runs before `vite dev` and `vite build` via npm predev/prebuild hooks.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://www.robotmart.store";
const SHOPIFY_DOMAIN = "hello-world-8lwxi.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_TOKEN = "d9baf3a3bace41452a5e8f95e63e0edd";

const COLLECTION_HANDLES = [
  "humanoid-robots",
  "quadruped-robots",
  "robot-accessories",
  "toy-robots",
  "pre-owned",
];

interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
}

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
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

for (const h of COLLECTION_HANDLES) {
  staticEntries.push({ path: `/products/${h}`, changefreq: "weekly", priority: "0.9" });
  staticEntries.push({ path: `/collections/${h}`, changefreq: "weekly", priority: "0.7" });
}

async function fetchProductHandles(): Promise<string[]> {
  const url = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  const handles: string[] = [];
  let cursor: string | null = null;
  for (let i = 0; i < 20; i++) {
    const query = `query($cursor: String) {
      products(first: 100, after: $cursor) {
        edges { cursor node { handle } }
        pageInfo { hasNextPage }
      }
    }`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
        },
        body: JSON.stringify({ query, variables: { cursor } }),
      });
      const json: any = await res.json();
      const edges = json?.data?.products?.edges || [];
      for (const e of edges) handles.push(e.node.handle);
      if (!json?.data?.products?.pageInfo?.hasNextPage) break;
      cursor = edges[edges.length - 1]?.cursor || null;
      if (!cursor) break;
    } catch (err) {
      console.warn("sitemap: failed to fetch products from Shopify", err);
      break;
    }
  }
  return handles;
}

function render(entries: SitemapEntry[]) {
  const urls = entries
    .map((e) =>
      [
        `  <url>`,
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        `  </url>`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const productHandles = await fetchProductHandles();
const productEntries: SitemapEntry[] = productHandles.map((h) => ({
  path: `/product/${h}`,
  changefreq: "weekly",
  priority: "0.7",
}));

const all = [...staticEntries, ...productEntries];
writeFileSync(resolve("public/sitemap.xml"), render(all));
console.log(`sitemap.xml written (${all.length} entries; ${productHandles.length} products)`);
