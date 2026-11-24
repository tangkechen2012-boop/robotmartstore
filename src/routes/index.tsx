import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";
import { productsQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/")({
  loader: ({ context }) =>
    Promise.all([
      prefetch(context.queryClient, productsQueryOptions(10)),
      prefetch(context.queryClient, productsQueryOptions(8, "tag:Condition_Used")),
    ]),
  component: Index,
});
