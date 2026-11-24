import { describe, it, expect } from "vitest";
import { COLLECTION_HANDLES, legacyProductPath } from "./seoRoutes";

describe("legacy product URL resolution", () => {
  it.each(COLLECTION_HANDLES)("never redirects collection %s even on a product handle collision", handle => {
    expect(legacyProductPath(`/products/${handle}`, handle)).toBeNull();
  });
  it("resolves a verified product to the singular canonical path", () => {
    expect(legacyProductPath("/products/unitree-g1-humanoid-robot", "unitree-g1-humanoid-robot")).toBe("/product/unitree-g1-humanoid-robot");
  });
  it("preserves verified used product aliases", () => {
    expect(legacyProductPath("/products/used-unitree-g1-humanoid-robot", "used-unitree-g1-humanoid-robot")).toBe("/product/used-unitree-g1-humanoid-robot");
  });
  it("does not redirect an unknown or draft handle without a verified destination", () => {
    expect(legacyProductPath("/products/unitree-g1")).toBeNull();
  });
  it("does not treat unknown collection aliases as products", () => {
    expect(legacyProductPath("/collections/unitree-g1-humanoid-robot", "unitree-g1-humanoid-robot")).toBeNull();
  });
});