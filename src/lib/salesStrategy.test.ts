import { describe, it, expect } from "vitest";
import { getSalesStrategy, getStockLabel, MADE_TO_ORDER_LABEL } from "./salesStrategy";

const p = (tags: string[], amount: string, title = "Robot") => ({
  title, handle: "x", tags, priceRange: { minVariantPrice: { amount } },
});

describe("sales strategy", () => {
  it.each(["sales-mode:quote-only", "quote-required"])("priced %s products are direct-sale", (tag) => {
    const s = getSalesStrategy(p([tag], "39900"));
    expect(s.mode).toBe("direct-sale");
    expect(s.primaryCta).toBe("Add to Cart");
    expect(s.priceLabel).toBeUndefined();
    expect(s.secondaryCta).toBeUndefined();
  });
  it("combined quote tags cannot override a listed price", () => {
    const s = getSalesStrategy(p(["sales-mode:quote-only", "quote-required"], "39900"));
    expect(s.mode).toBe("direct-sale");
    expect(s.primaryCta).toBe("Add to Cart");
    expect(s.secondaryCta).toBeUndefined();
  });
  it("pause tag beats all purchase tags even with a price", () => {
    const s = getSalesStrategy(p(["sales-mode:pause", "sales-mode:direct", "quote-required", "sales-mode:pre-order"], "100"));
    expect(s.mode).toBe("unavailable");
    expect(s.primaryCta).toBe("Contact us");
    expect(s.secondaryCta).toBeUndefined();
  });
  it("direct tag with price is direct sale", () => {
    const s = getSalesStrategy(p(["sales-mode:direct"], "2800"));
    expect(s.mode).toBe("direct-sale");
    expect(s.primaryCta).toBe("Add to Cart");
  });
  it("an untagged positive price is direct sale", () => {
    expect(getSalesStrategy(p([], "0.01")).mode).toBe("direct-sale");
  });
  it.each([[], ["quote-required"], ["sales-mode:direct"], ["Condition_Used"], ["sales-mode:pre-order"]])("zero price with tags %j is unavailable", (...tags) => {
    const s = getSalesStrategy(p(tags, "0", "Unitree R1 EDU"));
    expect(s.mode).toBe("unavailable");
    expect(s.primaryCta).toBe("Contact us");
    expect(s.secondaryCta).toBeUndefined();
  });
  it.each(["sales-mode:pre-order", "sales-mode:preorder"])("priced %s products use checkout", (tag) => {
    const s = getSalesStrategy(p([tag], "2800"));
    expect(s.mode).toBe("direct-sale");
    expect(s.primaryCta).toBe("Add to Cart");
    expect(s.secondaryCta).toBeUndefined();
  });
});

describe("stock label", () => {
  it("untracked product is made to order", () => {
    expect(getStockLabel(p([], "1"), true)).toBe(MADE_TO_ORDER_LABEL);
  });
  it("US local stock tag is In Stock", () => {
    expect(getStockLabel(p(["Fulfillment_US_Local_Stock"], "1"), true)).toBe("In Stock");
  });
  it("positive quantity is In Stock", () => {
    expect(getStockLabel(p([], "1"), true, 1)).toBe("In Stock");
  });
  it("unavailable overrides a local stock tag and quantity", () => {
    expect(getStockLabel(p(["Fulfillment_US_Local_Stock"], "1"), false, 1)).toBe("Out of Stock");
  });
  it.each(["Condition_Used", "condition:used", "Used"])("purchasable %s quote-tagged listings follow normal stock rules", (condition) => {
    const used = p(["sales-mode:quote-only", "quote-required", condition], "39900");
    expect(getStockLabel(used, true, 0)).toBe(MADE_TO_ORDER_LABEL);
    expect(getStockLabel(used, true, 1)).toBe("In Stock");
    expect(getStockLabel({ ...used, tags: [...used.tags, "Fulfillment_US_Local_Stock"] }, true, 0)).toBe("In Stock");
    expect(getStockLabel(used, false, 0)).toBe("Out of Stock");
  });
  it("new quote-tagged listing follows availability", () => {
    const product = p(["sales-mode:quote-only"], "39900");
    expect(getStockLabel(product, true, 0)).toBe(MADE_TO_ORDER_LABEL);
    expect(getStockLabel(product, false, 0)).toBe("Out of Stock");
  });
});
