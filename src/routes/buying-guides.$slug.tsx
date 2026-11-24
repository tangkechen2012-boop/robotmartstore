import { createFileRoute, redirect } from "@tanstack/react-router";
import BuyingGuidePage from "@/pages/BuyingGuidePage";
import { getGuide } from "@/content/buyingGuides";

export const Route = createFileRoute("/buying-guides/$slug")({
  beforeLoad: ({ params }) => {
    if (!getGuide(params.slug)) throw redirect({ to: "/buying-guides", replace: true });
  },
  component: BuyingGuidePage,
});
