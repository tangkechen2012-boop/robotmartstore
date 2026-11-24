import type { CartItem } from "@/lib/shopify";

/**
 * Selected option values that are a real customer choice.
 * Mirrors the ProductDetail visibleOptions rule: the implicit "Title" option,
 * Shopify's "Default Title" placeholder, and options whose product entry has
 * a single value (e.g. Fulfillment Option: Direct Sale) are not choices.
 */
export function getVisibleCartOptionValues(item: CartItem): string[] {
  const productOptions = item.product?.node?.options ?? [];
  return item.selectedOptions
    .filter((option) => {
      if (option.name === "Title") return false;
      if (option.value === "Default Title") return false;
      const entry = productOptions.find((o) => o.name === option.name);
      if (entry && entry.values.length <= 1) return false;
      return true;
    })
    .map((option) => option.value);
}
