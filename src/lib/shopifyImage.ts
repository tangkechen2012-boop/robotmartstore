// Helpers for optimizing Shopify CDN image delivery.
// Shopify's CDN supports `?width=N` query params and automatically serves
// modern formats (WebP/AVIF) via content negotiation when the browser supports it.
// See: https://shopify.dev/docs/storefronts/themes/best-practices/performance/image-optimization

const SHOPIFY_CDN_HOST = "cdn.shopify.com";

function isShopifyCdnUrl(url: string): boolean {
  return typeof url === "string" && url.includes(SHOPIFY_CDN_HOST);
}

/** Append/replace the `width` query param on a Shopify CDN URL. No-op for other hosts. */
export function shopifyImageUrl(url: string | undefined, width: number): string {
  if (!url) return "";
  if (!isShopifyCdnUrl(url)) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("width", String(Math.round(width)));
    return u.toString();
  } catch {
    return url;
  }
}

/** Build a responsive srcSet at common DPR widths. */
export function shopifyImageSrcSet(url: string | undefined, widths: number[]): string {
  if (!url || !isShopifyCdnUrl(url)) return "";
  return widths.map(w => `${shopifyImageUrl(url, w)} ${w}w`).join(", ");
}
