import { createFileRoute } from "@tanstack/react-router";
import ShopifyPolicyPage from "@/pages/ShopifyPolicyPage";
import { policyQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/policies/refund-policy")({
  loader: ({ context }) => prefetch(context.queryClient, policyQueryOptions("refundPolicy")),
  component: () => <ShopifyPolicyPage policyKey="refundPolicy" path="/policies/refund-policy" />,
});
