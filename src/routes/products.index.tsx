import { createFileRoute } from "@tanstack/react-router";
import CollectionPage from "@/pages/CollectionPage";
import { productsQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/products/")({
  loaderDeps: ({ search }) => ({ q: typeof (search as Record<string, unknown>)["q"] === "string" ? String((search as Record<string, unknown>)["q"]).trim() : "" }),
  loader: ({ context, deps }) => prefetch(context.queryClient, productsQueryOptions(48, deps.q || undefined)),
  component: CollectionPage,
});
