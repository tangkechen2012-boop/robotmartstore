import { describe, expect, it } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { isNotFound, isRedirect } from "@tanstack/react-router";
import { loadCollection } from "./collectionRouteData";
import type { ShopifyProduct } from "@/lib/shopify";
import { collectionQueryOptions, productByHandleQueryOptions } from "@/hooks/useShopifyProducts";

const client = () => new QueryClient({ defaultOptions: { queries: { retry: false } } });

async function outcome(fn: () => Promise<unknown>) {
  try {
    await fn();
    return { kind: "render" as const };
  } catch (e) {
    if (isRedirect(e)) return { kind: "redirect" as const, href: e.options.href, status: e.status };
    if (isNotFound(e)) return { kind: "notFound" as const };
    throw e;
  }
}

describe("collection vs legacy product routing", () => {
  it("renders a known collection handle even if a product shares the handle", async () => {
    const qc = client();
    qc.setQueryData(collectionQueryOptions("humanoid-robots").queryKey, () => ({ title: "Humanoid", description: "", handle: "humanoid-robots", products: [] as ShopifyProduct[] }));
    qc.setQueryData(productByHandleQueryOptions("humanoid-robots").queryKey, { handle: "humanoid-robots" });
    expect(await outcome(() => loadCollection(qc, "humanoid-robots", { pathname: "/products/humanoid-robots" }))).toEqual({ kind: "render" });
  });

  it("301-redirects /products/<real product handle> to /product/<handle> keeping the query", async () => {
    const qc = client();
    qc.setQueryData(productByHandleQueryOptions("unitree-go2-quadruped-robot-dog").queryKey, { handle: "unitree-go2-quadruped-robot-dog" });
    expect(
      await outcome(() => loadCollection(qc, "unitree-go2-quadruped-robot-dog", { pathname: "/products/unitree-go2-quadruped-robot-dog", searchStr: "?ref=x" })),
    ).toEqual({ kind: "redirect", href: "/product/unitree-go2-quadruped-robot-dog?ref=x", status: 301 });
  });

  it("returns not found for a slug that is neither a collection nor a product", async () => {
    const qc = client();
    qc.setQueryData(productByHandleQueryOptions("nope-xyz").queryKey, null);
    expect(await outcome(() => loadCollection(qc, "nope-xyz", { pathname: "/products/nope-xyz" }))).toEqual({ kind: "notFound" });
  });
});
