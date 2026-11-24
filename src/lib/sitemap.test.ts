import { describe, it, expect } from "vitest";
import { canonicalEntries, productLastmod } from "../../scripts/sitemap-utils";

describe("sitemap rules", () => {
  it("retains only the canonical products collection URL", () => {
    expect(canonicalEntries([{ path: "/products/humanoid-robots" }, { path: "/collections/humanoid-robots" }, { path: "/products/humanoid-robots" }])).toEqual([{ path: "/products/humanoid-robots" }]);
  });
  it("uses the product-specific Shopify update timestamp unchanged", () => {
    expect(productLastmod("2026-11-24T04:14:00Z")).toBe("2026-11-24T04:14:00.000Z");
  });
  it("never fabricates a current-date fallback for missing timestamps", () => {
    expect(productLastmod()).toBeUndefined();
  });
  it("rejects invalid timestamps", () => {
    expect(productLastmod("not-a-date")).toBeUndefined();
  });
});