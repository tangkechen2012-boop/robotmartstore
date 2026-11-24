import { createFileRoute } from "@tanstack/react-router";
import ShopifyPolicyPage from "@/pages/ShopifyPolicyPage";
import { policyQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/policies/shipping-policy")({
  loader: ({ context }) => prefetch(context.queryClient, policyQueryOptions("shippingPolicy")),
  component: () => <ShopifyPolicyPage policyKey="shippingPolicy" path="/policies/shipping-policy" />,
});
