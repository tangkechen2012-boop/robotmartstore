import type { QueryClient } from "@tanstack/react-query";
import { notFound, redirect } from "@tanstack/react-router";
import { collectionQueryOptions, productByHandleQueryOptions, productsQueryOptions } from "@/hooks/useShopifyProducts";
import { COLLECTION_HANDLES, legacyProductPath } from "@/lib/seoRoutes";
import { TAG_COLLECTION_QUERIES } from "@/pages/CollectionPage";
import { prefetch } from "@/lib/routeData";

/**
 * Loader for /products/$slug and /collections/$slug.
 * Known collection handles always win. Any other slug is checked against Shopify: a verified
 * product handle gets a 301 to /product/<handle> (query string kept); anything else is a 404.
 */
export async function loadCollection(
  queryClient: QueryClient,
  slug: string,
  location: { pathname: string; searchStr?: string },
) {
  if (COLLECTION_HANDLES.includes(slug)) {
    const tagQuery = TAG_COLLECTION_QUERIES[slug];
    await prefetch(queryClient, tagQuery ? productsQueryOptions(50, tagQuery) : collectionQueryOptions(slug));
    return;
  }
  const product = (await prefetch(queryClient, productByHandleQueryOptions(slug))) as { handle?: string } | null;
  const target = legacyProductPath(location.pathname, product?.handle);
  if (target) {
    const search = location.searchStr ? `?${location.searchStr.replace(/^\?/, "")}` : "";
    throw redirect({ href: `${target}${search}`, statusCode: 301 });
  }
  throw notFound();
}
