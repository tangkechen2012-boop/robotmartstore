import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, STOREFRONT_PRODUCT_BY_HANDLE_QUERY, STOREFRONT_COLLECTION_BY_HANDLE_QUERY, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first = 20, searchQuery?: string) {
  return useQuery({
    queryKey: ['shopify-products', first, searchQuery],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query: searchQuery || null });
      return (data?.data?.products?.edges || []) as ShopifyProduct[];
    },
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function useShopifyProductByHandle(handle: string) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.productByHandle || null;
    },
    enabled: !!handle,
    staleTime: 30 * 1000,
    refetchInterval: 60 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function useShopifyCollection(handle: string | undefined, first = 50) {
  return useQuery({
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
}
