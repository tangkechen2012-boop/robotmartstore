import type { QueryClient } from "@tanstack/react-query";

type Prefetchable = Parameters<QueryClient["ensureQueryData"]>[0];

/**
 * Loads Shopify data before the page renders so server HTML contains real content.
 * A Shopify outage never fails the route: the page falls back to its own loading/error UI.
 */
export async function prefetch<T>(queryClient: QueryClient, options: T): Promise<unknown> {
  try {
    return await queryClient.ensureQueryData(options as Prefetchable);
  } catch (error) {
    console.error("Shopify prefetch failed", error);
    return null;
  }
}
