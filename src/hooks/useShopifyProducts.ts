import { queryOptions, useQuery } from '@tanstack/react-query';
import {
  storefrontApiRequest,
  STOREFRONT_PRODUCTS_QUERY,
  STOREFRONT_PRODUCT_BY_HANDLE_QUERY,
  STOREFRONT_COLLECTION_BY_HANDLE_QUERY,
  STOREFRONT_POLICIES_QUERY,
  type ShopifyPolicy,
  type ShopifyPolicyKey,
  type ShopifyProduct,
} from '@/lib/shopify';

/*
 * Query option factories are shared by the hooks below and by route loaders, so the
 * server prefetches exactly the data the page reads and ships it with the HTML.
 */
export const productsQueryOptions = (first = 20, searchQuery?: string) =>
  queryOptions({
    queryKey: ['shopify-products', first, searchQuery],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query: searchQuery || null });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });

export const productByHandleQueryOptions = (handle: string) =>
  queryOptions({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (data?.data?.productByHandle || null) as any;
    },
    enabled: !!handle,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });

export const collectionQueryOptions = (handle: string | undefined, first = 50) =>
  queryOptions({
    queryKey: ['shopify-collection', handle, first],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_COLLECTION_BY_HANDLE_QUERY, { handle, first });
      const collection = data?.data?.collectionByHandle;
      if (!collection) return null;
      return {
        title: collection.title as string,
        description: collection.description as string,
        handle: collection.handle as string,
        products: (collection.products?.edges || []) as ShopifyProduct[],
      };
    },
    enabled: !!handle,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });

export const policyQueryOptions = (policyKey: ShopifyPolicyKey) =>
  queryOptions({
    queryKey: ['shopify-policy', policyKey],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_POLICIES_QUERY);
      return (data?.data?.shop?.[policyKey] || null) as ShopifyPolicy | null;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

export function useShopifyProducts(first = 20, searchQuery?: string) {
  return useQuery(productsQueryOptions(first, searchQuery));
}

export function useShopifyProductByHandle(handle: string) {
  return useQuery(productByHandleQueryOptions(handle));
}

export function useShopifyCollection(handle: string | undefined, first = 50) {
  return useQuery(collectionQueryOptions(handle, first));
}

export function useShopifyPolicy(policyKey: ShopifyPolicyKey) {
  return useQuery(policyQueryOptions(policyKey));
}
