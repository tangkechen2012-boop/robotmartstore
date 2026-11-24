import { createFileRoute } from "@tanstack/react-router";
import ProcurementPage from "@/pages/ProcurementPage";

export const Route = createFileRoute("/procurement")({
  component: ProcurementPage,
});
