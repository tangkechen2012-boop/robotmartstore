import { createFileRoute } from "@tanstack/react-router";
import BuyingGuidesPage from "@/pages/BuyingGuidesPage";

export const Route = createFileRoute("/buying-guides/")({
  component: BuyingGuidesPage,
});
