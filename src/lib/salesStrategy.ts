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

export type SalesMode = "direct-sale" | "quote-only" | "pre-order";

export type SalesStrategy = {
  mode: SalesMode;
  badge: string;
  priceLabel?: string;
  primaryCta: string;
  secondaryCta?: string;
  noticeTitle: string;
  noticeBody: string;
};

const QUOTE_KEYWORDS = [
  "humanoid",
  "quadruped",
  "robot dog",
  "industrial",
  "research",
  "edu",
  "unitree",
  "agibot",
  "booster",
  "limx",
  "ubtech",
  "dobot",
  "hanson",
  "hiwonder",
];

const PREORDER_KEYWORDS = ["pre-sale", "preorder", "pre-order", "r1"];

export function getProductPrice(product: ProductLike): number {
  return Number.parseFloat(product.priceRange?.minVariantPrice?.amount || "0") || 0;
}

export function getSalesStrategy(product: ProductLike): SalesStrategy {
  const price = getProductPrice(product);
  const searchText = [
    product.title,
    product.handle,
    product.productType,
    product.vendor,
    ...(product.tags || []),
  ]
    .join(" ")
    .toLowerCase();

  const isPreorder = PREORDER_KEYWORDS.some((keyword) => searchText.includes(keyword));

  if (isPreorder && price === 0) {
    return {
      mode: "pre-order",
      badge: "Pre-order",
      priceLabel: "Pre-order terms available",
      primaryCta: "Request Pre-order Terms",
      secondaryCta: "Talk to a Robotics Advisor",
      noticeTitle: "Pre-order item",
      noticeBody:
        "Availability, deposit terms, delivery window, and refund rules must be confirmed before purchase.",
    };
  }

  if (price === 0) {
    return {
      mode: "quote-only",
      badge: "Quote required",
      priceLabel: "Price on request",
      primaryCta: "Request a Quote",
      secondaryCta: "Talk to a Robotics Advisor",
      noticeTitle: "Configured and quoted before purchase",
      noticeBody:
        "This product requires supplier confirmation for cost, configuration, lead time, warranty, and technical support. US domestic shipping and tariff are included in the quoted price.",
    };
  }

  return {
    mode: "direct-sale",
    badge: "In Stock",
    primaryCta: "Add to Cart",
    secondaryCta: "Request Bulk Quote",
    noticeTitle: "Ready for direct checkout",
    noticeBody:
      "Buying multiple units or need a custom configuration? Request a bulk quote for volume pricing and tailored terms.",
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
