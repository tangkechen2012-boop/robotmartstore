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
  const isQuoteProduct = price === 0 || QUOTE_KEYWORDS.some((keyword) => searchText.includes(keyword));
  const isHighTicket = price >= 5000;

  if (isPreorder && (price === 0 || searchText.includes("r1"))) {
    return {
      mode: "pre-order",
      badge: "Pre-order",
      priceLabel: price > 0 ? `Starting at $${price.toLocaleString("en-US")}` : "Pre-order terms available",
      primaryCta: "Request Pre-order Terms",
      secondaryCta: "Talk to a Robotics Advisor",
      noticeTitle: "Pre-order item",
      noticeBody:
        "Availability, deposit terms, delivery window, and refund rules must be confirmed before purchase.",
    };
  }

  if (isQuoteProduct || isHighTicket) {
    return {
      mode: "quote-only",
      badge: "Quote required",
      priceLabel: price > 0 ? `Starting at $${price.toLocaleString("en-US")}` : "Price on request",
      primaryCta: "Request a Quote",
      secondaryCta: "Talk to a Robotics Advisor",
      noticeTitle: "Configured and quoted before purchase",
      noticeBody:
        "This product requires supplier confirmation for cost, configuration, lead time, freight, duties, warranty, and technical support.",
    };
  }

  return {
    mode: "direct-sale",
    badge: "Direct sale",
    primaryCta: "Add to Cart",
    secondaryCta: "Ask Compatibility Question",
    noticeTitle: "Ready for direct checkout",
    noticeBody:
      "Final availability, shipping, and warranty details are confirmed during order processing.",
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
