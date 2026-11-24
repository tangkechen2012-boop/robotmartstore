export interface SitemapEntry {
  path: string;
  changefreq?: string;
  priority?: string;
  lastmod?: string;
}

export function productLastmod(updatedAt?: string): string | undefined {
  if (!updatedAt || !/^\d{4}-\d{2}-\d{2}T/.test(updatedAt) || !Number.isFinite(Date.parse(updatedAt))) return undefined;
  return new Date(updatedAt).toISOString();
}

export function canonicalEntries(entries: SitemapEntry[]): SitemapEntry[] {
  const unique = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    const path = entry.path.replace(/^\/collections\//, "/products/");
    if (!unique.has(path)) unique.set(path, { ...entry, path });
  }
  return [...unique.values()];
}

const escapeXml = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

export function renderSitemap(entries: SitemapEntry[], baseUrl: string): string {
  const urls = canonicalEntries(entries).map(e => [
    "  <url>",
    `    <loc>${escapeXml(baseUrl + e.path)}</loc>`,
    e.lastmod ? `    <lastmod>${escapeXml(e.lastmod)}</lastmod>` : null,
    e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
    e.priority ? `    <priority>${e.priority}</priority>` : null,
    "  </url>",
  ].filter(Boolean).join("\n")).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}