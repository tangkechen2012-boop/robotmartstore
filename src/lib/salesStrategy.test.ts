import { describe, it, expect } from "vitest";
import { getSalesStrategy, getStockLabel, MADE_TO_ORDER_LABEL } from "./salesStrategy";

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
});
