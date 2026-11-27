import { describe, it, expect } from "vitest";
import {
  getSalesStrategy,
  getStockLabel,
  buildQuotePath,
  MADE_TO_ORDER_LABEL,
  QUOTE_ONLY_USED_STOCK_LABEL,
} from "./salesStrategy";

const p = (tags: string[], amount: string, title = "Robot") => ({
  title, handle: "x", tags, priceRange: { minVariantPrice: { amount } },
});

describe("sales strategy", () => {
  it("quote-only tag with a price is quote-only, shows Starting at", () => {
    const s = getSalesStrategy(p(["sales-mode:quote-only", "quote-required"], "39900"));
    expect(s.mode).toBe("quote-only");
    expect(s.priceLabel).toBe("Starting at $39,900");
  });
  it("pause tag beats everything", () => {
    expect(getSalesStrategy(p(["sales-mode:pause", "sales-mode:direct"], "100")).mode).toBe("unavailable");
  });
  it("direct tag with price is direct sale", () => {
    expect(getSalesStrategy(p(["sales-mode:direct"], "2800")).mode).toBe("direct-sale");
  });
  it("R1 at $0 is quote-only, not pre-order", () => {
    expect(getSalesStrategy(p([], "0", "Unitree R1 EDU")).mode).toBe("quote-only");
  });
  it("quote notice does not mention supplier confirmation", () => {
    expect(getSalesStrategy(p([], "0")).noticeBody).not.toMatch(/supplier/i);
  });
});

describe("stock label", () => {
  it("untracked product is made to order", () => {
    expect(getStockLabel(p([], "1"), true)).toBe(MADE_TO_ORDER_LABEL);
  });
  it("US local stock tag is In Stock", () => {
    expect(getStockLabel(p(["Fulfillment_US_Local_Stock"], "1"), true)).toBe("In Stock");
  });
  it("unavailable is Out of Stock", () => {
    expect(getStockLabel(p(["Fulfillment_US_Local_Stock"], "1"), false)).toBe("Out of Stock");
  });
  it("used quote-only listing is never Out of Stock", () => {
    expect(getStockLabel(p(["sales-mode:quote-only", "Condition_Used"], "39900"), false, 0)).toBe(
      QUOTE_ONLY_USED_STOCK_LABEL,
    );
    expect(getStockLabel(p(["quote-required", "Used"], "39900"), false, 0)).toBe(
      QUOTE_ONLY_USED_STOCK_LABEL,
    );
    expect(getStockLabel(p(["sales-mode:quote-only", "condition:used"], "39900"), false, 0)).toBe(
      QUOTE_ONLY_USED_STOCK_LABEL,
    );
  });
  it("new quote-only listing keeps the made-to-order label", () => {
    expect(getStockLabel(p(["sales-mode:quote-only"], "39900"), false, 0)).toBe(MADE_TO_ORDER_LABEL);
  });
});

describe("used quote-only strategy", () => {
  const used = p(["sales-mode:quote-only", "Condition_Used"], "39900", "Unitree G1 Used");

  it("stays quote-only with the quote CTA", () => {
    const s = getSalesStrategy(used);
    expect(s.mode).toBe("quote-only");
    expect(s.primaryCta).toBe("Request a Quote");
    expect(buildQuotePath(used)).toMatch(/^\/request-quote\?/);
  });
  it("notice mentions no warranty and no response time", () => {
    const s = getSalesStrategy(used);
    expect(s.noticeBody).not.toMatch(/warranty/i);
    expect(s.noticeBody).not.toMatch(/guarantee/i);
    expect(s.noticeBody).not.toMatch(/\d/);
    expect(s.noticeBody).not.toMatch(/business day/i);
    expect(s.noticeBody).toMatch(/condition/i);
  });
  it("used listing at $0 keeps the same notice", () => {
    const s = getSalesStrategy(p(["Condition_Used"], "0", "Unitree G1 Used"));
    expect(s.mode).toBe("quote-only");
    expect(s.noticeBody).not.toMatch(/warranty/i);
  });
  it("new quote-only notice is unchanged", () => {
    const s = getSalesStrategy(p(["sales-mode:quote-only"], "39900", "Unitree G1"));
    expect(s.noticeBody).toBe(
      "We confirm configuration, lead time, freight, duties and warranty with you before payment.",
    );
  });
});
