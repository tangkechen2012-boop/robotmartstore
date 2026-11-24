import { describe, expect, it } from "vitest";
import { getVisibleCartOptionValues } from "@/lib/cartOptions";
import type { CartItem } from "@/lib/shopify";

const cartItem = (
  selectedOptions: Array<{ name: string; value: string }>,
  options: Array<{ name: string; values: string[] }>,
): CartItem =>
  ({
    lineId: null,
    variantId: "gid://shopify/ProductVariant/1",
    variantTitle: selectedOptions.map((o) => o.value).join(" / ") || "Default Title",
    price: { amount: "100.00", currencyCode: "USD" },
    quantity: 1,
    selectedOptions,
    product: { node: { options } } as unknown as CartItem["product"],
  }) satisfies CartItem;

describe("getVisibleCartOptionValues", () => {
  it("hides the Shopify Default Title placeholder for single-SKU products", () => {
    const item = cartItem(
      [{ name: "Title", value: "Default Title" }],
      [{ name: "Title", values: ["Default Title"] }],
    );
    expect(getVisibleCartOptionValues(item)).toEqual([]);
  });

  it("hides an option whose product entry has only one value", () => {
    const item = cartItem(
      [{ name: "Fulfillment Option", value: "Direct Sale" }],
      [{ name: "Fulfillment Option", values: ["Direct Sale"] }],
    );
    expect(getVisibleCartOptionValues(item)).toEqual([]);
  });

  it("keeps the selected value of a real multi-value option", () => {
    const item = cartItem(
      [{ name: "Size", value: "Large" }],
      [{ name: "Size", values: ["Large", "Medium", "Small"] }],
    );
    expect(getVisibleCartOptionValues(item)).toEqual(["Large"]);
  });

  it("keeps real choices and drops placeholder rows on mixed products", () => {
    const item = cartItem(
      [
        { name: "Title", value: "Default Title" },
        { name: "Size", value: "Medium" },
      ],
      [
        { name: "Title", values: ["Default Title"] },
        { name: "Size", values: ["Large", "Medium", "Small"] },
      ],
    );
    expect(getVisibleCartOptionValues(item)).toEqual(["Medium"]);
  });
});
