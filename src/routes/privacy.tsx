import { createFileRoute } from "@tanstack/react-router";
import ShopifyPolicyPage from "@/pages/ShopifyPolicyPage";
import { policyQueryOptions } from "@/hooks/useShopifyProducts";
import { prefetch } from "@/lib/routeData";

export const Route = createFileRoute("/privacy")({
  loader: ({ context }) => prefetch(context.queryClient, policyQueryOptions("privacyPolicy")),
  component: () => <ShopifyPolicyPage policyKey="privacyPolicy" path="/privacy" />,
});
