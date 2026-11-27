type Money = {
  amount?: string;
};

type ProductLike = {
  title?: string;
  handle?: string;
  productType?: string;
  vendor?: string;
  tags?: string[];
  priceRange?: {
    minVariantPrice?: Money;
  };
};

export type SalesMode = "direct-sale" | "pre-order" | "unavailable";

export type SalesStrategy = {
  mode: SalesMode;
  badge: string;
  priceLabel?: string;
  primaryCta: string;
  secondaryCta?: string;
  noticeTitle: string;
  noticeBody: string;
};

export const MADE_TO_ORDER_LABEL = "Made to order: lead time confirmed before shipment";

export function getProductPrice(product: ProductLike): number {
  return Number.parseFloat(product.priceRange?.minVariantPrice?.amount || "0") || 0;
}

function hasTag(product: ProductLike, ...names: string[]): boolean {
  const tags = (product.tags || []).map((t) => t.trim().toLowerCase());
  return names.some((n) => tags.includes(n.toLowerCase()));
}

const DIRECT: Omit<SalesStrategy, "badge"> = {
  mode: "direct-sale",
  primaryCta: "Add to Cart",
  noticeTitle: "Ready for direct checkout",
  noticeBody:
    "Buying multiple units or need a custom configuration? Contact us to discuss volume purchases and configuration requirements.",
};

/**
 * Stock label. "In Stock" only when the product is tagged as US local stock
 * or the variant reports a positive quantity; otherwise made-to-order.
 */
export function getStockLabel(
  product: ProductLike,
  availableForSale: boolean | undefined,
  quantityAvailable?: number | null,
): string {
  if (availableForSale === false) return "Out of Stock";
  if (hasTag(product, "Fulfillment_US_Local_Stock") || (quantityAvailable ?? 0) > 0) return "In Stock";
  return MADE_TO_ORDER_LABEL;
}

export function getSalesStrategy(product: ProductLike): SalesStrategy {
  const price = getProductPrice(product);

  if (hasTag(product, "sales-mode:pause")) {
    return {
      mode: "unavailable",
      badge: "Currently unavailable",
      priceLabel: "Currently unavailable",
      primaryCta: "Contact us",
      noticeTitle: "Currently unavailable",
      noticeBody: "This product is not available for purchase right now. Contact us to ask about availability.",
    };
  }

  // A listed price enables checkout regardless of legacy quote or pre-order tags.
  if (price > 0) {
    return { ...DIRECT, badge: getStockLabel(product, true) };
  }

  return {
    mode: "unavailable",
    badge: "Currently unavailable",
    priceLabel: "Currently unavailable",
    primaryCta: "Contact us",
    noticeTitle: "Currently unavailable",
    noticeBody: "This product is not available for purchase right now. Contact us to ask about availability.",
  };
}

export function buildQuotePath(product: ProductLike, requestType = "quote") {
  const params = new URLSearchParams({
    type: requestType,
    product: product.title || "",
  });

  if (product.handle) {
    params.set("handle", product.handle);
  }

  return `/request-quote?${params.toString()}`;
}
