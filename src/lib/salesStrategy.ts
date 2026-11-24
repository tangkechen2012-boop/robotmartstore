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

export type SalesMode = "direct-sale" | "quote-only" | "pre-order" | "unavailable";

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

function formatUsd(n: number) {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

const DIRECT: Omit<SalesStrategy, "badge"> = {
  mode: "direct-sale",
  primaryCta: "Add to Cart",
  secondaryCta: "Request Bulk Quote",
  noticeTitle: "Ready for direct checkout",
  noticeBody:
    "Buying multiple units or need a custom configuration? Request a bulk quote for volume pricing and tailored terms.",
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
      primaryCta: "Ask about availability",
      noticeTitle: "Currently unavailable",
      noticeBody: "This product is not available for purchase right now. Contact us to ask about availability.",
    };
  }

  if (hasTag(product, "sales-mode:quote-only", "quote-required")) {
    return quoteOnly(price);
  }

  if (hasTag(product, "sales-mode:pre-order", "sales-mode:preorder")) {
    return {
      mode: "pre-order",
      badge: "Pre-order",
      priceLabel: price > 0 ? `Starting at $${formatUsd(price)}` : "Pre-order terms available",
      primaryCta: "Request Pre-order Terms",
      secondaryCta: "Talk to a Robotics Advisor",
      noticeTitle: "Pre-order item",
      noticeBody:
        "Availability, deposit terms, delivery window, and refund rules must be confirmed before purchase.",
    };
  }

  if (hasTag(product, "sales-mode:direct", "sales-mode:direct-sale") && price > 0) {
    return { ...DIRECT, badge: getStockLabel(product, true) };
  }

  if (price === 0) return quoteOnly(0);

  return { ...DIRECT, badge: getStockLabel(product, true) };
}

function quoteOnly(price: number): SalesStrategy {
  return {
    mode: "quote-only",
    badge: "Quote required",
    priceLabel: price > 0 ? `Starting at $${formatUsd(price)}` : "Price on request",
    primaryCta: "Request a Quote",
    secondaryCta: "Talk to a Robotics Advisor",
    noticeTitle: "Configured and quoted before purchase",
    noticeBody:
      "We confirm configuration, lead time, freight, duties and warranty with you before payment.",
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
