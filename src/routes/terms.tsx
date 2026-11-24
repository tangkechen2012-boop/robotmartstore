import { createFileRoute } from "@tanstack/react-router";
import ShopifyPolicyPage from "@/pages/ShopifyPolicyPage";
import { policyQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/terms")({
  loader: ({ context }) => prefetch(context.queryClient, policyQueryOptions("termsOfService")),
  component: () => <ShopifyPolicyPage policyKey="termsOfService" path="/terms" />,
});
