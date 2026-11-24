import { createFileRoute, notFound } from "@tanstack/react-router";
import ProductDetail from "@/pages/ProductDetail";
import { productByHandleQueryOptions, productsQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/product/$handle")({
  loader: async ({ context, params }) => {
    const product = (await prefetch(context.queryClient, productByHandleQueryOptions(params.handle))) as
      | { productType?: string | null }
      | null;
    // Unknown handle: real 404 status; the page renders its own noindex "Product not found" view.
    if (product === null && context.queryClient.getQueryData(productByHandleQueryOptions(params.handle).queryKey) === null) {
      throw notFound();
    }
    if (product?.productType) {
      await prefetch(context.queryClient, productsQueryOptions(8, `product_type:"${product.productType}"`));
    }
  },
  component: ProductDetail,
  notFoundComponent: ProductDetail,
});
