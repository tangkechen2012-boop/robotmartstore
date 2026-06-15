import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, ShopifyProduct } from "@/lib/shopify";

const USED_TAG = "Condition_Used";
const RELATED_NEW_PREFIX = "RelatedNew_";

export function getRelatedNewHandle(tags: string[] | undefined): string | null {
  if (!tags) return null;
  const tag = tags.find(t => t.toLowerCase().startsWith(RELATED_NEW_PREFIX.toLowerCase()));
  return tag ? tag.slice(RELATED_NEW_PREFIX.length) : null;
}

export function isUsedProduct(tags: string[] | undefined): boolean {
  return !!tags?.some(t => t.toLowerCase() === USED_TAG.toLowerCase());
}

/**
 * Given a "new" product handle, find any used listings tagged RelatedNew_<handle>.
 */
export function useUsedListingsForNew(newHandle: string | undefined | null, enabled = true) {
  return useQuery({
    queryKey: ["used-for-new", newHandle],
    queryFn: async () => {
      if (!newHandle) return [] as ShopifyProduct[];
      const query = `tag:${USED_TAG} AND tag:${RELATED_NEW_PREFIX}${newHandle}`;
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 5, query });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
    enabled: enabled && !!newHandle,
    staleTime: 60 * 1000,
  });
}
